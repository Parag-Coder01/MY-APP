import React, { useState } from 'react';
import {
  Rocket,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  Send,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Code2,
  Bot,
  Cpu,
  Layers,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const InternshipView: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCollege, setApplicantCollege] = useState('');
  const [applicantYear, setApplicantYear] = useState('2nd Year');
  const [applicantDomain, setApplicantDomain] = useState('Robotics & Embedded Systems');
  const [applicantGithub, setApplicantGithub] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const internshipTracks = [
    {
      id: 'track-robotics',
      title: 'Robotics & Autonomous Hardware Intern',
      duration: '8 - 12 Weeks',
      stipend: '₹12,000 - ₹18,000 / month',
      mode: 'Hybrid / In-Lab',
      location: 'Kolkata / Mumbai / Bengaluru Labs',
      badge: 'Flagship Lab Track',
      icon: Bot,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      description:
        'Work hands-on with mobile rovers, brushless motor drivers, ESP32 telemetry, kinematics testing, and real robotics hardware prototypes.',
      skills: ['ROS 2', 'Embedded C/C++', 'ESP32 / STM32', 'Motor Kinematics', 'PCB Design'],
    },
    {
      id: 'track-ai-cv',
      title: 'Edge AI & Computer Vision Intern',
      duration: '8 - 12 Weeks',
      stipend: '₹15,000 - ₹20,000 / month',
      mode: 'Remote or In-Lab',
      location: 'Pan-India',
      badge: 'High Impact AI',
      icon: Cpu,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
      description:
        'Develop real-time object tracking, OpenCV edge vision models, gesture controllers, and integrate TinyML algorithms on microcontrollers.',
      skills: ['Python', 'OpenCV', 'PyTorch / TF Lite', 'Edge AI', 'NVIDIA Jetson'],
    },
    {
      id: 'track-fullstack',
      title: 'Full Stack & Cloud Architecture Intern',
      duration: '8 - 12 Weeks',
      stipend: '₹12,000 - ₹16,000 / month',
      mode: 'Remote / Virtual',
      location: 'Remote Work',
      badge: 'Software Engineering',
      icon: Code2,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      description:
        'Build responsive educational LMS platforms, WebGL 3D robotics visualizers, IoT hardware dashboards, and secure backend microservices.',
      skills: ['React / Next.js', 'TypeScript', 'Node.js / Express', 'Three.js / WebGL', 'PostgreSQL'],
    },
    {
      id: 'track-stem-mentor',
      title: 'STEM Curriculum & School Innovation Mentor',
      duration: '6 - 10 Weeks',
      stipend: '₹10,000 - ₹14,000 / month',
      mode: 'On-Field / ATL Labs',
      location: 'Regional Partner Schools',
      badge: 'Education Leadership',
      icon: GraduationCap,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      description:
        'Train young innovators at Atal Tinkering Labs, conduct live hands-on drone & rover workshops, and create interactive lab manuals.',
      skills: ['Arduino', 'NEP 2020 STEM Pedagogy', 'Tinkercad / Scratch', 'Workshop Delivery'],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert(`Application received for ${applicantName}! Our Talent & Research team will review your profile and reach out via ${applicantEmail}.`);
      setSubmitted(false);
      setSelectedRole(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantCollege('');
      setApplicantGithub('');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-[11px] font-mono-code text-cyan-300 font-bold uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>KITE INNOVATION INTERNSHIP PROGRAM 2026</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Work on Real <span className="text-cyan-400">Robotics & AI</span> Prototypes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Join KITE ROBOTICS research labs across India. Work with industry mentors, build production-grade autonomous rovers, edge AI algorithms, and earn government-recognized project experience credentials.
          </p>
        </div>
      </div>

      {/* Program Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        {[
          { title: 'Industry Stipend', desc: 'Performance-backed monthly stipend with hardware allowances.', icon: Award, color: 'text-amber-400' },
          { title: 'Live Hardware Kits', desc: 'Direct access to microcontrollers, sensors, 3D printers & testing rigs.', icon: Bot, color: 'text-cyan-400' },
          { title: 'Verified Certificate', desc: 'Official Project Completion & Recommendation Letter from KITE Labs.', icon: CheckCircle2, color: 'text-emerald-400' },
          { title: 'PPO Opportunities', desc: 'Direct Pre-Placement Offers for top-performing interns on graduation.', icon: Rocket, color: 'text-purple-400' },
        ].map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <IconComp className={`w-5 h-5 ${item.color}`} />
              <h4 className="font-display font-bold text-sm text-white">{item.title}</h4>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Available Internship Tracks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight">
              Open Internship Roles
            </h3>
            <p className="text-xs text-slate-400">Select a specialization track and submit your application</p>
          </div>
          <span className="text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-wider">Summer & Fall Batches</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internshipTracks.map((track) => {
            const IconComponent = track.icon;
            return (
              <div
                key={track.id}
                className="rounded-3xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${track.color} border`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono-code font-bold uppercase text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                          {track.badge}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg text-white mt-1 group-hover:text-cyan-300 transition-colors">
                          {track.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono-code text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{track.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-amber-300 font-semibold">{track.stipend}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{track.mode}</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {track.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono-code bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(track.title);
                    setApplicantDomain(track.title);
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-cyan-500/30 text-xs font-mono-code font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for this Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internship Application Form Modal / Inline Box */}
      {selectedRole && (
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900 border-2 border-cyan-500/50 shadow-2xl space-y-5 animate-scaleUp">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-widest font-bold">Fast Track Application</span>
              <h3 className="font-display font-black text-xl text-white">Applying for: {selectedRole}</h3>
            </div>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-xs font-mono-code text-slate-400 hover:text-white underline cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@college.edu.in"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300">College / University *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IIT Bombay / NIT / Jadavpur University"
                  value={applicantCollege}
                  onChange={(e) => setApplicantCollege(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300">Current Academic Year</label>
                <select
                  value={applicantYear}
                  onChange={(e) => setApplicantYear(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-cyan-500"
                >
                  <option value="1st Year">1st Year Undergrad</option>
                  <option value="2nd Year">2nd Year Undergrad</option>
                  <option value="3rd Year">3rd Year Undergrad</option>
                  <option value="4th Year">4th Year Undergrad</option>
                  <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300">GitHub Profile / Portfolio / LinkedIn URL</label>
              <input
                type="url"
                placeholder="https://github.com/your-handle"
                value={applicantGithub}
                onChange={(e) => setApplicantGithub(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-sans focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-display font-black text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:from-cyan-300 hover:to-blue-400 cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitted ? 'Submitting Application...' : 'Submit Internship Application'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
