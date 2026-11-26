// charts.js — small SVG chart builders written for this site, no library.
// Every function takes plain data and returns an SVG string.

const NS = "http://www.w3.org/2000/svg";

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function niceMax(values) {
  const m = Math.max(...values);
  const pow = Math.pow(10, Math.floor(Math.log10(m)));
  return Math.ceil(m / pow) * pow;
}

// Vertical bar chart with value labels and a baseline.
export function barChart(series, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const padL = 44, padR = 12, padT = 18, padB = 34;
  const max = opts.max ?? niceMax(series.map((d) => Math.abs(d.value)));
  const min = opts.min ?? Math.min(0, ...series.map((d) => d.value));
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const yFor = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const bw = iw / series.length;
  const zeroY = yFor(0);
  let bars = "";
  series.forEach((d, i) => {
    const x = padL + i * bw + bw * 0.18;
    const bw2 = bw * 0.64;
    const y = d.value >= 0 ? yFor(d.value) : zeroY;
    const bh = Math.abs(yFor(d.value) - zeroY);
    const color = d.color || (d.value < 0 ? "#c0392b" : "#0e7c7b");
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw2.toFixed(1)}" height="${Math.max(bh, 2).toFixed(1)}" rx="3" fill="${color}"><title>${esc(d.label)}: ${d.value}</title></rect>`;
    bars += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" fill="#33414f">${d.value}</text>`;
    bars += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="#5a6b7a">${esc(d.label)}</text>`;
  });
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    const y = yFor(v);
    return `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e3e8ec" stroke-width="1"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="#7a8a97">${Math.round(v * 10) / 10}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Bar chart" xmlns="${NS}">${grid}<line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" stroke="#94a3b0" stroke-width="1"/>${bars}</svg>`;
}

// Line chart with dots and value labels.
export function lineChart(series, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const padL = 44, padR = 16, padT = 22, padB = 34;
  const values = series.map((d) => d.value);
  const max = opts.max ?? niceMax(values);
  const min = opts.min ?? Math.min(0, ...values);
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const xFor = (i) => padL + (i / (series.length - 1)) * iw;
  const yFor = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const pts = series.map((d, i) => `${xFor(i).toFixed(1)},${yFor(d.value).toFixed(1)}`).join(" ");
  const dots = series.map((d, i) =>
    `<circle cx="${xFor(i).toFixed(1)}" cy="${yFor(d.value).toFixed(1)}" r="4" fill="#0f2a43"><title>${esc(d.label)}: ${d.value}</title></circle>` +
    `<text x="${xFor(i).toFixed(1)}" y="${(yFor(d.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" fill="#33414f">${d.value}</text>` +
    `<text x="${xFor(i).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="#5a6b7a">${esc(d.label)}</text>`).join("");
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    const y = yFor(v);
    return `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e3e8ec" stroke-width="1"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="#7a8a97">${Math.round(v * 10) / 10}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Line chart" xmlns="${NS}">${grid}<polyline points="${pts}" fill="none" stroke="#0e7c7b" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Horizontal bars, good for ranking provinces or sectors.
export function hbarChart(rows, opts = {}) {
  const w = opts.width || 640;
  const rowH = opts.rowHeight || 30;
  const h = rows.length * rowH + 14;
  const padL = opts.labelWidth || 170;
  const padR = 52;
  const max = opts.max ?? niceMax(rows.map((r) => r.value));
  const iw = w - padL - padR;
  let out = "";
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = (r.value / max) * iw;
    out += `<text x="${padL - 8}" y="${y + 15}" text-anchor="end" font-size="12" fill="#243447">${esc(r.label)}</text>`;
    out += `<rect x="${padL}" y="${y + 4}" width="${Math.max(bw, 2).toFixed(1)}" height="16" rx="3" fill="${r.color || "#0e7c7b"}"><title>${esc(r.label)}: ${r.value}</title></rect>`;
    out += `<text x="${(padL + bw + 6).toFixed(1)}" y="${y + 17}" font-size="12" fill="#33414f">${r.value}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Horizontal bar chart" xmlns="${NS}">${out}</svg>`;
}

// Donut chart for age structure (three slices).
export function donutChart(slices, opts = {}) {
  const size = opts.size || 220;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, ir = r - 34;
  const total = slices.reduce((s, d) => s + d.value, 0);
  let a0 = -Math.PI / 2;
  let paths = "";
  slices.forEach((d) => {
    const a1 = a0 + (d.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
    paths += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${d.color}"><title>${esc(d.label)}: ${d.value}%</title></path>`;
    a0 = a1;
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart" xmlns="${NS}">${paths}<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="22" font-weight="700" fill="#0f2a43">281,6 jt</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11" fill="#5a6b7a">penduduk 2024</text></svg>`;
}
