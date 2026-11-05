'use strict';
(() => {
  const arrow = direction => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${direction < 0 ? 'm14 5-7 7 7 7' : 'm10 5 7 7-7 7'}"/></svg>`;
  const previousDetail=renderDetail;
  renderDetail=function(p,type){
    if(type!=='fitting'||p.fitting.length<2)return previousDetail(p,type);
    return `<section class="tray-carousel" aria-label="Passende Aushebeplatten für ${escapeHTML(p.name)}"><h3>Passende Aushebeplatten · ${escapeHTML(p.name)}</h3><p class="small-note">Die Aushebeplatte drückt die Jungpflanzen von unten aus den Anzuchtzellen.</p><div class="tray-carousel-track" tabindex="0" aria-label="Passende Aushebeplatten – mit Pfeiltasten blättern">${p.fitting.map((t,i)=>`<button class="tray-tile" data-fitting="${i}" data-id="${p.index}"><img src="${t.image}" alt="Aushebeplatte ${escapeHTML(t.name)}" loading="lazy">${escapeHTML(t.name)}</button>`).join('')}</div><nav class="tray-carousel-navigation" aria-label="Aushebeplatten-Auswahl"><button data-carousel-step="-1" aria-label="Vorherige Aushebeplatten">${arrow(-1)}</button><input class="tray-carousel-progress" type="range" min="0" max="100" step="0.1" value="0" aria-label="Position der passenden Aushebeplatten"><button data-carousel-step="1" aria-label="Nächste Aushebeplatten">${arrow(1)}</button></nav></section>`;
  };
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
    const track = carousel.querySelector('.tray-carousel-track');
    const progress = carousel.querySelector('.tray-carousel-progress');
    const update = () => {
      const end = Math.max(0, track.scrollWidth - track.clientWidth);
      progress.value = end ? track.scrollLeft / end * 100 : 0;
      progress.disabled = end === 0;
      progress.style.setProperty('--thumb-width', `${Math.max(24, progress.clientWidth * track.clientWidth / Math.max(1, track.scrollWidth))}px`);
      progress.setAttribute('aria-valuetext', `${Math.round(Number(progress.value))} %`);
      carousel.querySelector('[data-carousel-step="-1"]').disabled = track.scrollLeft <= 2;
      carousel.querySelector('[data-carousel-step="1"]').disabled = track.scrollLeft >= end-2;
    };
    track.addEventListener('scroll', update, {passive:true});
    const observer = new ResizeObserver(update); observer.observe(track);
    carousel._cleanup = () => observer.disconnect();
    update();
  }
  const previousRender=renderProducts;
  const ccInfo='Ein CC-Wagen (CC-Container) ist ein im Gartenbau üblicher Transportwagen für Pflanzen. Eine CC-Lage ist eine einzelne Ablageebene dieses Wagens. „Trays pro CC-Lage“ gibt die Anzahl der Anzuchtpaletten auf einer Ebene an; „Pflanzen pro CC-Lage“ die Pflanzenzahl auf dieser Ebene.';
  renderProducts=function(){
    $$('.tray-carousel').forEach(c=>c._cleanup?.());
    previousRender();
    $$('.tray-carousel').forEach(setupCarousel);
    $$('.spec-table dt').filter(dt=>['Trays pro CC-Lage','Pflanzen pro CC-Lage'].includes(dt.textContent)).forEach(dt=>{
      dt.insertAdjacentHTML('beforeend',` <button class="cc-info" data-cc-info aria-label="CC-Wagen und CC-Lage erklären" title="${escapeHTML(ccInfo)}">i</button>`);
    });
    // The same help is available beside both filter headings.
    $$('.bp-filter-field legend').filter(l=>['Trays pro CC-Lage','Pflanzen pro CC-Lage'].includes(l.textContent)).forEach(l=>l.insertAdjacentHTML('beforeend',` <button class="cc-info" data-cc-info aria-label="CC-Wagen und CC-Lage erklären" title="${escapeHTML(ccInfo)}">i</button>`));
    ['offer','sample','favorites'].forEach(key=>{
      const count=$(`#selection-title-${key}`).closest('.selection-card').querySelector('.selection-count').textContent;
      const badge=rail.querySelector(`[data-rail-count="${key}"]`);badge.textContent=count;badge.hidden=!count;
    });
  };
  document.addEventListener('click',event=>{if(event.target.closest('[data-cc-info]'))openModal('CC-Wagen und CC-Lage',`<p>${escapeHTML(ccInfo)}</p>`)});
  function move(carousel, direction) {
    const track=carousel.querySelector('.tray-carousel-track');
    track.scrollTo({left:Math.min(track.scrollWidth-track.clientWidth,Math.max(0,track.scrollLeft+direction*track.clientWidth)),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  document.addEventListener('input',event=>{
    if(!event.target.matches('.tray-carousel-progress'))return;
    const track=event.target.closest('.tray-carousel').querySelector('.tray-carousel-track');
    track.scrollTo({left:(track.scrollWidth-track.clientWidth)*Number(event.target.value)/100,behavior:'instant'});
  });
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
