import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { 
  BookOpen, 
  ShoppingBag, 
  Award, 
  MessageSquare, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Download,
  Star,
  Zap,
  Check
} from 'lucide-react';
import { 
  getStoredPageSettings, 
  getStoredBankSoalDownloads, 
  getStoredDigitalProducts 
} from '../data/ppknData';

export default function HomePage() {
  const pageSettings = getStoredPageSettings();
  const bankSoalSample = getStoredBankSoalDownloads().slice(0, 3);
  const productsSample = getStoredDigitalProducts().slice(0, 2);

  const mainNavigationCards = [
    {
      title: "Bank Soal PPKn (Download Gratis)",
      desc: "Kumpulan paket soal Asesmen Sumatif (SAS), PTS, dan ujian sekolah format Word (.docx) siap unduh bebas untuk semua guru.",
      path: "/bank-soal",
      icon: BookOpen,
      badge: "100% Gratis",
      cta: "Buka Katalog Soal Gratis",
      color: "from-blue-600 to-indigo-700"
    },
    {
      title: "Marketplace Produk Digital",
      desc: "Modul Ajar 1 tahun lengkap, slide presentasi Canva/PPT siap pakai, dan e-book karya inovatif Bu Riska Puspita, S.Pd.",
      path: "/produk",
      icon: ShoppingBag,
      badge: "Produk Unggulan",
      cta: "Buka Etalase Produk",
      color: "from-amber-500 to-gold-600"
    },
    {
      title: "Portofolio Proyek P5 & Praktik Baik",
      desc: "Galeri dokumentasi pameran karya Profil Pelajar Pancasila siswa, rubrik asesmen, dan sertifikasi pendidik profesional.",
      path: "/portofolio",
      icon: Award,
      badge: "Inovasi Pembelajaran",
      cta: "Lihat Dokumentasi P5",
      color: "from-emerald-600 to-teal-700"
    },
    {
      title: "Profil & Dedikasi Bu Riska",
      desc: "Rekam jejak perjalanan karier dari masa kuliah pendidikan keguruan hingga pelopor inovasi media pembelajaran PPKn.",
      path: "/profil",
      icon: User,
      badge: "Mengenal Guru",
      cta: "Pelajari Profil",
      color: "from-slate-800 to-slate-900"
    },
    {
      title: "Contact & Layanan Konsultasi",
      desc: "Hubungi Bu Riska langsung melalui WhatsApp resmi, surel dinas, media sosial, atau formulir pertanyaan daring.",
      path: "/contact",
      icon: MessageSquare,
      badge: "Respon Cepat",
      cta: "Hubungi Bu Riska",
      color: "from-purple-600 to-indigo-800"
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Grid Navigasi Utama Halaman */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-700" />
            <span>Pilihan Halaman Website</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Akses Cepat Fasilitas Pembelajaran
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            Silakan pilih halaman yang Anda butuhkan, mulai dari download bank soal gratis hingga produk digital siap pakai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainNavigationCards.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6 text-patriot-600" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
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

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={feat.path}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-50 hover:bg-slate-900 text-slate-800 hover:text-white font-bold text-xs sm:text-sm border border-slate-200 transition-all flex items-center justify-between group/btn shadow-soft-sm"
                  >
                    <span>{feat.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Cuplikan Produk Bank Soal Gratis (Marketplace Teaser) */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                100% Download Gratis untuk Semua Guru
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Paket Bank Soal PPKn Terpopuler
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Format Microsoft Word (.docx) lengkap dengan kisi-kisi dan kunci jawaban siap edit
              </p>
            </div>

            <Link
              to="/bank-soal"
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-soft"
            >
              <span>Lihat Semua Paket Soal Gratis</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bankSoalSample.map((item) => (
              <div
                key={item.id}
                className="bg-surface-ground p-6 rounded-3xl border border-slate-200 shadow-soft-sm hover:shadow-soft flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                      GRATIS
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">{item.grade}</span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{item.format}</span>
                  <Link
                    to="/bank-soal"
                    className="text-patriot-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Unduh Sekarang</span>
                    <Download className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Cuplikan Produk Digital Marketplace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50 to-gold-50/60 rounded-3xl p-8 sm:p-12 border border-gold-200 shadow-soft space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gold-400 text-slate-950">
                Karya Pilihan Bu Riska
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Produk Digital Pembelajaran PPKn
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Hemat waktu administrasi dengan modul ajar 1 tahun lengkap dan template media mengajar kreatif
              </p>
            </div>

            <Link
              to="/produk"
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-soft flex items-center gap-2"
            >
              <span>Kunjungi Marketplace Produk</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productsSample.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-gold-200 shadow-soft-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800">
                      {prod.category}
                    </span>
                    {prod.badge && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-gold-400 text-slate-950">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-900">
                    {prod.title}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900">
                      Rp {prod.price.toLocaleString('id-ID')}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        Rp {prod.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to="/produk"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center block"
                  >
                    Lihat Rincian & Pemesanan
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Contact Invitation Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 border border-slate-800 shadow-soft">
          <h3 className="text-xl sm:text-2xl font-black">
            Butuh Bantuan Administrasi atau Konsultasi Mengajar?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Bu Riska siap berbagi pengalaman dan berdiskusi seputar Kurikulum Merdeka Fase D dengan rekan guru di seluruh nusantara.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-glow-gold transition-all"
            >
              <span>Hubungi Bu Riska (Contact)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
