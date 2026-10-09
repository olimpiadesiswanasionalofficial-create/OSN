import { jsPDF } from 'jspdf';
import { ParticipantRecord } from './participantDb';
import { APP_CONFIG } from '../../appConfig.js';
import { getOfficialLogosForPdf } from './pdfLogosHelper';

// 1. Export Participants List to Excel (.xlsx or clean compatible .csv/spreadsheet format)
export function exportParticipantsToCsv(participants: ParticipantRecord[], titleSuffix: string = ''): void {
  const headers = [
    'No',
    'ID Peserta',
    'Nama Lengkap Siswa',
    'Nama Orang Tua / Wali',
    'Alamat Lengkap / Domisili',
    'Nomor WhatsApp',
    'Email',
    'Jenjang Kategori',
    'Asal Sekolah',
    'Kota/Provinsi',
    'Mata Pelajaran',
    'Tanggal Pendaftaran',
    'Status CBT',
    'Status Penyisihan/Simulasi',
    'Skor Penyisihan',
    'Tanggal Selesai Penyisihan',
    'Status Kelulusan Final',
    'Status Closing Tiket Final',
    'Nominal Closing (Rp)',
    'Status Juara / Medali',
    'Status Babak Final',
    'Skor Babak Final',
    'Tanggal Selesai Final'
  ];

  const escapeCsv = (val: any) => {
    const s = String(val ?? '').replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = participants.map((p, idx) => [
    idx + 1,
    p.id,
    p.fullName,
    p.parentName || '-',
    p.fullAddress || '-',
    p.whatsapp,
    p.email || '-',
    p.level,
    p.schoolName || '-',
    p.cityProvince || 'Indonesia',
    (p.subjects || []).join('; '),
    new Date(p.registeredAt).toLocaleString('id-ID'),
    p.cbtStatus || '-',
    p.simulatedExam ? p.simulatedExam.status : 'Belum Mengerjakan',
    p.simulatedExam ? p.simulatedExam.score : '-',
    p.simulatedExam ? new Date(p.simulatedExam.completedAt).toLocaleString('id-ID') : '-',
    p.qualificationStatus === 'lolos' ? 'LOLOS FINAL' : p.qualificationStatus === 'tidak_lolos' ? 'TIDAK LOLOS' : 'PENDING',
    p.finalTicketPaymentStatus === 'paid_closing' ? 'LUNAS (CLOSING)' : 'BELUM BAYAR',
    p.finalTicketPaymentStatus === 'paid_closing' ? (p.finalTicketAmount || 99000) : 0,
    p.championRank || 'Belum Dinilai',
    p.finalExam ? p.finalExam.status : 'Menunggu Jadwal',
    p.finalExam ? p.finalExam.score : '-',
    p.finalExam ? new Date(p.finalExam.completedAt).toLocaleString('id-ID') : '-'
  ]);

  const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows.map(r => r.map(escapeCsv).join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  link.href = url;
  link.setAttribute('download', `Daftar_Peserta_OSN_2026_${titleSuffix || dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportParticipantsToExcel(participants: ParticipantRecord[], titleSuffix: string = ''): void {
  const headers = [
    'No',
    'ID Peserta',
    'Nama Lengkap Siswa',
    'Nama Orang Tua / Wali',
    'Alamat Lengkap / Domisili',
    'Nomor WhatsApp',
    'Email',
    'Jenjang Kategori',
    'Asal Sekolah',
    'Kota/Provinsi',
    'Mata Pelajaran',
    'Tanggal Pendaftaran',
    'Status CBT',
    'Status Penyisihan/Simulasi',
    'Skor Penyisihan',
    'Tanggal Selesai Penyisihan',
    'Status Kelulusan Final',
    'Status Closing Tiket Final',
    'Nominal Closing (Rp)',
    'Status Juara / Peringkat',
    'Status Babak Final',
    'Skor Babak Final',
    'Tanggal Selesai Final'
  ];

  const rows = participants.map((p, idx) => [
    idx + 1,
    p.id,
    `"${p.fullName.replace(/"/g, '""')}"`,
    `"${(p.parentName || '-').replace(/"/g, '""')}"`,
    `"${(p.fullAddress || '-').replace(/"/g, '""')}"`,
    `"${p.whatsapp}"`,
    `"${p.email || '-'}"`,
    `"${p.level}"`,
    `"${(p.schoolName || '-').replace(/"/g, '""')}"`,
    `"${(p.cityProvince || 'Indonesia').replace(/"/g, '""')}"`,
    `"${(p.subjects || []).join('; ')}"`,
    `"${new Date(p.registeredAt).toLocaleString('id-ID')}"`,
    `"${p.cbtStatus || '-'}"`,
    `"${p.simulatedExam ? p.simulatedExam.status : 'Belum Mengerjakan'}"`,
    p.simulatedExam ? p.simulatedExam.score : '-',
    `"${p.simulatedExam ? new Date(p.simulatedExam.completedAt).toLocaleString('id-ID') : '-'}"`,
    `"${p.qualificationStatus === 'lolos' ? 'LOLOS FINAL' : p.qualificationStatus === 'tidak_lolos' ? 'TIDAK LOLOS' : 'PENDING'}"`,
    `"${p.finalTicketPaymentStatus === 'paid_closing' ? 'LUNAS (CLOSING)' : 'BELUM BAYAR'}"`,
    p.finalTicketPaymentStatus === 'paid_closing' ? (p.finalTicketAmount || 99000) : 0,
    `"${p.championRank || 'Belum Dinilai'}"`,
    `"${p.finalExam ? p.finalExam.status : 'Menunggu Jadwal'}"`,
    p.finalExam ? p.finalExam.score : '-',
    `"${p.finalExam ? new Date(p.finalExam.completedAt).toLocaleString('id-ID') : '-'}"`
  ]);

  // Combine headers and rows
  const csvContent = '\uFEFF' + [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
  const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  link.href = url;
  link.setAttribute('download', `Daftar_Peserta_OSN_2026_${titleSuffix || dateStr}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 2. Export Participants List to Formatted PDF Table
export async function exportParticipantsToPdf(participants: ParticipantRecord[], filterDescription: string = ''): Promise<void> {
  const logos = await getOfficialLogosForPdf();

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4' // 297mm x 210mm
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Header banner
  doc.setFillColor(26, 22, 21); // Charcoal
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold accent bar
  doc.setFillColor(212, 175, 55); // Gold
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Logo 1: Logo OSN
  if (logos.logoOsn) {
    try {
      doc.addImage(logos.logoOsn, 'PNG', 12, 3.5, 21, 21);
    } catch (e) {
      console.warn('Gagal menambahkan logo OSN ke PDF peserta:', e);
    }
  }

  // Logo 2: Logo LKP
  if (logos.logoLkp) {
    try {
      doc.addImage(logos.logoLkp, 'PNG', pageWidth - 32, 3.5, 19, 21);
    } catch (e) {
      console.warn('Gagal menambahkan logo LKP ke PDF peserta:', e);
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 242, 178);
  doc.text('LAPORAN DATA PESERTA & PROGRES UJIAN CBT OSN 2026', pageWidth / 2, 11, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(230, 230, 230);
  doc.text(`Penyelenggara: ${APP_CONFIG.organizer} · LKP Prestasi Nusantara · Dicetak pada: ${new Date().toLocaleString('id-ID')}`, pageWidth / 2, 18, { align: 'center' });
  doc.text(`Kriteria: ${filterDescription || 'Seluruh Database'} · Total: ${participants.length} Siswa`, pageWidth / 2, 24, { align: 'center' });

  // Table Headers
  let currentY = 38;
  doc.setFillColor(245, 243, 238);
  doc.rect(12, currentY, pageWidth - 24, 8, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.rect(12, currentY, pageWidth - 24, 8, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(26, 22, 21);

  doc.text('No', 14, currentY + 5.5);
  doc.text('ID Peserta', 23, currentY + 5.5);
  doc.text('Nama Lengkap Siswa', 58, currentY + 5.5);
  doc.text('WhatsApp', 110, currentY + 5.5);
  doc.text('Jenjang & Sekolah', 140, currentY + 5.5);
  doc.text('Mata Pelajaran', 198, currentY + 5.5);
  doc.text('Babak Penyisihan', 235, currentY + 5.5);
  doc.text('Babak Final', 268, currentY + 5.5);

  currentY += 9;

  // Table Rows
  participants.forEach((p, idx) => {
    // Check if new page is needed
    if (currentY > pageHeight - 18) {
      doc.addPage();
      currentY = 15;
      
      // Re-render table header on new page
      doc.setFillColor(245, 243, 238);
      doc.rect(12, currentY, pageWidth - 24, 8, 'F');
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.3);
      doc.rect(12, currentY, pageWidth - 24, 8, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(26, 22, 21);

      doc.text('No', 14, currentY + 5.5);
      doc.text('ID Peserta', 23, currentY + 5.5);
      doc.text('Nama Lengkap Siswa', 58, currentY + 5.5);
      doc.text('WhatsApp', 110, currentY + 5.5);
      doc.text('Jenjang & Sekolah', 140, currentY + 5.5);
      doc.text('Mata Pelajaran', 198, currentY + 5.5);
      doc.text('Babak Penyisihan', 235, currentY + 5.5);
      doc.text('Babak Final', 268, currentY + 5.5);

      currentY += 9;
    }

    // Row alternating background
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

    // Columns
    doc.text(String(idx + 1), 14, currentY + 5);

    doc.setFont('courier', 'bold');
    doc.text(p.id, 23, currentY + 5);

    doc.setFont('helvetica', 'bold');
    const nameStr = doc.splitTextToSize(p.fullName, 50)[0];
    doc.text(nameStr, 58, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.text(p.whatsapp, 110, currentY + 5);

    const schoolStr = doc.splitTextToSize(`${p.schoolName} (${p.level.split(' ')[0]})`, 55)[0];
    doc.text(schoolStr, 140, currentY + 5);

    const mapelStr = (p.subjects || []).join(', ');
    doc.text(doc.splitTextToSize(mapelStr, 35)[0], 198, currentY + 5);

    // Penyisihan status
    if (p.simulatedExam) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text(`Skor: ${p.simulatedExam.score}/100`, 235, currentY + 5);
    } else {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(150, 140, 130);
      doc.text('Belum Ujian', 235, currentY + 5);
    }

    // Final status
    if (p.finalExam) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 83, 9);
      doc.text(`Skor: ${p.finalExam.score}/100`, 268, currentY + 5);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150, 140, 130);
      doc.text('-', 268, currentY + 5);
    }

    currentY += 7.5;
  });

  // Bagian Pengesahan & Tanda Tangan pada Halaman Terakhir
  if (currentY > pageHeight - 40) {
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

  // Footer note
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(120, 115, 110);
  doc.text(`Dokumen Resmi Panitia Pusat OSN 2026 · Total: ${participants.length} Peserta Terdaftar. Hak Cipta Dilindungi.`, 12, pageHeight - 6);

  const dateStr = new Date().toISOString().split('T')[0];
  doc.save(`Laporan_Peserta_OSN_2026_${dateStr}.pdf`);
}

// 3. Export WhatsApp Contacts as VCF (vCard file for direct 1-click import into Android/iPhone Google Contacts)
export function exportParticipantsToVcf(participants: ParticipantRecord[], customGroup: string = 'OSN 2026'): void {
  if (!participants || participants.length === 0) {
    return;
  }

  const vcardEntries = participants.map((p) => {
    // Format phone to international +62 or standard digits
    let cleanPhone = p.whatsapp.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    }
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }

    const note = `Peserta OSN 2026 - ID: ${p.id} | Sekolah: ${p.schoolName} | Jenjang: ${p.level} | Mapel: ${(p.subjects || []).join(', ')}`;

    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${p.fullName} - ${customGroup}`,
      `N:${p.fullName};;;;`,
      `ORG:OSN 2026;${p.schoolName || 'Peserta'}`,
      `TITLE:Peserta ${p.level}`,
      `TEL;TYPE=CELL,VOICE,PREF:${cleanPhone}`,
      p.email && p.email !== '-' ? `EMAIL;TYPE=INTERNET:${p.email}` : '',
      `NOTE:${note}`,
      `CATEGORIES:${customGroup},Olimpiade Siswa Nasional`,
      'END:VCARD'
    ].filter(Boolean).join('\r\n');
  });

  const vcfContent = vcardEntries.join('\r\n');
  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  link.href = url;
  link.setAttribute('download', `Kontak_Peserta_OSN_2026_${dateStr}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 4. Export Single Participant Contact as VCF
export function exportSingleParticipantVcf(p: ParticipantRecord, customGroup: string = 'OSN 2026'): void {
  let cleanPhone = p.whatsapp.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.substring(1);
  }
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }

  const note = `Peserta OSN 2026 - ID: ${p.id} | Sekolah: ${p.schoolName} | Jenjang: ${p.level} | Mapel: ${(p.subjects || []).join(', ')}`;

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${p.fullName} - ${customGroup}`,
    `N:${p.fullName};;;;`,
    `ORG:OSN 2026;${p.schoolName || 'Peserta'}`,
    `TITLE:Peserta ${p.level}`,
    `TEL;TYPE=CELL,VOICE,PREF:${cleanPhone}`,
    p.email && p.email !== '-' ? `EMAIL;TYPE=INTERNET:${p.email}` : '',
    `NOTE:${note}`,
    `CATEGORIES:${customGroup},Olimpiade Siswa Nasional`,
    'END:VCARD'
  ].filter(Boolean).join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const vcfLink = document.createElement('a');
  const safeName = p.fullName.replace(/[^a-zA-Z0-9]/g, '_');
  vcfLink.href = url;
  vcfLink.setAttribute('download', `Kontak_${safeName}_OSN2026.vcf`);
  document.body.appendChild(vcfLink);
  vcfLink.click();
  document.body.removeChild(vcfLink);
  URL.revokeObjectURL(url);
}
