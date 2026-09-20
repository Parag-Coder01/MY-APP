import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Clock, Award, CheckCircle2, Ticket, Sparkles, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { Workshop } from '../types';

interface WorkshopsViewProps {
  workshops: Workshop[];
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({ workshops }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'flagship' | 'offline' | 'online'>('all');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [registeredSuccessId, setRegisteredSuccessId] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState('');
  const [participantPhone, setParticipantPhone] = useState('');

  const filtered = workshops.filter((w) => {
    if (activeFilter === 'flagship') return w.isFlagship || w.id === 'ws-1';
    if (activeFilter === 'offline') return w.mode.toLowerCase().includes('offline');
    if (activeFilter === 'online') return w.mode.toLowerCase().includes('online');
    return true;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWorkshop) {
      setRegisteredSuccessId(selectedWorkshop.id);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Hands-on Engineering Summits</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
          Workshops & Competitions
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          National robotics bootcamps, school innovation workshops, and our flagship ROBOZEST 2026 championship.
        </p>
      </div>

      {/* Flagship ROBOZEST Spotlight Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 p-6 sm:p-7 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-[11px] font-mono-code text-amber-300">
              <Award className="w-3.5 h-3.5" />
              <span>FLAGSHIP NATIONAL ARENA</span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white">
              ROBOZEST 2026 — National Robotics Championship
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Honoring Dr. APJ Abdul Kalam. Compete in Autonomous Maze Solving, Line Tracking Sprint, RoboSoccer, and AI Innovation Exhibition with teams across India.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-slate-300 pt-1">
              <span>📅 October 15–17, 2026</span>
              <span>•</span>
              <span>📍 Netaji Indoor Stadium, Kolkata</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">🏆 ₹2,50,000 Prize Pool</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedWorkshop(workshops.find((w) => w.isFlagship || w.id === 'ws-1') || workshops[0])}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            Register for ROBOZEST
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs font-mono-code">
        {[
          { id: 'all', label: 'All Workshops' },
          { id: 'flagship', label: 'Flagship & ROBOZEST' },
          { id: 'offline', label: 'Offline / In-Person Labs' },
          { id: 'online', label: 'Online Masterclasses' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeFilter === f.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Workshop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-800/60 transition-all overflow-hidden flex flex-col justify-between group shadow-lg"
          >
            {/* Visual Header */}
            <div className="relative h-44 w-full bg-slate-950">
              <img
                src={w.image}
                alt={w.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-mono-code font-bold text-cyan-400 border border-slate-700 backdrop-blur-sm">
                  {w.mode}
                </span>
                {(w.isFlagship || w.id === 'ws-1') && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-[10px] font-mono-code font-bold text-slate-950 shadow">
                    ROBOZEST
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-xs font-mono-code text-slate-300 flex items-center justify-between">
                <span>{w.date}</span>
                <span className="text-cyan-400 font-bold">₹{w.price || w.fee || 0}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {w.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {w.description}
                </p>

                <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-800/80 text-xs font-mono-code text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{w.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Audience: {w.ageGroup || w.targetAudience || 'Students'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Duration: {w.time}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono-code text-emerald-400">
                  {w.seatsLeft > 0 ? `${w.seatsLeft} Seats Left` : 'Seats Filling Fast'}
                </span>
                <button
                  onClick={() => setSelectedWorkshop(w)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workshop Registration Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 text-slate-100 my-auto"
          >
            <button
              onClick={() => {
                setSelectedWorkshop(null);
                setRegisteredSuccessId(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {registeredSuccessId === selectedWorkshop.id ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Your seat has been reserved for {selectedWorkshop.title}. An entry ticket has been dispatched to your contact.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono-code text-xs text-left space-y-1">
                  <div>Attendee: <span className="text-cyan-400">{participantName || 'Aarav Sharma'}</span></div>
                  <div>Pass Code: <span className="text-emerald-400">PASS-KR-{(Math.random() * 10000).toFixed(0)}</span></div>
                  <div>Venue: <span className="text-slate-200">{selectedWorkshop.location}</span></div>
                </div>
                <button
                  onClick={() => {
                    setSelectedWorkshop(null);
                    setRegisteredSuccessId(null);
                  }}
                  className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-mono-code uppercase text-cyan-400 font-semibold">
                    Workshop Pass Registration
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-0.5">
                    {selectedWorkshop.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    Date: {selectedWorkshop.date} • Mode: {selectedWorkshop.mode}
                  </div>
                </div>

                {/* Syllabus Highlights */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-slate-200">What You'll Learn:</div>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {selectedWorkshop.syllabus.map((s, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Participant Full Name</label>
                    <input
                      type="text"
                      required
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Mobile Phone (for SMS Pass)</label>
                    <input
                      type="tel"
                      required
                      value={participantPhone}
                      onChange={(e) => setParticipantPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
                  <span className="text-slate-400">Registration Fee</span>
                  <span className="text-cyan-400 font-bold text-sm">
                    {(selectedWorkshop.price || selectedWorkshop.fee || 0) === 0 ? 'FREE PASS' : `₹${selectedWorkshop.price || selectedWorkshop.fee || 0}`}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <span>Confirm Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
