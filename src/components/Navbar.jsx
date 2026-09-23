import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  HelpCircle, 
  Gamepad2, 
  Award, 
  MessageSquare, 
  User, 
  Database, 
  Menu, 
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { isConfigured } from '../lib/supabaseClient';

export default function Navbar({ onOpenDatabaseModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu mobile saat rute berubah
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Beranda', path: '/', icon: Sparkles },
    { name: 'Profil Guru', path: '/profil', icon: User },
    { name: 'Bank Soal', path: '/bank-soal', icon: BookOpen },
    { name: 'Arena Kuis', path: '/kuis', icon: HelpCircle },
    { name: 'Zona Game', path: '/game', icon: Gamepad2 },
    { name: 'Portofolio P5', path: '/portofolio', icon: Award },
    { name: 'Sapa Bu Riska', path: '/kontak', icon: MessageSquare },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-200/80 py-2.5' 
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-900">RP</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-patriot-600 transition-colors">
                  Ruang PPKn Interaktif
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-patriot-50 text-patriot-700 border border-patriot-200">
                  SMP
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Riska Puspita, S.Pd. • Guru Pendidikan Pancasila
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-patriot-50 text-patriot-700 font-bold shadow-soft-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action / Database Status Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenDatabaseModal}
              title="Status Koneksi Supabase"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isConfigured
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-gold-50 text-slate-800 border-gold-300 hover:bg-gold-100'
              }`}
            >
              <Database className={`w-3.5 h-3.5 ${isConfigured ? 'text-emerald-600 animate-pulse' : 'text-gold-600'}`} />
              <span className="hidden sm:inline">
                {isConfigured ? 'Supabase Live' : 'Koneksi Supabase'}
              </span>
            </button>

            {/* Hamburger Toggle (Mobile/Tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-soft-lg animate-fadeIn">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'bg-patriot-50 text-patriot-700 font-bold' 
                        : 'text-slate-700 hover:bg-gold-50 hover:text-gold-800'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gold-600" />
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </NavLink>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb-Friendly, React Router Links) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-soft-lg">
        <NavLink 
          to="/bank-soal" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[10px] font-semibold ${
              isActive ? 'text-patriot-700 font-bold' : 'text-slate-600 hover:text-patriot-600'
            }`
          }
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          Bank Soal
        </NavLink>
        <NavLink 
          to="/kuis" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[10px] font-semibold ${
              isActive ? 'text-gold-600 font-bold' : 'text-slate-600 hover:text-gold-600'
            }`
          }
        >
          <HelpCircle className="w-5 h-5 mb-0.5 text-gold-500" />
          Kuis Kilat
        </NavLink>
        <NavLink 
          to="/game" 
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[10px] font-semibold text-patriot-700"
        >
          <div className="w-9 h-9 -mt-4 rounded-full bg-gradient-to-tr from-patriot-600 to-gold-500 text-white flex items-center justify-center shadow-glow-patriot border-2 border-white">
            <Gamepad2 className="w-5 h-5" />
          </div>
          Game
        </NavLink>
        <NavLink 
          to="/portofolio" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[10px] font-semibold ${
              isActive ? 'text-patriot-700 font-bold' : 'text-slate-600 hover:text-patriot-600'
            }`
          }
        >
          <Award className="w-5 h-5 mb-0.5" />
          Proyek P5
        </NavLink>
        <NavLink 
          to="/kontak" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[10px] font-semibold ${
              isActive ? 'text-patriot-700 font-bold' : 'text-slate-600 hover:text-patriot-600'
            }`
          }
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          Sapa Guru
        </NavLink>
      </nav>
    </>
  );
}
