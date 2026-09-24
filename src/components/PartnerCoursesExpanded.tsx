import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Search,
  Cpu,
  Terminal,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Check,
  Layers,
  Wrench,
  BookOpen
} from 'lucide-react';

export type CourseCategory =
  | 'all'
  | 'foundation'
  | 'robotics'
  | 'embedded'
  | 'ai-data'
  | 'web-dev'
  | 'mobile-core';

export interface TechCourseItem {
  id: string;
  name: string;
  category: CourseCategory;
  categoryLabel: string;
  trackBadge: string;
  tagline: string;
  level: string;
  projects: string;
  curriculumHighlights: string[];
  labHardware: string;
  accentColor: string;
  glowClass: string;
  icon: React.ReactNode;
}

export const TECH_COURSES: TechCourseItem[] = [
  // 1. FOUNDATIONAL STEM & BLOCK CODING
  {
    id: 'scratch',
    name: 'Scratch',
    category: 'foundation',
    categoryLabel: 'Block Coding & Logic',
    trackBadge: 'Visual Coding',
    tagline: 'Event-driven visual programming, algorithmic logic, sprite mechanics & interactive storytelling',
    level: 'Grade 1 - Grade 8 (Foundational STEM)',
    projects: 'Maze navigators, animated storyboards, obstacle-dodging arcade games, interactive math quizzes',
    curriculumHighlights: [
      'Loops, Conditionals & Variables with Visual Blocks',
      'Broadcast Messaging & Multi-Sprite Coordination',
      'Game Physics (Gravity, Velocity & Collision Detection)',
      'Interactive Sound Synthesis & Creative Coding'
    ],
    labHardware: 'Web-based Scratch 3.0, Tablets/Laptops, Makey Makey Interaction Kits',
    accentColor: '#FFAB19',
    glowClass: 'from-amber-500/20 to-orange-600/10 border-amber-400/60 shadow-amber-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        {/* Cat Head in Authentic Scratch Orange */}
        <path
          d="M12 18L7 9L17 12C20 10 28 10 31 12L41 9L36 18C41 23 41 33 36 38C30 43 18 43 12 38C7 33 7 23 12 18Z"
          fill="#FFAB19"
          stroke="#E69500"
          strokeWidth="1.5"
        />
        {/* Ear Inners */}
        <polygon points="10,13 14,14 11,18" fill="#FFFFFF" />
        <polygon points="38,13 34,14 37,18" fill="#FFFFFF" />
        {/* White Cheeks */}
        <ellipse cx="24" cy="29" rx="10" ry="7" fill="#FFFFFF" />
        {/* Eyes */}
        <ellipse cx="17" cy="22" rx="3.5" ry="4" fill="#FFFFFF" />
        <circle cx="18" cy="22" r="2.2" fill="#0E2439" />
        <ellipse cx="31" cy="22" rx="3.5" ry="4" fill="#FFFFFF" />
        <circle cx="30" cy="22" r="2.2" fill="#0E2439" />
        {/* Nose & Smile */}
        <polygon points="24,27 22,25 26,25" fill="#0E2439" />
        <path d="M21 29C22.5 31 25.5 31 27 29" stroke="#0E2439" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'mit-app-inventor',
    name: 'MIT App Inventor',
    category: 'foundation',
    categoryLabel: 'Mobile App Builder',
    trackBadge: 'Mobile Blocks',
    tagline: 'Drag-and-drop mobile application builder, phone sensor telemetry & Bluetooth robotic interfaces',
    level: 'Grade 5 - High School / College',
    projects: 'Bluetooth rover controller app, campus voice assistant, GPS emergency safety beacon, smart light client',
    curriculumHighlights: [
      'UI Designer & Block Editor Architecture',
      'Device Sensor Suite (Accelerometer, Gyro, Compass, GPS)',
      'Bluetooth SPP/BLE Client & Microcontroller Telemetry',
      'TinyDB Local Caching & Cloud Web API Integration'
    ],
    labHardware: 'MIT AI2 Companion, Android Test Devices, ESP32/HC-05 Modules',
    accentColor: '#EA580C',
    glowClass: 'from-orange-500/20 to-red-600/10 border-orange-400/60 shadow-orange-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        {/* Device Outline */}
        <rect x="11" y="7" width="26" height="36" rx="5" fill="#0F172A" stroke="#EA580C" strokeWidth="2.2" />
        <line x1="20" y1="10" x2="28" y2="10" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="40" x2="28" y2="40" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
        {/* 4 Block Matrix */}
        <rect x="16" y="15" width="7" height="7" rx="1.5" fill="#F97316" />
        <rect x="25" y="15" width="7" height="7" rx="1.5" fill="#E11D48" />
        <rect x="16" y="24" width="7" height="7" rx="1.5" fill="#0D9488" />
        <rect x="25" y="24" width="7" height="7" rx="1.5" fill="#EAB308" />
        <rect x="16" y="33" width="16" height="3.5" rx="1" fill="#38BDF8" />
        {/* Antenna */}
        <path d="M24 7V3" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="3" r="2" fill="#F97316" />
      </svg>
    ),
  },
  {
    id: 'tinkercad',
    name: 'Tinkercad',
    category: 'foundation',
    categoryLabel: '3D CAD & Circuits',
    trackBadge: '3D Simulation',
    tagline: 'Autodesk 3D spatial geometry modeling, parametric grouping, breadboard circuits & virtual Arduino testing',
    level: 'Grade 4 - Grade 10 (ATL Labs)',
    projects: 'Custom 3D-printable robotic chassis, traffic light circuit simulator, ultrasonic distance detector prototype',
    curriculumHighlights: [
      'Solid vs. Hole Boolean Geometry & Grouping',
      'Precision Measurement & Workplane Calibration',
      'Virtual Breadboard Circuit Analysis with Multimeters',
      'Block & Text-Based Arduino Simulation with Live Oscilloscope'
    ],
    labHardware: 'Standard WebGL Browser, FDM 3D Printers for STL Export',
    accentColor: '#00B4D8',
    glowClass: 'from-cyan-500/20 to-blue-600/10 border-cyan-400/60 shadow-cyan-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        {/* Top Face - Cyan */}
        <path d="M24 6L39 14.5L24 23L9 14.5L24 6Z" fill="#00B4D8" stroke="#0096C7" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Left Face - Coral/Magenta */}
        <path d="M9 14.5L24 23V40L9 31.5V14.5Z" fill="#FF3366" stroke="#D90429" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right Face - Vibrant Golden Yellow */}
        <path d="M39 14.5L24 23V40L39 31.5V14.5Z" fill="#FFB703" stroke="#FB8500" strokeWidth="1.5" strokeLinejoin="round" />
        {/* 3D grid line accents */}
        <line x1="24" y1="23" x2="24" y2="40" stroke="#0F172A" strokeWidth="1.5" />
        <circle cx="24" cy="14.5" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
      </svg>
    ),
  },

  // 2. ROBOTICS & 3D FABRICATION
  {
    id: 'ai-robotics',
    name: 'AI and Robotics',
    category: 'robotics',
    categoryLabel: 'Robotics & Hardware',
    trackBadge: 'Robotics Systems',
    tagline: 'Autonomous systems, kinematics, path planning algorithms & vision-guided rovers',
    level: 'Grade 6 - College Level',
    projects: 'Obstacle avoidance rovers, robotic arms, line maze solvers, SLAM map builders',
    curriculumHighlights: [
      'Robotic Kinematics & Mechanics',
      'Computer Vision Integration',
      'Sensor Fusion & Motor Control',
      'Autonomous Decision Loops'
    ],
    labHardware: 'Kite Alpha Rover Kit, Depth Cameras & Ultrasonic Arrays',
    accentColor: '#00D8F6',
    glowClass: 'from-cyan-500/20 to-blue-600/10 border-cyan-400/60 shadow-cyan-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="8" y="12" width="32" height="26" rx="8" fill="#0E2439" stroke="#00D8F6" strokeWidth="2.5" />
        <path d="M24 6V12" stroke="#00D8F6" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="5" r="2.5" fill="#38BDF8" />
        <circle cx="18" cy="22" r="3.5" fill="#00D8F6" />
        <circle cx="30" cy="22" r="3.5" fill="#00D8F6" />
        <path d="M17 31C19 33 29 33 31 31" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 22H8M40 22H44" stroke="#00D8F6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '3d-printing',
    name: '3-D printing',
    category: 'robotics',
    categoryLabel: 'Robotics & Hardware',
    trackBadge: 'Additive Fab',
    tagline: 'Additive manufacturing, parametric CAD modeling, slicing profiles & rapid prototype engineering',
    level: 'Grade 5 - Professional',
    projects: 'Custom drone airframes, robotic chassis, bionic hand prosthetics, custom gearboxes',
    curriculumHighlights: [
      'Parametric CAD in Fusion 360 & Onshape',
      'Slicing Profiles & Infill Structural Physics',
      'FDM vs Resin Rapid Prototyping',
      'Mechanical Tolerances & Snap-Fit Enclosures'
    ],
    labHardware: 'Industrial FDM 3D Printers, PLA/PETG/TPU Filaments, Digital Calipers',
    accentColor: '#F59E0B',
    glowClass: 'from-amber-500/20 to-yellow-600/10 border-amber-400/60 shadow-amber-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M16 8H32V16H16V8Z" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2.5" />
        <path d="M21 16L24 22L27 16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="22" x2="24" y2="26" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 2" />
        <path d="M10 32L24 26L38 32L24 38L10 32Z" stroke="#FBBF24" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M10 38L24 44L38 38" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="26" r="1.5" fill="#EF4444" />
      </svg>
    ),
  },

  // 3. HARDWARE, EMBEDDED & IOT
  {
    id: 'arduino',
    name: 'Arduino',
    category: 'embedded',
    categoryLabel: 'Embedded & IoT',
    trackBadge: 'Microcontroller',
    tagline: 'Microcontroller architecture, PWM control, analog-to-digital sensor suites & actuators',
    level: 'Beginner to Advanced',
    projects: 'Smart weather stations, home automation hubs, biometric door locks, digital tachometers',
    curriculumHighlights: [
      'ATmega328P Architecture & GPIO',
      'PWM Signal Control & External Interrupts',
      'Analog & Digital Sensor Integration',
      'Relays, DC Motors & Servo Control'
    ],
    labHardware: 'Arduino Uno R3/R4, Sensor Shield v5, Servo & Stepper Motors',
    accentColor: '#00979D',
    glowClass: 'from-teal-500/20 to-emerald-600/10 border-teal-400/60 shadow-teal-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path
          d="M17 14C11.5 14 7 18.5 7 24C7 29.5 11.5 34 17 34C21.5 34 24 30.5 24 24C24 17.5 21.5 14 17 14Z"
          stroke="#00979D"
          strokeWidth="3.2"
        />
        <path
          d="M31 14C36.5 14 41 18.5 41 24C41 29.5 36.5 34 31 34C26.5 34 24 30.5 24 24C24 17.5 26.5 14 31 14Z"
          stroke="#00979D"
          strokeWidth="3.2"
        />
        <path d="M13 24H21" stroke="#00979D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M31 20V28M27 24H35" stroke="#00979D" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'embedded-cpp',
    name: 'Embedded C/C++',
    category: 'embedded',
    categoryLabel: 'Embedded & IoT',
    trackBadge: 'Bare Metal',
    tagline: 'Bare-metal programming, memory registers, real-time operating concepts & driver protocols',
    level: 'Intermediate - University',
    projects: 'Custom RTOS schedulers, digital signal filters, UART communication bridges, SPI drivers',
    curriculumHighlights: [
      'Register Manipulation & Bitmasking',
      'Timers, Counters & Watchdogs',
      'I2C, SPI & UART Protocol Drivers',
      'Low-Power Sleep Modes & Interrupt Handlers'
    ],
    labHardware: 'STM32 Nucleo, Logic Analyzers, Oscilloscopes, ESP32 Modules',
    accentColor: '#659AD2',
    glowClass: 'from-blue-600/20 to-indigo-600/10 border-blue-400/60 shadow-blue-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path
          d="M24 4L40 13V35L24 44L8 35V13L24 4Z"
          fill="#0D2137"
          stroke="#00599C"
          strokeWidth="2.5"
        />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fill="#659AD2"
          fontSize="14"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          C++
        </text>
      </svg>
    ),
  },
  {
    id: 'iot',
    name: 'IOT',
    category: 'embedded',
    categoryLabel: 'Embedded & IoT',
    trackBadge: 'Connected Edge',
    tagline: 'Cloud telemetry, MQTT brokers, smart city grids & remote edge monitoring systems',
    level: 'Middle School - Advanced',
    projects: 'Smart irrigation telematics, industrial temperature logger, remote energy monitor',
    curriculumHighlights: [
      'MQTT, HTTP & WebSocket Telemetry',
      'Cloud Dashboards (Blynk, AWS IoT)',
      'ESP32 Wi-Fi & BLE Networking Stacks',
      'Data Encryption & Edge Security Standards'
    ],
    labHardware: 'NodeMCU ESP8266, ESP32 Dual-Core, Environmental Sensor Suite',
    accentColor: '#10B981',
    glowClass: 'from-emerald-500/20 to-teal-600/10 border-emerald-400/60 shadow-emerald-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <circle cx="24" cy="24" r="6" fill="#10B981" />
        <circle cx="10" cy="14" r="3.5" fill="#34D399" />
        <circle cx="38" cy="14" r="3.5" fill="#34D399" />
        <circle cx="12" cy="36" r="3.5" fill="#34D399" />
        <circle cx="36" cy="36" r="3.5" fill="#34D399" />
        <path d="M13 16L20 21M35 16L28 21M15 34L20 27M33 34L28 27" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M19 14A8 8 0 0 1 29 14" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 10A12 12 0 0 1 32 10" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // 4. AI & DATA SCIENCE
  {
    id: 'ai-ml',
    name: 'AI/ML',
    category: 'ai-data',
    categoryLabel: 'AI & Data Science',
    trackBadge: 'Machine Learning',
    tagline: 'Machine learning algorithms, neural network design, predictive modeling & classification',
    level: 'High School - University',
    projects: 'House price predictive models, sentiment classifiers, medical diagnosis assistant',
    curriculumHighlights: [
      'Supervised & Unsupervised Learning',
      'Decision Trees, SVMs & Linear/Logistic Regression',
      'Model Evaluation, Confusion Matrices & Cross-Validation',
      'Serving ML Models as REST Microservices'
    ],
    labHardware: 'High-compute GPU Notebooks, Google Colab Pro integration',
    accentColor: '#8B5CF6',
    glowClass: 'from-purple-500/20 to-pink-600/10 border-purple-400/60 shadow-purple-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <circle cx="12" cy="14" r="4" fill="#8B5CF6" />
        <circle cx="12" cy="34" r="4" fill="#8B5CF6" />
        <circle cx="24" cy="10" r="4" fill="#A78BFA" />
        <circle cx="24" cy="24" r="5" fill="#C4B5FD" />
        <circle cx="24" cy="38" r="4" fill="#A78BFA" />
        <circle cx="36" cy="18" r="4" fill="#EC4899" />
        <circle cx="36" cy="30" r="4" fill="#EC4899" />
        <path d="M15 16L20 22M15 32L20 26M15 13L20 11M15 35L20 37M28 12L33 16M28 22L33 20M28 26L33 28M28 36L33 32" stroke="#8B5CF6" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'ai-data',
    categoryLabel: 'AI & Data Science',
    trackBadge: 'General Language',
    tagline: 'Modern programming foundations, OOP, automation scripts & algorithmic logic',
    level: 'Grade 6 - All Levels',
    projects: 'Web scraping bots, automated email reporting, CLI games, mathematical calculators',
    curriculumHighlights: [
      'Control Flow & Data Structures (Lists, Dicts, Sets)',
      'Object-Oriented Architecture & Inheritance',
      'File I/O, Generators & Exception Handling',
      'Standard Library & PyPI Ecosystem Mastery'
    ],
    labHardware: 'Python 3.12 Runtime, VS Code, Jupyter Environment',
    accentColor: '#3776AB',
    glowClass: 'from-blue-500/20 to-yellow-500/15 border-blue-400/60 shadow-blue-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path
          d="M23.5 6C16.8 6 17.2 8.9 17.2 8.9L17.2 12L24 12L24 13L13.5 13C8.8 13 6 16.5 6 21.2C6 26.6 8.9 26.3 8.9 26.3L11.5 26.3L11.5 22.8C11.5 18.7 15 18.3 15 18.3L23.8 18.3C27.9 18.3 28.5 14.8 28.5 14.8L28.5 8.9C28.5 8.9 28.5 6 23.5 6ZM20 9.2C20.8 9.2 21.4 9.8 21.4 10.6C21.4 11.4 20.8 12 20 12C19.2 12 18.6 11.4 18.6 10.6C18.6 9.8 19.2 9.2 20 9.2Z"
          fill="#3776AB"
        />
        <path
          d="M24.5 42C31.2 42 30.8 39.1 30.8 39.1L30.8 36L24 36L24 35L34.5 35C39.2 35 42 31.5 42 26.8C42 21.4 39.1 21.7 39.1 21.7L36.5 21.7L36.5 25.2C36.5 29.3 33 29.7 33 29.7L24.2 29.7C20.1 29.7 19.5 33.2 19.5 33.2L19.5 39.1C19.5 39.1 19.5 42 24.5 42ZM28 38.8C27.2 38.8 26.6 38.2 26.6 37.4C26.6 36.6 27.2 36 28 36C28.8 36 29.4 36.6 29.4 37.4C29.4 38.2 28.8 38.8 28 38.8Z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    id: 'numpy',
    name: 'Numpy',
    category: 'ai-data',
    categoryLabel: 'AI & Data Science',
    trackBadge: 'Array Math',
    tagline: 'High-performance n-dimensional array mathematics and vector computing',
    level: 'Intermediate - Advanced',
    projects: 'Image matrix filters, linear algebra solver, vectorized sound frequency analyzer',
    curriculumHighlights: [
      'NDArray Slicing & Broadcasting Mechanics',
      'Matrix Multiplications & Eigen Inversions',
      'Mathematical & Statistical Array Methods',
      'Memory Alignment & C-Vectorization'
    ],
    labHardware: 'Scientific Python Environment, NumPy C-Extensions',
    accentColor: '#4DABF7',
    glowClass: 'from-blue-600/20 to-cyan-600/10 border-blue-400/60 shadow-blue-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M24 6L40 15V33L24 42L8 33V15L24 6Z" fill="#013243" stroke="#4D77CF" strokeWidth="2.2" />
        <path d="M24 6V24L40 15" stroke="#4D77CF" strokeWidth="2" />
        <path d="M24 24L8 15" stroke="#4D77CF" strokeWidth="2" />
        <path d="M24 24V42" stroke="#4D77CF" strokeWidth="2" />
        <text
          x="24"
          y="27"
          textAnchor="middle"
          fill="#4DABF7"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          NP
        </text>
      </svg>
    ),
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'ai-data',
    categoryLabel: 'AI & Data Science',
    trackBadge: 'Data Wrangling',
    tagline: 'Data manipulation, time-series parsing, CSV/Excel aggregation & ETL pipelines',
    level: 'Intermediate',
    projects: 'Financial stock portfolio analyzer, student attendance mining, sales analytics pipeline',
    curriculumHighlights: [
      'Series & DataFrame Indexing Operations',
      'Data Cleaning & Imputing Missing Values',
      'Groupby Aggregations & Pivot Tables',
      'Time Series Analysis & Date Range Filtering'
    ],
    labHardware: 'JupyterLab with Real-World Datasets',
    accentColor: '#F43F5E',
    glowClass: 'from-pink-500/20 to-purple-600/10 border-pink-400/60 shadow-pink-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="8" y="8" width="8" height="18" rx="3" fill="#150458" stroke="#6366F1" strokeWidth="1.8" />
        <rect x="20" y="14" width="8" height="24" rx="3" fill="#E70488" stroke="#F43F5E" strokeWidth="1.8" />
        <rect x="32" y="8" width="8" height="26" rx="3" fill="#FFCA00" stroke="#F59E0B" strokeWidth="1.8" />
        <circle cx="12" cy="34" r="3" fill="#150458" />
      </svg>
    ),
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'ai-data',
    categoryLabel: 'AI & Data Science',
    trackBadge: 'Scientific Viz',
    tagline: '2D & 3D scientific graphing, publication-quality figures & custom telemetry animations',
    level: 'All Levels',
    projects: 'Robotics sensor real-time telemetry plots, COVID trend grapher, mathematical function plotters',
    curriculumHighlights: [
      'Figure & Axes Hierarchy Architecture',
      'Histograms, Scatter Plots & Heatmaps',
      'Subplots & Multi-figure Canvases',
      'Live Telemetry Dynamic Plot Updates'
    ],
    labHardware: 'Python Matplotlib & SciPy Toolkits',
    accentColor: '#00A8E8',
    glowClass: 'from-sky-500/20 to-blue-600/10 border-sky-400/60 shadow-sky-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="6" y="8" width="36" height="32" rx="6" fill="#0C1B2A" stroke="#11557C" strokeWidth="2" />
        <path d="M11 32C15 22 19 36 24 16C29 36 33 22 37 32" stroke="#00A8E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="16" r="3" fill="#FF5964" />
        <circle cx="17" cy="29" r="2.5" fill="#F18F01" />
        <circle cx="31" cy="29" r="2.5" fill="#F18F01" />
      </svg>
    ),
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'ai-data',
    categoryLabel: 'AI & Data Science',
    trackBadge: 'Statistical Viz',
    tagline: 'Statistical data visualization, bivariate distributions & aesthetic themes',
    level: 'Intermediate',
    projects: 'Demographic correlation matrix, customer cohort heatmaps, categorical boxplots',
    curriculumHighlights: [
      'Pairplots & Correlation Matrices',
      'Categorical Estimators & Bar Plots',
      'Color Palettes & Theme Overrides',
      'Statistical Regression Curves'
    ],
    labHardware: 'Seaborn Statistical Stack',
    accentColor: '#4E79A7',
    glowClass: 'from-cyan-500/20 to-blue-500/10 border-cyan-400/60 shadow-cyan-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="6" fill="#0B2027" stroke="#4E79A7" strokeWidth="2" />
        <path d="M12 36C18 36 20 18 24 18C28 18 30 36 36 36" fill="#4E79A7" fillOpacity="0.4" stroke="#4E79A7" strokeWidth="2.5" />
        <path d="M12 36C18 36 20 25 24 25C28 25 30 36 36 36" fill="#F28E2B" fillOpacity="0.5" stroke="#F28E2B" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'pytorch',
    name: 'Pytorch',
    category: 'ai-data',
    categoryLabel: 'AI & Data Science',
    trackBadge: 'Deep Learning',
    tagline: 'Deep learning tensors, dynamic autograd computation graphs & convolutional vision',
    level: 'Advanced - College',
    projects: 'Handwritten digit classifier (MNIST), transfer learning object detector, neural style transfer',
    curriculumHighlights: [
      'Tensors & Autograd Mechanics',
      'Custom nn.Module Architectures',
      'Optimizers (Adam, SGD) & Loss Functions',
      'Transfer Learning with ResNet & Vision Transformers'
    ],
    labHardware: 'NVIDIA CUDA Acceleration & PyTorch 2.0',
    accentColor: '#EE4C2C',
    glowClass: 'from-orange-500/20 to-red-600/10 border-orange-400/60 shadow-orange-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path
          d="M26.5 8L18 16.5C14.7 19.8 14.7 25.2 18 28.5L27 37.5L31.5 33L22.5 24C21.7 23.2 21.7 21.8 22.5 21L26.5 17L26.5 8Z"
          fill="#EE4C2C"
        />
        <circle cx="31" cy="12" r="3.5" fill="#EE4C2C" />
      </svg>
    ),
  },

  // 5. WEB & FULL-STACK DEVELOPMENT
  {
    id: 'html',
    name: 'html',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'Markup',
    tagline: 'Semantic markup, accessible web hierarchy, forms & multimedia embeddings',
    level: 'Foundational',
    projects: 'Personal developer portfolio, interactive forms, academic project showcase',
    curriculumHighlights: [
      'Semantic HTML5 Architecture',
      'Accessible Web Standards (ARIA)',
      'Form Validation & Input Types',
      'Audio, Video & Canvas Embeds'
    ],
    labHardware: 'Standard Web Platform',
    accentColor: '#E44D26',
    glowClass: 'from-orange-500/20 to-red-600/10 border-orange-400/60 shadow-orange-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M9 4L12 38L24 42L36 38L39 4H9Z" fill="#E44D26" />
        <path d="M24 7.5V38.8L33.3 35.8L35.8 7.5H24Z" fill="#F16529" />
        <path d="M16 14H32L31.5 20H16.5L17 26H31L30 33L24 34.8L18 33L17.5 29H14L15 36L24 38.5L33 36L34.5 18H15.5L16 14Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'css',
    name: 'css',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'Styling',
    tagline: 'Visual layouts, CSS Grid, Flexbox, custom keyframe animations & variables',
    level: 'Foundational to Intermediate',
    projects: 'Animated cards, responsive flex layout prototypes, CSS art badges',
    curriculumHighlights: [
      'Box Model, Margins & Paddings',
      'CSS Grid & Flexbox Deep Dive',
      'Keyframe Animations & Transitions',
      'CSS Variables & Responsive Media Queries'
    ],
    labHardware: 'Standard Web Platform',
    accentColor: '#1572B6',
    glowClass: 'from-blue-500/20 to-sky-600/10 border-blue-400/60 shadow-blue-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M9 4L12 38L24 42L36 38L39 4H9Z" fill="#1572B6" />
        <path d="M24 7.5V38.8L33.3 35.8L35.8 7.5H24Z" fill="#33A9DC" />
        <path d="M16 14H32L31.5 20H24V25H31L30 33L24 34.8L18 33L17.5 29H14L15 36L24 38.5L33 36L34.5 14H24V18H16L16 14Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'js',
    name: 'js',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'Client Script',
    tagline: 'DOM manipulation, asynchronous ES6+, Promises, Fetch API & web interactivity',
    level: 'Beginner to Advanced',
    projects: 'Interactive robotics status monitor, calculator app, dynamic weather dashboard',
    curriculumHighlights: [
      'ES6+ Syntax, Arrow Functions & Destructuring',
      'DOM Events & Dynamic Manipulation',
      'Async/Await, Promises & Fetch API',
      'Local Storage & Browser APIs'
    ],
    labHardware: 'V8 Engine / Browser DevTools',
    accentColor: '#F7DF1E',
    glowClass: 'from-yellow-400/20 to-amber-500/10 border-yellow-400/60 shadow-yellow-400/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="6" fill="#F7DF1E" />
        <path d="M18 32C18 34.5 16.5 35.5 14 35.5C11.5 35.5 10 34 10 32" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        <path d="M29 23C26 23 25 24.5 25 26.5C25 31 31 30.5 31 33.5C31 35 29.5 35.5 27.5 35.5C25 35.5 24 34 24 32" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'bootstrap',
    name: 'bootsrtap',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'CSS Framework',
    tagline: 'Responsive 12-column grid system, utility components & mobile-first UI design',
    level: 'Beginner',
    projects: 'School event landing page, admin portal UI, product landing showcase',
    curriculumHighlights: [
      'Flexbox & 12-Col Grid Mastery',
      'Modal, Navbar & Card Components',
      'Responsive Breakpoints & Gutters',
      'Custom Theme SASS Overrides'
    ],
    labHardware: 'Standard Web Browser & Editor',
    accentColor: '#7952B3',
    glowClass: 'from-purple-600/20 to-indigo-600/10 border-purple-400/60 shadow-purple-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="10" fill="#7952B3" />
        <text
          x="24"
          y="33"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="24"
          fontWeight="900"
          fontFamily="serif"
        >
          B
        </text>
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'tailwwind',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'Utility CSS',
    tagline: 'Utility-first CSS, modern design systems, micro-animations & dark mode theming',
    level: 'Beginner - Intermediate',
    projects: 'High-tech SaaS landing pages, responsive mobile web apps, glassmorphic interfaces',
    curriculumHighlights: [
      'Utility-First Philosophy & JIT Engine',
      'Responsive Prefixes (sm, md, lg)',
      'Dark Mode & Custom Theme Config',
      'Typography & Component Styling'
    ],
    labHardware: 'Tailwind CSS v4 & PostCSS Tooling',
    accentColor: '#38BDF8',
    glowClass: 'from-sky-400/20 to-teal-500/10 border-sky-400/60 shadow-sky-400/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path
          d="M15 19C16.8 14.5 21 13 25.5 14.5C28.2 15.4 30 17.5 31.5 20C33.75 23.75 36 26.5 40.5 26.5C45 26.5 48 22 48 22C46.2 26.5 42 28 37.5 26.5C34.8 25.6 33 23.5 31.5 21C29.25 17.25 27 14.5 22.5 14.5C18 14.5 15 19 15 19ZM3 29C4.8 24.5 9 23 13.5 24.5C16.2 25.4 18 27.5 19.5 30C21.75 33.75 24 36.5 28.5 36.5C33 36.5 36 32 36 32C34.2 36.5 30 38 25.5 36.5C22.8 35.6 21 33.5 19.5 31C17.25 27.25 15 24.5 10.5 24.5C6 24.5 3 29 3 29Z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'react',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'UI Library',
    tagline: 'Component architecture, Virtual DOM, React Hooks & modern SPA state management',
    level: 'Intermediate - Advanced',
    projects: 'Live robotics telemetry dashboard, interactive quiz app, kit ordering system',
    curriculumHighlights: [
      'Functional Components & JSX',
      'useState, useEffect & Custom Hooks',
      'State Management & Context API',
      'Vite & Next.js Modern Build Pipelines'
    ],
    labHardware: 'Node.js LTS, Vite, TypeScript Environment',
    accentColor: '#61DAFB',
    glowClass: 'from-cyan-400/20 to-sky-500/10 border-cyan-400/60 shadow-cyan-400/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" transform="rotate(0 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3.5" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    id: 'flask',
    name: 'flask',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'Micro-Framework',
    tagline: 'Lightweight WSGI micro-framework, REST API routing & hardware control endpoints',
    level: 'Intermediate',
    projects: 'Robotics web controller API, IoT sensor dashboard server, JWT auth microservice',
    curriculumHighlights: [
      'RESTful Endpoint Routing',
      'Jinja2 Dynamic Templating',
      'Request/Response Lifecycle',
      'Connecting Hardware Pins to Web APIs'
    ],
    labHardware: 'Raspberry Pi / Cloud Server Runtime',
    accentColor: '#E2E8F0',
    glowClass: 'from-slate-400/20 to-cyan-500/10 border-slate-300/60 shadow-slate-300/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path
          d="M20 8H28V16L36 34C37.5 37 35.5 40 32 40H16C12.5 40 10.5 37 12 34L20 16V8Z"
          stroke="#E2E8F0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M18 8H30" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M15 32H33" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="21" cy="35" r="1.5" fill="#38BDF8" />
        <circle cx="27" cy="33" r="2" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'django',
    name: 'django',
    category: 'web-dev',
    categoryLabel: 'Web & Full-Stack',
    trackBadge: 'Full-Stack',
    tagline: 'Batteries-included web framework, ORM models, admin dashboard & secure authentication',
    level: 'Intermediate - Advanced',
    projects: 'College LMS portal, e-commerce store with payments, student attendance portal',
    curriculumHighlights: [
      'Model-View-Template (MVT) Pattern',
      'Django ORM & PostgreSQL Migrations',
      'User Auth & Role Management',
      'Django REST Framework (DRF)'
    ],
    labHardware: 'Production WSGI / ASGI Environments',
    accentColor: '#44B78B',
    glowClass: 'from-emerald-600/20 to-green-700/10 border-emerald-400/60 shadow-emerald-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="#092E20" stroke="#44B78B" strokeWidth="2" />
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fill="#44B78B"
          fontSize="18"
          fontWeight="900"
          fontFamily="system-ui, serif"
        >
          dj
        </text>
      </svg>
    ),
  },

  // 6. MOBILE & CORE ENTERPRISE
  {
    id: 'java',
    name: 'Java',
    category: 'mobile-core',
    categoryLabel: 'Mobile & Systems',
    trackBadge: 'Enterprise OOP',
    tagline: 'Enterprise OOP, robust memory models, multi-threading & collections framework',
    level: 'High School - College',
    projects: 'Banking management system, multithreaded chat server, inventory tracker',
    curriculumHighlights: [
      'Inheritance, Polymorphism & Abstraction',
      'Java Collections Framework',
      'Concurrency & Thread Safety',
      'JVM Architecture & Garbage Collection'
    ],
    labHardware: 'OpenJDK 21, IntelliJ IDEA / Eclipse Suite',
    accentColor: '#EA2D2E',
    glowClass: 'from-red-500/20 to-orange-600/10 border-red-400/60 shadow-red-500/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path
          d="M27 8C27 8 30 11 26 14C23 16 25 18 29 20C33 22 28 26 23 25"
          stroke="#EA2D2E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M21 11C21 11 23 13 21 15C19 17 20 18 23 19"
          stroke="#5382A1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 30C12 30 14 33 24 33C34 33 36 30 36 30"
          stroke="#5382A1"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M15 36C15 36 18 39 24 39C30 39 33 36 33 36"
          stroke="#EA2D2E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 42C16 44 32 44 38 42"
          stroke="#5382A1"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'flutter',
    name: 'flutter',
    category: 'mobile-core',
    categoryLabel: 'Mobile & Systems',
    trackBadge: 'Cross-Platform',
    tagline: 'Cross-platform native iOS & Android applications with Dart & widget trees',
    level: 'Intermediate - Advanced',
    projects: 'Bluetooth rover controller app, campus student companion, IoT telemetry app',
    curriculumHighlights: [
      'Dart Language Fundamentals',
      'Stateless & Stateful Widget Tree',
      'Bluetooth & BLE Plugin Integration',
      'Native Android & iOS Compilation'
    ],
    labHardware: 'Flutter SDK, Android Studio, Physical Testing Device',
    accentColor: '#02569B',
    glowClass: 'from-sky-500/20 to-blue-600/10 border-sky-400/60 shadow-sky-400/25',
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M26 6L11 21L16 26L36 6H26Z" fill="#42A5F5" />
        <path d="M26 22L17 31L26 40H36L27 31L36 22H26Z" fill="#02569B" />
        <path d="M21.5 35.5L26 40H36L26 30L21.5 35.5Z" fill="#0175C2" />
        <path d="M17 31L21.5 35.5L26 31L21.5 26.5L17 31Z" fill="#29B6F6" />
      </svg>
    ),
  },
];

const CATEGORIES: { id: CourseCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Tech', count: 25 },
  { id: 'foundation', label: 'Block Coding & 3D', count: 3 },
  { id: 'robotics', label: 'Robotics & Hardware', count: 2 },
  { id: 'embedded', label: 'Embedded & IoT', count: 3 },
  { id: 'ai-data', label: 'AI & Data Science', count: 7 },
  { id: 'web-dev', label: 'Web & Full-Stack', count: 8 },
  { id: 'mobile-core', label: 'Mobile & Core', count: 2 },
];

interface PartnerCoursesExpandedProps {
  onClose: () => void;
}

export const PartnerCoursesExpanded: React.FC<PartnerCoursesExpandedProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('scratch');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return TECH_COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        course.name.toLowerCase().includes(q) ||
        course.tagline.toLowerCase().includes(q) ||
        course.categoryLabel.toLowerCase().includes(q) ||
        course.trackBadge.toLowerCase().includes(q) ||
        course.projects.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Current active spotlight course
  const activeCourse = useMemo(() => {
    return (
      TECH_COURSES.find((c) => c.id === selectedCourseId) || TECH_COURSES[0]
    );
  }, [selectedCourseId]);

  const handleCopySummary = (course: TechCourseItem) => {
    const summary = `${course.name} (${course.categoryLabel})\nLevel: ${course.level}\nProjects: ${course.projects}\nLab Hardware: ${course.labHardware}`;
    navigator.clipboard?.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -16 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -16 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden pt-3 sm:pt-5 pb-2"
    >
      <div className="rounded-3xl bg-slate-950/95 border-2 border-cyan-500/50 p-4 sm:p-7 shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-5 ring-1 ring-cyan-400/25">
        {/* Subtle Ambient Radial Lighting Effects */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />

        {/* Master Header with Institutional Badge & Quick Close */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/90 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-[10px] sm:text-[11px] font-mono-code text-cyan-300 font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>TURNKEY ACADEMIC CURRICULUM • ALL 25 MASTER TECHNOLOGIES</span>
            </div>
            <h4 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight">
              Interactive STEM & Tech Lab Matrix
            </h4>
            <p className="text-xs sm:text-sm text-cyan-100/80 leading-relaxed font-sans">
              From foundational visual coding (Scratch, MIT App Inventor, Tinkercad) to embedded robotics, AI data science, and modern full-stack web applications.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-950/70 text-slate-300 hover:text-red-400 border border-slate-700/80 hover:border-red-500/50 transition-all cursor-pointer flex items-center gap-2 text-xs font-mono-code font-bold shadow-md active:scale-95"
              title="Close Course Modules"
            >
              <X className="w-4 h-4" />
              <span>Close View</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 relative z-10">
          {/* Quick Category Tabs with Counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-mono-code text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-cyan-300'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[220px] sm:min-w-[260px]">
            <Search className="w-4 h-4 text-cyan-400/80 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tech, e.g. Scratch, Arduino..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-xs font-mono-code text-white placeholder-slate-500 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 25 Technologies Grid - CLEAN ICONS WITH DISTINCT HIGH-TECH CARD */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2.5 sm:gap-3 relative z-10 pt-1">
          {filteredCourses.map((item) => {
            const isSelected = item.id === selectedCourseId;

            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCourseId(item.id)}
                className={`group relative flex flex-col items-center justify-between p-3 rounded-2xl transition-all duration-300 text-center cursor-pointer min-h-[124px] select-none ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 to-cyan-950/80 border-2 border-cyan-400 shadow-xl shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                    : 'bg-slate-900/80 hover:bg-slate-850 border border-slate-800/90 hover:border-cyan-500/40 shadow-md hover:shadow-cyan-950/40'
                }`}
              >
                {/* Active Indicator Pip */}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 ring-2 ring-slate-950 shadow-sm shadow-cyan-400 animate-pulse" />
                )}

                {/* Clean Logo Container with Brand Tint */}
                <div
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-2 shrink-0 transition-transform duration-300 shadow-inner ${
                    isSelected
                      ? 'bg-slate-950 border border-cyan-400 shadow-cyan-500/20 scale-105'
                      : 'bg-slate-950/90 border border-slate-800/80 group-hover:border-cyan-400/50 group-hover:scale-105'
                  }`}
                >
                  {item.icon}
                </div>

                {/* Name Exactly Underneath Logo */}
                <span
                  className={`font-display font-black text-xs sm:text-[13px] tracking-tight leading-tight mt-2 px-1 break-words transition-colors ${
                    isSelected
                      ? 'text-cyan-300 drop-shadow-sm'
                      : 'text-slate-200 group-hover:text-cyan-200'
                  }`}
                >
                  {item.name}
                </span>

                {/* Subtle category tag chip */}
                <span className="text-[9px] font-mono-code text-slate-400 uppercase tracking-wider mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.trackBadge}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredCourses.length === 0 && (
          <div className="py-8 text-center space-y-2">
            <p className="text-sm font-mono-code text-slate-400">No technology matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-cyan-400 underline font-mono-code cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* INTERACTIVE SPOTLIGHT HUD - Selected Technology Deep Dive */}
        <AnimatePresence mode="wait">
          {activeCourse && (
            <motion.div
              key={activeCourse.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900 to-cyan-950/50 border border-cyan-500/40 p-4 sm:p-6 shadow-xl relative overflow-hidden"
            >
              {/* Radial flare behind active item */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
                {/* Left Side: Logo + Title + Tagline */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-950 border-2 border-cyan-400 p-3 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0">
                    {activeCourse.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight">
                        {activeCourse.name}
                      </h5>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        {activeCourse.categoryLabel}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code text-slate-300 bg-slate-800 border border-slate-700">
                        {activeCourse.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-cyan-100 font-sans leading-relaxed max-w-2xl">
                      {activeCourse.tagline}
                    </p>
                  </div>
                </div>

                {/* Right Side / Quick Highlights & Action */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full lg:w-auto shrink-0 text-xs font-sans">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono-code text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Projects Built</span>
                    </span>
                    <p className="text-slate-300 text-[11px] leading-snug line-clamp-2">
                      {activeCourse.projects}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono-code text-amber-400 font-bold uppercase flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Lab Hardware Alignment</span>
                    </span>
                    <p className="text-slate-300 text-[11px] leading-snug line-clamp-2">
                      {activeCourse.labHardware}
                    </p>
                  </div>
                </div>
              </div>

              {/* Syllabus Pillars Bullet Strip & Copy Quick Action */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono-code text-slate-400 uppercase font-bold pr-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Key Competencies:</span>
                  </span>
                  {activeCourse.curriculumHighlights.map((pillar, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-200 border border-cyan-500/30 text-[11px] font-mono-code shadow-xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>{pillar}</span>
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopySummary(activeCourse)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-400/50 text-[11px] font-mono-code font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer self-start sm:self-auto active:scale-95"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Module Spec</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info note & Action Pill */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[11px] font-mono-code text-cyan-300/80">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>All 25 modules map to Atal Tinkering Labs (ATL), NITI Aayog STEM guidelines & National Education Policy (NEP 2020).</span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <span className="text-[11px] font-mono-code text-slate-400">
              Showing {filteredCourses.length} of 25 Technologies
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
