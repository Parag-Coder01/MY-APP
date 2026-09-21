import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle, Send, Sparkles, Building, Users } from 'lucide-react';
import { MOCK_CAREERS, COMPANY_INFO } from '../data/mockData';

export const CareersView: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<typeof MOCK_CAREERS[0] | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert(`Application received for ${selectedJob?.title}! Our HR & Technical team will reach out via ${applicantEmail}.`);
      setSubmitted(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantNote('');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-[11px] font-mono-code text-emerald-300 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>WE ARE EXPANDING PAN-INDIA</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Careers at KITE Robotics
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Build the future of Indian robotics, mentor thousands of budding inventors, and innovate cutting-edge STEM hardware and AI curriculums.
          </p>
        </div>
      </div>

      {/* Perks Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
          <h4 className="font-display font-bold text-sm text-white">Innovation First</h4>
          <p className="text-xs text-slate-400 mt-1">
            Access state-of-the-art hardware labs, 3D printers, laser cutters & prototype budgets.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <Users className="w-5 h-5 text-cyan-400 mb-2" />
          <h4 className="font-display font-bold text-sm text-white">National Impact</h4>
          <p className="text-xs text-slate-400 mt-1">
            Empower over 25,000+ students and transform ATL labs across prestigious institutions.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <Building className="w-5 h-5 text-emerald-400 mb-2" />
          <h4 className="font-display font-bold text-sm text-white">Competitive Growth</h4>
          <p className="text-xs text-slate-400 mt-1">
            Competitive compensation, leadership roles, performance bonuses & hackathon mentorship.
          </p>
        </div>
      </div>

      {/* Job Openings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-white">
            Current Open Roles ({MOCK_CAREERS.length})
          </h3>
          <span className="text-xs font-mono-code text-cyan-400">Direct KITE Applications</span>
        </div>

        <div className="space-y-3">
          {MOCK_CAREERS.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {job.department}
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                    {job.type}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                  {job.title}
                </h4>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {job.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {job.experience}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono-code flex items-center justify-center gap-2 shrink-0 transition-all shadow-sm active:scale-95"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Direct HR Inquiries */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <h5 className="font-display font-bold text-sm text-white">Don't see your exact role?</h5>
          <p className="text-xs text-slate-400 mt-0.5">
            We are always eager to talk to brilliant robotics tinkerers, educators, and makers.
          </p>
        </div>
        <a
          href={`mailto:${COMPANY_INFO.email}?subject=Spontaneous%20Application%20at%20KITE%20Robotics`}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono-code transition-colors"
        >
          Send CV to {COMPANY_INFO.email}
        </a>
      </div>

      {/* Application Form Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 relative shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono-code uppercase text-cyan-400 font-bold">
                  Apply for Position
                </span>
                <h3 className="font-display font-extrabold text-lg text-white mt-0.5">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedJob.department} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApply} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Parag Sarkar"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">
                  Why do you want to join KITE Robotics?
                </label>
                <textarea
                  rows={3}
                  value={applicantNote}
                  onChange={(e) => setApplicantNote(e.target.value)}
                  placeholder="Briefly share your projects, hardware experience, or teaching passion..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitted}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 font-mono-code transition-all"
                >
                  {submitted ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
