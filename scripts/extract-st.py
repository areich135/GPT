from pathlib import Path
import re,ast,json
import argparse
parser=argparse.ArgumentParser(description='Extract public ST product literals, never execute page scripts.')
parser.add_argument('html',type=Path);parser.add_argument('output',type=Path);parser.add_argument('--retrieved',required=True)
args=parser.parse_args()
src=args.html.read_text()
S=r"'(?:\\.|[^'\\])*'|\"(?:\\.|[^\"\\])*\""
def val(x):
 if x in ['true','false','null']:return {'true':True,'false':False,'null':None}[x]
 return ast.literal_eval(x)
def obj(text):return {k:val(v) for k,v in re.findall(r"'([^']+)'\s*:\s*("+S+r'|true|false|null|\d+)',text)}
products=[];headers=[]
for t in re.findall(r'<script[^>]*>(.*?)</script>',src,re.S):
 if 'var packagingItems' in t:
  for b in re.findall(r'var data = \{(.*?)\};',t,re.S):headers.append(obj(b))
 if 'var article = {}' in t:
  p={k:val(v) for k,v in re.findall(r"article\['([^']+)'\]\s*=\s*("+S+r');',t)}
  p['index']=len(products);p['fields']={};p['variants']=[];p['fitting']=[];products.append(p);continue
 ix=re.search(r'var article = window.productList\[(\d+)\]',t)
 if not ix:continue
 p=products[int(ix.group(1))]
 for v,k in re.findall(r'var colContent = ('+S+r")\.trim\(\);\s*var filter = window.productFilter.get\('([^']+)'\)",t):p['fields'][k]=val(v).strip()
 if '_tempArrFittingItems' in t:
  p['fitting']=[obj(b) for b in re.findall(r'var itemObj = \{(.*?)\};',t,re.S)]
 if '_tempArrVariants' in t:
  blocks=list(re.finditer(r'var item = \{(.*?)\};',t,re.S))
  for i,b in enumerate(blocks):
   v=obj(b.group(1));tail=t[b.end():blocks[i+1].start() if i+1<len(blocks) else len(t)];v['certificates']=re.findall(r"'logoUrl':\s*'([^']+)'",tail);p['variants'].append(v)
assert len(products)==30 and all(p['variants'] for p in products)
out={'retrieved':args.retrieved,'source':'https://www.poeppelmann.com/de/teku/produkte/st-transport-und-kulturtrays','headlines':headers,'products':products}
args.output.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(f"{len(products)} articles, {sum(len(p['variants']) for p in products)} variants, {sum(len(p['fitting']) for p in products)} fitting associations")
