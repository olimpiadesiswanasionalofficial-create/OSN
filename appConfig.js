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
    { label: "Provinsi Terjangkau", value: "38 Provinsi", target: 38, suffix: " Provinsi", desc: "Dari Sabang sampai Merauke" },
    { label: "Peserta Terdaftar", value: "85.000+", target: 85000, suffix: "+", desc: "PAUD/TK, SD/MI, SMP/MTs" },
    { label: "Medali & Trofi Juara", value: "15.000+", target: 15000, suffix: "+", desc: "Medali Emas, Perak, Perunggu & Piala" },
    { label: "Penyelenggara Resmi", value: "LKP Prestasi", target: 100, suffix: "% Resmi", desc: "Nusantara Terakreditasi Resmi" }
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
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1200&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?q=80&w=1200&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Soal Wawasan Nusantara & Nilai Kebangsaan",
        "Piala Juara Umum Kategori IPS & Medali Emas",
        "Sertifikat Digital Resmi Ber-QR Code",
        "Bisa Mengikuti Bersamaan dengan Mapel Lain",
        "Penyisihan GRATIS & Sertifikat untuk Seluruh Peserta"
      ]
    }
  ],

  // Galeri Dokumentasi Foto Pemenang Nyata (Dari Lampiran Foto Asli User)
  gallery: [
    {
      id: "gal-abizar",
      title: "Abizar Radinka Annail — Juara 1 Matematika",
      studentName: "Abizar Radinka Annail",
      subtitle: "Trofi Juara I, Medali Emas & Sertifikat Resmi LKP",
      caption: "Siswa berprestasi peraih Trofi Juara I Bidang Matematika, lengkap dengan medali emas kejuaraan dan sertifikat ber-QR Code dari LKP Prestasi Nusantara.",
      subject: "Matematika",
      category: "Kategori B (SD/MI)",
      level: "SD/MI",
      rank: "Juara 1",
      badge: "Juara 1 Matematika",
      trophy: "Trofi Bintang Biru Emas Juara I",
      medal: "Medali Emas Lapis Murni",
      image: "/abizar_radinka_annail.svg",
      filename: "WhatsApp Image 2026-08-25 at 2.18.00 PM.jpeg"
    },
    {
      id: "gal-dzaliqa",
      title: "Dzaliqa Assyafa N — Juara 1 Bahasa Indonesia",
      studentName: "Dzaliqa Assyafa N",
      subtitle: "Trofi Sayap Emas, Medali Emas & Piagam Prestasi",
      caption: "Membawa pulang piala kemilau emas Juara I Bidang Bahasa Indonesia Kategori B (7-9 Tahun) dan sertifikat sah berstempel LKP Prestasi Nusantara.",
      subject: "Bahasa Indonesia",
      category: "Kategori B (7-9 Tahun)",
      level: "SD/MI",
      rank: "Juara 1",
      badge: "Juara 1 B. Indonesia",
      trophy: "Piala Mahkota Sayap Emas",
      medal: "Medali Emas Logam Presisi",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-22 at 09.39.21.jpeg"
    },
    {
      id: "gal-kanissa",
      title: "Kanissa Sabila F — Juara 1 Umum Ganda (2 Trofi)",
      studentName: "Kanissa Sabila F",
      subtitle: "Peraih 2 Trofi Juara I Umum Sekaligus & 2 Medali Emas",
      caption: "Prestasi fenomenal membanggakan dengan meraih DUA Piala Besar Juara I Umum sekaligus dan dua medali emas Olimpiade Siswa Nasional.",
      subject: "Matematika & Sains IPA",
      category: "Kategori B (SD/MI)",
      level: "SD/MI",
      rank: "Juara 1 Umum",
      badge: "Juara 1 Umum Ganda",
      trophy: "2 Trofi Besar Mahkota Sayap Emas",
      medal: "2 Medali Emas Kejuaraan",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-22 at 09.39.25.jpeg"
    },
    {
      id: "gal-annora",
      title: "Annora Geraldqueen S.R — Juara 1 Umum IPS",
      studentName: "Annora Geraldqueen S.R",
      subtitle: "Trofi Tinggi Mahkota Bintang Juara I Umum Kategori C",
      caption: "Mengukir prestasi membanggakan Bidang IPS Kategori C (9-12 Tahun) dengan meraih piala tinggi mahkota bintang dan medali emas.",
      subject: "IPS & Wawasan Nusantara",
      category: "Kategori C (9-12 Tahun)",
      level: "SMP/MTs",
      rank: "Juara 1 Umum",
      badge: "Juara 1 Umum IPS",
      trophy: "Trofi Mahkota Bintang Juara 1 Umum",
      medal: "Medali Emas Kejuaraan",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-22 at 09.39.22 (2).jpeg"
    },
    {
      id: "gal-aqilla",
      title: "Aqilla Ifra Mikayla — Juara 1 Umum Bahasa Indonesia",
      studentName: "Aqilla Ifra Mikayla",
      subtitle: "Piala Mahkota Keemasan Juara I Umum Kategori B",
      caption: "Siswi berbakat peraih trofi bergengsi Juara I Umum Bidang Bahasa Indonesia Kategori B (7-9 Tahun), medali emas lapis murni, dan sertifikat resmi.",
      subject: "Bahasa Indonesia",
      category: "Kategori B (7-9 Tahun)",
      level: "SD/MI",
      rank: "Juara 1 Umum",
      badge: "Juara 1 Umum B. Indo",
      trophy: "Piala Mahkota Keemasan",
      medal: "Medali Emas Lapis Murni",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-06-27 at 13.43.35.jpeg"
    },
    {
      id: "gal-bidzar",
      title: "Bidzar Elhan Alfalero — Juara 2 Umum Sains/IPA",
      studentName: "Bidzar Elhan Alfalero",
      subtitle: "Trofi Kejuaraan Juara II Umum Kategori C & Medali Perak",
      caption: "Siswa berprestasi peraih Trofi Juara II Umum Bidang Sains/IPA Kategori C (9-12 Tahun), medali perak, dan piagam resmi LKP Prestasi Nusantara.",
      subject: "Sains / IPA",
      category: "Kategori C (9-12 Tahun)",
      level: "SMP/MTs",
      rank: "Juara 2",
      badge: "Juara 2 Umum Sains",
      trophy: "Piala Kejuaraan Juara II Umum",
      medal: "Medali Perak Berukir",
      image: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-22 at 09.39.22.jpeg"
    },
    {
      id: "gal-faiha",
      title: "Faiha Qiandra Utomo — Juara 1 Matematika",
      studentName: "Faiha Qiandra Utomo",
      subtitle: "Piala Mahkota Sayap Emas Juara I Matematika Kat. B",
      caption: "Meraih Juara I Bidang Matematika Kategori B (7-9 Tahun) dengan penguasaan nalar berhitung unggul, medali emas dan trofi berkilau.",
      subject: "Matematika",
      category: "Kategori B (7-9 Tahun)",
      level: "SD/MI",
      rank: "Juara 1",
      badge: "Juara 1 Matematika",
      trophy: "Piala Mahkota Sayap Emas",
      medal: "Medali Emas Lapis Murni",
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-22 at 09.39.24.jpeg"
    },
    {
      id: "gal-shaquilla",
      title: "Shaquilla Adeeba Balqis — Juara 1 Umum Bahasa Inggris",
      studentName: "Shaquilla Adeeba Balqis",
      subtitle: "Trofi Mahkota Bintang Emas Juara I Umum Kategori B",
      caption: "Membuktikan kecakapan bahasa Inggris tingkat nasional dengan meraih Juara I Umum Kategori B (7-9 Tahun), trofi mahkota dan medali emas.",
      subject: "Bahasa Inggris",
      category: "Kategori B (7-9 Tahun)",
      level: "SD/MI",
      rank: "Juara 1 Umum",
      badge: "Juara 1 Umum B. Inggris",
      trophy: "Piala Mahkota Bintang Emas",
      medal: "Medali Emas Resmi OSN",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-07-06 at 07.55.05.jpeg"
    },
    {
      id: "gal-nararya",
      title: "I Komang Nararya S — Juara 1 Sains/IPA",
      studentName: "I Komang Nararya S",
      subtitle: "Piala Mahkota Sayap Emas Kategori C (9-12 Tahun)",
      caption: "Siswa SMP berprestasi asal Bali peraih Juara I Bidang Sains/IPA Kategori C, trofi sayap emas, medali emas, dan sertifikat resmi QR code.",
      subject: "Sains / IPA",
      category: "Kategori C (9-12 Tahun)",
      level: "SMP/MTs",
      rank: "Juara 1",
      badge: "Juara 1 Sains/IPA",
      trophy: "Piala Mahkota Sayap Emas",
      medal: "Medali Emas Kejuaraan",
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-06-29 at 12.24.51.jpeg"
    },
    {
      id: "gal-amara",
      title: "Amara Qirani Shanum — Juara 1 & 2 Umum Bahasa Indonesia",
      studentName: "Amara Qirani Shanum",
      subtitle: "Piala Mahkota Sayap Emas Kemilau & Piagam Resmi",
      caption: "Mengukir prestasi ganda gemilang di Bidang Bahasa Indonesia Kategori B (7-9 Tahun) dengan trofi mahkota kemilau dan medali resmi.",
      subject: "Bahasa Indonesia",
      category: "Kategori B (7-9 Tahun)",
      level: "SD/MI",
      rank: "Juara 1",
      badge: "Juara 1 & 2 Umum",
      trophy: "Piala Mahkota Sayap Emas Kemilau",
      medal: "Medali Emas & Perak",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-06-29 at 10.32.40.jpeg"
    },
    {
      id: "gal-aulia",
      title: "Aulia Viesta Mahardhika M — Juara 1 Umum Bahasa Inggris",
      studentName: "Aulia Viesta Mahardhika M",
      subtitle: "Trofi Juara I Umum Kategori C (9-12 Tahun) & Medali Emas",
      caption: "Siswi berhijab berprestasi peraih Trofi Juara I Umum Bidang Bahasa Inggris Kategori C, membuktikan kemampuan bahasa internasional berkelas.",
      subject: "Bahasa Inggris",
      category: "Kategori C (9-12 Tahun)",
      level: "SMP/MTs",
      rank: "Juara 1 Umum",
      badge: "Juara 1 Umum B. Inggris",
      trophy: "Trofi Juara I Umum Mahkota Emas",
      medal: "Medali Emas Lapis Kuningan",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-06-27 at 13.43.37.jpeg"
    },
    {
      id: "gal-tiara",
      title: "Tiara Ting — Juara 2 Umum",
      studentName: "Tiara Ting",
      subtitle: "Trofi Juara II Mahkota Sayap & Medali Perak Kejuaraan",
      caption: "Meraih Juara II Umum dalam ajang kompetisi sains dan akademik nasional, piagam resmi QR code, dan trofi kejuaraan.",
      subject: "Sains & Matematika",
      category: "Kategori B (SD/MI)",
      level: "SD/MI",
      rank: "Juara 2",
      badge: "Juara 2 Umum",
      trophy: "Piala Sayap Mahkota Juara II",
      medal: "Medali Perak Berukir",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-22 at 09.39.25 (1).jpeg"
    },
    {
      id: "gal-langit",
      title: "Muhammad Langit D.G — Juara 2 Matematika",
      studentName: "Muhammad Langit D.G",
      subtitle: "Trofi Juara II Sayap Emas & Sertifikat Resmi LKP",
      caption: "Siswa cerdas berbakat peraih Juara II Bidang Matematika dengan medali perak dan sertifikat berstempel resmi penyelenggara.",
      subject: "Matematika",
      category: "Kategori B (SD/MI)",
      level: "SD/MI",
      rank: "Juara 2",
      badge: "Juara 2 Matematika",
      trophy: "Piala Sayap Emas Juara II",
      medal: "Medali Perak Lapis Murni",
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-01 at 09.40.47.jpeg"
    },
    {
      id: "gal-alkeyzar",
      title: "Alkeyzar Putra Aditya — Juara 3 Usia Dini (PAUD/TK)",
      studentName: "Alkeyzar Putra Aditya",
      subtitle: "Piala Mahkota Bintang Perak Juara III Kategori A",
      caption: "Peserta cilik berprestasi usia dini (Kategori A: 4-6 Tahun) peraih Juara III, trofi perak, medali perunggu dan sertifikat kebanggaan orang tua.",
      subject: "Logika & Berhitung Cilik",
      category: "Kategori A (PAUD/TK)",
      level: "PAUD/TK",
      rank: "Juara 3",
      badge: "Juara 3 PAUD/TK",
      trophy: "Piala Mahkota Bintang Perak",
      medal: "Medali Perunggu Kehormatan",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-06-27 at 13.43.32 (1).jpeg"
    },
    {
      id: "gal-lorensia",
      title: "Lorensia Setiawan — Juara 3 Umum Bahasa Indonesia",
      studentName: "Lorensia Setiawan",
      subtitle: "Trofi Mahkota Bintang Perak Juara III Umum Kategori B",
      caption: "Meraih Juara III Umum Bidang Bahasa Indonesia Kategori B (7-9 Tahun) dengan sertifikat terakreditasi resmi dan medali perunggu.",
      subject: "Bahasa Indonesia",
      category: "Kategori B (7-9 Tahun)",
      level: "SD/MI",
      rank: "Juara 3",
      badge: "Juara 3 Umum B. Indo",
      trophy: "Piala Mahkota Bintang Perak",
      medal: "Medali Perunggu Berukir",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-06-27 at 13.43.32.jpeg"
    },
    {
      id: "gal-medali-trofi",
      title: "Penganugerahan Medali Emas & Trofi Prestasi",
      studentName: "Paket Penghargaan Juara",
      subtitle: "Koleksi Piala & Medali Eksklusif untuk Seluruh Juara",
      caption: "Setiap medalis berhak atas paket medali logam kuningan berukir presisi dan piala panggung juara yang dikirim aman ke alamat rumah.",
      subject: "Semua Mata Pelajaran",
      category: "Semua Kategori (A, B, C)",
      level: "Semua Jenjang",
      rank: "Juara 1",
      badge: "Medali & Trofi Resmi",
      trophy: "Paket Trofi Kejuaraan Lengkap",
      medal: "Medali Emas, Perak, Perunggu",
      image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=800&auto=format&fit=crop",
      filename: "WhatsApp Image 2026-08-22 at 09.39.23.jpeg"
    }
  ],

  // Testimoni Nyata Pemenang & Guru
  testimonials: [
    {
      id: "testi-1",
      name: "Bunda dari Aqilla Ifra Mikayla",
      role: "Orang Tua Juara 1 Umum Bahasa Indonesia (Kat. B)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      content: "Alhamdulillah putri kami Aqilla berhasil meraih Juara 1 Umum! Trofi piala dan medalinya sangat bagus dan berkualitas, piagamnya juga lengkap dengan QR code dan stempel LKP Prestasi Nusantara. Sangat memotivasi anak untuk terus berprestasi!"
    },
    {
      id: "testi-2",
      name: "Orang Tua Annora Geraldqueen S.R",
      role: "Orang Tua Juara 1 Bidang IPS (Kat. C)",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
      content: "Pelaksanaan ujian online sangat transparan dan tertib dari rumah. Ujian penyisihannya gratis, pengumuman tepat waktu, dan pialanya datang dengan packing yang sangat aman ke alamat kami. Terima kasih panitia OSN LKP Prestasi Nusantara."
    },
    {
      id: "testi-3",
      name: "Wali dari Dzaliqa Assyafa N",
      role: "Orang Tua Juara 1 Nasional",
      avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=300&auto=format&fit=crop",
      content: "Sertifikat resmi dari LKP Prestasi Nusantara sangat membantu portofolio prestasi sekolah. Anak saya semakin percaya diri setelah membuktikan kemampuannya di tingkat nasional bersama ribuan siswa se-Indonesia."
    }
  ],

  // Tanya Jawab Resmi
  faq: [
    {
      q: "Apakah benar babak penyisihan Olimpiade Siswa Nasional ini GRATIS?",
      a: "Ya, betul sekali! Sesuai komitmen resmi LKP Prestasi Nusantara, babak penyisihan dapat diikuti secara 100% GRATIS (Bebas Biaya Pendaftaran) oleh seluruh siswa di Indonesia tanpa pungutan biaya apapun untuk memberikan kesempatan seluas-luasnya bagi semua generasi bangsa dalam menguji kemampuan akademiknya."
    },
    {
      q: "Bolehkah seorang peserta mengikuti lebih dari satu mata pelajaran?",
      a: "Sangat boleh! Peserta diperbolehkan mendaftar di beberapa mata pelajaran sekaligus (misalnya Matematika, Sains/IPA, Bahasa Inggris, dan Bahasa Indonesia). Sistem CBT kami mendukung pemilihan multi-mapel secara fleksibel."
    },
    {
      q: "Jenjang pendidikan apa saja yang dapat mendaftar?",
      a: "Kompetisi terbuka untuk 3 kategori resmi: Kategori A (PAUD / TK Usia 4-6 Tahun), Kategori B (SD / MI Usia 7-12 Tahun: Kelas 1 s/d 6), dan Kategori C (SMP / MTs Usia 13-15 Tahun: Kelas 7 s/d 9) dari sekolah negeri, swasta, maupun homeschooling di seluruh Indonesia."
    },
    {
      q: "Bagaimana cara pelaksanaan ujian secara online dari rumah?",
      a: "Ujian dilaksanakan menggunakan sistem Computer-Based Test (CBT) resmi responsif yang dapat diakses melalui laptop, komputer, tablet, maupun smartphone Android/iPhone. Peserta cukup memasukkan Nomor WhatsApp terdaftar pada saat jam ujian (tanpa repot mengetik nama). Ujian simulasi latihan dapat dicoba sepuasnya (unlimited)."
    },
    {
      q: "Berapa kuota pengerjaan untuk masing-masing babak ujian?",
      a: "Khusus untuk Ujian Simulasi latihan, peserta diberikan kuota TANPA BATAS (Unlimited) agar dapat berlatih soal bergambar sesering mungkin. Untuk Ujian Babak Penyisihan Resmi dan Babak Final Resmi, kuota pengerjaan adalah tepat 1 kali kesempatan agar hasil murni dan berintegritas tinggi."
    },
    {
      q: "Bagaimana cara penentuan Juara 1, 2, 3 dan Medali di Babak Final?",
      a: "Penetapan Juara 1 (Medali Emas), Juara 2 (Medali Perak), Juara 3 (Medali Perunggu), dan Finalis Nasional ditetapkan secara langsung dan diverifikasi oleh Dewan Juri Panitia Pusat (Admin Resmi). Sistem CBT hanya memberikan rekomendasi nilai, sedangkan keputusan akhir gelar juara disahkan oleh Panitia Pelaksana Pusat demi menjaga objektivitas dan keabsahan kompetisi."
    },
    {
      q: "Apakah sertifikat yang diterbitkan resmi dan ber-QR code?",
      a: "Ya! Setiap sertifikat diterbitkan resmi oleh LKP PRESTASI NUSANTARA dan disahkan oleh Direktur LKP Prestasi Nusantara serta Panitia Pelaksana Pusat. Dilengkapi nomor registrasi digital dan QR Code validasi yang dapat dipindai langsung untuk keperluan pendaftaran jalur prestasi sekolah (PPDB / SNBP)."
    },
    {
      q: "Bagaimana fitur Pratinjau PDF (Print to PDF) pada sertifikat peserta?",
      a: "Peserta dapat melihat pratinjau sertifikat digital secara langsung di dalam browser menggunakan teknologi React-PDF sebelum mengunduhnya. Sertifikat juga dapat langsung dicetak atau disimpan dalam format PDF berkualitas cetak A4 Landscape dengan 3 logo resmi."
    },
    {
      q: "Bagaimana cara pengiriman piala juara, medali, dan piagam fisik?",
      a: "Bagi para pemenang (Juara 1, 2, 3, Juara Umum, dan Medalis), paket piala trofi berlapis emas, medali logam kuningan berukir, dan piagam cetak resmi akan dikemas aman menggunakan bubble wrap tebal lalu dikirimkan langsung ke alamat rumah peserta di 38 provinsi di seluruh Indonesia."
    },
    {
      q: "Apakah pendaftaran mewajibkan verifikasi email dengan OTP?",
      a: "Ya, demi menjaga keamanan data peserta dan mencegah pendaftaran fiktif, setiap peserta/wali murid dapat memverifikasi alamat email aktif menggunakan kode 6 digit OTP (One-Time Password) saat registrasi."
    },
    {
      q: "Kemana saya bisa berkonsultasi atau menghubungi panitia jika ada kendala?",
      a: "Panitia resmi OSN 2026 dapat dihubungi setiap hari kerja melalui WhatsApp Call Center resmi di nomor 0895-4286-87813 atau melalui Konsultan Akademik AI di website ini."
    }
  ]
};
