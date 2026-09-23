import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Lightbulb,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { questionBank } from '../data/ppknData';

export default function QuestionBank() {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State interaktif jawaban siswa: { [questionId]: selectedOptionIndex }
  const [studentAnswers, setStudentAnswers] = useState({});
  // State akordeon pembahasan: { [questionId]: boolean }
  const [openExplanations, setOpenExplanations] = useState({});

  const topics = ['all', 'Pancasila', 'UUD NRI 1945', 'Norma & UUD 1945', 'Bhinneka Tunggal Ika', 'NKRI'];

  const filteredQuestions = useMemo(() => {
    return questionBank.filter((item) => {
      const matchGrade = selectedGrade === 'all' || item.grade === selectedGrade;
      const matchTopic = selectedTopic === 'all' || item.topic === selectedTopic;
      const matchSearch = searchQuery.trim() === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchTopic && matchSearch;
    });
  }, [selectedGrade, selectedTopic, searchQuery]);

  const handleSelectOption = (questionId, optionIndex) => {
    setStudentAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleExplanation = (questionId) => {
    setOpenExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleResetFilters = () => {
    setSelectedGrade('all');
    setSelectedTopic('all');
    setSearchQuery('');
  };

  return (
    <section id="bank-soal" className="py-16 md:py-24 bg-surface-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
            <BookOpen className="w-3.5 h-3.5 text-gold-700" />
            <span>Bank Soal Kurikulum Merdeka</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Uji Pemahaman & Latihan Mandiri PPKn
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Pilih kelas dan topik yang sedang kamu pelajari di sekolah. Uji nalarmu langsung di sini dan pelajari ulasan pembahasannya secara bertahap.
          </p>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-soft mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kata kunci materi, contoh: BPUPKI, Sumpah Pemuda..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white transition-all text-slate-800 font-medium"
              />
            </div>

            {/* Filter Kelas */}
            <div className="md:col-span-3">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white"
              >
                <option value="all">Semua Kelas (7, 8, 9)</option>
                <option value="7">Kelas 7 SMP</option>
                <option value="8">Kelas 8 SMP</option>
                <option value="9">Kelas 9 SMP</option>
              </select>
            </div>

            {/* Filter Topik */}
            <div className="md:col-span-4">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white"
              >
                <option value="all">Semua Bab & Topik 4 Pilar</option>
                <option value="Pancasila">Pancasila</option>
                <option value="UUD NRI 1945">UUD NRI 1945</option>
                <option value="Bhinneka Tunggal Ika">Bhinneka Tunggal Ika</option>
                <option value="NKRI">NKRI & Wawasan Kebangsaan</option>
              </select>
            </div>

          </div>

          {/* Active Filter Chips & Summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Ditemukan:</span>
              <span className="px-2 py-0.5 rounded-md bg-gold-100 text-gold-900 font-bold">
                {filteredQuestions.length} Soal
              </span>
            </div>

            {(selectedGrade !== 'all' || selectedTopic !== 'all' || searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-patriot-600 hover:text-patriot-700 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Semua Filter</span>
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Tidak ada soal yang cocok</h3>
              <p className="text-sm text-slate-500 mt-1">Coba sesuaikan pencarian atau ganti pilihan kelas dan topik di atas.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-gold-400 text-slate-900 text-xs font-bold hover:bg-gold-500"
              >
                Tampilkan Semua Soal
              </button>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const studentAnswer = studentAnswers[q.id];
              const hasAnswered = studentAnswer !== undefined;
              const isCorrect = studentAnswer === q.answer;
              const isExpOpen = openExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-5 transition-all"
                >
                  {/* Question Header Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-slate-900 text-gold-300 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-patriot-50 text-patriot-700 border border-patriot-200">
                        Kelas {q.grade} SMP
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {q.topic}
                      </span>
                    </div>

                    {hasAnswered && (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isCorrect 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Jawaban Tepat! (+10 Poin)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Belum Tepat, Cek Pembahasan
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Question Prompt */}
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {q.question}
                  </p>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isSelected = studentAnswer === optIdx;
                      let optionStyle = 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60';

                      if (hasAnswered) {
                        if (optIdx === q.answer) {
                          optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-red-50 border-red-400 text-red-950 line-through opacity-80';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-gold-50 border-gold-400 ring-1 ring-gold-400';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${optionStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                            hasAnswered && optIdx === q.answer 
                              ? 'bg-emerald-600 text-white' 
                              : isSelected 
                              ? 'bg-slate-900 text-white' 
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}>
                            {letter}
                          </span>
                          <span className="text-sm sm:text-base text-slate-800 leading-relaxed">
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Accordion Toggle for Explanation (PRD 3.2: Buka-tutup pembahasan secara bertahap) */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-50/50 hover:bg-amber-100/60 text-slate-800 text-xs sm:text-sm font-bold transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-gold-600" />
                        <span>{isExpOpen ? 'Sembunyikan Pembahasan & Kunci' : 'Buka Kunci & Pembahasan Guru'}</span>
                      </div>
                      {isExpOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Smooth Slide Down Content */}
                    {isExpOpen && (
                      <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-600 text-white">
                            Kunci Jawaban: {String.fromCharCode(65 + q.answer)}
                          </span>
                          <span className="text-xs font-bold text-slate-600">
                            Ulasan Pedagogis Bu Riska:
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
