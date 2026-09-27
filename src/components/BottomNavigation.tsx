import React from 'react';
import { Home, BookOpen, Sparkles, ShoppingBag, User } from 'lucide-react';
import { MainTab } from '../types';

interface BottomNavigationProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  onOpenQuickMenu?: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <div
      style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom, 0.6rem))' }}
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none px-2 sm:px-4 flex justify-center pb-2.5 sm:pb-3"
    >
      {/* Floating Island Navigation Dock - Remains static pinned at screen bottom during all scrolling */}
      <nav
        aria-label="Primary Application Navigation"
        className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full dark:bg-slate-950/90 bg-white/95 backdrop-blur-xl border-2 dark:border-cyan-500/40 border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.5)] dark:shadow-[0_12px_40px_rgba(0,183,215,0.25)] ring-1 ring-white/10 max-w-lg w-full transition-all duration-300"
      >
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 sm:py-1.5 px-1.5 rounded-full transition-all duration-200 cursor-pointer select-none group relative ${
            currentTab === 'home'
              ? 'dark:bg-cyan-500/20 bg-cyan-100/90 dark:text-cyan-400 text-cyan-700 font-bold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Home className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${currentTab === 'home' ? 'scale-110' : 'group-hover:scale-105'}`} />
          <span className="text-[10px] sm:text-[11px] font-mono-code mt-0.5 tracking-tight font-medium">Home</span>
          {currentTab === 'home' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full dark:bg-cyan-400 bg-cyan-600 shadow-sm" />
          )}
        </button>

        {/* 2. Store */}
        <button
          type="button"
          onClick={() => onSelectTab('store')}
          className={`flex-1 flex flex-col items-center justify-center py-1 sm:py-1.5 px-1.5 rounded-full transition-all duration-200 cursor-pointer select-none group relative ${
            currentTab === 'store'
              ? 'dark:bg-amber-500/20 bg-amber-100/90 dark:text-amber-400 text-amber-700 font-bold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShoppingBag className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${currentTab === 'store' ? 'scale-110' : 'group-hover:scale-105'}`} />
          <span className="text-[10px] sm:text-[11px] font-mono-code mt-0.5 tracking-tight font-medium">Store</span>
          {currentTab === 'store' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full dark:bg-amber-400 bg-amber-600 shadow-sm" />
          )}
        </button>

        {/* 3. IN MIDDLE: KMS AI (Center Floating Button) */}
        <div className="relative -top-3.5 sm:-top-4 px-1 shrink-0">
          <button
            type="button"
            onClick={() => onSelectTab('kms-ai')}
            className={`flex flex-col items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-2xl transition-all duration-300 shadow-xl cursor-pointer select-none group ${
              currentTab === 'kms-ai'
                ? 'bg-gradient-to-tr from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/50 ring-4 ring-cyan-400/30 scale-110'
                : 'dark:bg-gradient-to-tr dark:from-slate-900 dark:to-slate-800 bg-gradient-to-tr from-slate-900 to-slate-800 text-cyan-400 border-2 border-cyan-400/60 hover:border-cyan-300 shadow-cyan-500/20 hover:scale-105'
            }`}
            aria-label="Launch KMS-AI Assistant"
            title="KMS-AI Assistant"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-amber-300 dark:text-cyan-200 drop-shadow" />
            <span className="text-[9px] sm:text-[10px] font-mono-code font-black mt-0.5 tracking-tight uppercase">
              KMS AI
            </span>
          </button>
        </div>

        {/* 4. Courses */}
        <button
          type="button"
          onClick={() => onSelectTab('learn')}
          className={`flex-1 flex flex-col items-center justify-center py-1 sm:py-1.5 px-1.5 rounded-full transition-all duration-200 cursor-pointer select-none group relative ${
            currentTab === 'learn'
              ? 'dark:bg-cyan-500/20 bg-cyan-100/90 dark:text-cyan-400 text-cyan-700 font-bold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${currentTab === 'learn' ? 'scale-110' : 'group-hover:scale-105'}`} />
          <span className="text-[10px] sm:text-[11px] font-mono-code mt-0.5 tracking-tight font-medium">Courses</span>
          {currentTab === 'learn' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full dark:bg-cyan-400 bg-cyan-600 shadow-sm" />
          )}
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-1 sm:py-1.5 px-1.5 rounded-full transition-all duration-200 cursor-pointer select-none group relative ${
            currentTab === 'profile'
              ? 'dark:bg-cyan-500/20 bg-cyan-100/90 dark:text-cyan-400 text-cyan-700 font-bold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <User className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${currentTab === 'profile' ? 'scale-110' : 'group-hover:scale-105'}`} />
          <span className="text-[10px] sm:text-[11px] font-mono-code mt-0.5 tracking-tight font-medium">Profile</span>
          {currentTab === 'profile' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full dark:bg-cyan-400 bg-cyan-600 shadow-sm" />
          )}
        </button>
      </nav>
    </div>
  );
};
