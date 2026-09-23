import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SupabaseModal from './components/SupabaseModal';
import ScrollToTop from './components/ScrollToTop';

// Multi-Page Views
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import QuestionBankPage from './pages/QuestionBankPage';
import QuizPage from './pages/QuizPage';
import GamePage from './pages/GamePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Reset Scroll ke paling atas saat pindah halaman */}
      <ScrollToTop />

      <div className="min-h-screen bg-surface-ground text-surface-dark flex flex-col font-sans selection:bg-gold-400 selection:text-slate-900">
        {/* Sticky Header Navigasi */}
        <Navbar />

        {/* Halaman Konten Berdasarkan URL Rute */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="/bank-soal" element={<QuestionBankPage />} />
            <Route path="/kuis" element={<QuizPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/portofolio" element={<PortfolioPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            {/* Fallback ke Beranda jika rute tidak ditemukan */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Modal Konfigurasi Supabase */}
        <SupabaseModal 
          isOpen={isDbModalOpen} 
          onClose={() => setIsDbModalOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}
