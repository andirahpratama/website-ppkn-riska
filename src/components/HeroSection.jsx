import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpenCheck, 
  ShieldCheck, 
  Award, 
  Heart, 
  Compass, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { teacherProfile } from '../data/ppknData';

const slogans = [
  "Bukan Sekadar Hafalan, Ini Nilai Hidup Kita!",
  "Belajar Konstitusi Jadi Seru & Mudah Dipahami.",
  "Membentuk Karakter Generasi Emas Berjiwa Pancasila.",
  "Gotong Royong, Toleransi, dan Berintegritas Sejak SMP."
];

export default function HeroSection() {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  // Typewriter effect
  useEffect(() => {
    const fullText = slogans[currentSloganIndex];
    let timer;

    if (!isDeleting && displayText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
      setTypingSpeed(60);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting 
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1);
        setDisplayText(nextText);
        setTypingSpeed(isDeleting ? 30 : 65);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentSloganIndex, typingSpeed]);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Decorative Circles / National Aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
        <div className="absolute top-0 right-10 w-72 h-72 rounded-full bg-gold-200/40 blur-3xl animate-pulse-glow" />
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-patriot-100/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Typewriter */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-300 shadow-soft text-xs sm:text-sm font-semibold text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-patriot-600 animate-ping" />
              <span className="text-patriot-700 font-bold">Portal Resmi Pembelajaran</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">Fase D Kurikulum Merdeka</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Ruang Eksplorasi PPKn: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-patriot-700 via-patriot-600 to-gold-600">
                Pendidikan Pancasila
              </span> <br />
              yang Nyata, Dekat & Seru!
            </h1>

            {/* Typewriter Slogan Box */}
            <div className="min-h-[48px] sm:min-h-[56px] flex items-center justify-center lg:justify-start">
              <div className="px-4 py-2 rounded-2xl bg-white/90 border border-slate-200/90 shadow-soft-sm inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500 shrink-0" />
                <p className="text-base sm:text-xl font-bold text-slate-800">
                  {displayText}
                  <span className="animate-pulse text-patriot-600 font-extrabold">|</span>
                </p>
              </div>
            </div>

            {/* Authentic Teacher's Introduction */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Selamat datang di portal belajar interaktif bersama <strong>{teacherProfile.name}</strong>. Di sini, kita belajar hukum, konstitusi, dan hak-kewajiban warga negara melalui studi kasus nyata, arena kuis berwaktu, dan tantangan gamifikasi yang memacu nalar kritis!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/bank-soal"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-patriot-600 to-patriot-700 text-white font-bold text-base shadow-soft hover:shadow-glow-patriot hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <BookOpenCheck className="w-5 h-5" />
                <span>Buka Bank Soal SMP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/kuis"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-900 font-bold text-base shadow-soft hover:shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <Flame className="w-5 h-5 text-patriot-700" />
                <span>Mulai Kuis Kilat 20 Detik</span>
              </Link>
            </div>

            {/* Quick Metrics Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              {teacherProfile.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-soft-sm">
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Teacher Profile Card (Interactive Parallax / Floating) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-400 via-patriot-500 to-gold-500 rounded-3xl blur-xl opacity-30 animate-pulse-glow" />

              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold-100 text-gold-900 border border-gold-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-700" />
                    Pendidik Profesional
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    PPKn SMP
                  </span>
                </div>

                {/* Teacher Avatar Visual & Name */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-br from-patriot-600 via-gold-400 to-patriot-700 shadow-soft-lg">
                      <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                        <span className="text-4xl font-extrabold text-gold-300">RP</span>
                        <span className="text-[11px] font-semibold tracking-wider text-slate-300 mt-1">RISKA PUSPITA</span>
                      </div>
                    </div>

                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow-soft flex items-center justify-center border-2 border-white">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {teacherProfile.name}
                  </h3>
                  <p className="text-sm font-semibold text-patriot-700">
                    {teacherProfile.role}
                  </p>
                </div>

                {/* Inspiring Motto Quote */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center">
                  <p className="text-xs sm:text-sm italic font-medium text-slate-700 leading-snug">
                    {teacherProfile.motto}
                  </p>
                </div>

                {/* Profile Highlights List */}
                <div className="space-y-2 pt-1">
                  {teacherProfile.badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                      <Award className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Link to Profile Page */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    to="/profil" 
                    className="text-xs font-bold text-patriot-700 hover:text-patriot-800 flex items-center gap-1 group"
                  >
                    <span>Buka Halaman Profil Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-xs text-slate-400">Kurikulum Merdeka</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
