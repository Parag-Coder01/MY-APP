import React, { useEffect, useState, useRef, useCallback } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number; // duration in ms
  delay?: number; // delay before starting in ms
  prefix?: string;
  suffix?: string;
  decimals?: number; // number of decimal places (e.g. 1 for 98.4)
  formatCommas?: boolean;
  className?: string;
  label?: string;
  livePulse?: boolean; // periodic subtle live increment pulse
  onClickReplay?: boolean; // allow user to click to re-trigger counting
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1600,
  delay = 100,
  prefix = '',
  suffix = '+',
  decimals = 0,
  formatCommas = true,
  className = '',
  livePulse = false,
  onClickReplay = true,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [liveBonus, setLiveBonus] = useState(0);

  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const timeoutId = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    if (animationFrameId.current) {
      window.cancelAnimationFrame(animationFrameId.current);
    }
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current);
    }

    setCurrentValue(0);
    setHasFinished(false);
    setIsAnimating(true);

    timeoutId.current = window.setTimeout(() => {
      let startTimestamp: number | null = null;
      const totalTarget = target + liveBonus;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Quintic/exponential ease-out for a very smooth, high-tech count-up
        const ease = 1 - Math.pow(1 - progress, 4);
        const nextRaw = ease * totalTarget;

        if (decimals > 0) {
          const factor = Math.pow(10, decimals);
          setCurrentValue(Math.round(nextRaw * factor) / factor);
        } else {
          setCurrentValue(Math.floor(nextRaw));
        }

        if (progress < 1) {
          animationFrameId.current = window.requestAnimationFrame(step);
        } else {
          setCurrentValue(totalTarget);
          setIsAnimating(false);
          setHasFinished(true);
        }
      };

      animationFrameId.current = window.requestAnimationFrame(step);
    }, delay);
  }, [target, duration, delay, decimals, liveBonus]);

  // Viewport detection: trigger when element enters viewport
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, trigger directly
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // When visible or target changes, start animation
  useEffect(() => {
    if (isVisible) {
      startAnimation();
    }

    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
      if (timeoutId.current) {
        window.clearTimeout(timeoutId.current);
      }
    };
  }, [isVisible, startAnimation]);

  // Live Pulse: optionally add +1 to students or kits occasionally to simulate live real-world growth
  useEffect(() => {
    if (!livePulse || !hasFinished) return;

    const interval = setInterval(() => {
      setLiveBonus((prev) => prev + 1);
      setCurrentValue((prev) => prev + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, [livePulse, hasFinished]);

  const formatNumber = (val: number): string => {
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    return formatCommas ? val.toLocaleString('en-IN') : val.toString();
  };

  return (
    <span
      ref={elementRef}
      onClick={() => {
        if (onClickReplay) {
          startAnimation();
        }
      }}
      title={onClickReplay ? 'Click to replay counter' : undefined}
      className={`inline-flex items-baseline select-none transition-all duration-300 ${className} ${
        onClickReplay ? 'cursor-pointer hover:opacity-90' : ''
      } ${isAnimating ? 'animate-pulse' : ''}`}
    >
      {prefix && <span className="mr-0.5">{prefix}</span>}
      <span className="tabular-nums tracking-tight font-extrabold">
        {formatNumber(currentValue)}
      </span>
      {suffix && <span className="text-[0.85em] ml-0.5 font-bold">{suffix}</span>}
    </span>
  );
};
