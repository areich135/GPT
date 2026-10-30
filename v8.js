'use strict';
// Alexander's review. Only the current round-pot draft loads this adapter.
(() => {
  const baseDetail = renderDetail;
  const arrow = direction => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${direction < 0 ? 'm14 5-7 7 7 7' : 'm10 5 7 7-7 7'}"/></svg>`;
  const certificates = {
    angel: ['logo-blauer-engel-de.png', 'Blauer Engel', 'https://www.blauer-engel.de/uz30a'],
    cyclos: ['logo-cyclos-htp-de.png', 'cyclos-HTP · 100 % recyclingfähig', null]
  };
  renderDetail = function(p, type) {
    if (type === 'variants') return `<h3 class="sr-only">Varianten · ${escapeHTML(p.name)}</h3><div class="certified-variants">${p.variants.map((v,i)=>({v,i})).sort((a,b)=>{const rank=v=>({'Circular ton/grau':0,'Circular taupe/grau':1,'Circular weiß/grau':2}[v.color]??(v.category==='Circular360'?3:4));return rank(a.v)-rank(b.v)}).map(({v,i}) => {
      const badges = (VARIANT_CERTIFICATES[p.name]?.[v.color] || []).map(key => {
        const [file, label, url] = certificates[key];
        const logo = `<img src="assets/${file}" alt="${label}" loading="lazy">`;
        return `<figure>${url ? `<a href="${url}" target="_blank" rel="noopener">${logo}</a>` : logo}<figcaption${key === 'angel' ? ' class="sr-only"' : ''}>${key === 'angel' ? '<a href="https://www.blauer-engel.de/uz30a" target="_blank" rel="noopener">www.blauer-engel.de/uz30a</a>' : '100 % recyclingfähig'}</figcaption></figure>`;
      }).join('');
      return `<article class="certified-variant"><button class="variant-choice" data-variant="${i}" data-id="${p.index}" aria-label="${escapeHTML(p.name + ' · ' + v.color)} auswählen" aria-pressed="${selectedVariant(p) === v}"><img src="${v.image}" alt="${escapeHTML(v.color)}" loading="lazy"><span><strong>${escapeHTML(v.category)}</strong><small>Farbe ${escapeHTML(v.color)}</small></span></button><button class="variant-favorite" data-favorite="${p.index}" data-variant-index="${i}" aria-label="${escapeHTML(p.name + ' · ' + v.color)} merken">${svg('heart')}</button><div class="variant-certificates">${badges}</div></article>`;
    }).join('')}</div>`;
    if (type !== 'trays' || p.trays.length < 2) return baseDetail(p, type);
    return `<section class="tray-carousel" aria-label="Passende Trays für ${escapeHTML(p.name)}"><h3>Passende Trays · ${escapeHTML(p.name)}</h3><div class="tray-carousel-track" tabindex="0" aria-label="Passende Trays – mit Pfeiltasten blättern">${p.trays.map((t, i) => `<button class="tray-tile" data-tray="${i}" data-id="${p.index}"><img src="${t.image}" alt="" loading="lazy">${escapeHTML(t.name)}</button>`).join('')}</div><nav class="tray-carousel-navigation" aria-label="Tray-Auswahl"><button data-carousel-step="-1" aria-label="Vorherige passende Trays">${arrow(-1)}</button><div class="tray-carousel-dots" role="group" aria-label="Tray-Seiten"></div><button data-carousel-step="1" aria-label="Nächste passende Trays">${arrow(1)}</button></nav></section>`;
  };

  const rail = document.createElement('nav');
  rail.className = 'selection-rail';
  rail.setAttribute('aria-label', 'Ihre Listen öffnen');
  rail.innerHTML = [['offer','Angebote','<path d="M8 3h10v18H6V5h2M9 2h6v4H9zM9 10h6m-6 4h6"/>'],['sample','Muster','<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10"/>'],['favorites','Merkliste',null],['contact','Kontakt','<path d="M4 4h16v13H9l-5 4zM8 8h8m-8 5h5"/>']].map(([key,label,path])=>`<button data-open-selection="${key}" aria-controls="selection-sidebar" title="${label} öffnen">${path ? `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>` : svg('heart')}<span>${label}</span><b class="rail-count" data-rail-count="${key}" hidden></b></button>`).join('');
  document.body.append(rail);
  const sidebar = $('#selection-sidebar');
  const previousCollapse = setFilterCollapsed;
  setFilterCollapsed = function(collapsed) {
    previousCollapse(collapsed);
    rail.hidden = collapsed;
    rail.querySelectorAll('button').forEach(b => b.setAttribute('aria-expanded', String(collapsed)));
  };
  setFilterCollapsed(state.filterCollapsed);

  function setupCarousel(carousel) {
    const track = carousel.querySelector('.tray-carousel-track');
    const dots = carousel.querySelector('.tray-carousel-dots');
    const update = () => {
      const step = Math.max(1, track.clientWidth);
      const end = Math.max(0, track.scrollWidth - track.clientWidth);
      const count = Math.max(1, Math.ceil(end / step) + 1);
      if (dots.children.length !== count) dots.innerHTML = Array.from({length:count}, (_,i)=>`<button data-carousel-page="${i}" aria-label="Tray-Seite ${i+1}" aria-current="false"></button>`).join('');
      const page = end && track.scrollLeft >= end-2 ? count-1 : Math.round(track.scrollLeft/step);
      [...dots.children].forEach((b,i)=>b.setAttribute('aria-current',String(i===page)));
      carousel.querySelector('[data-carousel-step="-1"]').disabled = track.scrollLeft <= 2;
      carousel.querySelector('[data-carousel-step="1"]').disabled = track.scrollLeft >= end-2;
    };
    track.addEventListener('scroll', update, {passive:true});
    const observer = new ResizeObserver(update); observer.observe(track);
    carousel._cleanup = () => observer.disconnect();
    update();
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
  function move(carousel, page) {
    const track=carousel.querySelector('.tray-carousel-track');
    const count=carousel.querySelector('.tray-carousel-dots').children.length;
    track.scrollTo({left:Math.min(count-1,Math.max(0,page))*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.openSelection){
      const key=button.dataset.openSelection;
      setFilterCollapsed(true);
      const card=key==='contact'?sidebar.querySelector('.selection-contact'):$(`#selection-title-${key}`).closest('.selection-card');
      card.tabIndex=-1;card.scrollIntoView({behavior:'smooth',block:'nearest'});card.focus({preventScroll:true});return;
    }
    if(button.dataset.carouselStep||button.dataset.carouselPage!==undefined){
      const carousel=button.closest('.tray-carousel');
      const active=carousel.querySelector('[data-carousel-page][aria-current="true"]');
      move(carousel,button.dataset.carouselPage!==undefined?Number(button.dataset.carouselPage):Number(active.dataset.carouselPage)+Number(button.dataset.carouselStep));
    }
  });
  document.addEventListener('keydown',event=>{
    if(!event.target.matches('.tray-carousel-track')||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();const carousel=event.target.closest('.tray-carousel');
    const page=Number(carousel.querySelector('[data-carousel-page][aria-current="true"]').dataset.carouselPage);
    move(carousel,page+(event.key==='ArrowRight'?1:-1));
  });
  renderProducts();
})();
