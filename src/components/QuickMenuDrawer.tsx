import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, School, FolderGit2, Award, Info, PhoneCall, LayoutDashboard, ChevronRight, ExternalLink, Smartphone, Download } from 'lucide-react';
import { ExtendedView } from '../types';
import { KiteLogo } from './KiteLogo';
import { COMPANY_INFO } from '../data/mockData';

interface QuickMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExtendedView: (view: ExtendedView) => void;
  onOpenInstallPrompt?: () => void;
}

export const QuickMenuDrawer: React.FC<QuickMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectExtendedView,
  onOpenInstallPrompt,
}) => {
  if (!isOpen) return null;

  const menuItems: Array<{
    id: ExtendedView;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'workshops',
      title: 'Workshops & Events',
      subtitle: 'ROBOZEST 2026 & weekend hands-on bootcamps',
      icon: <Calendar className="w-5 h-5 text-amber-400" />,
      badge: 'ROBOZEST',
    },
    {
      id: 'schools',
      title: 'Schools & Institutions',
      subtitle: 'Atal Tinkering Labs, robotics curriculum & setup',
      icon: <School className="w-5 h-5 text-cyan-400" />,
      badge: 'ATL Setup',
    },
    {
      id: 'projects',
      title: 'Robotics Projects',
      subtitle: 'Curated schematics, code & hardware guides',
      icon: <FolderGit2 className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'about',
      title: 'About KITE ROBOTICS',
      subtitle: 'Mission, vision, mentors & national hubs',
      icon: <Info className="w-5 h-5 text-blue-400" />,
    },
    {
      id: 'contact',
      title: 'Contact & Support',
      subtitle: `${COMPANY_INFO.phone} • ${COMPANY_INFO.email}`,
      icon: <PhoneCall className="w-5 h-5 text-pink-400" />,
    },
    {
      id: 'admin',
      title: 'Admin Architecture',
      subtitle: 'Backend management preview & logs',
      icon: <LayoutDashboard className="w-5 h-5 text-purple-400" />,
      badge: 'Architecture',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <KiteLogo size="sm" />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Mobile App Install Card */}
          {onOpenInstallPrompt && (
            <button
              onClick={() => {
                onClose();
                onOpenInstallPrompt();
              }}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-between text-left transition-all group mb-3 shadow-lg shadow-cyan-950/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 flex items-center gap-2">
                    <span>Install Mobile App</span>
                    <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950">
                      PWA
                    </span>
                  </div>
                  <div className="text-xs text-cyan-200/80 mt-0.5">Add to Home Screen / Android & iOS</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
            </button>
          )}

          <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 px-3 py-1">
            Explore Ecosystem
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectExtendedView(item.id);
                onClose();
              }}
              className="w-full p-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-slate-700">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.subtitle}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 shrink-0" />
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-between font-mono-code text-[11px]">
            <span>Official Portal</span>
            <a
              href="https://www.kiterobotics.in"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>kiterobotics.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="text-[11px] text-slate-400">
            Tech Hubs in Kolkata, Mumbai, Chennai, Hyderabad & Bihar.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
