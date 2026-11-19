'use strict';
// Current pages: a shared image dialog and one technical composition per product.
(() => {
  const rectangular=document.body.classList.contains('bp-v2');
  const accessory=!!window.ACCESSORY_CONFIG;
  const st=document.body.classList.contains('st-page');
  const root=rectangular?'../':'';
  const arrow=n=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${n<0?'m15 5-7 7 7 7':'m9 5 7 7-7 7'}"/></svg>`;
  const rimText='Der ausgeprägte Kronenrand unterstützt die sichere Handhabung und die Verarbeitung mit automatischen Absetz- und Rücksystemen.';
  const floorText='Die Öffnungen und das Bodenprofil unterstützen die Be- und Entwässerung des Topfes.';
  function media(p){
    const first={src:productImage(p),label:'Produktansicht',note:selectedVariant(p).color};
    if(accessory)return [first,...(p.media||[])];
    if(!rectangular)return [first,{src:'assets/vcg-slide2.png',label:'Bodenkonstruktion',note:floorText},{src:'assets/vcg-slide3.png',label:'Randansicht',note:rimText}];
    const extras=[];
    if(p.floor)extras.push({src:p.floor,label:'Bodenansicht',note:'Bodenkonstruktion · '+p.name});
    if(st)extras.push({src:'assets/21298-teku-mehrwert-stabilitaet-boden-lgcup-st-dst.webp',label:'Bodenansicht',note:'Bodendetail der Serie ST · Serienillustration'});
    if(st&&/^ST (2840|3156)(?:[\s/\-]|$)/.test(p.name))extras.push({src:'assets/21311-teku-mehrwert-verkaufsfoerderung-etiketten-pt.webp',label:'Etikettenschlitz',note:'Etikettenschlitz · Serienillustration'});
    return [first,...extras,...(p.detailImages||[])];
  }
  if(accessory){
    const baseGallery=updateGallery;
    updateGallery=function(){
      const requestedView=state.view;baseGallery();const p=productById(state.current),items=media(p);state.view=Math.max(0,Math.min(items.length-1,requestedView));const item=items[state.view];
      document.querySelector('#main-image').src=item.src;document.querySelector('#main-image').alt=p.name+' · '+item.label;
      document.querySelector('.thumbnails').innerHTML=items.map((x,i)=>`<button class="thumbnail ${i===state.view?'active':''}" data-accessory-view="${i}" aria-pressed="${i===state.view}" aria-label="${escapeHTML(x.label)}"><img ${i===0?'id="front-thumbnail"':''} src="${escapeHTML(x.src)}" alt=""></button>`).join('');
      const bar=document.querySelector('#gallery-progress-bar');bar.style.width=`${100/items.length}%`;bar.style.transform=`translateX(${state.view*100}%)`;
      document.querySelector('.gallery-view-caption').textContent=state.view?(item.note||item.label):'';
    };
    document.addEventListener('click',event=>{
      const b=event.target.closest('[data-accessory-view],[data-review-gallery]');if(!b)return;
      event.preventDefault();event.stopImmediatePropagation();
      const count=media(productById(state.current)).length;state.view=b.hasAttribute('data-accessory-view')?Number(b.dataset.accessoryView):(state.view+Number(b.dataset.reviewGallery)+count)%count;updateGallery();
    },true);
    document.addEventListener('keydown',event=>{
      if(!event.target.closest('.gallery-card')||!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();event.stopImmediatePropagation();const count=media(productById(state.current)).length;state.view=(state.view+(event.key==='ArrowRight'?1:count-1))%count;updateGallery();
    },true);
    updateGallery();
  }
  showGalleryModal=function(){
    const p=productById(state.current),items=media(p);state.view=Math.max(0,Math.min(items.length-1,state.view));
    const item=items[state.view];
    openModal(p.name+' · '+item.label,`<div class="unified-gallery"><button class="unified-gallery-arrow" data-detail-step="-1" aria-label="Vorherige Ansicht" ${items.length<2?'disabled':''}>${arrow(-1)}</button><img class="modal-image" src="${escapeHTML(item.src)}" alt="${escapeHTML(p.name+' · '+item.label)}"><button class="unified-gallery-arrow" data-detail-step="1" aria-label="Nächste Ansicht" ${items.length<2?'disabled':''}>${arrow(1)}</button></div><div class="gallery-modal-tabs" role="group" aria-label="Produktansichten">${items.map((x,i)=>`<button data-detail-view="${i}" aria-pressed="${state.view===i}" class="${state.view===i?'active':''}">${escapeHTML(x.label)}</button>`).join('')}</div><p class="gallery-note detail-description">${escapeHTML(item.note||'')}</p>`);
    document.querySelector('#modal').classList.add('product-image-dialog');
  };
  document.querySelector('#modal').addEventListener('close',()=>document.querySelector('#modal').classList.remove('product-image-dialog'));
  function move(step,view){
    const count=media(productById(state.current)).length;
    state.view=view??(state.view+step+count)%count;updateGallery();showGalleryModal();
    document.querySelector(view===undefined?`[data-detail-step="${step}"]`:`[data-detail-view="${view}"]`)?.focus();
  }
  document.addEventListener('click',event=>{
    const b=event.target.closest('[data-technical-view],[data-detail-step],[data-detail-view]');if(!b)return;
    event.preventDefault();event.stopImmediatePropagation();
    if(b.hasAttribute('data-technical-view')){state.current=Number(b.dataset.id);state.view=Number(b.dataset.technicalView);updateGallery();showGalleryModal();return;}
    move(Number(b.dataset.detailStep),b.hasAttribute('data-detail-view')?Number(b.dataset.detailView):undefined);
  },true);
  document.querySelector('#modal').addEventListener('keydown',event=>{
    if(!document.querySelector('.unified-gallery')||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();event.stopImmediatePropagation();move(event.key==='ArrowRight'?1:-1);
  },true);
  const previousDetail=renderDetail;
  renderDetail=function(p,type){
    const html=previousDetail(p,type);if(type!=='technical')return html;
    const template=document.createElement('template');template.innerHTML=html;
    const fig=template.content.querySelector('.technical-figure');if(!fig)return html;
    fig.querySelector('.product-detail-images')?.remove();
    if(!rectangular){
      // One raster image contains the original product and both circular details.
      // Numbered captions remain separate, accessible links into the dialog.
      fig.innerHTML=`<button class="technical-composite" data-technical-view="0" data-id="${p.index}" aria-label="${escapeHTML(p.name)} · Produktansicht vergrößern"><img src="assets/technical-composites/${escapeHTML(productImage(p).split('/').pop())}" alt="${escapeHTML(p.name)} mit Kronenrand (1) und Multilochprofilboden IV (2)"></button><figcaption><button data-technical-view="2" data-id="${p.index}"><b class="detail-number">1</b> Kronenrand</button><button data-technical-view="1" data-id="${p.index}"><b class="detail-number ${p.name==='VCG 11'?'feature-highlight':''}" ${p.name==='VCG 11'?'title="Neuheiten-Markierung als Designbeispiel · TEKU-Freigabe offen"':''}>2</b> Multilochprofilboden IV</button><small>Produktansicht: ${escapeHTML(selectedVariant(p).color)}<br>Detailabbildungen in Circular ton/grau</small></figcaption>`;
    }else{
      const items=media(p),floor=items.findIndex(x=>/boden/i.test(x.label));
      fig.classList.add('technical-circle-figure');
      fig.innerHTML=`<div class="technical-circle-stage"><button data-technical-view="0" data-id="${p.index}" aria-label="Produktansicht von ${escapeHTML(p.name)} vergrößern"><img src="${escapeHTML(productImage(p))}" alt="${escapeHTML(p.name)}" loading="lazy"></button>${floor<0?'':`<button class="floor-zoom" data-technical-view="${floor}" data-id="${p.index}" aria-label="Bodenansicht von ${escapeHTML(p.name)} vergrößern"><img src="${escapeHTML(items[floor].src)}" alt="${escapeHTML(items[floor].note||items[floor].label)}" loading="lazy"></button>`}</div><figcaption>${floor<0?'Produktansicht':`<button data-technical-view="${floor}" data-id="${p.index}">Bodenkonstruktion</button>${st?'<small>Serienillustration · ST</small>':''}`}</figcaption>`;
    }
    return template.innerHTML;
  };
  // BP/ST recreate the compact unit button after every filter change.
  const previousFilters=renderFilters;
  renderFilters=function(...args){const result=previousFilters.apply(this,args);document.querySelectorAll('.compact-unit').forEach(b=>b.style.setProperty('--unit-icon',`url("${root}assets/filter-unit.svg")`));return result;};
  renderFilters();renderProducts();
})();
