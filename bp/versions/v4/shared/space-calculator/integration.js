'use strict';
// Product-page adapter; engine and custom element have no dependency on this dummy.
(() => {
  const dialog = document.createElement('dialog');
  dialog.id = 'space-calculator-modal';
  dialog.setAttribute('aria-labelledby', 'space-calculator-title');
  dialog.innerHTML = '<header class="sc-modal-header"><div><small>TEKU · PLANUNGSHILFE</small><h2 id="space-calculator-title">Stellflächenrechner</h2></div><button type="button" class="sc-modal-close" aria-label="Stellflächenrechner schließen">×</button></header><div class="sc-component-host"></div>';
  document.body.append(dialog);
  let opener, previousOverflow, locked = false;
  function release() {
    if (dialog.open || !locked) return;
    document.documentElement.style.overflow = previousOverflow;
    locked = false;
    if (opener?.isConnected) opener.focus({preventScroll: true});
  }
  function close() {dialog.close(); release();}
  function open({diameter, itemLength, itemWidth, plants, productKind, productName, kind, trigger = document.activeElement}) {
    opener = trigger;
    const component = document.createElement(kind === 'rectangle' ? 'teku-tray-space-calculator' : 'teku-space-calculator');
    if (kind === 'rectangle') {
      component.setAttribute('item-length',itemLength);component.setAttribute('item-width',itemWidth);
      if(plants!==null&&plants!==undefined)component.setAttribute('plants',plants);
      component.setAttribute('product-kind',productKind||'Trays');
    } else component.setAttribute('diameter', diameter);
    component.setAttribute('product-name', productName);
    dialog.querySelector('.sc-component-host').replaceChildren(component);
    if (!locked) previousOverflow = document.documentElement.style.overflow;
    locked = true;
    document.documentElement.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    if(component.focusInput)component.focusInput();else component.focusDiameter();
  }
  dialog.querySelector('.sc-modal-close').addEventListener('click', close);
  dialog.addEventListener('cancel', event => {event.preventDefault(); close();});
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const component = dialog.querySelector('.sc-component-host > *');
    const controls = [dialog.querySelector('.sc-modal-close'), ...component.shadowRoot.querySelectorAll('input,select,button,summary')].filter(node => !node.disabled && node.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1], active = event.composedPath()[0];
    if (event.shiftKey && (active === first || active === dialog)) {event.preventDefault(); last.focus();}
    else if (!event.shiftKey && (active === last || active === dialog)) {event.preventDefault(); first.focus();}
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
  dialog.addEventListener('close', release);
  window.TEKUSpaceCalculator = Object.freeze({open});
  window.showCalculator = id => {const p = productById(id); if (p) open({diameter: p.diameter, productName: p.name});};
  TEKUTechnical.calculator = (p, bp) => bp ? `<section class="space-launcher"><h3>Wie viele Anzuchtpaletten passen auf Ihre Fläche?</h3><p>Rechnen Sie mit ${escapeHTML(p.name)} oder eigenen Abmessungen. Vergleichen Sie beide Ausrichtungen.</p><button type="button" class="pink-button" data-tray-calculator="${p.index}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h1m6 0h1m-8 4h1m6 0h1m-8 4h1m6 0h1"/></svg> Stellflächenrechner öffnen</button><p class="small-note" style="margin-top:12px">Vorbelegt: ${format(p.length)} × ${format(p.width)} cm${p.plants===null||p.plants===undefined?'':' · '+format(p.plants)+' Pflanzen je Anzuchtpalette'}</p></section>` : `<section class="space-launcher"><h3>Wie viele Töpfe passen auf Ihre Fläche?</h3><p>Rechnen Sie mit ${escapeHTML(p.name)} oder einem eigenen Durchmesser. Vergleichen Sie Viereck- und Dreieckverband.</p><button type="button" class="pink-button" data-calculator="${p.index}">${svg('calculator')} Stellflächenrechner öffnen</button><p class="small-note" style="margin-top:12px">Vorbelegt: ${format(p.diameter)} cm · Durchmesser frei änderbar</p></section>`;
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-tray-calculator]');if(!trigger)return;
    event.preventDefault();const p=productById(trigger.dataset.trayCalculator);if(!p)return;
    open({kind:'rectangle',itemLength:p.length,itemWidth:p.width,plants:p.plants,productKind:document.body.classList.contains('bp-v2')?'Anzuchtpaletten':'Trays',productName:p.name,trigger});
  });
  renderProducts();
  // Optional review link reveals the CTA; the dialog always requires a user click.
  const params = new URL(location.href).searchParams;
  const id = params.get('calculator');
  if (id !== null && /^\d+$/.test(id) && productById(Number(id))) {
    const p = productById(Number(id));
    const trigger = document.querySelector(`#article-${p.index} [data-tech-tab="calculator"]`);
    if (trigger) trigger.click();
    const launcher = document.querySelector(`#article-${p.index} [data-calculator]`);
    launcher?.scrollIntoView({block: 'center', behavior: 'instant'});
    launcher?.focus({preventScroll: true});
  }
})();
