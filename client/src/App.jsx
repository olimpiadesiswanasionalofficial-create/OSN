import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  HelpCircle,
  Laptop,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
  ArrowRight,
  ExternalLink,
  Flame,
  Clock,
  FileCheck
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';

// Safe Image component with automatic Unsplash fallback
const FALLBACK_HERO = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop";

export const ImageWithFallback = ({ src, alt, fallbackSrc = FALLBACK_HERO, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

// High Contrast Luxury Logo Component
export const BrandLogo = ({ isLight = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#26201E] via-[#1A1615] to-[#0D0B0A] border border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(212,175,55,0.25)]">
        <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.35),transparent_70%)]" />
        <svg viewBox="0 0 24 24" className="w-6 h-6 relative z-10 text-[#D4AF37] fill-none stroke-current" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          <circle cx="12" cy="12" r="3" className="fill-[#D4AF37]/20 stroke-[#D4AF37]" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`text-base sm:text-lg font-extrabold tracking-wider leading-none ${isLight ? 'text-white' : 'text-[#1A1615]'}`}>
            OLIMPIADE SISWA
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded font-bold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1A1615]">
            NASIONAL
          </span>
        </div>
        <span className={`text-[10px] font-semibold tracking-widest uppercase mt-0.5 ${isLight ? 'text-neutral-400' : 'text-[#756F68]'}`}>
          Portal Resmi Kompetisi Indonesia
        </span>
      </div>
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);

  // AI Chat & Counselor Drawer State
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: `Halo! Saya adalah Konsultan Akademik Senior resmi ${APP_CONFIG.brandName}. Tagline kami adalah "${APP_CONFIG.tagline}". Apakah Anda memerlukan rekomendasi bidang olimpiade yang tepat untuk jenjang Anda, atau ingin bertanya seputar materi dan pengakuan sertifikat?`,
      recommendedProduct: null
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiStudentLevel, setAiStudentLevel] = useState('SMP/MTs');
  const [aiLoading, setAiLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Registration Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    level: 'SMP/MTs',
    schoolName: '',
    cityProvince: '',
    whatsapp: '',
    email: '',
    productId: APP_CONFIG.products[0]?.id || '',
  });

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, aiLoading]);

  // Filter products based on category tab
  const filteredProducts = selectedCategory === 'Semua'
    ? APP_CONFIG.products
    : APP_CONFIG.products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.name.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleOpenRegistration = (product) => {
    setSelectedProductForModal(product || APP_CONFIG.products[0]);
    if (product) {
      setRegForm(prev => ({ ...prev, productId: product.id }));
    }
    setRegistrationSuccess(false);
    setRegistrationModalOpen(true);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    setRegistrationSuccess(true);
  };

  const generateWhatsAppUrl = (product, form) => {
    const p = product || APP_CONFIG.products.find(item => item.id === form.productId) || APP_CONFIG.products[0];
    const text = `Halo Panitia Resmi ${APP_CONFIG.brandName}, saya ingin melakukan konfirmasi pendaftaran olimpiade online:\n\n` +
      `• Nama Lengkap: ${form.fullName || '-'}\n` +
      `• Jenjang Sekolah: ${form.level || '-'}\n` +
      `• Asal Sekolah: ${form.schoolName || '-'}\n` +
      `• Kota/Provinsi: ${form.cityProvince || '-'}\n` +
      `• Program Dipilih: ${p.name} (${p.priceFormatted})\n` +
      `• No. WhatsApp: ${form.whatsapp || '-'}\n\n` +
      `Mohon dibantu verifikasi akun Computer-Based Test (CBT) dan petunjuk simulasi tryout. Terima kasih!`;
    return `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // AI Recommendation Trigger
  const handleSendAiMessage = async (presetText = null) => {
    const textToSend = presetText || aiInput.trim();
    if (!textToSend || aiLoading) return;

    const newMessages = [...aiMessages, { role: 'user', text: textToSend }];
    setAiMessages(newMessages);
    setAiInput('');
    setAiLoading(true);

    try {
      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          studentLevel: aiStudentLevel,
          interest: textToSend
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: data.reply,
            recommendedProduct: data.recommendedProduct
          }
        ]);
      } else {
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: 'Terima kasih telah bertanya. Kami merekomendasikan Anda untuk langsung berkonsultasi dengan tim panitia via WhatsApp untuk penjelasan detail.',
            recommendedProduct: APP_CONFIG.products[0]
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching AI consultation:', err);
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Halo! Di ${APP_CONFIG.brandName}, kami senantiasa mendukung siswa untuk "${APP_CONFIG.tagline}". Untuk jenjang ${aiStudentLevel}, kompetisi ${APP_CONFIG.products[0].name} adalah opsi terpopuler yang menguji penalaran sains dan logika secara komprehensif.`,
          recommendedProduct: APP_CONFIG.products[0]
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1615]">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1A1615] text-[#D4AF37] text-xs font-medium py-2.5 px-4 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <span className="text-white font-semibold">Pendaftaran Periode Emas 2026 Dibuka:</span>
            <span className="text-[#D4AF37]">Kompetisi Online Serentak di 38 Provinsi</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-300">
            <span className="hidden md:inline">Piagam Resmi Ber-QR Code & Medali Fisik Lapis Emas</span>
            <a
              href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20ingin%20konsultasi%20pendaftaran`}
              target="_blank"
              rel="noreferrer"
              className="text-[#D4AF37] hover:underline font-bold inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> WhatsApp Resmi: {APP_CONFIG.contact.displayPhone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. LUXURY HEADER & NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <BrandLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A453E]">
            <a href="#kategori" className="hover:text-[#1A1615] transition-colors">Kategori Lomba</a>
            <a href="#keunggulan" className="hover:text-[#1A1615] transition-colors">Standar Keunggulan</a>
            <a href="#alur" className="hover:text-[#1A1615] transition-colors">Alur Ujian</a>
            <a href="#galeri" className="hover:text-[#1A1615] transition-colors">Galeri Juara</a>
            <a href="#testimoni" className="hover:text-[#1A1615] transition-colors">Testimoni</a>
            <a href="#faq" className="hover:text-[#1A1615] transition-colors">FAQ</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setAiDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF8F5] border border-[#D4AF37] text-[#1A1615] hover:bg-[#D4AF37]/10 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Konsultasi AI</span>
            </button>
            <button
              onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#26201E] hover:border-[#D4AF37] transition-all shadow-[0_4px_15px_rgba(26,22,21,0.15)]"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#1A1615] hover:bg-[#E8E2D9]/60 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-4 pt-3 pb-6 space-y-3">
            <a
              href="#kategori"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Kategori Lomba
            </a>
            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Standar Keunggulan
            </a>
            <a
              href="#alur"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Alur Ujian
            </a>
            <a
              href="#galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Galeri Juara
            </a>
            <a
              href="#testimoni"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Testimoni
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              FAQ
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAiDrawerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-[#D4AF37] text-[#1A1615]"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Konsultasi AI Penasihat Akademik
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenRegistration(APP_CONFIG.products[0]);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-[#1A1615] text-[#D4AF37] shadow-md"
              >
                Daftar Kompetisi Sekarang
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. ULTRA LUXURY HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E8E2D9]">
        {/* Ambient Subtle Luxury Glow Background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[radial-gradient(circle,rgba(26,22,21,0.04),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Column: Typography & Conversion Core */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Executive Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1615]/5 border border-[#D4AF37]/40 text-xs font-semibold text-[#1A1615]">
                <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{APP_CONFIG.tagline}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1615] leading-[1.15]">
                Kompetisi Sains & Prestasi Terbesar di{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#1A1615] via-[#664C00] to-[#1A1615] bg-clip-text text-transparent">
                    Seluruh Indonesia
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#D4AF37]/20 -rotate-1 -z-0" />
                </span>
              </h1>

              {/* Sub-description */}
              <p className="text-base sm:text-lg text-[#554E46] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {APP_CONFIG.description}. Didukung sistem ujian Computer-Based Test (CBT) mutakhir, sertifikat digital ber-QR Code resmi, serta penganugerahan medali fisik eksklusif bagi pemenang.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all shadow-[0_10px_25px_rgba(26,22,21,0.25)] flex items-center justify-center gap-3 group border border-[#D4AF37]/40"
                >
                  <Award className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                  <span>Daftar Kompetisi Sekarang</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button
                  onClick={() => setAiDrawerOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold bg-white border border-[#D4AF37] text-[#1A1615] hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Konsultasi Bidang Lomba (AI)</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E8E2D9] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#9E7D15]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A1615]">Verifikasi QR Code</p>
                    <p className="text-[11px] text-[#756F68]">Piagam Resmi Diakui</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#9E7D15]">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A1615]">Medali Lapis Emas</p>
                    <p className="text-[11px] text-[#756F68]">Kirim ke 38 Provinsi</p>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#9E7D15]">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A1615]">CBT Modern Stabil</p>
                    <p className="text-[11px] text-[#756F68]">Bisa Laptop/HP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Luxury Image Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Gold Outer Border Frame */}
                <div className="relative rounded-3xl p-2 bg-gradient-to-b from-[#D4AF37] via-[#AA820A] to-[#1A1615] shadow-2xl">
                  <div className="relative rounded-[22px] overflow-hidden bg-[#1A1615] aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5]">
                    <ImageWithFallback
                      src={APP_CONFIG.heroImage}
                      alt="Generasi Juara Olimpiade Siswa Nasional"
                      className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615] via-transparent to-black/30" />

                    {/* Floating Luxury Medal Badge on Image */}
                    <div className="absolute top-4 right-4 bg-[#1A1615]/85 backdrop-blur-md border border-[#D4AF37]/60 rounded-2xl p-3 text-right shadow-xl">
                      <div className="flex items-center gap-1.5 justify-end text-[#D4AF37]">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      </div>
                      <p className="text-xs font-bold text-white mt-1">Akreditasi Standar</p>
                      <p className="text-[10px] text-[#D4AF37]">Tingkat Nasional 2026</p>
                    </div>

                    {/* Bottom Floating Stats Box */}
                    <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-md rounded-2xl p-4 border border-[#D4AF37]/40 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-semibold text-[#756F68] uppercase tracking-wider">Pendaftar Terbuka</p>
                          <p className="text-sm font-bold text-[#1A1615]">SD/MI · SMP/MTs · SMA/MA</p>
                        </div>
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]">
                          Batch 2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. KEY METRICS STATS COUNTER BAR */}
      <section className="bg-[#1A1615] text-white py-12 border-b border-[#2A2321]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {APP_CONFIG.stats.map((stat, idx) => (
              <div key={idx} className={`pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-6' : ''}`}>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#D4AF37] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-white mt-1">{stat.label}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT / CATEGORY COLLECTION (KATEGORI OLIMPIADE) */}
      <section id="kategori" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#9E7D15]">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Program Resmi & Kategori Pilihan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Pilihan Bidang Kompetisi Olimpiade
            </h2>
            <p className="text-base text-[#66615B] leading-relaxed">
              Disusun secara cermat oleh dewan pakar akademik untuk menguji daya nalar, logika, dan keterampilan analisis siswa berprestasi di seluruh penjuru negeri.
            </p>

            {/* Interactive Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {['Semua', 'Sains', 'Informatika', 'Bahasa', 'Masterclass'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37] shadow-md'
                      : 'bg-white text-[#554E46] border border-[#E8E2D9] hover:border-[#D4AF37]/60'
                  }`}
                >
                  {cat === 'Semua' ? 'Semua Kategori' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col"
              >
                {/* Card Image Banner with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <ImageWithFallback
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#1A1615]/90 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/50">
                      {prod.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-[#1A1615]">
                      {prod.level}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-300 line-through mr-2">{prod.originalPrice}</span>
                      <p className="text-2xl font-extrabold text-[#D4AF37] drop-shadow-sm leading-none">
                        {prod.priceFormatted}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-neutral-200">
                      Termasuk Sertifikat & Akses CBT
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-[#9E7D15] uppercase tracking-wider">
                      {prod.category}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A1615] group-hover:text-[#9E7D15] transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-sm text-[#66615B] leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-2 space-y-2">
                      <p className="text-xs font-bold text-[#1A1615] uppercase tracking-wider">Fasilitas Peserta:</p>
                      {prod.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#4A453E]">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => handleOpenRegistration(prod)}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#2A2321] transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Daftar Kategori Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20ingin%20konsultasi%20mengenai%20${encodeURIComponent(prod.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-semibold bg-[#FAF8F5] text-[#1A1615] border border-[#E8E2D9] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tanya Panitia</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. STANDAR KEUNGGULAN (WHY CHOOSE US) */}
      <section id="keunggulan" className="py-20 bg-white border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1615]/5 border border-[#D4AF37]/30 text-xs font-bold text-[#1A1615]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Integritas & Kredibilitas Nasional</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Mengapa Memilih Olimpiade Siswa Nasional?
            </h2>
            <p className="text-base text-[#66615B]">
              Komitmen kami adalah menghadirkan iklim kompetisi yang adil, transparan, berbobot ilmiah tinggi, dan memberikan penghargaan nyata bagi perjuangan setiap peserta.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1A1615] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1615]">Sertifikat Ber-QR Code</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Tiap sertifikat terbit dengan ID registrasi unik serta QR verifikasi online, memudahkan validasi pihak sekolah untuk jalur prestasi SNBP atau PPDB.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1A1615] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1615]">Medali Fisik Lapis Emas</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Medali diproduksi dengan logam kuningan presisi berlapis emas asli (gold plating) lengkap dengan pita satin elegan, dikirim aman ke alamat peserta.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1A1615] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1615]">CBT Modern Anti-Cheat</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Portal ujian online dilengkapi pengacakan bank soal, proteksi tab-switching, dan server berkapasitas tinggi sehingga tidak ada lag saat pengerjaan.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1A1615] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1615]">Lembar Evaluasi Mandiri</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Setiap peserta menerima laporan analisis kelemahan materi & pembahasan komprehensif untuk meningkatkan prestasi belajar di sekolah.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. ALUR UJIAN & KOMPETISI (4 STEPS) */}
      <section id="alur" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-xs font-bold text-[#9E7D15]">
              <Clock className="w-3.5 h-3.5" />
              <span>Prosedur Sederhana & Praktis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              4 Langkah Menuju Panggung Juara
            </h2>
            <p className="text-base text-[#66615B]">
              Ikuti alur kompetisi yang telah terotomatisasi secara profesional dari pendaftaran hingga penganugerahan.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] space-y-3 relative shadow-sm">
              <span className="text-4xl font-black text-[#D4AF37]/30">01</span>
              <h3 className="text-base font-bold text-[#1A1615]">Pendaftaran Online</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Pilih kategori lomba yang sesuai, isi identitas peserta dengan teliti, dan selesaikan pembayaran biaya komitmen secara instan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] space-y-3 relative shadow-sm">
              <span className="text-4xl font-black text-[#D4AF37]/30">02</span>
              <h3 className="text-base font-bold text-[#1A1615]">Akses Akun & Tryout</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Peserta menerima kredensial akun CBT, silabus panduan resmi, serta kesempatan melakukan simulasi tryout gratis untuk adaptasi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] space-y-3 relative shadow-sm">
              <span className="text-4xl font-black text-[#D4AF37]/30">03</span>
              <h3 className="text-base font-bold text-[#1A1615]">Pelaksanaan Ujian</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Kerjakan ujian secara online serentak pada jadwal yang ditentukan dengan pengawasan sistem waktu nyata dari lokasi masing-masing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] space-y-3 relative shadow-sm">
              <span className="text-4xl font-black text-[#D4AF37]/30">04</span>
              <h3 className="text-base font-bold text-[#1A1615]">Pengumuman & Medali</h3>
              <p className="text-xs text-[#66615B] leading-relaxed">
                Pengumuman peringkat nasional diterbitkan transparan. Sertifikat langsung dapat diunduh, dan paket medali fisik dikirim ke rumah.
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
              className="px-8 py-3.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all inline-flex items-center gap-2 border border-[#D4AF37]/40 shadow-md"
            >
              <span>Mulai Pendaftaran Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. VISUAL GALLERY SECTION */}
      <section id="galeri" className="py-20 bg-white border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1615]/5 text-xs font-bold text-[#1A1615]">
              <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Dokumentasi & Prestasi Juara</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Galeri Prestasi Siswa Seluruh Indonesia
            </h2>
            <p className="text-base text-[#66615B]">
              Bukti nyata antusiasme para pembelajar tangguh yang tidak takut bermimpi dan mengukir sejarah prestasi gemilang.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APP_CONFIG.gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border border-[#E8E2D9] shadow-sm hover:shadow-xl transition-all"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615] via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                    {item.subtitle}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section id="testimoni" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-xs font-bold text-[#9E7D15]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span>Apresiasi & Testimoni Nyata</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Apa Kata Kepala Sekolah, Guru & Medalis?
            </h2>
            <p className="text-base text-[#66615B]">
              Kepercayaan ribuan satuan pendidikan membuktikan standar mutu yang kami pegang teguh tanpa kompromi.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {APP_CONFIG.testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-8 rounded-3xl border border-[#E8E2D9] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D9] flex items-center gap-3">
                  <ImageWithFallback
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-[#1A1615]">{t.name}</h3>
                    <p className="text-[11px] text-[#756F68]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1615]/5 text-xs font-bold text-[#1A1615]">
              <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pusat Bantuan & Tanya Jawab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-sm text-[#66615B]">
              Semua hal yang perlu Anda ketahui mengenai kepesertaan, sertifikat, dan legalitas kompetisi.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {APP_CONFIG.faq.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E8E2D9] overflow-hidden bg-[#FAF8F5] transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1A1615]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#554E46] leading-relaxed border-t border-[#E8E2D9]/60 pt-4 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="mt-12 p-6 rounded-3xl bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
            <div>
              <h3 className="text-base font-bold text-white">Masih memiliki pertanyaan khusus?</h3>
              <p className="text-xs text-neutral-300 mt-1">Tim Helpdesk Panitia OSN siap melayani Anda melalui WhatsApp resmi.</p>
            </div>
            <a
              href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20memiliki%20pertanyaan%20khusus`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D4AF37] text-[#1A1615] hover:bg-[#B89628] transition-all shrink-0 inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi CS Panitia</span>
            </a>
          </div>

        </div>
      </section>

      {/* 11. LUXURY CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-br from-[#1A1615] via-[#26201E] to-[#120F0E] text-white border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Waktunya Berprestasi
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            {APP_CONFIG.tagline}
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Jadilah bagian dari puluhan ribu siswa visioner se-Indonesia. Raih sertifikat ber-QR code resmi dan buktikan kemampuan terbaikmu di ajang bergengsi ini!
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#D4AF37] text-[#1A1615] hover:bg-[#F5E296] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.3)] inline-flex items-center justify-center gap-2"
            >
              <span>Daftar Sekarang Juga</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAiDrawerOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Minta Rekomendasi AI</span>
            </button>
          </div>
        </div>
      </section>

      {/* 12. COMPREHENSIVE FOOTER */}
      <footer className="bg-[#120F0E] text-neutral-400 text-xs pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-4">
              <BrandLogo isLight={true} />
              <p className="text-xs text-neutral-400 leading-relaxed pr-6">
                {APP_CONFIG.description}. Platform perlombaan sains, teknologi, matematika, dan literasi yang memupuk sportivitas dan keunggulan akademik bagi generasi muda bangsa.
              </p>
              <div className="pt-2 text-[11px] text-[#D4AF37] font-semibold">
                Slogan Resmi: "{APP_CONFIG.tagline}"
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Navigasi Cepat</p>
              <ul className="space-y-2">
                <li><a href="#kategori" className="hover:text-white transition-colors">Kategori Lomba</a></li>
                <li><a href="#keunggulan" className="hover:text-white transition-colors">Standar Kualitas</a></li>
                <li><a href="#alur" className="hover:text-white transition-colors">Alur Ujian CBT</a></li>
                <li><a href="#galeri" className="hover:text-white transition-colors">Galeri Medalis</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Pusat FAQ</a></li>
              </ul>
            </div>

            {/* Programs List */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Program Pilihan</p>
              <ul className="space-y-2">
                {APP_CONFIG.products.map(p => (
                  <li key={p.id}>
                    <button
                      onClick={() => handleOpenRegistration(p)}
                      className="text-left hover:text-white transition-colors"
                    >
                      {p.name.split('(')[0]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Sekretariat Panitia</p>
              <div className="space-y-2.5 text-[11px]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{APP_CONFIG.contact.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>+{APP_CONFIG.contact.whatsapp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{APP_CONFIG.contact.email}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>© {new Date().getFullYear()} {APP_CONFIG.brandName}. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="flex items-center gap-3">
              <span>Platform Web Resmi Satelitweb</span>
              <span>·</span>
              <span>100% Responsif & Aman</span>
            </p>
          </div>
        </div>
      </footer>

      {/* 13. FLOATING INTERACTIVE AI CONSULTANT BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiDrawerOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1A1615] text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:bg-[#26201E] transition-all duration-300"
          aria-label="Konsultasi AI"
        >
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide hidden sm:inline text-white">Konsultan Akademik AI</span>
        </button>
      </div>

      {/* 14. INTERACTIVE AI COUNSELOR DRAWER / MODAL */}
      {aiDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-l border-[#D4AF37]/40">
            
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 bg-[#1A1615] text-white border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Konsultan Akademik OSN AI
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#1A1615] font-extrabold">Online</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400">Didukung Gemini 3.8 Flash & Pengetahuan Resmi OSN</p>
                </div>
              </div>
              <button
                onClick={() => setAiDrawerOpen(false)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Education Level Selector */}
            <div className="px-4 py-2.5 bg-white border-b border-[#E8E2D9] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#554E46]">Jenjang Anda:</span>
              <div className="flex gap-1.5">
                {['SD/MI', 'SMP/MTs', 'SMA/MA'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setAiStudentLevel(lvl)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                      aiStudentLevel === lvl
                        ? 'bg-[#1A1615] text-[#D4AF37]'
                        : 'bg-[#FAF8F5] text-[#66615B] hover:bg-[#E8E2D9]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1A1615] text-[#D4AF37] rounded-tr-xs'
                        : 'bg-white text-[#1A1615] border border-[#E8E2D9] shadow-xs rounded-tl-xs whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommendation Card attached to AI Assistant message if present */}
                  {msg.recommendedProduct && (
                    <div className="mt-2.5 max-w-[85%] bg-[#1A1615] text-white p-3 rounded-xl border border-[#D4AF37]/50 shadow-md">
                      <div className="flex items-center gap-2 text-[#D4AF37] text-[11px] font-bold uppercase">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>Rekomendasi Terbaik Untuk Anda</span>
                      </div>
                      <p className="text-xs font-bold text-white mt-1">{msg.recommendedProduct.name}</p>
                      <p className="text-[11px] text-neutral-300 mt-0.5">{msg.recommendedProduct.priceFormatted} · {msg.recommendedProduct.level}</p>
                      <button
                        onClick={() => {
                          setAiDrawerOpen(false);
                          handleOpenRegistration(msg.recommendedProduct);
                        }}
                        className="mt-2 w-full py-1.5 rounded-lg text-xs font-bold bg-[#D4AF37] text-[#1A1615] hover:bg-[#F5E296] transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Daftar Kategori Ini</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {aiLoading && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E8E2D9] max-w-[70%]">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.3s]" />
                  <span className="text-xs text-[#756F68] ml-1">Konsultan sedang menganalisis rekomendasi...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Inspiration Prompts */}
            <div className="p-2.5 bg-white/70 border-t border-[#E8E2D9] flex gap-2 overflow-x-auto text-[11px]">
              <button
                onClick={() => handleSendAiMessage(`Rekomendasikan bidang lomba yang cocok untuk siswa ${aiStudentLevel} yang menyukai matematika & sains.`)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#554E46] hover:border-[#D4AF37]"
              >
                💡 Rekomendasi Sains & Matematika
              </button>
              <button
                onClick={() => handleSendAiMessage(`Apakah piagam Olimpiade Siswa Nasional bisa digunakan untuk portofolio SNBP atau PPDB?`)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#554E46] hover:border-[#D4AF37]"
              >
                🎓 Pengakuan Piagam & Sertifikat
              </button>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#E8E2D9]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAiMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ketik pertanyaan atau minat akademik Anda..."
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                />
                <button
                  type="submit"
                  disabled={aiLoading || !aiInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#1A1615] text-[#D4AF37] disabled:opacity-50 hover:bg-[#2A2321] transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* 15. REGISTRATION & CHECKOUT MODAL */}
      {registrationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-xl rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#1A1615] text-white border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">
                  Formulir Pendaftaran Resmi
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Registrasi Olimpiade Siswa Nasional
                </h3>
              </div>
              <button
                onClick={() => setRegistrationModalOpen(false)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {!registrationSuccess ? (
                <form onSubmit={handleRegSubmit} className="space-y-4">
                  {/* Selected Program Notice */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#9E7D15]">Program yang dipilih:</p>
                      <p className="text-xs sm:text-sm font-bold text-[#1A1615]">
                        {selectedProductForModal?.name || 'Kompetisi Sains'}
                      </p>
                    </div>
                    <span className="text-sm font-extrabold text-[#1A1615]">
                      {selectedProductForModal?.priceFormatted || 'Rp 50.000'}
                    </span>
                  </div>

                  {/* Input Fields */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1615] mb-1">Nama Lengkap Siswa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Bintang Pratama"
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1615] mb-1">Jenjang Pendidikan *</label>
                      <select
                        value={regForm.level}
                        onChange={(e) => setRegForm({ ...regForm, level: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                      >
                        <option value="SD/MI">SD / MI (Kelas 3 - 6)</option>
                        <option value="SMP/MTs">SMP / MTs (Kelas 7 - 9)</option>
                        <option value="SMA/MA/SMK">SMA / MA / SMK (Kelas 10 - 12)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1615] mb-1">Asal Sekolah *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: SMPN 1 Surabaya"
                        value={regForm.schoolName}
                        onChange={(e) => setRegForm({ ...regForm, schoolName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1615] mb-1">Kota / Kabupaten & Provinsi *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kota Semarang, Jawa Tengah"
                        value={regForm.cityProvince}
                        onChange={(e) => setRegForm({ ...regForm, cityProvince: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1615] mb-1">No. WhatsApp Siswa / Orang Tua *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={regForm.whatsapp}
                        onChange={(e) => setRegForm({ ...regForm, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1615] mb-1">Alamat Email Aktif *</label>
                    <input
                      type="email"
                      required
                      placeholder="Untuk pengiriman kredensial CBT & E-Sertifikat"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all border border-[#D4AF37]/50 shadow-md flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>Simpan & Lanjutkan Konfirmasi</span>
                    </button>
                    <p className="text-[11px] text-center text-[#756F68] mt-2">
                      Data Anda dijamin aman dan hanya digunakan untuk keperluan resmi {APP_CONFIG.brandName}.
                    </p>
                  </div>
                </form>
              ) : (
                /* Registration Success State */
                <div className="text-center py-4 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                      Registrasi Berhasil Terdata
                    </span>
                    <h3 className="text-xl font-extrabold text-[#1A1615] mt-1">
                      Selamat Bergabung, {regForm.fullName}!
                    </h3>
                    <p className="text-xs text-[#66615B] max-w-md mx-auto mt-2 leading-relaxed">
                      Langkah terakhir untuk mengaktifkan akun CBT dan mengamankan nomor peserta Anda adalah melakukan konfirmasi instan ke panitia resmi.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-left text-xs space-y-1.5">
                    <p className="text-[#1A1615]"><strong>Program:</strong> {selectedProductForModal?.name}</p>
                    <p className="text-[#1A1615]"><strong>Jenjang:</strong> {regForm.level} · {regForm.schoolName}</p>
                    <p className="text-[#1A1615]"><strong>Biaya:</strong> {selectedProductForModal?.priceFormatted}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <a
                      href={generateWhatsAppUrl(selectedProductForModal, regForm)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Konfirmasi via WhatsApp Resmi</span>
                    </a>
                    
                    <button
                      onClick={() => setRegistrationModalOpen(false)}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#66615B] hover:text-[#1A1615]"
                    >
                      Tutup Jendela Ini
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 16. VISUAL LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#D4AF37]"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl bg-black">
              <ImageWithFallback
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-[#1A1615] text-white">
                <p className="text-xs text-[#D4AF37] font-bold">{lightboxImage.subtitle}</p>
                <h3 className="text-base font-bold text-white mt-0.5">{lightboxImage.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
