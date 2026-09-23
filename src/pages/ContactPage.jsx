import React from 'react';
import ContactSection from '../components/ContactSection';
import { MessageSquare, Heart } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-soft-lg border border-purple-800/40">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ruang Sapa & Konsultasi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Pojok Tanya & Sapa Bu Riska Puspita
            </h1>
            <p className="text-purple-100/90 text-xs sm:text-sm leading-relaxed">
              Pintu komunikasi terbuka bagi siswa yang membutuhkan penjelasan tugas PPKn, rekan guru yang ingin berdiskusi perangkat ajar, dan orang tua siswa.
            </p>
          </div>
        </div>
      </div>

      {/* Main Contact Component */}
      <ContactSection />
    </div>
  );
}
