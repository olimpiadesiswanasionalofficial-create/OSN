import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { EventScheduleConfig } from '../services/eventScheduleDb';

interface CompetitionCountdownProps {
  schedule: EventScheduleConfig;
  className?: string;
}

const INDONESIAN_MONTHS: Record<string, number> = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11
};

function parseIndonesianDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  // If range like "25 Agustus – 11 September 2026", take the end date
  let cleanStr = dateStr;
  if (dateStr.includes('–')) {
    cleanStr = dateStr.split('–')[1].trim();
  } else if (dateStr.includes('-')) {
    cleanStr = dateStr.split('-')[1].trim();
  }

  // Regex to extract day, month, year
  const match = cleanStr.match(/(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})/i);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthName = match[2].toLowerCase();
    const year = parseInt(match[3], 10);
    const month = INDONESIAN_MONTHS[monthName];
    if (month !== undefined) {
      // Set to 08:00 WIB (Competition Start Time)
      return new Date(year, month, day, 8, 0, 0);
    }
  }

  // Fallback to standard parse
  const parsed = new Date(cleanStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export const CompetitionCountdown: React.FC<CompetitionCountdownProps> = ({
  schedule,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
    targetName: 'Babak Penyisihan CBT'
  });

  // Calculate target event date
  const targetEvent = useMemo(() => {
    const now = new Date();
    
    // 1. Try Babak Penyisihan
    const penyisihan = parseIndonesianDate(schedule?.penyisihanDate || '12 September 2026');
    if (penyisihan && penyisihan.getTime() > now.getTime()) {
      return {
        date: penyisihan,
        name: 'Babak Penyisihan CBT Online',
        displayDate: schedule.penyisihanDate
      };
    }

    // 2. Try Babak Final
    const finalDate = parseIndonesianDate(schedule?.finalDate || '19 September 2026');
    if (finalDate && finalDate.getTime() > now.getTime()) {
      return {
        date: finalDate,
        name: 'Babak Final Nasional OSN',
        displayDate: schedule.finalDate
      };
    }

    // 3. Try Registration Closing
    const regClose = parseIndonesianDate(schedule?.registrationOpenDate || '11 September 2026');
    if (regClose && regClose.getTime() > now.getTime()) {
      return {
        date: regClose,
        name: 'Penutupan Registrasi Peserta',
        displayDate: schedule.registrationOpenDate
      };
    }

    // Default upcoming competition
    const fallbackTarget = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 8, 0, 0);
    return {
      date: fallbackTarget,
      name: 'Ujian Serentak CBT OSN 2026',
      displayDate: schedule.penyisihanDate || '12 September 2026'
    };
  }, [schedule]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const targetTime = targetEvent.date.getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
          targetName: targetEvent.name
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isCompleted: false,
          targetName: targetEvent.name
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetEvent]);

  return (
    <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#1A1615] via-[#0B132B] to-[#1A1615] text-white border-2 border-[#D4AF37]/70 shadow-xl ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HITUNG MUNDUR KOMPETISI</span>
          </div>
          <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center justify-center sm:justify-start gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Menuju {timeLeft.targetName}</span>
          </h4>
          <p className="text-[11px] text-neutral-300">
            Jadwal Resmi: <strong className="text-[#D4AF37]">{targetEvent.displayDate}</strong> (Pukul 08:00 WIB)
          </p>
        </div>

        {/* Right Countdown Blocks */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Days */}
          <div className="flex flex-col items-center justify-center min-w-[54px] sm:min-w-[62px] py-2 px-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-inner">
            <span className="text-lg sm:text-2xl font-black text-[#D4AF37] font-mono leading-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-300 font-bold">
              Hari
            </span>
          </div>

          <span className="text-[#D4AF37] font-bold text-lg -mt-3">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center min-w-[54px] sm:min-w-[62px] py-2 px-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-inner">
            <span className="text-lg sm:text-2xl font-black text-white font-mono leading-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-300 font-bold">
              Jam
            </span>
          </div>

          <span className="text-[#D4AF37] font-bold text-lg -mt-3">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center min-w-[54px] sm:min-w-[62px] py-2 px-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-inner">
            <span className="text-lg sm:text-2xl font-black text-white font-mono leading-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-300 font-bold">
              Menit
            </span>
          </div>

          <span className="text-[#D4AF37] font-bold text-lg -mt-3">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center min-w-[54px] sm:min-w-[62px] py-2 px-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/50 shadow-inner">
            <span className="text-lg sm:text-2xl font-black text-emerald-400 font-mono leading-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-bold">
              Detik
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
