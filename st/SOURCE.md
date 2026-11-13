# Trays ST V1 – Quellen und Datenzuordnung

Originalseite: https://www.poeppelmann.com/de/teku/produkte/st-transport-und-kulturtrays · Abruf 13.11.2026.

Die öffentlich eingebettete Produktliste wurde ohne Ausführung fremden JavaScripts ausgelesen. `source-data.json` enthält ausschließlich Produktfelder, Artikelbilder, Varianten, Bestellnummern, Zertifikatslogos, passende Produkte und zugehörige Tabellenüberschriften. Die vollständige HTML-Seitenkonfiguration wird nicht gespeichert.

| Quellfeld | Anzeige | Einheit |
|---|---|---|
| 8527 | A · Länge Tray | cm |
| 8532 | B · Breite Tray | cm |
| 8533 | C · Höhe Tray | cm |
| 8251 | Töpfe pro Tray | Stück |
| 7337 | Trays pro CC-Lage | Stück |
| 8250 | Töpfe pro CC-Lage | Stück |
| 8440 | Trays unterverpackt auf Palette | Stück |

30 Artikel, 30 Varianten mit Bestellnummern, 372 artikelbezogene Zuordnungen passender Töpfe. Der extrahierte Variantenbestand enthält ausschließlich Circular grau / Circular360. Zertifikatslogos werden nur den Varianten zugeordnet, bei denen die Quelle sie tatsächlich führt. Keine zusätzlich erfundenen Farb-/Prozessfilter.

Bei ST 2840/8-13 und ST 2840/8-13 D ist Feld 8250 nicht vorhanden: „Keine Angabe“. Keine aus anderen Werten errechnete Zahl als Originalangabe ausgeben. Die abweichenden Quellbezeichnungen mit „(12)*“ bleiben im Extrakt erhalten; die Variante liefert die Artikelbezeichnung ohne diesen Tabellenzusatz. Eine Erklärung dieses Sternchens liegt im ausgelesenen Produktbestand nicht vor.

`asset-manifest.json` ordnet 69 lokale Assets den Original-URLs und SHA-256-Prüfsummen zu: 55 unterschiedliche Produkt-/Topfbilder, zwei Zertifikatslogos, sieben Vorteilsbilder und fünf Piktogramme. Die Bild-URLs mit Endung `.psd` liefern vom CDN bereits gerenderte Rasterbilder. Produkt-/Vorteilsbilder wurden auf höchstens 800 × 800 px begrenzt und als WebP gespeichert; Logos und SVGs bleiben in ihren Originalformaten. Keine Produktbilder wurden gezeichnet, umgefärbt oder generativ ergänzt.

Der Rechner nutzt Länge/Breite als rechteckige Außenmaße und Töpfe pro Tray als Multiplikator. Er plant Stellflächen in einer Ebene, keinen vollständigen CC-Wagen. Vorteile der Originalseite sind kurz zusammengefasst; Wasserablauf bei B/D und Etikettenaufnahmen bei ST 2840 / ST 3156 nicht auf alle Artikel verallgemeinern.

Navigation und Gestaltung übernehmen die bestehenden VCG-/BP-Komponenten; der Datenbestand und die passenden Töpfe sind ST-spezifisch. Anfragen bleiben ausschließlich eine Simulation ohne Versand.
