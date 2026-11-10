'use strict';
// V11 display units only. Product data and filter keys stay in cm / litres.
(() => {
  let unit = 'cm';
  const formatters = new Map();
  function number(value) {
    const locale = document.documentElement.lang || 'de';
    if (!formatters.has(locale)) {
      try { formatters.set(locale, new Intl.NumberFormat(locale, {maximumFractionDigits: 2})); }
      catch { formatters.set(locale, new Intl.NumberFormat('de', {maximumFractionDigits: 2})); }
    }
    return formatters.get(locale).format(value);
  }
  function measure(value, kind) {
    if (kind === 'volume') return [number(unit === 'inch' ? value / 0.016387064 : value), unit === 'inch' ? 'in³' : 'l'];
    return [number(unit === 'inch' ? value / 2.54 : value), unit];
  }
  function text(value, kind) { return measure(value, kind).join(' '); }

  const section = document.createElement('section');
  section.className = 'filter-section';
  section.id = 'filter-unit';
  section.innerHTML = '<h2 id="unit-heading"><img class="filter-symbol" src="assets/filter-diameter.svg" alt=""> MAẞEINHEIT</h2><div class="measurement-toggle" role="group" aria-labelledby="unit-heading"><button type="button" data-measurement-unit="cm" aria-pressed="true" aria-label="Zentimeter">cm</button><button type="button" data-measurement-unit="inch" aria-pressed="false" aria-label="Inch">inch</button></div><p class="sr-only" id="measurement-status" role="status"></p>';
  document.querySelector('#filter-body').prepend(section);
  // Reuse the existing compact-filter navigation and its focus handling.
  filterGroups.unshift(['unit', 'Maßeinheit', 'filter-diameter.svg']);
  const compact = document.createElement('button');
  compact.type = 'button';
  compact.dataset.filterGroup = 'unit';
  compact.className = 'compact-unit';
  compact.title = 'Maßeinheit';
  compact.setAttribute('aria-controls', 'filter-unit');
  document.querySelector('#compact-filters').prepend(compact);

  function bind(node, value, kind, label) {
    if (!node) return;
    node.dataset.measurementValue = String(value);
    node.dataset.measurementKind = kind;
    if (label) node.dataset.measurementLabel = label;
  }
  function bindRows() {
    document.querySelectorAll('.product-row').forEach(row => {
      const p = productById(row.id.replace('article-', ''));
      if (!p) return;
      const values = [[p.diameter, 'length', 'Durchmesser'], [p.height, 'length', 'Höhe'], [p.volume, 'volume', 'Volumen']];
      row.querySelectorAll('.row-specs .metric').forEach((metric, index) => {
        const value = document.createElement('span');
        value.className = 'measurement-value';
        const image = metric.querySelector('img');
        metric.replaceChildren(...(image ? [image] : []), value);
        bind(value, ...values[index]);
      });
      if (row.querySelector('[data-tech-tab="measures"][aria-selected="true"]')) {
        row.querySelectorAll('.spec-table dd').forEach((node, index) => bind(node, ...values[index]));
      }
    });
  }
  function refreshFilters() {
    document.querySelectorAll('#diameters [data-diameter]').forEach(button => {
      button.textContent = text(Number(button.dataset.diameter), 'length');
    });
    document.querySelectorAll('#volumes [data-volume]').forEach(button => {
      const index = volumes.findIndex(range => range.id === button.dataset.volume);
      const range = volumes[index];
      button.textContent = unit === 'cm' ? range.label : Number.isFinite(range.max)
        ? `${text(range.min, 'volume')} – ${text(range.max, 'volume')}`
        : `> ${text(volumes[index - 1].max, 'volume')}`;
    });
  }
  function refresh() {
    document.querySelectorAll('[data-measurement-value]').forEach(node => {
      const value = Number(node.dataset.measurementValue), kind = node.dataset.measurementKind;
      const [display, suffix] = measure(value, kind);
      if (node.classList.contains('measurement-value')) {
        const unitLabel = document.createElement('small');
        unitLabel.className = 'measurement-unit';
        unitLabel.textContent = suffix;
        node.replaceChildren(document.createTextNode(display), unitLabel);
        node.parentElement.setAttribute('aria-label', `${node.dataset.measurementLabel}: ${display} ${suffix}`);
      } else node.textContent = `${display} ${suffix}`;
    });
    refreshFilters();
    section.querySelectorAll('[data-measurement-unit]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.measurementUnit === unit)));
    compact.textContent = unit;
    compact.setAttribute('aria-label', `Maßeinheit: ${unit}. Filter aufklappen`);
  }
  const previousProducts = renderProducts;
  renderProducts = function(...args) { const result = previousProducts.apply(this, args); bindRows(); refresh(); return result; };
  const previousFilters = renderFilters;
  renderFilters = function(...args) { const result = previousFilters.apply(this, args); refreshFilters(); return result; };
  const previousHero = showHeroInfo;
  showHeroInfo = function(p) {
    previousHero(p);
    const values = [[p.diameter, 'length'], [p.height, 'length'], [p.volume, 'volume']];
    document.querySelectorAll('#hero-info .spec-line span').forEach((node, index) => bind(node, ...values[index]));
    refresh();
  };
  section.addEventListener('click', event => {
    const button = event.target.closest('[data-measurement-unit]');
    if (!button || button.dataset.measurementUnit === unit) return;
    unit = button.dataset.measurementUnit;
    // Update values in place: retain open panels, carousel position and lists.
    refresh();
    section.querySelector('#measurement-status').textContent = unit === 'inch' ? 'inch · in³' : 'cm · l';
  });
  // The selector is available for every page language; only number formatting
  // follows the document language. This dummy itself currently contains German.
  new MutationObserver(refresh).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  bindRows();
  refresh();
})();
