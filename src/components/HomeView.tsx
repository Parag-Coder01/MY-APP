import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
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
  Rocket,
  Bot,
} from 'lucide-react';
import { Course, Product, UserProfile, MainTab, ExtendedView } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { AnimatedCounter } from './AnimatedCounter';

import heroRobotAi from '../assets/images/hero_robot_ai_1790142280343.jpg';
import heroKitsParts from '../assets/images/hero_kits_parts_1790142293541.jpg';
import heroItServices from '../assets/images/hero_it_services_1790142307996.jpg';
import heroDroneTech from '../assets/images/hero_drone_tech_1790142317460.jpg';

interface WelcomeStripSlide {
  id: string;
  badge: string;
  headingLine1: string;
  headingHighlight: string;
  description: string;
  buttonLabel: string;
  targetType: 'tab' | 'view';
  targetTab?: MainTab;
  targetView?: ExtendedView;
  image: string;
  badgeColor: string;
  highlightColor: string;
}

const WELCOME_STRIP_SLIDES: WelcomeStripSlide[] = [
  {
    id: 'courses',
    badge: 'Welcome to Kite Robotics',
    headingLine1: 'Turn Your Curiosity',
    headingHighlight: 'Into Real Skills!',
    description: 'Explore courses, build projects, get certified and step into the future of AI & Robotics.',
    buttonLabel: 'Explore Courses →',
    targetType: 'tab',
    targetTab: 'learn',
    image: heroRobotAi,
    badgeColor: 'bg-emerald-500/20 text-[#00F5A0] border-emerald-400/40',
    highlightColor: 'text-[#00F5A0]',
  },
  {
    id: 'kits',
    badge: 'Hands-On STEM Kits',
    headingLine1: 'Build Real Inventions',
    headingHighlight: 'With Smart Kits!',
    description: 'Assemble real Arduino boards, servo motors, sensors, and intelligent autonomous robots.',
    buttonLabel: 'Shop STEM Kits →',
    targetType: 'tab',
    targetTab: 'store',
    image: heroKitsParts,
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    highlightColor: 'text-cyan-300',
  },
  {
    id: 'it-services',
    badge: 'Enterprise Engineering',
    headingLine1: 'Scale Your Business',
    headingHighlight: 'With IT Services!',
    description: 'High-performance Web development, Android/iOS Apps, Custom ERP, LMS, and AI Software solutions.',
    buttonLabel: 'Explore IT Services →',
    targetType: 'view',
    targetView: 'it-services',
    image: heroItServices,
    badgeColor: 'bg-sky-500/25 text-sky-300 border-sky-400/50 shadow-xs',
    highlightColor: 'text-sky-300 font-bold',
  },
  {
    id: 'drone-tech',
    badge: 'Aeronautics & UAV',
    headingLine1: 'Master The Skies',
    headingHighlight: 'With Drone Technology!',
    description: 'Hands-on quadcopter assembly, aerodynamic flight mechanics, autonomous navigation, and UAV engineering.',
    buttonLabel: 'Explore Drone Tech →',
    targetType: 'view',
    targetView: 'drone-technology',
    image: heroDroneTech,
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    highlightColor: 'text-amber-300',
  },
];

interface HeroTagline {
  text: string;
  subtext: string;
  taglineGradient: string;
  futureGradient: string;
  glow: string;
  glowColor: string;
  dotColor: string;
  badge: string;
}

const HERO_TAGLINES: HeroTagline[] = [
  {
    text: 'BUILD YOUR OWN JARVIS (AI)',
    subtext: 'Next-gen voice, vision & autonomous robotics intelligence',
    taglineGradient: 'from-[#00F5A0] via-[#00D9F5] to-[#38BDF8]',
    futureGradient: 'from-[#00F5A0] via-[#00D9F5] to-[#38BDF8]',
    glow: 'rgba(0, 245, 160, 0.45)',
    glowColor: 'rgba(0, 245, 160, 0.85)',
    dotColor: 'bg-[#00F5A0] shadow-[0_0_16px_rgba(0,245,160,1)]',
    badge: 'JARVIS AI',
  },
  {
    text: 'EMPOWERING YOUNG INNOVATORS',
    subtext: 'Hands-on experiential hardware & creative problem solving',
    taglineGradient: 'from-[#10B981] via-[#06B6D4] to-[#3B82F6]',
    futureGradient: 'from-[#10B981] via-[#06B6D4] to-[#3B82F6]',
    glow: 'rgba(6, 182, 212, 0.45)',
    glowColor: 'rgba(6, 182, 212, 0.85)',
    dotColor: 'bg-[#06B6D4] shadow-[0_0_16px_rgba(6,182,212,1)]',
    badge: 'INNOVATORS',
  },
  {
    text: 'AI, ML, IOT, ROBOTICS AND BEYOND',
    subtext: 'Full-stack deep tech integrated hardware curriculum',
    taglineGradient: 'from-[#38BDF8] via-[#818CF8] to-[#C084FC]',
    futureGradient: 'from-[#38BDF8] via-[#818CF8] to-[#C084FC]',
    glow: 'rgba(129, 140, 248, 0.45)',
    glowColor: 'rgba(129, 140, 248, 0.85)',
    dotColor: 'bg-[#818CF8] shadow-[0_0_16px_rgba(129,140,248,1)]',
    badge: 'DEEP TECH',
  },
  {
    text: 'IIT MENTORS',
    subtext: 'Masterclasses & direct technical guidance from premier faculty',
    taglineGradient: 'from-[#FBBF24] via-[#F59E0B] to-[#EF4444]',
    futureGradient: 'from-[#FBBF24] via-[#F59E0B] to-[#EF4444]',
    glow: 'rgba(245, 158, 11, 0.45)',
    glowColor: 'rgba(245, 158, 11, 0.85)',
    dotColor: 'bg-[#F59E0B] shadow-[0_0_16px_rgba(245,158,11,1)]',
    badge: 'IIT FACULTY',
  },
  {
    text: 'CERTIFIED COURSES',
    subtext: 'Globally recognized industry-standard STEM & robotics credentials',
    taglineGradient: 'from-[#FB7185] via-[#F43F5E] to-[#F59E0B]',
    futureGradient: 'from-[#FB7185] via-[#F43F5E] to-[#F59E0B]',
    glow: 'rgba(244, 63, 94, 0.45)',
    glowColor: 'rgba(244, 63, 94, 0.85)',
    dotColor: 'bg-[#F43F5E] shadow-[0_0_16px_rgba(244,63,94,1)]',
    badge: 'CERTIFIED',
  },
];

interface CtaItem {
  id: string;
  badge: string;
  actionText: string;
  subText: string;
  buttonLabel: string;
  targetType: 'tab' | 'view';
  target: MainTab | ExtendedView;
  iconName: 'bot' | 'school' | 'award' | 'cpu' | 'shopping-bag' | 'rocket';
  gradientText: string;
  glowBorder: string;
  glowAura: string;
  accentColor: string;
  badgeStyle: string;
}

const CTA_LINES: CtaItem[] = [
  {
    id: 'build-robot',
    badge: 'START BUILDING TODAY',
    actionText: 'Build Your First Autonomous Robot',
    subText: 'Hands-on hardware kits with Arduino, ultrasonic sensors & motor controllers',
    buttonLabel: 'Launch Robotics Academy',
    targetType: 'tab',
    target: 'learn',
    iconName: 'bot',
    gradientText: 'from-cyan-300 via-teal-200 to-sky-300',
    glowBorder: 'border-cyan-500/50 hover:border-cyan-400',
    glowAura: 'from-cyan-500/25 via-sky-950/40 to-transparent',
    accentColor: 'text-cyan-400',
    badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-cyan-500/20',
  },
  {
    id: 'atl-setup',
    badge: 'GOVERNMENT COMPLIANT LABS',
    actionText: "Equip Your School's Atal Tinkering Lab",
    subText: 'Turnkey ATL infrastructure, 3D printers, IoT gear, curriculum & teacher training',
    buttonLabel: 'Request ATL Consultation',
    targetType: 'view',
    target: 'schools',
    iconName: 'school',
    gradientText: 'from-amber-300 via-yellow-200 to-orange-300',
    glowBorder: 'border-amber-500/50 hover:border-amber-400',
    glowAura: 'from-amber-500/25 via-amber-950/40 to-transparent',
    accentColor: 'text-amber-400',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-amber-500/20',
  },
  {
    id: 'robozest',
    badge: 'FLAGSHIP CHAMPIONSHIP',
    actionText: 'Compete In ROBOZEST 2026 Arena',
    subText: 'National robotics sprint, autonomous maze navigation & ₹5,00,000+ prize pool',
    buttonLabel: 'Register Team Now',
    targetType: 'view',
    target: 'workshops',
    iconName: 'award',
    gradientText: 'from-emerald-300 via-teal-200 to-green-300',
    glowBorder: 'border-emerald-500/50 hover:border-emerald-400',
    glowAura: 'from-emerald-500/25 via-emerald-950/40 to-transparent',
    accentColor: 'text-emerald-400',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-emerald-500/20',
  },
  {
    id: 'ai-mentor',
    badge: 'INTELLIGENT HARDWARE COPILOT',
    actionText: 'Master Edge AI & Embedded Firmware',
    subText: 'Real-time Arduino/ESP32 bug fixes, pinout guidance & neural network coding',
    buttonLabel: 'Launch KMS-AI Studio',
    targetType: 'tab',
    target: 'kms-ai',
    iconName: 'cpu',
    gradientText: 'from-sky-300 via-indigo-200 to-purple-300',
    glowBorder: 'border-indigo-500/50 hover:border-indigo-400',
    glowAura: 'from-indigo-500/25 via-purple-950/40 to-transparent',
    accentColor: 'text-indigo-400',
    badgeStyle: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/50 shadow-indigo-500/20',
  },
  {
    id: 'hardware-store',
    badge: 'PAN-INDIA HARDWARE STORE',
    actionText: 'Order Certified Robotics Hardware Kits',
    subText: 'Tested microcontrollers, robotic chassis, sensor shields & fast express dispatch',
    buttonLabel: 'Browse Verified Kits',
    targetType: 'tab',
    target: 'store',
    iconName: 'shopping-bag',
    gradientText: 'from-fuchsia-300 via-pink-200 to-rose-300',
    glowBorder: 'border-pink-500/50 hover:border-pink-400',
    glowAura: 'from-pink-500/25 via-rose-950/40 to-transparent',
    accentColor: 'text-pink-400',
    badgeStyle: 'bg-pink-500/20 text-pink-300 border-pink-400/50 shadow-pink-500/20',
  },
  {
    id: 'certification',
    badge: 'VERIFIED CREDENTIALS',
    actionText: 'Earn Recognized STEM & Robotics Badges',
    subText: 'Showcase verified credentials, student innovation portfolios & skill certifications',
    buttonLabel: 'View Verified Credentials',
    targetType: 'view',
    target: 'certificates',
    iconName: 'rocket',
    gradientText: 'from-blue-300 via-cyan-200 to-teal-300',
    glowBorder: 'border-blue-500/50 hover:border-blue-400',
    glowAura: 'from-blue-500/25 via-blue-950/40 to-transparent',
    accentColor: 'text-blue-400',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-400/50 shadow-blue-500/20',
  },
];

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

  // 0. Auto-swiping Welcome Strip Slide (stays compact within the white strip region)
  const [activeWelcomeIndex, setActiveWelcomeIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWelcomeIndex((prev) => (prev + 1) % WELCOME_STRIP_SLIDES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const currentWelcomeSlide = WELCOME_STRIP_SLIDES[activeWelcomeIndex];

  const handleWelcomeSlideAction = (slide: WelcomeStripSlide) => {
    if (slide.targetType === 'tab' && slide.targetTab) {
      onSelectTab(slide.targetTab);
    } else if (slide.targetType === 'view' && slide.targetView) {
      onSelectExtendedView(slide.targetView);
    }
  };

  // 1. Auto-swiping 5 Taglines (3-4 words each) under "Preparing You For The Future"
  const [activeTaglineIndex, setActiveTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTaglineIndex((prev) => (prev + 1) % HERO_TAGLINES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const currentTagline = HERO_TAGLINES[activeTaglineIndex];

  // 2. Auto-sliding Multi-Channel CTA Command Stage (Shifted to KMS-AI Section)
  const [activeCtaIndex, setActiveCtaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update progress every 50ms
    const totalDuration = 3800; // 3.8s per CTA slide
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveCtaIndex((c) => (c + 1) % CTA_LINES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentCta = CTA_LINES[activeCtaIndex];

  const handleCtaClick = (cta: CtaItem) => {
    if (cta.targetType === 'tab') {
      onSelectTab(cta.target as MainTab);
    } else {
      onSelectExtendedView(cta.target as ExtendedView);
    }
  };

  const handlePrevCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCtaIndex((prev) => (prev - 1 + CTA_LINES.length) % CTA_LINES.length);
    setProgress(0);
  };

  const handleNextCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCtaIndex((prev) => (prev + 1) % CTA_LINES.length);
    setProgress(0);
  };

  const renderCtaIcon = (iconName: string) => {
    switch (iconName) {
      case 'bot':
        return <Bot className="w-5 h-5 text-cyan-400" />;
      case 'school':
        return <School className="w-5 h-5 text-amber-400" />;
      case 'award':
        return <Award className="w-5 h-5 text-emerald-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-5 h-5 text-pink-400" />;
      case 'rocket':
        return <Rocket className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

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
      {/* 1. Compact Auto-Swiping Hero Banner Strip with Clear Background Image */}
      <section className="relative rounded-2xl overflow-hidden bg-[#0A1224] border border-slate-800/90 shadow-md p-4 sm:p-5 transition-all">
        {/* Clearly visible background images pre-rendered and synchronized to appear instantly with the content */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-1/2 md:w-5/12 overflow-hidden pointer-events-none">
          {WELCOME_STRIP_SLIDES.map((slide, idx) => {
            const isActive = idx === activeWelcomeIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                  isActive ? 'opacity-95 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.headingHighlight}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  decoding="sync"
                />
                {/* Smooth gradient blend that leaves the image vividly clear on the right */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1224] via-[#0A1224]/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1224]/80 via-transparent to-transparent sm:hidden" />
              </div>
            );
          })}
        </div>

        {/* Foreground Content: Full text, badge, pagination, and action button */}
        <div className="relative z-10 max-w-xl sm:max-w-lg md:max-w-xl flex flex-col items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWelcomeSlide.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-start"
            >
              {/* Badge + 4 Interactive Slider Dots */}
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-bold uppercase tracking-wider border ${currentWelcomeSlide.badgeColor} backdrop-blur-sm`}>
                  {currentWelcomeSlide.badge}
                </span>

                {/* 4 Interactive Slide Dots */}
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                  {WELCOME_STRIP_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveWelcomeIndex(idx)}
                      className={`transition-all duration-300 cursor-pointer ${
                        idx === activeWelcomeIndex
                          ? 'w-4 h-1.5 bg-[#00F5A0] rounded-full shadow-[0_0_8px_rgba(0,245,160,0.6)]'
                          : 'w-1.5 h-1.5 bg-slate-500 hover:bg-slate-300 rounded-full'
                      }`}
                      title={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Complete Headline */}
              <h2 className="font-display font-extrabold text-base sm:text-lg md:text-xl text-white tracking-tight leading-snug">
                <span>{currentWelcomeSlide.headingLine1} </span>
                <span className={currentWelcomeSlide.highlightColor}>{currentWelcomeSlide.headingHighlight}</span>
              </h2>

              {/* Complete Description Text - unclipped */}
              <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-1.5 leading-relaxed font-sans max-w-md">
                {currentWelcomeSlide.description}
              </p>

              {/* Action Button */}
              <button
                onClick={() => handleWelcomeSlideAction(currentWelcomeSlide)}
                className="mt-3 inline-flex items-center gap-1.5 bg-[#00F5A0] hover:bg-[#00df90] text-slate-950 font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentWelcomeSlide.buttonLabel}</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 2. Flagship Hero Card with Earlier Sliding Taglines */}
      <section className="relative rounded-3xl overflow-hidden border dark:border-cyan-500/30 border-slate-300/80 bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Glow ambient background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-600/15 blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-[11px] font-mono-code text-cyan-300 mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold tracking-wider">KITE ROBOTICS • NATIONAL STEM ECOSYSTEM</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            Preparing You For{' '}
            <span className="relative inline-block overflow-hidden align-baseline px-2 py-0.5">
              <span
                className={`font-calibri-future font-black bg-gradient-to-r ${currentTagline.futureGradient} bg-clip-text text-transparent transition-all duration-700 inline-block uppercase tracking-wider`}
                style={{
                  filter: `drop-shadow(0 0 24px ${currentTagline.glowColor}) drop-shadow(0 4px 14px rgba(0,0,0,0.85))`,
                }}
              >
                THE FUTURE
              </span>
              {/* Synchronized horizontal shine reflection with mix-blend-overlay so colors stay rich & vivid */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none animate-horizontal-shine mix-blend-overlay"
              />
            </span>
          </h2>

          {/* Dynamic Auto-Swiping Taglines with Calibri heavy italic font & synchronized horizontal shine */}
          <div className="mt-4 sm:mt-5 w-full">
            <div className="relative w-full rounded-2xl border dark:border-slate-800/90 border-slate-700/80 dark:bg-slate-950/90 bg-slate-900/95 backdrop-blur-xl p-4 sm:p-5 shadow-2xl overflow-hidden group">
              {/* Dynamic glowing ambient aura synced to tagline color */}
              <div
                className="absolute inset-0 opacity-30 blur-3xl transition-all duration-700 pointer-events-none"
                style={{ background: currentTagline.glow }}
              />

              {/* Glass surface top edge reflection highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-2.5">
                {/* Top metadata tier: Beacon, Category Badge & Subtext */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="relative flex items-center justify-center shrink-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${currentTagline.dotColor} animate-pulse`} />
                    <span className="absolute w-4 h-4 rounded-full border border-current opacity-40 animate-ping" />
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-sm shadow-xs">
                    {currentTagline.badge}
                  </span>

                  <span className="text-xs font-mono-code text-slate-300">
                    • {currentTagline.subtext}
                  </span>
                </div>

                {/* Main Tagline: Bold Calibri Italic with high-contrast electric glow */}
                <div className="relative overflow-hidden inline-block pr-2 py-1">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeTaglineIndex}
                      initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className={`text-2xl sm:text-3xl md:text-4xl font-calibri-heavy-italic font-black tracking-tight leading-snug uppercase bg-gradient-to-r ${currentTagline.taglineGradient} bg-clip-text text-transparent`}
                      style={{
                        filter: `drop-shadow(0 0 20px ${currentTagline.glowColor}) drop-shadow(0 3px 12px rgba(0,0,0,0.9))`,
                      }}
                    >
                      {currentTagline.text}
                    </motion.h3>
                  </AnimatePresence>

                  {/* Horizontal shine reflection: PERSISTENT, perfectly synchronized with THE FUTURE at all times */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none animate-horizontal-shine mix-blend-overlay"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans max-w-xl">
            Empowering students, creators, and schools across India with hands-on robotics kits, AI curricula, ATL innovation hubs, and national championships.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-6">
            <button
              onClick={() => onSelectTab('learn')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-display font-black text-sm tracking-wide uppercase flex items-center gap-2.5 shadow-xl shadow-cyan-500/30 active:scale-95 transition-all cursor-pointer hover:shadow-cyan-400/40"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('store')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/60 text-white font-display font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer backdrop-blur-md hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Explore Certified Kits</span>
            </button>
          </div>

          {/* Dynamic metric stamps with delay & smooth progression */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-7 border-t border-slate-800/80 text-center sm:text-left">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-display font-black text-cyan-400 tracking-tight">
                <AnimatedCounter target={25000} suffix="+" duration={1600} delay={150} />
              </div>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5 font-medium">Students Mentored</div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/30 transition-colors backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-display font-black text-amber-400 tracking-tight">
                <AnimatedCounter target={120} suffix="+" duration={1400} delay={300} />
              </div>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5 font-medium">Schools & Labs</div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400 tracking-tight">
                <AnimatedCounter target={45} suffix="+" duration={1300} delay={450} />
              </div>
              <div className="text-[11px] text-slate-400 font-mono-code mt-0.5 font-medium">ATL Labs Setup</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Direct Portals / Quick Actions */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-base sm:text-lg dark:text-white text-slate-900 tracking-tight">
              Direct Portals
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600">Quick launch channels across the Kite ecosystem</p>
          </div>
          <span className="text-xs font-mono-code dark:text-cyan-400 text-cyan-600 font-bold uppercase tracking-wider">Fast Access</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {/* 1. Courses */}
          <button
            onClick={() => onSelectTab('learn')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-1 cursor-pointer"
          >
            <div className="p-3 rounded-xl dark:bg-cyan-950/70 bg-cyan-100 text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-display font-bold dark:text-slate-200 text-slate-800">Academy</span>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5">STEM Courses</span>
          </button>

          {/* 2. Robotics Kits */}
          <button
            onClick={() => onSelectTab('store')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-1 cursor-pointer"
          >
            <div className="p-3 rounded-xl dark:bg-blue-950/70 bg-blue-100 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xs font-display font-bold dark:text-slate-200 text-slate-800">Kits Store</span>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5">Hardware Gear</span>
          </button>

          {/* 3. Workshops */}
          <button
            onClick={() => onSelectExtendedView('workshops')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-1 cursor-pointer"
          >
            <div className="p-3 rounded-xl dark:bg-amber-950/70 bg-amber-100 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-display font-bold dark:text-slate-200 text-slate-800">ROBOZEST</span>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5">Grand Conclave</span>
          </button>

          {/* 4. KMS-AI */}
          <button
            onClick={() => onSelectTab('kms-ai')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-1 relative cursor-pointer"
          >
            <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-mono-code bg-cyan-400 text-slate-950 font-black shadow-xs">
              AI
            </span>
            <div className="p-3 rounded-xl dark:bg-gradient-to-tr dark:from-cyan-950 dark:to-blue-950 bg-cyan-100 text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-display font-bold dark:text-slate-200 text-slate-800">AI Copilot</span>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5">Code Foundry</span>
          </button>

          {/* 5. IT Services */}
          <button
            id="portal-it-services-btn"
            onClick={() => setShowITServicesModal(true)}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-indigo-500/40 border-indigo-200 hover:border-indigo-500 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-1 relative cursor-pointer ring-1 ring-indigo-500/20"
            aria-label="Explore IT Services: Website, App, ERP, LMS"
          >
            <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-mono-code bg-indigo-500 text-white font-black shadow-xs">
              NEW
            </span>
            <div className="p-3 rounded-xl dark:bg-indigo-950/70 bg-indigo-100 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <Laptop className="w-5 h-5" />
            </div>
            <span className="text-xs font-display font-bold dark:text-indigo-300 text-indigo-900">IT Services</span>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5">Web·App·ERP</span>
          </button>

          {/* 6. Schools & ATL */}
          <button
            onClick={() => onSelectExtendedView('schools')}
            className="p-3.5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200/90 hover:border-cyan-500/50 flex flex-col items-center text-center transition-all group active:scale-95 shadow-sm hover:-translate-y-1 cursor-pointer"
          >
            <div className="p-3 rounded-xl dark:bg-purple-950/70 bg-purple-100 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform shadow-xs">
              <School className="w-5 h-5" />
            </div>
            <span className="text-xs font-display font-bold dark:text-slate-200 text-slate-800">ATL Labs</span>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5">School Setup</span>
          </button>
        </div>
      </section>

      {/* 4. Action Command Center & KMS-AI Hardware Copilot */}
      <section className="space-y-4">
        {/* Shifted Dynamic Multi-Channel Action Hub */}
        <div
          onClick={() => handleCtaClick(currentCta)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`relative p-4 sm:p-5 rounded-3xl border ${currentCta.glowBorder} dark:bg-slate-950/80 bg-slate-900/95 backdrop-blur-xl shadow-2xl transition-all duration-300 group/cta cursor-pointer overflow-hidden`}
        >
          {/* Ambient dynamic radial glow aura */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${currentCta.glowAura} opacity-80 blur-xl transition-all duration-700 pointer-events-none`} />

          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none" />

          {/* Top Bar: Badge, Status & Interactive Steppers */}
          <div className="relative z-10 flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono-code font-bold uppercase tracking-wider ${currentCta.badgeStyle}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                </span>
                <span>{currentCta.badge}</span>
              </span>
              <span className="text-[10px] font-mono-code text-slate-400 hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {isPaused ? 'CLICK TO LAUNCH' : 'DYNAMIC CTA COMMAND'}
              </span>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-lg px-1 py-0.5">
              <button
                type="button"
                onClick={handlePrevCta}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Previous CTA"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono-code text-slate-300 px-1 font-semibold">
                {activeCtaIndex + 1}/{CTA_LINES.length}
              </span>
              <button
                type="button"
                onClick={handleNextCta}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Next CTA"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Animated Call-To-Action Content with 3D blur-in spring */}
          <div className="relative z-10 min-h-[72px] sm:min-h-[64px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCta.id}
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -14, filter: 'blur(8px)', scale: 0.98 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 shadow-inner shrink-0 group-hover/cta:scale-110 group-hover/cta:border-cyan-400 transition-transform duration-300">
                    {renderCtaIcon(currentCta.iconName)}
                  </div>
                  <div>
                    <h3 className={`font-display font-black text-lg sm:text-xl lg:text-2xl tracking-tight leading-snug bg-gradient-to-r ${currentCta.gradientText} bg-clip-text text-transparent`}>
                      {currentCta.actionText}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-1 font-sans">
                      {currentCta.subText}
                    </p>
                  </div>
                </div>

                {/* High-visibility Action trigger button */}
                <div className="flex items-center shrink-0 self-start sm:self-center">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-display font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all group-hover/cta:bg-cyan-500 group-hover/cta:text-slate-950 group-hover/cta:border-cyan-400 shadow-md">
                    <span>{currentCta.buttonLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Progress Bar & Clickable Dots */}
          <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {CTA_LINES.map((cta, index) => (
                <button
                  key={cta.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCtaIndex(index);
                    setProgress(0);
                  }}
                  title={cta.actionText}
                  className={`transition-all rounded-full cursor-pointer ${
                    index === activeCtaIndex
                      ? 'w-6 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            {/* Real-time countdown bar */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-code text-slate-400 hidden xs:inline">
                {isPaused ? 'PAUSED' : 'NEXT CTA'}
              </span>
              <div className="w-16 sm:w-24 h-1 rounded-full bg-slate-800/80 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* And right under this: KMS-AI Hardware Copilot Spotlight */}
        <div className="relative rounded-3xl overflow-hidden border dark:border-cyan-500/40 border-cyan-300 dark:bg-gradient-to-r dark:from-cyan-950/70 dark:via-slate-900 dark:to-blue-950/70 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-6 sm:p-8 shadow-xl transition-all">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full dark:bg-cyan-500/20 bg-cyan-100 dark:text-cyan-300 text-cyan-800 text-[11px] font-mono-code font-bold border dark:border-cyan-500/30 border-cyan-300">
                <Sparkles className="w-3.5 h-3.5 dark:text-cyan-400 text-cyan-600" />
                <span>INTELLIGENT HARDWARE COPILOT</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl dark:text-white text-slate-900 tracking-tight">
                KMS-AI Mentor & Code Foundry
              </h3>
              <p className="dark:text-slate-300 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Debug Arduino & ESP32 C++ firmware, calculate motor driver voltages, troubleshoot ultrasonic sensor pinouts, or generate circuit wiring diagrams instantly.
              </p>

              {/* Quick interactive prompt chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectTab('kms-ai')}
                    className="px-3 py-1.5 rounded-xl dark:bg-slate-900/90 bg-white border dark:border-cyan-800/50 border-slate-300 hover:border-cyan-400 text-[11px] font-medium dark:text-cyan-300 text-slate-800 hover:text-cyan-600 flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span>{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectTab('kms-ai')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-black text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl shadow-cyan-400/25 shrink-0 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch KMS-AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Explore Our Ecosystem */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-base sm:text-xl dark:text-white text-slate-900 tracking-tight">
              The Kite Innovation Matrix
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">Autonomous robotics, intelligent telemetry & turnkey Atal Tinkering Labs</p>
          </div>
          <button
            onClick={() => onSelectExtendedView('about')}
            className="text-xs text-cyan-500 hover:text-cyan-400 font-mono-code font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Ecosystem Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {ecosystemCards.map((card, idx) => (
            <button
              key={idx}
              onClick={card.action}
              className={`p-4 sm:p-5 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800/90 border-slate-200/90 hover:border-cyan-500/50 text-left transition-all group active:scale-[0.98] flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className={`p-2.5 rounded-xl ${card.iconBg} group-hover:scale-110 transition-transform shadow-xs`}>
                  {card.icon}
                </div>
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider px-2 py-0.5 rounded-full dark:bg-slate-800/80 bg-slate-100 dark:text-cyan-300 text-cyan-800 border dark:border-slate-700/60 border-slate-200">
                  {card.badge}
                </span>
              </div>
              <div>
                <h4 className="font-display font-black text-sm sm:text-base dark:text-white text-slate-900 group-hover:text-cyan-400 transition-colors tracking-tight">
                  {card.title}
                </h4>
                <p className="text-xs dark:text-slate-400 text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Featured Programs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-base sm:text-xl dark:text-white text-slate-900 tracking-tight">
              Masterclass Curricula & Deep-Tech Programs
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">Project-driven mastery paths designed by veteran aerospace & robotics researchers</p>
          </div>
          <button
            onClick={() => onSelectTab('learn')}
            className="text-xs text-cyan-500 hover:text-cyan-400 font-mono-code font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>All Masterclasses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800/90 border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              {/* Course Thumbnail */}
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/85 text-[10px] font-mono-code font-bold uppercase tracking-wider text-cyan-400 border border-slate-700/80 backdrop-blur-md">
                  {course.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-slate-200">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm">
                    {course.level}
                  </span>
                  <span className="text-cyan-300 font-mono-code">{course.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base dark:text-white text-slate-900 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-xs dark:text-slate-400 text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t dark:border-slate-800/80 border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono-code font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <AnimatedCounter target={course.rating} decimals={1} suffix="" duration={1000} delay={100} />
                    <span className="dark:text-slate-500 text-slate-400 font-normal">
                      (<AnimatedCounter target={course.reviewsCount} suffix=" reviews" duration={1200} delay={200} />)
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="px-4 py-2 rounded-xl dark:bg-cyan-500/20 bg-cyan-100 hover:bg-cyan-500 dark:text-cyan-300 text-cyan-900 hover:text-slate-950 text-xs font-display font-black tracking-wide uppercase transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    View Curriculum
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Robotics Store Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-base sm:text-xl dark:text-white text-slate-900 tracking-tight">
              Certified Hardware Gear & Robotics Kits
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">
              Tested microcontrollers, sensor shields & chassis • Over <AnimatedCounter target={1250} suffix="+" duration={1500} className="text-cyan-400 font-bold" /> kits dispatched pan-India
            </p>
          </div>
          <button
            onClick={() => onSelectTab('store')}
            className="text-xs text-cyan-500 hover:text-cyan-400 font-mono-code font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {products.slice(0, 5).map((prod) => (
            <div
              key={prod.id}
              className="rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800/90 border-slate-200/90 p-3 flex flex-col justify-between hover:border-cyan-500/50 transition-all group shadow-xs hover:shadow-md hover:-translate-y-0.5"
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
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold bg-cyan-400 text-slate-950 shadow-xs">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="mt-2.5">
                  <div className="text-[10px] text-cyan-500 font-mono-code uppercase font-bold tracking-wider">{prod.category}</div>
                  <h5
                    onClick={() => onSelectProduct(prod)}
                    className="font-display font-bold text-xs sm:text-sm dark:text-white text-slate-900 line-clamp-2 mt-0.5 hover:text-cyan-400 cursor-pointer transition-colors"
                  >
                    {prod.name}
                  </h5>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t dark:border-slate-800 border-slate-100">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm sm:text-base font-extrabold dark:text-white text-slate-900 font-mono-code">₹{prod.price}</span>
                  <span className="text-[10px] dark:text-slate-500 text-slate-400 line-through font-mono-code">₹{prod.originalPrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <button
                    onClick={() => onAddToCart(prod)}
                    title="Add to Cart"
                    className="py-1.5 rounded-lg dark:bg-slate-800/90 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 text-[11px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onBuyNow(prod)}
                    className="py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 text-[11px] font-display font-black uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
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
      <section className="relative rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />
        <div className="max-w-xl relative z-10">
          <div className="text-xs font-mono-code text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>ANNUAL NATIONAL CHAMPIONSHIP</span>
          </div>
          <h4 className="font-display font-black text-xl sm:text-2xl text-white mt-1.5 tracking-tight">
            ROBOZEST 2026 — In Honor of Dr. APJ Abdul Kalam
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            High-octane robotics battlegrounds across <AnimatedCounter target={15} suffix="+" duration={1200} className="text-amber-400 font-bold" /> zonal arenas, autonomous line-trackers, labyrinth escape navigators, and futuristic tech exhibitions uniting <AnimatedCounter target={5000} suffix="+" duration={1500} className="text-amber-400 font-bold" /> young inventors.
          </p>
        </div>
        <button
          onClick={() => onSelectExtendedView('workshops')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-display font-black text-xs sm:text-sm tracking-wide uppercase shrink-0 shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer relative z-10"
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
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full dark:bg-indigo-950/80 bg-indigo-100 border dark:border-indigo-800/60 border-indigo-200 text-[11px] font-mono-code dark:text-indigo-300 text-indigo-700 font-medium mb-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>KITE DIGITAL ENGINEERING & IT SOLUTIONS</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl dark:text-white text-slate-900">
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
                      <span className="text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full dark:bg-cyan-950 dark:text-cyan-300 text-cyan-800 border dark:border-cyan-800 border-cyan-200">
                        Next.js & React
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-base dark:text-white text-slate-900">
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
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-600 dark:text-cyan-400 hover:text-slate-950 text-xs font-medium font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                      <span className="text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full dark:bg-blue-950 dark:text-blue-300 text-blue-800 border dark:border-blue-800 border-blue-200">
                        iOS & Android
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-base dark:text-white text-slate-900">
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
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-600 dark:text-blue-400 hover:text-slate-950 text-xs font-medium font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                      <span className="text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full dark:bg-amber-950 dark:text-amber-300 text-amber-800 border dark:border-amber-800 border-amber-200">
                        School & Lab Ops
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-base dark:text-white text-slate-900">
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
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-slate-950 text-xs font-medium font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                      <span className="text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full dark:bg-emerald-950 dark:text-emerald-300 text-emerald-800 border dark:border-emerald-800 border-emerald-200">
                        E-Learning Platform
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-base dark:text-white text-slate-900">
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
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-slate-950 text-xs font-medium font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
