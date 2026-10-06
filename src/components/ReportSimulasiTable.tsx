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
  GraduationCap,
  Calendar,
  School,
  Eye,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { ParticipantRecord } from '../services/participantDb';

interface ReportSimulasiTableProps {
  participantsList: ParticipantRecord[];
  onResetQuota: (p: ParticipantRecord) => void;
  onViewDetail: (p: ParticipantRecord) => void;
  generateFollowUpWhatsAppUrl: (p: ParticipantRecord, type: 'simulasi' | 'penyisihan' | 'final' | 'reminder_h2' | 'reminder_h1') => string;
  downloadExamCardPdf: (p: ParticipantRecord) => void;
}

export const ReportSimulasiTable: React.FC<ReportSimulasiTableProps> = ({
  participantsList,
  onResetQuota,
  onViewDetail,
  generateFollowUpWhatsAppUrl,
  downloadExamCardPdf
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('Semua');
  const [filterSubject, setFilterSubject] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [sortOption, setSortOption] = useState<'highest' | 'lowest' | 'latest' | 'name'>('highest');

  // Stats calculation
  const totalCompleted = participantsList.filter(p => !!p.simulatedExam).length;
  const totalPassed = participantsList.filter(p => p.simulatedExam && p.simulatedExam.score >= 70).length;
  const totalNeedHelp = participantsList.filter(p => p.simulatedExam && p.simulatedExam.score < 70).length;
  const avgScore = totalCompleted > 0
    ? Math.round(
        participantsList
          .filter(p => !!p.simulatedExam)
          .reduce((sum, p) => sum + (p.simulatedExam?.score || 0), 0) / totalCompleted
      )
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
          (p.simulatedExam && p.simulatedExam.subject === filterSubject) ||
          (p.subjects && p.subjects.includes(filterSubject));

        let matchesStatus = true;
        if (filterStatus === 'Sudah') {
          matchesStatus = !!p.simulatedExam;
        } else if (filterStatus === 'Belum') {
          matchesStatus = !p.simulatedExam;
        } else if (filterStatus === 'Lolos') {
          matchesStatus = !!p.simulatedExam && p.simulatedExam.score >= 70;
        } else if (filterStatus === 'PerluBimbingan') {
          matchesStatus = !!p.simulatedExam && p.simulatedExam.score < 70;
        }

        return matchesSearch && matchesLevel && matchesSubject && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOption === 'highest') {
          return (b.simulatedExam?.score ?? -1) - (a.simulatedExam?.score ?? -1);
        }
        if (sortOption === 'lowest') {
          return (a.simulatedExam?.score ?? 999) - (b.simulatedExam?.score ?? 999);
        }
        if (sortOption === 'name') {
          return a.fullName.localeCompare(b.fullName);
        }
        const timeA = a.simulatedExam?.completedAt ? new Date(a.simulatedExam.completedAt).getTime() : 0;
        const timeB = b.simulatedExam?.completedAt ? new Date(b.simulatedExam.completedAt).getTime() : 0;
        return timeB - timeA;
      });
  }, [participantsList, searchTerm, filterLevel, filterSubject, filterStatus, sortOption]);

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
  }, [searchTerm, filterLevel, filterSubject, filterStatus, sortOption]);

  const handleExportCsv = () => {
    const headers = [
      'No',
      'No. Peserta',
      'Nama Lengkap Siswa',
      'Nomor WhatsApp',
      'Email',
      'Nama Orang Tua / Wali',
      'Kota / Wilayah',
      'Jenjang Sekolah',
      'Asal Sekolah',
      'Mata Pelajaran Simulasi',
      'Skor Nilai Simulasi (0-100)',
      'Status Evaluasi',
      'Percobaan Digunakan',
      'Waktu Selesai Pengerjaan'
    ];

    const escapeCsv = (val: string | number) => `"${String(val ?? '').replace(/"/g, '""')}"`;

    const rows = filteredData.map((p, idx) => [
      idx + 1,
      p.id,
      p.fullName,
      p.whatsapp,
      p.email || '-',
      p.parentName || '-',
      p.cityProvince || '-',
      p.level,
      p.schoolName,
      p.simulatedExam?.subject || p.subjects?.[0] || 'Matematika',
      p.simulatedExam ? p.simulatedExam.score : 'Belum Simulasi',
      p.simulatedExam ? (p.simulatedExam.score >= 70 ? 'Lolos Passing Grade (>=70)' : 'Perlu Bimbingan (<70)') : 'Belum Mengerjakan',
      `${p.simulatedAttempts || 0}/2`,
      p.simulatedExam?.completedAt ? new Date(p.simulatedExam.completedAt).toLocaleString('id-ID') : '-'
    ]);

    const csvContent = [headers.map(escapeCsv).join(','), ...rows.map(r => r.map(escapeCsv).join(','))].join('\r\n');
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Pengerjaan_Simulasi_CBT_OSN_2026_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      {/* 1. Header Banner & Statistik Cepat */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-[#1A1615] rounded-3xl p-5 sm:p-6 text-white shadow-lg border border-amber-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Laporan Evaluasi Simulasi CBT Resmi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-100">
              Tabel Rekapitulasi Pengerjaan Simulasi CBT 2026
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              Pantau progres peserta yang telah menyelesaikan simulasi 20 soal bergambar, evaluasi passing grade nilai (skor 0-100), kuota pengerjaan (maks. 2x), dan follow-up WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-amber-500/20">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-neutral-300 block">Total Selesai Simulasi</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {totalCompleted}
              <span className="text-xs font-normal text-neutral-400 ml-1">/ {participantsList.length} siswa</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-amber-200 block">Rata-Rata Nilai</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
              {avgScore}
              <span className="text-xs font-normal text-neutral-400 ml-1">/ 100</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-emerald-300 block">Lulus Passing Grade (≥70)</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
              {totalPassed}
              <span className="text-xs font-normal text-neutral-400 ml-1">siswa</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-rose-300 block">Perlu Bimbingan (&lt;70)</span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">
              {totalNeedHelp}
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
              placeholder="Cari nama siswa, No. Peserta, WhatsApp, atau sekolah..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-amber-500 bg-[#FAF8F5]"
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

            {/* Filter Status */}
            <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
              <span className="font-bold">Status:</span>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs border border-[#E8E2D9] bg-[#FAF8F5] focus:outline-none"
              >
                <option value="Semua">Semua Status</option>
                <option value="Sudah">Sudah Simulasi</option>
                <option value="Belum">Belum Mengerjakan</option>
                <option value="Lolos">Lolos Passing Grade (≥70)</option>
                <option value="PerluBimbingan">Perlu Bimbingan (&lt;70)</option>
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
            Menampilkan <strong>{filteredData.length}</strong> data peserta pengerjaan simulasi
          </span>
          <span className="text-amber-800 font-semibold">
            Standar Lulus Simulasi: Minimal Skor 70 / 100
          </span>
        </div>
      </div>

      {/* 3. Tabel Data Laporan Simulasi */}
      <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1615]">
            <thead className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#756F68] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="py-3 px-3 w-12 text-center">No</th>
                <th className="py-3 px-3">Peserta & Identitas</th>
                <th className="py-3 px-3">Asal Sekolah & Jenjang</th>
                <th className="py-3 px-3">Mata Pelajaran</th>
                <th className="py-3 px-3 text-center">Nilai Skor Simulasi</th>
                <th className="py-3 px-3 text-center">Evaluasi & Kuota</th>
                <th className="py-3 px-3 text-center">Waktu Pengerjaan</th>
                <th className="py-3 px-3 text-center">Aksi Follow-Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D9]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-500">
                    <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="font-bold text-sm text-[#1A1615]">Tidak ada data peserta ditemukan</p>
                    <p className="text-xs text-[#756F68] mt-1">Coba sesuaikan kata kunci pencarian atau filter yang dipilih.</p>
                  </td>
                </tr>
              ) : (
                displayedData.map((p, idx) => {
                  const globalIdx = (validPage - 1) * PAGE_SIZE + idx + 1;
                  const hasExam = !!p.simulatedExam;
                  const score = p.simulatedExam?.score ?? 0;
                  const isPassed = hasExam && score >= 70;
                  const attempts = p.simulatedAttempts || (hasExam ? 1 : 0);

                  return (
                    <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-neutral-500 font-mono">
                        {globalIdx}
                      </td>

                      {/* Identitas Siswa */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-[#1A1615] block hover:text-amber-800 transition-colors">
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
                          {p.simulatedExam?.subject || p.subjects?.[0] || 'Matematika'}
                        </span>
                      </td>

                      {/* Nilai Skor Simulasi */}
                      <td className="py-3 px-3 text-center">
                        {hasExam ? (
                          <div className="inline-flex flex-col items-center">
                            <span
                              className={`px-3 py-1 rounded-xl text-sm font-black shadow-xs font-mono ${
                                isPassed
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                            >
                              {score} / 100
                            </span>
                            <span className="text-[10px] text-[#756F68] mt-1">
                              20 Soal Pilihan Ganda
                            </span>
                          </div>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-500">
                            Belum Mengerjakan
                          </span>
                        )}
                      </td>

                      {/* Evaluasi & Kuota */}
                      <td className="py-3 px-3 text-center">
                        <div className="space-y-1">
                          {hasExam ? (
                            isPassed ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Lulus Passing Grade
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                <AlertCircle className="w-3 h-3 text-amber-700" />
                                Perlu Bimbingan
                              </span>
                            )
                          ) : (
                            <span className="text-[10px] text-neutral-400">Menunggu Ujian</span>
                          )}

                          <div className="text-[10px] text-[#756F68] flex items-center justify-center gap-1">
                            <span>Kuota: {attempts}/2</span>
                            {attempts >= 2 && (
                              <button
                                type="button"
                                onClick={() => onResetQuota(p)}
                                className="p-0.5 rounded text-purple-700 hover:text-purple-900"
                                title="Reset kuota simulasi peserta"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Waktu Selesai */}
                      <td className="py-3 px-3 text-center text-[11px] text-[#756F68]">
                        {p.simulatedExam?.completedAt ? (
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-neutral-800">
                              {new Date(p.simulatedExam.completedAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {new Date(p.simulatedExam.completedAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })} WIB
                            </span>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>

                      {/* Aksi Follow-Up WhatsApp */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <a
                            href={generateFollowUpWhatsAppUrl(p, 'simulasi')}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[10px] font-bold flex items-center gap-1 transition-colors"
                            title="Kirim pesan follow-up hasil simulasi via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Kirim WA</span>
                          </a>

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
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600" />
                Mode Ringan
              </span>
              <span>
                Menampilkan baris ke-<strong>{(validPage - 1) * PAGE_SIZE + 1}</strong> s/d <strong>{(validPage - 1) * PAGE_SIZE + displayedData.length}</strong> dari <strong>{filteredData.length}</strong> peserta simulasi
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
