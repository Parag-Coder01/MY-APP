import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bot,
  Cpu,
  Brain,
  Wifi,
  Plane,
  Box,
  Code,
  Eye,
  Sparkles,
  PhoneCall,
  Mail,
  Calendar,
  Building2,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Send,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import collegeWorkshopImg from '../assets/images/college_workshop_lab_1790484866240.jpg';
import masterWorkshopLabImg from '../assets/images/workshops_master_lab_1790488567585.jpg';

// Ultra-attractive, stunning high-fidelity images for all 8 workshop tracks
import bgAiMl from '../assets/images/ws_aiml_stunning_1790506395554.jpg';
import bgRobotics from '../assets/images/ws_robot_stunning_1790506420339.jpg';
import bgArduinoIot from '../assets/images/ws_iot_stunning_1790506436065.jpg';
import bgDroneTech from '../assets/images/ws_drone_stunning_1790506451042.jpg';
import bg3dPrint from '../assets/images/ws_3d_stunning_1790506464610.jpg';
import bgPythonCode from '../assets/images/ws_python_stunning_1790506481896.jpg';
import bgCvVision from '../assets/images/ws_cv_stunning_1790506497668.jpg';
import bgStemInnov from '../assets/images/ws_stem_stunning_1790506519515.jpg';

interface WorkshopItem {
  id: string;
  name: string;
  subtitle: string;
  duration: string;
  audience: string;
  icon: React.ElementType;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  bgImage: string;
  description: string;
  outcomes: string[];
}

interface PartnerWorkshopsExpandedProps {
  onClose: () => void;
  onOpenContact?: () => void;
}

export const PartnerWorkshopsExpanded: React.FC<PartnerWorkshopsExpandedProps> = ({
  onClose,
}) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [preferredTopic, setPreferredTopic] = useState('AI & Machine Learning');

  // Exact 8 workshop tracks requested by user with flawless layout and visual balance:
  const WORKSHOP_TRACKS: WorkshopItem[] = [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      bgImage: bgAiMl,
      subtitle: 'Neural Networks, Predictive Models & GenAI Workflows',
      duration: '2 to 3 Days / 1-Week Intensive',
      audience: 'B.Tech, BCA, MCA, Diploma & High School (Grades 9-12)',
      icon: Brain,
      accentBg: 'bg-purple-500/10',
      accentBorder: 'border-purple-500/30',
      accentText: 'text-purple-400',
      description:
        'Hands-on deployment of artificial intelligence algorithms, computer vision pipelines, natural language models, and practical data processing using Python and modern cloud AI inference.',
      outcomes: [
        'Supervised & Unsupervised Machine Learning algorithms',
        'Deep learning architectures (CNNs & transformers fundamentals)',
        'Deploying real-time inference on edge and web apps',
        'Certified KITE Robotics AI completion credentials',
      ],
    },
    {
      id: 'robotics-automation',
      name: 'Robotics & Automation',
      bgImage: bgRobotics,
      subtitle: 'Kinematics, Autonomous Navigation & Industrial Robotics',
      duration: '2 to 5 Days Practical Bootcamp',
      audience: 'Mechanical, EEE, ECE, Robotics & Mechatronics Students',
      icon: Bot,
      accentBg: 'bg-cyan-500/10',
      accentBorder: 'border-cyan-500/30',
      accentText: 'text-cyan-400',
      description:
        'Comprehensive hardware assembly, motor actuation, sensor fusion (LiDAR, ultrasonic, encoders), PID closed-loop feedback controllers, and autonomous obstacle avoidance rovers.',
      outcomes: [
        'Differential drive rover build from ground up',
        'Motor driver ICs, relays, encoders, and chassis assembly',
        'Autonomous line tracking, maze solving, and PID balancing',
        'Industry 4.0 automation & robotic arm kinematics',
      ],
    },
    {
      id: 'arduino-iot',
      name: 'Arduino & IoT',
      bgImage: bgArduinoIot,
      subtitle: 'Smart Sensors, ESP32 Cloud Dashboards & Embedded Systems',
      duration: '1 to 3 Days Hands-on Workshop',
      audience: 'School STEM Labs, Engineering 1st & 2nd Year Students',
      icon: Wifi,
      accentBg: 'bg-emerald-500/10',
      accentBorder: 'border-emerald-500/30',
      accentText: 'text-emerald-400',
      description:
        'Interfacing microcontroller boards (Arduino Uno, Nano, ESP32/ESP8266), wireless telemetry over WiFi/Bluetooth, MQTT protocols, and live telemetry cloud dashboards.',
      outcomes: [
        'Breadboard prototyping, sensor calibration (temp, gas, PIR, ultrasonic)',
        'Wireless ESP32 IoT node setup and HTTP/MQTT networking',
        'Real-time IoT cloud dashboard creation (Blynk, Adafruit IO, ThingSpeak)',
        'Take-home hardware prototypes and code repositories',
      ],
    },
    {
      id: 'drone-technology',
      name: 'Drone Technology',
      bgImage: bgDroneTech,
      subtitle: 'UAV Aerodynamics, Flight Controllers & Aerial Piloting',
      duration: '2 to 3 Days Simulator Bootcamp',
      audience: 'Aeronautical, Mechanical, ECE & Drone Enthusiasts',
      icon: Plane,
      accentBg: 'bg-sky-500/10',
      accentBorder: 'border-sky-500/30',
      accentText: 'text-sky-400',
      description:
        'Aerodynamics of multirotor quadcopters, brushless DC motors, ESC calibration, flight controller firmware (Betaflight/ArduPilot), FPV transmission, safety protocols, and DGCA regulatory compliance guidelines.',
      outcomes: [
        'Complete quadcopter frame assembly and soldering',
        'ESC syncing, radio transmitter/receiver pairing and telemetry',
        'Flight controller PID tuning and fail-safe return-to-home setups',
        'Live outdoor flight testing & simulator maneuvering drills',
      ],
    },
    {
      id: '3d-printing-design',
      name: '3D Printing & Design',
      bgImage: bg3dPrint,
      subtitle: 'CAD Prototyping, Additive Slicing & Rapid Fabrication',
      duration: '1 to 2 Days Makerspace Workshop',
      audience: 'All Engineering Streams, Architecture, ATL School Labs',
      icon: Box,
      accentBg: 'bg-amber-500/10',
      accentBorder: 'border-amber-500/30',
      accentText: 'text-amber-400',
      description:
        'Mastering 3D parametric CAD modeling, converting creative ideas into physical prototypes using FDM 3D printers, G-code slicing, nozzle temperature balancing, and mechanical stress considerations.',
      outcomes: [
        'Parametric 3D solid modeling in Fusion 360 / Tinkercad',
        'Slicing software masterclass (layer heights, infill patterns, supports)',
        'Hands-on FDM 3D printer calibration and live filament extrusion',
        'Fabricating custom robotics brackets, gearboxes, and casings',
      ],
    },
    {
      id: 'python-coding',
      name: 'Python & Coding',
      bgImage: bgPythonCode,
      subtitle: 'Algorithmic Problem Solving, OOP & Hardware Scripting',
      duration: '2 to 5 Days Practical Bootcamp',
      audience: 'School Students (Grades 6-12), BCA, B.Sc, B.Tech Beginners',
      icon: Code,
      accentBg: 'bg-blue-500/10',
      accentBorder: 'border-blue-500/30',
      accentText: 'text-blue-400',
      description:
        'Interactive programming bootcamp emphasizing practical, clean Python development, data structures, automation scripts, GUI building, and interfacing with hardware via pySerial.',
      outcomes: [
        'Python syntax, loops, functions, OOP, and modular code architecture',
        'Working with libraries: NumPy, Pandas, Matplotlib, Requests',
        'Building desktop utilities, data loggers, and automation bots',
        'Connecting Python scripts directly to Arduino and microcontrollers',
      ],
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision',
      bgImage: bgCvVision,
      subtitle: 'OpenCV Image Processing, Object Tracking & Edge Vision',
      duration: '2 to 3 Days Intensive Workshop',
      audience: 'CS, IT, AI/ML, ECE & Robotics Research Students',
      icon: Eye,
      accentBg: 'bg-rose-500/10',
      accentBorder: 'border-rose-500/30',
      accentText: 'text-rose-400',
      description:
        'Real-time digital image processing using OpenCV and Python. Covers video capture streams, color space transformations, face detection, contour detection, gesture control, and YOLO object recognition.',
      outcomes: [
        'Camera stream processing, image filtering, edge and contour detection',
        'Real-time color tracking and gesture-controlled interfaces',
        'Haar cascades and deep-learning face/body landmark detection',
        'Vision-guided robotic car steering and obstacle tracking',
      ],
    },
    {
      id: 'stem-innovation',
      name: 'STEM Innovation Workshop',
      bgImage: bgStemInnov,
      subtitle: 'Design Thinking, Creative Prototyping & ATL Hackathons',
      duration: '1 to 3 Days Tech-Fest Event',
      audience: 'ATL Schools, Junior College & College Tech-Fests',
      icon: Sparkles,
      accentBg: 'bg-teal-500/10',
      accentBorder: 'border-teal-500/30',
      accentText: 'text-teal-400',
      description:
        'High-energy, interdisciplinary makerspace innovation sprint blending electronics, coding, mechanical design, and human-centric design thinking to solve UN Sustainable Development Goals (SDGs).',
      outcomes: [
        'Structured design thinking: Empathize, Define, Ideate, Prototype, Test',
        'Team-based problem solving with real hardware kits and tools',
        'Mini-hackathon project presentation with jury evaluation',
        'Winner trophies, medals, and participation certificates for all students',
      ],
    },
  ];

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -10 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="overflow-hidden pt-3 pb-1 w-full"
    >
      <div className="rounded-3xl bg-slate-950/95 border-2 border-cyan-500/40 p-4 sm:p-7 md:p-8 shadow-2xl relative space-y-6 w-full max-w-full">
        {/* Top Header Row with Close Button */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4 sm:pb-5">
          <div className="space-y-1.5 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-mono-code text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">COLLEGE & SCHOOL WORKSHOPS ECOSYSTEM</span>
            </div>
            <h4 className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white tracking-tight">
              Workshops & Hands-On Engineering Bootcamps
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Industry-grade technical workshops delivered directly at your college campus or school ATL lab with real components, specialized kits, and verified certification.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-all cursor-pointer shrink-0"
            title="Close Workshops Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Professional Master Real Workshop Lab Showcase Banner */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl group w-full bg-slate-950">
          <div className="h-56 sm:h-72 md:h-84 lg:h-96 w-full relative overflow-hidden">
            <img
              src={masterWorkshopLabImg}
              alt="Real College Engineering Robotics, AI & IoT Hands-on Workshop Lab"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/60" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

            {/* Top floating quick tags */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/50 text-cyan-300 font-mono-code text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Hands-on Campus Labs
              </span>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-slate-200 font-mono-code text-xs font-medium">
                Hardware Kits Provided Per Team
              </span>
            </div>

            {/* Overlaid Banner Content */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3.5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-mono-code font-extrabold uppercase tracking-wider shadow">
                    All 8 Engineering Tracks
                  </span>
                  <span className="text-[11px] font-mono-code text-cyan-300 hidden md:inline">
                    NAAC / NBA Aligned Practical Training
                  </span>
                </div>
                <h5 className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white leading-tight drop-shadow-lg">
                  Hands-On Real Hardware, Live Coding & Verified Certification
                </h5>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 drop-shadow-md">
                  Delivered on-site at your college auditorium or technical lab. Students build, troubleshoot, and test real autonomous robots, IoT nodes, AI pipelines, and drone prototypes.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono-code text-xs font-bold transition-all shadow-xl shadow-cyan-500/30 flex items-center gap-2 cursor-pointer whitespace-nowrap active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Workshop Slot</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Workshop Categories Grid - Perfectly Aligned, Consistent Orientation */}
        <div className="space-y-3.5 w-full">
          <div className="flex items-center justify-between">
            <h5 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Explore Workshop Tracks We Provide</span>
            </h5>
            <span className="text-xs font-mono-code text-cyan-300/80 font-bold bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              8 Available Tracks
            </span>
          </div>

          {/* Clean, Visual-First Workshop Boxes (Dominant Real Image, Clean Topic Title, and View Details Button) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {WORKSHOP_TRACKS.map((track) => {
              const IconComp = track.icon;

              return (
                <div
                  key={track.id}
                  className="rounded-2xl border border-slate-800 hover:border-cyan-400/80 bg-slate-900/90 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-cyan-950/50 hover:-translate-y-1 flex flex-col group"
                >
                  {/* Real Image filling most of the box */}
                  <div
                    onClick={() => setSelectedWorkshop(track.id)}
                    className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden bg-slate-950 cursor-pointer"
                  >
                    <img
                      src={track.bgImage}
                      alt={track.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Clean Gradient Scrim & Glassy Category Chip */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono-code text-[10px] font-bold shadow-md">
                      <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Workshop</span>
                    </div>
                  </div>

                  {/* Clean Bottom Area: Workshop Name + View Details Button Only */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 gap-3 bg-slate-900">
                    <h6 className="font-display font-black text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors leading-snug line-clamp-1">
                      {track.name}
                    </h6>

                    <button
                      type="button"
                      onClick={() => setSelectedWorkshop(track.id)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-cyan-500/40 font-mono-code text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group/btn active:scale-98"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Workshop Details Modal (Clean, User-Friendly UI/UX with zero clutter) */}
          <AnimatePresence>
            {selectedWorkshop && (() => {
              const activeTrack = WORKSHOP_TRACKS.find((t) => t.id === selectedWorkshop);
              if (!activeTrack) return null;
              const IconComp = activeTrack.icon;

              return (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
                  onClick={() => setSelectedWorkshop(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-cyan-400/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden text-white my-auto"
                  >
                    {/* Top Hero Image inside Modal */}
                    <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-950">
                      <img
                        src={activeTrack.bgImage}
                        alt={activeTrack.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                      
                      {/* Close button */}
                      <button
                        type="button"
                        onClick={() => setSelectedWorkshop(null)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* Header Overlaid */}
                      <div className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono-code text-[10px] font-bold uppercase tracking-wider mb-1.5">
                          <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Certified Technical Bootcamp</span>
                        </div>
                        <h4 className="font-display font-black text-xl sm:text-2xl text-white">
                          {activeTrack.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-cyan-200/90 font-medium">
                          {activeTrack.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Modal Body Content */}
                    <div className="p-4 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeTrack.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code">
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                          <div>
                            <span className="text-slate-400 block text-[10px]">Duration:</span>
                            <span className="text-white font-bold">{activeTrack.duration}</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                          <div>
                            <span className="text-slate-400 block text-[10px]">Target Audience:</span>
                            <span className="text-white font-bold line-clamp-1">{activeTrack.audience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Syllabus / Learning Deliverables */}
                      <div className="space-y-2 pt-1">
                        <div className="text-xs font-bold uppercase font-mono-code text-cyan-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          <span>What Students Learn & Build</span>
                        </div>
                        <div className="space-y-2">
                          {activeTrack.outcomes.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-200"
                            >
                              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono-code text-[10px] font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Modal Footer with Direct Quick Select */}
                    <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs text-slate-400 font-mono-code">
                        Direct Coordinator: <strong className="text-cyan-400">{COMPANY_INFO.phone}</strong>
                      </div>
                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setSelectedWorkshop(null)}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono-code text-xs font-semibold cursor-pointer"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPreferredTopic(activeTrack.name);
                            setSelectedWorkshop(null);
                            const el = document.getElementById('workshop-booking-form');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono-code text-xs font-bold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Select This Workshop</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Company Booking & Contact Information Section */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 p-4 sm:p-6 space-y-5 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-mono-code font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4 shrink-0" />
                <span>BOOK A WORKSHOP FOR YOUR COLLEGE OR SCHOOL</span>
              </div>
              <h5 className="font-display font-black text-lg sm:text-xl text-white">
                Official Booking & Institution Coordinator Hotline
              </h5>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Ready to organize an authorized KITE Robotics workshop, hackathon, or faculty development program (FDP)? Reach out directly:
              </p>
            </div>

            {/* Direct Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono-code text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=College%20Workshop%20Booking%20Inquiry`}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-mono-code text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Contact Details Grid + Quick Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
            {/* Left 5 Cols: Institutional Inclusions */}
            <div className="lg:col-span-5 space-y-3 text-xs w-full">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono-code uppercase text-cyan-400 font-bold">
                  Corporate Academic Cell
                </div>
                <div className="font-bold text-sm text-white">{COMPANY_INFO.name}</div>
                <div className="text-slate-400 leading-relaxed text-[11px]">
                  {COMPANY_INFO.address}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono-code uppercase text-cyan-400 font-bold">
                  Institutional Inclusions Provided
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Dedicated Senior Robotics & AI Trainers at Campus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>1 Hardware Kit per group of 4-5 students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>ISO / Industry Verified Certificates for all attendees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Post-workshop project code & digital resource pack</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right 7 Cols: Fast Workshop Slot Booking Form */}
            <div className="lg:col-span-7 w-full">
              {inquirySent ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h6 className="font-display font-bold text-base text-white">
                    Workshop Booking Request Received!
                  </h6>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{contactPerson || 'Coordinator'}</strong>. Our institutional program director will call you at <strong className="text-cyan-400">{contactPhone}</strong> within 4 business hours to share the syllabus brochure and proposal.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquirySent(false)}
                    className="text-xs text-cyan-400 font-mono-code underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleQuickBook}
                  id="workshop-booking-form" className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 w-full"
                >
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-mono-code">
                    Fast Workshop Slot Booking & Quotation
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono-code text-slate-400 block mb-1">
                        Institution / College / School Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        placeholder="e.g. National Institute of Tech / DPS"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono-code text-slate-400 block mb-1">
                        Faculty / Student Coordinator Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Dr. R. Sharma / Ananya Sen"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono-code text-slate-400 block mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono-code text-slate-400 block mb-1">
                        Preferred Workshop Topic *
                      </label>
                      <select
                        value={preferredTopic}
                        onChange={(e) => setPreferredTopic(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                      >
                        {WORKSHOP_TRACKS.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[10px] font-mono-code text-slate-400">
                      Direct support: {COMPANY_INFO.phone}
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono-code text-xs font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Booking Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
