import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-14 left-4 right-4 md:left-auto md:right-8 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/95 text-slate-950 font-semibold text-xs shadow-xl shadow-amber-500/20 backdrop-blur-md animate-bounce">
      <WifiOff className="w-4 h-4 shrink-0 text-slate-950" />
      <span>Offline Mode — Stored courses and schematics available from device cache.</span>
    </div>
  );
};
