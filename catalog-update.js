'use strict';
// Current drafts only. Keep the action rail within the variants section.
(() => {
  const rail=document.querySelector('.selection-rail');
  const catalog=document.querySelector('#variants-panel');
  const host=document.createElement('aside');
  host.className='selection-rail-host';
  host.setAttribute('aria-label','Schnellzugriff auf Ihre Listen');
  catalog.append(host);host.append(rail);
  function sync(){
    host.hidden=state.filterCollapsed;
    rail.hidden=state.filterCollapsed;
  }
  // Both collapse setters update this class, including the capture-phase adapter.
  new MutationObserver(sync).observe(catalog,{attributes:true,attributeFilter:['class']});
  const visible=new IntersectionObserver(entries=>{
    host.classList.toggle('outside-variants',!entries[0].isIntersecting);
  });
  visible.observe(catalog);
  sync();
})();
