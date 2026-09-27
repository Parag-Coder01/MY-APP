import React from 'react';
import {
  X,
  Sun,
  Moon,
  ChevronRight,
  GraduationCap,
  ShoppingBag,
  Cpu,
  BookOpen,
  School,
  FileCheck,
  FolderGit2,
  Building2,
  Mail,
  Briefcase,
  PhoneCall,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { UserProfile, ExtendedView, MainTab } from '../types';
import { COMPANY_INFO } from '../data/mockData';

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
  onOpenStudentDashboard,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div
        className={`relative w-full max-w-sm h-full flex flex-col shadow-2xl z-10 overflow-hidden border-l transition-colors duration-200 ${
          isDark
            ? 'bg-slate-950 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-slate-850 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="font-display font-black text-base tracking-wide flex items-center gap-1.5">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>KITE</span>
              <span className="text-cyan-500 font-bold">MENU</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'text-amber-400 bg-slate-900 border-slate-850 hover:border-amber-400/50'
                  : 'text-slate-700 bg-white border-slate-200 hover:border-slate-300'
              }`}
              title="Toggle Dark / Light Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white bg-slate-900 border-slate-850'
                  : 'text-slate-500 hover:text-slate-900 bg-white border-slate-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Persona / Account Banner */}
        <div
          className={`p-4 border-b ${
            isDark ? 'border-slate-850 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-cyan-500/40"
              />
              <div>
                <div className="text-sm font-bold font-display leading-tight">{user.name}</div>
                <div className="text-xs text-slate-400 font-mono-code flex items-center gap-1 mt-0.5">
                  <span className="capitalize text-cyan-400 font-semibold">{user.role}</span>
                  <span>•</span>
                  <span className="truncate max-w-[120px]">{user.institution || 'KITE Ecosystem'}</span>
                </div>
              </div>
            </div>

            {isLoggedIn ? (
              <button
                onClick={onOpenManageProfile}
                className="text-[11px] font-mono-code text-cyan-400 hover:underline cursor-pointer"
              >
                Profile
              </button>
            ) : (
              <button
                onClick={() => onLogin('login')}
                className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono-code cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Navigation Categories Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Student Hub / LMS */}
          {onOpenStudentDashboard && isLoggedIn && (
            <div className="space-y-1.5">
              <button
                onClick={() => handleNavigate(onOpenStudentDashboard)}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 flex items-center justify-between text-left transition-all hover:border-cyan-400 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Student Learning Portal</div>
                    <div className="text-[10px] text-cyan-300/80">Track course progress & kits</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* 1. Core Learning & Store Links */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
              Ecosystem
            </div>
            <button
              onClick={() => handleNavigate(() => onSelectTab('learn'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium">STEM & Robotics Courses</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => handleNavigate(() => onSelectTab('store'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium">Hardware Kits & Components Store</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* 2. Experiential Activities */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
              Hands-On Programs
            </div>
            <button
              onClick={() => handleNavigate(() => onSelectExtendedView('workshops'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium">Workshops, Bootcamps & Competitions</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => handleNavigate(() => onSelectExtendedView('certificates'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-medium">Verify Student Certificates</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => handleNavigate(() => onSelectExtendedView('ebooks'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium">STEM E-Books & Lab Manuals</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => handleNavigate(() => onSelectExtendedView('projects'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-medium">Open Hardware DIY Projects</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* 3. Company & Careers */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-2 font-semibold">
              Company & Contact
            </div>
            <button
              onClick={() => handleNavigate(() => onSelectExtendedView('about'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium">About KITE Robotics Ecosystem</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => handleNavigate(() => onSelectExtendedView('careers'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium">Careers & Instructor Openings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => handleNavigate(() => onSelectExtendedView('contact'))}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 border-transparent hover:border-slate-800'
                  : 'hover:bg-slate-100 border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-medium">Contact & Support Hotline</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Footer Support Hotline */}
        <div
          className={`p-4 border-t flex items-center justify-between text-xs font-mono-code ${
            isDark ? 'border-slate-850 bg-slate-900/70' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-500" />
            <span>{COMPANY_INFO.phone}</span>
          </a>
          <div className="flex items-center gap-2.5">
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
      </div>
    </div>
  );
};
