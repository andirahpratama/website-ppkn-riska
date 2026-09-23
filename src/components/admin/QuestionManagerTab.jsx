import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  X, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function QuestionManagerTab({ questions, onUpdateQuestions }) {
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterTopic, setFilterTopic] = useState('all');
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    grade: '7',
    topic: 'Pancasila',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    answer: 0,
    explanation: ''
  });

  const topics = ['Pancasila', 'UUD NRI 1945', 'Norma & UUD 1945', 'Bhinneka Tunggal Ika', 'NKRI'];

  const filtered = questions.filter(q => {
    const matchGrade = filterGrade === 'all' || q.grade === filterGrade;
    const matchTopic = filterTopic === 'all' || q.topic === filterTopic;
    const matchSearch = search.trim() === '' || 
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());
    return matchGrade && matchTopic && matchSearch;
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      grade: '7',
      topic: 'Pancasila',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: 0,
      explanation: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingId(q.id);
    setFormData({
      grade: q.grade,
      topic: q.topic,
      question: q.question,
      optionA: q.options[0] || '',
      optionB: q.options[1] || '',
      optionC: q.options[2] || '',
      optionD: q.options[3] || '',
      answer: q.answer,
      explanation: q.explanation || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.optionA.trim() || !formData.optionB.trim()) {
      alert("Mohon isi pertanyaan dan minimal 2 opsi jawaban.");
      return;
    }

    const newQuestionObj = {
      id: editingId || `q-${formData.grade}-${Date.now().toString().slice(-4)}`,
      grade: formData.grade,
      topic: formData.topic,
      question: formData.question.trim(),
      options: [
        formData.optionA.trim(),
        formData.optionB.trim(),
        formData.optionC.trim() || 'Opsi C',
        formData.optionD.trim() || 'Opsi D'
      ],
      answer: parseInt(formData.answer),
      explanation: formData.explanation.trim() || 'Pembahasan telah diverifikasi oleh guru pengampu.'
    };

    let updated;
    if (editingId) {
      updated = questions.map(q => q.id === editingId ? newQuestionObj : q);
    } else {
      updated = [newQuestionObj, ...questions];
    }

    onUpdateQuestions(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus butir soal ini?")) {
      const updated = questions.filter(q => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bank_soal_ppkn_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Manajemen Bank Soal PPKn
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tambah, sunting, dan kelompokkan butir soal latihan siswa Kurikulum Merdeka Fase D
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor JSON</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-patriot-600 to-patriot-700 hover:from-patriot-700 hover:to-patriot-800 text-white text-xs font-bold shadow-soft transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Soal Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kata kunci materi..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Kelas</option>
            <option value="7">Kelas 7</option>
            <option value="8">Kelas 8</option>
            <option value="9">Kelas 9</option>
          </select>

          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Topik</option>
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <span className="text-xs text-slate-500 font-bold px-2">
            Total: {filtered.length} Soal
          </span>
        </div>
      </div>

      {/* Questions Table / Cards */}
      <div className="space-y-3">
        {filtered.map((q, idx) => (
          <div 
            key={q.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft-sm hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-patriot-50 text-patriot-700 border border-patriot-200">
                  Kelas {q.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                  {q.topic}
                </span>
                <span className="text-[11px] font-bold text-emerald-700">
                  Kunci: {String.fromCharCode(65 + q.answer)}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {idx + 1}. {q.question}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1">
                {q.options.map((opt, optIdx) => (
                  <p key={optIdx} className={`truncate ${optIdx === q.answer ? 'font-bold text-emerald-700' : ''}`}>
                    {String.fromCharCode(65 + optIdx)}. {opt}
                  </p>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 italic bg-amber-50/70 p-2 rounded-xl border border-amber-200/60 line-clamp-1">
                Ulasan: {q.explanation}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => openEditModal(q)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Edit Soal"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(q.id)}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                title="Hapus Soal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah / Edit Soal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-soft-lg space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingId ? 'Sunting Butir Soal PPKn' : 'Tambah Soal Baru ke Bank Soal'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jenjang Kelas</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  >
                    <option value="7">Kelas 7 SMP</option>
                    <option value="8">Kelas 8 SMP</option>
                    <option value="9">Kelas 9 SMP</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Topik / Bab</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  >
                    {topics.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Teks Pertanyaan *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Ketik studi kasus atau pertanyaan kewarganegaraan..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-gold-400 resize-none"
                />
              </div>

              {/* 4 Opsi Jawaban */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Opsi Pilihan Jawaban</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={formData.optionA}
                    onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                    placeholder="Pilihan A"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                  <input
                    type="text"
                    required
                    value={formData.optionB}
                    onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                    placeholder="Pilihan B"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                  <input
                    type="text"
                    value={formData.optionC}
                    onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                    placeholder="Pilihan C"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                  <input
                    type="text"
                    value={formData.optionD}
                    onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                    placeholder="Pilihan D"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Kunci Jawaban */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Kunci Jawaban yang Benar</label>
                <select
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold"
                >
                  <option value={0}>Pilihan A</option>
                  <option value={1}>Pilihan B</option>
                  <option value={2}>Pilihan C</option>
                  <option value={3}>Pilihan D</option>
                </select>
              </div>

              {/* Teks Pembahasan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ulasan & Pembahasan Guru</label>
                <textarea
                  rows={2}
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  placeholder="Jelaskan alasan dan nilai Pancasila / pasal hukum terkait..."
                  className="w-full px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-patriot-600 hover:bg-patriot-700 text-white text-xs font-bold shadow-soft"
                >
                  {editingId ? 'Simpan Perubahan' : 'Terbitkan Soal'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
