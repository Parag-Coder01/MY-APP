import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  CheckCircle2,
  Check,
  ShieldCheck,
  Copy,
  BookOpen,
  PhoneCall,
  Eye,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export type BookItemId =
  | 'ai-robotics-book'
  | 'ai-ml-guidebook'
  | 'assignments'
  | 'notes-dpp'
  | 'ebooks'
  | 'formulae-sets';

export interface BookItem {
  id: BookItemId;
  name: string; // Exact user text: "AI & Robotics Book", "AI/ML Guidebook", "Assignments", "Notes & D.P.P", "E-Books", "Formulae Sets"
  functionTitle: string; // The core function
  functionDescription: string; // Clean concise function explanation
  primaryFunctionPill: string;
  badgeLabel: string;
  themeColor: string;
  cardGradient: string;
  borderActive: string;
  glowAura: string;
  textAccent: string;
  chipBg: string;
  features: string[];
  sampleModules: string[];
  icon: React.ReactNode;
}

export const BOOK_ITEMS: BookItem[] = [
  {
    id: 'ai-robotics-book',
    name: 'AI & Robotics Book',
    functionTitle: 'Robotics Lab Textbook',
    functionDescription: 'Comprehensive, printed hardcover & digital academic textbook covering kinematics, autonomous rovers, sensor electronics, microcontrollers, and 50+ guided hands-on lab experiments.',
    primaryFunctionPill: 'Core Function: Laboratory Textbook',
    badgeLabel: 'ATL & School Curriculum',
    themeColor: '#00F0FF',
    cardGradient: 'from-cyan-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-cyan-400 shadow-[0_0_28px_rgba(0,240,255,0.3)] ring-2 ring-cyan-400/50',
    glowAura: 'from-cyan-500/25 via-sky-500/10 to-transparent',
    textAccent: 'text-cyan-300',
    chipBg: 'bg-cyan-950 text-cyan-300 border-cyan-500/50',
    features: [
      '184+ full-color pages with annotated wiring diagrams, circuit schematics & pinouts',
      'Step-by-step Arduino C++ and Python code walkthroughs with physical breadboard layouts',
      'Full alignment with CBSE Skill Education, ICSE Robotics & NITI Aayog ATL guidelines',
      'End-of-chapter practical hardware challenges, viva questions & troubleshooting tips',
    ],
    sampleModules: [
      'Ch 1: Kinematics & Mechanics of Wheeled Mobile Robots',
      'Ch 2: Sensor Interfacing (Ultrasonic, IR, Gyroscope & Accelerometer)',
      'Ch 3: Microcontroller Architecture & Embedded C++ Basics',
      'Ch 4: Autonomous Obstacle Avoidance & Line Maze Algorithms',
      'Ch 5: Motor Driver ICs (L298N/L293D) & Pulse Width Modulation (PWM)',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10" fill="none">
        <defs>
          <linearGradient id="book-ai-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="book-ai-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="100%" stopColor="#021E33" />
          </linearGradient>
        </defs>
        {/* Modern Hardcover Book Shell */}
        <rect x="10" y="7" width="28" height="34" rx="4" fill="url(#book-ai-bg)" stroke="url(#book-ai-g)" strokeWidth="2" />
        {/* Book Spine Bar */}
        <path d="M10 7H16V41H10V7Z" fill="#0284C7" fillOpacity="0.5" stroke="url(#book-ai-g)" strokeWidth="1.5" />
        {/* Clean Paper Edges */}
        <path d="M38 10H41V38H38" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" />
        {/* Robot Core Sensor Emblem */}
        <circle cx="27" cy="22" r="7" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.8" />
        <circle cx="27" cy="22" r="3.2" fill="#22D3EE" />
        <circle cx="28.5" cy="20.5" r="1.2" fill="#FFFFFF" />
        {/* Micro-Circuits from Core */}
        <path d="M27 15V11M27 29V33M20 22H16M34 22H37" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" />
        {/* Golden Ribbon Bookmark */}
        <path d="M32 7V16L29 13.5L26 16V7" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    id: 'ai-ml-guidebook',
    name: 'AI/ML Guidebook',
    functionTitle: 'Edge AI & Vision Manual',
    functionDescription: 'Visual, intuition-driven guide to artificial intelligence, computer vision, TensorFlow Lite, OpenCV lane detection, and running neural networks on microcontrollers.',
    primaryFunctionPill: 'Core Function: AI/ML Engineering Handbook',
    badgeLabel: 'Deep Tech & Edge TPU',
    themeColor: '#A855F7',
    cardGradient: 'from-purple-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-purple-400 shadow-[0_0_28px_rgba(168,85,247,0.3)] ring-2 ring-purple-400/50',
    glowAura: 'from-purple-500/25 via-indigo-500/10 to-transparent',
    textAccent: 'text-purple-300',
    chipBg: 'bg-purple-950 text-purple-300 border-purple-500/50',
    features: [
      'Intuitive visual breakdowns of neural networks, convolution filters & edge computing',
      'OpenCV Python scripts for real-time face detection, color tracking & autonomous rovers',
      'Deploying lightweight TensorFlow Lite models on ESP32, Raspberry Pi & Google Coral TPU',
      'Includes ready-to-run Jupyter notebooks, dataset links & model checkpoint files',
    ],
    sampleModules: [
      'Unit 1: Computer Vision Foundations & OpenCV Color Segmentation',
      'Unit 2: Real-time Face & Object Tracking with Haar Cascades',
      'Unit 3: Artificial Neural Networks (ANN) & Convolution Filters (CNN)',
      'Unit 4: Quantization & Deploying TFLite Models on Microcontrollers',
      'Unit 5: Autonomous Lane Following & Gesture-Controlled Robotic Rover',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10" fill="none">
        <defs>
          <linearGradient id="aiml-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="aiml-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E1065" />
            <stop offset="100%" stopColor="#14022F" />
          </linearGradient>
        </defs>
        {/* Guidebook Shell */}
        <rect x="10" y="7" width="28" height="34" rx="4" fill="url(#aiml-bg)" stroke="url(#aiml-g)" strokeWidth="2" />
        <path d="M10 7H16V41H10V7Z" fill="#7C3AED" fillOpacity="0.5" stroke="url(#aiml-g)" strokeWidth="1.5" />
        <path d="M38 10H41V38H38" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" />
        {/* Synaptic Neural Network Lattice */}
        <circle cx="22" cy="18" r="2.5" fill="#C084FC" />
        <circle cx="32" cy="18" r="2.5" fill="#C084FC" />
        <circle cx="27" cy="26" r="3" fill="#E879F9" />
        <circle cx="22" cy="33" r="2.5" fill="#A855F7" />
        <circle cx="32" cy="33" r="2.5" fill="#A855F7" />
        {/* Synapse Link Lines */}
        <line x1="22" y1="18" x2="27" y2="26" stroke="#C084FC" strokeWidth="1.6" />
        <line x1="32" y1="18" x2="27" y2="26" stroke="#C084FC" strokeWidth="1.6" />
        <line x1="27" y1="26" x2="22" y2="33" stroke="#A855F7" strokeWidth="1.6" />
        <line x1="27" y1="26" x2="32" y2="33" stroke="#A855F7" strokeWidth="1.6" />
        <circle cx="27" cy="26" r="6" stroke="#E879F9" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: 'assignments',
    name: 'Assignments',
    functionTitle: 'Lab Practice Worksheets',
    functionDescription: 'Graded hands-on assignment booklets with step-by-step laboratory challenge missions, circuit debugging worksheets, and algorithmic logic tasks.',
    primaryFunctionPill: 'Core Function: Graded Lab Worksheets',
    badgeLabel: 'Continuous Assessment',
    themeColor: '#38BDF8',
    cardGradient: 'from-blue-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-blue-400 shadow-[0_0_28px_rgba(56,189,248,0.3)] ring-2 ring-blue-400/50',
    glowAura: 'from-blue-500/25 via-sky-500/10 to-transparent',
    textAccent: 'text-blue-300',
    chipBg: 'bg-blue-950 text-blue-300 border-blue-500/50',
    features: [
      'Sequenced problem sets spanning Foundational, Intermediate, and Olympiad difficulty',
      'Fill-in circuit connection diagrams, timing tables & logic gate truth maps',
      'Teacher grading rubrics, scoring rubrics & step-by-step master solution keys',
      'Available in printable PDF booklets or LMS digital submission format',
    ],
    sampleModules: [
      'Task 1: Circuit Prototyping & Multimeter Voltage Drop Measurements',
      'Task 2: Logic Gate Breadboard Wiring & Truth Table Verification',
      'Task 3: C++ Loop Debugging & Hardware Interrupt Timing Exercises',
      'Task 4: Fault-Finding in Defective Line Tracker Schematics',
      'Task 5: End-of-Term Autonomous Hardware Capstone Assessment',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10" fill="none">
        <defs>
          <linearGradient id="asg-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="asg-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0B1938" />
          </linearGradient>
        </defs>
        {/* Modern Clipboard Shell */}
        <rect x="11" y="9" width="26" height="34" rx="4" fill="url(#asg-bg)" stroke="url(#asg-g)" strokeWidth="2" />
        {/* Top Metallic Clamp */}
        <rect x="18" y="6" width="12" height="6" rx="2" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1.5" />
        <circle cx="24" cy="9" r="1.2" fill="#FFFFFF" />
        {/* Crisp Task Item Rows */}
        <circle cx="16" cy="18" r="2.2" fill="#10B981" />
        <line x1="21" y1="18" x2="32" y2="18" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="25" r="2.2" fill="#10B981" />
        <line x1="21" y1="25" x2="30" y2="25" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="32" r="2.2" fill="#38BDF8" />
        <line x1="21" y1="32" x2="27" y2="32" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        {/* Golden A+ Distinction Seal */}
        <circle cx="34" cy="34" r="6" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.5" />
        <path d="M31.5 36.5L34 31.5L36.5 36.5M32.5 35H35.5" stroke="#000000" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'notes-dpp',
    name: 'Notes & D.P.P',
    functionTitle: 'Daily Practice & Notes',
    functionDescription: 'Curated daily practice problem sheets (D.P.P) and concise high-retention revision notes for mastering electronics, robotics, and embedded coding concepts.',
    primaryFunctionPill: 'Core Function: Daily Practice & Revision Notes',
    badgeLabel: 'Concept Reinforcement',
    themeColor: '#10B981',
    cardGradient: 'from-emerald-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-emerald-400 shadow-[0_0_28px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400/50',
    glowAura: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    textAccent: 'text-emerald-300',
    chipBg: 'bg-emerald-950 text-emerald-300 border-emerald-500/50',
    features: [
      '10 to 15 targeted daily practice questions per topic to build strong engineering muscle memory',
      'Bullet-point master revision notes summarizing circuits, sensor pins & syntax rules',
      'Detailed step-by-step mathematical & logic solutions provided for every single problem',
      'Component pinout cheat-sheets for Arduino Uno, ESP32, Raspberry Pi Pico & Motor Drivers',
    ],
    sampleModules: [
      'DPP 1: Resistor Color Bands, Series/Parallel Circuits & Ohm’s Calculations',
      'DPP 2: Transistor Switching States, H-Bridge Polarity & Motor Reversal',
      'DPP 3: Microcontroller Timers, Delay Interrupts & PWM Frequency Math',
      'DPP 4: Ultrasonic Signal Echo Flight Time & Distance Computation',
      'DPP 5: Comprehensive Rapid-Fire Exam Revision Mindmap Summary',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10" fill="none">
        <defs>
          <linearGradient id="dpp-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="dpp-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#02281E" />
          </linearGradient>
        </defs>
        {/* Spiral Notebook Page */}
        <rect x="12" y="8" width="27" height="34" rx="4" fill="url(#dpp-bg)" stroke="url(#dpp-g)" strokeWidth="2" />
        {/* Spiral Binding Loops */}
        <circle cx="12" cy="14" r="1.8" fill="#34D399" />
        <circle cx="12" cy="20" r="1.8" fill="#34D399" />
        <circle cx="12" cy="26" r="1.8" fill="#34D399" />
        <circle cx="12" cy="32" r="1.8" fill="#34D399" />
        <circle cx="12" cy="38" r="1.8" fill="#34D399" />
        {/* Clean Note Lines */}
        <line x1="18" y1="15" x2="33" y2="15" stroke="#6EE7B7" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="18" y1="21" x2="30" y2="21" stroke="#6EE7B7" strokeWidth="1.8" strokeLinecap="round" />
        {/* Target Bullseye for DPP Practice */}
        <circle cx="26" cy="30" r="6" stroke="#10B981" strokeWidth="1.6" />
        <circle cx="26" cy="30" r="3.5" stroke="#F59E0B" strokeWidth="1.4" />
        <circle cx="26" cy="30" r="1.5" fill="#EF4444" />
        {/* Neon Pen Tip */}
        <path d="M33 11L37 7L38 8L34 12Z" fill="#FDE047" />
      </svg>
    ),
  },
  {
    id: 'ebooks',
    name: 'E-Books',
    functionTitle: 'Digital Interactive PDFs',
    functionDescription: 'Modern digital interactive e-books with integrated circuit simulator links, video demonstration embeds, searchable indices, and cloud syncing.',
    primaryFunctionPill: 'Core Function: Digital E-Reader & Interactive PDF',
    badgeLabel: 'Instant Digital Access',
    themeColor: '#EC4899',
    cardGradient: 'from-pink-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-pink-400 shadow-[0_0_28px_rgba(236,72,153,0.3)] ring-2 ring-pink-400/50',
    glowAura: 'from-pink-500/25 via-rose-500/10 to-transparent',
    textAccent: 'text-pink-300',
    chipBg: 'bg-pink-950 text-pink-300 border-pink-500/50',
    features: [
      'Instant cloud streaming and offline encrypted PDF downloading for offline lab use',
      'Hyperlinked interactive Tinkercad / Wokwi circuits that open directly in-browser',
      'Responsive reflow design optimized for smartphones, tablets, laptops & interactive boards',
      'Institutional campus site license with unlimited simultaneous student readers',
    ],
    sampleModules: [
      'Interactive Feature 1: Embedded Wokwi Simulator Links for Zero-Setup Coding',
      'Interactive Feature 2: High-Resolution Pinch-to-Zoom Schematic Blueprints',
      'Interactive Feature 3: One-Click Source Code Copy directly into Arduino IDE',
      'Interactive Feature 4: Searchable Keyword Index & Highlight Annotations',
      'Interactive Feature 5: Cross-Platform Reader (Android, iOS, Windows, Mac & Web)',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10" fill="none">
        <defs>
          <linearGradient id="ebk-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          <linearGradient id="ebk-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A0423" />
            <stop offset="100%" stopColor="#1B020B" />
          </linearGradient>
        </defs>
        {/* Modern E-Reader Tablet Bezel */}
        <rect x="9" y="7" width="30" height="34" rx="4" fill="url(#ebk-bg)" stroke="url(#ebk-g)" strokeWidth="2" />
        <circle cx="24" cy="10" r="1" fill="#F472B6" />
        {/* Open Glowing Pages Inside Tablet Screen */}
        <path
          d="M14 18C18 16 22 17 24 19C26 17 30 16 34 18V31C30 29 26 30 24 32C22 30 18 29 14 31V18Z"
          fill="#831843"
          stroke="#F472B6"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <line x1="24" y1="19" x2="24" y2="32" stroke="#F472B6" strokeWidth="1.4" />
        {/* Digital Cloud Download Arrow */}
        <path d="M24 23V28M22 26L24 28L26 26" stroke="#FDE047" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="37" x2="28" y2="37" stroke="#F472B6" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'formulae-sets',
    name: 'Formulae Sets',
    functionTitle: 'Physics & Kinematics Sheets',
    functionDescription: 'Comprehensive, laminated quick-reference cheat sheets compiling essential electronics laws, Ohm’s formulas, robotic kinematics, motor torque, and pin configurations.',
    primaryFunctionPill: 'Core Function: Physics & Electronics Cheat Sheets',
    badgeLabel: 'Lab Bench Quick Reference',
    themeColor: '#F59E0B',
    cardGradient: 'from-amber-950/70 via-slate-900 to-slate-950',
    borderActive: 'border-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.3)] ring-2 ring-amber-400/50',
    glowAura: 'from-amber-500/25 via-orange-500/10 to-transparent',
    textAccent: 'text-amber-300',
    chipBg: 'bg-amber-950 text-amber-300 border-amber-500/50',
    features: [
      'Core electronics laws: V=IR, P=VI, capacitor charging time constants & resistor color codes',
      'Mechanical gear ratio calculations, torque multiplication & robotic rover velocity math',
      'Microcontroller timers, PWM duty cycles, analog ADC voltage conversion tables',
      'Waterproof, laminated bench cards designed for heavy everyday use in student laboratories',
    ],
    sampleModules: [
      'Card 1: Core Electronics Laws (V=IR, P=VI, Kirchhoff’s Current/Voltage Laws)',
      'Card 2: Mechanical Gear Train Ratios, Torque (T = F × r) & RPM Conversion',
      'Card 3: Differential Steering Kinematics, Turning Radius & Wheel Odometry',
      'Card 4: Embedded Clock Pre-scalers, ADC Resolutions (10-bit/12-bit) & PWM Math',
      'Card 5: Color Code Resistance Rings & SMT Code Quick Multiplier Chart',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-10 sm:h-10" fill="none">
        <defs>
          <linearGradient id="fml-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="fml-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#1C0A00" />
          </linearGradient>
        </defs>
        {/* Laminated Quick Reference Plate */}
        <rect x="9" y="8" width="30" height="32" rx="4" fill="url(#fml-bg)" stroke="url(#fml-g)" strokeWidth="2" />
        {/* Greek Omega Symbol (Ohm's Law Ω) */}
        <path
          d="M15 22H18C18 18 20 15 24 15C28 15 30 18 30 22H33"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Radical Square Root Sign √ */}
        <path d="M15 32L17 34L20 28H24" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Greek Pi Symbol π */}
        <path d="M26 28H33M28 28V33M31 28V33" stroke="#34D399" strokeWidth="1.6" strokeLinecap="round" />
        {/* Golden Corner Clip */}
        <path d="M33 8L39 14" stroke="#FBBF24" strokeWidth="2" />
      </svg>
    ),
  },
];

interface PartnerBooksExpandedProps {
  onClose: () => void;
  onOpenStore?: () => void;
  onOpenContact?: () => void;
}

export const PartnerBooksExpanded: React.FC<PartnerBooksExpandedProps> = ({
  onClose,
  onOpenStore,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<BookItemId>('ai-robotics-book');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showSampleIndex, setShowSampleIndex] = useState(false);

  const activeBook = BOOK_ITEMS.find((b) => b.id === selectedBookId) || BOOK_ITEMS[0];

  const handleCopySpec = (book: BookItem) => {
    const text = `KITE Robotics Academic Publications - ${book.name}\n\nCore Function:\n${book.functionDescription}\n\nKey Highlights:\n${book.features.join(
      '\n'
    )}\n\nInquiries & Sample Copies: ${COMPANY_INFO.phone} (${COMPANY_INFO.email})`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -8 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-4 pt-4 border-t border-slate-800/90 overflow-hidden"
    >
      <div className="rounded-3xl dark:bg-slate-950/95 bg-slate-900 border-2 border-cyan-500/50 p-4 sm:p-6 lg:p-7 shadow-2xl relative space-y-5 text-white">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500/15 blur-[100px] pointer-events-none" />

        {/* 1. Header Bar: Clean Title & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950/90 border border-cyan-500/60 text-cyan-400 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/20 shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-tight">
                  Academic Books & Curriculum Resources
                </h4>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  6 Core Publications
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-200/90 mt-0.5 font-medium">
                Tap on any curriculum title below to inspect its core academic function & content structure.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {onOpenStore && (
              <button
                type="button"
                onClick={onOpenStore}
                className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-mono-code font-semibold transition-all cursor-pointer"
              >
                <span>Curriculum Store →</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/90 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer shadow-xs active:scale-90"
              title="Close Books Spec"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 2. THE 6 BOOK ITEMS: Clean Logo + Exact Title + Function */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
          {BOOK_ITEMS.map((item) => {
            const isSelected = item.id === selectedBookId;

            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setSelectedBookId(item.id);
                  setShowSampleIndex(false);
                }}
                className={`group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl transition-all duration-300 text-center cursor-pointer select-none ${
                  isSelected
                    ? `bg-gradient-to-b ${item.cardGradient} ${item.borderActive} scale-[1.02]`
                    : 'bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 shadow-md'
                }`}
              >
                {/* Active Indicator Pulse Pip */}
                {isSelected && (
                  <span
                    className="absolute top-2 right-2 w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: item.themeColor }}
                  />
                )}
                {isSelected && (
                  <span
                    className="absolute top-2 right-2 w-2 h-2 rounded-full shadow-sm"
                    style={{ backgroundColor: item.themeColor }}
                  />
                )}

                {/* Clean, High-Contrast Luminous Logo Container */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-2 shrink-0 transition-transform duration-300 ${
                    isSelected
                      ? 'bg-slate-950 border border-white/20 shadow-lg scale-105'
                      : 'bg-slate-950/90 border border-slate-800/80 group-hover:border-slate-700 group-hover:scale-105'
                  }`}
                  style={isSelected ? { boxShadow: `0 0 24px ${item.themeColor}35` } : undefined}
                >
                  {item.icon}
                </div>

                {/* Title: Exactly As Requested by User */}
                <span
                  className={`font-display font-black text-xs sm:text-sm tracking-tight leading-tight mt-2.5 transition-colors ${
                    isSelected ? item.textAccent : 'text-white group-hover:text-cyan-200'
                  }`}
                >
                  {item.name}
                </span>

                {/* Clean Function Label */}
                <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-300/90 font-medium mt-1 line-clamp-1">
                  {item.functionTitle}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* 3. FUNCTION SPOTLIGHT (CLEAN & AMAZING UI/UX) */}
        <AnimatePresence mode="wait">
          {activeBook && (
            <motion.div
              key={activeBook.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900 to-slate-950 border-2 border-cyan-500/40 p-4 sm:p-6 shadow-xl relative overflow-hidden space-y-4"
            >
              {/* Dynamic Aura Glow behind active item */}
              <div
                className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br ${activeBook.glowAura} blur-[80px] pointer-events-none`}
              />

              {/* Header: Logo + Name + Clean Function Statement */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3.5 border-b border-slate-800 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950 border p-2 flex items-center justify-center shrink-0 shadow-lg"
                    style={{ borderColor: activeBook.themeColor, boxShadow: `0 0 20px ${activeBook.themeColor}30` }}
                  >
                    {activeBook.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                        {activeBook.name}
                      </h5>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider ${activeBook.chipBg}`}>
                        {activeBook.primaryFunctionPill}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-cyan-100 font-sans mt-1 leading-relaxed max-w-2xl">
                      {activeBook.functionDescription}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: Preview Table of Contents + Copy Function */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowSampleIndex((prev) => !prev)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-400 text-xs font-mono-code font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{showSampleIndex ? 'Hide Index ▲' : 'Table of Contents ▼'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopySpec(activeBook)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-400 text-xs font-mono-code font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer active:scale-95"
                  >
                    {copiedNotification ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Spec Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Function</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Table of Contents / Sample Modules Drawer */}
              <AnimatePresence>
                {showSampleIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2 relative z-10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono-code text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Sample Curriculum Index & Topic Outline:</span>
                      </span>
                      <span className="text-[10px] font-mono-code text-slate-400">
                        {activeBook.sampleModules.length} Structured Chapters
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {activeBook.sampleModules.map((mod, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center gap-2 font-mono-code"
                        >
                          <span className="w-5 h-5 rounded-md bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0 border border-cyan-500/30">
                            {idx + 1}
                          </span>
                          <span className="truncate">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Core Features: 4 Clean, Beautiful Function Cards */}
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] font-mono-code text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Curriculum Highlights & Academic Deliverables:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeBook.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-start gap-2.5 hover:border-cyan-500/40 transition-colors shadow-xs"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: activeBook.themeColor }}
                      />
                      <p className="text-xs text-slate-200 leading-snug font-sans">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact & Request Sample Line */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10">
                <div className="flex items-center gap-2 text-[11px] font-mono-code text-cyan-300/90">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Available as individual institution book sets, student bundle editions, and multi-user digital e-licenses.</span>
                </div>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-700 font-mono-code text-xs font-bold transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Request Sample Copy</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
