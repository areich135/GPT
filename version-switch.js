'use strict';
(() => {
  const root=new URL('./',document.currentScript.src);
  const bp=location.pathname.startsWith(new URL('bp/',root).pathname);
  const versions=bp?['v1']:['v1','v2','v3'];
  const current=bp?'v1':versions.slice(0,2).find(v=>location.pathname.startsWith(new URL(`versions/${v}/`,root).pathname))||'v3';
  const target=v=>{const u=new URL(bp?'bp/':v==='v3'?'./':`versions/${v}/`,root);u.searchParams.set('version',v);u.hash=location.hash;return u};
  const requested=new URL(location.href).searchParams.get('version');
  if(versions.includes(requested)&&requested!==current){location.replace(target(requested));return}
  document.addEventListener('DOMContentLoaded',()=>{
    const bar=document.createElement('nav');bar.className='version-toolbar';bar.setAttribute('aria-label','Produktbereich und Entwurf');
    bar.innerHTML=`<div class="category-tabs"><a href="${new URL('./?version=v3',root)}" ${bp?'':'aria-current="page"'}>Rundtöpfe</a><a href="${new URL('bp/?version=v1',root)}" ${bp?'aria-current="page"':''}>Trays / Anzuchtpaletten</a></div><div class="version-choice"><span>${bp?'BP':'VCG'}</span><label for="prototype-version">Entwurf</label><select id="prototype-version" aria-label="Entwurfsversion auswählen">${versions.map(v=>`<option value="${v}">${v.toUpperCase()}</option>`).join('')}</select></div>`;
    bar.querySelector('select').value=current;bar.querySelector('select').addEventListener('change',e=>location.assign(target(e.target.value)));document.body.prepend(bar);
  });
})();
