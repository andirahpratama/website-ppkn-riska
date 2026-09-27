import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  Globe, 
  Zap, 
  RefreshCw, 
  History, 
  ShieldCheck, 
  Activity, 
  Terminal 
} from 'lucide-react';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isConfigured, setSupabaseCredentials } from '../lib/supabaseClient';
import { pingSupabase, getSupabasePingStatus } from '../lib/supabasePing';

export default function SupabaseModal({ isOpen, onClose }) {
  const [url, setUrl] = useState(SUPABASE_URL || '');
  const [key, setKey] = useState(SUPABASE_ANON_KEY || '');
  const [activeTab, setActiveTab] = useState('ping'); // 'ping' | 'credentials' | 'history' | 'cron'
  const [pingStatus, setPingStatus] = useState(() => getSupabasePingStatus());
  const [isPinging, setIsPinging] = useState(false);
  const [pingFeedback, setPingFeedback] = useState(null);

  // Sync ping status on event
  useEffect(() => {
    if (!isOpen) return;

    const handlePingUpdated = () => {
      setPingStatus(getSupabasePingStatus());
    };

    window.addEventListener('supabase-ping-updated', handlePingUpdated);
    return () => window.removeEventListener('supabase-ping-updated', handlePingUpdated);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    setSupabaseCredentials(url, key);
  };

  const handleResetCredentials = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kredensial Supabase dan kembali ke mode demo interaktif?')) {
      setSupabaseCredentials('', '');
    }
  };

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
        message: err.message || 'Terjadi kesalahan saat melakukan ping.',
        latency: 0
      });
    } finally {
      setIsPinging(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Belum pernah dilakukan';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return 'Belum pernah';
      return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' WIB';
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full shadow-2xl space-y-5 border border-slate-200 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              isConfigured ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Supabase & Auto-Ping Manager
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                  isConfigured 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {isConfigured ? 'Live Database' : 'Demo Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pemeliharaan otomatis siklus 3-hari agar akun Supabase tidak terjeda (auto-pause)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('ping')}
            className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ping'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${activeTab === 'ping' ? 'text-amber-500' : 'text-slate-400'}`} />
            <span>Uji & Ping Manual</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className={`w-3.5 h-3.5 ${activeTab === 'history' ? 'text-blue-500' : 'text-slate-400'}`} />
            <span>Riwayat Log ({pingStatus.history.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'credentials'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Key className={`w-3.5 h-3.5 ${activeTab === 'credentials' ? 'text-purple-500' : 'text-slate-400'}`} />
            <span>Kredensial API</span>
          </button>

          <button
            onClick={() => setActiveTab('cron')}
            className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'cron'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className={`w-3.5 h-3.5 ${activeTab === 'cron' ? 'text-emerald-500' : 'text-slate-400'}`} />
            <span>Cloud Cron</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm">

          {/* TAB 1: UJI & PING MANUAL */}
          {activeTab === 'ping' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Highlight Status Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3 shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="font-extrabold text-sm text-slate-100">Status Keep-Alive Supabase</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-emerald-300 border border-white/10">
                    Siklus Otomatis: 3 Hari Sekali
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-slate-400 font-medium">Ping Terakhir</p>
                    <p className="font-bold text-white mt-0.5">
                      {formatDate(pingStatus.lastPingTime)}
                    </p>
                    {pingStatus.lastPingLatency !== null && (
                      <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                        ⚡ Latensi Respons: {pingStatus.lastPingLatency} ms
                      </p>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-slate-400 font-medium">Jadwal Auto-Ping Berikutnya</p>
                    <p className="font-bold text-amber-300 mt-0.5">
                      {formatDate(pingStatus.nextPingTime)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {pingStatus.isDueForPing ? '⚠️ Siap dijalankan saat ini' : '✅ Aman dari auto-pause 7 hari'}
                    </p>
                  </div>
                </div>

                {/* Big Action Button */}
                <button
                  type="button"
                  onClick={handleManualPing}
                  disabled={isPinging || !isConfigured}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all shadow-md ${
                    !isConfigured
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : isPinging
                      ? 'bg-amber-500 text-slate-950 cursor-wait'
                      : 'bg-gold-400 hover:bg-gold-300 text-slate-950 active:scale-[0.99] hover:shadow-gold-500/20'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${isPinging ? 'animate-spin' : ''}`} />
                  <span>{isPinging ? 'Sedang Melakukan Ping ke Supabase...' : '⚡ Kirim Ping Manual Sekarang'}</span>
                </button>
              </div>

              {/* Ping Feedback Banner */}
              {pingFeedback && (
                <div className={`p-4 rounded-2xl border flex items-start gap-3 animate-fadeIn ${
                  pingFeedback.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-red-50 border-red-300 text-red-950'
                }`}>
                  {pingFeedback.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-extrabold text-xs sm:text-sm">
                      {pingFeedback.success ? 'Ping Berhasil Diterima Supabase!' : 'Ping Gagal'}
                    </p>
                    <p className="text-xs text-slate-700">
                      {pingFeedback.message}
                    </p>
                    {pingFeedback.latency > 0 && (
                      <p className="text-[11px] font-bold text-slate-500">
                        Waktu Tanggap Server: {pingFeedback.latency} ms
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Explanatory Guide Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mengapa Ping Rutin 3 Hari Ini Sangat Penting?</span>
                </p>
                <p className="leading-relaxed">
                  Akun gratis (Free Tier) di <strong>Supabase</strong> secara otomatis akan <em>paused</em> (terjeda/tidur) apabila tidak ada query atau request API selama <strong>7 hari berturut-turut</strong>.
                </p>
                <p className="leading-relaxed">
                  Fitur ini secara otomatis mengirim query ringan ke database setiap <strong>3 hari sekali</strong>, sehingga timer 7 hari tersebut di-reset kembali ke awal dan database website Ruang PPKn Anda selalu siap diakses oleh siswa dan pengunjung.
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: RIWAYAT LOG PING */}
          {activeTab === 'history' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-1">
                <p className="font-bold text-slate-800 text-xs">
                  Riwayat 15 Aktivitas Ping Terakhir
                </p>
                <button
                  onClick={() => {
                    localStorage.removeItem('supabase_ping_history');
                    setPingStatus(getSupabasePingStatus());
                  }}
                  className="text-[11px] text-red-600 hover:underline font-semibold"
                >
                  Bersihkan Log
                </button>
              </div>

              {pingStatus.history.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                  Belum ada log ping yang tercatat. Silakan klik tombol <strong>"Kirim Ping Manual Sekarang"</strong> untuk menguji.
                </div>
              ) : (
                <div className="space-y-2">
                  {pingStatus.history.map((item, idx) => (
                    <div 
                      key={item.id || idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          item.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-bold text-slate-900">
                            {formatDate(item.timestamp)}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {item.message || (item.status === 'success' ? 'Ping berhasil' : 'Gagal')}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          item.type === 'manual' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type === 'manual' ? 'Manual (Admin)' : 'Otomatis 3-Hari'}
                        </span>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                          {item.latency} ms
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KREDENSIAL API */}
          {activeTab === 'credentials' && (
            <form onSubmit={handleSaveCredentials} className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                Kredensial disimpan secara aman di browser/environment proyek Anda dan digunakan untuk menghubungkan formulir pertanyaan, kuis realtime, serta keep-alive database.
              </div>

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
                  <span>Simpan Kredensial</span>
                </button>
                {isConfigured && (
                  <button
                    type="button"
                    onClick={handleResetCredentials}
                    className="px-4 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          )}

          {/* TAB 4: CLOUD CRON (GITHUB ACTIONS) */}
          {activeTab === 'cron' && (
            <div className="space-y-3.5 animate-fadeIn text-xs text-slate-600">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span>Keep-Alive Cloud 24/7 (Tanpa Perlu Membuka Web)</span>
                </p>
                <p className="text-xs leading-relaxed text-blue-800">
                  File workflow GitHub Actions telah otomatis ditambahkan di folder <code>.github/workflows/keep-supabase-alive.yml</code>.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-800">
                  Cara Mengaktifkan Cron Otomatis di GitHub:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1 leading-relaxed">
                  <li>Buka repository GitHub Anda &gt; <strong>Settings</strong> &gt; <strong>Secrets and variables</strong> &gt; <strong>Actions</strong>.</li>
                  <li>Buat Repository Secret baru:
                    <ul className="list-disc list-inside pl-4 text-slate-700 font-mono text-[11px] mt-1 space-y-0.5">
                      <li><code>VITE_SUPABASE_URL</code> : isi dengan URL Supabase Anda</li>
                      <li><code>VITE_SUPABASE_ANON_KEY</code> : isi dengan Anon Key Supabase Anda</li>
                    </ul>
                  </li>
                  <li>Selesai! GitHub Actions akan secara otomatis menjalankan ping setiap 3 hari sekali (pukul 03:00 UTC / 10:00 WIB) di server cloud GitHub secara gratis.</li>
                </ol>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[11px] space-y-1 overflow-x-auto">
                <p className="text-gold-400 font-bold"># Uji Ping Langsung dari Terminal Lokal:</p>
                <p className="text-white">npm run ping:supabase</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
