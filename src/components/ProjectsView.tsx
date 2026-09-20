import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Cpu, Wrench, Code2, Download, ExternalLink, Bookmark, Check, Layers, ChevronRight, X } from 'lucide-react';
import { ProjectItem } from '../types';
import { MOCK_PROJECTS } from '../data/mockData';

export const ProjectsView: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    if (savedProjects.includes(id)) {
      setSavedProjects(savedProjects.filter((p) => p !== id));
    } else {
      setSavedProjects([...savedProjects, id]);
    }
  };

  const filtered = MOCK_PROJECTS.filter((p) => {
    if (selectedDifficulty === 'All') return true;
    return p.difficulty === selectedDifficulty;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <FolderGit2 className="w-4 h-4" />
          <span>Hands-on Engineering Library</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
          Robotics & AI Projects Showcase
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Curated open-hardware guides, pinouts, circuit schematics, and production firmware code for all skill levels.
        </p>
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
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-800/60 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
          >
            {/* Visual */}
            <div
              onClick={() => setActiveProjectModal(proj)}
              className="relative h-48 w-full bg-slate-950 cursor-pointer overflow-hidden"
            >
              <img
                src={proj.image}
                alt={proj.name || proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-mono-code font-bold text-cyan-400 border border-slate-700 backdrop-blur-sm">
                {proj.difficulty}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(proj.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-sm"
                title="Save Project"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    savedProjects.includes(proj.id) ? 'fill-cyan-400 text-cyan-400' : ''
                  }`}
                />
              </button>

              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono-code text-slate-300">
                {proj.components.slice(0, 2).join(' • ')}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => setActiveProjectModal(proj)}
                  className="font-display font-bold text-base text-white hover:text-cyan-400 cursor-pointer transition-colors line-clamp-2"
                >
                  {proj.name || proj.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Skills chips */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
                  {(proj.skillsLearned || proj.skills || []).map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono-code text-slate-400">
                  {proj.components.length} Hardware Parts
                </span>
                <button
                  onClick={() => setActiveProjectModal(proj)}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>Build Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Build Guide Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 text-slate-100 my-auto max-h-[92vh] flex flex-col"
          >
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 uppercase">
              <span>{activeProjectModal.difficulty} Project</span>
              <span>•</span>
              <span>KITE Engineering Labs</span>
            </div>

            <h3 className="font-display font-extrabold text-xl text-white mt-1">
              {activeProjectModal.name || activeProjectModal.title}
            </h3>

            <div className="flex-1 overflow-y-auto space-y-4 my-4 pr-1">
              <img
                src={activeProjectModal.image}
                alt="Project"
                className="w-full h-52 object-cover rounded-2xl border border-slate-800"
              />

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProjectModal.description}
              </p>

              {/* Hardware Components Table */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono-code uppercase text-cyan-400 font-bold">
                  BOM (Bill of Materials)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {activeProjectModal.components.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code / Wiring Snippet */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>Firmware Implementation (C++ / Arduino)</span>
                  </div>
                  <button
                    onClick={() => alert("Downloaded project firmware sketch (INO / ZIP).")}
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download INO</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-slate-900 text-[11px] font-mono-code text-slate-300 overflow-x-auto">
{`// KITE ROBOTICS Embedded Firmware
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  pinMode(13, OUTPUT);
  Serial.println("[KITE-CORE] System Initialized.");
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}`}
                </pre>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => toggleSave(activeProjectModal.id)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4" />
                <span>{savedProjects.includes(activeProjectModal.id) ? 'Saved' : 'Save for Later'}</span>
              </button>

              <button
                onClick={() => {
                  alert("Project lab guide sent to your student dashboard.");
                  setActiveProjectModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Start Lab Exercise
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
