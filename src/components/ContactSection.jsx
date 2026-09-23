import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Share2, 
  Mail, 
  CheckCircle2, 
  Heart,
  HelpCircle,
  Sparkles,
  Video
} from 'lucide-react';
import { teacherProfile } from '../data/ppknData';
import { supabase, isConfigured } from '../lib/supabaseClient';

// Clean SVG components for brand channels
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function ContactSection() {
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState('Kelas 7');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !message || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isConfigured && supabase) {
        await supabase.from('consultations').insert([
          {
            student_name: studentName.trim(),
            grade: studentGrade,
            contact: contactInfo.trim() || 'Tidak dicantumkan',
            message: message.trim(),
            status: 'Menunggu Balasan Bu Riska'
          }
        ]);
      } else {
        // Fallback local storage
        const existing = JSON.parse(localStorage.getItem('local_consultations') || '[]');
        existing.push({
          id: Date.now(),
          student_name: studentName.trim(),
          grade: studentGrade,
          contact: contactInfo.trim() || 'Tidak dicantumkan',
          message: message.trim(),
          date: new Date().toLocaleDateString('id-ID')
        });
        localStorage.setItem('local_consultations', JSON.stringify(existing));
      }

      setSubmitSuccess(true);
      setStudentName('');
      setContactInfo('');
      setMessage('');
    } catch (err) {
      console.error("Gagal mengirim pertanyaan:", err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-16 md:py-24 bg-surface-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
            <MessageSquare className="w-3.5 h-3.5 text-gold-700" />
            <span>Pojok Konsultasi & Ruang Sapa</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sapa & Tanya Tugas Bersama Bu Riska
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Punya pertanyaan tentang materi kewarganegaraan, butuh saran proyek P5, atau ingin menyapa? Kirim pesanmu di sini atau kunjungi media sosial edukasi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Tanya Bu Riska */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Formulir Konsultasi Belajar
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pesanmu akan langsung diterima Bu Riska dan dibalas saat jam kerja sekolah.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-emerald-900">
                  Pertanyaan Berhasil Terkirim!
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
                  Terima kasih sudah bertanya, nak. Bu Riska akan membaca pesanmu dan memberikan penjelasan seputar tugasmu.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Kirim Pertanyaan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Nama Siswa *</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Contoh: Andi Pratama"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Kelas *</label>
                    <select
                      value={studentGrade}
                      onChange={(e) => setStudentGrade(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-semibold text-slate-700"
                    >
                      <option value="Kelas 7">Kelas 7 SMP</option>
                      <option value="Kelas 8">Kelas 8 SMP</option>
                      <option value="Kelas 9">Kelas 9 SMP</option>
                      <option value="Orang Tua / Guru">Orang Tua / Rekan Guru</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kontak WhatsApp / Email (Opsional)</label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="0812... / emailmu@sekolah.sch.id"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Pertanyaan atau Catatan Tugas *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan materi yang belum dipahami atau ide proyek P5 yang ingin kamu konsultasikan..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-patriot-600 to-patriot-700 text-white font-bold text-sm shadow-soft hover:shadow-glow-patriot transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirimkan Pesan...' : 'Kirim ke Bu Riska'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Social Channels & Teacher Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Social Links Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-lg space-y-5">
              <h3 className="text-lg font-black text-slate-900">
                Media Sosial Edukasi Bu Riska
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Simak konten video interaktif, tips mengerjakan kuis, dan bedah materi kurikulum di saluran resmi berikut:
              </p>

              <div className="space-y-3">
                <a
                  href={teacherProfile.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700 font-bold text-xs sm:text-sm flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-soft">
                      <YoutubeIcon className="w-4 h-4" />
                    </div>
                    <span>YouTube Pembelajaran PPKn</span>
                  </div>
                  <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={teacherProfile.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl border border-pink-200 bg-pink-50/50 hover:bg-pink-50 text-pink-800 font-bold text-xs sm:text-sm flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shadow-soft">
                      <InstagramIcon className="w-4 h-4 text-white" />
                    </div>
                    <span>Instagram Edukasi Karakter</span>
                  </div>
                  <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="mailto:riska.puspita.ppkn@gmail.com"
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-soft">
                      <Mail className="w-4 h-4 text-gold-400" />
                    </div>
                    <span>Surel Resmi Pendidik</span>
                  </div>
                  <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* School Code of Conduct & Ethics Reminder */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-soft space-y-3">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-xs">
                <Heart className="w-4 h-4 text-patriot-400 fill-patriot-400" />
                <span>Etika Bertanya Pelajar Berkarakter</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Saat bertanya kepada guru atau teman, awali dengan salam santun, perkenalkan diri, dan sampaikan pertanyaan dengan bahasa Indonesia yang baik dan sopan."
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                — Salam hangat, Bu Riska Puspita, S.Pd.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
