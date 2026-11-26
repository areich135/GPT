'use strict';

window.ACCESSORY_CONFIG = {
  "code": "SH",
  "label": "Stockhalter",
  "fields": [],
  "standalonePackaging": true,
  "fittingTitle": "Passende Rundtöpfe",
  "benefits": [
    {
      "title": "Verkaufsförderung",
      "text": "Flexible Stützklappen halten den Stützstab mittig."
    }
  ]
};

const POT_CATALOG = new Map([
  ["VCG 17", {"name": "VCG 17", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCH 17", {"name": "VCH 17", "image": "../accessories/assets/455475-vch-vck-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vch-vck-rundtoepfe-und-container-hoch-5-"}],
  ["MCI 17 K", {"name": "MCI 17 K", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-"}],
  ["MCL 17", {"name": "MCL 17", "image": "../accessories/assets/455383-mcl-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mcl-container-hoch-5-"}],
  ["MCH 17", {"name": "MCH 17", "image": "../accessories/assets/21397-mch-ton-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mch-container-hoch-5-"}],
  ["MCI 17", {"name": "MCI 17", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-", "demo": true}],
  ["VCG 19", {"name": "VCG 19", "image": "../accessories/assets/456560-vcg-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-"}],
  ["VCL 19", {"name": "VCL 19", "image": "../accessories/assets/711899-vcl-circular-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcl-rundtoepfe-und-container-5-"}],
  ["VCH 19", {"name": "VCH 19", "image": "../accessories/assets/455475-vch-vck-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vch-vck-rundtoepfe-und-container-hoch-5-"}],
  ["VCM 19", {"name": "VCM 19", "image": "../accessories/assets/701344-vcm-10-5-ton-grau-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/vcm-rundtoepfe-und-container-hoch-5-"}],
  ["MCI 19 K", {"name": "MCI 19 K", "image": "../accessories/assets/456519-mci-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mci-container-5-"}],
  ["MCL 19", {"name": "MCL 19", "image": "../accessories/assets/455383-mcl-terracotta-pr.webp", "href": "https://www.poeppelmann.com/de/teku/produkte/mcl-container-hoch-5-"}],
]);

const PACKAGING_LABELS = ["Stockhalter pro Karton", "Kartons pro Palette", "Stockhalter unterverpackt auf Palette"];

const ACCESSORY_DATA = [
  {"name": "SH 17", "image": "../accessories/assets/543988-sh-baseline-aw.webp", "orderNo": "11218447701", "fitting": ["VCG 17", "VCH 17", "MCI 17 K", "MCL 17", "MCH 17", "MCI 17"], "packaging": [1890, 12, 22680]},
  {"name": "SH 19", "image": "../accessories/assets/543988-sh-baseline-aw.webp", "orderNo": "11218107701", "fitting": ["VCG 19", "VCL 19", "VCH 19", "VCM 19", "MCI 19 K", "MCL 19"], "packaging": [1800, 12, 21600]},
].map(({ image, orderNo, fitting, packaging, ...article }, index) => ({
  ...article,
  index,
  fitting: fitting.map(name => POT_CATALOG.get(name)),
  packaging: Object.fromEntries(PACKAGING_LABELS.map((label, i) => [label, packaging[i]])),
  variants: [{
    image,
    orderNo,
    color: "Baseline grau",
    category: "Baseline",
    certificates: [{ image: "../accessories/assets/501422-logo-cyclos-htp-de.webp", label: "cyclos-HTP · Recyclingfähigkeit" }],
  }],
}));
