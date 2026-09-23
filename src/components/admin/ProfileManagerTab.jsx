import React, { useState, useRef } from 'react';
import { 
  User, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3,
  CheckCircle2, 
  Quote, 
  Award,
  Sparkles,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Camera,
  RotateCcw
} from 'lucide-react';

export default function ProfileManagerTab({ 
  profile, 
  timeline, 
  onUpdateProfile, 
  onUpdateTimeline 
}) {
  const [profileForm, setProfileForm] = useState({ 
    avatarUrl: '',
    ...profile 
  });
  const [timelineList, setTimelineList] = useState([...timeline]);
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const avatarInputRef = useRef(null);
  const milestoneImageInputRef = useRef(null);

  // Modal State untuk Tambah / Edit Milestone
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingMilestoneIndex, setEditingMilestoneIndex] = useState(null); // null = tambah baru, number = edit
  
  const [milestoneForm, setMilestoneForm] = useState({
    year: '2025',
    title: '',
    subtitle: '',
    tag: 'Inovasi Pembelajaran',
    description: '',
    imageUrl: '',
    icon: 'Sparkles'
  });

  // Handler Upload Foto Profil Guru
  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file foto profil maksimal 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileForm(prev => ({ ...prev, avatarUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setProfileForm(prev => ({ ...prev, avatarUrl: '' }));
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  // Handler Buka Modal Tambah Milestone
  const handleOpenAddMilestone = () => {
    setEditingMilestoneIndex(null);
    setMilestoneForm({
      year: new Date().getFullYear().toString(),
      title: '',
      subtitle: '',
      tag: 'Inovasi Pembelajaran',
      description: '',
      imageUrl: '',
      icon: 'Sparkles'
    });
    setIsMilestoneModalOpen(true);
  };

  // Handler Buka Modal Edit Milestone
  const handleOpenEditMilestone = (index) => {
    setEditingMilestoneIndex(index);
    const item = timelineList[index];
    setMilestoneForm({
      year: item.year || '',
      title: item.title || '',
      subtitle: item.subtitle || '',
      tag: item.tag || 'Inovasi Pembelajaran',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      icon: item.icon || 'Sparkles'
    });
    setIsMilestoneModalOpen(true);
  };

  // Handler Upload Foto Milestone
  const handleMilestoneImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("Ukuran foto dokumentasi maksimal 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setMilestoneForm(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handler Simpan Milestone (Tambah / Edit)
  const handleSaveMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!milestoneForm.title.trim()) return;

    const payload = {
      year: milestoneForm.year.trim(),
      title: milestoneForm.title.trim(),
      subtitle: milestoneForm.subtitle.trim() || 'Dedikasi Guru PPKn',
      description: milestoneForm.description.trim() || 'Tonggak pencapaian dan pengabdian guru.',
      tag: milestoneForm.tag.trim() || 'Pendidikan',
      imageUrl: milestoneForm.imageUrl || '',
      icon: milestoneForm.icon || 'Sparkles'
    };

    let updated;
    if (editingMilestoneIndex !== null) {
      // Mode Edit
      updated = timelineList.map((item, idx) => idx === editingMilestoneIndex ? payload : item);
    } else {
      // Mode Tambah Baru
      updated = [...timelineList, payload];
    }

    setTimelineList(updated);
    onUpdateTimeline(updated);
    setIsMilestoneModalOpen(false);
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

      {/* 1. Form Editor Profil Guru & Upload Foto Profil */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-patriot-600" />
              <span>Foto Profil & Biodata Guru</span>
            </h3>
            <p className="text-xs text-slate-500">
              Perbarui foto resmi dan narasi identitas yang tampil di halaman profil, navbar, dan author persona artikel
            </p>
          </div>
          <span className="text-xs font-bold text-patriot-700 px-3 py-1 rounded-full bg-patriot-50 border border-patriot-200">
            Profil Resmi
          </span>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          {/* UPLOAD FOTO PROFIL SECTION */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-gold-400 shadow-soft bg-slate-900 flex items-center justify-center text-white">
                {profileForm.avatarUrl ? (
                  <img 
                    src={profileForm.avatarUrl} 
                    alt="Foto Profil Bu Riska" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-3xl font-black text-gold-400">RP</span>
                    <span className="text-[10px] font-bold text-slate-300 mt-1">Riska Puspita</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-2.5 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white shadow-soft transition-transform active:scale-95"
                title="Ganti Foto Profil"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Foto Profil Resmi</h4>
                <p className="text-xs text-slate-500">
                  Gunakan foto formal atau semi-formal resolusi persegi (JPG, PNG, atau WEBP, maks 2MB).
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <input 
                  type="file" 
                  ref={avatarInputRef}
                  onChange={handleAvatarFileChange}
                  accept="image/*"
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-patriot-600" />
                  <span>Unggah dari Komputer</span>
                </button>

                {profileForm.avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                  >
                    Hapus Foto
                  </button>
                )}
              </div>

              {/* Input URL Alternatif */}
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-bold text-slate-500">Atau masukkan URL Foto Langsung:</label>
                <input
                  type="url"
                  placeholder="https://domain.com/foto-riska.jpg"
                  value={profileForm.avatarUrl}
                  onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Form Fields Biodata */}
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

      {/* 2. Timeline Perjalanan Hidup Manager (Bisa Edit & Tambah Foto) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold-600" />
              <span>Garis Waktu Perjalanan Dedikasi Guru (Timeline)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Kelola tonggak sejarah karier Bu Riska lengkap dengan foto dokumentasi dan deskripsi pencapaian
            </p>
          </div>

          <button
            onClick={handleOpenAddMilestone}
            className="px-4 py-2.5 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold shadow-soft flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tonggak Sejarah</span>
          </button>
        </div>

        <div className="space-y-4">
          {timelineList.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Thumbnail Foto Milestone */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200 overflow-hidden shrink-0 border border-slate-300 flex items-center justify-center text-slate-400">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-gold-400 text-slate-950">
                      Tahun {item.year}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {item.tag}
                    </span>
                    {item.imageUrl && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Ada Foto
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">{item.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons: EDIT & HAPUS */}
              <div className="flex items-center gap-1 self-end sm:self-start shrink-0">
                <button
                  onClick={() => handleOpenEditMilestone(idx)}
                  className="p-2 rounded-xl text-slate-600 hover:text-patriot-600 hover:bg-patriot-50 border border-slate-200 sm:border-transparent transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Edit Milestone"
                >
                  <Edit3 className="w-4 h-4 text-patriot-600" />
                  <span className="sm:hidden">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteMilestone(idx)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 sm:border-transparent transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Hapus Milestone"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span className="sm:hidden">Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Tambah / Edit Milestone Lengkap dengan Foto */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-soft-lg space-y-4 border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {editingMilestoneIndex !== null ? 'Sunting Tonggak Sejarah' : 'Tambah Tonggak Sejarah Baru'}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingMilestoneIndex !== null ? 'Perbarui informasi dan foto tonggak karier' : 'Catat tonggak pencapaian baru pengabdian guru'}
                </p>
              </div>
              <button
                onClick={() => setIsMilestoneModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMilestoneSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tahun *</label>
                  <input
                    type="text"
                    required
                    value={milestoneForm.year}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                    placeholder="2025"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori Tag</label>
                  <input
                    type="text"
                    value={milestoneForm.tag}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, tag: e.target.value })}
                    placeholder="Inovasi Kurikulum"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Tonggak Pencapaian *</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  placeholder="Misal: Peraih Guru Inovatif Tingkat Provinsi"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Sub-Judul / Keterangan Lembaga</label>
                <input
                  type="text"
                  value={milestoneForm.subtitle}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, subtitle: e.target.value })}
                  placeholder="Dinas Pendidikan dan Kebudayaan"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Narasi Perjalanan</label>
                <textarea
                  rows={3}
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                  placeholder="Ceritakan dampak inovasi ini terhadap siswa dan pengabdian..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              {/* FOTO DOKUMENTASI / SERTIFIKAT TONGGAK SEJARAH */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gold-600" />
                  <span>Foto Dokumentasi / Sertifikat Tonggak Sejarah</span>
                </label>

                <div className="flex items-center gap-4">
                  {milestoneForm.imageUrl ? (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-300 shrink-0">
                      <img 
                        src={milestoneForm.imageUrl} 
                        alt="Pratinjau Foto Milestone" 
                        className="w-full h-full object-cover" 
                      />
                      <button
                        type="button"
                        onClick={() => setMilestoneForm(prev => ({ ...prev, imageUrl: '' }))}
                        className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-red-600"
                        title="Hapus Foto"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0 border border-dashed border-slate-300">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <input 
                      type="file"
                      ref={milestoneImageInputRef}
                      onChange={handleMilestoneImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => milestoneImageInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1.5 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-patriot-600" />
                      <span>Unggah Foto Dokumentasi</span>
                    </button>
                    <input
                      type="url"
                      placeholder="Atau tempel URL gambar..."
                      value={milestoneForm.imageUrl}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, imageUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold transition-colors"
                >
                  {editingMilestoneIndex !== null ? 'Perbarui Tonggak Sejarah' : 'Simpan Tonggak Sejarah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
