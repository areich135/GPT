# TEKU Produktdetailseiten – Clickdummy

Die Kopfzeile führt zu zwei Produktbereichen:

- **Rundtöpfe / VCG:** V1 und V2 als frühere Entwürfe, V3 mit den aktuellen technischen Reitern, Bodenansicht und aktiven Filterpunkten.
- **Trays / Anzuchtpaletten / BP:** V1 mit 20 Artikeln aus der TEKU-Produktseite; Plug-D/E zuerst, anschließend Zellvolumen und Pflanzenzahl. Tray- und Zellmaße sind separat benannt.

Beide aktuellen Entwürfe enthalten die rechten Listen für Muster, Angebote und Merkliste. Anfragen werden nur simuliert. Der Stellflächenrechner ist eine geometrische Vorschau.

- [Rundtöpfe V3 öffnen](https://areich135.github.io/GPT/?version=v3)
- [Anzuchtpaletten BP V1 öffnen](https://areich135.github.io/GPT/bp/?version=v1)
- [Quellen, Datenzuordnung und tatsächliche Prüfungen](docs/sources-2026-10-22.md)

## Beschreibung der bisherigen VCG-Basis

Eigenständiger interaktiver Nachbau des Adobe-XD-Entwurfs, Seite 20. Kein Zugriff auf das Pöppelmann-Repository oder Backend erforderlich.

Designgrundlage: Adobe-XD-Entwurf, Seite 20.

Produkte, Abmessungen, Original-Farbabbildungen, Verpackungszahlen, passende Trays und Downloads stammen von:
https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5-

Abruf: 6. Oktober 2026.

## Verhalten

- Anfangsansicht: Volumen 0,5–0,99 l und Tiefgezogen. Farbvorschau ton/grau ohne aktiven Farbfilter. Der weiße Informationsbereich bleibt wie in der XD-Vorlage zunächst frei und zeigt nach Artikelauswahl die Produktdaten.
- Farben, Durchmesser, Volumen, Produktionsverfahren und Konizität sind auswählbar. Andere Größen derselben Serie erscheinen separat unter „Weitere Artikel der Serie“.
- 12 Original-Farbabbildungen sind vorhanden. Hellgrün/grau, Baseline anthrazit und Recyclable transparent sind im XD-Entwurf angelegt, auf der aktuellen VCG-Seite aber nicht verfügbar: hierfür erscheint ein expliziter Leerzustand.
- Die beiden Boden-/Randansichten sind Originalfotos in ton/grau und werden nicht künstlich umgefärbt. Ihre Bildbezeichnungen geben dies an.
- Artikelgrößen, Farbverfügbarkeit, Verpackungszahlen und Tray-Zuordnungen stammen aus der tatsächlichen Produktseite; die Platzhalterzahlen der XD-Vorlage wurden nicht als Produktdaten verwendet.
- Muster- und Angebotsformulare simulieren den Ablauf; es gibt keine Übertragung, keine Speicherung und keine echte Bestellung.
- Merkzettel gilt nur für die laufende Sitzung. Der Stellflächenrechner ist eine vereinfachte Modellrechnung.
- Downloads und Empfehlungen öffnen die echte Produktwebsite; der Dummy erstellt keine weiteren Produktseiten.

Die Dateien im Repository-Stamm sind ohne Build mit GitHub Pages veröffentlichbar (Branch `main`, Ordner `/ (root)`). Alle Bilder, Schriften und Interface-Dateien sind lokal enthalten; PDF-Downloads und externe Produktlinks verbleiben auf der Originalwebsite.


## Entwurfsversionen

- **V1:** ursprünglicher Click-Dummy vor den Änderungen vom 6. Oktober 2026. HTML, CSS, JavaScript, Daten und Bilder sind als eigener Stand in `versions/v1` gesichert; lediglich der gemeinsame Versionsumschalter ist ergänzt.
- **V2:** Standardansicht im Repository-Stamm mit SVG-Filtericons, schmaler eingeklappter Filterleiste, an den Hero-Kästen ausgerichtetem Katalog und Bilddialog für Front, Boden und Rand.
- Umschalten über die Auswahl oben links. Direkte Einstiege: `?version=v1` bzw. `?version=v2`.
- Der Farbfächer verwendet die Original-SVG von Pöppelmann, mit den Farben aus der Referenz. Durchmesser und Volumen basieren auf den Original-Topfpiktogrammen. Recycling, Produktionsverfahren, Konizität und das Auf-/Zuklappen wurden als SVGs anhand der gelieferten Screenshots nachgezeichnet.
- Boden-/Randbilder bleiben Originalfotos in Circular ton/grau; die gewählte Farbe gilt für die Frontansicht.
