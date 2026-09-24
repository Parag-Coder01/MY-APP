import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  CheckCircle2,
  Check,
  ShieldCheck,
  Copy,
  PhoneCall,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export type ITServiceId = 'website' | 'app' | 'lms' | 'erp';

export interface ITServiceItem {
  id: ITServiceId;
  name: string; // "Website", "APP", "LMS", "ERP"
  functionTitle: string; // Core function label
  functionDescription: string; // One concise, compelling explanation of function
  primaryFunctionPill: string;
  badgeLabel: string;
  themeColor: string; // Hex color for glow
  cardGradient: string;
  borderActive: string;
  glowAura: string;
  textAccent: string;
  chipBg: string;
  features: string[];
  icon: React.ReactNode;
}

export const IT_SERVICES: ITServiceItem[] = [
  {
    id: 'website',
    name: 'Website',
    functionTitle: 'Web Portals & Platforms',
    functionDescription: 'Ultra-fast responsive web portals, institutional admissions funnels, lab showcases, and SEO-optimized digital platforms.',
    primaryFunctionPill: 'Core Function: Web & Admissions Portal',
    badgeLabel: 'High-Performance Web',
    themeColor: '#06B6D4',
    cardGradient: 'from-cyan-950/60 via-slate-900 to-slate-950',
    borderActive: 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400/50',
    glowAura: 'from-cyan-500/25 via-sky-500/10 to-transparent',
    textAccent: 'text-cyan-300',
    chipBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
    features: [
      'Sub-second speed with 98+ Google Lighthouse performance scoring',
      'Mobile-first responsive design for phones, tablets & desktops',
      'Online student admissions & enquiry capture via WhatsApp & Email',
      'Integrated Razorpay, UPI & Net Banking fee payment gateway',
    ],
    icon: (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13" fill="none">
        <defs>
          <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="webBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#082F49" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0C1929" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {/* Browser Frame */}
        <rect x="6" y="10" width="52" height="44" rx="8" fill="url(#webBg)" stroke="url(#webGrad)" strokeWidth="2.5" />
        {/* Top Header bar */}
        <path d="M6 21H58" stroke="#0284C7" strokeWidth="1.5" strokeOpacity="0.6" />
        {/* Traffic Light Dots */}
        <circle cx="14" cy="15.5" r="2.4" fill="#EF4444" />
        <circle cx="21" cy="15.5" r="2.4" fill="#F59E0B" />
        <circle cx="28" cy="15.5" r="2.4" fill="#10B981" />
        {/* Search Bar pill */}
        <rect x="35" y="13" width="18" height="5" rx="2.5" fill="#0369A1" fillOpacity="0.4" />
        {/* Glowing Central Globe */}
        <circle cx="32" cy="36" r="11" stroke="url(#webGrad)" strokeWidth="2.4" />
        <ellipse cx="32" cy="36" rx="5" ry="11" stroke="#38BDF8" strokeWidth="1.8" />
        <line x1="21" y1="36" x2="43" y2="36" stroke="#38BDF8" strokeWidth="1.8" />
        {/* Radiant Code Tag Brackets */}
        <path d="M14 32L10 36L14 40" stroke="#22D3EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 32L54 36L50 40" stroke="#22D3EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'app',
    name: 'APP',
    functionTitle: 'iOS & Android Native Mobile Apps',
    functionDescription: 'Cross-platform native mobile applications for student tracking, robotics hardware Bluetooth telemetry, and push alerts.',
    primaryFunctionPill: 'Core Function: Native iOS & Android Apps',
    badgeLabel: 'Mobile & IoT Telemetry',
    themeColor: '#6366F1',
    cardGradient: 'from-indigo-950/60 via-slate-900 to-slate-950',
    borderActive: 'border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.35)] ring-2 ring-indigo-400/50',
    glowAura: 'from-indigo-500/25 via-blue-500/10 to-transparent',
    textAccent: 'text-indigo-300',
    chipBg: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40',
    features: [
      'Single unified codebase compiled directly to Apple iOS & Google Android',
      'Direct Bluetooth (BLE 5.0) & Wi-Fi robotics gamepad control',
      'Real-time push notifications for live classes, notices & homework alerts',
      'Biometric authentication (FaceID / Fingerprint) & encrypted offline cache',
    ],
    icon: (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13" fill="none">
        <defs>
          <linearGradient id="appGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        {/* Smartphone Shell */}
        <rect x="17" y="6" width="30" height="52" rx="8" fill="url(#screenGrad)" stroke="url(#appGrad)" strokeWidth="2.6" />
        {/* Dynamic Island Speaker Notch */}
        <rect x="27" y="10" width="10" height="3" rx="1.5" fill="#A5B4FC" />
        {/* Colorful App Tiles on screen */}
        <rect x="22" y="18" width="8" height="8" rx="2.5" fill="#38BDF8" />
        <rect x="34" y="18" width="8" height="8" rx="2.5" fill="#C084FC" />
        <rect x="22" y="29" width="8" height="8" rx="2.5" fill="#34D399" />
        <rect x="34" y="29" width="8" height="8" rx="2.5" fill="#FB7185" />
        {/* Interactive Gamepad / Telemetry Indicator */}
        <circle cx="30" cy="43" r="3.2" stroke="#818CF8" strokeWidth="1.8" strokeDasharray="3 2" />
        {/* Home Bar */}
        <line x1="26" y1="52" x2="38" y2="52" stroke="#A5B4FC" strokeWidth="2.2" strokeLinecap="round" />
        {/* Signal Ripple Arcs on top right */}
        <path d="M51 11C54 13.5 56 17.5 56 22" stroke="#818CF8" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M48 14C50 16 51 18.5 51 22" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'lms',
    name: 'LMS',
    functionTitle: 'Learning Management System',
    functionDescription: 'Experiential STEM e-learning portal with video modules, in-browser code compilers, auto-graded quizzes, and digital certificates.',
    primaryFunctionPill: 'Core Function: STEM E-Learning & Certification',
    badgeLabel: 'Interactive E-Learning',
    themeColor: '#10B981',
    cardGradient: 'from-emerald-950/60 via-slate-900 to-slate-950',
    borderActive: 'border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/50',
    glowAura: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    textAccent: 'text-emerald-300',
    chipBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
    features: [
      'In-browser interactive Arduino, C++ & Python code compiler sandbox',
      'Tamper-proof verifiable digital certificates with public QR verification',
      'Automated quiz engine with anti-cheat timers and student leaderboards',
      'Modular curriculum video player with adaptive bitrate cloud CDN streaming',
    ],
    icon: (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13" fill="none">
        <defs>
          <linearGradient id="lmsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="lmsBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#064E3B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#022C22" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        {/* Screen Monitor Frame */}
        <rect x="8" y="13" width="48" height="35" rx="7" fill="url(#lmsBg)" stroke="url(#lmsGrad)" strokeWidth="2.5" />
        {/* Monitor Base Stand */}
        <path d="M26 48L24 56H40L38 48" stroke="url(#lmsGrad)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Big Graduation Cap Mortarboard */}
        <path d="M32 19L16 26.5L32 34L48 26.5L32 19Z" fill="url(#lmsGrad)" stroke="#6EE7B7" strokeWidth="1.6" />
        <path d="M22 29.5V36C22 36 26 39.5 32 39.5C38 39.5 42 36 42 36V29.5" stroke="#6EE7B7" strokeWidth="2.2" strokeLinecap="round" />
        {/* Gold Tassel with Bead */}
        <path d="M43 28V35" stroke="url(#goldGrad)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="43" cy="36.5" r="2" fill="url(#goldGrad)" />
      </svg>
    ),
  },
  {
    id: 'erp',
    name: 'ERP',
    functionTitle: 'Enterprise Resource Planning',
    functionDescription: 'Unified campus automation software for ATL hardware inventory barcode tracking, biometric attendance, and fee collection.',
    primaryFunctionPill: 'Core Function: Campus & ATL Lab Automation',
    badgeLabel: 'Campus ERP & Inventory',
    themeColor: '#F59E0B',
    cardGradient: 'from-amber-950/60 via-slate-900 to-slate-950',
    borderActive: 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.35)] ring-2 ring-amber-400/50',
    glowAura: 'from-amber-500/25 via-orange-500/10 to-transparent',
    textAccent: 'text-amber-300',
    chipBg: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
    features: [
      'ATL robotics components barcode tracking, issue logs & stock replenishment',
      'Biometric & RFID device integration for student and staff attendance',
      'Automated multi-installment fee invoicing, UPI receipts & WhatsApp alerts',
      'Multi-tiered role portals for Super Admin, Principal, Lab In-charge & Parents',
    ],
    icon: (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13" fill="none">
        <defs>
          <linearGradient id="erpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="erpBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#451A03" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1C1917" />
          </linearGradient>
        </defs>
        {/* Top Server Rack */}
        <rect x="18" y="10" width="28" height="11" rx="3.5" fill="url(#erpBg)" stroke="url(#erpGrad)" strokeWidth="2.2" />
        <circle cx="24" cy="15.5" r="1.8" fill="#10B981" />
        <circle cx="29" cy="15.5" r="1.8" fill="#38BDF8" />
        <line x1="36" y1="15.5" x2="42" y2="15.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
        {/* Middle Server Rack */}
        <rect x="18" y="26" width="28" height="11" rx="3.5" fill="url(#erpBg)" stroke="url(#erpGrad)" strokeWidth="2.2" />
        <circle cx="24" cy="31.5" r="1.8" fill="#10B981" />
        <circle cx="29" cy="31.5" r="1.8" fill="#F59E0B" />
        <line x1="36" y1="31.5" x2="42" y2="31.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
        {/* Bottom Server Rack */}
        <rect x="18" y="42" width="28" height="11" rx="3.5" fill="url(#erpBg)" stroke="url(#erpGrad)" strokeWidth="2.2" />
        <circle cx="24" cy="47.5" r="1.8" fill="#10B981" />
        <circle cx="29" cy="47.5" r="1.8" fill="#EF4444" />
        <line x1="36" y1="47.5" x2="42" y2="47.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
        {/* Connecting Data Highway Buses */}
        <path d="M18 15.5H11C9.34315 15.5 8 16.8431 8 18.5V44.5C8 46.1569 9.34315 47.5 11 47.5H18" stroke="#F97316" strokeWidth="2.4" />
        <circle cx="8" cy="31.5" r="3.2" fill="#F59E0B" stroke="#7C2D12" strokeWidth="1.4" />
        <path d="M46 15.5H53C54.6569 15.5 56 16.8431 56 18.5V44.5C56 46.1569 54.6569 47.5 53 47.5H46" stroke="#F97316" strokeWidth="2.4" />
        <circle cx="56" cy="31.5" r="3.2" fill="#F59E0B" stroke="#7C2D12" strokeWidth="1.4" />
      </svg>
    ),
  },
];

interface PartnerITServicesExpandedProps {
  onClose: () => void;
  onOpenITServicesView?: () => void;
  onOpenContact?: () => void;
}

export const PartnerITServicesExpanded: React.FC<PartnerITServicesExpandedProps> = ({
  onClose,
  onOpenITServicesView,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<ITServiceId>('website');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const activeService = IT_SERVICES.find((s) => s.id === selectedServiceId) || IT_SERVICES[0];

  const handleCopySpec = (service: ITServiceItem) => {
    const text = `KITE IT Solutions - ${service.name} (${service.functionTitle})\n\nFunction:\n${service.functionDescription}\n\nCore Capabilities:\n${service.features.join(
      '\n'
    )}\n\nInquiries: ${COMPANY_INFO.phone} (${COMPANY_INFO.email})`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -8 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-4 pt-4 border-t border-slate-800/90 overflow-hidden"
    >
      <div className="rounded-3xl dark:bg-slate-950/95 bg-slate-900 border-2 border-cyan-500/50 p-4 sm:p-6 lg:p-7 shadow-2xl relative space-y-5 text-white">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none" />

        {/* 1. Top Header Bar: Clean Title & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950/90 border border-cyan-500/60 text-cyan-400 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/20 shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-tight">
                  IT Services & Engineering Architecture
                </h4>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  Website • APP • LMS • ERP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-200/90 mt-0.5 font-medium">
                Tap on any service below to inspect its core institutional function & capabilities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {onOpenITServicesView && (
              <button
                type="button"
                onClick={onOpenITServicesView}
                className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-mono-code font-semibold transition-all cursor-pointer"
              >
                <span>Full IT Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/90 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer shadow-xs active:scale-90"
              title="Close IT Services"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 2. THE 4 PURE SERVICE CARDS: Website, APP, LMS, ERP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          {IT_SERVICES.map((item) => {
            const isSelected = item.id === selectedServiceId;

            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedServiceId(item.id)}
                className={`group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl transition-all duration-300 text-center cursor-pointer min-h-[160px] sm:min-h-[175px] select-none ${
                  isSelected
                    ? `bg-gradient-to-b ${item.cardGradient} ${item.borderActive}`
                    : 'bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                {/* Active Indicator Pulse Pip */}
                {isSelected && (
                  <span
                    className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ backgroundColor: item.themeColor }}
                  />
                )}
                {isSelected && (
                  <span
                    className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: item.themeColor }}
                  />
                )}

                {/* High-Definition Luminous Logo */}
                <div
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center p-2 shrink-0 transition-transform duration-300 shadow-md ${
                    isSelected
                      ? 'bg-slate-950 border border-white/20 scale-105 shadow-xl'
                      : 'bg-slate-950/90 border border-slate-800 group-hover:border-slate-700 group-hover:scale-105'
                  }`}
                  style={isSelected ? { boxShadow: `0 0 20px ${item.themeColor}33` } : undefined}
                >
                  {item.icon}
                </div>

                {/* Name: Website, APP, LMS, ERP */}
                <span
                  className={`font-display font-black text-base sm:text-lg tracking-tight leading-tight mt-3 transition-colors ${
                    isSelected ? item.textAccent : 'text-white group-hover:text-cyan-200'
                  }`}
                >
                  {item.name}
                </span>

                {/* Clean Function Label */}
                <span className="text-[11px] sm:text-xs font-mono-code text-slate-300 font-medium mt-1 line-clamp-1">
                  {item.functionTitle}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* 3. ULTRA-CLEAN FUNCTION SPOTLIGHT (ONLY THE FUNCTION & CAPABILITIES) */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900 to-slate-950 border-2 border-cyan-500/40 p-4 sm:p-6 shadow-xl relative overflow-hidden space-y-4"
            >
              {/* Dynamic Aura Glow behind active item */}
              <div
                className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br ${activeService.glowAura} blur-[80px] pointer-events-none`}
              />

              {/* Header: Logo + Name + Clean Function Statement */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3.5 border-b border-slate-800 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950 border p-2 flex items-center justify-center shrink-0 shadow-lg"
                    style={{ borderColor: activeService.themeColor, boxShadow: `0 0 20px ${activeService.themeColor}30` }}
                  >
                    {activeService.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                        {activeService.name}
                      </h5>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider ${activeService.chipBg}`}>
                        {activeService.primaryFunctionPill}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-cyan-100 font-sans mt-1 leading-relaxed max-w-2xl">
                      {activeService.functionDescription}
                    </p>
                  </div>
                </div>

                {/* Copy Spec Button */}
                <button
                  type="button"
                  onClick={() => handleCopySpec(activeService)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-400 text-xs font-mono-code font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer active:scale-95 self-start sm:self-auto"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Function Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Function</span>
                    </>
                  )}
                </button>
              </div>

              {/* Core Features: 4 Clean, Beautiful Function Cards */}
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] font-mono-code text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Key Functionalities & Deliverables:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-start gap-2.5 hover:border-cyan-500/40 transition-colors shadow-xs"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: activeService.themeColor }}
                      />
                      <p className="text-xs text-slate-200 leading-snug font-sans">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Line */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10">
                <div className="flex items-center gap-2 text-[11px] font-mono-code text-cyan-300/90">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Turnkey delivery includes cloud server deployment, source code handoff & 1-year maintenance.</span>
                </div>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-700 font-mono-code text-xs font-bold transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Direct Architecture Call</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
