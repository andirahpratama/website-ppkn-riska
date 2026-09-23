import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ExternalLink,
  MessageCircle,
  Share2,
  Sparkles
} from 'lucide-react';
import { getStoredPageSettings, getStoredConsultations, saveStoredConsultations } from '../data/ppknData';
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

const TiktokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.21 6.34 6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.83-4.52V8.92a8.28 8.28 0 0 0 4.81 1.52V6.99a4.85 4.85 0 0 1-2-.3z"/>
  </svg>
);

export default function ContactPage() {
  const pageSettings = getStoredPageSettings();
  const contact = pageSettings.contact || {};

  // Form states
  const [studentName, setStudentName] = useState('');
  const [studentRole, setStudentRole] = useState('Guru PPKn');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !message || isSubmitting) return;

    setIsSubmitting(true);
    const newInquiry = {
      id: `inq-${Date.now()}`,
      student_name: studentName.trim(),
      grade: studentRole,
      contact: contactInfo.trim() || 'Tidak dicantumkan',
      message: message.trim(),
      status: 'Belum Dibaca',
      date: new Date().toLocaleDateString('id-ID')
    };

    try {
      if (isConfigured && supabase) {
        await supabase.from('consultations').insert([{
          student_name: newInquiry.student_name,
          grade: newInquiry.grade,
          contact: newInquiry.contact,
          message: newInquiry.message,
          status: 'Belum Dibaca'
        }]);
      }

      const existing = getStoredConsultations();
      saveStoredConsultations([newInquiry, ...existing]);

      setSubmitSuccess(true);
      setStudentName('');
      setContactInfo('');
      setMessage('');
    } catch {
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanWaNumber = (contact.whatsappNumber || '6281234567890').replace(/[^0-9]/g, '');

  return (
    <div className="pt-24 pb-20 bg-surface-ground min-h-screen">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Pusat Komunikasi & Layanan Informasi</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {contact.title || 'Contact / Hubungi Bu Riska'}
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed">
              {contact.subtitle || 'Punya pertanyaan seputar materi PPKn, modul kurikulum merdeka, atau kerja sama pelatihan guru? Silakan hubungi melalui saluran komunikasi resmi berikut.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Editable Social Channels & Direct Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Saluran Komunikasi Resmi
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pilih media komunikasi yang paling nyaman bagi Anda untuk terhubung langsung:
              </p>
            </div>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${cleanWaNumber}?text=Halo%20Bu%20Riska%20Puspita,%20saya%20menghubungi%20lewat%20website%20Ruang%20PPKn`}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-3xl bg-white border border-emerald-200 shadow-soft-sm hover:shadow-soft hover:border-emerald-400 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-slate-900">WhatsApp Hotline</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Respon Cepat
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    {contact.whatsappDisplay || '+62 812-3456-7890'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {contact.whatsappNote || 'Hari kerja: 08.00 - 16.00 WIB'}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${contact.email || 'riska.puspita.ppkn@gmail.com'}`}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft-sm hover:shadow-soft hover:border-slate-300 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Surat Elektronik (Email)</h4>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    {contact.email || 'riska.puspita.ppkn@gmail.com'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Untuk urusan kemitraan, undangan narasumber, atau kedinasan
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Social Media Channels Grid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
              <h4 className="text-sm font-black text-slate-900">
                Media Sosial Edukasi
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* YouTube */}
                <a
                  href={contact.youtubeUrl || 'https://youtube.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-red-50 hover:bg-red-100/80 border border-red-200 text-red-700 text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all text-center"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-soft">
                    <YoutubeIcon className="w-4 h-4" />
                  </div>
                  <span>YouTube</span>
                </a>

                {/* Instagram */}
                <a
                  href={contact.instagramUrl || 'https://instagram.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-pink-50 hover:bg-pink-100/80 border border-pink-200 text-pink-800 text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all text-center"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shadow-soft">
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </div>
                  <span>Instagram</span>
                </a>

                {/* TikTok */}
                <a
                  href={contact.tiktokUrl || 'https://tiktok.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all text-center"
                >
                  <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-soft">
                    <TiktokIcon className="w-4 h-4" />
                  </div>
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* School / Location Badge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
              <MapPin className="w-5 h-5 text-patriot-600 shrink-0" />
              <span>Lokasi Pengabdian: <strong>{contact.location || 'SMP Negeri Indonesia, Jawa Barat'}</strong></span>
            </div>

          </div>

          {/* Right Column: Online Inquiry / Consultation Message Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Kirim Pesan Konsultasi / Kolaborasi
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pesan akan langsung masuk ke dasbor admin Bu Riska dan dibalas secepatnya.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-emerald-900">
                  Pesan Anda Berhasil Terkirim!
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
                  Terima kasih sudah menghubungi. Pesan telah diteruskan ke dasbor admin Bu Riska Puspita, S.Pd.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Profesi / Peran *</label>
                    <select
                      value={studentRole}
                      onChange={(e) => setStudentRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    >
                      <option value="Guru PPKn">Rekan Guru PPKn</option>
                      <option value="Siswa SMP">Siswa SMP</option>
                      <option value="Orang Tua Siswa">Orang Tua Siswa</option>
                      <option value="Kepala Sekolah / Pengawas">Kepala Sekolah / Pengawas</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kontak WhatsApp atau Email *</label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="0812... / alamat@email.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Isi Pesan atau Kebutuhan *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pertanyaan materi, konsultasi modul ajar, atau keperluan kerja sama..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-patriot-600 to-patriot-700 text-white font-bold text-sm shadow-soft hover:shadow-glow-patriot transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirimkan...' : 'Kirim Pesan ke Bu Riska'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
