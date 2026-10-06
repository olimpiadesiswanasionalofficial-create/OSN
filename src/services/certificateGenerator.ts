import { jsPDF } from 'jspdf';
import { ParticipantRecord } from './participantDb';
import { APP_CONFIG } from '../../appConfig.js';

export interface CertificateOptions {
  student: ParticipantRecord;
  rankTitle?: string; // 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Peserta Final' | 'Lolos Babak Final'
  subject?: string;
  executionDate?: string;
  stageTitle?: string;
  score?: number;
}

export function generateDigitalCertificatePdf(options: CertificateOptions): void {
  const { student } = options;
  
  // Resolve exam score: prioritize explicit score, or finalExam, or penyisihanExam, or default
  const resolvedScore = options.score !== undefined
    ? options.score
    : student.finalExam?.score !== undefined
    ? student.finalExam.score
    : student.penyisihanExam?.score !== undefined
    ? student.penyisihanExam.score
    : student.simulatedExam?.score !== undefined
    ? student.simulatedExam.score
    : 85;

  // Determine stage title & certificate number
  const isFinalStage = !!student.finalExam || (options.stageTitle && options.stageTitle.toLowerCase().includes('final'));
  const stage = options.stageTitle || (isFinalStage ? 'BABAK FINAL NASIONAL' : 'BABAK PENYISIHAN NASIONAL');
  
  let defaultRank = 'Peserta Lolos Seleksi';
  if (student.championRank && student.championRank !== 'Belum Dinilai') {
    defaultRank = student.championRank;
  } else if (student.qualificationStatus === 'lolos') {
    defaultRank = 'Lolos Babak Final (Finalis Nasional)';
  } else if (resolvedScore >= 90) {
    defaultRank = 'Sangat Memuaskan (Cum Laude)';
  } else if (resolvedScore >= 75) {
    defaultRank = 'Lulus Seleksi Prestasi Nasional';
  }

  const rank = options.rankTitle || defaultRank;
  const subject = options.subject || (student.subjects && student.subjects.length > 0 ? student.subjects[0] : 'Matematika & Sains');
  const executionDate = options.executionDate || '20 September 2026';

  // Determine score predicate
  let predicate = 'Sangat Baik';
  let gradeLetter = 'A';
  if (resolvedScore >= 90) {
    predicate = 'Sangat Memuaskan (Istimewa)';
    gradeLetter = 'A+';
  } else if (resolvedScore >= 80) {
    predicate = 'Sangat Baik (Memuaskan)';
    gradeLetter = 'A';
  } else if (resolvedScore >= 70) {
    predicate = 'Baik (Lulus Kriteria)';
    gradeLetter = 'B+';
  } else if (resolvedScore >= 60) {
    predicate = 'Cukup (Lulus Seleksi)';
    gradeLetter = 'B';
  }

  // Landscape A4 (297mm x 210mm)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = 297;
  const height = 210;

  // 1. Background Fill - Luxury Cream / Ivory Parchment
  doc.setFillColor(254, 252, 247);
  doc.rect(0, 0, width, height, 'F');

  // Subtle Watermark background tint
  doc.setFillColor(250, 246, 235);
  doc.roundedRect(16, 16, width - 32, height - 32, 6, 6, 'F');

  // 2. Outer Luxury Gold Double Border
  doc.setDrawColor(212, 175, 55); // Rich Gold #D4AF37
  doc.setLineWidth(2.8);
  doc.rect(8, 8, width - 16, height - 16, 'D');

  doc.setDrawColor(180, 140, 30);
  doc.setLineWidth(0.7);
  doc.rect(12, 12, width - 24, height - 24, 'D');

  // Ornamental corner accents
  const corners = [
    [12, 12],
    [width - 12, 12],
    [12, height - 12],
    [width - 12, height - 12]
  ];
  doc.setFillColor(212, 175, 55);
  corners.forEach(([cx, cy]) => {
    doc.circle(cx, cy, 2.5, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(cx, cy, 1, 'F');
    doc.setFillColor(212, 175, 55);
  });

  // Top Crest / Organization Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(150, 110, 25);
  doc.text('LEMBAGA KURSUS DAN PELATIHAN PRESTASI NUSANTARA', width / 2, 23, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(117, 111, 104);
  doc.text('Izin Operasional Kemendikbudristek No. 421.9/234/LKP/2024 · Akreditasi BAN PAUD PNF & Kemenkumham', width / 2, 28, { align: 'center' });

  // Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(27);
  doc.setTextColor(26, 22, 21);
  doc.text('SERTIFIKAT PENGHARGAAN DIGITAL', width / 2, 42, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(180, 140, 30);
  doc.text(`${stage} - OLIMPIADE SISWA NASIONAL (OSN 2026)`, width / 2, 49, { align: 'center' });

  const certNumber = `OSN/${isFinalStage ? 'FNL' : 'PYS'}/2026/${student.id.replace(/[^0-9]/g, '').slice(-5) || '10882'}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text(`Nomor Sertifikat Resmi: ${certNumber}`, width / 2, 55, { align: 'center' });

  // Divider Line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.line(65, 58, width - 65, 58);

  // Recipient Intro
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(80, 75, 70);
  doc.text('Diberikan dengan bangga dan hormat kepada:', width / 2, 66, { align: 'center' });

  // Recipient Name - Big & Bold
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(26, 22, 21);
  doc.text(student.fullName.toUpperCase(), width / 2, 78, { align: 'center' });

  // Recipient School & Level
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(70, 65, 60);
  doc.text(`${student.schoolName} · ${student.level}`, width / 2, 85, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(117, 111, 104);
  doc.text(`Nomor Peserta: ${student.id} · Asal Wilayah: ${student.cityProvince || 'Indonesia'}`, width / 2, 90, { align: 'center' });

  // Achievement & Score Banner Box
  const bannerY = 96;
  const isChampion = rank.includes('Juara');
  doc.setFillColor(isChampion ? 254 : 255, isChampion ? 243 : 251, isChampion ? 199 : 235);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.roundedRect(36, bannerY, width - 72, 28, 4, 4, 'FD');

  // Title / Rank
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(isChampion ? 146 : 26, isChampion ? 64 : 22, isChampion ? 14 : 21);
  doc.text(`ATAS PRESTASI : ${rank.toUpperCase()}`, width / 2, bannerY + 8, { align: 'center' });

  // Integrated Score & Predicate Badges
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(150, 110, 25);
  doc.text(`Nilai Ujian Resmi: ${resolvedScore} / 100  (Grade ${gradeLetter} · ${predicate})`, width / 2, bannerY + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(80, 75, 70);
  doc.text(`Bidang Mata Pelajaran: ${subject} · Kategori: ${student.level.split('(')[0].trim()}`, width / 2, bannerY + 23, { align: 'center' });

  // Citation text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(70, 65, 60);
  doc.text(
    `Atas dedikasi, integritas akademik, dan penguasaan materi yang ditunjukkan pada pelaksanaan Computer Based Test (CBT)`,
    width / 2,
    130,
    { align: 'center' }
  );
  doc.text(
    `Olimpiade Siswa Nasional (OSN 2026) yang diselenggarakan dengan moto "Berani Mencoba Untuk Masa Depan Gemilang".`,
    width / 2,
    135,
    { align: 'center' }
  );

  // Execution Date & Signatures Section
  const footerY = 146;

  // Left Signature: Ketua Pelaksana OSN
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 85, 80);
  doc.text(`Ditetapkan di Jakarta, ${executionDate}`, 48, footerY);
  doc.text('Ketua Pelaksana OSN 2026', 48, footerY + 5);

  doc.setFont('times', 'italic');
  doc.setFontSize(12.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Dr. H. Hendra Gunawan, M.Si.', 48, footerY + 22);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(25, footerY + 24, 75, footerY + 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(110, 110, 110);
  doc.text('NIP. 19780512 200212 1 003', 48, footerY + 28);

  // Center: Official Gold Seal & QR Verification Code Badge
  doc.setFillColor(212, 175, 55);
  doc.circle(width / 2, footerY + 12, 12, 'F');
  doc.setFillColor(255, 248, 220);
  doc.circle(width / 2, footerY + 12, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(150, 100, 20);
  doc.text('OSN 2026', width / 2, footerY + 11, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('VERIFIED', width / 2, footerY + 15, { align: 'center' });

  // Verification note below seal
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(120, 115, 110);
  doc.text(`[QR-VERIFY: https://olimpiadesiswanasional.id/verify/${student.id}]`, width / 2, footerY + 29, { align: 'center' });

  // Right Signature: Direktur LKP Prestasi Nusantara
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 85, 80);
  doc.text('Mengetahui & Mengesahkan,', width - 48, footerY);
  doc.text('Direktur LKP Prestasi Nusantara', width - 48, footerY + 5);

  doc.setFont('times', 'italic');
  doc.setFontSize(12.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Hj. Siti Nur Asia, S.Pd., M.M.', width - 48, footerY + 22);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(width - 75, footerY + 24, width - 25, footerY + 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(110, 110, 110);
  doc.text('Reg. LKP. 021/PN/DIKNAS/2024', width - 48, footerY + 28);

  // Save the PDF
  const filename = `Sertifikat_Digital_OSN_2026_${rank.replace(/[^a-zA-Z0-9]/g, '_')}_${student.fullName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(filename);
}

// Backward-compatible alias for existing callers
export function generateFinalCertificatePdf(options: CertificateOptions): void {
  generateDigitalCertificatePdf({
    ...options,
    stageTitle: options.stageTitle || 'BABAK FINAL NASIONAL'
  });
}
