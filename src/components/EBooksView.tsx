import React, { useState } from 'react';
import { BookOpen, Download, Eye, FileText, Sparkles, Check, Search } from 'lucide-react';
import { MOCK_EBOOKS } from '../data/mockData';

export const EBooksView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreview, setActivePreview] = useState<typeof MOCK_EBOOKS[0] | null>(null);

  const filteredBooks = MOCK_EBOOKS.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-[11px] font-mono-code text-indigo-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>KITE DIGITAL ROBOTICS LIBRARY</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Official E-Books & Lab Manuals
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Download comprehensive student guides, circuit wiring manuals, and competitive robotics handbooks developed by KITE engineers.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by topic, circuit type, or microcontroller..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div className="flex gap-4">
              {/* Book Thumbnail */}
              <div className="w-24 h-32 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 px-1 rounded bg-slate-900/90 text-[9px] font-mono-code text-slate-300">
                  PDF
                </span>
              </div>

              {/* Book Details */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {book.level}
                </span>
                <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors mt-1.5 leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {book.subtitle}
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono-code text-slate-400 mt-2">
                  <span>{book.pages} Pages</span>
                  <span>•</span>
                  <span>{book.fileSize}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{book.downloads} Reads</span>
                </div>
              </div>
            </div>

            {/* Topics Covered */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {book.topics.map((top, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300"
                  >
                    {top}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActivePreview(book)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => {
                    alert(`Starting download: "${book.title}.pdf" (${book.fileSize})`);
                  }}
                  className="py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono-code flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal Preview */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 relative shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono-code uppercase text-cyan-400 font-bold">
                  Digital Edition Preview
                </span>
                <h3 className="font-display font-extrabold text-lg text-white mt-0.5">
                  {activePreview.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Author: {activePreview.author}</p>
              </div>
              <button
                onClick={() => setActivePreview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>{activePreview.description}</p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono-code space-y-1.5">
                <div className="text-cyan-400 font-bold">Table of Contents Highlights:</div>
                <div className="text-slate-400">• Chapter 01: Core Architecture & Physical Sensors</div>
                <div className="text-slate-400">• Chapter 02: Schematics, Pinouts & Power Distribution</div>
                <div className="text-slate-400">• Chapter 03: Motor Drivers, PID Tuning & Real-Time Logic</div>
                <div className="text-slate-400">• Chapter 04: Troubleshooting, Oscilloscope Traces & Code</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setActivePreview(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading: "${activePreview.title}.pdf"`);
                  setActivePreview(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 font-mono-code"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full Manual ({activePreview.fileSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
