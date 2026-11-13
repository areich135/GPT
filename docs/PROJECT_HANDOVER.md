# TEKU Website – verbindliche Übergabe für die Clickdummys

**Dokumentrevision:** 12 · **Stand:** 13.11.2026
**Ausgangsbasis dieser Änderung:** 2611259; aktuelle Änderungen siehe README-Changelog
**Repository:** https://github.com/areich135/GPT · **Arbeitsbranch:** main

Diese Übergabe soll einen neuen Chat arbeitsfähig machen, ohne den gesamten alten Verlauf zu laden. Sie beschreibt den freigegebenen Stand, die bewussten Unterschiede zwischen den Produktbereichen und die Grenzen des Dummys. Vor jeder Aufgabe den aktuellen Remote-Stand prüfen: Eine im ChatGPT-Projekt hochgeladene Kopie kann älter sein als die Datei im Repository.

**Leseweg:** Immer Abschnitte 1–3 und die Dateikarte in Abschnitt 11 beachten. Anschließend die Abschnitte zum konkreten Auftrag lesen. Alte Versionsordner, alle Produktdaten und sämtliche Quellen nicht pauschal laden.

## 1. Ziel, Umfang und Arbeitsprinzip

Die Clickdummys dienen der schnellen Abstimmung responsiver TEKU-Produktdetailseiten mit Grafik, Marketing und Vertrieb. Zielgruppe sind B2B-Kunden im Gartenbau. Neue Inhalte und Funktionen müssen in der bestehenden TEKU-Gestaltung umgesetzt werden.

Es handelt sich um statische HTML/CSS/JavaScript-Seiten ohne Build-System, Framework oder Anfrage-Backend. Für kleinere Aufgaben keine Neuimplementierung oder Migration beginnen. Der Produktivauftritt mit Magnolia und die PIM-Datenpflege in Contentserv sind ein anderer Umsetzungskontext; dieses Repo ist kein Zugriff auf deren Backend.

Der Nutzer möchte direkte, zügige Umsetzung mit kurzen Statusmeldungen. Bei ausreichenden Angaben anfangen. Nur wesentlich fehlende Informationen klären. Bei „nur schnell anpassen“ keine zusätzlichen Gestaltungsänderungen, neuen Produktinformationen oder Funktionsumbauten einführen.

### Welche Quelle entscheidet?

| Gegenstand | Maßgebliche Quelle |
|---|---|
| Konkreter Änderungsumfang | Neuester ausdrücklicher Nutzerauftrag |
| Freigegebene Gestaltung | Aktuell zum Auftrag gelieferter XD-Screenshot bzw. freigegebene Grafik; ergänzend bestehender Code |
| Aktuell implementiertes Verhalten | Geprüfter aktueller Repository-Stand |
| Produktfakten, Maße, Zertifikate, Zuordnungen | Aktuelle freigegebene Nutzerdaten oder Originalquelle je Artikel/Variante |
| Frühere Entscheidungen | Diese Übergabe und die verlinkten Fachdokumente |
| Allgemeines TEKU-Vorgehen | TEKU Website Builder, sofern verfügbar; er ersetzt weder Quellenprüfung noch echte Werkzeuge |

Ein neuer Screenshot ändert nicht automatisch sämtliche darin sichtbaren Texte oder Funktionen. Nur die beauftragten Änderungen übernehmen. Alte Kommentare wie „Punkte statt Linie“ sind durch spätere Nutzerentscheidungen überholt. Bei einem echten Widerspruch den Konflikt konkret benennen; keine stillschweigende fachliche Umdeutung.

Keine erfundenen Produktdaten, Patenttexte, Siegel, Bilder, Verkaufsargumente oder Kompatibilitäten. Unbekannte Sachinformationen nicht mit plausiblen Annahmen füllen. Falls eine erforderliche Tatsache fehlt: „zu diesem Thema liegen mir leider keine Informationen vor.“ Anschließend die konkrete fehlende Quelle nennen.

## 2. Produktbereiche, URLs und Versionierung

| Bereich | Aktueller Stand | Aktuelle Dateien | Öffentlicher Einstieg |
|---|---|---|---|
| Rundtöpfe, Serie VCG | V12 | Repository-Stamm | https://areich135.github.io/GPT/?version=v12 |
| Anzuchtpaletten, Serie BP | V6 | bp/ | https://areich135.github.io/GPT/bp/?version=v6 |
| Transport- und Kulturtrays, Serie ST | V1 | st/ | https://areich135.github.io/GPT/st/?version=v1 |

Der Umschalter hat drei getrennte Kategorien: „Rundtöpfe“ (VCG), „Anzuchtpaletten“ (BP) und „Trays“ (ST). ST V1 ist ein eigener Datenbestand und eine eigene Seite. GP ist nicht umgesetzt. BP nicht als Tray-Sortiment umdeuten.

Frühere Rundtopf-Stände V1–V11 liegen unter versions/v1/ bis versions/v11/. Frühere BP-Stände V1–V5 liegen unter bp/versions/. Die aktuellen Stände liegen gerade nicht unter versions/v12/ oder bp/versions/v6/. Die Zuordnung steuert version-switch.js.

**Versionsregeln:**

- „V10 aktualisieren“, „nur das anpassen“: die genannte aktuelle Version ändern; keine zusätzliche Version erfinden.
- „Neue Version erstellen“: den bisherigen aktuellen Stand zuerst funktionsfähig sichern, danach neue Zuordnung und Auswahl ergänzen.
- Der nächste freie Versionsname muss aus dem tatsächlichen Umschalter abgeleitet werden, nicht aus dieser Übergabe geraten werden.
- Frühere Stände einschließlich ihrer eigenen Assets und Skripte nicht nachträglich mit neuen Produktfunktionen überschreiben.
- Der gemeinsame Versionsumschalter wirkt auch auf Archivseiten. Änderungen dort erfordern einen gezielten Routingcheck.
- Eine Änderung an VCG gilt nicht automatisch für BP. Gemeinsame Gestaltung bedeutet keine Erlaubnis, alle bewussten Unterschiede ohne Auftrag zu beseitigen.

## 3. Unbedingt erhalten: Entscheidungen und bewusste Unterschiede

| Thema | Rundtöpfe V12 | Anzuchtpaletten BP V6 |
|---|---|---|
| Erste Werte in der Artikelzeile | Durchmesser, Höhe, Volumen | Länge, Breite, Höhe der Anzuchtpalette mit Maßskizze |
| Erster Aufklappbereich | „Technische Daten“ | „Technische Daten“ |
| Farbausführungen | „Varianten“ | „Varianten“ |
| Dritter Bereich | „Passende Trays“ | „Aushebeplatte“; ohne Zuordnung deaktiviert |
| Öffnen/Schließen | SVG-Pfeil ohne sichtbares „einblenden“ | Bisherige Ein-/Ausblendtexte erhalten |
| Weißer Zeiger unter aktivem Bereich | Umgesetzt; folgt dessen Buttonmitte | Nicht allein wegen VCG automatisch nachrüsten |
| Anfrage-CTA | Muster primär magenta/weiß, Angebot Kontur | Muster primär magenta/weiß, Angebot Kontur |
| Kompakte rechte Listenleiste bei offenem Filter | Umgesetzt | Umgesetzt |
| Anfrageformular | Ganz oben in der SKU-Spalte; Anfrageart, Mengen je Artikel/Farbe, dann Kontaktdaten in Schritt 1 | Gleiches Inline-Formular mit laufendem Fortschritt; Adresse in Schritt 2 |
| Rechner | Kreisgeometrie | Rechteckgeometrie, inkl. Pflanzenzahl |
| Passende Produkte | Seitliche blaue Pfeile + von links füllender Balken | Äußere Pfeile + Positionsbalken für mehrere Aushebeplatten vorbereitet; derzeit höchstens eine je Artikel |

Diese Unterschiede sind Bestandsbeschreibung, keine automatisch auszuführende To-do-Liste. Wenn der Nutzer künftig ausdrücklich Einheitlichkeit verlangt, den dann beauftragten Umfang anpassen und die Tabelle aktualisieren.

## 4. Gestaltung, Layout und responsive Grenzen

### 4.1 Aus dem Code belegte Basis

| Eigenschaft | Bestehender Wert / Ort |
|---|---|
| Schrift | Aeonik, lokale Regular/Bold/Thin-WOFF2; Fallback Arial/sans-serif |
| Marine | --navy: #123361 |
| Magenta | --pink: #df359b |
| Grün | --green: #4eae94 |
| Dezente Textfarbe | --muted: #627797 |
| Verlauf | #0e2856 → #285f70 → #50ac92 in styles.css |
| Gemeinsame XD-Ausrichtung | catalog-xd.css und dessen --xd-Variablen |
| Karten-/CTA-Details | Bereichsspezifische letzte CSS-Dateien; nicht nur styles.css lesen |

Diese Werte beschreiben den geprüften Dummy, nicht automatisch die vollständige unternehmensweite CI. Neue Farben, Fonts, Schatten oder Rundungen nicht ohne Vorlage einführen. Vorhandene originale Produktbilder und Icons wiederverwenden; für neue Funktionspfeile saubere SVGs. Keine Emojis oder schlecht darstellbaren Unicode-Ersatzzeichen.

### 4.2 Fluchten und rechte Kacheln

Desktop bei eingeklapptem Filter:

- Der kompakte Filter beginnt bündig unter dem linken Hero-Kasten.
- Filter und Varianten zusammen orientieren sich an der Hero-Breite.
- Die Varianten reichen rechts bis zur Flucht des Produktbildkastens.
- Angebote, Muster, Merkliste und Kontakt stehen zusätzlich rechts daneben.
- Bei geschlossener Anfrage beginnt die erste Artikelzeile auf derselben Ebene wie Filter und rechte Kacheln. Die offene V12-Anfrage steht als erster Bereich der SKU-Spalte; sämtliche Produktzeilen folgen darunter. Kein einzelner angefragter SKU bleibt über dem Formular stehen.

Der linke Filter bleibt in beiden Zuständen oben am Anfang der SKU-Liste im normalen Dokumentfluss. Er läuft beim Scrollen mit dem Dokument aus dem Sichtfeld; kein Sticky, keine Begrenzung auf die SKU-Höhe und kein eigener Scrollbereich. `filter-sticky-host` bleibt als Raster-Wrapper bestehen; sein Name ist historisch.

Die rechten Spalten sind unverändert durch `selection-sidebar-host` und `selection-rail-host` auf die tatsächlich sichtbare SKU-Liste begrenzt. Oberkante bündig mit dem Anfang der SKU-Spalte, beim Scrollen sticky mit 20 px Abstand; Unterkante höchstens am unteren Rand der letzten `.product-row`, einschließlich geöffneter Details und einer dort folgenden Anfrage. `catalog-update.js` berücksichtigt den sichtbaren Formularunterrand zusätzlich, wenn die Anfrage nach dem letzten SKU steht. Nachfolgende Katalogabstände, Sammelbuttons, Listen unterhalb der Produkte und Empfehlungen gehören nicht zur Sticky-Grenze. Ein `ResizeObserver` aktualisiert `--sku-list-height` bei Filter-, Detail- oder Breitenänderungen. Auf Desktop kein Scroll-Handler für die Positionierung. Volle Listen bleiben bei Bedarf intern scrollbar.

Der untere Empfehlungsblock der Rundtöpfe und seine Überschrift fluchten mit der linken/rechten Außenkante der SKU-Spalte. `catalog-update.js` misst hierfür die `.results-column` und setzt `--sku-column-left` und `--sku-column-width`. Bei Breiten- oder Filterwechsel neu ausrichten; bei ausgeblendetem Variantenpanel responsive Fallbackwerte verwenden. BP hat derzeit keinen eigenen Empfehlungsblock.

Bei geöffnetem Filter nimmt der breite Filter links mehr Platz ein. Die volle rechte Kachelspalte verschwindet; die Varianten dürfen den freigegebenen Platz nutzen. Das starre Übertragen einzelner Desktop-Pixelwerte auf alle Breiten vermeiden.

Auch bei 700 px und schmaler bleiben beide Filterzustände im Dokumentfluss. Die horizontale mobile Schnellzugriffsleiste wird zwischen erstem und letztem SKU begrenzt und außerhalb dieses Bereichs ausgeblendet. Volle Listen dürfen weiterhin unter die Produktansicht rücken.

catalog-xd.css regelt unter anderem Breakpoints bei 1350, 1100 und 700 px. Bei schmaleren Breiten können die vollständigen Listen unter die Produktansicht rücken. Das ist bestehendes responsives Verhalten und kein Grund, eine volle Desktop-Seitenleiste auf Mobilgeräten zu erzwingen.

### 4.3 Anfrage-Buttons und Herzen

„Muster anfordern“ und „Angebot anfordern“ stehen auf Desktop rechts untereinander, auch bei geöffnetem Filter. Beschriftungen fett. Das Artikelherz sitzt oben rechts im weißen Artikelkasten und darf die CTAs nicht überdecken.

Bei sehr schmalen Karten erlauben bestehende Containerregeln andere Zeilenumbrüche. Priorität: alle Buttons lesbar, bedienbar und vollständig sichtbar; keine starre Desktop-Anordnung auf Kosten von Überlagerungen erzwingen.

Alle drei aktuellen Bereiche: Musterbutton Magenta mit weißer Schrift. Hover derzeit Hintergrund #fff4fb und magentafarbener Text. Angebot bleibt Konturbutton. Bereits zur Liste hinzugefügte Artikel behalten ihren sichtbaren Status.

## 5. Zustandsmodell: Filter, Listen und Aufklappbereiche

### 5.1 Zustandsmatrix

| Aktion / Zustand | Erwartetes Ergebnis |
|---|---|
| Seite regulär öffnen | Kompakter Filter und volle Listen gemäß vorhandener Initialisierung; kein Rechnermodal |
| Filter öffnen | Breiter Filter sichtbar; volle rechte Kacheln versteckt; schmale Listenleiste sichtbar |
| Filterwert wählen | Auswahl und Ergebniszahl aktualisieren; grüner Punkt an der betroffenen Filtergruppe |
| Filter einklappen | Kompakte Iconleiste; volle Listen mit unverändertem Inhalt zurück |
| Geschlossenen Artikelbereich bei offenem Filter öffnen | Filter zuerst einklappen, Bereich öffnen, zugehörige Zeile sinnvoll ins Blickfeld bringen |
| Muster-/Angebotsbutton oder Artikelherz bei offenem Filter betätigen | Bestehender Ablauf klappt Filter ein; Eintrag bleibt mit konkreter Farbe zugeordnet |
| Schmale Listenleiste anklicken | Filter einklappen und passende Kachel zeigen/fokussieren; keine zweite unabhängige Liste erzeugen |
| Anderen Bereich desselben Artikels öffnen | Innerhalb dieses Artikels den bisherigen Bereich durch den neuen ersetzen |
| Bereich wieder schließen | Detailinhalt ausblenden, Zustand/ARIA und bei VCG Zeiger aktualisieren |

Die zentrale Variable state.filterCollapsed bedeutet true = Filter eingeklappt. Nicht mit aria-expanded am Filterbutton verwechseln: dort ist der Wert entgegengesetzt.

Bei VCG heißt der Setter setFilterCollapsed, bei BP setCollapsed. Beide werden durch catalog-xd.js und die aktuellen Ergänzungen dekoriert. Im BP-Code nicht versehentlich den VCG-Setter aufrufen.

state.expanded ist je Artikel indiziert. Das ist kein seitenweit exklusives Akkordeon: Mehrere verschiedene Artikel können gleichzeitig einen offenen Bereich haben. Ohne Auftrag nicht auf „nur ein Artikel offen“ umstellen.

### 5.2 Filterdarstellung

Aktive Werte im Filter und grüne Punkte an der kompakten Gruppenleiste erhalten. Bei BP keine entfernbaren Chips mit X oberhalb der Varianten ergänzen. „Filter zurücksetzen“ steht oben rechts im geöffneten weißen Filterkasten, dünn und magenta.

BP-Werte sind klickbare Auswahlbuttons. Bei mehr als acht Werten eines Felds erscheinen „weitere Größen laden“ bzw. „weniger Größen anzeigen“. Eine bereits gewählte Größe muss auch in der verkürzten Ansicht sichtbar bleiben.

VCG filtert unter anderem Farben, Nachhaltigkeitskategorie, Verfahren, Durchmesser, Volumen und Konizität. Der bestehende Startzustand ist Volumen 0,5–0,99 l, Verfahren Tiefgezogen und ton/grau als Vorschau ohne aktiven Farbfilter. Andere Seriengrößen können getrennt unter „Weitere Artikel der Serie“ erscheinen. Dies nicht mit ungefilterten Haupttreffern verwechseln.

BP startet ohne diese VCG-Volumenvorauswahl. Ergebniszahl „x von 20 Artikeln“ und die vorhandene Filterlogik erhalten; keine VCG-Startfilter auf BP übertragen.

### 5.3 Angebote, Muster und Merkliste

Die drei Listen werden zentral über v3.js verwaltet. Ein Eintrag bezieht sich auf Artikel plus konkrete Farbvariante, nicht nur auf den Artikelnamen. Derselbe Artikel darf deshalb mit unterschiedlichen Farben vorkommen; identische Einträge nicht duplizieren.

Zu erhalten sind: Hinzufügen, Entfernen, Übernahme aus der Merkliste in Muster/Angebote, jeweilige Zähler und die bisherige Anfragezusammenfassung. VCG-Variantenherzen müssen genau die angeklickte Farbvariante speichern. Ein anderes Variantenherz darf nicht die aktuell im Hero ausgewählte Farbe übernehmen.

Die schmale Leiste zeigt Angebote, Muster, Merkliste, Kontakt und vorhandene Artikelzähler. Sie ist ein Zugang zu denselben Kacheln. Desktop: eigene 44-px-Spalte rechts neben den Varianten, gleicher --xd-gap wie links; oberer Rand bündig mit dem Anfang der SKU-Spalte; bis zum letzten SKU sticky bei 20 px. Nie in den Hero oder unter den letzten SKU wandern. Mobil unten rechts, am letzten SKU nach oben begrenzt und außerhalb des SKU-Bereichs verborgen.

### 5.4 Gemeinsames Inline-Anfrageformular: VCG V12, BP V6 und ST V1

`request-form.css` bleibt die KAPSTO-orientierte Stilbasis: weiße Karte, runde Felder, marine Texte, magentafarbener Fortschritt und CTA. Die drei aktuellen Seiten laden `inline-request.js/css`; BP lädt das bisherige `request-form.js` nicht mehr. Historische Seiten behalten ihre eigenen Modalformulare.

`#inline-request` ist dauerhaft das erste Kind von `.results-column`, vor allen SKU-Zeilen und außerhalb der austauschbaren Ergebnisliste. Filter und rechte Listen behalten ihr Raster und Scrollverhalten. Kein Dialog, Backdrop oder innerer Formular-Scroller. Kein einzelner SKU-Kopf oberhalb der Anfrage und kein Anfrage-Pfeil; bestehende Detail-Pfeile bleiben bei den Produktzeilen.

**Schritt 1, feste Reihenfolge:** Fortschritt; „Ihre Anfrage“ mit Muster-/Angebotscheckboxen (beide möglich, mindestens eine erforderlich); vertikale kompakte Artikel-/Farbliste ohne Bilder; eigene Musteranzahl und Angebotsstückzahl je Artikel-/Farbvariante; anschließend Kontaktdaten. Nur Mengen gewählter Anfragearten sind sichtbar, aktiviert und erforderlich. Die anderen Mengen bleiben im Entwurf erhalten. Ganzzahl mindestens eins; bisherige VCG-Grenzen zehn Muster / 10000000 Angebotsstücke bleiben erhalten, keine neue Obergrenze für BP/ST.

Die Artikelzeilen stammen ausschließlich aus den beim Checkout übergebenen Variantensnapshots. `v3.js` übergibt `{key,id,name,color,image}` als dritten Parameter von `showRequest`; der Schlüssel ist Artikelindex plus Variantenindex. `quantityDrafts` bewahrt getrennte Mengen pro Schlüssel, auch wenn sich Auswahl oder Reihenfolge beim erneuten Checkout ändern. Keine Bildkarten und keine globale Mengenangabe mehr. Schritt 2 und Abschluss zeigen eine kompakte Übersicht mit Artikel, gespeicherter Farbe und den gewählten Mengen.

**Kontaktdaten:** Anrede (inklusive „Keine Angabe“), Vorname, Nachname, frei eingegebene Funktion im Unternehmen, Telefon und E-Mail sind Pflichtfelder. **Schritt 2:** Firma, Straße, Hausnummer, PLZ, Ort, Land und Umsatzsteuer-ID erforderlich; Firmenzusatz, Region und Nachricht optional. Deutschland vorbelegt und frei änderbar, PLZ/Hausnummer sind internationale Textfelder. Keine Geschäftskunden-Abfrage; VAT nur auf nicht leeren Text prüfen, keine externe Gültigkeitsprüfung. Erforderliche Texte aus bloßen Leerzeichen abweisen.

Fortschritt reagiert auf gültige Pflichtangaben und Mengen: 0–50 % in Schritt 1, 50–100 % in Schritt 2. Vorbelegte Anfrageart, Land und Mengen bekommen keinen Startbonus. Ungültige aktive Mengen verhindern bereits „Weiter“. Enter prüft den aktiven Schritt, „Zurück“ erhält Werte; verborgene Schritt-Fieldsets sind deaktiviert. Vor dem Abschluss wird auch Schritt 1 erneut geprüft, falls ein späterer Checkout eine weitere Anfrageart aktiviert hat. „Anfrage testen“ simuliert den Abschluss in derselben Karte, ohne Versand.

X/Abbrechen verbergen die Karte mit erhaltenem Schritt und Eingaben. Außenklick und Escape schließen sie nicht. Re-Render von Filtern, Artikeln und Listen berührt den Formularbereich nicht. Ein neuer Checkout aktualisiert die Artikel und aktiviert zusätzlich die entsprechende Anfrageart; bestehende Mengen desselben Schlüssels sowie Kontakt-/Adressdaten bleiben erhalten. Die Anfrage umfasst die ausgewählte auslösende Liste, keine stillschweigende Vereinigung beider Listen.

Gibt `showRequest` ein Element mit `data-inline-request="true"` zurück, überspringt `v3.js` seine alte Modal-Nachbearbeitung. Archivformulare behalten den bisherigen Vertrag `.request-summary` und `select[name="color"]`. Listen und Entwurf gelten bis Reload; kein Browser-Storage, bereichsübergreifender Warenkorb oder Backend zugesagt. „Merkliste speichern“ bleibt der bisherige Export.

## 6. Rundtöpfe V12: genaue fachliche Vorgaben

### 6.1 Daten und Artikelzeile

data.js enthält 14 VCG-Artikel. Hauptwerte diameter und height sind cm, volume ist Liter. Die Rohdaten nicht auf die gerundeten Beispielzahlen einer XD-Grafik reduzieren.

latest.js erzeugt die aktuelle Grundstruktur der Zeile und technische Inhalte. v8.js ergänzt Variantenkacheln, Zeiger, neue Navigation und Listenleiste. Eine Änderung nur im ursprünglichen renderRow in app.js kann durch spätere Überschreibungen unsichtbar bleiben.

### 6.1a Maßeinheit ab V11

`measurements.js`/`.css` laden nur auf der aktuellen Rundtopfseite, zuletzt nach den bestehenden Adaptern. Erste Filtergruppe „Maßeinheit“, cm-/inch-Pillenschalter (mm in V11 ist durch den neuen Auftrag überholt) nach Nutzerscreenshot `image(20261110-101321).png` vom 10.11.2026 (visuell abgeleitet), magenta aktiv aus bestehender TEKU-CSS-Variable. Kompakte Filterleiste erhält einen Zugang mit aktueller Einheit. V12 verkleinert ausschließlich den eigentlichen Schalter um 15 %: Außenmaß 110,5 × 25,5 px statt 130 × 30 px, proportional kleinere Beschriftung/Polsterung. Start ist cm; diese Anzeigepräferenz bleibt beim Filterreset bestehen und wird nicht dauerhaft gespeichert.

Längen bleiben metrisch in cm, für inch ÷ 2,54. Volumen aus Litern: metrisch l, bei inch ÷ 0,016387064 → in³. Beispiel VCG 11: 11 cm / 8,6 cm / 0,53 l bzw. 4,33 inch / 3,39 inch / 32,34 in³. Höchstens zwei Nachkommastellen, ohne die Rohdaten zu verändern oder gerundete Anzeigen erneut umzurechnen. Kein Wechsel zu US-/UK-Gallonen oder Fluid Ounces. Am 10.11.2026 anhand NIST Handbook 44 (2025), Appendix C bestätigt: https://www.nist.gov/document/2025-nist-handbook-44-appx-c. in³ heißt Kubikzoll / cubic inch und ist eine Volumeneinheit; die bestehende Umrechnung bleibt korrekt.

Kurzmaße mit Icons, aktiver technischer Reiter „Maße“, vorhandene Hero-Produktinfo sowie Durchmesser-/Volumenfilter werden umgestellt. Filter verwenden weiterhin originale cm-Werte und Range-IDs; Ergebniszuordnung bleibt gleich. Verpackungszahlen, Konizität und der eigenständige Stellflächenrechner bleiben fachlich unverändert. Dieser rechnet weiterhin mit seinen eigenen ausdrücklich beschrifteten Einheiten.

Die Umschaltung aktualisiert gebundene Werte im bestehenden DOM statt Artikel neu zu rendern; offene Reiter, gespeicherte Farbvarianten und Tray-Scrollposition bleiben erhalten. Dekorierte `renderProducts`, `renderFilters` und `showHeroInfo` binden später erzeugte Inhalte wieder ein. Keine Dokument-Subtree-Beobachtung; ein kleiner Observer reagiert nur auf `html[lang]`.

Einheitenwahl ist in jeder Dokumentsprache zugänglich und wird nicht an DE/EN gebunden. Zahlenformat via `Intl.NumberFormat` mit `html.lang`. Das ist keine vollständige Übersetzung des bestehenden deutschen Dummys; dessen Sprachauswahl bleibt unverändert.

### 6.2 Variantenkacheln und Umweltzeichen

Jede Kachel zeigt Kategorie, konkreten Farbnamen, zugehöriges Originalfoto, eigenes Merklistenherz und nur die für diese konkrete Variante belegten Logos.

Reihenfolge: ton/grau, taupe/grau, weiß/grau; danach weitere Circular360-Farben und Baseline. Nur tatsächlich in p.variants vorhandene Varianten anzeigen. Nicht jedes globale Filterswatch ist eine verfügbare Ausführung jedes Artikels.

certificates.js enthält die Zuordnung Artikelname → Farbname → Zertifikate aus den einzelnen Variantenblöcken der Originalquelle. Nicht durch die Regel „alles Circular360 hat immer Siegel X“ ersetzen. Keine zusätzlichen Zertifizierungen oder Recyclinganteile erfinden.

Originalgrafiken:
- assets/logo-blauer-engel-de.png
- assets/logo-cyclos-htp-de.png

Die Dateien enden auf .png, enthalten laut Quellserver jedoch WebP. Nicht allein wegen der Endung als kaputt behandeln. Blauer Engel enthält seine URL im Originalbild. cyclos enthält bereits „100 % recyclingfähig“; die zusätzliche sichtbare Textzeile wurde ausdrücklich entfernt. Zugängliche Alternativtexte bleiben.

Die Kacheln sollen kompakt bleiben. Aktuelle Desktop-CSS-Basis: min-height 152 px, padding 14 px, zwei Spalten; bei schmalen Karten eine Spalte. Das ist eine responsive Basis und keine Anweisung, Inhalte hart auf 152 px abzuschneiden. Zwischen Logo und Kategorie/Farbname keine Überlagerungen.

Farbfilter oder Variantenwahl verwenden vorhandene Farbfotos. Boden-/Randdetails nicht künstlich umfarben. Fehlende Farbfotos nicht durch erfundene Assets ersetzen.

### 6.3 Technische Daten

Unterbereiche: Maße, Verpackungsdaten, Stellflächenrechner.

Produktbild und runde Detailansichten: Rand-/Bodenkreise sollen deutlich über das Produktbild ragen. Nummerierte Hinweise „1 Kronenrand“ und „2 Multilochprofilboden IV“ erhalten. Das Bodenfoto sitzt im Kreis so tief, dass unten kein störender weißer Saum bleibt. Beide Details sind vergrößerbar.

Referenz-Detailbilder sind Circular ton/grau. Die vorhandene Kennzeichnung beibehalten, selbst wenn das Hauptfoto eine andere Farbe zeigt. Fehlende artikelbezogene Detailfotos oder Patentangaben nicht nachzeichnen/erfinden.

Vorhandene Fußnoten wie D/K stehen im geschlossenen Artikelbereich unter der Zeile; keine neuen Patentbehauptungen ergänzen. Verpackungszahlen bleiben verständlich als Text mit Einheiten/Bezeichnungen dargestellt.

### 6.4 Passende Trays

Nur p.trays des ausgewählten Artikels verwenden. Die Kacheln öffnen die bisherige zugehörige Produktansicht. Keine neue Kompatibilität behaupten.

Die aktuelle Navigation hat schlichte blaue SVG-Winkel ohne Kreisrahmen links und rechts neben den Produkten und einen dünnen Balken darunter. Desktop maximal fünf vollständige Produkte nebeneinander; responsive vier/drei/zwei/eines, bei weniger Zuordnungen entsprechend weniger. Ausschließlich vorhandene `p.trays` anzeigen.

Jeder Pfeilklick verschiebt genau um eine Kachelbreite einschließlich Abstand. Schnelle Klicks zählen ihre Zielpositionen weiter, ohne Schritte durch eine laufende Animation zu verlieren. Anfang: links deaktiviert; Ende: rechts deaktiviert; bei vollständig sichtbaren Produkten beide deaktiviert. Pfeiltasten und horizontales Wischen aktualisieren denselben Zustand. `ResizeObserver` erhalten und beim Re-Render aufräumen.

Der dunkelblaue Balken beginnt immer links und füllt sich, statt als Griff weiterzuwandern. Füllstand = (Index des ersten sichtbaren Produkts + Anzahl sichtbarer Produkte) / Anzahl aller zugeordneten Produkte. Beispiel zehn Produkte, fünf sichtbar: 50 %, nach einem Schritt 60 %, am Ende 100 %. Bei einem Produkt 100 % und beide Pfeile deaktiviert; keine Produkte ergeben keine künstliche Navigation. BP-Aushebeplatten behalten ihre bisherige Navigation.


## 7. Anzuchtpaletten BP V6: Fachbegriffe und Datenzuordnung

bp/data.js enthält 20 Originalartikel. Außenmaße, Zellen und Plugs sind unterschiedliche Datenbereiche. Ein Plug ist der Jungpflanzen-/Substratballen, nicht das Loch der Palette. Größere Plug-Höhe gegenüber Zellenmaßen nicht als vermeintlichen Datenfehler „korrigieren“.

| Datenkey | Sichtbare Bezeichnung | Einheit / Bedeutung |
|---|---|---|
| length | Länge Anzuchtpalette in cm | Außenmaß; Skizze A |
| width | Breite Anzuchtpalette in cm | Außenmaß; Skizze B |
| height | Höhe Anzuchtpalette in cm | Außenmaß; Skizze C |
| plugD | Plug-Breite | cm; D nicht mehr in Feldbezeichnung |
| plugE | Plug-Höhe | cm; E nicht mehr in Feldbezeichnung |
| cellA | Zellmaß A | cm; A ausdrücklich beibehalten |
| cellB | Zellmaß B | cm; B ausdrücklich beibehalten |
| volume | Volumen je Zelle | ml, nicht Liter und nicht Gesamtvolumen |
| plants | Pflanzen pro Tray | Anzahl je Anzuchtpalette; bestehende Beschriftung |
| density | Pflanzen pro m² | Originalwert; nicht ungefragt neu berechnen |
| ccTrays | Trays pro CC-Lage | Anzahl auf einer Ablageebene |
| ccPlants | Pflanzen pro CC-Lage | Pflanzen auf einer Ablageebene |
| floor | Bodenansicht | Artikelspezifischer Bildpfad, falls vorhanden |
| fitting | Zugeordnete Aushebeplatte(n) | Nur tatsächliche Zuordnung |

Die Datenkeys bleiben erhalten; eine Textänderung ist kein Auftrag zur Umbenennung aller Datenfelder. Skizzen können weiterhin technische Buchstaben zeigen. Keine globale Ersetzung von D/E/A/B in Artikelnamen oder Produktdaten durchführen.

In der kompakten Zeile gemeinsame Angabe „Anzuchtpalette · cm“ oberhalb der drei Werte Länge/Breite/Höhe. Dort nicht dreimal den langen Palettentext in schmale Spalten quetschen. In der geöffneten Maßtabelle vollständig ausschreiben.

Runde/quadratische Zellmaße lesbar als „Durchmesser“/„quadratisch“ kennzeichnen. Keine unlesbaren Kästchen stehen lassen. „Zellmaß A/B“ wurde bewusst nicht in Zellbreite/-höhe umbenannt.

### 7.1 Filterreihenfolge

1. Plug-Größe: Plug-Breite, Plug-Höhe.
2. Zellvolumen.
3. Pflanzen pro Tray.
4. Abmessungen Anzuchtpalette.
5. Anzuchtzelle: Zellmaß A/B.
6. Pflanzen pro m².
7. Nachhaltigkeitskategorie.
8. CC-Lage / Transport.

### 7.2 CC-Wagen und CC-Lage erklären

Hinter beiden CC-Werten kleine, verständlich benannte Info-Schaltfläche; Tabelle und vorhandene Filterhilfe berücksichtigen.

Erklärung: Ein CC-Wagen bzw. CC-Container ist ein im Gartenbau üblicher Transportwagen für Pflanzen. Eine CC-Lage ist eine einzelne Ablageebene dieses Wagens. „Trays pro CC-Lage“ bezeichnet die Anzahl der Paletten auf einer Ebene; „Pflanzen pro CC-Lage“ deren Pflanzenzahl.

Aktuell gibt es einen erklärenden Dialog und eine Titelhilfe. Keine Maße, Traglasten, Ebenenzahlen oder Stapelkapazitäten des Wagens ergänzen, wenn dafür keine konkrete Quelle vorliegt.

### 7.3 Aushebeplatten, Bodenbilder und Fehlwerte

„Aushebeplatte“ beibehalten. Die Platte drückt Jungpflanzen von unten aus den Zellen. Dies ist keine Palette zum Transportieren und kein pauschal „passender Topf“.

Ohne Zuordnung Button deaktiviert mit „nicht hinterlegt“ statt leerem Aufklappbereich. Aktuelle Daten enthalten höchstens eine Aushebeplatte je BP-Artikel. Die Navigation für mehrere ist vorbereitet, aber mit den aktuellen Daten nicht als Mehrproduktfall sichtbar.

Bekannte Fehlwerte:
- BP 3153-2,6/126 T: kein Zellvolumen.
- BP 3153/35 T und BP 3153/18: keine Plug-Maße D/E.

Diese bleiben fehlend. Nicht null als 0 ml/cm oder als „passt für alle“ ausgeben. Fehlende Werte nicht aus ähnlich benannten Artikeln übernehmen. Die Stellflächenberechnung benötigt Außenlänge/-breite, nicht das fehlende Zellvolumen.

## 8. Stellflächenrechner: zwei Geometrien, eine Bedienlogik

### 8.1 Gemeinsame Bedienung

Technische Daten → Reiter „Stellflächenrechner“ → CTA „Stellflächenrechner öffnen“ → Modal.

Weder beim Seitenladen noch beim bloßen Anwählen des Reiters automatisch öffnen. Ein optionaler Review-Link darf höchstens den CTA sichtbar machen. Dialog per Schließen, Escape und bestehendem Hintergrundklick schließen; Fokus sinnvoll zum Auslöser zurückgeben und Hintergrundscrollen wieder freigeben.

Produktwerte werden vom geklickten Artikel vorbelegt. Änderungen an eigenen Maßen gelten nur für diese Berechnung; kein Überschreiben der Produktdaten oder der Filter.

Flächeneinheiten: m, cm, ft, in. Einheitenwechsel soll dieselbe physische Fläche beibehalten. Dezimalkomma und -punkt verarbeiten, leere/ungültige/negative Eingaben verständlich ablehnen. Reset stellt die Ausgangsmaße und Standardeinstellungen wieder her. Optionalen Abstand und Zuordnungswerte nicht versehentlich aus einem anderen Artikel übernehmen.

Desktop kompakt in Spalten. Nicht pauschal den ganzen Rechner verkleinern: ausreichend lesbare Werte, kurze Längen-/Breitenfelder. Zielprüfung 1280 × 720 ohne inneres Scrollen. Auf kleinen Geräten vorhandenen Wechsel Eingaben/Ergebnisse benutzen; kein erzwungener Desktopdialog.

### 8.2 Rundtöpfe

engine.js und component.js berechnen ganze runde Töpfe im Viereck- und Dreieckverband. Beim Dreieckverband beide Ausrichtungen der Fläche vergleichen.

**Abstandskonvention der vorhandenen Formel:** Topfteilung = Durchmesser + Abstand; am Rand wird entsprechend der Vorlage ein halber Abstand reserviert. Bei 0 Abstand dürfen Außenkreise den Rand berühren. Nicht heimlich an die Rechteckkonvention angleichen.

Kontrollwerte bei 1 × 1 m und 0 Abstand:
- 11 cm Durchmesser: 81 im Viereckverband, 85 im Dreieckverband.
- 12 cm Durchmesser: 64 im Viereckverband, 68 im Dreieckverband.

Die Darstellung ist ein Vergleich regelmäßiger Anordnungen, kein Nachweis maximaler Kreispackung. Details und ursprüngliche Formelgrenzen stehen in docs/calculator-v7.md.

### 8.3 Anzuchtpaletten und rechteckige ST-Trays

rectangular-engine.js und rectangular-component.js verwenden die rechteckige Außen-Grundfläche. Je einheitlicher Ausrichtung:

    Anzahl längs = floor((Flächenlänge + Abstand) / (Produktlänge + Abstand))
    Anzahl quer = floor((Flächenbreite + Abstand) / (Produktbreite + Abstand))
    Gesamtzahl = Anzahl längs × Anzahl quer

Zusätzlich Produktlänge/-breite vertauschen und das bessere Ergebnis vorauswählen. Abstand liegt nur zwischen benachbarten Produkten, nicht zusätzlich am Flächenrand. Kein Mischen beider Ausrichtungen, keine Stapelung, Wege oder sonstige Packoptimierung behaupten.

Pflanzenzahl = Palettenzahl × Pflanzen je Palette, falls der Wert vorhanden ist. Fehlende Pflanzenzahl nicht mit 0 oder einem frei erfundenen Standard ersetzen. Anzeige beider Ausrichtungen, Zeichnung und Ergebnis müssen dieselbe Auswahl darstellen.

Kontrollwerte für BP 2850-2,5 D/104 T:
- Produkt 50 × 28 cm, 104 Pflanzen/Palette.
- Fläche 100 × 100 cm, Abstand 0: 6 Paletten / 624 Pflanzen.
- Fläche 56 × 50 cm, Abstand 0: längs 1, gedreht 2; beste Ausgabe 2 / 208 Pflanzen.
- Fläche 50 × 28 cm, Abstand 0: längs genau 1.
- Zwei Produkte à 50 cm mit 1 cm Zwischenraum passen längs auf 101 cm, nicht auf 100 cm.

Die Komponente unterstützt `product-kind="Trays"` und optional `content-label="Töpfe"`. ST übergibt Außenmaße und `pots`; Ergebnis, Eingabe und Methodentext nennen Töpfe. BP behält standardmäßig Pflanzen. Beide verwenden denselben unveränderten Rechteck-Rechenkern; es gibt keine automatische CC-Wagenplanung.

### 8.4 Animation beim Wechsel

Nur neue aktuelle Seiten laden `space-calculator/diagram-motion.js` vor den Komponenten. Expliziter Wechsel: 1000 ms SVG-Transformationen mit Web Animations, zusätzliche/entfallende Produkte blenden ein/aus. Laufende Animationen werden bei schneller Gegenwahl an ihrer aktuellen Position übernommen. `prefers-reduced-motion: reduce` schaltet direkt um. Kein dauernder JavaScript-Frame-Loop; Darstellung bleibt auf bestehende Ausschnittsgrenzen begrenzt. Geometrie/Ergebnisse unverändert. BP behält rechteckige Paletten und animiert die beiden Ausrichtungen.

### 8.5 Komponentenabhängigkeiten

Rechteckkomponente benötigt die gemeinsamen Hilfen aus engine.js und die Styles aus component.js. Danach rectangular-engine.js und rectangular-component.js laden; integration.js zuletzt. component.js exportiert die Styles über TEKUSpaceCalculatorStyles.

Berechnungslogik bleibt getrennt vom DOM/Seitenadapter. Ein Fix am Rundtopfrechner darf die Rechteckrechnung nicht ersetzen oder umgekehrt. Gemeinsame Modal-/Styleänderungen an beiden Bereichen prüfen.

## 9. Quellen, Bilder und fachliche Grenzen

| Quelle | Verwendung |
|---|---|
| https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5- | Ursprüngliche VCG-Daten und Varianten-/Zertifikatsbezug |
| https://www.poeppelmann.com/de/teku/produkte/bp-jungpflanzen-und-baumschulpaletten | BP-Artikel, technische Werte, Bodenbilder und Aushebeplatten |
| https://container-centralen.com/cc-container/ | Einordnung des CC-Containers; konkrete BP-Kapazitäten stammen aus Produktdaten |
| https://www.poeppelmann.com/de/teku/produkte/st-transport-und-kulturtrays | ST-Originaldaten, 13.11.2026; Feldzuordnung und Assets in st/SOURCE.md |
| docs/sources-2026-10-22.md | Frühere Quellenprüfung, BP-Quellfelder und Abhängigkeiten |
| docs/round-pots-v8.md | Entscheidungen und Korrekturen zu V8/BP |
| docs/calculator-v7.md | Rundtopfformeln, Herkunft und Integrationshinweise |
| docs/calculator-rectangular.md | Rechteckformel, Schnittstelle und ausgeführte Prüfungen |

Diese Links sind Quellenanker, keine Behauptung eines erneuten Abrufs bei jedem Auftrag. Für neue oder zeitabhängige Produktfakten aktuelle Quellen prüfen und Datum nennen. Die Zahl 14/20/30 beschreibt den Dummy-Datenbestand, nicht die garantierte aktuelle Größe des Produktivsortiments.

Vorlagen aus früheren Chats sind nicht automatisch im neuen Chat verfügbar. Dateinamen in älteren Dokumenten ersetzen keine tatsächliche Bilddatei. Für pixelgenaue neue Änderungen die relevante Grafik verfügbar machen; ansonsten eine Abweichung kenntlich machen. Keine nicht vorhandene XD-Datei oder ein Pöppelmann-Backend behaupten.

### 9.1 ST V1: eigener Tray-Datenbestand

`st/source-data.json` enthält den bereinigten öffentlichen Produktextrakt vom 13.11.2026, ohne Seitenkonfiguration oder Zugangsschlüssel. 30 ST-Artikel, je eine Variante Circular grau / Circular360 mit originaler Bestellnummer und artikelbezogenen Zertifikaten; 372 passende Topfzuordnungen. Alle 69 genutzten Originalassets liegen lokal, mit Herkunft und SHA-256 in `st/asset-manifest.json`. `st/SOURCE.md` dokumentiert die Feldnummern, Datenlücken und Bildverwendung.

ST hat ausschließlich A/B/C-Außenmaße, Töpfe pro Tray, Trays und Töpfe pro CC-Lage sowie „Trays unterverpackt auf Palette“. Keine Zell-, Plug- oder Volumendaten aus BP übertragen. Filter umfassen Farbe, Nachhaltigkeitskategorie, A/B/C, Töpfe pro Tray und beide CC-Werte; längere Wertelisten bieten „weitere Größen laden“. Einzige Quellfarbe/-kategorie nicht künstlich erweitern.

„Passende Töpfe“ verwendet ausschließlich `p.fitting` des gewählten ST-Artikels; maximal fünf nebeneinander, seitliche blaue Winkel, exakt ein Produkt pro Klick, Füllbalken ab links, Anfang/Ende deaktiviert. Ein Produkt: voller Balken, beide Pfeile aus. Original-Produktlinks öffnen sich in neuem Tab. Hero/Zoom nutzen das jeweilige Quellfoto; keine künstliche Bodenansicht. Vorteilsbilder und Texte berücksichtigen die Quellunterschiede Standard/B/D und die Etikettenaufnahmen bestimmter Modelle.

## 10. Fehlende Funktionen und noch offene Arbeit

- ST V1 ist umgesetzt; GP und weitere Tray-Serien sind nicht Teil des aktuellen Auftrags.
- ST 2840/8-13 und ST 2840/8-13 D: Quellfeld „Töpfe pro CC-Lage“ fehlt, deshalb „Keine Angabe“. Keine selbst berechnete Zahl als Originalwert ausgeben. Es gibt keine zusätzlichen ST-Bodenfotos oder weiteren Farben im extrahierten Variantenbestand.
- Zusätzliche Produkt-Rand-/Bodendetailfotos, Patenttexte oder andere Farbabbildungen: nur mit Vorlage/Originalquelle ergänzen.
- BP verwendet nun ebenfalls „Varianten“ und den magentafarbenen Musterbutton. Die bisherigen Ein-/Ausblendtexte und übrigen Aufklappdetails bleiben bewusst erhalten.
- Ein echtes Anfrage-Backend, Anmeldung, Preise, Verfügbarkeit, CRM-Anbindung oder dauerhaft gespeicherter Warenkorb gehören nicht zum derzeitigen Dummy.
- Eine allgemeine CC-Wagenplanung über mehrere Ebenen wird nicht berechnet.
- Produktnavigation mit mehreren BP-Aushebeplatten ist in der Komponente vorhanden, aber im aktuellen Datenbestand nicht real belegbar.
- Ob ein bestimmtes spätes Detail bereits „fertig“ ist, immer im aktuellen Code und gegebenenfalls in der gerenderten Ansicht nachprüfen.

## 11. Dateikarte und technische Stolperstellen

| Änderung | Zuerst ansehen | Mitbetroffene Bereiche |
|---|---|---|
| Bereiche/Versionsauswahl | version-switch.js; index.html, bp/index.html, st/index.html | Aktuell + Archive |
| VCG-Einheiten cm/inch in V12 | measurements.js, measurements.css | Nur aktuelle Rundtopfseite; Quelldaten in cm/Liter und archivierte Versionen erhalten |
| VCG-Daten/Filter/Grundfunktionen | data.js, app.js | Aktuelle Ergänzungen können Renderer ersetzen |
| Aktuelle VCG-Zeile/Technik | latest.js, technical.js, technical.css, v4.css | v8.js und späte CSS-Regeln |
| VCG-Kacheln/Zeiger/Tray-Fortschritt | v8.js, v8.css, certificates.js | Auswahl und Listen in v3.js |
| BP-Maße/Filter/Zeilen/Daten | bp/app.js, bp/data.js, bp/styles.css, bp/v2.css | bp/review-update.* |
| BP-CC-Hilfe/Listenleiste/Produktnavigation | bp/review-update.js, bp/review-update.css | Shared Listen und setCollapsed |
| Gemeinsame Listen | v3.js, v3.css | VCG, BP und ST samt Cachebuster |
| Gemeinsame aktuelle Anfrage | inline-request.js, inline-request.css, request-form.css | VCG V12, BP V6, ST V1; Mengen je Artikel-/Farb-Schlüssel, Checkout-Vertrag in v3.js |
| ST-Seite / Originaldaten | st/index.html, app.js, data.js, styles.css, interaction.js | source-data.json, asset-manifest.json, SOURCE.md; keine BP-Zellmaße |
| Fluchten/automatisches Einklappen | catalog-xd.js, catalog-xd.css | Alle drei aktuellen Bereiche |
| Ältere Produktnavigation | review.js, review.css | Kann für nicht ersetzte Bereiche weiterhin wirksam sein |
| Technische Reiter | technical.js | Beide Bereiche; Rechner wird später dekoriert |
| Kreisrechnung | space-calculator/engine.js, component.js | Geteilte Styles für Rechtecke beachten |
| Rechteckrechnung | space-calculator/rectangular-engine.js, rectangular-component.js | BP und ST |
| Aktuelle Beschriftung / SKU-begrenzte Scrollspalten | latest.js, bp/app.js, st/app.js, catalog-update.js, catalog-update.css | Alle drei aktuellen Bereiche; Filter und Listen in Hosts; Archive unabhängig |
| SVG-Anordnungsanimation | space-calculator/diagram-motion.js | Beide aktuellen Rechnerkomponenten |
| Modal/CTA/Seitenadapter | space-calculator/integration.js, modal.css | Beide Geometrien und drei aktuelle index.html |
| Archivierung | versions/ bzw. bp/versions/ | Relative Pfade und Umschalter |
| Prüfnachweise | tests/ und die Fachdokumente | Historische Prüfungen nicht als neue ausgeben |

**Ladereihenfolge ist Teil der Funktion.** Das Projekt verwendet globale Funktionen, die spätere Skripte dekorieren/überschreiben. renderProducts, renderRow, renderDetail und die Collapse-Setter nicht isoliert neu definieren, ohne vorhandene Wrapper zu berücksichtigen.

VCG grob: app.js → v3.js → technical.js → latest.js → v4.js → catalog-xd.js → review.js → Rechneradapter → certificates.js/v8.js. BP grob: technical.js → bp/app.js → gemeinsames v3.js → catalog-xd.js → review.js → bp/review-update.js → Rechnerkomponenten/Adapter. Alle drei aktuellen Seiten laden `request-form.css` und danach `inline-request.js/css`. VCG lädt zusätzlich `measurements.js`. ST nutzt seinen eigenen app-/interaction-Adapter und geteilte Styles/Listen/Rechner, ohne VCG-Zertifikatszuordnungen oder BP-Produktdaten zu übernehmen. Archivseiten behalten ihre bisherigen Formulare und Maßanzeigen. Bei Änderungen die tatsächlichen script-Tags prüfen; diese Kurzfolge ist kein Ersatz für index.html.

CSS ebenfalls in tatsächlicher Reihenfolge prüfen. Ein früher Treffer in styles.css ist oft nicht die am Ende wirksame Regel. Vorhandene Media-/Containerqueries sowie Scope-Klassen beachten: rounds-v8 und bp-review sind bereichsspezifisch, catalog-xd und v3-Dateien geteilt.

Besonders beachten:
- Root-relative Annahmen können unter bp/ und Archivpfaden brechen.
- data-* Attribute steuern bestehende Klickhandler; bei Umbenennungen alle betroffenen Handler prüfen.
- Handler in Capture-Phase können vor einem neuen Bubble-Handler laufen.
- Re-Render ersetzt DOM-Knoten. Zustand, Fokus, Artikel-ID und gespeicherte Farbvariante nicht an flüchtige Elemente binden.
- Neue ResizeObserver/Listener beim Re-Render aufräumen; keine vervielfachten Reaktionen.
- Rechner liegen im offenen Shadow DOM. Für UI-Tests zugängliche Rollen oder passende Shadow-DOM-Locators nutzen; Dokument-CSS greift dort nicht direkt.
- Bei neuen Textänderungen Sichtbarkeit und Platz prüfen: „Länge Anzuchtpalette“ passt nicht dreimal nebeneinander in die schmale Zusammenfassung.
- Nach Änderungen an gemeinsamem JS/CSS passende Cacheparameter in allen betroffenen aktuellen HTML-Dateien aktualisieren.

## 12. Prüfkatalog: je nach Auftrag auswählen

Nicht für jede Textkorrektur die gesamte Anwendung erneut prüfen. Betroffene Funktion plus unmittelbar verbundene Abläufe verifizieren. Änderungen an gemeinsamen Dateien oder Rechenlogik erfordern eine gezielte Prüfung aller betroffenen aktuellen Produktbereiche.

| Auftrag | Mindestprüfung |
|---|---|
| Text/Label | Richtige Stelle und Einheit; keine unbeabsichtigten Treffer in Artikelname/Rohdaten; keine Überlagerung |
| Maßeinheit | cm/inch in Kurzmaßen und Maßtabellen, Filterwerte und Treffer erhalten, spätere Renders, Sprachwechsel, Tastatur und responsive Breiten; V10/BP unverändert |
| Filter | Auswahl setzen/entfernen/resetten; korrekte Trefferzahl und grüner Punkt; beide Filterzustände |
| Listen | Konkrete Farbe hinzufügen/entfernen; Duplikate; Wechsel der Listen; Inhalt nach Filtereinklappen |
| Anfrageformular | VCG/BP/ST immer an erster Stelle der SKU-Spalte, kompakte Artikel-/Farbliste mit eigenen Mengen, Anfrageart und Mengen vor Kontaktdaten in Schritt 1; Filter/Rerenders und Fokus erhalten, laufender Fortschritt, Außenklick/X und Datenerhalt. Beide Schritte/Einstiege, Pflichtwerte, Mengen, exakte Farben und simulierter Abschluss |
| Aufklappbereich | Öffnen/Schließen/Wechsel; automatisches Einklappen; bestehende Inhalte; VCG-Zeiger |
| Carousel | VCG/ST: seitliche blaue Pfeile, maximal fünf Produkte, ein Produktschritt je Klick, von links füllender Balken, Anfang/Ende; BP bisherige Navigation erhalten |
| Technische Bilder | Richtiger Artikel; Ausschnitt/Überlappung; Caption; Zoom; keine unbelegte Umfärbung |
| Rechner | CTA-Pflicht; richtige Vorbelegung; Kontrollwerte; Ausrichtungswechsel; Einheiten; Reset; Fehler; Schließen/Escape/Fokus |
| Versionierung | Altes und neues Routing; drei Kategorien; relative Bilder, Fonts und Skripte |
| Geteiltes CSS/JS | VCG, BP und ST; Desktop und mindestens eine schmale Ansicht |
| Filter/Sticky-Listen | Linker Filter in beiden Zuständen statisch; rechte Listen unverändert am Anfang/Mitte/Ende der SKU-Liste und nach Höhenänderung begrenzt; mobile Schnellzugriffe erhalten |
| Empfehlungsblock | Linke/rechte Außenkante und Überschrift bündig mit SKU-Spalte, bei beiden Filterzuständen und schmalen Breiten |

Geeignete Breiten für Layoutänderungen: 390, 768, 1440 px, jeweils relevante Filter-/Panelzustände. Rechner zusätzlich 1280 × 720. Nicht nur die Seitenbreite messen: überlappende Labels, abgeschnittene CTAs, unsichtbare Siegel und verdeckte Elemente können auch ohne horizontales Seitenscrollen auftreten.

Passende lokale Checks:

    node --check PFAD_ZUR_GEAENDERTEN_JS_DATEI
    git diff --check
    node --test tests/space-engine.test.cjs tests/rectangular-engine.test.cjs

Bei neuen Rechenänderungen unabhängig begründete Testfälle ergänzen, keine Tests schreiben, die bloß dieselbe Implementierung kopieren. Reine Dokumentationsänderungen benötigen keine erneuten Rechen- oder Browserprüfungen.

**Prüfung am 13.11.2026:** VCG V12, BP V6 und ST V1 im Chromium-Browser: Inline-Anfrage vor allen SKU-Zeilen; mehrere Artikel mit unabhängigen Muster-/Angebotsmengen, nur aktive Mengen sichtbar/erforderlich, ungültige Menge blockiert Weiter, Kontakte danach. 0/50/100 %, Enter/Zurück, X/erneuter Checkout, Außenklick/Escape, Re-Render und Hinzufügen eines weiteren Artikels mit erhaltenem Entwurf sowie vollständiger Dummy-Abschluss geprüft. Responsive 1440/768/390 px in beiden Filterzuständen ohne horizontalen Überlauf; Desktop/Mobil visuell kontrolliert. Alle 30 ST-Datensätze und 372 Topfzuordnungen mit dem bereinigten Originalextrakt abgeglichen; alle 69 lokalen Assets anhand Größe/SHA-256 geprüft. ST-Filter/Reset/weitere Größen, Verpackungsdaten und Carousel mit 15/43 Produkten sowie Einzelprodukt geprüft: maximal fünf Kacheln, ein Schritt, voller Endbalken, deaktivierte Endpfeile und Tastatur. ST-Rechner 39,5 × 29,4 cm / acht Töpfe → sechs Trays / 48 Töpfe auf 1 m²; BP behält Pflanzen. Kategoriepfade und VCG-V8/BP-V3-Archivumschalter geprüft. Zwölf Kreis-/Rechteck-Rechentests bestanden. Nach Bereinigung vier URL-kodierter Dateinamen keine JavaScript- oder Assetfehler. Syntax-/Diffprüfung bestanden; archivierte Laufzeitdateien unverändert.

**Prüfung der V12-Anfrageposition und Mengen am 12.11.2026:** Chromium bei 1440/768/390 px, jeweils beide Filterzustände und beide Schritte. Drei Artikel (VCG 13, VCG 11, VCG 12) ausgewählt: Formular immer erstes Kind der SKU-Spalte vor allen Produktzeilen; Filter-/Listen-Hosts bleiben an ihrer Position. Mengen ausschließlich in Schritt 1, passende Sichtbarkeit/Aktivierung bei Muster/Angebot, ungültige Angebotszahl und Musterzahl über zehn blockieren „Weiter“. Mengen und Kontaktdaten bleiben bei Zurück/Enter, X/erneutem Öffnen, Filter-/Detail-/Einheitenwechsel und Re-Render erhalten; Fokus bleibt bestehen. Fortschritt 0/50/100 und vollständiger Dummy-Abschluss mit beiden Mengen und drei Artikeln geprüft. Eine durch einen späteren Checkout aktivierte ungültige Menge wird vor Abschluss auf Schritt 1 zurückgeführt. Kein horizontaler Überlauf oder innerer Formular-Scroller; kein Anfrage-Pfeil/temporärer Kopf mehr. Desktop/Mobil visuell kontrolliert; BP-Modal unverändert und keine JavaScript-/Assetfehler. Syntax-/Diffprüfung bestanden.

**Prüfung der V12-Produktzuordnung und cm-Anzeige am 10.11.2026:** Chromium bei 1440/768/390 px mit offenem/kompaktem Filter: cm/inch-Kurzmaße, Maßtabelle und Durchmesserfilter; wiederholter Einheitenwechsel. Bestehende angefragte SKU bleibt an ihrem Platz, Formular direkt darunter. Weißer Zeiger zentriert unter beiden Anfragebuttons, auch nach Größenwechsel; keine Überlagerung von Kurzmaßen und technischen Schaltern im aktiven Kopf. Sichtbare Artikelliste zeigt die gespeicherten Originalfarben unabhängig von der aktuellen Vorschaufarbe. Zwei Artikel, Neuaufbau mit Erhalt von Eingaben/Fokus/Cursor, Wechsel zu Varianten und zurück, Außenklick/X, Fortschritt 0/50/100 und Inline-Abschluss geprüft. Herausgefiltertes Produkt erhält einen Kopf ohne Filterreset; Anfrage unter letztem SKU wird in der rechten Scrollgrenze berücksichtigt. BP-V6-Modal und V11-Archiv bleiben unverändert; keine JavaScript-/Assetfehler. Desktop-/Tablet-/Mobilansichten visuell kontrolliert; Syntax-/Diffprüfung bestanden.

**Prüfung V12 am 10.11.2026:** Chromium bei 1440/768/390 px, jeweils offene/kompakte Filter. Formular vor den SKU-Zeilen, bündig mit der Ergebnis-Spalte; unveränderte Koordinaten/Breiten der Filter- und Listen-Hosts; kein horizontaler Überlauf oder innerer Formular-Scroller. Gültige Kontaktfelder erhöhen 0 → 50 %, Adresse 50 → 100 %; ungültige E-Mail, fehlende Anfrageart, Leerzeichen-VAT und Musterzahl über zehn senken den Fortschritt/blockieren den nächsten Schritt. Beide Anfragearten, getrennte Mengen, Enter/Zurück und Inline-Abschluss geprüft. Außerhalbklick, Escape, X/erneutes Öffnen, Produkt-/Filter-Re-Render und Einheitenwechsel erhalten Formular/Schritt/Eingaben. Zwei gespeicherte Farben desselben Artikels werden exakt übernommen. Toggle im Browser mit V11 verglichen: 110,5 × 25,5 px gegenüber 130 × 30 px, exakt Faktor 0,85. Desktop-/Tablet-/Mobilansichten und Schritt 2 visuell geprüft; X überdeckt die Prozentanzeige nicht. V11-Routing samt ursprünglichem Modal, unverändertes BP-V6-Modal und fehlerfreie Assets/JavaScript geprüft. Archiv-Runtime/-Assets bytegleich zur Ausgangsbasis. Syntax-/Diffprüfung der geänderten Dateien bestanden; unveränderte Original-SVGs behalten ihr Zeilenformat.

**Prüfung V11 am 10.11.2026:** Chromium bei 1440/768/390 px mit offenem und kompaktem Filter: keine horizontalen Überläufe oder überlaufenden Kurzmaße. Umrechnung aller 14 Artikel unabhängig mit cm³-Volumenformel gegengeprüft; zehn Hin-/Rückwechsel ohne Rundungsdrift oder veränderte Quelldaten. Maßtabelle, Hero, Durchmesser-/Volumenfilter, Filterreset, leere Treffer, Verpackungszahlen, spätere Re-Renders, erhaltene Tray-Knoten/-Position und Musteranfrage geprüft. Tastaturwahl per Space/Enter sowie Zahlenformat de/en-US geprüft; Umschaltung in beiden Sprachen zugänglich. Desktop, Tablet, Mobil und Maßtabelle visuell kontrolliert. V10-Archiv und Rückroute auf V11, BP-V6-Kategoriepfad sowie alle Archiv-Runtime-/Assetbytes gegenüber vorherigem HEAD geprüft. Keine JavaScript-/Assetfehler; Syntax-/Diffprüfung bestanden.

**Prüfung der zweistufigen Anfrage am 05.11.2026:** Beide Bereiche im Chromium-Browser jeweils über Muster- und Angebotsliste geprüft: Schrittvalidierung inklusive leerer Felder, ungültiger E-Mail und Leerzeichen in der Umsatzsteuer-ID; kombinierte und einzelne Anfragearten, getrennte Mengen, Enter-Bedienung, Zurückgehen mit Datenerhalt und vollständiger Dummy-Abschluss. Internationale Adresse mit alphanumerischer PLZ sowie optionaler Region geprüft. Bei 1280/768/390 px kein horizontaler Überlauf; Aktionsleiste erreichbar. Beide Schritte visuell kontrolliert; keine JavaScript-/Assetfehler. Syntax-/Diffprüfung bestanden.

**Prüfung V10/BP V6 am 05.11.2026:** Statischer Filter in beiden Zuständen, unverändertes Mitlaufen und SKU-Ende der rechten Spalten sowie Empfehlungsfluchten bei 1774/1280/768/390 px im Chromium-Browser geprüft. Tray-Navigation mit 0/1/3/5/6/10/20 temporär wiederholten Originalzuordnungen: maximal fünf Produkte, ein Schritt je Klick, schnelle Dreifachklicks, Fortschritt und deaktivierte Endpfeile geprüft. Archivrouting V9/BP V5 samt bisherigen Sticky-Filtern und lokalen Assets geprüft; keine JavaScript-/Assetfehler. Syntax-/Diffprüfung bestanden.

**Prüfung der Scrollanpassung vom 05.11.2026:** Beide Bereiche im Chromium-Browser bei 1774/1280/768/390 px geprüft. Desktop-/Tabletfilter und rechte Seitenspalten am Anfang, beim Scrollen und exakt am letzten SKU kontrolliert; lange Filter intern scrollbar. Mobile kompakte Filterleiste und begrenzte Schnellzugriffe geprüft. Filterauswahl aktualisiert die Grenze; Musterliste und Anfrageformular bleiben bedienbar. Keine JavaScript- oder Assetfehler; Syntax-/Diffprüfung bestanden.

**Prüfung der Anpassung vom 05.11.2026:** Formular in beiden Bereichen über Muster- und Angebotsliste geöffnet; gemeinsame Auswahl, getrennte Mengen, Pflichtbestätigung und Umsatzsteuer-ID einschließlich Leerzeicheneingabe geprüft. Leere Anfrageart blockiert den Abschluss. BP-Primärfarbe und „Varianten“-Beschriftungen kontrolliert; Formularbreiten 390/768/1440 px ohne horizontalen Überlauf. JavaScript-Syntax und Diffprüfung bestanden; keine Browserfehler oder fehlenden Assets.

**Prüfung V9/BP V5 am 30.10.2026:** zwölf Rechentests und Syntax-/Diffprüfung bestanden. Beide Bereiche im Chromium-Browser bei 390/768/1440 px geprüft; Rechner bei 1280 × 720 ohne inneres Scrollen, beide Wechselrichtungen mit 1000 ms, Gegenwechsel während der Animation und reduzierte Bewegung. Punktnavigation mit temporär wiederholten Originalkacheln für 1/5/6/20 Einträge bis zum Ende geprüft; diese Testdaten werden nicht gespeichert. V8/BP V4 sind eigenständig archiviert.

**Historischer Prüfstand:** Vor der Dokumentrevision bestanden zwölf Rechentests. Der BP-Dialog wurde bei 1280 × 720 mit 598 px Inhaltshöhe ohne inneres Scrollen geprüft; Mobilansicht und genannte Kontrollwerte wurden im Browser kontrolliert. Das ist kein Nachweis, dass eine spätere Änderung diese Prüfungen automatisch wieder besteht.

Fehlt in einer Sitzung Browser/Runtime, verbleibende Prüfung klar als nicht ausgeführt benennen. Keine simulierten Tests oder erfundenen Screenshots/Deploymentmeldungen.

## 13. GitHub, Veröffentlichung und Übergabepflege

Das öffentliche Zielrepo ist ausschließlich areich135/GPT. Der dokumentierte Veröffentlichungsweg ist GitHub Pages, Branch main, Repository-Stamm. Keine zusätzliche Site oder ein neues Hostingprojekt für diesen bestehenden Dummy erzeugen.

Vor Schreiben Branch-Head und lokalen Zustand prüfen. Nur eigene, zum Auftrag gehörende Dateien ändern. Nutzeränderungen nicht überschreiben. Geprüften erwarteten Head für die Branchaktualisierung verwenden; kein Force-Push.

Direkter Shell-Push kann ohne Anmeldung scheitern. Die verbundene GitHub-Anbindung kann Textänderungen über create_tree mit content, create_commit und update_ref übertragen. Binärbilder gegebenenfalls als passende Blobs. Ein Commit ist noch kein erfolgreiches Pages-Deployment.

Auf ausdrücklichen oder fortgeltenden Veröffentlichungsauftrag veröffentlichen, ohne unnötige Rückfrage. Diese Übergabe allein erteilt keine neue Freigabe für sachfremde Veröffentlichung. Verlangt die automatische Prüfung eine konkrete Zustimmung, die Blockade und den echten Grund knapp erklären; nicht über einen anderen Weg umgehen.

Nach Codeveröffentlichung Deploymentabschluss und relevante öffentliche Dateien prüfen; im Ergebnis den direkten Versionslink nennen. „Im Repo gespeichert“, „Deployment läuft“ und „öffentlich erreichbar“ sauber unterscheiden.

Nicht committen: Zugangsdaten, lokale Vorschaukonfiguration, .openai-Vorschauverzeichnis, preview-dist, temporäre Screenshots, große Dumps oder Chatprotokolle.

Nach einer abgeschlossenen Änderung:
1. Betroffene aktuelle Versions-/Featureangaben in dieser Datei aktualisieren.
2. Bewusst gelassene Unterschiede/fehlende Daten erhalten oder auf ausdrücklichen Auftrag korrigieren.
3. Neue dauerhafte Entscheidung an der passenden Stelle eintragen und überholte ersetzen.
4. Umfangreiche Formeln, Rohdaten und Prüflogs in Fachdokumenten belassen; keine stetig wachsende Gesprächschronik anhängen.
5. Geänderte Runtime-Dateien und tatsächlich ausgeführte Prüfungen im Abschluss knapp nennen.

## 14. Verwendung in einem neuen ChatGPT-Projekt

Diese Markdown-Datei als Projektquelle hinterlegen. GitHub im neuen Chat auswählen/verbinden. Die Datei im Repository ist die laufend gepflegte Fassung; eine hochgeladene Projektkopie bei wesentlichen Änderungen ersetzen.

Empfohlener Startauftrag:

    Arbeite im Repository areich135/GPT.
    Lies zuerst AGENTS.md und docs/PROJECT_HANDOVER.md.
    Prüfe den aktuellen Stand.
    Verwende die aktuelle Repo-Fassung, falls die hochgeladene Übergabe älter ist.

    Meine nächste Aufgabe: …

Zum konkreten Auftrag bei Bedarf Produktbereich, Version, gewünschte Änderung, neue Grafik und „aktuelle Version aktualisieren“ oder „neue Version“ ergänzen. Bereits dokumentierte Designregeln nicht jedes Mal neu abschreiben.

Ist der Repository-Zugriff nicht verfügbar, kann die hochgeladene Übergabe nur die fachliche Grundlage liefern. Ein fehlender Codezugriff darf nicht als erfolgreiche Umsetzung oder Veröffentlichung ausgegeben werden. Ist ein alter Screenshot für die neue Aufgabe entscheidend und nicht verfügbar, genau diese fehlende Vorlage benennen.

Ein neuer Chat muss nicht jede alte Nachricht lesen. Er soll die hier festgehaltenen Entscheidungen anwenden, den tatsächlichen Code überprüfen und nur die für die nächste Aufgabe erforderlichen Detailquellen laden.
