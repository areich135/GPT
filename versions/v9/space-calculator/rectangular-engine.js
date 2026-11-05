/* Rectangular trays/palettes; centimetres, spacing only between items. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TEKURectangularSpaceEngine=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const floor=x=>Math.floor(x+16*Number.EPSILON*Math.max(1,Math.abs(x)));
  function calculate({itemLength,itemWidth,length,width,gap=0,plants=null}){
    if(![itemLength,itemWidth,length,width,gap].every(Number.isFinite))throw new RangeError('Bitte alle Maße als gültige Zahlen eingeben.');
    if(itemLength<0.1||itemWidth<0.1||itemLength>1000||itemWidth>1000)throw new RangeError('Die Produktmaße müssen zwischen 0,1 und 1.000 cm liegen.');
    if(length<0.01||width<0.01||length>1000000||width>1000000)throw new RangeError('Die Flächenmaße müssen zwischen 0,01 und 1.000.000 cm liegen.');
    if(gap<0||gap>200)throw new RangeError('Der Abstand muss zwischen 0 und 200 cm liegen.');
    if(plants!==null&&(!Number.isSafeInteger(plants)||plants<1||plants>1000000))throw new RangeError('Die Pflanzenzahl je Palette muss eine ganze Zahl zwischen 1 und 1.000.000 sein.');
    const plan=rotated=>{const a=rotated?itemWidth:itemLength,b=rotated?itemLength:itemWidth;const columns=floor((length+gap)/(a+gap)),rows=floor((width+gap)/(b+gap)),count=columns*rows,total=plants===null?null:count*plants;if(!Number.isSafeInteger(count)||(total!==null&&!Number.isSafeInteger(total)))throw new RangeError('Für eine genaue Stückzahl ist die gewählte Fläche zu groß.');return {rotated,itemLength:a,itemWidth:b,columns,rows,count,plants:total};};
    const normal=plan(false),rotated=plan(true);return {normal,rotated,best:rotated.count>normal.count?'rotated':'normal',area:length*width/10000};
  }
  return Object.freeze({calculate});
});
