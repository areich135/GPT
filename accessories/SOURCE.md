# Ampeln, Untersetzer und Hänger – V1

Abruf: 19.11.2026. Die bestehenden VCG-/BP-/ST-Komponenten bestimmen die Gestaltung (aus Repo-Code belegt). Neue Produktfakten stammen aus:

- https://www.poeppelmann.com/de/teku/produkte/mao-ampeln
- https://www.poeppelmann.com/de/teku/produkte/muk-untersetzer
- https://www.poeppelmann.com/de/teku/produkte/mhb-l-haenger
- https://static.teku.com/assets/712404/teku-de.pdf – gedruckte Seiten 61, 64 und 66.

Die drei `*-source.json` enthalten ausschließlich den aus öffentlichen Skriptliteralen gewonnenen Produktextrakt. Keine fremden Skripte ausgeführt oder vollständigen Seitenkonfigurationen übernommen. `asset-manifest.json` dokumentiert Original-URL, lokale Datei, Größe und SHA-256 von 65 Originalbildern/Icons. Das CDN liefert auch für `.psd`-URLs WebP; die lokalen Dateiendungen entsprechen dem tatsächlichen Bildformat. Keine erfundenen oder umgefärbten Produktbilder.

| Bereich | Artikel | Varianten | Maßfelder |
|---|---:|---:|---|
| MAO | 5 | 38 | 7897 Durchmesser cm; 7217 Höhe cm; 7223 Volumen l |
| MUK | 2 | 4 | 7897 Durchmesser cm; 7217 Höhe cm; 7223 Volumen l |
| MHB/MHI/A | 4 | 34 | 7493 Länge cm; 7492 Haken-Durchmesser mm |

Verpackung: 8438 pro Netz/Karton, 8439 Netze/Kartons pro Palette, 8440 unterverpackt auf Palette, 8441 lose auf Palette (nur MAO). Die Bezeichnungen richten sich nach der jeweiligen Serie. Aktuelle Websitewerte haben Vorrang vor abweichenden PDF-Werten: MAO 21 = 46/80/3.680/4.000; MAO 23 VOL = 42/72/3.024/3.024. Keine stille Vermischung mit älteren Verpackungsangaben im Katalog.

MUK 25/27 tragen den Kataloghinweis „¹ auf Anfrage“. Die Ziffer ist keine Artikel-Endung. Zertifikate werden ausschließlich aus dem jeweiligen Variantenblock übernommen, nicht aus einer pauschalen Nachhaltigkeitsregel.

## Kompatibilitäten

Der öffentliche Seitenextrakt enthält keine artikelbezogenen Zubehörlisten für diese drei Serien. Der Katalog liefert:

| Produkt | Zugeordnete Ampeln/Gefäße |
|---|---|
| MUK 25 | MAK 20, MAK 25 |
| MUK 27 | MAK 27 |
| MHB 33 | MAK 20; VAA 15, 17, 19, 21; VDA 17, 19; VSA 17, 19, 21 |
| MHI 38 | MAK 25, 27; MAO 25, 27; VAA 22/23 VOL; VDA 22; VSA 23 VOL; VSB 23 VOL |
| MHI 45 | MAK 25, 27; MAO 25, 27 |
| A 60 | TCA 30 |

MUK ist **nicht** als passender MAO-Untersetzer belegt. Keine Kompatibilität allein aus einer gleichen Zahl im Namen ableiten: MUK 25 hat z. B. 17,3 cm Durchmesser. MAO zeigt deshalb den Bereich Untersetzer mit der fehlenden Zuordnung und einem Zugang zu MUK, ohne eine Passung zu behaupten. Für MAO 20/21/23 VOL ist aus diesen vier Hängern keine Zuordnung belegt.

Hänger/Untersetzer werden außerdem über ihre gemeinsam zugeordneten MAK-Ampeln verknüpft. Die Kacheln nennen ausdrücklich die Ampel, für die die Kombination gedacht ist; keine direkte Verbindung Hänger–Untersetzer oder pauschale MAO-Passung behaupten. Lokale Zubehörartikel können direkt in Muster-/Angebotsliste übernommen werden. Dafür hält `catalog.js` zusätzliche, getrennt indizierte Artikel bereit; sie erscheinen nicht als zusätzliche Haupttreffer. Listen bleiben wie bisher pro laufender Seite, ohne bereichsübergreifenden persistenten Warenkorb.

Für MAK/VAA/TCA verwenden die Kacheln die Original-Empfehlungsbilder der drei Referenzseiten als **Serienansicht** und deren dort belegte Original-PDP-Links. Für weitere katalogbelegte VDA/VSA/VSB-Kombinationen liegen hier keine geprüften Bilder/Links vor: benannte Textkacheln statt erfundener Fotos oder URLs.

## Darstellung und Maßeinheiten

Neue Kategorien: `mao/`, `muk/`, `mhb/`, jeweils V1. Gemeinsame Filter, SKU-Zeilen, Variantenkacheln mit eigenem Merklistenherz, rechte Listen, Verpackung als Zeilen und zweistufige Inline-Anfrage verwenden die vorhandenen Komponenten. Keine BP-Plug-/Zell-/CC-Maße auf neue Serien übertragen. MAO/MUK können den vorhandenen Rundrechner mit ihrem Durchmesser öffnen; Hänger haben keinen Stellflächenrechner.

cm/inch schaltet ausschließlich Anzeigen um; Liter werden in in³ umgerechnet. Der Haken-Durchmesser wird aus dem Quellwert mm in cm bzw. inch umgerechnet (35 mm = 3,5 cm). Originalpiktogramm und Infohilfe erklären den oberen Aufhängehaken. Filter behalten kanonische Originalwerte; Mengen, Bestellnummern, Zertifikate und Anfrageentwurf bleiben erhalten.

MAO zeigt die originalen Serienbilder von Boden und Rand; keine artikelgenauen Detailbilder behauptet. MUK/Hänger nutzen die jeweils ausgewählte Originalfarbansicht. Der gemeinsame Bilddialog führt bei mehreren verfügbaren Ansichten über blaue Winkel und beschriftete Auswahlbuttons weiter.

## Tatsächliche Prüfung am 19.11.2026

JS-Syntax und `git diff --check`; DOM-Integration der sechs aktuellen Bereiche: technische Bereiche, gezielter Bilddialog-Einstieg, Bildwechsel, Verpackung, Varianten, Musterlisten und Inline-Anfrage. Neue Serien zusätzlich Einheitenwechsel mit erhaltenem Mengenentwurf, Quellen-/Assetprüfung und artikelbezogene Zubehörzuordnung. Vorhandene Rechenkerne unverändert.

Die lokale visuelle Chromium-Prüfung ist durch die Laufzeitumgebung blockiert (Prozessstart: socket operation not permitted); deshalb keine Behauptung gerenderter Responsive-Prüfung oder Pixelgleichheit. Die VCG-Kompositionsdatei wurde separat als Bild visuell kontrolliert.
