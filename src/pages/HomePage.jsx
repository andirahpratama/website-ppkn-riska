import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { 
  BookOpen, 
  HelpCircle, 
  Gamepad2, 
  Award, 
  MessageSquare, 
  User, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Heart,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { teacherProfile } from '../data/ppknData';

export default function HomePage() {
  const exploreFeatures = [
    {
      title: "Bank Soal PPKn SMP",
      desc: "Latihan mandiri terstruktur untuk Kelas 7, 8, dan 9 dengan akordeon pembahasan pedagogis mendalam.",
      path: "/bank-soal",
      icon: BookOpen,
      badge: "Kurikulum Merdeka",
      color: "from-blue-600 to-indigo-700",
      cta: "Buka Bank Soal"
    },
    {
      title: "Arena Kuis Kilat 20 Detik",
      desc: "Tantangan kecepatan berpikir berwaktu. Rebut kembang api selebrasi dan klaim lencana digital kebanggaanmu.",
      path: "/kuis",
      icon: HelpCircle,
      badge: "Berhadiah Lencana",
      color: "from-gold-500 to-amber-600",
      cta: "Ikuti Tantangan"
    },
    {
      title: "Zona Gamifikasi Pancasila",
      desc: "Eksplorasi makna simbol 5 Sila dan selesaikan petualangan studi kasus moral remaja di Misi Nusantara.",
      path: "/game",
      icon: Gamepad2,
      badge: "Papan Peringkat Live",
      color: "from-patriot-600 to-red-700",
      cta: "Mainkan Sekarang"
    },
    {
      title: "Portofolio Guru & Proyek P5",
      desc: "Dokumentasi nyata kegiatan Profil Pelajar Pancasila, perangkat ajar modul Fase D, dan karya inovasi kelas.",
      path: "/portofolio",
      icon: Award,
      badge: "Praktik Baik",
      color: "from-emerald-600 to-teal-700",
      cta: "Lihat Galeri & Modul"
    },
    {
      title: "Profil & Jejak Dedikasi Guru",
      desc: "Kisah perjalanan Bu Riska dari bangku kuliah pendidikan keguruan hingga pelopor media belajar PPKn interaktif.",
      path: "/profil",
      icon: User,
      badge: "Mengenal Pendidik",
      color: "from-slate-800 to-slate-900",
      cta: "Baca Rekam Jejak"
    },
    {
      title: "Pojok Tanya & Sapa Bu Riska",
      desc: "Ruang konsultasi tugas sekolah bagi siswa, diskusi materi kewarganegaraan, dan tautan media sosial edukasi.",
      path: "/kontak",
      icon: MessageSquare,
      badge: "Ramah Siswa",
      color: "from-purple-600 to-indigo-800",
      cta: "Kirim Pertanyaan"
    },
  ];

  const dimensiPancasila = [
    "Beriman & Bertakwa",
    "Berkebinekaan Global",
    "Bergotong Royong",
    "Mandiri",
    "Bernalar Kritis",
    "Kreatif"
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Menu Akses Cepat per Halaman */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-700" />
              <span>Ruang Belajar Mandiri</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pilih Halaman Pembelajaranmu
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Setiap halaman dirancang khusus dengan fitur interaktif lengkap agar kamu dapat fokus belajar sesuai kebutuhanmu hari ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface-ground rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 shadow-soft-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6 text-patriot-700" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-soft-sm">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-patriot-700 transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-200/80">
                    <Link
                      to={feat.path}
                      className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-900 text-slate-900 hover:text-white font-bold text-xs sm:text-sm border border-slate-200 shadow-soft-sm transition-all flex items-center justify-between group/btn"
                    >
                      <span>{feat.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. 6 Dimensi Profil Pelajar Pancasila Banner */}
      <section className="py-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Fondasi Karakter Bangsa
            </span>
            <h3 className="text-xl sm:text-3xl font-black">
              6 Dimensi Profil Pelajar Pancasila
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Nilai luhur yang selalu kita asah dalam setiap materi dan aktivitas belajar PPKn.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {dimensiPancasila.map((dim, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center space-y-2 hover:border-gold-400/60 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gold-400 text-slate-950 text-xs font-black mx-auto flex items-center justify-center">
                  {i + 1}
                </div>
                <p className="text-xs font-bold text-slate-200">{dim}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Teacher Invitation / Warm Sapaan */}
      <section className="py-16 bg-surface-ground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-gold-50/60 rounded-3xl p-8 sm:p-10 border border-gold-200/80 shadow-soft flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-3xl bg-slate-900 text-gold-400 flex items-center justify-center font-black text-3xl shadow-soft shrink-0">
              RP
            </div>
            <div className="space-y-3 text-center md:text-left flex-1">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gold-200 text-gold-950">
                Pesan Hangat dari Bu Riska
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                "Jadikan setiap tugas sekolah sebagai langkah nyata mencintai tanah air."
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Jangan ragu untuk mengulang kuis, mencoba mini-game, atau mengirimkan pertanyaan jika ada materi yang belum kamu pahami. Selamat belajar dan berkarya!
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/kontak"
                className="px-6 py-3.5 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white font-bold text-xs sm:text-sm shadow-soft transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Sapa Bu Riska</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
