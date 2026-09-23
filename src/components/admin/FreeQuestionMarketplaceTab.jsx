import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  CheckCircle2, 
  X,
  FileCheck
} from 'lucide-react';

export default function FreeQuestionMarketplaceTab({ downloadItems, onUpdateDownloadItems }) {
  const [itemsList, setItemsList] = useState([...downloadItems]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    grade: 'Kelas 7',
    semester: 'Semester 1 & 2',
    format: 'Word (.DOCX) + PDF',
    fileSize: '2.5 MB',
    topics: 'Pancasila, UUD 1945',
    description: '',
    downloadUrl: '#download'
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({
      title: '',
      grade: 'Kelas 7',
      semester: 'Semester 1 & 2',
      format: 'Word (.DOCX) + PDF',
      fileSize: '2.5 MB',
      topics: 'Pancasila, Norma dan UUD NRI 1945',
      description: 'Paket naskah soal lengkap dengan kisi-kisi, kunci jawaban, dan pedoman penskoran siap pakai.',
      downloadUrl: '#download'
    });
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      grade: item.grade,
      semester: item.semester,
      format: item.format,
      fileSize: item.fileSize,
      topics: (item.topics || []).join(', '),
      description: item.description,
      downloadUrl: item.downloadUrl || '#download'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newPkg = {
      id: editingId || `dl-${Date.now().toString().slice(-4)}`,
      title: form.title.trim(),
      grade: form.grade,
      semester: form.semester,
      format: form.format,
      fileSize: form.fileSize,
      downloadCount: 120,
      rating: 5.0,
      reviews: 25,
      isFree: true,
      description: form.description.trim() || 'Paket soal lengkap untuk evaluasi pembelajaran PPKn SMP.',
      topics: form.topics.split(',').map(t => t.trim()).filter(Boolean),
      curriculum: 'Kurikulum Merdeka',
      downloadUrl: form.downloadUrl.trim() || '#download'
    };

    let updated;
    if (editingId) {
      updated = itemsList.map(item => item.id === editingId ? newPkg : item);
    } else {
      updated = [newPkg, ...itemsList];
    }

    setItemsList(updated);
    onUpdateDownloadItems(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus paket bank soal gratis ini?")) {
      const updated = itemsList.filter(item => item.id !== id);
      setItemsList(updated);
      onUpdateDownloadItems(updated);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Katalog Paket Bank Soal Siap Unduh (Gratis)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola paket berkas Word dan PDF yang dapat diunduh gratis oleh rekan guru di halaman Bank Soal
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Tambah Paket Soal</span>
        </button>
      </div>

      {/* Grid of Downloadable Packages in Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itemsList.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-900">
                  GRATIS DOWNLOAD
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {item.grade} • {item.format}
                </span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                {item.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                <span>Ukuran: {item.fileSize}</span>
                <span>•</span>
                <span>{item.downloadCount} kali diunduh</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => openEdit(item)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Package */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                {editingId ? 'Sunting Paket Bank Soal' : 'Tambah Paket Soal Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Paket Soal *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Misal: Paket Soal Sumatif Akhir Semester Kelas 7"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jenjang Kelas</label>
                  <select
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Kelas 7">Kelas 7</option>
                    <option value="Kelas 8">Kelas 8</option>
                    <option value="Kelas 9">Kelas 9</option>
                    <option value="Kelas 7, 8, 9">Semua Kelas (7, 8, 9)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Format File</label>
                  <input
                    type="text"
                    value={form.format}
                    onChange={(e) => setForm({ ...form, format: e.target.value })}
                    placeholder="Word (.DOCX) + PDF"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Ukuran Berkas</label>
                  <input
                    type="text"
                    value={form.fileSize}
                    onChange={(e) => setForm({ ...form, fileSize: e.target.value })}
                    placeholder="2.4 MB"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Periode / Semester</label>
                  <input
                    type="text"
                    value={form.semester}
                    onChange={(e) => setForm({ ...form, semester: e.target.value })}
                    placeholder="Semester 1 & 2"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Topik Materi (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={form.topics}
                  onChange={(e) => setForm({ ...form, topics: e.target.value })}
                  placeholder="Pancasila, UUD 1945, Bhinneka Tunggal Ika"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Paket Soal</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Jelaskan kelengkapan kisi-kisi dan kunci jawaban..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Link File Unduhan (Google Drive / Direct URL)</label>
                <input
                  type="text"
                  value={form.downloadUrl}
                  onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })}
                  placeholder="https://drive.google.com/... (atau biarkan default)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  {editingId ? 'Simpan Perubahan' : 'Terbitkan Paket Soal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
