'use strict';
// Shared interaction for the October 26 XD drafts; earlier versions do not load it.
(() => {
  const bp=document.body.classList.contains('bp-v2');
  const sidebar=document.getElementById('selection-sidebar');
  const original=bp?setCollapsed:setFilterCollapsed;
  function collapseFilter(collapsed){
    original(collapsed);
    sidebar.hidden=!collapsed;
  }
  if(bp)setCollapsed=collapseFilter;
  else setFilterCollapsed=collapseFilter;

  // Run before the existing product/list handlers, without replacing their behavior.
  window.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button||button.disabled||state.filterCollapsed)return;
    const row=button.closest('.product-row');
    const opening=button.dataset.expand&&state.expanded[button.dataset.id]!==button.dataset.expand;
    if(!(row&&(opening||button.dataset.request||button.hasAttribute('data-favorite')))&&button.dataset.action!=='favorites')return;
    collapseFilter(true);
    if(opening){
      const id=row.id,type=button.dataset.expand;
      requestAnimationFrame(()=>{
        const updated=document.getElementById(id);
        updated?.scrollIntoView({block:'start',behavior:'instant'});
        updated?.querySelector(`[data-expand="${type}"]`)?.focus({preventScroll:true});
      });
    }
  },true);
  collapseFilter(true);
})();
