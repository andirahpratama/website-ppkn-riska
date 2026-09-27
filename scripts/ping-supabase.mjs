/**
 * Skrip Ping Supabase Otomatis (Node.js Keep-Alive)
 * Dirancang untuk dijalankan via GitHub Actions Cron (setiap 3 hari)
 * atau secara lokal via: npm run ping:supabase
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Helper load .env manual jika dotenv tidak diinstall
function loadEnv() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const envFiles = [
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '../.env.local')
  ];

  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      const content = fs.readFileSync(envFile, 'utf-8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...rest] = trimmed.split('=');
          const value = rest.join('=').trim().replace(/^["']|["']$/g, '');
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value;
          }
        }
      }
    }
  }
}

loadEnv();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

console.log('====================================================');
console.log('⚡ SUPABASE KEEP-ALIVE PING SERVICE (3-DAY CYCLE)');
console.log('Waktu Eksekusi:', new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }), 'WIB');
console.log('====================================================');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('your-project-id')) {
  console.warn('⚠️  PERINGATAN: Kredensial Supabase (URL / ANON KEY) belum dikonfigurasi.');
  console.log('Pastikan variabel VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY telah diisi di .env atau GitHub Secrets.');
  process.exit(0);
}

const cleanUrl = SUPABASE_URL.replace(/\/+$/, '');
const startTime = Date.now();

async function ping() {
  console.log(`📡 Menghubungi target: ${cleanUrl} ...`);

  const endpoints = [
    {
      name: 'PostgREST Database Table (questions)',
      url: `${cleanUrl}/rest/v1/questions?select=id&limit=1`,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    },
    {
      name: 'PostgREST OpenAPI Root Schema',
      url: `${cleanUrl}/rest/v1/`,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    },
    {
      name: 'Supabase Auth Health Service',
      url: `${cleanUrl}/auth/v1/health`,
      headers: {
        'apikey': SUPABASE_ANON_KEY
      }
    }
  ];

  let success = false;
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      console.log(`🔍 Mengirim sinyal ke: ${endpoint.name} ...`);
      const response = await fetch(endpoint.url, {
        method: 'GET',
        headers: endpoint.headers
      });

      const latency = Date.now() - startTime;

      if (response.ok || response.status === 200 || response.status === 206 || response.status === 204) {
        console.log(`✅ BERHASIL: Supabase aktif! [Status: HTTP ${response.status}]`);
        console.log(`⏱️  Latensi Respons: ${latency} ms`);
        console.log(`🎉 Proyek Supabase Anda berhasil menerima traffic aktif.`);
        console.log('   Masa aktif database diperpanjang (timer 7-hari auto-pause di-reset).');
        success = true;
        break;
      } else {
        console.log(`ℹ️  Respons: HTTP ${response.status}. Mencoba endpoint alternatif...`);
      }
    } catch (err) {
      lastError = err;
      console.log(`⚠️  Percobaan ke ${endpoint.name} gagal (${err.message}). Mencoba rute lain...`);
    }
  }

  if (!success) {
    console.error('❌ Ping gagal mencapai endpoint Supabase dengan status sukses.');
    if (lastError) console.error('Pesan Kesalahan:', lastError.message);
  }

  console.log('====================================================');
}

ping();
