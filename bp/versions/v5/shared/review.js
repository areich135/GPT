'use strict';
// Alina's review: shared controls for the new VCG V6 / BP V4 drafts only.
(() => {
  const previousDetail=renderDetail;
  const arrow=direction=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${direction<0?'m14 5-7 7 7 7':'m10 5 7 7-7 7'}"/></svg>`;
  renderDetail=function(p,type){
    const html=previousDetail(p,type);
    if(!['trays','fitting'].includes(type))return html;
    const template=document.createElement('template');template.innerHTML=html;
    const track=template.content.querySelector('.tray-grid');
    if(!track||track.children.length<2)return html;
    const carousel=document.createElement('section');carousel.className='related-carousel';
    carousel.setAttribute('aria-label',type==='trays'?'Passende Trays':'Passende Aushebeplatten');
    carousel.innerHTML=`<div class="related-toolbar"><span>${track.children.length} passende Produkte</span><div class="related-controls"><button data-related-step="-1" aria-label="Vorherige passende Produkte" title="Vorherige Produkte">${arrow(-1)}</button><button data-related-step="1" aria-label="Weitere passende Produkte anzeigen">Weitere Produkte ${arrow(1)}</button></div></div>`;
    track.before(carousel);carousel.append(track);track.classList.add('related-track');
    track.tabIndex=0;track.setAttribute('aria-label','Passende Produkte – mit den Pfeilen weiterblättern');
    return template.innerHTML;
  };

  function step(track,direction){
    const end=track.scrollWidth-track.clientWidth;
    const atEnd=track.scrollLeft>=end-2,atStart=track.scrollLeft<=2;
    const left=direction>0&&atEnd?0:direction<0&&atStart?end:track.scrollLeft+direction*track.clientWidth*.85;
    track.scrollTo({left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-related-step]');if(!button)return;
    step(button.closest('.related-carousel').querySelector('.related-track'),Number(button.dataset.relatedStep));
  });
  document.addEventListener('keydown',event=>{
    if(!event.target.matches('.related-track')||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();step(event.target,event.key==='ArrowRight'?1:-1);
  });
  renderProducts();
})();
