# TEKU Website – verbindliche Übergabe für die Clickdummys

**Dokumentrevision:** 2 · **Stand:** 30.10.2026  
**Fachlich geprüfte Codebasis:** a503521ee3f13292b05c91ee3667e0d587c467f5  
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
| Rundtöpfe, Serie VCG | V8 | Repository-Stamm | https://areich135.github.io/GPT/?version=v8 |
| Anzuchtpaletten, Serie BP | V4 | bp/ | https://areich135.github.io/GPT/bp/?version=v4 |
| Eigenständige ST-/GP-Tray-Seite | Noch nicht umgesetzt | Keine eigene aktuelle Produktseite | Nicht als fertig behaupten |

Die Kategorie im Umschalter heißt „Trays / Anzuchtpaletten“. Ihr aktuell umgesetztes Produktbeispiel ist BP. Die Nutzerbegriffe Tray und Anzuchtpalette wurden im Gespräch teilweise vermischt: Für die aktuelle BP-Seite ausdrücklich „Anzuchtpalette“ verwenden. ST-/GP-Trays sind ein späterer eigener Auftrag.

Frühere Rundtopf-Stände V1–V7 liegen unter versions/v1/ bis versions/v7/. Frühere BP-Stände V1–V3 liegen unter bp/versions/. Die aktuellen Stände liegen gerade nicht unter versions/v8/ oder bp/versions/v4/. Die Zuordnung steuert version-switch.js.

**Versionsregeln:**

- „V8 aktualisieren“, „nur das anpassen“: die genannte aktuelle Version ändern; keine zusätzliche Version erfinden.
- „Neue Version erstellen“: den bisherigen aktuellen Stand zuerst funktionsfähig sichern, danach neue Zuordnung und Auswahl ergänzen.
- Der nächste freie Versionsname muss aus dem tatsächlichen Umschalter abgeleitet werden, nicht aus dieser Übergabe geraten werden.
- Frühere Stände einschließlich ihrer eigenen Assets und Skripte nicht nachträglich mit neuen Produktfunktionen überschreiben.
- Der gemeinsame Versionsumschalter wirkt auch auf Archivseiten. Änderungen dort erfordern einen gezielten Routingcheck.
- Eine Änderung an VCG gilt nicht automatisch für BP. Gemeinsame Gestaltung bedeutet keine Erlaubnis, alle bewussten Unterschiede ohne Auftrag zu beseitigen.

## 3. Unbedingt erhalten: Entscheidungen und bewusste Unterschiede

| Thema | Rundtöpfe V8 | Anzuchtpaletten BP V4 |
|---|---|---|
| Erste Werte in der Artikelzeile | Durchmesser, Höhe, Volumen | Länge, Breite, Höhe der Anzuchtpalette mit Maßskizze |
| Erster Aufklappbereich | „Weitere technische Daten“ | „Weitere technische Daten“ |
| Farbausführungen | „Varianten“ | Aktuell weiterhin „Details“ |
| Dritter Bereich | „Passende Trays“ | „Aushebeplatte“; ohne Zuordnung deaktiviert |
| Öffnen/Schließen | SVG-Pfeil ohne sichtbares „einblenden“ | Bisherige Ein-/Ausblendtexte erhalten |
| Weißer Zeiger unter aktivem Bereich | Umgesetzt; folgt dessen Buttonmitte | Nicht allein wegen VCG automatisch nachrüsten |
| Anfrage-CTA | Muster primär magenta/weiß, Angebot Kontur | Bisher beide Konturbuttons; kein ausdrücklicher Auftrag zur Angleichung erfolgt |
| Kompakte rechte Listenleiste bei offenem Filter | Umgesetzt | Umgesetzt |
| Rechner | Kreisgeometrie | Rechteckgeometrie, inkl. Pflanzenzahl |
| Passende Produkte | Äußere Pfeile + Positionsbalken | Gleiche Navigation für mehrere Aushebeplatten vorbereitet; derzeit höchstens eine je Artikel |

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
- Die erste Artikelzeile beginnt oben auf derselben Ebene wie Filter und rechte Kacheln.

Bei geöffnetem Filter nimmt der breite Filter links mehr Platz ein. Die volle rechte Kachelspalte verschwindet; die Varianten dürfen den freigegebenen Platz nutzen. Das starre Übertragen einzelner Desktop-Pixelwerte auf alle Breiten vermeiden.

catalog-xd.css regelt unter anderem Breakpoints bei 1350, 1100 und 700 px. Bei schmaleren Breiten können die vollständigen Listen unter die Produktansicht rücken. Das ist bestehendes responsives Verhalten und kein Grund, eine volle Desktop-Seitenleiste auf Mobilgeräten zu erzwingen.

### 4.3 Anfrage-Buttons und Herzen

„Muster anfordern“ und „Angebot anfordern“ stehen auf Desktop rechts untereinander, auch bei geöffnetem Filter. Beschriftungen fett. Das Artikelherz sitzt oben rechts im weißen Artikelkasten und darf die CTAs nicht überdecken.

Bei sehr schmalen Karten erlauben bestehende Containerregeln andere Zeilenumbrüche. Priorität: alle Buttons lesbar, bedienbar und vollständig sichtbar; keine starre Desktop-Anordnung auf Kosten von Überlagerungen erzwingen.

Nur VCG: Musterbutton Magenta mit weißer Schrift. Hover derzeit Hintergrund #fff4fb und magentafarbener Text. Angebot bleibt Konturbutton. Bereits zur Liste hinzugefügte Artikel behalten ihren sichtbaren Status.

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

Die schmale Leiste zeigt Angebote, Muster, Merkliste, Kontakt und vorhandene Artikelzähler. Sie ist ein Zugang zu denselben Kacheln. Desktop rechts am Rand, mobil unten rechts; Bedienelemente darunter nicht verdecken.

Die Listen gelten für die laufende Seite/Sitzung. Dauerhafte Speicherung nach Reload, Synchronisierung zwischen Produktbereichen und ein echter Kundenwarenkorb sind nicht zugesagt. „Merkliste speichern“ bietet den bestehenden Export; daraus kein Backend ableiten.

## 6. Rundtöpfe V8: genaue fachliche Vorgaben

### 6.1 Daten und Artikelzeile

data.js enthält 14 VCG-Artikel. Hauptwerte diameter und height sind cm, volume ist Liter. Die Rohdaten nicht auf die gerundeten Beispielzahlen einer XD-Grafik reduzieren.

latest.js erzeugt die aktuelle Grundstruktur der Zeile und technische Inhalte. v8.js ergänzt Variantenkacheln, Zeiger, neue Navigation und Listenleiste. Eine Änderung nur im ursprünglichen renderRow in app.js kann durch spätere Überschreibungen unsichtbar bleiben.

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

### 6.3 Weitere technische Daten

Unterbereiche: Maße, Verpackungsdaten, Stellflächenrechner.

Produktbild und runde Detailansichten: Rand-/Bodenkreise sollen deutlich über das Produktbild ragen. Nummerierte Hinweise „1 Kronenrand“ und „2 Multilochprofilboden IV“ erhalten. Das Bodenfoto sitzt im Kreis so tief, dass unten kein störender weißer Saum bleibt. Beide Details sind vergrößerbar.

Referenz-Detailbilder sind Circular ton/grau. Die vorhandene Kennzeichnung beibehalten, selbst wenn das Hauptfoto eine andere Farbe zeigt. Fehlende artikelbezogene Detailfotos oder Patentangaben nicht nachzeichnen/erfinden.

Vorhandene Fußnoten wie D/K stehen im geschlossenen Artikelbereich unter der Zeile; keine neuen Patentbehauptungen ergänzen. Verpackungszahlen bleiben verständlich als Text mit Einheiten/Bezeichnungen dargestellt.

### 6.4 Passende Trays

Nur p.trays des ausgewählten Artikels verwenden. Die Kacheln öffnen die bisherige zugehörige Produktansicht. Keine neue Kompatibilität behaupten.

Die zuletzt freigegebene Navigation hat ausdrücklich keine Punkte: Pfeil ganz links, Pfeil ganz rechts, dazwischen ein dünner Positionsbalken wie in der Hauptgalerie. Sein Griff wandert mit und bildet die sichtbare Teilbreite ab. Pfeile, Schieber, horizontales Wischen und Pfeiltasten müssen zusammenpassen. An Anfang/Ende die entsprechenden Pfeile deaktivieren. Ein passendes Produkt benötigt keine künstliche Navigation.

## 7. Anzuchtpaletten BP V4: Fachbegriffe und Datenzuordnung

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

Weitere technische Daten → Reiter „Stellflächenrechner“ → CTA „Stellflächenrechner öffnen“ → Modal.

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

### 8.3 Anzuchtpaletten und spätere rechteckige Trays

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

Die wiederverwendbare Komponente unterstützt product-kind „Trays“ und kann ohne Pflanzenzahl betrieben werden. Das bedeutet nicht, dass eine eigenständige ST-/GP-Seite bereits existiert. Bei deren späterem Aufbau Maße und Zuordnungen erst artikelbezogen beschaffen.

### 8.4 Komponentenabhängigkeiten

Rechteckkomponente benötigt die gemeinsamen Hilfen aus engine.js und die Styles aus component.js. Danach rectangular-engine.js und rectangular-component.js laden; integration.js zuletzt. component.js exportiert die Styles über TEKUSpaceCalculatorStyles.

Berechnungslogik bleibt getrennt vom DOM/Seitenadapter. Ein Fix am Rundtopfrechner darf die Rechteckrechnung nicht ersetzen oder umgekehrt. Gemeinsame Modal-/Styleänderungen an beiden Bereichen prüfen.

## 9. Quellen, Bilder und fachliche Grenzen

| Quelle | Verwendung |
|---|---|
| https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5- | Ursprüngliche VCG-Daten und Varianten-/Zertifikatsbezug |
| https://www.poeppelmann.com/de/teku/produkte/bp-jungpflanzen-und-baumschulpaletten | BP-Artikel, technische Werte, Bodenbilder und Aushebeplatten |
| https://container-centralen.com/cc-container/ | Einordnung des CC-Containers; konkrete BP-Kapazitäten stammen aus Produktdaten |
| docs/sources-2026-10-22.md | Frühere Quellenprüfung, BP-Quellfelder und Abhängigkeiten |
| docs/round-pots-v8.md | Entscheidungen und Korrekturen zu V8/BP |
| docs/calculator-v7.md | Rundtopfformeln, Herkunft und Integrationshinweise |
| docs/calculator-rectangular.md | Rechteckformel, Schnittstelle und ausgeführte Prüfungen |

Diese Links sind Quellenanker, keine Behauptung eines erneuten Abrufs bei jedem Auftrag. Für neue oder zeitabhängige Produktfakten aktuelle Quellen prüfen und Datum nennen. Die Zahl 14/20 beschreibt den Dummy-Datenbestand, nicht die garantierte aktuelle Größe des Produktivsortiments.

Vorlagen aus früheren Chats sind nicht automatisch im neuen Chat verfügbar. Dateinamen in älteren Dokumenten ersetzen keine tatsächliche Bilddatei. Für pixelgenaue neue Änderungen die relevante Grafik verfügbar machen; ansonsten eine Abweichung kenntlich machen. Keine nicht vorhandene XD-Datei oder ein Pöppelmann-Backend behaupten.

## 10. Fehlende Funktionen und noch offene Arbeit

- Eigenständige ST-/GP-Tray-Seite: zukünftiger Auftrag, aktuelle BP-Seite nicht bloß umbenennen.
- Zusätzliche Produkt-Rand-/Bodendetailfotos, Patenttexte oder andere Farbabbildungen: nur mit Vorlage/Originalquelle ergänzen.
- Ob BP künftig dieselben Primärbuttons, Begriffe und reinen SVG-Aufklapppfeile wie VCG erhalten soll, ist ohne neuen Auftrag offen.
- Ein echtes Anfrage-Backend, Anmeldung, Preise, Verfügbarkeit, CRM-Anbindung oder dauerhaft gespeicherter Warenkorb gehören nicht zum derzeitigen Dummy.
- Eine allgemeine CC-Wagenplanung über mehrere Ebenen wird nicht berechnet.
- Produktnavigation mit mehreren BP-Aushebeplatten ist in der Komponente vorhanden, aber im aktuellen Datenbestand nicht real belegbar.
- Ob ein bestimmtes spätes Detail bereits „fertig“ ist, immer im aktuellen Code und gegebenenfalls in der gerenderten Ansicht nachprüfen.

## 11. Dateikarte und technische Stolperstellen

| Änderung | Zuerst ansehen | Mitbetroffene Bereiche |
|---|---|---|
| Bereiche/Versionsauswahl | version-switch.js; beide index.html | Aktuell + Archive |
| VCG-Daten/Filter/Grundfunktionen | data.js, app.js | Aktuelle Ergänzungen können Renderer ersetzen |
| Aktuelle VCG-Zeile/Technik | latest.js, technical.js, technical.css, v4.css | v8.js und späte CSS-Regeln |
| VCG-Kacheln/Zeiger/Positionsbalken | v8.js, v8.css, certificates.js | Auswahl und Listen in v3.js |
| BP-Maße/Filter/Zeilen/Daten | bp/app.js, bp/data.js, bp/styles.css, bp/v2.css | bp/review-update.* |
| BP-CC-Hilfe/Listenleiste/Produktnavigation | bp/review-update.js, bp/review-update.css | Shared Listen und setCollapsed |
| Gemeinsame Listen | v3.js, v3.css | VCG und BP samt Cachebuster |
| Fluchten/automatisches Einklappen | catalog-xd.js, catalog-xd.css | Beide aktuellen Bereiche |
| Ältere Produktnavigation | review.js, review.css | Kann für nicht ersetzte Bereiche weiterhin wirksam sein |
| Technische Reiter | technical.js | Beide Bereiche; Rechner wird später dekoriert |
| Kreisrechnung | space-calculator/engine.js, component.js | Geteilte Styles für Rechtecke beachten |
| Rechteckrechnung | space-calculator/rectangular-engine.js, rectangular-component.js | BP und spätere Tray-Seite |
| Modal/CTA/Seitenadapter | space-calculator/integration.js, modal.css | Beide Geometrien und beide index.html |
| Archivierung | versions/ bzw. bp/versions/ | Relative Pfade und Umschalter |
| Prüfnachweise | tests/ und die Fachdokumente | Historische Prüfungen nicht als neue ausgeben |

**Ladereihenfolge ist Teil der Funktion.** Das Projekt verwendet globale Funktionen, die spätere Skripte dekorieren/überschreiben. renderProducts, renderRow, renderDetail und die Collapse-Setter nicht isoliert neu definieren, ohne vorhandene Wrapper zu berücksichtigen.

VCG grob: app.js → v3.js → technical.js → latest.js → v4.js → catalog-xd.js → review.js → Rechneradapter → certificates.js/v8.js. BP grob: technical.js → bp/app.js → gemeinsames v3.js → catalog-xd.js → review.js → bp/review-update.js → Rechnerkomponenten/Adapter. Bei Änderungen die tatsächlichen script-Tags prüfen; diese Kurzfolge ist kein Ersatz für index.html.

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

Nicht für jede Textkorrektur die gesamte Anwendung erneut prüfen. Betroffene Funktion plus unmittelbar verbundene Abläufe verifizieren. Änderungen an gemeinsamen Dateien oder Rechenlogik erfordern eine gezielte Prüfung beider Produktbereiche.

| Auftrag | Mindestprüfung |
|---|---|
| Text/Label | Richtige Stelle und Einheit; keine unbeabsichtigten Treffer in Artikelname/Rohdaten; keine Überlagerung |
| Filter | Auswahl setzen/entfernen/resetten; korrekte Trefferzahl und grüner Punkt; beide Filterzustände |
| Listen | Konkrete Farbe hinzufügen/entfernen; Duplikate; Wechsel der Listen; Inhalt nach Filtereinklappen |
| Aufklappbereich | Öffnen/Schließen/Wechsel; automatisches Einklappen; bestehende Inhalte; VCG-Zeiger |
| Carousel | Äußere Pfeile; keine Punkte; Balken bei Pfeil/Wischen/Schieber synchron; Anfang/Ende |
| Technische Bilder | Richtiger Artikel; Ausschnitt/Überlappung; Caption; Zoom; keine unbelegte Umfärbung |
| Rechner | CTA-Pflicht; richtige Vorbelegung; Kontrollwerte; Ausrichtungswechsel; Einheiten; Reset; Fehler; Schließen/Escape/Fokus |
| Versionierung | Altes und neues Routing; beide Kategorien; relative Bilder, Fonts und Skripte |
| Geteiltes CSS/JS | VCG und BP; Desktop und mindestens eine schmale Ansicht |

Geeignete Breiten für Layoutänderungen: 390, 768, 1440 px, jeweils relevante Filter-/Panelzustände. Rechner zusätzlich 1280 × 720. Nicht nur die Seitenbreite messen: überlappende Labels, abgeschnittene CTAs, unsichtbare Siegel und verdeckte Elemente können auch ohne horizontales Seitenscrollen auftreten.

Passende lokale Checks:

    node --check PFAD_ZUR_GEAENDERTEN_JS_DATEI
    git diff --check
    node --test tests/space-engine.test.cjs tests/rectangular-engine.test.cjs

Bei neuen Rechenänderungen unabhängig begründete Testfälle ergänzen, keine Tests schreiben, die bloß dieselbe Implementierung kopieren. Reine Dokumentationsänderungen benötigen keine erneuten Rechen- oder Browserprüfungen.

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
