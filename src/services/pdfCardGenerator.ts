import { jsPDF } from 'jspdf';
import { ParticipantRecord } from '../services/participantDb';
import { APP_CONFIG } from '../../appConfig.js';

export function downloadExamCardPdf(student: ParticipantRecord): void {
  // Create jsPDF in portrait A4 (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const cardWidth = 180;
  const cardHeight = 240;
  const startX = 15;
  const startY = 20;

  // Outer Border & Background
  doc.setFillColor(252, 250, 246); // Warm off-white
  doc.roundedRect(startX, startY, cardWidth, cardHeight, 6, 6, 'F');
  
  doc.setDrawColor(212, 175, 55); // Gold border
  doc.setLineWidth(1.2);
  doc.roundedRect(startX, startY, cardWidth, cardHeight, 6, 6, 'D');

  // Inner border frame
  doc.setDrawColor(230, 220, 195);
  doc.setLineWidth(0.4);
  doc.roundedRect(startX + 3, startY + 3, cardWidth - 6, cardHeight - 6, 4, 4, 'D');

  // Header Banner
  doc.setFillColor(26, 22, 21); // Dark charcoal #1A1615
  doc.roundedRect(startX + 4, startY + 4, cardWidth - 8, 38, 3, 3, 'F');

  // Gold accent line under header
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(startX + 4, startY + 42, startX + cardWidth - 4, startY + 42);

  // Header Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 242, 178); // Gold text
  doc.text('KARTU PESERTA RESMI CBT ONLINE 2026', startX + cardWidth / 2, startY + 16, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('OLIMPIADE SISWA NASIONAL (OSN 2026)', startX + cardWidth / 2, startY + 24, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text(`Penyelenggara Resmi: ${APP_CONFIG.organizer} · Akreditasi LKP`, startX + cardWidth / 2, startY + 31, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 200);
  doc.text('Babak Penyisihan 12 September 2026 · Bebas Biaya Pendaftaran (100% GRATIS)', startX + cardWidth / 2, startY + 37, { align: 'center' });

  // Verification Badge Bar
  doc.setFillColor(240, 249, 244);
  doc.roundedRect(startX + 8, startY + 47, cardWidth - 16, 12, 2, 2, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.3);
  doc.roundedRect(startX + 8, startY + 47, cardWidth - 16, 12, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(5, 150, 105);
  doc.text('STATUS: TERVERIFIKASI & TERDAFTAR RESMI PADA DATABASE CBT PUSAT', startX + cardWidth / 2, startY + 54, { align: 'center' });

  // Participant Data Box
  const infoStartY = startY + 66;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(startX + 8, infoStartY, 114, 88, 3, 3, 'FD');
  doc.setDrawColor(220, 215, 205);
  doc.setLineWidth(0.4);
  doc.roundedRect(startX + 8, infoStartY, 114, 88, 3, 3, 'D');

  // QR / Verification side box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(startX + 126, infoStartY, 46, 88, 3, 3, 'FD');
  doc.setDrawColor(220, 215, 205);
  doc.roundedRect(startX + 126, infoStartY, 46, 88, 3, 3, 'D');

  // QR Visual Simulation
  doc.setFillColor(26, 22, 21);
  doc.rect(startX + 133, infoStartY + 10, 32, 32, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(startX + 137, infoStartY + 14, 8, 8, 'F');
  doc.rect(startX + 153, infoStartY + 14, 8, 8, 'F');
  doc.rect(startX + 137, infoStartY + 30, 8, 8, 'F');
  doc.setFillColor(26, 22, 21);
  doc.rect(startX + 139, infoStartY + 16, 4, 4, 'F');
  doc.rect(startX + 155, infoStartY + 16, 4, 4, 'F');
  doc.rect(startX + 139, infoStartY + 32, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(26, 22, 21);
  doc.text('KODE VALIDASI SAH', startX + 149, infoStartY + 50, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Scan untuk cek status', startX + 149, infoStartY + 55, { align: 'center' });
  doc.text('keaslian peserta di portal', startX + 149, infoStartY + 59, { align: 'center' });

  // Official Stamp Simulated Mark
  doc.setDrawColor(30, 64, 175); // Royal Blue stamp
  doc.setLineWidth(0.8);
  doc.circle(startX + 149, infoStartY + 73, 11, 'D');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(30, 64, 175);
  doc.text('LKP PRESTASI', startX + 149, infoStartY + 71, { align: 'center' });
  doc.text('PUSAT', startX + 149, infoStartY + 74, { align: 'center' });
  doc.text('OSN 2026', startX + 149, infoStartY + 77, { align: 'center' });

  // Student Fields
  let currentY = infoStartY + 10;
  const renderField = (label: string, value: string, isMono = false, isHighlight = false) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(115, 110, 100);
    doc.text(label, startX + 12, currentY);

    doc.setFont(isMono ? 'courier' : 'helvetica', 'bold');
    doc.setFontSize(isHighlight ? 9.5 : 8.5);
    doc.setTextColor(isHighlight ? 180 : 26, isHighlight ? 83 : 22, isHighlight ? 9 : 21);
    doc.text(value || '-', startX + 12, currentY + 4.5);
    currentY += 12;
  };

  renderField('NOMOR PESERTA CBT (ID RESMI):', student.id, true, true);
  renderField('NAMA LENGKAP SISWA:', student.fullName);
  if (student.parentName && student.parentName !== '-') {
    renderField('NAMA ORANG TUA / WALI:', student.parentName);
  }
  renderField('NOMOR WHATSAPP TERDAFTAR:', student.whatsapp, true);
  renderField('JENJANG / KATEGORI:', student.level);
  renderField('ASAL SEKOLAH:', student.schoolName);
  renderField('KOTA / PROVINSI:', student.cityProvince || 'Indonesia');
  renderField('MATA PELAJARAN YANG DIIKUTI:', (student.subjects || ['Matematika']).join(', '));

  // Schedule & Exam Instructions Section
  const schedY = infoStartY + 95;
  doc.setFillColor(254, 252, 245);
  doc.roundedRect(startX + 8, schedY, cardWidth - 16, 52, 3, 3, 'FD');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.roundedRect(startX + 8, schedY, cardWidth - 16, 52, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 22, 21);
  doc.text('PETUNJUK & JADWAL PELAKSANAAN UJIAN CBT ONLINE:', startX + 12, schedY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 55, 50);

  const instructions = [
    '1. Babak Penyisihan dilaksanakan serentak secara daring pada hari Sabtu, 12 September 2026.',
    '2. Akses masuk ruang ujian menggunakan Nama Lengkap dan Nomor WhatsApp yang terdaftar pada kartu ini.',
    '3. Peserta diwajibkan melakukan simulasi CBT terlebih dahulu melalui portal resmi sebelum ujian berlangsung.',
    '4. Setiap mata pelajaran berdurasi 60 menit dengan 20 soal pilihan ganda bergambar.',
    '5. Babak Penyisihan 100% BEBAS BIAYA (Gratis). Peraih predikat berhak maju ke Babak Final 26 September 2026.'
  ];

  instructions.forEach((inst, idx) => {
    doc.text(inst, startX + 12, schedY + 15 + (idx * 6));
  });

  // Footer / Signatures
  const signY = schedY + 58;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 95, 90);
  doc.text(`Diterbitkan secara digital pada: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, startX + 12, signY);
  doc.text('Komite Penyelenggara Olimpiade Siswa Nasional (LKP Prestasi Nusantara)', startX + 12, signY + 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(5, 150, 105);
  doc.text('DOKUMEN SAH ELEKTRONIK · TANPA TANDA TANGAN BASAH', startX + cardWidth - 12, signY + 2, { align: 'right' });

  // Save the PDF file to user browser
  const filename = `Kartu_Ujian_OSN_2026_${student.id}_${student.fullName.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
}
