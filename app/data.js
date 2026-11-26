// Data for Angka Indonesia — figures from BPS (Statistics Indonesia),
// the World Bank and the Ministry of Health. Every number below carries
// its source and year on the page that shows it; this file is only the
// raw values. Population figures for provinces are BPS mid-year
// estimates for 2024, rounded to the nearest 10,000.

export const META = {
  country: "Indonesia",
  siteName: "Angka Indonesia",
  tagline: "Statistik Indonesia, dijelaskan dengan jelas",
  updated: "26 November 2026",
  currency: "Rupiah (Rp)",
};

export const KEY_INDICATORS = [
  { id: "population", label: "Penduduk", value: "281,6 jt", detail: "jiwa, pertengahan 2024", source: "BPS, 2024", trend: "+1,1% per tahun" },
  { id: "gdp", label: "PDB nominal", value: "Rp22.139 T", detail: "triliun rupiah, 2024", source: "BPS, 2024", trend: "+5,03% riil" },
  { id: "gdpCapita", label: "PDB per kapita", value: "Rp78,6 jt", detail: "≈ US$4.919, 2024", source: "BPS, 2024", trend: "+3,9% riil" },
  { id: "inflation", label: "Inflasi (yoy)", value: "1,57%", detail: "Desember 2024", source: "BPS, 2024", trend: "dalam sasaran 2,5±1%" },
  { id: "unemployment", label: "Pengangguran terbuka", value: "4,76%", detail: "Agustus 2024", source: "BPS, 2024", trend: "turun dari 5,32%" },
  { id: "poverty", label: "Kemiskinan", value: "8,57%", detail: "September 2024", source: "BPS, 2024", trend: "terendah sejak 1998" },
  { id: "hdi", label: "Indeks Pembangunan Manusia", value: "75,02", detail: "skala 0–100, 2024", source: "BPS, 2024", trend: "+0,63 poin" },
  { id: "lifeExpectancy", label: "Harapan hidup", value: "73,55 thn", detail: "tahun, 2024", source: "BPS, 2024", trend: "+0,15 tahun" },
];

export const POPULATION_SERIES = [
  { year: 2010, value: 237.6 }, { year: 2015, value: 255.6 },
  { year: 2020, value: 270.2 }, { year: 2021, value: 272.7 },
  { year: 2022, value: 275.8 }, { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

export const AGE_STRUCTURE = [
  { group: "0–14 tahun", share: 24.5, note: "anak-anak" },
  { group: "15–64 tahun", share: 68.0, note: "usia kerja" },
  { group: "65+ tahun", share: 7.5, note: "lansia" },
];

export const ECONOMY_SERIES = {
  gdpGrowth: [
    { year: 2020, value: -2.07 }, { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
  inflation: [
    { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
  unemployment: [
    { year: 2020, value: 7.07 }, { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 },
    { year: 2024, value: 4.76 },
  ],
  poverty: [
    { year: 2020, value: 10.19 }, { year: 2021, value: 9.71 },
    { year: 2022, value: 9.57 }, { year: 2023, value: 9.36 },
    { year: 2024, value: 8.57 },
  ],
};

export const GDP_SECTORS = [
  { sector: "Industri pengolahan", share: 18.9 },
  { sector: "Perdagangan", share: 13.0 },
  { sector: "Pertanian, kehutanan, perikanan", share: 12.5 },
  { sector: "Pertambangan", share: 9.1 },
  { sector: "Konstruksi", share: 9.9 },
  { sector: "Transportasi & pergudangan", share: 5.5 },
  { sector: "Lainnya", share: 31.1 },
];

export const EDUCATION_HEALTH = [
  { label: "Melek huruf (15+)", value: "96,0%", year: "2023", source: "BPS" },
  { label: "Rata-rata lama sekolah", value: "9,04 thn", year: "2024", source: "BPS" },
  { label: "Harapan lama sekolah", value: "13,21 thn", year: "2024", source: "BPS" },
  { label: "Angka partisipasi sekolah 13–15 thn", value: "98,7%", year: "2024", source: "BPS" },
  { label: "Harapan hidup", value: "73,55 thn", year: "2024", source: "BPS" },
  { label: "Kematian bayi (per 1.000 lahir hidup)", value: "16,9", year: "2023", source: "BPS" },
  { label: "Prevalensi stunting balita", value: "19,8%", year: "2024", source: "Kemenkes (SSGI)" },
  { label: "Akses air minum layak", value: "91,7%", year: "2024", source: "BPS" },
];

// Provinces: name, 2024 population (millions), area (thousand km2), capital.
export const PROVINCES = [
  { name: "Jawa Barat", pop: 50.35, area: 37.0, capital: "Bandung" },
  { name: "Jawa Timur", pop: 41.81, area: 48.0, capital: "Surabaya" },
  { name: "Jawa Tengah", pop: 37.89, area: 34.3, capital: "Semarang" },
  { name: "Sumatera Utara", pop: 15.59, area: 72.9, capital: "Medan" },
  { name: "Banten", pop: 12.43, area: 9.7, capital: "Serang" },
  { name: "DKI Jakarta", pop: 10.56, area: 0.7, capital: "Jakarta" },
  { name: "Sulawesi Selatan", pop: 9.46, area: 46.7, capital: "Makassar" },
  { name: "Lampung", pop: 9.35, area: 34.6, capital: "Bandar Lampung" },
  { name: "Sumatera Selatan", pop: 8.94, area: 91.6, capital: "Palembang" },
  { name: "Riau", pop: 6.76, area: 87.0, capital: "Pekanbaru" },
  { name: "Sumatera Barat", pop: 5.76, area: 42.0, capital: "Padang" },
  { name: "Nusa Tenggara Barat", pop: 5.55, area: 18.6, capital: "Mataram" },
  { name: "Kalimantan Barat", pop: 5.51, area: 147.3, capital: "Pontianak" },
  { name: "Aceh", pop: 5.44, area: 57.9, capital: "Banda Aceh" },
  { name: "Kalimantan Timur", pop: 4.01, area: 127.3, capital: "Samarinda" },
  { name: "Sulawesi Tengah", pop: 3.16, area: 61.8, capital: "Palu" },
  { name: "Kalimantan Selatan", pop: 4.22, area: 38.7, capital: "Banjarmasin" },
  { name: "Sulawesi Utara", pop: 2.72, area: 13.9, capital: "Manado" },
  { name: "Nusa Tenggara Timur", pop: 5.67, area: 47.2, capital: "Kupang" },
  { name: "Kalimantan Tengah", pop: 2.76, area: 153.6, capital: "Palangka Raya" },
  { name: "Papua", pop: 1.11, area: 82.7, capital: "Jayapura" },
  { name: "Jambi", pop: 3.68, area: 49.0, capital: "Jambi" },
  { name: "Bali", pop: 4.36, area: 5.8, capital: "Denpasar" },
  { name: "DI Yogyakarta", pop: 3.76, area: 3.1, capital: "Yogyakarta" },
  { name: "Sulawesi Tenggara", pop: 2.80, area: 38.1, capital: "Kendari" },
  { name: "Kalimantan Utara", pop: 0.73, area: 72.3, capital: "Tanjung Selor" },
  { name: "Sulawesi Barat", pop: 1.52, area: 16.8, capital: "Mamuju" },
  { name: "Maluku", pop: 1.99, area: 46.9, capital: "Ambon" },
  { name: "Maluku Utara", pop: 1.37, area: 31.9, capital: "Sofifi" },
  { name: "Bengkulu", pop: 2.08, area: 20.0, capital: "Bengkulu" },
  { name: "Gorontalo", pop: 1.22, area: 11.3, capital: "Gorontalo" },
  { name: "Kepulauan Riau", pop: 2.21, area: 8.2, capital: "Tanjung Pinang" },
  { name: "Papua Barat", pop: 0.56, area: 64.1, capital: "Manokwari" },
  { name: "Papua Selatan", pop: 0.54, area: 117.9, capital: "Merauke" },
  { name: "Papua Tengah", pop: 1.35, area: 61.1, capital: "Nabire" },
  { name: "Papua Pegunungan", pop: 1.47, area: 51.2, capital: "Wamena" },
  { name: "Papua Barat Daya", pop: 0.61, area: 39.2, capital: "Sorong" },
  { name: "Kepulauan Bangka Belitung", pop: 1.50, area: 16.4, capital: "Pangkal Pinang" },
];

export const SOURCES = [
  { name: "BPS — Statistics Indonesia", note: "Sensus Penduduk, Survei Sosial Ekonomi Nasional, dan publikasi Statistik Indonesia 2025.", url: "bps.go.id" },
  { name: "Kementerian Kesehatan", note: "Survei Status Gizi Indonesia (SSGI) 2024 untuk stunting.", url: "kemkes.go.id" },
  { name: "Bank Indonesia", note: "Laporan inflasi dan sasaran inflasi 2,5% ± 1 poin persen.", url: "bi.go.id" },
];
