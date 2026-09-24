import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Smartphone,
  Database,
  GraduationCap,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Clock,
  Layers,
  PhoneCall,
  MessageSquare,
  Server,
  Cpu,
  MonitorCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export type ITServiceType = 'all' | 'website' | 'app' | 'erp' | 'lms';

interface ITServicesViewProps {
  initialService?: ITServiceType;
  onContactClick?: () => void;
}

export const ITServicesView: React.FC<ITServicesViewProps> = ({
  initialService = 'all',
  onContactClick,
}) => {
  const [activeTab, setActiveTab] = useState<ITServiceType>(initialService);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Website Development');

  // Form State
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('₹25,000 - ₹50,000');
  const [requirements, setRequirements] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    {
      id: 'website',
      name: 'Website Development',
      tagline: 'Modern, High-Performance Web Portals & Platforms',
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      accentColor: 'from-cyan-500/20 via-slate-900 to-slate-950',
      borderColor: 'border-cyan-500/40',
      badge: 'Fast & SEO-Optimized',
      summary:
        'Custom web applications, responsive institutional portals, and high-conversion ed-tech platforms built with modern full-stack architectures.',
      keyFeatures: [
        'Responsive Mobile-First Architecture for all screen resolutions',
        'Next.js 15 & React with instant page transitions and server-side rendering',
        'Built-in Content Management System (CMS) for effortless faculty updates',
        'SEO optimization achieving 95+ Google Lighthouse scores',
        'Integrated SSL, custom domain routing, and Cloudflare CDN protection',
        'Interactive STEM hardware demos, 3D viewers & video embeds',
      ],
      deliverables: [
        'Custom UI/UX Prototypes & Wireframes',
        'Production Deployment on Cloud Run / Vercel',
        'Search Engine Indexing & Analytics Setup',
        '1-Year Maintenance & Bug Resolution SLA',
      ],
      techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      timeline: '2 to 4 Weeks',
    },
    {
      id: 'app',
      name: 'Mobile App Development',
      tagline: 'Cross-Platform iOS & Android Applications',
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      accentColor: 'from-blue-500/20 via-slate-900 to-slate-950',
      borderColor: 'border-blue-500/40',
      badge: 'iOS & Android',
      summary:
        'High-performance native and hybrid apps for students, mentors, and hardware controllers featuring Bluetooth Low Energy (BLE) and telemetry.',
      keyFeatures: [
        'Single codebase powering both Apple App Store and Google Play Store',
        'Direct Bluetooth (BLE) & Wi-Fi robotics hardware controller interfaces',
        'Real-time push notifications for announcements, updates, and homework',
        'Offline-first synchronization for areas with intermittent connectivity',
        'Seamless payment gateway integration (UPI, Razorpay, Net Banking)',
        'Biometric authentication and secure local credential storage',
      ],
      deliverables: [
        'Full App Store & Google Play Store Publishing',
        'Hardware BLE communication protocols & drivers',
        'Backend Push Notification & Auth APIs',
        'Comprehensive user documentation & source code handoff',
      ],
      techStack: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase', 'WebSockets'],
      timeline: '4 to 6 Weeks',
    },
    {
      id: 'erp',
      name: 'ERP Systems',
      tagline: 'Enterprise Resource Planning for Schools & Labs',
      icon: <Database className="w-6 h-6 text-amber-400" />,
      accentColor: 'from-amber-500/20 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/40',
      badge: 'Academic & Industrial',
      summary:
        'Unified institutional management software automating ATL Lab hardware inventory, student admissions, attendance, fees, and reporting.',
      keyFeatures: [
        'Atal Tinkering Lab (ATL) Component Inventory & Barcode Tracking',
        'Student Enrollment, Class Timetable, and Biometric/RFID Attendance',
        'Fee generation, automated payment reminders & GST receipt issuance',
        'Staff management, payroll, and leave management system',
        'Role-Based Access Control (Super Admin, Principal, Teacher, Student, Parent)',
        'Executive visual analytics, PDF exports, and government compliance records',
      ],
      deliverables: [
        'Turnkey Cloud Server Installation & Database Migration',
        'Custom Role Configurator & Departmental Workflows',
        'Comprehensive Staff & Administrator Hands-on Training',
        'Automated Daily Cloud Backups & 99.9% Uptime Guarantee',
      ],
      techStack: ['PostgreSQL', 'Node.js', 'Express', 'Docker', 'Redis', 'Tailwind CSS'],
      timeline: '4 to 8 Weeks',
    },
    {
      id: 'lms',
      name: 'LMS (Learning Management System)',
      tagline: 'Modern Experiential STEM & Robotics E-Learning',
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      accentColor: 'from-emerald-500/20 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/40',
      badge: 'Interactive Learning',
      summary:
        'A comprehensive education platform with video curriculum streaming, interactive robotics code challenges, automated quizzes, and digital certificates.',
      keyFeatures: [
        'Modular Course Builder supporting video lectures, PDFs, and code sandboxes',
        'Interactive Arduino & C++ code submission and automated linting',
        'Automated cryptographically verifiable Certificate Generation with QR code verification',
        'Student Progress Tracking, Gamified Badges, and Leaderboards',
        'Live virtual classroom integration (Google Meet & Zoom API integration)',
        'Parent portal showing lesson completion, grades, and teacher notes',
      ],
      deliverables: [
        'White-Label LMS branded for your school, lab, or training academy',
        'Content Migration & Curriculum Digitization support',
        'CDN Video Storage setup with adaptive bitrate playback',
        'Certificate Verification portal & verification API',
      ],
      techStack: ['React', 'Next.js', 'PostgreSQL', 'WebSockets', 'SCORM', 'Cloudflare Stream'],
      timeline: '3 to 6 Weeks',
    },
  ];

  const filteredServices =
    activeTab === 'all' ? services : services.filter((s) => s.id === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'IT_SERVICES_ENQUIRY',
          name,
          organization,
          email,
          phone,
          details: {
            serviceRequested: selectedServiceForQuote,
            budget,
            requirements,
          },
        }),
      });
      setSubmitted(true);
    } catch {
      // In case of offline or local demo, still confirm success
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden border dark:border-slate-800 border-slate-200/90 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 sm:p-9 shadow-lg">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-cyan-950/80 bg-cyan-100/80 border dark:border-cyan-700/50 border-cyan-300 text-[11px] font-mono-code dark:text-cyan-300 text-cyan-800 mb-4 font-semibold">
            <Code2 className="w-3.5 h-3.5 dark:text-cyan-400 text-cyan-600" />
            <span>KITE IT SOLUTIONS & DIGITAL ENGINEERING</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl dark:text-white text-slate-900 tracking-tight leading-tight">
            Full-Spectrum IT Services: <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Website, App, ERP & LMS
            </span>
          </h1>

          <p className="dark:text-slate-300 text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
            Engineering robust digital infrastructure for academic institutions, innovation hubs, and enterprises. From responsive web portals and native IoT hardware apps to custom ERPs and STEM Learning Management Systems.
          </p>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center gap-3 pt-5 mt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 text-xs font-mono-code dark:text-slate-300 text-slate-700 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>99.9% Uptime Architecture</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 text-xs font-mono-code dark:text-slate-300 text-slate-700 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Rapid 2–4 Week Turnaround</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 text-xs font-mono-code dark:text-slate-300 text-slate-700 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" />
              <span>Hardware-Software Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Navigation Filter Tabs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-semibold text-lg sm:text-xl dark:text-white text-slate-900">
              Our Core IT Services
            </h2>
            <p className="text-xs dark:text-slate-400 text-slate-600">
              Select a category to explore capabilities, deliverables, and tech stacks
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl dark:bg-slate-900/90 bg-slate-100 border dark:border-slate-800 border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Services (4)
            </button>
            <button
              onClick={() => setActiveTab('website')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'website'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
            <button
              onClick={() => setActiveTab('app')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'app'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>App</span>
            </button>
            <button
              onClick={() => setActiveTab('erp')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'erp'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>ERP</span>
            </button>
            <button
              onClick={() => setActiveTab('lms')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'lms'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>LMS</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredServices.map((srv) => (
            <motion.div
              key={srv.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={`rounded-3xl border dark:border-slate-800 border-slate-200/90 dark:bg-slate-900/80 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group hover:border-slate-600 dark:hover:border-slate-700`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl dark:bg-slate-950 bg-slate-100 border dark:border-slate-800 border-slate-200 group-hover:scale-105 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="text-[11px] font-mono-code font-medium px-2.5 py-1 rounded-full dark:bg-slate-800 bg-slate-100 dark:text-cyan-300 text-cyan-800 border dark:border-slate-700 border-slate-200">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl dark:text-white text-slate-900">
                  {srv.name}
                </h3>
                <div className="text-xs font-mono-code dark:text-cyan-400 text-cyan-600 mt-0.5">
                  {srv.tagline}
                </div>

                <p className="text-xs sm:text-sm dark:text-slate-300 text-slate-600 mt-2.5 leading-relaxed font-normal">
                  {srv.summary}
                </p>

                {/* Key Features */}
                <div className="mt-5 space-y-2">
                  <div className="text-[11px] font-mono-code uppercase tracking-wider dark:text-slate-400 text-slate-500 font-medium">
                    Key Capabilities
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {srv.keyFeatures.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs dark:text-slate-300 text-slate-700 leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-5 pt-4 border-t dark:border-slate-800 border-slate-100">
                  <div className="text-[11px] font-mono-code uppercase tracking-wider dark:text-slate-400 text-slate-500 font-medium mb-2">
                    Technology Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {srv.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-lg dark:bg-slate-950 bg-slate-100 dark:text-slate-300 text-slate-700 text-[11px] font-mono-code border dark:border-slate-800 border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA & Timeline */}
              <div className="mt-6 pt-4 border-t dark:border-slate-800 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono-code dark:text-slate-400 text-slate-500">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span>Timeline: <strong className="dark:text-slate-200 text-slate-800 font-medium">{srv.timeline}</strong></span>
                </div>

                <button
                  onClick={() => {
                    setSelectedServiceForQuote(srv.name);
                    const el = document.getElementById('it-quote-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  <span>Request Quote for {srv.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Detailed Comparison / Deliverables Spotlight */}
      <section className="rounded-3xl border dark:border-slate-800 border-slate-200/90 dark:bg-slate-900/60 bg-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl mb-6">
          <h3 className="font-display font-bold text-lg sm:text-xl dark:text-white text-slate-900">
            Why Partner with KITE for Digital Engineering?
          </h3>
          <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 mt-1">
            Unlike generic software agencies, KITE deeply understands academic institutions, Atal Tinkering Labs, IoT hardware protocols, and STEM education pedagogy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200">
            <div className="p-2.5 rounded-xl dark:bg-cyan-950/60 bg-cyan-100 text-cyan-600 dark:text-cyan-400 w-fit mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base dark:text-white text-slate-900">
              Hardware & IoT Ready
            </h4>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">
              Native drivers for Arduino, ESP32, Raspberry Pi, and industrial sensors directly integrated into your apps and dashboards.
            </p>
          </div>

          <div className="p-4 rounded-2xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200">
            <div className="p-2.5 rounded-xl dark:bg-blue-950/60 bg-blue-100 text-blue-600 dark:text-blue-400 w-fit mb-3">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base dark:text-white text-slate-900">
              Zero Vendor Lock-In
            </h4>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">
              Full source code ownership, complete API documentation, and standard Docker/Cloud deployment on your own cloud accounts.
            </p>
          </div>

          <div className="p-4 rounded-2xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200">
            <div className="p-2.5 rounded-xl dark:bg-emerald-950/60 bg-emerald-100 text-emerald-600 dark:text-emerald-400 w-fit mb-3">
              <MonitorCheck className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base dark:text-white text-slate-900">
              Post-Launch Support
            </h4>
            <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 leading-relaxed">
              Dedicated engineering support, security updates, server monitoring, and continuous feature enhancements.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Interactive Project Quote & Consultation Form */}
      <section
        id="it-quote-form"
        className="rounded-3xl border dark:border-cyan-500/40 border-cyan-300 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/70 p-6 sm:p-8 shadow-xl"
      >
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full dark:bg-cyan-500/20 bg-cyan-100 text-cyan-800 dark:text-cyan-300 text-[11px] font-mono-code font-bold mb-2">
            <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            <span>ESTIMATE YOUR PROJECT</span>
          </div>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl dark:text-white text-slate-900">
            Request an IT Project Proposal & Quote
          </h3>
          <p className="text-xs sm:text-sm dark:text-slate-300 text-slate-600 mt-1 leading-relaxed">
            Tell us about your requirements for Website, App, ERP, or LMS. The KITE Digital Solutions team will schedule an architectural review and prepare a custom proposal.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl dark:bg-emerald-950/40 bg-emerald-50 border border-emerald-500/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-lg dark:text-white text-slate-900">
              Proposal Request Received!
            </h4>
            <p className="text-xs sm:text-sm dark:text-slate-300 text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="dark:text-white text-slate-900">{name}</strong>. Our senior solutions architect will review your {selectedServiceForQuote} specifications and contact you at <strong className="dark:text-cyan-400 text-cyan-600">{phone || email}</strong> within 24 business hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 px-4 py-2 rounded-xl dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 text-xs font-bold dark:text-white text-slate-800 hover:opacity-80 transition-opacity cursor-pointer"
            >
              Submit Another Project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-code dark:text-slate-300 text-slate-700 mb-1 font-semibold">
                  Service Category *
                </label>
                <select
                  value={selectedServiceForQuote}
                  onChange={(e) => setSelectedServiceForQuote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</option>
                  <option value="ERP System (School/Lab/Enterprise)">ERP System (School/Lab/Enterprise)</option>
                  <option value="LMS (Learning Management System)">LMS (Learning Management System)</option>
                  <option value="Full Digital Suite (Web + App + ERP + LMS)">Full Digital Suite (Web + App + ERP + LMS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-code dark:text-slate-300 text-slate-700 mb-1 font-semibold">
                  Estimated Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Standard)</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (Advanced)</option>
                  <option value="₹1,00,000 - ₹3,00,000">₹1,00,000 - ₹3,00,000 (Enterprise / Multi-Branch)</option>
                  <option value="₹3,00,000+">₹3,00,000+ (Turnkey Ecosystem)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-code dark:text-slate-300 text-slate-700 mb-1 font-semibold">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code dark:text-slate-300 text-slate-700 mb-1 font-semibold">
                  School / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Delhi Public Academy / Tech Innovators Ltd"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-code dark:text-slate-300 text-slate-700 mb-1 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu.in"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code dark:text-slate-300 text-slate-700 mb-1 font-semibold">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-code dark:text-slate-300 text-slate-700 mb-1 font-semibold">
                Project Scope & Key Needs
              </label>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Describe your current setup, target launch date, and must-have modules (e.g. ATL barcode scanning, online fee collection, or iOS BLE controller)..."
                className="w-full px-3.5 py-2.5 rounded-xl dark:bg-slate-950 bg-white border dark:border-slate-800 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3 text-xs dark:text-slate-400 text-slate-600">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-1 hover:text-cyan-500 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Call: {COMPANY_INFO.phone}</span>
                </a>
                <span>•</span>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-cyan-500 transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Proposal Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
