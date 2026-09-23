import React, { useState } from 'react';
import { 
  Database, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  Globe, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isConfigured, setSupabaseCredentials } from '../lib/supabaseClient';

export default function SupabaseModal({ isOpen, onClose }) {
  const [url, setUrl] = useState(SUPABASE_URL || '');
  const [key, setKey] = useState(SUPABASE_ANON_KEY || '');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setSupabaseCredentials(url, key);
  };

  const handleReset = () => {
    setSupabaseCredentials('', '');
  };

  const copySqlHint = () => {
    navigator.clipboard.writeText('supabase_schema.sql');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-soft-lg space-y-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isConfigured ? 'bg-emerald-100 text-emerald-700' : 'bg-gold-100 text-gold-900'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Konfigurasi Database Supabase
              </h3>
              <p className="text-xs text-slate-500">
                {isConfigured ? 'Status: Terhubung secara Live ke Supabase' : 'Status: Mode Demo Interaktif Aktif (Fallback Lokal)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Alert Banner */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
          isConfigured 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          {isConfigured ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-bold">
              {isConfigured ? 'Supabase Aktif!' : 'Kredensial Belum Terpasang (Mode Demo Aktif)'}
            </p>
            <p className="mt-0.5 text-slate-700">
              {isConfigured 
                ? 'Website saat ini membaca & menyimpan leaderboard serta form pertanyaan langsung ke database Supabase Anda.' 
                : 'Jangan khawatir! Seluruh fitur kuis, bank soal, game, dan form tetap berfungsi 100% menggunakan data interaktif lokal.'}
            </p>
          </div>
        </div>

        {/* Input Form for Supabase Credentials */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Project URL Supabase (VITE_SUPABASE_URL)</span>
            </label>
            <input
              type="url"
              placeholder="https://xyzcompany.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              <span>Anon Public Key (VITE_SUPABASE_ANON_KEY)</span>
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4 text-gold-400" />
              <span>Terapkan Kredensial</span>
            </button>
            {isConfigured && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* SQL Schema helper note */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">
              Skrip Database Siap Pakai:
            </span>
            <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
              supabase_schema.sql
            </span>
          </div>
          <p className="leading-relaxed">
            File <strong>supabase_schema.sql</strong> sudah dibuat di folder proyek Anda. Buka Supabase &gt; SQL Editor &gt; New Query &gt; tempelkan isinya dan klik <strong>Run</strong> untuk membuat tabel secara otomatis!
          </p>
        </div>

      </div>
    </div>
  );
}
