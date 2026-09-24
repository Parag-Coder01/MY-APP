import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileDown,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  Mail,
  Phone,
  BookOpen
} from 'lucide-react';
import { KITE_PDF_CATALOG, PDF_SUMMARY } from '../data/kitePdfData';
import { generateAndDownloadKitePdf } from '../utils/pdfGenerator';

interface StemKitsPdfViewerProps {
  onClose: () => void;
  onOpenContact?: () => void;
}

export const StemKitsPdfViewer: React.FC<StemKitsPdfViewerProps> = ({
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const totalPages = 9;

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      generateAndDownloadKitePdf();
    } catch (e) {
      console.error('Error generating PDF:', e);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 800);
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  // Components mapped by page from official KITE PDF document
  const getPageData = (pageNum: number) => {
    switch (pageNum) {
      case 2:
        return {
          title: 'BASIC COMPONENTS',
          part: 'PART 1 OF 2',
          sub: 'Standard Passive, Switching & Circuit Prototyping Essentials',
          items: KITE_PDF_CATALOG[0].items,
        };
      case 3:
        return {
          title: 'SENSORS & DETECTION MODULES',
          part: 'PART 1 OF 2',
          sub: 'Environmental, Barometric, Flammable Gas, Distance & Motion Sensing',
          items: KITE_PDF_CATALOG[1].items.filter((item) => item.page === 3),
        };
      case 4:
        return {
          title: 'SENSORS & DETECTION MODULES',
          part: 'PART 2 OF 2',
          sub: 'Gesture, Optical IR, RFID, Fingerprint, Load Cell & 9-Axis IMU',
          items: KITE_PDF_CATALOG[1].items.filter((item) => item.page === 4),
        };
      case 5:
        return {
          title: 'MOTORS & ACTUATORS',
          part: 'PART 1 OF 2',
          sub: 'Continuous Servos, NEMA Steppers, Worm Gear, Linear Actuators & BLDC',
          items: KITE_PDF_CATALOG[2].items.filter((item) => item.page === 5),
        };
      case 6:
        return {
          title: 'MOTORS, ACTUATORS & MOTOR DRIVERS',
          part: 'PART 2 OF 2',
          sub: 'Grippers, Solenoids, L298N, TB6612, BTS7960, Stepper Drivers & ESCs',
          items: [
            ...KITE_PDF_CATALOG[2].items.filter((item) => item.page === 6),
            ...KITE_PDF_CATALOG[3].items.filter((item) => item.page === 6),
          ],
        };
      case 7:
        return {
          title: 'MICROCONTROLLERS & POWER ELECTRONICS',
          part: 'BOARDS & POWER',
          sub: 'Buck/Boost, BMS, Arduino Nano/Mega, ESP32, RP2040 Pico, STM32 & Pi',
          items: [
            ...KITE_PDF_CATALOG[3].items.filter((item) => item.page === 7),
            ...KITE_PDF_CATALOG[4].items.filter((item) => item.page === 7),
          ],
        };
      case 8:
        return {
          title: 'DISPLAYS & ROBOTICS MECHANICAL SYSTEMS',
          part: 'DISPLAYS & MECH 1',
          sub: 'OLED, LCD, Touchscreens, Keypads, Robotic Arm Assemblies & Grippers',
          items: [
            ...KITE_PDF_CATALOG[5].items.filter((item) => item.page === 8),
            ...KITE_PDF_CATALOG[6].items.filter((item) => item.page === 8),
          ],
        };
      case 9:
        return {
          title: 'ROBOTICS MECHANICAL COMPONENTS',
          part: 'MECHANICAL 2 & 3',
          sub: 'Timing Belts, Omni Wheels, Mecanum Wheels, Tracks, Rails & Drag Chains',
          items: KITE_PDF_CATALOG[6].items.filter((item) => item.page === 9),
        };
      default:
        return null;
    }
  };

  const activePageData = getPageData(currentPage);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -16 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -16 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden pt-3 sm:pt-5 pb-3"
    >
      <div className="rounded-3xl bg-slate-950/95 border-2 border-cyan-500/50 p-3.5 sm:p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-4 ring-1 ring-cyan-400/25">
        
        {/* Top Control Bar: PDF info, Download PDF button & Close */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/90 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-400/50 flex items-center justify-center shrink-0 shadow-md">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base sm:text-lg text-white">
                  KITE ROBOTICS: THE KITS AND COMPONENTS WE USE
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold uppercase hidden md:inline-block">
                  Official PDF Document
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Full brochure pages with all 100+ hardware components, sensors, microcontrollers & mechanical parts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-display font-black text-xs uppercase tracking-wide flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <FileDown className="w-4 h-4 text-slate-950" />
              <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            {/* Close PDF View */}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-red-950/70 text-slate-300 hover:text-red-400 border border-slate-700/80 hover:border-red-500/50 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code font-bold active:scale-95"
              title="Close PDF view"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Page Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2.5 px-3 relative z-10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevPage}
              className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-mono-code font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span>Prev</span>
            </button>

            <span className="font-mono-code text-xs font-bold text-white px-2">
              Page <span className="text-cyan-400">{currentPage}</span> of {totalPages}
            </span>

            <button
              type="button"
              onClick={nextPage}
              className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-mono-code font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Jump-to Page Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pNum) => (
              <button
                key={pNum}
                type="button"
                onClick={() => setCurrentPage(pNum)}
                className={`px-2.5 py-1 rounded-lg font-mono-code text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pNum
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                P.{pNum}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PDF DOCUMENT CANVAS (Displays the PDF pages as they are)                 */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex justify-center">
          <div className="w-full max-w-4xl">
            <AnimatePresence mode="wait">
              {currentPage === 1 ? (
                /* ========================================================== */
                /* PAGE 1: COVER PAGE HERO                                   */
                /* ========================================================== */
                <motion.div
                  key="page-1"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-gradient-to-b from-[#0b1329] via-[#091124] to-[#040814] border-2 border-cyan-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-7"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-cyan-400 to-blue-600" />

                  {/* Tagline */}
                  <div className="space-y-1 pt-1">
                    <h2 className="font-display font-black text-lg sm:text-2xl text-orange-400 tracking-tight uppercase">
                      INNOVATE TODAY.
                    </h2>
                    <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                      TRANSFORM TOMORROW.
                    </h1>
                    <h2 className="font-display font-black text-lg sm:text-2xl text-cyan-400 tracking-tight uppercase">
                      INSPIRE GENERATIONS.
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans pt-1">
                      Empowering Minds. Building Futures. Through Robotics, STEM & AI.
                    </p>
                  </div>

                  {/* Center PDF Title Box */}
                  <div className="max-w-md mx-auto p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-400/40 shadow-2xl shadow-cyan-950/60 relative">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-xl shadow-cyan-500/30 mb-2">
                      <Sparkles className="w-7 h-7 text-slate-950" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter">
                        KITE
                      </h3>
                      <h4 className="font-display font-extrabold text-xl text-orange-400 tracking-widest uppercase">
                        ROBOTICS
                      </h4>
                      <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-mono-code pt-1">
                        <span className="w-8 h-px bg-slate-700" />
                        <span>THE</span>
                        <span className="w-8 h-px bg-slate-700" />
                      </div>
                      <h5 className="font-display font-black text-lg sm:text-xl text-white tracking-wide uppercase pt-1">
                        KITS AND COMPONENTS
                      </h5>
                      <h5 className="font-display font-black text-lg sm:text-xl text-cyan-400 tracking-wide uppercase">
                        WE USE
                      </h5>
                    </div>
                  </div>

                  {/* 4 Pillars */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-left max-w-3xl mx-auto">
                    {PDF_SUMMARY.pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800"
                      >
                        <span className="font-display font-black text-xs sm:text-sm text-cyan-300 uppercase tracking-wider">
                          {pillar.title}
                        </span>
                        <p className="text-[11px] font-sans text-slate-300 mt-1 leading-snug">
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Contact Info Footer Bar */}
                  <div className="max-w-2xl mx-auto pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-around gap-2 text-xs font-mono-code text-slate-300">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      {PDF_SUMMARY.contact.website}
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      {PDF_SUMMARY.contact.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      +91 {PDF_SUMMARY.contact.phone}
                    </span>
                  </div>

                  {/* Quick Action Button */}
                  <div className="pt-1 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentPage(2)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-black text-xs uppercase tracking-wide inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
                    >
                      <span>View Page 2: Components</span>
                      <ChevronRight className="w-4 h-4 text-slate-950" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs uppercase tracking-wide inline-flex items-center gap-2 border border-slate-700 cursor-pointer active:scale-95 transition-all"
                    >
                      <FileDown className="w-4 h-4 text-cyan-400" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ========================================================== */
                /* PAGES 2 - 9: COMPONENT CATALOG SHEETS                     */
                /* ========================================================== */
                <motion.div
                  key={`page-${currentPage}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-slate-900/90 border-2 border-slate-800 p-4 sm:p-7 shadow-2xl relative space-y-5"
                >
                  {/* Page Top Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-display font-black text-cyan-300 text-sm">
                        {currentPage}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-base sm:text-lg text-white">
                            {activePageData?.title}
                          </span>
                          {activePageData?.part && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                              {activePageData.part}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-sans">
                          {activePageData?.sub}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono-code font-bold text-cyan-400 self-end sm:self-center">
                      PAGE {currentPage} OF 9
                    </span>
                  </div>

                  {/* Component Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activePageData?.items?.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-1.5 group"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono-code">
                          <span className="font-bold text-cyan-400">
                            #{idx + 1} • {item.category}
                          </span>
                          <span className="text-slate-500 font-bold">P.{item.page}</span>
                        </div>

                        <div>
                          <h4 className="font-display font-black text-sm text-white group-hover:text-cyan-200 transition-colors leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono-code text-slate-500">
                          <span>Verified Lab Component</span>
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accentColor }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Page Bottom Navigation Buttons */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevPage}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono-code font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-cyan-400" />
                      <span>Previous Page</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-display font-black uppercase tracking-wide flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={nextPage}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono-code font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next Page</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
