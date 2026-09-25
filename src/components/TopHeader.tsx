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
  Share2,
  Github,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { KiteLogo } from './KiteLogo';
import { COMPANY_INFO } from '../data/mockData';
import { OFFICIAL_GITHUB_URL } from '../utils/shareUtils';

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
  onOpenShareModal?: () => void;
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
  onOpenShareModal,
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

  const badgeStyle = roleBadgeColor[user.role] || roleBadgeColor.student;

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md px-3 sm:px-4 py-2.5 transition-all border-b ${
        isDark
          ? 'bg-slate-950/90 border-slate-800/80 text-slate-100'
          : 'bg-white/95 border-slate-200 shadow-sm text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
        {/* LEFT: Three bars (hamburger menu) section JUST BESIDE the Official Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* THREE BARS (HAMBURGER) BUTTON */}
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            title="Open Navigation Menu"
            className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-95 flex items-center justify-center shrink-0 ${
              isDark
                ? 'text-slate-300 hover:text-white bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850'
                : 'text-slate-700 hover:text-slate-950 bg-slate-100 border-slate-200 hover:border-cyan-500 hover:bg-slate-200'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Official Kite Robotics Logo */}
          <div className="cursor-pointer shrink-0">
            <KiteLogo
              size="sm"
              themeMode={isDark ? 'dark' : 'light'}
            />
          </div>

          {/* Active Role Tag */}
          <button
            onClick={onOpenRolePicker}
            title="Click to switch active role view"
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-code uppercase font-semibold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border} hover:opacity-90 transition-opacity`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>{user.role}</span>
          </button>
        </div>

        {/* RIGHT: Actions with Dark/Light Mode feature at the right corner */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* In-App Mobile Install Trigger */}
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

          {/* Universal Share / Open on Phone Button */}
          {onOpenShareModal && (
            <button
              onClick={onOpenShareModal}
              aria-label="Open on Any Mobile / Share App"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-mono-code font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
              title="Open App on Phone / Share Universal Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          )}

          {/* Official GitHub Repo Trigger */}
          <a
            href={OFFICIAL_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub Repository"
            title="Open KITE Robotics GitHub Repository"
            className={`p-2 rounded-xl border transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
              isDark
                ? 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'text-slate-700 hover:text-slate-950 bg-slate-100 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Github className="w-4 h-4 text-cyan-400" />
          </a>

          {/* Direct WhatsApp / Call Hotline */}
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
            aria-label="Search courses and kits"
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white bg-slate-900/60 border-transparent hover:border-slate-800 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50 border-transparent hover:border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifs}
            aria-label="View notifications"
            className={`relative p-2 rounded-xl border transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white bg-slate-900/60 border-transparent hover:border-slate-800 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50 border-transparent hover:border-slate-200 hover:bg-slate-100'
            }`}
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
            className={`relative p-2 rounded-xl border transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white bg-slate-900/60 border-transparent hover:border-slate-800 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50 border-transparent hover:border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 flex items-center justify-center font-mono-code shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Login Avatar Trigger */}
          {user.id !== 'guest' ? (
            <button
              onClick={onOpenManageProfile || onOpenRolePicker}
              title={`Logged in as ${user.name} (${user.role}). Click to manage profile.`}
              className={`p-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-700 hover:border-cyan-500'
                  : 'bg-slate-100 border-slate-300 hover:border-cyan-500'
              }`}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-lg object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
              )}
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            </button>
          ) : (
            onOpenAuthModal && (
              <button
                onClick={() => onOpenAuthModal('login')}
                className="px-2.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono-code transition-all shadow-sm flex items-center gap-1 cursor-pointer"
              >
                <span>Sign In</span>
              </button>
            )
          )}

          {/* RIGHT CORNER: DARK AND LIGHT MODE UPGRADE FEATURE */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-xl border transition-all active:scale-95 shadow-sm flex items-center justify-center ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800 hover:border-amber-400/50'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 hover:border-slate-400'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
