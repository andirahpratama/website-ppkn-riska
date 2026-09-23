import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Download, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  ExternalLink, 
  FileText,
  Eye,
  X
} from 'lucide-react';
import { portfolioData } from '../data/ppknData';

export default function PortfolioSection() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [downloadAlert, setDownloadAlert] = useState(null);

  const handleDownloadSimulation = (title) => {
    setDownloadAlert(title);
    setTimeout(() => {
      setDownloadAlert(null);
    }, 3500);
  };

  return (
    <section id="portofolio" className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
            <Award className="w-3.5 h-3.5 text-gold-700" />
            <span>Praktik Baik & Inovasi Pembelajaran</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Portofolio Guru & Proyek P5 Nusantara
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Dokumentasi nyata kegiatan Penguatan Profil Pelajar Pancasila (P5), perangkat ajar Kurikulum Merdeka, serta sertifikasi kompetensi pendidik profesional.
          </p>
        </div>

        {/* Download Success Toast Alert */}
        {downloadAlert && (
          <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-soft-lg border border-slate-700 max-w-sm flex items-start gap-3 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-white">Unduhan Berhasil Disiapkan!</p>
              <p className="text-slate-300 mt-0.5 font-medium">{downloadAlert}</p>
            </div>
          </div>
        )}

        {/* 1. DOKUMENTASI PROYEK P5 SISWA */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Dokumentasi Proyek P5 (Profil Pelajar Pancasila)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Karya nyata kolaboratif siswa SMP binaan Bu Riska Puspita
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.p5Projects.map((project) => (
              <div
                key={project.id}
                className="bg-surface-ground rounded-3xl p-6 border border-slate-200/90 shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Theme Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-patriot-50 text-patriot-700 border border-patriot-200">
                      {project.theme}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {project.date}
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {project.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-200/80 space-y-2">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-semibold">
                      Dampak: {project.impact}
                    </p>
                  </div>
                  <span className="inline-block text-[11px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {project.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MODUL AJAR & PERANGKAT PEMBELAJARAN */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Modul Ajar Kurikulum Merdeka Fase D (SMP)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Dapat diunduh dan dipelajari oleh siswa maupun rekan guru se-Indonesia
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.modules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gold-100 text-gold-900 border border-gold-300">
                      {mod.grade}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {mod.format}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {mod.title}
                  </h4>

                  <div className="p-3 rounded-2xl bg-slate-50 text-xs text-slate-600 leading-relaxed font-medium">
                    {mod.features}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedModule(mod)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Pratinjau</span>
                  </button>
                  <button
                    onClick={() => handleDownloadSimulation(mod.title)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-gold-400" />
                    <span>Unduh Modul</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SERTIFIKASI & KOMPETENSI GURU */}
        <div className="bg-gradient-to-r from-amber-50/60 via-gold-50/40 to-slate-50 p-6 sm:p-8 rounded-3xl border border-gold-200/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Sertifikasi & Kredensial Pendidik
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Komitmen berkelanjutan Bu Riska dalam meningkatkan mutu pendidikan kewarganegaraan
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">
              Terverifikasi Nasional
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {portfolioData.certificates.map((cert, cIdx) => (
              <div key={cIdx} className="bg-white p-4 rounded-2xl border border-slate-200/90 flex items-center gap-3 shadow-soft-sm">
                <div className="w-8 h-8 rounded-xl bg-gold-400 text-slate-950 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Pratinjau Modul */}
        {selectedModule && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-5 border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-100 text-gold-900">
                  {selectedModule.grade} • {selectedModule.format}
                </span>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900">
                  {selectedModule.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Penyusun: Riska Puspita, S.Pd.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 space-y-2 text-xs text-slate-700">
                <p className="font-bold text-slate-900">Cakupan Isi Modul:</p>
                <p>{selectedModule.features}</p>
                <p className="pt-2 text-slate-500 italic">{selectedModule.downloadNote}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    handleDownloadSimulation(selectedModule.title);
                    setSelectedModule(null);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Mulai Unduh PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
