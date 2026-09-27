import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Cpu, Wrench, Code2, Download, ExternalLink, Bookmark, Check, Layers, ChevronRight, X } from 'lucide-react';
import { ProjectItem } from '../types';
import { MOCK_PROJECTS } from '../data/mockData';

export const ProjectsView: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSave = (id: string) => {
    if (savedProjects.includes(id)) {
      setSavedProjects(savedProjects.filter((p) => p !== id));
      showToast('Removed from saved projects');
    } else {
      setSavedProjects([...savedProjects, id]);
      showToast('Project saved to your notebook');
    }
  };

  const filtered = MOCK_PROJECTS.filter((p) => {
    if (selectedDifficulty === 'All') return true;
    return p.difficulty === selectedDifficulty;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-mono-code font-bold shadow-xl border border-cyan-400 animate-slideUp flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono-code mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Open Source Robotics & IoT Blueprint Hub</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            DIY Hardware Projects & Firmware
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Curated open-hardware guides, pinouts, circuit schematics, and production firmware code for all skill levels.
          </p>
        </div>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex items-center gap-2 text-xs font-mono-code">
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              selectedDifficulty === diff
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => {
          const isSaved = savedProjects.includes(proj.id);
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col hover:border-cyan-500/50 transition-all group"
            >
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-cyan-400 font-bold uppercase">
                    {proj.difficulty}
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300">
                    ⏱ {proj.estimatedTime}
                  </span>
                </div>
                <button
                  onClick={() => toggleSave(proj.id)}
                  aria-label="Save project"
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                    isSaved
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-950/70 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                {/* Hardware components list */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="text-[10px] font-mono-code uppercase text-slate-500 font-bold">
                    Bill of Materials:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.components.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveProjectModal(proj)}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/30 text-cyan-400 hover:text-slate-950 font-mono-code text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Schematics</span>
                  </button>
                  <button
                    onClick={() => showToast(`Downloaded project manual & pinout guide for ${proj.title}`)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    title="Download Project ZIP"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Schematic & Build Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6 my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase">
                  {activeProjectModal.difficulty}
                </span>
                <span className="text-[10px] font-mono-code text-slate-400">
                  Build time: {activeProjectModal.estimatedTime}
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                {activeProjectModal.title}
              </h2>
            </div>

            {/* Image Preview */}
            <div className="h-56 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-950">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-mono-code text-cyan-400 font-semibold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                Validated on KITE Hardware Bench
              </div>
            </div>

            {/* Bill of Materials list */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono-code font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Components & Hardware Requirements</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProjectModal.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono-code text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step by Step Construction Plan */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono-code font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span>Assembly & Wiring Guide</span>
              </h3>
              <div className="space-y-2">
                {activeProjectModal.steps.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-mono-code font-bold text-cyan-400 shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{st}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code / Wiring Snippet */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-emerald-400 font-bold">
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  <span>Firmware Implementation (C++ / Arduino)</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => showToast("Downloading firmware sketch (INO / ZIP)...")}
                    className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download INO</span>
                  </button>
                </div>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono-code text-slate-300 overflow-x-auto leading-relaxed">
{`// KITE ROBOTICS Firmware Blueprint
#include <Wire.h>
#define MOTOR_PWM 9
#define SENSOR_PIN A0

void setup() {
  Serial.begin(115200);
  pinMode(MOTOR_PWM, OUTPUT);
  pinMode(SENSOR_PIN, INPUT);
  Serial.println("System Initialized -> KITE Engine Active");
}

void loop() {
  int sensorVal = analogRead(SENSOR_PIN);
  int outputPower = map(sensorVal, 0, 1023, 0, 255);
  analogWrite(MOTOR_PWM, outputPower);
  delay(20);
}`}
              </pre>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  showToast("Complete documentation package generated.");
                  setActiveProjectModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-cyan-500 text-slate-950 font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Download Schematic PDF
              </button>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono-code text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
