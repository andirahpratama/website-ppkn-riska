import React, { useState, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Globe, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  BookOpen,
  Database,
  RefreshCw,
  Key,
  Activity,
  Terminal,
  AlertCircle
} from 'lucide-react';
import { getStoredPageSettings, saveStoredPageSettings } from '../../data/ppknData';
import { isConfigured, SUPABASE_URL, SUPABASE_ANON_KEY, setSupabaseCredentials } from '../../lib/supabaseClient';
import { pingSupabase, getSupabasePingStatus } from '../../lib/supabasePing';

export default function PageSettingsTab({ onSettingsUpdated }) {
  const [settings, setSettings] = useState(() => getStoredPageSettings());
  const [activeSubTab, setActiveSubTab] = useState('contact'); // 'contact' | 'home' | 'bankSoal' | 'products' | 'database'
  const [savedAlert, setSavedAlert] = useState(false);

  // Supabase states
  const [dbUrl, setDbUrl] = useState(SUPABASE_URL || '');
  const [dbKey, setDbKey] = useState(SUPABASE_ANON_KEY || '');
  const [pingStatus, setPingStatus] = useState(() => getSupabasePingStatus());
  const [isPinging, setIsPinging] = useState(false);
  const [pingFeedback, setPingFeedback] = useState(null);

  useEffect(() => {
    const handlePingUpdated = () => {
      setPingStatus(getSupabasePingStatus());
    };
    window.addEventListener('supabase-ping-updated', handlePingUpdated);
    return () => window.removeEventListener('supabase-ping-updated', handlePingUpdated);
  }, []);

  const handleManualPing = async () => {
    setIsPinging(true);
    setPingFeedback(null);
    try {
      const result = await pingSupabase({ type: 'manual' });
      setPingFeedback(result);
      setPingStatus(getSupabasePingStatus());
    } catch (err) {
      setPingFeedback({
        success: false,
        message: err.message || 'Gagal melakukan ping ke Supabase.',
        latency: 0
      });
    } finally {
      setIsPinging(false);
    }
  };

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    setSupabaseCredentials(dbUrl, dbKey);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveStoredPageSettings(settings);
    if (onSettingsUpdated) onSettingsUpdated(settings);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const updateSection = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Pengaturan Konten Seluruh Halaman Website
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Atur teks judul, nomor WhatsApp, tautan sosial media, dan informasi halaman website secara mandiri
          </p>
        </div>

        {savedAlert && (
          <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Pengaturan berhasil disimpan dan langsung aktif!</span>
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab('contact')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'contact'
              ? 'bg-slate-900 text-white shadow-soft'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Kontak & Sosial Media</span>
        </button>

        <button
          onClick={() => setActiveSubTab('home')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'home'
              ? 'bg-slate-900 text-white shadow-soft'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <Globe className="w-4 h-4 text-gold-400" />
          <span>Halaman Beranda</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bankSoal')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'bankSoal'
              ? 'bg-slate-900 text-white shadow-soft'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>Halaman Bank Soal</span>
        </button>

        <button
          onClick={() => setActiveSubTab('products')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'products'
              ? 'bg-slate-900 text-white shadow-soft'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-patriot-400" />
          <span>Halaman Produk Digital</span>
        </button>

        <button
          onClick={() => setActiveSubTab('database')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'database'
              ? 'bg-slate-900 text-white shadow-soft'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <Database className="w-4 h-4 text-emerald-500" />
          <span>Database & Auto-Ping</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SUB-TAB 1: KONTAK & SOSIAL MEDIA */}
        {activeSubTab === 'contact' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Pengaturan Tautan Kontak & Media Sosial
              </h3>
              <p className="text-xs text-slate-500">
                Data ini akan otomatis muncul pada halaman Contact dan tombol pemesanan WhatsApp produk
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* WhatsApp Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nomor WhatsApp (Gunakan awalan 62) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={settings.contact?.whatsappNumber || ''}
                  onChange={(e) => updateSection('contact', 'whatsappNumber', e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold"
                />
                <p className="text-[10px] text-slate-400">Contoh format: 6281234567890 (tanpa spasi dan tanpa tanda +)</p>
              </div>

              {/* WhatsApp Display Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tampilan Nomor WA di Layar</label>
                <input
                  type="text"
                  value={settings.contact?.whatsappDisplay || ''}
                  onChange={(e) => updateSection('contact', 'whatsappDisplay', e.target.value)}
                  placeholder="+62 812-3456-7890"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Alamat Email Resmi *</span>
                </label>
                <input
                  type="email"
                  required
                  value={settings.contact?.email || ''}
                  onChange={(e) => updateSection('contact', 'email', e.target.value)}
                  placeholder="riska.puspita.ppkn@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Lokasi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-patriot-600" />
                  <span>Lokasi Sekolah / Pengabdian</span>
                </label>
                <input
                  type="text"
                  value={settings.contact?.location || ''}
                  onChange={(e) => updateSection('contact', 'location', e.target.value)}
                  placeholder="SMP Negeri Indonesia, Jawa Barat"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Instagram URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tautan Profil Instagram</label>
                <input
                  type="url"
                  value={settings.contact?.instagramUrl || ''}
                  onChange={(e) => updateSection('contact', 'instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/username_anda"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* YouTube URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tautan Kanal YouTube</label>
                <input
                  type="url"
                  value={settings.contact?.youtubeUrl || ''}
                  onChange={(e) => updateSection('contact', 'youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/@channel_anda"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* TikTok URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tautan Akun TikTok</label>
                <input
                  type="url"
                  value={settings.contact?.tiktokUrl || ''}
                  onChange={(e) => updateSection('contact', 'tiktokUrl', e.target.value)}
                  placeholder="https://tiktok.com/@akun_anda"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Catatan Jam Layanan WA */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Catatan Waktu Pelayanan</label>
                <input
                  type="text"
                  value={settings.contact?.whatsappNote || ''}
                  onChange={(e) => updateSection('contact', 'whatsappNote', e.target.value)}
                  placeholder="Senin - Jumat: 08.00 - 16.00 WIB"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                />
              </div>

            </div>
          </div>
        )}

        {/* SUB-TAB 2: HALAMAN BERANDA */}
        {activeSubTab === 'home' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Pengaturan Teks Halaman Beranda (Home)
              </h3>
              <p className="text-xs text-slate-500">
                Ubah identitas umum dan teks yang muncul di navbar dan banner utama
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Website / Brand</label>
                <input
                  type="text"
                  value={settings.general?.siteName || ''}
                  onChange={(e) => updateSection('general', 'siteName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Guru Pengampu</label>
                <input
                  type="text"
                  value={settings.general?.teacherName || ''}
                  onChange={(e) => updateSection('general', 'teacherName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 3: HALAMAN BANK SOAL */}
        {activeSubTab === 'bankSoal' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Pengaturan Banner Halaman Bank Soal
              </h3>
              <p className="text-xs text-slate-500">
                Kustomisasi teks banner marketplace download gratis bank soal
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Judul Utama Halaman Bank Soal</label>
                <input
                  type="text"
                  value={settings.bankSoal?.heroTitle || ''}
                  onChange={(e) => updateSection('bankSoal', 'heroTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Deskripsi Sub-Judul Halaman Bank Soal</label>
                <textarea
                  rows={3}
                  value={settings.bankSoal?.heroSubtitle || ''}
                  onChange={(e) => updateSection('bankSoal', 'heroSubtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 4: HALAMAN PRODUK DIGITAL */}
        {activeSubTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Pengaturan Banner Halaman Produk Digital
              </h3>
              <p className="text-xs text-slate-500">
                Kustomisasi teks pengantar etalase marketplace produk digital
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Judul Utama Halaman Produk</label>
                <input
                  type="text"
                  value={settings.products?.heroTitle || ''}
                  onChange={(e) => updateSection('products', 'heroTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Deskripsi Sub-Judul Halaman Produk</label>
                <textarea
                  rows={3}
                  value={settings.products?.heroSubtitle || ''}
                  onChange={(e) => updateSection('products', 'heroSubtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 5: DATABASE & AUTO-PING SUPABASE */}
        {activeSubTab === 'database' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <span>Koneksi Supabase & Pemeliharaan Database (Auto-Ping)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Kirim sinyal ping setiap 3 hari sekali agar akun Supabase gratis tidak terjeda (auto-pause 7-hari)
                </p>
              </div>

              <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                isConfigured 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {isConfigured ? 'Supabase Live' : 'Mode Demo'}
              </span>
            </div>

            {/* Quick Ping Panel */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="font-extrabold text-sm text-slate-100">Status Keep-Alive & Auto-Ping</span>
                </div>
                <span className="text-[11px] font-semibold text-gold-300 bg-white/10 px-2.5 py-0.5 rounded-full w-fit">
                  Siklus Otomatis: Tiap 3 Hari Sekali
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <p className="text-[11px] text-slate-400 font-medium">Ping Terakhir Dijalankan</p>
                  <p className="font-bold text-white text-xs sm:text-sm">
                    {pingStatus.lastPingTime ? new Date(pingStatus.lastPingTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB' : 'Belum pernah'}
                  </p>
                  {pingStatus.lastPingLatency !== null && (
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      ⚡ Latensi: {pingStatus.lastPingLatency} ms
                    </p>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <p className="text-[11px] text-slate-400 font-medium">Jadwal Ping Otomatis Berikutnya</p>
                  <p className="font-bold text-amber-300 text-xs sm:text-sm">
                    {pingStatus.nextPingTime ? new Date(pingStatus.nextPingTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB' : 'Siap saat ini'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {pingStatus.isDueForPing ? '⚠️ Siap dijalankan' : '✅ Aman dari auto-pause 7-hari'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleManualPing}
                disabled={isPinging || !isConfigured}
                className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  !isConfigured
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : isPinging
                    ? 'bg-amber-500 text-slate-950 cursor-wait'
                    : 'bg-gold-400 hover:bg-gold-300 text-slate-950 active:scale-[0.99]'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{isPinging ? 'Sedang Melakukan Ping ke Supabase...' : '⚡ Kirim Ping Manual Sekarang'}</span>
              </button>
            </div>

            {/* Ping Feedback */}
            {pingFeedback && (
              <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 animate-fadeIn ${
                pingFeedback.success
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-red-50 border-red-300 text-red-950'
              }`}>
                {pingFeedback.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-extrabold">{pingFeedback.success ? 'Ping Berhasil!' : 'Ping Gagal'}</p>
                  <p className="text-slate-700 mt-0.5">{pingFeedback.message}</p>
                  {pingFeedback.latency > 0 && (
                    <p className="text-slate-500 font-bold mt-1 text-[11px]">Waktu respons: {pingFeedback.latency} ms</p>
                  )}
                </div>
              </div>
            )}

            {/* Credentials Form Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-600" />
                <span>Pengaturan Kredensial Supabase</span>
              </h4>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Project URL Supabase</label>
                  <input
                    type="url"
                    placeholder="https://xyzcompany.supabase.co"
                    value={dbUrl}
                    onChange={(e) => setDbUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Anon Public Key</label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={dbKey}
                    onChange={(e) => setDbKey(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleSaveCredentials}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5 text-gold-400" />
                    <span>Terapkan Kredensial Supabase</span>
                  </button>
                  {isConfigured && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Reset kredensial ke mode interaktif demo?')) {
                          setSupabaseCredentials('', '');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Cloud Cron Info */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1.5">
              <p className="font-extrabold flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>Otomatisasi Cron Cloud (GitHub Actions)</span>
              </p>
              <p className="text-blue-800 leading-relaxed">
                Workflow <code>.github/workflows/keep-supabase-alive.yml</code> sudah tersedia di kode proyek. Masukkan secret <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code> di repository GitHub untuk menjalankan ping terjadwal 3-harian tanpa perlu membuka browser!
              </p>
            </div>

          </div>
        )}

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-soft flex items-center gap-2 transition-all hover:shadow-glow-gold"
          >
            <Save className="w-4 h-4 text-gold-400" />
            <span>Simpan Semua Pengaturan Halaman</span>
          </button>
        </div>

      </form>

    </div>
  );
}
