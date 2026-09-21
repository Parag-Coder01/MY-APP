import React from 'react';
import { Home, BookOpen, ShoppingBag, Sparkles, User } from 'lucide-react';
import { MainTab } from '../types';

interface BottomNavigationProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  onOpenQuickMenu: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <nav
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0.5rem))' }}
      className="fixed bottom-0 left-0 right-0 z-40 dark:bg-slate-950/95 bg-white/95 backdrop-blur-lg border-t dark:border-slate-800/80 border-slate-200/80 px-2 pt-1.5 transition-all shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* 1. Home Tab */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'home'
              ? 'dark:text-cyan-400 text-cyan-600 font-semibold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
          {currentTab === 'home' && (
            <span className="w-1 h-1 rounded-full dark:bg-cyan-400 bg-cyan-600 mt-0.5" />
          )}
        </button>

        {/* 2. Learn Tab */}
        <button
          onClick={() => onSelectTab('learn')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'learn'
              ? 'dark:text-cyan-400 text-cyan-600 font-semibold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Learn</span>
          {currentTab === 'learn' && (
            <span className="w-1 h-1 rounded-full dark:bg-cyan-400 bg-cyan-600 mt-0.5" />
          )}
        </button>

        {/* 3. KMS-AI Central Emphasized Tab */}
        <div className="relative -top-3">
          <button
            onClick={() => onSelectTab('kms-ai')}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 shadow-xl cursor-pointer ${
              currentTab === 'kms-ai'
                ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/40 ring-4 ring-cyan-400/20 scale-110'
                : 'dark:bg-gradient-to-tr dark:from-slate-900 dark:to-slate-800 bg-gradient-to-tr from-slate-900 to-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 shadow-slate-950/80 hover:scale-105'
            }`}
            aria-label="Launch KMS-AI Assistant"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="text-[9px] font-mono-code font-bold mt-0.5 tracking-tighter">
              KMS-AI
            </span>
          </button>
        </div>

        {/* 4. Store Tab */}
        <button
          onClick={() => onSelectTab('store')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'store'
              ? 'dark:text-cyan-400 text-cyan-600 font-semibold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Store</span>
          {currentTab === 'store' && (
            <span className="w-1 h-1 rounded-full dark:bg-cyan-400 bg-cyan-600 mt-0.5" />
          )}
        </button>

        {/* 5. Profile Tab */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'profile'
              ? 'dark:text-cyan-400 text-cyan-600 font-semibold scale-105'
              : 'dark:text-slate-400 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Profile</span>
          {currentTab === 'profile' && (
            <span className="w-1 h-1 rounded-full dark:bg-cyan-400 bg-cyan-600 mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};

