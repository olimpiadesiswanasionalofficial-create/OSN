import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: MATEMATIKA PAUD/TK (Kategori A)
// 20 Soal Pilihan Ganda dengan Kunci Jawaban Resmi & Ilustrasi Visual

export const PENYISIHAN_A_MATEMATIKA: QuestionItem[] = [
  {
    id: 'PENY-A-MAT-01',
    number: 1,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Berapakah jumlah pensil ini?\n✏️ ✏️ ✏️',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Menghitung Pensil', '#F59E0B',
        `<g transform="translate(85, 20)"><text x="35" y="60" font-size="34">✏️</text><text x="100" y="60" font-size="34">✏️</text><text x="165" y="60" font-size="34">✏️</text><text x="100" y="110" font-size="15" font-weight="900" fill="#B45309" text-anchor="middle">3 PENSIL</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }],
    correctAnswer: 'B',
    explanation: 'Ada 3 buah pensil (✏️ ✏️ ✏️).'
  },
  {
    id: 'PENY-A-MAT-02',
    number: 2,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Angka berapakah setelah angka 4?\n1, 2, 3, 4, ...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Urutan Angka', '#3B82F6',
        `<g transform="translate(60, 25)"><circle cx="30" cy="45" r="20" fill="#DBEAFE"/><text x="30" y="52" font-size="16" font-weight="900" fill="#1E40AF" text-anchor="middle">1</text><circle cx="80" cy="45" r="20" fill="#DBEAFE"/><text x="80" y="52" font-size="16" font-weight="900" fill="#1E40AF" text-anchor="middle">2</text><circle cx="130" cy="45" r="20" fill="#DBEAFE"/><text x="130" y="52" font-size="16" font-weight="900" fill="#1E40AF" text-anchor="middle">3</text><circle cx="180" cy="45" r="20" fill="#DBEAFE"/><text x="180" y="52" font-size="16" font-weight="900" fill="#1E40AF" text-anchor="middle">4</text><circle cx="230" cy="45" r="22" fill="#FBBF24" stroke="#D97706" stroke-width="2"/><text x="230" y="53" font-size="18" font-weight="900" fill="#78350F" text-anchor="middle">5</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '5' }, { key: 'B', text: '6' }, { key: 'C', text: '3' }],
    correctAnswer: 'A',
    explanation: 'Setelah angka 4 adalah angka 5 (1, 2, 3, 4, 5).'
  },
  {
    id: 'PENY-A-MAT-03',
    number: 3,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Berapakah jumlah bintang di bawah ini?\n⭐ ⭐ ⭐ ⭐ ⭐',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Menghitung Bintang', '#EAB308',
        `<g transform="translate(65, 20)"><text x="20" y="55" font-size="28">⭐</text><text x="70" y="55" font-size="28">⭐</text><text x="120" y="55" font-size="28">⭐</text><text x="170" y="55" font-size="28">⭐</text><text x="220" y="55" font-size="28">⭐</text><text x="130" y="105" font-size="15" font-weight="900" fill="#A16207" text-anchor="middle">5 BINTANG</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }],
    correctAnswer: 'C',
    explanation: 'Ada 5 buah bintang (⭐ ⭐ ⭐ ⭐ ⭐).'
  },
  {
    id: 'PENY-A-MAT-04',
    number: 4,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Manakah lambang bilangan untuk dua?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Lambang Bilangan Dua', '#8B5CF6',
        `<g transform="translate(130, 15)"><circle cx="70" cy="65" r="45" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="3"/><text x="70" y="78" font-size="38" font-weight="900" fill="#6D28D9" text-anchor="middle">2</text><text x="70" y="115" font-size="13" font-weight="bold" fill="#7C3AED" text-anchor="middle">DUA</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }],
    correctAnswer: 'B',
    explanation: 'Lambang bilangan untuk dua adalah 2.'
  },
  {
    id: 'PENY-A-MAT-05',
    number: 5,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: '🍎 🍎 + 🍎 = ...\nAda 2 apel ditambah 1 apel, berapa jumlah semuanya?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Penjumlahan Apel: 2 + 1', '#EF4444',
        `<g transform="translate(70, 20)"><text x="30" y="55" font-size="28">🍎 🍎</text><text x="110" y="55" font-size="28" font-weight="bold" fill="#334155">+</text><text x="140" y="55" font-size="28">🍎</text><text x="195" y="55" font-size="28" font-weight="bold" fill="#334155">=</text><text x="235" y="55" font-size="28" font-weight="900" fill="#DC2626">3</text><text x="130" y="105" font-size="14" font-weight="900" fill="#B91C1C" text-anchor="middle">2 + 1 = 3 APEL</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '2' }],
    correctAnswer: 'A',
    explanation: '2 apel ditambah 1 apel menghasilkan 3 buah apel (2 + 1 = 3).'
  },
  {
    id: 'PENY-A-MAT-06',
    number: 6,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Benda manakah yang berbentuk lingkaran?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Bentuk Lingkaran', '#3B82F6',
        `<g transform="translate(130, 15)"><circle cx="70" cy="65" r="42" fill="#DBEAFE" stroke="#2563EB" stroke-width="4"/><circle cx="70" cy="65" r="28" fill="#93C5FD"/><text x="70" y="115" font-size="14" font-weight="900" fill="#1E40AF" text-anchor="middle">BOLA (LINGKARAN) ⚽</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bola' }, { key: 'B', text: 'Buku' }, { key: 'C', text: 'Pintu' }],
    correctAnswer: 'A',
    explanation: 'Bola berbentuk lingkaran / bulat, sedangkan buku dan pintu berbentuk persegi panjang.'
  },
  {
    id: 'PENY-A-MAT-07',
    number: 7,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Manakah hewan yang berukuran lebih besar?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Perbandingan Ukuran', '#64748B',
        `<g transform="translate(90, 20)"><text x="30" y="65" font-size="20">🐜</text><text x="30" y="90" font-size="11" font-weight="bold" fill="#64748B">Semut (Kecil)</text><text x="140" y="65" font-size="44">🐘</text><text x="150" y="90" font-size="12" font-weight="900" fill="#1E293B">Gajah (Besar)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Semut' }, { key: 'B', text: 'Gajah' }, { key: 'C', text: 'Kucing' }],
    correctAnswer: 'B',
    explanation: 'Gajah memiliki ukuran tubuh yang paling besar dibanding semut dan kucing.'
  },
  {
    id: 'PENY-A-MAT-08',
    number: 8,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: '🐱 🐱 🐱 🐱\nBerapa jumlah kucing tersebut?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Menghitung Kucing', '#F59E0B',
        `<g transform="translate(70, 20)"><text x="20" y="60" font-size="30">🐱</text><text x="80" y="60" font-size="30">🐱</text><text x="140" y="60" font-size="30">🐱</text><text x="200" y="60" font-size="30">🐱</text><text x="130" y="105" font-size="14" font-weight="900" fill="#B45309" text-anchor="middle">4 KUCING</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }],
    correctAnswer: 'B',
    explanation: 'Ada 4 ekor kucing pada gambar.'
  },
  {
    id: 'PENY-A-MAT-09',
    number: 9,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Benda manakah yang berbentuk segitiga?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Bentuk Segitiga', '#EF4444',
        `<g transform="translate(130, 15)"><polygon points="70,25 20,95 120,95" fill="#FEE2E2" stroke="#EF4444" stroke-width="3"/><text x="70" y="75" font-size="28" text-anchor="middle">🍕</text><text x="70" y="115" font-size="12" font-weight="900" fill="#B91C1C" text-anchor="middle">POTONGAN PIZZA</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Potongan pizza 🍕' }, { key: 'B', text: 'Bola basket 🏀' }, { key: 'C', text: 'Kotak kado 🎁' }],
    correctAnswer: 'A',
    explanation: 'Potongan pizza berbentuk segitiga dengan 3 sisi.'
  },
  {
    id: 'PENY-A-MAT-10',
    number: 10,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Adik punya 3 permen 🍬 🍬 🍬. Dimakan 1. Sisa berapa permen adik sekarang?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Pengurangan Permen: 3 - 1', '#EC4899',
        `<g transform="translate(85, 20)"><text x="25" y="55" font-size="28">🍬 🍬</text><text x="110" y="55" font-size="28" opacity="0.3">🍬</text><line x1="110" y1="35" x2="145" y2="55" stroke="#BE185D" stroke-width="3"/><text x="95" y="105" font-size="14" font-weight="900" fill="#9D174D" text-anchor="middle">3 - 1 = 2 PERMEN</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }],
    correctAnswer: 'B',
    explanation: '3 permen dikurangi 1 permen tersisa 2 permen (3 - 1 = 2).'
  },
  {
    id: 'PENY-A-MAT-11',
    number: 11,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Angka berapakah sebelum angka 3?\n1, ..., 3',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Angka Sebelum 3', '#06B6D4',
        `<g transform="translate(80, 25)"><circle cx="35" cy="45" r="22" fill="#E0F2FE"/><text x="35" y="53" font-size="18" font-weight="900" fill="#0284C7" text-anchor="middle">1</text><circle cx="115" cy="45" r="24" fill="#FBBF24" stroke="#D97706" stroke-width="2"/><text x="115" y="53" font-size="20" font-weight="900" fill="#78350F" text-anchor="middle">2</text><circle cx="195" cy="45" r="22" fill="#E0F2FE"/><text x="195" y="53" font-size="18" font-weight="900" fill="#0284C7" text-anchor="middle">3</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }],
    correctAnswer: 'A',
    explanation: 'Angka sebelum 3 (dan sesudah 1) adalah angka 2.'
  },
  {
    id: 'PENY-A-MAT-12',
    number: 12,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Manakah pohon yang lebih tinggi?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Tinggi Rendah', '#16A34A',
        `<g transform="translate(80, 15)"><text x="30" y="90" font-size="24">🌱</text><text x="30" y="110" font-size="11" font-weight="bold" fill="#64748B">Rumput</text><text x="150" y="90" font-size="52">🌴</text><text x="160" y="110" font-size="12" font-weight="900" fill="#15803D">Pohon Kelapa</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Rumput' }, { key: 'B', text: 'Pohon kelapa' }, { key: 'C', text: 'Tanaman bunga' }],
    correctAnswer: 'B',
    explanation: 'Pohon kelapa tumbuh menjulang tinggi dibandingkan rumput atau tanaman bunga.'
  },
  {
    id: 'PENY-A-MAT-13',
    number: 13,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: '🎈 🎈 + 🎈 🎈 = ...\n2 balon ditambah 2 balon menjadi berapa?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Penjumlahan Balon: 2 + 2', '#EF4444',
        `<g transform="translate(70, 20)"><text x="25" y="55" font-size="28">🎈 🎈</text><text x="105" y="55" font-size="26" font-weight="bold" fill="#334155">+</text><text x="135" y="55" font-size="28">🎈 🎈</text><text x="130" y="105" font-size="14" font-weight="900" fill="#B91C1C" text-anchor="middle">2 + 2 = 4 BALON</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }],
    correctAnswer: 'B',
    explanation: '2 balon ditambah 2 balon sama dengan 4 balon (2 + 2 = 4).'
  },
  {
    id: 'PENY-A-MAT-14',
    number: 14,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Manakah bilangan yang bernilai paling sedikit?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Nilai Terkecil', '#6366F1',
        `<g transform="translate(80, 25)"><circle cx="35" cy="45" r="22" fill="#FBBF24" stroke="#D97706" stroke-width="3"/><text x="35" y="53" font-size="20" font-weight="900" fill="#78350F" text-anchor="middle">1</text><circle cx="115" cy="45" r="22" fill="#EEF2FF"/><text x="115" y="53" font-size="18" font-weight="900" fill="#4338CA" text-anchor="middle">4</text><circle cx="195" cy="45" r="22" fill="#EEF2FF"/><text x="195" y="53" font-size="18" font-weight="900" fill="#4338CA" text-anchor="middle">5</text><text x="115" y="105" font-size="12" font-weight="900" fill="#3730A3" text-anchor="middle">1 adalah paling sedikit</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }],
    correctAnswer: 'A',
    explanation: 'Bilangan 1 bernilai paling sedikit (paling kecil) di antara 1, 4, dan 5.'
  },
  {
    id: 'PENY-A-MAT-15',
    number: 15,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Perhatikan urutan bentuk berikut:\n🔴 🟦 🔴 🟦 ...\nBentuk apa selanjutnya?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Pola Bentuk Geometri', '#EF4444',
        `<g transform="translate(50, 25)"><circle cx="30" cy="45" r="18" fill="#EF4444"/><rect x="70" y="27" width="36" height="36" fill="#3B82F6" rx="4"/><circle cx="140" cy="45" r="18" fill="#EF4444"/><rect x="180" y="27" width="36" height="36" fill="#3B82F6" rx="4"/><circle cx="250" cy="45" r="22" fill="#EF4444" stroke="#B91C1C" stroke-width="3"/><text x="150" y="105" font-size="14" font-weight="900" fill="#B91C1C" text-anchor="middle">POLA: 🔴 🟦 🔴 🟦 [ 🔴 ]</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '🔴' }, { key: 'B', text: '🟦' }, { key: 'C', text: '⭐' }],
    correctAnswer: 'A',
    explanation: 'Polanya adalah merah bergantian dengan biru (lingkaran merah, kotak biru). Setelah kotak biru adalah lingkaran merah (🔴).'
  },
  {
    id: 'PENY-A-MAT-16',
    number: 16,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Berapakah jumlah jari pada satu tangan kita?\n🖐️',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Menghitung Jari Tangan', '#3B82F6',
        `<g transform="translate(130, 15)"><text x="70" y="75" font-size="52" text-anchor="middle">🖐️</text><text x="70" y="115" font-size="15" font-weight="900" fill="#1D4ED8" text-anchor="middle">5 JARI TANGAN</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }],
    correctAnswer: 'B',
    explanation: 'Satu tangan manusia normal memiliki 5 jari.'
  },
  {
    id: 'PENY-A-MAT-17',
    number: 17,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Bentuk manakah yang memiliki 4 sisi sama panjang?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Bentuk Persegi', '#8B5CF6',
        `<g transform="translate(130, 15)"><rect x="30" y="25" width="80" height="80" rx="8" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="4"/><text x="70" y="70" font-size="12" font-weight="900" fill="#6D28D9" text-anchor="middle">4 Sisi Sama</text><text x="70" y="115" font-size="13" font-weight="900" fill="#5B21B6" text-anchor="middle">PERSEGI (KOTAK)</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Persegi (kotak)' }, { key: 'B', text: 'Lingkaran' }, { key: 'C', text: 'Segitiga' }],
    correctAnswer: 'A',
    explanation: 'Persegi memiliki 4 sisi yang semua panjangnya sama.'
  },
  {
    id: 'PENY-A-MAT-18',
    number: 18,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Ada 4 kupu-kupu 🦋 🦋 🦋 🦋. Terbang 2. Sisa berapa kupu-kupu yang hinggap?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Pengurangan: 4 - 2', '#EC4899',
        `<g transform="translate(75, 20)"><text x="25" y="55" font-size="28">🦋 🦋</text><text x="110" y="55" font-size="28" opacity="0.3">🦋 🦋</text><text x="120" y="105" font-size="14" font-weight="900" fill="#9D174D" text-anchor="middle">4 - 2 = 2 KUPU-KUPU</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }],
    correctAnswer: 'B',
    explanation: '4 kupu-kupu dikurangi 2 yang terbang tersisa 2 kupu-kupu (4 - 2 = 2).'
  },
  {
    id: 'PENY-A-MAT-19',
    number: 19,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Manakah benda yang berukuran lebih panjang?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Panjang Pendek', '#3B82F6',
        `<g transform="translate(60, 20)"><rect x="15" y="25" width="220" height="28" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/><text x="125" y="44" font-size="12" font-weight="900" fill="#B45309" text-anchor="middle">PENGGARIS 30 CM (LEBIH PANJANG)</text><rect x="90" y="65" width="45" height="20" rx="3" fill="#E2E8F0" stroke="#64748B"/><text x="112" y="80" font-size="9" font-weight="bold" fill="#475569" text-anchor="middle">Penghapus</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Penggaris 30 cm' }, { key: 'B', text: 'Penghapus pensil' }, { key: 'C', text: 'Rautan pensil' }],
    correctAnswer: 'A',
    explanation: 'Penggaris berukuran 30 cm jauh lebih panjang dibanding penghapus dan rautan pensil.'
  },
  {
    id: 'PENY-A-MAT-20',
    number: 20,
    category: 'Kategori A',
    subject: 'Matematika',
    level: 'PAUD/TK',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Mudah',
    questionText: 'Urutkan bilangan berikut dari yang paling kecil:\n3, 1, 2',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Penyisihan TK', 'Urutan Terkecil ke Terbesar', '#10B981',
        `<g transform="translate(80, 25)"><circle cx="35" cy="45" r="22" fill="#DCFCE7" stroke="#10B981" stroke-width="2"/><text x="35" y="53" font-size="18" font-weight="900" fill="#15803D" text-anchor="middle">1</text><circle cx="115" cy="45" r="22" fill="#DCFCE7" stroke="#10B981" stroke-width="2"/><text x="115" y="53" font-size="18" font-weight="900" fill="#15803D" text-anchor="middle">2</text><circle cx="195" cy="45" r="22" fill="#DCFCE7" stroke="#10B981" stroke-width="2"/><text x="195" y="53" font-size="18" font-weight="900" fill="#15803D" text-anchor="middle">3</text><text x="115" y="105" font-size="14" font-weight="900" fill="#047857" text-anchor="middle">URUTAN: 1, 2, 3</text></g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '3, 2, 1' }, { key: 'B', text: '2, 1, 3' }, { key: 'C', text: '1, 2, 3' }],
    correctAnswer: 'C',
    explanation: 'Urutan bilangan dari yang paling kecil adalah 1, kemudian 2, lalu 3 (1, 2, 3).'
  }
];
