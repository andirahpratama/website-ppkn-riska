import React from 'react';
import PortfolioSection from '../components/PortfolioSection';
import { Award, BookOpenCheck } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-soft-lg border border-teal-800/40">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>Praktik Baik Kurikulum Merdeka</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Portofolio Guru & Dokumentasi P5 Nusantara
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              Kumpulan dokumentasi proyek Penguatan Profil Pelajar Pancasila siswa, modul ajar terverifikasi yang dapat dipelajari bebas, dan inovasi pendidikan bersama Riska Puspita, S.Pd.
            </p>
          </div>
        </div>
      </div>

      {/* Main Portfolio Component */}
      <PortfolioSection />
    </div>
  );
}
