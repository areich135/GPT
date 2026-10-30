'use strict';
(() => {
  const E=window.TEKUSpaceEngine,R=window.TEKURectangularSpaceEngine;
  const n=(v,d=2)=>v.toLocaleString('de-DE',{maximumFractionDigits:d});
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  class TraySpaceCalculator extends HTMLElement {
    connectedCallback(){
      if(this.shadowRoot)return;
      this.initial={itemLength:Number(this.getAttribute('item-length')),itemWidth:Number(this.getAttribute('item-width')),plants:this.hasAttribute('plants')?Number(this.getAttribute('plants')):null};
      this.areaUnit='m';this.gapUnit='cm';this.arrangement='normal';this.manualArrangement=false;
      this.label=this.getAttribute('product-kind')||'Anzuchtpaletten';
      this.singular=this.label==='Trays'?'Tray':'Anzuchtpalette';
      const field=(name,label,value,unit,hint='')=>`<label class="field"><span>${label}</span><div class="input-unit"><input name="${name}" inputmode="decimal" type="text" value="${value}" autocomplete="off" required><small>${unit}</small></div>${hint?`<small>${hint}</small>`:''}</label>`;
      this.attachShadow({mode:'open'}).innerHTML=`<style>${window.TEKUSpaceCalculatorStyles}
        .tray-inputs{margin-bottom:12px}.tray-meter{font-size:13px;line-height:1.5}.tray-meter strong{font-size:21px}.result .value{font-size:27px}.result .plant-total{font-size:13px;grid-column:1/-1}.result .label{min-height:30px}.method-view p{margin:10px 0}.per-meter .section-intro{display:block;margin:0}.per-meter{margin:12px 0}.tray-result .value{grid-column:1/-1}.tray-result .label{min-height:0}
        @media(min-width:761px){.diagram-stage{height:180px}.context{margin-bottom:12px}.inputs{gap:10px}.field>span{font-size:12px}.field>small{font-size:10px}.per-meter{padding:9px 12px}.area-header{margin-bottom:8px}.footer{margin-top:12px;padding-top:9px}}
      </style><div class="wrap"><div class="calculator-view"><p class="context">Ausgangsartikel: <strong>${esc(this.getAttribute('product-name')||'Eigene Berechnung')}</strong> · Maße frei änderbar</p>
      <nav class="mobile-panels" aria-label="Rechneransicht"><button type="button" data-panel="settings" aria-pressed="true">Eingaben</button><button type="button" data-panel="results" aria-pressed="false">Ergebnisse</button></nav>
      <form novalidate><div class="settings"><div class="inputs tray-inputs">${field('itemLength','Länge '+this.singular,String(this.initial.itemLength).replace('.',','),'cm')}${field('itemWidth','Breite '+this.singular,String(this.initial.itemWidth).replace('.',','),'cm')}${field('gap','Abstand zwischen Paletten','0','cm')}${this.initial.plants===null?'':field('plants','Pflanzen je '+this.singular,String(this.initial.plants),'Stück')}</div>
      <section class="per-meter"><h3>Auf 1 m²</h3><p class="section-intro">Beste der beiden einheitlichen Ausrichtungen</p><div class="tray-meter" id="per-meter"></div></section>
      <div class="area-header"><h3>Ihre individuelle Stellfläche</h3><label class="unit-select">Maßeinheit<select name="areaUnit"><option value="m">Meter (m)</option><option value="cm">Zentimeter (cm)</option><option value="ft">Fuß (ft)</option><option value="in">Zoll (in)</option></select></label></div>
      <div class="inputs area-fields">${field('length','Länge','1','<span data-area-unit>m</span>')}${field('width','Breite','1','<span data-area-unit>m</span>')}</div><div class="actions"><button class="reset" type="reset">Werte zurücksetzen</button><button class="primary" type="submit">Berechnen</button></div></div>
      <div class="result-side"><p id="error" class="error" role="alert" hidden></p><div id="results-content"><p class="results-label" id="area-label"></p><div class="results">${['normal','rotated'].map(key=>`<button type="button" class="result tray-result" data-arrangement="${key}" aria-pressed="false"><span class="label">${key==='normal'?'Längs ausgerichtet':'Um 90° gedreht'}</span><span class="value"><span data-count="${key}">–</span> <span class="unit">${esc(this.label)}</span></span><span class="plant-total" data-plants="${key}"></span><span class="show">Anordnung anzeigen</span></button>`).join('')}</div><figure class="diagram"><div class="diagram-stage" id="diagram"></div><figcaption id="diagram-caption"></figcaption></figure></div><span id="announcement" role="status" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"></span></div></form>
      <div class="footer"><p class="notice">Rechteckige Grundfläche, einheitliche Ausrichtung. Wege und nicht nutzbare Bereiche vorher abziehen.</p><button class="method-link" type="button" data-method="open">Wie wird gerechnet?</button></div></div>
      <section class="method-view" hidden><h3>Wie wird gerechnet?</h3><p>Die rechteckige Grundfläche wird in beiden Ausrichtungen geprüft. Anzahl je Reihe × Anzahl der Reihen ergibt die Stückzahl; das größere Ergebnis ist vorausgewählt.</p><p>Der Abstand liegt nur zwischen benachbarten Paletten. Jede Palette muss vollständig auf die Fläche passen. Gemischte Ausrichtungen, gestapelte Paletten und Wege werden nicht berechnet.</p><p>Die Pflanzenzahl ist die Stückzahl der Paletten multipliziert mit Pflanzen je Palette. Änderungen gelten nur für diese Berechnung und ändern den Artikel nicht.</p><button class="primary" type="button" data-method="back">Zurück zum Rechner</button></section></div>`;
      this.form=this.shadowRoot.querySelector('form');
      this.form.addEventListener('input',event=>{if(event.target.name!=='areaUnit'){this.manualArrangement=false;this.update();}});
      this.form.addEventListener('change',event=>{if(event.target.name!=='areaUnit')return;const next=event.target.value;for(const key of ['length','width']){const value=E.parseDecimal(this.field(key).value);if(Number.isFinite(value))this.field(key).value=String(Number(E.convert(value,this.areaUnit,next).toPrecision(15))).replace('.',',');}this.areaUnit=next;this.update();});
      this.form.addEventListener('submit',event=>{event.preventDefault();if(this.update(true)&&matchMedia('(max-width:760px)').matches)this.showPanel('results');});
      this.form.addEventListener('reset',event=>{event.preventDefault();for(const [key,value] of Object.entries({...this.initial,gap:0,length:1,width:1,areaUnit:'m'})){if(value!==null&&this.field(key))this.field(key).value=typeof value==='number'?String(value).replace('.',','):value;}this.areaUnit='m';this.manualArrangement=false;this.update();});
      this.shadowRoot.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.panel){this.showPanel(button.dataset.panel);return;}if(button.dataset.arrangement){this.manualArrangement=true;this.arrangement=button.dataset.arrangement;this.update();return;}if(button.dataset.method){const open=button.dataset.method==='open';this.shadowRoot.querySelector('.calculator-view').hidden=open;this.shadowRoot.querySelector('.method-view').hidden=!open;this.shadowRoot.querySelector(`[data-method="${open?'back':'open'}"]`).focus();}});
      this.update();
    }
    field(name){return this.form.elements.namedItem(name);}
    focusInput(){this.field('itemLength').focus();}
    showPanel(panel){if(panel==='results'&&!this.update(true))return;this.setAttribute('panel',panel);this.shadowRoot.querySelectorAll('[data-panel]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.panel===panel)));this.shadowRoot.querySelector(`[data-panel="${panel}"]`).focus();}
    update(focusError=false){
      const root=this.shadowRoot,values={};for(const key of ['itemLength','itemWidth','gap','length','width'])values[key]=E.parseDecimal(this.field(key).value);values.length*=E.units[this.areaUnit];values.width*=E.units[this.areaUnit];values.plants=this.initial.plants===null?null:E.parseDecimal(this.field('plants').value);
      root.querySelectorAll('[data-area-unit]').forEach(e=>e.textContent=this.areaUnit);
      root.querySelectorAll('input').forEach(i=>i.removeAttribute('aria-invalid'));
      let result,meter;try{result=R.calculate(values);meter=R.calculate({...values,length:100,width:100});}catch(error){root.querySelector('#error').hidden=false;root.querySelector('#error').textContent=error.message;root.querySelector('#results-content').hidden=true;root.querySelector('#per-meter').textContent='–';root.querySelector('#announcement').textContent='';if(focusError)this.focusInput();return false;}
      root.querySelector('#error').hidden=true;root.querySelector('#results-content').hidden=false;if(!this.manualArrangement)this.arrangement=result.best;
      const best=meter[meter.best];root.querySelector('#per-meter').innerHTML=`<strong>${n(best.count,0)}</strong> ${esc(this.label)}${best.plants===null?'':` · ${n(best.plants,0)} Pflanzen`}`;
      root.querySelector('#area-label').textContent=`${n(values.length/100,6)} × ${n(values.width/100,6)} m = ${n(result.area,6)} m² · Abstand ${n(values.gap)} cm`;
      for(const key of ['normal','rotated']){const plan=result[key],button=root.querySelector(`[data-arrangement="${key}"]`);root.querySelector(`[data-count="${key}"]`).textContent=n(plan.count,0);root.querySelector(`[data-plants="${key}"]`).textContent=plan.plants===null?'':`${n(plan.plants,0)} Pflanzen`;button.setAttribute('aria-pressed',String(this.arrangement===key));button.querySelector('.show').textContent=this.arrangement===key?'Anordnung wird angezeigt':'Anordnung anzeigen';}
      this.draw(result[this.arrangement],values);root.querySelector('#announcement').textContent=`${n(result[result.best].count,0)} ${this.label} passen auf die gewählte Fläche.`;return true;
    }
    draw(plan,values){
      const root=this.shadowRoot,stage=root.querySelector('#diagram'),caption=root.querySelector('#diagram-caption');
      if(!plan.count){stage.innerHTML='<p class="empty">Die Stellfläche ist für diese Ausrichtung zu klein.</p>';caption.textContent=`0 ${this.label}`;return;}
      const rows=Math.min(plan.rows,16),columns=Math.min(plan.columns,20),excerpt=rows*columns<plan.count;
      const L=excerpt?columns*(plan.itemLength+values.gap)-values.gap:values.length,W=excerpt?rows*(plan.itemWidth+values.gap)-values.gap:values.width,pad=Math.max(L,W)*.025;
      let cells='';for(let y=0;y<rows;y++)for(let x=0;x<columns;x++)cells+=`<rect x="${x*(plan.itemLength+values.gap)}" y="${y*(plan.itemWidth+values.gap)}" width="${plan.itemLength}" height="${plan.itemWidth}" fill="white" stroke="var(--sc-green)" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
      stage.innerHTML=`<svg viewBox="${-pad} ${-pad} ${L+pad*2} ${W+pad*2}" role="img" aria-label="${n(plan.count,0)} ${esc(this.label)}${excerpt?' · Ausschnitt':''}"><rect width="${L}" height="${W}" fill="white" stroke="var(--sc-muted)" vector-effect="non-scaling-stroke" ${excerpt?'stroke-dasharray="4 3"':''}/>${cells}</svg>`;
      caption.innerHTML=`<strong>${plan.rotated?'Um 90° gedreht':'Längs ausgerichtet'}</strong>${n(plan.rows,0)} Reihen · ${n(plan.columns,0)} je Reihe<small>${n(plan.itemLength)} × ${n(plan.itemWidth)} cm je Palette<br>${excerpt?`Ausschnitt: ${rows*columns} von ${n(plan.count,0)} Paletten.`:'Draufsicht der gesamten Stellfläche.'}</small>`;
    }
  }
  if(!customElements.get('teku-tray-space-calculator'))customElements.define('teku-tray-space-calculator',TraySpaceCalculator);
})();
