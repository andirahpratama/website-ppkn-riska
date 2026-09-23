import { createClient } from '@supabase/supabase-js';

// Ambil kredensial dari environment variable Vite atau localStorage (jika diinput manual lewat dialog di UI)
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('custom_supabase_url') || '' : '';
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('custom_supabase_anon_key') || '' : '';

export const SUPABASE_URL = storedUrl || envUrl;
export const SUPABASE_ANON_KEY = storedKey || envKey;

export const isConfigured = Boolean(
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  SUPABASE_URL.startsWith('http') && 
  !SUPABASE_URL.includes('your-project')
);

export const supabase = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/**
 * Simpan atau perbarui kredensial Supabase secara langsung dari antarmuka
 */
export function setSupabaseCredentials(url, key) {
  if (typeof window !== 'undefined') {
    if (url && key) {
      localStorage.setItem('custom_supabase_url', url.trim());
      localStorage.setItem('custom_supabase_anon_key', key.trim());
    } else {
      localStorage.removeItem('custom_supabase_url');
      localStorage.removeItem('custom_supabase_anon_key');
    }
    window.location.reload();
  }
}
