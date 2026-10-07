import { jsPDF } from 'jspdf';
import { ParticipantRecord } from './participantDb';
import { APP_CONFIG } from '../../appConfig.js';
import { getOfficialLogosForPdf } from './pdfLogosHelper';

export interface CertificateOptions {
  student: ParticipantRecord;
  rankTitle?: string; // 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Peserta Final' | 'Lolos Babak Final'
  subject?: string;
  executionDate?: string;
  stageTitle?: string;
  score?: number;
}

export async function generateDigitalCertificatePdf(options: CertificateOptions): Promise<void> {
  const { student } = options;
  
  // Ambil 3 logo resmi asli tanpa mengubah desain, model, warna, atau proporsi
  const logos = await getOfficialLogosForPdf();

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

  // ==========================================
  // 3. LOGO RESMI 1 & 2 PADA BAGIAN ATAS
  // ==========================================
  // Logo 1: LOGO RESMI OSN (Kiri Atas)
  if (logos.logoOsn) {
    try {
      doc.addImage(logos.logoOsn, 'PNG', 16, 14, 24, 24);
    } catch (e) {
      console.warn('Gagal menambahkan logo OSN ke sertifikat:', e);
    }
  }

  // Logo 2: LOGO RESMI LKP PRESTASI NUSANTARA (Kanan Atas)
  if (logos.logoLkp) {
    try {
      doc.addImage(logos.logoLkp, 'PNG', width - 40, 14, 22, 25);
    } catch (e) {
      console.warn('Gagal menambahkan logo LKP ke sertifikat:', e);
    }
  }

  // Top Crest / Organization Header Text (Tengah)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(150, 110, 25);
  doc.text('LEMBAGA KURSUS DAN PELATIHAN PRESTASI NUSANTARA', width / 2, 22, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(117, 111, 104);
  doc.text('Izin Operasional Resmi Kemendikbudristek · Terakreditasi Standar Nasional & Kemenkumham RI', width / 2, 27, { align: 'center' });

  // Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(26, 22, 21);
  doc.text('SERTIFIKAT PENGHARGAAN RESMI', width / 2, 41, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(180, 140, 30);
  doc.text(`${stage} · OLIMPIADE SISWA NASIONAL (OSN 2026)`, width / 2, 48, { align: 'center' });

  const certNumber = `OSN/${isFinalStage ? 'FNL' : 'PYS'}/2026/${student.id.replace(/[^0-9]/g, '').slice(-5) || '10882'}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text(`Nomor Sertifikat: ${certNumber}`, width / 2, 54, { align: 'center' });

  // Divider Line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.line(65, 57, width - 65, 57);

  // Recipient Intro
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(90, 85, 80);
  doc.text('Diberikan dengan penuh kehormatan dan apresiasi setinggi-tingginya kepada:', width / 2, 65, { align: 'center' });

  // Student Full Name
  doc.setFont('times', 'bold');
  doc.setFontSize(25);
  doc.setTextColor(26, 22, 21);
  doc.text(student.fullName.toUpperCase(), width / 2, 77, { align: 'center' });

  // Decorative Accent under Name
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.line(75, 80, width - 75, 80);

  doc.setFillColor(212, 175, 55);
  doc.circle(width / 2, 80, 1.8, 'F');

  // Student School, Level & ID
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(150, 110, 25);
  doc.text(student.schoolName || 'Siswa Berprestasi Nasional', width / 2, 87, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 95, 90);
  doc.text(
    `Nomor Peserta: ${student.id} · Jenjang: ${student.level} · Domisili: ${student.cityProvince || 'Indonesia'}`,
    width / 2,
    93,
    { align: 'center' }
  );

  // Award Rank / Prestasi Box
  doc.setFillColor(255, 253, 245);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.roundedRect(48, 98, width - 96, 20, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 90, 75);
  doc.text('Dinyatakan Lulus dan Meraih Predikat Penghargaan:', width / 2, 104, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(160, 105, 10);
  doc.text(`★  ${rank.toUpperCase()}  ★`, width / 2, 112, { align: 'center' });

  // Subject and Score Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(26, 22, 21);
  doc.text(
    `Bidang Lomba: ${subject}  |  Skor Akhir: ${resolvedScore}/100 (Grade ${gradeLetter} - ${predicate})`,
    width / 2,
    124,
    { align: 'center' }
  );

  // Statement of Accomplishment
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
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

  // ==========================================
  // 4. BAGIAN TANDA TANGAN & STEMPEL RESMI
  // ==========================================
  // PERMINTAAN USER:
  // - Tanda tangan Mengetahui & Mengesahkan, Direktur LKP Prestasi Nusantara
  // - Tanpa menggunakan nama (hapus semua nama pada tanda tangan sertifikat)
  // - Hapus (Reg. LKP. 021/PN/DIKNAS/2024, NIP. 19780512 200212 1 003, Dr. H. Hendra Gunawan, M.Si, Hj. Siti Nur Asia, S.Pd., M.)
  // - Tampilkan Stempel LKP resmi pada pengesahan
  const footerY = 145;

  // Left Signature: Panitia Pelaksana OSN 2026 (Tanpa Nama & Tanpa NIP)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 85, 80);
  doc.text(`Ditetapkan di Jakarta, ${executionDate}`, 48, footerY, { align: 'center' });
  doc.text('Panitia Pelaksana OSN 2026', 48, footerY + 5, { align: 'center' });

  // Signature line
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(22, footerY + 24, 74, footerY + 24);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Panitia Pelaksana Pusat', 48, footerY + 28, { align: 'center' });

  // Center: Official QR Code Verification & Gold Seal
  doc.setFillColor(212, 175, 55);
  doc.circle(width / 2, footerY + 11, 11, 'F');
  doc.setFillColor(255, 248, 220);
  doc.circle(width / 2, footerY + 11, 9.2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(150, 100, 20);
  doc.text('OSN 2026', width / 2, footerY + 10, { align: 'center' });
  doc.setFontSize(6);
  doc.text('VERIFIED', width / 2, footerY + 14, { align: 'center' });

  // Verification note below seal
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(120, 115, 110);
  doc.text(`[QR-VERIFY: https://olimpiadesiswanasional.id/verify/${student.id}]`, width / 2, footerY + 28, { align: 'center' });

  // Right Signature: Mengetahui & Mengesahkan, Direktur LKP Prestasi Nusantara
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 85, 80);
  doc.text('Mengetahui & Mengesahkan,', width - 48, footerY, { align: 'center' });
  doc.text('Direktur LKP Prestasi Nusantara', width - 48, footerY + 5, { align: 'center' });

  // Logo 3: STEMPEL RESMI LKP PRESTASI NUSANTARA (Cap Resmi Biru Asli Tanpa Background)
  if (logos.stempelLkp) {
    try {
      doc.addImage(logos.stempelLkp, 'PNG', width - 64, footerY + 6, 26, 26);
    } catch (e) {
      console.warn('Gagal menambahkan stempel LKP ke sertifikat:', e);
    }
  }

  // Signature line
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(width - 76, footerY + 24, width - 20, footerY + 24);

  // Title only, WITHOUT personal name or Reg LKP number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Direktur LKP Prestasi Nusantara', width - 48, footerY + 28, { align: 'center' });

  // Save the PDF
  const filename = `Sertifikat_Digital_OSN_2026_${rank.replace(/[^a-zA-Z0-9]/g, '_')}_${student.fullName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(filename);
}

// Backward-compatible alias for existing callers
export async function generateFinalCertificatePdf(options: CertificateOptions): Promise<void> {
  await generateDigitalCertificatePdf({
    ...options,
    stageTitle: options.stageTitle || 'BABAK FINAL NASIONAL'
  });
}
