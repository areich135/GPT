/* TEKU round-pot placement, all geometry in centimetres. See docs/calculator-v7.md. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TEKUSpaceEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const units = Object.freeze({cm: 1, m: 100, ft: 30.48, in: 2.54});
  // A tolerance near the floating point resolution, not a physical extra allowance.
  const floor = x => Math.floor(x + 16 * Number.EPSILON * Math.max(1, Math.abs(x)));
  function parseDecimal(value) {
    const s = String(value).trim();
    return /^(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(s) ? Number(s.replace(',', '.')) : NaN;
  }
  function convert(value, from, to = 'cm') {
    if (!(from in units) || !(to in units) || !Number.isFinite(value)) throw new RangeError('Ungültige Einheit oder Zahl.');
    return value * units[from] / units[to];
  }
  function validate({diameter, gap, length, width}) {
    if (![diameter, gap, length, width].every(Number.isFinite)) throw new RangeError('Bitte alle Maße als gültige Zahlen eingeben.');
    if (diameter < 0.1 || diameter > 200) throw new RangeError('Der Topfdurchmesser muss zwischen 0,1 und 200 cm liegen.');
    if (gap < 0 || gap > 200) throw new RangeError('Der Abstand muss zwischen 0 und 200 cm liegen.');
    if (length < 0.01 || width < 0.01 || length > 1000000 || width > 1000000) throw new RangeError('Länge und Breite müssen zwischen 0,01 und 1.000.000 cm liegen.');
  }
  function orientation(diameter, gap, length, width, triangle, rotated) {
    const pitch = diameter + gap;
    const columns = floor(length / pitch);
    if (columns < 1 || floor(width / pitch) < 1) return {count: 0, columns: 0, oddColumns: 0, rows: 0, pitch, rowPitch: pitch, rotated, triangle};
    const rowPitch = triangle ? pitch * Math.sqrt(3) / 2 : pitch;
    // The full effective diameter must fit before the first row is counted.
    const rows = triangle ? floor((width - pitch) / rowPitch) + 1 : floor(width / pitch);
    const oddColumns = triangle ? Math.max(0, floor((length - pitch / 2) / pitch)) : columns;
    const count = Math.ceil(rows / 2) * columns + Math.floor(rows / 2) * oddColumns;
    return {count, columns, oddColumns, rows, pitch, rowPitch, rotated, triangle};
  }
  function calculate(input) {
    validate(input);
    const {diameter, gap, length, width} = input;
    const square = orientation(diameter, gap, length, width, false, false);
    const a = orientation(diameter, gap, length, width, true, false);
    const b = orientation(diameter, gap, width, length, true, true);
    const triangle = b.count > a.count ? b : a;
    return {square, triangle, area: length * width / 10000};
  }
  // A bounded diagram excerpt; calculation itself never loops over pots.
  function positions(plan, diameter, limit = 600) {
    const points = [];
    const rowLimit = Math.min(plan.rows, 16);
    for (let row = 0; row < rowLimit; row++) {
      const offset = plan.triangle && row % 2 ? plan.pitch / 2 : 0;
      const n = Math.min(row % 2 ? plan.oddColumns : plan.columns, 24);
      for (let col = 0; col < n && points.length < limit; col++) {
        const x = plan.pitch / 2 + offset + col * plan.pitch;
        const y = plan.pitch / 2 + row * plan.rowPitch;
        points.push(plan.rotated ? {x: y, y: x, radius: diameter / 2} : {x, y, radius: diameter / 2});
      }
    }
    return points;
  }
  return Object.freeze({units, parseDecimal, convert, calculate, positions});
});
