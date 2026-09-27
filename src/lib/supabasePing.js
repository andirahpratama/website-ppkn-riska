/**
 * Layanan Pemeliharaan & Ping Supabase (Keep-Alive Service)
 * Berfungsi untuk menjaga project Supabase free tier tetap aktif (mencegah auto-pause setelah 7 hari tidak aktif)
 * dengan mengirimkan ping terjadwal setiap 3 hari sekali atau secara manual lewat Panel Admin.
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY, isConfigured } from './supabaseClient';

export const PING_INTERVAL_DAYS = 3;
export const PING_INTERVAL_MS = PING_INTERVAL_DAYS * 24 * 60 * 60 * 1000; // 3 hari = 259.200.000 ms

const STORAGE_KEY_LAST_PING = 'supabase_last_ping_time';
const STORAGE_KEY_LAST_STATUS = 'supabase_last_ping_status';
const STORAGE_KEY_LAST_LATENCY = 'supabase_last_ping_latency';
const STORAGE_KEY_LAST_MSG = 'supabase_last_ping_message';
const STORAGE_KEY_PING_HISTORY = 'supabase_ping_history';

/**
 * Mengambil status dan riwayat ping dari localStorage
 */
export function getSupabasePingStatus() {
  if (typeof window === 'undefined') {
    return {
      isConfigured: false,
      lastPingTime: null,
      lastPingStatus: 'idle',
      lastPingLatency: null,
      lastPingMessage: '',
      nextPingTime: null,
      isDueForPing: false,
      history: []
    };
  }

  const lastPingTime = localStorage.getItem(STORAGE_KEY_LAST_PING);
  const lastPingStatus = localStorage.getItem(STORAGE_KEY_LAST_STATUS) || 'idle';
  const lastPingLatency = localStorage.getItem(STORAGE_KEY_LAST_LATENCY) ? Number(localStorage.getItem(STORAGE_KEY_LAST_LATENCY)) : null;
  const lastPingMessage = localStorage.getItem(STORAGE_KEY_LAST_MSG) || '';
  
  let history = [];
  try {
    const rawHistory = localStorage.getItem(STORAGE_KEY_PING_HISTORY);
    if (rawHistory) {
      history = JSON.parse(rawHistory);
    }
  } catch {
    history = [];
  }

  let nextPingTime = null;
  let isDueForPing = false;

  if (lastPingTime) {
    const lastTimestamp = new Date(lastPingTime).getTime();
    if (!isNaN(lastTimestamp)) {
      nextPingTime = new Date(lastTimestamp + PING_INTERVAL_MS).toISOString();
      isDueForPing = Date.now() - lastTimestamp >= PING_INTERVAL_MS;
    } else {
      isDueForPing = true;
    }
  } else {
    isDueForPing = isConfigured;
  }

  return {
    isConfigured,
    url: SUPABASE_URL,
    lastPingTime,
    lastPingStatus,
    lastPingLatency,
    lastPingMessage,
    nextPingTime,
    isDueForPing,
    history
  };
}

/**
 * Menyimpan entri hasil ping ke riwayat
 */
function recordPingResult({ success, latency, message, type = 'manual' }) {
  if (typeof window === 'undefined') return;

  const now = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY_LAST_PING, now);
  localStorage.setItem(STORAGE_KEY_LAST_STATUS, success ? 'success' : 'error');
  localStorage.setItem(STORAGE_KEY_LAST_LATENCY, String(latency || 0));
  localStorage.setItem(STORAGE_KEY_LAST_MSG, message || '');

  let history = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PING_HISTORY);
    if (raw) history = JSON.parse(raw);
  } catch {
    history = [];
  }

  const newEntry = {
    id: 'ping_' + Date.now(),
    timestamp: now,
    status: success ? 'success' : 'error',
    latency: latency || 0,
    message: message || '',
    type // 'manual' | 'auto_3days' | 'cloud_cron'
  };

  history = [newEntry, ...history.filter(item => item && item.id !== newEntry.id)].slice(0, 15);
  localStorage.setItem(STORAGE_KEY_PING_HISTORY, JSON.stringify(history));

  // Beritahu komponen UI yang sedang aktif
  window.dispatchEvent(new CustomEvent('supabase-ping-updated', { detail: newEntry }));
}

/**
 * Melakukan ping langsung ke Supabase (REST API / Auth Endpoint)
 * Memastikan PostgREST dan database PostgreSQL menerima traffic nyata.
 */
export async function pingSupabase({ type = 'manual' } = {}) {
  if (!isConfigured) {
    const errResult = {
      success: false,
      latency: 0,
      timestamp: new Date().toISOString(),
      message: 'Supabase belum terkonfigurasi. Silakan isi URL dan Anon Key terlebih dahulu.',
      type
    };
    recordPingResult(errResult);
    return errResult;
  }

  const cleanUrl = SUPABASE_URL.replace(/\/+$/, '');
  const startTime = performance.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

  try {
    // 1. Prioritas Utama: Sentuh tabel database via PostgREST
    // Query ringan: questions?select=id&limit=1
    let response = await fetch(`${cleanUrl}/rest/v1/questions?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    }).catch(() => null);

    // 2. Jika tabel questions belum dibuat atau ada kendala, fallback ke OpenAPI schema root
    if (!response || !response.ok) {
      response = await fetch(`${cleanUrl}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        signal: controller.signal
      }).catch(() => null);
    }

    // 3. Fallback kedua: Auth Health endpoint
    if (!response || (!response.ok && response.status !== 401)) {
      response = await fetch(`${cleanUrl}/auth/v1/health`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY
        },
        signal: controller.signal
      }).catch(() => null);
    }

    clearTimeout(timeoutId);
    const latency = Math.round(performance.now() - startTime);

    if (response && (response.ok || response.status === 200 || response.status === 206 || response.status === 204)) {
      const result = {
        success: true,
        latency,
        statusCode: response.status,
        timestamp: new Date().toISOString(),
        message: `HTTP ${response.status} OK - Database Supabase aktif & terhubung normal (${latency} ms).`,
        type
      };
      recordPingResult(result);
      return result;
    } else {
      const statusText = response ? `HTTP ${response.status}` : 'Koneksi Ditolak / Timeout';
      const result = {
        success: false,
        latency,
        statusCode: response ? response.status : 0,
        timestamp: new Date().toISOString(),
        message: `${statusText} - Respons tidak sesuai harapan. Pastikan Anon Key dan URL benar.`,
        type
      };
      recordPingResult(result);
      return result;
    }
  } catch (err) {
    clearTimeout(timeoutId);
    const latency = Math.round(performance.now() - startTime);
    const isTimeout = err.name === 'AbortError';
    const result = {
      success: false,
      latency,
      statusCode: 0,
      timestamp: new Date().toISOString(),
      message: isTimeout 
        ? `Request Timeout (12 detik) - Server Supabase mungkin sedang tertidur atau koneksi internet lambat.`
        : `Gagal Ping: ${err.message || 'Koneksi ke Supabase gagal'}`,
      type
    };
    recordPingResult(result);
    return result;
  }
}

/**
 * Pengecekan otomatis: Jalankan ping jika sudah lewat 3 hari sejak ping terakhir
 * Dapat dipanggil di App.jsx atau AdminDashboard.jsx
 */
export async function checkAndAutoPingSupabase() {
  if (!isConfigured) return null;

  const status = getSupabasePingStatus();
  if (status.isDueForPing) {
    console.log('[Supabase Auto-Ping] Menjalankan ping otomatis 3-harian untuk menjaga project Supabase tetap aktif...');
    return await pingSupabase({ type: 'auto_3days' });
  }
  return null;
}
