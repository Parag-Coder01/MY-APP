import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Download, Wifi, BatteryCharging, Signal } from 'lucide-react';

interface MobileAppFrameProps {
  children: React.ReactNode;
  onOpenInstallPrompt: () => void;
}

export const MobileAppFrame: React.FC<MobileAppFrameProps> = ({
  children,
  onOpenInstallPrompt,
}) => {
  // Mobile frame simulator toggle for desktop
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Desktop Controller Ribbon: Lets user switch between Mobile App Frame and Fullscreen */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 bg-slate-950/90 border-b border-slate-800/80 text-xs text-slate-300 z-50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono-code font-bold text-white tracking-wide">
            KITE ROBOTICS MOBILE APP
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 text-[11px]">
            {isPhoneFrame ? 'Simulating iPhone / Android Flagship Device' : 'Desktop Expanded Mode'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Frame Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
            <button
              onClick={() => setIsPhoneFrame(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isPhoneFrame
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone View</span>
            </button>
            <button
              onClick={() => setIsPhoneFrame(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !isPhoneFrame
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Wide View</span>
            </button>
          </div>

          {/* Direct Install CTA */}
          <button
            onClick={onOpenInstallPrompt}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App on Phone</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className={`flex-1 flex items-center justify-center ${isPhoneFrame ? 'md:py-8 md:px-4' : ''}`}>
        {isPhoneFrame ? (
          /* Phone Device Shell on Desktop, 100% full-bleed on Mobile */
          <div className="w-full md:max-w-[430px] md:h-[880px] md:max-h-[92vh] bg-slate-950 md:rounded-[52px] md:ring-12 md:ring-slate-800/90 md:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(6,182,212,0.15)] flex flex-col relative overflow-hidden transition-all duration-300">
            {/* Left Hardware Buttons (Decorative) */}
            <div className="hidden md:block absolute -left-[14px] top-28 w-[4px] h-12 bg-slate-700 rounded-l-sm" />
            <div className="hidden md:block absolute -left-[14px] top-44 w-[4px] h-12 bg-slate-700 rounded-l-sm" />
            {/* Right Power Button (Decorative) */}
            <div className="hidden md:block absolute -right-[14px] top-32 w-[4px] h-16 bg-slate-700 rounded-r-sm" />

            {/* Mobile Status Bar (iOS / Android style) */}
            <div className="w-full bg-slate-950/95 backdrop-blur-md px-6 pt-3 pb-1 flex items-center justify-between text-slate-300 text-[11px] font-mono-code select-none z-50 shrink-0">
              <span className="font-semibold text-white tracking-wider">{currentTime}</span>
              
              {/* Dynamic Island Capsule in Center */}
              <div className="hidden md:flex items-center justify-center px-3 py-1 bg-black rounded-full border border-slate-800 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 mr-2" />
                <div className="w-2 h-2 rounded-full bg-cyan-900/60" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <Signal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-bold text-white">5G</span>
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                <div className="flex items-center gap-0.5 ml-1">
                  <span className="text-[10px] text-white font-bold">98%</span>
                  <BatteryCharging className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* App Screen Content with Native-feel Scroll */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative scroll-smooth overscroll-contain">
              {children}
            </div>

            {/* iOS Home Indicator Bar at Bottom of Phone */}
            <div className="hidden md:flex justify-center pb-2 pt-1 bg-slate-950/95 shrink-0 z-50">
              <div className="w-32 h-1 bg-slate-700 hover:bg-slate-500 transition-colors rounded-full" />
            </div>
          </div>
        ) : (
          /* Wide Desktop View */
          <div className="w-full min-h-screen flex flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
