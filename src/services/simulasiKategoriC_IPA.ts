import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori C: SMP/MTs - IPA / Sains (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_C_IPA: QuestionItem[] = [
  {
    id: 'SIM-C-IPA-01',
    number: 1,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Unit fungsional dan struktural terkecil penyusun tubuh makhluk hidup adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Biologi Sel', 'Struktur Sel', '#10B981',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#D1FAE5" stroke="#059669" stroke-width="3"/><circle cx="65" cy="65" r="16" fill="#047857"/><text x="65" y="70" font-size="10" font-weight="bold" fill="#FFF" text-anchor="middle">SEL</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sel' }, { key: 'B', text: 'Jaringan' }, { key: 'C', text: 'Organ' }, { key: 'D', text: 'Sistem Organ' }],
    correctAnswer: 'A',
    explanation: 'Sel merupakan unit struktural dan fungsional paling kecil dari makhluk hidup.'
  },
  {
    id: 'SIM-C-IPA-02',
    number: 2,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Satuan Internasional (SI) untuk besaran massa benda adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Besaran & Satuan', 'Satuan SI Massa', '#2563EB',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#DBEAFE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#1D4ED8" text-anchor="middle">KILOGRAM (kg)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kilogram (kg)' }, { key: 'B', text: 'Gram (g)' }, { key: 'C', text: 'Ton' }, { key: 'D', text: 'Ons' }],
    correctAnswer: 'A',
    explanation: 'Dalam Sistem Internasional (SI), satuan standar massa adalah kilogram (kg).'
  },
  {
    id: 'SIM-C-IPA-03',
    number: 3,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Rumus kimia untuk molekul air murni adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kimia Dasar', 'Molekul Air', '#0284C7',
        '<g transform="translate(110, 20)"><circle cx="70" cy="55" r="28" fill="#38BDF8"/><circle cx="35" cy="80" r="16" fill="#BAE6FD"/><circle cx="105" cy="80" r="16" fill="#BAE6FD"/><text x="70" y="62" font-size="16" font-weight="900" fill="#0C4A6E" text-anchor="middle">O</text><text x="35" y="85" font-size="12" font-weight="900" fill="#0C4A6E" text-anchor="middle">H</text><text x="105" y="85" font-size="12" font-weight="900" fill="#0C4A6E" text-anchor="middle">H</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'H₂O' }, { key: 'B', text: 'CO₂' }, { key: 'C', text: 'NaCl' }, { key: 'D', text: 'O₂' }],
    correctAnswer: 'A',
    explanation: 'Air tersusun dari dua atom hidrogen dan satu atom oksigen (H₂O).'
  },
  {
    id: 'SIM-C-IPA-04',
    number: 4,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hukum Newton I menyatakan bahwa jika resultan gaya sama dengan nol, benda diam akan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Hukum Newton I', 'Inersia / Kelembaman', '#7C3AED',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#EDE9FE"/><text x="90" y="55" font-size="15" font-weight="bold" fill="#6D28D9" text-anchor="middle">∑F = 0 (Tetap Diam)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Tetap diam' }, { key: 'B', text: 'Melesat cepat' }, { key: 'C', text: 'Berubah bentuk' }, { key: 'D', text: 'Meleleh' }],
    correctAnswer: 'A',
    explanation: 'Hukum I Newton (Kelembaman): Benda yang diam akan tetap diam jika resultan gaya yang bekerja sama dengan nol.'
  },
  {
    id: 'SIM-C-IPA-05',
    number: 5,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Organ tubuh manusia yang berfungsi memompa darah ke seluruh tubuh adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sistem Peredaran Darah', 'Jantung Manusia', '#DC2626',
        '<g transform="translate(130, 20)"><path d="M65,40 C65,20 45,10 30,25 C10,45 25,75 65,105 C105,75 120,45 100,25 C85,10 65,20 65,40 Z" fill="#EF4444"/><text x="65" y="65" font-size="11" font-weight="bold" fill="#FFF" text-anchor="middle">JANTUNG</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Jantung' }, { key: 'B', text: 'Lambung' }, { key: 'C', text: 'Ginjal' }, { key: 'D', text: 'Hati' }],
    correctAnswer: 'A',
    explanation: 'Jantung berfungsi memompa darah bersih beroksigen ke seluruh jaringan tubuh.'
  },
  {
    id: 'SIM-C-IPA-06',
    number: 6,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Peristiwa perpindahan zat dari konsentrasi tinggi ke rendah secara spontan disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Transpor Zat', 'Difusi', '#059669',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#D1FAE5"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">DIFUSI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Difusi' }, { key: 'B', text: 'Endositosis' }, { key: 'C', text: 'Eksositosis' }, { key: 'D', text: 'Filtrasi' }],
    correctAnswer: 'A',
    explanation: 'Difusi adalah perpindahan molekul dari konsentrasi tinggi ke konsentrasi lebih rendah.'
  },
  {
    id: 'SIM-C-IPA-07',
    number: 7,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Gas yang diserap oleh tumbuhan untuk proses fotosintesis adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Fotosintesis', 'Gas Karbon Dioksida', '#047857',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#A7F3D0"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#065F46" text-anchor="middle">CO₂ (Karbon Dioksida)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Karbon dioksida (CO₂)' }, { key: 'B', text: 'Oksigen (O₂)' }, { key: 'C', text: 'Nitrogen (N₂)' }, { key: 'D', text: 'Helium (He)' }],
    correctAnswer: 'A',
    explanation: 'Tumbuhan menyerap karbon dioksida dan air untuk menghasilkan glukosa serta oksigen.'
  },
  {
    id: 'SIM-C-IPA-08',
    number: 8,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Titik beku air murni pada skala termometer Celcius adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Termometer', 'Titik Beku Air', '#0284C7',
        '<g transform="translate(130, 20)"><rect x="45" y="15" width="40" height="90" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="3"/><text x="65" y="70" font-size="20" font-weight="bold" fill="#0369A1" text-anchor="middle">0°C</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '0°C' }, { key: 'B', text: '32°C' }, { key: 'C', text: '100°C' }, { key: 'D', text: '-10°C' }],
    correctAnswer: 'A',
    explanation: 'Pada skala Celcius, titik beku air ditetapkan sebesar 0°C dan titik didihnya 100°C.'
  },
  {
    id: 'SIM-C-IPA-09',
    number: 9,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Hubungan antara tegangan (V), arus listrik (I), dan hambatan (R) dirumuskan oleh Hukum Ohm sebagai...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Hukum Ohm', 'V = I × R', '#D97706',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEF3C7"/><text x="90" y="55" font-size="20" font-weight="bold" fill="#B45309" text-anchor="middle">V = I × R</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'V = I × R' }, { key: 'B', text: 'V = I / R' }, { key: 'C', text: 'I = V × R' }, { key: 'D', text: 'R = V × I' }],
    correctAnswer: 'A',
    explanation: 'Hukum Ohm berbunyi V = I × R (Tegangan = Kuat arus × Hambatan).'
  },
  {
    id: 'SIM-C-IPA-10',
    number: 10,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Organ pernapasan tempat terjadinya pertukaran oksigen dan karbon dioksida di dalam paru-paru adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Anatomi Paru-paru', 'Alveolus', '#F43F5E',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#FCE7F3"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#BE185D" text-anchor="middle">ALVEOLUS</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Alveolus' }, { key: 'B', text: 'Bronkus' }, { key: 'C', text: 'Trakea' }, { key: 'D', text: 'Laring' }],
    correctAnswer: 'A',
    explanation: 'Alveolus berupa gelembung halus tempat difusi oksigen dan karbon dioksida.'
  },
  {
    id: 'SIM-C-IPA-11',
    number: 11,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Zat yang memiliki pH kurang dari 7 bersifat...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Skala pH', 'pH < 7', '#EA580C',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FFEDD5"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#C2410C" text-anchor="middle">ASAM (pH &lt; 7)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Asam' }, { key: 'B', text: 'Basa' }, { key: 'C', text: 'Netral' }, { key: 'D', text: 'Garam' }],
    correctAnswer: 'A',
    explanation: 'Larutan dengan nilai pH di bawah 7 bersifat asam (pH 7 netral, pH > 7 basa).'
  },
  {
    id: 'SIM-C-IPA-12',
    number: 12,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda yang bergetar akan menghasilkan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Gelombang Bunyi', 'Getaran Menghasilkan Bunyi', '#6366F1',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#EEF2FF"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#4338CA" text-anchor="middle">BUNYI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bunyi' }, { key: 'B', text: 'Cahaya' }, { key: 'C', text: 'Magnet' }, { key: 'D', text: 'Listrik' }],
    correctAnswer: 'A',
    explanation: 'Semua bunyi dihasilkan oleh benda yang bergetar.'
  },
  {
    id: 'SIM-C-IPA-13',
    number: 13,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah pasang kromosom pada sel tubuh (somatik) manusia normal?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Genetika', '23 Pasang (46 Buah)', '#10B981',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#D1FAE5"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">23 PASANG</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '23 pasang (46 buah)' }, { key: 'B', text: '46 pasang' }, { key: 'C', text: '12 pasang' }, { key: 'D', text: '20 pasang' }],
    correctAnswer: 'A',
    explanation: 'Manusia normal memiliki 46 kromosom atau 23 pasang kromosom.'
  },
  {
    id: 'SIM-C-IPA-14',
    number: 14,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Energi yang dimiliki oleh suatu benda karena geraknya disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Energi Mekanik', 'Energi Kinetik', '#2563EB',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#DBEAFE"/><text x="80" y="55" font-size="15" font-weight="bold" fill="#1D4ED8" text-anchor="middle">ENERGI KINETIK</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Energi kinetik' }, { key: 'B', text: 'Energi potensial' }, { key: 'C', text: 'Energi kimia' }, { key: 'D', text: 'Energi nuklir' }],
    correctAnswer: 'A',
    explanation: 'Energi kinetik adalah energi yang timbul akibat pergerakan benda (Ek = ½ mv²).'
  },
  {
    id: 'SIM-C-IPA-15',
    number: 15,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Bagian mata yang mengatur banyaknya cahaya yang masuk ke mata adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Indra Penglihatan', 'Pupil & Iris', '#3B82F6',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#EEF2FF" stroke="#3B82F6" stroke-width="3"/><circle cx="65" cy="65" r="22" fill="#1D4ED8"/><circle cx="65" cy="65" r="10" fill="#0F172A"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pupil' }, { key: 'B', text: 'Retina' }, { key: 'C', text: 'Sklera' }, { key: 'D', text: 'Kornea' }],
    correctAnswer: 'A',
    explanation: 'Pupil dapat membesar dan mengecil untuk mengatur jumlah cahaya yang masuk.'
  },
  {
    id: 'SIM-C-IPA-16',
    number: 16,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Organel sel yang sering dijuluki "pembangkit tenaga sel" (powerhouse of cell) adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Organel Sel', 'Mitokondria', '#D97706',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEF3C7"/><text x="90" y="55" font-size="16" font-weight="bold" fill="#B45309" text-anchor="middle">MITOKONDRIA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Mitokondria' }, { key: 'B', text: 'Ribosom' }, { key: 'C', text: 'Lisosom' }, { key: 'D', text: 'Badan Golgi' }],
    correctAnswer: 'A',
    explanation: 'Mitokondria menghasilkan ATP (energi) melalui proses respirasi selular.'
  },
  {
    id: 'SIM-C-IPA-17',
    number: 17,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Alat ukur yang digunakan untuk mengukur kuat arus listrik adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Instrumen Listrik', 'Amperemeter', '#0284C7',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#E0F2FE" stroke="#0284C7" stroke-width="3"/><text x="65" y="75" font-size="32" font-weight="900" fill="#0369A1" text-anchor="middle">A</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Amperemeter' }, { key: 'B', text: 'Voltmeter' }, { key: 'C', text: 'Ohmmeter' }, { key: 'D', text: 'Barometer' }],
    correctAnswer: 'A',
    explanation: 'Amperemeter mengukur kuat arus listrik dalam satuan Ampere.'
  },
  {
    id: 'SIM-C-IPA-18',
    number: 18,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Pembelahan sel yang menghasilkan sel anakan dengan jumlah kromosom separuh dari sel induk adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pembelahan Sel', 'Meiosis (n)', '#7C3AED',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#EDE9FE"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#6D28D9" text-anchor="middle">MEIOSIS</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Meiosis' }, { key: 'B', text: 'Mitosis' }, { key: 'C', text: 'Amitosis' }, { key: 'D', text: 'Biner' }],
    correctAnswer: 'A',
    explanation: 'Meiosis merupakan pembelahan reduksi menghasilkan gamet dengan kromosom haploid (n).'
  },
  {
    id: 'SIM-C-IPA-19',
    number: 19,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Contoh perubahan kimia yang menghasilkan zat baru di bawah ini adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perubahan Materi', 'Besi Berkarat', '#DC2626',
        '<g transform="translate(110, 25)"><rect x="10" y="20" width="160" height="60" rx="10" fill="#FEE2E2"/><text x="90" y="55" font-size="15" font-weight="bold" fill="#B91C1C" text-anchor="middle">BESI BERKARAT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Besi berkarat' }, { key: 'B', text: 'Es mencair' }, { key: 'C', text: 'Kertas dipotong' }, { key: 'D', text: 'Lilin meleleh' }],
    correctAnswer: 'A',
    explanation: 'Besi berkarat membentuk senyawa baru Fe₂O₃.xH₂O yang tidak dapat kembali ke bentuk semula.'
  },
  {
    id: 'SIM-C-IPA-20',
    number: 20,
    category: 'Kategori C',
    subject: 'IPA / Sains',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Hormon yang berfungsi mengatur kadar gula darah (glukosa) pada manusia adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sistem Endokrin', 'Insulin', '#059669',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#D1FAE5"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#047857" text-anchor="middle">INSULIN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Insulin' }, { key: 'B', text: 'Adrenalin' }, { key: 'C', text: 'Tiroksin' }, { key: 'D', text: 'Melatonin' }],
    correctAnswer: 'A',
    explanation: 'Insulin yang dihasilkan pankreas menurunkan dan mengendalikan kadar gula dalam darah.'
  }
];
