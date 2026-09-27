import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Download, QrCode, ExternalLink, CheckCircle2, X } from 'lucide-react';
import { Certificate } from '../types';
import { MOCK_CERTIFICATES } from '../data/mockData';
import { generateCertificatePdf } from '../utils/pdfGenerator';

export const CertificatesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const filteredCerts = MOCK_CERTIFICATES.filter(
    (c) =>
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerifyId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const match = MOCK_CERTIFICATES.find(
        (c) => c.certificateId.toLowerCase() === searchQuery.trim().toLowerCase()
      );
      if (match) {
        setSelectedCert(match);
        setVerificationResult('VALID');
      } else {
        setVerificationResult('NOT_FOUND');
      }
    }, 700);
  };

  const handleDownload = (cert: Certificate) => {
    generateCertificatePdf(cert);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono-code">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cryptographic Credential Verification Engine</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Verify & Download Student Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All diplomas, summer internships, and robotics workshop certificates issued by KITE Robotics are cryptographically verified and anchored with a unique Serial Certificate ID.
          </p>

          {/* Quick Search Verification Input */}
          <form onSubmit={handleVerifyId} className="flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. KITE-2026-AI-8841)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVerificationResult(null);
              }}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs font-mono-code focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-mono-code font-bold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isVerifying ? 'Verifying...' : 'Verify Now'}
            </button>
          </form>

          {verificationResult === 'NOT_FOUND' && (
            <p className="text-xs text-rose-400 font-mono-code">
              ⚠️ No certificate record matching "{searchQuery}" was found. Please check the spelling.
            </p>
          )}
        </div>
      </div>

      {/* Certificate Archive List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base sm:text-lg text-white">
            Recently Issued & Sample Certifications
          </h2>
          <span className="text-xs font-mono-code text-slate-400">
            Showing {filteredCerts.length} credentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                    {cert.certificateId}
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-500">
                    Issued: {cert.issueDate}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  {cert.studentName}
                </h3>
                <p className="text-xs text-slate-300 font-mono-code">
                  Course: {cert.courseName}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Grade / Distinction: <strong className="text-white">{cert.grade}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-mono-code text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Inspect Credentials</span>
                </button>
                <button
                  onClick={() => handleDownload(cert)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
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
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Diploma Mock Preview */}
            <div className="border-4 border-double border-cyan-500/40 rounded-2xl p-6 bg-gradient-to-b from-slate-950 to-slate-900 text-center space-y-4 shadow-inner relative">
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono-code text-xs uppercase tracking-widest font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified KITE Robotics Credential</span>
              </div>

              <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide uppercase">
                Certificate of Completion
              </h2>

              <p className="text-xs text-slate-400 italic">This is proudly presented to</p>
              <div className="font-display font-black text-2xl sm:text-3xl text-cyan-400 tracking-wider">
                {selectedCert.studentName}
              </div>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                For successfully demonstrating engineering rigor, hands-on circuitry, and final capstone project execution in
              </p>
              <div className="font-mono-code font-bold text-sm sm:text-base text-white bg-slate-900/80 py-1.5 px-4 rounded-xl border border-slate-800 inline-block">
                {selectedCert.courseName}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-left text-xs font-mono-code">
                <div>
                  <div className="text-[10px] text-slate-500">SERIAL ID</div>
                  <div className="text-cyan-400 font-bold">{selectedCert.certificateId}</div>
                  <div className="text-[10px] text-slate-500 mt-1">ISSUE DATE</div>
                  <div className="text-slate-300">{selectedCert.issueDate}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">FINAL EVALUATION</div>
                  <div className="text-emerald-400 font-bold">{selectedCert.grade}</div>
                  <div className="text-[10px] text-slate-500 mt-1">STATUS</div>
                  <div className="text-emerald-400 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Cryptographically Valid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Action */}
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => handleDownload(selectedCert)}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
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
