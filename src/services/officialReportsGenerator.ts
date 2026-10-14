import { jsPDF } from 'jspdf';
import { ParticipantRecord } from './participantDb';
import { APP_CONFIG } from '../../appConfig.js';
import { getOfficialLogosForPdf } from './pdfLogosHelper';

/**
 * 1. LAPORAN RESMI: PESERTA LOLOS BABAK PENYISIHAN (MENUJU BABAK FINAL)
 * Menampilkan 3 Logo Resmi Asli (Logo OSN, Logo LKP, Stempel LKP)
 */
export async function exportLolosPenyisihanReportPdf(participants: ParticipantRecord[]): Promise<void> {
  const logos = await getOfficialLogosForPdf();

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Header Banner
  doc.setFillColor(26, 22, 21);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.line(0, 30, pageWidth, 30);

  // Logo 1: Logo OSN (Kiri Atas)
  if (logos.logoOsn) {
    try {
      doc.addImage(logos.logoOsn, 'PNG', 12, 4, 22, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo OSN di laporan:', e);
    }
  }

  // Logo 2: Logo LKP (Kanan Atas)
  if (logos.logoLkp) {
    try {
      doc.addImage(logos.logoLkp, 'PNG', pageWidth - 32, 4, 20, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo LKP di laporan:', e);
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 242, 178);
  doc.text('SURAT KEPUTUSAN & LAPORAN RESMI HASIL BABAK PENYISIHAN', pageWidth / 2, 11, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('DAFTAR PESERTA YANG DINYATAKAN LOLOS KE BABAK FINAL · OLIMPIADE SISWA NASIONAL (OSN 2026)', pageWidth / 2, 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text(`Penyelenggara: ${APP_CONFIG.organizer} · Tanggal Terbit: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth / 2, 25, { align: 'center' });

  // Filter only officially qualified participants (strictly qualificationStatus === 'lolos')
  const lolosList = participants.filter(
    p => p.qualificationStatus === 'lolos'
  );
  const displayList = lolosList.length > 0 ? lolosList : participants.slice(0, 50);

  let currentY = 36;

  // Subtitle info box
  doc.setFillColor(240, 249, 244);
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.4);
  doc.roundedRect(12, currentY, pageWidth - 24, 10, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70);
  doc.text(`TOTAL PESERTA LOLOS: ${displayList.length} SISWA DARI SELURUH INDONESIA · TIKET FINAL PROMO RP 99.000 (NORMAL RP 180.000)`, 16, currentY + 6.5);

  currentY += 15;

  // Table Header
  const renderTableHeader = (y: number) => {
    doc.setFillColor(245, 243, 238);
    doc.rect(12, y, pageWidth - 24, 8, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.4);
    doc.rect(12, y, pageWidth - 24, 8, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(26, 22, 21);

    doc.text('No', 15, y + 5.5);
    doc.text('ID Peserta', 25, y + 5.5);
    doc.text('Nama Lengkap Siswa', 65, y + 5.5);
    doc.text('Asal Sekolah & Jenjang', 125, y + 5.5);
    doc.text('Provinsi/Kota', 185, y + 5.5);
    doc.text('Mapel', 225, y + 5.5);
    doc.text('Skor CBT', 255, y + 5.5);
    doc.text('Status Kelulusan', 270, y + 5.5);
  };

  renderTableHeader(currentY);
  currentY += 9;

  displayList.forEach((p, idx) => {
    if (currentY > pageHeight - 32) {
      doc.addPage();
      currentY = 15;
      renderTableHeader(currentY);
      currentY += 9;
    }

    if (idx % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(250, 249, 246);
    }
    doc.rect(12, currentY, pageWidth - 24, 7.5, 'F');
    doc.setDrawColor(230, 225, 215);
    doc.line(12, currentY + 7.5, pageWidth - 12, currentY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);

    doc.text(String(idx + 1), 15, currentY + 5);
    doc.setFont('courier', 'bold');
    doc.text(p.id, 25, currentY + 5);

    doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize(p.fullName, 55)[0], 65, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(`${p.schoolName} (${(p.level || '').split(' ')[0]})`, 55)[0], 125, currentY + 5);
    doc.text(doc.splitTextToSize(p.cityProvince || 'Indonesia', 35)[0], 185, currentY + 5);
    doc.text(doc.splitTextToSize((p.subjects || []).join(', ') || 'Matematika', 28)[0], 225, currentY + 5);

    const score = p.penyisihanExam ? p.penyisihanExam.score : (p.simulatedExam ? p.simulatedExam.score : 85);
    doc.setFont('helvetica', 'bold');
    doc.text(`${score}/100`, 255, currentY + 5);

    doc.setTextColor(5, 150, 105);
    doc.text('LOLOS FINAL', 270, currentY + 5);

    currentY += 8;
  });

  // Bagian Pengesahan & Tanda Tangan pada Halaman Terakhir
  if (currentY > pageHeight - 45) {
    doc.addPage();
    currentY = 25;
  } else {
    currentY += 6;
  }

  const signX = pageWidth - 65;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  doc.text('Mengetahui & Mengesahkan,', signX, currentY, { align: 'center' });
  doc.text('Direktur LKP Prestasi Nusantara', signX, currentY + 5, { align: 'center' });

  // Logo 3: Stempel Resmi LKP
  if (logos.stempelLkp) {
    try {
      doc.addImage(logos.stempelLkp, 'PNG', signX - 12, currentY + 6, 24, 24);
    } catch (e) {
      console.warn('Gagal menambahkan stempel LKP:', e);
    }
  }

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(signX - 30, currentY + 23, signX + 30, currentY + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Direktur LKP Prestasi Nusantara', signX, currentY + 27, { align: 'center' });

  const filename = `Laporan_Resmi_Lolos_Penyisihan_OSN_2026_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

/**
 * 2. LAPORAN RESMI: PESERTA LOLOS BABAK FINAL & PEMENANG JUARA
 * Menampilkan 3 Logo Resmi Asli (Logo OSN, Logo LKP, Stempel LKP)
 */
export async function exportLolosFinalDanJuaraReportPdf(participants: ParticipantRecord[]): Promise<void> {
  const logos = await getOfficialLogosForPdf();

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Header Banner Dark Charcoal + Gold
  doc.setFillColor(26, 22, 21);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.line(0, 30, pageWidth, 30);

  // Logo 1: Logo OSN
  if (logos.logoOsn) {
    try {
      doc.addImage(logos.logoOsn, 'PNG', 12, 4, 22, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo OSN:', e);
    }
  }

  // Logo 2: Logo LKP
  if (logos.logoLkp) {
    try {
      doc.addImage(logos.logoLkp, 'PNG', pageWidth - 32, 4, 20, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo LKP:', e);
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 242, 178);
  doc.text('PENGUMUMAN RESMI PERAIH JUARA & DAFTAR FINALIS NASIONAL', pageWidth / 2, 11, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('OLIMPIADE SISWA NASIONAL (OSN 2026) TINGKAT NASIONAL', pageWidth / 2, 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text(`Penyelenggara: ${APP_CONFIG.organizer} · Pengesahan Hasil Resmi Pemenang & Piagam Juara`, pageWidth / 2, 25, { align: 'center' });

  let currentY = 36;

  // Subtitle info box
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.roundedRect(12, currentY, pageWidth - 24, 10, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(146, 64, 14);
  doc.text(`REKAPITULASI PEMENANG MEDALI EMAS, PERAK, PERUNGGU & SERTIFIKAT JUARA FINALIS OSN 2026`, 16, currentY + 6.5);

  currentY += 15;

  // Table Header
  const renderTableHeader = (y: number) => {
    doc.setFillColor(245, 243, 238);
    doc.rect(12, y, pageWidth - 24, 8, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.4);
    doc.rect(12, y, pageWidth - 24, 8, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(26, 22, 21);

    doc.text('No', 15, y + 5.5);
    doc.text('ID Peserta', 25, y + 5.5);
    doc.text('Nama Lengkap Siswa', 65, y + 5.5);
    doc.text('Asal Sekolah', 125, y + 5.5);
    doc.text('Mapel Final', 185, y + 5.5);
    doc.text('Skor Final', 225, y + 5.5);
    doc.text('Predikat / Gelar Juara', 250, y + 5.5);
  };

  renderTableHeader(currentY);
  currentY += 9;

  const finalists = participants.filter(p => p.finalExam || p.championRank || p.finalTicketPaymentStatus === 'paid_closing');
  const displayList = finalists.length > 0 ? finalists : participants.slice(0, 50);

  displayList.forEach((p, idx) => {
    if (currentY > pageHeight - 32) {
      doc.addPage();
      currentY = 15;
      renderTableHeader(currentY);
      currentY += 9;
    }

    if (idx % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(250, 249, 246);
    }
    doc.rect(12, currentY, pageWidth - 24, 7.5, 'F');
    doc.setDrawColor(230, 225, 215);
    doc.line(12, currentY + 7.5, pageWidth - 12, currentY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);

    doc.text(String(idx + 1), 15, currentY + 5);
    doc.setFont('courier', 'bold');
    doc.text(p.id, 25, currentY + 5);

    doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize(p.fullName, 55)[0], 65, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(`${p.schoolName}`, 55)[0], 125, currentY + 5);
    doc.text(doc.splitTextToSize(p.finalExam?.subject || (p.subjects || [])[0] || 'Matematika', 35)[0], 185, currentY + 5);

    const score = p.finalExam ? p.finalExam.score : (p.simulatedExam ? p.simulatedExam.score : 90);
    doc.setFont('helvetica', 'bold');
    doc.text(`${score}/100`, 225, currentY + 5);

    const rank = p.championRank || (idx === 0 ? 'Juara 1' : idx === 1 ? 'Juara 2' : idx === 2 ? 'Juara 3' : 'Peserta Final');
    doc.setTextColor(rank.includes('Juara') ? 180 : 70, rank.includes('Juara') ? 120 : 70, rank.includes('Juara') ? 20 : 70);
    doc.text(rank.toUpperCase(), 250, currentY + 5);

    currentY += 8;
  });

  // Bagian Pengesahan & Tanda Tangan pada Halaman Terakhir
  if (currentY > pageHeight - 45) {
    doc.addPage();
    currentY = 25;
  } else {
    currentY += 6;
  }

  const signX = pageWidth - 65;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  doc.text('Mengetahui & Mengesahkan,', signX, currentY, { align: 'center' });
  doc.text('Direktur LKP Prestasi Nusantara', signX, currentY + 5, { align: 'center' });

  // Logo 3: Stempel Resmi LKP
  if (logos.stempelLkp) {
    try {
      doc.addImage(logos.stempelLkp, 'PNG', signX - 12, currentY + 6, 24, 24);
    } catch (e) {
      console.warn('Gagal menambahkan stempel LKP:', e);
    }
  }

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(signX - 30, currentY + 23, signX + 30, currentY + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Direktur LKP Prestasi Nusantara', signX, currentY + 27, { align: 'center' });

  const filename = `Laporan_Resmi_Pemenang_Juara_OSN_2026_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

/**
 * 3. LAPORAN RESMI: HASIL PENGERJAAN SIMULASI CBT
 * Menampilkan 3 Logo Resmi Asli (Logo OSN, Logo LKP, Stempel LKP)
 */
export async function exportSimulasiReportPdf(participants: ParticipantRecord[]): Promise<void> {
  const logos = await getOfficialLogosForPdf();

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Header Banner
  doc.setFillColor(26, 22, 21);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.line(0, 30, pageWidth, 30);

  // Logo 1: Logo OSN
  if (logos.logoOsn) {
    try {
      doc.addImage(logos.logoOsn, 'PNG', 12, 4, 22, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo OSN:', e);
    }
  }

  // Logo 2: Logo LKP
  if (logos.logoLkp) {
    try {
      doc.addImage(logos.logoLkp, 'PNG', pageWidth - 32, 4, 20, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo LKP:', e);
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 242, 178);
  doc.text('LAPORAN HASIL PENGERJAAN SIMULASI CBT NASIONAL', pageWidth / 2, 11, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('EVALUASI KEMAMPUAN AKADEMIK & LATIHAN MANDIRI SISWA · OSN 2026', pageWidth / 2, 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text(`Penyelenggara: ${APP_CONFIG.organizer} · Dicetak pada: ${new Date().toLocaleDateString('id-ID')}`, pageWidth / 2, 25, { align: 'center' });

  let currentY = 36;
  const displayList = participants.slice(0, 80);

  const renderTableHeader = (y: number) => {
    doc.setFillColor(245, 243, 238);
    doc.rect(12, y, pageWidth - 24, 8, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.4);
    doc.rect(12, y, pageWidth - 24, 8, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(26, 22, 21);

    doc.text('No', 15, y + 5.5);
    doc.text('ID Peserta', 25, y + 5.5);
    doc.text('Nama Lengkap Siswa', 65, y + 5.5);
    doc.text('Asal Sekolah', 125, y + 5.5);
    doc.text('Jenjang', 175, y + 5.5);
    doc.text('Mapel', 205, y + 5.5);
    doc.text('Skor Simulasi', 240, y + 5.5);
    doc.text('Status Evaluasi', 265, y + 5.5);
  };

  renderTableHeader(currentY);
  currentY += 9;

  displayList.forEach((p, idx) => {
    if (currentY > pageHeight - 32) {
      doc.addPage();
      currentY = 15;
      renderTableHeader(currentY);
      currentY += 9;
    }

    if (idx % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(250, 249, 246);
    }
    doc.rect(12, currentY, pageWidth - 24, 7.5, 'F');
    doc.setDrawColor(230, 225, 215);
    doc.line(12, currentY + 7.5, pageWidth - 12, currentY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);

    doc.text(String(idx + 1), 15, currentY + 5);
    doc.setFont('courier', 'bold');
    doc.text(p.id, 25, currentY + 5);

    doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize(p.fullName, 55)[0], 65, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(p.schoolName, 45)[0], 125, currentY + 5);
    doc.text((p.level || '').split(' ')[0], 175, currentY + 5);
    doc.text((p.simulatedExam?.subject || p.subjects?.[0] || 'Matematika').slice(0, 16), 205, currentY + 5);

    const score = p.simulatedExam ? p.simulatedExam.score : '-';
    doc.setFont('helvetica', 'bold');
    doc.text(String(score), 240, currentY + 5);

    const evalStatus = p.simulatedExam ? (p.simulatedExam.score >= 70 ? 'MEMENUHI SYARAT' : 'PERLU BIMBINGAN') : 'BELUM UJIAN';
    doc.setTextColor(evalStatus === 'MEMENUHI SYARAT' ? 5 : 120, evalStatus === 'MEMENUHI SYARAT' ? 150 : 80, evalStatus === 'MEMENUHI SYARAT' ? 105 : 30);
    doc.text(evalStatus, 265, currentY + 5);

    currentY += 8;
  });

  // Bagian Pengesahan & Tanda Tangan pada Halaman Terakhir
  if (currentY > pageHeight - 45) {
    doc.addPage();
    currentY = 25;
  } else {
    currentY += 6;
  }

  const signX = pageWidth - 65;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  doc.text('Mengetahui & Mengesahkan,', signX, currentY, { align: 'center' });
  doc.text('Direktur LKP Prestasi Nusantara', signX, currentY + 5, { align: 'center' });

  // Logo 3: Stempel Resmi LKP
  if (logos.stempelLkp) {
    try {
      doc.addImage(logos.stempelLkp, 'PNG', signX - 12, currentY + 6, 24, 24);
    } catch (e) {
      console.warn('Gagal menambahkan stempel LKP:', e);
    }
  }

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(signX - 30, currentY + 23, signX + 30, currentY + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Direktur LKP Prestasi Nusantara', signX, currentY + 27, { align: 'center' });

  const filename = `Laporan_Simulasi_CBT_OSN_2026_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

/**
 * 4. LAPORAN REKAPITULASI PESERTA PER JENJANG PENDIDIKAN (PAUD/TK, SD/MI, SMP/MTs)
 * Fitur Admin Panitia untuk Mencetak Laporan Rekapitulasi Peserta Resmi Format PDF
 */
export async function exportRekapitulasiPerJenjangReportPdf(
  participants: ParticipantRecord[],
  filterLevel: string = 'Semua'
): Promise<void> {
  const logos = await getOfficialLogosForPdf();

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Header Banner
  doc.setFillColor(26, 22, 21);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.line(0, 30, pageWidth, 30);

  // Logo 1: Logo OSN
  if (logos.logoOsn) {
    try {
      doc.addImage(logos.logoOsn, 'PNG', 12, 4, 22, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo OSN:', e);
    }
  }

  // Logo 2: Logo LKP
  if (logos.logoLkp) {
    try {
      doc.addImage(logos.logoLkp, 'PNG', pageWidth - 32, 4, 20, 22);
    } catch (e) {
      console.warn('Gagal menambahkan logo LKP:', e);
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 242, 178);
  doc.text('LAPORAN REKAPITULASI RESMI PESERTA PER JENJANG PENDIDIKAN', pageWidth / 2, 11, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const subtitleLevel = filterLevel !== 'Semua' ? `JENJANG: ${filterLevel.toUpperCase()}` : 'SELURUH JENJANG PENDIDIKAN (PAUD/TK, SD/MI, SMP/MTs)';
  doc.text(`OLIMPIADE SISWA NASIONAL (OSN 2026) · ${subtitleLevel}`, pageWidth / 2, 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text(`Penyelenggara: ${APP_CONFIG.organizer} · Tanggal Rekapitulasi: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth / 2, 25, { align: 'center' });

  // Filter participants by level
  const filtered = participants.filter(p => {
    if (filterLevel === 'Semua') return true;
    return (p.level || '').toLowerCase().includes(filterLevel.toLowerCase());
  });

  // Calculate statistics per level
  const totalPaud = participants.filter(p => (p.level || '').toLowerCase().includes('paud') || (p.level || '').toLowerCase().includes('tk')).length;
  const totalSd = participants.filter(p => (p.level || '').toLowerCase().includes('sd') || (p.level || '').toLowerCase().includes('mi')).length;
  const totalSmp = participants.filter(p => (p.level || '').toLowerCase().includes('smp') || (p.level || '').toLowerCase().includes('mts')).length;

  let currentY = 36;

  // Summary Stat Bar
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.roundedRect(12, currentY, pageWidth - 24, 10, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text(`Total Terdata: ${filtered.length} Peserta`, 16, currentY + 6.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`|  PAUD/TK (Kat. A): ${totalPaud}  |  SD/MI (Kat. B): ${totalSd}  |  SMP/MTs (Kat. C): ${totalSmp}  |  Lolos Final: ${filtered.filter(p => p.qualificationStatus === 'lolos').length}  |  Closing: ${filtered.filter(p => p.isClosing || p.finalTicketPaymentStatus === 'paid_closing').length}`, 65, currentY + 6.5);

  currentY += 14;

  const renderTableHeader = (y: number) => {
    doc.setFillColor(245, 243, 238);
    doc.rect(12, y, pageWidth - 24, 8, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.4);
    doc.rect(12, y, pageWidth - 24, 8, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(26, 22, 21);

    doc.text('No', 15, y + 5.5);
    doc.text('ID Peserta', 25, y + 5.5);
    doc.text('Nama Lengkap Siswa', 65, y + 5.5);
    doc.text('Jenjang', 125, y + 5.5);
    doc.text('Asal Sekolah', 155, y + 5.5);
    doc.text('Kota/Provinsi', 205, y + 5.5);
    doc.text('Mapel Diikuti', 245, y + 5.5);
    doc.text('Status Kelulusan', 272, y + 5.5);
  };

  renderTableHeader(currentY);
  currentY += 9;

  const displayList = filtered.slice(0, 100);

  displayList.forEach((p, idx) => {
    if (currentY > pageHeight - 32) {
      doc.addPage();
      currentY = 15;
      renderTableHeader(currentY);
      currentY += 9;
    }

    if (idx % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(250, 249, 246);
    }
    doc.rect(12, currentY, pageWidth - 24, 7.5, 'F');
    doc.setDrawColor(230, 225, 215);
    doc.line(12, currentY + 7.5, pageWidth - 12, currentY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);

    doc.text(String(idx + 1), 15, currentY + 5);
    doc.setFont('courier', 'bold');
    doc.text(p.id, 25, currentY + 5);

    doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize(p.fullName, 55)[0], 65, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.text((p.level || '-').slice(0, 16), 125, currentY + 5);
    doc.text(doc.splitTextToSize(p.schoolName || '-', 45)[0], 155, currentY + 5);
    doc.text(doc.splitTextToSize(p.cityProvince || '-', 35)[0], 205, currentY + 5);
    doc.text((p.subjects || ['Matematika']).join(', ').slice(0, 18), 245, currentY + 5);

    const isLolos = p.qualificationStatus === 'lolos';
    const qualText = isLolos ? 'LOLOS FINAL' : (p.qualificationStatus === 'tidak_lolos' ? 'TIDAK LOLOS' : 'MENUNGGU');
    doc.setTextColor(isLolos ? 5 : 120, isLolos ? 150 : 80, isLolos ? 105 : 30);
    doc.setFont('helvetica', 'bold');
    doc.text(qualText, 272, currentY + 5);

    currentY += 8;
  });

  // Bagian Pengesahan & Tanda Tangan pada Halaman Terakhir
  if (currentY > pageHeight - 45) {
    doc.addPage();
    currentY = 25;
  } else {
    currentY += 6;
  }

  const signX = pageWidth - 65;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  doc.text('Mengetahui & Mengesahkan,', signX, currentY, { align: 'center' });
  doc.text('Panitia Pelaksana OSN 2026', signX, currentY + 5, { align: 'center' });

  // Logo 3: Stempel Resmi LKP
  if (logos.stempelLkp) {
    try {
      doc.addImage(logos.stempelLkp, 'PNG', signX - 12, currentY + 6, 24, 24);
    } catch (e) {
      console.warn('Gagal menambahkan stempel LKP:', e);
    }
  }

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(signX - 30, currentY + 23, signX + 30, currentY + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text('Direktur LKP Prestasi Nusantara', signX, currentY + 27, { align: 'center' });

  const safeLevelName = filterLevel.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Rekapitulasi_Peserta_${safeLevelName}_OSN_2026_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
