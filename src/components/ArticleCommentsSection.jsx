import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { 
  getStoredArticleComments, 
  addArticleComment, 
  syncArticleCommentsFromSupabase 
} from '../data/ppknData';

// Helper warna avatar berdasarkan nama
const AVATAR_COLORS = [
  'bg-blue-600 text-white',
  'bg-emerald-600 text-white',
  'bg-amber-600 text-white',
  'bg-rose-600 text-white',
  'bg-indigo-600 text-white',
  'bg-teal-600 text-white',
  'bg-purple-600 text-white'
];

function getAvatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function formatCommentDate(dateString) {
  if (!dateString) return 'Baru saja';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Baru saja';
    
    // Format tanggal Indonesia ramah
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Baru saja';
  }
}

export default function ArticleCommentsSection({ articleSlug, articleTitle, teacherName = 'Riska Puspita, S.Pd.' }) {
  const [allComments, setAllComments] = useState(() => getStoredArticleComments());
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sinkronisasi data komentar dan listener custom event
  useEffect(() => {
    // Sync Supabase saat komponen dimount
    syncArticleCommentsFromSupabase().then(res => {
      if (Array.isArray(res)) setAllComments(res);
    });

    const handleCommentsUpdated = (e) => {
      if (e.detail) {
        setAllComments(e.detail);
      } else {
        setAllComments(getStoredArticleComments());
      }
    };

    window.addEventListener('article-comments-updated', handleCommentsUpdated);
    return () => window.removeEventListener('article-comments-updated', handleCommentsUpdated);
  }, []);

  // Filter komentar spesifik untuk artikel ini
  const articleComments = allComments.filter(c => c.articleSlug === articleSlug);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!authorName.trim()) {
      setErrorMessage('Silakan masukkan nama Anda terlebih dahulu.');
      return;
    }
    if (!content.trim()) {
      setErrorMessage('Silakan tuliskan komentar atau pertanyaan Anda.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addArticleComment({
        articleSlug,
        articleTitle,
        authorName: authorName.trim(),
        content: content.trim()
      });

      setAllComments(getStoredArticleComments());
      setAuthorName('');
      setContent('');
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setErrorMessage('Terjadi kendala saat mengirim komentar. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="komentar-artikel" className="pt-8 border-t border-slate-200 space-y-8">
      
      {/* Header Bagian Komentar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-patriot-100 text-patriot-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Ruang Diskusi & Tanya Jawab
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Tuliskan pertanyaan, tanggapan, atau pengalamanmu terkait materi ini langsung kepada Bu Riska.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Tanpa Perlu Login
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
            {articleComments.length} Komentar
          </span>
        </div>
      </div>

      {/* Form Input Komentar Publik */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-soft-sm space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span>Tinggalkan Komentar atau Pertanyaan</span>
        </div>

        {submitSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Komentar Berhasil Terkirim!</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Komentar Anda telah dipublikasikan dan diteruskan ke Panel Admin Bu Riska untuk ditinjau dan dibalas.
              </p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nama Anda <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Contoh: Budi Pratama (Kelas 8B) / Rekan Guru PPKn"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-patriot-500 focus:border-patriot-500 shadow-soft-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Isi Komentar / Pertanyaan Pembelajaran <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                <MessageCircle className="w-4 h-4" />
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                placeholder="Tuliskan pandanganmu, pertanyaan materi tugas, atau tanggapan terkait artikel ini..."
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-patriot-500 focus:border-patriot-500 shadow-soft-sm transition-all resize-y min-h-[90px]"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              * Tidak perlu kata sandi atau akun. Setiap pesan akan langsung terhubung ke dashboard admin Bu Riska.
            </p>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSubmitting || !authorName.trim() || !content.trim()}
              className="px-5 py-2.5 rounded-2xl bg-patriot-700 hover:bg-patriot-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-soft transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Mengirimkan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Komentar Sekarang</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Komentar Pembaca */}
      <div className="space-y-4">
        {articleComments.length === 0 ? (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-dashed border-slate-300 text-center space-y-2 shadow-soft-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-700">
              Belum Ada Komentar untuk Artikel Ini
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Jadilah yang pertama membuka ruang diskusi! Tuliskan tanggapan atau pertanyaanmu di atas dan Bu Riska akan membalasnya.
            </p>
          </div>
        ) : (
          articleComments.map((comment) => {
            const avatarColor = getAvatarColor(comment.authorName);
            const initials = getInitials(comment.authorName);

            return (
              <div 
                key={comment.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm space-y-4 transition-all hover:border-slate-300"
              >
                {/* Header Komentar Pengunjung */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm shadow-soft-sm shrink-0 ${avatarColor}`}>
                      {initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm text-slate-900">
                          {comment.authorName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          Pembaca
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{formatCommentDate(comment.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {comment.reply ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Dibalas Guru</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                      Menunggu Balasan
                    </span>
                  )}
                </div>

                {/* Konten Komentar Pengunjung */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal pl-0 sm:pl-13 whitespace-pre-line">
                  {comment.content}
                </p>

                {/* BALASAN RESMI GURU (JIKA ADMIN SUDAH MEMBALAS) */}
                {comment.reply && (
                  <div className="sm:ml-8 mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/70 to-slate-50 border-l-4 border-l-gold-500 border border-gold-200/60 shadow-soft-sm space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-slate-900 text-gold-400 font-black text-xs flex items-center justify-center shrink-0 shadow-soft-sm">
                          RP
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-xs text-slate-900">
                              {comment.reply.author || teacherName}
                            </span>
                            <ShieldCheck className="w-3.5 h-3.5 text-patriot-600" />
                          </div>
                          <span className="text-[10px] font-semibold text-gold-700">
                            {comment.reply.authorRole || 'Pendidik PPKn SMP'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatCommentDate(comment.reply.repliedAt)}</span>
                      </div>
                    </div>

                    <div className="pt-1 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium pl-9">
                      {comment.reply.content}
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </section>
  );
}
