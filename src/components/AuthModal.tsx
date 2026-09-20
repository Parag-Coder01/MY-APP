import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Mail, Lock, ShieldCheck, UserCheck, ArrowRight, Sparkles, School, GraduationCap, Users, BookOpen, ShoppingBag, HelpCircle } from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { KiteLogo } from './KiteLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('9564866985');
  const [email, setEmail] = useState('student@kiterobotics.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Aarav Sharma');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '4', '1', '9']);
  const [institutionName, setInstitutionName] = useState('Delhi Public School / IIT STEM Club');

  if (!isOpen) return null;

  const rolesConfig: Array<{ role: UserRole; title: string; desc: string; icon: React.ReactNode }> = [
    {
      role: 'student',
      title: 'Student',
      desc: 'Hands-on courses, hardware kits & projects',
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    },
    {
      role: 'school',
      title: 'School / Institution',
      desc: 'ATL setup, curriculum, lab programs',
      icon: <School className="w-5 h-5 text-amber-400" />,
    },
    {
      role: 'educator',
      title: 'Educator / Mentor',
      desc: 'Teacher training, lab kits & resources',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
    },
    {
      role: 'parent',
      title: 'Parent',
      desc: 'Track student progress & robotics kits',
      icon: <Users className="w-5 h-5 text-blue-400" />,
    },
    {
      role: 'customer',
      title: 'Maker / Customer',
      desc: 'Robotics kits, sensors & modules',
      icon: <ShoppingBag className="w-5 h-5 text-pink-400" />,
    },
    {
      role: 'other',
      title: 'Corporate / Partner',
      desc: 'R&D collaboration & competitions',
      icon: <HelpCircle className="w-5 h-5 text-slate-400" />,
    },
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const handleVerifyOtp = () => {
    const updatedUser: UserProfile = {
      ...currentUser,
      name: name || 'Aarav Sharma',
      email: method === 'email' ? email : `${phoneNumber}@kiterobotics.user`,
      phone: method === 'phone' ? `+91 ${phoneNumber}` : currentUser.phone,
      role: selectedRole,
      institution: institutionName,
    };
    onLoginSuccess(updatedUser);
    onClose();
  };

  const handleQuickGoogleAuth = () => {
    const updatedUser: UserProfile = {
      ...currentUser,
      name: 'Aarav Sharma (Google User)',
      email: 'aarav.sharma@gmail.com',
      role: selectedRole,
    };
    onLoginSuccess(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 text-slate-100 shadow-2xl my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center pb-4">
          <KiteLogo size="md" className="justify-center mb-2" />
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
            {authMode === 'login' ? 'Welcome Back' : 'Create KITE Robotics Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono-code">
            Empowering Innovation with Robotics, AI & IoT
          </p>
        </div>

        {/* Toggle Login / Sign Up */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
          <button
            onClick={() => { setAuthMode('login'); setOtpStep(false); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              authMode === 'login' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setOtpStep(false); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              authMode === 'signup' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register / Join
          </button>
        </div>

        {/* OTP Step View */}
        {otpStep ? (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-center">
              <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">Enter OTP Verification Code</div>
              <div className="text-xs text-slate-400 mt-1">
                Sent to {method === 'phone' ? `+91 ${phoneNumber}` : email}
              </div>
            </div>

            {/* 6 Digit Input boxes */}
            <div className="flex justify-center gap-2 py-2">
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
                  className="w-10 h-12 text-center text-lg font-mono-code font-bold bg-slate-950 border border-slate-700 rounded-xl text-cyan-400 focus:border-cyan-400 focus:outline-none"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono-code">
              <button onClick={() => setOtpStep(false)} className="hover:text-cyan-400">
                Change Number / Email
              </button>
              <button className="text-cyan-400 hover:underline">Resend OTP in 28s</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Method switcher */}
            <div className="flex items-center justify-center gap-4 text-xs font-mono-code text-slate-400 pb-1">
              <button
                type="button"
                onClick={() => setMethod('phone')}
                className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                  method === 'phone' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile + OTP</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                  method === 'email' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Address</span>
              </button>
            </div>

            {/* If sign-up, capture name & Role Selection (User prompt mandatory item 6) */}
            {authMode === 'signup' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* ROLE PICKER: Student, Parent, School / Institution, Educator, Customer, Other */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-200">
                      I am a: <span className="text-cyan-400 font-semibold uppercase">{selectedRole}</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono-code">Personalizes your app</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {rolesConfig.map((r) => (
                      <button
                        key={r.role}
                        type="button"
                        onClick={() => setSelectedRole(r.role)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[72px] ${
                          selectedRole === r.role
                            ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {r.icon}
                          {selectedRole === r.role && <UserCheck className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">{r.title}</div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">{r.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedRole === 'school' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">School / Institution Name</label>
                    <input
                      type="text"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      placeholder="e.g. DPS Cyber City / St. Xavier's"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Contact input */}
            {method === 'phone' ? (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Phone Number</label>
                <div className="flex rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-cyan-400">
                  <span className="px-3.5 py-2.5 text-xs font-mono-code text-slate-400 bg-slate-900 border-r border-slate-800 flex items-center">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-3.5 py-2.5 bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 focus-within:border-cyan-400">
                  <Mail className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {authMode === 'login' && method === 'email' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <button type="button" className="text-[11px] text-cyan-400 hover:underline">Forgot?</button>
                </div>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 focus-within:border-cyan-400">
                  <Lock className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all mt-2"
            >
              <span>{authMode === 'login' ? 'Send OTP / Log In' : 'Proceed with Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] font-mono-code text-slate-500 uppercase tracking-widest absolute">
                or continue with
              </span>
            </div>

            {/* Social Google Login */}
            <button
              type="button"
              onClick={handleQuickGoogleAuth}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
