import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen, ShoppingBag, Calendar, School, PhoneCall, Cpu, Wrench, Printer, FlaskConical, Award, Star, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { Course, Product, UserProfile, MainTab, ExtendedView } from '../types';
import { COMPANY_INFO } from '../data/mockData';

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
  const ecosystemCards = [
    {
      title: 'Robotics & AI',
      desc: 'Autonomous rovers, computer vision & edge AI',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      action: () => onSelectTab('learn'),
      color: 'from-cyan-950/40 to-slate-900',
      border: 'border-cyan-800/40',
    },
    {
      title: 'STEM Education',
      desc: 'Hands-on experiential learning for ages 8–18',
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
      action: () => onSelectTab('learn'),
      color: 'from-blue-950/40 to-slate-900',
      border: 'border-blue-800/40',
    },
    {
      title: 'IoT & Automation',
      desc: 'ESP32, smart sensors & MQTT cloud systems',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      action: () => onSelectTab('learn'),
      color: 'from-amber-950/40 to-slate-900',
      border: 'border-amber-800/40',
    },
    {
      title: 'Workshops',
      desc: 'ROBOZEST 2026 & weekend innovation camps',
      icon: <Calendar className="w-5 h-5 text-emerald-400" />,
      action: () => onSelectExtendedView('workshops'),
      color: 'from-emerald-950/40 to-slate-900',
      border: 'border-emerald-800/40',
    },
    {
      title: '3D Printing',
      desc: 'Rapid mechanical prototyping & CAD design',
      icon: <Printer className="w-5 h-5 text-pink-400" />,
      action: () => onSelectTab('learn'),
      color: 'from-pink-950/40 to-slate-900',
      border: 'border-pink-800/40',
    },
    {
      title: 'R&D Innovation',
      desc: 'Custom robotics hardware engineering for partners',
      icon: <FlaskConical className="w-5 h-5 text-purple-400" />,
      action: () => onSelectExtendedView('schools'),
      color: 'from-purple-950/40 to-slate-900',
      border: 'border-purple-800/40',
    },
    {
      title: 'ATL Setup',
      desc: 'Complete Atal Tinkering Lab equipment & support',
      icon: <School className="w-5 h-5 text-amber-400" />,
      action: () => onSelectExtendedView('schools'),
      color: 'from-amber-950/50 to-slate-900',
      border: 'border-amber-700/50',
    },
    {
      title: 'Academic Support',
      desc: 'Curriculum development, mentor training & kits',
      icon: <Award className="w-5 h-5 text-indigo-400" />,
      action: () => onSelectExtendedView('schools'),
      color: 'from-indigo-950/40 to-slate-900',
      border: 'border-indigo-800/40',
    },
  ];

  return (
    <div className="space-y-7 pb-12">
      {/* 1. Greeting & User Quick Progress Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
        <div>
          <div className="text-xs font-mono-code text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>KITE Robotics Active Hub</span>
          </div>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1">
            Hello, {user.name} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Role: <span className="text-slate-200 capitalize font-medium">{user.role}</span> • Ready to build something intelligent today?
          </p>
        </div>

        {/* Learning progress tracker trigger */}
        <button
          onClick={onOpenStudentDashboard}
          className="flex items-center justify-between sm:justify-end gap-3 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-800/40 hover:border-cyan-500/60 transition-all text-left group"
        >
          <div>
            <div className="text-[11px] font-mono-code text-slate-400">My Learning Tracker</div>
            <div className="text-xs font-bold text-cyan-300 group-hover:text-cyan-200">
              Robotics 72% • Arduino 45%
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* 2. Futuristic Hero Card */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-900/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 shadow-2xl">
        {/* Glow ambient background circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
        
        {/* Tech Grid Lines */}
        <div className="absolute inset-0 bg-grid-tech opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-[11px] font-mono-code text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>KITE ROBOTICS • NATIONAL STEM ECOSYSTEM</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            Preparing You For The Future
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Explore Robotics, AI & IoT through practical learning. Build real-world autonomous rovers, smart IoT stations, and computer vision systems.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onSelectTab('learn')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('store')}
              className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-medium text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Explore Kits</span>
            </button>
          </div>

          {/* Quick metric stamps */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800/80 text-center sm:text-left">
            <div>
              <div className="text-lg sm:text-xl font-display font-extrabold text-cyan-400">{COMPANY_INFO.stats.studentsMentored}</div>
              <div className="text-[11px] text-slate-400 font-mono-code">Students Mentored</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-display font-extrabold text-amber-400">{COMPANY_INFO.stats.partnerSchools}</div>
              <div className="text-[11px] text-slate-400 font-mono-code">Schools & Labs</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-display font-extrabold text-emerald-400">{COMPANY_INFO.stats.atlLabsSetup}</div>
              <div className="text-[11px] text-slate-400 font-mono-code">ATL Labs Setup</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base sm:text-lg text-white">
            Quick Actions
          </h3>
          <span className="text-xs font-mono-code text-slate-400">Direct Portals</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          <button
            onClick={() => onSelectTab('learn')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95"
          >
            <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Courses</span>
          </button>

          <button
            onClick={() => onSelectTab('store')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95"
          >
            <div className="p-2.5 rounded-xl bg-blue-950/60 text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Robotics Kits</span>
          </button>

          <button
            onClick={() => onSelectExtendedView('workshops')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95"
          >
            <div className="p-2.5 rounded-xl bg-amber-950/60 text-amber-400 mb-2 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Workshops</span>
          </button>

          <button
            onClick={() => onSelectTab('kms-ai')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 relative"
          >
            <span className="absolute top-1.5 right-1.5 px-1 rounded text-[9px] font-mono-code bg-cyan-500 text-slate-950 font-bold">
              AI
            </span>
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-950 to-blue-950 text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">KMS-AI</span>
          </button>

          <button
            onClick={() => onSelectExtendedView('schools')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95"
          >
            <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-400 mb-2 group-hover:scale-110 transition-transform">
              <School className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Schools</span>
          </button>

          <button
            onClick={() => onSelectExtendedView('contact')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95"
          >
            <div className="p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Mentors</span>
          </button>
        </div>
      </section>

      {/* 4. Explore Our Ecosystem */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              Explore Our Ecosystem
            </h3>
            <p className="text-xs text-slate-400">Comprehensive hardware, curriculum and lab infrastructure</p>
          </div>
          <button
            onClick={() => onSelectExtendedView('about')}
            className="text-xs text-cyan-400 hover:underline font-mono-code flex items-center gap-1"
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
              className={`p-4 rounded-2xl bg-gradient-to-b ${card.color} border ${card.border} hover:border-slate-500 text-left transition-all group active:scale-[0.98] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  {card.icon}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. KMS-AI Prominent Futuristic Spotlight Card */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 p-6 sm:p-7 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono-code border border-cyan-500/30">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>INTELLIGENT HARDWARE COPILOT</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              KMS-AI
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Your intelligent robotics and learning companion. Debug Arduino & ESP32 C++ code, troubleshoot ultrasonic sensors, calculate motor driver voltages, or upload wiring photos for instant diagnostic feedback.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('kms-ai')}
            className="px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/25 shrink-0 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask KMS-AI</span>
          </button>
        </div>
      </div>

      {/* 6. Featured Programs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              Featured Programs
            </h3>
            <p className="text-xs text-slate-400">Structured curricula designed by veteran robotics educators</p>
          </div>
          <button
            onClick={() => onSelectTab('learn')}
            className="text-xs text-cyan-400 hover:underline font-mono-code flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              {/* Course Thumbnail */}
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-mono-code font-semibold text-cyan-400 border border-slate-700 backdrop-blur-sm">
                  {course.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/60">
                    {course.level}
                  </span>
                  <span className="text-slate-400 font-mono-code">{course.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-mono-code">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-500">({course.reviewsCount})</span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 text-xs font-bold transition-colors"
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
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              Robotics Store
            </h3>
            <p className="text-xs text-slate-400">Authentic STEM hardware kits delivered across India</p>
          </div>
          <button
            onClick={() => onSelectTab('store')}
            className="text-xs text-cyan-400 hover:underline font-mono-code flex items-center gap-1"
          >
            <span>Browse Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.slice(0, 5).map((prod) => (
            <div
              key={prod.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 p-3 flex flex-col justify-between hover:border-slate-700 transition-all group"
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
                  <div className="text-[10px] text-cyan-400 font-mono-code uppercase">{prod.category}</div>
                  <h5
                    onClick={() => onSelectProduct(prod)}
                    className="font-display font-semibold text-xs sm:text-sm text-white line-clamp-2 mt-0.5 hover:text-cyan-300 cursor-pointer"
                  >
                    {prod.name}
                  </h5>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm sm:text-base font-bold text-white font-mono-code">₹{prod.price}</span>
                  <span className="text-[10px] text-slate-500 line-through font-mono-code">₹{prod.originalPrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <button
                    onClick={() => onAddToCart(prod)}
                    title="Add to Cart"
                    className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium flex items-center justify-center transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onBuyNow(prod)}
                    className="py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold flex items-center justify-center transition-colors"
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
      <div className="rounded-3xl border border-amber-800/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono-code text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>ANNUAL FLAGSHIP CHAMPIONSHIP</span>
          </div>
          <h4 className="font-display font-extrabold text-lg sm:text-xl text-white mt-1">
            ROBOZEST 2026 — Honoring Dr. APJ Abdul Kalam
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            National robotics arena challenges, autonomous maze solving, line tracking sprint, and innovation exhibition across zonal hubs.
          </p>
        </div>
        <button
          onClick={() => onSelectExtendedView('workshops')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          Explore ROBOZEST
        </button>
      </div>
    </div>
  );
};
