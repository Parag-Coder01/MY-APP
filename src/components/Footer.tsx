import React from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Github,
  Globe,
  Share2,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Heart,
  Terminal,
} from 'lucide-react';
import { KiteLogo } from './KiteLogo';
import { COMPANY_INFO } from '../data/mockData';
import { ExtendedView, MainTab } from '../types';
import { OFFICIAL_GITHUB_URL } from '../utils/shareUtils';

interface FooterProps {
  onSelectTab: (tab: MainTab) => void;
  onSelectExtendedView: (view: ExtendedView) => void;
  onOpenShareModal: () => void;
  onOpenInstallPrompt?: () => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectExtendedView,
  onOpenShareModal,
  onOpenInstallPrompt,
  isDark,
}) => {
  return (
    <footer
      className={`mt-16 border-t transition-colors ${
        isDark
          ? 'bg-slate-950/95 border-slate-800/80 text-slate-400'
          : 'bg-white border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <KiteLogo size="md" themeMode={isDark ? 'dark' : 'light'} />
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              Empowering India’s next generation with hands-on Robotics, Artificial Intelligence, IoT hardware kits, Atal Tinkering Lab innovation programs, and enterprise IT engineering.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 text-xs font-mono-code font-bold transition-all shadow-sm cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Open on Any Device / Share</span>
              </button>

              <a
                href={OFFICIAL_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border dark:border-slate-800 dark:bg-slate-900 border-slate-200 bg-slate-100 hover:border-cyan-500 text-xs font-mono-code dark:text-slate-200 text-slate-800 transition-colors"
                title="View Open Source Code on GitHub"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              {onOpenInstallPrompt && (
                <button
                  onClick={onOpenInstallPrompt}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border dark:border-slate-800 dark:bg-slate-900 border-slate-200 bg-slate-100 hover:border-cyan-500 text-xs font-mono-code dark:text-slate-200 text-slate-800 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Install Mobile App</span>
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Academics & Labs */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider dark:text-white text-slate-900">
              Academics & Labs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('learn')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Robotics Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('store')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  STEM Kits & Parts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('curriculum')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  NEP 2020 Curriculum
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('projects')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  DIY Open Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('ebooks')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Free STEM E-Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('schools')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Atal Tinkering Labs (ATL)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech & Solutions */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider dark:text-white text-slate-900">
              Tech & Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('kms-ai')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  KMS-AI Copilot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('it-services')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  IT Services (Web, App, ERP, LMS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('workshops')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  ROBOZEST Championship
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('careers')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Careers & Internships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('about')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  About KITE Robotics
                </button>
              </li>
              <li>
                <a
                  href={OFFICIAL_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cyan-500 transition-colors"
                >
                  <span>Open Source Firmware</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Headquarters */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider dark:text-white text-slate-900">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-cyan-500 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span className="font-mono-code">{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-cyan-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="font-mono-code">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Sector V, Salt Lake, Kolkata, West Bengal 700091, India
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectExtendedView('contact')}
                  className="text-xs font-semibold text-cyan-500 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Contact & Inquiry Portal →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright and public access verification */}
        <div className="mt-12 pt-6 border-t dark:border-slate-900 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} KITE ROBOTICS. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Empowering Innovation with Robotics, AI & IoT</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-code">
            <button
              onClick={onOpenShareModal}
              className="text-cyan-500 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Universal Mobile Access Link</span>
            </button>
            <a
              href={OFFICIAL_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
