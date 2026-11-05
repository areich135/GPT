'use strict';
// Shared by the current VCG and BP drafts; archived request flows stay intact.
(() => {
  showRequest = function(type, ids) {
    const selected=ids.map(productById).filter(Boolean);
    if(!selected.length){toast('Bitte wählen Sie mindestens einen Artikel.');return;}
    const bp=document.body.classList.contains('bp-v2');
    const colors=[...new Set(selected.flatMap(p=>p.variants.map(v=>v.color)))];
    openModal('Muster und Angebot anfordern', `
      <p class="small-note">Click-Dummy: Es wird keine Anfrage versendet.</p>
      <div class="request-summary">${selected.map(p=>`<strong>${escapeHTML(p.name)}</strong> · ${escapeHTML(selectedVariant(p)?.color||'')}`).join('<br>')}</div>
      <form id="request-form" class="combined-request-form">
        <fieldset class="request-types">
          <legend>Was möchten Sie anfordern?</legend>
          <div class="request-type-options">
            <label class="request-check"><input type="checkbox" name="requestType" value="sample" ${type==='sample'?'checked':''}>Muster anfordern</label>
            <label class="request-check"><input type="checkbox" name="requestType" value="offer" ${type==='offer'?'checked':''}>Angebot anfordern</label>
          </div>
          <p class="small-note">Sie können beide Optionen gleichzeitig auswählen.</p>
          <p id="request-type-error" class="request-type-error" role="alert" hidden>Bitte wählen Sie Muster, Angebot oder beides aus.</p>
        </fieldset>
        <div class="form-grid">
          <label class="request-check request-business wide"><input type="checkbox" name="businessCustomer" required>Ich bin Geschäftskunde. *</label>
          <label class="form-field">Firma *<input name="company" required autocomplete="organization"></label>
          <label class="form-field">Umsatzsteuer-ID *<input name="vatId" required spellcheck="false"></label>
          <label class="form-field">Ansprechpartner *<input name="name" required autocomplete="name"></label>
          <label class="form-field">E-Mail *<input name="email" type="email" required autocomplete="email"></label>
          <label class="form-field" data-request-quantity="sample">Musteranzahl *<input name="sampleQuantity" type="number" min="1" ${bp?'':'max="10"'} value="1" required></label>
          <label class="form-field" data-request-quantity="offer">Gewünschte Stückzahl für das Angebot *<input name="offerQuantity" type="number" min="1" ${bp?'':'max="10000000"'} value="1000" required></label>
          <label class="form-field wide">Farbe<select name="color">${colors.map(color=>`<option ${color===selectedVariant(selected[0])?.color?'selected':''}>${escapeHTML(color)}</option>`).join('')}</select></label>
          <label class="form-field wide">Nachricht<textarea name="message" placeholder="Ihre Wünsche oder Fragen"></textarea></label>
        </div>
        <p class="small-note">* Pflichtfelder</p>
        <button class="pink-button" type="submit">Anfrage testen</button>
      </form>`);
    const form=document.getElementById('request-form');
    const choices=[...form.querySelectorAll('[name="requestType"]')];
    function updateSelection(){
      const any=choices.some(input=>input.checked);
      choices[0].setCustomValidity(any?'':'Bitte wählen Sie Muster, Angebot oder beides aus.');
      form.querySelector('#request-type-error').hidden=any;
      for(const choice of choices){
        const field=form.querySelector(`[data-request-quantity="${choice.value}"]`);
        field.hidden=!choice.checked;
        const input=field.querySelector('input');
        input.disabled=!choice.checked;input.required=choice.checked;
      }
    }
    function validateVAT(){
      const input=form.elements.namedItem('vatId');
      input.setCustomValidity(input.value.trim()?'':'Bitte geben Sie Ihre Umsatzsteuer-ID an.');
    }
    choices.forEach(input=>input.addEventListener('change',updateSelection));
    form.elements.namedItem('vatId').addEventListener('input',validateVAT);
    form.addEventListener('submit',event=>{
      event.preventDefault();event.stopImmediatePropagation();
      updateSelection();validateVAT();
      if(!form.reportValidity())return;
      const data=new FormData(form),types=data.getAll('requestType');
      const summary=types.map(key=>key==='sample'?`Muster: ${escapeHTML(data.get('sampleQuantity'))} Stück`:`Angebot: ${escapeHTML(data.get('offerQuantity'))} Stück`).join('<br>');
      openModal('Anfrage im Dummy abgeschlossen',`<p>Ausgewählt: <strong>${types.length===2?'Muster und Angebot':types[0]==='sample'?'Muster':'Angebot'}</strong></p><p>${summary}</p><p>Es wurde keine Muster- oder Angebotsanfrage versendet. Ihre Eingaben werden nicht gespeichert.</p><button class="pink-button" data-action="close">Zurück zur Produktseite</button>`);
    });
    updateSelection();validateVAT();
  };
})();
