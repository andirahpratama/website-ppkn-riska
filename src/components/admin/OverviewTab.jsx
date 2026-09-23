import React from 'react';
import { 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';
import { isConfigured } from '../../lib/supabaseClient';

export default function OverviewTab({ 
  questions, 
  leaderboard, 
  consultations, 
  portfolio,
  onNavigateTab 
}) {
  const unreadMessagesCount = consultations.filter(c => c.status === 'Belum Dibaca').length;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-700 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selamat Datang, Bu Riska Puspita, S.Pd.</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black">
            Pusat Kendali Ruang PPKn Interaktif
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Pantau statistik kuis siswa, perbarui bank soal Kurikulum Merdeka, dan tanggapi pertanyaan siswa langsung dari dasbor ini.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab('questions')}
            className="px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs shadow-soft transition-all"
          >
            + Tambah Soal Baru
          </button>
          <button
            onClick={() => onNavigateTab('inquiries')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-gold-400" />
            <span>Lihat Pesan Siswa</span>
          </button>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigateTab('questions')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Bank Soal Aktif</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{questions.length}</p>
          <p className="text-xs text-slate-500 mt-1">Kelas 7, 8, & 9 Terdaftar</p>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigateTab('leaderboard')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Peringkat Siswa</span>
            <div className="w-10 h-10 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{leaderboard.length}</p>
          <p className="text-xs text-slate-500 mt-1">Siswa Terdata di Leaderboard</p>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Pojok Sapa Siswa</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform relative">
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping" />
              )}
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{consultations.length}</p>
          <p className="text-xs text-patriot-600 font-bold mt-1">
            {unreadMessagesCount} pesan belum dibaca
          </p>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigateTab('portfolio')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Proyek P5 & Modul</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {(portfolio.p5Projects?.length || 0) + (portfolio.modules?.length || 0)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Dokumentasi Terpublikasi</p>
        </div>
      </div>

      {/* Two Column Feed: Leaderboard Top & Inquiries Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Top Students in Quiz */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold-500" />
              <h3 className="font-extrabold text-base text-slate-900">Top Skor Kuis Siswa</h3>
            </div>
            <button
              onClick={() => onNavigateTab('leaderboard')}
              className="text-xs font-bold text-patriot-600 hover:text-patriot-700 flex items-center gap-1"
            >
              <span>Kelola</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {leaderboard.slice(0, 5).map((item, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</p>
                    <p className="text-[11px] text-slate-500">{item.grade} • {item.school}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-patriot-700">{item.score} Poin</span>
                  <p className="text-[10px] text-slate-400 font-semibold">{item.badge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Inquiries */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <h3 className="font-extrabold text-base text-slate-900">Pertanyaan Masuk Terbaru</h3>
            </div>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-bold text-patriot-600 hover:text-patriot-700 flex items-center gap-1"
            >
              <span>Semua Pesan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {consultations.length === 0 ? (
            <p className="text-center py-8 text-xs text-slate-400">Belum ada pesan yang masuk dari siswa.</p>
          ) : (
            <div className="space-y-3">
              {consultations.slice(0, 3).map((inq, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{inq.student_name} ({inq.grade})</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      inq.status === 'Belum Dibaca' 
                        ? 'bg-red-100 text-red-800' 
                        : inq.status === 'Dalam Proses'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 italic">
                    "{inq.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
