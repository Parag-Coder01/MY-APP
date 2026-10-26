import React, { useState } from 'react';
import {
  X,
  Sun,
  Moon,
  ChevronRight,
  GraduationCap,
  Users,
  School,
  UserCheck,
  Building2,
  FolderGit2,
  Rocket,
  Cpu,
  Briefcase,
  PhoneCall,
  Smartphone,
  Sparkles,
  ShoppingBag,
  LogIn,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  BookOpen,
  FileCheck,
  Shield,
  Layers,
  HelpCircle,
  Award,
} from 'lucide-react';
import { UserProfile, ExtendedView, MainTab, UserRole } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface QuickMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  isLoggedIn: boolean;
  onLogin: (mode?: 'login' | 'signup', role?: UserRole) => void;
  onLogout: () => void;
  onOpenManageProfile: () => void;
  onSelectExtendedView: (view: ExtendedView) => void;
  onSelectTab: (tab: MainTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenInstallPrompt?: () => void;
  onOpenStudentDashboard?: () => void;
  onSelectRolePersona?: (role: UserRole) => void;
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
  onSelectRolePersona,
}) => {
  // Sub-menu state when a role card is clicked ('student' | 'parent' | 'educator' | 'customer' | null)
  const [activeRoleView, setActiveRoleView] = useState<UserRole | null>(null);

  if (!isOpen) return null;

  const handleNavigate = (action: () => void) => {
    action();
    onClose();
  };

  const handleRoleSignIn = (role: UserRole, mode: 'login' | 'signup' = 'login') => {
    onLogin(mode, role);
    onClose();
  };

  const handleDirectPersonaSwitch = (role: UserRole) => {
    if (onSelectRolePersona) {
      onSelectRolePersona(role);
    }
    onClose();
  };

  // Role Configurations
  const roleCards = [
    {
      role: 'student' as UserRole,
      title: 'Student',
      subtitle: 'Learning & Kits Portal',
      desc: 'Enrolled courses, lab kit challenges, certificates & AI mentor',
      icon: GraduationCap,
      color: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      borderHover: 'hover:border-cyan-500/60',
      accentGradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    },
    {
      role: 'parent' as UserRole,
      title: 'Parent',
      subtitle: 'Progress & Safety Hub',
      desc: 'Kit order tracking, skill evaluations & mentor updates',
      icon: Users,
      color: 'text-blue-400',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      borderHover: 'hover:border-blue-500/60',
      accentGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    },
    {
      role: 'educator' as UserRole,
      title: 'Teacher',
      subtitle: 'Educator & ATL Hub',
      desc: 'Lesson plans, lab manuals, batch reports & trainer tools',
      icon: School,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      borderHover: 'hover:border-emerald-500/60',
      accentGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    },
    {
      role: 'customer' as UserRole,
      title: 'Guest',
      subtitle: 'Explore Kite Ecosystem',
      desc: 'Browse kits, hardware store, projects & curriculums',
      icon: UserCheck,
      color: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      borderHover: 'hover:border-amber-500/60',
      accentGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div
        className={`relative w-full max-w-sm sm:max-w-md h-full flex flex-col shadow-2xl z-10 overflow-hidden border-l transition-colors duration-200 ${
          isDark
            ? 'bg-slate-950 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Header */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            {activeRoleView ? (
              <button
                onClick={() => setActiveRoleView(null)}
                className="p-1.5 rounded-xl border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs font-mono-code cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div className="font-display font-black text-base tracking-wide flex items-center gap-1.5">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>KITE</span>
                <span className="text-cyan-400 font-bold">ROBOTICS</span>
                <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold ml-1">
                  MENU
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'text-amber-400 bg-slate-900 border-slate-800 hover:border-amber-400/50'
                  : 'text-slate-700 bg-white border-slate-200 hover:border-slate-300'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-white bg-slate-900 border-slate-800'
                  : 'text-slate-500 hover:text-slate-900 bg-white border-slate-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* ========================================================================= */}
          {/* SUB-MENU VIEW 1: STUDENT ACCOUNT SETUP & PORTAL */}
          {/* ========================================================================= */}
          {activeRoleView === 'student' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-cyan-950/70 to-slate-900 border border-cyan-500/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code font-bold uppercase text-cyan-400 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-800/40">
                      Student Ecosystem
                    </span>
                    <h3 className="font-display font-black text-lg text-white mt-1">
                      Student Account & Learning
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Personalized robotics learning dashboard with video tutorials, code challenges, lab kit tracking, and ISO verifiable certificates.
                </p>

                {/* Primary Student Sign In & Setup CTAs */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleSignIn('student', 'login')}
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-display font-black text-xs tracking-wider transition-all shadow-md shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Student Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSignIn('student', 'signup')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-display font-bold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Create Account</span>
                  </button>
                </div>

                {/* Demo instant switch */}
                <button
                  type="button"
                  onClick={() => handleDirectPersonaSwitch('student')}
                  className="w-full py-1.5 text-center text-[11px] font-mono-code text-cyan-400 hover:underline cursor-pointer opacity-90"
                >
                  ⚡ Instant Demo: Continue as Aarav (Class 10 Student)
                </button>
              </div>

              {/* Student Features Quick Links */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-1 font-bold">
                  Student Learning Channels
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate(() => onSelectTab('learn'))}
                  className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                        My Enrolled Courses
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Autonomous rovers, ESP32, Python AI & ROS 2
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-all" />
                </button>

                {onOpenStudentDashboard && (
                  <button
                    type="button"
                    onClick={() => handleNavigate(onOpenStudentDashboard)}
                    className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                          LMS Student Dashboard
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Track course progress, badges & quiz reports
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-all" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleNavigate(() => onSelectExtendedView('certificates'))}
                  className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                        Download Certificates
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Scan QR & verify workshop/course certificates
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-all" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-MENU VIEW 2: PARENT ACCOUNT SETUP & PORTAL */}
          {/* ========================================================================= */}
          {activeRoleView === 'parent' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-950/70 to-slate-900 border border-blue-500/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code font-bold uppercase text-blue-400 bg-blue-950/90 px-2 py-0.5 rounded border border-blue-800/40">
                      Parent Portal
                    </span>
                    <h3 className="font-display font-black text-lg text-white mt-1">
                      Parent Account & Overview
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Monitor your child's STEM milestones, hardware kit shipments, attendance in weekend workshops, and mentor performance evaluations.
                </p>

                {/* Primary Parent Sign In & Setup CTAs */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleSignIn('parent', 'login')}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-display font-black text-xs tracking-wider transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Parent Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSignIn('parent', 'signup')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-blue-500/40 text-blue-300 font-display font-bold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Register Parent</span>
                  </button>
                </div>

                {/* Demo instant switch */}
                <button
                  type="button"
                  onClick={() => handleDirectPersonaSwitch('parent')}
                  className="w-full py-1.5 text-center text-[11px] font-mono-code text-blue-400 hover:underline cursor-pointer opacity-90"
                >
                  ⚡ Instant Demo: Continue as Sunita Sharma (Guardian)
                </button>
              </div>

              {/* Parent Quick Tools */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-1 font-bold">
                  Parent Highlights
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span>Child Progress Insights</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Weekly attendance, skill mastery in robotics circuits & mentor review reports.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate(() => onSelectExtendedView('workshops'))}
                  className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        Register for STEM Camps
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Reserve hands-on robotics weekend batches
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-all" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-MENU VIEW 3: TEACHER / EDUCATOR ACCOUNT SETUP & PORTAL */}
          {/* ========================================================================= */}
          {activeRoleView === 'educator' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <School className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800/40">
                      Teacher & ATL Hub
                    </span>
                    <h3 className="font-display font-black text-lg text-white mt-1">
                      Educator Account & Tools
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dedicated educator workspace for ATL coordinators, STEM teachers, and trainers: download lesson plans, NEP 2020 curriculum, and manage batch certifications.
                </p>

                {/* Primary Educator Sign In & Setup CTAs */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRoleSignIn('educator', 'login')}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-black text-xs tracking-wider transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Teacher Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSignIn('educator', 'signup')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-display font-bold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Teacher Sign Up</span>
                  </button>
                </div>

                {/* Demo instant switch */}
                <button
                  type="button"
                  onClick={() => handleDirectPersonaSwitch('educator')}
                  className="w-full py-1.5 text-center text-[11px] font-mono-code text-emerald-400 hover:underline cursor-pointer opacity-90"
                >
                  ⚡ Instant Demo: Continue as Priya Sen (STEM Mentor)
                </button>
              </div>

              {/* Teacher Resources */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-1 font-bold">
                  Teacher Teaching Resources
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate(() => onSelectExtendedView('curriculum'))}
                  className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        NEP 2020 STEM Curriculum
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Class 3 to 12 structured robotics lesson guides
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-all" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate(() => onSelectExtendedView('ebooks'))}
                  className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        Lab Manuals & E-Books
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Printed circuit guides & breadboard schematics
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-all" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-MENU VIEW 4: GUEST / EXPLORER (INSTANT BROWSE) */}
          {/* ========================================================================= */}
          {activeRoleView === 'customer' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-950/70 to-slate-900 border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code font-bold uppercase text-amber-400 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-800/40">
                      Guest Explorer
                    </span>
                    <h3 className="font-display font-black text-lg text-white mt-1">
                      Browse Without Sign-In
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Explore everything KITE Robotics has to offer as a guest: test out hardware kits, review DIY projects, discover upcoming bootcamps, and buy components without creating an account.
                </p>

                {/* Instant Explore Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleDirectPersonaSwitch('customer');
                      onSelectTab('store');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-black text-xs tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Explore Store</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDirectPersonaSwitch('customer');
                      onSelectTab('home');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-display font-bold text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Browse Home</span>
                  </button>
                </div>
              </div>

              {/* Guest Discovery Highlights */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-1 font-bold">
                  Instant Discovery
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate(() => onSelectTab('store'))}
                  className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        Hardware Kits & Sensors Store
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Arduino Uno, ESP32, rovers, sensors & spare parts
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-all" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate(() => onSelectExtendedView('projects'))}
                  className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        Open Hardware DIY Projects
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Schematics, wiring diagrams & open code
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-all" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DEFAULT MENU VIEW: 4 INTERACTIVE PERSONAS + 5 REQUESTED CORE OPTIONS */}
          {/* ========================================================================= */}
          {!activeRoleView && (
            <>
              {/* 1. INTERACTIVE PERSONAS: STUDENT, PARENT, TEACHER, GUEST */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-400">
                    Sign In as / Setup Account
                  </span>
                  <span className="text-[10px] font-mono-code text-cyan-400 font-medium">
                    Tap to open portal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {roleCards.map((opt) => {
                    const IconComponent = opt.icon;
                    const isCurrent = user.role === opt.role;

                    return (
                      <button
                        key={opt.role}
                        type="button"
                        onClick={() => setActiveRoleView(opt.role)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 relative group overflow-hidden ${
                          isCurrent
                            ? `border-cyan-500/60 bg-gradient-to-br from-cyan-950/40 to-slate-900 ring-2 ring-cyan-500/30 shadow-md`
                            : isDark
                            ? `bg-slate-900/80 border-slate-800 ${opt.borderHover} hover:bg-slate-900`
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-xl ${isDark ? 'bg-slate-950' : 'bg-white'} border border-slate-800/60 shadow-sm`}>
                            <IconComponent className={`w-4 h-4 ${opt.color}`} />
                          </div>
                          <span className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded-full border ${opt.badgeBg} font-bold`}>
                            Setup
                          </span>
                        </div>

                        <div>
                          <div className={`font-display font-black text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'} leading-tight flex items-center justify-between`}>
                            <span>{opt.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                            {opt.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Account status strip */}
                <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-mono-code ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100/70 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] text-slate-300 truncate max-w-[170px]">
                      {isLoggedIn ? `${user.name} (${user.role})` : 'Guest Session'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isLoggedIn ? (
                      <button
                        onClick={() => handleNavigate(onOpenManageProfile)}
                        className="text-cyan-400 hover:underline cursor-pointer font-bold text-[11px]"
                      >
                        Profile
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNavigate(() => onLogin('login'))}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px] cursor-pointer hover:bg-cyan-400"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* 2. THE 5 CORE REQUESTED MENU OPTIONS */}
              {/* About Kite Robotics -> Projects -> Internship -> Kits and Components -> Career and Hiring */}
              {/* ========================================================================= */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-1 font-bold">
                  Explore Kite Robotics
                </div>

                <div className="space-y-1.5">
                  {/* 1. About Kite Robotics */}
                  <button
                    type="button"
                    onClick={() => handleNavigate(() => onSelectExtendedView('about'))}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer group ${
                      isDark
                        ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/40'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-cyan-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                          About Kite Robotics
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Company mission, leadership, ATL labs & pan-India story
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* 2. Projects */}
                  <button
                    type="button"
                    onClick={() => handleNavigate(() => onSelectExtendedView('projects'))}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer group ${
                      isDark
                        ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-teal-500/40'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-teal-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-teal-400 transition-colors">
                          Projects
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Open-hardware DIY rovers, IoT nodes & AI code repositories
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* 3. Internship */}
                  <button
                    type="button"
                    onClick={() => handleNavigate(() => onSelectExtendedView('internship'))}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer group ${
                      isDark
                        ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-indigo-500/40'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                        <Rocket className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                          <span>Internship</span>
                          <span className="text-[9px] font-mono-code px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase font-bold">
                            Hiring
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Robotics, Edge AI, WebGL & STEM mentor cohorts
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* 4. Kits and Components */}
                  <button
                    type="button"
                    onClick={() => handleNavigate(() => onSelectTab('store'))}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer group ${
                      isDark
                        ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-amber-500/40'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                          Kits and Components
                        </div>
                        <div className="text-[10px] text-slate-400">
                          STEM robot kits, Arduino, ESP32, sensors & store catalog
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* 5. Career and Hiring */}
                  <button
                    type="button"
                    onClick={() => handleNavigate(() => onSelectExtendedView('careers'))}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer group ${
                      isDark
                        ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-emerald-500/40'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                          Career and Hiring
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Full-time engineering, curriculum designer & trainer roles
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Support Hotline */}
        <div
          className={`p-4 border-t flex items-center justify-between text-xs font-mono-code ${
            isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
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
