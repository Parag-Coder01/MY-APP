import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { KiteLogo } from './KiteLogo';
import { Cpu, Zap, Wifi } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none cursor-pointer"
      onClick={onFinish}
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

      {/* Circuit lines SVG overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <motion.path
          d="M 20 100 L 100 100 L 140 180 L 280 180"
          stroke="#06b6d4"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 380 400 L 300 400 L 260 320 L 120 320"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.8, delay: 0.2, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="280"
          cy="180"
          r="4"
          fill="#06b6d4"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 1.6, duration: 0.4 }}
        />
        <motion.circle
          cx="120"
          cy="320"
          r="4"
          fill="#f59e0b"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 1.8, duration: 0.4 }}
        />
      </svg>

      {/* Floating Node Badges */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <KiteLogo size="xl" showTagline={false} />
        </motion.div>

        {/* Brand Name & Taglines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-6"
        >
          <div className="font-display font-bold text-2xl md:text-3xl tracking-wide text-slate-100">
            KITE <span className="text-cyan-400">ROBOTICS</span>
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
          transition={{ delay: 0.8, duration: 0.6 }}
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
              duration: 1.4,
              ease: 'easeInOut',
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
          onClick={onFinish}
          className="mt-6 text-[11px] font-mono-code text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
        >
          Tap anywhere to skip
        </motion.button>
      </div>
    </motion.div>
  );
};
