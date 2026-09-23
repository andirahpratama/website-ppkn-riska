import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TeacherTimeline from './components/TeacherTimeline';
import QuestionBank from './components/QuestionBank';
import QuizArena from './components/QuizArena';
import GamificationZone from './components/GamificationZone';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SupabaseModal from './components/SupabaseModal';

export default function App() {
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [leaderboardRefreshTrigger, setLeaderboardRefreshTrigger] = useState(0);
  const [activeSection, setActiveSection] = useState('beranda');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['beranda', 'profil', 'bank-soal', 'kuis', 'game', 'portofolio', 'kontak'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizCompleted = (result) => {
    if (result?.refreshLeaderboard) {
      setLeaderboardRefreshTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-surface-ground text-surface-dark flex flex-col font-sans selection:bg-gold-400 selection:text-slate-900">
      {/* Header & Sticky Nav */}
      <Navbar 
        onOpenDatabaseModal={() => setIsDbModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero & Slogan Typewriter */}
        <HeroSection />

        {/* 2. Interactive Teacher Timeline */}
        <TeacherTimeline />

        {/* 3. Question Bank with Topic & Grade Filter */}
        <QuestionBank />

        {/* 4. Timed Quiz Arena with Confetti & Badges */}
        <QuizArena onQuizCompleted={handleQuizCompleted} />

        {/* 5. Gamification Zone (Pancasila Matching, Moral Mission, Leaderboard) */}
        <GamificationZone refreshTrigger={leaderboardRefreshTrigger} />

        {/* 6. Teacher Portfolio & P5 Showcase */}
        <PortfolioSection />

        {/* 7. Student Consultation Corner & Socials */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Supabase Connection Modal */}
      <SupabaseModal 
        isOpen={isDbModalOpen} 
        onClose={() => setIsDbModalOpen(false)} 
      />
    </div>
  );
}
