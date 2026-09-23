import React from 'react';
import GamificationZone from '../components/GamificationZone';
import { Gamepad2, Sparkles } from 'lucide-react';

export default function GamePage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-gradient-to-r from-amber-700 via-gold-600 to-amber-800 rounded-3xl p-8 sm:p-10 text-white shadow-soft-lg border border-gold-400/40">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/30 text-white text-xs font-bold border border-white/20">
              <Gamepad2 className="w-3.5 h-3.5 text-gold-300" />
              <span>Zona Gamifikasi & Karakter</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Permainan Edukatif Nilai Pancasila
            </h1>
            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed">
              Pelajari makna filosofis simbol Garuda Pancasila, uji keberanian moralmu saat menyelesaikan skenario dilema di Misi Nusantara, dan pantau prestasimu di papan peringkat pelajar!
            </p>
          </div>
        </div>
      </div>

      {/* Main Gamification Component */}
      <GamificationZone />
    </div>
  );
}
