import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Clock, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { timedQuizPool } from '../data/ppknData';
import { supabase, isConfigured } from '../lib/supabaseClient';

const QUESTION_TIME_LIMIT = 20; // 20 detik per soal sesuai PRD

export default function QuizArena({ onQuizCompleted }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedbackState, setFeedbackState] = useState(null); // 'correct' | 'wrong' | 'timeout'
  
  // Input nama siswa untuk leaderboard
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState('Kelas 8');
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const timerRef = useRef(null);

  // Trigger Red-Gold Confetti Celebration
  const triggerGoldPatriotConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F5B800', '#D32F2F', '#FFFFFF', '#FCD34D']
      });
    } catch {
      // fallback jika window / canvas tidak didukung
    }
  };

  // Grand Confetti saat kuis selesai
  const triggerVictoryConfetti = () => {
    try {
      const end = Date.now() + 2 * 1000;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          },
          colors: ['#F5B800', '#D32F2F', '#FFFFFF']
        });
      }, 250);
    } catch {
      // ignore
    }
  };

  // Countdown Timer
  useEffect(() => {
    if (!quizStarted || quizFinished || feedbackState !== null) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quizStarted, quizFinished, currentIdx, feedbackState]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentIdx(0);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setSelectedOption(null);
    setScore(0);
    setCorrectCount(0);
    setQuizFinished(false);
    setFeedbackState(null);
    setScoreSubmitted(false);
  };

  const handleTimeOut = () => {
    setFeedbackState('timeout');
    setTimeout(() => {
      nextQuestion();
    }, 1800);
  };

  const handleAnswer = (optionIdx) => {
    if (feedbackState !== null) return;
    clearInterval(timerRef.current);

    setSelectedOption(optionIdx);
    const currentQ = timedQuizPool[currentIdx];
    const isCorrect = optionIdx === currentQ.answer;

    if (isCorrect) {
      setFeedbackState('correct');
      // Bonus waktu tersisa
      const earned = currentQ.points + Math.floor(timeLeft * 1.5);
      setScore((prev) => prev + earned);
      setCorrectCount((prev) => prev + 1);
      triggerGoldPatriotConfetti();
    } else {
      setFeedbackState('wrong');
    }

    setTimeout(() => {
      nextQuestion();
    }, 1600);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < timedQuizPool.length) {
      setCurrentIdx((prev) => prev + 1);
      setTimeLeft(QUESTION_TIME_LIMIT);
      setSelectedOption(null);
      setFeedbackState(null);
    } else {
      setQuizFinished(true);
      triggerVictoryConfetti();
      if (onQuizCompleted) {
        onQuizCompleted({ score, correctCount });
      }
    }
  };

  // Tentukan Lencana Berdasarkan Perolehan Skor
  const getBadgeName = (finalScore) => {
    if (finalScore >= 160) return 'Pilar Negara Utama';
    if (finalScore >= 120) return 'Ksatria Konstitusi';
    if (finalScore >= 80) return 'Duta Bhinneka';
    return 'Pelajar Pancasila Teladan';
  };

  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!studentName.trim() || isSubmittingScore || scoreSubmitted) return;

    setIsSubmittingScore(true);
    const badge = getBadgeName(score);

    try {
      if (isConfigured && supabase) {
        await supabase.from('leaderboard').insert([
          {
            name: studentName.trim(),
            grade: studentGrade,
            school: 'SMP',
            score: score,
            badge: badge
          }
        ]);
      }

      // Selalu simpan juga di localStorage agar leaderboard reaktif secara lokal
      const localLeaderboard = JSON.parse(localStorage.getItem('local_leaderboard') || '[]');
      localLeaderboard.push({
        rank: localLeaderboard.length + 1,
        name: studentName.trim(),
        grade: studentGrade,
        school: 'SMP',
        score: score,
        badge: badge
      });
      // Sort descending
      localLeaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem('local_leaderboard', JSON.stringify(localLeaderboard.slice(0, 10)));

      setScoreSubmitted(true);
      if (onQuizCompleted) {
        onQuizCompleted({ refreshLeaderboard: true });
      }
    } catch (err) {
      console.error("Gagal simpan skor:", err);
      setScoreSubmitted(true);
    } finally {
      setIsSubmittingScore(false);
    }
  };

  const currentQ = timedQuizPool[currentIdx];
  const progressPercent = ((currentIdx + 1) / timedQuizPool.length) * 100;
  const timePercent = (timeLeft / QUESTION_TIME_LIMIT) * 100;

  return (
    <section id="kuis" className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-patriot-100 text-patriot-900 text-xs font-bold border border-patriot-200">
            <Flame className="w-3.5 h-3.5 text-patriot-700 animate-bounce" />
            <span>Tantangan Ketangkasan Berpikir</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Arena Kuis Kilat PPKn SMP
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Jawab setiap soal sebelum waktu 20 detik habis! Dapatkan skor kecepatan, kumpulkan kembang api selebrasi, dan raih lencana digital kebanggaanmu.
          </p>
        </div>

        {/* Quiz State Machine */}
        {!quizStarted ? (
          /* START SCREEN */
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-soft-lg border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-lg mx-auto space-y-6 relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-gold-400 to-patriot-600 mx-auto flex items-center justify-center text-white shadow-glow-gold">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Tantangan 5 Soal Kilat
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2">
                  Durasi 20 detik per soal. Jawaban cepat dan tepat akan menghasilkan bonus skor ekstra untuk papan peringkat!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-left pt-2">
                <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700">
                  <p className="text-xs text-slate-400">Total Soal</p>
                  <p className="text-lg font-bold text-white">5 Butir</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700">
                  <p className="text-xs text-slate-400">Waktu/Soal</p>
                  <p className="text-lg font-bold text-gold-400">20 Detik</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700">
                  <p className="text-xs text-slate-400">Hadiah</p>
                  <p className="text-lg font-bold text-patriot-400">Lencana</p>
                </div>
              </div>

              <button
                onClick={startQuiz}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 text-slate-950 font-black text-base shadow-glow-gold hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5 text-patriot-700" />
                <span>Mulai Tantangan Sekarang</span>
              </button>
            </div>
          </div>
        ) : !quizFinished ? (
          /* ACTIVE QUIZ SCREEN */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
            
            {/* Top Bar: Progress & Timer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-slate-500">
                  Pertanyaan {currentIdx + 1} dari {timedQuizPool.length}
                </span>
                <span className="text-patriot-700">
                  Skor Sementara: {score}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-patriot-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Countdown Timer Visual */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-600 animate-ping' : 'text-gold-600'}`} />
                  <span>Sisa Waktu:</span>
                </div>
                <span className={`text-base font-extrabold ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
                  {timeLeft} Detik
                </span>
              </div>
              
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 5 ? 'bg-red-600' : 'bg-gold-500'
                  }`}
                  style={{ width: `${timePercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const letter = String.fromCharCode(65 + optIdx);
                const isSelected = selectedOption === optIdx;
                let optStyle = "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800";

                if (feedbackState !== null) {
                  if (optIdx === currentQ.answer) {
                    optStyle = "bg-emerald-500 text-white border-emerald-600 shadow-soft";
                  } else if (isSelected && feedbackState === 'wrong') {
                    optStyle = "bg-red-500 text-white border-red-600 line-through";
                  } else {
                    optStyle = "opacity-50 bg-slate-50 border-slate-200 text-slate-400";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={feedbackState !== null}
                    onClick={() => handleAnswer(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all text-sm sm:text-base font-medium ${optStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${
                      feedbackState !== null && optIdx === currentQ.answer
                        ? 'bg-white text-emerald-700'
                        : isSelected
                        ? 'bg-white text-slate-900'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="pt-0.5 leading-snug">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* In-question Feedback Banner */}
            {feedbackState && (
              <div className={`p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base animate-fadeIn ${
                feedbackState === 'correct' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : feedbackState === 'timeout'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-red-100 text-red-800'
              }`}>
                {feedbackState === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Hebat! Jawabanmu Benar (+{currentQ.points + Math.floor(timeLeft * 1.5)} Poin)</span>
                  </>
                ) : feedbackState === 'timeout' ? (
                  <>
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span>Waktu Habis! Tetap semangat ke soal berikutnya.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span>Jawaban belum tepat. Jangan menyerah!</span>
                  </>
                )}
              </div>
            )}

          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-soft-lg text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gold-400 text-slate-950 mx-auto flex items-center justify-center shadow-glow-gold animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-patriot-600">
                Tantangan Berhasil Dituntaskan
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
                Selamat, Pelajar Hebat!
              </h3>
              <p className="text-slate-500 text-sm sm:text-base mt-2">
                Kamu menjawab benar <strong>{correctCount} dari {timedQuizPool.length}</strong> pertanyaan.
              </p>
            </div>

            {/* Badge Earned Card */}
            <div className="max-w-md mx-auto p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-gold-50 border border-gold-300 space-y-2">
              <span className="text-xs font-bold text-gold-800 uppercase tracking-wider">
                Lencana Digital Diraih:
              </span>
              <div className="flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-gold-600" />
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  {getBadgeName(score)}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Total Perolehan: <strong className="text-patriot-700 text-base">{score} Poin</strong>
              </p>
            </div>

            {/* Submit to Leaderboard Form */}
            {!scoreSubmitted ? (
              <form onSubmit={handleSubmitScore} className="max-w-md mx-auto space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-700 text-left">
                  Simpan namamu ke Papan Peringkat Pelajar:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nama Lengkap / Panggilan"
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-semibold"
                  />
                  <select
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                    className="px-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="Kelas 7">Kelas 7</option>
                    <option value="Kelas 8">Kelas 8</option>
                    <option value="Kelas 9">Kelas 9</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingScore}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>{isSubmittingScore ? 'Menyimpan...' : 'Kirim Skor ke Leaderboard'}</span>
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Skor berhasil dicatat di Papan Peringkat!</span>
              </div>
            )}

            {/* Restart Button */}
            <div className="pt-2">
              <button
                onClick={startQuiz}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm inline-flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis untuk Nilai Lebih Tinggi</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
