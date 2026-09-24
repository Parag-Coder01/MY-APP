import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, X, BookOpen } from 'lucide-react';

export interface TechCourseItem {
  id: string;
  name: string;
  category: 'robotics' | 'embedded' | 'ai-data' | 'web-dev' | 'mobile';
  icon: React.ReactNode;
  bgGlow: string;
}

export const TECH_COURSES: TechCourseItem[] = [
  {
    id: 'ai-robotics',
    name: 'AI and Robotics',
    category: 'robotics',
    bgGlow: 'group-hover:border-cyan-400 group-hover:shadow-cyan-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="8" y="12" width="32" height="26" rx="8" fill="#0E2439" stroke="#00D8F6" strokeWidth="2.5" />
        <path d="M24 6V12" stroke="#00D8F6" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="5" r="2.5" fill="#38BDF8" />
        <circle cx="18" cy="22" r="3.5" fill="#00D8F6" />
        <circle cx="30" cy="22" r="3.5" fill="#00D8F6" />
        <path d="M17 31C19 33 29 33 31 31" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 22H8M40 22H44" stroke="#00D8F6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'arduino',
    name: 'Arduino',
    category: 'embedded',
    bgGlow: 'group-hover:border-teal-400 group-hover:shadow-teal-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path
          d="M17 14C11.5 14 7 18.5 7 24C7 29.5 11.5 34 17 34C21.5 34 24 30.5 24 24C24 17.5 21.5 14 17 14Z"
          stroke="#00979D"
          strokeWidth="3.2"
        />
        <path
          d="M31 14C36.5 14 41 18.5 41 24C41 29.5 36.5 34 31 34C26.5 34 24 30.5 24 24C24 17.5 26.5 14 31 14Z"
          stroke="#00979D"
          strokeWidth="3.2"
        />
        <path d="M13 24H21" stroke="#00979D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M31 20V28M27 24H35" stroke="#00979D" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'embedded-cpp',
    name: 'Embedded C/C++',
    category: 'embedded',
    bgGlow: 'group-hover:border-blue-400 group-hover:shadow-blue-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path
          d="M24 4L40 13V35L24 44L8 35V13L24 4Z"
          fill="#0D2137"
          stroke="#00599C"
          strokeWidth="2.5"
        />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fill="#659AD2"
          fontSize="14"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          C++
        </text>
      </svg>
    ),
  },
  {
    id: '3d-printing',
    name: '3-D printing',
    category: 'robotics',
    bgGlow: 'group-hover:border-amber-400 group-hover:shadow-amber-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M16 8H32V16H16V8Z" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2.5" />
        <path d="M21 16L24 22L27 16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="22" x2="24" y2="26" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 2" />
        <path d="M10 32L24 26L38 32L24 38L10 32Z" stroke="#FBBF24" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M10 38L24 44L38 38" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="26" r="1.5" fill="#EF4444" />
      </svg>
    ),
  },
  {
    id: 'iot',
    name: 'IOT',
    category: 'embedded',
    bgGlow: 'group-hover:border-emerald-400 group-hover:shadow-emerald-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <circle cx="24" cy="24" r="6" fill="#10B981" />
        <circle cx="10" cy="14" r="3.5" fill="#34D399" />
        <circle cx="38" cy="14" r="3.5" fill="#34D399" />
        <circle cx="12" cy="36" r="3.5" fill="#34D399" />
        <circle cx="36" cy="36" r="3.5" fill="#34D399" />
        <path d="M13 16L20 21M35 16L28 21M15 34L20 27M33 34L28 27" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M19 14A8 8 0 0 1 29 14" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 10A12 12 0 0 1 32 10" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    category: 'ai-data',
    bgGlow: 'group-hover:border-purple-400 group-hover:shadow-purple-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <circle cx="12" cy="14" r="4" fill="#8B5CF6" />
        <circle cx="12" cy="34" r="4" fill="#8B5CF6" />
        <circle cx="24" cy="10" r="4" fill="#A78BFA" />
        <circle cx="24" cy="24" r="5" fill="#C4B5FD" />
        <circle cx="24" cy="38" r="4" fill="#A78BFA" />
        <circle cx="36" cy="18" r="4" fill="#EC4899" />
        <circle cx="36" cy="30" r="4" fill="#EC4899" />
        <path d="M15 16L20 22M15 32L20 26M15 13L20 11M15 35L20 37M28 12L33 16M28 22L33 20M28 26L33 28M28 36L33 32" stroke="#8B5CF6" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'ai-data',
    bgGlow: 'group-hover:border-yellow-400 group-hover:shadow-yellow-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        {/* Python Blue Head */}
        <path
          d="M23.5 6C16.8 6 17.2 8.9 17.2 8.9L17.2 12L24 12L24 13L13.5 13C8.8 13 6 16.5 6 21.2C6 26.6 8.9 26.3 8.9 26.3L11.5 26.3L11.5 22.8C11.5 18.7 15 18.3 15 18.3L23.8 18.3C27.9 18.3 28.5 14.8 28.5 14.8L28.5 8.9C28.5 8.9 28.5 6 23.5 6ZM20 9.2C20.8 9.2 21.4 9.8 21.4 10.6C21.4 11.4 20.8 12 20 12C19.2 12 18.6 11.4 18.6 10.6C18.6 9.8 19.2 9.2 20 9.2Z"
          fill="#3776AB"
        />
        {/* Python Yellow Head */}
        <path
          d="M24.5 42C31.2 42 30.8 39.1 30.8 39.1L30.8 36L24 36L24 35L34.5 35C39.2 35 42 31.5 42 26.8C42 21.4 39.1 21.7 39.1 21.7L36.5 21.7L36.5 25.2C36.5 29.3 33 29.7 33 29.7L24.2 29.7C20.1 29.7 19.5 33.2 19.5 33.2L19.5 39.1C19.5 39.1 19.5 42 24.5 42ZM28 38.8C27.2 38.8 26.6 38.2 26.6 37.4C26.6 36.6 27.2 36 28 36C28.8 36 29.4 36.6 29.4 37.4C29.4 38.2 28.8 38.8 28 38.8Z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    id: 'java',
    name: 'Java',
    category: 'ai-data',
    bgGlow: 'group-hover:border-red-400 group-hover:shadow-red-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path
          d="M27 8C27 8 30 11 26 14C23 16 25 18 29 20C33 22 28 26 23 25"
          stroke="#EA2D2E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M21 11C21 11 23 13 21 15C19 17 20 18 23 19"
          stroke="#5382A1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 30C12 30 14 33 24 33C34 33 36 30 36 30"
          stroke="#5382A1"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M15 36C15 36 18 39 24 39C30 39 33 36 33 36"
          stroke="#EA2D2E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 42C16 44 32 44 38 42"
          stroke="#5382A1"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'numpy',
    name: 'Numpy',
    category: 'ai-data',
    bgGlow: 'group-hover:border-blue-400 group-hover:shadow-blue-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 6L40 15V33L24 42L8 33V15L24 6Z" fill="#013243" stroke="#4D77CF" strokeWidth="2.2" />
        <path d="M24 6V24L40 15" stroke="#4D77CF" strokeWidth="2" />
        <path d="M24 24L8 15" stroke="#4D77CF" strokeWidth="2" />
        <path d="M24 24V42" stroke="#4D77CF" strokeWidth="2" />
        <text
          x="24"
          y="27"
          textAnchor="middle"
          fill="#4DABF7"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          NP
        </text>
      </svg>
    ),
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'ai-data',
    bgGlow: 'group-hover:border-indigo-400 group-hover:shadow-indigo-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="8" y="8" width="8" height="18" rx="3" fill="#150458" stroke="#6366F1" strokeWidth="1.8" />
        <rect x="20" y="14" width="8" height="24" rx="3" fill="#E70488" stroke="#F43F5E" strokeWidth="1.8" />
        <rect x="32" y="8" width="8" height="26" rx="3" fill="#FFCA00" stroke="#F59E0B" strokeWidth="1.8" />
        <circle cx="12" cy="34" r="3" fill="#150458" />
      </svg>
    ),
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'ai-data',
    bgGlow: 'group-hover:border-sky-400 group-hover:shadow-sky-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="6" y="8" width="36" height="32" rx="6" fill="#0C1B2A" stroke="#11557C" strokeWidth="2" />
        <path d="M11 32C15 22 19 36 24 16C29 36 33 22 37 32" stroke="#00A8E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="16" r="3" fill="#FF5964" />
        <circle cx="17" cy="29" r="2.5" fill="#F18F01" />
        <circle cx="31" cy="29" r="2.5" fill="#F18F01" />
      </svg>
    ),
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'ai-data',
    bgGlow: 'group-hover:border-cyan-400 group-hover:shadow-cyan-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="6" fill="#0B2027" stroke="#4E79A7" strokeWidth="2" />
        <path d="M12 36C18 36 20 18 24 18C28 18 30 36 36 36" fill="#4E79A7" fillOpacity="0.4" stroke="#4E79A7" strokeWidth="2.5" />
        <path d="M12 36C18 36 20 25 24 25C28 25 30 36 36 36" fill="#F28E2B" fillOpacity="0.5" stroke="#F28E2B" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'pytorch',
    name: 'Pytorch',
    category: 'ai-data',
    bgGlow: 'group-hover:border-orange-400 group-hover:shadow-orange-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path
          d="M26.5 8L18 16.5C14.7 19.8 14.7 25.2 18 28.5L27 37.5L31.5 33L22.5 24C21.7 23.2 21.7 21.8 22.5 21L26.5 17L26.5 8Z"
          fill="#EE4C2C"
        />
        <circle cx="31" cy="12" r="3.5" fill="#EE4C2C" />
      </svg>
    ),
  },
  {
    id: 'flask',
    name: 'flask',
    category: 'web-dev',
    bgGlow: 'group-hover:border-slate-300 group-hover:shadow-white/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path
          d="M20 8H28V16L36 34C37.5 37 35.5 40 32 40H16C12.5 40 10.5 37 12 34L20 16V8Z"
          stroke="#E2E8F0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M18 8H30" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M15 32H33" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="21" cy="35" r="1.5" fill="#38BDF8" />
        <circle cx="27" cy="33" r="2" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'django',
    name: 'django',
    category: 'web-dev',
    bgGlow: 'group-hover:border-emerald-500 group-hover:shadow-emerald-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#092E20" stroke="#44B78B" strokeWidth="2" />
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fill="#44B78B"
          fontSize="18"
          fontWeight="900"
          fontFamily="system-ui, serif"
        >
          dj
        </text>
      </svg>
    ),
  },
  {
    id: 'bootstrap',
    name: 'bootsrtap',
    category: 'web-dev',
    bgGlow: 'group-hover:border-purple-400 group-hover:shadow-purple-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="10" fill="#7952B3" />
        <text
          x="24"
          y="33"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="24"
          fontWeight="900"
          fontFamily="serif"
        >
          B
        </text>
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'react',
    category: 'web-dev',
    bgGlow: 'group-hover:border-cyan-400 group-hover:shadow-cyan-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" transform="rotate(0 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3.5" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'tailwwind',
    category: 'web-dev',
    bgGlow: 'group-hover:border-sky-400 group-hover:shadow-sky-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path
          d="M15 19C16.8 14.5 21 13 25.5 14.5C28.2 15.4 30 17.5 31.5 20C33.75 23.75 36 26.5 40.5 26.5C45 26.5 48 22 48 22C46.2 26.5 42 28 37.5 26.5C34.8 25.6 33 23.5 31.5 21C29.25 17.25 27 14.5 22.5 14.5C18 14.5 15 19 15 19ZM3 29C4.8 24.5 9 23 13.5 24.5C16.2 25.4 18 27.5 19.5 30C21.75 33.75 24 36.5 28.5 36.5C33 36.5 36 32 36 32C34.2 36.5 30 38 25.5 36.5C22.8 35.6 21 33.5 19.5 31C17.25 27.25 15 24.5 10.5 24.5C6 24.5 3 29 3 29Z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    id: 'html',
    name: 'html',
    category: 'web-dev',
    bgGlow: 'group-hover:border-orange-500 group-hover:shadow-orange-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M9 4L12 38L24 42L36 38L39 4H9Z" fill="#E44D26" />
        <path d="M24 7.5V38.8L33.3 35.8L35.8 7.5H24Z" fill="#F16529" />
        <path d="M16 14H32L31.5 20H16.5L17 26H31L30 33L24 34.8L18 33L17.5 29H14L15 36L24 38.5L33 36L34.5 18H15.5L16 14Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'css',
    name: 'css',
    category: 'web-dev',
    bgGlow: 'group-hover:border-blue-500 group-hover:shadow-blue-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M9 4L12 38L24 42L36 38L39 4H9Z" fill="#1572B6" />
        <path d="M24 7.5V38.8L33.3 35.8L35.8 7.5H24Z" fill="#33A9DC" />
        <path d="M16 14H32L31.5 20H24V25H31L30 33L24 34.8L18 33L17.5 29H14L15 36L24 38.5L33 36L34.5 14H24V18H16L16 14Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'js',
    name: 'js',
    category: 'web-dev',
    bgGlow: 'group-hover:border-yellow-400 group-hover:shadow-yellow-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="6" fill="#F7DF1E" />
        <path d="M18 32C18 34.5 16.5 35.5 14 35.5C11.5 35.5 10 34 10 32" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        <path d="M29 23C26 23 25 24.5 25 26.5C25 31 31 30.5 31 33.5C31 35 29.5 35.5 27.5 35.5C25 35.5 24 34 24 32" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'flutter',
    name: 'flutter',
    category: 'mobile',
    bgGlow: 'group-hover:border-sky-400 group-hover:shadow-sky-500/20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M26 6L11 21L16 26L36 6H26Z" fill="#42A5F5" />
        <path d="M26 22L17 31L26 40H36L27 31L36 22H26Z" fill="#02569B" />
        <path d="M21.5 35.5L26 40H36L26 30L21.5 35.5Z" fill="#0175C2" />
        <path d="M17 31L21.5 35.5L26 31L21.5 26.5L17 31Z" fill="#29B6F6" />
      </svg>
    ),
  },
];

interface PartnerCoursesExpandedProps {
  onClose: () => void;
}

export const PartnerCoursesExpanded: React.FC<PartnerCoursesExpandedProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -10 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden pt-4 pb-2"
    >
      <div className="rounded-3xl bg-slate-950/95 border-2 border-cyan-500/50 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-4 ring-1 ring-cyan-400/20">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/15 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

        {/* Header bar inside the expanded box */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800/90 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] sm:text-[11px] font-mono-code text-cyan-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>INSTITUTIONAL CURRICULUM & CERTIFIED LAB MODULES</span>
            </div>
            <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight flex items-center gap-2">
              <span>Comprehensive Course Modules</span>
              <span className="text-xs sm:text-sm font-mono-code px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                22 Technologies
              </span>
            </h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Standardized, hands-on, syllabus-aligned modules equipped with certified pedagogies and live project kits.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code"
              title="Close Course Modules"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* 22 Technologies Grid - PERFECT CLEAN ICON WITH NAME UNDERNEATH */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3.5 relative z-10 pt-1">
          {TECH_COURSES.map((item) => (
            <div
              key={item.id}
              className={`group flex flex-col items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800/90 ${item.bgGlow} transition-all duration-200 shadow-md hover:shadow-lg text-center cursor-default min-h-[110px] sm:min-h-[118px]`}
            >
              {/* Perfectly Sized Icon Circle / Square Container */}
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center bg-slate-950/90 border border-slate-800/90 group-hover:scale-110 group-hover:border-cyan-400/50 transition-transform duration-300 shadow-inner p-2 shrink-0">
                {item.icon}
              </div>

              {/* Title Underneath Logo */}
              <span className="font-display font-bold text-xs sm:text-[13px] text-slate-200 group-hover:text-cyan-300 transition-colors leading-tight mt-2 px-1 break-words">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Footer info note */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono-code text-cyan-400/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Turnkey ATL, STEM & Higher-Ed Lab Curricula ready to deploy</span>
          </div>
          <span className="text-slate-400">Includes assessment rubrics, projects & mentor manuals</span>
        </div>
      </div>
    </motion.div>
  );
};
