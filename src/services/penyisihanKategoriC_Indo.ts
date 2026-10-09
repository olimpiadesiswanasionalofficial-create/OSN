import { QuestionItem } from './cbtQuestionTypes';
import { createPenyisihanSvg } from './simulasiSvgIllustrations';

// SOAL RESMI BABAK PENYISIHAN: BAHASA INDONESIA SMP/MTs (Kategori C)
// 20 Soal Pilihan Ganda Kurikulum Campuran (Merdeka, Cambridge, Singapore, IB)
// Tingkat Kesulitan: Menengah | 100% Bergambar & Unik

export const PENYISIHAN_C_INDO: QuestionItem[] = [
  // --- KURIKULUM MERDEKA (Soal 1 - 5) ---
  {
    id: 'PENY-C-IND-01',
    number: 1,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Bacalah kutipan Teks Laporan Hasil Observasi (LHO) berikut: "Terumbu karang adalah sekumpulan hewan karang yang bersimbiosis dengan sejenis tumbuhan alga bernama zooxanthellae. Ekosistem ini merupakan rumah bagi sepertiga biota laut tropis di dunia." Dalam struktur teks LHO, kutipan di atas menempati bagian ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Struktur Teks LHO', 'Pernyataan Umum (Definisi Umum)', '#0284C7',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">Ciri: Kalimat definisi kopula ("adalah", "merupakan")</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#0284C7" text-anchor="middle">Struktur: Pernyataan Umum / Definisi Umum</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Deskripsi bagian' },
      { key: 'B', text: 'Pernyataan umum / definisi umum' },
      { key: 'C', text: 'Deskripsi manfaat' },
      { key: 'D', text: 'Simpulan penutup' }
    ],
    correctAnswer: 'B',
    explanation: 'Bagian pembuka teks Laporan Hasil Observasi yang memuat definisi dasar objek menggunakan kopula "adalah" dan "merupakan" adalah pernyataan umum.'
  },
  {
    id: 'PENY-C-IND-02',
    number: 2,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Dalam teks eksposisi, paragraf penutup yang menegaskan kembali tesis awal berdasarkan rangkaian bukti dan argumen logis yang telah dijabarkan disebut ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Teks Eksposisi', 'Struktur Teks Eksposisi', '#15803D',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">Tesis (Pernyataan Pendapat) ➔ Rangkaian Argumen</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#166534" text-anchor="middle">➔ Penegasan Ulang Rekomendasi (Reiterasi)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Orientasi' },
      { key: 'B', text: 'Rangkaian argumen' },
      { key: 'C', text: 'Penegasan ulang (reiterasi)' },
      { key: 'D', text: 'Koda moral' }
    ],
    correctAnswer: 'C',
    explanation: 'Struktur teks eksposisi terdiri atas tesis, rangkaian argumen, dan diakhiri dengan penegasan ulang (reiterasi) untuk menguatkan kesimpulan.'
  },
  {
    id: 'PENY-C-IND-03',
    number: 3,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Bacalah kutipan cerpen: "Arga meremas surat pengumuman itu. Dadanya bergemuruh hebat antara rasa kecewa karena gagal beasiswa dan tekad membara untuk membuktikan bahwa kemiskinan tak akan membendung impiannya berkuliah." Jenis konflik yang dialami tokoh Arga adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Unsur Intrinsik Cerpen', 'Konflik Batin Tokoh Cerita', '#DC2626',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">📄 💔 ⚡</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#991B1B" text-anchor="middle">Pertentangan perasaan dalam jiwa sendiri (Internal/Batin)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Konflik fisik dengan orang tua' },
      { key: 'B', text: 'Konflik batin (internal psikologis)' },
      { key: 'C', text: 'Konflik sosial antarkelompok' },
      { key: 'D', text: 'Konflik alamiah dengan cuaca' }
    ],
    correctAnswer: 'B',
    explanation: 'Konflik yang timbul di dalam diri tokoh sendiri (pergulatan antara kecewa dan tekad bangkit) merupakan konflik batin atau konflik internal.'
  },
  {
    id: 'PENY-C-IND-04',
    number: 4,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Perhatikan penulisan ejaan tanda baca titik dua (:) dan titik koma (;). Manakah kalimat yang menggunakan tanda baca sesuai pedoman PUEBI?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Kaidah PUEBI', 'Penggunaan Titik Koma & Titik Dua', '#7C3AED',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#6D28D9" text-anchor="middle">Titik koma (;) memisahkan klausa setara tanpa konjungsi</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#5B21B6" text-anchor="middle">Contoh: Hari sudah larut malam; ayah masih bekerja.</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Hari sudah larut malam; adik masih sibuk membaca buku sains di kamarnya.' },
      { key: 'B', text: 'Ibu membeli: apel, jeruk dan mangga di pasar.' },
      { key: 'C', text: 'Kami memerlukan perabot; meja, kursi, dan lemari.' },
      { key: 'D', text: 'Ayah berangkat kerja: kereta sudah tiba di stasiun.' }
    ],
    correctAnswer: 'A',
    explanation: 'Tanda titik koma (;) digunakan sebagai pengganti kata penghubung untuk memisahkan kalimat setara dalam kalimat majemuk (Pilihan A benar).'
  },
  {
    id: 'PENY-C-IND-05',
    number: 5,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'Menengah',
    questionText: 'Dalam teks tanggapan kritis, kalimat kritik yang disampaikan secara santun, objektif, dan membangun adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Merdeka · Teks Tanggapan', 'Kritik Konstruktif & Santun', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Kritik ilmiah: Mengapresiasi kelebihan + masukan perbaikan</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Hindari kata menghakimi atau merendahkan karya</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Karya tulis ini sangat membosankan dan tidak pantas dibaca siapapun.' },
      { key: 'B', text: 'Penulis sama sekali tidak memiliki bakat dalam menyusun laporan ilmiah.' },
      { key: 'C', text: 'Gagasan yang diajukan penulis sangat menarik, namun akan lebih kokoh apabila didukung data statistik mutakhir.' },
      { key: 'D', text: 'Hanya orang bodoh yang setuju dengan argumen di buku ini.' }
    ],
    correctAnswer: 'C',
    explanation: 'Kritik yang santun dan konstruktif mengapresiasi kelebihan objek terlebih dahulu dan memberikan solusi atau saran perbaikan yang logis dan objektif.'
  },

  // --- CAMBRIDGE LOWER SECONDARY (Literacy Aligned) (Soal 6 - 10) ---
  {
    id: 'PENY-C-IND-06',
    number: 6,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Perhatikan kalimat bermajas: "Pena penulis itu menari-nari di atas lembaran kertas putih, menuturkan kisah perih para pejuang kemerdekaan." Majas yang digunakan pada kalimat tersebut adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Majas Retoris', 'Gaya Bahasa Personifikasi', '#DB2777',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FDF2F8" stroke="#DB2777" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">✒️ 💃 📜</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">Benda mati (pena) diberi sifat insani manusia (menari-nari)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Hiperbola' },
      { key: 'B', text: 'Personifikasi' },
      { key: 'C', text: 'Litotes' },
      { key: 'D', text: 'Ironi' }
    ],
    correctAnswer: 'B',
    explanation: 'Personifikasi adalah gaya bahasa yang melekatkan sifat-sifat insani (seperti menari-nari) pada benda tak bernyawa (pena).'
  },
  {
    id: 'PENY-C-IND-07',
    number: 7,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Perhatikan pasangan kata bermakna denotatif dan konotatif berikut: Manakah kalimat di bawah ini yang menggunakan kata "kursi" dalam makna KONOTATIF (makna kiasan)?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Semantik Makna', 'Denotatif vs Konotatif', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#C2410C" text-anchor="middle">Denotatif: Tempat duduk berkaki empat (sebenarnya)</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle">Konotatif: Kedudukan / Jabatan / Kekuasaan politik</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Tukang kayu itu sedang memperbaiki kaki kursi kayu jati yang patah.' },
      { key: 'B', text: 'Para politisi saling bersaing ketat untuk memperebutkan kursi ketua dewan perwakilan.' },
      { key: 'C', text: 'Siswa diminta merapikan meja dan kursi sebelum meninggalkan kelas.' },
      { key: 'D', text: 'Ibu meletakkan bantal kecil di atas kursi sofa ruang tamu.' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada pilihan B, "kursi" bermakna kiasan konotatif yaitu jabatan, posisi kedudukan, atau kekuasaan politik.'
  },
  {
    id: 'PENY-C-IND-08',
    number: 8,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Ubahlah kalimat langsung berikut menjadi kalimat tidak langsung:\nKepala Sekolah berpidato, "Seluruh siswa wajib mematuhi protokol keselamatan di laboratorium sains."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Sintaksis Naratif', 'Kalimat Langsung ke Tidak Langsung', '#4F46E5',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#3730A3" text-anchor="middle">Gunakan konjungsi "bahwa" dan hilangkan tanda petik</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#4338CA" text-anchor="middle">Bentuk baku: ... berpidato bahwa seluruh siswa...</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Kepala Sekolah berpidato bahwa seluruh siswa wajib mematuhi protokol keselamatan di laboratorium sains.' },
      { key: 'B', text: 'Kepala Sekolah berpidato agar seluruh siswa tidak perlu mematuhi aturan.' },
      { key: 'C', text: 'Seluruh siswa wajib mematuhi protokol kata Kepala Sekolah berpidato.' },
      { key: 'D', text: 'Kepala Sekolah berpidato: "bahwa siswa mematuhi protokol keselamatan".' }
    ],
    correctAnswer: 'A',
    explanation: 'Dalam kalimat tidak langsung, tanda petik dihilangkan, kata pengantar dihubungkan dengan konjungsi "bahwa", dan intonasi menjadi berita datar.'
  },
  {
    id: 'PENY-C-IND-09',
    number: 9,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Cermatilah paragraf berikut: "(1) Energi angin merupakan salah satu energi baru terbarukan yang potensial. (2) Selain tidak menimbulkan polusi udara, turbin angin dapat dipasang di lahan pertanian tanpa mengganggu tanaman. (3) Namun, biaya awal instalasi generator turbin masih relatif tinggi. (4) Oleh sebab itu, subsidi riset dari pemerintah sangat diperlukan." Kalimat yang mengandung hubungan pertentangan ditunjukkan oleh nomor ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Kohesi & Transisi', 'Konjungsi Antarkalimat Pertentangan', '#D97706',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFFBEB" stroke="#D97706" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">Konjungsi antarkalimat: "Namun", "Akan tetapi"</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Menyatakan kontras terhadap poin kelebihan sebelumnya</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: '(1)' },
      { key: 'B', text: '(2)' },
      { key: 'C', text: '(3)' },
      { key: 'D', text: '(4)' }
    ],
    correctAnswer: 'C',
    explanation: 'Kalimat nomor (3) menggunakan konjungsi antarkalimat pertentangan "Namun" untuk memperhadapkan kelebihan pada kalimat (1) dan (2) dengan tantangan biaya.'
  },
  {
    id: 'PENY-C-IND-10',
    number: 10,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Cambridge Primary/Checkpoint',
    difficulty: 'Menengah',
    questionText: 'Bacalah artikel ilmiah populer: "Kecerdasan buatan bukanlah pengganti mutlak daya cipta manusia, melainkan alat pengungkit potensi intelegensi." Makna kata "daya cipta" pada kalimat di atas bersinonim dengan ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Cambridge · Kosakata Kontekstual', 'Sinonim "Daya Cipta"', '#0D9488',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#CCFBF1" stroke="#0D9488" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">💡 🎨 🧠</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Daya cipta = Kreativitas / Daya imajinasi orisinal</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Kreativitas' },
      { key: 'B', text: 'Kecepatan fisik' },
      { key: 'C', text: 'Ketaatan aturan' },
      { key: 'D', text: 'Ketahanan lelah' }
    ],
    correctAnswer: 'A',
    explanation: '"Daya cipta" adalah kemampuan orisinal manusia untuk menghasilkan karya atau ide baru yang kreatif (kreativitas).'
  },

  // --- SINGAPORE SECONDARY (Soal 11 - 15) ---
  {
    id: 'PENY-C-IND-11',
    number: 11,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Identifikasilah kalimat majemuk bertingkat yang menyatakan hubungan KONSESIF (keadaan berlawanan yang tidak menggagalkan hasil):',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Sintaksis Kompleks', 'Anak Kalimat Konsesif', '#6366F1',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EEF2FF" stroke="#6366F1" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#4338CA" text-anchor="middle">Konjungsi konsesif: "meskipun", "walaupun", "kendati"</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#312E81" text-anchor="middle">Meskipun hujan deras, upacara bendera tetap berlangsung khidmat</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Meskipun diguyur hujan gerimis, para peserta olimpiade tetap berbaris dengan tertib dan bersemangat.' },
      { key: 'B', text: 'Jika kamu belajar dengan tekun, prestasimu akan meningkat pesat.' },
      { key: 'C', text: 'Adik membersihkan kamar tidur ketika ibu memasak di dapur.' },
      { key: 'D', text: 'Ia tidak hadir di sekolah karena demam tinggi.' }
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat A menggunakan konjungsi konsesif "Meskipun" yang menyatakan kondisi rintangan (hujan) yang tidak menghalangi terlaksananya kegiatan secara tertib.'
  },
  {
    id: 'PENY-C-IND-12',
    number: 12,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Perhatikan peribahasa: "Orang yang ilmunya masih dangkal namun bicaranya sangat banyak dan congkak di depan umum" selaras dengan peribahasa Nusantara ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Peribahasa Nusantara', 'Makna Peribahasa "Tong Kosong"', '#B45309',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🥁 🗣️ 💭</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">"Tong kosong berbunyi nyaring"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Air beriak tanda tak dalam / Tong kosong nyaring bunyinya' },
      { key: 'B', text: 'Air tenang menghanyutkan' },
      { key: 'C', text: 'Pucuk dicinta ulam tiba' },
      { key: 'D', text: 'Ada udang di balik batu' }
    ],
    correctAnswer: 'A',
    explanation: '"Tong kosong nyaring bunyinya" atau "Air beriak tanda tak dalam" bermakna orang yang sedikit ilmunya biasanya paling banyak membual dan bersuara sombong.'
  },
  {
    id: 'PENY-C-IND-13',
    number: 13,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Pilihlah pembentukan kata berimbuhan konfiks "memper-...-kan" yang memiliki makna kausatif (menjadikan sesuatu sebagai bahan perbincangan/pertimbangan) yang baku:',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Morfologi Kata', 'Bentuk Baku Konfiks memper-...-kan', '#9333EA',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FAF5FF" stroke="#9333EA" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#6B21A8" text-anchor="middle">memper- + debat + -kan ➔ memperdebatkan</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#7E22CE" text-anchor="middle">Baku tanpa redundansi imbuhan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'memperdebatkan' },
      { key: 'B', text: 'memperdebat' },
      { key: 'C', text: 'mendebatkan-kan' },
      { key: 'D', text: 'terdebatkan' }
    ],
    correctAnswer: 'A',
    explanation: '"Memperdebatkan" adalah bentuk konfiks baku yang berarti menjadikan suatu hal sebagai bahan perdebatan atau diskusi.'
  },
  {
    id: 'PENY-C-IND-14',
    number: 14,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Suntinglah kalimat yang mengalami kerancuan nalar (kontaminasi struktur) berikut:\n"Bagi seluruh peserta lomba yang ingin mendaftar dipersilakan mengisi formulir di loket."',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Suntingan Kalimat', 'Menghilangkan Kerancuan Subjek', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#ECFDF5" stroke="#059669" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#065F46" text-anchor="middle">Kesalahan: Preposisi "Bagi" di awal mengaburkan Subjek</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Koreksi: Hilangkan "Bagi" agar subjek jelas</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Seluruh peserta lomba yang ingin mendaftar dipersilakan mengisi formulir di loket.' },
      { key: 'B', text: 'Kepada seluruh peserta yang mendaftar mengisi loket.' },
      { key: 'C', text: 'Bagi seluruhnya yang ingin daftar isi formulir loket.' },
      { key: 'D', text: 'Untuk peserta dipersilakan mengisi formulir di loket bagi pendaftaran.' }
    ],
    correctAnswer: 'A',
    explanation: 'Menghilangkan preposisi "Bagi" di awal kalimat memulihkan fungsi "Seluruh peserta lomba" sebagai Subjek yang jelas bagi predikat "dipersilakan".'
  },
  {
    id: 'PENY-C-IND-15',
    number: 15,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'Singapore Curriculum',
    difficulty: 'Menengah',
    questionText: 'Konjungsi antarkalimat yang paling tepat untuk menyatakan kesimpulan akhir dari paparan beberapa bukti sebelumnya adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('Singapore · Wacana & Koherensi', 'Konjungsi Penarik Kesimpulan', '#2563EB',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">Bukti A + Bukti B ➔ Kesimpulan Akhir</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#3B82F6" text-anchor="middle">Konjungsi: "Dengan demikian,", "Oleh karena itu,"</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Bahkan,' },
      { key: 'B', text: 'Dengan demikian,' },
      { key: 'C', text: 'Meskipun begitu,' },
      { key: 'D', text: 'Sebaliknya,' }
    ],
    correctAnswer: 'B',
    explanation: '"Dengan demikian," adalah konjungsi antarkalimat yang menyatakan konsekuensi logis atau kesimpulan dari beberapa premis sebelumnya.'
  },

  // --- INTERNATIONAL BACCALAUREATE (IB MYP) (Soal 16 - 20) ---
  {
    id: 'PENY-C-IND-16',
    number: 16,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Analisis Teks Multimodal: Cermatilah diagram transisi energi bersih. Mengapa pembuat infografis membandingkan emisi karbon per kapita antara kendaraan listrik dan kendaraan berbahan bakar bensin fosil?',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Teks Multimodal', 'Analisis Visual Emisi Karbon Kendaraan', '#059669',
        `<g transform="translate(60, 15)">
          <rect x="20" y="15" width="240" height="75" rx="12" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
          <text x="140" y="40" font-size="20" text-anchor="middle">⚡🚗 ↔ ⛽🚙</text>
          <text x="140" y="62" font-size="10" font-weight="900" fill="#065F46" text-anchor="middle">PERBANDINGAN JEJAK EMISI KARBON</text>
          <text x="140" y="78" font-size="9" font-weight="bold" fill="#047857" text-anchor="middle">Persuasi berbasis data ilmiah transisi energi</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Mengharuskan semua orang segera menjual rumahnya' },
      { key: 'B', text: 'Meyakinkan publik secara empiris bahwa beralih ke elektrifikasi transportasi dapat mereduksi emisi karbon secara signifikan' },
      { key: 'C', text: 'Menyembunyikan data harga baterai lithium' },
      { key: 'D', text: 'Memuji pabrik mobil bensin konvensional' }
    ],
    correctAnswer: 'B',
    explanation: 'Perbandingan visual emisi karbon berfungsi sebagai persuasi berbasis data empiris untuk membuktikan efektivitas kendaraan listrik dalam menekan emisi gas rumah kaca.'
  },
  {
    id: 'PENY-C-IND-17',
    number: 17,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Bacalah naskah drama satu babak: "Pak Lurah: \'Membangun saluran irigasi ini bukan sekadar mengalirkan air ke sawah Pak Joyo, tapi memastikan tidak ada anak di desa kita yang kelaparan karena gagal panen.\' (tatapannya hangat menyapu seluruh warga)." Nilai kemanusiaan yang menonjol dari dialog Pak Lurah adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Apresiasi Drama Realis', 'Nilai Empati & Kepemimpinan Sosial', '#B45309',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">🌾 🤝 🍲</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">Kepemimpinan berempati demi ketahanan pangan bersama</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Ambisi politik pribadi untuk dipuji atasan' },
      { key: 'B', text: 'Empati sosial yang mendalam dan tanggung jawab moral terhadap kesejahteraan bersama' },
      { key: 'C', text: 'Kekikiran dalam membagi sumber daya air' },
      { key: 'D', text: 'Kecurigaan antartetangga' }
    ],
    correctAnswer: 'B',
    explanation: 'Dialog Pak Lurah menunjukkan empati sosial dan komitmen kepemimpinan untuk menjamin kedaulatan pangan dan keselamatan hidup seluruh warganya.'
  },
  {
    id: 'PENY-C-IND-18',
    number: 18,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Membaca Kritis Sastra: Ketika seorang pengarang novel mengangkat tokoh dari suku terpencil dengan perspektif orang dalam yang menghargai kearifan lokal tanpa prasangka eksotis, pengarang tersebut berupaya untuk ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Perspektif Sastra', 'Dekonstruksi Prasangka & Stereotipe', '#DB2777',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FDF2F8" stroke="#DB2777" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">📖 🌏 🌿</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#9D174D" text-anchor="middle">Menghadirkan suara autentik dan meruntuhkan prasangka</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Memperkuat stereotipe negatif yang merendahkan' },
      { key: 'B', text: 'Mendekonstruksi stereotipe dan menghargai martabat martabat kebudayaan lokal secara autentik' },
      { key: 'C', text: 'Menjadikan tradisi adat sebagai bahan lelucon belaka' },
      { key: 'D', text: 'Menolak modernisasi teknologi' }
    ],
    correctAnswer: 'B',
    explanation: 'Penggambaran yang autentik dan berkeadilan mendekonstruksi stereotipe sempit serta menghargai kearifan lokal sebagai bagian kekayaan peradaban manusia.'
  },
  {
    id: 'PENY-C-IND-19',
    number: 19,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Etika Berpendapat Digital: Ketika mengemukakan ketidaksetujuan terhadap sebuah artikel opini di forum publik, kaidah etika akademis yang wajib diterapkan adalah ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Komunikasi Beretika', 'Diskusi Publik Santun & Berbasis Fakta', '#2563EB',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
          <text x="140" y="45" font-size="20" text-anchor="middle">⚖️ 💬 💡</text>
          <text x="140" y="68" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">Mengkritisi substansi argumen, bukan menyerang pribadi (ad hominem)</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Menyerang latar belakang suku dan keluarga penulis secara pribadi' },
      { key: 'B', text: 'Menyampaikan sanggahan yang terfokus pada substansi gagasan dengan menyertakan rujukan bukti ilmiah yang sahih' },
      { key: 'C', text: 'Menggunakan kata-kata kasar dan ancaman di media sosial' },
      { key: 'D', text: 'Membuat akun anonim untuk menyebarkan fitnah' }
    ],
    correctAnswer: 'B',
    explanation: 'Etika dialektika ilmiah menuntut agar kritik ditujukan kepada substansi premis argumen dengan bukti sahih, tanpa melakukan serangan personal (ad hominem).'
  },
  {
    id: 'PENY-C-IND-20',
    number: 20,
    category: 'Kategori C',
    subject: 'Bahasa Indonesia',
    level: 'SMP/MTs',
    stage: 'penyisihan',
    curriculum: 'International Baccalaureate (IB)',
    difficulty: 'Menengah',
    questionText: 'Evaluasi Retorika & Bias Teks: Seorang penulis editorial hanya menampilkan data keuntungan industri tambang tanpa sedikit pun menyebutkan dampak pencemaran air sungai bagi penduduk setempat. Teks tersebut mengindikasikan adanya ...',
    ...(() => {
      const { svg, dataUri } = createPenyisihanSvg('IB · Evaluasi Bias Media', 'Deteksi Bias Konfirmasi & Seleksi Data', '#EA580C',
        `<g transform="translate(60, 15)">
          <rect x="20" y="20" width="240" height="65" rx="10" fill="#FFF7ED" stroke="#EA580C" stroke-width="1.5"/>
          <text x="140" y="42" font-size="11" font-weight="bold" fill="#C2410C" text-anchor="middle">Penyajian informasi sepihak (Cherry-picking)</text>
          <text x="140" y="65" font-size="11" font-weight="bold" fill="#9A3412" text-anchor="middle">Bias kepentingan yang mengabaikan dampak lingkungan</text>
        </g>`);
      return { imageSvg: svg, imageUrl: dataUri };
    })(),
    options: [
      { key: 'A', text: 'Objektivitas mutlak tanpa cela' },
      { key: 'B', text: 'Bias pemilihan data (cherry-picking) yang mengabaikan dampak negatif demi kepentingan tertentu' },
      { key: 'C', text: 'Riset menyeluruh yang memuat semua sudut pandang' },
      { key: 'D', text: 'Teks netral ilmiah' }
    ],
    correctAnswer: 'B',
    explanation: 'Menyajikan data keuntungan sembari menyembunyikan dampak pencemaran merupakan bentuk bias pemilihan data (cherry-picking) yang tidak seimbang.'
  }
];
