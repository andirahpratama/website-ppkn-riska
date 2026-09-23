import React, { useState } from 'react';
import { 
  MessageSquare, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  Send,
  X,
  User,
  Phone,
  Calendar
} from 'lucide-react';

export default function InquiriesManagerTab({ consultations, onUpdateConsultations }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [replySentSuccess, setReplySentSuccess] = useState(false);

  const filtered = consultations.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const handleUpdateStatus = (id, newStatus) => {
    const updated = consultations.map(c => c.id === id ? { ...c, status: newStatus } : c);
    onUpdateConsultations(updated);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus pesan pertanyaan siswa ini?")) {
      const updated = consultations.filter(c => c.id !== id);
      onUpdateConsultations(updated);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setReplySentSuccess(true);
    if (selectedMessage) {
      handleUpdateStatus(selectedMessage.id, 'Selesai');
    }
    setTimeout(() => {
      setReplySentSuccess(false);
      setReplyText('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Kotak Masuk Aspirasi Siswa (Pojok Sapa)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar pertanyaan konsultasi tugas dan materi PPKn yang dikirim siswa secara daring
          </p>
        </div>

        {/* Filter Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-soft-sm focus:outline-none"
          >
            <option value="all">Semua Pesan ({consultations.length})</option>
            <option value="Belum Dibaca">Belum Dibaca</option>
            <option value="Dalam Proses">Dalam Proses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Message List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">Tidak ada pesan ditemukan</h4>
          <p className="text-xs text-slate-400 mt-1">Pesan yang dikirim siswa melalui formulir sapa akan muncul di sini.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className={`bg-white rounded-3xl p-5 border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-soft-sm hover:shadow-soft ${
                item.status === 'Belum Dibaca' ? 'border-red-200 bg-red-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-extrabold text-slate-900">
                    {item.student_name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {item.grade}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.contact || 'Tanpa Kontak'}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ml-auto sm:ml-0 ${
                    item.status === 'Belum Dibaca'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : item.status === 'Dalam Proses'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-medium line-clamp-2 leading-relaxed">
                  "{item.message}"
                </p>

                {item.date && (
                  <p className="text-[10px] text-slate-400">
                    Diterima: {item.date}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => setSelectedMessage(item)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Buka & Balas</span>
                </button>

                <select
                  value={item.status}
                  onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                  className="px-2.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="Belum Dibaca">Belum Dibaca</option>
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Hapus Pesan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail & Balas Pesan */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <h3 className="text-base font-black text-slate-900">
                  Detail Pertanyaan Siswa
                </h3>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="p-1.5 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Metadata */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Siswa:</span>
                <span className="font-bold text-slate-900">{selectedMessage.student_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kelas / Status:</span>
                <span className="font-bold text-slate-900">{selectedMessage.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kontak Pengirim:</span>
                <span className="font-bold text-slate-900">{selectedMessage.contact || '-'}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                <span className="text-slate-500">Status Saat Ini:</span>
                <span className="font-bold text-patriot-700">{selectedMessage.status}</span>
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-700">Isi Pertanyaan:</p>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                "{selectedMessage.message}"
              </div>
            </div>

            {/* Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700">Catatan Tanggapan Bu Riska:</label>
              <textarea
                rows={3}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tuliskan ulasan atau panduan tugas untuk disampaikan ke siswa..."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-gold-400 resize-none"
              />

              {replySentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Tanggapan tersimpan dan status diubah menjadi "Selesai"!</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-gold-400" />
                  <span>Simpan Jawaban</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
