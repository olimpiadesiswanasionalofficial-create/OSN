/**
 * CONFIGURATION-DRIVEN WHITELABEL SYSTEM
 * Digunakan dinamis oleh Frontend (Client) & Backend (Express/Gemini AI)
 * Disesuaikan penuh dengan Referensi Resmi:
 * - Penyelenggara: LKP PRESTASI NUSANTARA
 * - Platform: OLYMPIADE OSN (OLIMPIADE SISWA NASIONAL) 2026
 * - WhatsApp Resmi: 0895-4286-87813
 * - Tanpa Harga (Penyisihan Gratis & Pendaftaran Terbuka)
 */
export const APP_CONFIG = {
  brandName: "OLIMPIADE SISWA NASIONAL (OSN)",
  platformName: "OLYMPIADE OSN",
  organizer: "LKP PRESTASI NUSANTARA",
  shortName: "OSN 2026",
  businessType: "OLIMPIADE ONLINE TINGKAT NASIONAL",
  tagline: "TANTANG DIRI, RAIH PRESTASI, JADILAH JUARA!",
  subTagline: "Uji Kemampuanmu, Raih Medali dan Jadi Juara Sejati!",
  quote: "Jangan hanya menjadi penonton prestasi, jadilah bagian dari prestasi itu!",
  sloganSecondary: "BERANI MENCOBA UNTUK MASA DEPAN GEMILANG",
  description: "Platform olimpiade online berstandar nasional yang diselenggarakan resmi oleh LKP Prestasi Nusantara untuk menguji dan mengasah potensi siswa dari jenjang PAUD/TK, SD/MI, hingga SMP/MTs di 38 provinsi di seluruh Indonesia secara daring dari rumah.",
  domain: "osn.olympiade.id",
  
  themeColor: {
    primary: "#1A1615",      // Dark Luxury Navy/Charcoal Accent
    secondary: "#0B1736",    // Deep Royal Navy from LKP Prestasi Nusantara
    accent: "#D4AF37",       // Gold Luxury Medal Accent
    accentHover: "#B89628",
    goldBright: "#F5CE42",
    bgLight: "#FAF8F5",      // Clean Warm Ivory
    cardBg: "#FFFFFF",
    darkSurface: "#120F0E"
  },

  contact: {
    whatsapp: "62895428687813",
    displayPhone: "0895-4286-87813",
    email: "olimpiadesiswanasionalofficial@gmail.com",
    address: "LKP PRESTASI NUSANTARA - Gedung Pusat Pendidikan Prestasi, Jakarta & Indonesia",
    instagram: "@olimpiadesiswanasional",
    telegram: "t.me/olimpiadesiswanasional"
  },

  // Timeline Resmi Sesuai Poster
  timeline: [
    {
      step: "01",
      title: "Pendaftaran Dibuka",
      date: "25 Agustus – 11 September 2026",
      desc: "Pendaftaran online mudah & praktis. Terbuka untuk seluruh siswa di Indonesia tanpa kuota zonasi.",
      badge: "Tahap 1",
      status: "Pendaftaran Aktif"
    },
    {
      step: "02",
      title: "Babak Penyisihan",
      date: "12 September 2026",
      desc: "Ujian online aman dari rumah via sistem CBT mutakhir anti-kecurangan. Penyisihan GRATIS untuk semua peserta.",
      badge: "Penyisihan Gratis",
      status: "Ujian Online CBT"
    },
    {
      step: "03",
      title: "Babak Final & Pengumuman",
      date: "19 September 2026",
      desc: "Babak penentuan medalis nasional, penganugerahan trofi piala juara umum, sertifikat ber-QR code, dan kiriman paket medali.",
      badge: "Puncak Juara",
      status: "Penganugerahan Trofi"
    }
  ],

  // Jenjang Pendidikan Sesuai Poster
  educationLevels: [
    {
      id: "paud-tk",
      categoryName: "Kategori A: PAUD / TK",
      ageRange: "Usia 4 – 6 Tahun",
      motto: "Belajar, Bermain, dan Berprestasi!",
      color: "#10B981"
    },
    {
      id: "sd-mi",
      categoryName: "Kategori B: SD / MI",
      ageRange: "Usia 7 – 12 Tahun",
      motto: "Asah Potensi, Raih Prestasi!",
      color: "#3B82F6"
    },
    {
      id: "smp-mts",
      categoryName: "Kategori C: SMP / MTs",
      ageRange: "Usia 13 – 15 Tahun",
      motto: "Tantang Diri, Jadi Juara!",
      color: "#F59E0B"
    }
  ],

  stats: [
    { label: "Provinsi Terjangkau", value: "38 Provinsi", desc: "Dari Sabang sampai Merauke" },
    { label: "Peserta Terdaftar", value: "85.000+", desc: "PAUD/TK, SD/MI, SMP/MTs" },
    { label: "Medali & Trofi Juara", value: "15.000+", desc: "Medali Emas, Perak, Perunggu & Piala" },
    { label: "Penyelenggara Resmi", value: "LKP Prestasi", desc: "Nusantara Terakreditasi Resmi" }
  ],

  // Produk / Mata Pelajaran Olimpiade (TANPA HARGA - PENYISIHAN GRATIS)
  products: [
    {
      id: "osn-matematika",
      name: "Olimpiade Matematika Siswa Indonesia",
      category: "Matematika",
      level: "PAUD/TK, SD/MI, SMP/MTs",
      badge: "Paling Favorit",
      statusTag: "Penyisihan Gratis",
      description: "Ajang kompetisi akademik nasional untuk mengasah logika, keberanian, penalaran berhitung, pemecahan masalah (problem solving), dan prestasi siswa sejak dini.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Penyisihan GRATIS & Bisa Ikut Banyak Mapel",
        "Sertifikat Digital Nasional Ber-QR Code Resmi",
        "Piala / Trofi Juara I, II, III & Juara Umum",
        "Medali Fisik Lapis Emas untuk Medalis",
        "Ujian CBT Online dari Rumah (Praktis & Teruji)"
      ]
    },
    {
      id: "osn-sains-ipa",
      name: "Olimpiade Sains & IPA Siswa Indonesia",
      category: "Sains / IPA",
      level: "PAUD/TK, SD/MI, SMP/MTs",
      badge: "Eksplorasi Sains",
      statusTag: "Penyisihan Gratis",
      description: "Menguji daya nalar sains, fenomena alam sekitar, dasar fisika dan biologi dengan soal-soal penalaran interaktif yang menginspirasi rasa ingin tahu peserta.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Penyisihan GRATIS & Soal Standar Penalaran Ilmiah",
        "Sertifikat Prestasi Ber-QR Code Terindeks",
        "Medali Fisik Presisi & Piagam Penghargaan",
        "Analisis Hasil Ujian & Pembahasan Lengkap",
        "Bisa Dikerjakan Melalui Laptop atau HP Android/iOS"
      ]
    },
    {
      id: "osn-bahasa-indonesia",
      name: "Olimpiade Bahasa Indonesia Siswa Indonesia",
      category: "Bahasa Indonesia",
      level: "PAUD/TK, SD/MI, SMP/MTs",
      badge: "Literasi Bangsa",
      statusTag: "Penyisihan Gratis",
      description: "Ajang kompetisi akademik nasional untuk mengasah literasi, pemahaman bacaan, ejaan dan kosakata, serta kecintaan terhadap bahasa pemersatu bangsa.",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Fokus Literasi Membaca, Memahami, dan Menulis",
        "Sertifikat Nasional Ber-QR Code dari LKP Prestasi Nusantara",
        "Piala Juara I Umum dan Medali Lapis Emas",
        "Diakui untuk Dokumen Jalur Prestasi Sekolah",
        "Penyisihan GRATIS Tanpa Biaya Pendaftaran Awal"
      ]
    },
    {
      id: "osn-bahasa-inggris",
      name: "Olimpiade Bahasa Inggris Siswa Indonesia",
      category: "Bahasa Inggris",
      level: "PAUD/TK, SD/MI, SMP/MTs",
      badge: "Standar Internasional",
      statusTag: "Penyisihan Gratis",
      description: "Mengembangkan kecakapan bahasa global: Vocabulary, Grammar Fun, Reading Comprehension, dan kemampuan komunikasi kritis untuk mencetak generasi kelas dunia.",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Soal Disesuaikan dengan Standar CEFR & Kurikulum Nasional",
        "Sertifikat Digital Nasional Ber-QR Code",
        "Medali Fisik & Piagam Penghargaan Pemenang",
        "Penyisihan Bebas Biaya (Gratis)",
        "Dukungan Sistem CBT Stabil Tanpa Lag"
      ]
    },
    {
      id: "osn-ips-wawasan",
      name: "Olimpiade IPS & Wawasan Nusantara",
      category: "IPS / Sosial",
      level: "SD/MI (Kategori B) & SMP/MTs (Kategori C)",
      badge: "Wawasan Kebangsaan",
      statusTag: "Penyisihan Gratis",
      description: "Meningkatkan wawasan geografi Indonesia, sejarah bangsa, dinamika sosial kemasyarakatan, serta penanaman cinta tanah air sejak bangku sekolah.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Soal Wawasan Nusantara & Nilai Kebangsaan",
        "Piala Juara Umum Kategori IPS & Medali Emas",
        "Sertifikat Digital Resmi Ber-QR Code",
        "Bisa Mengikuti Bersamaan dengan Mapel Lain",
        "Penyisihan GRATIS & Sertifikat untuk Seluruh Peserta"
      ]
    }
  ],

  // Galeri Dokumentasi Foto Pemenang Nyata (Dari Lampiran User)
  gallery: [
    {
      id: "gal-1",
      title: "Dzaliqa Assyafa N — Juara 1 Nasional",
      subtitle: "Peraih Piala Juara 1, Medali Emas & Sertifikat Resmi LKP",
      caption: "Membawa pulang piala kemilau emas, medali fisik, dan sertifikat ber-QR Code resmi penyelenggara LKP Prestasi Nusantara.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      badge: "Juara 1 Nasional"
    },
    {
      id: "gal-2",
      title: "Annora Geraldqueen S.R — Juara 1 Umum",
      subtitle: "Bidang IPS Kategori C (9-12 Tahun)",
      caption: "Mengukir prestasi membanggakan dengan meraih trofi tinggi mahkota bintang Juara I Umum dan medali kejuaraan nasional.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      badge: "Juara 1 Umum IPS"
    },
    {
      id: "gal-3",
      title: "Aqilla Ifra Mikayla — Juara 1 Umum",
      subtitle: "Bidang Bahasa Indonesia Kategori B (7-9 Tahun)",
      caption: "Siswi berbakat peraih trofi bergengsi Juara I Umum, medali emas lapis murni, dan sertifikat sah berstempel LKP Prestasi Nusantara.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
      badge: "Juara 1 Umum B. Indonesia"
    },
    {
      id: "gal-4",
      title: "Penganugerahan Medali Emas & Trofi Prestasi",
      subtitle: "Koleksi Piala & Medali Eksklusif untuk Sang Juara",
      caption: "Setiap medalis berhak atas paket medali logam kuningan berukir presisi dan piala panggung juara yang dikirim aman ke alamat rumah.",
      image: "https://images.unsplash.com/photo-1568792923760-d70635a89fa1?q=80&w=800&auto=format&fit=crop",
      badge: "Medali & Trofi Resmi"
    }
  ],

  // Testimoni Nyata Pemenang & Guru
  testimonials: [
    {
      id: "testi-1",
      name: "Bunda dari Aqilla Ifra Mikayla",
      role: "Orang Tua Juara 1 Umum Bahasa Indonesia (Kat. B)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      content: "Alhamdulillah putri kami Aqilla berhasil meraih Juara 1 Umum! Trofi piala dan medalinya sangat bagus dan berkualitas, piagamnya juga lengkap dengan QR code dan stempel LKP Prestasi Nusantara. Sangat memotivasi anak untuk terus berprestasi!"
    },
    {
      id: "testi-2",
      name: "Orang Tua Annora Geraldqueen S.R",
      role: "Orang Tua Juara 1 Bidang IPS (Kat. C)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      content: "Pelaksanaan ujian online sangat transparan dan tertib dari rumah. Ujian penyisihannya gratis, pengumuman tepat waktu, dan pialanya datang dengan packing yang sangat aman ke alamat kami. Terima kasih panitia OSN LKP Prestasi Nusantara."
    },
    {
      id: "testi-3",
      name: "Wali dari Dzaliqa Assyafa N",
      role: "Orang Tua Juara 1 Nasional",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      content: "Sertifikat resmi dari LKP Prestasi Nusantara sangat membantu portofolio prestasi sekolah. Anak saya semakin percaya diri setelah membuktikan kemampuannya di tingkat nasional bersama ribuan siswa se-Indonesia."
    }
  ],

  // Tanya Jawab Resmi
  faq: [
    {
      q: "Apakah benar babak penyisihan Olimpiade Siswa Nasional ini GRATIS?",
      a: "Ya, betul sekali! Sesuai komitmen LKP Prestasi Nusantara, babak penyisihan dapat diikuti secara GRATIS oleh seluruh siswa di Indonesia untuk memberikan kesempatan seluas-luasnya bagi semua anak dalam menguji kemampuan akademiknya."
    },
    {
      q: "Bolehkah seorang peserta mengikuti lebih dari satu mata pelajaran?",
      a: "Sangat boleh! Peserta diperbolehkan mendaftar di beberapa mata pelajaran sekaligus (misalnya Matematika, Sains/IPA, dan Bahasa Indonesia) selama jadwal sesi pengerjaan ujian CBT tidak bertabrakan."
    },
    {
      q: "Jenjang pendidikan apa saja yang dapat mendaftar?",
      a: "Kompetisi terbuka untuk 3 kategori: Kategori A (PAUD/TK Usia 4-6 Tahun), Kategori B (SD/MI Usia 7-12 Tahun), dan Kategori C (SMP/MTs Usia 13-15 Tahun)."
    },
    {
      q: "Bagaimana cara pelaksanaan ujian secara online dari rumah?",
      a: "Ujian dilaksanakan menggunakan sistem Computer-Based Test (CBT) resmi kami yang dapat diakses melalui laptop, komputer, tablet, maupun smartphone Android/iPhone. Peserta cukup login ke portal ujian pada waktu yang telah dijadwalkan."
    },
    {
      q: "Apakah sertifikat yang diterbitkan resmi dan ber-QR code?",
      a: "Ya! Setiap sertifikat diterbitkan resmi oleh LKP PRESTASI NUSANTARA dan dilengkapi dengan nomor registrasi unik serta QR Code verifikasi keaslian digital yang dapat dipindai langsung untuk keperluan pendaftaran jalur prestasi sekolah (PPDB/SNBP)."
    },
    {
      q: "Bagaimana cara pengiriman piala juara, medali, dan piagam fisik?",
      a: "Bagi para pemenang (Juara 1, 2, 3, Juara Umum, dan Medalis), paket piala trofi berlapis emas, medali logam kuningan berukir, dan piagam cetak resmi akan dikemas aman menggunakan bubble wrap tebal lalu dikirimkan langsung ke alamat rumah peserta di 38 provinsi di seluruh Indonesia."
    },
    {
      q: "Kemana saya bisa menghubungi panitia jika ada kendala?",
      a: "Panitia resmi OSN dapat dihubungi setiap hari kerja melalui WhatsApp Call Center resmi di nomor 0895-4286-87813."
    }
  ]
};
