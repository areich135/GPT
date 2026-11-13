 'use strict';
(() => {
 const root=new URL('./',document.currentScript.src);
 const areas=[{base:'',label:'Rundtöpfe',code:'VCG',count:12},{base:'bp/',label:'Anzuchtpaletten',code:'BP',count:6},{base:'st/',label:'Trays',code:'ST',count:1}];
 const area=areas.find(a=>a.base&&location.pathname.startsWith(new URL(a.base,root).pathname))||areas[0];
 const versions=Array.from({length:area.count},(_,i)=>`v${i+1}`),latest=`v${area.count}`;
 const current=versions.slice(0,-1).find(v=>location.pathname.startsWith(new URL(`${area.base}versions/${v}/`,root).pathname))||latest;
 const target=v=>{const u=new URL(v===latest?(area.base||'./'):`${area.base}versions/${v}/`,root);u.searchParams.set('version',v);u.hash=location.hash;return u};
 const requested=new URL(location.href).searchParams.get('version');
 if(versions.includes(requested)&&requested!==current){location.replace(target(requested));return}
 document.addEventListener('DOMContentLoaded',()=>{
  const bar=document.createElement('nav');bar.className='version-toolbar';bar.setAttribute('aria-label','Produktbereich und Entwurf');
  bar.innerHTML=`<div class="category-tabs">${areas.map(a=>`<a href="${new URL(`${a.base||'./'}?version=v${a.count}`,root)}" ${a===area?'aria-current="page"':''}>${a.label}</a>`).join('')}</div><div class="version-choice"><span>${area.code}</span><label for="prototype-version">Entwurf</label><select id="prototype-version" aria-label="Entwurfsversion auswählen">${versions.map(v=>`<option value="${v}">${v.toUpperCase()}</option>`).join('')}</select></div>`;
  bar.querySelector('select').value=current;bar.querySelector('select').addEventListener('change',e=>location.assign(target(e.target.value)));document.body.prepend(bar);
 });
})();
