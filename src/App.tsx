import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Check,
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
  FileCheck,
  User,
  LogIn,
  QrCode,
  Calendar,
  Gift,
  Calculator,
  FlaskConical,
  Globe,
  Database,
  PlusCircle,
  UserPlus
} from 'lucide-react';
import { APP_CONFIG } from '../appConfig.js';
import confetti from 'canvas-confetti';
import { LogoOSN, LogoLKP, StempelLKP } from './components/BrandLogos';
import { AuthModal } from './components/AuthModal';
import { StatsCounterBar } from './components/StatsCounterBar';
import { RecentWinnersMarquee } from './components/RecentWinnersMarquee';
import { GalleryOSN } from './components/GalleryOSN';
import { CompetitionCountdown } from './components/CompetitionCountdown';
import { PublicAnnouncementTable } from './components/PublicAnnouncementTable';
import { NotificationToastContainer, showToast } from './components/NotificationToast';
import { saveParticipant, saveMultipleParticipants, getAllParticipants, syncParticipantsWithServer, ParticipantRecord } from './services/participantDb';
import { syncQuestionsWithServer } from './services/cbtQuestionsDb';
import { getEventSchedule, EventScheduleConfig, DEFAULT_EVENT_SCHEDULE } from './services/eventScheduleDb';
import { getMetaPixelConfig, applyMetaPixel, trackPixelEvent } from './services/metaPixelService';

export interface ChildParticipantForm {
  fullName: string;
  level: string;
  schoolName: string;
  cityProvince: string;
  whatsapp: string;
  email: string;
  parentName: string;
  fullAddress: string;
  subjects: string[];
}

// 4 Official Subjects with multi-select support requested by user
export const SUBJECT_OPTIONS = [
  {
    id: 'bahasa-indonesia',
    name: 'Bahasa Indonesia',
    icon: BookOpen,
    badge: 'Literasi & Kosakata',
    desc: 'Pemahaman teks, tata bahasa, ejaan & kosakata baku'
  },
  {
    id: 'ipa-sains',
    name: 'IPA / Sains',
    icon: FlaskConical,
    badge: 'Sains Alam & IPA',
    desc: 'Konsep dasar sains, fenomena alam, fisika & biologi'
  },
  {
    id: 'matematika',
    name: 'Matematika',
    icon: Calculator,
    badge: 'Logika & Hitung',
    desc: 'Aritmatika, aljabar dasar, geometri & penalaran masalah'
  },
  {
    id: 'bahasa-inggris',
    name: 'Bahasa Inggris',
    icon: Globe,
    badge: 'Komunikasi Global',
    desc: 'Vocabulary, grammar fun, reading & literasi global'
  }
];

// Safe Image component with automatic Unsplash fallback (Indonesian children education theme)
const FALLBACK_HERO = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop";

export const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc = FALLBACK_HERO,
  className,
  ...props
}: {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
  [key: string]: any;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [hasFinalError, setHasFinalError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setHasFinalError(false);
  }, [src]);

  if (hasFinalError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B132B] via-[#1A264D] to-[#0A1024] text-white p-4 ${className || 'w-full h-full'}`}>
        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mb-2">
          <Trophy className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <span className="text-xs font-bold text-[#D4AF37] text-center">{alt || 'Olimpiade Siswa Nasional'}</span>
        <span className="text-[10px] text-neutral-400 mt-0.5">LKP Prestasi Nusantara</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt || 'Foto Pendidikan Anak OSN 2026'}
      referrerPolicy="no-referrer"
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        } else {
          setHasFinalError(true);
        }
      }}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProductForModal, setSelectedProductForModal] = useState<any>(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<any>(null);
  const [activeFaq, setActiveFaq] = useState(0);

  // Auth Modal State (Login User & Admin)
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalDefaultRole, setAuthModalDefaultRole] = useState<'user' | 'admin'>('user');

  // AI Chat & Counselor Drawer State
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: string; text: string; recommendedProduct?: any }>>([
    {
      role: 'assistant',
      text: `Halo! Selamat datang di ${APP_CONFIG.brandName} yang diselenggarakan oleh ${APP_CONFIG.organizer}. Slogan kami: "${APP_CONFIG.tagline}". Babak Penyisihan GRATIS untuk seluruh siswa di Indonesia. Ada yang bisa kami bantu seputar pendaftaran, materi mapel, atau jadwal CBT?`,
      recommendedProduct: null
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiStudentLevel, setAiStudentLevel] = useState('SD / MI (Kategori B)');
  const [aiLoading, setAiLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Registration Form State (NO PRICES, Multi-Subject Support, Multi-Child Support)
  const [childCount, setChildCount] = useState<number>(1);
  const [childrenForms, setChildrenForms] = useState<ChildParticipantForm[]>([
    {
      fullName: '',
      level: 'SD / MI (Kategori B: Usia 7-12 Tahun)',
      schoolName: '',
      cityProvince: '',
      whatsapp: '',
      email: '',
      parentName: '',
      fullAddress: '',
      subjects: ['Matematika']
    }
  ]);
  const [subjectErrors, setSubjectErrors] = useState<{ [index: number]: string }>({});
  const [registeredRecords, setRegisteredRecords] = useState<ParticipantRecord[]>([]);
  const [authStudentInitialData, setAuthStudentInitialData] = useState<{ fullName?: string; whatsapp?: string; autoLogin?: boolean } | null>(null);

  // Dynamic Event Schedule state
  const [liveSchedule, setLiveSchedule] = useState<EventScheduleConfig>(DEFAULT_EVENT_SCHEDULE);
  const [publicParticipants, setPublicParticipants] = useState<ParticipantRecord[]>(() => getAllParticipants());

  useEffect(() => {
    // Secret URL parameter ?admin=true or ?panel=admin
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('panel') === 'admin' || window.location.hash === '#admin-panitia') {
      openLogin('admin');
    }

    // Secret Keyboard Shortcut: Ctrl + Shift + A to open Admin Login safely
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openLogin('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Sync participants & questions database with server on initial load
    syncParticipantsWithServer().then(synced => {
      if (Array.isArray(synced)) {
        setPublicParticipants(synced);
      }
    }).catch(() => {});

    syncQuestionsWithServer().catch(() => {});

    // Periodic Automatic Real-Time Synchronization with hosting server database (every 15 seconds)
    const autoSyncInterval = setInterval(() => {
      syncParticipantsWithServer().then(synced => {
        if (Array.isArray(synced)) {
          setPublicParticipants(synced);
        }
      }).catch(() => {});
      syncQuestionsWithServer().catch(() => {});
    }, 15000);

    setLiveSchedule(getEventSchedule());
    const onScheduleChange = (e: any) => {
      if (e.detail) {
        setLiveSchedule(e.detail);
      }
    };
    window.addEventListener('osn_schedule_updated', onScheduleChange);

    const onParticipantsChange = () => {
      setPublicParticipants(getAllParticipants());
    };
    window.addEventListener('osn_participants_updated', onParticipantsChange);

    // Initialize Meta Pixel from admin config
    const pixelCfg = getMetaPixelConfig();
    applyMetaPixel(pixelCfg);
    const onPixelChange = (e: any) => {
      if (e.detail) {
        applyMetaPixel(e.detail);
      }
    };
    window.addEventListener('osn_pixel_updated', onPixelChange);

    return () => {
      clearInterval(autoSyncInterval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('osn_schedule_updated', onScheduleChange);
      window.removeEventListener('osn_participants_updated', onParticipantsChange);
      window.removeEventListener('osn_pixel_updated', onPixelChange);
    };
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, aiLoading]);


  const openLogin = (role: 'user' | 'admin') => {
    setAuthModalDefaultRole(role);
    setAuthStudentInitialData(null);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openLoginWithRegisteredData = (fullName: string, whatsapp: string) => {
    setAuthStudentInitialData({
      fullName,
      whatsapp,
      autoLogin: true
    });
    setAuthModalDefaultRole('user');
    setAuthModalOpen(true);
    setRegistrationModalOpen(false);
  };

  // Filter products based on category tab
  const filteredProducts = selectedCategory === 'Semua'
    ? APP_CONFIG.products
    : APP_CONFIG.products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.name.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleOpenRegistration = (product?: any) => {
    const p = product || APP_CONFIG.products[0];
    setSelectedProductForModal(p);
    
    // Auto-detect matching subject from clicked product card
    let matchedSubject = 'Matematika';
    if (p) {
      const pName = (p.name || p.category || '').toLowerCase();
      if (pName.includes('indonesia')) matchedSubject = 'Bahasa Indonesia';
      else if (pName.includes('sains') || pName.includes('ipa')) matchedSubject = 'IPA / Sains';
      else if (pName.includes('inggris')) matchedSubject = 'Bahasa Inggris';
      else if (pName.includes('matematika')) matchedSubject = 'Matematika';
    }

    setChildrenForms(prev => {
      const first = prev[0] || {
        fullName: '',
        level: 'SD / MI (Kategori B: Usia 7-12 Tahun)',
        schoolName: '',
        cityProvince: '',
        whatsapp: '',
        email: '',
        parentName: '',
        fullAddress: '',
        subjects: [matchedSubject]
      };
      const currentSubjects = first.subjects.includes(matchedSubject)
        ? first.subjects
        : [...first.subjects, matchedSubject];
      return [{
        ...first,
        subjects: currentSubjects.length > 0 ? currentSubjects : [matchedSubject]
      }];
    });
    setChildCount(1);
    setSubjectErrors({});
    setRegistrationSuccess(false);
    setRegistrationModalOpen(true);
  };

  // Change number of children (1, 2, 3, or more)
  const handleChangeChildCount = (newCount: number) => {
    const count = Math.max(1, Math.min(10, newCount));
    setChildCount(count);
    setChildrenForms(prev => {
      const updated = [...prev];
      const template = prev[0] || {
        fullName: '',
        level: 'SD / MI (Kategori B: Usia 7-12 Tahun)',
        schoolName: '',
        cityProvince: '',
        whatsapp: '',
        email: '',
        parentName: '',
        fullAddress: '',
        subjects: ['Matematika']
      };

      if (count > prev.length) {
        // Automatically prefill shared parent fields (parentName, fullAddress, cityProvince, whatsapp, email)
        for (let i = prev.length; i < count; i++) {
          updated.push({
            fullName: '',
            level: 'SD / MI (Kategori B: Usia 7-12 Tahun)',
            schoolName: template.schoolName || '',
            cityProvince: template.cityProvince || '',
            whatsapp: template.whatsapp || '',
            email: template.email || '',
            parentName: template.parentName || '',
            fullAddress: template.fullAddress || '',
            subjects: template.subjects && template.subjects.length > 0 ? [...template.subjects] : ['Matematika']
          });
        }
      } else if (count < prev.length) {
        return updated.slice(0, count);
      }
      return updated;
    });
  };

  // Update a field for a specific child
  const updateChildField = (index: number, field: keyof ChildParticipantForm, value: any) => {
    setChildrenForms(prev => {
      const updated = [...prev];
      if (updated[index]) {
        const previousVal = updated[index][field];
        updated[index] = { ...updated[index], [field]: value };
        // If parent modifies shared contact / guardian info on child 1, propagate to others if empty or matching previous
        if (['parentName', 'fullAddress', 'whatsapp', 'email', 'cityProvince'].includes(field) && index === 0) {
          for (let i = 1; i < updated.length; i++) {
            if (!updated[i][field] || updated[i][field] === previousVal) {
              updated[i] = { ...updated[i], [field]: value };
            }
          }
        }
      }
      return updated;
    });
  };

  // Toggle selection for multiple subjects for a specific child
  const toggleSubjectForChild = (childIdx: number, subjectName: string) => {
    setChildrenForms(prev => {
      const updated = [...prev];
      const child = updated[childIdx];
      if (!child) return prev;
      const isSelected = child.subjects.includes(subjectName);
      let newSubjects: string[];
      if (isSelected) {
        newSubjects = child.subjects.filter(s => s !== subjectName);
      } else {
        newSubjects = [...child.subjects, subjectName];
      }
      updated[childIdx] = { ...child, subjects: newSubjects };
      return updated;
    });
    setSubjectErrors(prev => ({ ...prev, [childIdx]: '' }));
  };

  // Select all subjects for a specific child
  const handleSelectAllSubjectsForChild = (childIdx: number) => {
    setChildrenForms(prev => {
      const updated = [...prev];
      const child = updated[childIdx];
      if (!child) return prev;
      if (child.subjects.length === SUBJECT_OPTIONS.length) {
        updated[childIdx] = { ...child, subjects: ['Matematika'] };
      } else {
        updated[childIdx] = { ...child, subjects: SUBJECT_OPTIONS.map(s => s.name) };
      }
      return updated;
    });
    setSubjectErrors(prev => ({ ...prev, [childIdx]: '' }));
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate each child has at least 1 subject
    let hasError = false;
    const errors: { [index: number]: string } = {};
    childrenForms.forEach((child, idx) => {
      if (!child.subjects || child.subjects.length === 0) {
        errors[idx] = `Anak ke-${idx + 1} (${child.fullName || 'Siswa'}) wajib memilih minimal 1 mapel.`;
        hasError = true;
      }
    });

    if (hasError) {
      setSubjectErrors(errors);
      return;
    }
    setSubjectErrors({});

    try {
      // Automatically record all children registration into database and system
      const records = await saveMultipleParticipants(childrenForms);
      setRegisteredRecords(records);

      // Track Meta Pixel Conversion Events
      trackPixelEvent('Lead', {
        content_name: 'Pendaftaran OSN 2026',
        num_children: childrenForms.length,
        status: 'registered'
      });
      trackPixelEvent('CompleteRegistration', {
        content_name: 'OSN 2026 Online Registration',
        value: 0.00,
        currency: 'IDR'
      });
    } catch (err) {
      console.error('Error saving participants to database:', err);
    }
    setRegistrationSuccess(true);
    try {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#1A1615', '#10B981', '#3B82F6', '#F59E0B']
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch (confettiErr) {
      console.warn('Confetti animation error:', confettiErr);
    }
  };

  const generateWhatsAppUrlMulti = (children: ChildParticipantForm[]) => {
    let text = `Halo Panitia Resmi ${APP_CONFIG.brandName} (${APP_CONFIG.organizer}), konfirmasi pendaftaran olimpiade online untuk ${children.length} anak:\n\n`;

    if (children[0]?.parentName) {
      text += `• Nama Orang Tua / Wali: ${children[0].parentName}\n`;
    }
    if (children[0]?.fullAddress) {
      text += `• Alamat Lengkap/Domisili: ${children[0].fullAddress}\n\n`;
    }

    children.forEach((child, idx) => {
      const subjectsList = child.subjects && child.subjects.length > 0 ? child.subjects.join(', ') : 'Matematika';
      text += `[ANAK KE-${idx + 1}]\n` +
        `• Nama Lengkap Siswa: ${child.fullName || '-'}\n` +
        `• Kategori Jenjang: ${child.level || '-'}\n` +
        `• Asal Sekolah: ${child.schoolName || '-'}\n` +
        `• Kota/Provinsi: ${child.cityProvince || '-'}\n` +
        `• No. WhatsApp: ${child.whatsapp || '-'}\n` +
        `• Email: ${child.email || '-'}\n` +
        `• Mapel Terpilih (${child.subjects.length} Mapel): ${subjectsList}\n\n`;
    });

    text += `• Biaya Babak Penyisihan: 100% GRATIS (Bebas Biaya Pendaftaran)\n` +
      `• Status Pendaftaran: Otomatis Tercatat Aktif di Database CBT 2026\n\n` +
      `Pendaftaran telah otomatis tersimpan pada database resmi OSN. Peserta/orang tua cukup memasukkan Nomor WhatsApp yang didaftarkan untuk login ke portal ujian CBT (tanpa perlu mengetik nama). Jika 1 nomor mendaftarkan beberapa anak, Anda dapat langsung memilih nama anak di dalam sistem. Terima kasih.`;

    return `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // AI Recommendation Trigger
  const handleSendAiMessage = async (presetText: string | null = null) => {
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
            text: `Terima kasih atas pertanyaannya! Di ${APP_CONFIG.brandName}, Babak Penyisihan dapat diikuti secara GRATIS dan siswa diperbolehkan mengambil lebih dari satu mapel. Anda juga dapat langsung bertanya ke panitia melalui WhatsApp ${APP_CONFIG.contact.displayPhone}.`,
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
          text: `Halo! Sesuai visi ${APP_CONFIG.organizer}, "${APP_CONFIG.tagline}". Untuk tingkat ${aiStudentLevel}, kami merekomendasikan bidang ${APP_CONFIG.products[0].name}. Penyisihan GRATIS dan terbuka untuk seluruh siswa di 38 provinsi!`,
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
      <div className="bg-[#0B132B] text-[#D4AF37] text-xs font-medium py-2 px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <span className="text-white font-semibold">Penyelenggara Resmi: {APP_CONFIG.organizer}</span>
            <span className="hidden md:inline text-neutral-400">|</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
              PENYISIHAN GRATIS
            </span>
            <span className="hidden lg:inline text-neutral-300">Bisa Ikut Banyak Mapel untuk 38 Provinsi</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-200">
            <a
              href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20ingin%20konsultasi%20pendaftaran`}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackPixelEvent('Contact', { content_name: 'WhatsApp Call Center Top Bar' });
                showToast('success', 'Membuka WhatsApp', 'Menghubungkan ke Call Center resmi OSN 2026...');
              }}
              className="text-[#D4AF37] hover:text-[#FFF2B2] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Call Center: {APP_CONFIG.contact.displayPhone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. LUXURY HEADER & NAVBAR WITH OFFICIAL LOGOS & LOGIN ACCESS */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between">
          
          {/* Official Brand Logos: LogoOSN + LogoLKP Organizer */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="#" className="flex items-center">
              <LogoOSN className="w-12 h-12 sm:w-14 sm:h-14" showLabel={true} />
            </a>
            <div className="hidden xl:flex items-center pl-4 border-l border-[#E8E2D9]">
              <LogoLKP className="w-9 h-9" showLabel={true} />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 text-xs xl:text-sm font-semibold text-[#4A453E]">
            <a href="#keunggulan" className="text-amber-800 hover:text-[#1A1615] font-extrabold transition-colors flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Keunggulan</span>
            </a>
            <a href="#jenjang" className="hover:text-[#1A1615] transition-colors">Jenjang Lomba</a>
            <a href="#mapel" className="hover:text-[#1A1615] transition-colors">Mata Pelajaran</a>
            <a href="#jadwal" className="hover:text-[#1A1615] transition-colors">Jadwal & Alur</a>
            <a href="#pengumuman-hasil" className="text-emerald-700 hover:text-emerald-900 font-extrabold transition-colors flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pengumuman Lolos</span>
            </a>
            <a href="#galeri" className="hover:text-[#1A1615] transition-colors">Galeri Juara</a>
            <a href="#penyelenggara" className="hover:text-[#1A1615] transition-colors">Penyelenggara</a>
            <a href="#faq" className="hover:text-[#1A1615] transition-colors">FAQ</a>
          </nav>

          {/* Action Buttons: LOGIN PESERTA, LOGIN ADMIN & DAFTAR */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Tombol Akses Login User */}
            <button
              onClick={() => openLogin('user')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white text-[#1A1615] border border-[#D4AF37] hover:bg-amber-50/70 transition-all shadow-xs cursor-pointer"
              title="Akses Ujian CBT & Kartu Peserta"
            >
              <User className="w-3.5 h-3.5 text-[#9E7D15]" />
              <span>Login Peserta</span>
            </button>

            {/* Tombol Akses Login Admin Panitia */}
            <button
              onClick={() => openLogin('admin')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/60 hover:bg-[#2A2321] transition-all shadow-xs cursor-pointer"
              title="Akses Dashboard Admin & Panitia Pusat"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Login Admin</span>
            </button>

            {/* Tombol Daftar Sekarang */}
            <button
              onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white transition-all shadow-sm cursor-pointer"
            >
              <span>Daftar Gratis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1A1615] hover:bg-[#E8E2D9]/60 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-4 pt-3 pb-6 space-y-3">
            
            {/* Mobile Login Access Direct Row */}
            <div className="pb-2 border-b border-[#E8E2D9] space-y-2">
              <button
                onClick={() => openLogin('user')}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-white text-[#1A1615] border border-[#D4AF37] shadow-sm"
              >
                <User className="w-4 h-4 text-[#9E7D15]" />
                <span>Masuk Ruang Ujian CBT Peserta</span>
              </button>
              <button
                onClick={() => openLogin('admin')}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Masuk Dashboard Admin Panitia</span>
              </button>
            </div>

            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-900 bg-amber-50/80 border border-amber-200"
            >
              ★ Keunggulan & Kredibilitas Resmi OSN
            </a>
            <a
              href="#jenjang"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Jenjang Pendidikan (PAUD, SD, SMP)
            </a>
            <a
              href="#mapel"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Mata Pelajaran (Penyisihan Gratis)
            </a>
            <a
              href="#jadwal"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Jadwal & Alur Kompetisi
            </a>
            <a
              href="#galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Galeri Dokumentasi Juara
            </a>
            <a
              href="#penyelenggara"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Penyelenggara LKP Prestasi Nusantara
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#1A1615] hover:bg-[#E8E2D9]/40"
            >
              Pusat FAQ & Bantuan
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenRegistration(APP_CONFIG.products[0]);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-[#1A1615] text-[#D4AF37] shadow-md border border-[#D4AF37]/50"
              >
                Daftar Kompetisi (Penyisihan Gratis)
              </button>
              <a
                href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20ingin%20konsultasi`}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackPixelEvent('Contact', { content_name: 'WhatsApp Panitia Mobile Header' });
                  showToast('success', 'Membuka WhatsApp', 'Menghubungkan ke WhatsApp Panitia...');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Panitia: {APP_CONFIG.contact.displayPhone}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. ULTRA LUXURY HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8E2D9]">
        {/* Subtle Luxury Background Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[radial-gradient(circle,rgba(11,19,43,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Dual Organizer & Slogan Tag */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B132B] text-white text-[11px] font-bold border border-[#D4AF37]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Penyelenggara: {APP_CONFIG.organizer}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold border border-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>PENYISIHAN GRATIS</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h2 className="text-sm sm:text-base font-bold tracking-widest text-[#9E7D15] uppercase">
                  {APP_CONFIG.tagline}
                </h2>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1A1615] leading-[1.12]">
                  OLIMPIADE SISWA{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1A1615] via-[#855D05] to-[#1A1615]">
                    NASIONAL 2026
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#0B132B]">
                  "{APP_CONFIG.subTagline}"
                </p>
              </div>

              {/* Emotional Quote from Poster */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium italic text-left flex items-start gap-2.5">
                <Trophy className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Kesempatan Emas Untuk Ananda:</strong> "Jangan hanya menjadi penonton prestasi, jadilah bagian dari prestasi itu! {APP_CONFIG.sloganSecondary}."
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#554E46] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {APP_CONFIG.description}
              </p>

              {/* Real-Time Competition Countdown Timer */}
              <div className="w-full pt-1">
                <CompetitionCountdown schedule={liveSchedule} className="w-full shadow-md" />
              </div>

              {/* Main Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all shadow-[0_10px_25px_rgba(26,22,21,0.25)] flex items-center justify-center gap-2.5 group border border-[#D4AF37]/50 cursor-pointer animate-subtle-pulse ring-2 ring-[#D4AF37]/40 hover:ring-[#D4AF37]"
                >
                  <Award className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                  <span>Daftar Sekarang (Penyisihan Gratis)</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button
                  onClick={() => openLogin('user')}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-white border border-[#D4AF37] text-[#1A1615] hover:bg-amber-50/60 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <User className="w-4 h-4 text-[#9E7D15]" />
                  <span>Akses Login Peserta</span>
                </button>

                <a
                  href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20ingin%20konsultasi%20pendaftaran`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>WA: {APP_CONFIG.contact.displayPhone}</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-[#E8E2D9] grid grid-cols-3 gap-3 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#1A1615]">Penyisihan GRATIS</p>
                    <p className="text-[10px] text-[#756F68]">Bisa Ikut Banyak Mapel</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#9E7D15] shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#1A1615]">Piala & Medali Emas</p>
                    <p className="text-[10px] text-[#756F68]">Juara 1, 2, 3 & Umum</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800 shrink-0">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#1A1615]">Online dari Rumah</p>
                    <p className="text-[10px] text-[#756F68]">Laptop atau HP</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Hero Right Column: OFFICIAL LOGOS & CERTIFICATE SHOWCASE */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              
              <div className="relative w-full max-w-md bg-gradient-to-b from-[#0B132B] via-[#141F3D] to-[#0A1024] rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-white overflow-hidden">
                
                {/* Background Stempel Watermark */}
                <div className="absolute -bottom-8 -right-8 opacity-15 pointer-events-none">
                  <StempelLKP className="w-48 h-48" isRotated={false} />
                </div>

                {/* Card Top: Logos */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <LogoOSN className="w-14 h-14" />
                  <div className="text-right">
                    <span className="text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase block">
                      PENYELENGGARA RESMI
                    </span>
                    <span className="text-xs font-extrabold text-white">
                      LKP PRESTASI NUSANTARA
                    </span>
                  </div>
                  <LogoLKP className="w-10 h-10" />
                </div>

                {/* Visual Highlights of Prize Package */}
                <div className="py-5 space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#D4AF37] text-[#1A1615] uppercase tracking-wider">
                      FASILITAS RESMI JUARA
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      Paket Penghargaan Nasional
                    </h3>
                    <p className="text-xs text-neutral-300">
                      Diakui resmi untuk dokumen PPDB & Jalur Prestasi
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#1A1615] font-bold shrink-0">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Sertifikat Nasional Ber-QR Code</p>
                        <p className="text-[11px] text-neutral-300">Dapat dipindai & diverifikasi legalitasnya</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#1A1615] font-bold shrink-0">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Piala Juara I Umum & Medali Emas</p>
                        <p className="text-[11px] text-neutral-300">Logam kuningan lapis emas & piala bertingkat</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Penyisihan Bebas Biaya (GRATIS)</p>
                        <p className="text-[11px] text-neutral-300">Terbuka untuk semua jenjang pendidikan</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card Bottom CTA */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Pendaftaran 2026 Aktif</span>
                  </div>
                  <button
                    onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#D4AF37] text-[#1A1615] hover:bg-[#FFF2B2] transition-colors"
                  >
                    Daftar Sekarang
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. STATS COUNTER BAR (INTERSECTION-OBSERVER ANIMATED) */}
      <StatsCounterBar stats={APP_CONFIG.stats as any} />

      {/* 4.5. KEUNGGULAN UTAMA & NILAI TAMBAH RESMI OSN 2026 */}
      <section id="keunggulan" className="py-20 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
        {/* Subtle Decorative Background Accents */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-black uppercase tracking-wider shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Keunggulan Kompetitif & Nilai Tambah Resmi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1615] tracking-tight leading-tight">
              Mengapa Mengikuti{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9E7D15] via-[#D4AF37] to-[#855D05]">
                Olimpiade Siswa Nasional?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed max-w-2xl mx-auto">
              Bukan sekadar ajang perlombaan biasa. OSN 2026 diselenggarakan dengan standar mutu pendidikan tinggi oleh lembaga resmi terakreditasi, memberikan manfaat nyata untuk masa depan akademik ananda.
            </p>
          </div>

          {/* 6 Grid Keunggulan Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Sertifikat Resmi Ber-QR */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37] hover:border-[#9E7D15] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1615] text-[#D4AF37] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    Verifikasi Instan
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#1A1615] group-hover:text-amber-900 transition-colors">
                    Sertifikat Resmi Ber-QR Code
                  </h3>
                  <p className="text-xs text-[#66615B] mt-2 leading-relaxed">
                    Setiap sertifikat kelulusan dilengkapi kode verifikasi QR-Code nasional yang terhubung langsung ke database resmi. Pihak sekolah, dinas, atau panitia seleksi dapat memindai keabsahannya secara <em>real-time</em> kapan saja.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Terdaftar & Ber-Nomor Registrasi:</span>
                  </div>
                  <p className="text-[10px] text-amber-900 leading-snug">
                    Izin Resmi Kemendikbudristek No. 421.9/234/LKP/2024 · SK Kemenkumham RI
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-extrabold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> E-Sertifikat Cetak A4
                </span>
                <button
                  type="button"
                  onClick={() => openLogin('user')}
                  className="text-xs font-bold text-[#D4AF37] hover:text-[#1A1615] hover:underline cursor-pointer"
                >
                  Cek Contoh Sertifikat &rarr;
                </button>
              </div>
            </div>

            {/* Card 2: Jalur Prestasi Nasional / PPDB */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-500 hover:border-emerald-600 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Jalur Prestasi PPDB
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#1A1615] group-hover:text-emerald-900 transition-colors">
                    Portofolio Jalur Prestasi Nasional
                  </h3>
                  <p className="text-xs text-[#66615B] mt-2 leading-relaxed">
                    Piagam kejuaraan dan sertifikat resmi ini menjadi bukti kompetensi berharga yang diakui sebagai portofolio akademik untuk pendaftaran sekolah negeri impian (SD ke SMP & SMP ke SMA) melalui <strong>Jalur Prestasi PPDB</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-[11px]">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Lembaga Akreditasi BAN PAUD PNF:</span>
                  </div>
                  <p className="text-[10px] text-emerald-900 leading-snug">
                    Diterbitkan oleh LKP Prestasi Nusantara dengan tanda tangan Ketua & NIP Resmi.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-extrabold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Nilai Tambah PPDB Unggulan
                </span>
                <span className="text-[11px] font-semibold text-neutral-500">PAUD, SD, SMP</span>
              </div>
            </div>

            {/* Card 3: Babak Penyisihan 100% Bebas Biaya */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D9] hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#855D05] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6 text-[#9E7D15]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    100% Bebas Biaya
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#1A1615]">
                    Penyisihan Bebas Biaya (GRATIS)
                  </h3>
                  <p className="text-xs text-[#66615B] mt-2 leading-relaxed">
                    Kami meyakini setiap anak berhak mendapatkan panggung prestasi tanpa hambatan finansial. Babak penyisihan 100% bebas biaya dan peserta diperbolehkan memilih lebih dari 1 mata pelajaran sekaligus.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1A1615] text-[11px]">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tanpa Kuota Zonasi Sekolah:</span>
                  </div>
                  <p className="text-[10px] text-[#756F68] leading-snug">
                    Terbuka untuk sekolah negeri, swasta, madrasah (MI/MTs), maupun santri di seluruh Indonesia.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-amber-800">
                  Daftar Online Mudah & Cepat
                </span>
                <span className="text-[11px] font-bold text-neutral-500">Gratis 100%</span>
              </div>
            </div>

            {/* Card 4: Sistem CBT Anti-Kecurangan Mutakhir */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D9] hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B132B] text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Laptop className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
                    CBT Anti-Cheat Aktif
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#1A1615]">
                    Platform CBT Mutakhir & Objektif
                  </h3>
                  <p className="text-xs text-[#66615B] mt-2 leading-relaxed">
                    Sistem Computer Based Test (CBT) interaktif dengan proteksi anti-contek otomatis, timer ujian ketat, acak urutan soal, dan format 20 soal HOTS bergambar berwarna untuk menjamin keadilan penilaian.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1A1615] text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>Ujian Online Nyaman dari Rumah:</span>
                  </div>
                  <p className="text-[10px] text-[#756F68] leading-snug">
                    Dapat diakses melalui laptop, tablet, maupun smartphone dengan antarmuka yang sangat ramah anak.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-blue-800">
                  Transparan & Real-Time
                </span>
                <span className="text-[11px] font-semibold text-neutral-500">20 Menit Ujian</span>
              </div>
            </div>

            {/* Card 5: Medali Logam Lapis Emas & Piala Kejuaraan */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D9] hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#855D05] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Trophy className="w-6 h-6 text-[#9E7D15]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    Apresiasi Nyata
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#1A1615]">
                    Medali Fisik Lapis Emas & Piala Juara
                  </h3>
                  <p className="text-xs text-[#66615B] mt-2 leading-relaxed">
                    Penghargaan bukan hanya simbolis — para finalis dan juara berhak mendapatkan medali fisik logam kuningan berukir lapis emas tebal, piala trofi juara umum bertingkat, piagam cetak resmi, serta cinderamata eksklusif yang dikirim ke rumah.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1A1615] text-[11px]">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>Kategori Juara Nasional:</span>
                  </div>
                  <p className="text-[10px] text-[#756F68] leading-snug">
                    Juara 1 (Emas), Juara 2 (Perak), Juara 3 (Perunggu), serta Juara Umum Nasional per mata pelajaran.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-[#855D05]">
                  Pengiriman Seluruh Indonesia
                </span>
                <span className="text-[11px] font-semibold text-neutral-500">Ekspedisi Aman</span>
              </div>
            </div>

            {/* Card 6: Pendampingan & Laporan Hasil Komprehensif */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D9] hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <FileCheck className="w-6 h-6 text-purple-700" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-300">
                    Evaluasi Tuntas
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#1A1615]">
                    Laporan Nilai & Notifikasi Otomatis
                  </h3>
                  <p className="text-xs text-[#66615B] mt-2 leading-relaxed">
                    Setiap tahapan ujian dipantau secara transparan. Peserta dan orang tua mendapatkan notifikasi WhatsApp resmi instan begitu nilai selesai dinilai, kartu ujian PDF cetak, dan akses download sertifikat langsung di dasbor peserta.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1A1615] text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Layanan Bantuan Panitia 24/7:</span>
                  </div>
                  <p className="text-[10px] text-[#756F68] leading-snug">
                    Call Center WhatsApp panitia responsif membantu kendala teknis dan administrasi siswa.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-purple-800">
                  Notifikasi WA API Real-Time
                </span>
                <span className="text-[11px] font-semibold text-neutral-500">Layanan Prima</span>
              </div>
            </div>

          </div>

          {/* Bottom Conversion Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1A1615] via-[#2E2724] to-[#1A1615] text-white border border-[#D4AF37]/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Peluang Prestasi Terbaik Tahun Ini</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white">
                Siap Antarkan Ananda Menjadi Juara Nasional?
              </h3>
              <p className="text-xs text-neutral-300 max-w-xl">
                Daftarkan putra-putri tercinta sekarang tanpa biaya pendaftaran (Gratis) dan dapatkan hak akses ke bank simulasi CBT interaktif.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-black bg-[#D4AF37] hover:bg-[#FFF2B2] text-[#1A1615] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#FFF2B2]"
              >
                <span>Daftar Gratis Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20ingin%20konsultasi%20tentang%20keunggulan%20kompetisi`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tanya Panitia via WA</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5. JENJANG PENDIDIKAN (3 KATEGORI LENGKAP SESUAI POSTER) */}
      <section id="jenjang" className="py-16 bg-white border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1615]/5 border border-[#D4AF37]/30 text-xs font-bold text-[#1A1615]">
              <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Kategori Jenjang Kompetisi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              3 Kategori Jenjang Pendidikan Siswa
            </h2>
            <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
              Materi dan bobot soal dirancang proporsional sesuai tingkat perkembangan usia anak, mulai dari usia dini hingga menengah.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {APP_CONFIG.educationLevels.map((lvl) => (
              <div
                key={lvl.id}
                className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-[#E8E2D9] hover:border-[#D4AF37] hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full text-white" style={{ backgroundColor: lvl.color }}>
                      {lvl.categoryName.split(':')[0]}
                    </span>
                    <span className="text-xs font-bold text-[#756F68]">{lvl.ageRange}</span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-[#1A1615]">
                    {lvl.categoryName.split(':')[1] || lvl.categoryName}
                  </h3>

                  <div className="p-3 rounded-xl bg-white border border-[#E8E2D9] text-xs font-semibold text-[#0B132B]">
                    "{lvl.motto}"
                  </div>

                  <p className="text-xs text-[#66615B] leading-relaxed">
                    Terbuka untuk seluruh siswa di jenjang ini. Babak penyisihan dilaksanakan secara online dari rumah dengan sistem CBT interaktif.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D9]">
                  <button
                    onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Daftar Jenjang Ini (Gratis)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. MATA PELAJARAN OLIMPIADE (TANPA HARGA - PENYISIHAN GRATIS) */}
      <section id="mapel" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>PENYISIHAN GRATIS • BISA IKUT BANYAK MAPEL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Pilihan Mata Pelajaran Olimpiade
            </h2>
            <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
              Pilih bidang yang diminati ananda untuk menguji penalaran dan daya saing di tingkat nasional. Siswa diperbolehkan mengikuti beberapa bidang sekaligus.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['Semua', 'Matematika', 'Sains', 'Bahasa', 'IPS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37] shadow-md'
                      : 'bg-white text-[#554E46] border border-[#E8E2D9] hover:border-[#D4AF37]'
                  }`}
                >
                  {cat === 'Semua' ? 'Semua Mapel' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid - STRICTLY NO PRICES */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Banner with Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                    <ImageWithFallback
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#1A1615]/90 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/50">
                        {prod.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow">
                        {prod.statusTag || 'Penyisihan Gratis'}
                      </span>
                    </div>

                    {/* Bottom overlay: Level info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                        {prod.level}
                      </span>
                      <span className="text-[#D4AF37] font-bold text-[11px]">
                        Online CBT
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#9E7D15] uppercase tracking-wider">
                        {prod.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#1A1615] group-hover:text-[#9E7D15] transition-colors leading-snug mt-0.5">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#66615B] leading-relaxed mt-2">
                        {prod.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-[#E8E2D9]">
                      <p className="text-[11px] font-bold text-[#1A1615] uppercase tracking-wider">
                        Fasilitas Resmi Peserta:
                      </p>
                      {prod.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#4A453E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => handleOpenRegistration(prod)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#2A2321] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Daftar Mapel Ini (Gratis)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20ingin%20tanya%20silabus%20${encodeURIComponent(prod.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#FAF8F5] text-[#1A1615] border border-[#E8E2D9] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tanya Panitia via WA ({APP_CONFIG.contact.displayPhone})</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. JADWAL & ALUR PELAKSANAAN RESMI (DARI POSTER) */}
      <section id="jadwal" className="py-20 bg-white border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1615]/5 text-xs font-bold text-[#1A1615]">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Jadwal & Agenda Resmi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Tahapan Pelaksanaan Olimpiade 2026
            </h2>
            <p className="text-xs sm:text-sm text-[#66615B]">
              Perhatikan tanggal-tanggal penting berikut agar ananda tidak melewatkan kesempatan emas ini.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1: Pendaftaran */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E8E2D9] space-y-4 relative shadow-sm hover:border-[#D4AF37] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#D4AF37]">01</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1A1615] text-[#D4AF37]">
                  Pendaftaran Online
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#1A1615]">Pendaftaran Dibuka</h3>
                <p className="text-xs font-bold text-[#9E7D15]">
                  📅 {liveSchedule.registrationOpenDate || "25 Agustus – 11 September 2026"}
                </p>
              </div>
              <p className="text-xs text-[#66615B] leading-relaxed">
                {liveSchedule.registrationDesc || "Pendaftaran online mudah & praktis. Terbuka untuk seluruh siswa di Indonesia tanpa kuota zonasi."}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pendaftaran Dibuka</span>
              </div>
            </div>

            {/* Step 2: Babak Penyisihan */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E8E2D9] space-y-4 relative shadow-sm hover:border-[#D4AF37] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#D4AF37]">02</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-700 text-white">
                  Penyisihan Gratis
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#1A1615]">Babak Penyisihan (CBT)</h3>
                <p className="text-xs font-bold text-[#9E7D15]">
                  📅 {liveSchedule.penyisihanDate || "12 September 2026"}
                </p>
              </div>
              <p className="text-xs text-[#66615B] leading-relaxed">
                {liveSchedule.penyisihanDesc || "Ujian online aman dari rumah via sistem CBT mutakhir anti-kecurangan. Penyisihan GRATIS untuk semua peserta."}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CBT Terjadwal Online</span>
              </div>
            </div>

            {/* Step 3: Babak Final */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E8E2D9] space-y-4 relative shadow-sm hover:border-[#D4AF37] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#D4AF37]">03</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1A1615] text-[#D4AF37]">
                  Babak Puncak
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#1A1615]">Babak Final Nasional</h3>
                <p className="text-xs font-bold text-[#9E7D15]">
                  📅 {liveSchedule.finalDate || "19 September 2026"}
                </p>
              </div>
              <p className="text-xs text-[#66615B] leading-relaxed">
                {liveSchedule.finalDesc || "Babak penentuan medalis nasional dan perebutan gelar Juara Umum OSN tingkat nasional."}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Tahap Penjurian</span>
              </div>
            </div>

            {/* Step 4: Pengumuman Juara */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E8E2D9] space-y-4 relative shadow-sm hover:border-[#D4AF37] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#D4AF37]">04</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#1A1615]">
                  Sertifikat & Medali
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#1A1615]">Pengumuman Juara</h3>
                <p className="text-xs font-bold text-[#9E7D15]">
                  📅 {liveSchedule.announcementDate || "20 September 2026"}
                </p>
              </div>
              <p className="text-xs text-[#66615B] leading-relaxed">
                {liveSchedule.announcementDesc || "Pengumuman resmi juara, penerbitan sertifikat QR-Code & pengiriman paket piala/medali fisik ke alamat pemenang."}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>Penyerahan Penghargaan</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all inline-flex items-center justify-center gap-2 border border-[#D4AF37]/40 shadow-md"
            >
              <span>Daftar Sekarang Sebelum Pendaftaran Ditutup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => openLogin('user')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold bg-white text-[#1A1615] border border-[#D4AF37] hover:bg-amber-50/70 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-[#9E7D15]" />
              <span>Sudah Daftar? Login Peserta CBT</span>
            </button>
          </div>

        </div>
      </section>

      {/* 8. VISUAL GALLERY JUARA (BERDASARKAN FOTO ASLI LAMPIRAN) */}
      <GalleryOSN
        onOpenRegistration={handleOpenRegistration}
        onOpenLogin={openLogin}
      />

      {/* 8.5 DYNAMIC 'RECENT WINNERS' MARQUEE SECTION */}
      <RecentWinnersMarquee />

      {/* 8.8 TABEL PENGUMUMAN HASIL KELULUSAN RESMI & FINALIS (2.000+ PESERTA TERCATAT) */}
      <PublicAnnouncementTable
        participants={publicParticipants}
        onOpenLogin={() => openLogin('user')}
      />

      {/* 9. OFFICIAL ORGANIZER PROFILE (LKP PRESTASI NUSANTARA) */}
      <section id="penyelenggara" className="py-20 bg-white border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-[#0B132B] via-[#121E42] to-[#0A1024] rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37] shadow-xl text-white relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <LogoLKP className="w-24 h-24 sm:w-28 sm:h-28" />
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-[#D4AF37]">
                    LKP PRESTASI NUSANTARA
                  </h3>
                  <p className="text-xs text-neutral-300">
                    Lembaga Kursus & Pelatihan Resmi Terdaftar
                  </p>
                </div>
                <StempelLKP className="w-24 h-24" isRotated={false} />
              </div>

              <div className="lg:col-span-8 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#D4AF37] font-semibold border border-white/20">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Penyelenggara Resmi & Terpercaya</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Komitmen LKP Prestasi Nusantara untuk Pendidikan Indonesia
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  LKP Prestasi Nusantara adalah lembaga profesional yang berdedikasi menyelenggarakan berbagai ajang kompetisi akademik bermutu tinggi di Indonesia. Melalui platform <strong>OLYMPIADE OSN</strong>, kami memfasilitasi puluhan ribu anak bangsa untuk berani bermimpi, menguji daya nalar, dan mengukir prestasi gemilang tanpa terkendala jarak geografis.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <strong className="block text-[#D4AF37] font-bold">Terakreditasi & Legal</strong>
                    <span className="text-neutral-300 text-[11px]">Sertifikat ber-QR Code resmi</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <strong className="block text-[#D4AF37] font-bold">Jangkauan 38 Provinsi</strong>
                    <span className="text-neutral-300 text-[11px]">Dari Aceh sampai Papua</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <strong className="block text-[#D4AF37] font-bold">Penyisihan Bebas Biaya</strong>
                    <span className="text-neutral-300 text-[11px]">Gratis bagi semua siswa</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Pengurus%20LKP%20Prestasi%20Nusantara,%20saya%20ingin%20berkonsultasi`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl text-xs font-bold bg-[#D4AF37] text-[#1A1615] hover:bg-[#FFF2B2] transition-colors inline-flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hubungi Pengurus LKP ({APP_CONFIG.contact.displayPhone})</span>
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section id="testimoni" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-xs font-bold text-[#9E7D15]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span>Apresiasi & Testimoni Juara</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Testimoni Para Orang Tua & Juara Nasional
            </h2>
            <p className="text-xs sm:text-sm text-[#66615B]">
              Kebanggaan nyata dari siswa peraih medali dan trofi kejuaraan OSN bersama LKP Prestasi Nusantara.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {APP_CONFIG.testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-7 rounded-3xl border border-[#E8E2D9] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
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
                    <h4 className="text-xs font-bold text-[#1A1615]">{t.name}</h4>
                    <p className="text-[11px] text-[#756F68]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1615]/5 text-xs font-bold text-[#1A1615]">
              <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Tanya Jawab & Bantuan Resmi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xs sm:text-sm text-[#66615B]">
              Semua informasi lengkap seputar kepesertaan, sertifikat ber-QR code, dan pengiriman hadiah.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {APP_CONFIG.faq.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E8E2D9] overflow-hidden bg-[#FAF8F5] transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#1A1615]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#554E46] leading-relaxed border-t border-[#E8E2D9]/60 pt-4 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-br from-[#1A1615] via-[#0B132B] to-[#120F0E] text-white border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#D4AF37]">
            <Trophy className="w-3.5 h-3.5" />
            <span>Penyelenggara: {APP_CONFIG.organizer}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
            {APP_CONFIG.tagline}
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto">
            Uji kemampuanmu, raih piala juara umum dan medali emas bergengsi. Penyisihan GRATIS dan terbuka untuk seluruh siswa di 38 provinsi di Indonesia!
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleOpenRegistration(APP_CONFIG.products[0])}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#D4AF37] text-[#1A1615] hover:bg-[#FFF2B2] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.3)] inline-flex items-center justify-center gap-2"
            >
              <span>Daftar Sekarang Juga (Gratis)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 13. COMPREHENSIVE LUXURY FOOTER */}
      <footer className="bg-[#0B132B] text-neutral-400 text-xs pt-14 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            
            {/* Brand & Logos Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-4">
                <LogoOSN className="w-12 h-12" isLight={true} showLabel={true} />
                <div className="pl-3 border-l border-white/20">
                  <LogoLKP className="w-9 h-9" isLight={true} showLabel={true} />
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed pr-4">
                {APP_CONFIG.description}
              </p>

              <div className="text-[11px] text-[#D4AF37] font-semibold">
                Slogan: "{APP_CONFIG.tagline}"
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Navigasi</p>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#jenjang" className="hover:text-white transition-colors">Jenjang Siswa</a></li>
                <li><a href="#mapel" className="hover:text-white transition-colors">Mata Pelajaran</a></li>
                <li><a href="#jadwal" className="hover:text-white transition-colors">Jadwal Ujian CBT</a></li>
                <li><a href="#galeri" className="hover:text-white transition-colors">Galeri Medalis</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Bantuan</a></li>
              </ul>
            </div>

            {/* Login & Portal Access */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Akses Portal</p>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => openLogin('user')} className="text-[#D4AF37] hover:underline font-bold text-left cursor-pointer flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#D4AF37]" />
                    <span>Ruang Ujian CBT Siswa</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => openLogin('admin')} className="text-purple-300 hover:text-white font-bold text-left cursor-pointer flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                    <span>Dashboard Admin Panitia</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setAiDrawerOpen(true)} className="text-neutral-300 hover:text-white text-left cursor-pointer">
                    ● Konsultan Akademik AI
                  </button>
                </li>
                <li>
                  <a href="#faq" className="text-neutral-300 hover:text-white text-left">
                    ● Panduan & Syarat Ketentuan
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Sekretariat Panitia</p>
              <div className="space-y-2 text-[11px] text-neutral-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{APP_CONFIG.contact.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="font-bold text-white">{APP_CONFIG.contact.displayPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{APP_CONFIG.contact.email}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
            <p>© {new Date().getFullYear()} {APP_CONFIG.brandName} • Penyelenggara: {APP_CONFIG.organizer}. Hak Cipta Dilindungi.</p>
            <p className="flex items-center gap-2 text-neutral-300">
              <span>Domain Resmi: {APP_CONFIG.domain}</span>
              <span>·</span>
              <span>WhatsApp: {APP_CONFIG.contact.displayPhone}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* 14. FLOATING BUTTONS: AI CONSULTANT */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating AI Consultant */}
        <button
          onClick={() => setAiDrawerOpen(true)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1615] text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:bg-[#26201E] transition-all"
          aria-label="Konsultasi AI"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide hidden sm:inline text-white">
            Konsultan Akademik AI
          </span>
        </button>
      </div>

      {/* 16. REGISTRATION MODAL (TANPA HARGA - PENYISIHAN GRATIS) */}
      {registrationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-xl rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#0B132B] text-white border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoOSN className="w-10 h-10" />
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">
                    Penyelenggara: {APP_CONFIG.organizer}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-0.5">
                    Formulir Registrasi Olimpiade 2026
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setRegistrationModalOpen(false)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
              {!registrationSuccess ? (
                <form onSubmit={handleRegSubmit} className="space-y-6">
                  
                  {/* SELEKSI JUMLAH ANAK YANG DIDAFTARKAN (1, 2, 3, ATAU LEBIH) */}
                  <div className="p-4 rounded-2xl bg-[#1A1615] text-white border-2 border-[#D4AF37]/60 shadow-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                          Formulir Pendaftaran Keluarga
                        </span>
                        <h4 className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                          <Users className="w-4 h-4 text-[#D4AF37]" />
                          Berapa Jumlah Anak yang Ingin Didaftarkan? *
                        </h4>
                        <p className="text-[11px] text-neutral-300 mt-0.5">
                          Pilih 1, 2, 3, atau lebih. Formulir data siswa akan otomatis terisi dan disesuaikan.
                        </p>
                      </div>

                      {/* Buttons 1, 2, 3, 4+ */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto bg-neutral-900/90 p-1 rounded-xl border border-neutral-700">
                        {[1, 2, 3, 4].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleChangeChildCount(num)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                              childCount === num
                                ? 'bg-[#D4AF37] text-[#1A1615] shadow-md scale-105'
                                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                            }`}
                          >
                            {num === 4 ? '4+ Anak' : `${num} Anak`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {childCount > 1 && (
                      <div className="mt-3 pt-3 border-t border-neutral-700/80 flex items-center justify-between text-xs text-amber-300">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Mendaftarkan {childCount} Siswa Sekaligus
                        </span>
                        <span className="text-[11px] text-neutral-300">
                          Babak Penyisihan Seluruh Anak Bebas Biaya (100% GRATIS)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* DATA ORANG TUA / WALI & ALAMAT DOMISILI (BERLAKU UNTUK KELUARGA / SELURUH ANAK) */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#E8E2D9]">
                      <h5 className="text-xs font-black text-[#1A1615] uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#D4AF37]" />
                        <span>Data Orang Tua / Wali & Domisili Keluarga</span>
                      </h5>
                      <span className="text-[10px] font-bold text-[#756F68] bg-white px-2 py-0.5 rounded-md border border-[#E8E2D9]">
                        Wajib Diisi
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#1A1615] mb-1">
                          NAMA ORANGTUA / WALI *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama lengkap Ayah / Ibu / Wali Siswa"
                          value={childrenForms[0]?.parentName || ''}
                          onChange={(e) => updateChildField(0, 'parentName', e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A1615] mb-1">
                          Kota / Kabupaten & Provinsi Domisili *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Surabaya, Jawa Timur"
                          value={childrenForms[0]?.cityProvince || ''}
                          onChange={(e) => updateChildField(0, 'cityProvince', e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1615] mb-1">
                        ALAMAT LENGKAP / DOMISILI *
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Contoh: Jl. Rungkut Asri No. 12, Kel. Kali Rungkut, Kec. Rungkut, Kota Surabaya (Untuk pengiriman piagam/sertifikat resmi)"
                        value={childrenForms[0]?.fullAddress || ''}
                        onChange={(e) => updateChildField(0, 'fullAddress', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-white font-medium resize-none"
                      />
                    </div>
                  </div>

                  {/* LOOP FORMULIR SETIAP ANAK / SISWA */}
                  <div className="space-y-6">
                    {childrenForms.map((child, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border-2 border-[#D4AF37]/40 shadow-xs space-y-4 relative"
                      >
                        {/* Header Box Anak ke-N */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#1A1615] text-[#D4AF37] font-black text-xs flex items-center justify-center shadow-xs">
                              {idx + 1}
                            </span>
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#1A1615]">
                              Data Siswa - Anak Ke-{idx + 1}
                              {child.fullName ? ` (${child.fullName})` : ''}
                            </h4>
                          </div>
                          {childrenForms.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (childrenForms.length > 1) {
                                  handleChangeChildCount(childrenForms.length - 1);
                                }
                              }}
                              className="text-[11px] font-bold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                              title="Hapus form anak ini"
                            >
                              Hapus
                            </button>
                          )}
                        </div>

                        {/* Input 1: Nama Lengkap Siswa */}
                        <div>
                          <label className="block text-xs font-bold text-[#1A1615] mb-1">
                            Nama Lengkap Siswa (Anak Ke-{idx + 1}) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Dzaliqa Assyafa N"
                            value={child.fullName}
                            onChange={(e) => updateChildField(idx, 'fullName', e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5] font-semibold"
                          />
                        </div>

                        {/* Input 2 & 3: Kategori Jenjang & Asal Sekolah */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              Kategori Jenjang (Anak Ke-{idx + 1}) *
                            </label>
                            <select
                              value={child.level}
                              onChange={(e) => updateChildField(idx, 'level', e.target.value)}
                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5] font-medium"
                            >
                              <option value="PAUD/TK (Kategori A: Usia 4-6 Tahun)">PAUD / TK (Kategori A: 4-6 Tahun)</option>
                              <option value="SD/MI (Kategori B: Usia 7-12 Tahun)">SD / MI (Kategori B: 7-12 Tahun)</option>
                              <option value="SMP/MTs (Kategori C: Usia 13-15 Tahun)">SMP / MTs (Kategori C: 13-15 Tahun)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              Asal Sekolah (Anak Ke-{idx + 1}) *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Contoh: SDN Teladan Bangsa"
                              value={child.schoolName}
                              onChange={(e) => updateChildField(idx, 'schoolName', e.target.value)}
                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                            />
                          </div>
                        </div>

                        {/* Input 4 & 5: No WhatsApp & Alamat Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-bold text-[#1A1615]">
                                No. WhatsApp Aktif (Anak Ke-{idx + 1}) *
                              </label>
                              {idx > 0 && child.whatsapp === childrenForms[0]?.whatsapp && child.whatsapp && (
                                <span className="text-[9px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                                  ✓ Sama dg Anak Ke-1
                                </span>
                              )}
                            </div>
                            <input
                              type="tel"
                              required
                              placeholder="Contoh: 081234567890"
                              value={child.whatsapp}
                              onChange={(e) => updateChildField(idx, 'whatsapp', e.target.value)}
                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5] font-mono font-bold"
                            />
                            <p className="text-[10px] text-[#756F68] mt-0.5">
                              {idx === 0 
                                ? 'Nomor ini digunakan untuk mendaftarkan semua anak & akses login CBT'
                                : '1 nomor WhatsApp dapat menaungi seluruh anak sekaligus'}
                            </p>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              Alamat Email Aktif (Anak Ke-{idx + 1}) *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="Untuk jadwal CBT & sertifikat"
                              value={child.email}
                              onChange={(e) => updateChildField(idx, 'email', e.target.value)}
                              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                            />
                          </div>
                        </div>

                        {/* Multi-Select Mata Pelajaran per Siswa */}
                        <div className="space-y-2 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E2D9]">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div>
                              <label className="block text-xs font-black text-[#1A1615]">
                                Mata Pelajaran yang Diikuti (Anak Ke-{idx + 1}) *
                              </label>
                              <span className="text-[10px] text-[#756F68]">
                                Bisa memilih lebih dari 1 mata pelajaran
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                {child.subjects.length} Mapel Terpilih
                              </span>
                              <button
                                type="button"
                                onClick={() => handleSelectAllSubjectsForChild(idx)}
                                className="text-[11px] font-bold text-[#9E7D15] hover:text-[#7A6110] underline cursor-pointer"
                              >
                                {child.subjects.length === SUBJECT_OPTIONS.length ? 'Pilih Ulang' : 'Pilih Semua (4 Mapel)'}
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {SUBJECT_OPTIONS.map((sub) => {
                              const isSelected = child.subjects.includes(sub.name);
                              const IconComp = sub.icon;
                              return (
                                <button
                                  key={sub.id}
                                  type="button"
                                  onClick={() => toggleSubjectForChild(idx, sub.name)}
                                  className={`text-left p-2.5 rounded-xl border transition-all flex items-start gap-2 cursor-pointer select-none ${
                                    isSelected
                                      ? 'bg-white border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-xs'
                                      : 'bg-white/80 border-[#E8E2D9] hover:border-[#D4AF37]/50 hover:bg-white'
                                  }`}
                                >
                                  <div className="mt-0.5 shrink-0">
                                    {isSelected ? (
                                      <div className="w-4 h-4 rounded bg-[#1A1615] text-[#D4AF37] flex items-center justify-center shadow-xs">
                                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                                      </div>
                                    ) : (
                                      <div className="w-4 h-4 rounded border border-neutral-400 bg-white" />
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <div className="flex items-center gap-1.5 min-w-0">
                                        <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#1A1615]' : 'text-neutral-700'}`}>
                                          {sub.name}
                                        </span>
                                      </div>
                                      <span className="text-[8.5px] font-bold px-1 rounded bg-amber-100/80 text-amber-900 shrink-0">
                                        {sub.badge}
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {subjectErrors[idx] && (
                            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 pt-1">
                              <X className="w-3.5 h-3.5 shrink-0" />
                              {subjectErrors[idx]}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tombol Tambah Anak Tambahan */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleChangeChildCount(childrenForms.length + 1)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border-2 border-dashed border-[#D4AF37] text-[#1A1615] hover:bg-amber-50/50 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
                      <span>+ Tambah Formulir Anak Lainnya</span>
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all border border-[#D4AF37]/50 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>
                        Kirim Pendaftaran ({childrenForms.length} Anak - Babak Penyisihan Bebas Biaya)
                      </span>
                    </button>
                    <p className="text-[11px] text-center text-[#756F68] mt-2">
                      Penyelenggara: {APP_CONFIG.organizer} • Call Center: {APP_CONFIG.contact.displayPhone}
                    </p>
                  </div>
                </form>
              ) : (
                /* Registration Success State (Supports 1 or Multi-Child) */
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-300">
                      <Database className="w-3.5 h-3.5 text-emerald-600" />
                      Pendaftaran {registeredRecords.length} Peserta Otomatis Tersimpan di Database
                    </span>
                    <h3 className="text-lg font-extrabold text-[#1A1615] mt-2">
                      Pendaftaran Berhasil Terverifikasi!
                    </h3>
                    <p className="text-xs text-[#66615B] max-w-md mx-auto mt-1 leading-relaxed">
                      Orang Tua/Wali: <strong>{childrenForms[0]?.parentName || '-'}</strong>. Data seluruh siswa telah aktif di database CBT pusat OSN 2026.
                    </p>
                  </div>

                  {/* List of Registered Children Credentials */}
                  <div className="space-y-3">
                    {registeredRecords.map((rec, rIdx) => (
                      <div
                        key={rec.id || rIdx}
                        className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-[#D4AF37]/50 text-left text-xs space-y-2 shadow-xs"
                      >
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#E8E2D9]">
                          <span className="text-[11px] font-bold text-[#1A1615] flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                            Data Terdaftar (Anak Ke-{rIdx + 1}): {rec.fullName}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {rec.id}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <span className="text-[#756F68] block">Nama Lengkap Siswa:</span>
                            <strong className="text-[#1A1615] text-xs">{rec.fullName}</strong>
                          </div>
                          <div>
                            <span className="text-[#756F68] block">No. WhatsApp Akses Login:</span>
                            <strong className="text-[#1A1615] text-xs font-mono">{rec.whatsapp}</strong>
                            <span className="text-[9.5px] text-amber-800 font-semibold block mt-0.5">
                              (Cukup masukkan nomor ini saat login, tanpa perlu mengetik nama)
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#756F68] block">
                            Mata Pelajaran yang Diikuti:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.from(new Set(rec.subjects || ['Matematika'])).map((s, idx) => (
                              <span key={`${s}-${idx}`} className="px-2 py-0.5 rounded-lg bg-[#1A1615] text-[#D4AF37] font-bold text-[11px] inline-flex items-center gap-1 shadow-xs">
                                <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-between text-[11px]">
                          <button
                            type="button"
                            onClick={() => openLoginWithRegisteredData(rec.fullName, rec.whatsapp)}
                            className="text-xs font-bold text-[#9E7D15] hover:text-[#7A6110] underline flex items-center gap-1 cursor-pointer"
                          >
                            <LogIn className="w-3 h-3" />
                            <span>Buka CBT Untuk Siswa Ini &rarr;</span>
                          </button>
                          <span className="text-emerald-700 font-bold">Penyisihan 100% GRATIS</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Wajib Konfirmasi WhatsApp & Follow Sosmed Banner */}
                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">!</span>
                      <h4 className="text-xs font-bold text-amber-900">Alur Wajib Setelah Mendaftar:</h4>
                    </div>
                    <ol className="text-xs text-amber-950 space-y-1 pl-4 list-decimal">
                      <li><strong>Klik tombol WhatsApp di bawah</strong> untuk konfirmasi data ke panitia.</li>
                      <li><strong>Wajib Follow Akun Instagram/TikTok resmi OSN</strong> untuk membuka akses pengerjaan simulasi ujian.</li>
                      <li>Setelah follow, masuk ke <strong>Ruang Ujian Siswa</strong> untuk mengerjakan simulasi dan unduh kartu ujian.</li>
                    </ol>
                  </div>

                  {/* Actions: WhatsApp Notification & Direct CBT Portal Login */}
                  <div className="space-y-2 pt-2">
                    <a
                      href={generateWhatsAppUrlMulti(childrenForms)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        trackPixelEvent('Contact', {
                          content_name: 'Konfirmasi Pendaftaran ke WhatsApp Admin',
                          students_count: childrenForms.length
                        });
                        showToast('success', 'Konfirmasi Pendaftaran', 'Membuka WhatsApp Admin untuk konfirmasi pendaftaran & link sosmed...');
                      }}
                      className="w-full py-3.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>1. Konfirmasi Sekarang ke WhatsApp Admin & Ambil Link Sosmed</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        const first = registeredRecords[0];
                        if (first) {
                          openLoginWithRegisteredData(first.fullName, first.whatsapp);
                        } else {
                          openLogin('user');
                        }
                      }}
                      className="w-full py-3 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all flex items-center justify-center gap-2 shadow-md border border-[#D4AF37]/60 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-[#D4AF37]" />
                      <span>2. Masuk ke Ruang Ujian CBT Siswa (Simulasi & Kartu)</span>
                    </button>
                    
                    <button
                      onClick={() => setRegistrationModalOpen(false)}
                      className="w-full py-2 rounded-xl text-xs font-semibold text-[#66615B] hover:text-[#1A1615] cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 17. AI CONSULTANT DRAWER */}
      {aiDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-l border-[#D4AF37]/40">
            
            <div className="p-4 sm:p-5 bg-[#0B132B] text-white border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Konsultan Akademik OSN AI
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#1A1615] font-extrabold">Aktif</span>
                  </h3>
                  <p className="text-[11px] text-neutral-300">Penyelenggara Resmi: {APP_CONFIG.organizer}</p>
                </div>
              </div>
              <button
                onClick={() => setAiDrawerOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 py-2.5 bg-white border-b border-[#E8E2D9] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#66615B]">Pilih Jenjang Siswa:</span>
              <select
                value={aiStudentLevel}
                onChange={(e) => setAiStudentLevel(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-2.5 py-1 text-xs font-bold text-[#1A1615] focus:outline-none"
              >
                <option value="PAUD / TK (Kategori A)">PAUD / TK (4-6 Tahun)</option>
                <option value="SD / MI (Kategori B)">SD / MI (7-12 Tahun)</option>
                <option value="SMP / MTs (Kategori C)">SMP / MTs (13-15 Tahun)</option>
              </select>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1A1615] text-white rounded-br-none'
                        : 'bg-white border border-[#E8E2D9] text-[#1A1615] rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.recommendedProduct && (
                    <div className="mt-2 w-full max-w-[85%] bg-white rounded-2xl p-3 border border-[#D4AF37] shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#9E7D15] uppercase">Rekomendasi:</span>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Penyisihan Gratis
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#1A1615]">{msg.recommendedProduct.name}</p>
                      <button
                        onClick={() => handleOpenRegistration(msg.recommendedProduct)}
                        className="w-full py-2 rounded-lg text-xs font-bold bg-[#1A1615] text-[#D4AF37]"
                      >
                        Daftar Bidang Ini
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {aiLoading && (
                <div className="flex items-center gap-2 text-xs text-[#756F68] bg-white p-3 rounded-2xl w-fit border border-[#E8E2D9]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                  <span>Konsultan AI sedang memproses...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-white border-t border-[#E8E2D9] flex gap-1.5 overflow-x-auto">
              <button
                onClick={() => handleSendAiMessage('Apakah pendaftaran penyisihan benar-benar gratis?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[11px] text-[#66615B] hover:border-[#D4AF37]"
              >
                Penyisihan gratis?
              </button>
              <button
                onClick={() => handleSendAiMessage('Bisa ikut lebih dari satu mata pelajaran?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[11px] text-[#66615B] hover:border-[#D4AF37]"
              >
                Bisa ikut banyak mapel?
              </button>
              <button
                onClick={() => handleSendAiMessage('Bagaimana sertifikat dan medali dikirim?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[11px] text-[#66615B] hover:border-[#D4AF37]"
              >
                Pengiriman medali?
              </button>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-[#E8E2D9]">
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
                  placeholder="Tanyakan materi, jadwal, atau sertifikat..."
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                />
                <button
                  type="submit"
                  disabled={aiLoading || !aiInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#1A1615] text-[#D4AF37] disabled:opacity-50 transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* 18. VISUAL LIGHTBOX MODAL */}
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
            <div className="rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-black">
              <ImageWithFallback
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="w-full max-h-[75vh] object-contain"
              />
              <div className="p-5 bg-[#0B132B] text-white flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#D4AF37] font-bold">{lightboxImage.subtitle}</p>
                  <h3 className="text-base font-bold text-white mt-0.5">{lightboxImage.title}</h3>
                </div>
                <LogoLKP className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 19. AUTH & CBT EXAM & ADMIN DASHBOARD MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setAuthStudentInitialData(null);
        }}
        defaultRole={authModalDefaultRole}
        initialStudentData={authStudentInitialData}
      />

      {/* Global Notification Toast Container for all functions */}
      <NotificationToastContainer />

    </div>
  );
}
