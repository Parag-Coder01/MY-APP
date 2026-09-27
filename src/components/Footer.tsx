import React from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { KiteLogo } from './KiteLogo';
import { COMPANY_INFO } from '../data/mockData';
import { MainTab, ExtendedView } from '../types';

interface FooterProps {
  onSelectTab: (tab: MainTab) => void;
  onSelectExtendedView: (view: ExtendedView) => void;
  onOpenInstallPrompt?: () => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectExtendedView,
  onOpenInstallPrompt,
  isDark,
}) => {
  return (
    <footer
      className={`border-t transition-colors mt-auto ${
        isDark
          ? 'bg-slate-950 border-slate-850 text-slate-400'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <KiteLogo size={36} showWordmark={true} />
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              KITE ROBOTICS is India’s premier hands-on robotics, embedded systems,
              IoT, and artificial intelligence education & IT engineering ecosystem.
              From Atal Tinkering Labs and collegiate robotics research to turnkey
              enterprise web and software solutions.
            </p>
            {onOpenInstallPrompt && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={onOpenInstallPrompt}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border dark:border-slate-800 dark:bg-slate-900 border-slate-200 bg-slate-100 hover:border-cyan-500 text-xs font-mono-code dark:text-slate-200 text-slate-800 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Install Mobile App</span>
                </button>
              </div>
            )}
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
                  onClick={() => onSelectExtendedView('curriculum')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  K-12 STEM Curriculum
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('school-section')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  School Robotics Lab (ATL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('workshops')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Workshops & Bootcamps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('certificates')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Verify Certificates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('ebooks')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  STEM E-Books & Manuals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hardware & IT Services */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider dark:text-white text-slate-900">
              Hardware & IT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('store')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  STEM & DIY Robotics Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('it-services')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('it-services')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Mobile App Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('it-services')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Custom ERP & LMS Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('kms-ai')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer text-cyan-500 dark:text-cyan-400 font-semibold"
                >
                  KMS-AI Hardware Co-Pilot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('projects')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Open Hardware Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Reach */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider dark:text-white text-slate-900">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectExtendedView('about')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  About KITE Robotics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('careers')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Careers & Instructor Hiring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExtendedView('contact')}
                  className="hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs space-y-1.5">
                <div className="font-mono-code font-bold text-cyan-400">
                  Ready to Build?
                </div>
                <p className="text-[11px] leading-relaxed dark:text-slate-300 text-slate-700">
                  Partner with KITE Robotics to set up state-of-the-art AI & Robotics Labs.
                </p>
                <button
                  onClick={() => onSelectExtendedView('contact')}
                  className="text-cyan-500 dark:text-cyan-400 font-bold hover:underline inline-flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <span>Open Contact & Inquiry Portal →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="mt-12 pt-6 border-t dark:border-slate-900 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} KITE ROBOTICS. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Empowering Innovation with Robotics, AI & IoT</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono-code">
            <a
              href="https://www.kiterobotics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
            >
              <span>www.kiterobotics.in</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
