import React from 'react';
import { motion } from 'motion/react';
import { X, Bell, Award, Calendar, ShoppingBag, Info, CheckCheck } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'workshop':
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-cyan-400" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-emerald-400" />;
      case 'system':
      default:
        return <Info className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-auto text-slate-100 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-base text-white">
              Notifications & Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                notif.read
                  ? 'bg-slate-950/60 border-slate-800/80 opacity-75'
                  : 'bg-slate-950 border-cyan-800/40 shadow-sm'
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-display font-semibold text-xs text-white truncate">
                    {notif.title}
                  </h4>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <div className="text-[10px] font-mono-code text-slate-500 mt-1">
                  {notif.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs font-mono-code">
          <button
            onClick={onMarkAllAsRead}
            className="text-cyan-400 hover:underline flex items-center gap-1.5 py-1 px-2"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
          <span className="text-slate-500">{notifications.length} Total</span>
        </div>
      </motion.div>
    </div>
  );
};
