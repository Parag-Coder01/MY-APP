import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Sparkles,
  School,
  GraduationCap,
  Users,
  BookOpen,
  ShoppingBag,
  HelpCircle,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Zap,
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { KiteLogo } from './KiteLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  
  // Form fields
  const [identifier, setIdentifier] = useState('aarav@kiterobotics.in');
  const [password, setPassword] = useState('kite123');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [institutionName, setInstitutionName] = useState('');
  const [grade, setGrade] = useState('');
  const [city, setCity] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // OTP flow state
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '4', '1', '9']);
  const [otpPhone, setOtpPhone] = useState('9564866985');
  const [demoOtpHint, setDemoOtpHint] = useState<string | null>(null);

  // Loading & feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  if (!isOpen) return null;

  const rolesConfig: Array<{ role: UserRole; title: string; desc: string; icon: React.ReactNode }> = [
    {
      role: 'student',
      title: 'Student',
      desc: 'Hands-on courses, kits & AI lab projects',
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    },
    {
      role: 'school',
      title: 'School / Institution',
      desc: 'ATL setup, NEP 2020 curriculum, lab ops',
      icon: <School className="w-5 h-5 text-amber-400" />,
    },
    {
      role: 'educator',
      title: 'Educator / Mentor',
      desc: 'Master training, teacher kits & mentoring',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
    },
    {
      role: 'customer',
      title: 'Maker / Engineer',
      desc: 'Robotics kits, sensors & development boards',
      icon: <ShoppingBag className="w-5 h-5 text-pink-400" />,
    },
    {
      role: 'parent',
      title: 'Parent',
      desc: 'Track child STEM progress & kits',
      icon: <Users className="w-5 h-5 text-blue-400" />,
    },
    {
      role: 'other',
      title: 'Corporate / Partner',
      desc: 'R&D, hackathons & sponsorships',
      icon: <HelpCircle className="w-5 h-5 text-slate-400" />,
    },
  ];

  // Quick 1-click test credentials
  const demoAccounts = [
    {
      label: 'Student',
      name: 'Aarav Sharma',
      email: 'aarav@kiterobotics.in',
      role: 'student',
      badge: 'Student Demo',
    },
    {
      label: 'School / ATL',
      name: 'Dr. Rajesh Sharma',
      email: 'principal@dps-robotics.edu.in',
      role: 'school',
      badge: 'ATL In-Charge',
    },
    {
      label: 'Mentor',
      name: 'Priya Sen',
      email: 'priya.mentor@kiterobotics.in',
      role: 'educator',
      badge: 'Master Trainer',
    },
    {
      label: 'Maker',
      name: 'Kabir Mehta',
      email: 'maker@iotlabs.org',
      role: 'customer',
      badge: 'IoT Maker',
    },
  ];

  // 1-Click Demo Login
  const handleQuickDemoLogin = async (acc: typeof demoAccounts[0]) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: acc.email,
          password: 'kite123',
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage(`Logged in as ${data.user.name} (${acc.label})`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 600);
      } else {
        setErrorMessage(data.error || 'Demo login failed');
      }
    } catch {
      // Local fallback
      const fallbackUser: UserProfile = {
        ...currentUser,
        id: `usr_${acc.role}`,
        name: acc.name,
        email: acc.email,
        role: acc.role as UserRole,
        enrolledCoursesCount: 4,
        completedProjectsCount: 10,
        certificatesCount: 2,
      };
      onLoginSuccess(fallbackUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage(`Welcome back, ${data.user.name}!`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 700);
      } else {
        setErrorMessage(data.error || 'Invalid credentials. Please verify your email/phone and password.');
      }
    } catch (err: any) {
      setErrorMessage('Network error connecting to backend auth service.');
    } finally {
      setLoading(false);
    }
  };

  // Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: otpPhone }),
      });
      const data = await res.json();
      if (data.success) {
        setDemoOtpHint(data.demoOtp || '582419');
        setOtpStep(true);
      } else {
        setErrorMessage(data.error || 'Could not send OTP.');
      }
    } catch {
      setDemoOtpHint('582419');
      setOtpStep(true);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrorMessage(null);
    const code = otpCode.join('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: otpPhone,
          otp: code,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage(`Authenticated via OTP as ${data.user.name}!`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 700);
      } else {
        setErrorMessage(data.error || 'Invalid OTP code.');
      }
    } catch {
      setErrorMessage('Failed to verify OTP code.');
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      setLoading(false);
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setErrorMessage('Please enter an email address or mobile number.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          role: selectedRole,
          institution: institutionName || 'KITE Innovation Lab',
          grade: grade || 'STEM Learner',
          city: city || 'New Delhi',
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage(`Account created successfully! Welcome to KITE, ${data.user.name}!`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 800);
      } else {
        setErrorMessage(data.error || 'Registration failed.');
      }
    } catch {
      setErrorMessage('Server connection error during registration.');
    } finally {
      setLoading(false);
    }
  };

  // Google 1-Click login
  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser: UserProfile = {
        ...currentUser,
        id: 'usr_google_' + Date.now(),
        name: name || 'Aarav Sharma (Google User)',
        email: email || 'aarav.sharma@gmail.com',
        role: selectedRole,
        enrolledCoursesCount: 2,
        completedProjectsCount: 1,
        certificatesCount: 1,
      };
      setSuccessMessage('Google Account connected successfully!');
      setTimeout(() => {
        onLoginSuccess(googleUser);
        onClose();
      }, 500);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative w-full max-w-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 rounded-3xl p-5 sm:p-7 text-slate-100 shadow-2xl my-auto max-h-[94vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl dark:text-slate-400 text-slate-500 hover:text-slate-900 dark:hover:text-white dark:hover:bg-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center pb-3">
          <KiteLogo size="md" className="justify-center mb-1.5" />
          <h2 className="font-display font-extrabold text-xl sm:text-2xl dark:text-white text-slate-900 mt-1">
            {authMode === 'login' ? 'Sign In to KITE Robotics' : 'Create KITE Robotics Account'}
          </h2>
          <p className="text-xs dark:text-slate-400 text-slate-500 font-mono-code mt-0.5">
            Empowering Innovation with Robotics, AI & IoT
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {/* Primary Toggle: Login / Create Account */}
        <div className="flex dark:bg-slate-950 bg-slate-100 p-1.5 rounded-2xl border dark:border-slate-800 border-slate-200 mb-5">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setOtpStep(false);
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setOtpStep(false);
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1. SIGN IN FLOW */}
        {authMode === 'login' && (
          <div className="space-y-4">
            {/* Quick Demo Accounts Banner */}
            <div className="p-3 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border dark:border-slate-800 border-slate-200">
              <div className="flex items-center justify-between text-[11px] font-mono-code dark:text-slate-400 text-slate-500 mb-2">
                <span className="flex items-center gap-1 font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Click Test Accounts</span>
                </span>
                <span className="text-[10px] text-cyan-500">Instant Access</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleQuickDemoLogin(acc)}
                    disabled={loading}
                    className="p-2 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 hover:border-cyan-500 text-left transition-all text-xs group cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <div className="font-bold dark:text-slate-200 text-slate-800 group-hover:text-cyan-500 truncate">
                      {acc.label}
                    </div>
                    <div className="text-[10px] dark:text-slate-400 text-slate-500 truncate">
                      {acc.name.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-toggle: Password vs OTP */}
            <div className="flex items-center justify-center gap-4 text-xs font-mono-code dark:text-slate-400 text-slate-500 pb-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('password');
                  setOtpStep(false);
                }}
                className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
                  loginMethod === 'password'
                    ? 'border-cyan-500 text-cyan-500 dark:text-cyan-400 font-bold'
                    : 'border-transparent hover:text-slate-300'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Password Login</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('otp');
                  setOtpStep(false);
                }}
                className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
                  loginMethod === 'otp'
                    ? 'border-cyan-500 text-cyan-500 dark:text-cyan-400 font-bold'
                    : 'border-transparent hover:text-slate-300'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile OTP Login</span>
              </button>
            </div>

            {/* Password Login Form */}
            {loginMethod === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                    Email Address or Phone Number
                  </label>
                  <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3.5 py-2.5 focus-within:border-cyan-400">
                    <Mail className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="aarav@kiterobotics.in or 9564866985"
                      className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium dark:text-slate-300 text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] text-cyan-500 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3.5 py-2.5 focus-within:border-cyan-400">
                    <Lock className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 dark:text-slate-500 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="text-[10px] dark:text-slate-400 text-slate-500 font-mono-code mt-1">
                    Demo default password: <span className="font-bold text-cyan-500">kite123</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                    />
                    <span>Remember my session</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* OTP Login Form */}
            {loginMethod === 'otp' && (
              <div className="space-y-3.5">
                {!otpStep ? (
                  <form onSubmit={handleSendOtp} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                        Mobile Phone Number
                      </label>
                      <div className="flex rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 overflow-hidden focus-within:border-cyan-400">
                        <span className="px-3.5 py-2.5 text-xs font-mono-code dark:text-slate-400 text-slate-500 dark:bg-slate-900 bg-slate-100 border-r dark:border-slate-800 border-slate-300 flex items-center">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={otpPhone}
                          onChange={(e) => setOtpPhone(e.target.value)}
                          placeholder="9564866985"
                          className="w-full px-3.5 py-2.5 bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none font-mono-code"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <span>Send 6-Digit OTP</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl dark:bg-cyan-950/40 bg-cyan-50 border dark:border-cyan-800 border-cyan-200 text-center">
                      <ShieldCheck className="w-7 h-7 text-cyan-500 mx-auto mb-1.5" />
                      <div className="text-xs font-bold dark:text-white text-slate-900">
                        Enter 6-Digit Verification Code
                      </div>
                      <div className="text-[11px] dark:text-slate-400 text-slate-600 mt-0.5">
                        Sent to +91 {otpPhone}
                      </div>
                      {demoOtpHint && (
                        <div className="mt-1 text-[11px] font-mono-code font-bold text-cyan-600 dark:text-cyan-400">
                          Demo OTP: {demoOtpHint}
                        </div>
                      )}
                    </div>

                    {/* 6 OTP boxes */}
                    <div className="flex justify-center gap-2">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otpCode];
                            newOtp[idx] = e.target.value;
                            setOtpCode(newOtp);
                          }}
                          className="w-10 h-11 text-center text-lg font-mono-code font-bold dark:bg-slate-950 bg-slate-50 border dark:border-slate-700 border-slate-300 rounded-xl text-cyan-500 focus:border-cyan-400 focus:outline-none"
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying OTP...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Sign In</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-500 font-mono-code pt-1">
                      <button
                        type="button"
                        onClick={() => setOtpStep(false)}
                        className="hover:underline cursor-pointer"
                      >
                        Change Number
                      </button>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-cyan-500 hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Social Divider */}
            <div className="relative flex items-center justify-center py-1">
              <div className="border-t dark:border-slate-800 border-slate-200 w-full" />
              <span className="dark:bg-slate-900 bg-white px-3 text-[10px] font-mono-code dark:text-slate-500 text-slate-400 uppercase tracking-widest absolute">
                or continue with
              </span>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl dark:bg-slate-950 bg-slate-50 hover:bg-slate-100 dark:hover:bg-slate-850 border dark:border-slate-800 border-slate-300 dark:text-slate-200 text-slate-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {/* 2. CREATE ACCOUNT (SIGNUP) FLOW */}
        {authMode === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                Full Name <span className="text-cyan-500">*</span>
              </label>
              <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                <UserCheck className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                  <Mail className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@domain.com"
                    className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                  Mobile Number (+91)
                </label>
                <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                  <Smartphone className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none font-mono-code"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                Create Secure Password <span className="text-cyan-500">*</span>
              </label>
              <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                <Lock className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 dark:text-slate-500 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* ROLE SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold dark:text-slate-200 text-slate-800 uppercase font-mono-code">
                  I am registering as: <span className="text-cyan-500">{selectedRole}</span>
                </label>
                <span className="text-[10px] dark:text-slate-400 text-slate-500 font-mono-code">
                  Tailors your portal
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {rolesConfig.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[72px] cursor-pointer ${
                      selectedRole === r.role
                        ? 'dark:bg-cyan-950/60 bg-cyan-50 border-cyan-400 shadow-sm'
                        : 'dark:bg-slate-950/60 bg-slate-50 dark:border-slate-800 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {r.icon}
                      {selectedRole === r.role && <UserCheck className="w-3.5 h-3.5 text-cyan-500" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold dark:text-white text-slate-900 leading-tight">
                        {r.title}
                      </div>
                      <div className="text-[10px] dark:text-slate-400 text-slate-500 truncate mt-0.5">
                        {r.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* School / Institution & Grade Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                  School / College / Lab Name
                </label>
                <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2 focus-within:border-cyan-400">
                  <School className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. DPS / IIT Delhi"
                    className="w-full bg-transparent text-xs dark:text-white text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1">
                  City / State
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bengaluru, Delhi, Pune"
                  className="w-full rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2 text-xs dark:text-white text-slate-900 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Registration */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Your Account...</span>
                </>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Forgot Password Dialog */}
        <AnimatePresence>
          {showForgotModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm rounded-2xl dark:bg-slate-900 bg-white p-5 border dark:border-slate-800 border-slate-200 shadow-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm dark:text-white text-slate-900">Reset Password</h3>
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs dark:text-slate-300 text-slate-600">
                  For your demo test account, you can simply use the standard passkey{' '}
                  <span className="font-mono-code font-bold text-cyan-500">kite123</span> or use the Mobile OTP login option.
                </p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Got It
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
