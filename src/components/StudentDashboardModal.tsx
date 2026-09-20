import React from 'react';
import { motion } from 'motion/react';
import { X, Award, BookOpen, Cpu, Calendar, ShoppingBag, CheckCircle, ArrowRight, Zap, Trophy, ShieldCheck, Flame } from 'lucide-react';
import { UserProfile, Course, Workshop } from '../types';

interface StudentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  courses: Course[];
  workshops: Workshop[];
  onSelectCourse: (course: Course) => void;
  onOpenCertificates: () => void;
}

export const StudentDashboardModal: React.FC<StudentDashboardModalProps> = ({
  isOpen,
  onClose,
  user,
  courses,
  workshops,
  onSelectCourse,
  onOpenCertificates,
}) => {
  if (!isOpen) return null;

  const skillMeters = [
    { skill: 'Robotics Engineering', level: 78, color: 'from-cyan-500 to-blue-500' },
    { skill: 'Arduino & Firmware C++', level: 65, color: 'from-blue-500 to-indigo-500' },
    { skill: 'Electronics & Sensors', level: 82, color: 'from-emerald-500 to-teal-500' },
    { skill: 'IoT Cloud Systems', level: 44, color: 'from-amber-500 to-orange-500' },
    { skill: 'Computer Vision & AI', level: 38, color: 'from-purple-500 to-pink-500' },
    { skill: 'Hardware CAD & Prototyping', level: 52, color: 'from-rose-500 to-red-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-slate-100"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-lg font-display">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {user.name}'s Innovation Dossier
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code">
                <span>{user.institution || 'Delhi STEM Hub'}</span>
                <span>•</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  12 Day Active Streak
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Top 4 Stat Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <BookOpen className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
              <div className="text-2xl font-bold font-mono-code text-white">4</div>
              <div className="text-[11px] text-slate-400">Enrolled Programs</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <Cpu className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
              <div className="text-2xl font-bold font-mono-code text-white">7</div>
              <div className="text-[11px] text-slate-400">Hardware Labs Built</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <Award className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
              <div className="text-2xl font-bold font-mono-code text-white">3</div>
              <div className="text-[11px] text-slate-400">Certificates Earned</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <ShoppingBag className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
              <div className="text-2xl font-bold font-mono-code text-white">2</div>
              <div className="text-[11px] text-slate-400">Hardware Kits Owned</div>
            </div>
          </div>

          {/* Skill Radar / Progress Bars */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Skill Mastery Index</span>
              </h4>
              <span className="text-[11px] font-mono-code text-cyan-400">Verified by Mentors</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {skillMeters.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.skill}</span>
                    <span className="text-cyan-400 font-mono-code font-bold">{item.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ongoing Courses with Stepper */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white">Active Course Progress</h4>
            <div className="space-y-2.5">
              {courses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h5 className="font-display font-bold text-sm text-white">{course.title}</h5>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Module 3 of 6 • Next: Sensor Calibration & Voltage Divider
                      </div>
                      <div className="w-40 sm:w-56 h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${course.progress || 50}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCourse(course);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shrink-0 self-end sm:self-center transition-all"
                  >
                    Resume Lab
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Certificate View Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-blue-950/40 border border-cyan-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <div className="font-display font-bold text-sm text-white">
                  3 Verifiable Certificates Ready
                </div>
                <div className="text-xs text-slate-400">
                  Includes Robotics Starter & Arduino Advanced certifications.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenCertificates();
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold font-mono-code flex items-center gap-1 transition-colors"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
