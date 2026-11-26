// app.js — routing and rendering for Angka Indonesia.
// Hash routes: #/overview, #/population, #/economy, #/education-health,
// #/provinces. All rendering is client-side from data.js; every control
// on the page works without a network request.

import {
  META, KEY_INDICATORS, POPULATION_SERIES, AGE_STRUCTURE,
  ECONOMY_SERIES, GDP_SECTORS, EDUCATION_HEALTH, PROVINCES, SOURCES,
} from "./data.js";
import { barChart, lineChart, hbarChart, donutChart } from "./charts.js";

const main = document.getElementById("view");
const navLinks = Array.from(document.querySelectorAll("nav.mainnav a"));
const fmt = (n) => n.toLocaleString("id-ID", { maximumFractionDigits: 2 });

function sourceNote(text) {
  return `<p class="source-note">Sumber: ${text}. Angka dibulatkan; lihat daftar sumber di bawah halaman.</p>`;
}

function kpiCards() {
  return `<div class="kpis">` + KEY_INDICATORS.map((k) => `
    <article class="kpi">
      <div class="k-label">${k.label}</div>
      <div class="k-value">${k.value}</div>
      <div class="k-detail">${k.detail}</div>
      <div class="k-trend">${k.trend}</div>
      <div class="k-source">${k.source}</div>
    </article>`).join("") + `</div>`;
}

function overviewView() {
  const popBars = POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
  const topProv = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8)
    .map((p) => ({ label: p.name, value: p.pop }));
  return `
  <section class="hero"><div class="wrap">
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Satu halaman untuk angka-angka terpenting tentang Indonesia — penduduk,
    ekonomi, pendidikan, dan kesehatan — dengan sumber dan tahun pada setiap angka.</p>
    <p class="updated">Terakhir diperbarui <b>${META.updated}</b> · Mata uang: ${META.currency} · 38 provinsi</p>
  </div></section>
  <div class="wrap">${kpiCards()}
  <main>
  <section class="block card">
    <div class="chart-head"><h2>Pertumbuhan penduduk, 2010–2024</h2>
    <span class="hint">juta jiwa · gunakan tombol di bawah untuk ganti tampilan</span></div>
    <div class="tabs" role="group" aria-label="Jenis grafik penduduk">
      <button type="button" data-pop-chart="bar" aria-pressed="true">Batang</button>
      <button type="button" data-pop-chart="line" aria-pressed="false">Garis</button>
    </div>
    <div id="pop-chart">${barChart(popBars, { max: 300 })}</div>
    ${sourceNote("BPS, Sensus Penduduk 2010 &amp; 2020 dan proyeksi penduduk 2021–2024")}
  </section>
  <section class="block two-col">
    <div class="card">
      <h2>Struktur umur, 2024</h2>
      <p>Indonesia masih dalam bonus demografi: 68% penduduk berada pada usia kerja.</p>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
        ${donutChart(AGE_STRUCTURE.map((a, i) => ({ label: a.group, value: a.share, color: ["#0e7c7b", "#e8a33d", "#0f2a43"][i] })))}
        <div class="legend" style="flex-direction:column;gap:6px">
          ${AGE_STRUCTURE.map((a, i) => `<span><i style="background:${["#0e7c7b", "#e8a33d", "#0f2a43"][i]}"></i>${a.group} — ${a.share}% (${a.note})</span>`).join("")}
        </div>
      </div>
      ${sourceNote("BPS, proyeksi penduduk 2024")}
    </div>
    <div class="card">
      <h2>Provinsi terpadat</h2>
      <p>Delapan provinsi dengan penduduk terbanyak, 2024 (juta jiwa).</p>
      ${hbarChart(topProv)}
      <p style="margin-top:10px"><a href="#/provinces">Jelajahi semua 38 provinsi →</a></p>
      ${sourceNote("BPS, estimasi penduduk pertengahan 2024")}
    </div>
  </section>
  <section class="block card callout">
    <b>Mulai dari mana?</b> Cari angka penduduk di <a href="#/population">Penduduk</a>,
    pertumbuhan dan inflasi di <a href="#/economy">Ekonomi</a>, sekolah dan kesehatan di
    <a href="#/education-health">Pendidikan &amp; Kesehatan</a>, atau bandingkan daerah di
    <a href="#/provinces">Provinsi</a>.
  </section>
  </main></div>`;
}

function populationView() {
  const rows = POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
  return `<div class="wrap"><main>
  <section class="block card">
    <h1>Penduduk Indonesia</h1>
    <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia, dengan
    281,6 juta jiwa pada pertengahan 2024 (BPS). Laju pertumbuhan penduduk 2024 sekitar
    1,1% per tahun, melambat dari 1,49% pada 2010.</p>
    <div class="tabs" role="group" aria-label="Jenis grafik penduduk">
      <button type="button" data-pop-chart="line" aria-pressed="true">Garis</button>
      <button type="button" data-pop-chart="bar" aria-pressed="false">Batang</button>
    </div>
    <div id="pop-chart">${lineChart(rows, { max: 300 })}</div>
    ${sourceNote("BPS, Sensus Penduduk 2010 &amp; 2020; proyeksi penduduk 2021–2024")}
  </section>
  <section class="block two-col">
    <div class="card"><h2>Angka kunci</h2>
      <div class="fact-list" style="grid-template-columns:1fr">
        <div class="fact"><b>281,6 juta</b><span>penduduk, pertengahan 2024 — BPS</span></div>
        <div class="fact"><b>56,1%</b><span>penduduk tinggal di Pulau Jawa — BPS, 2024</span></div>
        <div class="fact"><b>140 jiwa/km²</b><span>kepadatan penduduk nasional — BPS, 2024</span></div>
        <div class="fact"><b>2,4</b><span>angka kelahiran total (TFR) — BPS, 2023</span></div>
      </div>
    </div>
    <div class="card"><h2>Struktur umur, 2024</h2>
      <p>Rasio ketergantungan 47,1 — setiap 100 penduduk usia kerja menanggung 47 penduduk
      usia non-kerja (BPS, 2024).</p>
      ${donutChart(AGE_STRUCTURE.map((a, i) => ({ label: a.group, value: a.share, color: ["#0e7c7b", "#e8a33d", "#0f2a43"][i] })))}
      <div class="legend">${AGE_STRUCTURE.map((a, i) => `<span><i style="background:${["#0e7c7b", "#e8a33d", "#0f2a43"][i]}"></i>${a.group} — ${a.share}%</span>`).join("")}</div>
      ${sourceNote("BPS, proyeksi penduduk 2024")}
    </div>
  </section>
  <section class="block card"><h2>Penduduk per tahun</h2>
    <div class="table-scroll"><table>
      <thead><tr><th>Tahun</th><th class="num">Penduduk (juta)</th><th>Sumber</th></tr></thead>
      <tbody>${POPULATION_SERIES.map((d) => `<tr><td>${d.year}</td><td class="num">${d.value}</td><td>BPS</td></tr>`).join("")}</tbody>
    </table></div>
    ${sourceNote("BPS, Sensus Penduduk dan proyeksi penduduk")}
  </section>
  </main></div>`;
}

const ECON_TABS = {
  gdpGrowth: { title: "Pertumbuhan ekonomi (PDB riil, % yoy)", series: ECONOMY_SERIES.gdpGrowth, note: "BPS, 2020–2024. PDB 2024 Rp22.139 triliun; PDB per kapita Rp78,6 juta." },
  inflation: { title: "Inflasi (%, yoy)", series: ECONOMY_SERIES.inflation, note: "BPS, 2020–2024. Sasaran Bank Indonesia 2,5% ± 1 poin persen." },
  unemployment: { title: "Tingkat pengangguran terbuka (%, Agustus)", series: ECONOMY_SERIES.unemployment, note: "BPS, Survei Angkatan Kerja Nasional, 2020–2024." },
  poverty: { title: "Tingkat kemiskinan (%, September/Maret)", series: ECONOMY_SERIES.poverty, note: "BPS, 2020–2024. 24,06 juta penduduk miskin pada September 2024." },
};

function economyView(tab = "gdpGrowth") {
  const t = ECON_TABS[tab] || ECON_TABS.gdpGrowth;
  const bars = t.series.map((d) => ({ label: String(d.year), value: d.value }));
  return `<div class="wrap"><main>
  <section class="block card">
    <h1>Ekonomi Indonesia</h1>
    <p class="lede">Perekonomian terbesar di Asia Tenggara: PDB Rp22.139 triliun pada 2024
    dengan pertumbuhan 5,03% (BPS). Pilih indikator di bawah untuk melihat trennya.</p>
    <div class="tabs" role="group" aria-label="Indikator ekonomi">
      ${Object.entries(ECON_TABS).map(([k, v]) => `<button type="button" data-econ-tab="${k}" aria-pressed="${k === tab}">${v.title.split("(")[0].trim()}</button>`).join("")}
    </div>
    <h2 style="margin-top:14px">${t.title}</h2>
    <div id="econ-chart">${barChart(bars)}</div>
    ${sourceNote(t.note)}
  </section>
  <section class="block two-col">
    <div class="card"><h2>Struktur PDB menurut lapangan usaha, 2024</h2>
      <p>Pangsa terhadap PDB (%).</p>
      ${hbarChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share })), { labelWidth: 210 })}
      ${sourceNote("BPS, 2024")}
    </div>
    <div class="card"><h2>Angka kunci 2024</h2>
      <div class="fact-list" style="grid-template-columns:1fr">
        <div class="fact"><b>Rp22.139 triliun</b><span>PDB nominal — BPS, 2024</span></div>
        <div class="fact"><b>5,03%</b><span>pertumbuhan PDB riil — BPS, 2024</span></div>
        <div class="fact"><b>1,57%</b><span>inflasi Desember 2024 (yoy) — BPS</span></div>
        <div class="fact"><b>Rp15.900-an</b><span>kurs rupiah per dolar AS, rata-rata 2024 — Bank Indonesia</span></div>
        <div class="fact"><b>US$24,5 miliar</b><span>surplus neraca perdagangan — BPS, 2024</span></div>
      </div>
    </div>
  </section>
  </main></div>`;
}

function educationHealthView() {
  return `<div class="wrap"><main>
  <section class="block card">
    <h1>Pendidikan &amp; Kesehatan</h1>
    <p class="lede">Indeks Pembangunan Manusia Indonesia 75,02 pada 2024 (BPS) — kategori
    tinggi. Di bawah ini angka-angka pendidikan dan kesehatan terbaru, masing-masing
    dengan sumber dan tahun.</p>
    <div class="fact-list">
      ${EDUCATION_HEALTH.map((f) => `<div class="fact"><b>${f.value}</b><span>${f.label} — ${f.source}, ${f.year}</span></div>`).join("")}
    </div>
    ${sourceNote("BPS, Statistik Indonesia 2025; Kementerian Kesehatan, SSGI 2024")}
  </section>
  <section class="block two-col">
    <div class="card"><h2>Pendidikan</h2>
      <p>Angka melek huruf penduduk 15 tahun ke atas mencapai 96,0% (2023, BPS), dan
      rata-rata lama sekolah 9,04 tahun (2024, BPS). Harapan lama sekolah 13,21 tahun
      berarti anak yang mulai sekolah pada 2024 diperkirakan menempuh pendidikan
      selama itu.</p>
      <p>Angka partisipasi sekolah usia 13–15 tahun 98,7% (2024, BPS) — hampir semua
      anak usia SMP bersekolah.</p>
      ${sourceNote("BPS, 2023–2024")}
    </div>
    <div class="card"><h2>Kesehatan</h2>
      <p>Harapan hidup 73,55 tahun (2024, BPS), naik dari 71,9 tahun pada 2015.
      Kematian bayi 16,9 per 1.000 kelahiran hidup (2023, BPS).</p>
      <p>Prevalensi stunting balita 19,8% (2024, Kemenkes/SSGI), turun dari 21,5%
      pada 2023 — pemerintah menargetkan 14,2% pada 2029.</p>
      ${sourceNote("BPS dan Kementerian Kesehatan, 2023–2024")}
    </div>
  </section>
  </main></div>`;
}

let provState = { q: "", sort: "pop-desc" };

function sortedProvinces() {
  let list = PROVINCES.filter((p) => p.name.toLowerCase().includes(provState.q.toLowerCase()) ||
    p.capital.toLowerCase().includes(provState.q.toLowerCase()));
  const by = {
    "pop-desc": (a, b) => b.pop - a.pop,
    "pop-asc": (a, b) => a.pop - b.pop,
    "name": (a, b) => a.name.localeCompare(b.name, "id"),
    "density-desc": (a, b) => (b.pop * 1000 / b.area) - (a.pop * 1000 / a.area),
  }[provState.sort];
  return list.sort(by);
}

function provincesView() {
  const list = sortedProvinces();
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10)
    .map((p) => ({ label: p.name, value: p.pop }));
  return `<div class="wrap"><main>
  <section class="block card">
    <h1>Provinsi Indonesia</h1>
    <p class="lede">Indonesia terdiri dari 38 provinsi. Cari berdasarkan nama atau ibu kota,
    lalu urutkan berdasarkan penduduk, nama, atau kepadatan.</p>
    <div class="controls">
      <input type="search" id="prov-search" placeholder="Cari provinsi atau ibu kota…" value="${provState.q.replace(/"/g, "&quot;")}" aria-label="Cari provinsi">
      <select id="prov-sort" aria-label="Urutkan provinsi">
        <option value="pop-desc" ${provState.sort === "pop-desc" ? "selected" : ""}>Penduduk terbanyak</option>
        <option value="pop-asc" ${provState.sort === "pop-asc" ? "selected" : ""}>Penduduk tersedikit</option>
        <option value="name" ${provState.sort === "name" ? "selected" : ""}>Nama (A–Z)</option>
        <option value="density-desc" ${provState.sort === "density-desc" ? "selected" : ""}>Kepadatan tertinggi</option>
      </select>
      <span class="count" id="prov-count">${list.length} dari 38 provinsi</span>
    </div>
    <div class="table-scroll"><table>
      <thead><tr>
        <th><button type="button" data-sort="name">Provinsi ↕</button></th>
        <th><button type="button" data-sort="pop-desc">Penduduk (juta) ↕</button></th>
        <th class="num">Luas (ribu km²)</th>
        <th class="num">Kepadatan (jiwa/km²)</th>
        <th>Ibu kota</th>
      </tr></thead>
      <tbody id="prov-body">
        ${list.map((p) => `<tr><td>${p.name}</td><td class="num">${fmt(p.pop)}</td><td class="num">${fmt(p.area)}</td><td class="num">${fmt(Math.round(p.pop * 1000000 / (p.area * 1000)))}</td><td>${p.capital}</td></tr>`).join("") || `<tr><td colspan="5" class="empty">Tidak ada provinsi yang cocok dengan “${provState.q}”. Coba kata kunci lain.</td></tr>`}
      </tbody>
    </table></div>
    ${sourceNote("BPS, estimasi penduduk pertengahan 2024; luas wilayah menurut BPS")}
  </section>
  <section class="block card">
    <h2>10 provinsi terpadat, 2024</h2>
    ${hbarChart(top10)}
    ${sourceNote("BPS, 2024")}
  </section>
  </main></div>`;
}

function sourcesFooter() {
  return `<footer class="site"><div class="wrap">
    <h2>Sumber data</h2>
    <ul>${SOURCES.map((s) => `<li><b style="color:#fff">${s.name}</b> (${s.url}) — ${s.note}</li>`).join("")}</ul>
    <p style="margin-top:14px">Angka Indonesia adalah situs statistik independen buatan sendiri; bukan situs
    resmi BPS. Angka disajikan apa adanya dari sumbernya dan dibulatkan untuk dibaca cepat.
    Dibuat dengan HTML, CSS, dan JavaScript biasa — tanpa pustaka eksternal dan tanpa
    permintaan jaringan.</p>
    <p><a href="#/overview">Ringkasan</a> · <a href="#/population">Penduduk</a> ·
    <a href="#/economy">Ekonomi</a> · <a href="#/education-health">Pendidikan &amp; Kesehatan</a> ·
    <a href="#/provinces">Provinsi</a></p>
  </div></footer>`;
}

function render() {
  const hash = location.hash || "#/overview";
  const [_, page, arg] = hash.split("/");
  let html = "";
  if (page === "population") html = populationView();
  else if (page === "economy") html = economyView(arg);
  else if (page === "education-health") html = educationHealthView();
  else if (page === "provinces") html = provincesView();
  else html = overviewView();
  main.innerHTML = html + sourcesFooter();
  navLinks.forEach((a) => {
    const target = a.getAttribute("href").slice(1).split("/")[1] || "overview";
    a.classList.toggle("active", (page || "overview") === target);
    if ((page || "overview") === target) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
}

function bindEvents() {
  main.addEventListener("click", (ev) => {
    const popBtn = ev.target.closest("[data-pop-chart]");
    if (popBtn) {
      const kind = popBtn.dataset.popChart;
      document.querySelectorAll("[data-pop-chart]").forEach((b) => b.setAttribute("aria-pressed", String(b === popBtn)));
      const series = POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
      document.getElementById("pop-chart").innerHTML = kind === "line" ? lineChart(series, { max: 300 }) : barChart(series, { max: 300 });
      return;
    }
    const econBtn = ev.target.closest("[data-econ-tab]");
    if (econBtn) { location.hash = `#/economy/${econBtn.dataset.econTab}`; return; }
    const sortBtn = ev.target.closest("[data-sort]");
    if (sortBtn) {
      provState.sort = sortBtn.dataset.sort;
      render();
    }
  });
  main.addEventListener("input", (ev) => {
    if (ev.target.id === "prov-search") {
      provState.q = ev.target.value;
      const list = sortedProvinces();
      document.getElementById("prov-count").textContent = `${list.length} dari 38 provinsi`;
      document.getElementById("prov-body").innerHTML = list.map((p) => `<tr><td>${p.name}</td><td class="num">${fmt(p.pop)}</td><td class="num">${fmt(p.area)}</td><td class="num">${fmt(Math.round(p.pop * 1000000 / (p.area * 1000)))}</td><td>${p.capital}</td></tr>`).join("") ||
        `<tr><td colspan="5" class="empty">Tidak ada provinsi yang cocok. Coba kata kunci lain.</td></tr>`;
    }
  });
  main.addEventListener("change", (ev) => {
    if (ev.target.id === "prov-sort") { provState.sort = ev.target.value; render(); }
  });
}

window.addEventListener("hashchange", render);
bindEvents();
render();
