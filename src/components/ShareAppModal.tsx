import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  Smartphone,
  ExternalLink,
  Github,
  MessageSquare,
  Globe,
  Info,
  ShieldCheck,
} from 'lucide-react';
import {
  getPublicShareUrl,
  getQrCodeImageUrl,
  copyTextToClipboard,
  getWhatsAppShareUrl,
  OFFICIAL_GITHUB_URL,
  PUBLIC_APP_URL,
} from '../utils/shareUtils';

interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareAppModal: React.FC<ShareAppModalProps> = ({ isOpen, onClose }) => {
  const [copiedAppUrl, setCopiedAppUrl] = useState(false);
  const [copiedGithubUrl, setCopiedGithubUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'github'>('link');

  if (!isOpen) return null;

  const publicUrl = getPublicShareUrl();
  const qrCodeUrl = getQrCodeImageUrl(publicUrl, 260);

  const handleCopyAppUrl = async () => {
    const ok = await copyTextToClipboard(publicUrl);
    if (ok) {
      setCopiedAppUrl(true);
      setTimeout(() => setCopiedAppUrl(false), 2500);
    }
  };

  const handleCopyGithubUrl = async () => {
    const ok = await copyTextToClipboard(OFFICIAL_GITHUB_URL);
    if (ok) {
      setCopiedGithubUrl(true);
      setTimeout(() => setCopiedGithubUrl(false), 2500);
    }
  };

  const whatsappUrl = getWhatsAppShareUrl(
    publicUrl,
    '🚀 Open KITE Robotics on your phone — STEM learning, hardware store, robotics projects, and AI companion:'
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden"
        >
          {/* Cyan Glow Accent */}
          <div className="absolute -top-24 -right-24 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono-code font-bold text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                PUBLIC ACCESS ENABLED
              </div>
              <h3 className="font-display font-bold text-lg text-white mt-0.5">
                Open on Mobile & Share App
              </h3>
              <p className="text-xs text-slate-400">
                Anyone on any smartphone or browser can open this link freely
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-5">
            <button
              onClick={() => setActiveTab('link')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'link'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Public Link</span>
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'qr'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan QR Code</span>
            </button>
            <button
              onClick={() => setActiveTab('github')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'github'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </button>
          </div>

          {/* TAB 1: Public Link & Mobile Sharing */}
          {activeTab === 'link' && (
            <div className="space-y-4">
              {/* Notice why dev link didn't work before */}
              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/25 flex items-start gap-2.5 text-xs text-slate-300">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-white">Why it didn't open on other devices before:</strong>
                  <br />
                  The development URL (<code className="text-cyan-300 font-mono text-[10px]">ais-dev-...</code>) is private to your Google account.
                  The public link below (<code className="text-emerald-300 font-mono text-[10px]">ais-pre-...</code>) is unlocked and allows <strong>anyone on any mobile phone or computer</strong> to open the full app!
                </div>
              </div>

              {/* Public URL Box */}
              <div>
                <label className="block text-[11px] font-mono-code uppercase text-slate-400 mb-1.5 font-semibold">
                  Universal Public App URL
                </label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <Globe className="w-4 h-4 text-cyan-400 ml-1.5 shrink-0" />
                  <input
                    type="text"
                    readOnly
                    value={publicUrl}
                    className="w-full bg-transparent text-xs text-slate-200 font-mono-code focus:outline-none select-all truncate"
                  />
                  <button
                    onClick={handleCopyAppUrl}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                      copiedAppUrl
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                    }`}
                  >
                    {copiedAppUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Share Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-display font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 active:scale-95 transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Test Public Link</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: QR Code Scan on Phone */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-300">
                Open your smartphone's camera (iPhone Camera app or Android Google Lens / Camera) and point it at this QR code:
              </p>

              <div className="p-3.5 bg-slate-950 border border-cyan-500/30 rounded-2xl inline-block shadow-xl shadow-cyan-500/10">
                <img
                  src={qrCodeUrl}
                  alt="Scan to open KITE Robotics on mobile"
                  className="w-52 h-52 rounded-xl object-contain mx-auto"
                />
              </div>

              <div className="text-[11px] font-mono-code text-cyan-400 truncate max-w-full px-2">
                {publicUrl}
              </div>

              <button
                onClick={handleCopyAppUrl}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono-code text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedAppUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAppUrl ? 'Public Link Copied to Clipboard!' : 'Copy Link Instead'}</span>
              </button>
            </div>
          )}

          {/* TAB 3: GitHub Repository & Open Source */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-display font-bold text-sm">
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>Official GitHub Repository</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Access the open-source firmware, Arduino sketches, robotics CAD models, and website source code on GitHub.
                </p>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono-code text-cyan-300">
                  <span className="truncate">{OFFICIAL_GITHUB_URL}</span>
                  <button
                    onClick={handleCopyGithubUrl}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors ml-2 shrink-0 cursor-pointer"
                    title="Copy GitHub URL"
                  >
                    {copiedGithubUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={OFFICIAL_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-750 hover:to-slate-850 text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 shadow-lg active:scale-95 transition-all"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>Open GitHub Repository in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="https://github.com/kiterobotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 font-mono-code text-xs flex items-center justify-center gap-2 border border-slate-800 transition-colors"
                >
                  <span>Browse KITE Robotics Organization</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono-code">⚡ Instant sync across devices</span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
