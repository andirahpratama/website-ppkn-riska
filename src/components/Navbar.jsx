import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { getStoredPageSettings } from '../data/ppknData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pageSettings = getStoredPageSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu mobile saat rute berpindah
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil Guru', path: '/profil' },
    { name: 'Bank Soal (Gratis)', path: '/bank-soal' },
    { name: 'Produk Digital', path: '/produk' },
    { name: 'Portofolio P5', path: '/portofolio' },
    { name: 'Contact', path: '/contact' },
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
          {/* Brand Title */}
          <Link to="/" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-patriot-600 transition-colors">
                {pageSettings.general?.siteName || 'Ruang PPKn Interaktif'}
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-patriot-50 text-patriot-700 border border-patriot-200">
                SMP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {pageSettings.general?.teacherName || 'Riska Puspita, S.Pd.'} • Guru Pendidikan Pancasila
            </p>
          </Link>

          {/* Desktop Nav - Clean Text */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => 
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-patriot-50 text-patriot-700 font-bold shadow-soft-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-soft-lg animate-fadeIn">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'bg-patriot-50 text-patriot-700 font-bold' 
                      : 'text-slate-700 hover:bg-gold-50 hover:text-gold-800'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb-Friendly) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-soft-lg">
        <NavLink 
          to="/bank-soal" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[11px] font-semibold ${
              isActive ? 'text-patriot-700 font-bold' : 'text-slate-600 hover:text-patriot-600'
            }`
          }
        >
          Bank Soal
        </NavLink>
        <NavLink 
          to="/produk" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[11px] font-semibold ${
              isActive ? 'text-gold-600 font-bold' : 'text-slate-600 hover:text-gold-600'
            }`
          }
        >
          Produk Digital
        </NavLink>
        <NavLink 
          to="/portofolio" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[11px] font-semibold ${
              isActive ? 'text-patriot-700 font-bold' : 'text-slate-600 hover:text-patriot-600'
            }`
          }
        >
          Proyek P5
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-h-[48px] py-1 px-2 text-[11px] font-semibold ${
              isActive ? 'text-patriot-700 font-bold' : 'text-slate-600 hover:text-patriot-600'
            }`
          }
        >
          Contact
        </NavLink>
      </nav>
    </>
  );
}
