import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Sparkles, Cpu, Code2, Rocket, CheckCircle2 } from 'lucide-react';
import { KiteLogo } from './KiteLogo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  onOpenLogin: () => void;
}

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  visualImage: string;
  icon: React.ReactNode;
  highlights: string[];
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onGetStarted,
  onOpenLogin,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      badge: "KITE ROBOTICS ECOSYSTEM",
      title: "Build the Future.",
      subtitle: "Hands-on robotics hardware engineering designed to cultivate real inventors, not just consumers of technology.",
      visualImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      highlights: ["Physical Hardware Assembly", "Sensors & Motor Driver Labs", "Autonomous Rovers"],
    },
    {
      id: 2,
      badge: "EXPERIENTIAL STEM",
      title: "Learn. Build. Code.",
      subtitle: "Master embedded Arduino, ESP32 microcontrollers, IoT cloud systems, and real-time sensors with guided experiments.",
      visualImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
      highlights: ["Arduino & C++ Firmware", "WiFi & Cloud Dashboards", "Sensors & Actuators"],
    },
    {
      id: 3,
      badge: "FUTURE INTELLIGENCE",
      title: "Turn Ideas Into Innovation.",
      subtitle: "Deploy edge AI, computer vision with OpenCV, and intelligent automation for national championships like ROBOZEST.",
      visualImage: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1000&q=80",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      highlights: ["Edge Computer Vision", "ROBOZEST Hackathons", "Atal Tinkering Lab Setups"],
    },
    {
      id: 4,
      badge: "GET INVOLVED",
      title: "Your Technology Journey Starts Here.",
      subtitle: "Join over 25,000 students, educators, and schools across India powered by KITE ROBOTICS.",
      visualImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      icon: <Rocket className="w-5 h-5 text-purple-400" />,
      highlights: ["Certified Curricula", "Intelligent KMS-AI Mentorship", "Direct STEM Lab Kits"],
    },
  ];

  if (!isOpen) return null;

  const active = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onGetStarted();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Top Header bar with Skip button */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <KiteLogo size="sm" showTagline={false} />
          <button
            onClick={onClose}
            className="text-xs font-mono-code text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-wider py-1 px-2.5 rounded-lg hover:bg-slate-800"
          >
            Skip
          </button>
        </div>

        {/* Visual Showcase Card */}
        <div className="relative px-5 pt-3">
          <div className="relative h-52 sm:h-56 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.visualImage}
                alt={active.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Float badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] font-mono-code text-cyan-300 backdrop-blur-md">
              {active.icon}
              <span>{active.badge}</span>
            </div>

            {/* Highlights chips */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
              {active.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/50 text-slate-200 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 px-6 py-5 flex flex-col justify-between overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display font-bold text-2xl text-white tracking-tight leading-tight">
                {active.title}
              </h2>
              <p className="text-slate-300 text-sm mt-2.5 leading-relaxed">
                {active.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Dots & Action Controls */}
          <div className="pt-6 mt-4 border-t border-slate-800/80">
            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mb-5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-7 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            {currentSlide === slides.length - 1 ? (
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={onGetStarted}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenLogin}
                  className="w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-sm font-medium hover:text-white transition-colors"
                >
                  Already have an account? Log In
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 font-mono-code"
                >
                  Skip All
                </button>
                <button
                  onClick={handleNext}
                  className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-md shadow-cyan-500/30 active:scale-95 transition-all"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
