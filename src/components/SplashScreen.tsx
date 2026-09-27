import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KiteLogo } from './KiteLogo';
import { Cpu, Zap, Wifi } from 'lucide-react';

interface SplashScreenProps {
  isOpen?: boolean;
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isOpen = true, onFinish }) => {
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onFinishRef.current();
    }, 1500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none cursor-pointer"
        onClick={onFinish}
        onTouchStart={onFinish}
      >
        {/* Animated digital grid background */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '24px 24px'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none"
        />

        {/* Radiant glow core */}
        <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute w-64 h-64 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

        {/* Floating Node Badges */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,149,218,0.3)] backdrop-blur-md flex items-center justify-center"
          >
            <KiteLogo size="lg" variant="mark" />
          </motion.div>

          {/* Brand Name & Taglines */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mt-5 sm:mt-6 px-4"
          >
            <div className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-white flex items-center justify-center gap-2 whitespace-nowrap">
              <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">KITE</span>
              <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">ROBOTICS</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs md:text-sm font-mono-code text-cyan-300 tracking-widest uppercase">
              <span>Robotics</span>
              <span className="text-slate-600">•</span>
              <span>AI</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400">IoT</span>
            </div>
          </motion.div>

          {/* Micro-nodes row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-6 mt-8 text-xs text-slate-400 font-mono-code"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Hardware</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>KMS-AI</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <Wifi className="w-3.5 h-3.5 text-blue-400" />
              <span>IoT</span>
            </div>
          </motion.div>

          {/* Loading Progress Bar */}
          <div className="w-48 h-1 bg-slate-800 rounded-full mt-10 overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: 'easeInOut',
              }}
              className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
            onClick={onFinish}
            className="mt-6 text-[11px] font-mono-code text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider underline cursor-pointer"
          >
            Tap anywhere to enter
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
