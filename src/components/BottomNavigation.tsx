import React from 'react';
import { Home, BookOpen, ShoppingBag, Sparkles, User, Layers } from 'lucide-react';
import { MainTab } from '../types';

interface BottomNavigationProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  onOpenQuickMenu: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickMenu,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* 1. Home Tab */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'home'
              ? 'text-cyan-400 font-semibold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </button>

        {/* 2. Learn Tab */}
        <button
          onClick={() => onSelectTab('learn')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'learn'
              ? 'text-cyan-400 font-semibold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Learn</span>
        </button>

        {/* 3. KMS-AI Central Emphasized Tab */}
        <div className="relative -top-3">
          <button
            onClick={() => onSelectTab('kms-ai')}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 shadow-xl ${
              currentTab === 'kms-ai'
                ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/40 ring-4 ring-cyan-400/20 scale-110'
                : 'bg-gradient-to-tr from-slate-900 to-slate-800 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 shadow-slate-950/80 hover:scale-105'
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
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'store'
              ? 'text-cyan-400 font-semibold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Store</span>
        </button>

        {/* 5. Profile Tab */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            currentTab === 'profile'
              ? 'text-cyan-400 font-semibold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
