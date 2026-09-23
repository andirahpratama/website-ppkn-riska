import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Shield, ArrowUp } from 'lucide-react';
import { teacherProfile } from '../data/ppknData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-slate-900 font-black text-lg shadow-soft">
                RP
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-white group-hover:text-gold-400 transition-colors">
                  Ruang PPKn Interaktif
                </h4>
                <p className="text-xs text-gold-300 font-medium">
                  {teacherProfile.name} • Pendidik PPKn SMP
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Portal edukasi kewarganegaraan digital yang dirancang untuk membimbing siswa SMP Indonesia menjadi insan yang cerdas berkonstitusi, bertoleransi tinggi, dan berjiwa Pancasila sejati.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Shield className="w-3.5 h-3.5 text-patriot-400" />
              <span>Satu Nusa, Satu Bangsa, Satu Bahasa Kita</span>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Halaman Pembelajaran
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><Link to="/profil" className="hover:text-gold-400 transition-colors">Profil & Jejak Dedikasi Guru</Link></li>
              <li><Link to="/bank-soal" className="hover:text-gold-400 transition-colors">Bank Soal Kelas 7, 8, 9</Link></li>
              <li><Link to="/kuis" className="hover:text-gold-400 transition-colors">Arena Kuis Kilat 20 Detik</Link></li>
              <li><Link to="/game" className="hover:text-gold-400 transition-colors">Gamifikasi Nilai Pancasila</Link></li>
              <li><Link to="/portofolio" className="hover:text-gold-400 transition-colors">Galeri Proyek P5 Nusantara</Link></li>
              <li><Link to="/kontak" className="hover:text-gold-400 transition-colors">Konsultasi Sapa Bu Riska</Link></li>
            </ul>
          </div>

          {/* Scroll to Top & Motto */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Kembali ke Atas
            </h5>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-gold-400 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Gulir ke Puncak Layar</span>
            </button>
            <p className="text-[11px] text-slate-500 italic pt-1">
              "Pendidikan adalah senjata paling ampuh untuk mengubah dunia." — Nelson Mandela
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Ruang PPKn Interaktif – Riska Puspita, S.Pd. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Dibuat dengan semangat nasionalisme untuk pelajar Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-patriot-500 fill-patriot-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
