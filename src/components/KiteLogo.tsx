import React from 'react';

interface KiteLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'full' | 'mark' | 'stacked';
  useImage?: boolean;
  themeMode?: 'dark' | 'light' | 'auto';
}

export const KiteLogo: React.FC<KiteLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'full',
  useImage = false,
  themeMode = 'auto',
}) => {
  const iconSize = {
    xs: 24,
    sm: 34,
    md: 44,
    lg: 56,
    xl: 76,
  }[size];

  const titleSize = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const subSize = {
    xs: 'text-[8px]',
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  }[size];

  // Official Kite Robotics Vector Mark (Accurate to official logo)
  const OfficialGlyph = (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: iconSize, height: iconSize }}
    >
      {useImage ? (
        <img
          src="/kite-official-logo.png"
          alt="KITE Robotics Official Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            // fallback to SVG if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : (
        <svg
          viewBox="0 0 100 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,149,218,0.25)]"
        >
          {/* LEFT HALF: VIBRANT KITE ORANGE */}
          <path
            d="M 50 2 L 6 48 L 50 94 Z"
            fill="#FF7A00"
          />

          {/* RIGHT HALF: VIBRANT KITE GREEN */}
          <path
            d="M 50 2 L 94 48 L 50 94 Z"
            fill="#2EA043"
          />

          {/* WHITE CIRCUIT TRACES ON ORANGE (LEFT) */}
          {/* Upward trace with terminal circle */}
          <path
            d="M 44 26 L 44 14 L 35 14"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="33" cy="14" r="3.2" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />

          {/* Side trace with terminal circle */}
          <path
            d="M 32 38 L 22 38 L 19 44"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="17" cy="47" r="3" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />

          {/* WHITE CIRCUIT TRACE ON GREEN (RIGHT) */}
          <path
            d="M 56 26 L 56 12 L 65 12"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="67" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />

          {/* RIGHT EAR MODULE */}
          <rect
            x="72"
            y="42"
            width="6"
            height="13"
            rx="3"
            fill="#1E293B"
          />

          {/* WHITE ROBOT HEAD / FACE BASE */}
          <path
            d="M 50 18 
               C 66 18 74 27 74 48 
               C 74 67 63 75 50 75 
               C 37 75 26 67 26 48 
               C 26 27 34 18 50 18 Z"
            fill="#FFFFFF"
          />

          {/* LEFT EYE: KITE BLUE MECHANICAL GEAR COG */}
          <g transform="translate(40, 44)">
            {/* 8 Radial Gear Teeth */}
            <rect x="-8.5" y="-2" width="17" height="4" rx="1.2" fill="#0084BD" />
            <rect x="-2" y="-8.5" width="4" height="17" rx="1.2" fill="#0084BD" />
            <rect x="-7" y="-7" width="14" height="4" rx="1.2" transform="rotate(45)" fill="#0084BD" />
            <rect x="-7" y="-7" width="14" height="4" rx="1.2" transform="rotate(-45)" fill="#0084BD" />
            {/* Center Disc */}
            <circle cx="0" cy="0" r="6.5" fill="#0084BD" />
            {/* Center Hole */}
            <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
          </g>

          {/* RIGHT EYE: SOLID BLACK CIRCLE */}
          <circle cx="61" cy="44" r="6" fill="#1E293B" />

          {/* MOUTH: CHEERFUL SMILE WITH 2 ROBOT TEETH */}
          <path
            d="M 42 58 C 42 66 58 66 58 58 Z"
            fill="#1E293B"
          />
          {/* Two White Teeth */}
          <rect x="46" y="58" width="3" height="3.2" rx="0.5" fill="#FFFFFF" />
          <rect x="51" y="58" width="3" height="3.2" rx="0.5" fill="#FFFFFF" />

          {/* BLUE KITE STRING / TAIL EXTENDING FROM BOTTOM */}
          <path
            d="M 50 75 
               C 49 85 47 94 47 100 
               C 47 106 54 108 64 107 
               C 74 106 82 108 88 111"
            stroke="#0077B6"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {OfficialGlyph}
      </div>
    );
  }

  // Adaptive colors for text based on themeMode
  const titleClass =
    themeMode === 'light'
      ? 'text-slate-900'
      : themeMode === 'dark'
      ? 'text-white'
      : 'text-slate-900 dark:text-white';

  const subClass =
    themeMode === 'light'
      ? 'text-slate-600'
      : themeMode === 'dark'
      ? 'text-slate-400'
      : 'text-slate-600 dark:text-slate-400';

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {OfficialGlyph}
        <div className="mt-2 flex flex-col items-center">
          <span className={`font-display font-black tracking-wider leading-none ${titleSize} ${titleClass}`}>
            KITE
          </span>
          <span className={`font-display font-bold tracking-[0.25em] uppercase mt-1 ${subSize} ${subClass}`}>
            ROBOTICS
          </span>
        </div>
      </div>
    );
  }

  // Default: Horizontal layout (Glyph + "KITE ROBOTICS" + optional tagline)
  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none shrink-0 ${className}`}>
      {OfficialGlyph}
      <div className="flex flex-col justify-center shrink-0">
        <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
          <span className={`font-display font-black tracking-tight whitespace-nowrap ${titleSize} ${titleClass}`}>
            KITE
          </span>
          <span className={`font-display font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 whitespace-nowrap ${titleSize}`}>
            ROBOTICS
          </span>
        </div>
        {showTagline && (
          <div className={`hidden sm:block font-mono-code font-medium tracking-wider uppercase mt-1 ${subSize} ${subClass} whitespace-nowrap`}>
            Robotics <span className="text-orange-500">•</span> AI <span className="text-green-500">•</span> IoT
          </div>
        )}
      </div>
    </div>
  );
};
