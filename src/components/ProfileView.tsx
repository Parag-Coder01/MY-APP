import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, BookOpen, FolderGit2, Award, ShoppingBag, Bookmark, Settings, HelpCircle, LogOut, ChevronRight, Edit3, Shield, School, Flame, Smartphone, Download } from 'lucide-react';
import { UserProfile, UserRole, Course, ExtendedView } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  courses: Course[];
  ordersCount: number;
  onOpenRolePicker: () => void;
  onOpenLoginModal: () => void;
  onOpenCertificates: () => void;
  onOpenStudentDashboard: () => void;
  onOpenQuickMenu: () => void;
  onSelectExtendedView: (view: ExtendedView) => void;
  onOpenInstallPrompt?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  courses,
  ordersCount,
  onOpenRolePicker,
  onOpenLoginModal,
  onOpenCertificates,
  onOpenStudentDashboard,
  onOpenQuickMenu,
  onSelectExtendedView,
  onOpenInstallPrompt,
}) => {
  const [profileTab, setProfileTab] = useState<'overview' | 'courses' | 'orders' | 'settings'>('overview');

  const enrolled = courses.filter((c) => (c.progress || 0) > 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-slate-950 font-display font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              {user.name.charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-xl text-white">
                {user.name}
              </h2>
              <button
                onClick={onOpenRolePicker}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800 hover:opacity-80"
                title="Change active role view"
              >
                {user.role}
              </button>
            </div>
            <p className="text-xs text-slate-400 font-mono-code mt-0.5">
              {user.email} • {user.phone || '+91 95648 66985'}
            </p>
            <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
              <School className="w-3.5 h-3.5 text-cyan-400" />
              <span>{user.institution || 'Delhi STEM Hub / KITE Robotics'}</span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col gap-2">
          <button
            onClick={onOpenLoginModal}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Switch Account</span>
          </button>
          <button
            onClick={onOpenStudentDashboard}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 text-xs font-bold transition-all"
          >
            Innovation Dossier
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-mono-code">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'courses', label: `My Courses (${enrolled.length})` },
          { id: 'orders', label: `Hardware Orders (${ordersCount})` },
          { id: 'settings', label: 'Settings & Role' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setProfileTab(t.id as any)}
            className={`py-3 px-3.5 border-b-2 font-semibold transition-all ${
              profileTab === t.id
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab Content */}
      {profileTab === 'overview' && (
        <div className="space-y-4">
          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {onOpenInstallPrompt && (
              <button
                onClick={onOpenInstallPrompt}
                className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-between transition-all group text-left sm:col-span-2 shadow-lg shadow-cyan-950/40"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <span>Install KITE Robotics Mobile App</span>
                      <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950">
                        OFFICIAL PWA
                      </span>
                    </div>
                    <div className="text-xs text-cyan-200/80 mt-0.5">
                      Add to your iPhone or Android Home Screen for fast, standalone offline access
                    </div>
                  </div>
                </div>
                <Download className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
              </button>
            )}

            <button
              onClick={onOpenCertificates}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    My Certificates
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">3 Verifiable credentials ready</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => onSelectExtendedView('projects')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    Saved Projects & Schematics
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Open robotics guides</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => onSelectExtendedView('workshops')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    My Workshops & ROBOZEST
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Event passes & registrations</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>

            <button
              onClick={() => onSelectExtendedView('contact')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    Help & Mentor Support
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Direct technical hotline</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>
          </div>

          {/* Role Personalization Info Banner */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code uppercase text-cyan-400 font-bold">
                Current Role Profile: {user.role.toUpperCase()}
              </span>
              <button
                onClick={onOpenRolePicker}
                className="text-xs text-cyan-400 hover:underline font-mono-code"
              >
                Change Role
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are currently viewing KITE Robotics in <strong>{user.role}</strong> mode. This configures tailored quick actions, lab kits recommendations, and institutional portals for your workflow.
            </p>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {profileTab === 'courses' && (
        <div className="space-y-3">
          {enrolled.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img src={c.image} alt={c.title} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h4 className="font-display font-semibold text-sm text-white">{c.title}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">Progress: {c.progress}% completed</div>
                  <div className="w-36 h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenStudentDashboard}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold font-mono-code"
              >
                Open Lab
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Orders Tab */}
      {profileTab === 'orders' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-code">
            <span className="text-slate-400">Order #KR-2026-8942</span>
            <span className="text-emerald-400 font-bold">Delivered</span>
          </div>
          <div className="font-display font-bold text-sm text-white">
            KITE Autonomous Robotics Rover Kit (V2)
          </div>
          <p className="text-xs text-slate-400">
            Shipped to {user.institution || 'Delhi STEM Complex'}. All sensor tests passed.
          </p>
        </div>
      )}

      {/* Settings Tab */}
      {profileTab === 'settings' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h4 className="font-display font-bold text-sm text-white">App Preferences & Security</h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-white font-medium">Hardware Telemetry & Logs</div>
                <div className="text-slate-400 text-[11px]">Save sensor test histories in KMS-AI</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-cyan-400" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-white font-medium">ROBOZEST Zonal Notifications</div>
                <div className="text-slate-400 text-[11px]">Get live SMS and alerts for regional qualifiers</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-cyan-400" />
            </div>
          </div>

          <button
            onClick={onOpenLoginModal}
            className="w-full py-2.5 rounded-xl border border-rose-800/60 bg-rose-950/20 text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-rose-900/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Active Session</span>
          </button>
        </div>
      )}
    </div>
  );
};
