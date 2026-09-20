import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, LayoutDashboard, Users, BookOpen, ShoppingBag, Calendar, Award, MessageSquare, Sparkles, Database, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'hardware' | 'ai'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-slate-100"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-white flex items-center gap-2">
                <span>KITE ROBOTICS • Command Center & Operations</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Production Sync
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono-code">
                Full-Stack Architecture & Telemetry Dashboard
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 text-xs font-mono-code">
          {[
            { id: 'overview', label: 'Ecosystem Metrics' },
            { id: 'leads', label: 'School & ATL Enquiries' },
            { id: 'hardware', label: 'Hardware Inventory & Orders' },
            { id: 'ai', label: 'KMS-AI Runtime & Gemini 2.5' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono-code">Students Mentored</div>
                  <div className="text-2xl font-bold font-mono-code text-cyan-400 mt-1">25,400+</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">↑ 18% this quarter</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono-code">Partner Schools</div>
                  <div className="text-2xl font-bold font-mono-code text-amber-400 mt-1">120+</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Pan-India Network</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono-code">ATL Labs Setup</div>
                  <div className="text-2xl font-bold font-mono-code text-emerald-400 mt-1">45+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">NITI Aayog Compliant</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono-code">Hardware Kits Dispatched</div>
                  <div className="text-2xl font-bold font-mono-code text-purple-400 mt-1">8,920</div>
                  <div className="text-[10px] text-cyan-400 mt-0.5">Zero component faults</div>
                </div>
              </div>

              {/* Architecture Map */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono-code text-xs">
                <div className="text-cyan-400 font-bold uppercase">System Topology</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold mb-1">Frontend Client</div>
                    <div className="text-slate-400">React 18 + Vite SPA</div>
                    <div className="text-slate-400">Tailwind Mobile-First UX</div>
                    <div className="text-emerald-400 mt-1">● Optimal 60FPS</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold mb-1">Backend Server</div>
                    <div className="text-slate-400">Node / Express API</div>
                    <div className="text-slate-400">Server-Side Enquiries API</div>
                    <div className="text-emerald-400 mt-1">● Port 3000 Bound</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold mb-1">AI Intelligence</div>
                    <div className="text-slate-400">Gemini 2.5 Server-Side</div>
                    <div className="text-slate-400">Hardware Diagnostic Copilot</div>
                    <div className="text-emerald-400 mt-1">● Secure Key Cloaked</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono-code text-slate-400">
                <span>Recent Institutional Enquiries (/api/enquiry)</span>
                <span className="text-cyan-400">Live Webhook Connected</span>
              </div>

              <div className="space-y-2">
                {[
                  { school: "St. Xavier's Model School", city: "Kolkata, WB", req: "Atal Tinkering Lab Setup & Teacher Training", students: "650 Students", status: "In Discussion" },
                  { school: "Delhi Public School, Cyber City", city: "Gurugram, HR", req: "ROBOZEST 2026 Delegation & Autonomous Kits", students: "1200 Students", status: "Kit Dispatched" },
                  { school: "National Academy of Technology", city: "Chennai, TN", req: "Computer Vision & Edge AI Lab Setup", students: "450 Students", status: "Site Inspection" },
                ].map((lead, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{lead.school}</div>
                      <div className="text-slate-400 mt-0.5">{lead.city} • {lead.req}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {lead.status}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-1">{lead.students}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hardware' && (
            <div className="space-y-3 text-xs font-mono-code">
              <div className="text-slate-400">Pan-India Warehouses & Component Health</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-white font-bold">Kolkata Central Hub</div>
                  <div className="text-slate-400">Rover Kits in Stock: <span className="text-cyan-400">420 units</span></div>
                  <div className="text-slate-400">Arduino Starter Kits: <span className="text-cyan-400">850 units</span></div>
                  <div className="text-emerald-400">Next dispatch batch: Today 4:00 PM IST</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-white font-bold">Southern Logistics (Chennai)</div>
                  <div className="text-slate-400">ESP32 & Sensors Packs: <span className="text-cyan-400">1,200 units</span></div>
                  <div className="text-slate-400">ROBOZEST Arena Chassis: <span className="text-cyan-400">310 units</span></div>
                  <div className="text-emerald-400">Courier Partner: Blue Dart Air Express</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-3 font-mono-code text-xs">
              <div className="text-slate-400">KMS-AI Prompt Tuning & Hardware Diagnostics</div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-800/40 space-y-2">
                <div className="text-cyan-400 font-bold">Live System Instruction Snippet:</div>
                <pre className="p-3 rounded-xl bg-slate-900 text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`KMS-AI: KITE Robotics Embedded Diagnostic Intelligence
- Grounded in official Indian Robotics curriculum (kiterobotics.in)
- Expert troubleshooting for Arduino, ESP32, L298N, OpenCV, MPU6050
- Mentors students with code blocks and practical circuit schematics`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
