import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ExternalLink, 
  Edit3, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  BookOpen,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { replyArticleComment, deleteArticleComment, getStoredProfile } from '../../data/ppknData';

const QUICK_REPLIES = [
  "Terima kasih banyak atas tanggapan dan refleksinya!",
  "Pertanyaan yang sangat kritis dan cerdas! Terus kembangkan pemikiran kritis ya.",
  "Penerapan nilai luhur Pancasila memang sangat relevan untuk dipraktikkan langsung di era digital saat ini.",
  "Semoga artikel materi PPKn ini dapat membantu pemahaman tugas dan wawasan kebangsaanmu!"
];

function formatCommentDate(dateString) {
  if (!dateString) return 'Baru saja';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Baru saja';
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

export default function CommentsManagerTab({ comments = [], onUpdateComments }) {
  const teacher = getStoredProfile();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'Menunggu Balasan' | 'Dibalas'
  const [filterArticle, setFilterArticle] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State form reply per komentar
  const [replyInputs, setReplyInputs] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  // Kumpulan artikel unik untuk dropdown filter
  const uniqueArticles = Array.from(
    new Map(comments.map(c => [c.articleSlug, { slug: c.articleSlug, title: c.articleTitle }])).values()
  );

  const pendingCount = comments.filter(c => c.status === 'Menunggu Balasan' || !c.reply).length;
  const repliedCount = comments.filter(c => c.status === 'Dibalas' || Boolean(c.reply)).length;

  // Filter list
  const filteredComments = comments.filter(c => {
    const isPending = c.status === 'Menunggu Balasan' || !c.reply;
    const isReplied = c.status === 'Dibalas' || Boolean(c.reply);

    if (filterStatus === 'Menunggu Balasan' && !isPending) return false;
    if (filterStatus === 'Dibalas' && !isReplied) return false;
    if (filterArticle !== 'all' && c.articleSlug !== filterArticle) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAuthor = c.authorName?.toLowerCase().includes(q);
      const matchContent = c.content?.toLowerCase().includes(q);
      const matchArticle = c.articleTitle?.toLowerCase().includes(q);
      if (!matchAuthor && !matchContent && !matchArticle) return false;
    }

    return true;
  });

  const handleInputChange = (commentId, text) => {
    setReplyInputs(prev => ({
      ...prev,
      [commentId]: text
    }));
  };

  const handleApplyQuickReply = (commentId, template) => {
    setReplyInputs(prev => {
      const existing = prev[commentId] || '';
      return {
        ...prev,
        [commentId]: existing ? `${existing} ${template}` : template
      };
    });
  };

  const handleStartEditReply = (comment) => {
    setEditingCommentId(comment.id);
    setReplyInputs(prev => ({
      ...prev,
      [comment.id]: comment.reply?.content || ''
    }));
  };

  const handleCancelEdit = (commentId) => {
    setEditingCommentId(null);
    setReplyInputs(prev => {
      const copy = { ...prev };
      delete copy[commentId];
      return copy;
    });
  };

  const handleSubmitReply = async (commentId) => {
    const text = (replyInputs[commentId] || '').trim();
    if (!text) {
      alert("Silakan ketikkan balasan terlebih dahulu.");
      return;
    }

    setSubmittingId(commentId);
    try {
      const updatedList = await replyArticleComment(
        commentId,
        text,
        teacher.name || "Riska Puspita, S.Pd."
      );
      if (onUpdateComments) onUpdateComments(updatedList);
      
      setEditingCommentId(null);
      setSuccessToast(`Balasan berhasil disimpan dan dipublikasikan ke artikel!`);
      setTimeout(() => setSuccessToast(null), 3500);
    } catch {
      alert("Gagal menyimpan balasan. Silakan coba kembali.");
    } finally {
      setSubmittingId(null);
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus komentar ini? Komentar dan balasannya akan dihapus permanen.")) {
      try {
        const updatedList = await deleteArticleComment(commentId);
        if (onUpdateComments) onUpdateComments(updatedList);
        setSuccessToast(`Komentar berhasil dihapus.`);
        setTimeout(() => setSuccessToast(null), 3000);
      } catch {
        alert("Gagal menghapus komentar.");
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notifikasi */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-soft-lg flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Tab */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Manajemen & Balas Komentar Artikel
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-patriot-50 text-patriot-700 border border-patriot-200">
              Interaksi Siswa
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tanggapi pertanyaan dan apresiasi dari siswa/pembaca. Balasan Anda akan tampil resmi di bawah artikel terkait.
          </p>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400">Total Komentar</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{comments.length}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-600">Menunggu Balasan</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{pendingCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-600">Sudah Dibalas Resmi</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{repliedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-soft space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0 overflow-x-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({comments.length})
            </button>
            <button
              onClick={() => setFilterStatus('Menunggu Balasan')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === 'Menunggu Balasan'
                  ? 'bg-amber-500 text-white shadow-soft-sm'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              Perlu Dibalas ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus('Dibalas')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === 'Dibalas'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              Sudah Dibalas ({repliedCount})
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 max-w-xl">
            {/* Filter Artikel Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filterArticle}
                onChange={(e) => setFilterArticle(e.target.value)}
                className="w-full sm:w-48 pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-patriot-500 transition-colors truncate"
              >
                <option value="all">Semua Artikel ({uniqueArticles.length})</option>
                {uniqueArticles.map((art) => (
                  <option key={art.slug} value={art.slug}>
                    {art.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau teks komentar..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-patriot-500 transition-all"
              />
            </div>
          </div>

        </div>
      </div>

      {/* List Komentar */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft space-y-2">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h4 className="text-base font-bold text-slate-800">Tidak ada komentar ditemukan</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || filterStatus !== 'all' || filterArticle !== 'all'
                ? "Tidak ada komentar yang cocok dengan filter pencarian Anda."
                : "Belum ada komentar dari pengunjung yang masuk."}
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => {
            const isEditing = editingCommentId === comment.id;
            const hasReply = Boolean(comment.reply);
            const currentReplyText = replyInputs[comment.id] !== undefined 
              ? replyInputs[comment.id] 
              : (comment.reply?.content || '');

            return (
              <div 
                key={comment.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-soft p-5 sm:p-6 space-y-4 transition-all"
              >
                
                {/* Header Komentar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm text-slate-900">
                        {comment.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        • {formatCommentDate(comment.createdAt)}
                      </span>
                      {hasReply ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Sudah Dibalas</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>Menunggu Balasan</span>
                        </span>
                      )}
                    </div>

                    {/* Judul Artikel Asal */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <BookOpen className="w-3.5 h-3.5 text-patriot-600 shrink-0" />
                      <span className="font-semibold text-slate-700 truncate max-w-md">
                        {comment.articleTitle}
                      </span>
                      <a
                        href={`/artikel/${comment.articleSlug}#komentar-artikel`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-patriot-600 hover:text-patriot-800 text-[11px] font-bold flex items-center gap-0.5 ml-1 transition-colors"
                        title="Buka artikel ini di tab baru"
                      >
                        <span>Lihat di Web</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Tombol Aksi Hapus */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus komentar ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Isi Komentar Pengunjung */}
                <div className="p-4 rounded-2xl bg-slate-50 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line border border-slate-100">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Isi Komentar Pengunjung:
                  </span>
                  {comment.content}
                </div>

                {/* Tampilan Balasan Resmi Guru (Jika sudah ada & tidak sedang mode edit) */}
                {hasReply && !isEditing && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-l-4 border-gold-500 border border-gold-200/60 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-patriot-700" />
                        <span className="text-xs font-black text-slate-900">
                          Balasan Anda ({comment.reply.author || teacher.name})
                        </span>
                        <span className="text-[10px] text-slate-500">
                          • {formatCommentDate(comment.reply.repliedAt)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleStartEditReply(comment)}
                        className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3 h-3 text-gold-600" />
                        <span>Edit Balasan</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line pl-6">
                      {comment.reply.content}
                    </p>
                  </div>
                )}

                {/* Form Input Balasan (Jika belum dibalas ATAU sedang mode edit) */}
                {(!hasReply || isEditing) && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3.5 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold-400" />
                        <span className="text-xs font-bold text-white">
                          {isEditing ? 'Perbarui Balasan Resmi' : 'Ketik Balasan untuk Siswa'}
                        </span>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => handleCancelEdit(comment.id)}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Batal Edit</span>
                        </button>
                      )}
                    </div>

                    {/* Template Cepat */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-semibold text-slate-400 mr-1">Rekomendasi Cepat:</span>
                      {QUICK_REPLIES.map((tpl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleApplyQuickReply(comment.id, tpl)}
                          className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium border border-slate-700 transition-colors text-left"
                        >
                          + {tpl.substring(0, 32)}...
                        </button>
                      ))}
                    </div>

                    {/* Textarea */}
                    <textarea
                      value={currentReplyText}
                      onChange={(e) => handleInputChange(comment.id, e.target.value)}
                      placeholder={`Tuliskan balasan edukatif dan penyemangat dari ${teacher.name || 'Bu Riska'}...`}
                      rows={3}
                      className="w-full p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-y"
                    />

                    {/* Tombol Simpan Balasan */}
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[11px] text-slate-400">
                        Akan tampil resmi dengan label guru pengampu.
                      </p>

                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={submittingId === comment.id || !currentReplyText.trim()}
                        className="px-4 py-2 rounded-xl bg-gold-400 hover:bg-gold-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 font-black text-xs transition-all flex items-center gap-2 shadow-soft"
                      >
                        {submittingId === comment.id ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>{isEditing ? 'Perbarui Balasan' : 'Kirim Balasan Resmi'}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
