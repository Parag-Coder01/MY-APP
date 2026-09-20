import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, PlayCircle, CheckCircle2, Award, Clock, Star, Users, BookOpen, Layers, ShieldCheck, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnrollOrContinue: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnrollOrContinue,
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'projects' | 'instructor' | 'certificate'>('curriculum');
  const [activeVideoLesson, setActiveVideoLesson] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<number>(0);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-slate-100"
      >
        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-950 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/70 border border-slate-700/60 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Category & Rating */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-cyan-500 text-slate-950 shadow-md">
              {course.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono-code bg-slate-900/80 border border-slate-700 text-slate-200 backdrop-blur-md flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {course.rating} ({course.reviewsCount})
            </span>
          </div>

          {/* Title & Stats */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
              {course.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300 font-mono-code">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {course.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Level: {course.level}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                {course.studentsCount} Students
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Video / Lab Demonstration Player (if lesson clicked) */}
        {activeVideoLesson && (
          <div className="p-4 bg-slate-950 border-b border-cyan-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-code text-cyan-400 flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" />
                <span>Playing Lesson: {activeVideoLesson}</span>
              </span>
              <button
                onClick={() => setActiveVideoLesson(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Lab Player
              </button>
            </div>
            {/* Interactive Simulation Frame */}
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 animate-pulse">
                <PlayCircle className="w-8 h-8" />
              </div>
              <div className="font-display font-bold text-base text-white">
                KITE Interactive Laboratory Stream
              </div>
              <div className="text-xs text-slate-400 max-w-sm mt-1">
                Simulated hardware environment initialized. Sensor telemetry and live pinout visualizer connected.
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 text-xs font-mono-code">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3 px-3 border-b-2 font-semibold transition-all ${
              activeTab === 'curriculum'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3 px-3 border-b-2 font-semibold transition-all ${
              activeTab === 'projects'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Projects ({course.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('instructor')}
            className={`py-3 px-3 border-b-2 font-semibold transition-all ${
              activeTab === 'instructor'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Instructor
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`py-3 px-3 border-b-2 font-semibold transition-all ${
              activeTab === 'certificate'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Certification
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* 1. Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                {course.description}
              </p>

              <div className="space-y-2 mt-3">
                {course.curriculum.map((module, mIdx) => (
                  <div key={mIdx} className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === mIdx ? -1 : mIdx)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-850/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-white">{module.moduleTitle}</span>
                      </div>
                      {expandedModule === mIdx ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {expandedModule === mIdx && (
                      <div className="px-4 pb-3 pt-1 border-t border-slate-800/80 space-y-1.5">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            onClick={() => setActiveVideoLesson(lesson.title)}
                            className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-800/50 flex items-center justify-between text-xs cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              {lesson.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <PlayCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                              )}
                              <span className="text-slate-200 font-medium">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] font-mono-code text-slate-400">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 font-mono-code">Hands-on Practical Outcomes</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.projects.map((proj, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 font-mono-code font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{proj}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Physical hardware verified project</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 mt-4">
                <div className="text-xs font-bold text-cyan-300 mb-1">Prerequisites & Materials</div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {course.requirements.map((req, rIdx) => (
                    <li key={rIdx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 3. Instructor Tab */}
          {activeTab === 'instructor' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-lg font-display">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-white">{course.instructor}</h4>
                  <p className="text-xs text-cyan-400 font-mono-code">Senior Mentor • KITE Robotics</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated to hands-on hardware education. Mentored over 15,000 students across India and guided multiple national winners in ROBOZEST and Atal Tinkering Lab challenges.
              </p>
            </div>
          )}

          {/* 4. Certificate Tab */}
          {activeTab === 'certificate' && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-950 border border-cyan-800/40 text-center space-y-3">
              <Award className="w-10 h-10 text-cyan-400 mx-auto" />
              <h4 className="font-display font-bold text-base text-white">
                Official Verifiable Certificate of Completion
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Upon submitting the capstone robotics project and passing the diagnostic assessment, earn a verifiable digital certificate recognized across STEM institutions.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono-code text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>QR-Verifiable Digital Credential Included</span>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono-code text-slate-400">Current Progress</div>
            <div className="text-sm font-bold text-cyan-400 font-mono-code">
              {course.progress ? `${course.progress}% Completed` : 'Not Started'}
            </div>
          </div>

          <button
            onClick={() => {
              onEnrollOrContinue(course);
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            <span>{course.progress ? 'Continue Learning' : 'Start Learning'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
