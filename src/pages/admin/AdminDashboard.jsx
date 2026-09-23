import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  isAdminAuthenticated, 
  logoutAdmin, 
  getAdminSession 
} from '../../lib/adminAuth';
import {
  getStoredQuestions,
  saveStoredQuestions,
  getStoredProfile,
  saveStoredProfile,
  getStoredTimeline,
  saveStoredTimeline,
  getStoredPortfolio,
  saveStoredPortfolio,
  getStoredConsultations,
  saveStoredConsultations,
  getStoredBankSoalDownloads,
  saveStoredBankSoalDownloads,
  getStoredDigitalProducts,
  saveStoredDigitalProducts,
  getStoredPageSettings,
  saveStoredPageSettings
} from '../../data/ppknData';

// Tabs
import OverviewTab from '../../components/admin/OverviewTab';
import PageSettingsTab from '../../components/admin/PageSettingsTab';
import FreeQuestionMarketplaceTab from '../../components/admin/FreeQuestionMarketplaceTab';
import DigitalProductsManagerTab from '../../components/admin/DigitalProductsManagerTab';
import ProfileManagerTab from '../../components/admin/ProfileManagerTab';
import PortfolioManagerTab from '../../components/admin/PortfolioManagerTab';
import InquiriesManagerTab from '../../components/admin/InquiriesManagerTab';
import ArticlesManagerTab from '../../components/admin/ArticlesManagerTab';

import { 
  LayoutDashboard, 
  Settings, 
  BookOpen, 
  ShoppingBag, 
  User, 
  Award, 
  MessageSquare, 
  FileText,
  LogOut, 
  ExternalLink, 
  Menu, 
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Data States
  const [downloadItems, setDownloadItems] = useState(() => getStoredBankSoalDownloads());
  const [digitalProducts, setDigitalProducts] = useState(() => getStoredDigitalProducts());
  const [profile, setProfile] = useState(() => getStoredProfile());
  const [timeline, setTimeline] = useState(() => getStoredTimeline());
  const [portfolio, setPortfolio] = useState(() => getStoredPortfolio());
  const [consultations, setConsultations] = useState(() => getStoredConsultations());
  const [pageSettings, setPageSettings] = useState(() => getStoredPageSettings());

  // Protect Route
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      logoutAdmin();
      navigate('/admin/login', { replace: true });
    }
  };

  const updateDownloadItems = (items) => {
    setDownloadItems(items);
    saveStoredBankSoalDownloads(items);
  };

  const updateDigitalProducts = (products) => {
    setDigitalProducts(products);
    saveStoredDigitalProducts(products);
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    saveStoredProfile(newProfile);
  };

  const updateTimeline = (newTimeline) => {
    setTimeline(newTimeline);
    saveStoredTimeline(newTimeline);
  };

  const updatePortfolio = (newPortfolio) => {
    setPortfolio(newPortfolio);
    saveStoredPortfolio(newPortfolio);
  };

  const updateConsultations = (newConsultations) => {
    setConsultations(newConsultations);
    saveStoredConsultations(newConsultations);
  };

  const updatePageSettings = (newSettings) => {
    setPageSettings(newSettings);
    saveStoredPageSettings(newSettings);
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'page_settings', label: 'Pengaturan Halaman', icon: Settings },
    { id: 'articles', label: 'Artikel & SEO AI', icon: FileText },
    { id: 'bank_soal_downloads', label: 'Katalog Bank Soal (Gratis)', icon: BookOpen, count: downloadItems.length },
    { id: 'digital_products', label: 'Produk Digital Marketplace', icon: ShoppingBag, count: digitalProducts.length },
    { id: 'profile', label: 'Profil & Timeline Guru', icon: User },
    { id: 'portfolio', label: 'Portofolio & Proyek P5', icon: Award },
    { 
      id: 'inquiries', 
      label: 'Kotak Masuk (Contact)', 
      icon: MessageSquare, 
      count: consultations.filter(c => c.status === 'Belum Dibaca').length,
      badgeColor: 'bg-red-500 text-white'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Admin Topbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-soft-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-gold-400 font-black text-sm flex items-center justify-center shadow-soft">
              RP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  Panel Admin Ruang PPKn
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-patriot-50 text-patriot-700 border border-patriot-200">
                  CMS Konten
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Pengaturan Konten & Marketplace • Riska Puspita, S.Pd.
              </p>
            </div>
          </div>
        </div>

        {/* Topbar Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Website Publik</span>
          </Link>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <p className="text-xs font-bold text-slate-900 leading-tight">Bu Riska Puspita</p>
              <p className="text-[10px] text-slate-400">Guru PPKn (Admin)</p>
            </div>
            <button
              onClick={handleLogout}
              title="Keluar dari Panel Admin"
              className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6 items-start">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 bg-white rounded-3xl border border-slate-200 shadow-soft p-4 shrink-0 sticky top-24 space-y-1.5">
          <p className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Menu Kontrol Website
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-3.5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-soft'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    item.badgeColor || (isActive ? 'bg-slate-800 text-gold-300' : 'bg-slate-100 text-slate-600')
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm flex">
            <div className="w-72 bg-white h-full p-5 space-y-2 shadow-soft-lg flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-extrabold text-sm text-slate-900">Menu CMS</span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full px-3.5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && item.count > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-2xl text-xs font-bold text-red-600 bg-red-50 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        )}

        {/* Right Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <OverviewTab
              questions={downloadItems}
              leaderboard={digitalProducts}
              consultations={consultations}
              portfolio={portfolio}
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          )}

          {activeTab === 'page_settings' && (
            <PageSettingsTab
              onSettingsUpdated={updatePageSettings}
            />
          )}

          {activeTab === 'articles' && (
            <ArticlesManagerTab />
          )}

          {activeTab === 'bank_soal_downloads' && (
            <FreeQuestionMarketplaceTab
              downloadItems={downloadItems}
              onUpdateDownloadItems={updateDownloadItems}
            />
          )}

          {activeTab === 'digital_products' && (
            <DigitalProductsManagerTab
              products={digitalProducts}
              onUpdateProducts={updateDigitalProducts}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileManagerTab
              profile={profile}
              timeline={timeline}
              onUpdateProfile={updateProfile}
              onUpdateTimeline={updateTimeline}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioManagerTab
              portfolio={portfolio}
              onUpdatePortfolio={updatePortfolio}
            />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesManagerTab
              consultations={consultations}
              onUpdateConsultations={updateConsultations}
            />
          )}
        </main>

      </div>

    </div>
  );
}
