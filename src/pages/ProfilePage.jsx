import React from 'react';
import TeacherTimeline from '../components/TeacherTimeline';
import { 
  User, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  BookOpen, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { teacherProfile, portfolioData } from '../data/ppknData';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Profil Pendidik Profesional</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {teacherProfile.name}
              </h1>
              <p className="text-gold-300 font-bold text-base sm:text-lg">
                {teacherProfile.role} • {teacherProfile.school}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {teacherProfile.bio}
              </p>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-1 bg-gradient-to-tr from-gold-400 to-patriot-600 shadow-glow-gold">
                <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center text-white text-center">
                  <span className="text-5xl font-black text-gold-400">RP</span>
                  <span className="text-xs font-bold tracking-wider text-slate-300 mt-2">RISKA PUSPITA</span>
                  <span className="text-[10px] text-slate-400">S.Pd. PPKn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Section */}
      <TeacherTimeline />

      {/* Filosofi & Sertifikasi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Visi & Filosofi Mengajar */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-5">
            <div className="flex items-center gap-2 text-patriot-700 font-black text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-patriot-600" />
              <span>Prinsip Pembelajaran</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Pendidikan Kewarganegaraan yang Menumbuhkan Jiwa
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <p>
                Mata pelajaran PPKn bukan daftar hafalan pasal hukum yang kering. Bersama Bu Riska, siswa diajak menganalisis bagaimana hak dan kewajiban bekerja dalam kehidupan keluarga, pertemanan di sekolah, dan tanggung jawab berbangsa.
              </p>
              <p>
                Melalui Proyek Penguatan Profil Pelajar Pancasila (P5), kami melatih kepemimpinan siswa melalui simulasi pemilu sekolah langsung yang jujur dan adil serta aksi nyata cinta keragaman adat nusantara.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 text-xs font-bold text-patriot-600 hover:text-patriot-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ingin berkonsultasi seputar tugas? Hubungi Bu Riska</span>
              </Link>
            </div>
          </div>

          {/* Sertifikasi & Penghargaan */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-5">
            <div className="flex items-center gap-2 text-gold-700 font-black text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Kredensial Profesional</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Sertifikasi & Rekam Prestasi
            </h3>

            <div className="space-y-3">
              {portfolioData.certificates.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-gold-400 text-slate-950 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
