'use strict';
// ST uses the same single-product carousel and sidebar behavior as VCG.
(() => {
  const rail = document.createElement('nav');
  rail.className = 'selection-rail';
  rail.setAttribute('aria-label', 'Ihre Listen öffnen');
  rail.innerHTML = [['offer','Angebote','<path d="M8 3h10v18H6V5h2M9 2h6v4H9zM9 10h6m-6 4h6"/>'],['sample','Muster','<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10"/>'],['favorites','Merkliste',null],['contact','Kontakt','<path d="M4 4h16v13H9l-5 4zM8 8h8m-8 5h5"/>']].map(([key,label,path])=>`<button data-open-selection="${key}" aria-controls="selection-sidebar" title="${label} öffnen">${path ? `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>` : svg('heart')}<span>${label}</span><b class="rail-count" data-rail-count="${key}" hidden></b></button>`).join('');
  document.body.append(rail);
  const sidebar = $('#selection-sidebar');
  const previousCollapse = setCollapsed;
  setCollapsed = function(collapsed) {
    previousCollapse(collapsed);
    rail.hidden = collapsed;
    rail.querySelectorAll('button').forEach(b => b.setAttribute('aria-expanded', String(collapsed)));
  };
  setCollapsed(state.filterCollapsed);

  function setupCarousel(carousel) {
    const track=carousel.querySelector('.tray-carousel-track');
    const progress=carousel.querySelector('.tray-carousel-progress');
    const previous=carousel.querySelector('[data-carousel-step="-1"]');
    const next=carousel.querySelector('[data-carousel-step="1"]');
    const total=track.children.length;
    let step=1,visible=1,index=0,target=null;
    const update=()=>{
      const end=Math.max(0,track.scrollWidth-track.clientWidth);
      const position=Math.max(0,Math.min(total-visible,track.scrollLeft/step));
      index=Math.round(position);
      if(target!==null&&Math.abs(track.scrollLeft-Math.min(end,target*step))<1)target=null;
      const active=target??index;
      previous.disabled=active===0||end<1;
      next.disabled=active>=total-visible||end<1;
      const fraction=end<1?1:Math.min(1,(position+visible)/total);
      progress.querySelector('span').style.width=`${fraction*100}%`;
      progress.setAttribute('aria-valuenow',String(Math.round(fraction*100)));
      progress.setAttribute('aria-valuetext',`Produkte ${index+1} bis ${Math.min(total,index+visible)} von ${total}`);
    };
    const resize=()=>{
      const keep=target??index;
      const slots=parseInt(getComputedStyle(track).getPropertyValue('--tray-slots'),10)||5;
      visible=Math.min(total,slots);
      track.style.setProperty('--visible-products',visible);
      step=track.firstElementChild.getBoundingClientRect().width+(parseFloat(getComputedStyle(track).columnGap)||0);
      target=null;index=Math.min(keep,total-visible);
      track.scrollTo({left:Math.min(track.scrollWidth-track.clientWidth,index*step),behavior:'instant'});
      update();
    };
    carousel._move=direction=>{
      const end=Math.max(0,track.scrollWidth-track.clientWidth);
      target=Math.max(0,Math.min(total-visible,(target??index)+direction));
      track.scrollTo({left:Math.min(end,target*step),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
      update();
    };
    track.addEventListener('scroll',update,{passive:true});
    const manual=()=>{target=null;};
    track.addEventListener('pointerdown',manual,{passive:true});
    track.addEventListener('wheel',manual,{passive:true});
    const observer=new ResizeObserver(resize);observer.observe(track);
    carousel._cleanup=()=>observer.disconnect();
    resize();
  }
  const previousRender = renderProducts;
  let observers = [];
  renderProducts = function() {
    observers.forEach(o=>o.disconnect()); observers=[];
    $$('.tray-carousel').forEach(c=>c._cleanup?.());
    previousRender();
    $$('.refreshed-row').forEach(row => {
      $$('.row-section-toggle',row).forEach(button=>{
        const title = button.dataset.expand === 'variants' ? 'Varianten' : button.querySelector('strong').innerText.replace(/\s+/g,' ');
        if (button.dataset.expand === 'variants') button.querySelector('strong').textContent = title;
        button.setAttribute('aria-label', `${title} ${button.getAttribute('aria-expanded') === 'true' ? 'schließen' : 'öffnen'}`);
        button.querySelector('span').innerHTML = svg('arrow');
      });
      const main = row.querySelector('.row-main');
      const positionPointer = () => {
        const selected = main.querySelector('[data-expand][aria-expanded="true"]');
        main.classList.toggle('has-open-panel', !!selected);
        if (selected) {
          const a=main.getBoundingClientRect(), b=selected.getBoundingClientRect();
          main.style.setProperty('--panel-pointer', `${b.left + b.width/2 - a.left}px`);
        }
      };
      positionPointer();
      const observer = new ResizeObserver(positionPointer);observer.observe(main);observers.push(observer);
      $$('.variant-favorite', row).forEach(button=>{
        const key=`${button.dataset.favorite}:${button.dataset.variantIndex}`;
        const saved=!!$(`#selection-stack [data-list-remove="favorites"][data-entry="${key}"]`);
        button.classList.toggle('saved',saved);button.setAttribute('aria-pressed',String(saved));
      });
    });
    $$('.tray-carousel').forEach(setupCarousel);
    ['offer','sample','favorites'].forEach(key=>{
      const count=$$(`#selection-title-${key}`).length ? $(`#selection-title-${key}`).closest('.selection-card').querySelector('.selection-count').textContent : '';
      const badge=rail.querySelector(`[data-rail-count="${key}"]`);badge.textContent=count;badge.hidden=!count;
    });
  };
  function move(carousel, direction) {carousel._move?.(direction);}
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.openSelection){
      const key=button.dataset.openSelection;
      setCollapsed(true);
      const card=key==='contact'?sidebar.querySelector('.selection-contact'):$(`#selection-title-${key}`).closest('.selection-card');
      card.tabIndex=-1;card.scrollIntoView({behavior:'smooth',block:'nearest'});card.focus({preventScroll:true});return;
    }
    if(button.dataset.carouselStep){
      move(button.closest('.tray-carousel'),Number(button.dataset.carouselStep));
    }
  });
  document.addEventListener('keydown',event=>{
    if(!event.target.matches('.tray-carousel-track')||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();const carousel=event.target.closest('.tray-carousel');
    move(carousel,event.key==='ArrowRight'?1:-1);
  });
  renderProducts();
})();
