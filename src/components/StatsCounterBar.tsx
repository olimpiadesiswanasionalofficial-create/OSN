import React, { useState, useEffect, useRef } from 'react';
import { Globe, Users, Trophy, ShieldCheck } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  target?: number;
  suffix?: string;
  prefix?: string;
  desc: string;
}

interface StatsCounterBarProps {
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  {
    label: "Provinsi Terjangkau",
    value: "38 Provinsi",
    target: 38,
    suffix: " Provinsi",
    desc: "Dari Sabang sampai Merauke"
  },
  {
    label: "Peserta Terdaftar",
    value: "85.000+",
    target: 85000,
    suffix: "+",
    desc: "PAUD/TK, SD/MI, SMP/MTs"
  },
  {
    label: "Medali & Trofi Juara",
    value: "15.000+",
    target: 15000,
    suffix: "+",
    desc: "Medali Emas, Perak, Perunggu & Piala"
  },
  {
    label: "Akreditasi & Legalitas",
    value: "100% Resmi",
    target: 100,
    suffix: "% Resmi",
    desc: "LKP Prestasi Nusantara Terakreditasi"
  }
];

const ICONS = [Globe, Users, Trophy, ShieldCheck];

export const StatsCounterBar: React.FC<StatsCounterBarProps> = ({ stats = DEFAULT_STATS }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Set up IntersectionObserver to trigger animation when scrolled into viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  // Animate count-up with requestAnimationFrame once triggered
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2200; // ms
    let startTime: number | null = null;
    let frameId: number;

    const targets = stats.map((s) => s.target ?? 0);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic-bezier-like deceleration (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(
        targets.map((tgt) => Math.round(easeProgress * tgt))
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [hasAnimated, stats]);

  // Helper to format Indonesian numbers with thousands separators
  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  return (
    <section
      ref={containerRef}
      className="bg-[#1A1615] text-white py-12 border-b border-[#2A2321] relative overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const currentCount = counts[idx] ?? 0;
            const target = stat.target ?? 0;

            // Render animated string or static fallback
            let displayValue: string;
            if (hasAnimated && target > 0) {
              const prefix = stat.prefix || '';
              const suffix = stat.suffix || '';
              displayValue = `${prefix}${formatNumber(currentCount)}${suffix}`;
            } else {
              displayValue = stat.value;
            }

            return (
              <div
                key={idx}
                className={`pt-5 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} group`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Nasional
                  </span>
                </div>

                <p
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#D4AF37] tracking-tight font-mono transition-transform duration-300"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {displayValue}
                </p>

                <p className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  {stat.label}
                </p>

                <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
