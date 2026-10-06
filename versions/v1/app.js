'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format = n => n.toLocaleString('de-DE', {maximumFractionDigits:2});
const imagePath = file => 'assets/' + file;
const colors = [
  {id:'ton',name:'Circular ton/grau',hex:'#b77746',file:'vcg-circular-ton-grau-pr.png'},
  {id:'taupe',name:'Circular taupe/grau',hex:'#a49a85',file:'vcg-circular-taupe-grau-pr.png'},
  {id:'weiss',name:'Circular weiß/grau',hex:'#e3e1d9',file:'vcg-circular-weiss-grau-pr.png'},
  {id:'blau',name:'Circular ultramarin/grau',hex:'#315576',file:'vcg-circular-ultramarinblau-grau-pr.png'},
  {id:'brombeer',name:'Circular brombeer/grau',hex:'#673761',file:'vcg-circular-brombeer-grau-pr.png'},
  {id:'lavendel',name:'Circular lavendel/grau',hex:'#81708c',file:'vcg-circular-lavendel-grau-pr.png'},
  {id:'pink',name:'Circular pink/grau',hex:'#d15d9a',file:'vcg-circular-pink-grau-pr.png'},
  {id:'orange',name:'Circular orange/grau',hex:'#de832f',file:'vcg-circular-orange-grau-pr.png'},
  {id:'gelb',name:'Circular gelb/grau',hex:'#d5ba31',file:'vcg-circular-gelb-grau-pr.png'},
  {id:'hellgruen',name:'Circular hellgrün/grau',hex:'#99b775',file:null},
  {id:'gruen',name:'Circular grün/grau',hex:'#305141',file:'vcg-circular-gruen-grau-pr.png'},
  {id:'rot',name:'Circular rot/grau',hex:'#a92537',file:'vcg-circular-rot-grau-pr.png'},
  {id:'grau',name:'Baseline grau',hex:'#777876',file:'vcg-baseline-grau-pr.png'},
  {id:'anthrazit',name:'Baseline anthrazit',hex:'#474948',file:null},
  {id:'transparent',name:'Recyclable transparent',hex:'#ececec',file:null}
];
const volumes = [{id:'small',label:'0 l – 0,49 l',min:0,max:.49},{id:'medium',label:'0,5 l – 0,99 l',min:.5,max:.99},{id:'one',label:'1 l – 1,99 l',min:1,max:1.99},{id:'large',label:'2 l – 5 l',min:2,max:5},{id:'extra',label:'> 5 l',min:5.01,max:Infinity}];
const state = {color:null,previewColor:'ton',volume:'medium',diameter:null,angle:null,categories:new Set(),process:new Set(['Tiefgezogen']),expanded:{},favorites:new Set(),current:3,view:0,tab:'variants',moreSizes:false,filterCollapsed:false};
const order = [3,4,5,6,13,0,1,2,12,7,8,9,10,11];
const products = order.map(i => PRODUCT_DATA[i]);
const productById = i => PRODUCT_DATA.find(p => p.index === Number(i));
const colorById = id => colors.find(c => c.id === id);
const svg = name => {
  const paths = {
    heart:'<path d="M20.8 4.6c-2-2-5.1-1.7-6.8.3L12 7.2l-2-2.3C8.3 2.9 5.2 2.6 3.2 4.6c-2.1 2-1.9 5.3.1 7.4L12 21l8.7-9c2-2.1 2.2-5.4.1-7.4Z"/>',
    share:'<circle cx="18" cy="4" r="2.5"/><circle cx="5" cy="12" r="2.5"/><circle cx="18" cy="20" r="2.5"/><path d="m7 10 9-5m-9 9 9 5"/>',
    calculator:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h1m6 0h1m-8 4h1m6 0h1m-8 4h1m6 0h1"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    arrow:'<path d="m7 9 5 5 5-5"/>',
    download:'<path d="M12 2v13m-5-5 5 5 5-5M4 16v5h16v-5"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||''}</svg>`;
};
const selectedVariant = p => p.variants.find(v => v.color === colorById(state.color || state.previewColor)?.name) || p.variants.find(v=>v.color==='Circular ton/grau') || p.variants[0];
const productImage = p => selectedVariant(p)?.image || imagePath('vcg-circular-ton-grau-pr.png');
function toast(message){$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').hidden=true,3500)}
function openModal(title, body){$('#modal-content').innerHTML=`<h2 id="modal-title">${escapeHTML(title)}</h2>${body}`;const modal=$('#modal');if(!modal.open)modal.showModal()}
function closeModal(){$('#modal').close()}
function renderFilters(){
  $('#colors').innerHTML=colors.map(c=>`<button class="swatch-button ${state.color===c.id?'active':''}" data-color="${c.id}" data-unavailable="${!c.file}" aria-label="${escapeHTML(c.name)}${!c.file?' – keine VCG-Variante auf der aktuellen Produktseite':''}" aria-pressed="${state.color===c.id}" title="${escapeHTML(c.name)}"><span class="swatch" style="--swatch:${c.hex}"></span><span class="swatch-label">${escapeHTML(c.name).replace(' ','<br>')}</span></button>`).join('');
  const allDiameters=[5,5.5,6,7,8,8.5,9,9.5,10,10.5,11,12,13,14,15,17,19];
  $('#diameters').innerHTML=allDiameters.slice(0,state.moreSizes?undefined:12).map(d=>`<button class="${state.diameter===d?'active':''}" aria-pressed="${state.diameter===d}" data-diameter="${d}">${format(d)} cm</button>`).join('')+`<button class="more-sizes" style="grid-column:1/-1;border:0" data-action="more-sizes" aria-expanded="${state.moreSizes}">${state.moreSizes?'⌃ weniger Größen anzeigen':'⌄ weitere Größen laden'}</button>`;
  $('#volumes').innerHTML=volumes.map(v=>`<button class="${state.volume===v.id?'active':''}" aria-pressed="${state.volume===v.id}" data-volume="${v.id}">${v.label}</button>`).join('');
  $('#angles').innerHTML=[4,4.5,4.75,5,6,8].map(d=>`<button class="${state.angle===d?'active':''}" aria-pressed="${state.angle===d}" data-angle="${d}">${format(d)}°</button>`).join('');
  $$('input[name="category"]').forEach(i=>i.checked=state.categories.has(i.value));
  $$('input[name="process"]').forEach(i=>i.checked=state.process.has(i.value));
}
function compatible(p){
  if(state.process.size && !state.process.has('Tiefgezogen'))return false;
  if(state.angle!==null && state.angle!==5)return false;
  if(state.color && !p.variants.some(v=>v.color===colorById(state.color).name))return false;
  if(state.categories.size && !p.variants.some(v=>state.categories.has(v.category)&&(!state.color||v.color===colorById(state.color).name)))return false;
  return true;
}
function fitsSize(p){
  const range=volumes.find(v=>v.id===state.volume);
  return (state.diameter===null||p.diameter===state.diameter)&&(!range||(p.volume>=range.min&&p.volume<=range.max));
}
function filteredProducts(){return products.filter(p=>compatible(p)&&fitsSize(p))}
function renderRow(p){
  const expanded=state.expanded[p.index];
  const saved=state.favorites.has(p.index);
  return `<article class="product-row ${p.name==='VCG 12 D'?'special':''}" id="article-${p.index}">
    ${p.name==='VCG 12 D'?'<span class="special-badge">SOILSOLUTION</span>':''}
    <div class="row-main">
      <button class="product-photo" data-product="${p.index}" aria-label="${p.name} in der Produktansicht anzeigen"><img src="${productImage(p)}" alt="${p.name}, ${escapeHTML(selectedVariant(p)?.color)}" loading="lazy"></button>
      <div><button class="product-title-button" data-product="${p.index}">${p.name}</button><div class="row-specs">
        <div class="metric" aria-label="Durchmesser ${format(p.diameter)} Zentimeter"><img src="assets/rundtopf-breite-pikto.svg" alt="Durchmesser">${format(p.diameter)}</div>
        <div class="metric" aria-label="Höhe ${format(p.height)} Zentimeter"><img src="assets/rundtopf-hoehe-pikto.svg" alt="Höhe">${format(p.height)}</div>
        <div class="metric"><img src="assets/rundtopf-vol-pikto.svg" alt="Volumen">${format(p.volume)} l</div>
      </div></div>
      <button class="detail-toggle" data-expand="variants" data-id="${p.index}" aria-expanded="${expanded==='variants'}" aria-controls="row-detail-${p.index}" aria-label="Farbvarianten von ${p.name}"><span class="recycle-icon">♻</span><span>Details ${expanded==='variants'?'⌃':'⌄'}</span></button>
      <button class="detail-toggle" data-expand="trays" data-id="${p.index}" aria-expanded="${expanded==='trays'}" aria-controls="row-detail-${p.index}" aria-label="Passende Trays für ${p.name}"><img src="assets/tray-konfigurator-pikto.svg" alt=""><span>anzeigen ${expanded==='trays'?'⌃':'⌄'}</span></button>
      <button class="detail-toggle pack-toggle" data-expand="packaging" data-id="${p.index}" aria-expanded="${expanded==='packaging'}" aria-controls="row-detail-${p.index}"><span class="pack-label">Verpackungs-<br>daten</span><span>anzeigen ${expanded==='packaging'?'⌃':'⌄'}</span></button>
      <div class="split-buttons"><button data-request="sample" data-id="${p.index}">Muster</button><button data-request="offer" data-id="${p.index}">Angebot</button></div>
      <div class="row-icons"><button data-share="${p.index}" aria-label="${p.name} empfehlen">${svg('share')}</button><button data-calculator="${p.index}" aria-label="Stellflächenrechner für ${p.name}">${svg('calculator')}</button><button data-favorite="${p.index}" class="${saved?'saved':''}" aria-label="${saved?'Vom Merkzettel entfernen':'Auf den Merkzettel setzen'}: ${p.name}" aria-pressed="${saved}">${svg('heart')}</button></div>
    </div>
    ${/ K$/.test(p.name)?'<p class="row-note">K: Etikettierungsprägung</p>':/ D$/.test(p.name)?'<p class="row-note">D: Niedrige Ausführung</p>':''}
    <div class="row-detail" id="row-detail-${p.index}" ${expanded?'':'hidden'}>${expanded?renderDetail(p,expanded):''}</div>
  </article>`;
}
function renderDetail(p,type){
  if(type==='variants')return `<h3>Farben und Nachhaltigkeitskategorien · ${p.name}</h3><div class="variant-grid">${p.variants.map((v,i)=>`<button class="variant-tile ${selectedVariant(p)===v?'active':''}" data-variant="${i}" data-id="${p.index}"><img src="${v.image}" alt="${escapeHTML(v.color)}" loading="lazy"><span>${escapeHTML(v.category)}</span><small>${escapeHTML(v.color)}</small></button>`).join('')}</div>`;
  if(type==='trays')return `<h3>Passende Trays · ${p.name}</h3>${p.trays.length?`<div class="tray-grid">${p.trays.map((t,i)=>`<button class="tray-tile" data-tray="${i}" data-id="${p.index}"><img src="${t.image}" alt="" loading="lazy">${escapeHTML(t.name)}</button>`).join('')}</div>`:'<p>Für diesen Artikel sind auf der aktuellen Produktseite keine passenden Trays angegeben.</p>'}`;
  return `<h3>Verpackungsdaten · ${p.name}</h3><table class="packaging-table"><tbody>${['Töpfe pro Karton','Kartons pro Palette','Töpfe unterverpackt auf Palette','Töpfe lose auf Palette'].map((label,i)=>`<tr><th scope="row">${label}</th><td>${escapeHTML(p.packaging[i]||'Keine Angabe')}</td></tr>`).join('')}</tbody></table>`;
}
function batchButtons(){return '<div class="batch-actions"><button class="pink-button" data-batch="offer">UNVERBINDLICHES ANGEBOT</button><button class="pink-button" data-batch="sample">KOSTENLOSES MUSTER</button><button class="pink-button" data-batch="share">EMPFEHLEN</button></div>'}
function renderProducts(){
  const matching=filteredProducts();
  const other=products.filter(p=>compatible(p)&&!fitsSize(p));
  $('#result-status').textContent=`${matching.length} passende Artikel, ${other.length} weitere Artikel.`;
  $('#results').innerHTML=matching.length?matching.map(renderRow).join('')+batchButtons():`<div class="empty-state"><h2>Keine passenden Artikel</h2><p>${state.color&&!colorById(state.color).file?'Diese Farbe ist im XD-Entwurf enthalten, auf der aktuellen VCG-Produktseite aber nicht verfügbar.':'Für diese Filterkombination ist auf der aktuellen Produktseite kein VCG-Artikel verfügbar.'}</p><button class="pink-button" data-action="reset">Filter zurücksetzen</button></div>`;
  $('#additional-results').innerHTML=other.length?`<section aria-label="Weitere Artikel der Serie mit anderen Abmessungen" class="secondary-products"><span class="secondary-label">Weitere Artikel der Serie</span>${other.map(renderRow).join('')}</section>`:'';
  updateFavorites();
}
function showHeroInfo(p){
  $('#hero-info').innerHTML=`<h2>${p.name}</h2><div class="spec-line"><div><span>${format(p.diameter)} cm</span><small>Durchmesser</small></div><div><span>${format(p.height)} cm</span><small>Höhe</small></div><div><span>${format(p.volume)} l</span><small>Volumen</small></div></div><p>${escapeHTML(selectedVariant(p)?.color||'')}</p><p class="small-note">Multilochprofilboden für ideale Be- und Entwässerung.</p>`;
}
function selectProduct(id,scroll=true){
  const p=productById(id);if(!p)return;
  state.current=p.index;
  const v=selectedVariant(p);state.previewColor=colors.find(c=>c.name===v?.color)?.id||'ton';state.view=0;
  updateGallery();showHeroInfo(p);
  if(scroll)$('#top').scrollIntoView({behavior:'smooth'});
}
function updateGallery(){
  const c=colorById(state.previewColor);
  const p=productById(state.current);
  const active=state.view===0?(state.color&&!colorById(state.color).file?colorById(state.color):c):null;
  const noImage=state.view===0&&!active?.file;
  $('#main-image').hidden=noImage;$('#image-unavailable').hidden=!noImage;
  $('#image-unavailable').textContent=noImage?`${active?.name||''}: Für diese Farbe liegt auf der aktuellen VCG-Produktseite keine Produktabbildung vor.`:'';
  if(!noImage){$('#main-image').src=state.view===0?selectedVariant(p)?.image||imagePath(c.file):imagePath(state.view===1?'vcg-slide2.png':'vcg-slide3.png');$('#main-image').alt=state.view===0?`${p.name}, ${selectedVariant(p)?.color||c.name}`:`${state.view===1?'Multilochprofilboden':'Kronenrand'} · Detailabbildung in Circular ton/grau`}
  $('#front-thumbnail').src=active?.file?imagePath(active.file):imagePath(c.file||'vcg-circular-ton-grau-pr.png');
  $$('.thumbnail').forEach((b,i)=>{b.classList.toggle('active',i===state.view);b.setAttribute('aria-pressed',i===state.view)});
  $('#gallery-progress-bar').style.transform=`translateX(${state.view*100}%)`;
}
function chooseColor(id){
  if(!colorById(id))throw new Error('Unbekannte Farbe');
  state.color=state.color===id?null:id;
  if(colorById(id).file)state.previewColor=id;
  state.view=0;
  const match=filteredProducts()[0]||products.find(p=>compatible(p));
  if(match)state.current=match.index;
  renderFilters();renderProducts();updateGallery();
  if($('#hero-info').innerHTML){
    if(match)showHeroInfo(match);
    else $('#hero-info').innerHTML='<h2>Keine VCG-Variante verfügbar</h2><p>Bitte wählen Sie eine andere Farbe oder setzen Sie die Filter zurück.</p>';
  }
  if(!colorById(id).file&&state.color)toast('Für diese Farbe ist aktuell keine VCG-Variante hinterlegt.');
}
function resetFilters(){state.color=null;state.previewColor='ton';state.current=3;state.view=0;state.volume=null;state.diameter=null;state.angle=null;state.categories.clear();state.process=new Set(['Tiefgezogen']);renderFilters();renderProducts();updateGallery();if($('#hero-info').innerHTML)showHeroInfo(productById(state.current))}
function updateFavorites(){const n=state.favorites.size;$('#favorites-count').textContent=n;$('#favorites-count').hidden=n===0}
function toggleFavorite(id){id=Number(id);const had=state.favorites.has(id);had?state.favorites.delete(id):state.favorites.add(id);renderProducts();toast(had?'Artikel vom Merkzettel entfernt.':'Artikel auf den Merkzettel gesetzt.')}
function showFavorites(){
  const selected=products.filter(p=>state.favorites.has(p.index));
  openModal('Ihr Merkzettel',selected.length?`<div class="modal-products">${selected.map(p=>`<div class="favorite-item"><img src="${productImage(p)}" alt=""><div><strong>${p.name}</strong><div class="small-note">${format(p.diameter)} cm · ${format(p.volume)} l</div></div><button class="remove-favorite" data-remove="${p.index}">Entfernen</button></div>`).join('')}</div><button class="pink-button" data-collection-request="offer">Angebot für diese Artikel</button>`:'<p>Ihr Merkzettel ist noch leer. Über das Herz an einem Artikel können Sie ihn hinzufügen.</p>');
}
function showRequest(type,ids){
  const selected=ids.map(productById).filter(Boolean);
  if(!selected.length){toast('Bitte wählen Sie mindestens einen Artikel.');return}
  const sample=type==='sample';
  openModal(sample?'Kostenloses Muster anfordern':'Unverbindliches Angebot anfordern',`<p class="small-note">Click-Dummy: Es wird keine Anfrage versendet.</p><div class="request-summary">${selected.map(p=>`<strong>${p.name}</strong> · ${escapeHTML(selectedVariant(p)?.color||'')}`).join('<br>')}</div><form id="request-form" data-type="${type}"><div class="form-grid"><label class="form-field">Firma<input name="company" required autocomplete="organization"></label><label class="form-field">Ansprechpartner<input name="name" required autocomplete="name"></label><label class="form-field wide">E-Mail<input name="email" type="email" required autocomplete="email"></label><label class="form-field">${sample?'Musteranzahl':'Gewünschte Stückzahl'}<input name="quantity" type="number" min="1" max="${sample?10:10000000}" value="${sample?1:1000}" required></label><label class="form-field">Farbe<select name="color">${[...new Set(selected.flatMap(p=>p.variants.map(v=>v.color)))].map(c=>`<option ${c===selectedVariant(selected[0])?.color?'selected':''}>${escapeHTML(c)}</option>`).join('')}</select></label><label class="form-field wide">Nachricht<textarea name="message" placeholder="Ihre Wünsche oder Fragen"></textarea></label></div><button class="pink-button" type="submit">${sample?'Musteranfrage testen':'Angebotsanfrage testen'}</button></form>`);
}
function showBatch(type){
  const visible=filteredProducts();
  if(type==='share'){showShare(null);return}
  if(!visible.length){toast('Für diese Filterkombination sind keine Artikel verfügbar.');return}
  openModal('Artikel auswählen',`<p>Welche Artikel möchten Sie ${type==='sample'?'als Muster anfragen':'in Ihr Angebot aufnehmen'}?</p><form id="batch-form" data-type="${type}"><div class="selection-list">${visible.map(p=>`<label><input type="checkbox" name="article" value="${p.index}" ${state.favorites.has(p.index)?'checked':''}>${p.name} · ${format(p.volume)} l</label>`).join('')}</div><button class="outline-button" type="button" id="select-all">Alle auswählen</button> <button class="pink-button" type="submit">Weiter</button></form>`);
}
function shareURL(id){const u=new URL(location.href);u.hash=id===null?'top':`article-${id}`;return u.href}
function showShare(id){
  const p=id===null?null:productById(id);
  openModal(p?`${p.name} empfehlen`:'VCG-Serie empfehlen',`<p>Link zur aktuellen Dummy-Ansicht:</p><div class="copy-field"><input id="share-url" readonly value="${escapeHTML(shareURL(id))}" aria-label="Link zum Kopieren"><button class="pink-button" id="copy-link">Kopieren</button></div><p class="small-note">Die Vorschau ist privat. Andere Personen benötigen Zugriff, um sie zu öffnen.</p>`);
}
function showCalculator(id){
  const p=productById(id);
  openModal(`Stellflächenrechner · ${p.name}`,`<p>Flächenbedarf überschlägig berechnen.</p><form id="calculator-form" data-id="${p.index}" class="form-grid"><label class="form-field">Anzahl Töpfe<input name="quantity" type="number" min="1" max="10000000" value="1000" required></label><label class="form-field">Anordnung<select name="arrangement"><option value="square">Quadratisch</option><option value="hex">Versetzt</option></select></label><label class="form-field">Topfdurchmesser (cm)<input name="diameter" type="number" min="1" max="100" step=".1" value="${p.diameter}" required></label><label class="form-field">Abstand zwischen Töpfen (cm)<input name="gap" type="number" min="0" max="100" step=".1" value="0" required></label><button class="pink-button" type="submit">Berechnen</button></form><div id="calc-result" class="calc-result" aria-live="polite" hidden></div><p class="small-note">Vereinfachte Modellrechnung ohne Randverluste, Wege und konkrete Tray-Abmessungen.</p>`);
}
function showTray(id,idx){
  const p=productById(id),t=p.trays[Number(idx)];if(!t)return;
  openModal(t.name,`<img class="modal-image" src="${t.image}" alt="${escapeHTML(t.name)}"><p>Auf der bestehenden Produktseite als passendes Tray für <strong>${p.name}</strong> aufgeführt.</p><button class="pink-button" data-request="offer" data-id="${p.index}">Angebot für ${p.name} anfragen</button>`);
}
function activateTab(tab){
  if(!['variants','benefits','downloads'].includes(tab))return;
  state.tab=tab;
  $$('[data-tab]').forEach(b=>{const active=b.dataset.tab===tab;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1});
  ['variants','benefits','downloads'].forEach(name=>$(`#${name}-panel`).hidden=name!==tab);
}
function showMenu(){openModal('TEKU',`<nav class="modal-links" aria-label="TEKU Menü"><a href="#top" data-local-tab="variants">Produkte · VCG</a><a href="#benefits-panel" data-local-tab="benefits">Vorteile</a><a href="#downloads-panel" data-local-tab="downloads">Downloads</a><a href="https://www.poeppelmann.com/de/teku" target="_blank" rel="noopener">TEKU Startseite</a></nav>`)}
function showSearch(){openModal('VCG-Artikelsuche','<label class="form-field">Artikel, Durchmesser oder Volumen<input id="article-search" type="search" placeholder="z. B. VCG 13" autocomplete="off"></label><div id="search-results"></div>');renderSearch('');$('#article-search').focus()}
function renderSearch(q){q=q.toLowerCase().trim();$('#search-results').innerHTML=products.filter(p=>`${p.name} ${format(p.diameter)} ${format(p.volume)}`.toLowerCase().includes(q)).map(p=>`<button class="search-result" data-search-result="${p.index}">${p.name} · ${format(p.diameter)} cm · ${format(p.volume)} l</button>`).join('')||'<p>Keine passenden Artikel gefunden.</p>'}
const benefits=[
  ['Kulturzeitverkürzung','Schnelles Wachstum und gesunde Pflanzen durch ideale Be- und Entwässerung.'],
  ['Sehr geringe Ausfallquoten','Keine Beeinträchtigung und Schädigung der Wurzeln durch Lichteinwirkung. In der Fertigung werden hochdeckende Farben verwendet.'],
  ['Störungsfreie Entstapelung','Der Facettenrand und die hohe Seitenstabilität sorgen für eine störungsfreie Entstapelung im Topfmagazin.'],
  ['Beste Stapeleigenschaften','Die Stapelung erfolgt über den patentierten Facettenrand – für ein einwandfreies Stapeln.'],
  ['Besseres Handling','Ausgeprägter und stabiler U-Rand für moderne Absetz- und Rückautomaten. Entschärfte Schnittkanten sind besonders anwenderfreundlich und verringern das Verletzungsrisiko.'],
  ['Beste Standfestigkeit','Der Verzicht auf Aufstellfüße verbessert die Standfestigkeit auf Transportbändern.'],
  ['Reduzierung von Transportkosten','Die optimierten Durchmesser sorgen für einen höheren Beladungsgrad sowohl innerbetrieblich als auch im Versand.'],
  ['Einsatz von Recyclingmaterial','Sorgfältige Aufbereitung und intensiver Einsatz von Recycling-Kunststoffen.'],
  ['Gewichtsreduzierung','Unübertroffen geringer Materialeinsatz durch fortlaufende konstruktive Optimierung.']
];
$('#benefits').innerHTML=benefits.map(([title,text])=>`<article class="benefit-card"><h2>${title}</h2><p>${text}</p></article>`).join('');
$('#download-list').innerHTML=[['TEKU Onlinekatalog 2026 deutsch','https://static.teku.com/assets/712404/teku-de.pdf'],['TEKU® Produktfolder','https://static.teku.com/assets/572817/teku-de-produktfolder.pdf']].map(([name,url])=>`<a class="download-link" href="${url}" target="_blank" rel="noopener"><span>${name}</span><span>PDF öffnen</span></a>`).join('');
const recommendations=[
  {name:'PT',articles:21,category:'Marketing Trays',image:'assets/pt-2556-10-5-10-naturgrau-pr_baseline-grau.png',url:'https://www.poeppelmann.com/de/teku/produkte/pt-marketing-trays'},
  {name:'Normpack',articles:31,category:'Transport- und Kulturtrays',image:'assets/np-206-circular-grau-pr.png',url:'https://www.poeppelmann.com/de/teku/produkte/normpack-transport-und-kulturtrays'},
  {name:'MXC',articles:11,category:'Rundtöpfe 6°',image:'assets/mxc-ton-pr.png',url:'https://www.poeppelmann.com/de/teku/produkte/mxc-rundtoepfe-6-'},
  {name:'MCI',articles:12,category:'Container 5°',image:'assets/mci-terracotta-pr.png',url:'https://www.poeppelmann.com/de/teku/produkte/mci-container-5-'}
];
$('#recommendations').innerHTML=recommendations.map(r=>`<article class="recommendation"><a href="${r.url}" target="_blank" rel="noopener"><img src="${r.image}" alt="${r.name}" loading="lazy"></a><h3>${r.name}</h3><p>${r.articles} Artikel</p><p>${r.category}</p><a class="outline-button" href="${r.url}" target="_blank" rel="noopener">MEHR ERFAHREN</a></article>`).join('');
document.addEventListener('click',event=>{
  const b=event.target.closest('button,a');if(!b)return;
  if(b.dataset.color){chooseColor(b.dataset.color);return}
  if(b.dataset.diameter){const v=Number(b.dataset.diameter);state.diameter=state.diameter===v?null:v;renderFilters();renderProducts();return}
  if(b.dataset.volume){state.volume=state.volume===b.dataset.volume?null:b.dataset.volume;renderFilters();renderProducts();return}
  if(b.dataset.angle){const v=Number(b.dataset.angle);state.angle=state.angle===v?null:v;renderFilters();renderProducts();return}
  if(b.dataset.view!==undefined){state.view=Number(b.dataset.view);updateGallery();return}
  if(b.dataset.product!==undefined){selectProduct(b.dataset.product);return}
  if(b.dataset.expand){const id=Number(b.dataset.id);state.expanded[id]=state.expanded[id]===b.dataset.expand?null:b.dataset.expand;renderProducts();return}
  if(b.dataset.variant!==undefined){const p=productById(b.dataset.id),v=p.variants[Number(b.dataset.variant)],c=colors.find(c=>c.name===v.color);if(c){state.current=p.index;state.color=null;state.previewColor=c.id;state.view=0;renderFilters();renderProducts();updateGallery();showHeroInfo(p);$('#top').scrollIntoView({behavior:'smooth'})}return}
  if(b.dataset.favorite!==undefined){toggleFavorite(b.dataset.favorite);return}
  if(b.dataset.share!==undefined){showShare(Number(b.dataset.share));return}
  if(b.dataset.calculator!==undefined){showCalculator(Number(b.dataset.calculator));return}
  if(b.dataset.tray!==undefined){showTray(b.dataset.id,b.dataset.tray);return}
  if(b.dataset.request){showRequest(b.dataset.request,[Number(b.dataset.id)]);return}
  if(b.dataset.batch){showBatch(b.dataset.batch);return}
  if(b.dataset.tab){activateTab(b.dataset.tab);return}
  if(b.dataset.remove!==undefined){state.favorites.delete(Number(b.dataset.remove));renderProducts();showFavorites();return}
  if(b.dataset.collectionRequest){showRequest(b.dataset.collectionRequest,[...state.favorites]);return}
  if(b.dataset.searchResult!==undefined){closeModal();state.color=null;state.volume=null;state.diameter=null;state.categories.clear();state.process.clear();state.angle=null;activateTab('variants');renderFilters();renderProducts();selectProduct(b.dataset.searchResult);return}
  if(b.dataset.localTab){event.preventDefault();closeModal();activateTab(b.dataset.localTab);$('#top').scrollIntoView({behavior:'smooth'});return}
  if(b.dataset.info){event.preventDefault();const info={Circular360:'Auf der bestehenden Produktseite ist Circular360 als eigene Nachhaltigkeitskategorie aufgeführt. Die Farb- und Artikelzuordnung wird hier aus dieser Seite übernommen.',Baseline:'Baseline ist eine der auf der aktuellen VCG-Produktseite angebotenen Nachhaltigkeitskategorien.',Recyclable:'Im XD-Entwurf vorgesehen. Auf der aktuellen VCG-Produktseite ist keine Variante dieser Kategorie hinterlegt.'};openModal(b.dataset.info,`<p>${info[b.dataset.info]}</p>`);return}
  if(b.id==='collapse-filter'){state.filterCollapsed=!state.filterCollapsed;$('.filters').classList.toggle('collapsed',state.filterCollapsed);$('.catalog').classList.toggle('filters-collapsed',state.filterCollapsed);b.textContent=state.filterCollapsed?'⊞ Filter aufklappen':'⊟ einklappen';b.setAttribute('aria-expanded',!state.filterCollapsed);return}
  if(b.id==='reset-filters'||b.dataset.action==='reset'){resetFilters();return}
  if(b.classList.contains('close-modal')){closeModal();return}
  if(b.id==='select-all'){$$('input[name="article"]',$('#modal')).forEach(i=>i.checked=true);return}
  if(b.id==='copy-link'){const value=$('#share-url').value;navigator.clipboard?.writeText(value).then(()=>toast('Link kopiert.')).catch(()=>{$('#share-url').select();toast('Bitte den markierten Link kopieren.');});if(!navigator.clipboard){$('#share-url').select();toast('Bitte den markierten Link kopieren.')}return}
  const action=b.dataset.action;
  if(action==='more-sizes'){state.moreSizes=!state.moreSizes;renderFilters();return}
  if(action==='menu'){showMenu();return}
  if(action==='favorites'){showFavorites();return}
  if(action==='search'){showSearch();return}
  if(action==='language'){openModal('Sprache','<p>Dieser Click-Dummy bildet den deutschen TEKU-Entwurf ab.</p><div class="language-options"><button class="pink-button" data-action="close">Deutsch · DE</button></div>');return}
  if(action==='close'){closeModal();return}
  if(action==='contact'){openModal('TEKU Beratung','<p>Sie haben Fragen zu unseren Produkten?</p><p><a href="tel:+4944429821626">+49 4442 982-1626</a></p><p><a href="mailto:teku@poeppelmann.com">teku@poeppelmann.com</a></p><p>Pöppelmann GmbH &amp; Co. KG<br>Bakumer Straße 73<br>49393 Lohne</p>');return}
  if(action==='zoom'){if($('#main-image').hidden){toast('Für diese Farbe ist keine Produktabbildung verfügbar.');return}openModal($('#main-image').alt,`<img class="modal-image" src="${$('#main-image').getAttribute('src')}" alt="${escapeHTML($('#main-image').alt)}">`);return}
});
document.addEventListener('change',event=>{
  const i=event.target;if(i.name==='category'||i.name==='process'){const set=i.name==='category'?state.categories:state.process;i.checked?set.add(i.value):set.delete(i.value);renderProducts()}
});
document.addEventListener('input',event=>{if(event.target.id==='article-search')renderSearch(event.target.value)});
document.addEventListener('submit',event=>{
  const form=event.target;
  if(form.id==='request-form'){event.preventDefault();if(!form.reportValidity())return;openModal('Anfrage im Dummy abgeschlossen',`<p>${svg('check')} Der Ablauf wurde erfolgreich durchgespielt.</p><p>Es wurde keine Muster- oder Angebotsanfrage versendet. Ihre Eingaben werden nicht gespeichert.</p><button class="pink-button" data-action="close">Zurück zur Produktseite</button>`);return}
  if(form.id==='batch-form'){event.preventDefault();const ids=$$('input[name="article"]:checked',form).map(i=>Number(i.value));showRequest(form.dataset.type,ids);return}
  if(form.id==='calculator-form'){event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const quantity=Number(data.get('quantity')),pitch=(Number(data.get('diameter'))+Number(data.get('gap')))/100;const factor=data.get('arrangement')==='hex'?Math.sqrt(3)/2:1;const area=quantity*pitch*pitch*factor;$('#calc-result').innerHTML=`<strong>${area.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})} m²</strong>Überschlägiger Flächenbedarf für ${format(quantity)} Töpfe`;$('#calc-result').hidden=false;return}
});
$('.tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=$$('[data-tab]');let i=tabs.findIndex(b=>b.getAttribute('aria-selected')==='true');i=event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'?1:2))%3;activateTab(tabs[i].dataset.tab);tabs[i].focus()});
$('#modal').addEventListener('click',event=>{if(event.target!==$('#modal'))return;const r=$('#modal').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeModal()});
renderFilters();renderProducts();updateGallery();
const deepLink=location.hash.match(/^#article-(\d+)$/);if(deepLink&&productById(deepLink[1])){resetFilters();selectProduct(deepLink[1],false);requestAnimationFrame(()=>$(`#article-${deepLink[1]}`)?.scrollIntoView())}
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  const register=tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{}};
  register({name:'read_vcg_selection',description:'Read the selected VCG color and current matching articles.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({color:state.color?colorById(state.color).name:null,articles:filteredProducts().map(p=>({name:p.name,diameter:p.diameter,volume:p.volume}))})});
  register({name:'select_vcg_color',description:'Select a VCG color in the visible prototype and update its filters and product photograph. No request is sent.',inputSchema:{type:'object',properties:{colorId:{type:'string',enum:colors.map(c=>c.id)}},required:['colorId'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>{if(!input||typeof input.colorId!=='string'||!colorById(input.colorId))throw new Error('Unbekannte Farbe');state.color=null;chooseColor(input.colorId);return{color:colorById(input.colorId).name,imageAvailable:!!colorById(input.colorId).file,matchingArticles:filteredProducts().map(p=>p.name)}}});
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
