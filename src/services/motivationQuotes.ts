export interface ExamMotivation {
  id: number;
  emoji: string;
  badge: string;
  headline: string;
  quote: string;
  subQuote: string;
  bgGradient: string;
  accentColor: string;
  borderAccent: string;
}

export const EXAM_MOTIVATIONAL_QUOTES: ExamMotivation[] = [
  {
    id: 1,
    emoji: "🌟🚀",
    badge: "Pejuang Tangguh & Bintang Masa Depan",
    headline: "Langkah Besar Telah Kamu Mulai!",
    quote: "“Perjalanan seribu mil dimulai dengan satu langkah keberanian. Hari ini kamu membuktikan diri berani berkompetisi dan memberikan usaha terbaikmu!”",
    subQuote: "Setiap tetes kerja keras dan ketekunanmu dalam belajar tidak akan pernah sia-sia. Jadikan momen ini pijakan menuju masa depan cemerlang!",
    bgGradient: "from-amber-500/10 via-amber-400/5 to-yellow-500/10",
    accentColor: "text-amber-700",
    borderAccent: "border-amber-300"
  },
  {
    id: 2,
    emoji: "🔥🏆",
    badge: "Mental Juara Sejati",
    headline: "Kamu Luar Biasa Hari Ini!",
    quote: "“Juara sejati tidak hanya ditentukan oleh angka di selembar kertas, tetapi oleh keteguhan hati dan dedikasi untuk terus berjuang tanpa pantang menyerah.”",
    subQuote: "Bangkit, belajar, dan berkembang! Apa yang kamu kerjakan hari ini adalah bukti dedikasi luar biasa untuk orang tua dan gurumu tercinta.",
    bgGradient: "from-emerald-500/10 via-teal-400/5 to-cyan-500/10",
    accentColor: "text-emerald-700",
    borderAccent: "border-emerald-300"
  },
  {
    id: 3,
    emoji: "💎✨",
    badge: "Kilau Bakat Nusantara",
    headline: "Bakat Emasmu Sedang Terus Terasah!",
    quote: "“Intan dan berlian menjadi berkilau karena melalui proses penempaan dan tekanan yang luar biasa. Begitu pula akal dan potensimu!”",
    subQuote: "Kamu telah menyelesaikan ujian ini dengan penuh kejujuran dan kegigihan. Banggalah atas proses dan pencapaian hebatmu hari ini!",
    bgGradient: "from-blue-500/10 via-indigo-400/5 to-violet-500/10",
    accentColor: "text-blue-700",
    borderAccent: "border-blue-300"
  },
  {
    id: 4,
    emoji: "🦅🌈",
    badge: "Terbang Tinggi Meraih Mimpi",
    headline: "Langit Adalah Batas Potensimu!",
    quote: "“Kepakkan sayap pengetahuanmu setinggi mungkin! Tak ada impian yang terlalu tinggi bagi mereka yang berani melangkah dan percaya pada kekuatan diri sendiri.”",
    subQuote: "Setiap soal yang kamu kerjakan hari ini telah mengasah logika dan kecerdasanmu untuk terbang lebih tinggi di ajang kompetisi nasional.",
    bgGradient: "from-sky-500/10 via-amber-400/5 to-orange-500/10",
    accentColor: "text-sky-700",
    borderAccent: "border-sky-300"
  },
  {
    id: 5,
    emoji: "🌱🌳",
    badge: "Tumbuh Kuat Berakar Kokoh",
    headline: "Benih Prestasi Telah Bersemi!",
    quote: "“Pohon yang tinggi bermula dari benih kecil yang dirawat dengan sabar. Usahamu hari ini adalah pupuk terbaik bagi kesuksesanmu esok hari.”",
    subQuote: "Teruslah bertumbuh menjadi kebanggaan keluarga dan bangsa. Prestasi besar selalu diawali dengan komitmen kecil yang dilakukan secara istiqomah.",
    bgGradient: "from-green-500/10 via-emerald-400/5 to-lime-500/10",
    accentColor: "text-green-700",
    borderAccent: "border-green-300"
  },
  {
    id: 6,
    emoji: "💡🎯",
    badge: "Fokus & Visi Masa Depan",
    headline: "Fokusmu Membuka Gerbang Kejayaan!",
    quote: "“Ketekunan dan konsentrasi mengalahkan kepintaran yang malas. Kamu telah membuktikan ketajaman pikiran dan daya juang yang mengagumkan!”",
    subQuote: "Kemenangan bukan sekadar garis akhir, melainkan perjalanan berani untuk terus menaklukkan tantangan demi tantangan baru.",
    bgGradient: "from-purple-500/10 via-fuchsia-400/5 to-pink-500/10",
    accentColor: "text-purple-700",
    borderAccent: "border-purple-300"
  },
  {
    id: 7,
    emoji: "⚡🏅",
    badge: "Energi Positif & Pemenang",
    headline: "Energi Keberanian Mengalir Dalam Dirimu!",
    quote: "“Orang yang sukses tidak pernah berhenti belajar. Apapun tantangannya, kamu selalu memiliki kekuatan untuk menuntaskannya dengan kepala tegak.”",
    subQuote: "Terima kasih telah berkompetisi secara sportif dan penuh semangat. Bangsa ini menanti karya-karya dan torehan prestasi terbesarmu!",
    bgGradient: "from-rose-500/10 via-amber-400/5 to-orange-500/10",
    accentColor: "text-rose-700",
    borderAccent: "border-rose-300"
  },
  {
    id: 8,
    emoji: "🌌🪐",
    badge: "Penjelajah Cakrawala Sains",
    headline: "Jelajahi Semesta Ilmu Pengetahuan!",
    quote: "“Dunia ini begitu luas dan penuh keajaiban ilmu. Dengan rasa ingin tahu dan keberanianmu, engkau mampu membuka setiap rahasia kecerdasan semesta!”",
    subQuote: "Hari ini engkau telah mengukir catatan sejarah dalam perjalanan belajarmu. Tetaplah rendah hati dan teruslah melangkah maju!",
    bgGradient: "from-indigo-500/10 via-blue-400/5 to-cyan-500/10",
    accentColor: "text-indigo-700",
    borderAccent: "border-indigo-300"
  }
];

export const getRandomMotivation = (previousId?: number): ExamMotivation => {
  const available = previousId 
    ? EXAM_MOTIVATIONAL_QUOTES.filter(m => m.id !== previousId)
    : EXAM_MOTIVATIONAL_QUOTES;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex] || EXAM_MOTIVATIONAL_QUOTES[0];
};
