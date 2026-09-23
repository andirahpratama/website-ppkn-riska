import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  Search, 
  Upload, 
  FileCode, 
  Image as ImageIcon, 
  Globe, 
  Share2, 
  X, 
  Bot, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { getStoredArticles, saveStoredArticles, getStoredProfile } from '../../data/ppknData';

export default function ArticlesManagerTab() {
  const [articles, setArticles] = useState(() => getStoredArticles());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'published' | 'scheduled' | 'draft'
  
  // Modal State
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveSuccessAlert, setSaveSuccessAlert] = useState(false);

  // File Input Refs
  const mdFileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  // Form State
  const teacher = getStoredProfile();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Pancasila & Karakter',
    author: teacher.name || 'Riska Puspita, S.Pd.',
    authorRole: teacher.role || 'Pendidik PPKn SMP & Penggerak Karakter',
    coverImage: '',
    excerpt: '',
    content: '',
    readingTime: '5 menit baca',
    status: 'published', // 'published' | 'scheduled' | 'draft'
    scheduledAt: '',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      aiTargetQuery: '',
      aiKeyTakeaways: ''
    }
  });

  const categories = [
    'Pancasila & Karakter',
    'Konstitusi & Hukum',
    'Bhinneka Tunggal Ika',
    'Inovasi Pembelajaran',
    'Profil Pelajar Pancasila (P5)',
    'Opini & Refleksi Guru'
  ];

  // Auto generate slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleTitleChange = (val) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingArticleId ? prev.slug : generateSlug(val),
      seo: {
        ...prev.seo,
        metaTitle: prev.seo.metaTitle || `${val} | Riska Puspita`
      }
    }));
  };

  // Upload Cover Image Handler (FileReader)
  const handleCoverFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("Ukuran gambar cover maksimal 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, coverImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Upload .md (Markdown) File Handler
  const handleMdFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      
      // Deteksi Title dari Baris Pertama (# Judul)
      const lines = text.split('\n');
      let detectedTitle = '';
      let detectedExcerpt = '';
      let cleanContent = text;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!detectedTitle && line.startsWith('# ')) {
          detectedTitle = line.replace('# ', '').trim();
        } else if (detectedTitle && !detectedExcerpt && line.length > 20 && !line.startsWith('#') && !line.startsWith('!')) {
          detectedExcerpt = line.replace(/[*_#`]/g, '').slice(0, 160);
          break;
        }
      }

      const finalTitle = detectedTitle || file.name.replace(/\.[^/.]+$/, "");
      
      setFormData(prev => ({
        ...prev,
        title: finalTitle,
        slug: generateSlug(finalTitle),
        excerpt: detectedExcerpt || prev.excerpt,
        content: cleanContent,
        seo: {
          ...prev.seo,
          metaTitle: `${finalTitle} | Riska Puspita`,
          metaDescription: detectedExcerpt || prev.seo.metaDescription
        }
      }));

      alert(`File .md "${file.name}" berhasil diunggah dan dibaca! Konten telah dimasukkan ke editor.`);
    };

    reader.readAsText(file);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingArticleId(null);
    setIsPreviewMode(false);
    setFormData({
      title: '',
      slug: '',
      category: 'Pancasila & Karakter',
      author: teacher.name || 'Riska Puspita, S.Pd.',
      authorRole: teacher.role || 'Pendidik PPKn SMP & Penggerak Karakter',
      coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      excerpt: '',
      content: '# Judul Artikel Pembelajaran\n\nTuliskan narasi pembuka yang memikat bagi siswa dan rekan pendidik...\n\n## Sub-Topik Pembahasan\n1. Poin pertama\n2. Poin kedua\n\n> "Kutipan inspiratif pengajar." — Riska Puspita, S.Pd.',
      readingTime: '5 menit baca',
      status: 'published',
      scheduledAt: '',
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: 'ppkn smp, kurikulum merdeka, profil pelajar pancasila',
        aiTargetQuery: '',
        aiKeyTakeaways: 'Poin penting pembelajaran untuk dipahami siswa dan mesin pencari AI'
      }
    });
    setIsEditorModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (article) => {
    setEditingArticleId(article.id);
    setIsPreviewMode(false);
    
    // Format takeaways array to string
    const takeawaysStr = Array.isArray(article.seo?.aiKeyTakeaways) 
      ? article.seo.aiKeyTakeaways.join('\n') 
      : (article.seo?.aiKeyTakeaways || '');

    setFormData({
      title: article.title || '',
      slug: article.slug || '',
      category: article.category || 'Pancasila & Karakter',
      author: article.author || teacher.name || 'Riska Puspita, S.Pd.',
      authorRole: article.authorRole || 'Pendidik PPKn SMP',
      coverImage: article.coverImage || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      readingTime: article.readingTime || '5 menit baca',
      status: article.status || 'published',
      scheduledAt: article.scheduledAt ? new Date(article.scheduledAt).toISOString().slice(0, 16) : '',
      seo: {
        metaTitle: article.seo?.metaTitle || '',
        metaDescription: article.seo?.metaDescription || '',
        keywords: article.seo?.keywords || '',
        aiTargetQuery: article.seo?.aiTargetQuery || '',
        aiKeyTakeaways: takeawaysStr
      }
    });
    setIsEditorModalOpen(true);
  };

  // Save Article Submit
  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // Convert multiline takeaways into array
    const takeawaysArray = formData.seo.aiKeyTakeaways
      ? formData.seo.aiKeyTakeaways.split('\n').map(t => t.trim()).filter(Boolean)
      : [];

    const finalPayload = {
      id: editingArticleId || `art-${Date.now()}`,
      title: formData.title.trim(),
      slug: formData.slug.trim() || generateSlug(formData.title),
      category: formData.category,
      author: formData.author,
      authorRole: formData.authorRole,
      coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      excerpt: formData.excerpt.trim() || formData.title,
      content: formData.content,
      readingTime: formData.readingTime || '5 menit baca',
      status: formData.status,
      publishedAt: formData.status === 'published' ? (editingArticleId ? (articles.find(a => a.id === editingArticleId)?.publishedAt || new Date().toISOString()) : new Date().toISOString()) : null,
      scheduledAt: formData.status === 'scheduled' && formData.scheduledAt ? new Date(formData.scheduledAt).toISOString() : null,
      seo: {
        metaTitle: formData.seo.metaTitle.trim() || `${formData.title} | Riska Puspita`,
        metaDescription: formData.seo.metaDescription.trim() || formData.excerpt,
        keywords: formData.seo.keywords.trim(),
        aiTargetQuery: formData.seo.aiTargetQuery.trim(),
        aiKeyTakeaways: takeawaysArray
      }
    };

    let updated;
    if (editingArticleId) {
      updated = articles.map(item => item.id === editingArticleId ? finalPayload : item);
    } else {
      updated = [finalPayload, ...articles];
    }

    setArticles(updated);
    saveStoredArticles(updated);
    setIsEditorModalOpen(false);
    setSaveSuccessAlert(true);
    setTimeout(() => setSaveSuccessAlert(false), 3000);
  };

  const handleDeleteArticle = (id, title) => {
    if (window.confirm(`Hapus artikel "${title}" secara permanen?`)) {
      const updated = articles.filter(item => item.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
    }
  };

  // Filtered List
  const filteredArticles = articles.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.seo?.keywords && item.seo.keywords.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === 'all') return matchSearch;
    return matchSearch && item.status === selectedFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {saveSuccessAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white p-4 rounded-2xl shadow-soft-lg border border-emerald-700 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-bold">Artikel berhasil disimpan dan disinkronkan ke website!</p>
        </div>
      )}

      {/* Header Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-patriot-50 text-patriot-700 text-xs font-bold border border-patriot-200 mb-2">
              <Bot className="w-3.5 h-3.5" />
              <span>SEO & AI Generative Engine Optimization (GEO)</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Manajemen Artikel Edukasi PPKn & Author Persona
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl mt-1">
              Publikasikan pemikiran, modul pembelajaran, dan refleksi pedagogik Bu Riska. Dilengkapi schema markup agar mudah dikutip oleh Google Search dan AI Search Engine (Perplexity, ChatGPT, Gemini).
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-2.5 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold shadow-soft flex items-center gap-2 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul, kategori, atau keyword SEO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Semua Status' },
              { id: 'published', label: 'Terbit' },
              { id: 'scheduled', label: 'Terjadwal' },
              { id: 'draft', label: 'Draf' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid / List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-bold text-sm text-slate-700">Tidak ada artikel yang cocok dengan filter</p>
            <p className="text-xs text-slate-400 mt-1">Mulai tulis artikel baru atau gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          filteredArticles.map(article => (
            <div
              key={article.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-soft flex flex-col md:flex-row items-start gap-5 hover:border-slate-300 transition-all"
            >
              {/* Cover Image */}
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-900/80 text-white backdrop-blur-xs">
                  {article.category}
                </span>
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Status Badge */}
                  {article.status === 'published' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Terbit</span>
                    </span>
                  )}
                  {article.status === 'scheduled' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Terjadwal: {article.scheduledAt ? new Date(article.scheduledAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : 'Belum diatur'}</span>
                    </span>
                  )}
                  {article.status === 'draft' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      Draf
                    </span>
                  )}

                  <span className="text-[11px] text-slate-400 font-medium">
                    • {article.readingTime}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    • Author: {article.author}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-slate-900 leading-snug line-clamp-1">
                  {article.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                {/* SEO Snippet Preview */}
                <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-400 border-t border-slate-100 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-slate-600 font-semibold">
                    <Globe className="w-3 h-3 text-patriot-600" />
                    <span>/{article.slug}</span>
                  </span>
                  {article.seo?.keywords && (
                    <span className="text-slate-500">
                      Keywords: <strong className="text-slate-700 font-medium">{article.seo.keywords}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 self-end md:self-start w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <a
                  href={`/artikel/${article.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Lihat Pratinjau Publik"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat</span>
                </a>

                <button
                  onClick={() => handleOpenEditModal(article)}
                  className="px-3 py-1.5 rounded-xl bg-patriot-50 hover:bg-patriot-100 text-patriot-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Edit Artikel"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sunting</span>
                </button>

                <button
                  onClick={() => handleDeleteArticle(article.id, article.title)}
                  className="px-3 py-1.5 rounded-xl text-red-500 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Hapus Artikel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL EDITOR ARTIKEL & SEO CMS */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-soft-lg border border-slate-200 overflow-hidden">
            
            {/* Modal Header (Sticky Top) */}
            <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingArticleId ? 'Sunting Artikel & Pengaturan SEO' : 'Tulis Artikel Edukasi PPKn Baru'}
                </h3>
                <p className="text-xs text-slate-500">
                  Lengkapi konten artikel, upload file markdown .md, gambar cover, dan metadata ramah mesin pencari AI
                </p>
              </div>
              <button
                onClick={() => setIsEditorModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              
              {/* Scrollable Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                
                {/* TOMBOL PINTAS: UPLOAD FILE .MD */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-400 text-slate-900 flex items-center justify-center shrink-0">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">Punya Draft Tulisan dalam Format Markdown (.md)?</h4>
                    <p className="text-[11px] text-slate-600">
                      Unggah berkas .md Anda; sistem akan membaca judul, ringkasan, dan isi markdown secara instan.
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <input
                    type="file"
                    ref={mdFileInputRef}
                    onChange={handleMdFileUpload}
                    accept=".md,.markdown,text/markdown"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => mdFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-gold-50 text-slate-900 text-xs font-bold border border-gold-400 shadow-xs flex items-center gap-2 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-patriot-600" />
                    <span>Upload File .md</span>
                  </button>
                </div>
              </div>

              {/* 1. INFORMASI DASAR ARTIKEL */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Judul Artikel *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Misal: Menerapkan Nilai Pancasila dalam Pergaulan Digital"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-4 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Kategori Materi</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:bg-white"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Slug URL & Estimasi Waktu Baca */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Slug URL Publik</label>
                    <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-500">
                      <span>/artikel/</span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                        className="flex-1 bg-transparent font-semibold text-slate-900 ml-1 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Estimasi Waktu Baca</label>
                    <input
                      type="text"
                      value={formData.readingTime}
                      onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                      placeholder="Misal: 5 menit baca"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* UPLOAD GAMBAR COVER ARTIKEL */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-patriot-600" />
                    <span>Gambar Sampul (Cover Image Artikel) *</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-44 h-24 rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                      {formData.coverImage ? (
                        <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={coverImageInputRef}
                          onChange={handleCoverFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => coverImageInputRef.current?.click()}
                          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1.5 shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5 text-patriot-600" />
                          <span>Pilih Foto dari Komputer</span>
                        </button>
                      </div>

                      <input
                        type="url"
                        placeholder="Atau tempelkan URL gambar (Unsplash / Google Drive)..."
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Ringkasan / Excerpt */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Ringkasan Cuplikan (Excerpt)</label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Deskripsi singkat yang tampil pada kartu artikel di katalog..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none focus:bg-white"
                  />
                </div>
              </div>

              {/* 2. EDITOR KONTEN ARTIKEL (MARKDOWN) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Isi Konten Artikel (Format Markdown) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="text-xs font-bold text-patriot-600 hover:text-patriot-800 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isPreviewMode ? 'Kembali ke Editor' : 'Pratinjau Tampilan'}</span>
                  </button>
                </div>

                {isPreviewMode ? (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 min-h-[220px] max-h-[350px] overflow-y-auto prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                      {formData.content}
                    </div>
                  </div>
                ) : (
                  <textarea
                    rows={9}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="# Judul Pembelajaran&#10;&#10;Tuliskan isi artikel Anda di sini..."
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono leading-relaxed focus:bg-white resize-y"
                  />
                )}
                <p className="text-[11px] text-slate-400">
                  Dukung format Markdown: <code># Heading 1</code>, <code>## Heading 2</code>, <code>**tebal**</code>, <code>*miring*</code>, <code>&gt; kutipan</code>, dan <code>- list</code>.
                </p>
              </div>

              {/* 3. KOMPONEN SEO & AI GENERATIVE ENGINE OPTIMIZATION (GEO) */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <h4 className="text-sm font-extrabold text-white">Komponen SEO & SEO AI (Generative Engine Optimization)</h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">
                    Schema.org / JSON-LD
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Meta Title */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-bold text-slate-300">Meta Title (Google & Tab Browser)</span>
                      <span className="text-slate-400">{formData.seo.metaTitle.length}/60</span>
                    </div>
                    <input
                      type="text"
                      value={formData.seo.metaTitle}
                      onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                      placeholder="Menerapkan Nilai Pancasila | Riska Puspita, S.Pd."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  {/* Keywords SEO */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Fokus Kata Kunci (Keywords SEO)</label>
                    <input
                      type="text"
                      value={formData.seo.keywords}
                      onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, keywords: e.target.value } })}
                      placeholder="pancasila digital, ppkn smp kelas 7, kurikulum merdeka"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Meta Description */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-slate-300">Meta Description (Snippet Pencarian Google & AI)</span>
                    <span className="text-slate-400">{formData.seo.metaDescription.length}/160</span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.seo.metaDescription}
                    onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                    placeholder="Ringkasan informatif 140-160 karakter untuk ditampilkan di hasil pencarian Google..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white resize-none"
                  />
                </div>

                {/* Target AI Prompt / Query */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-gold-400" />
                    <span>Target Kueri Pertanyaan AI (Perplexity, ChatGPT, Claude)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.seo.aiTargetQuery}
                    onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, aiTargetQuery: e.target.value } })}
                    placeholder="Contoh: Bagaimana cara siswa SMP mengamalkan nilai Pancasila di media sosial?"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                {/* AI Key Takeaways */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">
                    Poin Intisari untuk Mesin AI (Tulis satu poin per baris)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.seo.aiKeyTakeaways}
                    onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, aiKeyTakeaways: e.target.value } })}
                    placeholder="- Sila ke-1: Menghormati keragaman ibadah teman daring&#10;- Sila ke-2: Menolak cyberbullying..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white resize-none font-mono"
                  />
                </div>
              </div>

              {/* 4. PENJADWALAN TAYANG (PUBLISH SCHEDULING) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-600" />
                  <span>Status Publikasi & Penjadwalan Tayang</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    formData.status === 'published' 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-400' 
                      : 'bg-white border-slate-200 hover:bg-slate-100'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={formData.status === 'published'}
                      onChange={() => setFormData({ ...formData, status: 'published' })}
                      className="accent-emerald-600"
                    />
                    <div>
                      <p className="text-xs font-bold">Terbit Sekarang</p>
                      <p className="text-[10px] text-slate-500">Langsung tayang di website</p>
                    </div>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    formData.status === 'scheduled' 
                      ? 'bg-amber-50 border-amber-400 text-amber-800 ring-1 ring-amber-400' 
                      : 'bg-white border-slate-200 hover:bg-slate-100'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="scheduled"
                      checked={formData.status === 'scheduled'}
                      onChange={() => setFormData({ ...formData, status: 'scheduled' })}
                      className="accent-amber-600"
                    />
                    <div>
                      <p className="text-xs font-bold">Jadwalkan Tayang</p>
                      <p className="text-[10px] text-slate-500">Tayang otomatis sesuai waktu</p>
                    </div>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    formData.status === 'draft' 
                      ? 'bg-slate-200 border-slate-400 text-slate-900 ring-1 ring-slate-400' 
                      : 'bg-white border-slate-200 hover:bg-slate-100'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData({ ...formData, status: 'draft' })}
                      className="accent-slate-700"
                    />
                    <div>
                      <p className="text-xs font-bold">Simpan Draf</p>
                      <p className="text-[10px] text-slate-500">Belum tampil ke publik</p>
                    </div>
                  </label>
                </div>

                {/* Input Tanggal & Jam jika Terjadwal */}
                {formData.status === 'scheduled' && (
                  <div className="pt-2">
                    <label className="text-xs font-bold text-amber-800 block mb-1">
                      Pilih Tanggal & Jam Tayang Otomatis:
                    </label>
                    <input
                      type="datetime-local"
                      required={formData.status === 'scheduled'}
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900 shadow-xs"
                    />
                  </div>
                )}
              </div>

              </div>
              {/* Akhir Scrollable Modal Body */}

              {/* Modal Footer (Sticky Bottom) */}
              <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold shadow-soft flex items-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingArticleId ? 'Perbarui Artikel' : 'Simpan & Publikasikan'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
