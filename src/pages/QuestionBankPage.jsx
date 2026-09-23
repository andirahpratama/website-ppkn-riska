import React from 'react';
import QuestionBank from '../components/QuestionBank';
import { BookOpen, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuestionBankPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-soft-lg border border-indigo-800/50">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pusat Latihan Mandiri SMP</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Bank Soal Pendidikan Pancasila & Kewarganegaraan
            </h1>
            <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed">
              Mencakup materi Kurikulum Merdeka Fase D untuk Kelas 7, 8, dan 9. Gunakan filter di bawah untuk memilih bab yang sedang kamu pelajari, lalu periksa kunci dan ulasan pedagogisnya.
            </p>
          </div>
        </div>
      </div>

      {/* Main Question Bank Component */}
      <QuestionBank />

      {/* Tips Belajar dari Bu Riska */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
          <div className="flex items-center gap-2 text-gold-700 font-black text-xs uppercase tracking-wider mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>Petunjuk Guru</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4">
            3 Tips Menguasai Soal Penalaran PPKn SMP
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">1. Pahami Konteks Kasus</p>
              <p>Soal PPKn modern berbentuk studi kasus nyata. Cari tahu apa masalah sosial atau hukum yang sedang terjadi pada cerita soal.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">2. Hubungkan dengan Nilai Sila</p>
              <p>Identifikasi apakah kasus tersebut berkaitan dengan toleransi (Sila 1), kemanusiaan (Sila 2), persatuan (Sila 3), atau musyawarah (Sila 4).</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">3. Uji Ketangkasan di Kuis Kilat</p>
              <p>Setelah memahami konsep di bank soal, uji kecepatan bernalarmu di kuis berwaktu 20 detik untuk meraih skor tinggi.</p>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-slate-100 flex justify-end">
            <Link
              to="/kuis"
              className="px-5 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors"
            >
              <span>Lanjut Uji Nyali di Arena Kuis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
