'use strict';

window.ACCESSORY_CONFIG = {
  "code": "STG",
  "label": "Stützgitter",
  "fields": [
    {
      "key": "diameter",
      "label": "Durchmesser",
      "unit": "cm",
      "icon": "../accessories/assets/700379-stuetzgitter-breite-pikto.svg"
    },
    {
      "key": "height",
      "label": "Höhe",
      "unit": "cm",
      "icon": "../accessories/assets/700376-stuetzgitter-hoehe-pikto.svg"
    }
  ],
  "standalonePackaging": true,
  "showAllArticles": true,
  "fittingTitle": "Passende Rundtöpfe",
  "benefits": [
    {
      "title": "Hoher Transportschutz",
      "text": "Die Stützgitter sitzen fest am Topf und schützen empfindliche Triebe bei Kultur, Transport und Verkauf."
    }
  ]
};

const POT_CATALOG = new Map([
  ["VTG 10", {"name": "VTG 10", "image": "../accessories/assets/455310-vtg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vtg-rundtoepfe-8-"}],
  ["VTG 10,5", {"name": "VTG 10,5", "image": "../accessories/assets/455310-vtg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vtg-rundtoepfe-8-"}],
  ["VCG 10", {"name": "VCG 10", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCL 10,5", {"name": "VCL 10,5", "image": "../accessories/assets/711899-vcl-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcl-rundtoepfe-und-container-5-"}],
  ["VCG 10,5 K", {"name": "VCG 10,5 K", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCH 10", {"name": "VCH 10", "image": "../accessories/assets/455475-vch-vck-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vch-vck-rundtoepfe-und-container-hoch-5-"}],
  ["VCK 11 VOL", {"name": "VCK 11 VOL", "image": "../accessories/assets/455475-vch-vck-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vch-vck-rundtoepfe-und-container-hoch-5-"}],
  ["VCM 11 VOL", {"name": "VCM 11 VOL", "image": "../accessories/assets/701344-vcm-10-5-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcm-rundtoepfe-und-container-hoch-5-"}],
  ["MXC 10", {"name": "MXC 10", "image": "../accessories/assets/455989-mxc-ton-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mxc-rundtoepfe-6-"}],
  ["MXC 10,5", {"name": "MXC 10,5", "image": "../accessories/assets/455989-mxc-ton-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mxc-rundtoepfe-6-"}],
  ["VTG 11", {"name": "VTG 11", "image": "../accessories/assets/455310-vtg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vtg-rundtoepfe-8-"}],
  ["VCG 11", {"name": "VCG 11", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCH 11", {"name": "VCH 11", "image": "../accessories/assets/455475-vch-vck-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vch-vck-rundtoepfe-und-container-hoch-5-"}],
  ["VCC 12 VOL", {"name": "VCC 12 VOL", "image": "../accessories/assets/456002-vcc-taupe-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcc-rundtoepfe-und-container-hoch-5-"}],
  ["MXC 11", {"name": "MXC 11", "image": "../accessories/assets/455989-mxc-ton-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mxc-rundtoepfe-6-"}],
  ["VTG 12", {"name": "VTG 12", "image": "../accessories/assets/455310-vtg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vtg-rundtoepfe-8-"}],
  ["VCL 12", {"name": "VCL 12", "image": "../accessories/assets/711899-vcl-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcl-rundtoepfe-und-container-5-"}],
  ["VCL 12 C", {"name": "VCL 12 C", "image": "../accessories/assets/711899-vcl-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcl-rundtoepfe-und-container-5-"}],
  ["MXC 12", {"name": "MXC 12", "image": "../accessories/assets/455989-mxc-ton-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mxc-rundtoepfe-6-"}],
  ["VTG 13", {"name": "VTG 13", "image": "../accessories/assets/455310-vtg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vtg-rundtoepfe-8-"}],
  ["VCG 13", {"name": "VCG 13", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCH 13", {"name": "VCH 13", "image": "../accessories/assets/455475-vch-vck-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vch-vck-rundtoepfe-und-container-hoch-5-"}],
  ["MCL 13 K-C", {"name": "MCL 13 K-C", "image": "../accessories/assets/455383-mcl-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mcl-container-hoch-5-"}],
  ["VTL 14", {"name": "VTL 14", "image": "../accessories/assets/833592-vtl-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vtl-rundtoepfe-8-"}],
  ["VCG 14", {"name": "VCG 14", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCG 14 D", {"name": "VCG 14 D", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCH 14", {"name": "VCH 14", "image": "../accessories/assets/455475-vch-vck-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vch-vck-rundtoepfe-und-container-hoch-5-"}],
  ["VCE 14", {"name": "VCE 14", "image": "../accessories/assets/455556-vce-taupe-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vce-rosencontainer-5-"}],
  ["VCM 17", {"name": "VCM 17", "image": "../accessories/assets/701344-vcm-10-5-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcm-rundtoepfe-und-container-hoch-5-"}],
  ["MCI 17", {"name": "MCI 17", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-"}],
  ["MCI 17 K", {"name": "MCI 17 K", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-"}],
  ["MCI 17 Z", {"name": "MCI 17 Z", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-"}],
  ["MCL 17", {"name": "MCL 17", "image": "../accessories/assets/455383-mcl-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mcl-container-hoch-5-"}],
  ["MCH 17", {"name": "MCH 17", "image": "../accessories/assets/21397-mch-ton-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mch-container-hoch-5-"}],
  ["VCL 19", {"name": "VCL 19", "image": "../accessories/assets/711899-vcl-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcl-rundtoepfe-und-container-5-"}],
  ["VCM 19", {"name": "VCM 19", "image": "../accessories/assets/701344-vcm-10-5-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcm-rundtoepfe-und-container-hoch-5-"}],
  ["MCL 19", {"name": "MCL 19", "image": "../accessories/assets/455383-mcl-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mcl-container-hoch-5-"}],
  ["MCH 19", {"name": "MCH 19", "image": "../accessories/assets/21397-mch-ton-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mch-container-hoch-5-"}],
  ["MCI 19 Z", {"name": "MCI 19 Z", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-"}],
  ["MCI 19 K", {"name": "MCI 19 K", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-"}],
]);

const PACKAGING_LABELS = ["Stützgitter pro Karton", "Kartons pro Palette", "Stützgitter unterverpackt auf Palette", "Stützgitter lose auf Palette"];

const ACCESSORY_DATA = [
  {"name": "STG 10-10,5", "diameter": 13.2, "height": 11, "image": "../accessories/assets/456529-stg-to-aw.webp", "orderNo": "11218340505", "fitting": ["VTG 10", "VTG 10,5", "VCG 10", "VCL 10,5", "VCG 10,5 K", "VCH 10", "VCK 11 VOL", "VCM 11 VOL", "MXC 10", "MXC 10,5"], "packaging": [810, 11, 8910, 10340]},
  {"name": "STG 11", "diameter": 13.2, "height": 11, "image": "../accessories/assets/456529-stg-to-aw.webp", "orderNo": "11218350505", "fitting": ["VTG 11", "VCG 11", "VCH 11", "VCC 12 VOL", "MXC 11"], "packaging": [810, 11, 8910, 10340]},
  {"name": "STG 12 R", "diameter": 14.9, "height": 12, "image": "../accessories/assets/526195-stg-12-r-vcg12-aw.webp", "orderNo": "11219440504", "fitting": ["VTG 12", "VCL 12", "VCL 12 C", "MXC 12"], "packaging": [672, 11, 7392, 9000]},
  {"name": "STG 13 B-R", "diameter": 17, "height": 16.9, "image": "../accessories/assets/456533-stg-13-b-r-aw-vcg-ton.webp", "orderNo": "11219040505", "fitting": ["VTG 13", "VCG 13", "VCH 13", "MCL 13 K-C"], "packaging": [396, 11, 4356, 6600]},
  {"name": "STG 13 R", "diameter": 16.3, "height": 14, "image": "../accessories/assets/456536-stg-13-aw.webp", "orderNo": "11219030505", "fitting": ["VTG 13", "VCG 13", "VCH 13", "MCL 13 K-C"], "packaging": [484, 11, 5324, 6600]},
  {"name": "STG 14 B-R", "diameter": 17.5, "height": 18, "image": "../accessories/assets/456531-stg-14-b-r-aw-vcg-schwarz.webp", "orderNo": "11219050505", "fitting": ["VTL 14", "VCG 14", "VCG 14 D", "VCH 14", "VCE 14"], "packaging": [352, 11, 3872, 6000]},
  {"name": "STG 17", "diameter": 21.3, "height": 14.7, "image": "../accessories/assets/456530-stg-19-aw.webp", "orderNo": "11204270505", "fitting": ["VCM 17", "MCI 17", "MCI 17 K", "MCI 17 Z", "MCL 17", "MCH 17"], "packaging": [75, 44, 3300, 3300]},
  {"name": "STG 19", "diameter": 23.7, "height": 16.3, "image": "../accessories/assets/456530-stg-19-aw.webp", "orderNo": "11217820505", "fitting": ["VCL 19", "VCM 19", "MCL 19", "MCH 19"], "packaging": [75, 36, 2700, 2700]},
  {"name": "STG 19 Z", "diameter": 23.7, "height": 16.3, "image": "../accessories/assets/456530-stg-19-aw.webp", "orderNo": "11204180506", "fitting": ["MCI 19 Z", "MCI 19 K"], "packaging": [75, 36, 2700, 2700]},
].map(({ image, orderNo, fitting, packaging, ...article }, index) => ({
  ...article,
  index,
  fitting: fitting.map(name => POT_CATALOG.get(name)),
  packaging: Object.fromEntries(PACKAGING_LABELS.map((label, i) => [label, packaging[i]])),
  variants: [{
    image,
    orderNo,
    color: "Recyclable moosgrün",
    category: "Recyclable",
    certificates: [{ image: "../accessories/assets/501422-logo-cyclos-htp-de.webp", label: "cyclos-HTP · Recyclingfähigkeit" }],
  }],
}));
