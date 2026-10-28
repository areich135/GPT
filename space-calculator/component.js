'use strict';
/* Dependency-free reusable component. Load engine.js first. */
(() => {
  const E = window.TEKUSpaceEngine;
  const number = (v, digits = 2) => v.toLocaleString('de-DE', {maximumFractionDigits: digits});
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = triangle => `<svg class="pattern-icon" viewBox="0 0 52 38" aria-hidden="true">${Array.from({length: 3}, (_, y) => Array.from({length: 4}, (_, x) => `<circle cx="${7 + x * 11 + (triangle && y % 2 ? 5.5 : 0)}" cy="${7 + y * (triangle ? 9.526 : 11)}" r="5"/>`).join('')).join('')}</svg>`;
  const styles = `
    :host{display:block;--sc-navy:var(--navy,#123361);--sc-green:var(--green,#4eae94);--sc-pink:var(--pink,#df359b);--sc-muted:var(--muted,#627797);font:inherit;color:var(--sc-navy)}
    *{box-sizing:border-box}button,input,select{font:inherit;color:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid var(--sc-green);outline-offset:3px}[hidden]{display:none!important}
    .wrap{padding:24px 36px 30px}p{line-height:1.45}.context{font-size:14px;margin:0 0 20px;color:var(--sc-muted)}.context strong{color:var(--sc-navy)}
    .inputs{display:grid;grid-template-columns:1fr 1fr;gap:18px}.field{display:flex;flex-direction:column;gap:7px;font-size:14px;min-width:0}.field>span{font-weight:700}.input-unit{display:flex;border:1px solid var(--sc-muted);border-radius:5px;background:white;overflow:hidden;min-height:44px}.input-unit:focus-within{outline:2px solid var(--sc-green);outline-offset:2px}input{width:100%;min-width:0;border:0;background:transparent;padding:10px 12px;font-size:18px;outline:0!important}input[aria-invalid=true]{box-shadow:inset 0 0 0 2px var(--sc-pink)}.input-unit small,.input-unit select{flex:none;border:0;background:transparent;border-left:1px solid #e5e7eb;padding:10px 12px;font-size:14px;align-self:stretch;display:flex;align-items:center}.input-unit select{max-width:86px}.field>small{font-size:12px;color:var(--sc-muted)}
    h3{font-size:18px;margin:0 0 5px}.section-intro{margin:0 0 16px;font-size:13px;color:var(--sc-muted)}.per-meter{margin:22px 0 24px;padding:18px 20px;border:1px solid #e5e7eb;border-radius:8px}.meter-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:12px}.meter-item{display:flex;align-items:center;gap:12px;font-size:13px}.meter-item strong{display:block;font-size:25px;line-height:1.2}.meter-item strong small{font-size:13px;font-weight:400}.pattern-icon{width:48px;height:36px;fill:none;stroke:var(--sc-green);stroke-width:1.2;flex:none}
    .area-header{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:15px}.area-header h3{margin:0}.unit-select{display:flex;align-items:center;gap:7px;font-size:13px}.unit-select select{border:1px solid #e5e7eb;border-radius:5px;background:white;padding:7px;max-width:120px}.area-fields{grid-template-columns:1fr 1fr}.actions{display:flex;justify-content:space-between;align-items:center;margin:18px 0;gap:20px}.primary{border:0;background:var(--sc-pink);color:white;border-radius:30px;padding:10px 24px;font-size:14px;font-weight:700}.reset{border:0;background:none;text-decoration:underline;text-underline-offset:3px;font-size:13px}.error{font-size:14px;line-height:1.5;border-left:3px solid var(--sc-pink);padding:8px 12px;margin:15px 0}.results-label{font-size:13px;color:var(--sc-muted);margin:18px 0 12px}.results{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.result{min-width:0;background:white;border:1px solid #e5e7eb;border-radius:8px;padding:17px;text-align:left;display:grid;grid-template-columns:1fr 45px;gap:5px;align-items:center;position:relative}.result[aria-pressed=true]{border-color:var(--sc-green);box-shadow:inset 0 0 0 1px var(--sc-green)}.result .label{font-size:14px;grid-column:1/-1}.result .value{display:block;grid-column:1;font-size:32px;font-weight:700;line-height:1.1;overflow-wrap:anywhere}.result .unit{font-size:13px;font-weight:400}.result .pattern-icon{grid-column:2;grid-row:2}.result .show{font-size:11px;color:var(--sc-muted);grid-column:1/-1}.result[aria-pressed=true] .show{color:var(--sc-navy)}
    .diagram{margin:16px 0 0;border:1px solid #e5e7eb;border-radius:8px;padding:16px;display:grid;grid-template-columns:minmax(0,1fr) minmax(150px,.65fr);gap:20px;align-items:center}.diagram-stage{height:180px;display:flex;align-items:center;justify-content:center;background:white}.diagram-stage svg{width:100%;height:100%;overflow:visible}.diagram figcaption{font-size:13px;line-height:1.6}.diagram figcaption strong{display:block;font-size:14px}.diagram figcaption small{display:block;font-size:11px;color:var(--sc-muted);margin-top:7px}.diagram-stage .empty{color:var(--sc-muted);text-align:center;padding:20px;font-size:14px}.diagram-title{margin:0 0 6px}.notice{margin:16px 0 0;font-size:12px;color:var(--sc-muted)}details{margin-top:16px;font-size:12px;color:var(--sc-muted)}summary{cursor:pointer;color:var(--sc-navy)}details p{margin:8px 0 0}
    @media(max-width:600px){.wrap{padding:20px}.inputs{gap:12px}.inputs:not(.area-fields) .field>span{min-height:36px}.field{font-size:13px}.field>small{font-size:11px}.per-meter{padding:15px 12px}.meter-grid{gap:12px}.meter-item{gap:7px;font-size:11px}.meter-item .pattern-icon{width:34px}.meter-item strong{font-size:23px}.meter-item strong small{font-size:11px}.area-header{align-items:flex-start}.area-header h3{font-size:17px}.unit-select{flex-direction:column;align-items:flex-start;gap:3px}.result{padding:13px;grid-template-columns:minmax(0,1fr) 34px}.result .value{font-size:27px}.result .pattern-icon{width:34px}.result .label{font-size:12px}.diagram{grid-template-columns:1fr;gap:8px}.diagram-stage{height:170px}.diagram figcaption{font-size:12px}.diagram figcaption strong{font-size:13px}.actions{gap:12px}.primary{padding:10px 18px}}
    @media(max-width:350px){.inputs,.meter-grid,.results{grid-template-columns:1fr}.area-header{display:block}.unit-select{margin-top:10px}.meter-item{font-size:13px}}
    /* Compact desktop composition: controls and results share the same height. */
    .wrap{padding:16px 24px 18px}.context{margin:0 0 16px;font-size:13px}.mobile-panels{display:none}
    form{display:grid;grid-template-columns:minmax(320px,.9fr) minmax(0,1.1fr);gap:24px;align-items:start}
    .settings,.result-side{min-width:0}.inputs{gap:14px}.field{gap:5px}.input-unit{min-height:40px}input{padding:8px 10px;font-size:16px}.input-unit small,.input-unit select{padding:8px 10px}.field>small{font-size:11px}
    h3{font-size:17px}.per-meter{margin:16px 0;padding:12px 14px}.section-intro{margin:0;font-size:12px}.meter-grid{gap:14px;margin-top:10px}.meter-item{gap:8px;font-size:12px}.meter-item strong{font-size:24px}.meter-item .pattern-icon{width:38px;height:30px}
    .per-meter h3,.per-meter .section-intro{display:inline}.per-meter .section-intro{margin-left:8px}
    .area-header{gap:12px;margin-bottom:12px;align-items:center}.area-header h3{max-width:180px}.unit-select{flex-direction:column;align-items:flex-start;gap:3px;font-size:12px}.unit-select select{padding:5px;max-width:118px}
    .area-fields{grid-template-columns:repeat(2,minmax(0,150px));gap:14px}.actions{justify-content:flex-start;margin:14px 0 0;gap:20px}.primary{padding:9px 20px}.results-label{margin:0 0 10px;min-height:36px;font-size:12px;line-height:1.5}
    .results{gap:12px}.result{padding:12px 14px;gap:4px;grid-template-columns:minmax(0,1fr) 38px}.result .value{font-size:29px}.result .pattern-icon{width:38px;height:30px}.result .show{font-size:11px}
    .diagram{margin:14px 0 0;padding:14px;gap:14px;grid-template-columns:minmax(0,1fr) minmax(125px,.8fr)}.diagram-stage{height:184px}.diagram figcaption{font-size:12px;line-height:1.5}.diagram figcaption strong{font-size:13px}.diagram figcaption small{font-size:11px;line-height:1.4}
    .footer{display:flex;align-items:center;justify-content:space-between;gap:20px;border-top:1px solid #e5e7eb;margin-top:16px;padding-top:12px}.notice{margin:0;font-size:11px;max-width:620px}.method-link{border:0;padding:0;background:none;font-size:12px;white-space:nowrap;text-decoration:underline;text-underline-offset:3px}
    .error{margin:0;padding:10px 12px}.method-view{font-size:14px;line-height:1.55;max-width:840px;margin:auto}.method-view h3{font-size:20px}.method-view p{margin:12px 0}.method-view .primary{margin-top:8px}
    @media(min-width:761px) and (max-height:650px){.wrap{padding-top:12px;padding-bottom:12px}.context{margin-bottom:12px}.per-meter{margin:12px 0}.diagram-stage{height:166px}.footer{margin-top:12px;padding-top:10px}}
    @media(max-width:760px){
      .wrap{padding:16px 20px}form{grid-template-columns:1fr;gap:0}.context{margin-bottom:12px}.context-hint{display:block}.inputs:not(.area-fields) .field>span{min-height:0}.area-header h3{max-width:none}.area-header{justify-content:flex-start;gap:20px}.unit-select{flex-direction:row;align-items:center}.meter-grid{gap:18px}.per-meter{margin:14px 0}.meter-item{font-size:13px}.area-fields{grid-template-columns:repeat(2,minmax(0,150px))}.results-label{min-height:0}.diagram{grid-template-columns:minmax(0,1fr) minmax(130px,.8fr)}.diagram-stage{height:160px}.footer{align-items:flex-start;gap:12px}.notice{font-size:11px}.method-view{font-size:13px}
      .mobile-panels{display:flex;gap:8px;margin-bottom:16px}.mobile-panels button{border:1px solid #e5e7eb;border-radius:20px;padding:7px 18px;background:white;font-size:14px}.mobile-panels button[aria-pressed=true]{border-color:var(--sc-green);box-shadow:inset 0 0 0 1px var(--sc-green)}
      :host(:not([panel="results"])) .result-side{display:contents}:host(:not([panel="results"])) #results-content{display:none}:host([panel="results"]) .settings{display:none}.error{margin-top:12px}
    }
    @media(max-width:420px){.wrap{padding:14px 16px}.inputs:not(.area-fields) .field>span{min-height:36px}.field{font-size:13px}.area-header h3{max-width:160px}.unit-select{flex-direction:column;align-items:flex-start}.result{padding:11px}.result .label{font-size:12px}.result .value{font-size:27px}.diagram{grid-template-columns:1fr;gap:8px}.diagram-stage{height:150px}.diagram figcaption small{margin-top:4px}.footer{flex-direction:column;gap:8px}}
  `;
  class TekuSpaceCalculator extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const d = Number(this.getAttribute('diameter'));
      this.initialDiameter = Number.isFinite(d) && d >= 0.1 && d <= 200 ? d : 11;
      this.arrangement = 'triangle';
      this.gapUnit = 'cm'; this.areaUnit = 'm';
      const product = this.getAttribute('product-name') || 'Eigene Berechnung';
      this.attachShadow({mode: 'open'}).innerHTML = `<style>${styles}</style><div class="wrap"><div class="calculator-view">
        <p class="context">Ausgangsartikel: <strong>${escape(product)}</strong> · <span id="diameter-context">${number(this.initialDiameter)} cm</span><span class="context-hint"> · Durchmesser frei ändern.</span></p>
        <nav class="mobile-panels" aria-label="Rechneransicht"><button type="button" data-panel="settings" aria-pressed="true">Eingaben</button><button type="button" data-panel="results" aria-pressed="false">Ergebnisse</button></nav>
        <form novalidate><div class="settings">
          <div class="inputs"><label class="field"><span>Topfdurchmesser</span><div class="input-unit"><input name="diameter" inputmode="decimal" type="text" value="${number(this.initialDiameter)}" autocomplete="off" aria-describedby="diameter-hint" required><small>cm</small></div><small id="diameter-hint">Außendurchmesser am Topfrand</small></label>
          <label class="field"><span>Abstand zwischen Töpfen</span><div class="input-unit"><input name="gap" inputmode="decimal" type="text" value="0" autocomplete="off" required><select name="gapUnit" aria-label="Einheit für den Topfabstand"><option value="cm">cm</option><option value="in">Zoll</option></select></div><small>Freier Abstand von Rand zu Rand</small></label></div>
          <section class="per-meter" aria-labelledby="meter-title"><h3 id="meter-title">Auf 1 m²</h3><p class="section-intro">Töpfe auf einer Fläche von 1 × 1 m</p><div class="meter-grid"><div class="meter-item">${icon(false)}<div>Viereckverband<strong><span data-meter="square">–</span> <small>Stück</small></strong></div></div><div class="meter-item">${icon(true)}<div>Dreieckverband<strong><span data-meter="triangle">–</span> <small>Stück</small></strong></div></div></div></section>
          <div class="area-header"><h3>Ihre individuelle Stellfläche</h3><label class="unit-select">Maßeinheit<select name="areaUnit"><option value="m">Meter (m)</option><option value="cm">Zentimeter (cm)</option><option value="ft">Fuß (ft)</option><option value="in">Zoll (in)</option></select></label></div>
          <div class="inputs area-fields"><label class="field"><span>Länge</span><div class="input-unit"><input name="length" inputmode="decimal" type="text" value="1" autocomplete="off" required><small data-area-unit>m</small></div></label><label class="field"><span>Breite</span><div class="input-unit"><input name="width" inputmode="decimal" type="text" value="1" autocomplete="off" required><small data-area-unit>m</small></div></label></div>
          <div class="actions"><button class="reset" type="reset">Werte zurücksetzen</button><button class="primary" type="submit">Berechnen</button></div>
          </div><div class="result-side"><p id="error" class="error" role="alert" hidden></p>
          <div id="results-content"><p class="results-label" id="area-label"></p><div class="results">${['square','triangle'].map((key,i) => `<button class="result" type="button" data-arrangement="${key}" aria-pressed="${i===1}"><span class="label">${i ? 'Dreieckverband' : 'Viereckverband'}</span><span class="value"><span data-count="${key}">–</span> <span class="unit">Töpfe</span></span>${icon(!!i)}<span class="show">Anordnung anzeigen</span></button>`).join('')}</div>
          <figure class="diagram"><div class="diagram-stage" id="diagram"></div><figcaption id="diagram-caption"></figcaption></figure></div>
          <span class="sr-status" role="status" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)" id="announcement"></span>
        </div></form>
        <div class="footer"><p class="notice">Geometrische Berechnung für runde Töpfe. Wege und nicht nutzbare Bereiche von der Stellfläche abziehen.</p><button type="button" class="method-link" data-method="open">Wie wird gerechnet?</button></div>
        </div><section class="method-view" hidden aria-labelledby="method-title"><h3 id="method-title">Wie wird gerechnet?</h3><p>Der Rechner vergleicht ein rechtwinkliges Raster mit einem um eine halbe Topfteilung versetzten Dreieckverband. Beim Dreieckverband werden beide Ausrichtungen der Fläche geprüft. Die Ergebnisse zählen ganze Töpfe innerhalb der Fläche.</p><p>Die Topfteilung ist Durchmesser plus Abstand. Entsprechend der Formelvorlage wird am Flächenrand jeweils ein halber Abstand reserviert. Bei 0 cm Abstand dürfen Töpfe den Flächenrand berühren. Das Ergebnis vergleicht diese regelmäßigen Anordnungen; es ist kein Nachweis der maximal möglichen Kreispackung.</p><p>Ein manuell geänderter Durchmesser gilt nur für diese Berechnung und ändert den Ausgangsartikel nicht.</p><button type="button" class="primary" data-method="back">Zurück zum Rechner</button></section>
      </div>`;
      this.form = this.shadowRoot.querySelector('form');
      this.form.addEventListener('input', () => this.update());
      this.form.addEventListener('change', event => this.changeUnit(event));
      this.form.addEventListener('submit', event => {event.preventDefault();if(this.update(true) && matchMedia('(max-width:760px)').matches)this.showPanel('results');});
      this.form.addEventListener('reset', event => {event.preventDefault();this.reset();});
      this.shadowRoot.addEventListener('click', event => {
        const panel = event.target.closest('[data-panel]');
        if (panel) {this.showPanel(panel.dataset.panel);return;}
        const method = event.target.closest('[data-method]');
        if (method) {
          const open = method.dataset.method === 'open';
          this.shadowRoot.querySelector('.calculator-view').hidden = open;
          this.shadowRoot.querySelector('.method-view').hidden = !open;
          this.shadowRoot.querySelector(`[data-method="${open?'back':'open'}"]`).focus();
          return;
        }
        const button = event.target.closest('[data-arrangement]');
        if (!button) return;
        this.arrangement = button.dataset.arrangement;
        this.update();
      });
      this.update();
    }
    field(name) {return this.form.elements.namedItem(name);}
    showPanel(panel) {
      // Validation errors must remain visible with their associated inputs.
      if (panel === 'results' && !this.update(true)) return;
      this.setAttribute('panel',panel);
      this.shadowRoot.querySelectorAll('[data-panel]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.panel===panel)));
      this.shadowRoot.querySelector(`[data-panel="${panel}"]`).focus();
    }
    focusDiameter() {this.field('diameter').focus();}
    reset() {
      for (const [name,value] of Object.entries({diameter:number(this.initialDiameter),gap:'0',gapUnit:'cm',length:'1',width:'1',areaUnit:'m'})) this.field(name).value = value;
      this.gapUnit = 'cm';this.areaUnit = 'm';this.arrangement = 'triangle';
      this.update();
    }
    changeUnit(event) {
      const name = event.target.name;
      if (name !== 'gapUnit' && name !== 'areaUnit') return;
      const next = event.target.value, previous = this[name];
      const fields = name === 'gapUnit' ? ['gap'] : ['length','width'];
      for (const key of fields) {
        const value = E.parseDecimal(this.field(key).value);
        if (Number.isFinite(value)) this.field(key).value = String(Number(E.convert(value, previous, next).toPrecision(15))).replace('.', ',');
      }
      this[name] = next;
      this.update();
    }
    update(focusError = false) {
      const root = this.shadowRoot;
      // Read tracked units: select's input event precedes change/conversion.
      const input = {diameter: E.parseDecimal(this.field('diameter').value),gap: E.parseDecimal(this.field('gap').value) * E.units[this.gapUnit],length: E.parseDecimal(this.field('length').value) * E.units[this.areaUnit],width: E.parseDecimal(this.field('width').value) * E.units[this.areaUnit]};
      root.querySelectorAll('[data-area-unit]').forEach(node => node.textContent = this.areaUnit);
      for (const key of ['diameter','gap','length','width']) {this.field(key).removeAttribute('aria-invalid');this.field(key).removeAttribute('aria-describedby');}
      this.field('diameter').setAttribute('aria-describedby','diameter-hint');
      const invalid = ['diameter','gap','length','width'].find(key => !Number.isFinite(input[key]) || (key==='diameter' ? input[key]<0.1 || input[key]>200 : key==='gap' ? input[key]<0 || input[key]>200 : input[key]<0.01 || input[key]>1000000));
      let result, meter;
      try {
        result = E.calculate(input);
        meter = E.calculate({...input, length:100,width:100});
      } catch (error) {
        root.querySelector('#error').hidden=false;root.querySelector('#error').textContent=error.message;
        root.querySelector('#results-content').hidden=true;
        root.querySelectorAll('[data-meter]').forEach(node => node.textContent='–');
        root.querySelector('#announcement').textContent='';
        if(invalid){this.field(invalid).setAttribute('aria-invalid','true');this.field(invalid).setAttribute('aria-describedby','error');if(focusError)this.field(invalid).focus();}
        return false;
      }
      root.querySelector('#error').hidden=true;root.querySelector('#results-content').hidden=false;
      root.querySelector('#diameter-context').textContent = Math.abs(input.diameter-this.initialDiameter)<1e-10 ? `${number(this.initialDiameter)} cm` : `${number(input.diameter)} cm · eigener Durchmesser`;
      for (const key of ['square','triangle']) {
        root.querySelector(`[data-meter="${key}"]`).textContent=number(meter[key].count,0);
        root.querySelector(`[data-count="${key}"]`).textContent=number(result[key].count,0);
        const button=root.querySelector(`[data-arrangement="${key}"]`),selected=this.arrangement===key;
        button.setAttribute('aria-pressed',String(selected));button.querySelector('.show').textContent=selected?'Anordnung wird angezeigt':'Anordnung anzeigen';
      }
      root.querySelector('#area-label').textContent=`${number(input.length/100,6)} × ${number(input.width/100,6)} m = ${number(result.area,6)} m² · Ø ${number(input.diameter)} cm · Abstand ${number(input.gap,6)} cm`;
      this.draw(result[this.arrangement],input);
      clearTimeout(this.announceTimer);
      this.announceTimer=setTimeout(() => {root.querySelector('#announcement').textContent=`Ihre Fläche: ${number(result.square.count,0)} Töpfe im Viereckverband, ${number(result.triangle.count,0)} Töpfe im Dreieckverband.`;},400);
      this.dispatchEvent(new CustomEvent('teku-calculation',{detail:{input,result},bubbles:true,composed:true}));
      return true;
    }
    disconnectedCallback() {clearTimeout(this.announceTimer);}
    draw(plan,input) {
      const stage=this.shadowRoot.querySelector('#diagram'),caption=this.shadowRoot.querySelector('#diagram-caption');
      const title=this.arrangement==='triangle'?'Dreieckverband':'Viereckverband';
      if(!plan.count){stage.innerHTML='<p class="empty">Für diese Anordnung ist die Stellfläche zu klein.</p>';caption.innerHTML=`<strong>${title}</strong>0 Töpfe passen auf die angegebene Fläche.`;return;}
      const points=E.positions(plan,input.diameter),excerpt=points.length<plan.count;
      const length=excerpt?Math.max(...points.map(p=>p.x+plan.pitch/2)):input.length;
      const width=excerpt?Math.max(...points.map(p=>p.y+plan.pitch/2)):input.width;
      const pad=Math.max(length,width)*.025;
      stage.innerHTML=`<svg viewBox="${-pad} ${-pad} ${length+pad*2} ${width+pad*2}" role="img" aria-label="${title}: ${excerpt?'Ausschnitt mit '+points.length+' von ':''}${plan.count} Töpfen"><rect width="${length}" height="${width}" fill="white" stroke="var(--sc-muted)" stroke-width="1" vector-effect="non-scaling-stroke" ${excerpt?'stroke-dasharray="4 3"':''}/>${points.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="${p.radius}" fill="white" stroke="var(--sc-green)" stroke-width="1.2" vector-effect="non-scaling-stroke"/>`).join('')}</svg>`;
      const rowInfo=plan.columns===plan.oddColumns?`${number(plan.columns,0)} Töpfe je Reihe`:`${number(plan.columns,0)} / ${number(plan.oddColumns,0)} Töpfe im Wechsel`;
      caption.innerHTML=`<strong>${title}</strong>${number(plan.rows,0)} Reihen · ${rowInfo}<br>${plan.rotated?'Reihen entlang der Breite':'Reihen entlang der Länge'}<small>${excerpt?`Ausschnitt: ${points.length} von ${number(plan.count,0)} Töpfen. Gestrichelter Rahmen = Ausschnittsgrenze.`:'Draufsicht der gesamten Stellfläche.'} Kreise zeigen die Topfaußenmaße.</small>`;
    }
  }
  if(!customElements.get('teku-space-calculator'))customElements.define('teku-space-calculator',TekuSpaceCalculator);
})();
