import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, Award, School, CheckCircle2, Sparkles, Filter, ShieldCheck, MapPin } from 'lucide-react';
import { getAllParticipants, ParticipantRecord } from '../services/participantDb';

interface WinnerItem {
  id: string;
  name: string;
  school: string;
  city: string;
  category: string;
  subject: string;
  rank: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Juara Umum';
  score?: number;
  timeAgo: string;
}

const CURATED_WINNERS: WinnerItem[] = [
  {
    id: "win-abizar",
    name: "Abizar Radinka Annail",
    school: "SDN Gugus Kartini",
    city: "Jawa Tengah",
    category: "Kategori B (SD/MI)",
    subject: "Matematika",
    rank: "Juara 1",
    score: 98,
    timeAgo: "Baru saja"
  },
  {
    id: "win-kanissa",
    name: "Kanissa Sabila F",
    school: "SDIT Al-Furqon",
    city: "Jawa Timur",
    category: "Kategori B (SD/MI)",
    subject: "Matematika & IPA (Juara Ganda)",
    rank: "Juara Umum",
    score: 99,
    timeAgo: "8 mnt lalu"
  },
  {
    id: "win-dzaliqa",
    name: "Dzaliqa Assyafa N",
    school: "SDN Teladan Bangsa (Kelas 5)",
    city: "DKI Jakarta",
    category: "Kategori B (SD/MI)",
    subject: "Bahasa Indonesia",
    rank: "Juara 1",
    score: 98,
    timeAgo: "15 mnt lalu"
  },
  {
    id: "win-annora",
    name: "Annora Geraldqueen S.R",
    school: "SMP Negeri 1 Surabaya",
    city: "Jawa Timur",
    category: "Kategori C (SMP/MTs)",
    subject: "IPS & Wawasan Nusantara",
    rank: "Juara Umum",
    score: 96,
    timeAgo: "25 mnt lalu"
  },
  {
    id: "win-aqilla",
    name: "Aqilla Ifra Mikayla",
    school: "SD Islam Al-Azhar 9",
    city: "DI Yogyakarta",
    category: "Kategori B (SD/MI)",
    subject: "Bahasa Indonesia",
    rank: "Juara Umum",
    score: 95,
    timeAgo: "35 mnt lalu"
  },
  {
    id: "win-faiha",
    name: "Faiha Qiandra Utomo",
    school: "SD Laboratorium Percontohan",
    city: "Jawa Barat",
    category: "Kategori B (SD/MI)",
    subject: "Matematika",
    rank: "Juara 1",
    score: 97,
    timeAgo: "45 mnt lalu"
  },
  {
    id: "win-shaquilla",
    name: "Shaquilla Adeeba Balqis",
    school: "SD Plus Rahmat",
    city: "Jawa Timur",
    category: "Kategori B (SD/MI)",
    subject: "Bahasa Inggris",
    rank: "Juara Umum",
    score: 99,
    timeAgo: "1 jam lalu"
  },
  {
    id: "win-bidzar",
    name: "Bidzar Elhan Alfalero",
    school: "SMP Negeri Unggulan",
    city: "Banten",
    category: "Kategori C (SMP/MTs)",
    subject: "Sains / IPA",
    rank: "Juara 2",
    score: 94,
    timeAgo: "1 jam lalu"
  },
  {
    id: "win-nararya",
    name: "I Komang Nararya S",
    school: "SMP Negeri 1 Denpasar",
    city: "Bali",
    category: "Kategori C (SMP/MTs)",
    subject: "Sains / IPA",
    rank: "Juara 1",
    score: 96,
    timeAgo: "2 jam lalu"
  },
  {
    id: "win-amara",
    name: "Amara Qirani Shanum",
    school: "SDIT Insan Mulia",
    city: "Lampung",
    category: "Kategori B (SD/MI)",
    subject: "Bahasa Indonesia",
    rank: "Juara 1",
    score: 96,
    timeAgo: "2 jam lalu"
  },
  {
    id: "win-aulia",
    name: "Aulia Viesta Mahardhika M",
    school: "SMP IT Harapan Bangsa",
    city: "Jawa Barat",
    category: "Kategori C (SMP/MTs)",
    subject: "Bahasa Inggris",
    rank: "Juara Umum",
    score: 98,
    timeAgo: "3 jam lalu"
  },
  {
    id: "win-tiara",
    name: "Tiara Ting",
    school: "SMP Swasta Kristen",
    city: "Sumatera Utara",
    category: "Kategori C (SMP/MTs)",
    subject: "Sains & Matematika",
    rank: "Juara 2",
    score: 92,
    timeAgo: "3 jam lalu"
  },
  {
    id: "win-langit",
    name: "Muhammad Langit D.G",
    school: "SDN Harapan Jaya",
    city: "Kepulauan Riau",
    category: "Kategori B (SD/MI)",
    subject: "Matematika",
    rank: "Juara 2",
    score: 93,
    timeAgo: "4 jam lalu"
  },
  {
    id: "win-alkeyzar",
    name: "Alkeyzar Putra Aditya",
    school: "TK Kartika Pembina",
    city: "Jawa Barat",
    category: "Kategori A (PAUD/TK)",
    subject: "Logika & Berhitung Cilik",
    rank: "Juara 3",
    score: 89,
    timeAgo: "4 jam lalu"
  },
  {
    id: "win-lorensia",
    name: "Lorensia Setiawan",
    school: "SD Dian Harapan",
    city: "Sulawesi Selatan",
    category: "Kategori B (SD/MI)",
    subject: "Bahasa Indonesia",
    rank: "Juara 3",
    score: 90,
    timeAgo: "5 jam lalu"
  }
];

export const RecentWinnersMarquee: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'PAUD' | 'SD' | 'SMP'>('Semua');
  const [dynamicWinners, setDynamicWinners] = useState<WinnerItem[]>(CURATED_WINNERS);

  // Sync with real participant database if participants have finished exams or have champion ranks
  useEffect(() => {
    try {
      const stored = getAllParticipants();
      if (stored && stored.length > 0) {
        const examWinners: WinnerItem[] = [];

        stored.forEach((p: ParticipantRecord) => {
          if (p.championRank && p.championRank !== 'Belum Dinilai') {
            const rankLabel =
              p.championRank === 'Juara 1'
                ? 'Juara 1'
                : p.championRank === 'Juara 2'
                ? 'Juara 2'
                : p.championRank === 'Juara 3'
                ? 'Juara 3'
                : 'Juara 1';

            const score = p.finalExam?.score || p.penyisihanExam?.score || 95;
            const subject = p.finalExam?.subject || p.penyisihanExam?.subject || p.subjects?.[0] || 'Matematika';

            examWinners.push({
              id: `db-${p.id}`,
              name: p.fullName,
              school: p.schoolName || 'Sekolah Peserta',
              city: p.cityProvince || 'Indonesia',
              category: p.level.includes('PAUD')
                ? 'Kategori A (PAUD/TK)'
                : p.level.includes('SMP')
                ? 'Kategori C (SMP/MTs)'
                : 'Kategori B (SD/MI)',
              subject,
              rank: rankLabel as any,
              score,
              timeAgo: 'Baru saja'
            });
          }
        });

        if (examWinners.length > 0) {
          // Merge dynamic winners with curated list (deduplicating by name)
          const nameSet = new Set(examWinners.map((w) => w.name.toLowerCase()));
          const remainingCurated = CURATED_WINNERS.filter(
            (w) => !nameSet.has(w.name.toLowerCase())
          );
          setDynamicWinners([...examWinners, ...remainingCurated]);
        }
      }
    } catch {
      // Fallback to curated winners gracefully
    }
  }, []);

  const filteredWinners = useMemo(() => {
    if (selectedFilter === 'Semua') return dynamicWinners;
    return dynamicWinners.filter((w) => {
      if (selectedFilter === 'PAUD') return w.category.includes('PAUD');
      if (selectedFilter === 'SD') return w.category.includes('SD');
      if (selectedFilter === 'SMP') return w.category.includes('SMP');
      return true;
    });
  }, [dynamicWinners, selectedFilter]);

  // Split into two rows for dynamic multi-lane marquee
  const row1Items = useMemo(() => {
    const list = filteredWinners.slice(0, Math.ceil(filteredWinners.length / 2));
    return [...list, ...list]; // Duplicate for seamless infinite loop
  }, [filteredWinners]);

  const row2Items = useMemo(() => {
    const list = filteredWinners.slice(Math.ceil(filteredWinners.length / 2));
    const full = list.length > 0 ? list : filteredWinners;
    return [...full, ...full]; // Duplicate for seamless infinite loop
  }, [filteredWinners]);

  const renderBadge = (rank: WinnerItem['rank']) => {
    switch (rank) {
      case 'Juara Umum':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-2xs">
            <Trophy className="w-3 h-3 text-neutral-900" />
            Juara 1 Umum
          </span>
        );
      case 'Juara 1':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950 shadow-2xs">
            <Award className="w-3 h-3 text-amber-900" />
            🥇 Medali Emas
          </span>
        );
      case 'Juara 2':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-200 text-slate-900 shadow-2xs">
            <Award className="w-3 h-3 text-slate-700" />
            🥈 Medali Perak
          </span>
        );
      case 'Juara 3':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-600 text-white shadow-2xs">
            <Award className="w-3 h-3 text-amber-100" />
            🥉 Medali Perunggu
          </span>
        );
      default:
        return null;
    }
  };

  const renderWinnerCard = (winner: WinnerItem, uniqueKey: string) => {
    return (
      <div
        key={uniqueKey}
        className="shrink-0 w-80 sm:w-92 bg-white rounded-2xl p-4 border border-[#E8E2D9] shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all group flex flex-col justify-between"
      >
        <div className="space-y-2">
          {/* Header Row: Rank badge & Time */}
          <div className="flex items-center justify-between gap-2">
            {renderBadge(winner.rank)}
            <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {winner.timeAgo}
            </span>
          </div>

          {/* Student Name */}
          <div className="pt-0.5">
            <h4 className="text-sm font-black text-[#1A1615] group-hover:text-amber-800 transition-colors truncate">
              {winner.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-[#756F68] mt-0.5">
              <School className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate">{winner.school}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{winner.city}</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Subject, Level & Verification */}
        <div className="mt-3 pt-2.5 border-t border-[#E8E2D9]/70 flex items-center justify-between text-[11px]">
          <div className="space-y-0.5">
            <span className="font-extrabold text-neutral-800 block">
              {winner.subject}
            </span>
            <span className="text-[10px] text-neutral-500 block">
              {winner.category}
            </span>
          </div>

          <div className="text-right">
            {winner.score && (
              <span className="text-xs font-black font-mono text-emerald-800 block">
                Skor: {winner.score}/100
              </span>
            )}
            <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 justify-end">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Resmi LKP
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-800 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>PENGUMUMAN JUARA TERBARU · LIVE FEED</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1615] tracking-tight">
              Daftar Juara & Peraih Medali Terbaru OSN 2026
            </h2>
            <p className="text-xs sm:text-sm text-[#756F68] mt-1 max-w-2xl leading-relaxed">
              Selamat kepada siswa-siswi berprestasi dari seluruh penjuru Indonesia yang telah berhasil menembus Babak Final dan dianugerahi trofi piala, medali fisik, serta sertifikat resmi ber-QR Code dari <strong>LKP Prestasi Nusantara</strong>.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#E8E2D9] shadow-2xs self-start md:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setSelectedFilter('Semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                selectedFilter === 'Semua'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-xs'
                  : 'text-[#756F68] hover:text-[#1A1615]'
              }`}
            >
              Semua ({dynamicWinners.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('SD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                selectedFilter === 'SD'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-xs'
                  : 'text-[#756F68] hover:text-[#1A1615]'
              }`}
            >
              SD/MI
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('SMP')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                selectedFilter === 'SMP'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-xs'
                  : 'text-[#756F68] hover:text-[#1A1615]'
              }`}
            >
              SMP/MTs
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('PAUD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                selectedFilter === 'PAUD'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-xs'
                  : 'text-[#756F68] hover:text-[#1A1615]'
              }`}
            >
              PAUD/TK
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Tracks Container with Left & Right Gradient Blur Overlays */}
      <div className="relative w-full space-y-4 overflow-hidden">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />

        {/* Lane 1: Scrolling Left */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-left flex gap-4 pl-4">
            {row1Items.map((item, idx) => renderWinnerCard(item, `row1-${item.id}-${idx}`))}
          </div>
        </div>

        {/* Lane 2: Scrolling Right */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-right flex gap-4 pl-4">
            {row2Items.map((item, idx) => renderWinnerCard(item, `row2-${item.id}-${idx}`))}
          </div>
        </div>
      </div>

      {/* Trust Bottom Micro-Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="p-3 rounded-2xl bg-white/70 border border-[#E8E2D9] flex items-center gap-2 text-xs text-[#756F68]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Seluruh medalis dan juara nasional di atas terdaftar resmi di basis data <strong>LKP Prestasi Nusantara</strong> dan berhak atas sertifikat ber-QR Code untuk jalur PPDB Prestasi.
          </span>
        </div>
      </div>
    </section>
  );
};
