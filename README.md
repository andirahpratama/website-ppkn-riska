# Ruang PPKn Interaktif — Riska Puspita, S.Pd.

> Portal Pembelajaran Digital Pendidikan Pancasila & Kewarganegaraan Tingkat SMP (Kurikulum Merdeka).

![Status](https://img.shields.io/badge/Status-Produksi%20Siap-emerald)
![Framework](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Styling](https://img.shields.io/badge/CSS-Tailwind%20CSS-teal)
![Database](https://img.shields.io/badge/Backend-Supabase%20PostgreSQL-3ECF8E)
![Hosting](https://img.shields.io/badge/Deployment-Vercel-black)

---

## 🌟 Tentang Platform

Platform web pembelajaran ini dibuat khusus untuk mendukung pembelajaran PPKn yang hidup, bermakna, dan menyenangkan bagi siswa SMP kelas 7–9. Didesain dengan estetika nasionalis modern (Kuning Emas `#F5B800` & Merah Patriotik `#D32F2F`), tipografi modern *Plus Jakarta Sans*, dan copywriting edukatif khas guru Indonesia (bebas kesan AI-slop).

### 🚀 Fitur Unggulan

1. **Beranda & Profil Interaktif**: Efek teks ketik (*typewriter*), kartu profil Bu Riska, dan *Interactive Timeline* perjalanan dedikasi pengabdian guru.
2. **Bank Soal PPKn SMP**: Filter berjenjang (Kelas 7, 8, 9) dan bab 4 pilar (Pancasila, UUD NRI 1945, Bhinneka Tunggal Ika, NKRI) dengan akordeon pembahasan pedagogis.
3. **Arena Kuis Kilat (20 Detik)**: Tantangan menjawab berwaktu, poin kecepatan, animasi kembang api (*confetti*), dan perolehan lencana digital.
4. **Zona Gamifikasi Karakter**:
   - *Game Simbol 5 Sila*: Makna filosofis lambang & aksi nyata di sekolah.
   - *Misi Nusantara*: Petualangan moral berbasis pilihan cerita siswa SMP.
   - *Papan Peringkat Real-Time*: Sinkronisasi langsung ke Supabase atau penyimpanan lokal.
5. **Portofolio Guru & Proyek P5**: Galeri dokumentasi karya P5, modul ajar Kurikulum Merdeka Fase D, dan sertifikasi pendidik.
6. **Pojok Konsultasi & Medsos**: Formulir pertanyaan siswa "Sapa Bu Riska" dan kanal media sosial edukasi.

---

## 🛠️ Menjalankan Proyek Secara Lokal

1. **Clone atau buka folder proyek:**
   ```bash
   cd "12. Website Riska"
   ```

2. **Pasang dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` di browser Anda.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## ☁️ Integrasi GitHub, Vercel & Supabase

Lihat panduan lengkap langkah-demi-langkah pada file [walkthrough.md](file:///C:/Users/andir/.gemini/antigravity-ide/brain/92486134-4cce-494d-9746-377e56ab52b8/walkthrough.md) atau ikuti ringkasan berikut:

1. **Supabase**: Buka SQL Editor di [supabase.com](https://supabase.com), jalankan query dari file `supabase_schema.sql`, lalu salin `Project URL` dan `anon key`.
2. **GitHub**: Lakukan `git init`, `git add .`, `git commit -m "feat: website ppkn riska"`, lalu push ke repositori GitHub Anda.
3. **Vercel**: Import repositori di [vercel.com](https://vercel.com), tambahkan Environment Variables `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`, lalu klik **Deploy**.
