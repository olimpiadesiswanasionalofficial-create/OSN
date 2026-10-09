import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori B: SD/MI - Matematika (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_B_MAT: QuestionItem[] = [
  {
    id: 'SIM-B-MAT-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hasil dari 15 + 10 adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penjumlahan Dasar', '15 + 10 = ?', '#2563EB',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="60" height="50" rx="8" fill="#DBEAFE"/><text x="40" y="52" font-size="22" font-weight="bold" fill="#1D4ED8" text-anchor="middle">15</text><text x="90" y="55" font-size="24" font-weight="bold" fill="#1E293B">+</text><rect x="110" y="20" width="60" height="50" rx="8" fill="#DBEAFE"/><text x="140" y="52" font-size="22" font-weight="bold" fill="#1D4ED8" text-anchor="middle">10</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '20' }, { key: 'B', text: '25' }, { key: 'C', text: '30' }, { key: 'D', text: '15' }],
    correctAnswer: 'B',
    explanation: '15 + 10 = 25.'
  },
  {
    id: 'SIM-B-MAT-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bangun datar pada gambar memiliki 4 sisi sama panjang dan 4 sudut siku-siku. Bangun apakah ini?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Geometri Dasar', 'Persegi', '#16A34A',
        '<g transform="translate(140, 20)"><rect x="20" y="20" width="80" height="80" rx="4" fill="#DCFCE7" stroke="#16A34A" stroke-width="4"/><text x="60" y="65" font-size="13" font-weight="bold" fill="#166534" text-anchor="middle">4 Sisi Sama</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Persegi' }, { key: 'B', text: 'Segitiga' }, { key: 'C', text: 'Lingkaran' }, { key: 'D', text: 'Trapesium' }],
    correctAnswer: 'A',
    explanation: 'Bangun datar dengan 4 sisi yang sama panjang dan 4 sudut siku-siku adalah persegi.'
  },
  {
    id: 'SIM-B-MAT-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hasil dari 5 × 4 adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perkalian Dasar', '5 kelompok isi 4', '#D97706',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="55" height="50" rx="8" fill="#FEF3C7"/><text x="37" y="52" font-size="22" font-weight="bold" fill="#B45309" text-anchor="middle">5</text><text x="85" y="55" font-size="24" font-weight="bold" fill="#1E293B">×</text><rect x="105" y="20" width="55" height="50" rx="8" fill="#FEF3C7"/><text x="132" y="52" font-size="22" font-weight="bold" fill="#B45309" text-anchor="middle">4</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '16' }, { key: 'B', text: '20' }, { key: 'C', text: '24' }, { key: 'D', text: '25' }],
    correctAnswer: 'B',
    explanation: '5 × 4 = 20.'
  },
  {
    id: 'SIM-B-MAT-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Ibu memiliki 20 butir telur. Digunakan untuk membuat kue sebanyak 6 butir. Sisa telur Ibu adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pengurangan', '20 - 6 = ?', '#DC2626',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="60" height="50" rx="8" fill="#FEE2E2"/><text x="40" y="52" font-size="22" font-weight="bold" fill="#B91C1C" text-anchor="middle">20</text><text x="90" y="55" font-size="24" font-weight="bold" fill="#1E293B">-</text><rect x="110" y="20" width="60" height="50" rx="8" fill="#FEE2E2"/><text x="140" y="52" font-size="22" font-weight="bold" fill="#B91C1C" text-anchor="middle">6</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '12' }, { key: 'B', text: '14' }, { key: 'C', text: '16' }, { key: 'D', text: '18' }],
    correctAnswer: 'B',
    explanation: '20 - 6 = 14 butir telur tersisa.'
  },
  {
    id: 'SIM-B-MAT-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Nilai tempat angka 7 pada bilangan 375 adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Nilai Tempat', 'Bilangan 375', '#7C3AED',
        '<g transform="translate(110, 20)"><rect x="10" y="25" width="160" height="65" rx="12" fill="#EDE9FE"/><text x="90" y="68" font-size="36" font-weight="900" fill="#6D28D9" text-anchor="middle">3<tspan fill="#DC2626">7</tspan>5</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Satuan' }, { key: 'B', text: 'Puluhan' }, { key: 'C', text: 'Ratusan' }, { key: 'D', text: 'Ribuan' }],
    correctAnswer: 'B',
    explanation: 'Pada bilangan 375, angka 3 bernilai ratusan, angka 7 bernilai puluhan (70), dan angka 5 bernilai satuan.'
  },
  {
    id: 'SIM-B-MAT-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Jam dinding pada gambar menunjukkan pukul berapa ketika jarum pendek di angka 3 dan jarum panjang di angka 12?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pengukuran Waktu', 'Membaca Jam', '#0284C7',
        '<g transform="translate(140, 20)"><circle cx="60" cy="65" r="50" fill="#E0F2FE" stroke="#0284C7" stroke-width="4"/><line x1="60" y1="65" x2="60" y2="25" stroke="#0369A1" stroke-width="4"/><line x1="60" y1="65" x2="95" y2="65" stroke="#0369A1" stroke-width="5"/><circle cx="60" cy="65" r="4" fill="#0C4A6E"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pukul 03.00' }, { key: 'B', text: 'Pukul 12.00' }, { key: 'C', text: 'Pukul 06.00' }, { key: 'D', text: 'Pukul 09.00' }],
    correctAnswer: 'A',
    explanation: 'Jarum pendek di angka 3 dan jarum panjang di angka 12 menunjukkan tepat pukul 03.00.'
  },
  {
    id: 'SIM-B-MAT-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Pecahan satu perdua (setengah) ditulis dengan lambang...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pecahan Sederhana', 'Satu Perdua', '#059669',
        '<g transform="translate(140, 20)"><rect x="25" y="15" width="70" height="90" rx="12" fill="#D1FAE5"/><text x="60" y="50" font-size="28" font-weight="900" fill="#059669" text-anchor="middle">1</text><line x1="40" y1="60" x2="80" y2="60" stroke="#059669" stroke-width="4"/><text x="60" y="90" font-size="28" font-weight="900" fill="#059669" text-anchor="middle">2</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1/2' }, { key: 'B', text: '1/4' }, { key: 'C', text: '2/1' }, { key: 'D', text: '3/4' }],
    correctAnswer: 'A',
    explanation: 'Satu perdua atau setengah dilambangkan dengan pecahan 1/2.'
  },
  {
    id: 'SIM-B-MAT-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: '1 meter sama dengan berapa sentimeter (cm)?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Satuan Panjang', '1 Meter = ... cm', '#4F46E5',
        '<g transform="translate(100, 25)"><rect x="15" y="25" width="170" height="60" rx="10" fill="#EEF2FF"/><text x="100" y="62" font-size="18" font-weight="bold" fill="#3730A3" text-anchor="middle">1 m = 100 cm</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '10 cm' }, { key: 'B', text: '100 cm' }, { key: 'C', text: '1.000 cm' }, { key: 'D', text: '50 cm' }],
    correctAnswer: 'B',
    explanation: '1 meter = 100 sentimeter.'
  },
  {
    id: 'SIM-B-MAT-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah keliling persegi yang memiliki panjang sisi 5 cm?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Keliling Persegi', 'sisi = 5 cm', '#0891B2',
        '<g transform="translate(140, 20)"><rect x="20" y="20" width="80" height="80" rx="4" fill="#CFFAFE" stroke="#0891B2" stroke-width="4"/><text x="60" y="65" font-size="14" font-weight="bold" fill="#0E7490" text-anchor="middle">s = 5 cm</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '15 cm' }, { key: 'B', text: '20 cm' }, { key: 'C', text: '25 cm' }, { key: 'D', text: '10 cm' }],
    correctAnswer: 'B',
    explanation: 'Keliling persegi = 4 × sisi = 4 × 5 cm = 20 cm.'
  },
  {
    id: 'SIM-B-MAT-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Hasil pembagian dari 18 : 3 adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pembagian Dasar', '18 : 3 = ?', '#EA580C',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="55" height="50" rx="8" fill="#FFEDD5"/><text x="37" y="52" font-size="22" font-weight="bold" fill="#C2410C" text-anchor="middle">18</text><text x="85" y="55" font-size="24" font-weight="bold" fill="#1E293B">:</text><rect x="105" y="20" width="55" height="50" rx="8" fill="#FFEDD5"/><text x="132" y="52" font-size="22" font-weight="bold" fill="#C2410C" text-anchor="middle">3</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '5' }, { key: 'B', text: '6' }, { key: 'C', text: '7' }, { key: 'D', text: '8' }],
    correctAnswer: 'B',
    explanation: '18 : 3 = 6 karena 6 × 3 = 18.'
  },
  {
    id: 'SIM-B-MAT-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Bilangan genap di antara bilangan berikut adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bilangan Genap', 'Habis Dibagi 2', '#6366F1',
        '<g transform="translate(80, 25)"><rect x="15" y="20" width="45" height="45" rx="8" fill="#EEF2FF"/><text x="37" y="50" font-size="18" font-weight="bold" fill="#4338CA" text-anchor="middle">3</text><rect x="75" y="20" width="45" height="45" rx="8" fill="#EEF2FF"/><text x="97" y="50" font-size="18" font-weight="bold" fill="#4338CA" text-anchor="middle">7</text><rect x="135" y="20" width="45" height="45" rx="8" fill="#C7D2FE"/><text x="157" y="50" font-size="18" font-weight="bold" fill="#312E81" text-anchor="middle">8</text><rect x="195" y="20" width="45" height="45" rx="8" fill="#EEF2FF"/><text x="217" y="50" font-size="18" font-weight="bold" fill="#4338CA" text-anchor="middle">9</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '7' }, { key: 'C', text: '8' }, { key: 'D', text: '9' }],
    correctAnswer: 'C',
    explanation: '8 adalah bilangan genap karena habis dibagi 2.'
  },
  {
    id: 'SIM-B-MAT-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Sebuah uang koin logam memiliki permukaan berbentuk...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bentuk Bangun', 'Uang Koin Logam', '#F59E0B',
        '<g transform="translate(140, 20)"><circle cx="60" cy="65" r="45" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/><text x="60" y="70" font-size="14" font-weight="bold" fill="#92400E" text-anchor="middle">KOIN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Lingkaran' }, { key: 'B', text: 'Segitiga' }, { key: 'C', text: 'Persegi panjang' }, { key: 'D', text: 'Jajar genjang' }],
    correctAnswer: 'A',
    explanation: 'Permukaan uang koin berbentuk bulat lingkaran.'
  },
  {
    id: 'SIM-B-MAT-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: '1 kilogram (kg) sama dengan berapa gram (g)?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Satuan Berat', '1 kg = ... gram', '#10B981',
        '<g transform="translate(100, 25)"><rect x="15" y="25" width="170" height="60" rx="10" fill="#D1FAE5"/><text x="100" y="62" font-size="18" font-weight="bold" fill="#065F46" text-anchor="middle">1 kg = 1.000 g</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '10 gram' }, { key: 'B', text: '100 gram' }, { key: 'C', text: '1.000 gram' }, { key: 'D', text: '10.000 gram' }],
    correctAnswer: 'C',
    explanation: '1 kg setara dengan 1.000 gram.'
  },
  {
    id: 'SIM-B-MAT-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah hasil dari 50 + 50?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penjumlahan Ratusan', '50 + 50 = ?', '#3B82F6',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="60" height="50" rx="8" fill="#DBEAFE"/><text x="40" y="52" font-size="22" font-weight="bold" fill="#1E40AF" text-anchor="middle">50</text><text x="90" y="55" font-size="24" font-weight="bold" fill="#1E293B">+</text><rect x="110" y="20" width="60" height="50" rx="8" fill="#DBEAFE"/><text x="140" y="52" font-size="22" font-weight="bold" fill="#1E40AF" text-anchor="middle">50</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '80' }, { key: 'B', text: '90' }, { key: 'C', text: '100' }, { key: 'D', text: '150' }],
    correctAnswer: 'C',
    explanation: '50 + 50 = 100.'
  },
  {
    id: 'SIM-B-MAT-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Singapore Primary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Manakah tanda pertidaksamaan yang tepat untuk mengisi titik-titik: 45 ... 54?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perbandingan Bilangan', '45 < 54', '#8B5CF6',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="55" height="50" rx="8" fill="#EDE9FE"/><text x="37" y="52" font-size="22" font-weight="bold" fill="#6D28D9" text-anchor="middle">45</text><text x="85" y="55" font-size="28" font-weight="bold" fill="#DC2626">&lt;</text><rect x="105" y="20" width="55" height="50" rx="8" fill="#EDE9FE"/><text x="132" y="52" font-size="22" font-weight="bold" fill="#6D28D9" text-anchor="middle">54</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '< (Kurang dari)' }, { key: 'B', text: '> (Lebih dari)' }, { key: 'C', text: '= (Sama dengan)' }, { key: 'D', text: '+ (Tambah)' }],
    correctAnswer: 'A',
    explanation: '45 lebih kecil daripada 54 (45 < 54).'
  },
  {
    id: 'SIM-B-MAT-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Singapore Primary Math',
    difficulty: 'Sangat Mudah',
    questionText: '1 jam sama dengan berapa menit?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Konversi Waktu', '1 Jam = ... Menit', '#0284C7',
        '<g transform="translate(100, 25)"><rect x="15" y="25" width="170" height="60" rx="10" fill="#E0F2FE"/><text x="100" y="62" font-size="18" font-weight="bold" fill="#0369A1" text-anchor="middle">1 Jam = 60 Menit</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '30 menit' }, { key: 'B', text: '60 menit' }, { key: 'C', text: '100 menit' }, { key: 'D', text: '12 menit' }],
    correctAnswer: 'B',
    explanation: '1 jam terdiri dari 60 menit.'
  },
  {
    id: 'SIM-B-MAT-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Singapore Primary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Pola bilangan loncat 2: 2, 4, 6, 8, ... Angka berikutnya adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pola Bilangan', 'Loncat 2', '#10B981',
        '<g transform="translate(70, 25)"><circle cx="30" cy="45" r="20" fill="#D1FAE5"/><text x="30" y="52" font-size="16" font-weight="bold" fill="#065F46" text-anchor="middle">2</text><circle cx="80" cy="45" r="20" fill="#D1FAE5"/><text x="80" y="52" font-size="16" font-weight="bold" fill="#065F46" text-anchor="middle">4</text><circle cx="130" cy="45" r="20" fill="#D1FAE5"/><text x="130" y="52" font-size="16" font-weight="bold" fill="#065F46" text-anchor="middle">6</text><circle cx="180" cy="45" r="20" fill="#D1FAE5"/><text x="180" y="52" font-size="16" font-weight="bold" fill="#065F46" text-anchor="middle">8</text><circle cx="230" cy="45" r="20" fill="#FEF3C7"/><text x="230" y="52" font-size="16" font-weight="bold" fill="#B45309" text-anchor="middle">?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '9' }, { key: 'B', text: '10' }, { key: 'C', text: '11' }, { key: 'D', text: '12' }],
    correctAnswer: 'B',
    explanation: 'Setelah 8 ditambah 2 menjadi 10.'
  },
  {
    id: 'SIM-B-MAT-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Sebuah segitiga memiliki berapa banyak sudut?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Geometri', 'Sudut Segitiga', '#EF4444',
        '<g transform="translate(140, 20)"><polygon points="60,15 10,95 110,95" fill="#FEE2E2" stroke="#DC2626" stroke-width="4"/><text x="60" y="75" font-size="13" font-weight="bold" fill="#991B1B" text-anchor="middle">3 Sudut</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2 sudut' }, { key: 'B', text: '3 sudut' }, { key: 'C', text: '4 sudut' }, { key: 'D', text: '5 sudut' }],
    correctAnswer: 'B',
    explanation: 'Segitiga memiliki 3 sudut.'
  },
  {
    id: 'SIM-B-MAT-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah luas persegi dengan panjang sisi 4 cm? (Luas = sisi × sisi)',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Luas Persegi', '4 cm × 4 cm', '#D97706',
        '<g transform="translate(140, 20)"><rect x="20" y="20" width="80" height="80" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/><text x="60" y="65" font-size="14" font-weight="bold" fill="#B45309" text-anchor="middle">s = 4 cm</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '8 cm²' }, { key: 'B', text: '12 cm²' }, { key: 'C', text: '16 cm²' }, { key: 'D', text: '20 cm²' }],
    correctAnswer: 'C',
    explanation: 'Luas = 4 × 4 = 16 cm².'
  },
  {
    id: 'SIM-B-MAT-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah hasil dari 100 - 25?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Operasi Bilangan', '100 - 25 = ?', '#059669',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="60" height="50" rx="8" fill="#D1FAE5"/><text x="40" y="52" font-size="20" font-weight="bold" fill="#047857" text-anchor="middle">100</text><text x="90" y="55" font-size="24" font-weight="bold" fill="#1E293B">-</text><rect x="110" y="20" width="60" height="50" rx="8" fill="#D1FAE5"/><text x="140" y="52" font-size="20" font-weight="bold" fill="#047857" text-anchor="middle">25</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '65' }, { key: 'B', text: '70' }, { key: 'C', text: '75' }, { key: 'D', text: '85' }],
    correctAnswer: 'C',
    explanation: '100 - 25 = 75.'
  }
];
