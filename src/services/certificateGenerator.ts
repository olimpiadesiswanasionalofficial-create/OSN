import { jsPDF } from 'jspdf';
import { ParticipantRecord } from './participantDb';
import { APP_CONFIG } from '../../appConfig.js';

export interface CertificateOptions {
  student: ParticipantRecord;
  rankTitle?: string; // 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Peserta Final'
  subject?: string;
  executionDate?: string;
}

export function generateFinalCertificatePdf(options: CertificateOptions): void {
  const { student } = options;
  const rank = options.rankTitle || student.championRank || 'Peserta Final';
  const subject = options.subject || (student.subjects && student.subjects.length > 0 ? student.subjects[0] : 'Matematika & Sains');
  const executionDate = options.executionDate || '19 September 2026';

  // Landscape A4 (297mm x 210mm)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = 297;
  const height = 210;

  // 1. Background Fill - Elegant Cream / Ivory
  doc.setFillColor(253, 251, 247);
  doc.rect(0, 0, width, height, 'F');

  // 2. Outer Luxury Gold Double Border
  doc.setDrawColor(212, 175, 55); // Rich Gold #D4AF37
  doc.setLineWidth(3);
  doc.rect(8, 8, width - 16, height - 16, 'D');

  doc.setDrawColor(180, 140, 30);
  doc.setLineWidth(0.6);
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
    doc.circle(cx, cy, 2, 'F');
  });

  // Top Crest / Organization Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(150, 110, 25);
  doc.text('LEMBAGA KURSUS DAN PELATIHAN PRESTASI NUSANTARA', width / 2, 24, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(117, 111, 104);
  doc.text('Izin Operasional Kemendikbudristek No. 421.9/234/LKP/2024 · Akreditasi BAN PAUD PNF', width / 2, 29, { align: 'center' });

  // Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(26, 22, 21);
  doc.text('SERTIFIKAT PENGHARGAAN', width / 2, 45, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(180, 140, 30);
  doc.text('BABAK FINAL NASIONAL - OLIMPIADE SISWA NASIONAL (OSN 2026)', width / 2, 53, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Nomor Sertifikat: OSN/FNL/2026/${student.id.replace(/[^0-9]/g, '').slice(-5) || '10882'}`, width / 2, 59, { align: 'center' });

  // Divider Line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.line(70, 63, width - 70, 63);

  // Recipient Intro
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 75, 70);
  doc.text('Diberikan dengan bangga dan hormat kepada:', width / 2, 73, { align: 'center' });

  // Recipient Name - Big & Bold
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(26, 22, 21);
  doc.text(student.fullName.toUpperCase(), width / 2, 87, { align: 'center' });

  // Recipient School & Level
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(70, 65, 60);
  doc.text(`${student.schoolName} (${student.level})`, width / 2, 95, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(117, 111, 104);
  doc.text(`Asal Wilayah: ${student.cityProvince || 'Indonesia'} · Nomor Peserta: ${student.id}`, width / 2, 101, { align: 'center' });

  // Achievement / Title Banner Box
  const bannerY = 108;
  const isChampion = rank.includes('Juara');
  doc.setFillColor(isChampion ? 254 : 245, isChampion ? 243 : 245, isChampion ? 199 : 245);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.roundedRect(45, bannerY, width - 90, 22, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(isChampion ? 146 : 26, isChampion ? 64 : 22, isChampion ? 14 : 21);
  doc.text(`SEBAGAI : ${rank.toUpperCase()}`, width / 2, bannerY + 9, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(80, 75, 70);
  doc.text(`Bidang Mata Pelajaran: ${subject} · Kategori: ${student.level.split('(')[0].trim()}`, width / 2, bannerY + 16, { align: 'center' });

  // Description / Citation
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(70, 65, 60);
  doc.text(
    `Atas dedikasi, integritas, dan prestasi gemilang yang ditunjukkan pada Babak Final Olimpiade Siswa Nasional (OSN) 2026`,
    width / 2,
    140,
    { align: 'center' }
  );
  doc.text(
    `yang diselenggarakan serentak secara daring dengan slogan "Berani Mencoba Untuk Masa Depan Gemilang".`,
    width / 2,
    146,
    { align: 'center' }
  );

  // Execution Date & Signatures Section
  const footerY = 160;

  // Left Signature: Ketua Panitia OSN
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 85, 80);
  doc.text('Jakarta, 20 September 2026', 50, footerY);
  doc.text('Ketua Pelaksana OSN 2026', 50, footerY + 5);

  // Fake signature stamp
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(26, 22, 21);
  doc.text('Dr. H. Hendra Gunawan, M.Si.', 50, footerY + 24);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(25, footerY + 26, 75, footerY + 26);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text('NIP. 19780512 200212 1 003', 50, footerY + 30);

  // Center: Gold Badge Medal Simulation
  doc.setFillColor(212, 175, 55);
  doc.circle(width / 2, footerY + 14, 13, 'F');
  doc.setFillColor(255, 248, 220);
  doc.circle(width / 2, footerY + 14, 11, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(150, 100, 20);
  doc.text('OSN', width / 2, footerY + 13, { align: 'center' });
  doc.setFontSize(7);
  doc.text('FINALIS', width / 2, footerY + 17, { align: 'center' });

  // Right Signature: Direktur LKP Prestasi Nusantara
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 85, 80);
  doc.text('Mengetahui & Mengesahkan,', width - 50, footerY);
  doc.text('Direktur LKP Prestasi Nusantara', width - 50, footerY + 5);

  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(26, 22, 21);
  doc.text('Hj. Siti Nur Asia, S.Pd., M.M.', width - 50, footerY + 24);
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(width - 75, footerY + 26, width - 25, footerY + 26);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text('Reg. LKP. 021/PN/DIKNAS/2024', width - 50, footerY + 30);

  // Save the PDF
  const filename = `Sertifikat_OSN_2026_${rank.replace(/\s+/g, '_')}_${student.fullName.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
}
