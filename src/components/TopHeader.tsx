import React from 'react';
import { Bell, ShoppingCart, Search, PhoneCall, Shield, Sparkles, Smartphone, Download } from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { KiteLogo } from './KiteLogo';
import { COMPANY_INFO } from '../data/mockData';

interface TopHeaderProps {
  user: UserProfile;
  cartCount: number;
  unreadNotifsCount: number;
  onOpenCart: () => void;
  onOpenNotifs: () => void;
  onOpenRolePicker: () => void;
  onSearchClick: () => void;
  onOpenInstallPrompt?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  cartCount,
  unreadNotifsCount,
  onOpenCart,
  onOpenNotifs,
  onOpenRolePicker,
  onSearchClick,
  onOpenInstallPrompt,
}) => {
  const roleBadgeColor: Record<UserRole, { bg: string; text: string; border: string }> = {
    student: { bg: 'bg-cyan-950/60', text: 'text-cyan-400', border: 'border-cyan-800/50' },
    school: { bg: 'bg-amber-950/60', text: 'text-amber-400', border: 'border-amber-800/50' },
    educator: { bg: 'bg-emerald-950/60', text: 'text-emerald-400', border: 'border-emerald-800/50' },
    parent: { bg: 'bg-blue-950/60', text: 'text-blue-400', border: 'border-blue-800/50' },
    customer: { bg: 'bg-pink-950/60', text: 'text-pink-400', border: 'border-pink-800/50' },
    other: { bg: 'bg-slate-900', text: 'text-slate-300', border: 'border-slate-700' },
  };

  const badgeStyle = roleBadgeColor[user.role] || roleBadgeColor.student;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Official Kite Logo */}
        <div className="flex items-center gap-2.5">
          <KiteLogo size="sm" />
          {/* Active Role Tag */}
          <button
            onClick={onOpenRolePicker}
            title="Click to switch active role view"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-code uppercase font-semibold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border} hover:opacity-90 transition-opacity`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>{user.role}</span>
          </button>
        </div>

        {/* Right actions: Install App, Search, Call, Notifications, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* In-App Install Trigger */}
          {onOpenInstallPrompt && (
            <button
              onClick={onOpenInstallPrompt}
              aria-label="Install Mobile App"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 text-xs font-mono-code font-bold transition-all shadow-sm"
              title="Install Mobile App on Phone"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">App</span>
            </button>
          )}

          {/* Direct WhatsApp / Call Hotline */}
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
            className="hidden xs:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 text-xs font-mono-code transition-colors"
            title="Official Hotline +91 95648 66985"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{COMPANY_INFO.phone}</span>
          </a>

          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search courses and kits"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifs}
            aria-label="View notifications"
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
            )}
          </button>

          {/* Cart Icon with Counter */}
          <button
            onClick={onOpenCart}
            aria-label="Open shopping cart"
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 flex items-center justify-center font-mono-code shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
