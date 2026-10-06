'use strict';
(() => {
  const script = document.currentScript;
  const root = new URL('./', script.src);
  const original = location.pathname.startsWith(new URL('versions/v1/', root).pathname);
  const requested = new URL(location.href).searchParams.get('version');
  const current = original ? 'v1' : 'v2';
  const targetURL = version => {
    const url = new URL(version === 'v1' ? 'versions/v1/' : './', root);
    url.searchParams.set('version', version);
    url.hash = location.hash;
    return url;
  };
  if ((requested === 'v1' || requested === 'v2') && requested !== current) {
    location.replace(targetURL(requested).href);
    return;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.createElement('nav');
    bar.className = 'version-toolbar';
    bar.setAttribute('aria-label', 'Entwurfsversion');
    bar.innerHTML = `<label for="prototype-version">Version</label><select id="prototype-version" aria-label="Entwurfsversion auswählen"><option value="v1">V1</option><option value="v2">V2</option></select>`;
    bar.querySelector('select').value = current;
    bar.querySelector('select').addEventListener('change', event => {
      location.assign(targetURL(event.target.value).href);
    });
    document.body.prepend(bar);
  });
})();
