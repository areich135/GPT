'use strict';
(() => {
  const script = document.currentScript;
  const root = new URL('./', script.src);
  const versions = ['v1', 'v2', 'v3'];
  const requested = new URL(location.href).searchParams.get('version');
  const current = versions.slice(0, 2).find(version => location.pathname.startsWith(new URL(`versions/${version}/`, root).pathname)) || 'v3';
  const targetURL = version => {
    const url = new URL(version === 'v3' ? './' : `versions/${version}/`, root);
    url.searchParams.set('version', version);
    url.hash = location.hash;
    return url;
  };
  if (versions.includes(requested) && requested !== current) {
    location.replace(targetURL(requested).href);
    return;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.createElement('nav');
    bar.className = 'version-toolbar';
    bar.setAttribute('aria-label', 'Entwurfsversion');
    bar.innerHTML = `<label for="prototype-version">Version</label><select id="prototype-version" aria-label="Entwurfsversion auswählen"><option value="v1">V1</option><option value="v2">V2</option><option value="v3">V3</option></select>`;
    bar.querySelector('select').value = current;
    bar.querySelector('select').addEventListener('change', event => {
      location.assign(targetURL(event.target.value).href);
    });
    document.body.prepend(bar);
  });
})();
