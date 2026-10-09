import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: MATEMATIKA SD/MI (Kategori B)
// 20 Soal Pilihan Ganda Lengkap dengan Kunci Jawaban & Ilustrasi Visual

export const PENYISIHAN_B_MATEMATIKA: QuestionItem[] = [
  {
    id: 'PENY-B-MAT-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: '25 + 14 = ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Operasi Penjumlahan', '#3B82F6',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/><text x="105" y="45" font-size="20" font-weight="900" fill="#1E40AF" text-anchor="middle">25 + 14 = 39</text><text x="105" y="70" font-size="12" font-weight="bold" fill="#3B82F6" text-anchor="middle">Penjumlahan Puluhan & Satuan</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '38' }, { key: 'B', text: '39' }, { key: 'C', text: '40' }, { key: 'D', text: '41' }],
    correctAnswer: 'B',
    explanation: '25 + 14 = (20 + 10) + (5 + 4) = 30 + 9 = 39.'
  },
  {
    id: 'PENY-B-MAT-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: '50 - 20 = ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Operasi Pengurangan', '#EF4444',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#FEF2F2" stroke="#EF4444" stroke-width="2"/><text x="105" y="45" font-size="20" font-weight="900" fill="#991B1B" text-anchor="middle">50 - 20 = 30</text><text x="105" y="70" font-size="12" font-weight="bold" fill="#EF4444" text-anchor="middle">Pengurangan Puluhan Bersih</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '20' }, { key: 'B', text: '25' }, { key: 'C', text: '30' }, { key: 'D', text: '35' }],
    correctAnswer: 'C',
    explanation: '50 dikurangi 20 menghasilkan 30.'
  },
  {
    id: 'PENY-B-MAT-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Lambang bilangan dari tiga ratus lima puluh adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Lambang Bilangan Ratusan', '#F59E0B',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2"/><text x="105" y="45" font-size="22" font-weight="900" fill="#B45309" text-anchor="middle">350</text><text x="105" y="70" font-size="11" font-weight="bold" fill="#D97706" text-anchor="middle">"Tiga Ratus Lima Puluh"</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '305' }, { key: 'B', text: '315' }, { key: 'C', text: '350' }, { key: 'D', text: '530' }],
    correctAnswer: 'C',
    explanation: 'Tiga ratus lima puluh ditulis 350 (3 ratusan + 5 puluhan + 0 satuan).'
  },
  {
    id: 'PENY-B-MAT-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: '6 x 4 = ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Operasi Perkalian', '#10B981',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/><text x="105" y="45" font-size="20" font-weight="900" fill="#065F46" text-anchor="middle">6 × 4 = 24</text><text x="105" y="70" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">6 + 6 + 6 + 6 = 24</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '20' }, { key: 'B', text: '24' }, { key: 'C', text: '28' }, { key: 'D', text: '30' }],
    correctAnswer: 'B',
    explanation: '6 dikalikan 4 sama dengan 24.'
  },
  {
    id: 'PENY-B-MAT-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: '20 : 5 = ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Operasi Pembagian', '#8B5CF6',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="2"/><text x="105" y="45" font-size="20" font-weight="900" fill="#5B21B6" text-anchor="middle">20 ÷ 5 = 4</text><text x="105" y="70" font-size="12" font-weight="bold" fill="#7C3AED" text-anchor="middle">20 dibagi rata ke 5 kelompok</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '6' }],
    correctAnswer: 'B',
    explanation: '20 dibagi 5 sama dengan 4 karena 4 x 5 = 20.'
  },
  {
    id: 'PENY-B-MAT-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Angka 5 pada bilangan 258 menempati nilai tempat ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Nilai Tempat Bilangan', '#0284C7',
        `<g transform="translate(90, 20)"><rect x="10" y="15" width="60" height="70" rx="8" fill="#E0F2FE"/><text x="40" y="45" font-size="20" font-weight="900" fill="#0369A1" text-anchor="middle">2</text><text x="40" y="70" font-size="9" fill="#0284C7" text-anchor="middle">Ratusan</text><rect x="80" y="15" width="60" height="70" rx="8" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/><text x="110" y="45" font-size="20" font-weight="900" fill="#0C4A6E" text-anchor="middle">5</text><text x="110" y="70" font-size="9" font-weight="bold" fill="#0284C7" text-anchor="middle">PULUHAN</text><rect x="150" y="15" width="60" height="70" rx="8" fill="#E0F2FE"/><text x="180" y="45" font-size="20" font-weight="900" fill="#0369A1" text-anchor="middle">8</text><text x="180" y="70" font-size="9" fill="#0284C7" text-anchor="middle">Satuan</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Satuan' }, { key: 'B', text: 'Puluhan' }, { key: 'C', text: 'Ratusan' }, { key: 'D', text: 'Ribuan' }],
    correctAnswer: 'B',
    explanation: 'Pada bilangan 258, angka 2 adalah ratusan (200), angka 5 adalah puluhan (50), dan angka 8 adalah satuan (8).'
  },
  {
    id: 'PENY-B-MAT-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Urutan bilangan berikut dari yang paling kecil adalah ...\n12, 8, 15, 5',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Mengurutkan Bilangan', '#F97316',
        `<g transform="translate(85, 20)"><rect x="10" y="15" width="210" height="70" rx="10" fill="#FFF7ED" stroke="#F97316" stroke-width="2"/><text x="115" y="45" font-size="16" font-weight="900" fill="#9A3412" text-anchor="middle">5  →  8  →  12  →  15</text><text x="115" y="70" font-size="11" font-weight="bold" fill="#EA580C" text-anchor="middle">Urutan Terkecil ke Terbesar</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '5, 8, 12, 15' }, { key: 'B', text: '8, 5, 12, 15' }, { key: 'C', text: '15, 12, 8, 5' }, { key: 'D', text: '5, 12, 8, 15' }],
    correctAnswer: 'A',
    explanation: 'Urutan dari nilai terkecil ke terbesar adalah 5, 8, 12, lalu 15.'
  },
  {
    id: 'PENY-B-MAT-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Bangun datar yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Geometri: Persegi', '#10B981',
        `<g transform="translate(130, 20)"><rect x="20" y="20" width="70" height="70" rx="4" fill="#D1FAE5" stroke="#059669" stroke-width="3"/><text x="55" y="60" font-size="12" font-weight="900" fill="#065F46" text-anchor="middle">PERSEGI</text><text x="55" y="75" font-size="9" fill="#047857" text-anchor="middle">4 sisi sama</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Segitiga' }, { key: 'B', text: 'Lingkaran' }, { key: 'C', text: 'Persegi' }, { key: 'D', text: 'Trapesium' }],
    correctAnswer: 'C',
    explanation: 'Persegi adalah bangun datar segiempat yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku (90 derajat).'
  },
  {
    id: 'PENY-B-MAT-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sedang',
    questionText: 'Keliling sebuah persegi dengan panjang sisi 6 cm adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Keliling Persegi', '#6366F1',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="2"/><text x="105" y="42" font-size="14" font-weight="900" fill="#3730A3" text-anchor="middle">K = 4 × sisi = 4 × 6 cm</text><text x="105" y="68" font-size="16" font-weight="900" fill="#4F46E5" text-anchor="middle">K = 24 cm</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '12 cm' }, { key: 'B', text: '18 cm' }, { key: 'C', text: '24 cm' }, { key: 'D', text: '36 cm' }],
    correctAnswer: 'C',
    explanation: 'Rumus keliling persegi = 4 x sisi = 4 x 6 cm = 24 cm.'
  },
  {
    id: 'PENY-B-MAT-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sedang',
    questionText: 'Hasil dari 1/2 + 1/4 adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Pecahan Dasar', '#EC4899',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#FDF2F8" stroke="#EC4899" stroke-width="2"/><text x="105" y="42" font-size="15" font-weight="900" fill="#9D174D" text-anchor="middle">2/4 + 1/4 = 3/4</text><text x="105" y="68" font-size="11" font-weight="bold" fill="#DB2777" text-anchor="middle">Menyamakan Penyebut</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2/4' }, { key: 'B', text: '3/4' }, { key: 'C', text: '2/6' }, { key: 'D', text: '1/4' }],
    correctAnswer: 'B',
    explanation: '1/2 diubah menjadi 2/4. Maka 2/4 + 1/4 = 3/4.'
  },
  {
    id: 'PENY-B-MAT-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Jarum panjang menunjuk angka 12 dan jarum pendek menunjuk angka 3. Waktu tersebut menunjukkan pukul ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Membaca Jam', '#14B8A6',
        `<g transform="translate(130, 20)"><circle cx="55" cy="55" r="45" fill="#CCFBF1" stroke="#0F766E" stroke-width="3"/><line x1="55" y1="55" x2="55" y2="25" stroke="#0F766E" stroke-width="3" stroke-linecap="round"/><line x1="55" y1="55" x2="80" y2="55" stroke="#0F766E" stroke-width="4" stroke-linecap="round"/><text x="55" y="115" font-size="12" font-weight="900" fill="#0F766E" text-anchor="middle">03.00 WIB</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '03.00' }, { key: 'B', text: '12.03' }, { key: 'C', text: '03.12' }, { key: 'D', text: '12.00' }],
    correctAnswer: 'A',
    explanation: 'Jarum panjang di angka 12 tepat menit ke-00 dan jarum pendek di angka 3 menunjukkan tepat pukul 03.00.'
  },
  {
    id: 'PENY-B-MAT-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Ibu membeli 3 kantong jeruk. Setiap kantong berisi 8 buah jeruk. Berapa jumlah seluruh jeruk ibu?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Soal Cerita Perkalian', '#F97316',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#FFF7ED" stroke="#F97316" stroke-width="2"/><text x="105" y="45" font-size="18" font-weight="900" fill="#9A3412" text-anchor="middle">3 × 8 = 24 Jeruk</text><text x="105" y="70" font-size="11" font-weight="bold" fill="#EA580C" text-anchor="middle">3 Kantong @ 8 Jeruk</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '21 buah' }, { key: 'B', text: '22 buah' }, { key: 'C', text: '24 buah' }, { key: 'D', text: '28 buah' }],
    correctAnswer: 'C',
    explanation: 'Total jeruk = 3 kantong x 8 buah = 24 buah jeruk.'
  },
  {
    id: 'PENY-B-MAT-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Nilai tempat ratusan pada bilangan 1.425 ditempati oleh angka ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Nilai Tempat Ribuan', '#3B82F6',
        `<g transform="translate(90, 20)"><rect x="10" y="15" width="200" height="70" rx="10" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/><text x="110" y="45" font-size="20" font-weight="900" fill="#1E40AF" text-anchor="middle">1. 4 2 5</text><text x="110" y="70" font-size="11" font-weight="bold" fill="#2563EB" text-anchor="middle">4 menempati Ratusan (400)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '4' }, { key: 'C', text: '2' }, { key: 'D', text: '5' }],
    correctAnswer: 'B',
    explanation: 'Pada 1.425: angka 1 = ribuan, 4 = ratusan, 2 = puluhan, 5 = satuan.'
  },
  {
    id: 'PENY-B-MAT-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Bentuk pecahan desimal dari 1/2 adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Konversi Pecahan Desimal', '#10B981',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/><text x="105" y="45" font-size="18" font-weight="900" fill="#065F46" text-anchor="middle">1/2 = 0,5</text><text x="105" y="70" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">Setengah = Nol Koma Lima</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '0,5' }, { key: 'B', text: '0,2' }, { key: 'C', text: '0,25' }, { key: 'D', text: '0,05' }],
    correctAnswer: 'A',
    explanation: '1 dibagi 2 = 0,5.'
  },
  {
    id: 'PENY-B-MAT-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sedang',
    questionText: 'Sebuah persegi panjang memiliki panjang 8 cm dan lebar 5 cm. Luas persegi panjang tersebut adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Luas Persegi Panjang', '#8B5CF6',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="2"/><text x="105" y="42" font-size="14" font-weight="900" fill="#5B21B6" text-anchor="middle">L = p × l = 8 × 5</text><text x="105" y="68" font-size="16" font-weight="900" fill="#7C3AED" text-anchor="middle">L = 40 cm²</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '26 cm²' }, { key: 'B', text: '40 cm²' }, { key: 'C', text: '13 cm²' }, { key: 'D', text: '35 cm²' }],
    correctAnswer: 'B',
    explanation: 'Luas persegi panjang = panjang x lebar = 8 cm x 5 cm = 40 cm².'
  },
  {
    id: 'PENY-B-MAT-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Hasil dari 150 + 75 - 25 adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Operasi Campuran', '#F59E0B',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#FFFBEB" stroke="#F59E0B" stroke-width="2"/><text x="105" y="45" font-size="18" font-weight="900" fill="#B45309" text-anchor="middle">150 + 50 = 200</text><text x="105" y="70" font-size="11" font-weight="bold" fill="#D97706" text-anchor="middle">Hitung Urut dari Kiri</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '190' }, { key: 'B', text: '195' }, { key: 'C', text: '200' }, { key: 'D', text: '205' }],
    correctAnswer: 'C',
    explanation: '150 + 75 = 225. Kemudian 225 - 25 = 200.'
  },
  {
    id: 'PENY-B-MAT-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Bangun ruang yang memiliki 6 sisi berbentuk persegi yang sama besar dan sebangun adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Bangun Ruang Kubus', '#0284C7',
        `<g transform="translate(125, 20)"><polygon points="40,25 80,25 60,65 20,65" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/><polygon points="80,25 95,45 75,85 60,65" fill="#7DD3FC" stroke="#0284C7" stroke-width="2"/><polygon points="20,65 60,65 75,85 35,85" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/><text x="55" y="110" font-size="12" font-weight="900" fill="#0369A1" text-anchor="middle">KUBUS</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kubus' }, { key: 'B', text: 'Balok' }, { key: 'C', text: 'Kerucut' }, { key: 'D', text: 'Tabung' }],
    correctAnswer: 'A',
    explanation: 'Kubus memiliki 6 sisi bujursangkar (persegi) yang berukuran sama besar.'
  },
  {
    id: 'PENY-B-MAT-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Doni mempunyai 15 kelereng, lalu diberi oleh paman 10 kelereng. Kemudian Doni memberikan 5 kelereng kepada adiknya. Sisa kelereng Doni sekarang adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Soal Cerita Kelereng', '#10B981',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/><text x="105" y="42" font-size="14" font-weight="900" fill="#065F46" text-anchor="middle">15 + 10 - 5 = 20</text><text x="105" y="68" font-size="16" font-weight="900" fill="#059669" text-anchor="middle">20 Kelereng</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '18 kelereng' }, { key: 'B', text: '20 kelereng' }, { key: 'C', text: '25 kelereng' }, { key: 'D', text: '30 kelereng' }],
    correctAnswer: 'B',
    explanation: '15 + 10 = 25. Lalu 25 - 5 = 20 kelereng.'
  },
  {
    id: 'PENY-B-MAT-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Bilangan genap yang terletak di antara 11 dan 15 adalah ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Bilangan Genap', '#EC4899',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#FDF2F8" stroke="#EC4899" stroke-width="2"/><text x="105" y="45" font-size="18" font-weight="900" fill="#9D174D" text-anchor="middle">12 dan 14</text><text x="105" y="70" font-size="11" font-weight="bold" fill="#DB2777" text-anchor="middle">Dapat Dibagi 2 Habis</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '12 dan 13' }, { key: 'B', text: '12 dan 14' }, { key: 'C', text: '13 dan 14' }, { key: 'D', text: '13 dan 15' }],
    correctAnswer: 'B',
    explanation: 'Bilangan antara 11 dan 15 adalah 12, 13, 14. Dari bilangan tersebut, yang merupakan bilangan genap adalah 12 dan 14.'
  },
  {
    id: 'PENY-B-MAT-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Matematika',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Dalam sebuah lomba lari, Andi membutuhkan waktu 45 detik, sedangkan Budi membutuhkan waktu 38 detik. Siapakah yang berlari lebih cepat?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan SD', 'Perbandingan Waktu Lari', '#EAB308',
        `<g transform="translate(100, 20)"><rect x="15" y="15" width="180" height="70" rx="10" fill="#FEFCE8" stroke="#EAB308" stroke-width="2"/><text x="105" y="42" font-size="14" font-weight="900" fill="#713F12" text-anchor="middle">Budi: 38 detik &lt; 45 detik</text><text x="105" y="68" font-size="16" font-weight="900" fill="#A16207" text-anchor="middle">Budi Lebih Cepat ⚡</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Andi' }, { key: 'B', text: 'Budi' }, { key: 'C', text: 'Keduanya sama cepat' }, { key: 'D', text: 'Tidak dapat ditentukan' }],
    correctAnswer: 'B',
    explanation: 'Dalam lomba lari, pelari yang membutuhkan waktu lebih sedikit (38 detik < 45 detik) adalah yang berlari lebih cepat. Maka Budi yang lebih cepat.'
  }
];
