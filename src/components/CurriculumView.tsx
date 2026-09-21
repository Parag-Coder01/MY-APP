import React, { useState } from 'react';
import { BookOpen, CheckCircle, Download, Layers, Sparkles, GraduationCap, Award, ArrowRight } from 'lucide-react';
import { MOCK_CURRICULUM } from '../data/mockData';

export const CurriculumView: React.FC = () => {
  const [activeGradeIndex, setActiveGradeIndex] = useState(1); // Default to middle school
  const activePlan = MOCK_CURRICULUM[activeGradeIndex];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-[11px] font-mono-code text-cyan-300 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>NATIONALLY STANDARDIZED STEM PEDAGOGY</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Robotics, AI & STEM Curriculum
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Grade-wise, outcome-based experiential learning roadmaps aligned with NEP 2020, CBSE Skill Subjects, and NITI Aayog Atal Tinkering Lab mandates.
          </p>
        </div>
      </div>

      {/* Grade Level Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MOCK_CURRICULUM.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveGradeIndex(idx)}
            className={`px-4 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
              activeGradeIndex === idx
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{item.gradeRange.split('(')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Selected Level Deep Dive */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono-code uppercase text-cyan-400 font-semibold tracking-wider">
              {activePlan.stage}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-0.5">
              {activePlan.gradeRange}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {activePlan.overview}
            </p>
          </div>

          <button
            onClick={() => {
              alert(`Downloading complete syllabus PDF for ${activePlan.gradeRange}...`);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 text-xs font-bold font-mono-code flex items-center gap-2 shrink-0 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Syllabus PDF</span>
          </button>
        </div>

        {/* Modules Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono-code uppercase text-slate-400 tracking-wider">
            Hands-On Laboratory Modules
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activePlan.modules.map((mod, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Module 0{i + 1}
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base text-white mt-2">
                      {mod.name}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono-code text-cyan-400 font-semibold shrink-0">
                    {mod.weeks}
                  </span>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Included Hardware:</span>
                  <span className="text-amber-400 font-mono-code font-medium">{mod.kits}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Learning Outcomes */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display font-bold text-sm text-white">
                CBSE & National Skills Certification
              </h5>
              <p className="text-xs text-slate-300 mt-0.5">
                Students successfully clearing module capstones receive verified KITE Robotics & Skill India credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
