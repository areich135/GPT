const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../space-calculator/engine.js');
const calc = (diameter, length=100, width=100, gap=0) => E.calculate({diameter,length,width,gap});

test('supplied Word formula: ordinary 1 m² examples', () => {
  assert.equal(calc(11).square.count,81);
  assert.equal(calc(11).triangle.count,85);
  assert.equal(calc(12).square.count,64);
  assert.equal(calc(12).triangle.count,68);
});
test('a full diameter fits exactly; no phantom last row', () => {
  assert.equal(calc(100).triangle.count,1);
  assert.equal(calc(11,110,11).triangle.count,10);
  // Old double-row formula counts 2 here, but their full diameters exceed width.
  assert.equal(calc(11,11,11*Math.sqrt(3)).triangle.count,1);
  assert.equal(calc(11,10.999,100).triangle.count,0);
  assert.equal(calc(11,1,100).triangle.count,0);
});
test('source spacing convention reserves half a gap at the boundary', () => {
  assert.equal(calc(11,12,12,1).square.count,1);
  assert.equal(calc(11,11,11,1).square.count,0);
  assert.equal(calc(10,100,100,2).square.count,64);
});
test('German and English decimals; reject empty and malformed inputs', () => {
  assert.equal(E.parseDecimal(' 10,5 '),10.5);
  assert.equal(E.parseDecimal('10.5'),10.5);
  assert.equal(E.parseDecimal(',5'),0.5);
  for(const s of ['', ' ', '11abc','1.000,5','1,2,3','Infinity','-1','0x11','1e4']) assert.ok(Number.isNaN(E.parseDecimal(s)),s);
  for(const diameter of [NaN,Infinity,0,-1,201]) assert.throws(()=>calc(diameter),RangeError);
  assert.throws(()=>calc(11,100,100,-1),RangeError);
});
test('unit conversions preserve physical results and exact-fit boundaries', () => {
  for(const unit of ['m','cm','ft','in']) {
    const side=E.convert(100,'cm',unit);
    assert.equal(calc(12,E.convert(side,unit),E.convert(side,unit)).triangle.count,68);
    const exact=E.convert(Number(E.convert(110,'cm',unit).toPrecision(15)),unit);
    assert.equal(calc(11,exact,11).square.count,10);
  }
  assert.equal(E.convert(1,'ft'),30.48);
  assert.equal(E.convert(1,'in'),2.54);
});
test('counts equal independent circle placement; both orientations are considered', () => {
  let seed=271828;
  const rand=()=>((seed=(seed*1664525+1013904223)>>>0)/2**32);
  function enumerate(d,g,L,W,tri) {
    const p=d+g,h=tri?p*Math.sqrt(3)/2:p;
    let n=0;
    for(let y=p/2,row=0;y+p/2<=W+1e-9;y+=h,row++) {
      for(let x=p/2+(tri&&row%2?p/2:0);x+p/2<=L+1e-9;x+=p)n++;
    }
    return n;
  }
  for(let i=0;i<300;i++) {
    const d=1+rand()*30,g=rand()*5,L=1+rand()*200,W=1+rand()*200;
    const r=calc(d,L,W,g),reversed=calc(d,W,L,g);
    assert.equal(r.square.count,enumerate(d,g,L,W,false));
    assert.equal(r.triangle.count,Math.max(enumerate(d,g,L,W,true),enumerate(d,g,W,L,true)));
    assert.equal(r.triangle.count,reversed.triangle.count);
    for(const plan of [r.square,r.triangle]) {
      const ps=E.positions(plan,d);
      for(const p of ps) {
        assert.ok(p.x-p.radius>=-1e-8 && p.x+p.radius<=L+1e-8);
        assert.ok(p.y-p.radius>=-1e-8 && p.y+p.radius<=W+1e-8);
      }
      for(let j=0;j<ps.length;j++) for(let k=j+1;k<ps.length;k++) assert.ok(Math.hypot(ps[j].x-ps[k].x,ps[j].y-ps[k].y)>=d+g-1e-8);
    }
  }
});
test('very large areas stay finite and diagram generation is bounded', () => {
  const r=calc(.1,1000000,1000000);
  assert.equal(r.square.count,100000000000000);
  assert.ok(Number.isSafeInteger(r.triangle.count));
  assert.ok(E.positions(r.triangle,.1).length<=600);
});
