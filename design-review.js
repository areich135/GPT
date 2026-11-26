'use strict';
// Greta's November review. Loaded by current pages only; archived drafts stay intact.
(() => {
  document.body.classList.add('greta-review');
  const st=document.body.classList.contains('st-page');
  const rectangular=document.body.classList.contains('bp-v2');
  const root=rectangular?'../':'';
  const unitIconURL=new URL('assets/filter-unit.svg',document.currentScript.src).href;
  const colorIconURL=new URL('assets/filter-color-mono.svg',document.currentScript.src).href;
  const arrow=direction=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${direction<0?'m15 5-7 7 7 7':'m9 5 7 7-7 7'}"/></svg>`;
  const labelSlot=p=>st&&/^ST (2840|3156)(?:[\s/\-]|$)/.test(p.name);
  // Explicit review example, not a claim that the whole range is new.
  const highlightExamples=new Set(['VCG 11']);
  let moreOpen=false, visibleCount=8, filterKey='';

  function decorateFilters(){
    const heading=document.querySelector('#unit-heading img');
    if(heading)heading.src=root+'assets/filter-unit.svg';
    document.querySelectorAll('.compact-unit').forEach(button=>{
      let image=button.querySelector('img');
      if(!image){image=document.createElement('img');image.alt='';button.replaceChildren(image);}
      image.src=unitIconURL;
      button.style.removeProperty('--unit-icon');
    });
    document.querySelectorAll('#filter-color h2 img,#filter-colors h2 img,[data-filter-group="color"] img').forEach(image=>image.src=colorIconURL);
    document.querySelectorAll('img[src$="/filter-color.svg"],img[src="assets/filter-color.svg"]').forEach(image=>image.src=colorIconURL);
  }
  const originalFilters=renderFilters;
  renderFilters=function(...args){const result=originalFilters.apply(this,args);decorateFilters();return result;};

  function decorateLists(){
    document.querySelectorAll('.selection-card').forEach(card=>{
      const title=card.querySelector('header h2');if(!title)return;
      const type=title.id.replace('selection-title-','');
      card.dataset.listType=type;
      const icon=title.querySelector('svg');
      if(icon&&!icon.parentElement.classList.contains('selection-symbol')){
        const circle=document.createElement('span');circle.className='selection-symbol';icon.before(circle);circle.append(icon);
      }
      card.querySelectorAll('.selection-item').forEach(item=>{
        item.querySelectorAll('.selection-icon').forEach(button=>{
          const type=button.dataset.listAdd;
          const active=button.classList.contains('is-selected');
          if(type==='favorites')button.classList.add('selection-heart');
          button.title=active?'Bereits auf der '+(type==='sample'?'Musterliste':type==='offer'?'Angebotsliste':'Merkliste'):button.title;
        });
      });
      const checkout=card.querySelector('[data-list-checkout]');
      if(checkout)checkout.textContent=type==='sample'?'Muster anfordern':'Angebot anfordern';
    });
    document.querySelectorAll('.selection-rail button').forEach(button=>{
      const icon=button.querySelector('svg');
      if(icon&&!icon.parentElement.classList.contains('selection-symbol')){
        const circle=document.createElement('span');circle.className='selection-symbol';icon.before(circle);circle.append(icon);
      }
    });
  }
  const previousDetail=renderDetail;
  renderDetail=function(p,type){
    const html=previousDetail(p,type);
    if(type!=='technical')return html;
    const template=document.createElement('template');template.innerHTML=html;
    const figure=template.content.querySelector('.technical-figure');
    if(!figure)return html;
    if(!rectangular&&highlightExamples.has(p.name)){
      const floor=figure.querySelector('.floor-detail-zoom .detail-number');
      floor?.classList.add('feature-highlight');
      floor?.closest('button')?.setAttribute('title','Neuheit · Designbeispiel, Freigabe durch TEKU offen');
      const number=figure.querySelector('figcaption>span:nth-child(2) .detail-number');
      if(number){
        const button=document.createElement('button');button.className='feature-highlight-button';button.dataset.highlightExample='';
        button.setAttribute('aria-label','Neuheit: Multilochprofilboden IV – Designbeispiel ansehen');
        number.replaceWith(button);button.append(number);number.classList.add('feature-highlight');
      }
    }
    if(rectangular){
      // Existing exact BP floor photos; ST has an explicitly labelled series illustration.
      const extras=detailMedia(p);
      if(st||extras.length>1){
        const caption=figure.querySelector('figcaption');
        const strip=document.createElement('div');strip.className='product-detail-images';
        strip.innerHTML=extras.map((item,i)=>`<button type="button" data-detail-image="${i}" data-id="${p.index}" aria-label="${escapeHTML(item.label)} vergrößern"><img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.label)}" loading="lazy"><span>${escapeHTML(item.label)}</span></button>`).join('');
        if(st){caption.textContent=`Produktansicht · ${selectedVariant(p).color}`;figure.append(strip);}
        else if(extras.length>1)figure.append(strip);
      }
    }
    return template.innerHTML;
  };
  function detailMedia(p){
    const media=[];
    if(p.floor)media.push({src:p.floor,label:'Bodenansicht · '+p.name});
    if(st)media.push({src:'assets/21298-teku-mehrwert-stabilitaet-boden-lgcup-st-dst.webp',label:'Bodendetail · Serienillustration'});
    if(labelSlot(p))media.push({src:'assets/21311-teku-mehrwert-verkaufsfoerderung-etiketten-pt.webp',label:'Etikettenschlitz · Serienillustration'});
    // Future PIM photos are attached per article, never inferred from another SKU.
    (p.detailImages||[]).forEach(item=>{if(item.src&&item.label)media.push(item);});
    return media;
  }
  function paginate(){
    if(window.ACCESSORY_CONFIG?.showAllArticles)return;
    const key=JSON.stringify(rectangular?state.filters:{color:state.color,volume:state.volume,diameter:state.diameter,angle:state.angle,categories:[...state.categories],process:[...state.process]});
    if(key!==filterKey){filterKey=key;visibleCount=8;moreOpen=false;}
    const rows=[...document.querySelectorAll('#results>.product-row')];
    if(rectangular){
      rows.forEach((row,i)=>row.hidden=i>=visibleCount);
      if(rows.length>visibleCount)document.querySelector('#results').insertAdjacentHTML('beforeend',`<button class="more-articles" data-more-articles aria-expanded="false">${svg('arrow')}<span>weitere Artikel</span></button>`);
    }else{
      const section=document.querySelector('.secondary-products');
      if(section){
        const label=section.querySelector('.secondary-label');
        label.outerHTML=`<button class="more-articles" data-more-articles aria-expanded="${moreOpen}" aria-controls="additional-article-rows">${svg('arrow')}<span>${moreOpen?'weniger Artikel':'weitere Artikel'}</span></button>`;
        const group=document.createElement('div');group.id='additional-article-rows';group.hidden=!moreOpen;
        section.querySelectorAll('.product-row').forEach(row=>group.append(row));section.append(group);
      }
    }
  }
  const previousProducts=renderProducts;
  renderProducts=function(...args){
    const result=previousProducts.apply(this,args);
    decorateFilters();decorateLists();
    document.querySelectorAll('.product-row').forEach(row=>{
      const p=productById(row.id.replace('article-',''));if(!p)return;
      row.querySelectorAll('.row-section-toggle:not(:disabled)').forEach(button=>{
        button.querySelector('span').innerHTML=svg('arrow');
        button.setAttribute('aria-label',button.querySelector('strong').textContent.replace(/\s+/g,' ')+' '+(button.getAttribute('aria-expanded')==='true'?'schließen':'öffnen'));
      });
      if(!rectangular&&p.name==='VCG 12 D'){
        let note=row.querySelector('.row-note');
        if(!note){note=document.createElement('p');note.className='row-note';row.querySelector('.row-main').after(note);}
        note.innerHTML='<span>PATENT PENDING</span><span>D: Niedrige Ausführung</span>';
        note.classList.add('patent-note');
      }
      if(labelSlot(p)){
        row.querySelector('.row-product-summary').insertAdjacentHTML('beforeend',`<p class="label-slot-note" id="label-slot-${p.index}"><sup>*</sup> Mit Etikettenschlitz</p>`);
        row.querySelector('.bp-tray-measures').setAttribute('aria-describedby',`label-slot-${p.index}`);
      }
    });
    paginate();return result;
  };

  if(rectangular){
    // One gallery model for BP and ST, with an extensible list of exact PIM detail images.
    function media(){const p=productById(state.current);return [{src:productImage(p),label:p.name+' · '+selectedVariant(p).color},...detailMedia(p)];}
    const originalGallery=updateGallery;
    updateGallery=function(){
      originalGallery();
      const items=media();state.view=Math.max(0,Math.min(items.length-1,state.view));
      const item=items[state.view];
      document.querySelector('#main-image').src=item.src;document.querySelector('#main-image').alt=item.label;
      const thumbnails=document.querySelector('.thumbnails');
      thumbnails.innerHTML=items.map((item,i)=>`<button class="thumbnail ${i===state.view?'active':''}" data-review-view="${i}" ${i===1&&!st?'id="floor-thumb-button"':''} aria-label="${escapeHTML(item.label)}" aria-pressed="${i===state.view}"><img ${i===0?'id="front-thumbnail"':i===1&&!st?'id="floor-thumbnail"':''} src="${escapeHTML(item.src)}" alt=""></button>`).join('');
      const bar=document.querySelector('#gallery-progress-bar');bar.style.width=`${100/items.length}%`;bar.style.transform=`translateX(${state.view*100}%)`;
      document.querySelector('.gallery-view-caption').textContent=state.view?item.label:'';
    };
    showGalleryModal=function(){const item=media()[state.view];openModal(item.label,`<img class="modal-image" src="${escapeHTML(item.src)}" alt="${escapeHTML(item.label)}">`);};
    document.querySelectorAll('.gallery-card>.gallery-arrow').forEach(button=>button.remove());
    document.querySelector('.gallery-card').insertAdjacentHTML('beforeend',`<button class="gallery-arrow gallery-prev" data-review-gallery="-1" aria-label="Vorherige Produktansicht">${arrow(-1)}</button><button class="gallery-arrow gallery-next" data-review-gallery="1" aria-label="Nächste Produktansicht">${arrow(1)}</button><span class="gallery-view-caption" aria-live="polite"></span>`);
    document.querySelector('.gallery-card').addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
      event.preventDefault();event.stopImmediatePropagation();state.view=(state.view+(event.key==='ArrowRight'?1:media().length-1))%media().length;updateGallery();
    },true);
    updateGallery();
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.hasAttribute('data-highlight-example')){
      openModal('Neuheit · Designbeispiel','<p>So kann eine von TEKU freigegebene Neuheit markiert werden. Hier am Multilochprofilboden IV beispielhaft dargestellt; die fachliche Freigabe steht noch aus.</p>');return;
    }
    if(button.hasAttribute('data-more-articles')){
      const oldY=scrollY;if(rectangular)visibleCount+=8;else moreOpen=!moreOpen;
      renderProducts();scrollTo({top:oldY,behavior:'instant'});document.querySelector('[data-more-articles]')?.focus({preventScroll:true});return;
    }
    if(button.hasAttribute('data-detail-image')){
      const item=detailMedia(productById(button.dataset.id))[Number(button.dataset.detailImage)];
      openModal(item.label,`<img class="modal-image" src="${escapeHTML(item.src)}" alt="${escapeHTML(item.label)}">`);return;
    }
    if(rectangular&&(button.hasAttribute('data-review-gallery')||button.hasAttribute('data-review-view'))){
      state.view=button.hasAttribute('data-review-view')?Number(button.dataset.reviewView):(state.view+Number(button.dataset.reviewGallery)+1+detailMedia(productById(state.current)).length)%(1+detailMedia(productById(state.current)).length);
      updateGallery();return;
    }
  });
  renderProducts();
})();
