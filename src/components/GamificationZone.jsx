import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  Star, 
  Link as LinkIcon, 
  TreePine, 
  ShieldAlert, 
  Wheat, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  Compass,
  Award,
  Users
} from 'lucide-react';
import { pancasilaMatchingData, misiNusantaraCases, defaultLeaderboard } from '../data/ppknData';
import { supabase, isConfigured } from '../lib/supabaseClient';

const iconComponents = {
  Star,
  Link: LinkIcon,
  TreePine,
  ShieldAlert,
  Wheat
};

export default function GamificationZone({ refreshTrigger }) {
  const [activeTab, setActiveTab] = useState('matching'); // 'matching' | 'misi' | 'leaderboard'
  
  // State Game 1: Matching Sila
  const [selectedSila, setSelectedSila] = useState(pancasilaMatchingData[0]);
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [matchingScore, setMatchingScore] = useState(0);

  // State Game 2: Misi Nusantara
  const [currentMisiIdx, setCurrentMisiIdx] = useState(0);
  const [misiHistory, setMisiHistory] = useState([]);
  const [misiScore, setMisiScore] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(null);

  // State Leaderboard
  const [leaderboardList, setLeaderboardList] = useState(defaultLeaderboard);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  // Fetch or Sync Leaderboard from Supabase / localStorage
  const loadLeaderboardData = async () => {
    setIsLoadingLeaderboard(true);
    try {
      if (isConfigured && supabase) {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          const formatted = data.map((item, index) => ({
            rank: index + 1,
            name: item.name,
            grade: item.grade,
            school: item.school || 'SMP',
            score: item.score,
            badge: item.badge || 'Pelajar Pancasila'
          }));
          setLeaderboardList(formatted);
          setIsLoadingLeaderboard(false);
          return;
        }
      }

      // Fallback Local Storage
      const local = localStorage.getItem('local_leaderboard');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.length > 0) {
          setLeaderboardList(parsed);
          setIsLoadingLeaderboard(false);
          return;
        }
      }
      setLeaderboardList(defaultLeaderboard);
    } catch {
      setLeaderboardList(defaultLeaderboard);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    loadLeaderboardData();
  }, [refreshTrigger]);

  // Mini Game 2: Handler Pilihan Cerita
  const handleSelectMisiChoice = (choiceIdx) => {
    if (selectedChoiceIdx !== null) return;
    setSelectedChoiceIdx(choiceIdx);

    const activeMisi = misiNusantaraCases[currentMisiIdx];
    const choice = activeMisi.choices[choiceIdx];

    setMisiScore((prev) => Math.max(0, prev + choice.scoreDelta));
  };

  const handleNextMisi = () => {
    if (currentMisiIdx + 1 < misiNusantaraCases.length) {
      setCurrentMisiIdx((prev) => prev + 1);
      setSelectedChoiceIdx(null);
    } else {
      // Selesai misi
      setCurrentMisiIdx(misiNusantaraCases.length);
    }
  };

  const resetMisi = () => {
    setCurrentMisiIdx(0);
    setSelectedChoiceIdx(null);
    setMisiScore(0);
  };

  return (
    <section id="game" className="py-16 md:py-24 bg-surface-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
            <Gamepad2 className="w-3.5 h-3.5 text-gold-700" />
            <span>Gamification Zone</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Arena Permainan Karakter Pancasila
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Asah pemahamanmu lewat interaksi menyenangkan: cocokan simbol 5 Sila, tuntaskan petualangan moral nusantara, dan pantau posisi skormu di papan peringkat.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-soft-sm inline-flex gap-1">
            <button
              onClick={() => setActiveTab('matching')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'matching'
                  ? 'bg-slate-900 text-white shadow-soft'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Star className="w-4 h-4 text-gold-400" />
              <span>1. Simbol 5 Sila</span>
            </button>

            <button
              onClick={() => setActiveTab('misi')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'misi'
                  ? 'bg-slate-900 text-white shadow-soft'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-patriot-400" />
              <span>2. Misi Moral Remaja</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('leaderboard');
                loadLeaderboardData();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'leaderboard'
                  ? 'bg-slate-900 text-white shadow-soft'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4 text-gold-500" />
              <span>3. Papan Peringkat</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MATCHING SILA PANCASILA */}
        {activeTab === 'matching' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 5 Sila Selectors */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                Pilih Lambang untuk Membuka Makna & Pengamalan:
              </p>

              {pancasilaMatchingData.map((item) => {
                const isSelected = selectedSila.sila === item.sila;
                const IconComp = iconComponents[item.iconName] || Star;

                return (
                  <button
                    key={item.sila}
                    onClick={() => setSelectedSila(item)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                      isSelected
                        ? 'bg-white border-gold-500 shadow-soft ring-2 ring-gold-400/40'
                        : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl font-black ${
                      isSelected 
                        ? 'bg-gradient-to-tr from-gold-500 to-gold-400 text-slate-950 shadow-soft' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-patriot-700">
                          Sila ke-{item.sila}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {item.simbol}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {item.nama}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sila Detail / Filosofi & Pengamalan */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
                
                {/* Header Sila */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-gold-400 flex items-center justify-center shadow-soft">
                      {React.createElement(iconComponents[selectedSila.iconName] || Star, { className: 'w-7 h-7' })}
                    </div>
                    <div>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900">
                        Sila ke-{selectedSila.sila}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                        {selectedSila.nama}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Lambang & Filosofi */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <span>Makna Filosofis Lambang ({selectedSila.simbol}):</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedSila.deskripsi}
                  </div>
                </div>

                {/* Pengamalan di Lingkungan Sekolah SMP */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-patriot-700 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-patriot-600" />
                    <span>Aksi Nyata Pelajar di Lingkungan Sekolah:</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-gold-200 text-sm text-slate-800 leading-relaxed font-semibold">
                    {selectedSila.pengamalanSekolah}
                  </div>
                </div>

                {/* Pesan Bu Riska */}
                <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center gap-2">
                  <span className="font-bold text-slate-900">Catatan Guru:</span>
                  <span>Amalkan nilai ini saat bergaul bersama kawan di sekolah hari ini!</span>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MISI NUSANTARA (Interactive Story Decisions) */}
        {activeTab === 'misi' && (
          <div className="max-w-3xl mx-auto">
            {currentMisiIdx < misiNusantaraCases.length ? (
              (() => {
                const currentCase = misiNusantaraCases[currentMisiIdx];
                const hasSelected = selectedChoiceIdx !== null;
                const chosenItem = hasSelected ? currentCase.choices[selectedChoiceIdx] : null;

                return (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
                    {/* Top indicator */}
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="px-3 py-1 rounded-full bg-patriot-100 text-patriot-900 border border-patriot-200">
                        Kasus Moral {currentMisiIdx + 1} dari {misiNusantaraCases.length}
                      </span>
                      <span className="text-slate-600 font-extrabold">
                        Poin Karakter: <strong className="text-patriot-700 text-base">{misiScore}</strong>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {currentCase.title}
                      </h3>
                      <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                        "{currentCase.situation}"
                      </div>
                    </div>

                    {/* Choices */}
                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Sebagai Pelajar Pancasila, apa yang akan kamu lakukan?
                      </p>

                      {currentCase.choices.map((c, cIdx) => {
                        const isChosen = selectedChoiceIdx === cIdx;
                        let btnStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-800";

                        if (hasSelected) {
                          if (c.correct) {
                            btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500";
                          } else if (isChosen && !c.correct) {
                            btnStyle = "bg-red-50 border-red-400 text-red-950 line-through";
                          } else {
                            btnStyle = "opacity-50 bg-slate-50 border-slate-200 text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={cIdx}
                            disabled={hasSelected}
                            onClick={() => handleSelectMisiChoice(cIdx)}
                            className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base leading-relaxed transition-all flex items-start gap-3 ${btnStyle}`}
                          >
                            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {cIdx + 1}
                            </span>
                            <span className="flex-1">{c.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Panel */}
                    {hasSelected && (
                      <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
                        chosenItem?.correct 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                          : 'bg-amber-50 border-amber-300 text-amber-900'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {chosenItem?.correct ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              <span>Pilihan Sangat Tepat! (+{chosenItem.scoreDelta} Karakter)</span>
                            </>
                          ) : (
                            <>
                              <HelpCircle className="w-5 h-5 text-amber-600" />
                              <span>Refleksi Karakter ({chosenItem?.scoreDelta} Karakter)</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-medium leading-relaxed">
                          {chosenItem?.feedback}
                        </p>
                      </div>
                    )}

                    {/* Next Button */}
                    {hasSelected && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleNextMisi}
                          className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
                        >
                          <span>{currentMisiIdx + 1 < misiNusantaraCases.length ? 'Lanjut ke Kasus Berikutnya' : 'Lihat Hasil Petualangan'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                  </div>
                );
              })()
            ) : (
              /* Tamat Misi Nusantara */
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-soft-lg text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-patriot-600 text-white mx-auto flex items-center justify-center shadow-glow-patriot">
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Petualangan Moral Tuntas!
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base mt-2">
                    Skor Akhir Karakter Pancasila: <strong className="text-patriot-700 text-xl">{misiScore} Poin</strong>
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-gold-300 max-w-md mx-auto text-xs text-slate-700 leading-relaxed font-semibold">
                  "Karakter yang sejati tidak ditentukan saat kita diam, tetapi bagaimana kita bersikap dan berani memilih kebenaran saat dihadapkan pada dilema di kehidupan nyata."
                </div>
                <div>
                  <button
                    onClick={resetMisi}
                    className="px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-900 font-bold text-sm inline-flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Misi Kasus</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REAL-TIME LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gold-400 text-slate-950 flex items-center justify-center shadow-soft">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Papan Peringkat Siswa Terbaik
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isConfigured ? 'Sinkronisasi Real-Time dengan Supabase Database' : 'Mode Demo Interaktif (Tersimpan Lokal)'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={loadLeaderboardData}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Segarkan Peringkat</span>
                </button>
              </div>

              {/* Table / List */}
              {isLoadingLeaderboard ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  Memuat data papan peringkat...
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboardList.map((entry, idx) => {
                    const isTop1 = idx === 0;
                    const isTop3 = idx < 3;

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                          isTop1
                            ? 'bg-amber-50/70 border-gold-300 shadow-soft'
                            : isTop3
                            ? 'bg-slate-50/80 border-slate-200'
                            : 'bg-white border-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Rank Circle */}
                          <div className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                            idx === 0
                              ? 'bg-gold-500 text-slate-950 shadow-soft'
                              : idx === 1
                              ? 'bg-slate-300 text-slate-800'
                              : idx === 2
                              ? 'bg-amber-700 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {idx + 1}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                              {entry.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                              <span>{entry.grade}</span>
                              <span>•</span>
                              <span>{entry.school}</span>
                            </div>
                          </div>
                        </div>

                        {/* Badge & Score */}
                        <div className="text-right shrink-0">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white border border-slate-200 text-patriot-700 shadow-soft-sm mb-1">
                            {entry.badge}
                          </span>
                          <p className="text-base sm:text-lg font-black text-slate-900">
                            {entry.score} <span className="text-xs text-slate-500 font-semibold">Poin</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Call to Action to Quiz */}
              <div className="pt-2 text-center">
                <a
                  href="#kuis"
                  className="text-xs font-bold text-patriot-600 hover:text-patriot-700 inline-flex items-center gap-1"
                >
                  <span>Ingin namamu ada di papan peringkat? Ikuti Arena Kuis Kilat sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
