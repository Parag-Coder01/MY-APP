import React, { useState } from 'react';
import { motion } from 'motion/react';
import { School, CheckCircle2, Send, Download, Sparkles, Cpu, Award, Users, BookOpen, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const SchoolSectionView: React.FC = () => {
  const [schoolName, setSchoolName] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [studentCount, setStudentCount] = useState('500+');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const schoolOfferings = [
    {
      title: 'Atal Tinkering Lab (ATL) Setup',
      desc: 'Complete turnkey setup aligned with NITI Aayog guidelines, 3D printers, DIY robotics kits, and safety gear.',
      icon: <School className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Custom K-12 Robotics Curriculum',
      desc: 'Graded pedagogy for Classes 3 to 12 blending experiential science, mathematics, coding, and hands-on hardware.',
      icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: 'Robotics & AI Innovation Labs',
      desc: 'State-of-the-art dedicated laboratory layout, power rail benches, soldering stations, and testing arenas.',
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Teacher & Mentor Training (TTT)',
      desc: 'Intensive hands-on empowerment for school science and computer faculty with year-round technical backing.',
      icon: <Users className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'STEM & IoT Practical Kits',
      desc: 'Direct bulk supply of rugged student kits with zero component shortfalls and modular replacement warranty.',
      icon: <Wrench className="w-5 h-5 text-pink-400" />,
    },
    {
      title: 'Competition & ROBOZEST Mentorship',
      desc: 'Specialized bootcamps to guide school teams towards state and national robotics championship podiums.',
      icon: <Award className="w-5 h-5 text-purple-400" />,
    },
  ];

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName,
          coordinatorName,
          phone,
          email,
          city,
          studentCount,
          message,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-900/50 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-9 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-[11px] font-mono-code text-cyan-300 mb-3">
            <School className="w-3.5 h-3.5 text-cyan-400" />
            <span>INSTITUTIONAL PARTNERSHIP PROGRAM</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            Transform Your School Into An Innovation Ecosystem
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
            Empower your students with hands-on Robotics, AI, IoT, and STEM education. From complete Atal Tinkering Lab setup to NEP 2020-compliant curricula and teacher training.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a
              href="#partner-form"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>Partner With KITE Robotics</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => alert("KITE Robotics 2026 Institutional STEM & ATL Prospectus is downloading (PDF).")}
              className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Curriculum Brochure</span>
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Core Offerings */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white">
            End-to-End Institutional Solutions
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Everything your school needs to launch and sustain a premier robotics innovation center.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schoolOfferings.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit">
                {item.icon}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Form Section */}
      <div id="partner-form" className="rounded-3xl bg-slate-900/90 border border-cyan-900/40 p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
            Institutional Inquiry
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-1">
            Partner With KITE Robotics
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Our educational consultants will design a customized ATL or robotics rollout for your institution.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-800/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-white">
              Institutional Enquiry Submitted!
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you, {coordinatorName || 'School Coordinator'}. Our Academic Director will get in touch with {schoolName || 'your institution'} within 24 business hours.
            </p>
            <div className="text-xs font-mono-code text-slate-400">
              Direct Academic Line: <span className="text-cyan-400">{COMPANY_INFO.phone}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitEnquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">School / Institution Name</label>
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. St. Xavier's High School"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Principal / Coordinator Name</label>
                <input
                  type="text"
                  required
                  value={coordinatorName}
                  onChange={(e) => setCoordinatorName(e.target.value)}
                  placeholder="e.g. Dr. R. K. Banerjee"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="principal@school.edu.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">City & State</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Kolkata, West Bengal"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Student Count</label>
                <select
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  <option value="100-300">100 - 300 Students</option>
                  <option value="300-600">300 - 600 Students</option>
                  <option value="600-1200">600 - 1200 Students</option>
                  <option value="1200+">1200+ Students</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Specific Requirements / Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your requirements (ATL setup, robotics lab, teacher training, annual competition)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              {submitting ? (
                <span>Dispatching Enquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Institutional Partnership Enquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
