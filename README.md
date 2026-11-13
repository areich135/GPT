# TEKU Produktdetailseiten – Clickdummy

Die Kopfzeile führt zu drei Produktbereichen:

- **Rundtöpfe / VCG:** V12 mit animiertem Stellflächenrechner im Modal; V1–V11 bleiben über den Versionsumschalter erreichbar.
- **Anzuchtpaletten / BP:** V6 mit 20 Artikeln, eigenem Rechteckrechner und animiertem Ausrichtungswechsel; V1–V5 bleiben erreichbar. Plug-, Tray- und Zellmaße sind separat benannt.
- **Trays / ST:** V1 mit 30 Transport- und Kulturtrays, eigenen Filtern, CC-Lagen-Werten und passenden Töpfen.

Alle aktuellen Entwürfe enthalten die rechten Listen für Muster, Angebote und Merkliste. Anfragen werden nur simuliert. Der VCG-Stellflächenrechner berechnet die Stückzahl für Viereck- und Dreieckverband mit frei änderbarem Durchmesser.

- [Rundtöpfe V12 öffnen](https://areich135.github.io/GPT/?version=v12)
- [Anzuchtpaletten BP V6 öffnen](https://areich135.github.io/GPT/bp/?version=v6)
- [Trays ST V1 öffnen](https://areich135.github.io/GPT/st/?version=v1)
- [ST-Quellen und Datenzuordnung](st/SOURCE.md)
- [Quellen, Datenzuordnung und tatsächliche Prüfungen](docs/sources-2026-10-22.md)

## Changelog

### 13.11.2026 · cm/inch bei BP und ST, kompakte Mengenzeilen

- Anzuchtpaletten BP V6 und Trays ST V1 erhalten denselben 110,5 × 25,5 px großen cm/inch-Schalter wie Rundtöpfe. Kurzmaße, Maßtabellen, Maßfilter und ausgewählte Hero-Infos stellen um; BP-Zellvolumen wechselt von ml zu in³. Filter bleiben auf den Originalwerten, Rechner und Stückzahlen unverändert.
- Rundtöpfe V12, BP V6 und ST V1: kompakte Anfragezeilen mit Artikel links und Mengen rechts auf Desktop. Muster- und Angebotsmenge bleiben auch auf Mobilgeräten nebeneinander mit umbrechenden Beschriftungen und bündigen Eingaben.
- Aktuelle Versionsnummern und Archive unverändert; übrige Produktdaten und Funktionen erhalten.

### 13.11.2026 · Artikelbezogene Anfragen und Trays ST V1

- Rundtöpfe V12 und Anzuchtpaletten BP V6: Anfrageformular beginnt mit Muster-/Angebotsauswahl und kompakten Artikelzeilen ohne Fotos. Jede gespeicherte Artikel-/Farbvariante hat eigene Muster- und Angebotsmengen; nur gewählte Anfragearten aktivieren die jeweiligen Felder. Kontaktdaten folgen darunter.
- BP verwendet jetzt ebenfalls das zweistufige Formular ganz oben vor allen SKU-Zeilen, mit laufendem Fortschritt, erhaltenem Entwurf und Abschlussübersicht je Artikel.
- Kategorie „Trays / Anzuchtpaletten“ getrennt in „Anzuchtpaletten“ und „Trays“. ST V1 ergänzt 30 Originalartikel, 30 Farbvarianten/Bestellnummern, 372 Zuordnungen passender Töpfe und 69 lokale Originalassets einschließlich Piktogrammen, Zertifikaten und Vorteilsbildern.
- ST bietet Filter für Farbe, Nachhaltigkeitskategorie, Außenmaße, Töpfe pro Tray und CC-Lage; ausgeschriebene Verpackungsdaten, Rechteckrechner mit Topfzahl und passende Töpfe mit seitlichen blauen Pfeilen, maximal fünf Kacheln und einem Produktschritt je Klick.
- Originalquelle vom 13.11.2026 dokumentiert; fehlende CC-Topfzahlen bei zwei ST-Artikeln bleiben „Keine Angabe“. Archive unverändert, aktuelle VCG-/BP-Versionsnummern beibehalten.

### 12.11.2026 · V12: Anfrage an erster Position und Mengen in Schritt 1

- Rundtopf-Anfrage steht wieder als erster Bereich der SKU-Spalte, vor sämtlichen Produktzeilen – unabhängig davon, welche Artikel und Farben angefragt werden. Filter und rechte Listen bleiben an ihrer bisherigen Position. Die ausgewählten Produkte bleiben im Formular sichtbar.
- Musteranzahl und gewünschte Angebotsstückzahl zu den Anfragearten in Schritt 1 verschoben. Nur ausgewählte Mengen sind aktiv und erforderlich; Prüfung und Fortschritt berücksichtigen die Mengen bereits dort.
- Formular bleibt bei Produkt-/Filteränderungen, Detailwechseln und erneutem Öffnen mit seinen Eingaben erhalten. BP V6 bleibt unverändert.

### 10.11.2026 · V12: cm-Anzeige und sichtbarer Produktbezug

- Maßeinheiten-Schalter auf cm ↔ inch umgestellt. Metrische Längen in Kurzmaßen, Maßtabellen, Produktinfo und Durchmesserfilter stehen wieder in cm; Größe des Schalters bleibt unverändert. Volumen bleibt l bzw. in³.
- Anfrageformular öffnet direkt unter der ersten angefragten SKU. Produktzeile bleibt darüber sichtbar; weißer Pfeil mittig unter der Gruppe aus Muster-/Angebotsbutton, auch beim Einstieg aus der rechten Liste.
- Ausgewählte Artikel mit Originalbild, Produktname und gespeicherter Farbe stehen dauerhaft sichtbar im Formular statt in einer kleinen Aufklappzeile. Mehrere Artikel/Farben bleiben vollständig erkennbar.
- Eingaben, Schritt und Fortschritt bleiben beim Neuaufbau der Produktliste erhalten. Andere Details desselben Artikels blenden die Anfrage mit Datenerhalt aus. Für herausgefilterte Anfragen bleibt ein Produktkopf sichtbar; die Filterwahl wird nicht zurückgesetzt.
- V12 aktualisiert; BP V6 und archivierte Entwürfe behalten ihr bisheriges Verhalten.

### 10.11.2026 · Rundtöpfe V12: Anfrage direkt in der Seite

- mm-/inch-Schalter in Breite und Höhe um 15 % verkleinert. Volumeneinheit in³ (Kubikzoll) und Faktor 0,016387064 l je in³ anhand NIST Handbook 44, Appendix C geprüft; Umrechnung unverändert.
- Zweistufiges Anfrageformular als weißer Bereich vor den SKU-Zeilen, in derselben Spalte. Filter und rechte Listen behalten ihre Platzierung. Klicks außerhalb und Escape schließen das Formular nicht.
- Muster-/Angebotsauswahl in Schritt 1 verschoben. Gültige Pflichtfelder erhöhen den Fortschritt laufend von 0 auf 50 % bzw. von 50 auf 100 %; vorbelegte Werte erzeugen keinen anfänglichen Fortschritt.
- X und Abbrechen blenden die Anfrage aus; erneutes Öffnen erhält Schritt und Eingaben bis zum Neuladen. Filter-/Listenaktionen entfernen den Entwurf nicht. Abschluss bleibt eine Simulation direkt in der Seite.
- V11 mit eigenständigen Laufzeitdateien und Assets archiviert. BP V6 behält das bisherige Modal und Formularverhalten.

### 10.11.2026 · Rundtöpfe V11: Maßeinheit

- Neue Filtergruppe „Maßeinheit“ vor Farbe, mit magentafarbenem mm-/inch-Schalter nach bereitgestellter KAPSTO-Vorlage und Zugang über die kompakte Filterleiste.
- Durchmesser und Höhe in Kurzmaßen, Maßtabelle und Produktinfo wechseln zwischen mm und inch. Volumen bleibt metrisch in Litern und wechselt bei inch zu Kubikzoll (in³); Durchmesser- und Volumenfilter zeigen dieselben Einheiten.
- Umrechnung immer aus den unveränderten Originalwerten (cm/Liter), auf höchstens zwei Nachkommastellen. Filterauswahl, offene Bereiche, Listen und Tray-Position bleiben beim Umschalten erhalten.
- Sprachunabhängig verfügbar; Zahlenformat folgt der Dokumentsprache. Der vorhandene Click-Dummy enthält weiterhin die deutsche Sprachfassung.
- V10 einschließlich eigenständiger Laufzeitdateien und Assets archiviert. BP bleibt V6.

### 05.11.2026 · Zweistufige Anfrage VCG V10 / BP V6

- Anfrage-Modale nach Vorlage in zwei Schritte aufgeteilt: Kontaktdaten sowie Firmen-/Lieferadresse mit Anfrageart und Mengen.
- Anrede, Vor-/Nachname, Funktion, Telefon sowie vollständige Adressfelder ergänzt; Umsatzsteuer-ID bleibt ein Pflichtfeld. Firmenzusatz und Bundesland/Region sind optional.
- Geschäftskunden-Abfrage entfernt. Muster und Angebot bleiben gemeinsam auswählbar; Eingaben bleiben beim Zurückgehen erhalten und werden pro Schritt geprüft.
- Breites responsives Modal mit runden Eingabefeldern, Fortschritt 0/50/100 % und erreichbarer Aktionsleiste. Der Anfrageabschluss bleibt simuliert.

### 05.11.2026 · Pfeilgestaltung VCG V10

- Pfeile bei „Passende Trays“ als schlichte blaue Winkel ohne Kreisrahmen gemäß Screenshot angepasst; Klickfläche und Navigation bleiben erhalten.

### 05.11.2026 · Neue Entwürfe VCG V10 / BP V6

- Linker Filter bleibt in beiden Zuständen am Anfang der SKU-Liste und scrollt mit der Seite weg. Rechte volle und kompakte Listen behalten ihr bisheriges Mitlaufen bis zum letzten SKU.
- Rundtöpfe „Passende Trays“: maximal fünf sichtbare Produkte, blaue Pfeile links/rechts neben den Produkten, exakt ein Produktschritt pro Klick. Pfeile an den Enden deaktiviert.
- Fortschrittsbalken füllt sich von links gemäß dem bereits sichtbaren Produktanteil. Ein einzelnes bzw. vollständig sichtbares Sortiment ergibt einen vollen Balken und deaktivierte Pfeile.
- Der untere Empfehlungsblock einschließlich Überschrift fluchtet mit der SKU-Spalte, auch bei Filter- und Breitenwechsel.
- VCG V9 und BP V5 sind mit ihren eigenen Laufzeitdateien und Assets archiviert.

### 05.11.2026 · Scrollverhalten V9 / BP V5

- Linker Filter läuft auf Desktop eingeklappt und aufgeklappt mit; lange Filter bleiben innerhalb der verfügbaren Höhe scrollbar.
- Filter sowie volle und kompakte rechte Anfrageleiste stoppen exakt am Ende der angezeigten SKUs. Die Grenze aktualisiert sich nach Filter- und Detailänderungen.
- Auf schmalen Ansichten läuft die kompakte Filterleiste mit; die mobilen Schnellzugriffe bleiben auf den sichtbaren SKU-Bereich begrenzt.

### 05.11.2026 · Rundtöpfe V9 / BP V5 aktualisiert

- „Details“ heißt in beiden Produktbereichen „Varianten“, auch im geöffneten BP-Bereich.
- Gemeinsames Anfrageformular: Muster und Angebot gleichzeitig auswählbar, mit getrennten Mengen; die gewählten Farbvarianten aus der rechten Liste bleiben erhalten.
- Pflichtbestätigung „Ich bin Geschäftskunde“ und Pflichtfeld „Umsatzsteuer-ID“ ergänzt. Mindestens eine Anfrageart muss gewählt sein.
- BP: „Muster anfordern“ jetzt als magentafarbener Primärbutton analog zu Rundtöpfen.

### 30.10.2026 · Rundtöpfe V9 / BP V5

- „Weitere technische Daten“ heißt in beiden Bereichen „Technische Daten“.
- Stellflächenrechner: Wechsel der runden Verbände bzw. der BP-Ausrichtungen in einer Sekunde animiert; reduzierte Bewegung wird berücksichtigt. Rechenlogik und CTA zum Öffnen bleiben erhalten.
- Kompakte Listenleiste bei offenem Filter: neben den Varianten, mit demselben Rasterabstand und Sticky-Begrenzung auf den Variantenbereich.
- Rundtöpfe „Passende Trays“: mittige Pfeile und ein bis fünf mitwandernde Punkte; auch längere Listen sind vollständig erreichbar.
- VCG V8 und BP V4 samt Laufzeitdateien und Assets vor der Änderung als eigene Archivstände gesichert.

## Stellflächenrechner V7

- [Zum Rechner-CTA von VCG 11](https://areich135.github.io/GPT/?version=v7&calculator=3)
- [Wiederverwendbarer Code](space-calculator/)
- [Einbindung, Formeln, Quellen und Prüfungen](docs/calculator-v7.md)
- Rechenprüfung: `node --test tests/space-engine.test.cjs`

Die neue Komponente besteht aus einer unabhängigen Rechenlogik und einem Custom Element. Der konkrete Klickdummy-Adapter bindet sie in die Produktdetailseite ein. Die Word-Formel ist die Grundlage; geometrische Randkorrekturen und Unterschiede zum umfangreicheren Excel-Makro sind dokumentiert.

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
