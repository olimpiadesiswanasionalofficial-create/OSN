import React, { useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
  PDFViewer
} from '@react-pdf/renderer';
import { X, Download, Printer, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { ParticipantRecord } from '../services/participantDb';
import { showToast } from './NotificationToast';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FEFCF7',
    padding: 24,
    position: 'relative'
  },
  outerBorder: {
    border: '2.5pt solid #D4AF37',
    padding: 6,
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  innerBorder: {
    border: '0.8pt solid #B48C1E',
    backgroundColor: '#FFFDF9',
    height: '100%',
    width: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8
  },
  logoOsn: {
    width: 65,
    height: 65,
    objectFit: 'contain'
  },
  logoLkp: {
    width: 65,
    height: 65,
    objectFit: 'contain'
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8
  },
  orgTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#966E19',
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  orgSubtitle: {
    fontSize: 6.8,
    color: '#756F68',
    marginTop: 2,
    textAlign: 'center'
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'heavy',
    color: '#1A1615',
    marginTop: 6,
    letterSpacing: 1,
    textAlign: 'center'
  },
  stageTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#B48C1E',
    marginTop: 3,
    textAlign: 'center'
  },
  certNumber: {
    fontSize: 7.2,
    color: '#66615B',
    marginTop: 2,
    textAlign: 'center'
  },
  dividerLine: {
    width: '65%',
    height: 1,
    backgroundColor: '#D4AF37',
    marginVertical: 4
  },
  recipientIntro: {
    fontSize: 8,
    color: '#5A5550',
    marginTop: 4,
    textAlign: 'center'
  },
  recipientName: {
    fontSize: 20,
    fontWeight: 'heavy',
    color: '#1A1615',
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  nameAccent: {
    width: '55%',
    height: 1.5,
    backgroundColor: '#D4AF37',
    marginTop: 3
  },
  schoolInfo: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#966E19',
    marginTop: 4,
    textAlign: 'center'
  },
  studentMeta: {
    fontSize: 7.5,
    color: '#66615B',
    marginTop: 2,
    textAlign: 'center'
  },
  rankBox: {
    backgroundColor: '#FFFDF5',
    border: '0.8pt solid #D4AF37',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginTop: 5,
    alignItems: 'center',
    width: '85%'
  },
  rankIntro: {
    fontSize: 7.5,
    color: '#756F68',
    marginBottom: 2
  },
  rankBadge: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#B48C1E',
    textAlign: 'center',
    letterSpacing: 0.5
  },
  scoreDetails: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1A1615',
    marginTop: 4,
    textAlign: 'center'
  },
  statementText: {
    fontSize: 6.8,
    color: '#46413C',
    textAlign: 'center',
    marginTop: 4,
    maxWidth: '90%'
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 8
  },
  signatureCol: {
    alignItems: 'center',
    width: '32%',
    position: 'relative'
  },
  signTopDate: {
    fontSize: 7.5,
    color: '#5A5550',
    marginBottom: 2,
    textAlign: 'center'
  },
  signTitle: {
    fontSize: 7.8,
    color: '#1A1615',
    marginBottom: 6,
    textAlign: 'center'
  },
  digitalSignStroke: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#1E293B',
    height: 24,
    textAlign: 'center',
    paddingTop: 5
  },
  stempelImg: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 6,
    right: 14,
    zIndex: 10,
    opacity: 0.92
  },
  signLine: {
    width: '85%',
    height: 0.8,
    backgroundColor: '#94A3B8',
    marginVertical: 4
  },
  signNameBottom: {
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#1A1615',
    textAlign: 'center'
  },
  centerSealCol: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%'
  },
  sealBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1pt solid #B48C1E'
  },
  sealInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sealText: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#966E19',
    textAlign: 'center'
  },
  qrVerifyText: {
    fontSize: 5.8,
    color: '#78736E',
    marginTop: 4,
    textAlign: 'center'
  }
});

export interface CertificateDocProps {
  student: ParticipantRecord;
  rankTitle?: string;
  stageTitle?: string;
  subject?: string;
  executionDate?: string;
  score?: number;
}

export const CertificatePdfDocument: React.FC<CertificateDocProps> = ({
  student,
  rankTitle,
  stageTitle,
  subject,
  executionDate = '20 September 2026',
  score
}) => {
  const resolvedScore = score !== undefined
    ? score
    : student.finalExam?.score !== undefined
    ? student.finalExam.score
    : student.penyisihanExam?.score !== undefined
    ? student.penyisihanExam.score
    : student.simulatedExam?.score !== undefined
    ? student.simulatedExam.score
    : 85;

  const isFinalStage = !!student.finalExam || (stageTitle && stageTitle.toLowerCase().includes('final'));
  const stage = stageTitle || (isFinalStage ? 'BABAK FINAL NASIONAL' : 'BABAK PENYISIHAN NASIONAL');

  let defaultRank = 'Peserta Lolos Seleksi';
  if (student.championRank && student.championRank !== 'Belum Dinilai' && student.championRank !== 'Belum Ditetapkan') {
    defaultRank = student.championRank;
  } else if (student.qualificationStatus === 'lolos') {
    defaultRank = 'Lolos Babak Final (Finalis Nasional)';
  }

  const rawRank = rankTitle || defaultRank;
  const isFinalistRank = rawRank.toUpperCase().includes('FINALIS') || rawRank.toUpperCase().includes('LOLOS');
  const formattedRank = isFinalistRank
    ? '& LOLOS BABAK FINAL (FINALIS NASIONAL) &'
    : `★  ${rawRank.toUpperCase()}  ★`;

  const examSubject = subject || (student.subjects && student.subjects[0]) || 'Matematika & Sains';
  const certNumber = `OSN/${isFinalStage ? 'FNL' : 'PYS'}/2026/${student.id.replace(/[^0-9]/g, '').slice(-5) || '10882'}`;

  return (
    <Document title={`Sertifikat_${student.fullName}_OSN2026`}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            {/* Header Logos & Title */}
            <View style={styles.headerRow}>
              <Image src="/logo-osn.png" style={styles.logoOsn} />
              <View style={styles.headerCenter}>
                <Text style={styles.orgTitle}>LEMBAGA KURSUS DAN PELATIHAN PRESTASI NUSANTARA</Text>
                <Text style={styles.orgSubtitle}>
                  Izin Operasional Resmi Kemendikbudristek · Terakreditasi Standar Nasional & Kemenkumham RI
                </Text>
                <Text style={styles.mainTitle}>SERTIFIKAT PENGHARGAAN RESMI</Text>
                <Text style={styles.stageTitle}>{stage} · OLIMPIADE SISWA NASIONAL (OSN 2026)</Text>
                <Text style={styles.certNumber}>Nomor Sertifikat: {certNumber}</Text>
              </View>
              <Image src="/logo-lkp.png" style={styles.logoLkp} />
            </View>

            <View style={styles.dividerLine} />

            {/* Recipient */}
            <Text style={styles.recipientIntro}>Diberikan dengan penuh kehormatan dan apresiasi setinggi-tingginya kepada:</Text>
            <Text style={styles.recipientName}>{student.fullName.toUpperCase()}</Text>
            <View style={styles.nameAccent} />

            <Text style={styles.schoolInfo}>{student.schoolName || 'Siswa Berprestasi Nasional'}</Text>
            <Text style={styles.studentMeta}>
              Nomor Peserta: {student.id} · Jenjang: {student.level} · Domisili: {student.cityProvince || 'Indonesia'}
            </Text>

            {/* Predicate & Rank Box */}
            <View style={styles.rankBox}>
              <Text style={styles.rankIntro}>Dinyatakan Lulus dan Meraih Predikat Penghargaan:</Text>
              <Text style={styles.rankBadge}>{formattedRank}</Text>
            </View>

            <Text style={styles.scoreDetails}>
              Bidang Lomba: {examSubject}  |  Skor Akhir: {resolvedScore}/100
            </Text>

            <Text style={styles.statementText}>
              Atas dedikasi, integritas akademik, dan penguasaan materi yang ditunjukkan pada pelaksanaan Computer Based Test (CBT)
              Olimpiade Siswa Nasional (OSN 2026) yang diselenggarakan dengan moto &quot;Berani Mencoba Untuk Masa Depan Gemilang&quot;.
            </Text>

            {/* Footer Signatures & Official Stamp */}
            <View style={styles.footerRow}>
              {/* Left Signature: Panitia Pelaksana Pusat */}
              <View style={styles.signatureCol}>
                <Text style={styles.signTopDate}>Ditetapkan pada Tanggal : {executionDate}</Text>
                <Text style={styles.signTitle}>Panitia Pelaksana OSN 2026</Text>
                <Text style={styles.digitalSignStroke}>Panitia Pelaksana</Text>
                <View style={styles.signLine} />
                <Text style={styles.signNameBottom}>Panitia Pelaksana Pusat</Text>
              </View>

              {/* Center Seal */}
              <View style={styles.centerSealCol}>
                <View style={styles.sealBadge}>
                  <View style={styles.sealInner}>
                    <Text style={styles.sealText}>OSN 2026</Text>
                    <Text style={{ fontSize: 5, color: '#966E19' }}>VERIFIED</Text>
                  </View>
                </View>
                <Text style={styles.qrVerifyText}>[QR-VERIFY: https://olimpiadesiswanasional.id/verify/{student.id}]</Text>
              </View>

              {/* Right Signature: Mengetahui & Mengesahkan, Direktur LKP Prestasi Nusantara */}
              <View style={styles.signatureCol}>
                <Text style={styles.signTopDate}>Mengetahui & Mengesahkan,</Text>
                <Text style={styles.signTitle}>Direktur LKP Prestasi Nusantara</Text>
                <Image src="/stempel-lkp.png" style={styles.stempelImg} />
                <View style={{ height: 24 }} />
                <View style={styles.signLine} />
                <Text style={styles.signNameBottom}>Direktur LKP Prestasi Nusantara</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export interface CertificatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ParticipantRecord;
  rankTitle?: string;
  stageTitle?: string;
}

export const CertificatePdfPreviewModal: React.FC<CertificatePreviewModalProps> = ({
  isOpen,
  onClose,
  student,
  rankTitle,
  stageTitle
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handlePrintOrDownload = async () => {
    setIsGenerating(true);
    try {
      showToast('info', 'Menyiapkan Dokumen PDF', 'Sedang memproses dokumen cetak resolusi tinggi...');
      const blob = await pdf(
        <CertificatePdfDocument
          student={student}
          rankTitle={rankTitle}
          stageTitle={stageTitle}
        />
      ).toBlob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Sertifikat_Digital_OSN_2026_${student.fullName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('success', 'Sertifikat Berhasil Diunduh', `Sertifikat Digital resmi untuk ${student.fullName} berhasil dicetak.`);
    } catch (err: any) {
      console.error('Print to PDF error:', err);
      showToast('error', 'Gagal Mencetak Sertifikat', err?.message || 'Terjadi kendala saat menghasilkan dokumen PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#D4AF37]/40">
        {/* Top Modal Header */}
        <div className="p-4 sm:p-5 bg-[#1A1615] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Preview Sertifikat Digital Resmi OSN 2026
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                  React-PDF Live
                </span>
              </h3>
              <p className="text-xs text-neutral-300">
                Penerima: <strong className="text-white">{student.fullName}</strong> ({student.id}) • Terverifikasi LKP Prestasi Nusantara
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintOrDownload}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#FFF2B2] text-[#1A1615] flex items-center gap-1.5 shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Memproses PDF...' : 'Print to PDF (Unduh)'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              aria-label="Tutup Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live PDF Viewer Container */}
        <div className="flex-1 bg-neutral-900/90 w-full h-full relative overflow-hidden flex items-center justify-center">
          <PDFViewer
            width="100%"
            height="100%"
            showToolbar={true}
            className="w-full h-full border-none"
          >
            <CertificatePdfDocument
              student={student}
              rankTitle={rankTitle}
              stageTitle={stageTitle}
            />
          </PDFViewer>
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#756F68]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Format Resmi: Bebas Nama Pejabat Asli • Mengetahui &amp; Mengesahkan Direktur LKP Prestasi Nusantara</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintOrDownload}
              className="text-amber-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Sekarang Langsung di Browser</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
