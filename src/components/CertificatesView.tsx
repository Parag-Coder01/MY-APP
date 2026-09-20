import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Download, Share2, QrCode, ExternalLink, CheckCircle2, X } from 'lucide-react';
import { Certificate, UserProfile } from '../types';
import { MOCK_CERTIFICATES } from '../data/mockData';
import { KiteLogo } from './KiteLogo';

interface CertificatesViewProps {
  user: UserProfile;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ user }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleDownload = (cert: Certificate) => {
    alert(`Downloading high-resolution official PDF for certificate ${cert.certificateId}`);
  };

  const handleShare = (cert: Certificate) => {
    const verifyUrl = cert.verificationUrl || `https://www.kiterobotics.in/verify/${cert.certificateId}`;
    if (navigator.share) {
      navigator.share({
        title: `${cert.title} - KITE Robotics`,
        text: `I just earned an official certification in ${cert.title} from KITE ROBOTICS! Certificate ID: ${cert.certificateId}`,
        url: verifyUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(verifyUrl);
      alert("Certificate verification link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          <span>Verifiable Digital Credentials</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
          Certificates & Honors
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Tamper-proof certifications recognizing practical robotics competence, embedded coding labs, and ROBOZEST achievements.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-800/60 transition-all p-5 flex flex-col justify-between shadow-xl group"
          >
            {/* Certificate Header Banner */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {cert.type.toUpperCase()}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                {cert.title}
              </h3>

              <div className="text-xs text-slate-400 mt-1 font-mono-code">
                Awarded to: <span className="text-slate-200 font-semibold">{cert.studentName}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 mt-4 space-y-1.5 text-xs font-mono-code">
                <div className="flex justify-between text-slate-400">
                  <span>Issued</span>
                  <span className="text-slate-200">{cert.issueDate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Certificate ID</span>
                  <span className="text-cyan-400 font-bold">{cert.certificateId}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1 border-t border-slate-800/60">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Officially Verified on Blockchain</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition-colors"
              >
                Inspect
              </button>
              <button
                onClick={() => handleDownload(cert)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare(cert)}
                className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950"
                title="Share Verification Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal Showcase Preview */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-cyan-800/50 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-slate-100 my-auto"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Paper Style Display */}
            <div className="border-4 border-double border-cyan-800/60 rounded-2xl p-6 sm:p-8 bg-slate-950 text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

              <KiteLogo size="md" className="justify-center mx-auto" />

              <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest pt-2">
                Certificate of Practical Excellence
              </div>

              <div className="text-xs text-slate-400">
                This is proudly presented to
              </div>

              <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
                {selectedCert.studentName}
              </div>

              <div className="text-xs text-slate-300 max-w-md mx-auto">
                for demonstrating exceptional technical mastery and completing all hardware modules for
              </div>

              <div className="font-display font-bold text-lg sm:text-xl text-cyan-300">
                "{selectedCert.title}"
              </div>

              {/* Bottom Stamp & Signatures */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs font-mono-code items-end">
                <div className="text-left">
                  <div className="text-slate-400 text-[10px]">Issued Date</div>
                  <div className="text-slate-200 font-semibold">{selectedCert.issueDate}</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <div className="text-[9px] text-slate-500 mt-1">{selectedCert.certificateId}</div>
                </div>

                <div className="text-right">
                  <div className="text-slate-400 text-[10px]">Authorized Mentor</div>
                  <div className="text-slate-200 font-semibold">KITE Academic Council</div>
                </div>
              </div>
            </div>

            {/* Download / Share Actions */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                onClick={() => handleShare(selectedCert)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Share Credential Link</span>
              </button>

              <button
                onClick={() => handleDownload(selectedCert)}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download High-Res PDF</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
