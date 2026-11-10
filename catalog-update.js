'use strict';
// Current drafts only. Keep the action rail within the variants section.
(() => {
  const rail=document.querySelector('.selection-rail');
  const catalog=document.querySelector('#variants-panel');
  const host=document.createElement('aside');
  host.className='selection-rail-host';
  host.setAttribute('aria-label','Schnellzugriff auf Ihre Listen');
  catalog.append(host);host.append(rail);
  const results=catalog.querySelector('.results-column');
  const filter=catalog.querySelector('.filters');
  const filterHost=document.createElement('div');
  filterHost.className='filter-sticky-host';
  filter.before(filterHost);filterHost.append(filter);
  const sidebar=catalog.querySelector('.selection-sidebar');
  const sidebarHost=document.createElement('div');
  sidebarHost.className='selection-sidebar-host';
  sidebar.before(sidebarHost);sidebarHost.append(sidebar);
  const mobile=matchMedia('(max-width:700px)');
  let frame;
  function measure(){
    frame=null;
    const recommendation=document.querySelector('.recommendations');
    if(!catalog.getClientRects().length){
      recommendation?.style.removeProperty('--sku-column-left');
      recommendation?.style.removeProperty('--sku-column-width');
      return;
    }
    const rows=results.querySelectorAll('.product-row');
    const first=rows[0]?.getBoundingClientRect();
    const lastRow=rows[rows.length-1]?.getBoundingClientRect();
    const request=results.querySelector('#inline-request:not([hidden])')?.getBoundingClientRect();
    // A request below the last SKU is part of that SKU's expanded content.
    const last=lastRow&&{bottom:Math.max(lastRow.bottom,request?.bottom??lastRow.bottom)};
    catalog.classList.toggle('has-sku-rows',!!last);
    if(last){
      // Exclude trailing list margins and the cards below the SKU list.
      const height=Math.max(0,last.bottom-results.getBoundingClientRect().top);
      catalog.style.setProperty('--sku-list-height',`${height}px`);
    }else catalog.style.removeProperty('--sku-list-height');
    if(recommendation){
      const column=results.getBoundingClientRect();
      recommendation.style.setProperty('--sku-column-left',`${column.left+scrollX}px`);
      recommendation.style.setProperty('--sku-column-width',`${column.width}px`);
    }
    host.classList.toggle('outside-variants',!last||last.bottom<=12||first.top>=innerHeight-12);
    if(mobile.matches&&!rail.hidden&&last){
      const top=Math.max(first.top,Math.min(innerHeight-rail.offsetHeight-12,last.bottom-rail.offsetHeight));
      rail.style.top=`${top}px`;
      rail.style.bottom='auto';
    }else {rail.style.removeProperty('top');rail.style.removeProperty('bottom');}
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(measure);}
  function sync(){
    host.hidden=state.filterCollapsed;
    rail.hidden=state.filterCollapsed;
    sidebarHost.hidden=!state.filterCollapsed;
    schedule();
  }
  // Both collapse setters update this class, including the capture-phase adapter.
  new MutationObserver(sync).observe(catalog,{attributes:true,attributeFilter:['class']});
  new ResizeObserver(schedule).observe(results);
  addEventListener('resize',schedule,{passive:true});
  // Desktop follows native CSS sticky positioning; only the mobile floating
  // actions need their viewport position clamped to the first/last SKU.
  addEventListener('scroll',()=>{if(mobile.matches)schedule();},{passive:true});
  sync();
})();
