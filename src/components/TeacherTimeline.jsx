import React, { useState } from 'react';
import { 
  GraduationCap, 
  HeartHandshake, 
  Users, 
  Award, 
  Sparkles, 
  Calendar,
  CheckCircle,
  Quote
} from 'lucide-react';
import { teacherTimeline, teacherProfile } from '../data/ppknData';

const iconMap = {
  GraduationCap,
  HeartHandshake,
  Users,
  Award,
  Sparkles,
};

export default function TeacherTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(teacherTimeline[teacherTimeline.length - 1]);

  return (
    <section id="profil" className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold border border-gold-300">
            <Quote className="w-3.5 h-3.5 text-gold-700" />
            <span>Mengenal Lebih Dekat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perjalanan & Dedikasi Guru Bu Riska
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Menelusuri jejak dedikasi dari bangku kuliah pendidikan keguruan hingga menciptakan inovasi media belajar digital kewarganegaraan untuk generasi muda Indonesia.
          </p>
        </div>

        {/* Interactive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Steps Navigation */}
          <div className="lg:col-span-6 space-y-4">
            {teacherTimeline.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Sparkles;
              const isSelected = selectedMilestone.year === item.year;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedMilestone(item)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-amber-50/50 border-gold-400 shadow-soft ring-1 ring-gold-400/50'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Year badge & Icon */}
                    <div className={`p-3 rounded-2xl flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? 'bg-patriot-600 text-white shadow-soft' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                          isSelected 
                            ? 'bg-gold-400 text-slate-900' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.year}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {item.tag}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right / Detailed Highlight View */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-slate-700 relative overflow-hidden">
              
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-patriot-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-6">
                
                {/* Year tag & Milestone status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span className="text-gold-400 font-extrabold text-sm tracking-wide">
                      TAHUN {selectedMilestone.year}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {selectedMilestone.tag}
                  </span>
                </div>

                {/* Milestone Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {selectedMilestone.title}
                  </h3>
                  <p className="text-gold-300/90 text-sm font-semibold mt-1">
                    {selectedMilestone.subtitle}
                  </p>
                </div>

                {/* Narrative description */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedMilestone.description}
                </div>

                {/* Teacher Philosophy Note */}
                <div className="pt-2 border-t border-slate-700 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-400/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">
                      Komitmen Bu Riska untuk Siswa:
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                      Menjadikan setiap butir nilai kewarganegaraan sebagai teladan praktis di lingkungan sekolah dan keluarga.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
