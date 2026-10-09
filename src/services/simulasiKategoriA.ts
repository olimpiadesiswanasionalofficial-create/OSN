import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori A: PAUD / TK (Usia 4-6 Tahun) - 4 Mapel x 20 Soal = 80 Soal Sangat Mudah & Bergambar

export const KATEGORI_A_MATEMATIKA: QuestionItem[] = [
  {
    id: 'SIM-A-MAT-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah buah apel merah pada gambar di bawah ini?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Berhitung 1-5', 'Jumlah Apel Merah', '#E11D48',
        '<g transform="translate(60, 20)"><circle cx="40" cy="60" r="30" fill="#E11D48"/><circle cx="140" cy="60" r="30" fill="#E11D48"/><circle cx="240" cy="60" r="30" fill="#E11D48"/><text x="40" y="65" font-size="20" fill="#FFF" text-anchor="middle" font-weight="bold">1</text><text x="140" y="65" font-size="20" fill="#FFF" text-anchor="middle" font-weight="bold">2</text><text x="240" y="65" font-size="20" fill="#FFF" text-anchor="middle" font-weight="bold">3</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2 apel' }, { key: 'B', text: '3 apel' }, { key: 'C', text: '4 apel' }, { key: 'D', text: '5 apel' }],
    correctAnswer: 'B',
    explanation: 'Pada gambar tampak jelas ada 3 buah apel merah yang tersusun rapi.'
  },
  {
    id: 'SIM-A-MAT-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bentuk bangun datar apakah yang berwarna biru pada gambar?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bentuk Datar', 'Mengenal Bangun', '#2563EB',
        '<g transform="translate(140, 20)"><circle cx="60" cy="60" r="50" fill="#2563EB"/><text x="60" y="66" font-size="14" fill="#FFF" text-anchor="middle" font-weight="bold">BULAT</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Lingkaran' }, { key: 'B', text: 'Segitiga' }, { key: 'C', text: 'Kotak / Persegi' }, { key: 'D', text: 'Bintang' }],
    correctAnswer: 'A',
    explanation: 'Bentuk yang bulat sempurna tanpa sudut adalah Lingkaran.'
  },
  {
    id: 'SIM-A-MAT-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah bintang kuning pada gambar?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Berhitung', 'Bintang Kuning', '#D97706',
        '<g transform="translate(40, 30)"><polygon points="50,15 58,40 85,40 63,55 71,80 50,65 29,80 37,55 15,40 42,40" fill="#F59E0B"/><polygon points="150,15 158,40 185,40 163,55 171,80 150,65 129,80 137,55 115,40 142,40" fill="#F59E0B"/><polygon points="250,15 258,40 285,40 263,55 271,80 250,65 229,80 237,55 215,40 242,40" fill="#F59E0B"/><polygon points="350,15 358,40 385,40 363,55 371,80 350,65 329,80 337,55 315,40 342,40" fill="#F59E0B"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3 bintang' }, { key: 'B', text: '4 bintang' }, { key: 'C', text: '5 bintang' }, { key: 'D', text: '2 bintang' }],
    correctAnswer: 'B',
    explanation: 'Ada 4 buah bintang berwarna kuning cerah pada gambar.'
  },
  {
    id: 'SIM-A-MAT-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Manakah benda yang berukuran LEBIH BESAR pada gambar?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Ukuran', 'Perbandingan Besar Kecil', '#059669',
        '<g transform="translate(60, 20)"><circle cx="60" cy="65" r="45" fill="#059669"/><text x="60" y="72" font-size="14" fill="#FFF" font-weight="bold" text-anchor="middle">Bola A</text><circle cx="240" cy="65" r="20" fill="#10B981"/><text x="240" y="70" font-size="11" fill="#FFF" font-weight="bold" text-anchor="middle">Bola B</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bola A' }, { key: 'B', text: 'Bola B' }, { key: 'C', text: 'Sama besar' }, { key: 'D', text: 'Semua kecil' }],
    correctAnswer: 'A',
    explanation: 'Bola A memiliki lingkaran yang lebih besar dibanding Bola B.'
  },
  {
    id: 'SIM-A-MAT-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: '1 ditambah 1 sama dengan berapa?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penjumlahan Dasar', '1 + 1', '#7C3AED',
        '<g transform="translate(70, 30)"><rect x="10" y="30" width="40" height="40" rx="8" fill="#7C3AED"/><text x="30" y="55" font-size="22" fill="#FFF" font-weight="bold" text-anchor="middle">1</text><text x="80" y="58" font-size="28" fill="#1A1615" font-weight="bold" text-anchor="middle">+</text><rect x="110" y="30" width="40" height="40" rx="8" fill="#7C3AED"/><text x="130" y="55" font-size="22" fill="#FFF" font-weight="bold" text-anchor="middle">1</text><text x="180" y="58" font-size="28" fill="#1A1615" font-weight="bold" text-anchor="middle">=</text><text x="230" y="58" font-size="34" fill="#D97706" font-weight="bold" text-anchor="middle">?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }, { key: 'D', text: '4' }],
    correctAnswer: 'B',
    explanation: '1 buah jari ditambah 1 buah jari menjadi 2 jari.'
  },
  {
    id: 'SIM-A-MAT-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Segitiga memiliki berapa sisi (garis)?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Geometri Dasar', 'Segitiga Ceria', '#EA580C',
        '<g transform="translate(130, 20)"><polygon points="70,10 10,110 130,110" fill="#EA580C"/><text x="70" y="85" font-size="16" fill="#FFF" font-weight="bold" text-anchor="middle">3 SISI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2 sisi' }, { key: 'B', text: '3 sisi' }, { key: 'C', text: '4 sisi' }, { key: 'D', text: '5 sisi' }],
    correctAnswer: 'B',
    explanation: 'Segitiga memiliki 3 sisi dan 3 titik sudut.'
  },
  {
    id: 'SIM-A-MAT-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah permen pada toples di gambar?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Berhitung', 'Koleksi Permen', '#DB2777',
        '<g transform="translate(60, 20)"><circle cx="40" cy="50" r="18" fill="#DB2777"/><circle cx="90" cy="50" r="18" fill="#F43F5E"/><circle cx="140" cy="50" r="18" fill="#EC4899"/><circle cx="190" cy="50" r="18" fill="#BE185D"/><circle cx="240" cy="50" r="18" fill="#FB7185"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3 permen' }, { key: 'B', text: '4 permen' }, { key: 'C', text: '5 permen' }, { key: 'D', text: '6 permen' }],
    correctAnswer: 'C',
    explanation: 'Jika dihitung satu per satu, ada 5 permen bulat berwarna-warni.'
  },
  {
    id: 'SIM-A-MAT-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Urutan angka yang benar setelah angka 1, 2, adalah angka...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Urutan Angka', 'Pola Bilangan', '#0284C7',
        '<g transform="translate(70, 30)"><rect x="10" y="20" width="45" height="45" rx="8" fill="#0284C7"/><text x="32" y="50" font-size="24" fill="#FFF" font-weight="bold" text-anchor="middle">1</text><rect x="80" y="20" width="45" height="45" rx="8" fill="#0284C7"/><text x="102" y="50" font-size="24" fill="#FFF" font-weight="bold" text-anchor="middle">2</text><rect x="150" y="20" width="45" height="45" rx="8" fill="#F59E0B"/><text x="172" y="50" font-size="24" fill="#FFF" font-weight="bold" text-anchor="middle">?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '0' }],
    correctAnswer: 'A',
    explanation: 'Urutan membilang maju adalah 1, 2, lalu 3.'
  },
  {
    id: 'SIM-A-MAT-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Manakah garis yang posisinya LURUS TEGAK (vertikal)?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Orientasi Garis', 'Tegak & Mendatar', '#4F46E5',
        '<g transform="translate(80, 20)"><line x1="60" y1="20" x2="60" y2="100" stroke="#4F46E5" stroke-width="8" stroke-linecap="round"/><text x="60" y="125" font-size="12" font-weight="bold" text-anchor="middle">Garis A</text><line x1="180" y1="60" x2="260" y2="60" stroke="#9333EA" stroke-width="8" stroke-linecap="round"/><text x="220" y="90" font-size="12" font-weight="bold" text-anchor="middle">Garis B</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Garis A' }, { key: 'B', text: 'Garis B' }, { key: 'C', text: 'Keduanya tidur' }, { key: 'D', text: 'Tidak ada' }],
    correctAnswer: 'A',
    explanation: 'Garis A berdiri tegak lurus dari atas ke bawah.'
  },
  {
    id: 'SIM-A-MAT-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Jika kamu memiliki 3 kue, lalu dimakan 1 kue, sisa berapa kue?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pengurangan Dasar', '3 dikurang 1', '#DC2626',
        '<g transform="translate(60, 20)"><circle cx="50" cy="55" r="25" fill="#F87171"/><circle cx="120" cy="55" r="25" fill="#F87171"/><circle cx="190" cy="55" r="25" fill="#9CA3AF"/><line x1="170" y1="35" x2="210" y2="75" stroke="#DC2626" stroke-width="4"/><line x1="210" y1="35" x2="170" y2="75" stroke="#DC2626" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1 kue' }, { key: 'B', text: '2 kue' }, { key: 'C', text: '3 kue' }, { key: 'D', text: '0 kue' }],
    correctAnswer: 'B',
    explanation: '3 dikurang 1 sama dengan 2 kue yang tersisa.'
  },
  {
    id: 'SIM-A-MAT-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Warna apakah kotak persegi pada gambar di bawah ini?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Warna & Bentuk', 'Mengenal Warna', '#16A34A',
        '<g transform="translate(140, 20)"><rect x="20" y="20" width="80" height="80" rx="8" fill="#16A34A"/><text x="60" y="65" font-size="14" fill="#FFF" font-weight="bold" text-anchor="middle">HIJAU</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Merah' }, { key: 'B', text: 'Hijau' }, { key: 'C', text: 'Kuning' }, { key: 'D', text: 'Biru' }],
    correctAnswer: 'B',
    explanation: 'Kotak persegi tersebut berwarna hijau segar.'
  },
  {
    id: 'SIM-A-MAT-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah roda pada sebuah sepeda anak roda dua?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Objek Nyata', 'Roda Sepeda', '#2563EB',
        '<g transform="translate(80, 20)"><circle cx="60" cy="65" r="35" fill="#334155" stroke="#2563EB" stroke-width="6"/><circle cx="180" cy="65" r="35" fill="#334155" stroke="#2563EB" stroke-width="6"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1 roda' }, { key: 'B', text: '2 roda' }, { key: 'C', text: '3 roda' }, { key: 'D', text: '4 roda' }],
    correctAnswer: 'B',
    explanation: 'Sepeda roda dua memiliki 2 roda (depan dan belakang).'
  },
  {
    id: 'SIM-A-MAT-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Manakah pensil yang LEBIH PANJANG?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perbandingan', 'Panjang & Pendek', '#D97706',
        '<g transform="translate(60, 20)"><rect x="20" y="30" width="220" height="18" rx="6" fill="#F59E0B"/><text x="260" y="44" font-size="12" font-weight="bold">Pensil A</text><rect x="20" y="70" width="100" height="18" rx="6" fill="#FBBF24"/><text x="140" y="84" font-size="12" font-weight="bold">Pensil B</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pensil A' }, { key: 'B', text: 'Pensil B' }, { key: 'C', text: 'Sama panjang' }, { key: 'D', text: 'Semua pendek' }],
    correctAnswer: 'A',
    explanation: 'Pensil A jauh lebih panjang daripada Pensil B.'
  },
  {
    id: 'SIM-A-MAT-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah jari tangan pada SATU tangan manusia?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Anggota Tubuh', 'Jari Tangan', '#EC4899',
        '<g transform="translate(90, 25)"><rect x="20" y="20" width="14" height="60" rx="7" fill="#F472B6"/><rect x="42" y="10" width="14" height="70" rx="7" fill="#F472B6"/><rect x="64" y="5" width="14" height="75" rx="7" fill="#F472B6"/><rect x="86" y="15" width="14" height="65" rx="7" fill="#F472B6"/><rect x="108" y="30" width="14" height="50" rx="7" fill="#F472B6"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3 jari' }, { key: 'B', text: '4 jari' }, { key: 'C', text: '5 jari' }, { key: 'D', text: '6 jari' }],
    correctAnswer: 'C',
    explanation: 'Satu tangan normal memiliki 5 jari: jempol, telunjuk, tengah, manis, dan kelingking.'
  },
  {
    id: 'SIM-A-MAT-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Singapore Early Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Pola warna: Merah, Biru, Merah, ... Warna berikutnya adalah?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pola Warna', 'Pattern Sequence', '#8B5CF6',
        '<g transform="translate(50, 30)"><circle cx="30" cy="40" r="24" fill="#EF4444"/><circle cx="100" cy="40" r="24" fill="#3B82F6"/><circle cx="170" cy="40" r="24" fill="#EF4444"/><rect x="220" y="16" width="48" height="48" rx="10" fill="#E2E8F0"/><text x="244" y="48" font-size="24" fill="#475569" font-weight="bold" text-anchor="middle">?</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Biru' }, { key: 'B', text: 'Kuning' }, { key: 'C', text: 'Hijau' }, { key: 'D', text: 'Hitam' }],
    correctAnswer: 'A',
    explanation: 'Polanya bergantian: Merah -> Biru -> Merah -> Biru.'
  },
  {
    id: 'SIM-A-MAT-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Singapore Early Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Angka 0 (nol) artinya jumlah bendanya adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Konsep Nol', 'Piring Kosong', '#64748B',
        '<g transform="translate(130, 20)"><ellipse cx="70" cy="65" rx="65" ry="35" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4"/><text x="70" y="70" font-size="14" fill="#64748B" font-weight="bold" text-anchor="middle">KOSONG (0)</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Sangat banyak' }, { key: 'B', text: 'Tidak ada sama sekali / Kosong' }, { key: 'C', text: 'Ada 10' }, { key: 'D', text: 'Ada 1' }],
    correctAnswer: 'B',
    explanation: 'Angka 0 melambangkan ketiadaan benda atau wadah kosong.'
  },
  {
    id: 'SIM-A-MAT-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Singapore Early Math',
    difficulty: 'Sangat Mudah',
    questionText: 'Manakah kelompok yang berisi TEPAT 2 benda?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pasangan', 'Kelompok 2 Benda', '#0891B2',
        '<g transform="translate(60, 25)"><rect x="10" y="10" width="100" height="80" rx="10" fill="#CFFAFE" stroke="#0891B2" stroke-width="2"/><circle cx="45" cy="50" r="15" fill="#0891B2"/><circle cx="75" cy="50" r="15" fill="#0891B2"/><text x="60" y="110" font-size="12" font-weight="bold" text-anchor="middle">Kotak A</text><rect x="160" y="10" width="100" height="80" rx="10" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/><circle cx="210" cy="50" r="15" fill="#94A3B8"/><text x="210" y="110" font-size="12" font-weight="bold" text-anchor="middle">Kotak B</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kotak A' }, { key: 'B', text: 'Kotak B' }, { key: 'C', text: 'Keduanya ada 5' }, { key: 'D', text: 'Tidak ada' }],
    correctAnswer: 'A',
    explanation: 'Kotak A berisi tepat 2 lingkaran biru.'
  },
  {
    id: 'SIM-A-MAT-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah sudut lancip pada bentuk bintang lima?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sudut Bintang', 'Ujung Bintang', '#EAB308',
        '<g transform="translate(130, 20)"><polygon points="70,10 82,45 120,45 89,66 100,102 70,80 40,102 51,66 20,45 58,45" fill="#FACC15"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3 ujung' }, { key: 'B', text: '4 ujung' }, { key: 'C', text: '5 ujung' }, { key: 'D', text: '6 ujung' }],
    correctAnswer: 'C',
    explanation: 'Bintang standar memiliki 5 ujung sudut.'
  },
  {
    id: 'SIM-A-MAT-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Manakah bentuk HATI (Love) pada pilihan di bawah ini?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bentuk Simbol', 'Mengenal Love', '#F43F5E',
        '<g transform="translate(130, 20)"><path d="M70,40 C70,25 50,15 35,25 C15,40 25,65 70,100 C115,65 125,40 105,25 C90,15 70,25 70,40 Z" fill="#F43F5E"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bentuk Hati (Love)' }, { key: 'B', text: 'Bentuk Kotak' }, { key: 'C', text: 'Bentuk Segitiga' }, { key: 'D', text: 'Bentuk Garis' }],
    correctAnswer: 'A',
    explanation: 'Gambar tersebut adalah bentuk hati merah muda.'
  },
  {
    id: 'SIM-A-MAT-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: '2 ditambah 2 sama dengan berapa?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penjumlahan Jari', '2 + 2', '#10B981',
        '<g transform="translate(60, 25)"><circle cx="30" cy="50" r="16" fill="#10B981"/><circle cx="70" cy="50" r="16" fill="#10B981"/><text x="110" y="58" font-size="26" font-weight="bold">+</text><circle cx="150" cy="50" r="16" fill="#10B981"/><circle cx="190" cy="50" r="16" fill="#10B981"/><text x="230" y="58" font-size="26" font-weight="bold">=</text><text x="270" y="60" font-size="30" font-weight="bold" fill="#047857">4</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '6' }],
    correctAnswer: 'B',
    explanation: 'Dua ditambah dua berjumlah empat.'
  }
];
