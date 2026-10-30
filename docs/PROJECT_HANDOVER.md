# TEKU Clickdummys – Übergabe

Stand: 30.10.2026. Diese Datei beschreibt den aktuellen Arbeitsstand, nicht die gesamte Gesprächshistorie. Bei Konflikten haben neue Nutzeraufträge und der aktuelle Repository-Code Vorrang. Nach Änderungen knapp aktualisieren.

## Einstieg und Ziel

Repository: https://github.com/areich135/GPT · Branch `main` · GitHub Pages aus dem Repository-Stamm.

- Rundtöpfe VCG, aktuell **V8**: https://areich135.github.io/GPT/?version=v8
- Anzuchtpaletten BP, aktuell **V4**: https://areich135.github.io/GPT/bp/?version=v4
- Frühere Rundtopf-Versionen V1–V7 unter `versions/`, frühere BP-Versionen V1–V3 unter `bp/versions/`. Archivstände bei kleinen aktuellen Korrekturen nicht verändern.
- „Trays / Anzuchtpaletten“ ist die gemeinsame Kategorie im Umschalter. Darunter ist bisher BP umgesetzt. Eine eigenständige ST-/GP-Tray-Produktseite ist noch nicht erstellt. Der Rechteckrechner kann auch für solche Trays wiederverwendet werden.

Zweck: schnelle, klickbare B2B-Produktseiten für TEKU zur Abstimmung des Designs. Die aktuellen Seiten sind statische HTML/CSS/JS ohne Build-System und ohne Anfrage-Backend. Angebots-/Musterformulare simulieren den Ablauf; nichts wird versendet. Listen sind Sitzungslisten. Kein Framework-Umbau für kleine Korrekturen.

## Arbeitsweise

1. Aktuelle Nutzeranforderung, betroffenen Bereich und Version feststellen. Bei ausreichenden Angaben direkt umsetzen; keine unnötigen Rückfragen. Kleine Korrekturen in der vom Nutzer genannten aktuellen Version; neue Versionen nur bei entsprechender Aufgabenstellung und mit gesichertem Vorgänger.
2. Remote-Stand prüfen und vorhandene Komponenten/Assets nutzen. Nur passende Dateien lesen, nicht den gesamten Chat oder alle Altversionen.
3. Vorlagen/Screenshots des aktuellen Auftrags beachten; bei fehlender Vorlage nicht so tun, als sei sie verfügbar. Der TEKU Website Builder ist der fachliche Designworkflow. Fehlende Produktfakten weder ergänzen noch von anderen Artikeln übertragen.
4. Eng begrenzt ändern. Mit sinnvollen Klick-/Layoutprüfungen verifizieren. Syntax und Diff prüfen; Rechentests bei Änderungen an Rechnern. Keine umfangreichen Zusatztests für reine Beschriftungen.
5. Auf Nutzerauftrag veröffentlichen, Deployment und öffentliche Dateien prüfen. Keine Erfolgsmeldung ohne Nachweis. Bei ausdrücklich gewünschtem Upload nicht erneut nach Zustimmung fragen, außer die automatische Freigabeprüfung verlangt sie tatsächlich.
6. Übergabe aktuell halten. Nutzern kurz Ergebnis, Link und wesentliche Einschränkung nennen.

## Feste Gestaltung und Verhalten

Bestehende Aeonik-Schriften, TEKU-Farben, Verlauf, Karten und Icons verwenden. Keine beliebigen Emojis oder undefinierbaren Zeichen. Maßwerte nicht aus XD-Platzhalterzahlen übernehmen. SVG-Pfeile statt problematischer Schriftzeichen.

- Eingeklappter Filter ist eine schmale Iconleiste mit grünen Punkten für aktive Gruppen. Auswahl wird direkt im Filter angezeigt, keine entfernbaren Chips über den BP-Artikeln.
- „Filter zurücksetzen“ oben rechts im geöffneten Filter, dünn und magenta.
- Bei geöffnetem Filter verschwinden die vier rechten Kacheln. Eine schmale, fixe Leiste deutet Angebote, Muster, Merkliste und Kontakt an; Klick klappt Filter ein und zeigt die betreffende Kachel. Listeninhalte bleiben erhalten. Auf Mobilgeräten unten rechts.
- Öffnen eines Artikelbereichs klappt den Filter ein. Hero, Filter und Produktspalte folgen den vorhandenen XD-Fluchten.
- Muster-/Angebotsbuttons rechts, fett und übereinander, bei beiden Filterzuständen; auf kleinen Breiten nicht abschneiden. Rundtöpfe: Muster ist Primärbutton, magenta mit weißer Schrift; Angebot Kontur. BP-CTA-Gestaltung bisher nicht auf Primärbutton umgestellt.
- Artikelherz oben rechts. Rundtopf-Farbvarianten haben eigene Herzen, die genau diese Farbe in die Merkliste übernehmen.
- Rundtöpfe: „Weitere technische Daten“, „Varianten“ statt „Details“, „Passende Trays“. Nur SVG-Pfeile, kein zusätzlicher sichtbarer Text „einblenden“. Weißer Zeiger unter der Mitte des jeweils geöffneten Bereichs.
- BP: Bereich „Aushebeplatte“ beibehalten; nicht in „Passende Trays“ umbenennen. BP hat aktuell noch „Details“ und die bisherigen Ein-/Ausblendtexte; dies wurde nicht automatisch an VCG angeglichen.
- Passende Produkte: keine Punkte. Pfeile ganz links/rechts; dazwischen ein dünner, mitwandernder Positionsbalken wie in der Hauptbildgalerie. Wischen, Pfeile und Schieber bedienbar. Ein Produkt braucht keine Navigation.

## Rundtöpfe V8

Variantenkacheln: Farbfoto, Kategorie, Farbname, Herz und Original-Zertifikatslogos. Reihenfolge beginnt ton/grau, taupe/grau, weiß/grau, weitere Circular360-Farben, Baseline. Karten kompakt (Desktop ungefähr 150 px).

Die Originalquelle ordnet Blauer Engel und cyclos-HTP pro konkreter Farbvariante zu (`certificates.js`), nicht pauschal pro Kategorie. Die zusätzliche sichtbare Zeile „100 % recyclingfähig“ ist entfernt; die Angabe ist schon Teil des cyclos-Logos. Blaues Logo enthält seine URL. Logos unverändert lokal gespeichert; Dateien enden auf .png, der Quellserver liefert tatsächlich WebP.

Technische Ansicht: Produktbild mit überlappenden runden Rand-/Bodendetails; nummerierte Hinweise „Kronenrand“ und „Multilochprofilboden IV“. Bodenbild bis zum unteren Kreisrand. Detailfotos sind Originale in ton/grau und nicht künstlich umgefärbt.

## BP V4

20 Originalartikel, Daten in `bp/data.js`. Fehlende Werte bleiben „Keine Angabe“, nicht schätzen.

- Maße: Länge/Breite/Höhe Anzuchtpalette in cm. In der schmalen Variantenzeile gemeinsamer Hinweis „Anzuchtpalette · cm“ über Länge/Breite/Höhe, damit lange Texte nicht überlappen.
- „Plug-Breite“ und „Plug-Höhe“ ohne D/E in Feldbezeichnungen. Interne Datenkeys `plugD`/`plugE` bleiben unverändert; Skizzen können technische Buchstaben enthalten.
- „Zellmaß A“ und „Zellmaß B“ bewusst beibehalten. Runde/quadratische Maße verständlich beschriften. Plug- und Zellmaße nicht verwechseln.
- Pflanzen pro m² bleibt. Trays pro CC-Lage und Pflanzen pro CC-Lage haben Info-Schaltflächen in der Tabelle und an den Filterfeldern. CC-Wagen = gartenbaulicher Transportwagen; CC-Lage = eine Ablageebene. Keine neuen Kapazitätsangaben erfinden.
- Filterpriorität: Plug, Zellvolumen, Pflanzen pro Tray, Außenmaße, Anzuchtzelle, Pflanzen/m², Nachhaltigkeit, CC. Klickbare Werte und „weitere Größen laden“ im bestehenden Stil.
- Bodenansichten und tatsächliche Aushebeplatten-Zuordnungen bleiben. Aktuell maximal eine zugeordnete Aushebeplatte pro BP-Artikel; die Navigation für mehrere Produkte ist vorbereitet, aber keine zusätzlichen Produkte erfinden.

## Stellflächenrechner

In technischen Daten Reiter „Stellflächenrechner“ → CTA „Stellflächenrechner öffnen“ → Modal. Niemals automatisch beim Laden öffnen. Die Dialoge haben Schließen, Escape, Fokusführung und Hintergrund-Scrollsperre. Kompakte Desktopdarstellung; BP-Dialog bei 1280 × 720 ohne inneres Scrollen geprüft. Mobil Eingaben/Ergebnisse umschaltbar.

- Rundtopf: Durchmesser + Abstand, Viereck-/Dreieckverband, beide Dreieck-Ausrichtungen. Formeln/Abweichungen in `docs/calculator-v7.md`; nicht durch Rechteckformel ersetzen.
- BP/Trays: rechteckige Grundfläche Länge × Breite, Abstand nur zwischen benachbarten Paletten, beide einheitlichen Ausrichtungen vergleichen; bessere vorauswählen. Keine gemischte Packoptimierung oder gestapelten Ebenen. Stückzahl und – falls vorhanden – Pflanzenzahl anzeigen. Beispiel 50 × 28 cm auf 1 × 1 m: 6 Paletten, 624 Pflanzen bei 104 Pflanzen/Palette. Fläche 56 × 50 cm: 1 normal, 2 gedreht.
- Eigene Maße, Flächeneinheiten, Abstand, Pflanzenzahl und Reset; Änderungen betreffen nur die Berechnung, nicht die Produktdaten. Rechteckkomponente unterstützt auch `product-kind="Trays"` ohne Pflanzenzahl.

## Dateien gezielt lesen

| Aufgabe | Einstieg |
|---|---|
| Routing/Versionen | `version-switch.js`, jeweilige `index.html` |
| VCG Daten/Grundfunktionen | `data.js`, `app.js` |
| VCG aktuelle Zeilen/Technik | `latest.js`, `technical.js`, `technical.css` |
| VCG V8-Kacheln/Navigation | `v8.js`, `v8.css`, `certificates.js` |
| BP Daten/Filter/Zeilen | `bp/data.js`, `bp/app.js`, `bp/styles.css`, `bp/v2.css` |
| BP CC-Info/Listenleiste/Navigation | `bp/review-update.js`, `bp/review-update.css` |
| Gemeinsame Listen | `v3.js`, `v3.css` |
| XD-Fluchten/automatisches Einklappen | `catalog-xd.js`, `catalog-xd.css` |
| Runde Rechenlogik/Komponente | `space-calculator/engine.js`, `component.js` |
| Rechteckige Rechenlogik/Komponente | `space-calculator/rectangular-engine.js`, `rectangular-component.js` |
| Gemeinsames Modal/Anbindung | `space-calculator/integration.js`, `modal.css` |
| Quellen/Entscheidungen | `docs/sources-2026-10-22.md`, `docs/round-pots-v8.md`, `docs/calculator-v7.md` |

## Prüfen und veröffentlichen

Rechentests: `node --test tests/space-engine.test.cjs tests/rectangular-engine.test.cjs`. Zusätzlich geänderte JS-Dateien mit `node --check` und `git diff --check` prüfen. Browser nur auf beauftragte Änderungen fokussieren; typische Breiten 390/768/1440, Rechner zusätzlich 1280 × 720. Öffnen/Schließen, Datenübernahme, Rotation, Reset, Einheiten und fehlerhafte Eingaben passend prüfen. Keine Prüfung behaupten, die nicht stattfand.

GitHub-Anbindung ist verbunden. Direkter Shell-Push kann mangels Anmeldung scheitern; dann GitHub-Tools verwenden. Textänderungen können mit `create_tree` (content), `create_commit` und `update_ref` veröffentlicht werden. Branchwechsel nur mit geprüftem erwartetem Head, kein Force-Push. Danach GitHub-Pages-Deployment und öffentliche Zielseite kontrollieren. Versionsparameter/Asset-Cachebuster aktuell halten. Lokale Vorschauverzeichnisse, `.openai`-Vorschaukonfiguration und temporäre Screenshots nicht ins Repo aufnehmen.

## Neuer Chat

Kurzer Startauftrag: „Arbeite im Repo areich135/GPT. Lies zuerst AGENTS.md und docs/PROJECT_HANDOVER.md und prüfe den aktuellen Stand. Aufgabe: …“

Wenn das Repo im neuen Chat nicht verbunden ist, GitHub-Anbindung auswählen oder diese Übergabedatei als Quelle bereitstellen. Projektspeicher ersetzt keine vollständige, verlässliche Übernahme sämtlicher alten Einzelentscheidungen; die aktuelle Übergabe und der Code sind maßgeblich.
