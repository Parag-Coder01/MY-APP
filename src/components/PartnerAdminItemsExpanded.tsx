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
            <stop offset="0%" stopColor="#0E3B66" />
            <stop offset="50%" stopColor="#072340" />
            <stop offset="100%" stopColor="#031221" />
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
          <linearGradient id="idc-glass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="idc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Woven Lanyard Ribbon at Top */}
        <path d="M23 2L28 12H36L41 2" stroke="url(#idc-lanyard)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Metallic Clip Fastener */}
        <rect x="28" y="11" width="8" height="3.5" rx="1.2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
        <rect x="30" y="14" width="4" height="4" rx="1" fill="#64748B" />
        <circle cx="32" cy="16" r="1" fill="#38BDF8" />

        {/* Main Smart ID Card Outer Frame with Dimensional Bevel */}
        <rect x="13" y="17" width="38" height="44" rx="5" fill="url(#idc-bg)" stroke="url(#idc-border)" strokeWidth="2.2" />

        {/* Top Header Strip with Holographic Insignia */}
        <path d="M14 18H50V25.5H14V18Z" fill="#0284C7" fillOpacity="0.85" />
        <rect x="14" y="25" width="36" height="1" fill="#38BDF8" />
        {/* Holographic Security Shield */}
        <circle cx="19" cy="21.8" r="2.4" fill="#00F0FF" />
        <path d="M19 20L20.2 21.2L19.8 23L19 22.3L18.2 23L17.8 21.2Z" fill="#031221" />
        <line x1="24" y1="21.8" x2="46" y2="21.8" stroke="#E0F2FE" strokeWidth="1.8" strokeLinecap="round" />

        {/* High-Definition Student Photo Card Frame */}
        <rect x="18" y="29" width="12" height="15" rx="2.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.4" />
        {/* Student Avatar Silhouette */}
        <circle cx="24" cy="33.5" r="2.8" fill="#38BDF8" />
        <path d="M20 42C20 38.8 21.8 37.2 24 37.2C26.2 37.2 28 38.8 28 42" fill="#22D3EE" />

        {/* Gold Smart-Card Microchip Pad */}
        <rect x="33" y="29" width="13" height="9" rx="1.8" fill="url(#idc-chip)" stroke="#FDE68A" strokeWidth="0.8" />
        <line x1="33" y1="33.5" x2="46" y2="33.5" stroke="#92400E" strokeWidth="0.8" />
        <line x1="39.5" y1="29" x2="39.5" y2="38" stroke="#92400E" strokeWidth="0.8" />

        {/* Name & Credentials Lines */}
        <line x1="33" y1="41" x2="47" y2="41" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="33" y1="44.5" x2="43" y2="44.5" stroke="#93C5FD" strokeWidth="1.4" strokeLinecap="round" />

        {/* 2D QR Code Matrix Emblem */}
        <rect x="18" y="47.5" width="9" height="9" rx="1.5" fill="#082F49" stroke="#38BDF8" strokeWidth="1" />
        <rect x="20" y="49.5" width="2" height="2" fill="#00F0FF" />
        <rect x="23" y="49.5" width="2" height="2" fill="#00F0FF" />
        <rect x="20" y="52.5" width="2" height="2" fill="#00F0FF" />
        <rect x="23.5" y="53" width="1.5" height="1.5" fill="#FFFFFF" />

        {/* Radiating High-Tech NFC Wireless Waves */}
        <g filter="url(#idc-glow)">
          <path d="M34 52C36 49.5 39 49.5 41 52" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M32 55C35.5 51.5 41.5 51.5 45 55" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Diagonal Glass Sheen Reflection */}
        <path d="M14 18L38 18L14 46Z" fill="url(#idc-glass)" />
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
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#0F284E" />
            <stop offset="100%" stopColor="#081A33" />
          </linearGradient>
          <linearGradient id="tsh-trim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="tsh-crest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="tsh-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="tsh-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Dynamic Athletic Jersey Body */}
        <path
          d="M20 12L9 20L15 29L20 25.5V56C20 57.5 21.5 58.5 23 58.5H41C42.5 58.5 44 57.5 44 56V25.5L49 29L55 20L44 12L37 17.5C34.5 19 29.5 19 27 17.5L20 12Z"
          fill="url(#tsh-body)"
          stroke="url(#tsh-trim)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Contrast Sports Collar & Placket */}
        <path d="M25 12L32 19L39 12" stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 19V28" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="23" r="1.1" fill="#FFFFFF" />

        {/* High-Voltage Sleeve Racing Bands */}
        <path d="M11 23L15 20M13.5 26.5L17.5 23.5" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M53 23L49 20M50.5 26.5L46.5 23.5" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />

        {/* Athletic Raglan Shoulder Seams */}
        <path d="M20 12L28 22" stroke="#38BDF8" strokeWidth="1.4" strokeDasharray="3 2" />
        <path d="M44 12L36 22" stroke="#38BDF8" strokeWidth="1.4" strokeDasharray="3 2" />

        {/* Chest Team Swish / Aero Arc Stripe */}
        <path d="M22 34C28 31 36 31 42 34" stroke="url(#tsh-trim)" strokeWidth="2" strokeLinecap="round" />

        {/* Official Robotics Lab Shield Crest Badge */}
        <g filter="url(#tsh-glow)">
          <path d="M26 23L30 25.5V30.5L26 33L22 30.5V25.5L26 23Z" fill="#0C4A6E" stroke="#00F0FF" strokeWidth="1.4" />
          {/* Inner Golden Lightning / Gear Star */}
          <circle cx="26" cy="28" r="2.2" fill="url(#tsh-crest)" />
          <path d="M26 25.5L26.8 27.5H28.5L27 28.5L27.6 30.5L26 29.5L24.4 30.5L25 28.5L23.5 27.5H25.2L26 25.5Z" fill="#FFFFFF" />
        </g>

        {/* Tech Side Ventilation Perforations */}
        <circle cx="23" cy="42" r="1" fill="#38BDF8" fillOpacity="0.7" />
        <circle cx="23" cy="46" r="1" fill="#38BDF8" fillOpacity="0.7" />
        <circle cx="23" cy="50" r="1" fill="#38BDF8" fillOpacity="0.7" />
        <circle cx="41" cy="42" r="1" fill="#38BDF8" fillOpacity="0.7" />
        <circle cx="41" cy="46" r="1" fill="#38BDF8" fillOpacity="0.7" />
        <circle cx="41" cy="50" r="1" fill="#38BDF8" fillOpacity="0.7" />

        {/* Double-Stitched Bottom Hemline */}
        <line x1="20" y1="54" x2="44" y2="54" stroke="#0284C7" strokeWidth="1.8" />
        <line x1="20" y1="56" x2="44" y2="56" stroke="#00F0FF" strokeWidth="1" />

        {/* Glossy Fabric Light Reflection */}
        <path d="M22 14L32 19L27 38L22 34Z" fill="url(#tsh-sheen)" />
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
            <stop offset="50%" stopColor="#291102" />
            <stop offset="100%" stopColor="#140700" />
          </linearGradient>
          <linearGradient id="merch-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="merch-flask" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <filter id="merch-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Heavy-Duty Tech Backpack / Hardware Kit Carrier */}
        <path
          d="M13 22C13 14 17 11 26 11C35 11 39 14 39 22V54C39 56 37.5 57.5 35.5 57.5H16.5C14.5 57.5 13 56 13 54V22Z"
          fill="url(#merch-bag)"
          stroke="url(#merch-gold)"
          strokeWidth="2.2"
        />

        {/* Reinforced Top Carrying Handle */}
        <path d="M21 11V6C21 4.5 22.8 4 26 4C29.2 4 31 4.5 31 6V11" stroke="url(#merch-gold)" strokeWidth="2.4" strokeLinecap="round" />

        {/* Top Zip Canopy */}
        <path d="M14 20C17 17 35 17 38 20" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />

        {/* Front Modular Robotics Hardware Pocket */}
        <rect x="17" y="30" width="18" height="21" rx="3.5" fill="#1C0A00" stroke="#F59E0B" strokeWidth="1.6" />
        {/* Cyber Neon Zipper */}
        <line x1="20" y1="35" x2="32" y2="35" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="24.5" y="33.5" width="3" height="3" rx="0.8" fill="#F59E0B" />

        {/* Institutional Robotics Crest on Pocket */}
        <circle cx="26" cy="43" r="3.6" fill="#78350F" stroke="#FDE68A" strokeWidth="1.2" />
        <path d="M26 40.5L27 42.5H29L27.5 43.5L28 45.5L26 44.5L24 45.5L24.5 43.5L23 42.5H25L26 40.5Z" fill="#FDE68A" />

        {/* 2. Insulated Stainless Steel Thermal Flask (Right Side) */}
        <g filter="url(#merch-glow)">
          {/* Flask Body */}
          <rect x="42" y="24" width="10" height="28" rx="3" fill="url(#merch-flask)" stroke="url(#merch-gold)" strokeWidth="1.8" />
          {/* Chrome Thermal Cap */}
          <rect x="44" y="18" width="6" height="6" rx="1.5" fill="url(#merch-gold)" stroke="#FDE68A" strokeWidth="1" />
          <circle cx="47" cy="21" r="1" fill="#FFFFFF" />
          {/* Glowing Smart Temperature Ring */}
          <line x1="42.5" y1="28" x2="51.5" y2="28" stroke="#00F0FF" strokeWidth="1.6" strokeLinecap="round" />
          {/* Laser-Etched Insignia Rings */}
          <circle cx="47" cy="38" r="2.2" stroke="#FDE68A" strokeWidth="1" />
          <line x1="45" y1="45" x2="49" y2="45" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 3. Hardbound Engineering Lab Journal Spine at Left */}
        <rect x="8" y="27" width="4.5" height="24" rx="1.2" fill="#047857" stroke="#34D399" strokeWidth="1.2" />
        <line x1="9.5" y1="32" x2="11.5" y2="32" stroke="#FDE68A" strokeWidth="1" />
        <line x1="9.5" y1="37" x2="11.5" y2="37" stroke="#FDE68A" strokeWidth="1" />
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
            <feGaussianBlur stdDeviation="2" result="blur" />
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

        {/* Gold Ribbon Fringes */}
        <line x1="16" y1="57" x2="25" y2="52.5" stroke="#FDE68A" strokeWidth="1.5" />
        <line x1="48" y1="57" x2="39" y2="52.5" stroke="#FDE68A" strokeWidth="1.5" />

        {/* Outer Radiant 3D Gold Starburst Medallion */}
        <circle cx="32" cy="27" r="22" fill="url(#btc-gold-rim)" />
        {/* Coin-Edged Ridged Teeth on Perimeter */}
        <circle cx="32" cy="27" r="20" stroke="#FFFBEB" strokeWidth="1.2" strokeDasharray="2 2" />

        {/* Deep Jewel-Grade Emerald Hard Enamel Inlay */}
        <circle cx="32" cy="27" r="17.5" fill="url(#btc-enamel)" stroke="#FDE68A" strokeWidth="2" />

        {/* Precision Robotics Gear Teeth Outer Ring */}
        <g stroke="#34D399" strokeWidth="1.4" strokeDasharray="3 2.5">
          <circle cx="32" cy="27" r="13" />
        </g>

        {/* Center High-Relief Die-Struck Golden Star Emblem */}
        <g filter="url(#btc-glow)">
          <path
            d="M32 15L34.8 22.8H43L36.4 27.6L38.9 35.5L32 30.8L25.1 35.5L27.6 27.6L21 22.8H29.2L32 15Z"
            fill="url(#btc-gold-rim)"
            stroke="#FFFBEB"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Precision Robotics Core Hub */}
          <circle cx="32" cy="27" r="3.8" fill="#065F46" stroke="#FDE68A" strokeWidth="1.2" />
          <circle cx="32" cy="27" r="1.8" fill="#FFFBEB" />
        </g>

        {/* Shimmering Diamond Sparkle Glints */}
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
