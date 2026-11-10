'use strict';
// V12 round pots only. Keep an in-page draft outside the product re-render targets.
(() => {
  const host=document.createElement('section');
  host.id='inline-request';host.className='inline-request';
  host.dataset.inlineRequest='true';host.hidden=true;
  host.setAttribute('aria-labelledby','inline-request-title');
  document.querySelector('.results-column').prepend(host);
  let form, panels, choices, step=1, selected=[], opener, lastKey='', lastType='sample';
  const presetFields=new Set(['country','sampleQuantity','offerQuantity']);
  function reveal(){
    host.hidden=false;
    host.scrollIntoView({block:'start',behavior:'instant'});
    (form?.querySelector(`[data-request-step="${step}"] h3`)||host.querySelector('h2')).focus({preventScroll:true});
  }
  function close(){
    host.hidden=true;
    const target=opener?.isConnected?opener:document.querySelector(`[data-list-checkout="${lastType}"]`);
    target?.focus({preventScroll:true});
  }
  function validateValue(input){
    if(input.matches('input:not([type="checkbox"]):not([type="number"]),select')){
      input.setCustomValidity(input.required&&!input.value.trim()?(input.name==='vatId'?'Bitte geben Sie Ihre Umsatzsteuer-ID an.':'Bitte füllen Sie dieses Feld aus.'):'');
    }
  }
  function updateSelection(){
    const any=choices.some(input=>input.checked);
    choices[0].setCustomValidity(any?'':'Bitte wählen Sie Muster, Angebot oder beides aus.');
    form.querySelector('#request-type-error').hidden=any;
    const sample=choices.some(input=>input.value==='sample'&&input.checked);
    form.querySelector('#request-address-title').textContent=sample?'Firmen- und Lieferadresse':'Firmenadresse';
    form.querySelector('[data-address-intro]').textContent=sample?'Geben Sie die Firmen- und Lieferadresse für Ihre Muster ein.':'Geben Sie die Firmenadresse für Ihr Angebot ein.';
    for(const choice of choices){
      const field=form.querySelector(`[data-request-quantity="${choice.value}"]`),input=field.querySelector('input');
      field.hidden=!choice.checked;input.disabled=!choice.checked;input.required=choice.checked;
    }
  }
  function updateProgress(){
    const fields=[...panels[step-1].querySelectorAll('input[required]:not([type="checkbox"]),select[required],textarea[required]')].filter(input=>!input.disabled);
    fields.forEach(validateValue);
    let completed=fields.filter(input=>input.value.trim()&&input.validity.valid).length;
    let total=fields.length;
    // The selected enquiry type, country and quantities are already preset.
    // Remove their initial credit, so each step starts at 0 / 50 percent.
    let baseline=fields.filter(input=>presetFields.has(input.name)).length;
    if(step===1){total++;baseline++;if(choices.some(input=>input.checked))completed++;}
    const fraction=Math.max(0,Math.min(1,(completed-baseline)/(total-baseline)));
    const progress=Math.round((step===2?50:0)+fraction*50);
    form.querySelector('[data-progress-label]').textContent=`${progress}%`;
    const bar=form.querySelector('.request-progress');
    bar.setAttribute('aria-valuenow',String(progress));
    bar.setAttribute('aria-valuetext',`${progress} %, Schritt ${step} von 2`);
    bar.firstElementChild.style.width=`${progress}%`;
  }
  function showStep(next,focus=true){
    step=next;
    panels.forEach((panel,index)=>{panel.hidden=index+1!==step;panel.disabled=panel.hidden;});
    form.querySelector('[data-step-label]').textContent=`Schritt ${step} von 2`;
    form.querySelector('[data-request-back]').textContent=step===1?'Abbrechen':'Zurück';
    form.querySelector('[data-request-next]').textContent=step===1?'Weiter':'Anfrage testen';
    updateSelection();updateProgress();
    if(focus)reveal();
  }
  function validateStep(){
    updateSelection();updateProgress();
    const fields=[...panels[step-1].querySelectorAll('input,select,textarea')];
    fields.forEach(validateValue);
    const invalid=fields.find(input=>!input.matches(':disabled')&&!input.checkValidity());
    if(invalid){invalid.reportValidity();return false;}
    return true;
  }
  function build(type){
    const colors=[...new Set(selected.flatMap(p=>p.variants.map(v=>v.color)))];
    host.innerHTML=`<button type="button" class="inline-request-close" data-request-close aria-label="Anfrageformular schließen">×</button><h2 class="sr-only" id="inline-request-title" tabindex="-1">Muster und Angebot anfordern</h2>
      <form id="request-form" class="combined-request-form request-wizard" novalidate>
        <header class="request-stepper">
          <div class="request-step-label"><span data-step-label>Schritt 1 von 2</span><span data-progress-label>0%</span></div>
          <div class="request-progress" role="progressbar" aria-label="Fortschritt der Anfrage" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>
        </header>
        <div class="request-wizard-body">
          <details class="request-products"><summary>${selected.length} Artikel ausgewählt</summary><div class="request-summary">${selected.map(p=>`<strong>${escapeHTML(p.name)}</strong> · ${escapeHTML(selectedVariant(p)?.color||'')}`).join('<br>')}</div></details>
          <fieldset class="request-step-panel" data-request-step="1" aria-labelledby="request-contact-title">
            <h3 id="request-contact-title" tabindex="-1">Kontaktdaten</h3>
            <p class="request-step-intro">Geben Sie Ihre persönlichen Kontaktdaten ein.</p>
            <fieldset class="request-types">
              <legend>Ihre Anfrage</legend>
              <div class="request-type-options">
                <label class="request-check"><input type="checkbox" name="requestType" value="sample" ${type==='sample'?'checked':''}>Muster anfordern</label>
                <label class="request-check"><input type="checkbox" name="requestType" value="offer" ${type==='offer'?'checked':''}>Angebot anfordern</label>
              </div>
              <p class="small-note">Sie können beide Optionen gleichzeitig auswählen.</p>
              <p id="request-type-error" class="request-type-error" role="alert" hidden>Bitte wählen Sie Muster, Angebot oder beides aus.</p>
            </fieldset>
            <div class="form-grid request-contact-grid">
              <label class="form-field request-salutation">Anrede *<select name="salutation" required autocomplete="honorific-prefix"><option value="">Bitte wählen Sie …</option><option>Frau</option><option>Herr</option><option value="none">Keine Angabe</option></select></label>
              <label class="form-field request-first-name">Vorname *<input name="firstName" required autocomplete="given-name" placeholder="Vornamen eingeben …"></label>
              <label class="form-field">Nachname *<input name="lastName" required autocomplete="family-name" placeholder="Nachnamen eingeben …"></label>
              <label class="form-field">Funktion im Unternehmen *<input name="jobTitle" required autocomplete="organization-title" placeholder="Funktion eingeben …"></label>
              <label class="form-field">Telefon *<input name="phone" type="tel" required autocomplete="tel" placeholder="Telefonnummer eingeben …"></label>
              <label class="form-field request-email">E-Mail-Adresse *<input name="email" type="email" required autocomplete="email" placeholder="E-Mail-Adresse eingeben …"></label>
            </div>
          </fieldset>
          <fieldset class="request-step-panel" data-request-step="2" aria-labelledby="request-address-title" hidden disabled>
            <h3 id="request-address-title" tabindex="-1">Firmen- und Lieferadresse</h3>
            <p class="request-step-intro" data-address-intro>Geben Sie Ihre Firmenadresse bzw. die Lieferadresse für Muster ein.</p>
            <div class="request-address-grid">
              <label class="form-field address-company">Firma *<input name="company" required autocomplete="organization" placeholder="Firmenname eingeben …"></label>
              <label class="form-field address-addition">Firma Zusatz<input name="companyAddition" placeholder="Firmenname Zusatz eingeben …"></label>
              <label class="form-field address-street">Straße *<input name="street" required autocomplete="address-line1" placeholder="Straße eingeben …"></label>
              <label class="form-field address-house">Hausnummer *<input name="houseNumber" required placeholder="Hausnummer"></label>
              <label class="form-field address-postal">PLZ *<input name="postalCode" required autocomplete="postal-code" placeholder="PLZ eingeben …"></label>
              <label class="form-field address-city">Ort *<input name="city" required autocomplete="address-level2" placeholder="Ort eingeben …"></label>
              <label class="form-field address-country">Land *<input name="country" value="Deutschland" required autocomplete="country-name"></label>
              <label class="form-field address-region">Bundesland / Region<input name="region" autocomplete="address-level1" placeholder="Bundesland oder Region eingeben …"></label>
              <label class="form-field address-vat">Umsatzsteuer-ID *<input name="vatId" required spellcheck="false" placeholder="Umsatzsteuer-ID eingeben …"></label>
            </div>
            <div class="form-grid request-selection-grid">
              <label class="form-field" data-request-quantity="sample">Musteranzahl *<input name="sampleQuantity" type="number" min="1" max="10" value="1" required></label>
              <label class="form-field" data-request-quantity="offer">Gewünschte Stückzahl für das Angebot *<input name="offerQuantity" type="number" min="1" max="10000000" value="1000" required></label>
              <label class="form-field wide">Farbe<select name="color">${colors.map(color=>`<option ${color===selectedVariant(selected[0])?.color?'selected':''}>${escapeHTML(color)}</option>`).join('')}</select></label>
              <label class="form-field wide">Nachricht<textarea name="message" placeholder="Ihre Wünsche oder Fragen"></textarea></label>
            </div>
          </fieldset>
        </div>
        <footer class="request-wizard-footer">
          <p class="small-note">* Pflichtfelder · Click-Dummy: Es wird keine Anfrage versendet.</p>
          <div class="request-wizard-actions"><button class="outline-button" type="button" data-request-back>Abbrechen</button><button class="pink-button" type="submit" data-request-next>Weiter</button></div>
        </footer>
      </form>
`;
    form=host.querySelector('#request-form');
    panels=[...form.querySelectorAll('[data-request-step]')];
    choices=[...form.querySelectorAll('[name="requestType"]')];
    form.addEventListener('input',event=>{validateValue(event.target);updateSelection();updateProgress();});
    form.addEventListener('change',()=>{updateSelection();updateProgress();});
    form.querySelector('[data-request-back]').addEventListener('click',()=>{if(step===1)close();else showStep(1);});
    form.addEventListener('submit',event=>{
      event.preventDefault();event.stopImmediatePropagation();
      if(!validateStep())return;
      if(step===1){showStep(2);return;}
      panels[0].disabled=false;
      const data=new FormData(form),types=data.getAll('requestType');
      const value=name=>escapeHTML(String(data.get(name)||'').trim());
      const quantities=types.map(key=>key==='sample'?`Muster: ${value('sampleQuantity')} Stück`:`Angebot: ${value('offerQuantity')} Stück`).join('<br>');
      const address=[value('company'),value('companyAddition'),`${value('street')} ${value('houseNumber')}`,`${value('postalCode')} ${value('city')}`,value('region'),value('country')].filter(Boolean).join('<br>');
      host.innerHTML=`<button type="button" class="inline-request-close" data-request-close aria-label="Anfrageformular schließen">×</button><h2 id="inline-request-title" tabindex="-1">Anfrage im Dummy abgeschlossen</h2><p class="small-note">100 % · Beide Schritte abgeschlossen</p><p>Ausgewählt: <strong>${types.length===2?'Muster und Angebot':types[0]==='sample'?'Muster':'Angebot'}</strong></p><p>${quantities}</p><p><strong>Kontakt</strong><br>${value('firstName')} ${value('lastName')}<br>${value('phone')}<br>${value('email')}</p><p><strong>${types.includes('sample')?'Firmen- und Lieferadresse':'Firmenadresse'}</strong><br>${address}</p><p>Es wurde keine Muster- oder Angebotsanfrage versendet.</p><button type="button" class="pink-button" data-request-close>Zurück zu den Artikeln</button>`;
      form=null;reveal();
    });
    showStep(1,false);
  }
  host.addEventListener('click',event=>{if(event.target.closest('[data-request-close]'))close();});
  showRequest=function(type,ids,entries){
    selected=ids.map(productById).filter(Boolean);
    if(!selected.length){toast('Bitte wählen Sie mindestens einen Artikel.');return;}
    opener=document.activeElement;lastType=type;
    const items=entries||selected.map(p=>({id:p.index,key:`${p.index}:${p.variants.indexOf(selectedVariant(p))}`,name:p.name,color:selectedVariant(p)?.color||''}));
    const key=type+':'+items.map(item=>item.key).join('|');
    if(!form)build(type);
    else if(lastKey!==key){
      choices.find(input=>input.value===type).checked=true;
      updateSelection();updateProgress();
    }
    lastKey=key;
    form.querySelector('.request-products summary').textContent=`${items.length} Artikel ausgewählt`;
    form.querySelector('.request-summary').innerHTML=items.map(item=>`<strong>${escapeHTML(item.name)}</strong> · ${escapeHTML(item.color)}`).join('<br>');
    const colorField=form.querySelector('[name="color"]')?.closest('label')||form.querySelector('.selection-form-colors')?.closest('label');
    colorField.innerHTML=`Ausgewählte Varianten<span class="selection-form-colors">${escapeHTML([...new Set(items.map(item=>item.color))].join(', '))}</span>`;
    if(document.querySelector('#modal').open)closeModal();
    // A previous list notification must not cover the in-page form controls.
    clearTimeout(toast.timer);document.querySelector('#toast').hidden=true;
    activateTab('variants');reveal();
    return host;
  };
})();
