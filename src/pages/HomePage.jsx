import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  BookOpen, 
  ShoppingBag, 
  Award, 
  MessageSquare, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  Heart,
  Clock,
  Calendar
} from 'lucide-react';
import { 
  getStoredPageSettings, 
  getStoredProfile, 
  getStoredArticles, 
  getStoredBankSoalDownloads, 
  getStoredDigitalProducts 
} from '../data/ppknData';

// Clean SVG components for brand channels
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TiktokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.21 6.34 6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.83-4.52V8.92a8.28 8.28 0 0 0 4.81 1.52V6.99a4.85 4.85 0 0 1-2-.3z"/>
  </svg>
);

const WhatsappIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

export default function HomePage() {
  const teacher = getStoredProfile();
  const pageSettings = getStoredPageSettings();
  const contact = pageSettings.contact || {};
  const articles = getStoredArticles().slice(0, 3);

  const waLink = contact.whatsappNumber 
    ? `https://wa.me/${contact.whatsappNumber}?text=Halo%20Bu%20Riska%20Puspita,%20saya%20tertarik%20berdiskusi%20dan%20berkolaborasi` 
    : 'https://wa.me/6281234567890';

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      
      {/* 1. HERO SECTION (WARM AMBER / GOLDEN THEME - ALA ANDIRAHP.MY.ID) */}
      <section className="bg-[#F5B800] pt-28 pb-16 md:pt-36 md:pb-24 border-b border-black/10 relative overflow-hidden">
        {/* Subtle Decorative Background Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Big Circular Portrait Frame with Orbital Accent Ring */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative group">
                
                {/* Decorative Orbital Curved Graphic Ring */}
                <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-slate-900/20 border-dashed animate-[spin_30s_linear_infinite] pointer-events-none" />
                <div className="absolute -inset-2 sm:-inset-3 rounded-full border-2 border-slate-900/10 pointer-events-none" />
                
                {/* Main Circular Avatar Frame */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2.5 bg-white shadow-2xl relative overflow-hidden flex items-center justify-center border-4 border-slate-900">
                  {teacher.avatarUrl ? (
                    <img 
                      src={teacher.avatarUrl} 
                      alt={teacher.name || "Riska Puspita, S.Pd."} 
                      className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-white text-center p-4">
                      <span className="text-6xl sm:text-7xl font-black text-gold-400">RP</span>
                      <span className="text-sm font-bold tracking-wider text-slate-200 mt-2">RISKA PUSPITA</span>
                      <span className="text-xs text-slate-400">S.Pd. PPKn</span>
                    </div>
                  )}

                  {/* Corner Accent Badge */}
                  <div className="absolute bottom-4 right-4 bg-slate-900 text-gold-400 px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg border border-gold-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pendidik PPKn</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Bold Serif Headline & Narrative Description */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              {/* Category / Sub-headline Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 text-slate-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase border border-black/15">
                <span>PENDIDIK PPKn SMP</span>
                <span>•</span>
                <span>FASILITATOR P5</span>
                <span>•</span>
                <span>KONTEN KREATOR EDUKASI</span>
              </div>

              {/* Main Headline (Classic Serif) */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-950 leading-[1.15] tracking-tight">
                Halo Semua, Saya {teacher.name?.split(',')[0] || 'Riska Puspita'}.
              </h1>

              {/* Narrative Subtext */}
              <p className="text-slate-900/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                {pageSettings.home?.heroSubtitle || 
                  "Guru Pendidikan Pancasila & Kewarganegaraan yang berdedikasi menghadirkan pembelajaran interaktif, kontekstual, dan bermakna bagi generasi muda Indonesia. Di sini, Anda dapat mengunduh bank soal gratis, memiliki produk ajar digital, serta membaca wawasan pedagogik terkini."
                }
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xl transition-all duration-200 flex items-center gap-2 hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4 text-gold-400" />
                  <span>Konsultasi & Diskusi</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/bank-soal"
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white/90 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-md border-2 border-slate-950 transition-all duration-200 flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 text-patriot-600" />
                  <span>Unduh Bank Soal Gratis</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. SOCIAL MEDIA LINKS STRIP (PERSIS SEPERTI ANDIRAHP.MY.ID) */}
      <section className="bg-[#F4F4F5] py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-center text-xs sm:text-sm md:text-base font-medium text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Aku seorang pendidik PPKn jenjang SMP dan pegiat Kurikulum Merdeka. Saat ini aktif membagikan perangkat ajar, bank soal gratis, dan media belajar digital. Yuk, kenalan lebih dalam lewat kanal sosial mediaku!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            
            {/* WhatsApp Pill */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-full bg-white border-2 border-slate-900 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-950 hover:text-white transition-all group"
            >
              <WhatsappIcon className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Instagram Pill */}
            <a
              href={contact.instagramUrl || "https://instagram.com"}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-full bg-white border-2 border-slate-900 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-950 hover:text-white transition-all group"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600 group-hover:text-pink-400" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* YouTube Pill */}
            <a
              href={contact.youtubeUrl || "https://youtube.com"}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-full bg-white border-2 border-slate-900 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-950 hover:text-white transition-all group"
            >
              <YoutubeIcon className="w-4 h-4 text-red-600 group-hover:text-red-400" />
              <span>YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* TikTok Pill */}
            <a
              href={contact.tiktokUrl || "https://tiktok.com"}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-full bg-white border-2 border-slate-900 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-950 hover:text-white transition-all group"
            >
              <TiktokIcon className="w-4 h-4 text-slate-900 group-hover:text-white" />
              <span>TikTok</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

          </div>
        </div>
      </section>

      {/* 3. FEATURED BENTO GRID SECTION (WARM AMBER BG + GLOWING DARK CARDS - ALA ANDIRAHP.MY.ID) */}
      <section className="bg-[#F5B800] py-16 sm:py-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Card 1: Belajar PPKn Seru & Kontekstual (Large Bento Card) */}
            <div className="lg:col-span-6 bg-[#0B0F19] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800 inline-block">
                  Metode Belajar Aktif
                </span>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                  Belajar PPKn Seru, Bukan Sekadar Menghafal Pasal
                </h3>
                
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  Menghafal pasal hukum tanpa memahami penerapannya sering membuat siswa bosan. Bersama Bu Riska, temukan metode belajar aktif berbasis simulasi sidang parlemen cilik, klinik konstitusi, dan analisis kasus nyata pergaulan remaja yang relevan dengan kehidupan sehari-hari.
                </p>
              </div>

              <div className="pt-8 relative z-10">
                <a
                  href={contact.youtubeUrl || "https://youtube.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-600" />
                  <span>Tonton Video Edukasi di YouTube</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: 2 Stacked Bento Cards */}
            <div className="lg:col-span-6 flex flex-col gap-8 justify-between">
              
              {/* Card 2: Bank Soal Siap Pakai 100% Gratis */}
              <div className="bg-[#0B0F19] text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between flex-1 group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                      100% Gratis untuk Guru
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Format .DOCX Word</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    Perangkat Ajar & Bank Soal Siap Pakai
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Pangkas waktu administrasi mengajar Anda. Dapatkan koleksi bank soal sumatif Kurikulum Merdeka (Word .docx) yang dapat diedit bebas, lengkap dengan kisi-kisi dan pedoman penskoran resmi.
                  </p>
                </div>

                <div className="pt-6 relative z-10">
                  <Link
                    to="/bank-soal"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <span>Buka Katalog Bank Soal Gratis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Produk Digital & Modul Kurikulum Merdeka */}
              <div className="bg-[#0B0F19] text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between flex-1 group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 bg-amber-950/80 px-3 py-1 rounded-full border border-gold-800">
                      Marketplace Guru
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Siap Pakai 1 Tahun</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    Produk Digital & Modul Ajar Interaktif
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Akselerasi proses pembelajaran di kelas dengan modul ajar 1 tahun lengkap, slide presentasi interaktif Canva, dan panduan proyek P5 karya Riska Puspita, S.Pd.
                  </p>
                </div>

                <div className="pt-6 relative z-10">
                  <Link
                    to="/produk"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <span>Buka Etalase Produk Digital</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. PERSONAL STORY / ABOUT PREVIEW SECTION (ALA ANDIRAHP.MY.ID) */}
      <section className="bg-[#F4F4F5] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
                <span>TENTANG SAYA</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-950 leading-tight">
                Halo, Saya {teacher.name || "Riska Puspita, S.Pd."}
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  Mengawali pengabdian sebagai pendidik Pendidikan Pancasila dan Kewarganegaraan sejak tahun 2017 mengajarkanku banyak hal tentang pentingnya keteladanan moral dan ketahanan karakter generasi penerus bangsa.
                </p>
                <p>
                  Tantangan era digital dan hadirnya Kurikulum Merdeka Fase D membuka pintu inovasi baru. Bersama siswa di sekolah, kami mengubah materi hukum dan pasal-pasal konstitusi menjadi ruang dialog terbuka, simulasi pemilu sekolah, dan proyek aksi nyata bertema kebinekaan.
                </p>
                <p>
                  Kini, di samping mengajar di kelas, aku mendedikasikan diri untuk merancang perangkat ajar terstruktur, berbagi bank soal gratis, dan menginspirasi rekan guru di seantero nusantara agar mata pelajaran PPKn selalu dirindukan oleh anak-anak Indonesia.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/profil"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02]"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Photo Composition Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-slate-900 relative">
                
                {/* Image Holder */}
                <div className="rounded-2xl overflow-hidden aspect-4/3 bg-slate-800 mb-6 border border-slate-700">
                  {teacher.avatarUrl ? (
                    <img 
                      src={teacher.avatarUrl} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" 
                      alt="Aktivitas Pembelajaran Bu Riska" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold-400 text-xs font-black">
                    <Sparkles className="w-4 h-4" />
                    <span>Pendidik Inovatif SMP</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {teacher.name || "Riska Puspita, S.Pd."}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {teacher.school || "SMP Negeri Indonesia"} • Penggerak Profil Pelajar Pancasila & Media Ajar Kontekstual
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. POJOK ARTIKEL & INSIGHT EDUKASI TERBARU */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black text-patriot-700 uppercase tracking-wider bg-patriot-50 px-3.5 py-1 rounded-full border border-patriot-200">
                Wawasan Pembelajaran PPKn
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950 mt-3">
                Artikel & Refleksi Guru Terbaru
              </h2>
            </div>

            <Link
              to="/artikel"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-patriot-600 hover:text-patriot-800 transition-colors"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-900 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <Link to={`/artikel/${art.slug}`} className="block relative aspect-16/10 overflow-hidden bg-slate-200">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black bg-slate-900/85 text-gold-400">
                      {art.category}
                    </span>
                  </Link>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-patriot-600" />
                        <span>{art.publishedAt ? new Date(art.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Terbaru'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold-600" />
                        <span>{art.readingTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-patriot-600 transition-colors line-clamp-2">
                      <Link to={`/artikel/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    Oleh {art.author?.split(',')[0] || 'Riska Puspita'}
                  </span>
                  <Link
                    to={`/artikel/${art.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-patriot-600 hover:text-patriot-800"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 6. LET'S CONNECT & COLLABORATE STRIP (BOTTOM BANNER) */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
            <Heart className="w-3.5 h-3.5 fill-gold-400" />
            <span>Kolaborasi Pendidikan Karakter Bangsa</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
            Ingin Berdiskusi Seputar Media Ajar atau Mengundang Bu Riska?
          </h2>

          <p className="text-slate-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Mari bertukar gagasan untuk kemajuan pendidikan kewarganegaraan siswa SMP. Hubungi langsung melalui kontak resmi WhatsApp atau formulir pesan.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full bg-gold-400 hover:bg-gold-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02]"
            >
              Hubungi via WhatsApp
            </a>

            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all hover:scale-[1.02]"
            >
              Buka Halaman Contact
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
