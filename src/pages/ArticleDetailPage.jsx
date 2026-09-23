import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check, 
  BookOpen, 
  User, 
  Sparkles, 
  Bot, 
  ChevronRight, 
  MessageCircle, 
  Award,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { getStoredArticles, getStoredProfile, getStoredPageSettings } from '../data/ppknData';

// Markdown simple parser helper untuk render semantic HTML
function renderMarkdownContent(content) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-6 my-4 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed">
          {currentList.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-patriot-700">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Heading 1
    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl sm:text-4xl font-black text-slate-900 mt-8 mb-4 leading-tight">
          {trimmed.replace('# ', '')}
        </h1>
      );
      continue;
    }

    // Heading 2
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-8 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gold-400 rounded-full inline-block" />
          <span>{trimmed.replace('## ', '')}</span>
        </h2>
      );
      continue;
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-bold text-slate-800 mt-6 mb-2">
          {trimmed.replace('### ', '')}
        </h3>
      );
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      flushList();
      elements.push(
        <hr key={`hr-${i}`} className="my-8 border-slate-200" />
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      const quoteText = trimmed.replace(/^>\s*/, '');
      elements.push(
        <blockquote key={`quote-${i}`} className="my-6 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-l-4 border-gold-400 text-slate-700 italic text-sm sm:text-base leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: formatInline(quoteText) }} />
        </blockquote>
      );
      continue;
    }

    // List item (- or * or numbered 1.)
    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '');
      currentList.push(formatInline(itemText));
      continue;
    }

    // Regular Paragraph
    flushList();
    elements.push(
      <p 
        key={`p-${i}`} 
        className="my-3 text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  }

  flushList();
  return elements;
}

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const allArticles = getStoredArticles();
  const teacher = getStoredProfile();
  const pageSettings = getStoredPageSettings();
  const [copiedLink, setCopiedLink] = useState(false);

  const article = allArticles.find(a => a.slug === slug);

  // SEO & JSON-LD Injection
  useEffect(() => {
    if (!article) return;

    // 1. Title Tag
    const pageTitle = article.seo?.metaTitle || `${article.title} | ${teacher.name || 'Riska Puspita, S.Pd.'}`;
    document.title = pageTitle;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = article.seo?.metaDescription || article.excerpt;

    // 3. Meta Keywords
    if (article.seo?.keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.name = 'keywords';
        document.head.appendChild(metaKw);
      }
      metaKw.content = article.seo.keywords;
    }

    // 4. JSON-LD Schema (Article & Person)
    const scriptId = 'article-jsonld-schema';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.seo?.metaDescription || article.excerpt,
      "image": [article.coverImage],
      "datePublished": article.publishedAt || new Date().toISOString(),
      "dateModified": article.publishedAt || new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": article.author || teacher.name || "Riska Puspita, S.Pd.",
        "jobTitle": "Guru Mata Pelajaran PPKn SMP",
        "worksFor": {
          "@type": "Organization",
          "name": teacher.school || "SMP Negeri Indonesia"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": pageSettings.general?.siteName || "Ruang PPKn Interaktif",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80"
        }
      },
      "keywords": article.seo?.keywords || "PPKn, Pendidikan Kewarganegaraan, Kurikulum Merdeka",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      // Clean up schema saat keluar dari halaman
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [article, teacher, pageSettings]);

  if (!article) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-surface-ground flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200 shadow-soft space-y-4">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
          <h2 className="text-lg font-black text-slate-900">Artikel Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500">
            Artikel yang Anda cari mungkin belum diterbitkan atau tautan yang Anda tuju telah dipindahkan.
          </p>
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-patriot-600 text-white text-xs font-bold hover:bg-patriot-700 shadow-soft transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Artikel</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const shareToWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Baca artikel menarik: "${article.title}" oleh ${article.author} di Ruang PPKn:\n${window.location.href}`)}`;

  const displayDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Terbitan Baru';

  const keyTakeaways = Array.isArray(article.seo?.aiKeyTakeaways)
    ? article.seo.aiKeyTakeaways
    : (typeof article.seo?.aiKeyTakeaways === 'string' && article.seo.aiKeyTakeaways
        ? article.seo.aiKeyTakeaways.split('\n').filter(Boolean)
        : []);

  return (
    <div className="pt-24 pb-20 bg-surface-ground min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto pb-1">
          <Link to="/" className="hover:text-patriot-600 transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/artikel" className="hover:text-patriot-600 transition-colors">Artikel</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 truncate">{article.category}</span>
        </nav>
      </div>

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft space-y-8">
          
          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gold-400 text-slate-950">
                {article.category}
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-patriot-600" />
                <time dateTime={article.publishedAt}>{displayDate}</time>
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-600" />
                <span>{article.readingTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Author Persona Compact Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400 bg-slate-900 flex items-center justify-center text-gold-400 font-black text-base shrink-0 shadow-soft">
                  {teacher.avatarUrl ? (
                    <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>RP</span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {article.author}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {article.authorRole || teacher.role || 'Pendidik PPKn SMP'}
                  </p>
                </div>
              </div>

              {/* Share Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={shareToWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan WA</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          <div className="rounded-3xl overflow-hidden aspect-16/9 bg-slate-100 border border-slate-200 shadow-soft">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* AI GENERATIVE ENGINE OPTIMIZATION (GEO) HIGHLIGHT BOX */}
          {keyTakeaways.length > 0 && (
            <section className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-gold-400" />
                  <h4 className="text-sm font-extrabold text-white">
                    Intisari Pembelajaran (Key Takeaways)
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">
                  Ringkasan Cepat
                </span>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>

              {article.seo?.aiTargetQuery && (
                <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-700/60 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
                  <span>Kueri Relevan: <em>"{article.seo.aiTargetQuery}"</em></span>
                </div>
              )}
            </section>
          )}

          {/* Article Main Markdown Content */}
          <section className="prose prose-slate max-w-none pt-2">
            {renderMarkdownContent(article.content)}
          </section>

          {/* Article Footer & SEO Tags */}
          <footer className="pt-6 border-t border-slate-100 space-y-6">
            {article.seo?.keywords && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-bold text-slate-500">Kata Kunci Pembahasan:</span>
                {article.seo.keywords.split(',').map((kw, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]"
                  >
                    #{kw.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* AUTHOR PERSONA CARD LENGKAP */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-gold-400 bg-slate-900 flex items-center justify-center text-gold-400 font-black text-2xl shrink-0 shadow-soft">
                {teacher.avatarUrl ? (
                  <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" />
                ) : (
                  <span>RP</span>
                )}
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    Tentang Penulis: {teacher.name || 'Riska Puspita, S.Pd.'}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-patriot-50 text-patriot-700 border border-patriot-200">
                    Pendidik Resmi
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {teacher.bio || "Pendidik mata pelajaran Pendidikan Pancasila dan Kewarganegaraan jenjang SMP yang berdedikasi menciptakan media belajar inovatif dan menumbuhkan karakter Pelajar Pancasila di era digital."}
                </p>

                <div className="pt-2 flex items-center justify-center sm:justify-start gap-4">
                  <Link
                    to="/profil"
                    className="text-xs font-bold text-patriot-600 hover:text-patriot-800 transition-colors"
                  >
                    Lihat Rekam Jejak Guru →
                  </Link>

                  <Link
                    to="/contact"
                    className="text-xs font-bold text-gold-700 hover:text-gold-900 transition-colors flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Konsultasi dengan Bu Riska</span>
                  </Link>
                </div>
              </div>
            </div>

          </footer>

        </article>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-patriot-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Semua Artikel</span>
          </Link>
        </div>

      </main>

    </div>
  );
}
