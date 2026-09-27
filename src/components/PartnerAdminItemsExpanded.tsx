import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  PhoneCall,
  Layers,
  Sparkles,
  Check,
  Copy
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export type AdminItemId = 'id-cards' | 'tshirt' | 'merchandise' | 'batches';

export interface AdminItem {
  id: AdminItemId;
  name: string; // Exact user text: "ID Cards", "Tshirt", "Merchandise", "Batches"
  functionTitle: string; // Complete line under the icon (no truncation)
  themeColor: string;
  cardGradient: string;
  borderActive: string;
  textAccent: string;
  glowAura: string;
  iconBg: string;
  icon: React.ReactNode;
}

export const ADMIN_ITEMS: AdminItem[] = [
  {
    id: 'id-cards',
    name: 'ID Cards',
    functionTitle: 'Smart RFID & QR Student Identity Cards',
    themeColor: '#00F0FF',
    cardGradient: 'from-cyan-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-cyan-400 shadow-[0_0_28px_rgba(0,240,255,0.4)] ring-2 ring-cyan-400/50',
    textAccent: 'text-cyan-300',
    glowAura: 'rgba(0, 240, 255, 0.35)',
    iconBg: 'from-cyan-950/90 via-sky-950/70 to-slate-950 border-cyan-500/40 shadow-cyan-500/20',
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
        <defs>
          <linearGradient id="idc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="50%" stopColor="#071A31" />
            <stop offset="100%" stopColor="#030C18" />
          </linearGradient>
          <linearGradient id="idc-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id="idc-lanyard" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="idc-chip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="idc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Woven Lanyard Ribbon at Top */}
        <path d="M22 2L28 11H36L42 2" stroke="url(#idc-lanyard)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="27.5" y="10" width="9" height="3" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.7" />
        <rect x="30" y="13" width="4" height="3.5" rx="0.8" fill="#475569" />
        <circle cx="32" cy="15" r="1" fill="#38BDF8" />

        {/* Main Smart ID Card Outer Frame with Dimensional Bevel */}
        <rect x="13" y="16" width="38" height="45" rx="5" fill="url(#idc-bg)" stroke="url(#idc-border)" strokeWidth="2" />

        {/* Card Header Banner with Official KITE Brand Strip */}
        <path d="M14 17H50V25H14V17Z" fill="#031E38" />
        <line x1="14" y1="25" x2="50" y2="25" stroke="#00F0FF" strokeWidth="0.8" />

        {/* REAL OFFICIAL KITE ROBOTICS LOGO (Split Orange/Green Diamond + Traces) */}
        <g transform="translate(16, 18) scale(0.065)">
          {/* Orange Left Half */}
          <path d="M 50 2 L 6 48 L 50 94 Z" fill="#FF7A00" />
          {/* Green Right Half */}
          <path d="M 50 2 L 94 48 L 50 94 Z" fill="#2EA043" />
          {/* Circuit Traces */}
          <path d="M 44 26 L 44 14 L 35 14" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="33" cy="14" r="3.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <path d="M 56 26 L 56 14 L 65 14" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="67" cy="14" r="3.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        </g>

        {/* KITE ROBOTICS Header Wordmark */}
        <text x="24" y="22" fill="#FFFFFF" fontSize="4" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.4">KITE</text>
        <text x="36" y="22" fill="#38BDF8" fontSize="3.2" fontWeight="700" fontFamily="sans-serif">ROBOTICS</text>

        {/* Student Avatar Photo Box */}
        <rect x="17" y="28" width="12" height="15" rx="2" fill="#0C3456" stroke="#38BDF8" strokeWidth="1.2" />
        <circle cx="23" cy="33" r="2.8" fill="#38BDF8" />
        <path d="M19 41C19 37.8 20.8 36.5 23 36.5C25.2 36.5 27 37.8 27 41" fill="#00F0FF" />

        {/* Real Gold Smart-Card Microchip with Contacts */}
        <rect x="32" y="28" width="14" height="10" rx="1.5" fill="url(#idc-chip)" stroke="#FDE68A" strokeWidth="0.8" />
        <line x1="32" y1="33" x2="46" y2="33" stroke="#78350F" strokeWidth="0.7" />
        <line x1="39" y1="28" x2="39" y2="38" stroke="#78350F" strokeWidth="0.7" />
        <circle cx="39" cy="33" r="1.2" fill="#78350F" />

        {/* Student Credentials Lines */}
        <line x1="32" y1="41" x2="46" y2="41" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="32" y1="44" x2="43" y2="44" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />

        {/* 2D QR Code Matrix */}
        <rect x="17" y="46.5" width="10" height="10" rx="1.2" fill="#021526" stroke="#38BDF8" strokeWidth="1" />
        <rect x="19" y="48.5" width="2" height="2" fill="#00F0FF" />
        <rect x="23" y="48.5" width="2" height="2" fill="#00F0FF" />
        <rect x="19" y="52.5" width="2" height="2" fill="#00F0FF" />
        <rect x="23" y="52.5" width="2" height="2" fill="#FF7A00" />

        {/* RFID Wireless Waves Emblem */}
        <g filter="url(#idc-glow)">
          <path d="M35 50C37.5 48 41.5 48 44 50" stroke="#00F0FF" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M33 53C37 49.5 43 49.5 47 53" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: 'tshirt',
    name: 'Tshirt',
    functionTitle: 'Custom Technical Lab & Club Uniforms',
    themeColor: '#38BDF8',
    cardGradient: 'from-sky-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-sky-400 shadow-[0_0_28px_rgba(56,189,248,0.4)] ring-2 ring-sky-400/50',
    textAccent: 'text-sky-300',
    glowAura: 'rgba(56, 189, 248, 0.35)',
    iconBg: 'from-sky-950/90 via-blue-950/70 to-slate-950 border-sky-500/40 shadow-sky-500/20',
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
        <defs>
          <linearGradient id="tsh-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#080E1A" />
          </linearGradient>
          <linearGradient id="tsh-trim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <filter id="tsh-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Athletic Technical Lab Polo Body */}
        <path
          d="M20 11L9 19L15 28L20 24.5V56C20 57.5 21.5 58.5 23 58.5H41C42.5 58.5 44 57.5 44 56V24.5L49 28L55 19L44 11L37 16.5C34.5 18 29.5 18 27 16.5L20 11Z"
          fill="url(#tsh-body)"
          stroke="url(#tsh-trim)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Technical Collar & Button Placket */}
        <path d="M25 11L32 18L39 11" stroke="#00F0FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 18V28" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="22" r="1.1" fill="#FFFFFF" />
        <circle cx="32" cy="26" r="1.1" fill="#FFFFFF" />

        {/* Contrast Shoulder Racing Stripes */}
        <path d="M12 21L15 19M14 24.5L17 22.5" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M52 21L49 19M50 24.5L47 22.5" stroke="#FF7A00" strokeWidth="1.8" strokeLinecap="round" />

        {/* REAL PROPER KITE ROBOTICS EMBROIDERED CHEST LOGO */}
        <g transform="translate(24, 26) scale(0.08)" filter="url(#tsh-glow)">
          {/* Logo Shield Crest Background */}
          <rect x="-10" y="-10" width="120" height="120" rx="30" fill="#0A2540" stroke="#00F0FF" strokeWidth="6" />
          {/* Real Orange Left Half */}
          <path d="M 50 2 L 6 48 L 50 94 Z" fill="#FF7A00" />
          {/* Real Green Right Half */}
          <path d="M 50 2 L 94 48 L 50 94 Z" fill="#2EA043" />
          {/* Circuit Traces */}
          <path d="M 44 26 L 44 14 L 35 14" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="33" cy="14" r="4.5" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
          <path d="M 56 26 L 56 14 L 65 14" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="67" cy="14" r="4.5" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
        </g>

        {/* Right Sleeve KITE Badge */}
        <circle cx="49" cy="22" r="2.2" fill="#0C4A6E" stroke="#2EA043" strokeWidth="1" />
        <circle cx="49" cy="22" r="1.2" fill="#FF7A00" />

        {/* Side Breathable Mesh Perforations */}
        <circle cx="23" cy="42" r="1" fill="#38BDF8" fillOpacity="0.8" />
        <circle cx="23" cy="46" r="1" fill="#38BDF8" fillOpacity="0.8" />
        <circle cx="23" cy="50" r="1" fill="#38BDF8" fillOpacity="0.8" />
        <circle cx="41" cy="42" r="1" fill="#38BDF8" fillOpacity="0.8" />
        <circle cx="41" cy="46" r="1" fill="#38BDF8" fillOpacity="0.8" />
        <circle cx="41" cy="50" r="1" fill="#38BDF8" fillOpacity="0.8" />

        {/* Double Hemline */}
        <line x1="21" y1="55" x2="43" y2="55" stroke="#00F0FF" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: 'merchandise',
    name: 'Merchandise',
    functionTitle: 'Hardware Kit Bags, Bottles & Journals',
    themeColor: '#F59E0B',
    cardGradient: 'from-amber-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.4)] ring-2 ring-amber-400/50',
    textAccent: 'text-amber-300',
    glowAura: 'rgba(245, 158, 11, 0.35)',
    iconBg: 'from-amber-950/90 via-orange-950/70 to-slate-950 border-amber-500/40 shadow-amber-500/20',
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
        <defs>
          <linearGradient id="merch-bag" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="50%" stopColor="#271103" />
            <stop offset="100%" stopColor="#120600" />
          </linearGradient>
          <linearGradient id="merch-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="merch-flask" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <filter id="merch-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Heavy-Duty Tech Backpack Carrier */}
        <path
          d="M13 21C13 14 17 11 26 11C35 11 39 14 39 21V54C39 56 37.5 57.5 35.5 57.5H16.5C14.5 57.5 13 56 13 54V21Z"
          fill="url(#merch-bag)"
          stroke="url(#merch-gold)"
          strokeWidth="2.2"
        />

        {/* Reinforced Top Handle */}
        <path d="M21 11V6C21 4.5 22.8 4 26 4C29.2 4 31 4.5 31 6V11" stroke="url(#merch-gold)" strokeWidth="2.2" strokeLinecap="round" />

        {/* Front Modular Robotics Hardware Pocket */}
        <rect x="17" y="29" width="18" height="22" rx="3.5" fill="#1C0A00" stroke="#F59E0B" strokeWidth="1.6" />
        <line x1="20" y1="34" x2="32" y2="34" stroke="#FDE68A" strokeWidth="1.6" strokeLinecap="round" />

        {/* PROPER KITE ROBOTICS EMBOSSED LOGO EMBLEM ON POCKET */}
        <g transform="translate(20, 37) scale(0.08)" filter="url(#merch-glow)">
          <circle cx="50" cy="50" r="50" fill="#0F172A" stroke="#F59E0B" strokeWidth="6" />
          {/* Orange Left Half */}
          <path d="M 50 10 L 15 50 L 50 90 Z" fill="#FF7A00" />
          {/* Green Right Half */}
          <path d="M 50 10 L 85 50 L 50 90 Z" fill="#2EA043" />
          {/* White Circuits */}
          <circle cx="36" cy="30" r="4.5" fill="#FFFFFF" />
          <circle cx="64" cy="30" r="4.5" fill="#FFFFFF" />
        </g>

        {/* 2. Insulated Stainless Steel Thermal Flask (Right) */}
        <g filter="url(#merch-glow)">
          <rect x="42" y="23" width="10" height="29" rx="3" fill="url(#merch-flask)" stroke="url(#merch-gold)" strokeWidth="1.8" />
          {/* Flask Cap */}
          <rect x="44" y="17" width="6" height="6" rx="1.5" fill="url(#merch-gold)" stroke="#FDE68A" strokeWidth="0.8" />
          <circle cx="47" cy="20" r="1" fill="#FFFFFF" />
          {/* Glowing Smart Temp Ring */}
          <line x1="42.5" y1="27" x2="51.5" y2="27" stroke="#00F0FF" strokeWidth="1.6" strokeLinecap="round" />
          {/* Laser-Etched KITE Diamond Insignia */}
          <g transform="translate(44, 33) scale(0.035)">
            <path d="M 50 2 L 6 48 L 50 94 Z" fill="#FF7A00" />
            <path d="M 50 2 L 94 48 L 50 94 Z" fill="#2EA043" />
          </g>
        </g>

        {/* 3. Hardbound Engineering Lab Journal (Left) */}
        <rect x="8" y="27" width="4.5" height="24" rx="1.2" fill="#047857" stroke="#34D399" strokeWidth="1.2" />
        <line x1="9.5" y1="31" x2="11.5" y2="31" stroke="#FDE68A" strokeWidth="1" />
        <line x1="9.5" y1="36" x2="11.5" y2="36" stroke="#FDE68A" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'batches',
    name: 'Batches',
    functionTitle: 'Die-Struck Metal Enamel Honor Crests',
    themeColor: '#10B981',
    cardGradient: 'from-emerald-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-emerald-400 shadow-[0_0_28px_rgba(16,185,129,0.4)] ring-2 ring-emerald-400/50',
    textAccent: 'text-emerald-300',
    glowAura: 'rgba(16, 185, 129, 0.35)',
    iconBg: 'from-emerald-950/90 via-teal-950/70 to-slate-950 border-emerald-500/40 shadow-emerald-500/20',
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
        <defs>
          <linearGradient id="btc-gold-rim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="btc-enamel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065F46" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022C22" />
          </linearGradient>
          <linearGradient id="btc-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
          <filter id="btc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ceremonial Draping Ribbon Swallowtails */}
        <path
          d="M23 37L16 58L25 53.5L29 58L27 41"
          fill="url(#btc-ribbon)"
          stroke="#34D399"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M41 37L48 58L39 53.5L35 58L37 41"
          fill="url(#btc-ribbon)"
          stroke="#34D399"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Ribbon Gold Metallic Trim */}
        <line x1="16" y1="57" x2="25" y2="52.5" stroke="#FDE68A" strokeWidth="1.5" />
        <line x1="48" y1="57" x2="39" y2="52.5" stroke="#FDE68A" strokeWidth="1.5" />

        {/* Outer Radiant 3D Gold Starburst Medallion */}
        <circle cx="32" cy="27" r="22" fill="url(#btc-gold-rim)" />
        <circle cx="32" cy="27" r="20" stroke="#FFFBEB" strokeWidth="1.2" strokeDasharray="2.5 2" />

        {/* Deep Jewel-Grade Emerald Hard Enamel Inlay */}
        <circle cx="32" cy="27" r="17.5" fill="url(#btc-enamel)" stroke="#FDE68A" strokeWidth="2" />

        {/* Precision Robotics Gear Teeth Outer Ring */}
        <g stroke="#34D399" strokeWidth="1.4" strokeDasharray="3 2.5">
          <circle cx="32" cy="27" r="13" />
        </g>

        {/* DEAD CENTER: REAL PROPER 3D KITE ROBOTICS EMBLEM */}
        <g transform="translate(24, 18) scale(0.12)" filter="url(#btc-glow)">
          {/* Orange Left Half */}
          <path d="M 50 2 L 6 48 L 50 94 Z" fill="#FF7A00" stroke="#FFFBEB" strokeWidth="2" />
          {/* Green Right Half */}
          <path d="M 50 2 L 94 48 L 50 94 Z" fill="#2EA043" stroke="#FFFBEB" strokeWidth="2" />
          {/* White Circuit Traces */}
          <path d="M 44 26 L 44 14 L 35 14" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="33" cy="14" r="4.5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
          <path d="M 56 26 L 56 14 L 65 14" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="67" cy="14" r="4.5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        </g>

        {/* Diamond Sparkle Glints */}
        <path d="M43 17L44 19.5L46.5 20.5L44 21.5L43 24L42 21.5L39.5 20.5L42 19.5L43 17Z" fill="#FFFFFF" />
        <circle cx="21" cy="33" r="1" fill="#FFFFFF" />
      </svg>
    ),
  },
];

interface PartnerAdminItemsExpandedProps {
  onClose: () => void;
  onOpenContact?: () => void;
}

export const PartnerAdminItemsExpanded: React.FC<PartnerAdminItemsExpandedProps> = ({
  onClose,
  onOpenContact,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<AdminItemId>('id-cards');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const activeItem = ADMIN_ITEMS.find((item) => item.id === selectedItemId) || ADMIN_ITEMS[0];

  const handleCopySpec = (item: AdminItem) => {
    const text = `KITE Robotics Administrative Procurement - ${item.name}\nFunction: ${item.functionTitle}\nInquiries & Bulk Orders: ${COMPANY_INFO.phone} (${COMPANY_INFO.email})`;
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
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

        {/* 1. Header Bar: Title + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950/90 border border-cyan-500/60 text-cyan-400 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/20 shrink-0">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-tight">
                  Administrative Items & Institution Merchandise
                </h4>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  4 Core Items
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-200/90 mt-0.5 font-medium">
                Official institution branding items for student laboratories, clubs & partner campuses.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-mono-code font-semibold transition-all cursor-pointer"
              >
                <span>Bulk Inquiry →</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/90 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer shadow-xs active:scale-90"
              title="Close Administrative Items"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 2. THE 4 ITEMS: Real, Vibrant Proper Logos + Name + Complete Function Line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 relative z-10">
          {ADMIN_ITEMS.map((item) => {
            const isSelected = item.id === selectedItemId;

            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => setSelectedItemId(item.id)}
                className={`group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl transition-all duration-300 text-center cursor-pointer select-none min-h-[190px] sm:min-h-[210px] ${
                  isSelected
                    ? `bg-gradient-to-b ${item.cardGradient} ${item.borderActive} scale-[1.01]`
                    : 'bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 shadow-md'
                }`}
              >
                {/* Active Indicator Pulse Pip */}
                {isSelected && (
                  <span
                    className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ backgroundColor: item.themeColor }}
                  />
                )}
                {isSelected && (
                  <span
                    className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full shadow-md"
                    style={{ backgroundColor: item.themeColor }}
                  />
                )}

                {/* Real Proper Logo Badge Container (Vibrant, Radiant, Multi-Layered Depth) */}
                <div
                  className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center p-2 shrink-0 transition-transform duration-300 bg-gradient-to-br ${item.iconBg} border shadow-lg ${
                    isSelected
                      ? 'scale-105 ring-2 ring-white/30'
                      : 'group-hover:scale-105'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `0 0 30px ${item.glowAura}, inset 0 1px 1px rgba(255,255,255,0.2)`
                      : `0 8px 20px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)`,
                  }}
                >
                  {item.icon}
                </div>

                {/* Name & Complete Function Line (Never Truncated, 100% Fully Visible) */}
                <div className="w-full flex flex-col items-center mt-3">
                  <span
                    className={`font-display font-black text-base sm:text-lg tracking-tight leading-tight transition-colors ${
                      isSelected ? item.textAccent : 'text-white group-hover:text-cyan-200'
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Complete Line Under The Icon (No line-clamp-1, complete wording) */}
                  <span className="text-xs sm:text-[13px] font-mono-code text-slate-300 font-medium mt-1 leading-snug text-center max-w-full block">
                    {item.functionTitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 3. Ultra-Clean Footer Strip: Direct Quick Actions (No Clutter, No Long Information) */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-300/90">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>
              Selected: <strong className="text-white font-bold">{activeItem.name}</strong> — {activeItem.functionTitle}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleCopySpec(activeItem)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono-code font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy Title</span>
                </>
              )}
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono-code text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Bulk Order: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
