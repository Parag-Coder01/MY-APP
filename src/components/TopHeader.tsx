import React from 'react';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  ShoppingCart,
  Search,
  PhoneCall,
  Smartphone,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { KiteLogo } from './KiteLogo';
import { COMPANY_INFO } from '../data/mockData';

interface TopHeaderProps {
  user: UserProfile;
  cartCount: number;
  unreadNotifsCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
  onOpenCart: () => void;
  onOpenNotifs: () => void;
  onOpenRolePicker: () => void;
  onSearchClick: () => void;
  onOpenInstallPrompt?: () => void;
  onOpenAuthModal?: (mode?: 'login' | 'signup') => void;
  onOpenManageProfile?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  cartCount,
  unreadNotifsCount,
  isDark,
  onToggleTheme,
  onOpenMenu,
  onOpenCart,
  onOpenNotifs,
  onOpenRolePicker,
  onSearchClick,
  onOpenInstallPrompt,
  onOpenAuthModal,
  onOpenManageProfile,
}) => {
  const roleBadgeColor: Record<UserRole, { bg: string; text: string; border: string }> = {
    student: { bg: 'bg-cyan-950/60', text: 'text-cyan-400', border: 'border-cyan-800/50' },
    school: { bg: 'bg-amber-950/60', text: 'text-amber-400', border: 'border-amber-800/50' },
    educator: { bg: 'bg-emerald-950/60', text: 'text-emerald-400', border: 'border-emerald-800/50' },
    parent: { bg: 'bg-blue-950/60', text: 'text-blue-400', border: 'border-blue-800/50' },
    customer: { bg: 'bg-pink-950/60', text: 'text-pink-400', border: 'border-pink-800/50' },
    other: { bg: 'bg-slate-900', text: 'text-slate-300', border: 'border-slate-700' },
  };

  const currentBadge = roleBadgeColor[user.role] || roleBadgeColor.student;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-200 ${
        isDark
          ? 'bg-slate-950/90 border-slate-800 text-slate-100'
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Hamburger menu + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'text-slate-200 hover:text-white bg-slate-900/80 border-slate-800 hover:border-cyan-500/50'
                : 'text-slate-700 hover:text-slate-950 bg-slate-100 border-slate-200 hover:border-cyan-500'
            }`}
          >
            <Menu className="w-5 h-5 text-cyan-400" />
          </button>

          {/* Official Brand Logo */}
          <div className="flex items-center gap-2 select-none">
            <KiteLogo size={36} showWordmark={true} />
          </div>
        </div>

        {/* Center: Quick Role Selector Pill / Status (Tablet & Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenRolePicker}
            className={`px-3 py-1 rounded-full text-xs font-mono-code border flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer ${currentBadge.bg} ${currentBadge.text} ${currentBadge.border}`}
            title="Click to switch persona / role"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider">{user.role} Portal</span>
            <span className="opacity-60 text-[10px]">({user.name.split(' ')[0]})</span>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* PWA Install Trigger */}
          {onOpenInstallPrompt && (
            <button
              onClick={onOpenInstallPrompt}
              aria-label="Install Mobile App"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 text-xs font-mono-code font-bold transition-all shadow-sm cursor-pointer"
              title="Install Mobile App on Phone"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">App</span>
            </button>
          )}

          {/* Direct Call Hotline */}
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono-code transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-slate-300'
            }`}
            title="Official Hotline +91 95648 66985"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-500" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search courses, products, and articles"
            className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'text-slate-700 hover:text-slate-950 bg-slate-100 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'text-amber-400 bg-slate-900/60 border-slate-800 hover:border-amber-400/50'
                : 'text-slate-700 bg-slate-100 border-slate-200 hover:border-slate-300'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notifications Bell with Badge */}
          <button
            onClick={onOpenNotifs}
            aria-label="Notifications"
            className={`p-2 rounded-xl border relative transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'text-slate-700 hover:text-slate-950 bg-slate-100 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 flex items-center justify-center animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* Cart Icon with Counter */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className={`p-2 rounded-xl border relative transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'text-slate-700 hover:text-slate-950 bg-slate-100 border-slate-200 hover:border-slate-300'
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-cyan-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Avatar / Profile or Login button */}
          {user.id !== 'guest' ? (
            <button
              onClick={onOpenManageProfile}
              className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-cyan-400/50"
              />
              <span className="hidden xl:inline text-xs font-semibold text-slate-200 max-w-[90px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-mono-code font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
