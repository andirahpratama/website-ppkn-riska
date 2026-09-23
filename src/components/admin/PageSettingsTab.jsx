import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Globe, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Sparkles,
  ShoppingBag,
  BookOpen
} from 'lucide-react';
import { getStoredPageSettings, saveStoredPageSettings } from '../../data/ppknData';

export default function PageSettingsTab({ onSettingsUpdated }) {
  const [settings, setSettings] = useState(() => getStoredPageSettings());
  const [activeSubTab, setActiveSubTab] = useState('contact'); // 'contact' | 'home' | 'bankSoal' | 'products'
  const [savedAlert, setSavedAlert] = useState(false);

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
