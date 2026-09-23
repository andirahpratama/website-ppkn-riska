import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  FileText, 
  Star, 
  CheckCircle, 
  Eye, 
  Sparkles, 
  BookOpen, 
  Check, 
  X,
  FileCheck,
  ShieldCheck,
  FolderArchive
} from 'lucide-react';
import { getStoredBankSoalDownloads, getStoredPageSettings } from '../data/ppknData';

export default function QuestionBankPage() {
  const [downloadItems, setDownloadItems] = useState(() => getStoredBankSoalDownloads());
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [downloadAlert, setDownloadAlert] = useState(null);

  const pageSettings = getStoredPageSettings();

  const filteredItems = downloadItems.filter(item => {
    const matchGrade = selectedGrade === 'all' || item.grade.includes(selectedGrade);
    const matchFormat = selectedFormat === 'all' || item.format.toLowerCase().includes(selectedFormat.toLowerCase());
    const matchSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchFormat && matchSearch;
  });

  const handleDownload = (item) => {
    // Tambah counter download di state lokal
    setDownloadItems(prev => prev.map(p => p.id === item.id ? { ...p, downloadCount: p.downloadCount + 1 } : p));
    setDownloadAlert(`Mengunduh berkas: ${item.title}`);
    setTimeout(() => {
      setDownloadAlert(null);
    }, 4000);
  };

  return (
    <div className="pt-24 pb-20 bg-surface-ground min-h-screen">
      
      {/* Toast Alert Unduhan */}
      {downloadAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-soft-lg border border-slate-700 max-w-sm flex items-start gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-white">Unduhan Berhasil Dimulai!</p>
            <p className="text-slate-300 mt-0.5 line-clamp-2">{downloadAlert}</p>
            <p className="text-[10px] text-gold-400 font-semibold mt-1">Format Word siap Anda edit sesuai kebutuhan sekolah.</p>
          </div>
        </div>
      )}

      {/* Header Banner ala Marketplace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portal Berbagi Perangkat Evaluasi Guru</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {pageSettings.bankSoal?.heroTitle || 'Katalog Bank Soal PPKn SMP'}
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed">
              {pageSettings.bankSoal?.heroSubtitle || 'Perangkat evaluasi dan paket soal sumatif, formatif, serta latihan ujian sekolah yang dapat diunduh bebas oleh seluruh guru PPKn se-Indonesia untuk kemajuan pendidikan anak bangsa.'}
            </p>

            {/* Marketplace Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-gold-400">
                <Check className="w-4 h-4 text-emerald-400" /> 100% Gratis Tanpa Biaya
              </span>
              <span className="flex items-center gap-1.5 text-gold-400">
                <Check className="w-4 h-4 text-emerald-400" /> Format Word (.docx) Siap Edit
              </span>
              <span className="flex items-center gap-1.5 text-gold-400">
                <Check className="w-4 h-4 text-emerald-400" /> Kurikulum Merdeka Fase D
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Marketplace Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-soft flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari paket soal, contoh: Sumatif, PAS, Kelas 7..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua Kelas</option>
              <option value="7">Kelas 7 SMP</option>
              <option value="8">Kelas 8 SMP</option>
              <option value="9">Kelas 9 SMP</option>
            </select>

            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">Semua Format</option>
              <option value="word">Word (.DOCX)</option>
              <option value="pdf">PDF Dokumen</option>
              <option value="zip">ZIP Bundle</option>
            </select>

            <span className="text-xs font-bold text-slate-500 pl-2">
              Menampilkan: <strong className="text-slate-900">{filteredItems.length} Paket</strong>
            </span>
          </div>

        </div>

        {/* Marketplace Grid of Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              
              {/* Product Visual Top Banner */}
              <div className="p-6 pb-4 space-y-4">
                
                {/* Header Badges */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                    GRATIS
                  </span>
                  
                  <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700">
                    {item.grade}
                  </span>
                </div>

                {/* Product Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-patriot-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Disusun oleh: <strong className="text-slate-700">{pageSettings.general?.teacherName || 'Riska Puspita, S.Pd.'}</strong>
                  </p>
                </div>

                {/* Rating & Downloads count */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-gold-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-gold-400" />
                    <span>{item.rating}</span>
                    <span className="text-slate-400 font-normal">({item.reviews || 95} ulasan)</span>
                  </div>

                  <span className="text-slate-500 font-semibold text-[11px]">
                    {item.downloadCount} kali diunduh
                  </span>
                </div>

                {/* Brief description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* File Specs Pill */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-bold text-slate-700">{item.format}</span>
                  <span>Ukuran: {item.fileSize}</span>
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-soft-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Detail & Kisi-Kisi</span>
                </button>

                <button
                  onClick={() => handleDownload(item)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-soft hover:shadow-glow-gold"
                >
                  <Download className="w-3.5 h-3.5 text-gold-400" />
                  <span>Unduh Gratis</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal Detail & Pratinjau Soal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-soft-lg space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                100% Download Gratis untuk Guru
              </span>
              <button onClick={() => setActiveModalItem(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {activeModalItem.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Sasaran: {activeModalItem.grade} • {activeModalItem.semester} • Format: {activeModalItem.format}
              </p>
            </div>

            {/* Kelengkapan Berkas */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-gold-700" />
                <span>Kelengkapan di Dalam Paket Berkas:</span>
              </p>
              <ul className="space-y-1 text-slate-700 font-medium pl-5 list-disc">
                <li>Naskah Soal Pilihan Ganda & Uraian Lengkap</li>
                <li>Kisi-Kisi Penulisan Soal dan Sebaran Capaian Pembelajaran (CP)</li>
                <li>Kunci Jawaban Objektif dan Pedoman Penskoran Rubrik</li>
                <li>Format Dokumen Microsoft Word (.DOCX) yang 100% bebas diedit sesuai logo/kop sekolah masing-masing</li>
              </ul>
            </div>

            {/* Materi Cakupan */}
            <div className="space-y-1.5 text-xs">
              <p className="font-bold text-slate-700">Topik Materi yang Diujikan:</p>
              <div className="flex flex-wrap gap-1.5">
                {(activeModalItem.topics || []).map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveModalItem(null)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handleDownload(activeModalItem);
                  setActiveModalItem(null);
                }}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-soft"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Sekarang (Gratis)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
