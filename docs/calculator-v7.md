# Stellflächenrechner V7 – Einbindung und Berechnung

Stand: 28.10.2026. Neue Standardversion der VCG-Produktdetailseite. V6 ist unter `versions/v6/` erhalten. BP und frühere Berechnungen in archivierten Versionen werden nicht umgestellt.

## Bedienung

VCG-Variante → Weitere technische Daten → Stellflächenrechner → Stellflächenrechner öffnen.

Der Modal übernimmt Artikelname und Durchmesser aus `PRODUCT_DATA`. Der Durchmesser bleibt im Rechner frei editierbar. Eine Änderung von 11 auf 12 cm ändert ausschließlich die Berechnung, nicht die ausgewählte Variante oder deren Produktdaten. Schließen und erneutes Öffnen lädt die Maße des dann aufgerufenen Artikels. Zurücksetzen stellt dessen Durchmesser, 0 cm Abstand und 1 × 1 m her.

Ergebnisse aktualisieren sich bei gültigen Eingaben direkt. „Berechnen“ validiert nochmals und fokussiert bei Fehlern das betroffene Feld. Ungültige Eingaben blenden alte Flächenergebnisse aus. Komma und Punkt werden als Dezimaltrennzeichen akzeptiert; Tausendertrennzeichen, Exponentialschreibweise und gemischte Trennzeichen werden nicht interpretiert.

## Dateien und Wiederverwendung

| Datei | Aufgabe |
| --- | --- |
| `space-calculator/engine.js` | Reine, DOM-unabhängige Berechnung, Validierung, Einheiten und begrenzte Diagrammkoordinaten. Browser-Global `TEKUSpaceEngine`, in Node per `require` nutzbar. |
| `space-calculator/component.js` | Eigenständiges Custom Element `<teku-space-calculator>`, UI mit Shadow DOM. Keine Abhängigkeit von Produktdaten, Dummy oder Framework. |
| `space-calculator/integration.js` | Adapter für diesen Klickdummy: Produktdatenübergabe, Modal, Fokus/Scrollen, Ersatz der bisherigen Rechner-Vorschau. |
| `space-calculator/modal.css` | Gestaltung des äußeren Modals und des Einstiegs in den technischen Daten. |
| `tests/space-engine.test.cjs` | Node-Tests einschließlich unabhängiger Platzierungsprüfung. |

Minimaler Einbau des Rechners in ein beliebiges CMS-Modul:

```html
<script defer src="/assets/teku/space-calculator/engine.js"></script>
<script defer src="/assets/teku/space-calculator/component.js"></script>
<teku-space-calculator diameter="11" product-name="VCG 11"></teku-space-calculator>
```

Die Beispiel-Assetpfade sind an das tatsächliche CMS anzupassen. Attribute vor dem Einfügen in den DOM setzen. Bei Variantenwechsel ein neues Element mit den aktuellen Produktdaten erzeugen; die Attribute sind Initialwerte. Die Komponente erbt die Schrift. Ihre Farben können über `--navy`, `--green`, `--pink`, `--muted` oder die jeweiligen `--sc-*` Variablen gesetzt werden.

Die Produktdaten müssen später vom CMS/PIM übergeben werden. Für ein Modal kann das vorhandene Dialogsystem der Website genutzt werden. `integration.js` ist der konkrete Adapter dieses Dummys und darf nicht unverändert in ein fremdes CMS kopiert werden: Dort werden seine Abhängigkeiten von `productById`, `TEKUTechnical`, `renderProducts` usw. durch die tatsächlichen Komponenten ersetzt. Berechnung und Rechner-UI können unverändert wiederverwendet werden. Bestehende CMS-CSP-Regeln müssen insbesondere die eingebetteten Component-Styles erlauben oder diese in eine freigegebene Stylesheet-Lösung überführen. Kein Backend, keine Nutzereingabenübertragung und keine neuen Runtime-Bibliotheken erforderlich.

Im Dummy ist zusätzlich die API `TEKUSpaceCalculator.open({diameter: 11, productName: 'VCG 11', trigger: button})` verfügbar. Das Element sendet nach erfolgreicher Berechnung ein `teku-calculation` CustomEvent mit `{input, result}`. `input` verwendet Zentimeter. Aufruf von `focusDiameter()` fokussiert das erste Feld.

## Rechenmodell und Vorlagenabgleich

Grundlage: die gelieferte Datei „Formel Stellflächenrechner_rund.docx“. Diese beschreibt die Anzahl auf 100 × 100 cm sowie auf einer benutzerdefinierten Fläche, die Umrechnung m/ft/in in cm und einen regelmäßigen Viereck- bzw. Dreieckverband.

Mit Durchmesser `d`, Abstand `s` und Topfteilung `p = d+s`:

- Viereckverband: `floor(L/p) * floor(B/p)`.
- Dreieckverband: Reihenabstand `h = p*sqrt(3)/2` und horizontaler Versatz `p/2` in jeder zweiten Reihe. Die erste Reihe benötigt die volle Teilung. Wenn `L<p` oder `B<p`, ist die Anzahl 0. Sonst `rows = floor((B-p)/h)+1`, `n1 = floor(L/p)`, `n2 = max(0, floor((L-p/2)/p))`, Anzahl `ceil(rows/2)*n1 + floor(rows/2)*n2`.
- Beide Ausrichtungen `(L,B)` und `(B,L)` werden für den Dreieckverband ausgewertet; die größere Anzahl wird ausgegeben. Bei Gleichstand werden Reihen entlang der Länge angezeigt.
- Abstände gelten zwischen Topfaußenrändern. Entsprechend der Teilungsrechnung aus der Word-Vorlage wird am Flächenrand ein halber Abstand reserviert. Daher passt bei d=11 cm, s=1 cm ein Topf auf 12 × 12 cm, nicht auf 11 × 11 cm. Diese konservative Randkonvention ist in den Rechenhinweisen im Modal sichtbar.
- `cm = m*100`, `cm = ft*30.48`, `cm = in*2.54`. Beim Einheitenwechsel bleibt das physische Maß erhalten; Eingabewerte werden konvertiert, nicht nur umbeschriftet.

Bewusste Korrekturen gegenüber einer wörtlichen Übernahme der Word-Formel:

1. Deren Doppelreihenrechnung kann eine letzte Reihe außerhalb der Fläche zählen. Beispiel d=11 cm, L=11 cm, B=11*sqrt(3) cm: Die wörtliche Formel zählt 2, obwohl zwei volle Durchmesser im Dreieckraster nicht hineinpassen. V7 zählt 1.
2. Der strikte `>`-Vergleich kann exakt passende Einzelreihen übersehen. Auf 100 × 100 cm bei d=100 cm gibt V7 für beide Verbände 1 aus; die Word-Dreiecksformel würde 0 liefern.
3. Negative Anzahlen bei zu kleinen Flächen werden durch geometrische Vorprüfung vermieden. Der horizontale Restvergleich verwendet die halbe effektive Teilung einschließlich Abstand.
4. `sqrt(3)` ersetzt die gerundete Konstante `1.73205`. Eine Toleranz von 16 Maschinen-Epsilon beim Abrunden fängt reine Gleitkommaartefakte an exakten Grenzen ab.

Übliche Vergleichswerte bei 0 cm Abstand und 1 × 1 m bleiben erhalten: d=11 cm → 81/85; d=12 cm → 64/68 (Viereck/Dreieck).

Die ebenfalls gelieferte „Stellflaechenrechner-Deutsch (1).xls“ enthält ein VBA-Makro. Blatttext und VBA-Quelltext wurden gelesen und statisch verglichen; Makros wurden nicht ausgeführt. Das Makro verteilt Töpfe teilweise über die Reihenbreite und untersucht weitere gleich/ungleich besetzte, reduzierte und symmetrische Anordnungen. Es ist damit kein identischer Algorithmus zur Word-Vorlage. V7 ist keine vollständige Portierung dieses Excel-Optimierers und verspricht keine globale Kreispackungsoptimierung. Die Darstellung macht den verwendeten regelmäßigen Verband und die Reihenanzahl transparent.

Das gelieferte `image(3).png` dient als Funktionsreferenz für Abstand, Maßeinheiten und beide Ergebnisgruppen. Die gezeigten 0/−1-Ergebnisse werden nicht übernommen.

## Designquellen

Bestehender Repository-Stand `6cd08f4` vom 27.10.2026, geprüft am 28.10.2026: Produktseite, lokale Originalbilder, Logo, Aeonik-Fonts und Designwerte wurden übernommen. Aus `styles.css` im Code belegt: Navy `#123361`, Grün `#4eae94`, Pink `#df359b`, Muted `#627797`; vorhandene Modalradien und Buttonformen. Rechnerlayouts und technische Diagramme sind neu, unter Verwendung dieser bestehenden Werte. Produktfakten werden nicht neu erfunden.

Offizielle VCG-Referenz am 28.10.2026 per Websuche abgeglichen: https://www.poeppelmann.com/de/teku/produkte/vcg. Keine neue Live-CSS-Analyse; verbindliche visuelle Basis dieser Änderung ist der vorhandene V6-Klickdummy. Keine zusätzlichen externen Fonts, Bilder, Tracker oder Skripte. Vorhandene externe Produkt-/Downloadlinks verbleiben auf der Originalwebsite.

## Grenzen und Prüfungen

Eingabegrenzen: Durchmesser 0,1–200 cm, Abstand 0–200 cm, Flächenachsen 0,01–1.000.000 cm. Analytische Berechnung ohne Schleife über sämtliche Töpfe. Diagramme zeigen höchstens 24 Spalten und 16 Reihen; ein begrenzter Ausschnitt wird ausdrücklich als solcher beschriftet. Die Gesamtzahl wird unabhängig davon vollständig berechnet.

Ausgeführt:

- `node --test tests/space-engine.test.cjs`: 7 erfolgreiche Tests. Enthält 300 deterministische Geometriefälle mit unabhängiger Koordinatenzählung, Rand-/Abstandsprüfung, Orientierungsvergleich und paarweiser Kollisionsprüfung der Diagrammkreise, Dezimal-/Einheitenfälle, exakte Grenzen, ungültige Eingaben und sehr große Flächen.
- JavaScript-Syntaxprüfung und `git diff --check`.
- Chromium-Rendering in gleichursprünglichen QA-Frames mit 390, 768 und 1440 CSS-Pixeln Breite; sichtbare Modalansichten geprüft, kein horizontaler Überlauf in Seite oder Modal nach Korrektur. Zusätzliche Hauptfenster-Prüfung bei 1363 × 936.
- Browserbedienung: 11→12 cm (64/68), 2 × 1 m (128/144 bei 12 cm), m→cm (200/100), 2,54 cm→1 Zoll, Dezimalkomma, leeres Pflichtfeld, alte Ergebnisse ausblenden, Zurücksetzen, Layoutwechsel/Diagramm, Escape/Schließen, Rückkehr des Fokus zum Auslöser, Wiederöffnen und Vorbelegung einer anderen Variante (VCG 12), Tab-Umlauf im Modal und Versionswechsel auf archivierte V6.

Keine manuelle Prüfung mit Screenreader, Safari/iOS oder im eigentlichen Pöppelmann-CMS. Vor Live-Übernahme sind dort Datenübergabe, Dialogeinbindung und Browser/CSP-Vorgaben zu prüfen. Die Formelkorrekturen und die Abweichung vom Excel-Optimierer sollten fachlich mit dem Formelverantwortlichen abgeglichen werden.


## Kompaktes Layout – Überarbeitung vom 28.10.2026

Eingaben und Ergebnisse stehen auf Desktop nebeneinander. Länge und Breite verwenden bis zu 150 px breite Felder. Schriftgrößen der Eingaben bleiben 16 px; der Platzgewinn entsteht überwiegend durch die Anordnung, kürzere Felder und reduzierte Abstände. Beide Ergebnisverbände und die grafische Anordnung bleiben gleichzeitig sichtbar.

„Wie wird gerechnet?“ öffnet eine eigene Ansicht innerhalb desselben Modals. „Zurück zum Rechner“ erhält die eingegebenen Werte. Auf Displays bis 760 px Breite wechseln „Eingaben“ und „Ergebnisse“ innerhalb des Modals; gültiges Berechnen öffnet dort die Ergebnisse. Fehlermeldungen bleiben bei den Eingaben sichtbar. Alle bisherigen Rechnerfunktionen und die Rechenlogik sind erhalten.

Gemessen in Chromium mit CSS-Viewport-Prüfrahmen: 1280 × 600 px → Modalhöhe und Inhaltshöhe jeweils 559 px; 1280 × 720 px → jeweils 587 px. Kein vertikaler oder horizontaler Überlauf des Modals. Auch die Rechenhinweise passen in die 600-px-Ansicht. Bei 390 × 844 px passen Eingaben (692 px), Ergebnisse (699 px), die Fehlermeldungsansicht (745 px) und Rechenhinweise (471 px) jeweils ohne Scrollen. Native Betriebssystemleisten, Bildschirmtastatur und andere Browser-/Zoomkombinationen wurden damit nicht simuliert.

Erneut geprüft: Durchmesserwechsel 11→12 cm, Ergebnisse 64/68, Diagrammwechsel, Einheitenwechsel, Zurücksetzen, Eingabeprüfung, Wechsel zu Rechenhinweisen und zurück mit Werterhalt sowie mobile Eingabe-/Ergebnisumschaltung.
