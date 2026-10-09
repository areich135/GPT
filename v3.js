'use strict';
// V3 adds the three selection lists to the existing V2 product interactions.
(() => {
  const lists = {offer:new Map(), sample:new Map(), favorites:new Map()};
  const labels = {offer:'Ihre Angebote', sample:'Ihre Muster', favorites:'Ihre Merkliste'};
  const icons = {
    offer:'<path d="M8 3h10v18H6V5h2M9 2h6v4H9zM9 10h6m-6 4h6m-6 3h4"/>',
    sample:'<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10M7.5 4.5l9 5"/>'
  };
  const listIcon = type => type==='favorites' ? svg('heart') : `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[type]}</svg>`;
  const snapshot = id => {
    const p = productById(id), variant = p && selectedVariant(p);
    return variant ? {key:`${p.index}:${p.variants.indexOf(variant)}`,id:p.index,name:p.name,color:variant.color,image:variant.image} : null;
  };
  const added = (type,item) => !!item && lists[type].has(item.key);
  const actionButton = (type,item) => `<button class="selection-icon ${added(type,item)?'is-selected':''}" data-list-add="${type}" data-entry="${item.key}" aria-label="${escapeHTML(item.name+' · '+item.color)} ${type==='sample'?'zur Musterliste hinzufügen':'zur Angebotsliste hinzufügen'}" aria-pressed="${added(type,item)}" title="${type==='sample'?'Als Muster vormerken':'Für ein Angebot vormerken'}">${listIcon(type)}</button>`;
  function renderCard(type){
    const items=[...lists[type].values()];
    const empty=type==='offer'?'Es sind keine Angebote auf der Liste.':type==='sample'?'Es sind keine Muster auf der Liste.':'Es sind keine Artikel auf der Merkliste.';
    const rows=items.map(item=>`<li class="selection-item"><button class="selection-remove" data-list-remove="${type}" data-entry="${item.key}" aria-label="${escapeHTML(item.name+' · '+item.color)} aus ${type==='favorites'?'der Merkliste':type==='sample'?'der Musterliste':'der Angebotsliste'} entfernen" title="Entfernen">×</button><span class="selection-item-label"><strong>${item.name}</strong><small>${escapeHTML(item.color)}</small></span><div class="selection-item-actions">${type==='favorites'?actionButton('sample',item)+actionButton('offer',item):`<button class="selection-icon ${added('favorites',item)?'is-selected':''}" data-list-add="favorites" data-entry="${item.key}" aria-label="${escapeHTML(item.name+' · '+item.color)} auf der Merkliste speichern" aria-pressed="${added('favorites',item)}" title="Auf der Merkliste speichern">${svg('heart')}</button>`}</div></li>`).join('');
    const footer=items.length ? `<div class="selection-footer"><button class="selection-clear" data-list-clear="${type}">Alle entfernen</button>${type==='favorites'?'<button class="selection-save" data-save-list>Merkliste speichern</button>':`<button class="pink-button selection-continue" data-list-checkout="${type}">${type==='sample'?'Muster anfragen':'Angebot anfragen'}</button>`}</div>` : '';
    return `<section class="selection-card" aria-labelledby="selection-title-${type}"><header><h2 id="selection-title-${type}">${listIcon(type)}${labels[type]}</h2><span class="selection-count" aria-label="${items.length} Artikel">${items.length||''}</span></header>${items.length?`<ul class="selection-items">${rows}</ul>`:`<p class="selection-empty">${empty}</p>`}${footer}</section>`;
  }
  function renderLists(){
    const focused=document.activeElement;
    const focusData=focused?.closest('#selection-stack')?{...focused.dataset}:null;
    $('#selection-stack').innerHTML=['offer','sample','favorites'].map(renderCard).join('');
    // Restore focus after removing or adding an entry from a sticky card.
    if(focusData){const controls=$$('button',$('#selection-stack'));(controls.find(button=>Object.keys(focusData).every(key=>button.dataset[key]===focusData[key]))||controls[0])?.focus({preventScroll:true})}
    updateFavorites();
  }
  updateFavorites = function(){const n=lists.favorites.size;$('#favorites-count').textContent=n;$('#favorites-count').hidden=n===0};
  const baseRenderProducts=renderProducts;
  renderProducts=function(){
    baseRenderProducts();
    $$('.product-row').forEach(row=>{
      const id=Number(row.id.replace('article-','')),item=snapshot(id);
      const heart=$('[data-favorite]',row);
      if(heart){const saved=added('favorites',item);heart.classList.toggle('saved',saved);heart.setAttribute('aria-pressed',saved);heart.setAttribute('aria-label',`${saved?'Aus der Merkliste entfernen':'Auf der Merkliste speichern'}: ${item.name} · ${item.color}`)}
      $$('[data-request]',row).forEach(button=>{const active=added(button.dataset.request,item);button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',active);button.title=active?'Bereits auf der Liste':`${button.textContent.trim()} vormerken`});
    });
    renderLists();
  };
  function refresh(){
    state.favorites=new Set([...lists.favorites.values()].map(item=>item.id));
    renderProducts();
  }
  function add(type,item){
    if(!item || !lists[type])return;
    if(lists[type].has(item.key)){toast('Dieser Artikel ist bereits auf der Liste.');return}
    lists[type].set(item.key,{...item});refresh();
    toast(`${item.name} ${type==='favorites'?'auf der Merkliste gespeichert':type==='sample'?'zur Musterliste hinzugefügt':'zur Angebotsliste hinzugefügt'}.`);
  }
  function findEntry(key){return Object.values(lists).map(list=>list.get(key)).find(Boolean)}
  function showSelection(type){
    if($('#modal').open)closeModal();
    activateTab('variants');
    const card=$(`#selection-title-${type}`).closest('.selection-card');
    card.scrollIntoView({behavior:'smooth',block:'center'});
    card.tabIndex=-1;card.focus({preventScroll:true});
  }
  function checkout(type){
    const entries=[...lists[type].values()];if(!entries.length)return;
    // Keep the existing request form and its validation; summarize the saved variants.
    showRequest(type,entries.map(item=>item.id));
    $('#modal .request-summary').innerHTML=entries.map(item=>`<strong>${item.name}</strong> · ${escapeHTML(item.color)}`).join('<br>');
    const colorField=$('#request-form select[name="color"]').closest('label');
    colorField.innerHTML=`Ausgewählte Varianten<span class="selection-form-colors">${escapeHTML([...new Set(entries.map(item=>item.color))].join(', '))}</span>`;
  }
  document.addEventListener('click',event=>{
    const b=event.target.closest('button,a');if(!b)return;
    const handled=()=>{event.preventDefault();event.stopImmediatePropagation()};
    if(b.dataset.listAdd){handled();add(b.dataset.listAdd,findEntry(b.dataset.entry));return}
    if(b.dataset.listRemove){handled();lists[b.dataset.listRemove].delete(b.dataset.entry);refresh();return}
    if(b.dataset.listClear){handled();lists[b.dataset.listClear].clear();refresh();return}
    if(b.dataset.listCheckout){handled();checkout(b.dataset.listCheckout);return}
    if(b.hasAttribute('data-save-list')){handled();const content=JSON.stringify([...lists.favorites.values()],null,2);const url=URL.createObjectURL(new Blob([content],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='TEKU-Merkliste.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return}
    if(b.dataset.favorite!==undefined){handled();const item=snapshot(b.dataset.favorite);if(added('favorites',item)){lists.favorites.delete(item.key);refresh();toast('Artikel aus der Merkliste entfernt.')}else add('favorites',item);return}
    if(b.dataset.request){handled();add(b.dataset.request,snapshot(b.dataset.id));if($('#modal').open)closeModal();return}
    if(b.dataset.action==='favorites'){handled();showSelection('favorites');return}
  },true);
  document.addEventListener('submit',event=>{
    if(event.target.id!=='batch-form')return;
    event.preventDefault();event.stopImmediatePropagation();
    const form=event.target,ids=$$('input[name="article"]:checked',form).map(input=>Number(input.value));
    if(!ids.length){toast('Bitte wählen Sie mindestens einen Artikel.');return}
    ids.forEach(id=>{const item=snapshot(id);if(item)lists[form.dataset.type].set(item.key,item)});
    refresh();closeModal();showSelection(form.dataset.type);
  },true);
  renderProducts();
})();
