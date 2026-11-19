// Optional asset preparation: node scripts/build-vcg-composites.cjs (requires sharp).
// Original product photos are assembled without repainting or recolouring them.
const fs=require('fs'),path=require('path'),vm=require('vm'),sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const products=vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';PRODUCT_DATA');
const sources=[...new Set(products.flatMap(p=>p.variants.map(v=>v.image)))];
const embedded=async file=>'data:image/png;base64,'+(await sharp(path.join(root,file)).png().toBuffer()).toString('base64');
(async()=>{
 const rim=await embedded('assets/vcg-slide3.png'),floor=await embedded('assets/vcg-slide2.png');
 const dir=path.join(root,'assets/technical-composites');fs.mkdirSync(dir,{recursive:true});
 for(const source of sources){
  const circle=(uri,cx,cy,n)=>`<circle cx="${cx}" cy="${cy}" r="202" fill="white"/><g clip-path="url(#clip${n})"><image xlink:href="${uri}" x="${cx-293}" y="${cy-293+(n===2?45:0)}" width="586" height="586"/></g><circle cx="${cx}" cy="${cy}" r="202" fill="none" stroke="#185383" stroke-width="10"/><circle cx="${cx+(n===2?137:-137)}" cy="${cy-137}" r="26" fill="#123361"/><text x="${cx+(n===2?137:-137)}" y="${cy-128}" fill="white" font-family="Arial,sans-serif" font-size="30" font-weight="bold" text-anchor="middle">${n}</text>`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="820" height="930" viewBox="-10 -10 820 930"><defs><clipPath id="clip1"><circle cx="598" cy="202" r="202"/></clipPath><clipPath id="clip2"><circle cx="598" cy="694" r="202"/></clipPath></defs><image xlink:href="${await embedded(source)}" x="-112" y="98" width="784" height="784"/>${circle(rim,598,202,1)}${circle(floor,598,694,2)}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir,path.basename(source)));
 }
 console.log(sources.length+' VCG compositions built from original photographs');
})();
