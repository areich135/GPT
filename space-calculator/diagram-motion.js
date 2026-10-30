'use strict';
// One-second SVG transforms, only on explicit arrangement changes. No frame loop.
(() => {
  const ns='http://www.w3.org/2000/svg';
  const element=(name,attrs={})=>{const el=document.createElementNS(ns,name);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,v);return el;};
  function draw(stage,{length,width,items,label,excerpt=false},animate=false){
    const previous=new Map();
    const oldSVG=stage.querySelector('svg');
    const moving=animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!!oldSVG;
    if(moving){
      // Read the actual in-flight transform so rapid reversals start where the
      // pots currently are, rather than jumping to the previous target.
      oldSVG.querySelectorAll('[data-piece]').forEach(g=>previous.set(g.dataset.piece,{transform:getComputedStyle(g).transform,markup:g.innerHTML}));
    }
    stage.getAnimations({subtree:true}).forEach(a=>a.cancel());
    const pad=Math.max(length,width)*.025;
    const svg=element('svg',{viewBox:`${-pad} ${-pad} ${length+pad*2} ${width+pad*2}`,role:'img','aria-label':label});
    svg.append(element('rect',{width:length,height:width,fill:'white',stroke:'var(--sc-muted)','stroke-width':1,'vector-effect':'non-scaling-stroke',...(excerpt?{'stroke-dasharray':'4 3'}:{})}));
    const motions=[];
    for(const piece of items){
      const g=element('g',{'data-piece':piece.key});
      const target=`translate(${piece.x}px, ${piece.y}px) rotate(${piece.angle||0}deg)`;
      g.style.transform=target;
      const common={fill:'white',stroke:'var(--sc-green)','stroke-width':1.2,'vector-effect':'non-scaling-stroke'};
      g.append(piece.radius!==undefined?element('circle',{cx:0,cy:0,r:piece.radius,...common}):element('rect',{x:-piece.w/2,y:-piece.h/2,width:piece.w,height:piece.h,...common}));
      svg.append(g);
      if(moving){
        const old=previous.get(String(piece.key));
        motions.push([g,[{transform:old?.transform||target,opacity:old?1:0},{transform:target,opacity:1}]]);
        previous.delete(String(piece.key));
      }
    }
    if(moving)for(const old of previous.values()){
      const g=element('g');g.innerHTML=old.markup;g.style.transform=old.transform;svg.append(g);
      motions.push([g,[{opacity:1},{opacity:0}],true]);
    }
    stage.replaceChildren(svg);
    for(const [g,frames,remove] of motions){
      const animation=g.animate(frames,{duration:1000,easing:'ease-in-out',fill:'both'});
      animation.onfinish=()=>{if(remove)g.remove();else {g.style.opacity='1';animation.cancel();}};
    }
  }
  window.TEKUDiagramMotion=Object.freeze({draw});
})();
