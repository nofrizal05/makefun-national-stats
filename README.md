# Angka Indonesia — Statistik Indonesia dalam Satu Situs

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/nofrizal05/makefun-national-stats/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/nofrizal05/makefun-national-stats/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

**Angka Indonesia** adalah situs statistik nasional untuk Indonesia yang berjalan
sepenuhnya offline dari file statis: ringkasan indikator kunci, penduduk, ekonomi,
pendidikan & kesehatan, dan penjelajah 38 provinsi — setiap angka disertai sumber
dan tahunnya (BPS — Statistics Indonesia, Kementerian Kesehatan, Bank Indonesia).

## Isi situs

- **Ringkasan** — 8 indikator kunci (penduduk 281,6 juta, PDB Rp22.139 triliun,
  inflasi 1,57%, pengangguran 4,76%, kemiskinan 8,57%, IPM 75,02, dan lainnya),
  grafik pertumbuhan penduduk, struktur umur, dan provinsi terpadat.
- **Penduduk** — tren 2010–2024 (grafik garis/batang yang bisa diganti), struktur
  umur, dan tabel per tahun.
- **Ekonomi** — tab indikator (pertumbuhan PDB, inflasi, pengangguran, kemiskinan),
  struktur PDB menurut lapangan usaha, dan angka kunci 2024.
- **Pendidikan & Kesehatan** — melek huruf, lama sekolah, harapan hidup, kematian
  bayi, stunting, dan akses air minum layak.
- **Provinsi** — tabel 38 provinsi yang bisa dicari, diurutkan (penduduk, nama,
  kepadatan), plus grafik 10 provinsi terpadat.

## Cara menjalankan

Tidak ada build step. Sajikan folder `app/` dengan server HTTP statis apa pun:

```sh
cd app
python3 -m http.server 8080
# buka http://localhost:8080
```

Atau dengan Node:

```sh
node --experimental-strip-types serve.ts   # jika tersedia
```

Situs ini tidak memuat apa pun dari jaringan: tanpa pustaka eksternal, tanpa
font web — hanya HTML, CSS, dan JavaScript biasa, dengan grafik SVG yang
digambar oleh kode sendiri (`app/charts.js`).

## Struktur

- `app/index.html` — halaman utama dan navigasi
- `app/style.css` — seluruh tampilan (satu berkas, tanpa framework)
- `app/app.js` — routing hash, rendering halaman, dan semua kontrol
- `app/data.js` — semua angka beserta sumber dan tahunnya
- `app/charts.js` — pembuat grafik SVG (batang, garis, batang horizontal, donat)
- `main.ts` — program penyerahan (Node 22, stdlib saja)
- `vendor/makefun-frontend.ts` — pustaka dossier dari kit make.fun (tidak diubah)
- `screenshots/` — tangkapan layar asli dari situs ini

## Lisensi

MIT — lihat `LICENSE`.
