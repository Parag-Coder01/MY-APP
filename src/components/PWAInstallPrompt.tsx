import React, { useState } from 'react';
import { Smartphone, Download, Share, PlusSquare, X, CheckCircle2, QrCode } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'qr'>('install');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.kiterobotics.in';
  // Generate a QR code using quickchart / standard QR image
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(currentUrl)}&bgcolor=020617&color=38bdf8&margin=10`;

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Icon */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-500/30 p-2.5 flex items-center justify-center shadow-lg shadow-cyan-500/10 shrink-0">
            <img src="/icon.svg" alt="Kite Robotics" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono-code font-bold text-cyan-400">
              <Smartphone className="w-3 h-3" />
              OFFICIAL MOBILE APP
            </div>
            <h3 className="font-display font-bold text-lg text-white mt-0.5">
              Install KITE Robotics
            </h3>
            <p className="text-xs text-slate-400">Add to Home Screen for fast mobile access</p>
          </div>
        </div>

        {/* Tabs: Direct Install or Scan QR to Open on Phone */}
        <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800/80 mb-5">
          <button
            onClick={() => setActiveTab('install')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'install'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Install on this Device
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'qr'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            Open on Phone
          </button>
        </div>

        {activeTab === 'install' ? (
          <div className="space-y-4">
            {installSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-display font-bold text-sm text-emerald-200">
                  App Successfully Installed!
                </p>
                <p className="text-xs text-emerald-400/80">
                  You can now launch KITE Robotics right from your device home screen or app drawer.
                </p>
              </div>
            ) : isInstalled ? (
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-center space-y-1.5">
                <CheckCircle2 className="w-7 h-7 text-cyan-400 mx-auto" />
                <p className="font-display font-bold text-sm text-cyan-200">
                  Already Running as Mobile App
                </p>
                <p className="text-xs text-slate-400">
                  Kite Robotics is running in standalone mobile mode with full offline caching.
                </p>
              </div>
            ) : isInstallable ? (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p className="font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Native App Experience:
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-400">
                    <li>Instant launch without browser URL bar</li>
                    <li>Full offline access to course materials & pinouts</li>
                    <li>Direct access to KMS-AI Robotics Assistant</li>
                    <li>Hardware store orders and certificates in your pocket</li>
                  </ul>
                </div>

                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-extrabold text-sm shadow-lg shadow-cyan-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install KITE Robotics App Now
                </button>
              </div>
            ) : isIOS ? (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
                  <p className="font-semibold text-white">How to install on iOS (Safari):</p>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs shrink-0">
                      1
                    </div>
                    <p className="text-slate-300">
                      Tap the <strong className="text-white">Share</strong> button in the Safari bottom toolbar <Share className="w-3.5 h-3.5 inline text-cyan-400 mx-1" />.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs shrink-0">
                      2
                    </div>
                    <p className="text-slate-300">
                      Scroll down and tap <strong className="text-white">Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline text-cyan-400 mx-1" />.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs shrink-0">
                      3
                    </div>
                    <p className="text-slate-300">
                      Tap <strong className="text-white">Add</strong> at top right. The Kite Robotics icon will appear on your phone screen!
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
                >
                  Got It
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p className="font-semibold text-white">To install on your browser:</p>
                  <p className="text-slate-400 leading-relaxed">
                    Click the install icon <strong className="text-cyan-400">⊕</strong> in your browser's address bar (Chrome, Edge, or Brave), or tap your browser menu and select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home Screen"</strong>.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
                >
                  Understood
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-xs text-slate-300">
              Scan this QR code with your iPhone or Android camera to open and install the app directly on your smartphone:
            </p>
            <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded-2xl inline-block shadow-lg shadow-cyan-500/10">
              <img
                src={qrCodeUrl}
                alt="QR Code to open on mobile"
                className="w-48 h-48 rounded-xl object-contain mx-auto"
              />
            </div>
            <div className="text-[11px] font-mono-code text-slate-400 truncate max-w-full px-2">
              {currentUrl}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
