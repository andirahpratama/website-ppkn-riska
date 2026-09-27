import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  User, 
  Filter, 
  CheckCircle2,
  Tag,
  Share2
} from 'lucide-react';
import { getStoredArticles, getStoredProfile } from '../data/ppknData';

export default function ArticlesPage() {
  const allArticles = getStoredArticles();
  const teacher = getStoredProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Pancasila & Karakter',
    'Konstitusi & Hukum',
    'Bhinneka Tunggal Ika',
    'Inovasi Pembelajaran'
  ];

  // Filter artikel: hanya tampilkan yang terbit (published) ATAU terjadwal yang waktunya sudah tiba
  const now = new Date();
  const visibleArticles = allArticles.filter(item => {
    if (item.status === 'draft') return false;
    if (item.status === 'scheduled') {
      if (!item.scheduledAt) return false;
      if (new Date(item.scheduledAt) > now) return false;
    }

    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.seo?.keywords && item.seo.keywords.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-surface-ground min-h-screen">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pojok Literasi & Wawasan PPKn</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Artikel & Refleksi Pembelajaran PPKn
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Kumpulan panduan etika berbangsa, kajian materi esensial Kurikulum Merdeka Fase D, serta gagasan inovasi pedagogik yang ditulis langsung oleh <strong>{teacher.name || 'Riska Puspita, S.Pd.'}</strong>.
            </p>

            {/* Author Persona Pill */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold-400 shrink-0 bg-slate-800 flex items-center justify-center text-gold-400 font-bold text-sm">
                {teacher.avatarUrl ? (
                  <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" />
                ) : (
                  <span>RP</span>
                )}
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">{teacher.name || 'Riska Puspita, S.Pd.'}</p>
                <p className="text-slate-400">{teacher.role || 'Pendidik PPKn SMP & Fasilitator P5'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari materi artikel, kata kunci Pancasila..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-patriot-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-patriot-600 text-white shadow-soft'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Semua Topik' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {visibleArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 shadow-soft">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-base text-slate-700">Belum Ada Artikel yang Sesuai</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Cobalah mengubah kata kunci pencarian atau memilih kategori materi yang lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleArticles.map((article) => {
              const displayDate = article.publishedAt 
                ? new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Terbitan Terbaru';

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-gold-400/60 transition-all duration-300 flex flex-col group"
                >
                  {/* Cover Image */}
                  <Link to={`/artikel/${article.slug}`} className="block relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wide bg-slate-900/85 text-gold-300 backdrop-blur-xs border border-gold-400/30">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-patriot-600" />
                          <span>{displayDate}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold-600" />
                          <span>{article.readingTime}</span>
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-patriot-600 transition-colors line-clamp-2">
                        <Link to={`/artikel/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Author Persona Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-900 border border-gold-400 flex items-center justify-center text-gold-400 text-[10px] font-black shrink-0">
                          {teacher.avatarUrl ? (
                            <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" />
                          ) : (
                            <span>RP</span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {article.author}
                        </span>
                      </div>

                      <Link
                        to={`/artikel/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-black text-patriot-600 hover:text-patriot-800 transition-colors"
                      >
                        <span>Baca</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
