import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Printer,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageCircle,
  FileSpreadsheet,
  Trophy,
  Award,
  School,
  Eye,
  ShieldCheck,
  ShieldAlert,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Zap,
  Check
} from 'lucide-react';
import { ParticipantRecord, updateParticipantField, safeDispatchParticipantsUpdated } from '../services/participantDb';
import { showToast } from './NotificationToast';
import { exportLolosFinalDanJuaraReportPdf } from '../services/officialReportsGenerator';
import { logAdminAction } from '../services/adminAuditLogService';

interface ReportFinalTableProps {
  participantsList: ParticipantRecord[];
  onToggleFinalPaymentClosing?: (p: ParticipantRecord) => void;
  onResetQuota: (p: ParticipantRecord) => void;
  onViewDetail: (p: ParticipantRecord) => void;
  generateFollowUpWhatsAppUrl: (p: ParticipantRecord, type: 'simulasi' | 'penyisihan' | 'final' | 'reminder_h2' | 'reminder_h1') => string;
  generateFinalCertificatePdf: (args: { student: ParticipantRecord; rankTitle?: string }) => void;
}

export const ReportFinalTable: React.FC<ReportFinalTableProps> = ({
  participantsList,
  onToggleFinalPaymentClosing,
  onResetQuota,
  onViewDetail,
  generateFollowUpWhatsAppUrl,
  generateFinalCertificatePdf
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('Semua');
  const [filterSubject, setFilterSubject] = useState('Semua');
  const [filterRank, setFilterRank] = useState('Semua');
  const [sortOption, setSortOption] = useState<'highest' | 'lowest' | 'latest' | 'name'>('highest');

  const handleManualSetRank = (p: ParticipantRecord, newRank: string) => {
    updateParticipantField(p.id, {
      championRank: newRank,
      certificateIssuedDate: new Date().toISOString()
    });
    logAdminAction(
      'MANUAL_MEDAL_ASSIGNMENT',
      `Penetapan Gelar ${newRank}`,
      `Admin menetapkan status gelar/medali untuk ${p.fullName} (${p.id}) menjadi: ${newRank}`,
      p.id,
      p.fullName
    );
    safeDispatchParticipantsUpdated();
    showToast('success', 'Gelar Juara Ditetapkan', `${p.fullName} berhasil ditetapkan sebagai: ${newRank}.`);
  };

  const handleManualEditScoreFinal = (p: ParticipantRecord) => {
    const currentScore = p.finalExam?.score ?? 0;
    const input = window.prompt(
      `Ubah Nilai Babak Final untuk:\nNama: ${p.fullName} (ID: ${p.id})\n\nMasukkan nilai baru (0 - 100):`,
      String(currentScore)
    );
    if (input === null) return;
    const parsed = parseInt(input.trim(), 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) {
      showToast('error', 'Nilai Tidak Valid', 'Nilai harus berupa angka antara 0 hingga 100.');
      return;
    }

    const recRank = parsed >= 90 ? 'Juara 1' : parsed >= 80 ? 'Juara 2' : parsed >= 70 ? 'Juara 3' : 'Peserta Final';

    updateParticipantField(p.id, {
      finalExam: {
        ...(p.finalExam || {
          subject: p.subjects?.[0] || 'Matematika',
          totalQuestions: 20,
          completedAt: new Date().toISOString()
        }),
        score: parsed,
        status: `Selesai Ujian Final (${parsed}/100)`,
        durationText: p.finalExam?.durationText || '19 Menit 10 Detik'
      },
      recommendedChampionRank: recRank
    });

    logAdminAction(
      'MANUAL_SCORE_EDIT',
      'Ubah Nilai Ujian Final',
      `Nilai final ${p.fullName} diubah menjadi ${parsed}/100 (Rekomendasi: ${recRank})`,
      p.id,
      p.fullName
    );

    safeDispatchParticipantsUpdated();
    showToast('success', 'Nilai Final Diperbarui', `Nilai ${p.fullName} berhasil diubah menjadi ${parsed}/100.`);
  };

  const handleManualEditDurationFinal = (p: ParticipantRecord) => {
    const currentDuration = p.finalExam?.durationText || '19 Menit 10 Detik';
    const input = window.prompt(
      `Ubah Waktu/Durasi Pengerjaan Babak Final:\nNama: ${p.fullName}\n\nMasukkan durasi pengerjaan baru (misal: "17 Menit 30 Detik"):`,
      currentDuration
    );
    if (input === null || !input.trim()) return;

    updateParticipantField(p.id, {
      finalExam: {
        ...(p.finalExam || {
          subject: p.subjects?.[0] || 'Matematika',
          score: 85,
          totalQuestions: 20,
          completedAt: new Date().toISOString(),
          status: 'Selesai Ujian Final'
        }),
        durationText: input.trim()
      }
    });

    safeDispatchParticipantsUpdated();
    showToast('success', 'Durasi Diperbarui', `Waktu pengerjaan ${p.fullName} diubah menjadi: ${input.trim()}.`);
  };

  // Stats calculation
  const completedFinalList = participantsList.filter(p => !!p.finalExam);
  const totalCompleted = completedFinalList.length;
  const countJuara1 = participantsList.filter(p => p.championRank === 'Juara 1' || (p.finalExam && p.finalExam.score >= 90)).length;
  const countJuara2 = participantsList.filter(p => p.championRank === 'Juara 2' || (p.finalExam && p.finalExam.score >= 80 && p.finalExam.score < 90)).length;
  const countJuara3 = participantsList.filter(p => p.championRank === 'Juara 3' || (p.finalExam && p.finalExam.score >= 70 && p.finalExam.score < 80)).length;
  const avgScore = totalCompleted > 0
    ? Math.round(completedFinalList.reduce((sum, p) => sum + (p.finalExam?.score || 0), 0) / totalCompleted)
    : 0;

  // Filtered & sorted data
  const filteredData = useMemo(() => {
    return participantsList
      .filter(p => {
        const matchesSearch =
          !searchTerm ||
          p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.whatsapp.includes(searchTerm) ||
          p.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.parentName && p.parentName.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesLevel =
          filterLevel === 'Semua' || p.level.includes(filterLevel);

        const matchesSubject =
          filterSubject === 'Semua' ||
          (p.finalExam && p.finalExam.subject === filterSubject) ||
          (p.subjects && p.subjects.includes(filterSubject));

        let matchesRank = true;
        if (filterRank === 'Juara 1') {
          matchesRank = p.championRank === 'Juara 1' || (!!p.finalExam && p.finalExam.score >= 90);
        } else if (filterRank === 'Juara 2') {
          matchesRank = p.championRank === 'Juara 2' || (!!p.finalExam && p.finalExam.score >= 80 && p.finalExam.score < 90);
        } else if (filterRank === 'Juara 3') {
          matchesRank = p.championRank === 'Juara 3' || (!!p.finalExam && p.finalExam.score >= 70 && p.finalExam.score < 80);
        } else if (filterRank === 'Peserta Final') {
          matchesRank = p.championRank === 'Peserta Final';
        } else if (filterRank === 'SudahUjian') {
          matchesRank = !!p.finalExam;
        }

        return matchesSearch && matchesLevel && matchesSubject && matchesRank;
      })
      .sort((a, b) => {
        if (sortOption === 'highest') {
          return (b.finalExam?.score ?? -1) - (a.finalExam?.score ?? -1);
        }
        if (sortOption === 'lowest') {
          return (a.finalExam?.score ?? 999) - (b.finalExam?.score ?? 999);
        }
        if (sortOption === 'name') {
          return a.fullName.localeCompare(b.fullName);
        }
        const timeA = a.finalExam?.completedAt ? new Date(a.finalExam.completedAt).getTime() : 0;
        const timeB = b.finalExam?.completedAt ? new Date(b.finalExam.completedAt).getTime() : 0;
        return timeB - timeA;
      });
  }, [participantsList, searchTerm, filterLevel, filterSubject, filterRank, sortOption]);

  // Mode Akses Cepat Ringan: Batasi tampil hanya 10 baris data per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  const displayedData = useMemo(() => {
    const start = (validPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, validPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterLevel, filterSubject, filterRank, sortOption]);

  const handleExportCsv = () => {
    const headers = [
      'Peringkat',
      'Gelar Juara Resmi',
      'No. Peserta',
      'Nama Lengkap Siswa',
      'Nomor WhatsApp',
      'Nama Orang Tua / Wali',
      'Kota / Wilayah',
      'Jenjang Sekolah',
      'Asal Sekolah',
      'Mata Pelajaran Babak Final',
      'Skor Nilai Babak Final (0-100)',
      'Status Tiket Final (BCA)',
      'Integritas Anti-Cheat',
      'Percobaan Final',
      'Waktu Selesai Final'
    ];

    const escapeCsv = (val: string | number) => `"${String(val ?? '').replace(/"/g, '""')}"`;

    const rows = filteredData.map((p, idx) => [
      idx + 1,
      p.championRank || (p.finalExam ? (p.finalExam.score >= 90 ? 'Juara 1' : p.finalExam.score >= 80 ? 'Juara 2' : p.finalExam.score >= 70 ? 'Juara 3' : 'Peserta Final') : 'Belum Ujian'),
      p.id,
      p.fullName,
      p.whatsapp,
      p.parentName || '-',
      p.cityProvince || '-',
      p.level,
      p.schoolName,
      p.finalExam?.subject || p.subjects?.[0] || 'Matematika',
      p.finalExam ? p.finalExam.score : 'Belum Ujian',
      p.finalTicketPaymentStatus === 'paid_closing' ? 'Lunas Closing Rp 99.000' : 'Belum Bayar',
      p.violationReason ? `Pelanggaran: ${p.violationReason}` : 'Aman & Terverifikasi',
      `${p.finalAttempts || 0}/2`,
      p.finalExam?.completedAt ? new Date(p.finalExam.completedAt).toLocaleString('id-ID') : '-'
    ]);

    const csvContent = [headers.map(escapeCsv).join(','), ...rows.map(r => r.map(escapeCsv).join(','))].join('\r\n');
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Pengerjaan_Babak_Final_OSN_2026_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'Ekspor CSV Berhasil', 'Data klasemen babak final (.csv) berhasil diunduh.');
  };

  const handlePrint = async () => {
    try {
      showToast('info', 'Menyiapkan Laporan Juara', 'Sedang memproses Laporan Resmi Pemenang Juara & Finalis PDF...');
      await exportLolosFinalDanJuaraReportPdf(filteredData.length > 0 ? filteredData : participantsList);
      logAdminAction('EXPORT_REPORT', 'Cetak Laporan Juara Babak Final (PDF)', `Export ${filteredData.length} data finalis`);
      showToast('success', 'Laporan Juara Berhasil Dicetak', 'Laporan Resmi Pemenang Juara & Finalis (PDF) berhasil diunduh.');
    } catch (err: any) {
      console.error('Export error:', err);
      showToast('error', 'Gagal Mencetak Laporan', err?.message || 'Terjadi kesalahan saat memproses laporan.');
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Header Banner & Statistik Cepat */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-[#1A1615] rounded-3xl p-5 sm:p-6 text-white shadow-lg border border-purple-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-black uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Laporan Grand Final & Penentuan Juara Resmi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-purple-100">
              Tabel Rekapitulasi Nilai & Juara Babak Final OSN 2026
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              Klasemen perolehan nilai Babak Final resmi (skor 0-100), penganugerahan gelar Medali Emas, Perak, Perunggu, pengawasan anti-kecurangan, dan unduhan Sertifikat Penghargaan Resmi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Ekspor CSV / Excel</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Laporan</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Metrik Ringkasan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-purple-500/20">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-neutral-300 block">Selesai Babak Final</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {totalCompleted}
              <span className="text-xs font-normal text-neutral-400 ml-1">finalis</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
              🥇 Juara 1 (Emas ≥90)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              {countJuara1}
              <span className="text-xs font-normal text-neutral-400 ml-1">siswa</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
              🥈 Juara 2 (Perak ≥80)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-200 mt-1">
              {countJuara2}
              <span className="text-xs font-normal text-neutral-400 ml-1">siswa</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-amber-500 flex items-center gap-1">
              🥉 Juara 3 (Perunggu ≥70)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-1">
              {countJuara3}
              <span className="text-xs font-normal text-neutral-400 ml-1">siswa</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Toolbar Pencarian & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] space-y-3 shadow-xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari nama siswa finalis, No. Peserta, WhatsApp, atau sekolah..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-purple-600 bg-[#FAF8F5]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Jenjang */}
            <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
              <Filter className="w-3.5 h-3.5" />
              <span className="font-bold">Jenjang:</span>
              <select
                value={filterLevel}
                onChange={e => setFilterLevel(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs border border-[#E8E2D9] bg-[#FAF8F5] focus:outline-none"
              >
                <option value="Semua">Semua Jenjang</option>
                <option value="PAUD">Kategori A (PAUD/TK)</option>
                <option value="SD">Kategori B (SD/MI)</option>
                <option value="SMP">Kategori C (SMP/MTs)</option>
              </select>
            </div>

            {/* Filter Mapel */}
            <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
              <span className="font-bold">Mapel:</span>
              <select
                value={filterSubject}
                onChange={e => setFilterSubject(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs border border-[#E8E2D9] bg-[#FAF8F5] focus:outline-none"
              >
                <option value="Semua">Semua Mapel</option>
                <option value="Matematika">Matematika</option>
                <option value="IPA / Sains">IPA / Sains</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
              </select>
            </div>

            {/* Filter Gelar Juara */}
            <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-bold">Gelar Juara:</span>
              <select
                value={filterRank}
                onChange={e => setFilterRank(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs border border-purple-200 bg-purple-50 text-purple-950 font-bold focus:outline-none"
              >
                <option value="Semua">Semua Finalis</option>
                <option value="Juara 1">🥇 Juara 1 (Emas ≥90)</option>
                <option value="Juara 2">🥈 Juara 2 (Perak ≥80)</option>
                <option value="Juara 3">🥉 Juara 3 (Perunggu ≥70)</option>
                <option value="Peserta Final">🎖️ Peserta Final</option>
                <option value="SudahUjian">Sudah Ujian Final</option>
              </select>
            </div>

            {/* Urutan */}
            <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
              <span className="font-bold">Urutkan:</span>
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-xl text-xs border border-[#E8E2D9] bg-[#FAF8F5] focus:outline-none font-semibold text-neutral-800"
              >
                <option value="highest">Nilai Tertinggi (100 → 0)</option>
                <option value="lowest">Nilai Terendah (0 → 100)</option>
                <option value="latest">Waktu Terbaru</option>
                <option value="name">Nama Siswa (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-[#756F68] pt-2 border-t border-[#E8E2D9] flex items-center justify-between">
          <span>
            Menampilkan <strong>{filteredData.length}</strong> data peserta babak final
          </span>
          <span className="text-purple-900 font-semibold">
            Predikat: Juara 1 (≥90) · Juara 2 (≥80) · Juara 3 (≥70) · Peserta Final (&lt;70)
          </span>
        </div>
      </div>

      {/* 3. Tabel Data Laporan Final */}
      <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1615]">
            <thead className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#756F68] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="py-3 px-3 w-12 text-center">Rank</th>
                <th className="py-3 px-3">Gelar Juara Resmi</th>
                <th className="py-3 px-3">Identitas Siswa Finalis</th>
                <th className="py-3 px-3">Asal Sekolah & Jenjang</th>
                <th className="py-3 px-3">Mata Pelajaran</th>
                <th className="py-3 px-3 text-center">Nilai Skor Final</th>
                <th className="py-3 px-3 text-center">Status Anti-Cheat</th>
                <th className="py-3 px-3 text-center">Tiket Final (BCA)</th>
                <th className="py-3 px-3 text-center">Sertifikat & Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D9]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-500">
                    <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="font-bold text-sm text-[#1A1615]">Tidak ada data finalis ditemukan</p>
                    <p className="text-xs text-[#756F68] mt-1">Coba sesuaikan kata kunci pencarian atau filter yang dipilih.</p>
                  </td>
                </tr>
              ) : (
                displayedData.map((p, idx) => {
                  const globalIdx = (validPage - 1) * PAGE_SIZE + idx + 1;
                  const hasFinal = !!p.finalExam;
                  const score = p.finalExam?.score ?? 0;
                  const attempts = p.finalAttempts || (hasFinal ? 1 : 0);
                  const isPaid = Boolean(p.finalTicketPaymentStatus === 'paid_closing' || p.isClosing);

                  // Rekomendasi sistem berdasarkan perolehan skor
                  const systemRecommendation = hasFinal
                    ? (score >= 90 ? 'Juara 1 (Emas)' : score >= 80 ? 'Juara 2 (Perak)' : score >= 70 ? 'Juara 3 (Perunggu)' : 'Peserta Final')
                    : null;

                  // Status penetapan gelar resmi oleh Admin
                  const rank = p.championRank && p.championRank !== 'Belum Dinilai' && p.championRank !== 'Belum Ditetapkan'
                    ? p.championRank
                    : null;

                  return (
                    <tr key={p.id} className="hover:bg-purple-50/40 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-neutral-500 font-mono">
                        {globalIdx}
                      </td>

                      {/* Gelar Juara: Ditentukan oleh Admin & Rekomendasi Sistem */}
                      <td className="py-3 px-3">
                        <div className="space-y-1">
                          {rank ? (
                            <div>
                              {rank === 'Juara 1' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-xs border border-amber-300">
                                  🥇 JUARA 1 (EMAS)
                                </span>
                              )}
                              {rank === 'Juara 2' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-gradient-to-r from-slate-200 to-slate-300 text-slate-900 shadow-xs border border-slate-300">
                                  🥈 JUARA 2 (PERAK)
                                </span>
                              )}
                              {rank === 'Juara 3' && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs border border-amber-500">
                                  🥉 JUARA 3 (PERUNGGU)
                                </span>
                              )}
                              {rank === 'Peserta Final' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                                  🎖️ Peserta Final
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-[10px] font-bold text-neutral-400 block">
                              ⏳ Belum Ditetapkan Admin
                            </span>
                          )}

                          {systemRecommendation && (
                            <div className="text-[9.5px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              🤖 Rekomendasi Sistem: <strong>{systemRecommendation}</strong>
                            </div>
                          )}

                          {/* Dropdown Penetapan Juara oleh Admin */}
                          <div className="pt-0.5">
                            <select
                              value={p.championRank || 'Belum Ditetapkan'}
                              onChange={(e) => handleManualSetRank(p, e.target.value)}
                              className="text-[10px] font-bold px-2 py-1 rounded-lg border border-purple-200 bg-white text-purple-950 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer shadow-2xs w-full"
                              title="Pilih dan tetapkan gelar juara resmi untuk peserta ini"
                            >
                              <option value="Belum Ditetapkan">-- Tetapkan Juara (Admin) --</option>
                              <option value="Juara 1">🥇 Juara 1 (Medali Emas)</option>
                              <option value="Juara 2">🥈 Juara 2 (Medali Perak)</option>
                              <option value="Juara 3">🥉 Juara 3 (Medali Perunggu)</option>
                              <option value="Peserta Final">🎖️ Peserta Finalis</option>
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* Identitas Siswa */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-[#1A1615] block hover:text-purple-800 transition-colors">
                            {p.fullName}
                          </span>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#756F68]">
                            <span className="font-mono bg-neutral-100 px-1.5 py-0.2 rounded text-[10px] text-neutral-700 font-bold">
                              {p.id}
                            </span>
                            <span>·</span>
                            <a
                              href={`https://wa.me/${p.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 hover:underline font-semibold"
                            >
                              {p.whatsapp}
                            </a>
                          </div>
                          {p.parentName && (
                            <span className="text-[10px] text-neutral-500 block">
                              Wali: {p.parentName}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Asal Sekolah & Jenjang */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-neutral-800 flex items-center gap-1">
                            <School className="w-3 h-3 text-neutral-400 shrink-0" />
                            {p.schoolName}
                          </span>
                          <span className="text-[10px] text-neutral-500 block">
                            {p.level}
                          </span>
                          <span className="text-[10px] text-neutral-400 block">
                            {p.cityProvince || '-'}
                          </span>
                        </div>
                      </td>

                      {/* Mata Pelajaran */}
                      <td className="py-3 px-3 font-semibold text-[#1A1615]">
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-100 font-bold text-xs inline-block">
                          {p.finalExam?.subject || p.subjects?.[0] || 'Matematika'}
                        </span>
                      </td>

                      {/* Nilai Skor Final & Durasi */}
                      <td className="py-3 px-3 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          {hasFinal ? (
                            <span className="px-3 py-1 rounded-xl text-sm font-black shadow-xs font-mono bg-purple-700 text-white">
                              {score} / 100
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-500">
                              Belum Ujian
                            </span>
                          )}

                          {/* Tombol Ubah Nilai Manual */}
                          <button
                            type="button"
                            onClick={() => handleManualEditScoreFinal(p)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 cursor-pointer shadow-2xs"
                            title="Ubah nilai babak final secara manual"
                          >
                            <Edit3 className="w-2.5 h-2.5 text-purple-700" />
                            <span>Ubah Nilai</span>
                          </button>

                          {/* Waktu Pengerjaan Final */}
                          <div className="inline-flex items-center justify-center gap-1 bg-neutral-50 border border-neutral-200 px-2 py-0.5 rounded text-[10px] font-bold text-neutral-800 mt-0.5">
                            <Clock className="w-2.5 h-2.5 text-neutral-500" />
                            <span>{p.finalExam?.durationText || (hasFinal ? '20 Menit' : '-')}</span>
                            <button
                              type="button"
                              onClick={() => handleManualEditDurationFinal(p)}
                              className="text-neutral-600 hover:text-black p-0.5 cursor-pointer"
                              title="Ubah durasi pengerjaan final"
                            >
                              <Edit3 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Status Anti-Cheat */}
                      <td className="py-3 px-3 text-center">
                        {p.violationReason ? (
                          <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[10px] space-y-0.5">
                            <div className="font-bold flex items-center justify-center gap-1">
                              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                              <span>Pelanggaran</span>
                            </div>
                            <span className="text-[9px] block text-rose-700 leading-tight">
                              {p.violationReason}
                            </span>
                          </div>
                        ) : hasFinal ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Aman & Terverifikasi
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-400">Siap Ujian</span>
                        )}
                      </td>

                      {/* Tiket Final BCA (Closing) */}
                      <td className="py-3 px-3 text-center">
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (onToggleFinalPaymentClosing) {
                                onToggleFinalPaymentClosing(p);
                              } else {
                                const isCurrentlyPaid = Boolean(p.finalTicketPaymentStatus === 'paid_closing' || p.isClosing);
                                const nextIsClosing = !isCurrentlyPaid;
                                const nextPaymentStatus = isCurrentlyPaid ? 'unpaid' : 'paid_closing';
                                const nextPaidAt = isCurrentlyPaid ? undefined : new Date().toISOString();
                                const nextAmount = isCurrentlyPaid ? 0 : 99000;
                                const nextCbtStatus = isCurrentlyPaid ? 'Tercatat di Database' : 'Tiket Final Lunas (Closing Rp 99.000)';
                                updateParticipantField(p.id, {
                                  finalTicketPaymentStatus: nextPaymentStatus,
                                  isClosing: nextIsClosing,
                                  finalTicketPaidAt: nextPaidAt,
                                  finalTicketAmount: nextAmount,
                                  cbtStatus: nextCbtStatus
                                });
                                safeDispatchParticipantsUpdated();
                                fetch(`/api/participants/${encodeURIComponent(p.id)}`, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    id: p.id,
                                    finalTicketPaymentStatus: nextPaymentStatus,
                                    isClosing: nextIsClosing,
                                    finalTicketPaidAt: nextPaidAt,
                                    finalTicketAmount: nextAmount,
                                    cbtStatus: nextCbtStatus
                                  })
                                }).catch(() => {});
                              }
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                              isPaid
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-purple-100 hover:text-purple-900 border border-neutral-300'
                            }`}
                            title="Tandai pembayaran tiket promo final Rp 99.000 (Rek BCA)"
                          >
                            {isPaid ? '★ CLOSING LUNAS' : '+ Tandai Rp99k'}
                          </button>
                          <div className="text-[9px] text-neutral-500 font-mono">
                            {isPaid ? 'BCA Rp 99.000' : 'Belum Bayar'}
                          </div>
                        </div>
                      </td>

                      {/* Sertifikat & Aksi */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Tombol Unduh Sertifikat */}
                          {(hasFinal || isPaid) && (
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  showToast('info', 'Menyiapkan Sertifikat', `Sedang memproses Sertifikat Juara Resmi untuk ${p.fullName}...`);
                                  await generateFinalCertificatePdf({ student: p, rankTitle: rank || 'Peserta Final' });
                                  showToast('success', 'Sertifikat Berhasil Diunduh', `Sertifikat Juara untuk ${p.fullName} berhasil dicetak.`);
                                } catch (e: any) {
                                  showToast('error', 'Gagal Mengunduh Sertifikat', e?.message || 'Terjadi kesalahan saat memproses sertifikat PDF.');
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                              title="Unduh Sertifikat Penghargaan Babak Final OSN 2026 Resmi (PDF)"
                            >
                              <Download className="w-3 h-3" />
                              <span>Sertifikat PDF</span>
                            </button>
                          )}

                          {/* Tombol WA Ucapan Selamat */}
                          <a
                            href={generateFollowUpWhatsAppUrl(p, 'final')}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                              showToast('success', 'Membuka WhatsApp', `Menghubungkan chat tindak lanjut finalis untuk ${p.fullName}...`);
                            }}
                            className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors cursor-pointer"
                            title="Kirim pesan ucapan selamat & sertifikat via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          {/* Reset Kuota */}
                          {attempts > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                onResetQuota(p);
                                showToast('info', 'Reset Kuota Dipilih', `Membuka pengaturan reset kuota final untuk ${p.fullName}.`);
                              }}
                              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
                              title="Reset riwayat ujian babak final"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Detail */}
                          <button
                            type="button"
                            onClick={() => onViewDetail(p)}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                            title="Lihat detail formulir peserta"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar - 10 baris per halaman */}
        {filteredData.length > 0 && (
          <div className="p-3.5 bg-[#FAF8F5] border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-600 font-medium text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-700" />
                Mode Ringan
              </span>
              <span>
                Menampilkan baris ke-<strong>{(validPage - 1) * PAGE_SIZE + 1}</strong> s/d <strong>{(validPage - 1) * PAGE_SIZE + displayedData.length}</strong> dari <strong>{filteredData.length}</strong> peserta babak final
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={validPage <= 1}
                className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs"
              >
                « Awal
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={validPage <= 1}
                className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="font-extrabold text-[#1A1615] px-2 text-xs">
                Hal {validPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={validPage >= totalPages}
                className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs flex items-center gap-1"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={validPage >= totalPages}
                className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs"
              >
                Akhir »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
