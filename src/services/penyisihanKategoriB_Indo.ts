import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INDONESIA SD/MI (Kategori B)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_B_INDO: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-B-IND-01',
    number: 1,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Bacalah paragraf berikut: "Hutan mangrove di pesisir pantai memiliki peranan yang sangat penting bagi lingkungan. Akar tunjang bakau mampu meredam gelombang ombak besar dan mencegah abrasi daratan. Selain itu, kawasan mangrove menjadi habitat tempat bertelur dan berlindung berbagai jenis ikan serta kepiting bakau." Gagasan pokok paragraf tersebut adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Gagasan Pokok', 'Teks Lingkungan Hutan Mangrove', '#15803D',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🌿 🦀 🌊</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Fokus: Peran penting hutan mangrove bagi pesisir</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Cara memanen kepiting bakau di tepi pantai' },
      { key: 'B', text: 'Peranan penting hutan mangrove bagi lingkungan pesisir' },
      { key: 'C', text: 'Tingginya gelombang ombak di lautan lepas' },
      { key: 'D', text: 'Kerusakan daratan akibat abrasi ombak' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat utama berada di awal paragraf (deduktif): "Hutan mangrove di pesisir pantai memiliki peranan yang sangat penting bagi lingkungan." Kalimat lainnya berfungsi sebagai penjelas.'
  },
  {
    id: 'PENY-B-IND-02',
    number: 2,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan kalimat bermajas metafora berikut: "Perpustakaan sekolah adalah gudang ilmu yang selalu terbuka bagi setiap anak yang haus akan wawasan baru." Makna kias dari ungkapan "gudang ilmu" adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Majas & Kiasan', 'Majas Metafora "Gudang Ilmu"', '#7C3AED',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="140" y="45" font-size="22" text-anchor="middle">📚 🏛️ ✨</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#5B21B6" text-anchor="middle">Tempat yang menyimpan banyak sekali pengetahuan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Ruangan tempat menumpuk kardus dan barang bekas yang kotor' },
      { key: 'B', text: 'Tempat yang memuat dan menyediakan sangat banyak sumber pengetahuan' },
      { key: 'C', text: 'Toko yang menjual buku-buku pelajaran secara komersial' },
      { key: 'D', text: 'Lemari terkunci tempat menyimpan kertas ujian rahasia' }
    ],
    correctAnswer: 'B',
    explanation: 'Ungkapan "gudang ilmu" merupakan metafora yang menggambarkan tempat yang kaya akan sumber informasi dan pengetahuan luas.'
  },
  {
    id: 'PENY-B-IND-03',
    number: 3,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Cermatilah keempat kalimat berita di bawah ini! Manakah kalimat yang merupakan kalimat FAKTA (dapat dibuktikan secara objektif dan akurat)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Fakta vs Opini', 'Analisis Kalimat Fakta Objektif', '#2563EB',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
          <text x="140" y="45" font-size="12" font-weight="bold" fill="#1E40AF" text-anchor="middle">FAKTA: Data nyata, angka teruji, tanggal pasti</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#3B82F6" text-anchor="middle">OPINI: Kata sifat subjektif (paling indah, tampaknya)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Menurut pendapat para siswa, lukisan pemandangan itu paling indah di kelas.' },
      { key: 'B', text: 'Upacara peringatan Hari Kemerdekaan RI dilaksanakan pada tanggal 17 Agustus.' },
      { key: 'C', text: 'Masakan rendang di kantin sekolah rasanya mungkin terlalu pedas untuk anak-anak.' },
      { key: 'D', text: 'Udara hari ini tampaknya akan sangat gerah menjelang siang nanti.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pilihan B adalah fakta sejarah dan kenegaraan resmi yang memiliki tanggal pasti dan dapat dibuktikan kebenarannya tanpa penilaian rasa pribadi.'
  },
  {
    id: 'PENY-B-IND-04',
    number: 4,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan penulisan ejaan dan tanda baca berikut! Penulisan kalimat langsung yang memenuhi kaidah Pedoman Umum Ejaan Bahasa Indonesia (PUEBI) adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Ejaan PUEBI', 'Kaidah Penulisan Kalimat Langsung', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Rumus: Ibu berkata, "Jangan lupa cuci tangan."</text>
          <text x="140" y="68" font-size="10" font-weight="bold" fill="#B45309" text-anchor="middle">Tanda koma sebelum petik buka, huruf kapital di awal petikan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Dokter berpesan, "Istirahatlah yang cukup dan minumlah air putih hangat."' },
      { key: 'B', text: 'Dokter berpesan "istirahatlah yang cukup dan minumlah air putih hangat."' },
      { key: 'C', text: 'Dokter berpesan, istirahatlah yang cukup dan minumlah air putih hangat' },
      { key: 'D', text: 'Dokter berpesan: "istirahatlah yang cukup dan minumlah air putih hangat"?' }
    ],
    correctAnswer: 'A',
    explanation: 'Sesuai kaidah PUEBI, kalimat langsung diawali tanda koma setelah kata pengantar, diapit tanda petik ("..."), dan huruf pertama dalam petikan ditulis dengan huruf kapital.'
  },
  {
    id: 'PENY-B-IND-05',
    number: 5,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Urutan langkah-langkah membuat pupuk kompos daun kering yang tepat dan logis adalah ...\n(1) Siram tumpukan dengan sedikit air larutan EM4 agar lembap.\n(2) Kumpulkan sampah daun kering dan masukkan ke dalam komposter.\n(3) Tutup rapat wadah komposter dan biarkan selama 3-4 minggu.\n(4) Campurkan sedikit tanah gembur sebagai bibit mikroorganisme.',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Teks Prosedur', 'Urutan Pembuatan Pupuk Kompos', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="1.5"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Tahapan: Kumpul daun ➔ Campur tanah ➔ Lembapkan ➔ Tutup</text>
          <text x="140" y="68" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">Urutan Logis: (2) - (4) - (1) - (3)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '(2) - (4) - (1) - (3)' },
      { key: 'B', text: '(1) - (2) - (3) - (4)' },
      { key: 'C', text: '(3) - (2) - (1) - (4)' },
      { key: 'D', text: '(4) - (1) - (2) - (3)' }
    ],
    correctAnswer: 'A',
    explanation: 'Urutan pembuatan kompos yang benar diawali mengumpulkan daun kering (2), menambahkan tanah gembur (4), melembapkan dengan larutan pengurai (1), lalu menutup wadah fermentasi (3).'
  },

  // --- CAMBRIDGE PRIMARY (Literacy Aligned) (Soal 6 - 10) ---
  {
    id: 'PENY-B-IND-06',
    number: 6,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Bacalah penggalan fabel berikut: "Kancil terperangkap di dalam lubang jebakan yang cukup dalam. Alih-alih panik dan menangis meraung-raung, ia duduk tenang mengamati dinding tanah dan mencari akar pohon yang menjulur untuk dipanjat." Karakter tokoh Kancil dalam kutipan tersebut adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Karakter Fabel', 'Inferensi Watak Tokoh Cerita', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFFBEB" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="45" font-size="22" text-anchor="middle">🦌 💡 🌿</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">Sikap: Tidak panik, berpikir tenang, dan mencari jalan keluar</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Cengeng dan putus asa' },
      { key: 'B', text: 'Tenang, cerdik, dan pantang menyerah' },
      { key: 'C', text: 'Sombong dan meremehkan musuh' },
      { key: 'D', text: 'Penakut dan ragu-ragu' }
    ],
    correctAnswer: 'B',
    explanation: 'Kancil menunjukkan watak tenang dan cerdik karena ia tidak panik saat tertimpa bahaya, melainkan segera mencari solusi logis untuk menyelamatkan diri.'
  },
  {
    id: 'PENY-B-IND-07',
    number: 7,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Perhatikan bagian alur cerita narasi: "Tiba-tiba tanah berguncang keras dan batu-batu dari tebing mulai berjatuhan ke arah jalan setapak yang dilalui rombongan petualang. Teriakan panik pun terdengar saat mereka berusaha saling menyelamatkan." Bagian alur narasi tersebut merupakan tahapan ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Struktur Narasi', 'Tahapan Alur Plot Cerita', '#DC2626',
        `<g transform="translate(60, 15)">
          <polyline points="20,70 100,60 140,25 180,50 240,65" fill="none" stroke="#DC2626" stroke-width="2.5"/>
          <circle cx="140" cy="25" r="5" fill="#B91C1C"/>
          <text x="140" y="15" font-size="10" font-weight="bold" fill="#991B1B" text-anchor="middle">Puncak Masalah (Klimaks)</text>
          <text x="60" y="85" font-size="9" fill="#64748B">Pengenalan</text>
          <text x="210" y="85" font-size="9" fill="#64748B">Penyelesaian</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Orientasi (pengenalan tokoh dan latar)' },
      { key: 'B', text: 'Klimaks (puncak ketegangan/masalah utama)' },
      { key: 'C', text: 'Resolusi (penyelesaian konflik)' },
      { key: 'D', text: 'Koda (amanat penutup)' }
    ],
    correctAnswer: 'B',
    explanation: 'Saat ketegangan mencapai titik tertinggi yang mengancam keselamatan tokoh utama, bagian cerita tersebut berada pada tahap klimaks (puncak konflik).'
  },
  {
    id: 'PENY-B-IND-08',
    number: 8,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Pasangan kata di bawah ini yang merupakan pasangan SINONIM (memiliki kesamaan makna) yang tepat adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Hubungan Makna', 'Pasangan Kata Sinonim Leksikal', '#0D9488',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="105" height="55" rx="8" fill="#CCFBF1" stroke="#0D9488"/>
          <text x="72" y="52" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Gigih = Ulet</text>
          
          <text x="140" y="52" font-size="16" font-weight="bold" fill="#0D9488" text-anchor="middle">≡</text>
          
          <rect x="155" y="20" width="105" height="55" rx="8" fill="#CCFBF1" stroke="#0D9488"/>
          <text x="207" y="52" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Sama Makna</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Gigih - Ulet' },
      { key: 'B', text: 'Hemat - Boros' },
      { key: 'C', text: 'Cepat - Lambat' },
      { key: 'D', text: 'Terang - Gulita' }
    ],
    correctAnswer: 'A',
    explanation: '"Gigih" dan "ulet" memiliki makna yang sama yaitu pantang menyerah dan teguh hati (sinonim). Pilihan lain adalah antonim (lawan kata).'
  },
  {
    id: 'PENY-B-IND-09',
    number: 9,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Manakah kalimat majemuk setara yang menyatakan hubungan pertentangan yang tepat?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Sintaksis', 'Kalimat Majemuk Pertentangan', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#C2410C" text-anchor="middle">Klausa 1 (Positif) ↔ Klausa 2 (Berlawanan)</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle">Konjungsi: "tetapi", "sedangkan", "melainkan"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Budi suka membaca buku sains dan adiknya suka bernyanyi lagu daerah.' },
      { key: 'B', text: 'Ahmad bertubuh kecil, tetapi memiliki tenaga dan ketahanan lari yang luar biasa.' },
      { key: 'C', text: 'Jika hari tidak hujan, paman akan memanen jagung di ladang.' },
      { key: 'D', text: 'Siti belajar dengan giat sehingga ia memperoleh peringkat pertama.' }
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat B menggunakan kata penghubung "tetapi" untuk menghubungkan dua klausa yang berlawanan/bertentangan (bertubuh kecil vs bertenaga luar biasa).'
  },
  {
    id: 'PENY-B-IND-10',
    number: 10,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Bacalah paragraf argumentasi berikut: "Olahraga lari pagi selama 20 menit secara rutin dapat meningkatkan sirkulasi oksigen ke otak, menurunkan risiko penyakit jantung, dan menyegarkan suasana hati." Simpulan yang paling tepat dari paragraf tersebut adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Simpulan Paragraf', 'Menarik Kesimpulan Teks', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🏃‍♂️ 💓 🧠</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">Rutin lari pagi memberikan banyak manfaat kesehatan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Lari pagi hanya boleh dilakukan oleh atlet profesional saja.' },
      { key: 'B', text: 'Olahraga lari pagi secara teratur memberikan banyak manfaat bagi kesehatan fisik dan mental.' },
      { key: 'C', text: 'Penyakit jantung hanya bisa dicegah dengan obat dokter tanpa olahraga.' },
      { key: 'D', text: 'Lari pagi selama lebih dari 3 jam sangat dianjurkan untuk anak-anak.' }
    ],
    correctAnswer: 'B',
    explanation: 'Simpulan merangkum ketiga butir manfaat yang diuraikan dalam teks, yaitu kesehatan fisik (jantung, sirkulasi oksigen) dan mental (suasana hati).'
  },

  // --- SINGAPORE CURRICULUM (Sintaksis & Transformasi) (Soal 11 - 15) ---
  {
    id: 'PENY-B-IND-11',
    number: 11,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Ubahlah kalimat aktif berikut menjadi kalimat pasif yang baku:\n"Seluruh siswa kelas empat membersihkan ruang laboratorium komputer."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Transformasi Kalimat', 'Kalimat Aktif ke Pasif', '#8B5CF6',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="1.5"/>
          <text x="140" y="42" font-size="10" font-weight="bold" fill="#6D28D9" text-anchor="middle">Aktif: [S] Siswa + [P: me-] membersihkan + [O] Lab</text>
          <text x="140" y="65" font-size="10" font-weight="bold" fill="#4C1D95" text-anchor="middle">Pasif: [O] Lab + [P: di-] dibersihkan + oleh [S] Siswa</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Ruang laboratorium komputer dibersihkan oleh seluruh siswa kelas empat.' },
      { key: 'B', text: 'Ruang laboratorium komputer membersihkan seluruh siswa kelas empat.' },
      { key: 'C', text: 'Dibersihkan ruang laboratorium komputer oleh kelas empat seluruh siswa.' },
      { key: 'D', text: 'Seluruh siswa kelas empat dibersihkan oleh laboratorium komputer.' }
    ],
    correctAnswer: 'A',
    explanation: 'Dalam kalimat pasif baku, objek ("ruang laboratorium komputer") dipindahkan menjadi subjek di awal kalimat, predikat berimbuhan di- ("dibersihkan"), diikuti pelaku ("oleh seluruh siswa kelas empat").'
  },
  {
    id: 'PENY-B-IND-12',
    number: 12,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Perhatikan peribahasa berikut: "Pak Rahmat dikenal sebagai orang yang sangat gemar membantu tetangganya yang sedang tertimpa kesulitan tanpa pernah mengharapkan imbalan." Peribahasa atau ungkapan yang tepat untuk Pak Rahmat adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Ungkapan & Peribahasa', 'Ungkapan Karakter Orang', '#10B981',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
          <text x="140" y="45" font-size="22" text-anchor="middle">🤝 🤲 ❤️</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">"Ringan tangan" = Suka menolong sesama</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Besar kepala' },
      { key: 'B', text: 'Ringan tangan (suka menolong)' },
      { key: 'C', text: 'Panjang tangan' },
      { key: 'D', text: 'Keras kepala' }
    ],
    correctAnswer: 'B',
    explanation: 'Ungkapan "ringan tangan" dalam konotasi positif berarti gemar membantu atau suka menolong orang lain yang kesusahan.'
  },
  {
    id: 'PENY-B-IND-13',
    number: 13,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Isilah bagian rumpang dengan kata berimbuhan yang paling tepat: "Pemerintah daerah sedang giat ... pembangunan jembatan penghubung antardesa yang rusak diterjang banjir."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Kata Berimbuhan', 'Kelengkapan Kata Berimbuhan', '#4F46E5',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#3730A3" text-anchor="middle">Bentuk kata dasar: "cepat" ➔ mempercepat</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#4338CA" text-anchor="middle">Makna gramatikal: Menjadikan lebih cepat</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'dicepatkan' },
      { key: 'B', text: 'mempercepat' },
      { key: 'C', text: 'tercepat' },
      { key: 'D', text: 'kecepatan' }
    ],
    correctAnswer: 'B',
    explanation: 'Imbuhan "memper- + kata sifat (cepat)" bermakna membuat menjadi lebih cepat. "Giat mempercepat pembangunan" adalah kalimat aktif yang tepat.'
  },
  {
    id: 'PENY-B-IND-14',
    number: 14,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Manakah dari kalimat-kalimat berikut yang merupakan KALIMAT EFEKTIF (hemat kata, lugas, dan tidak ambigu)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Kalimat Efektif', 'Kehematan & Kejelasan Kalimat', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5"/>
          <text x="140" y="42" font-size="10" font-weight="bold" fill="#166534" text-anchor="middle">Hindari pleonasme: "para hadirin sekalian", "sangat luas sekali"</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Gunakan kata yang hemat, cermat, dan padat makna</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Para hadirin sekalian dimohon untuk segera berdiri di tempat.' },
      { key: 'B', text: 'Hadirin dimohon berdiri.' },
      { key: 'C', text: 'Semua para siswa-siswa saling tolong-menolong sekali.' },
      { key: 'D', text: 'Bunga itu sangat amat indah sekali dipandang mata.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pilihan B adalah kalimat efektif karena hemat kata dan jelas. Pilihan A berlebihan ("para hadirin sekalian"), C memakai pleonasme ganda ("semua para siswa-siswa"), dan D menumpuk kata sangat-amat-sekali.'
  },
  {
    id: 'PENY-B-IND-15',
    number: 15,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Hubungkan dua klausa berikut dengan konjungsi kausalitas yang tepat:\n"Debit air sungai meluap ke permukiman warga (...) hujan lebat mengguyur kawasan hulu selama sepuluh jam."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Konjungsi Kausalitas', 'Hubungan Sebab-Akibat', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <text x="140" y="45" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">Akibat: Air sungai meluap ke permukiman</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#0284C7" text-anchor="middle">Sebab: Hujan lebat di hulu ➔ Konjungsi: "karena"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'meskipun' },
      { key: 'B', text: 'karena' },
      { key: 'C', text: 'seandainya' },
      { key: 'D', text: 'sebelum' }
    ],
    correctAnswer: 'B',
    explanation: 'Konjungsi "karena" atau "sebab" menyatakan alasan/penyebab terjadinya peristiwa luapan air sungai akibat hujan lebat.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB PYP) (Soal 16 - 20) ---
  {
    id: 'PENY-B-IND-16',
    number: 16,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Amati pesan visual pada poster hemat air bersih berikut! Apa tujuan utama pembuat poster menyampaikan kalimat "Tutup Keran Saat Menyikat Gigi, Selamatkan Ribuan Liter Air untuk Masa Depan"?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Analisis Media & Poster', 'Poster Kampanye Konservasi Air', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="15" width="240" height="75" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
          <text x="140" y="42" font-size="22" text-anchor="middle">🚰 💧 🌍</text>
          <text x="140" y="62" font-size="10" font-weight="900" fill="#0369A1" text-anchor="middle">TUTUP KERAN SAAT MENYIKAT GIGI</text>
          <text x="140" y="78" font-size="9" font-weight="bold" fill="#0284C7" text-anchor="middle">Aksi Kecil Selamatkan Masa Depan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Melarang orang menyikat gigi di rumah' },
      { key: 'B', text: 'Mengajak masyarakat menghemat air bersih dengan tindakan sederhana sehari-hari' },
      { key: 'C', text: 'Menjual produk pasta gigi dan keran baru' },
      { key: 'D', text: 'Memperingatkan bahwa air pipa mengandung kuman' }
    ],
    correctAnswer: 'B',
    explanation: 'Poster persuasif tersebut bertujuan menumbuhkan kesadaran pembaca untuk berhemat air melalui kebiasaan sederhana menutup keran air saat tidak dipakai.'
  },
  {
    id: 'PENY-B-IND-17',
    number: 17,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Bacalah teks eksposisi pelestarian fauna: "Orangutan Kalimantan merupakan penyebar biji pohon utama di hutan tropis. Tanpa orangutan, regenerasi pohon-pohon hutan akan terhambat dan keseimbangan ekosistem terganggu." Solusi paling nyata yang dapat kita dukung untuk melindungi satwa ini adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Konservasi Biodiversitas', 'Perlindungan Habitat Orangutan', '#B45309',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🦧 🌳 🍃</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Menjaga kelestarian habitat hutan hujan alami</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Menangkap orangutan untuk dijadikan hewan peliharaan di sangkar' },
      { key: 'B', text: 'Menjaga keutuhan habitat hutan alami dan menghentikan perburuan liar' },
      { key: 'C', text: 'Menebang semua pohon besar untuk membuat kebun kelapa sawit' },
      { key: 'D', text: 'Memindahkan seluruh satwa liar ke gedung kota' }
    ],
    correctAnswer: 'B',
    explanation: 'Langkah pelestarian satwa langka yang tepat adalah menjaga ekosistem tempat tinggal aslinya di hutan alami serta menegakkan larangan perburuan liar.'
  },
  {
    id: 'PENY-B-IND-18',
    number: 18,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Bacalah puisi bertema kelestarian alam berikut:\n"Sungai jernih mengalir tenang,\nTempat ikan menari riang.\nBila sampah kau buang sembarangan,\nSirnalah keindahan yang kita dambakan."\nAmanat yang terkandung dalam bait puisi di atas adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Apresiasi Sastra', 'Amanat Puisi Lingkungan Sungai', '#0D9488',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🌊 🐟 🚯</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Jangan mengotori sungai agar ekosistem tetap lestari</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Kita harus menangkap seluruh ikan di sungai sampai habis' },
      { key: 'B', text: 'Kita wajib menjaga kebersihan aliran sungai dan tidak membuang sampah ke air' },
      { key: 'C', text: 'Sungai sebaiknya ditutup dengan semen' },
      { key: 'D', text: 'Bermain air di sungai saat hujan lebat sangat dianjurkan' }
    ],
    correctAnswer: 'B',
    explanation: 'Amanat puisi tersebut mengajak pembaca untuk merawat kebersihan sungai dan tidak membuang sampah sembarangan demi kelestarian alam dan biota air.'
  },
  {
    id: 'PENY-B-IND-19',
    number: 19,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Bacalah cerita keragaman budaya: "Saat merayakan festival budaya sekolah, Made mengenakan pakaian adat Bali, sedangkan Udin mengenakan baju Teluk Belanga Melayu. Keduanya saling memuji keindahan corak kain dan bertukar cerita asal-usul tradisi mereka dengan penuh kegembiraan." Nilai luhur Pancasila yang tecermin dalam cerita adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Nilai Keberagaman', 'Toleransi & Harmoni Budaya', '#DB2777',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FDF2F8" stroke="#DB2777" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🇮🇩 🤝 🌟</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">Bhinneka Tunggal Ika: Menghargai keragaman budaya bangsa</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Memaksakan pakaian adat daerah sendiri kepada orang lain' },
      { key: 'B', text: 'Saling menghormati, mengapresiasi, dan bangga akan keragaman budaya Nusantara' },
      { key: 'C', text: 'Menolak berteman dengan orang yang berbeda suku' },
      { key: 'D', text: 'Menganggap tradisinya sendiri yang paling hebat di dunia' }
    ],
    correctAnswer: 'B',
    explanation: 'Kisah Made dan Udin mencerminkan semangat toleransi, saling mengapresiasi keberagaman budaya, dan persatuan sesuai semboyan Bhinneka Tunggal Ika.'
  },
  {
    id: 'PENY-B-IND-20',
    number: 20,
    category: 'Kategori B',
    subject: 'Bahasa Indonesia',
    level: 'SD/MI',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Literasi Digital & Kritis: Ketika membaca sebuah pesan berantai di media sosial yang mengklaim ramuan misterius dapat menyembuhkan segala jenis penyakit tanpa bukti medis resmi, sikap kritis yang benar adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Literasi Kritis', 'Verifikasi Fakta & Cek Sumber', '#4F46E5',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🔍 📱 ⚖️</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#3730A3" text-anchor="middle">Cek keabsahan fakta ke instansi resmi (Kemenkes/BPOM)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Langsung menyebarkan pesan ke semua grup obrolan keluarga' },
      { key: 'B', text: 'Memverifikasi kebenaran informasi kepada pihak medis resmi atau situs BPOM sebelum mempercayainya' },
      { key: 'C', text: 'Membeli produk tersebut dalam jumlah besar tanpa bertanya dokter' },
      { key: 'D', text: 'Memaksa teman sekelas untuk ikut meminum ramuan itu' }
    ],
    correctAnswer: 'B',
    explanation: 'Sebagai pengguna media digital yang kritis (inquiry mindset), setiap informasi kesehatan wajib diverifikasi ke sumber resmi berwenang (seperti BPOM atau dokter) sebelum dipercaya atau dibagikan.'
  }
];
