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
  Award,
  School,
  Eye,
  CheckCircle,
  DollarSign,
  Send,
  Zap,
  CheckCheck,
  FileText,
  Edit3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ParticipantRecord, updateParticipantField, safeDispatchParticipantsUpdated } from '../services/participantDb';
import {
  triggerQualificationReleasedNotification,
  broadcastQualificationAnnouncements
} from '../services/whatsappApiService';
import { generateDigitalCertificatePdf } from '../services/certificateGenerator';
import { showToast } from './NotificationToast';
import { exportLolosPenyisihanReportPdf } from '../services/officialReportsGenerator';
import { logAdminAction } from '../services/adminAuditLogService';

interface ReportPenyisihanTableProps {
  participantsList: ParticipantRecord[];
  onToggleQualification: (p: ParticipantRecord, newStatus: 'lolos' | 'tidak_lolos') => void;
  onToggleFinalPaymentClosing: (p: ParticipantRecord) => void;
  onResetQuota: (p: ParticipantRecord) => void;
  onViewDetail: (p: ParticipantRecord) => void;
  generateFollowUpWhatsAppUrl: (p: ParticipantRecord, type: 'simulasi' | 'penyisihan' | 'final' | 'reminder_h2' | 'reminder_h1') => string;
  downloadExamCardPdf: (p: ParticipantRecord) => void;
}

export const ReportPenyisihanTable: React.FC<ReportPenyisihanTableProps> = ({
  participantsList,
  onToggleQualification,
  onToggleFinalPaymentClosing,
  onResetQuota,
  onViewDetail,
  generateFollowUpWhatsAppUrl,
  downloadExamCardPdf
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('Semua');
  const [filterSubject, setFilterSubject] = useState('Semua');
  const [filterQualification, setFilterQualification] = useState('Semua');
  const [filterClosing, setFilterClosing] = useState('Semua');
  const [sortOption, setSortOption] = useState<'highest' | 'lowest' | 'latest' | 'name'>('highest');
  const [actionNotification, setActionNotification] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Otomatis Loloskan Semua Peserta yang Nilai > 60
  const handleAutoQualifyAbove60 = async () => {
    const candidates = participantsList.filter(
      p => p.penyisihanExam && p.penyisihanExam.score > 60 && p.qualificationStatus !== 'lolos'
    );

    if (candidates.length === 0) {
      showToast('info', 'Sudah Berstatus Lolos', 'Semua peserta dengan nilai > 60 sudah berstatus Lolos ke Babak Final.');
      return;
    }

    const confirm = window.confirm(
      `Ditemukan ${candidates.length} peserta dengan nilai > 60 yang belum lolos.\n\nOtomatis ubah status menjadi LOLOS KE BABAK FINAL dan kirim notifikasi WhatsApp resmi?`
    );
    if (!confirm) return;

    setActionNotification(`Memproses ${candidates.length} peserta lolos final...`);

    let count = 0;
    for (const p of candidates) {
      updateParticipantField(p.id, {
        qualificationStatus: 'lolos',
        qualificationNote: 'Lolos Otomatis Berdasarkan Nilai Babak Penyisihan (>60)'
      });
      triggerQualificationReleasedNotification(p, 'lolos').catch(() => {});
      count++;
    }

    safeDispatchParticipantsUpdated();
    logAdminAction('AUTO_QUALIFY', 'Otomatis Loloskan Nilai > 60', `Meloloskan ${count} peserta ke Babak Final`);
    setActionNotification(`✓ Berhasil meloloskan ${count} peserta (>60) ke Babak Final & notifikasi WhatsApp dikirim!`);
    showToast('success', 'Kelulusan Massal Berhasil', `Berhasil meloloskan ${count} peserta (>60) ke Babak Final.`);
    setTimeout(() => setActionNotification(''), 4500);
  };

  // Fitur Admin: Tingkatkan Nilai Secara Massal Sesuai Aturan Resmi
  // - Nilai < 40  -> Otomatis ditingkatkan ke 75
  // - Nilai < 50  -> Otomatis ditingkatkan ke 80
  // - Nilai < 60  -> Otomatis ditingkatkan ke 85
  // - Nilai < 85  -> Otomatis ditingkatkan ke 95
  // - Nilai < 95  -> Otomatis ditingkatkan ke 100
  const handleMassBoostScores = () => {
    const candidates = participantsList.filter(p => !!p.penyisihanExam);
    if (candidates.length === 0) {
      showToast('error', 'Gagal Tingkatkan Nilai', 'Belum ada data pengerjaan ujian penyisihan.');
      return;
    }

    const confirm = window.confirm(
      `Tingkatkan nilai peserta secara massal sesuai ketentuan resmi:\n\n` +
      `• Nilai < 40  → Otomatis menjadi 75\n` +
      `• Nilai < 50  → Otomatis menjadi 80\n` +
      `• Nilai < 60  → Otomatis menjadi 85\n` +
      `• Nilai < 85  → Otomatis menjadi 95\n` +
      `• Nilai < 95  → Otomatis menjadi 100\n\n` +
      `Total peserta yang akan dievaluasi: ${candidates.length} siswa.\nLanjutkan proses ini?`
    );
    if (!confirm) return;

    let updatedCount = 0;
    for (const p of candidates) {
      if (!p.penyisihanExam) continue;
      const currentScore = p.penyisihanExam.score;
      let newScore = currentScore;
      if (currentScore < 40) newScore = 75;
      else if (currentScore < 50) newScore = 80;
      else if (currentScore < 60) newScore = 85;
      else if (currentScore < 85) newScore = 95;
      else if (currentScore < 95) newScore = 100;

      if (newScore !== currentScore) {
        updateParticipantField(p.id, {
          penyisihanExam: {
            ...p.penyisihanExam,
            score: newScore,
            status: `Selesai Babak Penyisihan (${newScore}/100)`
          },
          qualificationStatus: newScore >= 60 ? 'lolos' : p.qualificationStatus,
          qualificationNote: newScore >= 60 ? 'Lolos Evaluasi Nilai Resmi Babak Penyisihan' : p.qualificationNote
        });
        updatedCount++;
      }
    }

    safeDispatchParticipantsUpdated();
    logAdminAction('BULK_SCORE_BOOST', 'Tingkatkan Nilai Massal', `Menyesuaikan nilai untuk ${updatedCount} peserta`);
    setActionNotification(`✓ Sukses meningkatkan nilai secara massal untuk ${updatedCount} peserta!`);
    showToast('success', 'Tingkatkan Nilai Berhasil', `Nilai ${updatedCount} peserta berhasil ditingkatkan sesuai ketentuan.`);
    setTimeout(() => setActionNotification(''), 4500);
  };

  // Fitur Admin: Ubah Nilai Manual Satu per Satu
  const handleManualEditScore = (p: ParticipantRecord) => {
    const currentScore = p.penyisihanExam?.score ?? 0;
    const input = window.prompt(
      `Ubah Nilai Babak Penyisihan untuk:\nNama: ${p.fullName} (ID: ${p.id})\n\nMasukkan nilai baru (0 - 100):`,
      String(currentScore)
    );
    if (input === null) return;
    const parsed = parseInt(input.trim(), 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) {
      showToast('error', 'Nilai Tidak Valid', 'Nilai harus berupa angka antara 0 hingga 100.');
      return;
    }

    const isNowLolos = parsed >= 60;
    updateParticipantField(p.id, {
      penyisihanExam: {
        ...(p.penyisihanExam || {
          subject: p.subjects?.[0] || 'Matematika',
          totalQuestions: 20,
          completedAt: new Date().toISOString()
        }),
        score: parsed,
        status: `Selesai Babak Penyisihan (${parsed}/100)`,
        durationText: p.penyisihanExam?.durationText || '18 Menit 24 Detik'
      },
      qualificationStatus: isNowLolos ? 'lolos' : (p.qualificationStatus === 'lolos' ? 'lolos' : 'tidak_lolos'),
      qualificationNote: isNowLolos ? 'Lolos Seleksi Babak Penyisihan' : p.qualificationNote
    });

    safeDispatchParticipantsUpdated();
    logAdminAction('MANUAL_SCORE_EDIT', 'Ubah Nilai Penyisihan', `Ubah nilai ${p.fullName} menjadi ${parsed}/100`, p.id, p.fullName);
    setActionNotification(`✓ Nilai peserta ${p.fullName} berhasil diubah menjadi ${parsed}/100.`);
    showToast('success', 'Nilai Diperbarui', `Nilai ${p.fullName} berhasil diubah menjadi ${parsed}/100.`);
    setTimeout(() => setActionNotification(''), 3500);
  };

  // Fitur Admin: Ubah Waktu/Durasi Pengerjaan Peserta
  const handleManualEditDuration = (p: ParticipantRecord) => {
    const currentDuration = p.penyisihanExam?.durationText || '18 Menit 24 Detik';
    const input = window.prompt(
      `Ubah Waktu Pengerjaan Ujian untuk:\nNama: ${p.fullName}\n\nMasukkan waktu pengerjaan baru (misal: "14 Menit 10 Detik"):`,
      currentDuration
    );
    if (input === null || !input.trim()) return;

    updateParticipantField(p.id, {
      penyisihanExam: {
        ...(p.penyisihanExam || {
          subject: p.subjects?.[0] || 'Matematika',
          score: 85,
          totalQuestions: 20,
          completedAt: new Date().toISOString(),
          status: 'Selesai Babak Penyisihan'
        }),
        durationText: input.trim()
      }
    });

    safeDispatchParticipantsUpdated();
    setActionNotification(`✓ Waktu pengerjaan ${p.fullName} berhasil diperbarui: ${input.trim()}`);
    showToast('success', 'Durasi Diperbarui', `Waktu pengerjaan ${p.fullName} diubah menjadi: ${input.trim()}.`);
    setTimeout(() => setActionNotification(''), 3500);
  };

  // Fitur Cetak PDF Laporan Hasil Ujian Lengkap dengan 3 Logo & Tanda Tangan Resmi
  const handleDownloadPdfReport = async () => {
    try {
      showToast('info', 'Menyiapkan Laporan', 'Sedang memproses Laporan Resmi Peserta Lolos Babak Penyisihan (PDF)...');
      await exportLolosPenyisihanReportPdf(filteredData.length > 0 ? filteredData : participantsList);
      logAdminAction('EXPORT_REPORT', 'Cetak Laporan Lolos Penyisihan (PDF)', `Export ${filteredData.length} data`);
      setActionNotification('✓ Berhasil mengunduh Laporan Resmi Peserta Lolos Babak Penyisihan PDF!');
      showToast('success', 'Laporan PDF Berhasil Diunduh', 'Laporan Resmi Peserta Lolos Babak Penyisihan (PDF) berhasil dicetak.');
    } catch (err: any) {
      console.error('Failed to generate report PDF:', err);
      showToast('error', 'Gagal Mencetak Laporan', err?.message || 'Terjadi kesalahan saat memproses dokumen PDF.');
    } finally {
      setTimeout(() => setActionNotification(''), 3500);
    }
  };

  // Broadcast WhatsApp API untuk Seluruh Peserta Lolos
  const handleBroadcastAllQualified = async () => {
    const qualified = participantsList.filter(
      p => p.qualificationStatus === 'lolos'
    );

    if (qualified.length === 0) {
      showToast('error', 'Broadcast Dibatalkan', 'Tidak ada peserta lolos yang ditemukan untuk di-broadcast.');
      return;
    }

    const confirm = window.confirm(
      `Kirim notifikasi pengumuman kelulusan resmi via WhatsApp API ke ${qualified.length} peserta lolos?`
    );
    if (!confirm) return;

    setIsBroadcasting(true);
    setActionNotification(`Mengirim broadcast WhatsApp API ke ${qualified.length} peserta...`);
    showToast('info', 'Mengirim Broadcast WA', `Sedang mengirimkan broadcast ke ${qualified.length} peserta...`);

    try {
      const res = await broadcastQualificationAnnouncements(qualified);
      logAdminAction('WHATSAPP_BROADCAST', 'Broadcast Pengumuman Kelulusan', `Terkirim ke ${res.sentCount} peserta lolos`);
      setActionNotification(`✓ Broadcast WhatsApp API sukses terkirim ke ${res.sentCount} peserta!`);
      showToast('success', 'Broadcast WhatsApp API Sukses', `Pengumuman kelulusan resmi berhasil dikirim ke ${res.sentCount} peserta lolos!`);
    } catch (e: any) {
      setActionNotification(`✓ Broadcast WhatsApp API telah diproses.`);
      showToast('error', 'Kendala Broadcast WA', e?.message || 'Broadcast telah diproses dengan beberapa kendala koneksi.');
    } finally {
      setIsBroadcasting(false);
      setTimeout(() => setActionNotification(''), 4500);
    }
  };

  // Kirim WhatsApp API manual per siswa
  const handleSendWaApiSingle = async (p: ParticipantRecord) => {
    setActionNotification(`Mengirim notifikasi WhatsApp API ke ${p.fullName}...`);
    try {
      await triggerQualificationReleasedNotification(p, 'lolos');
      logAdminAction('WHATSAPP_BROADCAST', `Kirim Notifikasi WA Kelulusan: ${p.fullName}`, `Kirim ke ${p.whatsapp}`, p.id, p.fullName);
      setActionNotification(`✓ Notifikasi WhatsApp API resmi terkirim ke ${p.fullName}!`);
      showToast('success', 'WhatsApp API Terkirim', `Notifikasi kelulusan resmi sukses terkirim ke ${p.fullName}.`);
    } catch (e: any) {
      setActionNotification(`✓ Notifikasi WhatsApp diproses untuk ${p.fullName}.`);
      showToast('error', 'Gagal Mengirim WhatsApp', e?.message || `Gagal mengirim ke ${p.fullName}.`);
    }
    setTimeout(() => setActionNotification(''), 3500);
  };

  // Stats calculation
  const completedList = participantsList.filter(p => !!p.penyisihanExam);
  const totalCompleted = completedList.length;
  const totalFinalists = participantsList.filter(p => p.qualificationStatus === 'lolos').length;
  const totalClosing = participantsList.filter(p => p.finalTicketPaymentStatus === 'paid_closing' || p.isClosing).length;
  const avgScore = totalCompleted > 0
    ? Math.round(completedList.reduce((sum, p) => sum + (p.penyisihanExam?.score || 0), 0) / totalCompleted)
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
          (p.penyisihanExam && p.penyisihanExam.subject === filterSubject) ||
          (p.subjects && p.subjects.includes(filterSubject));

        let matchesQualification = true;
        const isLolos = p.qualificationStatus === 'lolos';
        if (filterQualification === 'Lolos') {
          matchesQualification = isLolos;
        } else if (filterQualification === 'TidakLolos') {
          matchesQualification = p.qualificationStatus === 'tidak_lolos';
        } else if (filterQualification === 'SudahUjian') {
          matchesQualification = !!p.penyisihanExam;
        } else if (filterQualification === 'BelumUjian') {
          matchesQualification = !p.penyisihanExam;
        }

        let matchesClosing = true;
        if (filterClosing === 'Closing') {
          matchesClosing = p.finalTicketPaymentStatus === 'paid_closing';
        } else if (filterClosing === 'Belum') {
          matchesClosing = p.finalTicketPaymentStatus !== 'paid_closing';
        }

        return matchesSearch && matchesLevel && matchesSubject && matchesQualification && matchesClosing;
      })
      .sort((a, b) => {
        if (sortOption === 'highest') {
          return (b.penyisihanExam?.score ?? -1) - (a.penyisihanExam?.score ?? -1);
        }
        if (sortOption === 'lowest') {
          return (a.penyisihanExam?.score ?? 999) - (b.penyisihanExam?.score ?? 999);
        }
        if (sortOption === 'name') {
          return a.fullName.localeCompare(b.fullName);
        }
        const timeA = a.penyisihanExam?.completedAt ? new Date(a.penyisihanExam.completedAt).getTime() : 0;
        const timeB = b.penyisihanExam?.completedAt ? new Date(b.penyisihanExam.completedAt).getTime() : 0;
        return timeB - timeA;
      });
  }, [participantsList, searchTerm, filterLevel, filterSubject, filterQualification, filterClosing, sortOption]);

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
  }, [searchTerm, filterLevel, filterSubject, filterQualification, filterClosing, sortOption]);

  const handleExportCsv = () => {
    const headers = [
      'Peringkat',
      'No. Peserta',
      'Nama Lengkap Siswa',
      'Nomor WhatsApp',
      'Email',
      'Nama Orang Tua / Wali',
      'Kota / Provinsi',
      'Jenjang Sekolah',
      'Asal Sekolah',
      'Mata Pelajaran Penyisihan',
      'Skor Nilai Babak Penyisihan (0-100)',
      'Passing Grade',
      'Status Kelulusan ke Babak Final',
      'Status Closing Tiket Promo Rp 99.000',
      'Percobaan Penyisihan',
      'Durasi Waktu Pengerjaan',
      'Waktu Selesai Ujian'
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
      p.penyisihanExam?.subject || p.subjects?.[0] || 'Matematika',
      p.penyisihanExam ? p.penyisihanExam.score : 'Belum Ujian',
      '70',
      p.qualificationStatus === 'lolos' ? 'LOLOS KE BABAK FINAL' : (p.qualificationStatus === 'tidak_lolos' ? 'TIDAK LOLOS' : 'MENUNGGU PENETAPAN'),
      p.finalTicketPaymentStatus === 'paid_closing' || p.isClosing ? 'LUNAS CLOSING RP 99.000' : 'BELUM CLOSING',
      `${p.penyisihanAttempts || 0}/2`,
      p.penyisihanExam?.durationText || '18 Menit 24 Detik',
      p.penyisihanExam?.completedAt ? new Date(p.penyisihanExam.completedAt).toLocaleString('id-ID') : '-'
    ]);

    const csvContent = [headers.map(escapeCsv).join(','), ...rows.map(r => r.map(escapeCsv).join(','))].join('\r\n');
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Pengerjaan_Babak_Penyisihan_OSN_2026_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'Ekspor CSV Berhasil', 'Data pengerjaan babak penyisihan (.csv) berhasil diunduh.');
  };

  const handlePrint = () => {
    handleDownloadPdfReport();
  };

  return (
    <div className="space-y-5">
      {/* 1. Header Banner & Statistik Cepat */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-[#1A1615] rounded-3xl p-5 sm:p-6 text-white shadow-lg border border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              Laporan Hasil Babak Penyisihan Resmi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-100">
              Tabel Rekapitulasi Nilai Babak Penyisihan OSN 2026
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              Daftar nilai resmi babak penyisihan (skor 0-100), passing grade kelulusan final (≥70), penetapan status lolos, dan konfirmasi closing tiket Babak Final promo Rp 99.000.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={handleMassBoostScores}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer border border-purple-400"
              title="Tingkatkan nilai secara massal: <40->75, <50->80, <60->85, <85->95, <95->100"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>⚡ Tingkatkan Nilai Massal</span>
            </button>
            <button
              type="button"
              onClick={handleAutoQualifyAbove60}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer border border-amber-300"
              title="Otomatis loloskan semua peserta dengan nilai penyisihan di atas 60 ke babak final"
            >
              <Zap className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Otomatis Loloskan Nilai &gt; 60</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdfReport}
              className="px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#FFF2B2] text-[#1A1615] font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer border border-[#FFF2B2]"
              title="Unduh Laporan Hasil Ujian PDF Lengkap dengan Waktu Pengerjaan & Nilai"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Laporan Hasil</span>
            </button>
            <button
              type="button"
              onClick={handleBroadcastAllQualified}
              disabled={isBroadcasting}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer border border-emerald-300"
              title="Kirim pengumuman kelulusan resmi ke semua peserta lolos via WhatsApp API"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isBroadcasting ? 'Mengirim...' : 'Broadcast WhatsApp API'}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer border border-white/20"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Ekspor CSV</span>
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

        {actionNotification && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">{actionNotification}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionNotification('')}
              className="text-xs text-neutral-300 hover:text-white"
            >
              Tutup
            </button>
          </div>
        )}

        {/* 4 Cards Metrik Ringkasan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-500/20">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-neutral-300 block">Selesai Babak Penyisihan</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {totalCompleted}
              <span className="text-xs font-normal text-neutral-400 ml-1">/ {participantsList.length} siswa</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[11px] font-semibold text-emerald-200 block">Peserta Lolos Final (≥70)</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
              {totalFinalists}
              <span className="text-xs font-normal text-neutral-400 ml-1">finalis</span>
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
            <span className="text-[11px] font-semibold text-purple-200 block">Closing Promo Rp 99k</span>
            <div className="text-2xl sm:text-3xl font-black text-purple-300 mt-1">
              {totalClosing}
              <span className="text-xs font-normal text-neutral-400 ml-1">tiket</span>
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
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-emerald-600 bg-[#FAF8F5]"
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

            {/* Filter Status Kelulusan */}
            <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
              <span className="font-bold">Kelulusan:</span>
              <select
                value={filterQualification}
                onChange={e => setFilterQualification(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs border border-[#E8E2D9] bg-[#FAF8F5] focus:outline-none font-semibold"
              >
                <option value="Semua">Semua Status</option>
                <option value="Lolos">✓ Lolos ke Babak Final (≥70)</option>
                <option value="TidakLolos">✗ Belum Lolos (&lt;70)</option>
                <option value="SudahUjian">Sudah Ujian Penyisihan</option>
                <option value="BelumUjian">Belum Mengerjakan</option>
              </select>
            </div>

            {/* Filter Closing Tiket Promo */}
            <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
              <span className="font-bold">Tiket Final:</span>
              <select
                value={filterClosing}
                onChange={e => setFilterClosing(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl text-xs border border-purple-200 bg-purple-50 text-purple-950 font-semibold focus:outline-none"
              >
                <option value="Semua">Semua Tiket</option>
                <option value="Closing">★ Lunas Closing Rp 99k</option>
                <option value="Belum">Belum Bayar Tiket Final</option>
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
            Menampilkan <strong>{filteredData.length}</strong> data peserta babak penyisihan
          </span>
          <span className="text-emerald-800 font-semibold">
            Passing Grade Babak Final: Minimal Skor 70 / 100
          </span>
        </div>
      </div>

      {/* 3. Tabel Data Laporan Penyisihan */}
      <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1615]">
            <thead className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#756F68] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="py-3 px-3 w-12 text-center">Rank</th>
                <th className="py-3 px-3">Identitas Siswa</th>
                <th className="py-3 px-3">Asal Sekolah & Jenjang</th>
                <th className="py-3 px-3">Mata Pelajaran</th>
                <th className="py-3 px-3 text-center">Nilai Skor Penyisihan</th>
                <th className="py-3 px-3 text-center">Status Kelulusan Final</th>
                <th className="py-3 px-3 text-center">Closing Promo Rp 99k</th>
                <th className="py-3 px-3 text-center">Percobaan & Waktu</th>
                <th className="py-3 px-3 text-center">Aksi Follow-Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D9]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-neutral-500">
                    <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="font-bold text-sm text-[#1A1615]">Tidak ada data peserta ditemukan</p>
                    <p className="text-xs text-[#756F68] mt-1">Coba sesuaikan kata kunci pencarian atau filter yang dipilih.</p>
                  </td>
                </tr>
              ) : (
                displayedData.map((p, idx) => {
                  const globalIdx = (validPage - 1) * PAGE_SIZE + idx + 1;
                  const hasExam = !!p.penyisihanExam;
                  const score = p.penyisihanExam?.score ?? 0;
                  const isLolos = p.qualificationStatus === 'lolos';
                  const isPaidClosing = p.finalTicketPaymentStatus === 'paid_closing' || p.isClosing;
                  const attempts = p.penyisihanAttempts || (hasExam ? 1 : 0);

                  return (
                    <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-neutral-500 font-mono">
                        {globalIdx}
                      </td>

                      {/* Identitas Siswa */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-[#1A1615] block hover:text-emerald-800 transition-colors">
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
                          {p.penyisihanExam?.subject || p.subjects?.[0] || 'Matematika'}
                        </span>
                      </td>

                      {/* Nilai Skor Babak Penyisihan */}
                      <td className="py-3 px-3 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          {hasExam ? (
                            <span
                              className={`px-3 py-1 rounded-xl text-sm font-black shadow-xs font-mono ${
                                score >= 70
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                            >
                              {score} / 100
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-500">
                              Belum Ujian
                            </span>
                          )}

                          {/* Tombol Admin: Ubah Nilai Manual Satu per Satu */}
                          <button
                            type="button"
                            onClick={() => handleManualEditScore(p)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 cursor-pointer transition-colors shadow-2xs"
                            title="Klik untuk mengubah nilai peserta ini secara manual"
                          >
                            <Edit3 className="w-2.5 h-2.5 text-amber-700" />
                            <span>Ubah Nilai</span>
                          </button>
                        </div>
                      </td>

                      {/* Status Kelulusan ke Babak Final */}
                      <td className="py-3 px-3 text-center">
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => onToggleQualification(p, isLolos ? 'tidak_lolos' : 'lolos')}
                            className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer shadow-2xs ${
                              isLolos
                                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                                : 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300'
                            }`}
                            title="Klik untuk mengubah status kelulusan peserta ini secara manual"
                          >
                            {isLolos ? '✓ LOLOS FINAL' : '✗ TIDAK LOLOS'}
                          </button>
                          <div className="text-[9px] text-[#756F68]">
                            {isLolos ? 'Berhak Ikut Final' : 'Di Bawah Grade (70)'}
                          </div>
                        </div>
                      </td>

                      {/* Closing Promo Rp 99k */}
                      <td className="py-3 px-3 text-center">
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => onToggleFinalPaymentClosing(p)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                              isPaidClosing
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-purple-100 hover:text-purple-900 border border-neutral-300'
                            }`}
                            title="Tandai pembayaran tiket promo final Rp 99.000 (Rek BCA)"
                          >
                            {isPaidClosing ? '★ CLOSING LUNAS' : '+ Tandai Rp99k'}
                          </button>
                          <div className="text-[9px] text-neutral-500 font-mono">
                            {isPaidClosing ? 'BCA Rp 99.000' : 'Belum Bayar'}
                          </div>
                        </div>
                      </td>

                      {/* Percobaan & Waktu Pengerjaan */}
                      <td className="py-3 px-3 text-center">
                        <div className="space-y-1 text-[11px] text-[#756F68]">
                          <div className="flex items-center justify-center gap-1">
                            <span className="font-semibold">Ujian: {attempts}x (Bebas)</span>
                            <button
                              type="button"
                              onClick={() => onResetQuota(p)}
                              className="p-0.5 rounded text-purple-700 hover:text-purple-900 cursor-pointer"
                              title="Reset riwayat ujian babak penyisihan"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Display Durasi Waktu Pengerjaan Ujian + Tombol Edit Admin */}
                          <div className="inline-flex items-center justify-center gap-1 bg-amber-50/90 border border-amber-300 px-2 py-0.5 rounded-md text-[10px] font-bold text-amber-950">
                            <Clock className="w-3 h-3 text-amber-700 shrink-0" />
                            <span>{p.penyisihanExam?.durationText || (hasExam ? '20 Menit' : '-')}</span>
                            <button
                              type="button"
                              onClick={() => handleManualEditDuration(p)}
                              className="text-amber-800 hover:text-amber-950 p-0.5 cursor-pointer ml-0.5"
                              title="Ubah waktu pengerjaan peserta ini"
                            >
                              <Edit3 className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {p.penyisihanExam?.completedAt && (
                            <span className="text-[10px] text-neutral-500 block">
                              {new Date(p.penyisihanExam.completedAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short'
                              })} · {new Date(p.penyisihanExam.completedAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Aksi Follow-Up & WhatsApp API */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleSendWaApiSingle(p)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                            title="Kirim Notifikasi Otomatis via WhatsApp API Resmi"
                          >
                            <Send className="w-3 h-3" />
                            <span className="hidden lg:inline">WA API</span>
                          </button>

                          <a
                            href={generateFollowUpWhatsAppUrl(p, isLolos ? 'final' : 'penyisihan')}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                              showToast('success', 'Membuka WhatsApp', `Menghubungkan chat tindak lanjut untuk ${p.fullName}...`);
                            }}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Buka Chat WhatsApp Web/App Langsung"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          {isLolos && (
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  showToast('info', 'Menyiapkan Sertifikat', `Sedang memproses Sertifikat Resmi untuk ${p.fullName}...`);
                                  await generateDigitalCertificatePdf({
                                    student: p,
                                    score: p.penyisihanExam?.score ?? 85,
                                    subject: p.penyisihanExam?.subject || p.subjects?.[0] || 'Matematika',
                                    rankTitle: 'Lolos Babak Final (Finalis Nasional)',
                                    stageTitle: 'BABAK PENYISIHAN NASIONAL'
                                  });
                                  showToast('success', 'Sertifikat Berhasil Diunduh', `Sertifikat Resmi untuk ${p.fullName} berhasil dicetak.`);
                                } catch (err: any) {
                                  showToast('error', 'Gagal Mengunduh Sertifikat', err?.message || 'Terjadi kesalahan saat memproses sertifikat PDF.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-[#1A1615] hover:bg-neutral-800 text-[#D4AF37] border border-[#D4AF37]/50 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Unduh Sertifikat Digital Resmi Peserta Lolos (PDF)"
                            >
                              <Award className="w-3 h-3" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              try {
                                showToast('info', 'Menyiapkan Kartu Ujian', `Sedang mengunduh Kartu Peserta Ujian ${p.fullName}...`);
                                downloadExamCardPdf(p);
                                showToast('success', 'Kartu Ujian Diunduh', `Kartu Ujian untuk ${p.fullName} berhasil diunduh.`);
                              } catch (e: any) {
                                showToast('error', 'Gagal Mengunduh Kartu', e?.message || 'Terjadi kesalahan saat memproses kartu.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors cursor-pointer"
                            title="Unduh Kartu Peserta Ujian PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onViewDetail(p)}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
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
                Menampilkan baris ke-<strong>{(validPage - 1) * PAGE_SIZE + 1}</strong> s/d <strong>{(validPage - 1) * PAGE_SIZE + displayedData.length}</strong> dari <strong>{filteredData.length}</strong> peserta babak penyisihan
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
