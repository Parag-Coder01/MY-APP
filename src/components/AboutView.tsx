import React from 'react';
import { ShieldCheck, Target, Eye, Award, Users, Cpu, MapPin, Sparkles, PhoneCall, Mail, Globe, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { KiteLogo } from './KiteLogo';
import { AnimatedCounter } from './AnimatedCounter';

interface AboutViewProps {
  onContactClick: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onContactClick }) => {
  const whyChooseUs = [
    {
      title: 'Practical Hardware Approach',
      desc: 'No theoretical simulation only; students build on real microcontrollers, wiring actual sensors and soldering production robotics.',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: 'Veteran Engineering Mentorship',
      desc: 'Trained by senior robotics engineers and competition judges with proven credentials in national robotics arenas.',
      icon: <Users className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Industry-Relevant Curriculum',
      desc: 'Aligned with NEP 2020 and global STEM frameworks, covering microcontrollers, computer vision, and IoT protocols.',
      icon: <Award className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'In-House Engineered Hardware Kits',
      desc: 'Rugged modular kits designed specifically for student resilience, zero shortfalls, and modular expansion.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Real-World Innovation Output',
      desc: 'Students don’t just build toys; they solve real problems like automated agriculture monitors, smart campus gates, and inspection drones.',
      icon: <Target className="w-5 h-5 text-pink-400" />,
    },
    {
      title: 'National Championship Pathways',
      desc: 'Direct qualification tracks into ROBOZEST and national Atal Tinkering Lab innovation exhibitions.',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Brand Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-900/50 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-9 shadow-2xl text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <KiteLogo size="lg" className="justify-center mx-auto" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-xs font-mono-code text-cyan-300">
            <span>EMPOWERING INNOVATION WITH ROBOTICS, AI & IOT</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Building India’s Next Generation of Technology Inventors
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            KITE ROBOTICS is an Indian Robotics, Artificial Intelligence, IoT and STEM education company focused on hands-on experiential learning, cutting-edge hardware products, nationwide workshops, and school innovation laboratory setup.
          </p>

          {/* Dynamic Impact Counters */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-display font-black text-cyan-400">
                <AnimatedCounter target={25000} suffix="+" duration={1800} />
              </div>
              <div className="text-[11px] font-mono-code text-slate-400 mt-0.5">Students Mentored</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-display font-black text-amber-400">
                <AnimatedCounter target={120} suffix="+" duration={1500} />
              </div>
              <div className="text-[11px] font-mono-code text-slate-400 mt-0.5">Partner Schools</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-display font-black text-emerald-400">
                <AnimatedCounter target={45} suffix="+" duration={1400} />
              </div>
              <div className="text-[11px] font-mono-code text-slate-400 mt-0.5">ATL Labs Setup</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {COMPANY_INFO.mission}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {COMPANY_INFO.vision}
          </p>
        </div>
      </div>

      {/* Why Choose KITE Robotics */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-display font-bold text-xl text-white">
            Why Choose KITE ROBOTICS
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Engineered from ground up to replace rote learning with real technology craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyChooseUs.map((w, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
            >
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 w-fit">
                {w.icon}
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white">
                {w.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* National Network Hubs */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Pan-India Innovation Hubs
            </h3>
            <p className="text-xs text-slate-400">
              Active engineering centers and technical coordinators across India.
            </p>
          </div>
          <span className="text-xs font-mono-code text-cyan-400">
            5 Regional Command Centers
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {(COMPANY_INFO.locations || []).map((loc: { city: string; state: string; type: string }, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1.5"
            >
              <MapPin className="w-5 h-5 text-cyan-400 mx-auto" />
              <div className="font-display font-bold text-sm text-white">{loc.city}</div>
              <div className="text-[11px] text-slate-400 font-mono-code">{loc.state}</div>
              <div className="text-[10px] text-cyan-400 font-mono-code pt-1">{loc.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact strip */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Ready to consult with our mentors?</div>
          <div className="text-xs text-slate-400 mt-0.5">
            Reach our engineering support team directly at {COMPANY_INFO.phone}.
          </div>
        </div>
        <button
          onClick={onContactClick}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 transition-all flex items-center gap-1.5"
        >
          <span>Contact KITE Robotics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
