# Rechteckiger Stellflächenrechner für BP / Trays

30.10.2026. Gleiche Modalbedienung wie Rundtöpfe; eigene rechteckige Rechenlogik. Die Variante liefert Länge, Breite und gegebenenfalls Pflanzen je Palette. Die bisherige Inline-BP-Rechenformel ist in das Modal übertragen.

Je einheitlicher Ausrichtung: `floor((Flächenlänge + Abstand) / (Produktlänge + Abstand)) × floor((Flächenbreite + Abstand) / (Produktbreite + Abstand))`. Beide Produktorientierungen werden verglichen. Abstand gilt nur zwischen Produkten, nicht am Rand. Negative/ungültige Maße und ungenau darstellbare Stückzahlen werden abgewiesen. Keine gemischte Packoptimierung, Wege, Überstände oder Stapelung.

Dateien: `rectangular-engine.js` (unabhängig, UMD/Node), `rectangular-component.js` (Custom Element, gemeinsame bestehende Styles), `integration.js` (beide Dialogtypen, Fokus und Öffnungs-CTA). Attribute der neuen Komponente: `item-length`, `item-width`, `plants` (optional), `product-name`, `product-kind` (`Anzuchtpaletten`/`Trays`).

Ausgeführte Prüfungen:
- Fünf Rechtecktests plus sieben bestehende Rundtopftests bestanden: Standard-BP, bessere Rotation, exaktes Passen, zu kleine Flächen, Abstandsgrenzen, fehlerhafte Maße/Pflanzenzahlen, sichere Zahlen und unabhängige Anordnungszählung.
- Browser: BP 50 × 28 cm auf 1 m² → 6 Paletten / 624 Pflanzen. 56 × 50 cm → 2 gedreht / 208 Pflanzen. Einheitenwechsel, Reset und Fehlermeldung bei negativer Produktlänge.
- Modal bleibt bis zum CTA geschlossen. BP bei 1280 × 720: Dialoginhalt 598 px hoch, ohne internes Scrollen. Mobil 390 px: Eingaben/Ergebnisse bedienbar, keine horizontale Überbreite.
- Rundtopf-Regression: VCG 11 weiterhin 85 Töpfe im Dreieckverband auf 1 m².

Eine eigenständige ST-/GP-Produktseite ist noch nicht implementiert. Die Komponente ist für die rechteckigen Trays wiederverwendbar; vorhandene BP-Seite ist direkt angebunden.
