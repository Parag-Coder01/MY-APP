import React from 'react';

interface KiteLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'full' | 'mark';
}

export const KiteLogo: React.FC<KiteLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'full',
}) => {
  const iconSize = {
    sm: 28,
    md: 38,
    lg: 52,
    xl: 68,
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const subSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Kite & Robotics Glyph */}
      <div 
        className="relative flex items-center justify-center shrink-0"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_12px_rgba(6,182,212,0.4)]"
        >
          {/* Outer diamond kite frame with tech notch */}
          <path
            d="M50 6 L90 50 L50 94 L10 50 Z"
            fill="url(#kite-dark-grad)"
            stroke="url(#kite-cyan-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Upper left facet - Deep tech cyan */}
          <path
            d="M50 8 L50 50 L12 50 Z"
            fill="url(#facet-cyan)"
            opacity="0.95"
          />
          {/* Upper right facet - Vibrant orange / amber highlight (Kite official accent) */}
          <path
            d="M50 8 L88 50 L50 50 Z"
            fill="url(#facet-orange)"
            opacity="0.95"
          />
          {/* Lower left facet - Electric blue */}
          <path
            d="M12 50 L50 50 L50 92 Z"
            fill="url(#facet-blue)"
            opacity="0.9"
          />
          {/* Lower right facet - Deep navy */}
          <path
            d="M50 50 L88 50 L50 92 Z"
            fill="url(#facet-navy)"
            opacity="0.8"
          />
          {/* Central AI / Circuit Node */}
          <circle cx="50" cy="50" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="3" fill="#38bdf8" />
          {/* Micro circuit line accents */}
          <line x1="50" y1="12" x2="50" y2="43" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.8" />
          <line x1="16" y1="50" x2="43" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.8" />
          <line x1="50" y1="57" x2="50" y2="88" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
          <line x1="57" y1="50" x2="84" y2="50" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />

          {/* Gradients */}
          <defs>
            <linearGradient id="kite-dark-grad" x1="10" y1="6" x2="90" y2="94" gradientUnits="userSpaceOnUse">
              <stop stopColor="#020617" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="kite-cyan-border" x1="10" y1="6" x2="90" y2="94" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#0284c7" />
              <stop offset="1" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="facet-cyan" x1="12" y1="8" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="facet-orange" x1="50" y1="8" x2="88" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fb923c" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="facet-blue" x1="12" y1="50" x2="50" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0369a1" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="facet-navy" x1="50" y1="50" x2="88" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="1" stopColor="#020617" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <div className={`font-display font-extrabold tracking-wider leading-none text-white flex items-center gap-1 ${titleSize}`}>
            <span>KITE</span>
            <span className="text-cyan-400">ROBOTICS</span>
          </div>
          {showTagline && (
            <div className={`font-mono-code font-medium text-slate-400 tracking-widest uppercase mt-0.5 ${subSize}`}>
              Robotics <span className="text-cyan-400">•</span> AI <span className="text-amber-400">•</span> IoT
            </div>
          )}
        </div>
      )}
    </div>
  );
};
