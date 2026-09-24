import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Mail,
  Phone,
  School,
  MapPin,
  GraduationCap,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  BookOpen,
  FolderGit2,
  Camera,
  Shield,
  Loader2,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface ManageProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
];

export const ManageProfileModal: React.FC<ManageProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [role, setRole] = useState<UserRole>(user.role);
  const [institution, setInstitution] = useState(user.institution || '');
  const [grade, setGrade] = useState(user.grade || '');
  const [city, setCity] = useState(user.city || 'New Delhi');
  const [avatar, setAvatar] = useState(user.avatar || AVATAR_OPTIONS[0]);
  const [bio, setBio] = useState('Passionate about Robotics, STEM, IoT, and Embedded AI.');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          name,
          email,
          phone,
          role,
          institution,
          grade,
          city,
          bio,
          avatar,
        }),
      });

      const data = await response.json();
      if (data.success && data.user) {
        const updated: UserProfile = {
          ...user,
          ...data.user,
        };
        onUpdateUser(updated);
        setStatusMessage({ type: 'success', text: 'Profile changes saved successfully!' });
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to update profile.' });
      }
    } catch (err: any) {
      // Fallback local update if network is transient
      const localUpdated: UserProfile = {
        ...user,
        name,
        email,
        phone,
        role,
        institution,
        grade,
        city,
        avatar,
      };
      onUpdateUser(localUpdated);
      setStatusMessage({ type: 'success', text: 'Profile saved to your device session!' });
      setTimeout(() => {
        onClose();
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl rounded-3xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b dark:border-slate-800 border-slate-200 flex items-center justify-between dark:bg-slate-950/60 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl dark:bg-cyan-950/80 bg-cyan-100 text-cyan-600 dark:text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl dark:text-white text-slate-900">
                Manage Profile & Credentials
              </h2>
              <p className="text-xs dark:text-slate-400 text-slate-500 font-mono-code">
                Update account details, role, institution, and avatar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'dark:bg-emerald-950/50 bg-emerald-50 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'dark:bg-rose-950/50 bg-rose-50 text-rose-600 dark:text-rose-400 border border-rose-500/30'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </motion.div>
          )}

          {/* Avatar & Key Stats Banner */}
          <div className="p-4 rounded-2xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative group shrink-0">
              <img
                src={avatar}
                alt={name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500 shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all cursor-pointer"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-display font-bold text-base dark:text-white text-slate-900">
                  {name || 'Innovator'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 border border-cyan-500/30">
                  {role}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-500 mt-1">
                {institution || 'KITE Robotics STEM Lab'}
              </p>

              {/* Badges Counter */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t dark:border-slate-800 border-slate-200 text-center">
                <div className="p-1.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200">
                  <div className="text-xs font-mono-code font-bold text-cyan-500">{user.enrolledCoursesCount || 1}</div>
                  <div className="text-[10px] dark:text-slate-400 text-slate-500">Courses</div>
                </div>
                <div className="p-1.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200">
                  <div className="text-xs font-mono-code font-bold text-indigo-500">{user.completedProjectsCount || 0}</div>
                  <div className="text-[10px] dark:text-slate-400 text-slate-500">Projects</div>
                </div>
                <div className="p-1.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200">
                  <div className="text-xs font-mono-code font-bold text-amber-500">{user.certificatesCount || 0}</div>
                  <div className="text-[10px] dark:text-slate-400 text-slate-500">Certificates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar selector drawer */}
          <AnimatePresence>
            {showAvatarPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-2xl dark:bg-slate-950 bg-slate-100 border dark:border-slate-800 border-slate-300"
              >
                <div className="text-xs font-mono-code font-semibold dark:text-slate-300 text-slate-700 mb-2">
                  Select Profile Avatar
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {AVATAR_OPTIONS.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAvatar(imgUrl);
                        setShowAvatarPicker(false);
                      }}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                        avatar === imgUrl ? 'border-cyan-400 scale-105' : 'border-transparent hover:border-slate-400'
                      }`}
                    >
                      <img src={imgUrl} alt={`Avatar option ${idx + 1}`} className="w-12 h-12 rounded-lg object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                <User className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                <Mail className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                  placeholder="student@kiterobotics.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                Mobile Phone (+91)
              </label>
              <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                <Phone className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none font-mono-code"
                  placeholder="+91 95648 66985"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                City / Region
              </label>
              <div className="flex items-center rounded-xl dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                <MapPin className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                  placeholder="e.g. New Delhi, Bengaluru, Pune"
                />
              </div>
            </div>
          </div>

          {/* Role & Institutional Credentials */}
          <div className="p-4 rounded-2xl dark:bg-slate-950/70 bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold dark:text-white text-slate-900 uppercase font-mono-code">
                Role & Institutional Affiliation
              </span>
              <span className="text-[11px] font-mono-code text-cyan-500">KITE NEP 2020</span>
            </div>

            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                Primary Account Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { r: 'student', label: 'Student' },
                  { r: 'school', label: 'School / ATL' },
                  { r: 'educator', label: 'Educator / Mentor' },
                  { r: 'customer', label: 'Maker / Engineer' },
                  { r: 'parent', label: 'Parent' },
                  { r: 'other', label: 'Corporate Partner' },
                ].map((item) => (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => setRole(item.r as UserRole)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      role === item.r
                        ? 'dark:bg-cyan-950/70 bg-cyan-100 border-cyan-400 text-cyan-600 dark:text-cyan-300 shadow-sm'
                        : 'dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 dark:text-slate-400 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                  School / University / Lab Name
                </label>
                <div className="flex items-center rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                  <School className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                    placeholder="e.g. DPS Cyber City / IIT Madras"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                  Class / Grade / Designation
                </label>
                <div className="flex items-center rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-300 px-3 py-2.5 focus-within:border-cyan-400">
                  <GraduationCap className="w-4 h-4 dark:text-slate-500 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-transparent text-sm dark:text-white text-slate-900 focus:outline-none"
                    placeholder="Class 10 / Robotics Mentor"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                Innovation Motto / Bio
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-300 p-2.5 text-xs dark:text-white text-slate-900 focus:border-cyan-400 focus:outline-none"
                placeholder="What are you building or mentoring?"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold dark:text-slate-300 text-slate-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
