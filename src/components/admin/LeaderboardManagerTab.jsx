import React, { useState } from 'react';
import { 
  Trophy, 
  Trash2, 
  Plus, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  X
} from 'lucide-react';
import { defaultLeaderboard } from '../../data/ppknData';

export default function LeaderboardManagerTab({ leaderboard, onUpdateLeaderboard }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('Kelas 8A');
  const [newSchool, setNewSchool] = useState('SMP Negeri');
  const [newScore, setNewScore] = useState(900);
  const [newBadge, setNewBadge] = useState('Pilar Negara');

  const handleDelete = (index) => {
    if (window.confirm("Hapus entri skor siswa ini dari papan peringkat?")) {
      const updated = leaderboard.filter((_, idx) => idx !== index);
      onUpdateLeaderboard(updated);
    }
  };

  const handleResetSemester = () => {
    if (window.confirm("PERINGATAN: Apakah Anda yakin ingin mereset papan peringkat ke pengaturan awal semester baru?")) {
      onUpdateLeaderboard(defaultLeaderboard);
    }
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newEntry = {
      rank: leaderboard.length + 1,
      name: newName.trim(),
      grade: newGrade,
      school: newSchool.trim(),
      score: parseInt(newScore) || 500,
      badge: newBadge
    };

    const updated = [...leaderboard, newEntry];
    updated.sort((a, b) => b.score - a.score);
    const reRanked = updated.map((item, idx) => ({ ...item, rank: idx + 1 }));

    onUpdateLeaderboard(reRanked);
    setIsAddModalOpen(false);
    setNewName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Moderasi Papan Peringkat (Leaderboard)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pantau skor tertinggi dari kuis berwaktu, bersihkan data spam, atau reset di akhir semester
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetSemester}
            className="px-3.5 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-all flex items-center gap-1.5 border border-amber-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Semester</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-950 text-xs font-bold shadow-soft transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data Manual</span>
          </button>
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold-500" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Daftar Skor Pelajar Aktif ({leaderboard.length} Siswa)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Urutan Skor Tertinggi
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {leaderboard.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                  idx === 0 
                    ? 'bg-gold-400 text-slate-950 shadow-soft' 
                    : idx === 1 
                    ? 'bg-slate-200 text-slate-700' 
                    : idx === 2 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {idx + 1}
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.grade} • {item.school || 'SMP'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-patriot-50 text-patriot-700 border border-patriot-200 mb-0.5">
                    {item.badge}
                  </span>
                  <p className="text-sm font-black text-slate-900">
                    {item.score} <span className="text-[10px] text-slate-400 font-semibold">Poin</span>
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(idx)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Hapus Nilai Spam"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Tambah Manual */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-soft-lg space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Tambah Nilai Siswa Manual
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Siswa *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Muhammad Farhan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kelas</label>
                  <input
                    type="text"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    placeholder="Kelas 8B"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Skor Poin</label>
                  <input
                    type="number"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Lencana</label>
                <select
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
                >
                  <option value="Pilar Negara">Pilar Negara</option>
                  <option value="Ksatria Konstitusi">Ksatria Konstitusi</option>
                  <option value="Duta Bhinneka">Duta Bhinneka</option>
                  <option value="Siswa Teladan">Siswa Teladan</option>
                  <option value="Pelajar Pancasila">Pelajar Pancasila</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Simpan ke Leaderboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
