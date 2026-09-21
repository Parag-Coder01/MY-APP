import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  ShoppingBag,
  Calendar,
  School,
  PhoneCall,
  Cpu,
  Printer,
  FlaskConical,
  Award,
  Star,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal,
  Globe,
  Smartphone,
  Database,
  GraduationCap,
  Laptop,
  X,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { Course, Product, UserProfile, MainTab, ExtendedView } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { AnimatedCounter } from './AnimatedCounter';

interface HomeViewProps {
  user: UserProfile;
  courses: Course[];
  products: Product[];
  onSelectTab: (tab: MainTab) => void;
  onSelectExtendedView: (view: ExtendedView) => void;
  onSelectCourse: (course: Course) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onOpenStudentDashboard: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  courses,
  products,
  onSelectTab,
  onSelectExtendedView,
  onSelectCourse,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onOpenStudentDashboard,
}) => {
  const [showITServicesModal, setShowITServicesModal] = useState(false);

  const ecosystemCards = [
    {
      title: 'Robotics & AI',
      desc: 'Autonomous rovers, computer vision & edge AI algorithms',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      action: () => onSelectTab('learn'),
      badge: 'Core Program',
      accentColor: 'group-hover:border-cyan-500/50',
      iconBg: 'dark:bg-cyan-950/60 bg-cyan-100/80 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'STEM Education',
      desc: 'Hands-on experiential learning kits for ages 8–18',
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
      action: () => onSelectTab('learn'),
      badge: 'NEP 2020',
      accentColor: 'group-hover:border-blue-500/50',
      iconBg: 'dark:bg-blue-950/60 bg-blue-100/80 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'IoT & Automation',
      desc: 'ESP32 microcontrollers, smart sensors & MQTT cloud systems',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      action: () => onSelectTab('learn'),
      badge: 'Connected',
      accentColor: 'group-hover:border-amber-500/50',
      iconBg: 'dark:bg-amber-950/60 bg-amber-100/80 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Workshops & Camps',
      desc: 'ROBOZEST 2026 championships & weekend innovation intensives',
      icon: <Calendar className="w-5 h-5 text-emerald-400" />,
      action: () => onSelectExtendedView('workshops'),
      badge: 'Events',
      accentColor: 'group-hover:border-emerald-500/50',
      iconBg: 'dark:bg-emerald-950/60 bg-emerald-100/80 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: '3D Prototyping',
      desc: 'Mechanical CAD modeling, additive manufacturing & slicer lab',
      icon: <Printer className="w-5 h-5 text-pink-400" />,
      action: () => onSelectTab('learn'),
      badge: 'Hardware',
      accentColor: 'group-hover:border-pink-500/50',
      iconBg: 'dark:bg-pink-950/60 bg-pink-100/80 text-pink-600 dark:text-pink-400',
    },
    {
      title: 'R&D Innovation',
      desc: 'Custom robotics hardware engineering for educational partners',
      icon: <FlaskConical className="w-5 h-5 text-purple-400" />,
      action: () => onSelectExtendedView('schools'),
      badge: 'Research',
      accentColor: 'group-hover:border-purple-500/50',
      iconBg: 'dark:bg-purple-950/60 bg-purple-100/80 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'ATL Setup & Labs',
      desc: 'Comprehensive Atal Tinkering Lab equipment, training & setup',
      icon: <School className="w-5 h-5 text-amber-400" />,
      action: () => onSelectExtendedView('schools'),
      badge: 'Government Ready',
      accentColor: 'group-hover:border-amber-500/50',
      iconBg: 'dark:bg-amber-950/60 bg-amber-100/80 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Mentor Network',
      desc: 'Dedicated robotics faculty, mentor training & lab certification',
      icon: <Award className="w-5 h-5 text-indigo-400" />,
      action: () => onSelectExtendedView('contact'),
      badge: 'Support',
      accentColor: 'group-hover:border-indigo-500/50',
      iconBg: 'dark:bg-indigo-950/60 bg-indigo-100/80 text-indigo-600 dark:text-indigo-400',
    },
  ];

  const quickPrompts = [
    { label: 'Fix Arduino sensor code', query: 'Help me debug Arduino C++ code for an ultrasonic sensor' },
    { label: 'ESP32 WiFi IoT setup', query: 'How to connect ESP32 to WiFi and send data over MQTT' },
    { label: 'L298N Motor Driver wiring', query: 'Show me the wiring schematic for L298N motor driver with Arduino' },
    { label: '3D print slicer tips', query: 'What are the optimal slicer infill and speed settings for robotics gears?' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* 1. Greeting & User Quick Progress Strip */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:bg-slate-900/70 bg-white p-4 sm:p-5 rounded-2xl border dark:border-slate-800 border-slate-200/80 shadow-sm backdrop-blur-sm transition-colors">
        <div>
          <div className="text-[11px] font-mono-code dark:text-cyan-400 text-cyan-600 flex items-center gap-2 uppercase tracking-wider font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>KITE Robotics Active Ecosystem</span>
          </div>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl dark:text-white text-slate-900 mt-1 tracking-tight">
            Welcome, {user.name}
          </h1>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">
            Role: <span className="dark:text-slate-200 text-slate-800 capitalize font-medium">{user.role}</span> • Ready to build something intelligent today?
          </p>
        </div>

        {/* Learning progress tracker trigger with dynamic numbers */}
        <button
          onClick={onOpenStudentDashboard}
          className="flex items-center justify-between sm:justify-end gap-3 px-4 py-2.5 rounded-xl dark:bg-slate-950/80 bg-slate-50 border dark:border-cyan-800/40 border-slate-200 hover:border-cyan-500/60 transition-all text-left group shadow-sm active:scale-98"
        >
          <div>
            <div className="text-[11px] font-mono-code dark:text-slate-400 text-slate-500">My Learning Tracker</div>
            <div className="text-xs font-bold dark:text-cyan-300 text-cyan-700 group-hover:text-cyan-500 flex items-center gap-1.5 mt-0.5">
              <span>Robotics</span>
              <AnimatedCounter target={72} suffix="%" duration={1200} delay={300} className="dark:text-cyan-300 text-cyan-600" />
              <span className="text-slate-400">• Arduino</span>
              <AnimatedCounter target={45} suffix="%" duration={1200} delay={500} className="dark:text-amber-300 text-amber-600" />
            </div>
          </div>
          <div className="p-2 rounded-lg dark:bg-cyan-500/15 bg-cyan-100 text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </section>

      {/* 2. Refined High-Tech Hero Card */}
      <section className="relative rounded-3xl overflow-hidden border dark:border-cyan-900/40 border-slate-200/80 bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-8 lg:p-9 shadow-xl">
        {/* Glow ambient background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-[11px] font-mono-code text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>KITE ROBOTICS • NATIONAL STEM ECOSYSTEM</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            Preparing You For The Future
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Hands-on learning in Robotics, AI & IoT. Build real-world autonomous rovers, smart sensor stations, and computer vision systems with certified kits.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onSelectTab('learn')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('store')}
              className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-medium text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Explore Kits</span>
            </button>
          </div>

          {/* Dynamic metric stamps with delay & smooth progression */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800/80 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-display font-extrabold text-cyan-400">
                <AnimatedCounter target={25000} suffix="+" duration={1600} delay={150} />
              </div>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5">Students Mentored</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-display font-extrabold text-amber-400">
                <AnimatedCounter target={120} suffix="+" duration={1400} delay={300} />
              </div>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5">Schools & Labs</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-display font-extrabold text-emerald-400">
                <AnimatedCounter target={45} suffix="+" duration={1300} delay={450} />
              </div>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5">ATL Labs Setup</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Direct Portals / Quick Actions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base sm:text-lg dark:text-white text-slate-900">
            Quick Actions
          </h3>
          <span className="text-xs font-mono-code dark:text-slate-400 text-slate-500">Direct Portals</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {/* 1. Courses */}
          <button
            onClick={() => onSelectTab('learn')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl dark:bg-cyan-950/60 bg-cyan-100 text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold dark:text-slate-200 text-slate-800">Courses</span>
          </button>

          {/* 2. Robotics Kits */}
          <button
            onClick={() => onSelectTab('store')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl dark:bg-blue-950/60 bg-blue-100 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold dark:text-slate-200 text-slate-800">Robotics Kits</span>
          </button>

          {/* 3. Workshops */}
          <button
            onClick={() => onSelectExtendedView('workshops')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl dark:bg-amber-950/60 bg-amber-100 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold dark:text-slate-200 text-slate-800">Workshops</span>
          </button>

          {/* 4. KMS-AI */}
          <button
            onClick={() => onSelectTab('kms-ai')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-0.5 relative cursor-pointer"
          >
            <span className="absolute top-1.5 right-1.5 px-1 rounded text-[9px] font-mono-code bg-cyan-500 text-slate-950 font-bold">
              AI
            </span>
            <div className="p-2.5 rounded-xl dark:bg-gradient-to-tr dark:from-cyan-950 dark:to-blue-950 bg-cyan-100 text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold dark:text-slate-200 text-slate-800">KMS-AI</span>
          </button>

          {/* 5. IT Services */}
          <button
            id="portal-it-services-btn"
            onClick={() => setShowITServicesModal(true)}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-indigo-500/40 border-indigo-200 hover:border-indigo-500 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-0.5 relative cursor-pointer ring-1 ring-indigo-500/20"
            aria-label="Explore IT Services: Website, App, ERP, LMS"
          >
            <span className="absolute top-1.5 right-1.5 px-1 rounded text-[9px] font-mono-code bg-indigo-600 text-white font-bold animate-pulse">
              NEW
            </span>
            <div className="p-2.5 rounded-xl dark:bg-indigo-950/70 bg-indigo-100 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
              <Laptop className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold dark:text-indigo-300 text-indigo-900">IT Services</span>
          </button>

          {/* 6. Schools & ATL */}
          <button
            onClick={() => onSelectExtendedView('schools')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="p-2.5 rounded-xl dark:bg-purple-950/60 bg-purple-100 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
              <School className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold dark:text-slate-200 text-slate-800">Schools & ATL</span>
          </button>
        </div>
      </section>

      {/* 4. KMS-AI Interactive Hardware Copilot Spotlight */}
      <section className="relative rounded-3xl overflow-hidden border dark:border-cyan-500/40 border-cyan-300 dark:bg-gradient-to-r dark:from-cyan-950/60 dark:via-slate-900 dark:to-blue-950/60 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-6 sm:p-7 shadow-lg transition-colors">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full dark:bg-cyan-500/20 bg-cyan-100 dark:text-cyan-300 text-cyan-800 text-[11px] font-mono-code border dark:border-cyan-500/30 border-cyan-300">
              <Sparkles className="w-3 h-3 dark:text-cyan-400 text-cyan-600" />
              <span>INTELLIGENT HARDWARE COPILOT</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl dark:text-white text-slate-900">
              KMS-AI Assistant
            </h3>
            <p className="dark:text-slate-300 text-slate-600 text-xs sm:text-sm leading-relaxed">
              Debug Arduino & ESP32 C++ sketches, calculate motor driver voltages, troubleshoot ultrasonic sensor pinouts, or generate circuit wiring guides instantly.
            </p>

            {/* Quick interactive prompt chips */}
            <div className="pt-2 flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTab('kms-ai')}
                  className="px-2.5 py-1 rounded-lg dark:bg-slate-900/80 bg-white border dark:border-cyan-800/40 border-slate-300 hover:border-cyan-500 text-[11px] dark:text-cyan-300 text-slate-700 hover:text-cyan-600 flex items-center gap-1.5 transition-all shadow-2xs active:scale-95"
                >
                  <Zap className="w-3 h-3 text-cyan-500" />
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectTab('kms-ai')}
            className="px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/25 shrink-0 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch KMS-AI</span>
          </button>
        </div>
      </section>

      {/* 5. Explore Our Ecosystem */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg dark:text-white text-slate-900">
              Explore Our Ecosystem
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600">Comprehensive hardware, curriculum and lab infrastructure</p>
          </div>
          <button
            onClick={() => onSelectExtendedView('about')}
            className="text-xs text-cyan-500 hover:underline font-mono-code flex items-center gap-1 cursor-pointer"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ecosystemCards.map((card, idx) => (
            <button
              key={idx}
              onClick={card.action}
              className={`p-4 rounded-2xl dark:bg-slate-900/70 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-slate-400 dark:hover:border-slate-600 text-left transition-all group active:scale-[0.98] flex flex-col justify-between shadow-2xs hover:shadow-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                  {card.icon}
                </div>
                <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded-full dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-600">
                  {card.badge}
                </span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base dark:text-white text-slate-900 group-hover:text-cyan-500 transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Featured Programs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg dark:text-white text-slate-900">
              Featured Programs
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600">Structured curricula designed by veteran robotics educators</p>
          </div>
          <button
            onClick={() => onSelectTab('learn')}
            className="text-xs text-cyan-500 hover:underline font-mono-code flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-600 dark:hover:border-slate-700 transition-all group shadow-sm"
            >
              {/* Course Thumbnail */}
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 text-[10px] font-mono-code font-semibold text-cyan-400 border border-slate-700 backdrop-blur-sm">
                  {course.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-slate-200">
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/60">
                    {course.level}
                  </span>
                  <span className="text-slate-300 font-mono-code">{course.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base dark:text-white text-slate-900 group-hover:text-cyan-500 transition-colors line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-xs dark:text-slate-400 text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t dark:border-slate-800/80 border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-mono-code">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <AnimatedCounter target={course.rating} decimals={1} suffix="" duration={1000} delay={100} />
                    <span className="dark:text-slate-500 text-slate-400">
                      (<AnimatedCounter target={course.reviewsCount} suffix=" reviews" duration={1200} delay={200} />)
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="px-3.5 py-1.5 rounded-lg dark:bg-cyan-500/15 bg-cyan-100 hover:bg-cyan-500 dark:text-cyan-400 text-cyan-800 hover:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Program
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Robotics Store Showcase */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg dark:text-white text-slate-900">
              Robotics Store
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600">
              Authentic STEM hardware kits • Over <AnimatedCounter target={1250} suffix="+" duration={1500} className="text-cyan-500 font-bold" /> kits delivered across India
            </p>
          </div>
          <button
            onClick={() => onSelectTab('store')}
            className="text-xs text-cyan-500 hover:underline font-mono-code flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.slice(0, 5).map((prod) => (
            <div
              key={prod.id}
              className="rounded-2xl dark:bg-slate-900/70 bg-white border dark:border-slate-800 border-slate-200 p-3 flex flex-col justify-between hover:border-slate-600 dark:hover:border-slate-700 transition-all group shadow-2xs hover:shadow-sm"
            >
              <div>
                <div
                  onClick={() => onSelectProduct(prod)}
                  className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {prod.badge && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold bg-cyan-500 text-slate-950">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="mt-2.5">
                  <div className="text-[10px] text-cyan-500 font-mono-code uppercase font-semibold">{prod.category}</div>
                  <h5
                    onClick={() => onSelectProduct(prod)}
                    className="font-display font-semibold text-xs sm:text-sm dark:text-white text-slate-900 line-clamp-2 mt-0.5 hover:text-cyan-500 cursor-pointer"
                  >
                    {prod.name}
                  </h5>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t dark:border-slate-800 border-slate-100">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm sm:text-base font-bold dark:text-white text-slate-900 font-mono-code">₹{prod.price}</span>
                  <span className="text-[10px] dark:text-slate-500 text-slate-400 line-through font-mono-code">₹{prod.originalPrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <button
                    onClick={() => onAddToCart(prod)}
                    title="Add to Cart"
                    className="py-1.5 rounded-lg dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 text-[11px] font-medium flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onBuyNow(prod)}
                    className="py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Flagship ROBOZEST Banner */}
      <section className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-950 text-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg">
        <div className="max-w-xl">
          <div className="text-xs font-mono-code text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
            <Award className="w-4 h-4" />
            <span>ANNUAL FLAGSHIP CHAMPIONSHIP</span>
          </div>
          <h4 className="font-display font-extrabold text-lg sm:text-xl text-white mt-1.5">
            ROBOZEST 2026 — Honoring Dr. APJ Abdul Kalam
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            National robotics arena challenges across <AnimatedCounter target={15} suffix="+" duration={1200} className="text-amber-400 font-bold" /> zonal hubs, autonomous maze solving, line tracking sprint, and innovation exhibition uniting over <AnimatedCounter target={5000} suffix="+" duration={1500} className="text-amber-400 font-bold" /> young inventors.
          </p>
        </div>
        <button
          onClick={() => onSelectExtendedView('workshops')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          Explore ROBOZEST
        </button>
      </section>

      {/* 9. IT Services Modal (Triggered by Direct Portal Option) */}
      <AnimatePresence>
        {showITServicesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowITServicesModal(false)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-200 p-5 sm:p-7 shadow-2xl space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b dark:border-slate-800 border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full dark:bg-indigo-950/80 bg-indigo-100 border dark:border-indigo-800/60 border-indigo-200 text-[11px] font-mono-code dark:text-indigo-300 text-indigo-700 font-bold mb-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>KITE DIGITAL ENGINEERING & IT SOLUTIONS</span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl dark:text-white text-slate-900">
                    IT Services Suite
                  </h3>
                  <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1">
                    Specialized software engineering for educational institutions, Atal Tinkering Labs, and tech companies:
                  </p>
                </div>

                <button
                  onClick={() => setShowITServicesModal(false)}
                  className="p-2 rounded-xl dark:bg-slate-900 bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4 IT Services Grid (Website, App, ERP, LMS) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Website */}
                <div className="p-4 sm:p-5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl dark:bg-cyan-950/70 bg-cyan-100 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full dark:bg-cyan-950 dark:text-cyan-300 text-cyan-800 border dark:border-cyan-800 border-cyan-200">
                        Next.js & React
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base dark:text-white text-slate-900">
                      Website Development
                    </h4>
                    <p className="text-xs dark:text-slate-300 text-slate-600 mt-1 leading-relaxed">
                      Custom, ultra-fast web portals, admission inquiry engines, and institutional platforms with SEO scores exceeding 95+.
                    </p>

                    <div className="mt-3 space-y-1.5 text-[11px] dark:text-slate-400 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Responsive UI for Mobile & Desktop</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Headless CMS for effortless updates</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Domain, SSL & Cloudflare protection</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowITServicesModal(false);
                      onSelectExtendedView('it-services');
                    }}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-600 dark:text-cyan-400 hover:text-slate-950 text-xs font-bold font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Website Details & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. App */}
                <div className="p-4 sm:p-5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-blue-500/50 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl dark:bg-blue-950/70 bg-blue-100 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full dark:bg-blue-950 dark:text-blue-300 text-blue-800 border dark:border-blue-800 border-blue-200">
                        iOS & Android
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base dark:text-white text-slate-900">
                      Mobile App Development
                    </h4>
                    <p className="text-xs dark:text-slate-300 text-slate-600 mt-1 leading-relaxed">
                      Cross-platform mobile applications with real-time Bluetooth Low Energy (BLE) & Wi-Fi hardware controller drivers.
                    </p>

                    <div className="mt-3 space-y-1.5 text-[11px] dark:text-slate-400 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Flutter & React Native cross-platform</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Direct IoT & Robotics hardware telemetry</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>App Store & Google Play Store publishing</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowITServicesModal(false);
                      onSelectExtendedView('it-services');
                    }}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-600 dark:text-blue-400 hover:text-slate-950 text-xs font-bold font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>App Details & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. ERP */}
                <div className="p-4 sm:p-5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl dark:bg-amber-950/70 bg-amber-100 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full dark:bg-amber-950 dark:text-amber-300 text-amber-800 border dark:border-amber-800 border-amber-200">
                        School & Lab Ops
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base dark:text-white text-slate-900">
                      ERP Systems
                    </h4>
                    <p className="text-xs dark:text-slate-300 text-slate-600 mt-1 leading-relaxed">
                      Custom ERP automating Atal Tinkering Lab equipment inventory, barcode scanning, student admissions, and fee billing.
                    </p>

                    <div className="mt-3 space-y-1.5 text-[11px] dark:text-slate-400 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>ATL Hardware Lab inventory & Barcodes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Student & Faculty attendance registers</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Fee receipts, GST invoices & notifications</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowITServicesModal(false);
                      onSelectExtendedView('it-services');
                    }}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-slate-950 text-xs font-bold font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>ERP Details & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4. LMS */}
                <div className="p-4 sm:p-5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-200 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl dark:bg-emerald-950/70 bg-emerald-100 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full dark:bg-emerald-950 dark:text-emerald-300 text-emerald-800 border dark:border-emerald-800 border-emerald-200">
                        E-Learning Platform
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base dark:text-white text-slate-900">
                      LMS (Learning Management)
                    </h4>
                    <p className="text-xs dark:text-slate-300 text-slate-600 mt-1 leading-relaxed">
                      Interactive STEM learning management system featuring video lessons, circuit sandboxes, and cryptographic digital certificates.
                    </p>

                    <div className="mt-3 space-y-1.5 text-[11px] dark:text-slate-400 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Video lessons with adaptive CDN streaming</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Interactive coding & circuit assignments</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Automated QR verifiable certificate issuance</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowITServicesModal(false);
                      onSelectExtendedView('it-services');
                    }}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-slate-950 text-xs font-bold font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>LMS Details & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t dark:border-slate-800 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs dark:text-slate-400 text-slate-600 flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Direct Tech Support: <a href={`tel:${COMPANY_INFO.phone}`} className="font-mono-code font-bold hover:underline">{COMPANY_INFO.phone}</a></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowITServicesModal(false)}
                    className="px-4 py-2 rounded-xl dark:bg-slate-900 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowITServicesModal(false);
                      onSelectExtendedView('it-services');
                    }}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Open Full IT Services Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
