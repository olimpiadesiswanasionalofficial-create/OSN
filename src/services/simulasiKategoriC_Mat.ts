import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori C: SMP/MTs - Matematika (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_C_MAT: QuestionItem[] = [
  {
    id: 'SIM-C-MAT-01',
    number: 1,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hasil dari (-8) + 12 adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Operasi Bilangan Bulat', '(-8) + 12 = ?', '#2563EB',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="70" height="50" rx="8" fill="#DBEAFE"/><text x="45" y="52" font-size="20" font-weight="bold" fill="#1D4ED8" text-anchor="middle">-8</text><text x="95" y="55" font-size="24" font-weight="bold" fill="#1E293B">+</text><rect x="115" y="20" width="70" height="50" rx="8" fill="#DBEAFE"/><text x="150" y="52" font-size="20" font-weight="bold" fill="#1D4ED8" text-anchor="middle">12</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '-4' }, { key: 'B', text: '4' }, { key: 'C', text: '-20' }, { key: 'D', text: '20' }],
    correctAnswer: 'B',
    explanation: '(-8) + 12 = 12 - 8 = 4.'
  },
  {
    id: 'SIM-C-MAT-02',
    number: 2,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah nilai x dari persamaan linear sederhana 2x + 4 = 10?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Aljabar Dasar', '2x + 4 = 10', '#16A34A',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#DCFCE7"/><text x="100" y="55" font-size="18" font-weight="bold" fill="#15803D" text-anchor="middle">2x + 4 = 10</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }, { key: 'D', text: '5' }],
    correctAnswer: 'B',
    explanation: '2x = 10 - 4 = 6, sehingga x = 6 / 2 = 3.'
  },
  {
    id: 'SIM-C-MAT-03',
    number: 3,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah besar sudut siku-siku?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sudut Geometri', 'Sudut Siku-siku', '#D97706',
        '<g transform="translate(130, 20)"><line x1="30" y1="90" x2="110" y2="90" stroke="#D97706" stroke-width="4"/><line x1="30" y1="90" x2="30" y2="15" stroke="#D97706" stroke-width="4"/><rect x="30" y="70" width="20" height="20" fill="none" stroke="#B45309" stroke-width="2"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '45°' }, { key: 'B', text: '90°' }, { key: 'C', text: '180°' }, { key: 'D', text: '360°' }],
    correctAnswer: 'B',
    explanation: 'Sudut siku-siku besarnya tepat 90°.'
  },
  {
    id: 'SIM-C-MAT-04',
    number: 4,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bentuk sederhana dari 3a + 5a adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bentuk Aljabar', '3a + 5a = ?', '#7C3AED',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#EDE9FE"/><text x="100" y="55" font-size="18" font-weight="bold" fill="#6D28D9" text-anchor="middle">3a + 5a = 8a</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '8a' }, { key: 'B', text: '8a²' }, { key: 'C', text: '15a' }, { key: 'D', text: '2a' }],
    correctAnswer: 'A',
    explanation: 'Suku sejenis dijumlahkan koefisiennya: (3 + 5)a = 8a.'
  },
  {
    id: 'SIM-C-MAT-05',
    number: 5,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Luas segitiga dengan panjang alas 10 cm dan tinggi 6 cm adalah... (L = ½ × alas × tinggi)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Luas Segitiga', 'a = 10, t = 6', '#0284C7',
        '<g transform="translate(130, 20)"><polygon points="65,15 15,95 115,95" fill="#E0F2FE" stroke="#0284C7" stroke-width="3"/><line x1="65" y1="15" x2="65" y2="95" stroke="#0369A1" stroke-width="2" stroke-dasharray="4,3"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '30 cm²' }, { key: 'B', text: '60 cm²' }, { key: 'C', text: '16 cm²' }, { key: 'D', text: '25 cm²' }],
    correctAnswer: 'A',
    explanation: 'L = ½ × 10 × 6 = 30 cm².'
  },
  {
    id: 'SIM-C-MAT-06',
    number: 6,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah nilai dari √49 (akar kuadrat dari 49)?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bilangan Berpangkat', '√49 = ?', '#DC2626',
        '<g transform="translate(120, 20)"><rect x="25" y="15" width="90" height="80" rx="14" fill="#FEE2E2"/><text x="70" y="65" font-size="28" font-weight="900" fill="#B91C1C" text-anchor="middle">√49</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '6' }, { key: 'B', text: '7' }, { key: 'C', text: '8' }, { key: 'D', text: '9' }],
    correctAnswer: 'B',
    explanation: '7 × 7 = 49, maka √49 = 7.'
  },
  {
    id: 'SIM-C-MAT-07',
    number: 7,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah sudut dalam pada sembarang segitiga?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Teorema Sudut', 'Jumlah Sudut Segitiga', '#059669',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#D1FAE5"/><text x="100" y="55" font-size="18" font-weight="bold" fill="#047857" text-anchor="middle">A + B + C = 180°</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '90°' }, { key: 'B', text: '180°' }, { key: 'C', text: '270°' }, { key: 'D', text: '360°' }],
    correctAnswer: 'B',
    explanation: 'Total ketiga sudut dalam suatu segitiga selalu sama dengan 180°.'
  },
  {
    id: 'SIM-C-MAT-08',
    number: 8,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah hasil dari 2³ (dua pangkat tiga)?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Eksponen', '2³ = 2 × 2 × 2', '#EA580C',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#FFEDD5"/><text x="100" y="55" font-size="18" font-weight="bold" fill="#C2410C" text-anchor="middle">2³ = 8</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '6' }, { key: 'B', text: '8' }, { key: 'C', text: '9' }, { key: 'D', text: '16' }],
    correctAnswer: 'B',
    explanation: '2³ = 2 × 2 × 2 = 8.'
  },
  {
    id: 'SIM-C-MAT-09',
    number: 9,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Bilangan prima terkecil adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Teori Bilangan', 'Bilangan Prima', '#4F46E5',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="40" fill="#EEF2FF" stroke="#4F46E5" stroke-width="4"/><text x="65" y="75" font-size="32" font-weight="900" fill="#312E81" text-anchor="middle">2</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }, { key: 'D', text: '5' }],
    correctAnswer: 'B',
    explanation: '2 adalah bilangan prima pertama dan satu-satunya bilangan prima genap.'
  },
  {
    id: 'SIM-C-MAT-10',
    number: 10,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Titik pusat koordinat Cartesius terletak pada koordinat...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Koordinat Cartesius', 'Titik Asal O(0,0)', '#0891B2',
        '<g transform="translate(110, 20)"><line x1="20" y1="65" x2="140" y2="65" stroke="#0891B2" stroke-width="2"/><line x1="80" y1="10" x2="80" y2="120" stroke="#0891B2" stroke-width="2"/><circle cx="80" cy="65" r="5" fill="#DC2626"/><text x="95" y="60" font-size="11" font-weight="bold" fill="#0891B2">(0,0)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '(0, 0)' }, { key: 'B', text: '(1, 1)' }, { key: 'C', text: '(0, 1)' }, { key: 'D', text: '(1, 0)' }],
    correctAnswer: 'A',
    explanation: 'Titik pusat koordinat (origin) bernilai x = 0 dan y = 0 atau (0, 0).'
  },
  {
    id: 'SIM-C-MAT-11',
    number: 11,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Nilai dari 25% jika diubah ke bentuk pecahan desimal adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Persentase & Desimal', '25% = 0,25', '#10B981',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#D1FAE5"/><text x="100" y="55" font-size="18" font-weight="bold" fill="#047857" text-anchor="middle">25% = 0,25</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '0,25' }, { key: 'B', text: '2,5' }, { key: 'C', text: '0,025' }, { key: 'D', text: '25,0' }],
    correctAnswer: 'A',
    explanation: '25% = 25 / 100 = 0,25.'
  },
  {
    id: 'SIM-C-MAT-12',
    number: 12,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah keliling lingkaran berdiameter 14 cm dengan π = 22/7? (K = π × d)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Keliling Lingkaran', 'd = 14 cm', '#6366F1',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#EEF2FF" stroke="#4F46E5" stroke-width="3"/><line x1="20" y1="65" x2="110" y2="65" stroke="#4F46E5" stroke-width="2" stroke-dasharray="4,2"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '22 cm' }, { key: 'B', text: '44 cm' }, { key: 'C', text: '88 cm' }, { key: 'D', text: '154 cm' }],
    correctAnswer: 'B',
    explanation: 'K = 22/7 × 14 = 44 cm.'
  },
  {
    id: 'SIM-C-MAT-13',
    number: 13,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Himpunan bilangan asli di bawah 4 adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Himpunan Bilangan', '{1, 2, 3}', '#F59E0B',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#FEF3C7"/><text x="100" y="55" font-size="18" font-weight="bold" fill="#B45309" text-anchor="middle">{1, 2, 3}</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '{1, 2, 3}' }, { key: 'B', text: '{0, 1, 2, 3}' }, { key: 'C', text: '{1, 2, 3, 4}' }, { key: 'D', text: '{2, 3}' }],
    correctAnswer: 'A',
    explanation: 'Bilangan asli dimulai dari 1, sehingga bilangan asli kurang dari 4 adalah {1, 2, 3}.'
  },
  {
    id: 'SIM-C-MAT-14',
    number: 14,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Sebuah segitiga siku-siku memiliki sisi tegak 3 cm dan 4 cm. Panjang sisi miringnya (hipotenusa) adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Tripel Pythagoras', '3, 4, 5', '#EF4444',
        '<g transform="translate(130, 20)"><polygon points="20,95 20,25 95,95" fill="#FEE2E2" stroke="#DC2626" stroke-width="3"/><text x="10" y="60" font-size="11" font-weight="bold" fill="#991B1B">3</text><text x="55" y="110" font-size="11" font-weight="bold" fill="#991B1B">4</text><text x="65" y="55" font-size="11" font-weight="bold" fill="#DC2626">c=?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '5 cm' }, { key: 'B', text: '6 cm' }, { key: 'C', text: '7 cm' }, { key: 'D', text: '8 cm' }],
    correctAnswer: 'A',
    explanation: 'c = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.'
  },
  {
    id: 'SIM-C-MAT-15',
    number: 15,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Nilai dari 10⁰ (sepuluh pangkat nol) adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Aturan Eksponen', 'a⁰ = 1', '#8B5CF6',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#EDE9FE"/><text x="100" y="55" font-size="20" font-weight="bold" fill="#6D28D9" text-anchor="middle">10⁰ = 1</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '10' }, { key: 'D', text: 'Tak terdefinisi' }],
    correctAnswer: 'B',
    explanation: 'Setiap bilangan bukan nol yang dipangkatkan 0 bernilai 1.'
  },
  {
    id: 'SIM-C-MAT-16',
    number: 16,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah rata-rata (mean) dari data: 4, 6, 8?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Statistika Dasar', 'Mean = (4+6+8)/3', '#059669',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#D1FAE5"/><text x="100" y="55" font-size="18" font-weight="bold" fill="#047857" text-anchor="middle">Mean = 6</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '5' }, { key: 'B', text: '6' }, { key: 'C', text: '7' }, { key: 'D', text: '8' }],
    correctAnswer: 'B',
    explanation: 'Rata-rata = (4 + 6 + 8) / 3 = 18 / 3 = 6.'
  },
  {
    id: 'SIM-C-MAT-17',
    number: 17,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Jika skala peta adalah 1 : 100.000, maka 1 cm pada peta mewakili jarak sebenarnya...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perbandingan Skala', '1 cm : 1 km', '#0284C7',
        '<g transform="translate(100, 25)"><rect x="15" y="20" width="170" height="55" rx="10" fill="#E0F2FE"/><text x="100" y="55" font-size="16" font-weight="bold" fill="#0369A1" text-anchor="middle">100.000 cm = 1 km</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1 km' }, { key: 'B', text: '10 km' }, { key: 'C', text: '100 m' }, { key: 'D', text: '10 m' }],
    correctAnswer: 'A',
    explanation: '100.000 cm = 1.000 m = 1 km.'
  },
  {
    id: 'SIM-C-MAT-18',
    number: 18,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Garis yang menghubungkan dua titik pada lingkaran dan melalui titik pusat disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Unsur Lingkaran', 'Diameter Lingkaran', '#D97706',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="45" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/><line x1="20" y1="65" x2="110" y2="65" stroke="#B45309" stroke-width="3"/><circle cx="65" cy="65" r="4" fill="#78350F"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Diameter' }, { key: 'B', text: 'Jari-jari' }, { key: 'C', text: 'Tali busur' }, { key: 'D', text: 'Apotema' }],
    correctAnswer: 'A',
    explanation: 'Diameter atau garis tengah membagi lingkaran menjadi dua sama besar dan melewati titik pusat.'
  },
  {
    id: 'SIM-C-MAT-19',
    number: 19,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Peluang munculnya mata dadu angka 4 pada pelemparan satu buah dadu adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Teori Peluang', '1 dari 6 sisi', '#DC2626',
        '<g transform="translate(120, 20)"><rect x="25" y="15" width="85" height="85" rx="12" fill="#FEE2E2" stroke="#DC2626" stroke-width="3"/><text x="67" y="68" font-size="28" font-weight="bold" fill="#991B1B" text-anchor="middle">1/6</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1/6' }, { key: 'B', text: '1/4' }, { key: 'C', text: '4/6' }, { key: 'D', text: '1/2' }],
    correctAnswer: 'A',
    explanation: 'Dadu memiliki 6 sisi bernomor 1-6, sehingga peluang angka 4 adalah 1/6.'
  },
  {
    id: 'SIM-C-MAT-20',
    number: 20,
    category: 'Kategori C',
    subject: 'Matematika',
    level: 'SMP/MTs',
    stage: 'simulasi',
    curriculum: 'Cambridge Lower Secondary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Volume kubus dengan panjang rusuk 3 cm adalah... (V = s³)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Volume Kubus', 's = 3 cm', '#16A34A',
        '<g transform="translate(130, 20)"><rect x="25" y="35" width="60" height="60" fill="#DCFCE7" stroke="#16A34A" stroke-width="3"/><polygon points="25,35 45,15 105,15 85,35" fill="#BBF7D0" stroke="#16A34A" stroke-width="2"/><polygon points="85,35 105,15 105,75 85,95" fill="#86EFAC" stroke="#16A34A" stroke-width="2"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '9 cm³' }, { key: 'B', text: '18 cm³' }, { key: 'C', text: '27 cm³' }, { key: 'D', text: '36 cm³' }],
    correctAnswer: 'C',
    explanation: 'Volume = 3 × 3 × 3 = 27 cm³.'
  }
];
