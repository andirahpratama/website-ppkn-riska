import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Quote, 
  Award,
  Sparkles,
  Save,
  X
} from 'lucide-react';

export default function ProfileManagerTab({ 
  profile, 
  timeline, 
  onUpdateProfile, 
  onUpdateTimeline 
}) {
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [timelineList, setTimelineList] = useState([...timeline]);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // Modal Tambah Milestone
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [newYear, setNewYear] = useState('2025');
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTag, setNewTag] = useState('Inovasi Pembelajaran');
  const [newDesc, setNewDesc] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMilestone = {
      year: newYear.trim(),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Dedikasi Guru PPKn',
      description: newDesc.trim() || 'Tonggak pencapaian dan inovasi pengabdian guru di lingkungan sekolah.',
      tag: newTag,
      icon: 'Sparkles'
    };

    const updated = [...timelineList, newMilestone];
    setTimelineList(updated);
    onUpdateTimeline(updated);
    setIsMilestoneModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleDeleteMilestone = (index) => {
    if (window.confirm("Hapus tonggak sejarah ini dari garis waktu perjalanan hidup?")) {
      const updated = timelineList.filter((_, idx) => idx !== index);
      setTimelineList(updated);
      onUpdateTimeline(updated);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Alert */}
      {isSavedAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white p-4 rounded-2xl shadow-soft-lg border border-emerald-700 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-bold">Data profil guru berhasil diperbarui!</p>
        </div>
      )}

      {/* 1. Form Editor Profil Guru */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Informasi Biodata & Kutipan Guru
            </h3>
            <p className="text-xs text-slate-500">
              Perbarui identitas yang tampil pada kartu profil beranda dan halaman profil
            </p>
          </div>
          <span className="text-xs font-bold text-patriot-700 px-3 py-1 rounded-full bg-patriot-50 border border-patriot-200">
            Profil Resmi
          </span>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nama Lengkap & Gelar</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Peran & Mata Pelajaran</label>
              <input
                type="text"
                required
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Motto / Kutipan Inspiratif Pembelajaran</label>
            <textarea
              rows={2}
              required
              value={profileForm.motto}
              onChange={(e) => setProfileForm({ ...profileForm, motto: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Kata Sambutan & Pengantar Guru (Bio)</label>
            <textarea
              rows={3}
              required
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4 text-gold-400" />
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Timeline Perjalanan Hidup Manager */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Garis Waktu Perjalanan Dedikasi Guru (Timeline)
            </h3>
            <p className="text-xs text-slate-500">
              Kelola tonggak sejarah karier Bu Riska yang muncul pada komponen interaktif garis waktu
            </p>
          </div>

          <button
            onClick={() => setIsMilestoneModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold shadow-soft flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tonggak Sejarah</span>
          </button>
        </div>

        <div className="space-y-3">
          {timelineList.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-gold-400 text-slate-950">
                    Tahun {item.year}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 font-semibold">{item.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => handleDeleteMilestone(idx)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                title="Hapus Milestone"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Tambah Milestone */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Tambah Tonggak Karier Baru
              </h3>
              <button
                onClick={() => setIsMilestoneModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMilestone} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tahun</label>
                  <input
                    type="text"
                    required
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori Tag</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Inovasi Kurikulum"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Pencapaian *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Misal: Peraih Guru Inovatif Tingkat Provinsi"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Sub-Judul / Keterangan Lembaga</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="Dinas Pendidikan dan Kebudayaan"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Narasi Perjalanan</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ceritakan dampak inovasi ini terhadap siswa..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold"
                >
                  Simpan Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
