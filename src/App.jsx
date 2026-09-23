import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import QuestionBankPage from './pages/QuestionBankPage';
import QuizPage from './pages/QuizPage';
import GamePage from './pages/GamePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

// Admin CMS Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Layout Khusus Halaman Publik (dengan Navbar & Footer resmi)
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-ground text-surface-dark flex flex-col font-sans selection:bg-gold-400 selection:text-slate-900">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Reset Scroll ke puncak layar saat rute berubah */}
      <ScrollToTop />

      <Routes>
        {/* Rute Admin CMS (Bebas dari Navbar publik) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Rute Website Publik */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/profil" element={<PublicLayout><ProfilePage /></PublicLayout>} />
        <Route path="/bank-soal" element={<PublicLayout><QuestionBankPage /></PublicLayout>} />
        <Route path="/kuis" element={<PublicLayout><QuizPage /></PublicLayout>} />
        <Route path="/game" element={<PublicLayout><GamePage /></PublicLayout>} />
        <Route path="/portofolio" element={<PublicLayout><PortfolioPage /></PublicLayout>} />
        <Route path="/kontak" element={<PublicLayout><ContactPage /></PublicLayout>} />

        {/* Fallback */}
        <Route path="*" element={<PublicLayout><HomePage /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
