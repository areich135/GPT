# Rundtöpfe V8 · 30. Oktober 2026

## Quellen und Gestaltung

- Vom Nutzer bereitgestellte XD-Screenshots: Variantenkacheln mit Umweltzeichen, Muster-Primärbutton, Punkte und Pfeile bei passenden Trays, Zeiger unter dem aktiven Bereich, schmale Andeutung der ausgeblendeten Listen. Gestaltung visuell abgeleitet.
- Bestehender V7-Code: Aeonik, Farben, Karten, Filter, technische Daten und funktionsfähiger Stellflächenrechner. Aus Code übernommen.
- https://www.poeppelmann.com/de/teku/produkte/vcg-rundtoepfe-und-container-5- · öffentliches HTML am 30.10.2026 abgerufen. Die Zertifikatszuordnung wurde aus den einzelnen Variantenblöcken übernommen (14 Artikel, 92 Farbvarianten), nicht aus der Kategorie abgeleitet.
- Originalgrafiken: https://static.teku.com/assets/501424/logo-blauer-engel-de.png und https://static.teku.com/assets/501422/logo-cyclos-htp-de.png. Unverändert lokal eingebunden. Die Quelle liefert WebP-Inhalte unter PNG-Dateinamen.

## Umsetzung

V7 ist als eigener Stand unter `versions/v7` gesichert. V8 verwendet den Stammordner. BP ist unverändert. „Details“ heißt nun „Varianten“. Karten enthalten Original-Farbfoto, Kategorie, Farbname, Merkliste je Farbvariante und die tatsächlich zugeordneten Zertifikatsgrafiken. Die Reihenfolge beginnt mit ton/grau, taupe/grau und weiß/grau, danach folgen weitere Farben und Baseline.

„Muster anfordern“ verwendet Magenta mit weißer Schrift; Hover übernimmt den bestehenden hellen Hintergrund. Das Angebot bleibt als Konturbutton. Auf-/Zuklappen erfolgt über beschriftete Buttons mit SVG-Pfeil ohne den zusätzlichen sichtbaren Text „einblenden“. `aria-expanded` und zugängliche Namen bleiben erhalten. Der weiße Zeiger folgt der Mitte des geöffneten Buttons, auch nach einer Größenänderung.

Passende Trays haben eine horizontale Produktansicht, darunter klickbare Seitenpunkte mit Pfeilen links und rechts. Die Punkteanzahl passt sich der verfügbaren Breite an; Pfeiltasten und Wischen funktionieren. Der Scrollbalken ist ausgeblendet.

Beim Öffnen des Filters werden die vier Listen durch eine schmale Leiste für Angebote, Muster, Merkliste und Kontakt mit Artikelzählern angedeutet. Ein Klick klappt den Filter ein und fokussiert die betreffende Kachel. Auf kleinen Bildschirmen steht die Leiste unten rechts.

## Tatsächlich durchgeführte Prüfungen

- Browser bei 390, 768 und 1440 Pixeln innerhalb entsprechender Vorschau-Frames, mit offenem und geschlossenem Filter: keine horizontale Seitenüberbreite; Variantenkacheln passen in die Spalte.
- Variantenherz übernimmt die konkrete Farbe in die Merkliste. Listenleiste versteckt/zeigt die bisherigen Kacheln; Listeninhalt bleibt erhalten. Automatisches Filtereinklappen beim Öffnen eines Bereichs geprüft.
- Tray-Pfeile und direkte Seitenauswahl; weißer Zeiger numerisch mit der Mitte des geöffneten Tray-Buttons abgeglichen.
- Stellflächenrechner bleibt zunächst geschlossen, öffnet durch CTA und lässt sich schließen. Sieben vorhandene Rechenprüfungen bestanden.
- JavaScript-Syntax und Git-Diff geprüft. Keine Pixelgleichheit oder Performance-Messung behauptet.

Anfragen bleiben Clickdummy-Funktionen ohne Versand. Produktlinks und der Link zum Blauen Engel führen auf externe Seiten; Bilder, Schriften und Code werden lokal geladen.
