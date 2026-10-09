import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori A: PAUD/TK - IPA / Sains (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_A_IPA: QuestionItem[] = [
  {
    id: 'SIM-A-IPA-01',
    number: 1,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda langit apakah yang bersinar terang dan memberi rasa hangat di siang hari?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Benda Langit', 'Matahari Cerah', '#F59E0B',
        '<g transform="translate(130, 20)"><circle cx="70" cy="65" r="40" fill="#FBBF24"/><line x1="70" y1="10" x2="70" y2="0" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/><line x1="70" y1="120" x2="70" y2="130" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/><line x1="15" y1="65" x2="5" y2="65" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/><line x1="125" y1="65" x2="135" y2="65" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bulan' }, { key: 'B', text: 'Matahari' }, { key: 'C', text: 'Bintang' }, { key: 'D', text: 'Awan hitam' }],
    correctAnswer: 'B',
    explanation: 'Matahari bersinar di siang hari dan memberikan cahaya serta kehangatan bagi bumi.'
  },
  {
    id: 'SIM-A-IPA-02',
    number: 2,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan apakah yang bersuara "Mbee... mbee..." dan suka makan rumput?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Hewan Ternak', 'Kambing Lucu', '#10B981',
        '<g transform="translate(130, 20)"><ellipse cx="70" cy="70" rx="50" ry="35" fill="#E2E8F0"/><circle cx="120" cy="50" r="25" fill="#CBD5E1"/><text x="70" y="75" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">Mbee...</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kucing' }, { key: 'B', text: 'Kambing' }, { key: 'C', text: 'Bebek' }, { key: 'D', text: 'Ayam' }],
    correctAnswer: 'B',
    explanation: 'Kambing bersuara mbee dan memakan rumput hijau.'
  },
  {
    id: 'SIM-A-IPA-03',
    number: 3,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bagian tubuh yang kita gunakan untuk MELIHAT pemandangan indah adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pancaindra', 'Mata Indah', '#3B82F6',
        '<g transform="translate(130, 25)"><ellipse cx="70" cy="60" rx="55" ry="30" fill="#FFFFFF" stroke="#3B82F6" stroke-width="4"/><circle cx="70" cy="60" r="20" fill="#1D4ED8"/><circle cx="75" cy="55" r="7" fill="#FFFFFF"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Mata' }, { key: 'B', text: 'Hidung' }, { key: 'C', text: 'Telinga' }, { key: 'D', text: 'Mulut' }],
    correctAnswer: 'A',
    explanation: 'Mata berfungsi sebagai indra penglihatan.'
  },
  {
    id: 'SIM-A-IPA-04',
    number: 4,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan yang bisa TERBANG di udara dengan sayapnya adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Hewan Udara', 'Burung Terbang', '#0284C7',
        '<g transform="translate(130, 25)"><path d="M20,60 Q70,20 120,60 Q70,40 20,60 Z" fill="#0284C7"/><circle cx="70" cy="45" r="14" fill="#0369A1"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Ikan' }, { key: 'B', text: 'Burung' }, { key: 'C', text: 'Cacing' }, { key: 'D', text: 'Kura-kura' }],
    correctAnswer: 'B',
    explanation: 'Burung memiliki sayap untuk terbang di udara.'
  },
  {
    id: 'SIM-A-IPA-05',
    number: 5,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan apakah yang hidup dan bernapas di dalam AIR?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Hewan Air', 'Ikan Berenang', '#06B6D4',
        '<g transform="translate(130, 25)"><polygon points="120,60 145,40 145,80" fill="#0891B2"/><ellipse cx="70" cy="60" rx="45" ry="25" fill="#06B6D4"/><circle cx="45" cy="55" r="5" fill="#FFF"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Ikan' }, { key: 'B', text: 'Kucing' }, { key: 'C', text: 'Kelinci' }, { key: 'D', text: 'Ayam' }],
    correctAnswer: 'A',
    explanation: 'Ikan hidup di air dan bernapas menggunakan insang.'
  },
  {
    id: 'SIM-A-IPA-06',
    number: 6,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Warna daun pada pohon yang subur pada umumnya adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Tumbuhan', 'Daun Hijau', '#16A34A',
        '<g transform="translate(130, 20)"><path d="M30,80 Q70,10 110,80 Q70,100 30,80 Z" fill="#22C55E"/><line x1="70" y1="20" x2="70" y2="95" stroke="#15803D" stroke-width="3"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Hijau' }, { key: 'B', text: 'Ungu' }, { key: 'C', text: 'Hitam' }, { key: 'D', text: 'Biru tua' }],
    correctAnswer: 'A',
    explanation: 'Sebagian besar daun tumbuhan berwarna hijau karena zat klorofil.'
  },
  {
    id: 'SIM-A-IPA-07',
    number: 7,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bagian tubuh yang kita gunakan untuk MENDENGAR suara musik adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pancaindra', 'Telinga', '#8B5CF6',
        '<g transform="translate(140, 20)"><path d="M40,20 C80,20 80,100 40,100 C20,80 20,40 40,20 Z" fill="#DDD6FE" stroke="#7C3AED" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Telinga' }, { key: 'B', text: 'Lidah' }, { key: 'C', text: 'Hidung' }, { key: 'D', text: 'Tangan' }],
    correctAnswer: 'A',
    explanation: 'Telinga adalah indra pendengaran kita.'
  },
  {
    id: 'SIM-A-IPA-08',
    number: 8,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Saat cuaca HUJAN, air turun dari langit yang berasal dari...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Cuaca', 'Awan Mendung', '#64748B',
        '<g transform="translate(120, 20)"><ellipse cx="60" cy="50" rx="40" ry="25" fill="#94A3B8"/><ellipse cx="100" cy="45" rx="35" ry="25" fill="#94A3B8"/><line x1="50" y1="85" x2="40" y2="105" stroke="#38BDF8" stroke-width="3"/><line x1="80" y1="85" x2="70" y2="105" stroke="#38BDF8" stroke-width="3"/><line x1="110" y1="85" x2="100" y2="105" stroke="#38BDF8" stroke-width="3"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Awan' }, { key: 'B', text: 'Tanah' }, { key: 'C', text: 'Pohon' }, { key: 'D', text: 'Batu' }],
    correctAnswer: 'A',
    explanation: 'Hujan adalah tetesan air yang jatuh dari awan di langit.'
  },
  {
    id: 'SIM-A-IPA-09',
    number: 9,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda apakah yang terasa SANGAT DINGIN saat kita sentuh?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Suhu', 'Es Batu Segar', '#06B6D4',
        '<g transform="translate(130, 20)"><rect x="30" y="30" width="70" height="70" rx="12" fill="#CFFAFE" stroke="#0891B2" stroke-width="4"/><text x="65" y="72" font-size="14" font-weight="bold" fill="#0891B2" text-anchor="middle">ES BATU</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Es batu' }, { key: 'B', text: 'Air mendidih' }, { key: 'C', text: 'Api unggun' }, { key: 'D', text: 'Sup panas' }],
    correctAnswer: 'A',
    explanation: 'Es batu bersuhu sangat dingin dan membeku.'
  },
  {
    id: 'SIM-A-IPA-10',
    number: 10,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan apakah yang suka melompat dan sangat suka makan wortel?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Hewan Lucu', 'Kelinci', '#EC4899',
        '<g transform="translate(130, 15)"><ellipse cx="70" cy="75" rx="40" ry="30" fill="#FCE7F3"/><ellipse cx="55" cy="30" rx="10" ry="25" fill="#F472B6"/><ellipse cx="85" cy="30" rx="10" ry="25" fill="#F472B6"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kelinci' }, { key: 'B', text: 'Buaya' }, { key: 'C', text: 'Singa' }, { key: 'D', text: 'Gajah' }],
    correctAnswer: 'A',
    explanation: 'Kelinci memiliki telinga panjang, suka melompat, dan gemar makan wortel.'
  },
  {
    id: 'SIM-A-IPA-11',
    number: 11,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Bunga mawar memiliki aroma yang wangi. Indra untuk MENCIUM bau wangi adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pancaindra', 'Hidung', '#F97316',
        '<g transform="translate(140, 20)"><path d="M50,15 L70,80 L35,80 Z" fill="#FED7AA" stroke="#EA580C" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Hidung' }, { key: 'B', text: 'Mata' }, { key: 'C', text: 'Kaki' }, { key: 'D', text: 'Lutut' }],
    correctAnswer: 'A',
    explanation: 'Hidung berfungsi untuk membau atau mencium aroma.'
  },
  {
    id: 'SIM-A-IPA-12',
    number: 12,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Apakah rasa dari buah jeruk matang yang manis dan asam?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Pengecap Rasa', 'Buah Jeruk', '#FB923C',
        '<g transform="translate(130, 20)"><circle cx="70" cy="65" r="45" fill="#F97316"/><line x1="70" y1="20" x2="70" y2="10" stroke="#15803D" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Pahit' }, { key: 'B', text: 'Manis dan Segar' }, { key: 'C', text: 'Asin seperti garam' }, { key: 'D', text: 'Pedas' }],
    correctAnswer: 'B',
    explanation: 'Buah jeruk yang matang rasanya manis segar dan kaya vitamin C.'
  },
  {
    id: 'SIM-A-IPA-13',
    number: 13,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda langit yang tampak terang pada MALAM hari adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Malam Hari', 'Bulan Sabit', '#EAB308',
        '<g transform="translate(130, 20)"><path d="M70,15 C95,35 95,95 70,115 C105,100 110,35 70,15 Z" fill="#FACC15"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bulan' }, { key: 'B', text: 'Pelangi' }, { key: 'C', text: 'Matahari siang' }, { key: 'D', text: 'Awan putih terang' }],
    correctAnswer: 'A',
    explanation: 'Bulan menghiasi langit pada malam hari.'
  },
  {
    id: 'SIM-A-IPA-14',
    number: 14,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan apakah yang menghasilkan madu manis yang sehat?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Serangga', 'Lebah Madu', '#EAB308',
        '<g transform="translate(130, 20)"><ellipse cx="70" cy="65" rx="35" ry="25" fill="#FBBF24" stroke="#1E293B" stroke-width="4"/><line x1="60" y1="40" x2="60" y2="90" stroke="#1E293B" stroke-width="4"/><line x1="80" y1="40" x2="80" y2="90" stroke="#1E293B" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Lebah' }, { key: 'B', text: 'Kucing' }, { key: 'C', text: 'Semut' }, { key: 'D', text: 'Katak' }],
    correctAnswer: 'A',
    explanation: 'Lebah menghisap nektar bunga lalu menghasilkan madu.'
  },
  {
    id: 'SIM-A-IPA-15',
    number: 15,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah kaki pada seekor KUCING peliharaan?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Ciri Hewan', 'Kaki Kucing', '#A855F7',
        '<g transform="translate(120, 20)"><rect x="30" y="60" width="12" height="45" rx="6" fill="#A855F7"/><rect x="55" y="60" width="12" height="45" rx="6" fill="#A855F7"/><rect x="90" y="60" width="12" height="45" rx="6" fill="#A855F7"/><rect x="115" y="60" width="12" height="45" rx="6" fill="#A855F7"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2 kaki' }, { key: 'B', text: '4 kaki' }, { key: 'C', text: '6 kaki' }, { key: 'D', text: '8 kaki' }],
    correctAnswer: 'B',
    explanation: 'Kucing berkaki empat: dua kaki depan dan dua kaki belakang.'
  },
  {
    id: 'SIM-A-IPA-16',
    number: 16,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Tumbuhan memerlukan apa agar tidak layu dan tetap segar?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kebutuhan Tumbuhan', 'Air Siraman', '#0EA5E9',
        '<g transform="translate(130, 20)"><path d="M70,25 C50,60 50,85 70,95 C90,85 90,60 70,25 Z" fill="#38BDF8"/><text x="70" y="115" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">AIR</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Disiram air' }, { key: 'B', text: 'Diberi es krim' }, { key: 'C', text: 'Diberi permen' }, { key: 'D', text: 'Dimasukkan ke lemari' }],
    correctAnswer: 'A',
    explanation: 'Tumbuhan membutuhkan air dan sinar matahari untuk tumbuh subur.'
  },
  {
    id: 'SIM-A-IPA-17',
    number: 17,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan yang bisa bertelur di bawah ini adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perkembangbiakan', 'Telur Ayam', '#F59E0B',
        '<g transform="translate(140, 20)"><ellipse cx="60" cy="65" rx="35" ry="45" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Ayam' }, { key: 'B', text: 'Kambing' }, { key: 'C', text: 'Kucing' }, { key: 'D', text: 'Kuda' }],
    correctAnswer: 'A',
    explanation: 'Ayam berkembang biak dengan cara bertelur.'
  },
  {
    id: 'SIM-A-IPA-18',
    number: 18,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Apakah yang keluar dari teko saat air mendidih panas?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Wujud Zat', 'Uap Panas', '#64748B',
        '<g transform="translate(130, 20)"><path d="M50,80 Q40,50 60,30 Q80,10 70,0" stroke="#CBD5E1" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M80,80 Q70,50 90,30 Q110,10 100,0" stroke="#CBD5E1" stroke-width="6" fill="none" stroke-linecap="round"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Uap air' }, { key: 'B', text: 'Es batu' }, { key: 'C', text: 'Minyak' }, { key: 'D', text: 'Batu' }],
    correctAnswer: 'A',
    explanation: 'Air panas yang mendidih berubah menjadi uap air yang membubung.'
  },
  {
    id: 'SIM-A-IPA-19',
    number: 19,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Berapakah jumlah sayap pada seekor KUPU-KUPU?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Serangga', 'Sayap Kupu-kupu', '#EC4899',
        '<g transform="translate(130, 20)"><ellipse cx="40" cy="50" rx="25" ry="20" fill="#F472B6"/><ellipse cx="100" cy="50" rx="25" ry="20" fill="#F472B6"/><ellipse cx="45" cy="80" rx="20" ry="15" fill="#F472B6"/><ellipse cx="95" cy="80" rx="20" ry="15" fill="#F472B6"/><line x1="70" y1="35" x2="70" y2="95" stroke="#1E293B" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: '2 sayap' }, { key: 'B', text: '4 sayap' }, { key: 'C', text: '6 sayap' }, { key: 'D', text: '1 sayap' }],
    correctAnswer: 'B',
    explanation: 'Kupu-kupu memiliki 4 sayap (dua di kiri dan dua di kanan).'
  },
  {
    id: 'SIM-A-IPA-20',
    number: 20,
    category: 'Kategori A',
    subject: 'IPA / Sains',
    level: 'PAUD/TK',
    stage: 'simulasi',
    curriculum: 'Cambridge Early Years',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda apakah di bawah ini yang dapat MENERAPKAN cahaya saat malam gelap?',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sumber Cahaya', 'Lampu Senter', '#EAB308',
        '<g transform="translate(120, 25)"><rect x="20" y="45" width="80" height="30" rx="6" fill="#3B82F6"/><polygon points="100,35 150,20 150,100 100,85" fill="#FEF08A" opacity="0.8"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Lampu senter' }, { key: 'B', text: 'Bantal' }, { key: 'C', text: 'Buku' }, { key: 'D', text: 'Sepatu' }],
    correctAnswer: 'A',
    explanation: 'Lampu senter memancarkan cahaya terang untuk menerangi kegelapan.'
  }
];
