import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  FileText,
  Sparkles,
  X
} from 'lucide-react';

export default function PortfolioManagerTab({ portfolio, onUpdatePortfolio }) {
  const [portfolioDataState, setPortfolioDataState] = useState({ ...portfolio });

  // Modal State P5
  const [isP5ModalOpen, setIsP5ModalOpen] = useState(false);
  const [p5Title, setP5Title] = useState('');
  const [p5Theme, setP5Theme] = useState('Bhinneka Tunggal Ika');
  const [p5Date, setP5Date] = useState('Semester Genap 2024');
  const [p5Desc, setP5Desc] = useState('');
  const [p5Impact, setP5Impact] = useState('');
  const [p5Tag, setP5Tag] = useState('Proyek Siswa');

  // Modal State Modul Ajar
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [modTitle, setModTitle] = useState('');
  const [modGrade, setModGrade] = useState('Kelas 7');
  const [modFormat, setModFormat] = useState('PDF (20 Halaman)');
  const [modFeatures, setModFeatures] = useState('');

  const handleAddP5 = (e) => {
    e.preventDefault();
    if (!p5Title.trim()) return;

    const newProject = {
      id: `p5-${Date.now().toString().slice(-4)}`,
      title: p5Title.trim(),
      theme: p5Theme,
      date: p5Date,
      description: p5Desc.trim() || 'Dokumentasi kegiatan proyek Profil Pelajar Pancasila.',
      impact: p5Impact.trim() || 'Meningkatkan kesadaran karakter Pancasila bagi seluruh siswa.',
      tag: p5Tag
    };

    const updated = {
      ...portfolioDataState,
      p5Projects: [newProject, ...(portfolioDataState.p5Projects || [])]
    };
    setPortfolioDataState(updated);
    onUpdatePortfolio(updated);
    setIsP5ModalOpen(false);
    setP5Title('');
    setP5Desc('');
  };

  const handleDeleteP5 = (id) => {
    if (window.confirm("Hapus dokumentasi proyek P5 ini?")) {
      const updated = {
        ...portfolioDataState,
        p5Projects: (portfolioDataState.p5Projects || []).filter(p => p.id !== id)
      };
      setPortfolioDataState(updated);
      onUpdatePortfolio(updated);
    }
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!modTitle.trim()) return;

    const newMod = {
      id: `mod-${Date.now().toString().slice(-4)}`,
      title: modTitle.trim(),
      grade: modGrade,
      format: modFormat,
      features: modFeatures.trim() || 'Dilengkapi LKPD Berbasis Kontekstual & Rubrik Asesmen',
      downloadNote: 'Dapat digunakan bebas oleh sesama rekan guru PPKn SMP se-Indonesia.'
    };

    const updated = {
      ...portfolioDataState,
      modules: [newMod, ...(portfolioDataState.modules || [])]
    };
    setPortfolioDataState(updated);
    onUpdatePortfolio(updated);
    setIsModuleModalOpen(false);
    setModTitle('');
    setModFeatures('');
  };

  const handleDeleteModule = (id) => {
    if (window.confirm("Hapus berkas modul ajar ini?")) {
      const updated = {
        ...portfolioDataState,
        modules: (portfolioDataState.modules || []).filter(m => m.id !== id)
      };
      setPortfolioDataState(updated);
      onUpdatePortfolio(updated);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Proyek P5 Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Dokumentasi Proyek P5 Nusantara
            </h3>
            <p className="text-xs text-slate-500">
              Kelola pameran karya gelar Profil Pelajar Pancasila binaan Bu Riska
            </p>
          </div>

          <button
            onClick={() => setIsP5ModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold shadow-soft flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek P5</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(portfolioDataState.p5Projects || []).map((project) => (
            <div 
              key={project.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-patriot-50 text-patriot-700 border border-patriot-200">
                    {project.theme}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">{project.date}</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs text-emerald-800 font-semibold">
                  Dampak: {project.impact}
                </p>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-200">
                <button
                  onClick={() => handleDeleteP5(project.id)}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs flex items-center gap-1 font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Modul Ajar Kurikulum Merdeka */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Perangkat & Modul Ajar Kurikulum Merdeka
            </h3>
            <p className="text-xs text-slate-500">
              Modul ajar Fase D yang dapat dipelajari dan diunduh publik
            </p>
          </div>

          <button
            onClick={() => setIsModuleModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-950 text-xs font-bold shadow-soft flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Modul Ajar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(portfolioDataState.modules || []).map((mod) => (
            <div 
              key={mod.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-gold-100 text-gold-900 border border-gold-300">
                    {mod.grade}
                  </span>
                  <span className="text-[11px] text-slate-400">{mod.format}</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {mod.features}
                </p>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-200">
                <button
                  onClick={() => handleDeleteModule(mod.id)}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs flex items-center gap-1 font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Modul</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Tambah P5 */}
      {isP5ModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Tambah Dokumentasi Proyek P5
              </h3>
              <button onClick={() => setIsP5ModalOpen(false)} className="p-1.5 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddP5} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Proyek P5 *</label>
                <input
                  type="text"
                  required
                  value={p5Title}
                  onChange={(e) => setP5Title(e.target.value)}
                  placeholder="Misal: Gelar Budaya Nusantara & Kuliner Tradisional"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tema P5</label>
                  <select
                    value={p5Theme}
                    onChange={(e) => setP5Theme(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Bhinneka Tunggal Ika">Bhinneka Tunggal Ika</option>
                    <option value="Suara Demokrasi">Suara Demokrasi</option>
                    <option value="Kearifan Lokal">Kearifan Lokal</option>
                    <option value="Bangunlah Jiwa dan Raganya">Bangunlah Jiwa dan Raganya</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Periode Pelaksanaan</label>
                  <input
                    type="text"
                    value={p5Date}
                    onChange={(e) => setP5Date(e.target.value)}
                    placeholder="Semester Ganjil 2024"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Kegiatan</label>
                <textarea
                  rows={3}
                  value={p5Desc}
                  onChange={(e) => setP5Desc(e.target.value)}
                  placeholder="Ceritakan keterlibatan siswa dan aktivitas yang dilakukan..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Dampak Pembelajaran Siswa</label>
                <input
                  type="text"
                  value={p5Impact}
                  onChange={(e) => setP5Impact(e.target.value)}
                  placeholder="Misal: Meningkatkan rasa saling menghargai perbedaan budaya..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsP5ModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-patriot-600 text-white text-xs font-bold"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Modul */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Tambah Modul Ajar Kurikulum Merdeka
              </h3>
              <button onClick={() => setIsModuleModalOpen(false)} className="p-1.5 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddModule} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Modul Ajar *</label>
                <input
                  type="text"
                  required
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  placeholder="Misal: Modul Ajar: Menjaga Kedaulatan Wilayah NKRI"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jenjang Kelas</label>
                  <select
                    value={modGrade}
                    onChange={(e) => setModGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Kelas 7">Kelas 7 SMP</option>
                    <option value="Kelas 8">Kelas 8 SMP</option>
                    <option value="Kelas 9">Kelas 9 SMP</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Format & Halaman</label>
                  <input
                    type="text"
                    value={modFormat}
                    onChange={(e) => setModFormat(e.target.value)}
                    placeholder="PDF (24 Halaman)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Fitur & Kelengkapan Modul</label>
                <textarea
                  rows={3}
                  value={modFeatures}
                  onChange={(e) => setModFeatures(e.target.value)}
                  placeholder="Dilengkapi LKPD refleksi, materi ajar, rubrik asesmen sumatif..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModuleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Terbitkan Modul
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
