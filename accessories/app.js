'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format=n=>n===null||n===undefined?'Keine Angabe':Number(n).toLocaleString('de-DE',{maximumFractionDigits:2});
const products=ACCESSORY_DATA,productById=id=>products.find(p=>p.index===Number(id))||ACCESSORY_CATALOG.find(p=>p.index===Number(id));
const state={favorites:new Set(),expanded:{},filters:{},moreFilters:{},variant:{},current:0,view:0,tech:{},tab:'variants',filterCollapsed:false};
const iconPaths={heart:'<path d="M20.8 4.6c-2-2-5.1-1.7-6.8.3L12 7.2l-2-2.3C8.3 2.9 5.2 2.6 3.2 4.6c-2.1 2-1.9 5.3.1 7.4L12 21l8.7-9c2-2.1 2.2-5.4.1-7.4Z"/>',arrow:'<path d="m7 9 5 5 5-5"/>',check:'<path d="m4 12 5 5L20 6"/>',share:'<circle cx="18" cy="4" r="2.5"/><circle cx="5" cy="12" r="2.5"/><circle cx="18" cy="20" r="2.5"/><path d="m7 10 9-5m-9 9 9 5"/>'};
const svg=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name]||''}</svg>`;
const selectedVariant=p=>{const matches=v=>(!state.filters.category||v.category===state.filters.category)&&(!state.filters.color||v.color===state.filters.color);const chosen=p.variants[state.variant[p.index]];return chosen&&matches(chosen)?chosen:p.variants.find(matches)||p.variants[0]};
const productImage=p=>selectedVariant(p).image;
const value=(v,unit='')=>{
 if(v===null||v===undefined)return 'Keine Angabe';
 const raw=typeof v==='number'?format(v):String(v),shape=raw.match(/^([□Øø⌀])\s*/);
 const measure=shape?raw.slice(shape[0].length):raw;
 return `${escapeHTML(measure)}${unit?' '+unit:''}${shape?(shape[1]==='□'?' (quadratisch)':' (Durchmesser)'):''}`;
};
function toast(text){$('#toast').textContent=text;$('#toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').hidden=true,3200)}
function openModal(title,body){$('#modal-content').innerHTML=`<h2 id="modal-title">${escapeHTML(title)}</h2>${body}`;if(!$('#modal').open)$('#modal').showModal()}
function closeModal(){$('#modal').close()}
function updateFavorites(){const n=state.favorites.size;$('#favorites-count').textContent=n;$('#favorites-count').hidden=!n}
const config=window.ACCESSORY_CONFIG;
const filterGroups=[
 {key:'color',name:'FARBE',icon:'color',fields:[['color','Farbe','']]},
 {key:'category',name:'NACHHALTIGKEITSKATEGORIE',icon:'recycling',fields:[['category','Nachhaltigkeitskategorie','']]},
 ...config.fields.map(f=>({key:f.key,name:f.label.toLocaleUpperCase('de'),icon:f.icon,help:f.key==='hookDiameter'?'Der Hänger-Durchmesser bezeichnet den Durchmesser am oberen Aufhängehaken (Originalmaß in mm).':null,fields:[[f.key,f.label,f.unit]]}))
];
let measureUnit='cm';
function measure(raw,sourceUnit){if(raw===null||raw===undefined)return 'Keine Angabe';let n=Number(raw),unit=sourceUnit;if(measureUnit==='inch'){n/=sourceUnit==='l'?0.016387064:sourceUnit==='mm'?25.4:2.54;unit=sourceUnit==='l'?'in³':'inch';}else if(sourceUnit==='mm'){n/=10;unit='cm';}return format(n)+' '+unit;}
function measureContent(n,unit,stacked=false){const text=measure(n,unit);if(!stacked)return escapeHTML(text);const split=text.lastIndexOf(' ');return `<span class="measurement-number">${escapeHTML(text.slice(0,split))}</span><small class="measurement-unit">${escapeHTML(text.slice(split+1))}</small>`;}
function measureHTML(n,unit,stacked=false){return `<span ${stacked?'class="measurement-value"':''} data-accessory-measure="${n}" data-source-unit="${unit}">${measureContent(n,unit,stacked)}</span>`;}
function refreshUnits(){document.querySelectorAll('[data-accessory-measure]').forEach(n=>n.innerHTML=measureContent(Number(n.dataset.accessoryMeasure),n.dataset.sourceUnit,n.classList.contains('measurement-value')));document.querySelectorAll('[data-accessory-unit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.accessoryUnit===measureUnit)));}
function fieldValues(key){return [...new Set(['category','color'].includes(key)?products.flatMap(p=>p.variants.map(v=>v[key])):products.map(p=>p[key]).filter(v=>v!==null&&v!==undefined))].sort((a,b)=>typeof a==='number'?a-b:String(a).localeCompare(String(b),'de',{numeric:true}))}
function filterIcon(g){return g.icon==='recycling'?'../assets/filter-recycling.svg':g.icon==='color'?'../assets/filter-color.svg':g.icon}
function renderFilters(){
 const hasMeasures=config.fields.length>0;
 const unitFilter=`<section class="filter-section" id="filter-unit"><h2 id="unit-heading"><img class="filter-symbol" src="../assets/filter-unit.svg" alt="">MAẞEINHEIT</h2><div class="measurement-toggle" role="group" aria-labelledby="unit-heading">${['cm','inch'].map(u=>`<button data-accessory-unit="${u}" aria-pressed="${u===measureUnit}">${u}</button>`).join('')}</div></section>`;
 $('#filter-body').innerHTML=(hasMeasures?unitFilter:'')+filterGroups.map(g=>`<section class="filter-section" id="filter-${g.key}"><h2><img class="filter-symbol bp-filter-icon" src="${filterIcon(g)}" alt="">${g.name}</h2>${g.help?`<p class="filter-help">${g.help}</p>`:''}${g.fields.map(([key,label,unit])=>{
  const values=fieldValues(key),limit=8,expanded=!!state.moreFilters[key];
  const visible=expanded?values:values.filter((v,i)=>i<limit||String(state.filters[key])===String(v));
  return `<fieldset class="bp-filter-field"><legend>${label}${unit&&!config.standalonePackaging?' ('+unit+')':''}</legend><div class="bp-filter-values ${key==='category'?'bp-filter-categories':''}">${visible.map(v=>{const active=String(state.filters[key])===String(v);return `<button class="bp-filter-value ${active?'active':''}" data-bp-filter="${key}" data-bp-value="${escapeHTML(v)}" aria-pressed="${active}">${unit?measureHTML(v,unit):value(v)}</button>`}).join('')}</div>${values.length>limit?`<button class="bp-filter-more" data-more-filter="${key}" aria-expanded="${expanded}">${expanded?'weniger Größen anzeigen':'weitere Größen laden'}</button>`:''}</fieldset>`
 }).join('')}</section>`).join('');
 const compactUnit='<button class="compact-unit" data-filter-group="unit" aria-label="Maßeinheit: Filter aufklappen" title="Maßeinheit" ><img src="../assets/filter-unit.svg" alt=""></button>';
 $('#compact-filters').innerHTML=(hasMeasures?compactUnit:'')+filterGroups.map(g=>{const active=g.fields.some(([key])=>state.filters[key]!==undefined);return `<button class="${active?'filter-active':''}" data-filter-group="${g.key}" title="${g.name}${active?' – Filter aktiv':''}" aria-label="${g.name}: Filter aufklappen${active?' – Filter aktiv':''}"><img src="${filterIcon(g)}" alt=""></button>`}).join('');
}
function filteredProducts(){return products.filter(p=>p.variants.some(v=>(!state.filters.color||v.color===state.filters.color)&&(!state.filters.category||v.category===state.filters.category))&&Object.entries(state.filters).every(([key,v])=>['category','color'].includes(key)||String(p[key])===String(v)));}
function setCollapsed(collapsed){state.filterCollapsed=collapsed;$('.catalog').classList.toggle('filters-collapsed',collapsed);$('.filters').classList.toggle('collapsed',collapsed);$('#filter-body').hidden=collapsed;$('#compact-filters').hidden=!collapsed;const b=$('#collapse-filter');b.classList.toggle('is-collapsed',collapsed);b.setAttribute('aria-expanded',!collapsed);b.setAttribute('aria-label',collapsed?'Filter aufklappen':'Filter einklappen');b.querySelector('span').textContent=collapsed?'aufklappen':'einklappen'}
function measureTable(p){return TEKUTechnical.table(config.fields.map(f=>[f.label+(f.key==='hookDiameter'?' <button class="info-button" data-hook-help aria-label="Hänger-Durchmesser erklären">i</button>':''),measureHTML(p[f.key],f.unit)]));}
function packagingTable(p){
 return TEKUTechnical.table(Object.entries(p.packaging).map(([label,n])=>[label,value(n)]));
}
function technical(p){const tab=state.tech[p.index]||'measures';const tabs=TEKUTechnical.tabs(p.index,tab);const body=tab==='packaging'?packagingTable(p):tab==='calculator'?`<section class="space-launcher"><h3>Wie viele ${config.label} passen auf Ihre Fläche?</h3><p>Berechnen Sie die Stellfläche mit dem Durchmesser von ${escapeHTML(p.name)}.</p><button class="pink-button" data-accessory-calculator="${p.index}">Stellflächenrechner öffnen</button></section>`:measureTable(p);return `<div class="technical-panel"><figure class="technical-figure"><button data-zoom="${p.index}"><img src="${productImage(p)}" alt="${escapeHTML(p.name)}"></button></figure><div class="technical-content">${config.label==='Hänger'?tabs.replace(/<button role="tab"[^>]*data-tech-tab="calculator".*?<\/button>/,''):tabs}<div role="tabpanel" id="tech-panel-${p.index}" aria-labelledby="tech-${p.index}-${tab}">${body}</div></div></div>`;}
function fittingCard(item, inCarousel){
 const {name,image,href,via,demo}=item;
 const id=ACCESSORY_CATALOG.find(p=>p.name===name)?.index;
 const product=(image?`<img src="${escapeHTML(image)}" alt="${escapeHTML(name)} · Serienansicht" loading="lazy">`:'<span class="product-no-photo">Keine Abbildung hinterlegt</span>')+`<strong>${escapeHTML(name)}</strong>`;
 return `<article class="accessory-product-tile${inCarousel?' tray-tile':''}">
   ${href?`<a class="accessory-product-link" href="${escapeHTML(href)}" ${href.startsWith('http')?'target="_blank" rel="noopener"':''}>${product}</a>`:product}
   ${via?`<small>Für ${escapeHTML(via)}</small>`:''}
   ${demo?'<small>Demo-Zuordnung</small>':''}
   ${id!==undefined?`<div class="accessory-product-actions"><button data-request="sample" data-id="${id}">Muster anfordern</button><button data-request="offer" data-id="${id}">Angebot anfordern</button></div>`:''}
 </article>`;
}
function fittingCards(items,title){
 if(!items.length)return '';
 const heading=`<h3>${escapeHTML(title)}</h3>`;
 const inCarousel=items.length>3;
 const cards=items.map(item=>fittingCard(item,inCarousel)).join('');
 if(!inCarousel)return `<section>${heading}<div class="accessory-product-grid">${cards}</div></section>`;
 const arrow=(step,label,path)=>`<button class="tray-carousel-arrow" data-carousel-step="${step}" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg></button>`;
 return `<section class="tray-carousel">${heading}
   <div class="tray-carousel-stage">
     ${arrow(-1,'Vorheriges Produkt','m14 5-7 7 7 7')}
     <div class="tray-carousel-track" tabindex="0" aria-label="${escapeHTML(title)}">${cards}</div>
     ${arrow(1,'Nächstes Produkt','m10 5 7 7-7 7')}
   </div>
   <div class="tray-carousel-progress" role="progressbar" aria-label="Weitere passende Produkte" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>
 </section>`;
}
function accessories(p){
 const kind=config.label;
 return `<div class="accessory-cross-selling">
   ${fittingCards(p.fitting,kind==='Ampeln'?'Passende Hänger':'Passende Ampeln')}
   ${kind==='Ampeln'&&!p.fitting.length?'<p>Für diesen Artikel ist keine Hängerzuordnung hinterlegt.</p>':''}
   ${kind==='Ampeln'?'<section class="accessory-context"><h3>Untersetzer</h3><p>Für MAO ist keine MUK-Zuordnung belegt. MUK-Untersetzer sind für MAK-Ampeln aufgeführt.</p><a class="outline-button" href="../muk/?version=v1">Untersetzer ansehen</a></section>':''}
   ${kind==='Untersetzer'?fittingCards(p.relatedHangers||[],'Passende Hänger'):''}
   ${kind==='Hänger'?fittingCards(p.relatedSaucers||[],'Passende Untersetzer')||'<section class="accessory-context"><h3>Passende Untersetzer</h3><p>Für die zugeordneten Gefäße ist kein MUK-Untersetzer belegt.</p></section>':''}
 </div>`;
}
function renderDetail(p,type){
 if(type==='technical')return technical(p);
 if(type==='packaging')return `<h3>Verpackungsdaten · ${escapeHTML(p.name)}</h3>${packagingTable(p)}`;
 if(type==='fitting')return config.fittingTitle?fittingCards(p.fitting,config.fittingTitle):accessories(p);
 const selected=selectedVariant(p);
 return `<h3>Varianten · ${escapeHTML(p.name)}</h3><div class="accessory-variant-grid">${p.variants.map((v,i)=>`<article class="accessory-variant">
   <button class="variant-tile" data-variant="${i}" data-id="${p.index}" aria-pressed="${selected===v}"><img src="${v.image}" alt="${escapeHTML(v.color)}" loading="lazy"><strong>${escapeHTML(v.category)}</strong><small>${escapeHTML(v.color)}</small><small>Bestell-Nr. ${escapeHTML(v.orderNo)}</small></button>
   <button class="variant-favorite row-favorite" data-favorite="${p.index}" data-variant-index="${i}" aria-label="${escapeHTML(p.name+' · '+v.color)} merken">${svg('heart')}</button>
   ${v.certificates.length?`<div class="accessory-certificates">${v.certificates.map(c=>`<img src="${c.image}" alt="${escapeHTML(c.label)}" loading="lazy">`).join('')}</div>`:''}
 </article>`).join('')}</div>`;
}
function rowSections(p, expanded){
 const fittingTitle=config.fittingTitle||(config.label==='Ampeln'?'Passendes Zubehör':'Passende Produkte');
 const sections=config.standalonePackaging?[
  ['variants','Varianten','accessories/assets/700239-farbvarianten-pikto.svg'],
  ['fitting',fittingTitle,'assets/tray-konfigurator-pikto.svg'],
  ['packaging','Verpackungsdaten'],
 ]:[['technical','Technische Daten'],['variants','Varianten'],['fitting',fittingTitle]];
 return sections.map(([type,label,icon])=>`<button class="row-section-toggle" data-expand="${type}" data-id="${p.index}" aria-expanded="${expanded===type}" aria-controls="row-detail-${p.index}">
  ${icon?`<img class="accessory-section-icon" src="../${icon}" alt="">`:''}<strong>${type==='packaging'?'Verpackungs<wbr>daten':escapeHTML(label)}</strong><span>${svg('arrow')}</span>
 </button>`).join('');
}
function renderRow(p){
 const expanded=state.expanded[p.index];
 const measures=config.fields.map(f=>`<div class="metric" aria-label="${escapeHTML(f.label)}">
  <img src="${f.icon}" alt="${escapeHTML(f.label)}">${measureHTML(p[f.key],f.unit,true)}
  ${f.key==='hookDiameter'?'<button class="info-button" data-hook-help aria-label="Hänger-Durchmesser erklären">i</button>':''}
 </div>`).join('');
 return `<article class="product-row refreshed-row bp-row" id="article-${p.index}">
  <div class="row-main">
   <button class="product-photo" data-product="${p.index}" aria-label="${escapeHTML(p.name)} in der Produktansicht anzeigen"><img src="${productImage(p)}" alt="${escapeHTML(p.name)}" loading="lazy"></button>
   <div class="row-product-summary">
    <button class="product-title-button" data-product="${p.index}">${escapeHTML(p.name)}</button>
    ${measures?`<div class="row-specs" style="--sku-measure-count:${config.fields.length}">${measures}</div>`:''}
   </div>
   ${rowSections(p,expanded)}
   <div class="row-requests"><button data-request="sample" data-id="${p.index}">Muster anfordern</button><button data-request="offer" data-id="${p.index}">Angebot anfordern</button></div>
   <button class="row-favorite" data-favorite="${p.index}" aria-label="${escapeHTML(p.name)} merken">${svg('heart')}</button>
  </div>
  ${p.note?`<p class="row-note">${escapeHTML(p.note)}</p>`:''}
  <div class="row-detail" id="row-detail-${p.index}" ${expanded?'':'hidden'}>
   ${expanded?`<button class="close-row-detail" data-expand="${expanded}" data-id="${p.index}" aria-label="Detailbereich schließen">×</button>`+renderDetail(p,expanded):''}
  </div>
 </article>`;
}
function renderProducts(){const matching=filteredProducts();$('#result-status').textContent=`${matching.length} von ${products.length} Artikeln`;$('#results').innerHTML=matching.length?matching.map(renderRow).join(''):'<div class="empty-state"><h2>Keine passenden Artikel</h2><p>Bitte passen Sie die Filter an oder setzen Sie sie zurück.</p><button class="pink-button" data-reset>Filter zurücksetzen</button></div>';renderFilters();updateFavorites()}
function updateGallery(){
 const p=productById(state.current);
 const variant=selectedVariant(p);
 $('#main-image').src=variant.image;
 $('#main-image').alt=p.name;
 $('#front-thumbnail').src=variant.image;
 const measures=config.fields.map(f=>`<p><img src="${f.icon}" alt=""><span>${escapeHTML(f.label)}<strong>${measureHTML(p[f.key],f.unit)}</strong></span></p>`).join('');
 const lead=config.standalonePackaging?config.benefits[0]:null;
 $('#hero-info').innerHTML=`<h2>${escapeHTML(p.name)}</h2>
  ${measures?`<div class="accessory-hero-specs">${measures}</div>`:''}
  <p>${escapeHTML(lead?variant.color:variant.category+' · '+variant.color)}</p>
  ${lead?`<p>${escapeHTML(lead.text)}</p>`:''}
  ${config.benefits.length?'<button class="bp-all-benefits" data-tab="benefits">Alle Vorteile entdecken</button>':''}`;
}
function showGalleryModal(){const p=productById(state.current);openModal(p.name,`<img class="modal-image" src="${productImage(p)}" alt="${escapeHTML(p.name+' · '+selectedVariant(p).color)}">`)}
function showRequest(){toast('Bitte wählen Sie Artikel über Ihre Listen aus.')}
function activateTab(tab){state.tab=tab;['variants','benefits','downloads'].forEach(key=>$(`#${key}-panel`).hidden=key!==tab);$$('.tabs [data-tab]').forEach(b=>{b.setAttribute('aria-selected',b.dataset.tab===tab);b.tabIndex=b.dataset.tab===tab?0:-1})}
document.addEventListener('click',event=>{const b=event.target.closest('button,a');if(!b)return;
 if(b.hasAttribute('data-accessory-unit')){measureUnit=b.dataset.accessoryUnit;refreshUnits();return}
 if(b.hasAttribute('data-hook-help')){openModal('Hänger-Durchmesser','<p>Der Durchmesser am oberen Aufhängehaken beschreibt die für die Aufhängung relevante Öffnung. Das Originalmaß beträgt je nach Artikel 35 oder 38 mm.</p><img class="hook-pictogram" src="../accessories/assets/700237-haenger-druchbesser-pikto.svg" alt="Durchmesser am Aufhängehaken in Millimetern">');return}
 if(b.hasAttribute('data-accessory-calculator')){const p=productById(b.dataset.accessoryCalculator);TEKUSpaceCalculator.open({diameter:p.diameter,productName:p.name,trigger:b});return}
 if(b.hasAttribute('data-bp-value')){const key=b.dataset.bpFilter,v=fieldValues(key).find(v=>String(v)===b.dataset.bpValue);if(String(state.filters[key])===String(v))delete state.filters[key];else state.filters[key]=v;renderProducts();$(`[data-bp-filter="${key}"][data-bp-value="${CSS.escape(String(v))}"]`)?.focus({preventScroll:true});return}
 if(b.dataset.moreFilter){const key=b.dataset.moreFilter;state.moreFilters[key]=!state.moreFilters[key];renderFilters();$(`[data-more-filter="${key}"]`).focus({preventScroll:true});return}
 if(b.dataset.stCalculator!==undefined){const p=productById(b.dataset.stCalculator);TEKUSpaceCalculator.open({kind:'rectangle',itemLength:p.length,itemWidth:p.width,plants:p.pots,productKind:'Trays',contentLabel:'Töpfe',productName:p.name,trigger:b});return}
 if(b.dataset.techTab){state.tech[b.dataset.id]=b.dataset.techTab;renderProducts();return}
 if(b.dataset.expand){const id=b.dataset.id;state.expanded[id]=state.expanded[id]===b.dataset.expand?null:b.dataset.expand;renderProducts();return}
 if(b.hasAttribute('data-reset')){state.filters={};renderProducts();return}
 if(b.id==='collapse-filter'){setCollapsed(!state.filterCollapsed);return}
 if(b.dataset.filterGroup){setCollapsed(false);const g=$(`#filter-${b.dataset.filterGroup}`);g.scrollIntoView({behavior:'smooth',block:'center'});g.querySelector('[data-bp-value],[data-accessory-unit]')?.focus({preventScroll:true});return}
 if(b.dataset.product!==undefined){state.current=Number(b.dataset.product);state.view=0;updateGallery();$('#top').scrollIntoView({behavior:'smooth'});return}
 if(b.dataset.variant!==undefined){state.variant[b.dataset.id]=Number(b.dataset.variant);state.current=Number(b.dataset.id);state.view=0;renderProducts();updateGallery();return}
 if(b.dataset.floor!==undefined||b.dataset.zoom!==undefined){state.current=Number(b.dataset.floor??b.dataset.zoom);state.view=b.dataset.floor!==undefined?1:0;updateGallery();showGalleryModal();return}
 if(b.dataset.view!==undefined||b.dataset.modalView!==undefined){state.view=Number(b.dataset.view??b.dataset.modalView);updateGallery();if(b.dataset.modalView!==undefined||state.view===1)showGalleryModal();return}
 if(b.dataset.galleryStep!==undefined){state.view=productById(state.current).floor?1-state.view:0;updateGallery();if($('#modal').open)showGalleryModal();return}
 if(b.dataset.fitting!==undefined){const p=productById(b.dataset.id),x=p.fitting[Number(b.dataset.fitting)];openModal(x.name,`<img class="modal-image" src="${x.image}" alt="${x.name}"><p>Passende Aushebeplatte für ${p.name}.</p>`);return}
 if(b.dataset.tab){activateTab(b.dataset.tab);return}
 if(b.classList.contains('close-modal')||b.dataset.action==='close'){closeModal();return}
 if(b.dataset.action==='zoom'){showGalleryModal();return}
 if(b.dataset.action==='contact'){openModal('TEKU Beratung','<p><a href="tel:+4944429821626">+49 4442 982-1626</a></p><p><a href="mailto:teku@poeppelmann.com">teku@poeppelmann.com</a></p>');return}
 if(b.dataset.action==='menu'){openModal('TEKU · '+config.label,'<nav class="modal-links"><a href="#top" data-action="close">Produktansicht</a><a href="../?version=v12">Rundtöpfe VCG</a><a href="../bp/?version=v6">Anzuchtpaletten BP</a><a href="https://www.poeppelmann.com/de/teku" target="_blank" rel="noopener">TEKU Website</a></nav>');return}
 if(b.dataset.action==='language'){openModal('Sprache','<p>Der Entwurf ist auf Deutsch verfügbar.</p>');return}
 if(b.dataset.action==='search'){openModal(config.label+' · Artikelsuche','<label class="form-field">Artikel suchen<input type="search" id="bp-search" placeholder="Artikelbezeichnung"></label><div id="bp-search-results"></div>');$('#bp-search').focus();return}
 if(b.dataset.searchResult!==undefined){state.filters={};renderProducts();closeModal();$(`#article-${b.dataset.searchResult}`).scrollIntoView({behavior:'smooth'});return}
});
document.addEventListener('input',event=>{if(event.target.id==='bp-search')$('#bp-search-results').innerHTML=products.filter(p=>p.name.toLowerCase().includes(event.target.value.toLowerCase())).map(p=>`<button class="search-result" data-search-result="${p.index}">${p.name}</button>`).join('')||'<p>Keine passenden Artikel</p>'});
document.addEventListener('submit',event=>{if(event.target.id==='request-form'){event.preventDefault();if(event.target.reportValidity())openModal('Anfrage im Dummy abgeschlossen','<p>Der Ablauf wurde erfolgreich durchgespielt. Es wurde keine Anfrage versendet.</p><button class="pink-button" data-action="close">Zurück zur Produktseite</button>')}});
$('.tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=$$('.tabs [data-tab]').filter(b=>!b.hidden),i=tabs.indexOf(document.activeElement),n=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length;activateTab(tabs[n].dataset.tab);tabs[n].focus()});
$('#modal').addEventListener('keydown',e=>{if(!$('.bp-gallery-modal',$('#modal'))||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();$('[data-gallery-step="1"]',$('#modal')).click()});
renderFilters();renderProducts();updateGallery();
const deepLink=location.hash.match(/^#article-(\d+)$/);if(deepLink&&productById(deepLink[1]))requestAnimationFrame(()=>$(`#article-${deepLink[1]}`).scrollIntoView());
