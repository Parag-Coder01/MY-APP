import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  LogIn,
  LogOut,
  BookOpen,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Info,
  PhoneCall,
  Calendar,
  School,
  Moon,
  Sun,
  Smartphone,
  ChevronRight,
  Shield,
  Sparkles,
  ExternalLink,
  Laptop,
  User,
  UserPlus,
  Settings,
  UserCog,
  Award,
  CheckCircle2,
  Share2,
  Github,
} from 'lucide-react';
import { ExtendedView, MainTab, UserProfile } from '../types';
import { KiteLogo } from './KiteLogo';
import { COMPANY_INFO } from '../data/mockData';
import { OFFICIAL_GITHUB_URL } from '../utils/shareUtils';

interface QuickMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  isLoggedIn: boolean;
  onLogin: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenManageProfile: () => void;
  onSelectExtendedView: (view: ExtendedView) => void;
  onSelectTab: (tab: MainTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenInstallPrompt?: () => void;
  onOpenShareModal?: () => void;
  onOpenStudentDashboard?: () => void;
}

export const QuickMenuDrawer: React.FC<QuickMenuDrawerProps> = ({
  isOpen,
  onClose,
  user,
  isLoggedIn,
  onLogin,
  onLogout,
  onOpenManageProfile,
  onSelectExtendedView,
  onSelectTab,
  isDark,
  onToggleTheme,
  onOpenInstallPrompt,
  onOpenShareModal,
  onOpenStudentDashboard,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-start bg-black/70 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className={`relative z-10 w-full max-w-sm h-full flex flex-col justify-between shadow-2xl overflow-hidden border-r ${
            isDark
              ? 'bg-slate-950 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`p-4 border-b flex items-center justify-between ${
              isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50/80'
            }`}
          >
            <KiteLogo size="sm" />
            <div className="flex items-center gap-1.5">
              {/* Quick Theme Toggle */}
              <button
                onClick={onToggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`p-2 rounded-xl border transition-colors ${
                  isDark
                    ? 'border-slate-800 text-amber-400 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* 1. Account Section: Login / Create Account & Profile Management */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}
            >
              {isLoggedIn ? (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-11 h-11 rounded-xl object-cover border-2 border-cyan-500 shadow-sm shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black flex items-center justify-center font-display text-base shrink-0 shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <div className="font-display font-bold text-sm truncate dark:text-white text-slate-900">
                            {user.name}
                          </div>
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        </div>
                        <div className="text-[11px] font-mono-code text-cyan-500 dark:text-cyan-400 capitalize truncate">
                          {user.role} • {user.city || 'India'}
                        </div>
                        <div className="text-[10px] dark:text-slate-400 text-slate-500 truncate">
                          {user.institution || 'KITE STEM Hub'}
                        </div>
                      </div>
                    </div>

                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
                  </div>

                  {/* Primary "Manage Profile" Action Button */}
                  <button
                    onClick={() => handleNavigate(onOpenManageProfile)}
                    className="w-full py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 text-xs font-bold font-mono-code flex items-center justify-center gap-2 transition-all cursor-pointer group"
                  >
                    <UserCog className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Manage Profile & Credentials</span>
                  </button>

                  {/* Quick User Stats Strip */}
                  <div className="grid grid-cols-3 gap-1.5 text-center pt-1 border-t dark:border-slate-800 border-slate-200">
                    <div className="py-1 px-1 rounded-lg dark:bg-slate-950 bg-white border dark:border-slate-800/80 border-slate-200">
                      <div className="text-xs font-mono-code font-bold text-cyan-400">{user.enrolledCoursesCount || 1}</div>
                      <div className="text-[9px] dark:text-slate-400 text-slate-500">Courses</div>
                    </div>
                    <div className="py-1 px-1 rounded-lg dark:bg-slate-950 bg-white border dark:border-slate-800/80 border-slate-200">
                      <div className="text-xs font-mono-code font-bold text-indigo-400">{user.completedProjectsCount || 0}</div>
                      <div className="text-[9px] dark:text-slate-400 text-slate-500">Projects</div>
                    </div>
                    <div className="py-1 px-1 rounded-lg dark:bg-slate-950 bg-white border dark:border-slate-800/80 border-slate-200">
                      <div className="text-xs font-mono-code font-bold text-amber-400">{user.certificatesCount || 0}</div>
                      <div className="text-[9px] dark:text-slate-400 text-slate-500">Certs</div>
                    </div>
                  </div>

                  {/* Secondary Actions: Switch Role & Logout */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/60 dark:border-slate-800">
                    <button
                      onClick={() => handleNavigate(() => onLogin('login'))}
                      className={`py-1.5 px-3 rounded-lg text-xs font-mono-code font-medium border transition-colors text-center cursor-pointer ${
                        isDark
                          ? 'border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      Switch Account
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        onClose();
                      }}
                      className="py-1.5 px-3 rounded-lg text-xs font-mono-code font-bold text-rose-400 hover:text-rose-300 border border-rose-900/40 bg-rose-950/20 hover:bg-rose-950/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <div className="font-display font-extrabold text-sm dark:text-white text-slate-900">
                        Join KITE Robotics
                      </div>
                    </div>
                    <div className="text-xs dark:text-slate-400 text-slate-500 mt-1 leading-snug">
                      Sign in or create an account to access courses, kits, ATL projects, and AI copilot.
                    </div>
                  </div>

                  {/* Dual Action Buttons: Sign In & Create Account */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleNavigate(() => onLogin('login'))}
                      className="py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono-code flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all active:scale-95 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => handleNavigate(() => onLogin('signup'))}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold font-mono-code flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                        isDark
                          ? 'border-slate-700 bg-slate-800 hover:bg-slate-750 text-white'
                          : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-900'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Register</span>
                    </button>
                  </div>

                  <div className="text-[10px] font-mono-code dark:text-slate-400 text-slate-500 pt-1 border-t dark:border-slate-800 border-slate-200">
                    ⚡ 1-Click Demo accounts available
                  </div>
                </div>
              )}
            </div>

            {/* Account & Profile Direct Shortcuts */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
                Account & Dossier
              </div>

              {/* Manage Profile */}
              <button
                onClick={() => handleNavigate(onOpenManageProfile)}
                className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-left transition-all group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-cyan-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 group-hover:scale-105 transition-transform">
                    <UserCog className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                      Manage Profile & Settings
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Personal info, school, grade & avatar
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Student Innovation Dossier */}
              {onOpenStudentDashboard && (
                <button
                  onClick={() => handleNavigate(onOpenStudentDashboard)}
                  className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-left transition-all group cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/50'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-cyan-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 group-hover:scale-105 transition-transform">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold group-hover:text-indigo-400 transition-colors">
                        Innovation Dossier
                      </div>
                      <div className="text-[11px] text-slate-400">
                        ATL accomplishments & portfolio
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              )}
            </div>

            {/* 2. Academics & Learning Resources */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
                Academics & Resources
              </div>

              {/* Curriculum */}
              <button
                onClick={() => handleNavigate(() => onSelectExtendedView('curriculum'))}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-cyan-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <span>Curriculum</span>
                      <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        NEP 2020
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      K-12 & College STEM syllabus roadmaps
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* E-Books */}
              <button
                onClick={() => handleNavigate(() => onSelectExtendedView('ebooks'))}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-indigo-500/50'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                      <span>E-Books</span>
                      <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                        Free PDF
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Robotics handbooks & Arduino guides
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Projects */}
              <button
                onClick={() => handleNavigate(() => onSelectExtendedView('projects'))}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-emerald-500/50'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 group-hover:scale-105 transition-transform">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <span>Projects</span>
                      <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        DIY Kits
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Autonomous rovers, IoT & schematics
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
              {/* IT Services */}
              <button
                onClick={() => handleNavigate(() => onSelectExtendedView('it-services'))}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-indigo-900/50 hover:border-indigo-500/80'
                    : 'bg-indigo-50/60 hover:bg-indigo-50 border-indigo-200 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 group-hover:scale-105 transition-transform">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                      <span>IT Services</span>
                      <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-indigo-500 text-white">
                        NEW
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Website, App, ERP & LMS solutions
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>

            {/* 3. Company & Opportunities */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
                Company & Discovery
              </div>

              {/* Career Page */}
              <button
                onClick={() => handleNavigate(() => onSelectExtendedView('careers'))}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-emerald-500/50'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <span>Career Page</span>
                      <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                        Hiring
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Join as STEM Trainer, Engineer or Intern
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* About KITE Robotics */}
              <button
                onClick={() => handleNavigate(() => onSelectExtendedView('about'))}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-blue-500/50'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-blue-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/40 group-hover:scale-105 transition-transform">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-blue-400 transition-colors">
                      About KITE Robotics
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Mission, national labs & leadership
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Contact Information */}
              <button
                onClick={() => handleNavigate(() => onSelectExtendedView('contact'))}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-pink-500/50'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-pink-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-950/60 text-pink-400 border border-pink-800/40 group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-pink-400 transition-colors">
                      Contact Information
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {COMPANY_INFO.phone} • WhatsApp & HQ
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>

            {/* 4. Open-Source, GitHub & Multi-Device Access */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
                Connectivity & Open-Source
              </div>

              {/* Share / Open on Any Device */}
              {onOpenShareModal && (
                <button
                  onClick={() => handleNavigate(onOpenShareModal)}
                  className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group cursor-pointer ${
                    isDark
                      ? 'bg-cyan-950/20 hover:bg-cyan-950/40 border-cyan-800/40 hover:border-cyan-500/70'
                      : 'bg-cyan-50 hover:bg-cyan-100/70 border-cyan-200 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-105 transition-transform">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-cyan-400 flex items-center gap-1.5">
                        <span>Open on Mobile & Share</span>
                        <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Universal
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        QR Code, WhatsApp share & public link
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              )}

              {/* GitHub Official Repository */}
              <a
                href={OFFICIAL_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all group ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold dark:text-white text-slate-900 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Source code, firmware & schematics
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>

            {/* Additional Ecosystem shortcuts */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
                Ecosystem Programs
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavigate(() => onSelectExtendedView('workshops'))}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                    isDark ? 'bg-slate-900/50 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-medium truncate">ROBOZEST</span>
                </button>
                <button
                  onClick={() => handleNavigate(() => onSelectExtendedView('schools'))}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                    isDark ? 'bg-slate-900/50 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <School className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-xs font-medium truncate">ATL School Labs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Quick Bar */}
          <div
            className={`p-4 border-t flex items-center justify-between text-xs font-mono-code ${
              isDark ? 'border-slate-800 bg-slate-900/70 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-500" />
              <span>{COMPANY_INFO.phone}</span>
            </a>

            <div className="flex items-center gap-2.5">
              <a
                href={OFFICIAL_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              {onOpenShareModal && (
                <button
                  onClick={() => handleNavigate(onOpenShareModal)}
                  className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
                  title="Share App"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              )}

              {onOpenInstallPrompt && (
                <button
                  onClick={() => handleNavigate(onOpenInstallPrompt)}
                  className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>App</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
