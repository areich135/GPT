'use strict';
(() => {
  const collapse=document.getElementById('collapse-filter');
  const reset=document.getElementById('reset-filters');
  const header=document.createElement('div');
  header.className='filter-topbar';
  collapse.before(header);
  header.append(collapse,reset);
})();
