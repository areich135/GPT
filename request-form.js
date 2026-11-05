'use strict';
// Shared two-step enquiry flow for the current VCG and BP drafts.
(() => {
  showRequest = function(type, ids) {
    const selected=ids.map(productById).filter(Boolean);
    if(!selected.length){toast('Bitte wählen Sie mindestens einen Artikel.');return;}
    const bp=document.body.classList.contains('bp-v2');
    const colors=[...new Set(selected.flatMap(p=>p.variants.map(v=>v.color)))];
    openModal('Muster und Angebot anfordern', `
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
            <fieldset class="request-types">
              <legend>Ihre Anfrage</legend>
              <div class="request-type-options">
                <label class="request-check"><input type="checkbox" name="requestType" value="sample" ${type==='sample'?'checked':''}>Muster anfordern</label>
                <label class="request-check"><input type="checkbox" name="requestType" value="offer" ${type==='offer'?'checked':''}>Angebot anfordern</label>
              </div>
              <p class="small-note">Sie können beide Optionen gleichzeitig auswählen.</p>
              <p id="request-type-error" class="request-type-error" role="alert" hidden>Bitte wählen Sie Muster, Angebot oder beides aus.</p>
            </fieldset>
            <div class="form-grid request-selection-grid">
              <label class="form-field" data-request-quantity="sample">Musteranzahl *<input name="sampleQuantity" type="number" min="1" ${bp?'':'max="10"'} value="1" required></label>
              <label class="form-field" data-request-quantity="offer">Gewünschte Stückzahl für das Angebot *<input name="offerQuantity" type="number" min="1" ${bp?'':'max="10000000"'} value="1000" required></label>
              <label class="form-field wide">Farbe<select name="color">${colors.map(color=>`<option ${color===selectedVariant(selected[0])?.color?'selected':''}>${escapeHTML(color)}</option>`).join('')}</select></label>
              <label class="form-field wide">Nachricht<textarea name="message" placeholder="Ihre Wünsche oder Fragen"></textarea></label>
            </div>
          </fieldset>
        </div>
        <footer class="request-wizard-footer">
          <p class="small-note">* Pflichtfelder · Click-Dummy: Es wird keine Anfrage versendet.</p>
          <div class="request-wizard-actions"><button class="outline-button" type="button" data-request-back>Abbrechen</button><button class="pink-button" type="submit" data-request-next>Weiter</button></div>
        </footer>
      </form>`);
    document.getElementById('modal-title').classList.add('sr-only');
    const form=document.getElementById('request-form');
    const panels=[...form.querySelectorAll('[data-request-step]')];
    const choices=[...form.querySelectorAll('[name="requestType"]')];
    const body=form.querySelector('.request-wizard-body');
    let step=1;
    function updateSelection(){
      const any=choices.some(input=>input.checked);
      choices[0].setCustomValidity(any?'':'Bitte wählen Sie Muster, Angebot oder beides aus.');
      form.querySelector('#request-type-error').hidden=any;
      const sample=choices.some(input=>input.value==='sample'&&input.checked);
      form.querySelector('#request-address-title').textContent=sample?'Firmen- und Lieferadresse':'Firmenadresse';
      form.querySelector('[data-address-intro]').textContent=sample?'Geben Sie die Firmen- und Lieferadresse für Ihre Muster ein.':'Geben Sie die Firmenadresse für Ihr Angebot ein.';
      for(const choice of choices){
        const field=form.querySelector(`[data-request-quantity="${choice.value}"]`);
        field.hidden=!choice.checked;
        const input=field.querySelector('input');
        input.disabled=!choice.checked;input.required=choice.checked;
      }
    }
    function showStep(next){
      step=next;
      panels.forEach((panel,index)=>{panel.hidden=index+1!==step;panel.disabled=panel.hidden;});
      form.querySelector('[data-step-label]').textContent=`Schritt ${step} von 2`;
      const progress=step===1?0:50;
      form.querySelector('[data-progress-label]').textContent=`${progress}%`;
      const bar=form.querySelector('.request-progress');
      bar.setAttribute('aria-valuenow',String(progress));
      bar.setAttribute('aria-valuetext',`Schritt ${step} von 2`);
      bar.firstElementChild.style.width=`${progress}%`;
      form.querySelector('[data-request-back]').textContent=step===1?'Abbrechen':'Zurück';
      form.querySelector('[data-request-next]').textContent=step===1?'Weiter':'Anfrage testen';
      body.scrollTop=0;
      panels[step-1].querySelector('h3').focus({preventScroll:true});
    }
    function validateValue(input){
      if(input.matches('input:not([type="checkbox"]):not([type="number"]),select')){
        input.setCustomValidity(input.required&&!input.value.trim()?(input.name==='vatId'?'Bitte geben Sie Ihre Umsatzsteuer-ID an.':'Bitte füllen Sie dieses Feld aus.'):'');
      }
    }
    function validateStep(){
      updateSelection();
      const fields=[...panels[step-1].querySelectorAll('input,select,textarea')];
      fields.forEach(validateValue);
      const invalid=fields.find(input=>!input.matches(':disabled')&&!input.checkValidity());
      if(invalid){invalid.reportValidity();return false;}
      return true;
    }
    choices.forEach(input=>input.addEventListener('change',updateSelection));
    form.addEventListener('input',event=>validateValue(event.target));
    form.querySelector('[data-request-back]').addEventListener('click',()=>{if(step===1)closeModal();else showStep(1);});
    form.addEventListener('submit',event=>{
      event.preventDefault();event.stopImmediatePropagation();
      if(!validateStep())return;
      if(step===1){showStep(2);return;}
      // Contact data was validated before the second step. Re-enable that
      // fieldset only to gather the complete, in-memory request summary.
      panels[0].disabled=false;
      const data=new FormData(form),types=data.getAll('requestType');
      const value=name=>escapeHTML(String(data.get(name)||'').trim());
      const quantities=types.map(key=>key==='sample'?`Muster: ${value('sampleQuantity')} Stück`:`Angebot: ${value('offerQuantity')} Stück`).join('<br>');
      const address=[value('company'),value('companyAddition'),`${value('street')} ${value('houseNumber')}`,`${value('postalCode')} ${value('city')}`,value('region'),value('country')].filter(Boolean).join('<br>');
      openModal('Anfrage im Dummy abgeschlossen',`<p class="small-note">100 % · Beide Schritte abgeschlossen</p><p>Ausgewählt: <strong>${types.length===2?'Muster und Angebot':types[0]==='sample'?'Muster':'Angebot'}</strong></p><p>${quantities}</p><p><strong>Kontakt</strong><br>${value('firstName')} ${value('lastName')}<br>${value('phone')}<br>${value('email')}</p><p><strong>${types.includes('sample')?'Firmen- und Lieferadresse':'Firmenadresse'}</strong><br>${address}</p><p>Es wurde keine Muster- oder Angebotsanfrage versendet. Ihre Eingaben werden nicht gespeichert.</p><button class="pink-button" data-action="close">Zurück zur Produktseite</button>`);
    });
    updateSelection();showStep(1);
  };
})();
