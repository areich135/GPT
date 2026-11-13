'use strict';
// BP/ST display units only: canonical data, filter keys and calculators stay metric.
(() => {
  const st=document.body.classList.contains('st-page');
  let unit='cm';
  const formatters=new Map();
  const number=(n,minimum=0)=>{
    const lang=document.documentElement.lang||'de',key=lang+':'+minimum;
    if(!formatters.has(key)){
      try{formatters.set(key,new Intl.NumberFormat(lang,{minimumFractionDigits:minimum,maximumFractionDigits:2}));}
      catch{formatters.set(key,new Intl.NumberFormat('de',{minimumFractionDigits:minimum,maximumFractionDigits:2}));}
    }
    return formatters.get(key).format(n);
  };
  function display(raw,kind='length',suffix=true,minimum=0){
    const shape=String(raw).match(/^([□Øø⌀])\s*/),n=Number(String(raw).replace(/^([□Øø⌀])\s*/,'').replace(',','.'));
    if(!Number.isFinite(n))return String(raw);
    const converted=unit==='inch'?n/(kind==='volume'?16.387064:2.54):n;
    return number(converted,unit==='cm'?minimum:0)+(suffix?' '+(kind==='volume'?(unit==='cm'?'ml':'in³'):unit):'')+(shape?(shape[1]==='□'?' (quadratisch)':' (Durchmesser)'):'');
  }
  function bind(node,raw,kind='length',suffix=true,minimum=0){
    if(!node||raw===null||raw===undefined)return;
    Object.assign(node.dataset,{rectMeasure:String(raw),rectKind:kind,rectSuffix:String(suffix),rectMinimum:String(minimum)});
  }
  function changingLabel(node){
    if(node&&!node.dataset.rectLabel)node.dataset.rectLabel=node.textContent;
  }
  function span(raw,kind='length',suffix=true){const node=document.createElement('span');bind(node,raw,kind,suffix);return node;}
  const section=document.createElement('section');section.className='filter-section';section.id='filter-unit';
  section.innerHTML='<h2 id="unit-heading"><img class="filter-symbol" src="../assets/filter-diameter.svg" alt=""> MAẞEINHEIT</h2><div class="measurement-toggle" role="group" aria-labelledby="unit-heading"><button type="button" data-measurement-unit="cm" aria-pressed="true" aria-label="Zentimeter">cm</button><button type="button" data-measurement-unit="inch" aria-pressed="false" aria-label="Inch">inch</button></div><p class="sr-only" id="measurement-status" role="status"></p>';
  const compact=document.createElement('button');compact.type='button';compact.className='compact-unit';compact.dataset.filterGroup='unit';compact.title='Maßeinheit';compact.setAttribute('aria-controls','filter-unit');
  function bindDiagrams(){
    if(st)return;
    // The original BP pictograms include outlined cm labels. Keep their geometry;
    // the inch copies change only those two unit labels.
    document.querySelectorAll('img[src="assets/plug.svg"],img[src="assets/cell.svg"]').forEach(image=>{image.dataset.rectDiagram=image.getAttribute('src');});
  }
  function bindFilters(){
    document.querySelector('#filter-body').prepend(section);document.querySelector('#compact-filters').prepend(compact);
    for(const group of filterGroups)for(const [key,,sourceUnit] of group.fields){
      if(!['cm','ml'].includes(sourceUnit))continue;
      const buttons=document.querySelectorAll(`[data-bp-filter="${key}"]`);
      buttons.forEach(button=>bind(button,button.dataset.bpValue,sourceUnit==='ml'?'volume':'length'));
      changingLabel(buttons[0]?.closest('fieldset')?.querySelector('legend'));
    }
    bindDiagrams();
  }
  function bindRows(){
    const specs=st?[['length','length',true],['width','length',true],['height','length',true]]:[['length','length',false],['width','length',false],['height','length',false],['plugD','length',true],['plugE','length',true],['volume','volume',true],null,['cellA','length',true],['cellB','length',true]];
    document.querySelectorAll('.product-row').forEach(row=>{
      const p=productById(row.id.replace('article-',''));if(!p)return;
      row.querySelectorAll('.bp-tray-measure-values>div').forEach((cell,i)=>{
        const raw=p[['length','width','height'][i]];
        bind(cell.querySelector('span'),raw,'length',false,st?0:1);
        cell.dataset.rectTitle=String(raw);cell.dataset.rectTitleLabel=['Länge','Breite','Höhe'][i];
      });
      const summary=row.querySelector('.bp-tray-measures');if(summary)summary.dataset.rectSummary='true';
      changingLabel(row.querySelector('.bp-dimension-caption'));changingLabel(row.querySelector('.bp-tray-unit'));
      if(row.querySelector('[data-tech-tab="measures"][aria-selected="true"]')){
        row.querySelectorAll('.spec-table>div').forEach((cell,i)=>{const spec=specs[i];if(!spec)return;bind(cell.querySelector('dd'),p[spec[0]],spec[1],spec[2]);changingLabel(cell.querySelector('dt'));});
        row.querySelectorAll('.measure-diagrams figcaption').forEach(node=>{if(/\bcm\b/.test(node.textContent))changingLabel(node);});
      }
    });
  }
  function bindHero(){
    const p=productById(state.current),info=document.querySelector('#hero-info');if(!p||!info)return;
    const paragraphs=info.querySelectorAll('p'),first=paragraphs[0];if(!first)return;
    if(st){
      const suffix=document.createElement('span');suffix.dataset.rectLabel='cm';
      first.replaceChildren(span(p.length,'length',false),' × ',span(p.width,'length',false),' × ',span(p.height,'length',false),' ',suffix);
    }else if(first.textContent.startsWith('Plug-Breite:')){
      first.replaceChildren('Plug-Breite: ',p.plugD===null?'Keine Angabe':span(p.plugD),document.createElement('br'),'Plug-Höhe: ',p.plugE===null?'Keine Angabe':span(p.plugE));
      paragraphs[1]?.replaceChildren(p.volume===null?'Keine Angabe':span(p.volume,'volume'),` je Zelle · ${format(p.plants)} Pflanzen pro Tray`);
    }
  }
  function refresh(){
    document.querySelectorAll('[data-rect-diagram]').forEach(image=>{const source=unit==='cm'?image.dataset.rectDiagram:image.dataset.rectDiagram.replace('.svg','-inch.svg');if(image.getAttribute('src')!==source)image.setAttribute('src',source);});
    document.querySelectorAll('[data-rect-measure]').forEach(node=>{node.textContent=display(node.dataset.rectMeasure,node.dataset.rectKind,node.dataset.rectSuffix==='true',Number(node.dataset.rectMinimum));});
    document.querySelectorAll('[data-rect-label]').forEach(node=>{node.textContent=node.dataset.rectLabel.replace(/\b(cm|ml)\b/g,original=>unit==='cm'?original:original==='ml'?'in³':'inch');});
    document.querySelectorAll('[data-rect-title]').forEach(node=>{const label=`${node.dataset.rectTitleLabel}: ${display(node.dataset.rectTitle)}`;node.title=label;node.setAttribute('aria-label',label);});
    document.querySelectorAll('[data-rect-summary]').forEach(node=>node.setAttribute('aria-label',`${st?'Tray':'Anzuchtpalette'} · Außenmaße in ${unit==='cm'?'Zentimetern':'Inch'}`));
    section.querySelectorAll('[data-measurement-unit]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.measurementUnit===unit)));
    compact.textContent=unit;compact.setAttribute('aria-label',`Maßeinheit: ${unit}. Filter aufklappen`);
  }
  const previousFilters=renderFilters;
  renderFilters=function(...args){const result=previousFilters.apply(this,args);bindFilters();refresh();return result;};
  const previousProducts=renderProducts;
  renderProducts=function(...args){const result=previousProducts.apply(this,args);bindRows();bindDiagrams();refresh();return result;};
  const previousGallery=updateGallery;
  updateGallery=function(...args){const result=previousGallery.apply(this,args);bindHero();refresh();return result;};
  section.addEventListener('click',event=>{
    const button=event.target.closest('[data-measurement-unit]');if(!button||unit===button.dataset.measurementUnit)return;
    unit=button.dataset.measurementUnit;refresh();section.querySelector('#measurement-status').textContent=unit;
  });
  document.addEventListener('click',event=>{
    // BP writes its selected hero information after updateGallery returns.
    if(event.target.closest('[data-product]')){bindHero();refresh();}
    if(event.target.closest('.compact-unit'))requestAnimationFrame(()=>section.querySelector(`[data-measurement-unit="${unit}"]`).focus({preventScroll:true}));
  });
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  bindFilters();bindRows();bindDiagrams();bindHero();refresh();
})();
