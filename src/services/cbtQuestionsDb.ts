export interface QuestionItem {
  id: string;
  number: number;
  subject: string; // 'Matematika' | 'IPA / Sains' | 'Bahasa Indonesia' | 'Bahasa Inggris'
  questionText: string;
  imageSvg?: string; // SVG visual illustration
  imageUrl?: string;  // Image URL if customized by admin
  options: {
    key: string; // 'A' | 'B' | 'C' | 'D'
    text: string;
  }[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
}

const STORAGE_QUESTIONS_KEY = 'osn_cbt_questions_database_2026';

// Helper to create simple crisp geometric SVG data URIs
function makeSvgDataUri(svgContent: string): string {
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180" width="360" height="180">${svgContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}

// 1. MATEMATIKA (20 Soal Bergambar & Ilustrasi Geometris/Grafik/Diagram)
const MATH_QUESTIONS: QuestionItem[] = [
  {
    id: 'math-1',
    number: 1,
    subject: 'Matematika',
    questionText: 'Perhatikan gambar balok di samping! Jika balok memiliki panjang 12 cm, lebar 5 cm, dan tinggi 8 cm, berapakah volume balok tersebut?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <polygon points="60,130 200,130 270,70 130,70" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <polygon points="60,130 200,130 200,60 60,60" fill="#7dd3fc" stroke="#0284c7" stroke-width="2"/>
      <polygon points="200,130 270,70 270,0 200,60" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <polygon points="60,60 200,60 270,0 130,0" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <text x="120" y="150" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">p = 12 cm</text>
      <text x="240" y="110" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">l = 5 cm</text>
      <text x="35" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">t = 8 cm</text>
    `),
    options: [
      { key: 'A', text: '420 cm³' },
      { key: 'B', text: '480 cm³' },
      { key: 'C', text: '520 cm³' },
      { key: 'D', text: '600 cm³' }
    ],
    correctAnswer: 'B',
    explanation: 'Volume Balok = p × l × t = 12 × 5 × 8 = 480 cm³.'
  },
  {
    id: 'math-2',
    number: 2,
    subject: 'Matematika',
    questionText: 'Perhatikan segitiga siku-siku berikut. Jika panjang alas adalah 15 cm dan tinggi 8 cm, berapakah panjang sisi miring (hipotenusa) segitiga tersebut?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <polygon points="70,140 260,140 70,30" fill="#fed7aa" stroke="#ea580c" stroke-width="3"/>
      <rect x="70" y="125" width="15" height="15" fill="none" stroke="#ea580c" stroke-width="2"/>
      <text x="160" y="160" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">15 cm</text>
      <text x="30" y="85" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">8 cm</text>
      <text x="180" y="75" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ea580c">c = ?</text>
    `),
    options: [
      { key: 'A', text: '16 cm' },
      { key: 'B', text: '17 cm' },
      { key: 'C', text: '19 cm' },
      { key: 'D', text: '23 cm' }
    ],
    correctAnswer: 'B',
    explanation: 'c = √(15² + 8²) = √(225 + 64) = √289 = 17 cm.'
  },
  {
    id: 'math-3',
    number: 3,
    subject: 'Matematika',
    questionText: 'Perhatikan diagram lingkaran kegemaran 200 siswa terhadap cabang olahraga berikut. Berapa banyak siswa yang gemar sepak bola?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="120" cy="90" r="70" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
      <path d="M 120 90 L 120 20 A 70 70 0 0 1 190 90 Z" fill="#22c55e"/>
      <path d="M 120 90 L 190 90 A 70 70 0 0 1 120 160 Z" fill="#3b82f6"/>
      <path d="M 120 90 L 120 160 A 70 70 0 0 1 50 90 Z" fill="#f59e0b"/>
      <path d="M 120 90 L 50 90 A 70 70 0 0 1 120 20 Z" fill="#ef4444"/>
      <text x="210" y="55" font-family="sans-serif" font-size="12" font-weight="bold" fill="#15803d">■ Sepak Bola: 40%</text>
      <text x="210" y="80" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1d4ed8">■ Bulu Tangkis: 25%</text>
      <text x="210" y="105" font-family="sans-serif" font-size="12" font-weight="bold" fill="#b45309">■ Basket: 20%</text>
      <text x="210" y="130" font-family="sans-serif" font-size="12" font-weight="bold" fill="#b91c1c">■ Renang: 15%</text>
    `),
    options: [
      { key: 'A', text: '60 siswa' },
      { key: 'B', text: '75 siswa' },
      { key: 'C', text: '80 siswa' },
      { key: 'D', text: '100 siswa' }
    ],
    correctAnswer: 'C',
    explanation: 'Jumlah siswa gemar sepak bola = 40% × 200 = 80 siswa.'
  },
  {
    id: 'math-4',
    number: 4,
    subject: 'Matematika',
    questionText: 'Berapakah luas daerah yang diarsir pada lingkaran berdiameter 28 cm berikut? (Gunakan π = 22/7)',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="70" fill="#f1f5f9" stroke="#334155" stroke-width="2"/>
      <path d="M 180 90 L 180 20 A 70 70 0 0 1 250 90 Z" fill="#fcd34d" stroke="#d97706" stroke-width="2"/>
      <path d="M 180 90 L 110 90 A 70 70 0 0 1 180 160 Z" fill="#fcd34d" stroke="#d97706" stroke-width="2"/>
      <line x1="110" y1="90" x2="250" y2="90" stroke="#334155" stroke-dasharray="4"/>
      <line x1="180" y1="20" x2="180" y2="160" stroke="#334155" stroke-dasharray="4"/>
      <text x="135" y="172" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Diameter = 28 cm</text>
    `),
    options: [
      { key: 'A', text: '154 cm²' },
      { key: 'B', text: '308 cm²' },
      { key: 'C', text: '616 cm²' },
      { key: 'D', text: '1232 cm²' }
    ],
    correctAnswer: 'B',
    explanation: 'Dua juring masing-masing 90° membentuk setengah lingkaran (180°). Luas = 1/2 × π × r² = 1/2 × 22/7 × 14 × 14 = 308 cm².'
  },
  {
    id: 'math-5',
    number: 5,
    subject: 'Matematika',
    questionText: 'Perhatikan pola bilangan bertingkat pada susunan batang korek api berikut. Berapa jumlah batang korek api pada pola ke-5?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="40" y="100" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="3"/>
      <text x="45" y="150" font-family="sans-serif" font-size="12" font-bold fill="#334155">Pola 1 (4)</text>
      <rect x="110" y="100" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="3"/>
      <rect x="140" y="100" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="3"/>
      <text x="120" y="150" font-family="sans-serif" font-size="12" font-bold fill="#334155">Pola 2 (7)</text>
      <rect x="200" y="100" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="3"/>
      <rect x="230" y="100" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="3"/>
      <rect x="260" y="100" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="3"/>
      <text x="215" y="150" font-family="sans-serif" font-size="12" font-bold fill="#334155">Pola 3 (10)</text>
    `),
    options: [
      { key: 'A', text: '13' },
      { key: 'B', text: '15' },
      { key: 'C', text: '16' },
      { key: 'D', text: '19' }
    ],
    correctAnswer: 'C',
    explanation: 'Pola aritmatika: 4, 7, 10, 13, 16. Rumus Un = 3n + 1. Untuk n=5 -> 3(5)+1 = 16.'
  },
  {
    id: 'math-6',
    number: 6,
    subject: 'Matematika',
    questionText: 'Berapakah keliling dari bangun trapesium sama kaki pada gambar di samping?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <polygon points="120,40 240,40 280,130 80,130" fill="#ccfbf1" stroke="#0f766e" stroke-width="3"/>
      <text x="165" y="32" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f766e">10 cm</text>
      <text x="165" y="150" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f766e">22 cm</text>
      <text x="75" y="80" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f766e">10 cm</text>
      <text x="265" y="80" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f766e">10 cm</text>
    `),
    options: [
      { key: 'A', text: '42 cm' },
      { key: 'B', text: '50 cm' },
      { key: 'C', text: '52 cm' },
      { key: 'D', text: '56 cm' }
    ],
    correctAnswer: 'C',
    explanation: 'Keliling = 10 + 10 + 10 + 22 = 52 cm.'
  },
  {
    id: 'math-7',
    number: 7,
    subject: 'Matematika',
    questionText: 'Sebuah akuarium berbentuk kubus dengan panjang rusuk 50 cm terisi air separuh bagiannya. Berapa liter air yang ada di dalam akuarium?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="130" y="50" width="100" height="100" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <rect x="130" y="100" width="100" height="50" fill="#38bdf8" opacity="0.6"/>
      <line x1="120" y1="50" x2="120" y2="150" stroke="#0369a1" stroke-width="1.5"/>
      <text x="40" y="105" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0369a1">s = 50 cm (1/2 isi)</text>
    `),
    options: [
      { key: 'A', text: '62,5 Liter' },
      { key: 'B', text: '125 Liter' },
      { key: 'C', text: '250 Liter' },
      { key: 'D', text: '500 Liter' }
    ],
    correctAnswer: 'A',
    explanation: 'Volume total = 50 × 50 × 50 = 125.000 cm³ = 125 Liter. Setengah isi = 125 / 2 = 62,5 Liter.'
  },
  {
    id: 'math-8',
    number: 8,
    subject: 'Matematika',
    questionText: 'Perhatikan diagram batang nilai ulangan matematika siswa kelas VI berikut. Berapakah rata-rata nilai siswa?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <line x1="50" y1="140" x2="320" y2="140" stroke="#334155" stroke-width="2"/>
      <rect x="80" y="100" width="35" height="40" fill="#6366f1"/>
      <rect x="140" y="60" width="35" height="80" fill="#6366f1"/>
      <rect x="200" y="40" width="35" height="100" fill="#6366f1"/>
      <rect x="260" y="80" width="35" height="60" fill="#6366f1"/>
      <text x="85" y="155" font-family="sans-serif" font-size="11" fill="#1e293b">Nilai 70 (4)</text>
      <text x="145" y="155" font-family="sans-serif" font-size="11" fill="#1e293b">Nilai 80 (8)</text>
      <text x="205" y="155" font-family="sans-serif" font-size="11" fill="#1e293b">Nilai 90 (10)</text>
      <text x="265" y="155" font-family="sans-serif" font-size="11" fill="#1e293b">Nilai 100 (6)</text>
    `),
    options: [
      { key: 'A', text: '84,5' },
      { key: 'B', text: '86,4' },
      { key: 'C', text: '87,2' },
      { key: 'D', text: '88,0' }
    ],
    correctAnswer: 'B',
    explanation: 'Total nilai = (70×4) + (80×8) + (90×10) + (100×6) = 280 + 640 + 900 + 600 = 2420. Jumlah siswa = 28. Rata-rata = 2420 / 28 ≈ 86,4.'
  },
  {
    id: 'math-9',
    number: 9,
    subject: 'Matematika',
    questionText: 'Berapakah besar sudut x pada gambar garis sejajar yang dipotong oleh sebuah garis transversal berikut?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <line x1="40" y1="60" x2="320" y2="60" stroke="#0f172a" stroke-width="2"/>
      <line x1="40" y1="120" x2="320" y2="120" stroke="#0f172a" stroke-width="2"/>
      <line x1="100" y1="150" x2="260" y2="30" stroke="#dc2626" stroke-width="2.5"/>
      <text x="180" y="52" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">115°</text>
      <text x="155" y="140" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0284c7">x = ?</text>
    `),
    options: [
      { key: 'A', text: '65°' },
      { key: 'B', text: '75°' },
      { key: 'C', text: '115°' },
      { key: 'D', text: '125°' }
    ],
    correctAnswer: 'A',
    explanation: 'Sudut dalam sepihak berjumlah 180°. Maka x = 180° - 115° = 65°.'
  },
  {
    id: 'math-10',
    number: 10,
    subject: 'Matematika',
    questionText: 'Sebuah denah rumah berskala 1 : 150. Jika ukuran ruang tamu pada denah adalah 4 cm × 6 cm, berapakah luas ruang tamu yang sebenarnya?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="120" y="45" width="120" height="80" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="160" y="38" font-family="sans-serif" font-size="12" font-weight="bold" fill="#92400e">6 cm</text>
      <text x="90" y="90" font-family="sans-serif" font-size="12" font-weight="bold" fill="#92400e">4 cm</text>
      <text x="140" y="150" font-family="sans-serif" font-size="12" fill="#78350f">Skala 1 : 150</text>
    `),
    options: [
      { key: 'A', text: '36 m²' },
      { key: 'B', text: '48 m²' },
      { key: 'C', text: '54 m²' },
      { key: 'D', text: '60 m²' }
    ],
    correctAnswer: 'C',
    explanation: 'Panjang sebenarnya = 6 cm × 150 = 900 cm = 9 m. Lebar sebenarnya = 4 cm × 150 = 600 cm = 6 m. Luas = 9 m × 6 m = 54 m².'
  },
  {
    id: 'math-11',
    number: 11,
    subject: 'Matematika',
    questionText: 'Pecahan desimal yang mewakili bagian berwarna gelap pada kisi persegi 100 kotak berikut adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="130" y="30" width="100" height="100" fill="#ffffff" stroke="#334155" stroke-width="2"/>
      <rect x="130" y="30" width="70" height="100" fill="#3b82f6"/>
      <rect x="200" y="30" width="10" height="50" fill="#3b82f6"/>
      <text x="145" y="150" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b">75 kotak dari 100</text>
    `),
    options: [
      { key: 'A', text: '0,55' },
      { key: 'B', text: '0,65' },
      { key: 'C', text: '0,75' },
      { key: 'D', text: '0,85' }
    ],
    correctAnswer: 'C',
    explanation: '75 / 100 = 0,75.'
  },
  {
    id: 'math-12',
    number: 12,
    subject: 'Matematika',
    questionText: 'Sebuah limas persegi memiliki sisi alas 10 cm dan tinggi segitiga sisi tegak 12 cm. Berapakah luas permukaan limas tersebut?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <polygon points="180,30 110,130 250,130" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
      <polygon points="180,30 250,130 290,100" fill="#fcd34d" stroke="#d97706" stroke-width="2"/>
      <text x="165" y="150" font-family="sans-serif" font-size="12" font-weight="bold" fill="#78350f">s = 10 cm</text>
      <text x="215" y="75" font-family="sans-serif" font-size="12" font-weight="bold" fill="#b45309">t_segitiga = 12 cm</text>
    `),
    options: [
      { key: 'A', text: '240 cm²' },
      { key: 'B', text: '340 cm²' },
      { key: 'C', text: '380 cm²' },
      { key: 'D', text: '420 cm²' }
    ],
    correctAnswer: 'B',
    explanation: 'Luas alas = 10 × 10 = 100 cm². Luas 4 segitiga = 4 × (1/2 × 10 × 12) = 240 cm². Luas total = 100 + 240 = 340 cm².'
  },
  {
    id: 'math-13',
    number: 13,
    subject: 'Matematika',
    questionText: 'FPB dan KPK dari 24 dan 36 berturut-turut adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="140" cy="90" r="55" fill="#bae6fd" opacity="0.6"/>
      <circle cx="220" cy="90" r="55" fill="#fbcfe8" opacity="0.6"/>
      <text x="105" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0369a1">24</text>
      <text x="170" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569">FPB?</text>
      <text x="245" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#be185d">36</text>
    `),
    options: [
      { key: 'A', text: '6 dan 72' },
      { key: 'B', text: '12 dan 72' },
      { key: 'C', text: '12 dan 108' },
      { key: 'D', text: '18 dan 72' }
    ],
    correctAnswer: 'B',
    explanation: 'Faktorisasi 24 = 2³ × 3; 36 = 2² × 3². FPB = 2² × 3 = 12; KPK = 2³ × 3² = 72.'
  },
  {
    id: 'math-14',
    number: 14,
    subject: 'Matematika',
    questionText: 'Berapakah koordinat titik P pada bidang Cartesius berikut?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <line x1="40" y1="90" x2="320" y2="90" stroke="#64748b" stroke-width="1.5"/>
      <line x1="180" y1="10" x2="180" y2="170" stroke="#64748b" stroke-width="1.5"/>
      <circle cx="260" cy="50" r="5" fill="#dc2626"/>
      <line x1="260" y1="90" x2="260" y2="50" stroke="#dc2626" stroke-dasharray="3"/>
      <line x1="180" y1="50" x2="260" y2="50" stroke="#dc2626" stroke-dasharray="3"/>
      <text x="270" y="45" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626">P(4, 2)</text>
    `),
    options: [
      { key: 'A', text: '(2, 4)' },
      { key: 'B', text: '(4, 2)' },
      { key: 'C', text: '(-4, 2)' },
      { key: 'D', text: '(4, -2)' }
    ],
    correctAnswer: 'B',
    explanation: 'Titik P berjarak 4 satuan ke kanan (sumbu X) dan 2 satuan ke atas (sumbu Y), sehingga koordinatnya (4, 2).'
  },
  {
    id: 'math-15',
    number: 15,
    subject: 'Matematika',
    questionText: 'Sebuah drum minyak berbentuk tabung memiliki jari-jari 35 cm dan tinggi 100 cm. Berapakah volume minyak saat drum terisi penuh? (π = 22/7)',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <ellipse cx="180" cy="50" rx="60" ry="20" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
      <rect x="120" y="50" width="120" height="80" fill="#ffedd5"/>
      <ellipse cx="180" cy="130" rx="60" ry="20" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
      <line x1="120" y1="50" x2="120" y2="130" stroke="#c2410c" stroke-width="2"/>
      <line x1="240" y1="50" x2="240" y2="130" stroke="#c2410c" stroke-width="2"/>
      <text x="250" y="95" font-family="sans-serif" font-size="12" font-weight="bold" fill="#7c2d12">t = 100 cm</text>
      <text x="145" y="48" font-family="sans-serif" font-size="12" font-weight="bold" fill="#7c2d12">r = 35 cm</text>
    `),
    options: [
      { key: 'A', text: '350.000 cm³' },
      { key: 'B', text: '385.000 cm³' },
      { key: 'C', text: '410.000 cm³' },
      { key: 'D', text: '440.000 cm³' }
    ],
    correctAnswer: 'B',
    explanation: 'Volume tabung = π × r² × t = (22/7) × 35 × 35 × 100 = 385.000 cm³ (385 Liter).'
  },
  {
    id: 'math-16',
    number: 16,
    subject: 'Matematika',
    questionText: 'Kecepatan rata-rata sebuah mobil adalah 60 km/jam. Jika mobil menempuh jarak 150 km, berapa lama waktu yang diperlukan?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="60" fill="#f8fafc" stroke="#334155" stroke-width="4"/>
      <line x1="180" y1="90" x2="180" y2="40" stroke="#0284c7" stroke-width="3"/>
      <line x1="180" y1="90" x2="220" y2="90" stroke="#dc2626" stroke-width="3"/>
      <text x="90" y="165" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b">v = 60 km/jam, s = 150 km</text>
    `),
    options: [
      { key: 'A', text: '2 jam 15 menit' },
      { key: 'B', text: '2 jam 30 menit' },
      { key: 'C', text: '2 jam 45 menit' },
      { key: 'D', text: '3 jam' }
    ],
    correctAnswer: 'B',
    explanation: 't = s / v = 150 / 60 = 2,5 jam = 2 jam 30 menit.'
  },
  {
    id: 'math-17',
    number: 17,
    subject: 'Matematika',
    questionText: 'Perbandingan uang tabungan Alif dan Bima adalah 3 : 5. Jika selisih uang mereka adalah Rp 40.000, berapakah jumlah uang mereka berdua?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="50" width="90" height="30" fill="#86efac" stroke="#15803d" stroke-width="2"/>
      <text x="85" y="70" font-family="sans-serif" font-size="12" font-weight="bold" fill="#14532d">Alif (3 bag)</text>
      <rect x="70" y="100" width="150" height="30" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
      <text x="85" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e3a8a">Bima (5 bag)</text>
      <text x="235" y="115" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">Selisih: 40rb</text>
    `),
    options: [
      { key: 'A', text: 'Rp 120.000' },
      { key: 'B', text: 'Rp 140.000' },
      { key: 'C', text: 'Rp 160.000' },
      { key: 'D', text: 'Rp 180.000' }
    ],
    correctAnswer: 'C',
    explanation: 'Selisih perbandingan = 5 - 3 = 2 bagian = Rp 40.000 -> 1 bagian = Rp 20.000. Jumlah = (3 + 5) × 20.000 = Rp 160.000.'
  },
  {
    id: 'math-18',
    number: 18,
    subject: 'Matematika',
    questionText: 'Berapakah luas daerah layang-layang dengan panjang diagonal d1 = 16 cm dan d2 = 24 cm?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <polygon points="180,20 250,80 180,150 110,80" fill="#e9d5ff" stroke="#7e22ce" stroke-width="2"/>
      <line x1="180" y1="20" x2="180" y2="150" stroke="#7e22ce" stroke-dasharray="3"/>
      <line x1="110" y1="80" x2="250" y2="80" stroke="#7e22ce" stroke-dasharray="3"/>
      <text x="185" y="90" font-family="sans-serif" font-size="11" font-weight="bold" fill="#581c87">d1=16, d2=24</text>
    `),
    options: [
      { key: 'A', text: '184 cm²' },
      { key: 'B', text: '192 cm²' },
      { key: 'C', text: '204 cm²' },
      { key: 'D', text: '384 cm²' }
    ],
    correctAnswer: 'B',
    explanation: 'Luas layang-layang = 1/2 × d1 × d2 = 1/2 × 16 × 24 = 192 cm².'
  },
  {
    id: 'math-19',
    number: 19,
    subject: 'Matematika',
    questionText: 'Berapakah hasil dari 2,75 + 1 1/2 - 0,25 dalam bentuk pecahan biasa paling sederhana?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="50" y="50" width="260" height="80" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
      <text x="65" y="95" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e40af">2,75 + 1 1/2 - 0,25 = ?</text>
    `),
    options: [
      { key: 'A', text: '3' },
      { key: 'B', text: '4' },
      { key: 'C', text: '4 1/4' },
      { key: 'D', text: '4 1/2' }
    ],
    correctAnswer: 'B',
    explanation: '2,75 + 1,50 - 0,25 = 4,0 = 4.'
  },
  {
    id: 'math-20',
    number: 20,
    subject: 'Matematika',
    questionText: 'Sebuah kawat sepanjang 2 meter akan dibuat kerangka kubus dengan panjang rusuk 15 cm. Berapa sisa kawat yang tidak terpakai?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <line x1="50" y1="120" x2="310" y2="120" stroke="#ea580c" stroke-width="4"/>
      <text x="120" y="105" font-family="sans-serif" font-size="13" font-weight="bold" fill="#9a3412">Panjang Kawat = 2 m (200 cm)</text>
      <text x="135" y="150" font-family="sans-serif" font-size="12" fill="#475569">Rusuk kubus = 12 × 15 cm</text>
    `),
    options: [
      { key: 'A', text: '10 cm' },
      { key: 'B', text: '20 cm' },
      { key: 'C', text: '30 cm' },
      { key: 'D', text: '40 cm' }
    ],
    correctAnswer: 'B',
    explanation: 'Total panjang rusuk kubus = 12 × 15 cm = 180 cm. Sisa kawat = 200 cm - 180 cm = 20 cm.'
  }
];

// 2. IPA / SAINS (20 Soal Bergambar & Fenomena Alam)
const SCIENCE_QUESTIONS: QuestionItem[] = [
  {
    id: 'sci-1',
    number: 1,
    subject: 'IPA / Sains',
    questionText: 'Perhatikan gambar daur hidup kupu-kupu berikut! Tahapan yang sering merugikan petani daun tanaman pada metamorfosis sempurna ini adalah tahap nomor...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="80" cy="50" r="25" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <text x="70" y="55" font-family="sans-serif" font-size="12" font-bold fill="#854d0e">1. Telur</text>
      <circle cx="280" cy="50" r="25" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
      <text x="265" y="55" font-family="sans-serif" font-size="12" font-bold fill="#14532d">2. Ulat</text>
      <circle cx="280" cy="130" r="25" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <text x="260" y="135" font-family="sans-serif" font-size="12" font-bold fill="#7c2d12">3. Pupa</text>
      <circle cx="80" cy="130" r="25" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <text x="65" y="135" font-family="sans-serif" font-size="12" font-bold fill="#831843">4. Dewasa</text>
    `),
    options: [
      { key: 'A', text: 'Nomor 1 (Telur)' },
      { key: 'B', text: 'Nomor 2 (Larva / Ulat)' },
      { key: 'C', text: 'Nomor 3 (Pupa / Kepompong)' },
      { key: 'D', text: 'Nomor 4 (Imago / Kupu-kupu)' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada tahap ulat (larva), kupu-kupu sangat aktif memakan dedaunan tanaman untuk memenuhi cadangan energi sebelum masuk fase pupa.'
  },
  {
    id: 'sci-2',
    number: 2,
    subject: 'IPA / Sains',
    questionText: 'Perhatikan posisi Matahari, Bulan, dan Bumi pada gambar berikut! Peristiwa gerhana yang terjadi saat Bulan berada di bayangan umbra Bumi adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#0f172a"/>
      <circle cx="60" cy="90" r="35" fill="#facc15"/>
      <text x="35" y="145" font-family="sans-serif" font-size="11" fill="#fde047">Matahari</text>
      <circle cx="200" cy="90" r="25" fill="#38bdf8"/>
      <text x="185" y="135" font-family="sans-serif" font-size="11" fill="#7dd3fc">Bumi</text>
      <circle cx="300" cy="90" r="12" fill="#e2e8f0"/>
      <text x="285" y="125" font-family="sans-serif" font-size="11" fill="#f1f5f9">Bulan</text>
    `),
    options: [
      { key: 'A', text: 'Gerhana Matahari Total' },
      { key: 'B', text: 'Gerhana Matahari Cincin' },
      { key: 'C', text: 'Gerhana Bulan Total' },
      { key: 'D', text: 'Bulan Purnama Biasa' }
    ],
    correctAnswer: 'C',
    explanation: 'Ketika posisi Bumi berada tepat di antara Matahari dan Bulan, cahaya Matahari terhalang Bumi sehingga terjadi Gerhana Bulan.'
  },
  {
    id: 'sci-3',
    number: 3,
    subject: 'IPA / Sains',
    questionText: 'Pada sistem peredaran darah manusia, pembuluh darah yang membawa darah kaya oksigen dari paru-paru menuju ke jantung (serambi kiri) adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="80" height="80" rx="10" fill="#fecdd3" stroke="#e11d48" stroke-width="2"/>
      <text x="75" y="95" font-family="sans-serif" font-size="12" font-bold fill="#9f1239">Paru-paru</text>
      <path d="M 140 90 L 220 90" stroke="#e11d48" stroke-width="3" marker-end="url(#arrow)"/>
      <rect x="220" y="50" width="80" height="80" rx="10" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>
      <text x="235" y="95" font-family="sans-serif" font-size="12" font-bold fill="#991b1b">Jantung</text>
    `),
    options: [
      { key: 'A', text: 'Arteri Pulmonalis' },
      { key: 'B', text: 'Vena Pulmonalis' },
      { key: 'C', text: 'Aorta' },
      { key: 'D', text: 'Vena Kava' }
    ],
    correctAnswer: 'B',
    explanation: 'Vena pulmonalis membawa darah bersih beroksigen dari paru-paru ke serambi kiri jantung.'
  },
  {
    id: 'sci-4',
    number: 4,
    subject: 'IPA / Sains',
    questionText: 'Perhatikan gambar sendi pada siku manusia berikut. Jenis sendi yang memungkinkan gerakan satu arah seperti engsel pintu adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <line x1="180" y1="30" x2="180" y2="90" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
      <line x1="180" y1="90" x2="240" y2="130" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
      <circle cx="180" cy="90" r="12" fill="#f59e0b"/>
      <text x="110" y="95" font-family="sans-serif" font-size="12" font-bold fill="#1e293b">Sendi Siku</text>
    `),
    options: [
      { key: 'A', text: 'Sendi Engsel' },
      { key: 'B', text: 'Sendi Peluru' },
      { key: 'C', text: 'Sendi Putar' },
      { key: 'D', text: 'Sendi Pelana' }
    ],
    correctAnswer: 'A',
    explanation: 'Sendi engsel memungkinkan gerakan satu arah seperti pada siku tangan dan lutut kaki.'
  },
  {
    id: 'sci-5',
    number: 5,
    subject: 'IPA / Sains',
    questionText: 'Bagian tumbuhan pada gambar yang berfungsi utama menyerap air dan garam mineral dari dalam tanah adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <line x1="180" y1="30" x2="180" y2="110" stroke="#15803d" stroke-width="5"/>
      <circle cx="180" cy="30" r="20" fill="#22c55e"/>
      <path d="M 180 110 L 150 160 M 180 110 L 180 170 M 180 110 L 210 160" stroke="#92400e" stroke-width="3"/>
      <text x="220" y="150" font-family="sans-serif" font-size="13" font-bold fill="#78350f">Bagian Bawah (Akar)</text>
    `),
    options: [
      { key: 'A', text: 'Daun' },
      { key: 'B', text: 'Batang' },
      { key: 'C', text: 'Akar' },
      { key: 'D', text: 'Bunga' }
    ],
    correctAnswer: 'C',
    explanation: 'Akar berfungsi menyerap air dan zat hara mineral dari dalam tanah serta memperkokoh berdirinya tanaman.'
  },
  {
    id: 'sci-6',
    number: 6,
    subject: 'IPA / Sains',
    questionText: 'Perhatikan jaring-jaring makanan berikut: Padi -> Belalang -> Katak -> Ular -> Elang. Jika populasi katak menurun drastis karena diburu, dampak yang langsung terjadi adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <text x="30" y="90" font-family="sans-serif" font-size="12" font-bold fill="#15803d">Padi</text>
      <text x="90" y="90" font-family="sans-serif" font-size="12" font-bold fill="#475569">→</text>
      <text x="110" y="90" font-family="sans-serif" font-size="12" font-bold fill="#ea580c">Belalang</text>
      <text x="175" y="90" font-family="sans-serif" font-size="12" font-bold fill="#475569">→</text>
      <text x="195" y="90" font-family="sans-serif" font-size="12" font-bold fill="#dc2626">[Katak (Turun)]</text>
      <text x="280" y="90" font-family="sans-serif" font-size="12" font-bold fill="#475569">→</text>
      <text x="300" y="90" font-family="sans-serif" font-size="12" font-bold fill="#7c2d12">Ular</text>
    `),
    options: [
      { key: 'A', text: 'Populasi belalang melonjak meningkat' },
      { key: 'B', text: 'Populasi padi meningkat cepat' },
      { key: 'C', text: 'Populasi ular bertambah banyak' },
      { key: 'D', text: 'Populasi elang tidak terpengaruh sama sekali' }
    ],
    correctAnswer: 'A',
    explanation: 'Karena pemangsa utamanya (katak) berkurang, maka populasi belalang akan meningkat drastis.'
  },
  {
    id: 'sci-7',
    number: 7,
    subject: 'IPA / Sains',
    questionText: 'Bentuk adaptasi tumbuhan kaktus yang hidup di lingkungan padang pasir yang kering dan panas (xerofit) adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#fef08a"/>
      <path d="M 180 40 Q 170 140 180 160" stroke="#15803d" stroke-width="30" stroke-linecap="round"/>
      <path d="M 150 80 Q 150 110 180 110" stroke="#15803d" stroke-width="16" fill="none" stroke-linecap="round"/>
      <text x="210" y="90" font-family="sans-serif" font-size="12" font-bold fill="#14532d">Daun berbentuk duri</text>
    `),
    options: [
      { key: 'A', text: 'Daun lebar dan tipis' },
      { key: 'B', text: 'Daun berbentuk duri untuk mengurangi penguapan' },
      { key: 'C', text: 'Batang berongga udara besar' },
      { key: 'D', text: 'Akar napas yang menjulang ke atas' }
    ],
    correctAnswer: 'B',
    explanation: 'Kaktus memodifikasi daunnya menjadi duri guna menekan penguapan air di lingkungan kering.'
  },
  {
    id: 'sci-8',
    number: 8,
    subject: 'IPA / Sains',
    questionText: 'Perhatikan gambar rangkaian listrik berikut! Jika saklar S1 ditutup dan S2 dibuka, lampu manakah yang menyala?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="80" y="40" width="200" height="100" fill="none" stroke="#334155" stroke-width="2"/>
      <circle cx="120" cy="40" r="12" fill="#fde047" stroke="#ca8a04"/>
      <text x="115" y="44" font-family="sans-serif" font-size="10" font-bold fill="#854d0e">L1</text>
      <circle cx="240" cy="40" r="12" fill="#e2e8f0" stroke="#94a3b8"/>
      <text x="235" y="44" font-family="sans-serif" font-size="10" font-bold fill="#475569">L2</text>
      <text x="160" y="160" font-family="sans-serif" font-size="11" font-bold fill="#0f172a">Baterai & Saklar</text>
    `),
    options: [
      { key: 'A', text: 'Hanya Lampu L1' },
      { key: 'B', text: 'Hanya Lampu L2' },
      { key: 'C', text: 'Lampu L1 dan L2 menyala' },
      { key: 'D', text: 'Semua lampu mati' }
    ],
    correctAnswer: 'A',
    explanation: 'Pada rangkaian paralel, saklar pada cabang L1 tertutup sehingga arus listrik hanya mengalir ke L1.'
  },
  {
    id: 'sci-9',
    number: 9,
    subject: 'IPA / Sains',
    questionText: 'Peristiwa perpindahan panas yang terjadi saat sendok logam terasa panas ketika dimasukkan ke dalam secangkir teh hangat adalah contoh perpindahan secara...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="140" y="70" width="80" height="70" rx="8" fill="#fdba74" stroke="#c2410c" stroke-width="2"/>
      <line x1="160" y1="120" x2="220" y2="40" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
      <text x="145" y="160" font-family="sans-serif" font-size="11" font-bold fill="#9a3412">Sendok Logam di Teh Panas</text>
    `),
    options: [
      { key: 'A', text: 'Konveksi' },
      { key: 'B', text: 'Konduksi' },
      { key: 'C', text: 'Radiasi' },
      { key: 'D', text: 'Kondensasi' }
    ],
    correctAnswer: 'B',
    explanation: 'Konduksi adalah perpindahan panas melalui zat perantara (padat/logam) tanpa disertai perpindahan partikel zatnya.'
  },
  {
    id: 'sci-10',
    number: 10,
    subject: 'IPA / Sains',
    questionText: 'Alat musik tradisional Sasando dari Nusa Tenggara Timur dimainkan dengan cara...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <ellipse cx="180" cy="90" rx="50" ry="70" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
      <line x1="160" y1="30" x2="160" y2="150" stroke="#78350f" stroke-width="1.5"/>
      <line x1="180" y1="20" x2="180" y2="160" stroke="#78350f" stroke-width="2"/>
      <line x1="200" y1="30" x2="200" y2="150" stroke="#78350f" stroke-width="1.5"/>
      <text x="140" y="172" font-family="sans-serif" font-size="12" font-bold fill="#78350f">Sasando (NTT)</text>
    `),
    options: [
      { key: 'A', text: 'Dipukul' },
      { key: 'B', text: 'Digesek' },
      { key: 'C', text: 'Dipetik' },
      { key: 'D', text: 'Ditiup' }
    ],
    correctAnswer: 'C',
    explanation: 'Sasando dimainkan dengan cara dipetik menggunakan dawai-dawainya yang dipasang pada wadah daun lontar.'
  },
  {
    id: 'sci-11',
    number: 11,
    subject: 'IPA / Sains',
    questionText: 'Organ pernapasan pada serangga yang berupa pembuluh-pembuluh halus bercabang ke seluruh tubuh adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <ellipse cx="180" cy="90" rx="60" ry="30" fill="#86efac" stroke="#15803d" stroke-width="2"/>
      <path d="M 140 90 L 120 70 M 160 90 L 160 60 M 200 90 L 220 70" stroke="#15803d" stroke-width="2"/>
      <text x="110" y="145" font-family="sans-serif" font-size="12" font-bold fill="#14532d">Pernapasan Serangga</text>
    `),
    options: [
      { key: 'A', text: 'Insang' },
      { key: 'B', text: 'Trakea' },
      { key: 'C', text: 'Paru-paru buku' },
      { key: 'D', text: 'Kulit basah' }
    ],
    correctAnswer: 'B',
    explanation: 'Serangga bernapas menggunakan sistem trakea melalui pori-pori yang disebut spirakel.'
  },
  {
    id: 'sci-12',
    number: 12,
    subject: 'IPA / Sains',
    questionText: 'Planet dalam tata surya yang dijuluki sebagai "Planet Merah" karena kandungan besi oksida di permukaannya adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#090d16"/>
      <circle cx="180" cy="90" r="45" fill="#ef4444"/>
      <circle cx="160" cy="80" r="10" fill="#dc2626" opacity="0.6"/>
      <circle cx="200" cy="105" r="15" fill="#b91c1c" opacity="0.6"/>
      <text x="140" y="160" font-family="sans-serif" font-size="12" font-bold fill="#f87171">Planet Merah</text>
    `),
    options: [
      { key: 'A', text: 'Venus' },
      { key: 'B', text: 'Mars' },
      { key: 'C', text: 'Merkurius' },
      { key: 'D', text: 'Yupiter' }
    ],
    correctAnswer: 'B',
    explanation: 'Planet Mars memiliki warna kemerahan akibat tanahnya kaya akan mineral oksida besi.'
  },
  {
    id: 'sci-13',
    number: 13,
    subject: 'IPA / Sains',
    questionText: 'Gaya yang bekerja pada saat kita mengerem laju sepeda hingga berhenti di jalan aspal adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="45" fill="none" stroke="#334155" stroke-width="8"/>
      <rect x="175" y="35" width="10" height="20" fill="#dc2626"/>
      <text x="110" y="160" font-family="sans-serif" font-size="12" font-bold fill="#0f172a">Gesekan Kampas & Roda</text>
    `),
    options: [
      { key: 'A', text: 'Gaya Gravitasi' },
      { key: 'B', text: 'Gaya Pegas' },
      { key: 'C', text: 'Gaya Gesek' },
      { key: 'D', text: 'Gaya Magnet' }
    ],
    correctAnswer: 'C',
    explanation: 'Gaya gesek antara karet rem dengan pelek roda serta roda dengan aspal memperlambat dan menghentikan sepeda.'
  },
  {
    id: 'sci-14',
    number: 14,
    subject: 'IPA / Sains',
    questionText: 'Hubungan simbiosis mutualisme (saling menguntungkan) terjadi pada pasangan organisme berikut, yaitu...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="120" cy="90" r="35" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <text x="100" y="95" font-family="sans-serif" font-size="11" font-bold fill="#854d0e">Lebah</text>
      <text x="170" y="95" font-family="sans-serif" font-size="18" font-bold fill="#16a34a">⇄</text>
      <circle cx="240" cy="90" r="35" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <text x="215" y="95" font-family="sans-serif" font-size="11" font-bold fill="#831843">Bunga</text>
    `),
    options: [
      { key: 'A', text: 'Kutu dengan rambut manusia' },
      { key: 'B', text: 'Lebah dengan bunga mekar' },
      { key: 'C', text: 'Tali putri dengan tanaman inang' },
      { key: 'D', text: 'Ikan remora dengan ikan hiu' }
    ],
    correctAnswer: 'B',
    explanation: 'Lebah mendapatkan nektar manis sebagai makanan, sementara bunga dibantu proses penyerbukannya.'
  },
  {
    id: 'sci-15',
    number: 15,
    subject: 'IPA / Sains',
    questionText: 'Peristiwa pembelokan arah rambat cahaya saat melewati dua medium yang kerapatan optiknya berbeda disebut...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="80" y="90" width="200" height="70" fill="#bae6fd" stroke="#0284c7"/>
      <line x1="120" y1="30" x2="180" y2="90" stroke="#dc2626" stroke-width="3"/>
      <line x1="180" y1="90" x2="210" y2="150" stroke="#dc2626" stroke-width="3"/>
      <text x="130" y="172" font-family="sans-serif" font-size="12" font-bold fill="#0369a1">Udara ke Air (Bias)</text>
    `),
    options: [
      { key: 'A', text: 'Pemantulan cahaya' },
      { key: 'B', text: 'Pembiasan cahaya (Refraksi)' },
      { key: 'C', text: 'Penguraian cahaya (Dispersi)' },
      { key: 'D', text: 'Perambatan lurus' }
    ],
    correctAnswer: 'B',
    explanation: 'Pembiasan terjadi saat cahaya merambat dari udara ke medium air dengan sudut tertentu.'
  },
  {
    id: 'sci-16',
    number: 16,
    subject: 'IPA / Sains',
    questionText: 'Bahan tambang minyak bumi, gas alam, dan batu bara tergolong sebagai sumber daya alam yang...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="130" y="50" width="100" height="70" fill="#334155" rx="8"/>
      <text x="145" y="90" font-family="sans-serif" font-size="12" font-bold fill="#ffffff">FOSIL &</text>
      <text x="140" y="105" font-family="sans-serif" font-size="12" font-bold fill="#ffffff">MINYAK BUMI</text>
    `),
    options: [
      { key: 'A', text: 'Dapat diperbarui dengan cepat' },
      { key: 'B', text: 'Tidak dapat diperbarui karena butuh jutaan tahun' },
      { key: 'C', text: 'Tidak pernah habis dipakai' },
      { key: 'D', text: 'Bebas polusi' }
    ],
    correctAnswer: 'B',
    explanation: 'Bahan bakar fosil terbentuk dari endapan organisme jutaan tahun lalu sehingga tidak dapat diperbarui dalam waktu singkat.'
  },
  {
    id: 'sci-17',
    number: 17,
    subject: 'IPA / Sains',
    questionText: 'Perubahan wujud zat dari cair menjadi gas saat air dipanaskan hingga mendidih disebut...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <ellipse cx="180" cy="120" rx="50" ry="20" fill="#93c5fd"/>
      <path d="M 160 100 Q 150 70 160 50 M 180 100 Q 170 70 180 50 M 200 100 Q 190 70 200 50" stroke="#64748b" stroke-width="2" fill="none"/>
      <text x="140" y="160" font-family="sans-serif" font-size="12" font-bold fill="#1e40af">Uap Air Mendidih</text>
    `),
    options: [
      { key: 'A', text: 'Membeku' },
      { key: 'B', text: 'Menguap' },
      { key: 'C', text: 'Mengembun' },
      { key: 'D', text: 'Menyublim' }
    ],
    correctAnswer: 'B',
    explanation: 'Perubahan wujud dari cair ke gas disebut menguap.'
  },
  {
    id: 'sci-18',
    number: 18,
    subject: 'IPA / Sains',
    questionText: 'Fungsi utama enzim ptialin (amilase) yang ada di dalam air liur rongga mulut adalah mencerna...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="45" fill="#fef9c3" stroke="#eab308" stroke-width="2"/>
      <text x="140" y="85" font-family="sans-serif" font-size="11" font-bold fill="#854d0e">Rongga Mulut</text>
      <text x="135" y="105" font-family="sans-serif" font-size="11" font-bold fill="#ca8a04">Enzim Ptialin</text>
    `),
    options: [
      { key: 'A', text: 'Protein menjadi asam amino' },
      { key: 'B', text: 'Amilum (karbohidrat) menjadi glukosa/maltosa' },
      { key: 'C', text: 'Lemak menjadi asam lemak' },
      { key: 'D', text: 'Membunuh kuman di lambung' }
    ],
    correctAnswer: 'B',
    explanation: 'Enzim amilase di mulut memecah zat tepung (amilum) menjadi gula sederhana maltosa.'
  },
  {
    id: 'sci-19',
    number: 19,
    subject: 'IPA / Sains',
    questionText: 'Alat pernapasan khusus pada ikan yang dilindungi oleh operkulum adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <ellipse cx="180" cy="90" rx="70" ry="35" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <path d="M 150 75 Q 165 90 150 105" stroke="#ef4444" stroke-width="3" fill="none"/>
      <text x="120" y="150" font-family="sans-serif" font-size="12" font-bold fill="#0369a1">Insang Lembaran Merah</text>
    `),
    options: [
      { key: 'A', text: 'Paru-paru' },
      { key: 'B', text: 'Insang' },
      { key: 'C', text: 'Kloaka' },
      { key: 'D', text: 'Trakea' }
    ],
    correctAnswer: 'B',
    explanation: 'Ikan menyerap oksigen yang terlarut di dalam air melalui lembaran insang yang kaya kapiler darah.'
  },
  {
    id: 'sci-20',
    number: 20,
    subject: 'IPA / Sains',
    questionText: 'Manakah dari sumber energi berikut yang termasuk energi alternatif ramah lingkungan dan tak terbatas?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="130" cy="80" r="30" fill="#fde047" stroke="#eab308" stroke-width="2"/>
      <rect x="200" y="55" width="60" height="50" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <line x1="200" y1="75" x2="260" y2="75" stroke="#0284c7"/>
      <text x="130" y="150" font-family="sans-serif" font-size="12" font-bold fill="#1e293b">Panel Surya & Angin</text>
    `),
    options: [
      { key: 'A', text: 'Minyak tanah' },
      { key: 'B', text: 'Batu bara' },
      { key: 'C', text: 'Tenaga surya dan angin' },
      { key: 'D', text: 'Gas alam' }
    ],
    correctAnswer: 'C',
    explanation: 'Matahari dan angin merupakan sumber energi terbarukan yang tidak menghasilkan emisi polusi berbahaya.'
  }
];

// 3. BAHASA INDONESIA (20 Soal Bergambar & Teks Literasi)
const INDO_QUESTIONS: QuestionItem[] = [
  {
    id: 'indo-1',
    number: 1,
    subject: 'Bahasa Indonesia',
    questionText: 'Perhatikan poster lingkungan hidup berikut! Kalimat ajakan (persuasif) yang paling tepat untuk poster tersebut adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#ecfdf5"/>
      <circle cx="180" cy="80" r="45" fill="#34d399"/>
      <text x="135" y="85" font-family="sans-serif" font-size="14" font-weight="bold" fill="#064e3b">BUMI HIJAU</text>
      <text x="90" y="150" font-family="sans-serif" font-size="13" font-weight="bold" fill="#047857">Mari Menanam Pohon!</text>
    `),
    options: [
      { key: 'A', text: 'Pohon adalah tumbuhan yang memiliki daun hijau.' },
      { key: 'B', text: 'Ayo tanam pohon demi masa depan bumi yang asri dan sejuk!' },
      { key: 'C', text: 'Hutan di Indonesia sangat luas.' },
      { key: 'D', text: 'Kapan kamu menanam pohon di kebun?' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat persuasif mengandung kata ajakan seperti "Ayo" atau "Mari" untuk membujuk pembaca melakukan tindakan baik.'
  },
  {
    id: 'indo-2',
    number: 2,
    subject: 'Bahasa Indonesia',
    questionText: 'Perhatikan kalimat rumpang berikut: "Dokter itu bekerja dengan sangat (...) di rumah sakit." Kata baku yang tepat untuk mengisi titik-titik adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="50" width="220" height="80" rx="8" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2"/>
      <text x="90" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#3730a3">KATA BAKU: [ ... ]</text>
    `),
    options: [
      { key: 'A', text: 'Praktik' },
      { key: 'B', text: 'Praktek' },
      { key: 'C', text: 'Praktekan' },
      { key: 'D', text: 'Praktekum' }
    ],
    correctAnswer: 'A',
    explanation: 'Menurut KBBI, kata baku yang tepat adalah "praktik", bukan "praktek".'
  },
  {
    id: 'indo-3',
    number: 3,
    subject: 'Bahasa Indonesia',
    questionText: 'Perhatikan pantun berikut!\n\n"Pohon jati tumbuh di bukit,\nTempat burung bersarang tenang.\nMeski rintangan datang sedikit,\nTetaplah maju dengan hati (...)"\n\nKata berima yang tepat untuk melengkapi pantun di atas adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#fffbeb"/>
      <rect x="50" y="30" width="260" height="120" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="75" y="70" font-family="sans-serif" font-size="12" fill="#78350f">Baris 2: ... tenang (rima -ang)</text>
      <text x="75" y="105" font-family="sans-serif" font-size="12" fill="#78350f">Baris 4: ... hati [ ... ]</text>
    `),
    options: [
      { key: 'A', text: 'gembira' },
      { key: 'B', text: 'senang' },
      { key: 'C', text: 'duka' },
      { key: 'D', text: 'waspada' }
    ],
    correctAnswer: 'B',
    explanation: 'Pantun bersajak a-b-a-b, baris ke-2 berakhiran "tenang" (-ang), sehingga baris ke-4 berakhiran "senang" (-ang).'
  },
  {
    id: 'indo-4',
    number: 4,
    subject: 'Bahasa Indonesia',
    questionText: 'Ide pokok paragraf berikut terletak pada kalimat: "(1) Olahraga secara teratur memberikan banyak manfaat bagi kesehatan. (2) Daya tahan tubuh akan meningkat dan tidak mudah terserang flu. (3) Selain itu, aliran darah menjadi lancar ke seluruh organ vital. (4) Otot dan tulang pun menjadi semakin kokoh."',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="50" y="40" width="260" height="100" rx="8" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
      <text x="70" y="75" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Kalimat Utama (1):</text>
      <text x="70" y="100" font-family="sans-serif" font-size="11" fill="#334155">Paragraf Deduktif di Awal</text>
    `),
    options: [
      { key: 'A', text: 'Kalimat (1)' },
      { key: 'B', text: 'Kalimat (2)' },
      { key: 'C', text: 'Kalimat (3)' },
      { key: 'D', text: 'Kalimat (4)' }
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat (1) merupakan gagasan utama (deduktif) mengenai manfaat olahraga, sedangkan kalimat 2, 3, dan 4 adalah kalimat penjelas.'
  },
  {
    id: 'indo-5',
    number: 5,
    subject: 'Bahasa Indonesia',
    questionText: 'Penulisan ejaan tanda baca dan huruf kapital yang paling tepat menurut PUEBI adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="45" width="240" height="90" rx="8" fill="#fdf4ff" stroke="#c026d3" stroke-width="2"/>
      <text x="80" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#701a75">PUEBI & Huruf Kapital</text>
    `),
    options: [
      { key: 'A', text: 'Ibu membeli apel, jeruk, dan mangga di Pasar Minggu.' },
      { key: 'B', text: 'ibu membeli apel jeruk dan mangga di pasar minggu.' },
      { key: 'C', text: 'Ibu membeli: Apel, Jeruk dan Mangga dipasar minggu.' },
      { key: 'D', text: 'Ibu membeli apel jeruk, dan Mangga di pasar minggu.' }
    ],
    correctAnswer: 'A',
    explanation: 'Huruf kapital pada awal kalimat "Ibu" dan nama tempat geografis "Pasar Minggu", serta tanda koma memisahkan rincian.'
  },
  {
    id: 'indo-6',
    number: 6,
    subject: 'Bahasa Indonesia',
    questionText: 'Makna ungkapan "panjang tangan" dalam kalimat "Pemuda itu dijauhi warga karena dikenal panjang tangan" adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="45" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
      <text x="135" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#991b1b">Makna Kiasan</text>
    `),
    options: [
      { key: 'A', text: 'Suka menolong orang lain' },
      { key: 'B', text: 'Suka mencuri barang milik orang' },
      { key: 'C', text: 'Memiliki tangan yang sangat kuat' },
      { key: 'D', text: 'Rajin berolahraga' }
    ],
    correctAnswer: 'B',
    explanation: 'Ungkapan "panjang tangan" adalah idiom bahasa Indonesia yang berarti suka mencuri.'
  },
  {
    id: 'indo-7',
    number: 7,
    subject: 'Bahasa Indonesia',
    questionText: 'Sinonim dari kata "evaluasi" dalam kalimat "Panitia mengadakan evaluasi terhadap hasil ujian peserta" adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <text x="110" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c">EVALUASI = ?</text>
    `),
    options: [
      { key: 'A', text: 'Perayaan' },
      { key: 'B', text: 'Penilaian' },
      { key: 'C', text: 'Pemberian' },
      { key: 'D', text: 'Pengumuman' }
    ],
    correctAnswer: 'B',
    explanation: 'Evaluasi bersinonim dengan penilaian atau penaksiran mutu kinerja.'
  },
  {
    id: 'indo-8',
    number: 8,
    subject: 'Bahasa Indonesia',
    questionText: 'Latar tempat cuplikan cerita: "Mentari pagi mulai menyinari dedaunan padi yang menguning. Pak Karyo memikul cangkulnya menyusuri pematang sambil menyapa petani lain." adalah di...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="50" y="50" width="260" height="80" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
      <text x="80" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#854d0e">Pematang Padi Menguning</text>
    `),
    options: [
      { key: 'A', text: 'Sawah' },
      { key: 'B', text: 'Pasar tradisional' },
      { key: 'C', text: 'Halaman sekolah' },
      { key: 'D', text: 'Dermaga laut' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata kunci "padi menguning", "cangkul", dan "pematang" merujuk pada latar persawahan.'
  },
  {
    id: 'indo-9',
    number: 9,
    subject: 'Bahasa Indonesia',
    questionText: 'Kalimat majemuk setara yang menyatakan hubungan pertentangan ditandai dengan konjungsi...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="240" height="80" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <text x="80" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0369a1">Konjungsi Pertentangan</text>
    `),
    options: [
      { key: 'A', text: 'Dan' },
      { key: 'B', text: 'Tetapi' },
      { key: 'C', text: 'Sehingga' },
      { key: 'D', text: 'Kemudian' }
    ],
    correctAnswer: 'B',
    explanation: 'Konjungsi "tetapi" atau "melainkan" menyatakan hubungan perlawanan atau pertentangan.'
  },
  {
    id: 'indo-10',
    number: 10,
    subject: 'Bahasa Indonesia',
    questionText: 'Amanat yang dapat dipetik dari fabel "Kancil dan Kura-Kura yang Rendah Hati" adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="130" cy="90" r="35" fill="#fbcfe8"/>
      <circle cx="230" cy="90" r="35" fill="#bbf7d0"/>
      <text x="95" y="95" font-family="sans-serif" font-size="11" font-bold fill="#831843">Kancil Cepat</text>
      <text x="200" y="95" font-family="sans-serif" font-size="11" font-bold fill="#14532d">Kura Tekun</text>
    `),
    options: [
      { key: 'A', text: 'Jangan sombong dan meremehkan kemampuan orang lain' },
      { key: 'B', text: 'Kecepatan adalah satu-satunya penentu kemenangan' },
      { key: 'C', text: 'Tidurlah saat lomba berlangsung' },
      { key: 'D', text: 'Hindari berteman dengan kura-kura' }
    ],
    correctAnswer: 'A',
    explanation: 'Sikap sombong dan menyepelekan lawan berakibat kekalahan, ketekunan membuahkan hasil.'
  },
  {
    id: 'indo-11',
    number: 11,
    subject: 'Bahasa Indonesia',
    questionText: 'Antonim (lawan kata) dari kata "optimis" adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <text x="100" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#15803d">OPTIMIS ⇄ ?</text>
    `),
    options: [
      { key: 'A', text: 'Pesimis' },
      { key: 'B', text: 'Dinamis' },
      { key: 'C', text: 'Kritis' },
      { key: 'D', text: 'Apatis' }
    ],
    correctAnswer: 'A',
    explanation: 'Optimis (selalu berpengharapan baik) berlawanan dengan pesimis (mudah putus asa).'
  },
  {
    id: 'indo-12',
    number: 12,
    subject: 'Bahasa Indonesia',
    questionText: 'Susunan petunjuk pemakaian obat sirup yang runtut adalah:\n(1) Minum obat sesuai dosis anjuran dokter.\n(2) Kocok botol obat sebelum dibuka.\n(3) Tuangkan obat pada sendok takar.\n(4) Tutup rapat botol dan simpan di tempat sejuk.',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="40" width="240" height="100" rx="8" fill="#fef2f2" stroke="#f87171" stroke-width="2"/>
      <text x="80" y="75" font-family="sans-serif" font-size="12" font-weight="bold" fill="#991b1b">Petunjuk Penggunaan Obat</text>
      <text x="80" y="100" font-family="sans-serif" font-size="11" fill="#7f1d1d">Urutan Logis & Runtut</text>
    `),
    options: [
      { key: 'A', text: '(2) - (3) - (1) - (4)' },
      { key: 'B', text: '(1) - (2) - (3) - (4)' },
      { key: 'C', text: '(3) - (2) - (1) - (4)' },
      { key: 'D', text: '(4) - (3) - (2) - (1)' }
    ],
    correctAnswer: 'A',
    explanation: 'Langkah tepat: kocok botol terlebih dahulu, tuang ke sendok, minum, lalu tutup rapat botol.'
  },
  {
    id: 'indo-13',
    number: 13,
    subject: 'Bahasa Indonesia',
    questionText: 'Kalimat efektif di bawah ini adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
      <text x="95" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">KALIMAT EFEKTIF</text>
    `),
    options: [
      { key: 'A', text: 'Semua para siswa-siswa hadir di ruang ujian.' },
      { key: 'B', text: 'Para siswa hadir di ruang ujian.' },
      { key: 'C', text: 'Para hadirin sekalian diharap berdiri.' },
      { key: 'D', text: 'Banyak anak-anak sedang bermain.' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat efektif menghindari pemborosan kata (pleonasme) seperti "semua para siswa-siswa".'
  },
  {
    id: 'indo-14',
    number: 14,
    subject: 'Bahasa Indonesia',
    questionText: 'Tokoh antagonis dalam sebuah cerita adalah tokoh yang...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="45" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <text x="135" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#991b1b">Peran Watak</text>
    `),
    options: [
      { key: 'A', text: 'Memiliki watak baik dan bijaksana' },
      { key: 'B', text: 'Memiliki sifat penentang / jahat yang memicu konflik' },
      { key: 'C', text: 'Menjadi penengah perdamaian' },
      { key: 'D', text: 'Hanya muncul sekali sebagai figuran' }
    ],
    correctAnswer: 'B',
    explanation: 'Antagonis adalah karakter yang menentang tokoh utama (protagonis) dengan watak buruk atau berlawanan.'
  },
  {
    id: 'indo-15',
    number: 15,
    subject: 'Bahasa Indonesia',
    questionText: 'Peribahasa "Tong kosong nyaring bunyinya" memiliki arti...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="140" y="50" width="80" height="80" rx="8" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <text x="155" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#7c2d12">TONG</text>
      <text x="120" y="160" font-family="sans-serif" font-size="11" font-bold fill="#ea580c">Bunyi Nyaring</text>
    `),
    options: [
      { key: 'A', text: 'Orang yang banyak bicara tetapi ilmunya sedikit' },
      { key: 'B', text: 'Orang pintar yang pendiam' },
      { key: 'C', text: 'Orang yang rajin menabung' },
      { key: 'D', text: 'Alat musik yang bersuara merdu' }
    ],
    correctAnswer: 'A',
    explanation: 'Menggambarkan orang yang banyak berbicara besar padahal tidak memiliki wawasan yang cukup.'
  },
  {
    id: 'indo-16',
    number: 16,
    subject: 'Bahasa Indonesia',
    questionText: 'Kata berimbuhan me- yang menyatakan pekerjaan dengan menggunakan alat pada kalimat di bawah adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <text x="90" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1d4ed8">Imbuhan me- + Alat</text>
    `),
    options: [
      { key: 'A', text: 'Pak Tono mencangkul tanah di kebun.' },
      { key: 'B', text: 'Adik menangis tersedu-sedu.' },
      { key: 'C', text: 'Kakak melompat tinggi.' },
      { key: 'D', text: 'Burung elang melayang di angkasa.' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata "mencangkul" berasal dari kata dasar alat "cangkul" yang diberi prefiks me-.'
  },
  {
    id: 'indo-17',
    number: 17,
    subject: 'Bahasa Indonesia',
    questionText: 'Bagian surat resmi yang berisi nama lembaga, alamat instansi, dan logo organisasi disebut...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="50" y="30" width="260" height="45" fill="#f1f5f9" stroke="#334155" stroke-width="1.5"/>
      <text x="80" y="55" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">KOP SURAT RESMI</text>
      <line x1="50" y1="85" x2="310" y2="85" stroke="#0f172a" stroke-width="2"/>
    `),
    options: [
      { key: 'A', text: 'Kepala surat (Kop surat)' },
      { key: 'B', text: 'Salam pembuka' },
      { key: 'C', text: 'Isi surat' },
      { key: 'D', text: 'Tembusan' }
    ],
    correctAnswer: 'A',
    explanation: 'Kepala surat (kop) menunjukkan identitas resmi organisasi pengirim.'
  },
  {
    id: 'indo-18',
    number: 18,
    subject: 'Bahasa Indonesia',
    questionText: 'Kalimat tanggapan yang santun dan logis dalam forum diskusi adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="45" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="135" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#065f46">Etika Diskusi</text>
    `),
    options: [
      { key: 'A', text: 'Pendapat Anda sangat keliru dan tidak masuk akal sama sekali.' },
      { key: 'B', text: 'Saya kurang sependapat dengan Anda, bagaimana jika kita pertimbangkan opsi lain?' },
      { key: 'C', text: 'Pendapat Anda sama sekali tidak ada gunanya.' },
      { key: 'D', text: 'Diam saja, Anda tidak mengerti masalah ini.' }
    ],
    correctAnswer: 'B',
    explanation: 'Tanggapan santun menyampaikan perbedaan pandangan tanpa menghina atau memojokkan lawan bicara.'
  },
  {
    id: 'indo-19',
    number: 19,
    subject: 'Bahasa Indonesia',
    questionText: 'Majas personifikasi (menggambarkan benda mati seolah bersikap seperti manusia) tampak pada kalimat...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="240" height="80" rx="8" fill="#fdf2f8" stroke="#ec4899" stroke-width="2"/>
      <text x="80" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#9d174d">Majas Personifikasi</text>
    `),
    options: [
      { key: 'A', text: 'Daun nyiur melambai-lambai di tepi pantai yang sepi.' },
      { key: 'B', text: 'Wajahnya pucat bagaikan bulan kesiangan.' },
      { key: 'C', text: 'Suaranya menggelegar membelah angkasa.' },
      { key: 'D', text: 'Ayah memeras keringat membanting tulang.' }
    ],
    correctAnswer: 'A',
    explanation: 'Daun nyiur (kelapa) diibaratkan mampu "melambai" layaknya tangan manusia.'
  },
  {
    id: 'indo-20',
    number: 20,
    subject: 'Bahasa Indonesia',
    questionText: 'Penggunaan kata depan "di" yang tepat sebagai penunjuk tempat adalah...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
      <text x="90" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Kata Depan "di"</text>
    `),
    options: [
      { key: 'A', text: 'Buku itu disimpan di dalam lemari kaca.' },
      { key: 'B', text: 'Surat itu didalam amplop cokelat.' },
      { key: 'C', text: 'Ibu memasak didapur rumah.' },
      { key: 'D', text: 'Baju itu dicuci disungai.' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata depan "di" yang menunjukkan tempat harus ditulis terpisah dari kata yang mengikutinya: "di dalam lemari".'
  }
];

// 4. BAHASA INGGRIS (20 Soal Bergambar & Vocabulary / Grammar)
const ENGLISH_QUESTIONS: QuestionItem[] = [
  {
    id: 'eng-1',
    number: 1,
    subject: 'Bahasa Inggris',
    questionText: 'Look at the picture! What time is shown on the clock?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="60" fill="#ffffff" stroke="#334155" stroke-width="4"/>
      <line x1="180" y1="90" x2="180" y2="45" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
      <line x1="180" y1="90" x2="225" y2="90" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
      <text x="175" y="42" font-family="sans-serif" font-size="12" font-bold fill="#334155">12</text>
      <text x="232" y="94" font-family="sans-serif" font-size="12" font-bold fill="#334155">3</text>
      <text x="177" y="145" font-family="sans-serif" font-size="12" font-bold fill="#334155">6</text>
      <text x="125" y="94" font-family="sans-serif" font-size="12" font-bold fill="#334155">9</text>
    `),
    options: [
      { key: 'A', text: "It is a quarter past twelve (12:15)" },
      { key: 'B', text: "It is half past twelve (12:30)" },
      { key: 'C', text: "It is a quarter to twelve (11:45)" },
      { key: 'D', text: "It is three o'clock (03:00)" }
    ],
    correctAnswer: 'A',
    explanation: 'The short hand points near 12 and the long hand points at 3 (15 minutes), so it is a quarter past twelve.'
  },
  {
    id: 'eng-2',
    number: 2,
    subject: 'Bahasa Inggris',
    questionText: 'Complete the sentence: "My father is a doctor. He works at the (...)"',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="130" y="50" width="100" height="70" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <line x1="180" y1="65" x2="180" y2="95" stroke="#ef4444" stroke-width="6"/>
      <line x1="165" y1="80" x2="195" y2="80" stroke="#ef4444" stroke-width="6"/>
      <text x="145" y="150" font-family="sans-serif" font-size="12" font-bold fill="#0369a1">HOSPITAL</text>
    `),
    options: [
      { key: 'A', text: 'School' },
      { key: 'B', text: 'Hospital' },
      { key: 'C', text: 'Post office' },
      { key: 'D', text: 'Police station' }
    ],
    correctAnswer: 'B',
    explanation: 'A doctor works in a hospital to treat sick people.'
  },
  {
    id: 'eng-3',
    number: 3,
    subject: 'Bahasa Inggris',
    questionText: 'Choose the correct form: "The students (...) studying English in the classroom right now."',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="240" height="80" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="80" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#78350f">Students (Plural) + [ ... ]</text>
    `),
    options: [
      { key: 'A', text: 'is' },
      { key: 'B', text: 'are' },
      { key: 'C', text: 'was' },
      { key: 'D', text: 'am' }
    ],
    correctAnswer: 'B',
    explanation: 'Subject "The students" is plural, so present continuous uses "are + V-ing".'
  },
  {
    id: 'eng-4',
    number: 4,
    subject: 'Bahasa Inggris',
    questionText: 'Look at the comparison: "An elephant is (...) than a goat."',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="120" cy="90" r="50" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
      <text x="85" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e293b">Elephant</text>
      <circle cx="250" cy="90" r="22" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <text x="235" y="95" font-family="sans-serif" font-size="12" font-bold fill="#7c2d12">Goat</text>
    `),
    options: [
      { key: 'A', text: 'bigger' },
      { key: 'B', text: 'smaller' },
      { key: 'C', text: 'busiest' },
      { key: 'D', text: 'more big' }
    ],
    correctAnswer: 'A',
    explanation: 'Comparative degree of "big" is "bigger" (double g + er).'
  },
  {
    id: 'eng-5',
    number: 5,
    subject: 'Bahasa Inggris',
    questionText: 'What is the opposite (antonym) of the word "CLEVER"?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <text x="105" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#831843">CLEVER ⇄ ?</text>
    `),
    options: [
      { key: 'A', text: 'Smart' },
      { key: 'B', text: 'Foolish / Stupid' },
      { key: 'C', text: 'Bright' },
      { key: 'D', text: 'Kind' }
    ],
    correctAnswer: 'B',
    explanation: 'The antonym of clever (intelligent) is foolish or stupid.'
  },
  {
    id: 'eng-6',
    number: 6,
    subject: 'Bahasa Inggris',
    questionText: 'Fill in the blank with the appropriate preposition: "The cat is sleeping (...) the table."',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="100" y="60" width="160" height="15" fill="#92400e"/>
      <line x1="120" y1="75" x2="120" y2="140" stroke="#92400e" stroke-width="8"/>
      <line x1="240" y1="75" x2="240" y2="140" stroke="#92400e" stroke-width="8"/>
      <ellipse cx="180" cy="120" rx="25" ry="15" fill="#f97316"/>
      <text x="145" y="160" font-family="sans-serif" font-size="11" font-bold fill="#7c2d12">Under the table</text>
    `),
    options: [
      { key: 'A', text: 'under' },
      { key: 'B', text: 'above' },
      { key: 'C', text: 'between' },
      { key: 'D', text: 'inside' }
    ],
    correctAnswer: 'A',
    explanation: 'The cat is located beneath the tabletop, so the correct preposition is "under".'
  },
  {
    id: 'eng-7',
    number: 7,
    subject: 'Bahasa Inggris',
    questionText: 'Rearrange the scrambled words: "always - he - early - wakes up"',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="240" height="80" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <text x="75" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#14532d">Adverb of Frequency</text>
    `),
    options: [
      { key: 'A', text: 'He always wakes up early.' },
      { key: 'B', text: 'Always he early wakes up.' },
      { key: 'C', text: 'He wakes up always early.' },
      { key: 'D', text: 'Early he wakes up always.' }
    ],
    correctAnswer: 'A',
    explanation: 'Standard order: Subject (He) + Adverb of Frequency (always) + Verb (wakes up) + Adverb of Time (early).'
  },
  {
    id: 'eng-8',
    number: 8,
    subject: 'Bahasa Inggris',
    questionText: 'Past tense of the irregular verb "WRITE" is...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <text x="100" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0369a1">WRITE (V1) → (V2)?</text>
    `),
    options: [
      { key: 'A', text: 'Wrote' },
      { key: 'B', text: 'Written' },
      { key: 'C', text: 'Writed' },
      { key: 'D', text: 'Writing' }
    ],
    correctAnswer: 'A',
    explanation: 'The past simple form (V2) of write is "wrote".'
  },
  {
    id: 'eng-9',
    number: 9,
    subject: 'Bahasa Inggris',
    questionText: 'Which animal has a very long neck and eats leaves from tall trees?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <ellipse cx="140" cy="120" rx="40" ry="25" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <path d="M 170 110 L 220 30" stroke="#ca8a04" stroke-width="14" stroke-linecap="round"/>
      <circle cx="225" cy="30" r="12" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <text x="130" y="165" font-family="sans-serif" font-size="12" font-bold fill="#854d0e">Long neck animal</text>
    `),
    options: [
      { key: 'A', text: 'Lion' },
      { key: 'B', text: 'Giraffe' },
      { key: 'C', text: 'Bear' },
      { key: 'D', text: 'Kangaroo' }
    ],
    correctAnswer: 'B',
    explanation: 'A giraffe is well-known for its towering neck that reaches canopy leaves.'
  },
  {
    id: 'eng-10',
    number: 10,
    subject: 'Bahasa Inggris',
    questionText: 'What is the plural form of the noun "CHILD"?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <text x="95" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c">ONE CHILD → MANY ?</text>
    `),
    options: [
      { key: 'A', text: 'Childs' },
      { key: 'B', text: 'Children' },
      { key: 'C', text: 'Childrens' },
      { key: 'D', text: 'Childes' }
    ],
    correctAnswer: 'B',
    explanation: 'Child is an irregular noun; its plural is "children".'
  },
  {
    id: 'eng-11',
    number: 11,
    subject: 'Bahasa Inggris',
    questionText: 'Choose the correct greeting for 8:00 AM in the morning:',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <circle cx="180" cy="90" r="40" fill="#fef08a" stroke="#eab308" stroke-width="3"/>
      <text x="145" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#854d0e">08:00 AM</text>
    `),
    options: [
      { key: 'A', text: 'Good morning' },
      { key: 'B', text: 'Good afternoon' },
      { key: 'C', text: 'Good evening' },
      { key: 'D', text: 'Good night' }
    ],
    correctAnswer: 'A',
    explanation: '8:00 AM is morning time, so "Good morning" is used.'
  },
  {
    id: 'eng-12',
    number: 12,
    subject: 'Bahasa Inggris',
    questionText: 'Sarah wants to borrow a pen politely. What should she say?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="240" height="80" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
      <text x="90" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e40af">Polite Request Expression</text>
    `),
    options: [
      { key: 'A', text: 'Give me your pen right now!' },
      { key: 'B', text: 'May I borrow your pen, please?' },
      { key: 'C', text: 'I take your pen!' },
      { key: 'D', text: 'Your pen is mine.' }
    ],
    correctAnswer: 'B',
    explanation: '"May I borrow ..., please?" is the polite standard way to ask permission.'
  },
  {
    id: 'eng-13',
    number: 13,
    subject: 'Bahasa Inggris',
    questionText: 'Which phrase means the same as "ANNUAL COMPETITION"?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="2"/>
      <text x="85" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#854d0e">ANNUAL COMPETITION</text>
    `),
    options: [
      { key: 'A', text: 'A competition held every week' },
      { key: 'B', text: 'A competition held every month' },
      { key: 'C', text: 'A competition held once every year' },
      { key: 'D', text: 'A competition held daily' }
    ],
    correctAnswer: 'C',
    explanation: 'Annual means occurring once every year.'
  },
  {
    id: 'eng-14',
    number: 14,
    subject: 'Bahasa Inggris',
    questionText: 'Identify the adjective in this sentence: "The smart boy answered all math questions correctly."',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="240" height="80" rx="8" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
      <text x="85" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">Part of Speech: Adjective</text>
    `),
    options: [
      { key: 'A', text: 'Smart' },
      { key: 'B', text: 'Boy' },
      { key: 'C', text: 'Answered' },
      { key: 'D', text: 'Correctly' }
    ],
    correctAnswer: 'A',
    explanation: '"Smart" is an adjective describing the noun "boy".'
  },
  {
    id: 'eng-15',
    number: 15,
    subject: 'Bahasa Inggris',
    questionText: 'My mother is cooking fried rice in the (...).',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="120" y="50" width="120" height="80" rx="8" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
      <ellipse cx="180" cy="90" rx="30" ry="15" fill="#f97316"/>
      <text x="145" y="150" font-family="sans-serif" font-size="12" font-bold fill="#7c2d12">KITCHEN</text>
    `),
    options: [
      { key: 'A', text: 'Kitchen' },
      { key: 'B', text: 'Bedroom' },
      { key: 'C', text: 'Bathroom' },
      { key: 'D', text: 'Garage' }
    ],
    correctAnswer: 'A',
    explanation: 'Cooking meals is done in the kitchen.'
  },
  {
    id: 'eng-16',
    number: 16,
    subject: 'Bahasa Inggris',
    questionText: 'There are seven days in a week. The day that comes after Wednesday is...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="50" y="50" width="260" height="70" rx="8" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
      <text x="80" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#6b21a8">Wednesday → [ ... ] ?</text>
    `),
    options: [
      { key: 'A', text: 'Tuesday' },
      { key: 'B', text: 'Thursday' },
      { key: 'C', text: 'Friday' },
      { key: 'D', text: 'Saturday' }
    ],
    correctAnswer: 'B',
    explanation: 'Days of the week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.'
  },
  {
    id: 'eng-17',
    number: 17,
    subject: 'Bahasa Inggris',
    questionText: '"How (...) books do you have in your school bag?"',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="70" y="55" width="220" height="70" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <text x="90" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0369a1">Countable Plural Noun</text>
    `),
    options: [
      { key: 'A', text: 'much' },
      { key: 'B', text: 'many' },
      { key: 'C', text: 'any' },
      { key: 'D', text: 'little' }
    ],
    correctAnswer: 'B',
    explanation: '"Books" is countable plural, so we use "How many".'
  },
  {
    id: 'eng-18',
    number: 18,
    subject: 'Bahasa Inggris',
    questionText: 'What is the color of the clear daytime sky?',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#bae6fd"/>
      <circle cx="120" cy="60" r="25" fill="#f8fafc"/>
      <circle cx="150" cy="60" r="30" fill="#f8fafc"/>
      <text x="140" y="130" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0369a1">Clear Sky Color</text>
    `),
    options: [
      { key: 'A', text: 'Green' },
      { key: 'B', text: 'Blue' },
      { key: 'C', text: 'Yellow' },
      { key: 'D', text: 'Red' }
    ],
    correctAnswer: 'B',
    explanation: 'The daylight clear sky is blue.'
  },
  {
    id: 'eng-19',
    number: 19,
    subject: 'Bahasa Inggris',
    questionText: 'Fill in the blank: "Rian (...) to Bali with his family last holiday."',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <rect x="60" y="50" width="240" height="80" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="80" y="95" font-family="sans-serif" font-size="13" font-weight="bold" fill="#78350f">Simple Past (last holiday)</text>
    `),
    options: [
      { key: 'A', text: 'go' },
      { key: 'B', text: 'went' },
      { key: 'C', text: 'goes' },
      { key: 'D', text: 'going' }
    ],
    correctAnswer: 'B',
    explanation: '"Last holiday" signifies past tense; the V2 of go is "went".'
  },
  {
    id: 'eng-20',
    number: 20,
    subject: 'Bahasa Inggris',
    questionText: 'A person who flies an airplane or helicopter is called a...',
    imageSvg: makeSvgDataUri(`
      <rect width="360" height="180" fill="#f8fafc"/>
      <polygon points="120,90 240,60 210,90 240,120" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <text x="140" y="150" font-family="sans-serif" font-size="12" font-bold fill="#0369a1">Airplane Captain</text>
    `),
    options: [
      { key: 'A', text: 'Driver' },
      { key: 'B', text: 'Captain' },
      { key: 'C', text: 'Pilot' },
      { key: 'D', text: 'Sailor' }
    ],
    correctAnswer: 'C',
    explanation: 'A pilot is licensed to operate the aircraft in flight.'
  }
];

export const ALL_INITIAL_QUESTIONS: QuestionItem[] = [
  ...MATH_QUESTIONS,
  ...SCIENCE_QUESTIONS,
  ...INDO_QUESTIONS,
  ...ENGLISH_QUESTIONS
];

export function getAllQuestions(): QuestionItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_QUESTIONS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(ALL_INITIAL_QUESTIONS));
      return ALL_INITIAL_QUESTIONS;
    }
    const parsed: QuestionItem[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ALL_INITIAL_QUESTIONS;
  } catch (err) {
    console.error('Failed to load questions from storage:', err);
    return ALL_INITIAL_QUESTIONS;
  }
}

export function saveAllQuestions(questions: QuestionItem[]): void {
  try {
    localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(questions));
  } catch (err) {
    console.error('Failed to persist questions:', err);
  }

  // Also sync to server in background
  try {
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions })
    }).catch(() => {});
  } catch {}
}

export function updateQuestion(updated: QuestionItem): QuestionItem[] {
  const current = getAllQuestions();
  const idx = current.findIndex(q => q.id === updated.id);
  if (idx >= 0) {
    current[idx] = updated;
  } else {
    current.push(updated);
  }
  saveAllQuestions(current);
  return current;
}
