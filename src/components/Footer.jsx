import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Shield, ArrowUp, Mail, MessageCircle, MapPin } from 'lucide-react';
import { getStoredPageSettings } from '../data/ppknData';

export default function Footer() {
  const pageSettings = getStoredPageSettings();
  const contact = pageSettings.contact || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-slate-900 font-black text-lg shadow-soft">
                RP
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-white group-hover:text-gold-400 transition-colors">
                  {pageSettings.general?.siteName || 'Ruang PPKn Interaktif'}
                </h4>
                <p className="text-xs text-gold-300 font-medium">
                  {pageSettings.general?.teacherName || 'Riska Puspita, S.Pd.'} • Pendidik PPKn SMP
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Portal edukasi kewarganegaraan dan media berbagi perangkat pembelajaran gratis bagi guru PPKn se-Indonesia untuk menciptakan generasi penerus bangsa yang berkarakter Pancasila.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Shield className="w-3.5 h-3.5 text-patriot-400" />
              <span>Satu Nusa, Satu Bangsa, Satu Bahasa Kita</span>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Halaman Website
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><Link to="/profil" className="hover:text-gold-400 transition-colors">Profil & Dedikasi Guru</Link></li>
              <li><Link to="/bank-soal" className="hover:text-gold-400 transition-colors">Bank Soal PPKn (Download Gratis)</Link></li>
              <li><Link to="/produk" className="hover:text-gold-400 transition-colors">Marketplace Produk Digital Guru</Link></li>
              <li><Link to="/artikel" className="hover:text-gold-400 transition-colors">Artikel & Wawasan PPKn</Link></li>
              <li><Link to="/portofolio" className="hover:text-gold-400 transition-colors">Galeri Proyek P5 Nusantara</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact / Hubungi Bu Riska</Link></li>
              <li className="pt-2">
                <Link to="/admin/login" className="hover:text-gold-400 transition-colors text-slate-500 text-[11px] font-semibold">
                  🔐 Panel Masuk Guru (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Highlights & Scroll to Top */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Kontak Cepat
            </h5>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WA: {contact.whatsappDisplay || '+62 812-3456-7890'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="truncate">{contact.email || 'riska.puspita.ppkn@gmail.com'}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-patriot-400 shrink-0" />
                <span>{contact.location || 'SMP Negeri, Jawa Barat'}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-400 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {pageSettings.general?.siteName || 'Ruang PPKn Interaktif'} – {pageSettings.general?.teacherName || 'Riska Puspita, S.Pd.'}. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Didedikasikan untuk kemajuan pendidikan kewarganegaraan Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-patriot-500 fill-patriot-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
