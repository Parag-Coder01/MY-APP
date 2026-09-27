import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface KiteLogoProps {
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showWordmark?: boolean;
  className?: string;
  variant?: 'full' | 'mark' | 'stacked';
  useImage?: boolean;
  themeMode?: 'dark' | 'light' | 'auto';
}

export const KiteLogo: React.FC<KiteLogoProps> = ({
  size = 'md',
  showTagline = true,
  showWordmark = true,
  className = '',
  variant = 'full',
  useImage = false,
  themeMode = 'auto',
}) => {
  let isDarkApp = true;
  try {
    const themeContext = useTheme();
    isDarkApp = themeContext.isDark;
  } catch {
    if (typeof document !== 'undefined') {
      isDarkApp = document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('light');
    }
  }

  const effectiveIsDark =
    themeMode === 'dark' ? true : themeMode === 'light' ? false : isDarkApp;
  let iconPx = 40;
  if (typeof size === 'number') {
    iconPx = size;
  } else {
    iconPx = {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 52,
      xl: 68,
    }[size];
  }

  const titleSizeClass =
    typeof size === 'number'
      ? size <= 30
        ? 'text-base'
        : 'text-xl'
      : {
          xs: 'text-sm',
          sm: 'text-base',
          md: 'text-xl',
          lg: 'text-2xl',
          xl: 'text-3xl',
        }[size];

  const subSizeClass =
    typeof size === 'number'
      ? 'text-[10px]'
      : {
          xs: 'text-[8px]',
          sm: 'text-[9px]',
          md: 'text-xs',
          lg: 'text-sm',
          xl: 'text-base',
        }[size];

  // Official Kite Robotics Vector Mark (Hexagonal diamond kite with robot face, gear eye & traces)
  const OfficialGlyph = (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: iconPx, height: iconPx }}
    >
      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,149,218,0.25)]"
      >
        {/* LEFT HALF: VIBRANT KITE ORANGE */}
        <path d="M 50 2 L 6 48 L 50 94 Z" fill="#FF7A00" />
        {/* RIGHT HALF: VIBRANT KITE GREEN */}
        <path d="M 50 2 L 94 48 L 50 94 Z" fill="#2EA043" />

        {/* WHITE CIRCUIT TRACES ON ORANGE (LEFT) */}
        <path
          d="M 44 26 L 44 14 L 35 14"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="33" cy="14" r="3.2" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
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
        <rect x="72" y="42" width="6" height="13" rx="3" fill="#1E293B" />

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
          <rect x="-8.5" y="-2" width="17" height="4" rx="1.2" fill="#0084BD" />
          <rect x="-2" y="-8.5" width="4" height="17" rx="1.2" fill="#0084BD" />
          <rect x="-7" y="-7" width="14" height="4" rx="1.2" transform="rotate(45)" fill="#0084BD" />
          <rect x="-7" y="-7" width="14" height="4" rx="1.2" transform="rotate(-45)" fill="#0084BD" />
          <circle cx="0" cy="0" r="6.5" fill="#0084BD" />
          <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
        </g>

        {/* RIGHT EYE: SOLID BLACK CIRCLE */}
        <circle cx="61" cy="44" r="6" fill="#1E293B" />

        {/* MOUTH: CHEERFUL SMILE WITH 2 ROBOT TEETH */}
        <path d="M 42 58 C 42 66 58 66 58 58 Z" fill="#1E293B" />
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
    </div>
  );

  if (variant === 'mark' || !showWordmark) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {OfficialGlyph}
      </div>
    );
  }

  // Explicit solid color based on effective theme so KITE is never invisible
  const titleClass = effectiveIsDark
    ? 'text-white font-extrabold drop-shadow-sm'
    : 'text-slate-950 font-extrabold';

  const subClass = effectiveIsDark
    ? 'text-slate-300'
    : 'text-slate-600';

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {OfficialGlyph}
        <div className="mt-2 flex flex-col items-center">
          <span className={`font-display font-black tracking-wider leading-none ${titleSizeClass} ${titleClass}`}>
            KITE
          </span>
          <span className={`font-display font-bold tracking-[0.25em] uppercase mt-1 ${subSizeClass} ${subClass}`}>
            ROBOTICS
          </span>
        </div>
      </div>
    );
  }

  // Horizontal layout (Glyph + "KITE ROBOTICS" + optional tagline)
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none shrink-0 ${className}`}>
      {OfficialGlyph}
      <div className="flex flex-col justify-center shrink-0">
        <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
          <span className={`font-display font-black tracking-tight whitespace-nowrap ${titleSizeClass} ${titleClass}`}>
            KITE
          </span>
          <span className={`font-display font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 whitespace-nowrap ${titleSizeClass}`}>
            ROBOTICS
          </span>
        </div>
        {showTagline && (
          <div className={`hidden sm:block font-mono-code font-medium tracking-wider uppercase mt-1 ${subSizeClass} ${subClass} whitespace-nowrap`}>
            Robotics <span className="text-orange-500">•</span> AI <span className="text-green-500">•</span> IoT
          </div>
        )}
      </div>
    </div>
  );
};
