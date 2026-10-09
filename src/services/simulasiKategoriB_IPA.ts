import { QuestionItem } from './cbtQuestionTypes';
import { createSimulasiSvg } from './simulasiSvgIllustrations';

// Kategori B: SD/MI - IPA / Sains (20 Soal Sangat Mudah & Bergambar)

export const KATEGORI_B_IPA: QuestionItem[] = [
  {
    id: 'SIM-B-IPA-01',
    number: 1,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Bagian tumbuhan yang berfungsi menyerap air dan zat hara dari dalam tanah adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bagian Tumbuhan', 'Akar Tumbuhan', '#15803D',
        '<g transform="translate(130, 20)"><rect x="60" y="10" width="10" height="45" fill="#84CC16"/><path d="M65,55 L45,95 M65,55 L85,95 M65,70 L35,85 M65,70 L95,85" stroke="#78350F" stroke-width="3" stroke-linecap="round"/><text x="65" y="115" font-size="11" font-weight="bold" fill="#78350F" text-anchor="middle">AKAR</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Akar' }, { key: 'B', text: 'Daun' }, { key: 'C', text: 'Bunga' }, { key: 'D', text: 'Buah' }],
    correctAnswer: 'A',
    explanation: 'Akar bertugas menyerap air dan unsur hara dari dalam tanah serta memperkokoh berdirinya tanaman.'
  },
  {
    id: 'SIM-B-IPA-02',
    number: 2,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Proses perubahan wujud benda dari cair menjadi padat dinamakan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perubahan Wujud', 'Air Menjadi Es', '#0284C7',
        '<g transform="translate(110, 25)"><circle cx="40" cy="50" r="25" fill="#BAE6FD"/><text x="40" y="55" font-size="10" font-weight="bold" fill="#0369A1" text-anchor="middle">Air</text><text x="85" y="55" font-size="18" font-weight="bold" fill="#1E293B">→</text><rect x="110" y="25" width="50" height="50" rx="8" fill="#CFFAFE" stroke="#0284C7" stroke-width="2"/><text x="135" y="55" font-size="10" font-weight="bold" fill="#0284C7" text-anchor="middle">Es</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Membeku' }, { key: 'B', text: 'Mencair' }, { key: 'C', text: 'Menguap' }, { key: 'D', text: 'Mengembun' }],
    correctAnswer: 'A',
    explanation: 'Perubahan wujud dari cair menjadi padat disebut membeku (contoh: air menjadi es batu).'
  },
  {
    id: 'SIM-B-IPA-03',
    number: 3,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Hewan pemakan tumbuhan (seperti sapi, kambing, dan kelinci) disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Jenis Makanan', 'Herbivora', '#16A34A',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="140" height="60" rx="10" fill="#DCFCE7"/><text x="80" y="55" font-size="16" font-weight="bold" fill="#15803D" text-anchor="middle">HERBIVORA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Herbivora' }, { key: 'B', text: 'Karnivora' }, { key: 'C', text: 'Omnivora' }, { key: 'D', text: 'Insektivora' }],
    correctAnswer: 'A',
    explanation: 'Herbivora adalah golongan hewan pemakan tumbuhan atau rumput.'
  },
  {
    id: 'SIM-B-IPA-04',
    number: 4,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Gaya yang menyebabkan benda jatuh ke bawah menuju pusat bumi disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Gaya Fisika', 'Apel Jatuh', '#DC2626',
        '<g transform="translate(130, 20)"><circle cx="65" cy="40" r="22" fill="#EF4444"/><line x1="65" y1="70" x2="65" y2="105" stroke="#1E293B" stroke-width="4"/><polygon points="65,115 57,100 73,100" fill="#1E293B"/><text x="65" y="130" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">Gravitasi</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Gaya gravitasi' }, { key: 'B', text: 'Gaya magnet' }, { key: 'C', text: 'Gaya gesek' }, { key: 'D', text: 'Gaya pegas' }],
    correctAnswer: 'A',
    explanation: 'Gaya gravitasi bumi menarik semua benda ke permukaan bumi.'
  },
  {
    id: 'SIM-B-IPA-05',
    number: 5,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Zat hijau daun pada tumbuhan yang berfungsi dalam fotosintesis adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Biologi Tumbuhan', 'Klorofil', '#15803D',
        '<g transform="translate(130, 20)"><ellipse cx="65" cy="65" rx="50" ry="30" fill="#86EFAC" stroke="#15803D" stroke-width="3"/><text x="65" y="70" font-size="14" font-weight="bold" fill="#14532D" text-anchor="middle">KLOROFIL</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Klorofil' }, { key: 'B', text: 'Batang' }, { key: 'C', text: 'Benang sari' }, { key: 'D', text: 'Putik' }],
    correctAnswer: 'A',
    explanation: 'Klorofil adalah pigmen hijau pada daun yang menyerap energi cahaya matahari.'
  },
  {
    id: 'SIM-B-IPA-06',
    number: 6,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Alat pernapasan utama pada manusia adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sistem Pernapasan', 'Paru-paru', '#F43F5E',
        '<g transform="translate(130, 20)"><ellipse cx="45" cy="65" rx="22" ry="35" fill="#FDA4AF"/><ellipse cx="85" cy="65" rx="22" ry="35" fill="#FDA4AF"/><line x1="65" y1="20" x2="65" y2="55" stroke="#E11D48" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Paru-paru' }, { key: 'B', text: 'Insang' }, { key: 'C', text: 'Trakea' }, { key: 'D', text: 'Kulit' }],
    correctAnswer: 'A',
    explanation: 'Manusia bernapas menghirup oksigen menggunakan paru-paru.'
  },
  {
    id: 'SIM-B-IPA-07',
    number: 7,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Planet terdekat dari matahari dalam tata surya kita adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Tata Surya', 'Merkurius', '#D97706',
        '<g transform="translate(90, 20)"><circle cx="30" cy="65" r="45" fill="#F59E0B"/><circle cx="120" cy="65" r="14" fill="#94A3B8"/><text x="120" y="95" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">Merkurius</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Merkurius' }, { key: 'B', text: 'Bumi' }, { key: 'C', text: 'Jupiter' }, { key: 'D', text: 'Mars' }],
    correctAnswer: 'A',
    explanation: 'Merkurius adalah planet yang letaknya paling dekat dengan matahari.'
  },
  {
    id: 'SIM-B-IPA-08',
    number: 8,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda yang dapat ditarik kuat oleh magnet adalah benda yang terbuat dari...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Kemagnetan', 'Paku Besi & Magnet', '#DC2626',
        '<g transform="translate(130, 20)"><path d="M35,20 L35,65 Q35,95 65,95 Q95,95 95,65 L95,20" stroke="#DC2626" stroke-width="12" fill="none"/><line x1="65" y1="80" x2="65" y2="110" stroke="#475569" stroke-width="4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Besi / Logam' }, { key: 'B', text: 'Kayu' }, { key: 'C', text: 'Plastik' }, { key: 'D', text: 'Karet' }],
    correctAnswer: 'A',
    explanation: 'Magnet dapat menarik benda logam feromagnetik seperti besi dan baja.'
  },
  {
    id: 'SIM-B-IPA-09',
    number: 9,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Peristiwa perpindahan panas matahari sampai ke bumi melalui ruang hampa disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perpindahan Panas', 'Radiasi Matahari', '#EA580C',
        '<g transform="translate(110, 25)"><circle cx="35" cy="50" r="25" fill="#F59E0B"/><line x1="70" y1="50" x2="135" y2="50" stroke="#EA580C" stroke-width="4" stroke-dasharray="6,4"/><polygon points="145,50 133,43 133,57" fill="#EA580C"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Radiasi' }, { key: 'B', text: 'Konduksi' }, { key: 'C', text: 'Konveksi' }, { key: 'D', text: 'Kondensasi' }],
    correctAnswer: 'A',
    explanation: 'Radiasi adalah pancaran energi panas tanpa memerlukan zat perantara.'
  },
  {
    id: 'SIM-B-IPA-10',
    number: 10,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Katak bernapas menggunakan insang ketika masih dalam tahap...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Metamorfosis', 'Kecebong / Berudu', '#059669',
        '<g transform="translate(130, 25)"><ellipse cx="50" cy="50" rx="20" ry="15" fill="#10B981"/><path d="M70,50 Q100,30 115,50" stroke="#059669" stroke-width="5" fill="none"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Kecebong / Berudu' }, { key: 'B', text: 'Katak dewasa' }, { key: 'C', text: 'Telur' }, { key: 'D', text: 'Pupa' }],
    correctAnswer: 'A',
    explanation: 'Saat masih berupa kecebong/berudu di air, katak bernapas dengan insang.'
  },
  {
    id: 'SIM-B-IPA-11',
    number: 11,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda yang dapat menghantarkan panas dan listrik dengan baik disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sifat Benda', 'Konduktor', '#F59E0B',
        '<g transform="translate(120, 25)"><rect x="15" y="25" width="130" height="50" rx="8" fill="#FEF3C7"/><text x="80" y="55" font-size="14" font-weight="bold" fill="#B45309" text-anchor="middle">KONDUKTOR</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Konduktor' }, { key: 'B', text: 'Isolator' }, { key: 'C', text: 'Reflektor' }, { key: 'D', text: 'Kolektor' }],
    correctAnswer: 'A',
    explanation: 'Konduktor adalah penghantar panas atau listrik yang baik (contoh: tembaga, besi, aluminium).'
  },
  {
    id: 'SIM-B-IPA-12',
    number: 12,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Sumber energi terbesar dan utama bagi seluruh kehidupan di bumi adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Energi Alam', 'Matahari', '#F59E0B',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="40" fill="#FBBF24"/><text x="65" y="70" font-size="12" font-weight="bold" fill="#78350F" text-anchor="middle">MATAHARI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Matahari' }, { key: 'B', text: 'Batu bara' }, { key: 'C', text: 'Minyak bumi' }, { key: 'D', text: 'Angin' }],
    correctAnswer: 'A',
    explanation: 'Matahari merupakan sumber energi panas dan cahaya terbesar bagi bumi.'
  },
  {
    id: 'SIM-B-IPA-13',
    number: 13,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Hubungan antara lebah madu dengan bunga mawar merupakan contoh simbiosis...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Simbiosis', 'Saling Menguntungkan', '#10B981',
        '<g transform="translate(100, 25)"><rect x="10" y="20" width="180" height="60" rx="10" fill="#D1FAE5"/><text x="100" y="55" font-size="14" font-weight="bold" fill="#047857" text-anchor="middle">MUTUALISME</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Mutualisme' }, { key: 'B', text: 'Parasitisme' }, { key: 'C', text: 'Komensalisme' }, { key: 'D', text: 'Netral' }],
    correctAnswer: 'A',
    explanation: 'Simbiosis mutualisme saling menguntungkan: lebah mendapat nektar, bunga terbantu penyerbukannya.'
  },
  {
    id: 'SIM-B-IPA-14',
    number: 14,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Kurikulum 2013',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda cair memiliki sifat mengikuti bentuk...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Wujud Benda', 'Air dalam Gelas', '#0284C7',
        '<g transform="translate(130, 20)"><path d="M40,25 L50,95 L80,95 L90,25 Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="3"/><path d="M45,55 L50,95 L80,95 L85,55 Z" fill="#38BDF8"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Wadahnya' }, { key: 'B', text: 'Warnanya' }, { key: 'C', text: 'Beratnya' }, { key: 'D', text: 'Suhunya' }],
    correctAnswer: 'A',
    explanation: 'Benda cair bentuknya selalu menyesuaikan bentuk wadah atau tempatnya.'
  },
  {
    id: 'SIM-B-IPA-15',
    number: 15,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Bunyi TIDAK DAPAT merambat pada ruang...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Perambatan Gelombang', 'Ruang Hampa Udara', '#334155',
        '<g transform="translate(110, 25)"><rect x="15" y="25" width="150" height="55" rx="10" fill="#1E293B"/><text x="90" y="58" font-size="13" font-weight="bold" fill="#F8FAFC" text-anchor="middle">HAMPA UDARA</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Hampa udara' }, { key: 'B', text: 'Padat' }, { key: 'C', text: 'Cair' }, { key: 'D', text: 'Gas' }],
    correctAnswer: 'A',
    explanation: 'Gelombang bunyi membutuhkan medium materi untuk merambat sehingga tidak dapat merambat di ruang hampa udara.'
  },
  {
    id: 'SIM-B-IPA-16',
    number: 16,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Lapisan udara yang menyelubungi planet bumi dinamakan...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Bumi & Antariksa', 'Atmosfer Bumi', '#0284C7',
        '<g transform="translate(130, 20)"><circle cx="65" cy="65" r="35" fill="#10B981"/><circle cx="65" cy="65" r="48" fill="none" stroke="#38BDF8" stroke-width="4" stroke-dasharray="6,4"/></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Atmosfer' }, { key: 'B', text: 'Litosfer' }, { key: 'C', text: 'Hidrosfer' }, { key: 'D', text: 'Biosfer' }],
    correctAnswer: 'A',
    explanation: 'Atmosfer adalah lapisan gas atau udara yang menyelimuti planet bumi.'
  },
  {
    id: 'SIM-B-IPA-17',
    number: 17,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Gigi yang berfungsi untuk memotong makanan pada manusia adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Anatomi Tubuh', 'Gigi Seri', '#64748B',
        '<g transform="translate(140, 20)"><rect x="25" y="20" width="35" height="60" rx="6" fill="#F8FAFC" stroke="#64748B" stroke-width="3"/><text x="42" y="100" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">Gigi Seri</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Gigi seri' }, { key: 'B', text: 'Gigi taring' }, { key: 'C', text: 'Gigi geraham' }, { key: 'D', text: 'Gigi susu' }],
    correctAnswer: 'A',
    explanation: 'Gigi seri di bagian depan berfungsi utama untuk memotong makanan.'
  },
  {
    id: 'SIM-B-IPA-18',
    number: 18,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Benda langit yang mengelilingi planet bumi setiap bulan adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Satelit Alami', 'Bulan Mengelilingi Bumi', '#F59E0B',
        '<g transform="translate(110, 20)"><circle cx="50" cy="65" r="30" fill="#3B82F6"/><circle cx="120" cy="65" r="14" fill="#FBBF24"/><text x="120" y="95" font-size="10" font-weight="bold" fill="#92400E" text-anchor="middle">Bulan</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Bulan' }, { key: 'B', text: 'Mars' }, { key: 'C', text: 'Matahari' }, { key: 'D', text: 'Komet' }],
    correctAnswer: 'A',
    explanation: 'Bulan merupakan satelit alami yang berotasi dan berevolusi mengelilingi bumi.'
  },
  {
    id: 'SIM-B-IPA-19',
    number: 19,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Peristiwa jatuhnya serbuk sari ke kepala putik pada bunga disebut...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Reproduksi Bunga', 'Penyerbukan', '#EC4899',
        '<g transform="translate(120, 25)"><rect x="10" y="20" width="150" height="60" rx="10" fill="#FCE7F3"/><text x="85" y="55" font-size="14" font-weight="bold" fill="#BE185D" text-anchor="middle">PENYERBUKAN</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Penyerbukan' }, { key: 'B', text: 'Fotosintesis' }, { key: 'C', text: 'Respirasi' }, { key: 'D', text: 'Transpirasi' }],
    correctAnswer: 'A',
    explanation: 'Penyerbukan adalah proses jatuhnya serbuk sari ke kepala putik pada bunga.'
  },
  {
    id: 'SIM-B-IPA-20',
    number: 20,
    category: 'Kategori B',
    subject: 'IPA / Sains',
    level: 'SD/MI',
    stage: 'simulasi',
    curriculum: 'Cambridge Primary Science',
    difficulty: 'Sangat Mudah',
    questionText: 'Sumber energi listrik portabel yang biasa dipasang pada remote TV adalah...',
    ...(() => {
      const { svg, dataUri } = createSimulasiSvg('Sumber Listrik', 'Baterai Kering', '#2563EB',
        '<g transform="translate(130, 20)"><rect x="35" y="30" width="60" height="70" rx="6" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/><rect x="55" y="20" width="20" height="10" fill="#1D4ED8"/><text x="65" y="70" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">BATERAI</text></g>');
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [{ key: 'A', text: 'Baterai' }, { key: 'B', text: 'Generator besar' }, { key: 'C', text: 'Panel surya' }, { key: 'D', text: 'PLN' }],
    correctAnswer: 'A',
    explanation: 'Baterai menyimpan energi kimia yang diubah menjadi energi listrik kecil yang aman untuk peralatan elektronik portabel.'
  }
];
