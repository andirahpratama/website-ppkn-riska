import React from 'react';
import QuizArena from '../components/QuizArena';
import { Flame, Trophy, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-gradient-to-r from-patriot-900 via-red-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg border border-red-800/40 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400 text-slate-950 text-xs font-black">
            <Flame className="w-3.5 h-3.5 text-patriot-700" />
            <span>Tantangan 20 Detik</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Arena Kuis Ketangkasan PPKn SMP
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
            Jawab cepat dan tepat untuk merebut poin bonus waktu, memicu kembang api selebrasi, serta meraih lencana Pelajar Pancasila!
          </p>
        </div>
      </div>

      {/* Main Quiz Component */}
      <QuizArena />

      {/* Footer Link to Leaderboard */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 inline-flex items-center gap-3 shadow-soft-sm">
          <Trophy className="w-5 h-5 text-gold-500" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Ingin melihat siapa saja siswa dengan skor tertinggi saat ini?
          </span>
          <Link
            to="/game"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Buka Papan Peringkat</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
