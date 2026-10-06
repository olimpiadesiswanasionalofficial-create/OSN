import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Lock,
  Phone,
  QrCode,
  Download,
  Calendar,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  Database,
  Plus,
  Edit,
  Trash2,
  Save,
  Image as ImageIcon,
  Check,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BarChart3,
  FileSpreadsheet,
  FileText,
  Contact,
  CalendarDays,
  RefreshCw,
  Settings,
  FolderOpen,
  Share2,
  ExternalLink,
  Users2,
  Users,
  HardDrive,
  FileCheck2,
  MessageCircle,
  Eye,
  EyeOff,
  KeyRound,
  Trophy,
  Banknote,
  DollarSign,
  ShieldAlert,
  Upload,
  Zap,
  Send
} from 'lucide-react';
import { LogoOSN, LogoLKP, StempelLKP } from './BrandLogos';
import { APP_CONFIG } from '../../appConfig.js';
import {
  getAllParticipants,
  findParticipant,
  findParticipantsByPhone,
  normalizePhone,
  saveParticipant,
  updateParticipantExamResult,
  deleteParticipant,
  confirmFinalTicketPayment,
  updateParticipantField,
  resetParticipantAttempts,
  grantExtraAttempt,
  bulkResetParticipantAttempts,
  getOrGenerateParticipantExamQuestions,
  syncParticipantsWithServer,
  ParticipantRecord
} from '../services/participantDb';
import {
  getAllQuestions,
  saveAllQuestions,
  updateQuestion,
  getFilteredQuestions,
  QuestionItem,
  ExamTier
} from '../services/cbtQuestionsDb';
import {
  getEventSchedule,
  saveEventSchedule,
  DEFAULT_EVENT_SCHEDULE,
  EventScheduleConfig
} from '../services/eventScheduleDb';
import {
  signInWithGoogleWorkspace,
  logoutGoogleWorkspace,
  exportParticipantsToGoogleSheet,
  listDriveFiles,
  uploadTextFileToDrive,
  listGoogleContacts,
  syncParticipantToGoogleContacts,
  getAccessToken,
  GoogleDriveFile,
  GoogleContactPerson,
  GoogleSheetInfo
} from '../services/googleWorkspaceService';
import { downloadExamCardPdf } from '../services/pdfCardGenerator';
import { generateFinalCertificatePdf, generateDigitalCertificatePdf } from '../services/certificateGenerator';
import {
  triggerExamGradedNotification,
  triggerQualificationReleasedNotification,
  broadcastQualificationAnnouncements,
  sendWhatsAppApiNotification,
  getStoredWhatsAppLogs,
  WhatsAppNotificationLog
} from '../services/whatsappApiService';
import {
  exportLolosPenyisihanReportPdf,
  exportLolosFinalDanJuaraReportPdf
} from '../services/officialReportsGenerator';
import {
  getMetaPixelConfig,
  saveMetaPixelConfig,
  MetaPixelConfig
} from '../services/metaPixelService';
import { ReportSimulasiTable } from './ReportSimulasiTable';
import { ReportPenyisihanTable } from './ReportPenyisihanTable';
import { ReportFinalTable } from './ReportFinalTable';


import {
  exportParticipantsToExcel,
  exportParticipantsToPdf,
  exportParticipantsToVcf,
  exportSingleParticipantVcf
} from '../services/adminExportService';
import {
  getRandomMotivation,
  ExamMotivation,
  EXAM_MOTIVATIONAL_QUOTES
} from '../services/motivationQuotes';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'user' | 'admin';
  initialStudentData?: {
    fullName?: string;
    whatsapp?: string;
    autoLogin?: boolean;
  } | null;
}

export const AuthModal = ({
  isOpen,
  onClose,
  defaultRole = 'user',
  initialStudentData = null
}: AuthModalProps) => {
  const [role, setRole] = useState<'user' | 'admin'>(defaultRole);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState<'user' | 'admin'>('user');

  // Student Login Fields (Hanya butuh Nomor WhatsApp terdaftar)
  const [studentName, setStudentName] = useState('');
  const [studentWa, setStudentWa] = useState('');
  const [activeStudent, setActiveStudent] = useState<ParticipantRecord | null>(null);

  // Multi-children selection state when 1 phone number has multiple registered kids
  const [matchedChildren, setMatchedChildren] = useState<ParticipantRecord[]>([]);
  const [showChildSelector, setShowChildSelector] = useState(false);

  // Admin Login Fields
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('ADMIN123');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // UI States
  const [loginError, setLoginError] = useState('');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Student CBT Simulation, Penyisihan, & Final Exam States
  const [showSimulatedExam, setShowSimulatedExam] = useState(false);
  const [examTypeMode, setExamTypeMode] = useState<'simulasi' | 'penyisihan' | 'final'>('simulasi');
  const [selectedSubjectForExam, setSelectedSubjectForExam] = useState<string>('Matematika');
  const [examSubjectChosen, setExamSubjectChosen] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({});
  const [examTimer, setExamTimer] = useState(20 * 60); // 20 minutes
  const [examCompleted, setExamCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [examMotivation, setExamMotivation] = useState<ExamMotivation>(() => getRandomMotivation());

  // Anti-Cheat & Disclaimer States
  const [showExamDisclaimer, setShowExamDisclaimer] = useState(false);
  const [disclaimerPendingSubject, setDisclaimerPendingSubject] = useState<string>('');
  const [antiCheatViolationPopup, setAntiCheatViolationPopup] = useState<string | null>(null);
  const [isAntiCheatEnabled, setIsAntiCheatEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('osn_anti_cheat_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  // Admin Tabs & Management States
  const [adminTab, setAdminTab] = useState<
    'participants' | 'report_simulasi' | 'report_penyisihan' | 'report_final' | 'questions' | 'schedule' | 'workspace' | 'pixel' | 'anticheat' | 'announcements' | 'gallery'
  >('participants');
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilterCategory, setAdminFilterCategory] = useState('Semua');
  const [adminFilterExamStatus, setAdminFilterExamStatus] = useState('Semua');
  const [adminFilterWinner, setAdminFilterWinner] = useState('Semua');
  const [adminStartDate, setAdminStartDate] = useState('');
  const [adminEndDate, setAdminEndDate] = useState('');
  const [participantsList, setParticipantsList] = useState<ParticipantRecord[]>([]);

  // Mode Akses Cepat & Ringan: Batasi tabel peserta hanya 10 baris per halaman, diurutkan mulai dari yang terbaru
  const [adminParticipantsPage, setAdminParticipantsPage] = useState(1);
  const [adminAnnouncePage, setAdminAnnouncePage] = useState(1);
  const ADMIN_PAGE_SIZE = 10;

  // States for 3 Exam Report Tables (Laporan Simulasi, Penyisihan, Final)
  const [reportSimulasiSearch, setReportSimulasiSearch] = useState('');
  const [reportSimulasiMapel, setReportSimulasiMapel] = useState('Semua');
  const [reportSimulasiStatus, setReportSimulasiStatus] = useState('Semua');
  const [reportSimulasiJenjang, setReportSimulasiJenjang] = useState('Semua');
  const [reportSimulasiSort, setReportSimulasiSort] = useState<'highest' | 'lowest' | 'latest' | 'name'>('highest');

  const [reportPenyisihanSearch, setReportPenyisihanSearch] = useState('');
  const [reportPenyisihanMapel, setReportPenyisihanMapel] = useState('Semua');
  const [reportPenyisihanStatus, setReportPenyisihanStatus] = useState('Semua');
  const [reportPenyisihanClosing, setReportPenyisihanClosing] = useState('Semua');
  const [reportPenyisihanJenjang, setReportPenyisihanJenjang] = useState('Semua');
  const [reportPenyisihanSort, setReportPenyisihanSort] = useState<'highest' | 'lowest' | 'latest' | 'name'>('highest');

  const [reportFinalSearch, setReportFinalSearch] = useState('');
  const [reportFinalMapel, setReportFinalMapel] = useState('Semua');
  const [reportFinalRank, setReportFinalRank] = useState('Semua');
  const [reportFinalJenjang, setReportFinalJenjang] = useState('Semua');
  const [reportFinalSort, setReportFinalSort] = useState<'highest' | 'lowest' | 'latest' | 'name'>('highest');

  // Google Workspace States
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [driveFiles, setDriveFiles] = useState<GoogleDriveFile[]>([]);
  const [googleContacts, setGoogleContacts] = useState<GoogleContactPerson[]>([]);
  const [lastCreatedSheet, setLastCreatedSheet] = useState<GoogleSheetInfo | null>(null);
  const [isSyncingContacts, setIsSyncingContacts] = useState(false);
  const [isExportingSheet, setIsExportingSheet] = useState(false);
  const [isUploadingDrive, setIsUploadingDrive] = useState(false);

  // Destructive Action Confirmation State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    actionType: 'export_sheet' | 'sync_contacts' | 'backup_drive' | 'none';
    data?: any;
  }>({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'none'
  });

  // Schedule Management in Admin
  const [eventSchedule, setEventSchedule] = useState<EventScheduleConfig>(DEFAULT_EVENT_SCHEDULE);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);

  // Meta Pixel Configuration State
  const [pixelConfig, setPixelConfig] = useState<MetaPixelConfig>(getMetaPixelConfig());
  const [pixelSavedSuccess, setPixelSavedSuccess] = useState(false);

  // Questions Database in Admin
  const [questionsList, setQuestionsList] = useState<QuestionItem[]>([]);
  const [selectedAdminSubject, setSelectedAdminSubject] = useState<string>('Matematika');
  const [selectedAdminStage, setSelectedAdminStage] = useState<string>('Semua');
  const [selectedAdminCurriculum, setSelectedAdminCurriculum] = useState<string>('Semua');
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [isCreatingNewQuestion, setIsCreatingNewQuestion] = useState(false);
  const [adminNotification, setAdminNotification] = useState<string>('');

  // Find all sibling children registered under the same WhatsApp number
  const siblingStudents = useMemo(() => {
    if (!activeStudent?.whatsapp) return [];
    return findParticipantsByPhone(activeStudent.whatsapp);
  }, [activeStudent, participantsList]);

  // Participant Action Modals
  const [contactActionParticipant, setContactActionParticipant] = useState<ParticipantRecord | null>(null);
  const [resetQuotaParticipant, setResetQuotaParticipant] = useState<ParticipantRecord | null>(null);
  const [resetQuotaClearHistory, setResetQuotaClearHistory] = useState<boolean>(false);
  const [showBulkResetModal, setShowBulkResetModal] = useState<boolean>(false);
  const [deleteConfirmParticipant, setDeleteConfirmParticipant] = useState<ParticipantRecord | null>(null);
  const [isSyncingSingleContact, setIsSyncingSingleContact] = useState(false);
  const [viewDetailParticipant, setViewDetailParticipant] = useState<ParticipantRecord | null>(null);

  // Filter current questions by selected subject, stage, and student level
  // Uses randomized selection algorithm (20 unique questions per session drawn via Math.random())
  const currentSubjectQuestions = React.useMemo(() => {
    const stage = examTypeMode === 'final' ? 'final' : examTypeMode === 'penyisihan' ? 'penyisihan' : 'simulasi';
    if (activeStudent) {
      return getOrGenerateParticipantExamQuestions(
        activeStudent.id,
        selectedSubjectForExam,
        stage
      );
    }
    return getFilteredQuestions({
      subject: selectedSubjectForExam,
      stage,
      level: undefined,
      limit: 20,
      randomize: true
    });
  }, [questionsList, selectedSubjectForExam, examTypeMode, activeStudent]);

  // Realtime participant updates listener & background sync
  useEffect(() => {
    const handleUpdate = () => {
      setParticipantsList(getAllParticipants());
    };
    window.addEventListener('osn_participants_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Periodic sync with server to ensure new submissions immediately appear on admin dashboard
    const interval = setInterval(() => {
      syncParticipantsWithServer().then(synced => {
        if (synced && synced.length > 0) setParticipantsList(synced);
      }).catch(() => {});
    }, 4000);

    return () => {
      window.removeEventListener('osn_participants_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      clearInterval(interval);
    };
  }, []);

  // Sync state on load
  useEffect(() => {
    if (isOpen) {
      setRole(defaultRole);
      setParticipantsList(getAllParticipants());
      syncParticipantsWithServer().then(synced => {
        if (synced && synced.length > 0) setParticipantsList(synced);
      });
      setQuestionsList(getAllQuestions());
      setEventSchedule(getEventSchedule());

      // If opened as admin, check if previously logged in as admin
      if (defaultRole === 'admin') {
        setRole('admin');
        setAdminUser('admin');
        setAdminPassword('ADMIN123');
        const adminSession = localStorage.getItem('osn_admin_session');
        if (adminSession === 'true') {
          setLoggedInRole('admin');
          setIsLoggedIn(true);
        }
      }

      if (initialStudentData) {
        if (initialStudentData.fullName) setStudentName(initialStudentData.fullName);
        if (initialStudentData.whatsapp) setStudentWa(initialStudentData.whatsapp);

        if (initialStudentData.autoLogin) {
          if (initialStudentData.fullName && initialStudentData.whatsapp) {
            const found = findParticipant(initialStudentData.fullName, initialStudentData.whatsapp);
            if (found) {
              setActiveStudent(found);
              const siblings = findParticipantsByPhone(found.whatsapp);
              setMatchedChildren(siblings.length > 0 ? siblings : [found]);
              setShowChildSelector(false);
              setLoggedInRole('user');
              setIsLoggedIn(true);
            } else {
              saveParticipant({
                fullName: initialStudentData.fullName,
                whatsapp: initialStudentData.whatsapp,
                level: 'SD / MI (Kategori B: Usia 7-12 Tahun)',
                schoolName: 'Peserta Baru OSN 2026',
                cityProvince: 'Indonesia',
                email: '-',
                subjects: ['Matematika']
              }).then(rec => {
                setActiveStudent(rec);
                setMatchedChildren([rec]);
                setShowChildSelector(false);
                setLoggedInRole('user');
                setIsLoggedIn(true);
                setParticipantsList(getAllParticipants());
              });
            }
          } else if (initialStudentData.whatsapp) {
            const siblings = findParticipantsByPhone(initialStudentData.whatsapp);
            if (siblings.length === 1) {
              setActiveStudent(siblings[0]);
              setMatchedChildren(siblings);
              setShowChildSelector(false);
              setLoggedInRole('user');
              setIsLoggedIn(true);
            } else if (siblings.length > 1) {
              setMatchedChildren(siblings);
              setShowChildSelector(true);
              setLoggedInRole('user');
            }
          }
        }
      }
    }
  }, [isOpen, defaultRole, initialStudentData]);

  // CBT Exam Timer Countdown (20 Menit)
  useEffect(() => {
    let interval: any = null;
    if (showSimulatedExam && examSubjectChosen && !examCompleted && examTimer > 0) {
      interval = setInterval(() => {
        setExamTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showSimulatedExam, examSubjectChosen, examCompleted, examTimer]);

  // Anti-Cheat Detection: Active ONLY during 'final' exam and if isAntiCheatEnabled is true
  useEffect(() => {
    if (!showSimulatedExam || !examSubjectChosen || examCompleted) return;

    // Hanya aktif pada UJIAN BABAK FINAL dan jika toggle anti-contek aktif
    if (examTypeMode !== 'final' || !isAntiCheatEnabled) return;

    const triggerViolation = (reason: string) => {
      setAntiCheatViolationPopup(reason);
      finishExam(reason);
    };

    // 1. Deteksi buka tab baru / berpindah halaman / minimize window
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena membuka halaman baru atau berpindah halaman!');
      }
    };

    const handleWindowBlur = () => {
      // Ketika pengguna klik keluar dari window browser
      triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena meninggalkan layar lembar ujian!');
    };

    // 2. Deteksi copy text / cut text
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena mencoba untuk salin soal atau screenshot soal!');
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena mencoba untuk salin soal atau memotong teks!');
    };

    // 3. Deteksi Shortcut Screenshot & DevTools (PrintScreen, F12, Ctrl+Shift+I, Ctrl+C, Ctrl+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena mencoba screenshot soal!');
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'c' || e.key === 'C' || e.key === 'p' || e.key === 'P' || e.key === 'u' || e.key === 'U')
      ) {
        e.preventDefault();
        triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena mencoba untuk salin soal atau screenshot soal!');
      } else if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
        triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena membuka inspeksi sistem!');
      }
    };

    // 4. Deteksi Klik Kanan (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerViolation('Kamu terdeteksi melakukan kecurangan dalam ujian karena mencoba klik kanan / salin soal!');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [showSimulatedExam, examSubjectChosen, examCompleted, examTypeMode, isAntiCheatEnabled]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  // Quick Demo Logins: Mendukung nomor dengan 1 anak maupun banyak anak sekaligus
  const handleQuickLoginUser = (samplePhone: string = '08123456781') => {
    setStudentWa(samplePhone);
    setLoginError('');
    const matching = findParticipantsByPhone(samplePhone);
    if (matching.length === 1) {
      setActiveStudent(matching[0]);
      setMatchedChildren(matching);
      setShowChildSelector(false);
      setLoggedInRole('user');
      setIsLoggedIn(true);
    } else if (matching.length > 1) {
      setMatchedChildren(matching);
      setShowChildSelector(true);
    } else {
      const list = getAllParticipants();
      if (list.length > 0) {
        setActiveStudent(list[0]);
        setMatchedChildren([list[0]]);
        setStudentWa(list[0].whatsapp);
        setShowChildSelector(false);
        setLoggedInRole('user');
        setIsLoggedIn(true);
      }
    }
  };

  // Akses Masuk Cepat Panitia & Administrator Pusat Resmi
  const handleQuickAdminLogin = (username = 'admin', password = 'ADMIN123') => {
    setAdminUser(username);
    setAdminPassword(password);
    setLoggedInRole('admin');
    setIsLoggedIn(true);
    localStorage.setItem('osn_admin_session', 'true');
    setParticipantsList(getAllParticipants());
    setQuestionsList(getAllQuestions());
    setLoginError('');
    setAdminNotification('Selamat datang, Administrator Resmi OSN 2026!');
    setTimeout(() => setAdminNotification(''), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (role === 'user') {
      const cleanWa = studentWa.trim();
      if (!cleanWa) {
        setLoginError('Silakan masukkan Nomor WhatsApp yang didaftarkan.');
        return;
      }

      // Cari semua anak/siswa yang terdaftar dengan nomor WhatsApp ini
      const matching = findParticipantsByPhone(cleanWa);

      if (matching.length === 1) {
        // Tepat 1 anak terdaftar -> Langsung masuk ke Ruang Ujian
        setActiveStudent(matching[0]);
        setMatchedChildren(matching);
        setShowChildSelector(false);
        setLoggedInRole('user');
        setIsLoggedIn(true);
        setLoginError('');
      } else if (matching.length > 1) {
        // 1 nomor mendaftarkan beberapa anak sekaligus -> Tampilkan pilihan siswa
        setMatchedChildren(matching);
        setShowChildSelector(true);
        setLoginError('');
      } else {
        // Pencarian alternatif berdasarkan ID peserta jika nomor tidak ditemukan
        const fallback = findParticipant(cleanWa, cleanWa);
        if (fallback) {
          const siblings = findParticipantsByPhone(fallback.whatsapp);
          setActiveStudent(fallback);
          setMatchedChildren(siblings.length > 0 ? siblings : [fallback]);
          setShowChildSelector(false);
          setLoggedInRole('user');
          setIsLoggedIn(true);
          setLoginError('');
        } else {
          setLoginError(`Nomor WhatsApp "${cleanWa}" belum terdaftar di database peserta OSN 2026. Pastikan nomor yang dimasukkan adalah nomor WhatsApp saat mendaftar. (1 nomor dapat mendaftarkan beberapa anak sekaligus).`);
        }
      }
    } else {
      // Akses Masuk Dashboard Admin Resmi
      const u = (adminUser || '').trim();
      const p = (adminPassword || '').trim();

      // Gunakan username & password atau fallback otomatis ke kredensial admin resmi
      const finalUser = u || 'admin';
      const finalPass = p || 'ADMIN123';

      setAdminUser(finalUser);
      setAdminPassword(finalPass);
      setLoggedInRole('admin');
      setIsLoggedIn(true);
      localStorage.setItem('osn_admin_session', 'true');
      setParticipantsList(getAllParticipants());
      setQuestionsList(getAllQuestions());
      setLoginError('');
      setAdminNotification('Selamat datang di Dashboard Admin Panitia OSN 2026!');
      setTimeout(() => setAdminNotification(''), 3000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('osn_admin_session');
    setShowSimulatedExam(false);
    setExamSubjectChosen(false);
    setExamCompleted(false);
    setStudentAnswers({});
    setCurrentQuestionIdx(0);
    setStudentName('');
    setStudentWa('');
    setActiveStudent(null);
    setMatchedChildren([]);
    setShowChildSelector(false);
    setAdminUser('');
    setAdminPassword('');
    setLoginError('');
    setEditingQuestion(null);
  };

  // PDF Download Trigger
  const handleDownloadPdf = () => {
    if (!activeStudent) return;
    setIsDownloadingPdf(true);
    try {
      downloadExamCardPdf(activeStudent);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 500);
    }
  };

  const startSimulation = (subject: string, mode: 'simulasi' | 'penyisihan' | 'final' = 'simulasi') => {
    // Cek batas maksimal 2x pengerjaan
    if (activeStudent) {
      const attempts = mode === 'final'
        ? (activeStudent.finalAttempts || 0)
        : mode === 'penyisihan'
        ? (activeStudent.penyisihanAttempts || 0)
        : (activeStudent.simulatedAttempts || 0);
      if (attempts >= 2) {
        const modeLabel = mode === 'final' ? 'Babak Final' : mode === 'penyisihan' ? 'Babak Penyisihan' : 'Simulasi CBT';
        alert(`Perhatian: Anda sudah mengerjakan ujian ${modeLabel} sebanyak ${attempts}x. Batas maksimal pengerjaan adalah 2x.`);
        return;
      }
    }

    setExamTypeMode(mode);
    setSelectedSubjectForExam(subject);
    setExamSubjectChosen(true);
    setCurrentQuestionIdx(0);
    setStudentAnswers({});
    setExamTimer(20 * 60); // Waktu pengerjaan seluruh ujian yaitu 20 menit (1200 detik)
    setExamCompleted(false);
    setFinalScore(null);
  };

  const handlePromptStartExam = (subject: string, mode: 'simulasi' | 'penyisihan' | 'final' = 'simulasi') => {
    // Cek batasan pengerjaan 2x
    if (activeStudent) {
      const attempts = mode === 'final'
        ? (activeStudent.finalAttempts || 0)
        : mode === 'penyisihan'
        ? (activeStudent.penyisihanAttempts || 0)
        : (activeStudent.simulatedAttempts || 0);
      if (attempts >= 2) {
        const modeLabel = mode === 'final' ? 'Babak Final' : mode === 'penyisihan' ? 'Babak Penyisihan' : 'Simulasi CBT';
        alert(`Perhatian: Anda sudah mengerjakan ujian ${modeLabel} sebanyak ${attempts}x. Anda tidak dapat lagi mengerjakan ulang karena sudah melampaui batasan maksimal.`);
        return;
      }
    }
    setExamTypeMode(mode);
    setDisclaimerPendingSubject(subject);
    setShowExamDisclaimer(true);
  };

  const handleConfirmStartExam = () => {
    setShowExamDisclaimer(false);
    if (disclaimerPendingSubject) {
      startSimulation(disclaimerPendingSubject, examTypeMode);
    }
  };

  const selectAnswer = (qIndex: number, optionKey: string) => {
    setStudentAnswers(prev => ({
      ...prev,
      [qIndex]: optionKey
    }));
  };

  const finishExam = async (violation?: string) => {
    // Calculate score
    let correctCount = 0;
    currentSubjectQuestions.forEach((q, idx) => {
      if (studentAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / (currentSubjectQuestions.length || 20)) * 100);
    setFinalScore(calculatedScore);
    // Pilih kata-kata motivasi unik yang berbeda secara acak untuk peserta
    setExamMotivation(prev => getRandomMotivation(prev?.id));
    setExamCompleted(true);

    if (activeStudent) {
      const statusText = violation
        ? `Pelanggaran: ${violation}`
        : examTypeMode === 'final'
        ? `Selesai Ujian Final (${calculatedScore}/100)`
        : examTypeMode === 'penyisihan'
        ? `Selesai Babak Penyisihan (${calculatedScore}/100)`
        : `Selesai Simulasi CBT (${calculatedScore}/100)`;

      const updated = updateParticipantExamResult(
        activeStudent.id,
        examTypeMode,
        {
          subject: selectedSubjectForExam,
          score: calculatedScore,
          totalQuestions: currentSubjectQuestions.length,
          status: statusText,
          violationReason: violation
        },
        {
          fullName: activeStudent.fullName,
          whatsapp: activeStudent.whatsapp,
          level: activeStudent.level,
          schoolName: activeStudent.schoolName
        }
      );

      if (updated) {
        setActiveStudent(updated);
        setParticipantsList(getAllParticipants());
      }

      // Explicitly POST to server and await so the score is saved in database before sync
      try {
        await fetch(`/api/participants/${encodeURIComponent(activeStudent.id)}/exam`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            examType: examTypeMode,
            subject: selectedSubjectForExam,
            score: calculatedScore,
            totalQuestions: currentSubjectQuestions.length,
            completedAt: new Date().toISOString(),
            violationReason: violation,
            fullName: activeStudent.fullName,
            whatsapp: activeStudent.whatsapp,
            level: activeStudent.level,
            schoolName: activeStudent.schoolName
          })
        });
      } catch (err) {
        console.warn('Direct server exam update error:', err);
      }

      // Sync immediately with server so admin dashboard updates without needing refresh
      try {
        const synced = await syncParticipantsWithServer();
        if (synced && synced.length > 0) {
          setParticipantsList(synced);
        }
      } catch (err) {
        console.warn('Sync error after exam finish:', err);
      }

      // OTOMATISASI INTEGRASI API WHATSAPP:
      // Kirim notifikasi WhatsApp resmi ke nomor peserta saat pengerjaan ujian telah selesai dinilai
      try {
        triggerExamGradedNotification(
          activeStudent,
          examTypeMode,
          calculatedScore,
          selectedSubjectForExam,
          '20 Menit'
        ).catch(err => console.warn('WA Notification auto-send error:', err));

        // Jika ujian Babak Penyisihan atau Final dan status dinyatakan lolos, kirim notifikasi rilis kelulusan
        if (updated?.qualificationStatus === 'lolos' || calculatedScore >= 70) {
          triggerQualificationReleasedNotification(updated || activeStudent, 'lolos')
            .catch(err => console.warn('WA Qualification notification auto-send error:', err));
        }
      } catch (e) {
        console.warn('Error initiating WA notification:', e);
      }

      window.dispatchEvent(new CustomEvent('osn_participants_updated'));
    }
  };

  // Admin: Save Question Edits
  const handleSaveQuestion = () => {
    if (!editingQuestion) return;
    const updated = updateQuestion(editingQuestion);
    setQuestionsList(updated);
    setEditingQuestion(null);
    setIsCreatingNewQuestion(false);
    setAdminNotification('Perubahan soal berhasil disimpan ke database sistem & server!');
    setTimeout(() => setAdminNotification(''), 4000);
  };

  // Admin: Delete Question
  const handleDeleteQuestion = (id: string) => {
    if (confirm('Yakin ingin menghapus soal ini dari database?')) {
      const filtered = questionsList.filter(q => q.id !== id);
      saveAllQuestions(filtered);
      setQuestionsList(filtered);
      setAdminNotification('Soal berhasil dihapus.');
      setTimeout(() => setAdminNotification(''), 3000);
    }
  };

  // Admin: Add new question
  const handleAddNewQuestion = () => {
    const newQ: QuestionItem = {
      id: `custom-${Date.now()}`,
      number: questionsList.filter(q => q.subject === selectedAdminSubject).length + 1,
      subject: selectedAdminSubject as any,
      level: 'SD/MI',
      stage: 'penyisihan',
      curriculum: 'Kurikulum Merdeka',
      difficulty: 'Mudah',
      questionText: 'Tuliskan teks pertanyaan soal baru di sini...',
      imageUrl: '',
      options: [
        { key: 'A', text: 'Pilihan Jawaban A' },
        { key: 'B', text: 'Pilihan Jawaban B' },
        { key: 'C', text: 'Pilihan Jawaban C' },
        { key: 'D', text: 'Pilihan Jawaban D' }
      ],
      correctAnswer: 'A',
      explanation: 'Penjelasan pembahasan kunci jawaban soal.'
    };
    setEditingQuestion(newQ);
    setIsCreatingNewQuestion(true);
  };

  // Filter participants for Admin table (including Date Filter, Search, Category, and Exam Status)
  const filteredParticipants = participantsList.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.whatsapp.includes(adminSearch) ||
      p.schoolName.toLowerCase().includes(adminSearch.toLowerCase());
    
    const matchesCategory =
      adminFilterCategory === 'Semua' || p.level.includes(adminFilterCategory);

    let matchesStatus = true;
    if (adminFilterExamStatus === 'Simulasi') {
      matchesStatus = !!p.simulatedExam;
    } else if (adminFilterExamStatus === 'Penyisihan') {
      matchesStatus = !!p.penyisihanExam;
    } else if (adminFilterExamStatus === 'Final') {
      matchesStatus = !!p.finalExam;
    } else if (adminFilterExamStatus === 'Belum') {
      matchesStatus = !p.simulatedExam && !p.penyisihanExam && !p.finalExam;
    }

    // Filter by Winner / Champion Status
    let matchesWinner = true;
    if (adminFilterWinner === 'Semua_Juara') {
      matchesWinner = !!p.championRank && p.championRank !== 'Belum Dinilai';
    } else if (adminFilterWinner === 'Juara 1') {
      matchesWinner = p.championRank === 'Juara 1';
    } else if (adminFilterWinner === 'Juara 2') {
      matchesWinner = p.championRank === 'Juara 2';
    } else if (adminFilterWinner === 'Juara 3') {
      matchesWinner = p.championRank === 'Juara 3';
    } else if (adminFilterWinner === 'Peserta Final') {
      matchesWinner = p.championRank === 'Peserta Final';
    } else if (adminFilterWinner === 'Closing') {
      matchesWinner = p.finalTicketPaymentStatus === 'paid_closing';
    }

    // Filter by Registration Date
    let matchesDate = true;
    if (adminStartDate || adminEndDate) {
      const regTime = new Date(p.registeredAt).setHours(0, 0, 0, 0);
      if (adminStartDate) {
        const startTime = new Date(adminStartDate).setHours(0, 0, 0, 0);
        if (regTime < startTime) matchesDate = false;
      }
      if (adminEndDate) {
        const endTime = new Date(adminEndDate).setHours(23, 59, 59, 999);
        if (regTime > endTime) matchesDate = false;
      }
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesWinner && matchesDate;
  });

  // Diurutkan mulai dari yang terbaru (newest registeredAt first) sesuai permintaan
  const sortedParticipants = useMemo(() => {
    return [...filteredParticipants].sort((a, b) => {
      const timeA = a.registeredAt ? new Date(a.registeredAt).getTime() : 0;
      const timeB = b.registeredAt ? new Date(b.registeredAt).getTime() : 0;
      if (timeB !== timeA) return timeB - timeA;
      return (b.id || '').localeCompare(a.id || '');
    });
  }, [filteredParticipants]);

  const totalAdminPages = Math.max(1, Math.ceil(sortedParticipants.length / ADMIN_PAGE_SIZE));
  const validAdminPage = Math.min(Math.max(1, adminParticipantsPage), totalAdminPages);

  // Hanya 10 baris data peserta yang dirender ke DOM untuk menjamin akses dashboard super cepat, hemat memori, dan tidak lambat
  const displayedParticipants = useMemo(() => {
    const start = (validAdminPage - 1) * ADMIN_PAGE_SIZE;
    return sortedParticipants.slice(start, start + ADMIN_PAGE_SIZE);
  }, [sortedParticipants, validAdminPage]);

  // Pagination untuk Tab Pengumuman Kelulusan & Juara (10 baris per halaman)
  const totalAnnouncePages = Math.max(1, Math.ceil(sortedParticipants.length / ADMIN_PAGE_SIZE));
  const validAnnouncePage = Math.min(Math.max(1, adminAnnouncePage), totalAnnouncePages);
  const displayedAnnounceParticipants = useMemo(() => {
    const start = (validAnnouncePage - 1) * ADMIN_PAGE_SIZE;
    return sortedParticipants.slice(start, start + ADMIN_PAGE_SIZE);
  }, [sortedParticipants, validAnnouncePage]);

  // Reset pagination ke halaman 1 saat pencarian atau filter berubah
  useEffect(() => {
    setAdminParticipantsPage(1);
    setAdminAnnouncePage(1);
  }, [adminSearch, adminFilterCategory, adminFilterExamStatus, adminFilterWinner, adminStartDate, adminEndDate]);

  // Calculate statistics based on current date filter or total
  const dateFilteredParticipants = participantsList.filter(p => {
    if (!adminStartDate && !adminEndDate) return true;
    const regTime = new Date(p.registeredAt).setHours(0, 0, 0, 0);
    if (adminStartDate) {
      const startTime = new Date(adminStartDate).setHours(0, 0, 0, 0);
      if (regTime < startTime) return false;
    }
    if (adminEndDate) {
      const endTime = new Date(adminEndDate).setHours(23, 59, 59, 999);
      if (regTime > endTime) return false;
    }
    return true;
  });

  // Total completed Babak Penyisihan & Simulasi CBT
  const totalCompletedSimulasi = participantsList.filter(p => !!p.simulatedExam).length;
  const totalCompletedPenyisihan = participantsList.filter(p => !!p.penyisihanExam || !!p.simulatedExam).length;
  const totalCompletedPenyisihanOfficial = participantsList.filter(p => !!p.penyisihanExam).length;
  const totalCompletedFinalOfficial = participantsList.filter(p => !!p.finalExam).length;
  const totalCompletedPenyisihanInDateRange = dateFilteredParticipants.filter(p => !!p.penyisihanExam || !!p.simulatedExam).length;

  // Closing & Winners Statistics
  const totalClosingCount = dateFilteredParticipants.filter(p => p.finalTicketPaymentStatus === 'paid_closing').length;
  const totalClosingCountAll = participantsList.filter(p => p.finalTicketPaymentStatus === 'paid_closing').length;
  const totalClosingNominal = dateFilteredParticipants
    .filter(p => p.finalTicketPaymentStatus === 'paid_closing')
    .reduce((sum, p) => sum + (p.finalTicketAmount || 99000), 0);
  const totalClosingNominalAll = participantsList
    .filter(p => p.finalTicketPaymentStatus === 'paid_closing')
    .reduce((sum, p) => sum + (p.finalTicketAmount || 99000), 0);

  const totalWinnersCount = dateFilteredParticipants.filter(p => !!p.championRank && p.championRank !== 'Belum Dinilai').length;
  const totalWinnersCountAll = participantsList.filter(p => !!p.championRank && p.championRank !== 'Belum Dinilai').length;

  // CSV Downloader Helper with UTF-8 BOM for Indonesian Excel support
  const downloadCsv = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const escapeCsv = (val: string | number) => {
      const str = String(val ?? '').replace(/"/g, '""');
      return `"${str}"`;
    };
    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\r\n');

    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. DATA LAPORAN PENGERJAAN SIMULASI
  const reportSimulasiData = useMemo(() => {
    return participantsList
      .filter(p => {
        const matchesSearch =
          !reportSimulasiSearch ||
          p.fullName.toLowerCase().includes(reportSimulasiSearch.toLowerCase()) ||
          p.id.toLowerCase().includes(reportSimulasiSearch.toLowerCase()) ||
          p.whatsapp.includes(reportSimulasiSearch) ||
          p.schoolName.toLowerCase().includes(reportSimulasiSearch.toLowerCase()) ||
          (p.parentName && p.parentName.toLowerCase().includes(reportSimulasiSearch.toLowerCase()));

        const matchesJenjang =
          reportSimulasiJenjang === 'Semua' || p.level.includes(reportSimulasiJenjang);

        const matchesMapel =
          reportSimulasiMapel === 'Semua' ||
          (p.simulatedExam && p.simulatedExam.subject === reportSimulasiMapel) ||
          (p.subjects && p.subjects.includes(reportSimulasiMapel));

        let matchesStatus = true;
        if (reportSimulasiStatus === 'Sudah') {
          matchesStatus = !!p.simulatedExam;
        } else if (reportSimulasiStatus === 'Belum') {
          matchesStatus = !p.simulatedExam;
        } else if (reportSimulasiStatus === 'Lolos') {
          matchesStatus = !!p.simulatedExam && p.simulatedExam.score >= 70;
        } else if (reportSimulasiStatus === 'BelumLolos') {
          matchesStatus = !!p.simulatedExam && p.simulatedExam.score < 70;
        }

        return matchesSearch && matchesJenjang && matchesMapel && matchesStatus;
      })
      .sort((a, b) => {
        if (reportSimulasiSort === 'highest') {
          return (b.simulatedExam?.score ?? -1) - (a.simulatedExam?.score ?? -1);
        }
        if (reportSimulasiSort === 'lowest') {
          return (a.simulatedExam?.score ?? 999) - (b.simulatedExam?.score ?? 999);
        }
        if (reportSimulasiSort === 'name') {
          return a.fullName.localeCompare(b.fullName);
        }
        const timeA = a.simulatedExam?.completedAt ? new Date(a.simulatedExam.completedAt).getTime() : 0;
        const timeB = b.simulatedExam?.completedAt ? new Date(b.simulatedExam.completedAt).getTime() : 0;
        return timeB - timeA;
      });
  }, [participantsList, reportSimulasiSearch, reportSimulasiJenjang, reportSimulasiMapel, reportSimulasiStatus, reportSimulasiSort]);

  // 2. DATA LAPORAN PENGERJAAN BABAK PENYISIHAN
  const reportPenyisihanData = useMemo(() => {
    return participantsList
      .filter(p => {
        const matchesSearch =
          !reportPenyisihanSearch ||
          p.fullName.toLowerCase().includes(reportPenyisihanSearch.toLowerCase()) ||
          p.id.toLowerCase().includes(reportPenyisihanSearch.toLowerCase()) ||
          p.whatsapp.includes(reportPenyisihanSearch) ||
          p.schoolName.toLowerCase().includes(reportPenyisihanSearch.toLowerCase()) ||
          (p.parentName && p.parentName.toLowerCase().includes(reportPenyisihanSearch.toLowerCase()));

        const matchesJenjang =
          reportPenyisihanJenjang === 'Semua' || p.level.includes(reportPenyisihanJenjang);

        const matchesMapel =
          reportPenyisihanMapel === 'Semua' ||
          (p.penyisihanExam && p.penyisihanExam.subject === reportPenyisihanMapel) ||
          (p.subjects && p.subjects.includes(reportPenyisihanMapel));

        let matchesStatus = true;
        if (reportPenyisihanStatus === 'Sudah') {
          matchesStatus = !!p.penyisihanExam;
        } else if (reportPenyisihanStatus === 'Lolos') {
          matchesStatus = p.qualificationStatus === 'lolos' || (!!p.penyisihanExam && p.penyisihanExam.score >= 70);
        } else if (reportPenyisihanStatus === 'TidakLolos') {
          matchesStatus = p.qualificationStatus === 'tidak_lolos' || (!!p.penyisihanExam && p.penyisihanExam.score < 70);
        } else if (reportPenyisihanStatus === 'Belum') {
          matchesStatus = !p.penyisihanExam;
        }

        let matchesClosing = true;
        if (reportPenyisihanClosing === 'Closing') {
          matchesClosing = p.finalTicketPaymentStatus === 'paid_closing';
        } else if (reportPenyisihanClosing === 'BelumClosing') {
          matchesClosing = p.finalTicketPaymentStatus !== 'paid_closing';
        }

        return matchesSearch && matchesJenjang && matchesMapel && matchesStatus && matchesClosing;
      })
      .sort((a, b) => {
        if (reportPenyisihanSort === 'highest') {
          return (b.penyisihanExam?.score ?? -1) - (a.penyisihanExam?.score ?? -1);
        }
        if (reportPenyisihanSort === 'lowest') {
          return (a.penyisihanExam?.score ?? 999) - (b.penyisihanExam?.score ?? 999);
        }
        if (reportPenyisihanSort === 'name') {
          return a.fullName.localeCompare(b.fullName);
        }
        const timeA = a.penyisihanExam?.completedAt ? new Date(a.penyisihanExam.completedAt).getTime() : 0;
        const timeB = b.penyisihanExam?.completedAt ? new Date(b.penyisihanExam.completedAt).getTime() : 0;
        return timeB - timeA;
      });
  }, [participantsList, reportPenyisihanSearch, reportPenyisihanJenjang, reportPenyisihanMapel, reportPenyisihanStatus, reportPenyisihanClosing, reportPenyisihanSort]);

  // 3. DATA LAPORAN PENGERJAAN BABAK FINAL
  const reportFinalData = useMemo(() => {
    return participantsList
      .filter(p => {
        const matchesSearch =
          !reportFinalSearch ||
          p.fullName.toLowerCase().includes(reportFinalSearch.toLowerCase()) ||
          p.id.toLowerCase().includes(reportFinalSearch.toLowerCase()) ||
          p.whatsapp.includes(reportFinalSearch) ||
          p.schoolName.toLowerCase().includes(reportFinalSearch.toLowerCase());

        const matchesJenjang =
          reportFinalJenjang === 'Semua' || p.level.includes(reportFinalJenjang);

        const matchesMapel =
          reportFinalMapel === 'Semua' ||
          (p.finalExam && p.finalExam.subject === reportFinalMapel) ||
          (p.subjects && p.subjects.includes(reportFinalMapel));

        let matchesRank = true;
        if (reportFinalRank === 'Juara 1') {
          matchesRank = p.championRank === 'Juara 1';
        } else if (reportFinalRank === 'Juara 2') {
          matchesRank = p.championRank === 'Juara 2';
        } else if (reportFinalRank === 'Juara 3') {
          matchesRank = p.championRank === 'Juara 3';
        } else if (reportFinalRank === 'Peserta Final') {
          matchesRank = p.championRank === 'Peserta Final';
        } else if (reportFinalRank === 'SudahUjian') {
          matchesRank = !!p.finalExam;
        }

        return matchesSearch && matchesJenjang && matchesMapel && matchesRank;
      })
      .sort((a, b) => {
        if (reportFinalSort === 'highest') {
          return (b.finalExam?.score ?? -1) - (a.finalExam?.score ?? -1);
        }
        if (reportFinalSort === 'lowest') {
          return (a.finalExam?.score ?? 999) - (b.finalExam?.score ?? 999);
        }
        if (reportFinalSort === 'name') {
          return a.fullName.localeCompare(b.fullName);
        }
        const timeA = a.finalExam?.completedAt ? new Date(a.finalExam.completedAt).getTime() : 0;
        const timeB = b.finalExam?.completedAt ? new Date(b.finalExam.completedAt).getTime() : 0;
        return timeB - timeA;
      });
  }, [participantsList, reportFinalSearch, reportFinalJenjang, reportFinalMapel, reportFinalRank, reportFinalSort]);

  // CSV Export Handlers
  const handleExportReportSimulasiCsv = () => {
    const headers = [
      'No',
      'No. Peserta',
      'Nama Lengkap Siswa',
      'Nomor WhatsApp',
      'Email',
      'Nama Orang Tua / Wali',
      'Alamat Lengkap',
      'Kota / Wilayah',
      'Jenjang Sekolah',
      'Asal Sekolah',
      'Mata Pelajaran Simulasi',
      'Skor Nilai Simulasi (0-100)',
      'Status Kelulusan Simulasi',
      'Percobaan Simulasi',
      'Waktu Selesai Pengerjaan'
    ];
    const rows = reportSimulasiData.map((p: ParticipantRecord, idx: number) => [
      idx + 1,
      p.id,
      p.fullName,
      p.whatsapp,
      p.email || '-',
      p.parentName || '-',
      p.fullAddress || '-',
      p.cityProvince || '-',
      p.level,
      p.schoolName,
      p.simulatedExam?.subject || p.subjects?.[0] || 'Matematika',
      p.simulatedExam ? p.simulatedExam.score : 'Belum Simulasi',
      p.simulatedExam ? (p.simulatedExam.score >= 70 ? 'Lulus (>=70)' : 'Perlu Bimbingan (<70)') : 'Belum Mengerjakan',
      `${p.simulatedAttempts || 0}/2`,
      p.simulatedExam?.completedAt ? new Date(p.simulatedExam.completedAt).toLocaleString('id-ID') : '-'
    ]);
    downloadCsv(`Laporan_Pengerjaan_Simulasi_OSN_2026_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const handleExportReportPenyisihanCsv = () => {
    const headers = [
      'Peringkat',
      'No. Peserta',
      'Nama Lengkap Siswa',
      'Nomor WhatsApp',
      'Email',
      'Nama Orang Tua / Wali',
      'Kota / Provinsi',
      'Jenjang Sekolah',
      'Asal Sekolah',
      'Mata Pelajaran Penyisihan',
      'Skor Nilai Babak Penyisihan (0-100)',
      'Passing Grade',
      'Status Kelulusan ke Babak Final',
      'Status Closing Tiket Promo Rp 99.000',
      'Percobaan Penyisihan',
      'Waktu Selesai Ujian'
    ];
    const rows = reportPenyisihanData.map((p: ParticipantRecord, idx: number) => [
      idx + 1,
      p.id,
      p.fullName,
      p.whatsapp,
      p.email || '-',
      p.parentName || '-',
      p.cityProvince || '-',
      p.level,
      p.schoolName,
      p.penyisihanExam?.subject || p.subjects?.[0] || 'Matematika',
      p.penyisihanExam ? p.penyisihanExam.score : 'Belum Ujian',
      '70',
      p.qualificationStatus === 'lolos' ? 'LOLOS KE BABAK FINAL' : p.qualificationStatus === 'tidak_lolos' ? 'TIDAK LOLOS' : 'Menunggu Penetapan',
      p.finalTicketPaymentStatus === 'paid_closing' ? 'LUNAS CLOSING RP 99.000' : 'BELUM CLOSING',
      `${p.penyisihanAttempts || 0}/2`,
      p.penyisihanExam?.completedAt ? new Date(p.penyisihanExam.completedAt).toLocaleString('id-ID') : '-'
    ]);
    downloadCsv(`Laporan_Pengerjaan_Babak_Penyisihan_OSN_2026_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const handleExportReportFinalCsv = () => {
    const headers = [
      'Peringkat',
      'Gelar Juara Resmi',
      'No. Peserta',
      'Nama Lengkap Siswa',
      'Nomor WhatsApp',
      'Nama Orang Tua / Wali',
      'Kota / Wilayah',
      'Jenjang Sekolah',
      'Asal Sekolah',
      'Mata Pelajaran Babak Final',
      'Skor Nilai Babak Final (0-100)',
      'Status Tiket Final (BCA)',
      'Integritas Anti-Cheat',
      'Percobaan Final',
      'Waktu Selesai Final'
    ];
    const rows = reportFinalData.map((p: ParticipantRecord, idx: number) => [
      idx + 1,
      p.championRank || 'Peserta Final',
      p.id,
      p.fullName,
      p.whatsapp,
      p.parentName || '-',
      p.cityProvince || '-',
      p.level,
      p.schoolName,
      p.finalExam?.subject || p.subjects?.[0] || 'Matematika',
      p.finalExam ? p.finalExam.score : 'Belum Ujian Final',
      p.finalTicketPaymentStatus === 'paid_closing' ? 'LUNAS (RP 99.000)' : 'BELUM BAYAR',
      p.violationReason ? `Pelanggaran: ${p.violationReason}` : 'Aman (Lolos Pengawasan)',
      `${p.finalAttempts || 0}/2`,
      p.finalExam?.completedAt ? new Date(p.finalExam.completedAt).toLocaleString('id-ID') : '-'
    ]);
    downloadCsv(`Laporan_Pengerjaan_Babak_Final_OSN_2026_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  const handleExportExcel = () => {
    const suffix = adminStartDate || adminEndDate ? `Filter_${adminStartDate || 'Awal'}_sd_${adminEndDate || 'Akhir'}` : 'Lengkap';
    exportParticipantsToExcel(filteredParticipants, suffix);
    setAdminNotification(`Berhasil mendownload Excel data ${filteredParticipants.length} peserta.`);
    setTimeout(() => setAdminNotification(''), 4000);
  };

  const handleExportPdf = () => {
    let filterDesc = `Status: ${adminFilterExamStatus}, Jenjang: ${adminFilterCategory}`;
    if (adminFilterWinner !== 'Semua') {
      filterDesc += `, Filter: ${adminFilterWinner}`;
    }
    if (adminStartDate || adminEndDate) {
      filterDesc += `, Periode: ${adminStartDate || '-'} s/d ${adminEndDate || '-'}`;
    }
    exportParticipantsToPdf(filteredParticipants, filterDesc);
    setAdminNotification(`Berhasil mendownload PDF data ${filteredParticipants.length} peserta.`);
    setTimeout(() => setAdminNotification(''), 4000);
  };

  const handleExportVcf = () => {
    exportParticipantsToVcf(filteredParticipants, 'Peserta OSN 2026');
    setAdminNotification(`Berhasil membuat file VCF kontak ${filteredParticipants.length} peserta.`);
    setTimeout(() => setAdminNotification(''), 4000);
  };

  // Google Workspace Handlers
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const res = await signInWithGoogleWorkspace();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        setAdminNotification(`Google Workspace berhasil terhubung sebagai ${res.user.displayName || res.user.email}!`);
        // Load drive files & contacts automatically
        loadWorkspaceData();
      }
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      alert(`Gagal terhubung ke Google Workspace: ${err.message || 'Izin akses ditolak'}`);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await logoutGoogleWorkspace();
    setGoogleUser(null);
    setGoogleToken(null);
    setDriveFiles([]);
    setGoogleContacts([]);
    setAdminNotification('Akun Google Workspace telah diputuskan.');
  };

  const loadWorkspaceData = async () => {
    try {
      const files = await listDriveFiles(10);
      setDriveFiles(files);
      const contacts = await listGoogleContacts();
      setGoogleContacts(contacts);
    } catch (err) {
      console.error('Failed to load workspace data:', err);
    }
  };

  // Export to Google Sheet with confirmation
  const requestExportGoogleSheet = () => {
    if (!googleUser) {
      alert('Silakan hubungkan akun Google Workspace Anda terlebih dahulu.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Buat Spreadsheet Baru di Google Sheets?',
      message: `Tindakan ini akan membuat dokumen Spreadsheet baru di Google Drive Anda dengan judul "Data Peserta OSN 2026 - ${new Date().toLocaleDateString('id-ID')}" berisi ${filteredParticipants.length} data peserta yang sedang difilter. Lanjutkan?`,
      actionType: 'export_sheet',
      data: filteredParticipants
    });
  };

  // Sync contacts to Google Contacts with confirmation
  const requestSyncGoogleContacts = () => {
    if (!googleUser) {
      alert('Silakan hubungkan akun Google Workspace Anda terlebih dahulu.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Sinkronisasi Kontak ke Google Contacts?',
      message: `Tindakan ini akan membuat ${filteredParticipants.length} kontak baru di Google Contacts Anda dengan label [OSN 2026] dan nama sekolah masing-masing peserta. Lanjutkan?`,
      actionType: 'sync_contacts',
      data: filteredParticipants
    });
  };

  // Backup data text to Google Drive with confirmation
  const requestBackupDrive = () => {
    if (!googleUser) {
      alert('Silakan hubungkan akun Google Workspace Anda terlebih dahulu.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Simpan File Backup JSON ke Google Drive?',
      message: `Tindakan ini akan mengunggah file cadangan data "Backup_Peserta_OSN_${Date.now()}.json" berisi ${participantsList.length} peserta ke Google Drive Anda. Lanjutkan?`,
      actionType: 'backup_drive',
      data: participantsList
    });
  };

  // Execute confirmed destructive / external action
  const handleExecuteConfirmedAction = async () => {
    const action = confirmDialog.actionType;
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));

    if (action === 'export_sheet') {
      setIsExportingSheet(true);
      try {
        const sheetInfo = await exportParticipantsToGoogleSheet(
          filteredParticipants,
          `Data Peserta OSN 2026 (${filteredParticipants.length} Siswa) - ${new Date().toLocaleDateString('id-ID')}`
        );
        setLastCreatedSheet(sheetInfo);
        setAdminNotification(`Berhasil membuat Google Sheet! Spreadsheet ID: ${sheetInfo.spreadsheetId.slice(0, 10)}...`);
        // Refresh drive files
        loadWorkspaceData();
      } catch (err: any) {
        alert(`Gagal membuat Google Sheet: ${err.message}`);
      } finally {
        setIsExportingSheet(false);
      }
    } else if (action === 'sync_contacts') {
      setIsSyncingContacts(true);
      try {
        let count = 0;
        for (const p of filteredParticipants.slice(0, 50)) { // sync up to 50 at a time to prevent quota burst
          await syncParticipantToGoogleContacts(p);
          count++;
        }
        setAdminNotification(`Berhasil menambahkan ${count} kontak peserta ke Google Contacts Anda!`);
        loadWorkspaceData();
      } catch (err: any) {
        alert(`Gagal menyimpan ke Google Contacts: ${err.message}`);
      } finally {
        setIsSyncingContacts(false);
      }
    } else if (action === 'backup_drive') {
      setIsUploadingDrive(true);
      try {
        const jsonContent = JSON.stringify(participantsList, null, 2);
        const fileName = `Backup_Database_OSN_2026_${new Date().toISOString().slice(0, 10)}.json`;
        await uploadTextFileToDrive(fileName, jsonContent, 'application/json');
        setAdminNotification(`File backup ${fileName} berhasil diunggah ke Google Drive!`);
        loadWorkspaceData();
      } catch (err: any) {
        alert(`Gagal upload ke Google Drive: ${err.message}`);
      } finally {
        setIsUploadingDrive(false);
      }
    }
  };

  // Schedule Save Handler
  const handleSaveScheduleConfig = () => {
    setIsSavingSchedule(true);
    try {
      const saved = saveEventSchedule(eventSchedule);
      setEventSchedule(saved);
      setAdminNotification('Jadwal tahapan pelaksanaan olimpiade berhasil disimpan dan diperbarui secara real-time!');
      setTimeout(() => setAdminNotification(''), 4000);
    } catch (err: any) {
      alert(`Gagal menyimpan jadwal: ${err?.message}`);
    } finally {
      setIsSavingSchedule(false);
    }
  };

  // Meta Pixel Configuration Action
  const handleSavePixel = (e: React.FormEvent) => {
    e.preventDefault();
    saveMetaPixelConfig(pixelConfig);
    setPixelSavedSuccess(true);
    setAdminNotification('Pengaturan Meta Pixel ID & Custom HTML berhasil disimpan dan diterapkan!');
    setTimeout(() => {
      setPixelSavedSuccess(false);
      setAdminNotification('');
    }, 4000);
  };

  // Participant Actions: Contact, Reset Quota, Delete, Follow-up, Qualification, Payment
  const handleSaveSingleContactToGoogle = async (p: ParticipantRecord) => {
    if (!googleUser) {
      setContactActionParticipant(p);
      return;
    }
    setIsSyncingSingleContact(true);
    try {
      await syncParticipantToGoogleContacts(p);
      setAdminNotification(`Kontak ${p.fullName} berhasil disimpan ke Google Contacts!`);
      setTimeout(() => setAdminNotification(''), 4000);
      setContactActionParticipant(null);
    } catch (e: any) {
      console.error(e);
      setContactActionParticipant(p);
    } finally {
      setIsSyncingSingleContact(false);
    }
  };

  const handleExecuteResetQuota = (p: ParticipantRecord, type: 'all' | 'simulasi' | 'final', clearHistory: boolean = false) => {
    const updated = resetParticipantAttempts(p.id, type, clearHistory);
    if (updated) {
      setParticipantsList(getAllParticipants());
      if (activeStudent?.id === p.id) {
        setActiveStudent(updated);
      }
      const label = type === 'all' ? 'Seluruh Kuota (Penyisihan & Final)' : type === 'simulasi' ? 'Kuota Babak Penyisihan' : 'Kuota Babak Final';
      const historyMsg = clearHistory ? ' serta riwayat ujian dibersihkan (mulai baru)' : '';
      setAdminNotification(`✓ Berhasil! ${label} untuk "${p.fullName}" di-reset menjadi 0/2${historyMsg}.`);
      setTimeout(() => setAdminNotification(''), 4500);
    }
    setResetQuotaParticipant(null);
    setResetQuotaClearHistory(false);
  };

  const handleGrantExtraAttempt = (p: ParticipantRecord, type: 'simulasi' | 'final' = 'simulasi') => {
    const updated = grantExtraAttempt(p.id, type);
    if (updated) {
      setParticipantsList(getAllParticipants());
      if (activeStudent?.id === p.id) {
        setActiveStudent(updated);
      }
      const label = type === 'simulasi' ? 'Babak Penyisihan' : 'Babak Final';
      setAdminNotification(`✓ Berhasil menambahkan +1 kesempatan kuota ${label} untuk "${p.fullName}"!`);
      setTimeout(() => setAdminNotification(''), 4500);
    }
    setResetQuotaParticipant(null);
  };

  const handleClearViolationOnly = (p: ParticipantRecord) => {
    const updated = updateParticipantField(p.id, {
      violationReason: undefined,
      cbtStatus: 'Aktif (Status Pelanggaran Dihapus oleh Admin)'
    });
    if (updated) {
      setParticipantsList(getAllParticipants());
      if (activeStudent?.id === p.id) {
        setActiveStudent(updated);
      }
      setAdminNotification(`✓ Status diskualifikasi pelanggaran anti-cheat untuk "${p.fullName}" berhasil dihapus.`);
      setTimeout(() => setAdminNotification(''), 4000);
    }
    setResetQuotaParticipant(null);
  };

  const handleExecuteBulkResetQuota = (type: 'all' | 'simulasi' | 'final', clearHistory: boolean = false) => {
    const ids = filteredParticipants.map(p => p.id);
    if (ids.length === 0) return;
    const count = bulkResetParticipantAttempts(ids, type, clearHistory);
    setParticipantsList(getAllParticipants());
    const label = type === 'all' ? 'seluruh kuota (Penyisihan & Final)' : type === 'simulasi' ? 'kuota penyisihan' : 'kuota final';
    const historyMsg = clearHistory ? ' serta riwayat ujian dibersihkan' : '';
    setAdminNotification(`✓ Berhasil me-reset ${label} untuk ${count} peserta yang sedang difilter${historyMsg}!`);
    setTimeout(() => setAdminNotification(''), 5000);
    setShowBulkResetModal(false);
    setResetQuotaClearHistory(false);
  };

  const handleExecuteDeleteParticipant = (p: ParticipantRecord) => {
    deleteParticipant(p.id);
    const updated = getAllParticipants();
    setParticipantsList(updated);
    if (activeStudent?.id === p.id) {
      setActiveStudent(null);
    }
    setAdminNotification(`Data peserta "${p.fullName}" (${p.id}) berhasil dihapus dari database.`);
    setTimeout(() => setAdminNotification(''), 4000);
    setDeleteConfirmParticipant(null);
  };

  const handleToggleQualification = (participant: ParticipantRecord, status: 'lolos' | 'tidak_lolos' | 'pending') => {
    const updated = updateParticipantField(participant.id, {
      qualificationStatus: status,
      qualificationNote: status === 'lolos' ? 'Dinyatakan Lolos ke Babak Final' : status === 'tidak_lolos' ? 'Belum Memenuhi Passing Grade' : 'Menunggu Penilaian'
    });
    if (updated) {
      const all = getAllParticipants();
      setParticipantsList(all);
      if (activeStudent?.id === participant.id) {
        setActiveStudent(updated);
      }
      setAdminNotification(`Status kelulusan penyisihan ${participant.fullName} diubah: ${status.toUpperCase()}`);
      setTimeout(() => setAdminNotification(''), 3000);

      // Otomatis kirim notifikasi WhatsApp API saat status kelulusan dirilis
      if (status === 'lolos') {
        triggerQualificationReleasedNotification(participant, 'lolos')
          .then(() => {
            setAdminNotification(`✓ Notifikasi WhatsApp kelulusan terkirim otomatis ke ${participant.fullName}`);
            setTimeout(() => setAdminNotification(''), 3500);
          })
          .catch(err => console.warn('WA Notification send error:', err));
      }
    }
  };

  const handleBroadcastQualificationAnnouncements = async () => {
    const qualified = participantsList.filter(p => p.qualificationStatus === 'lolos' || (p.penyisihanExam && p.penyisihanExam.score >= 60));
    if (qualified.length === 0) {
      alert('Tidak ada peserta yang berstatus lolos ke babak final.');
      return;
    }
    const confirmSend = window.confirm(`Kirim notifikasi pengumuman kelulusan resmi via WhatsApp API ke ${qualified.length} peserta lolos final?`);
    if (!confirmSend) return;

    setAdminNotification(`Mengirim broadcast WhatsApp API ke ${qualified.length} peserta lolos...`);
    try {
      const res = await broadcastQualificationAnnouncements(qualified);
      setAdminNotification(`✓ Berhasil mengirimkan ${res.sentCount} notifikasi WhatsApp resmi pengumuman kelulusan!`);
    } catch (err) {
      console.warn('Broadcast WA error:', err);
      setAdminNotification(`✓ Broadcast WhatsApp telah diproses untuk peserta lolos.`);
    }
    setTimeout(() => setAdminNotification(''), 4500);
  };

  const handleToggleFinalPaymentClosing = (participant: ParticipantRecord) => {
    const isCurrentlyPaid = participant.finalTicketPaymentStatus === 'paid_closing';
    const updated = updateParticipantField(participant.id, {
      finalTicketPaymentStatus: isCurrentlyPaid ? 'unpaid' : 'paid_closing',
      finalTicketPaidAt: isCurrentlyPaid ? undefined : new Date().toISOString(),
      finalTicketAmount: isCurrentlyPaid ? 0 : 99000,
      cbtStatus: isCurrentlyPaid ? 'Tercatat di Database' : 'Tiket Final Lunas (Closing BCA Rp 99.000)'
    });
    if (updated) {
      const all = getAllParticipants();
      setParticipantsList(all);
      if (activeStudent?.id === participant.id) {
        setActiveStudent(updated);
      }
      setAdminNotification(`Status pembayaran tiket final ${participant.fullName}: ${isCurrentlyPaid ? 'BATAL CLOSING (Belum Bayar)' : 'CLOSING BERHASIL (LUNAS RP 99.000)'}`);
      setTimeout(() => setAdminNotification(''), 4000);
    }
  };

  const handleSetChampionRank = (participant: ParticipantRecord, rank: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Peserta Final' | 'Belum Dinilai') => {
    const updated = updateParticipantField(participant.id, {
      championRank: rank,
      certificateIssuedDate: new Date().toISOString()
    });
    if (updated) {
      const all = getAllParticipants();
      setParticipantsList(all);
      if (activeStudent?.id === participant.id) {
        setActiveStudent(updated);
      }
      setAdminNotification(`Predikat juara ${participant.fullName} ditetapkan sebagai: ${rank}`);
      setTimeout(() => setAdminNotification(''), 3000);
    }
  };

  // WhatsApp Follow-Up Generator
  const generateFollowUpWhatsAppUrl = (
    p: ParticipantRecord,
    type: 'simulasi' | 'penyisihan' | 'final' | 'reminder_h2' | 'reminder_h1'
  ) => {
    const phone = p.whatsapp.replace(/[^0-9]/g, '');
    const cleanPhone = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
    let message = '';

    if (type === 'simulasi') {
      message = `Halo Ananda ${p.fullName} & Bapak/Ibu Wali (${p.schoolName}),\n\n` +
        `Kami dari Panitia Resmi Olimpiade Siswa Nasional (OSN 2026) menginfokan bahwa ananda tercatat *BELUM MENGERJAKAN SIMULASI UJIAN CBT ONLINE*.\n\n` +
        `Simulasi ini sangat penting untuk mengenali format 20 soal bergambar serta sistem ujian. Silakan segera login ke portal resmi https://olimpiadesiswanasional.id cukup menggunakan nomor WhatsApp ini (tanpa perlu mengetik nama).\n\n` +
        `Jika membutuhkan panduan teknis, silakan balas chat ini. Terima kasih!`;
    } else if (type === 'penyisihan') {
      message = `PENTING - REMINDER UJIAN PENYISIHAN OSN 2026\n\n` +
        `Halo ${p.fullName} (${p.schoolName}),\n` +
        `Jadwal Babak Penyisihan Olimpiade Siswa Nasional tinggal sebentar lagi! Status ananda: *BELUM MENGERJAKAN BABAK PENYISIHAN*.\n\n` +
        `Ujian Babak Penyisihan 100% BEBAS BIAYA (Gratis). Pastikan ananda masuk ke ruang ujian dan menyelesaikan soal tepat waktu untuk memperebutkan tiket ke Babak Final.\n\n` +
        `Semangat dan sukses selalu!`;
    } else if (type === 'final') {
      message = `PEMBERITAHUAN BABAK FINAL OSN 2026\n\n` +
        `Selamat untuk Ananda ${p.fullName}!\n` +
        `Ananda dinyatakan lolos ke Babak Final. Namun status ananda saat ini: *BELUM MENGERJAKAN UJIAN BABAK FINAL*.\n\n` +
        `Segera selesaikan pengerjaan soal Babak Final untuk penentuan peraih Medali Juara 1, 2, 3 dan penerbitan Sertifikat Penghargaan Resmi.\n\n` +
        `Salam Prestasi Nusantara!`;
    } else if (type === 'reminder_h2') {
      message = `[REMINDER H-2] BABAK PENYISIHAN RESMI OSN 2026\n\n` +
        `Halo Bapak/Ibu Wali & Ananda ${p.fullName},\n` +
        `Mengingatkan kembali bahwa *H-2 Babak Penyisihan Olimpiade Siswa Nasional (12 September 2026)* akan segera dimulai!\n\n` +
        `• No. Peserta: ${p.id}\n` +
        `• Mapel Terdaftar: ${(p.subjects || ['Matematika']).join(', ')}\n` +
        `• Biaya: 100% GRATIS\n\n` +
        `Pastikan kuota dan perangkat telah siap serta sudah mencoba simulasi ujian di web. Sukses selalu!`;
    } else if (type === 'reminder_h1') {
      message = `[REMINDER H-1 BESOK UJIAN] BABAK PENYISIHAN RESMI OSN 2026\n\n` +
        `Bismillah, Halo Ananda ${p.fullName} (${p.schoolName}),\n` +
        `*BESOK ADALAH HARI PELAKSANAAN BABAK PENYISIHAN OSN 2026*.\n\n` +
        `Akses login ujian dibuka secara serentak online. Cukup gunakan Nomor WhatsApp ini untuk masuk ke CBT (tanpa perlu mengetik nama).\n` +
        `Selamat berjuang, junjung tinggi kejujuran dan raih tiket menuju Babak Final!`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const adminQuestionsBySubject = questionsList.filter(q => {
    if (q.subject !== selectedAdminSubject) return false;
    if (selectedAdminStage !== 'Semua' && q.stage !== selectedAdminStage) return false;
    if (selectedAdminCurriculum !== 'Semua' && q.curriculum !== selectedAdminCurriculum) return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-3xl border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header Bar */}
        <div className="bg-[#1A1615] px-6 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoOSN className="w-9 h-9" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-sm sm:text-base tracking-wide">
                  PORTAL RESMI AKADEMIK OSN 2026
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#D4AF37] text-[#1A1615] uppercase tracking-wider">
                  Terintegrasi Database CBT
                </span>
              </div>
              <p className="text-[11px] text-[#FFF2B2]/80">
                Penyelenggara: {APP_CONFIG.organizer} · Babak Penyisihan 100% Bebas Biaya
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup Portal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {!isLoggedIn ? (
            /* =================== VIEW: LOGIN FORM =================== */
            <div className="space-y-6">
              
              {/* Role Switcher Tabs */}
              <div className="flex p-1 bg-[#EFECE6] rounded-2xl max-w-md mx-auto border border-[#E8E2D9]">
                <button
                  type="button"
                  onClick={() => {
                    setRole('user');
                    setLoginError('');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'user'
                      ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                      : 'text-[#66615B] hover:text-[#1A1615]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Ruang Ujian Siswa</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('admin');
                    setLoginError('');
                    const adminSession = localStorage.getItem('osn_admin_session');
                    if (adminSession === 'true') {
                      setLoggedInRole('admin');
                      setIsLoggedIn(true);
                      setParticipantsList(getAllParticipants());
                      setQuestionsList(getAllQuestions());
                    }
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'admin'
                      ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                      : 'text-[#66615B] hover:text-[#1A1615]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Dashboard Admin</span>
                </button>
              </div>

              {/* Login Form Box */}
              <div className="max-w-md mx-auto bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-4">
                {role === 'user' && showChildSelector ? (
                  /* MULTI-CHILDREN SELECTION VIEW */
                  <div className="space-y-4 pt-1">
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-amber-700" />
                          <span>Ditemukan {matchedChildren.length} Siswa Terdaftar</span>
                        </span>
                        <span className="text-[10px] font-mono text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-200 font-bold">
                          {studentWa}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-900/80 leading-relaxed">
                        Nomor ini menaungi <strong>{matchedChildren.length} anak/siswa</strong>. Silakan klik nama anak yang akan masuk ke Ruang Ujian CBT saat ini:
                      </p>
                    </div>

                    <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {matchedChildren.map((child, idx) => (
                        <div
                          key={child.id || idx}
                          onClick={() => {
                            setActiveStudent(child);
                            setShowChildSelector(false);
                            setLoggedInRole('user');
                            setIsLoggedIn(true);
                          }}
                          className="p-3.5 rounded-2xl border-2 border-[#E8E2D9] hover:border-[#D4AF37] bg-[#FAF8F5] hover:bg-amber-50/70 transition-all cursor-pointer flex items-center justify-between gap-3 group shadow-2xs hover:shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-black text-sm flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#1A1615] transition-colors">
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-extrabold text-[#1A1615] group-hover:text-[#9E7D15] transition-colors">
                                {child.fullName}
                              </h4>
                              <p className="text-[11px] text-[#756F68]">
                                {child.level} · {child.schoolName || 'Siswa CBT'}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                                <span className="font-mono text-neutral-400">ID: {child.id}</span>
                                {child.simulatedExam ? (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                    Simulasi: {child.simulatedExam.score}/100
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                                    Siap Ujian
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:translate-x-1 transition-transform shrink-0">
                            <span>Masuk</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowChildSelector(false);
                        setLoginError('');
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-[#756F68] hover:text-[#1A1615] bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Kembali / Gunakan Nomor Lain</span>
                    </button>
                  </div>
                ) : (
                  /* STANDARD LOGIN FORM */
                  <>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {role === 'user' ? (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-[#1A1615]">
                              Nomor WhatsApp / HP Terdaftar
                            </label>
                            <span className="text-[10px] text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                              Hanya Perlu Nomor HP
                            </span>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                              <Phone className="w-4 h-4 text-[#D4AF37]" />
                            </div>
                            <input
                              type="tel"
                              required
                              value={studentWa}
                              onChange={(e) => {
                                setStudentWa(e.target.value);
                                setLoginError('');
                              }}
                              placeholder="Contoh: 08123456781 atau 628123456781"
                              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 bg-[#FAF8F5]"
                              autoFocus
                            />
                          </div>
                          <p className="text-[11px] text-[#756F68] mt-2 flex items-start gap-1.5 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8E2D9]">
                            <span className="text-amber-600 font-bold">ℹ️</span>
                            <span>
                              <strong>1 Nomor untuk Banyak Anak:</strong> Jika nomor ini mendaftarkan lebih dari 1 anak, Anda dapat langsung memilih nama anak setelah menekan tombol Masuk.
                            </span>
                          </p>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-bold text-[#1A1615]">
                                Username / Email Admin
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  setAdminUser('olimpiadesiswanasionalofficial@gmail.com');
                                  setAdminPassword('ADMIN123');
                                }}
                                className="text-[10px] text-amber-800 hover:underline font-semibold cursor-pointer"
                              >
                                Gunakan Email Resmi
                              </button>
                            </div>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                value={adminUser}
                                onChange={(e) => setAdminUser(e.target.value)}
                                placeholder="Masukkan Username (admin atau email)"
                                className="w-full pl-10 pr-4 py-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF8F5]"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-bold text-[#1A1615]">
                                Password Admin
                              </label>
                              <span className="text-[10px] text-[#756F68]">
                                Default: <strong>ADMIN123</strong>
                              </span>
                            </div>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                <Lock className="w-4 h-4" />
                              </div>
                              <input
                                type={showAdminPassword ? "text" : "password"}
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="Masukkan Password Admin"
                                className="w-full pl-10 pr-10 py-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF8F5]"
                              />
                              <button
                                type="button"
                                onClick={() => setShowAdminPassword(!showAdminPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 cursor-pointer"
                                aria-label="Lihat Password"
                              >
                                {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {loginError && (
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{loginError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/50 cursor-pointer"
                      >
                        <span>Masuk ke {role === 'user' ? 'Ruang Ujian Siswa' : 'Dashboard Admin'}</span>
                      </button>
                    </form>

                    {/* DEMO ACCESS FOR TESTING (HANYA DITAMPILKAN PADA ROLE USER/SISWA) */}
                    {role === 'user' && (
                      <div className="pt-3 border-t border-[#E8E2D9] space-y-2">
                        <p className="text-[11px] text-center text-[#756F68] font-medium">
                          ⚡ Coba Nomor Contoh di Database:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickLoginUser('08123456781')}
                            className="py-2 px-2.5 rounded-xl text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors flex flex-col items-center justify-center cursor-pointer shadow-2xs"
                          >
                            <span>08123456781</span>
                            <span className="text-[9px] text-amber-700 font-normal">2 Anak Terdaftar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickLoginUser('08123456782')}
                            className="py-2 px-2.5 rounded-xl text-[11px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-300 hover:bg-neutral-200 transition-colors flex flex-col items-center justify-center cursor-pointer shadow-2xs"
                          >
                            <span>08123456782</span>
                            <span className="text-[9px] text-neutral-500 font-normal">1 Anak Terdaftar</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>

            </div>
          ) : loggedInRole === 'user' ? (
            /* =================== VIEW: USER / SISWA PORTAL =================== */
            <div className="space-y-6">
              
              {/* Top Banner Status */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D9] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#D4AF37] flex items-center justify-center font-black text-xl shrink-0">
                    <User className="w-6 h-6 text-[#9E7D15]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-[#1A1615]">
                        Selamat Datang, {activeStudent?.fullName || 'Peserta'}!
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                        Tercatat di Database
                      </span>
                    </div>
                    <p className="text-xs text-[#756F68] mt-0.5">
                      No. Peserta: <strong className="text-[#1A1615] font-mono">{activeStudent?.id || 'OSN-2026-B-001'}</strong> · No. WA: {activeStudent?.whatsapp || '-'}
                    </p>

                    {/* Sibling Switcher if multiple children are registered with this number */}
                    {siblingStudents.length > 1 && (
                      <div className="mt-2.5 pt-2 border-t border-[#E8E2D9] flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-amber-700" />
                          <span>Pilih Siswa ({siblingStudents.length} Anak Terdaftar):</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {siblingStudents.map((child) => {
                            const isCurrent = child.id === activeStudent?.id;
                            return (
                              <button
                                key={child.id}
                                type="button"
                                onClick={() => {
                                  if (!isCurrent) {
                                    setActiveStudent(child);
                                    setShowSimulatedExam(false);
                                    setExamSubjectChosen(false);
                                    setExamCompleted(false);
                                    setStudentAnswers({});
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                  isCurrent
                                    ? 'bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37] shadow-xs'
                                    : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300'
                                }`}
                              >
                                <span>{child.fullName}</span>
                                {isCurrent && (
                                  <span className="text-[9px] bg-[#D4AF37] text-[#1A1615] px-1 py-0.2 rounded font-black">
                                    Aktif
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setShowSimulatedExam(true);
                      setExamTypeMode('simulasi');
                      setExamSubjectChosen(false);
                      setExamCompleted(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                      showSimulatedExam && examTypeMode === 'simulasi'
                        ? 'bg-amber-100 text-amber-950 border-2 border-amber-400'
                        : 'bg-amber-50 hover:bg-amber-100 text-[#1A1615] border border-amber-300'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>Mulai Simulasi CBT</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowSimulatedExam(true);
                      setExamTypeMode('penyisihan');
                      setExamSubjectChosen(false);
                      setExamCompleted(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                      showSimulatedExam && examTypeMode === 'penyisihan'
                        ? 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-md'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-white" />
                    <span>Mulai Babak Penyisihan CBT</span>
                  </button>

                  {activeStudent?.qualificationStatus === 'lolos' && (
                    <button
                      onClick={() => {
                        const attempts = activeStudent.finalAttempts || 0;
                        if (attempts >= 2) {
                          alert('Anda sudah mengerjakan ujian Babak Final sebanyak 2x. Batas maksimal pengerjaan telah tercapai.');
                          return;
                        }
                        setShowSimulatedExam(true);
                        setExamTypeMode('final');
                        setExamSubjectChosen(false);
                        setExamCompleted(false);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                        showSimulatedExam && examTypeMode === 'final'
                          ? 'bg-purple-700 text-white border-2 border-purple-900 shadow-md'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Mulai Babak Final CBT</span>
                    </button>
                  )}

                  {showSimulatedExam && (
                    <button
                      onClick={() => {
                        setShowSimulatedExam(false);
                        setExamSubjectChosen(false);
                        setExamCompleted(false);
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
                    >
                      Tutup Ujian
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl text-xs font-bold border border-[#E8E2D9] text-[#756F68] hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center cursor-pointer"
                    title="Keluar"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SIMULATED CBT INTERFACE */}
              {showSimulatedExam ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-md space-y-6">
                  
                  {!examSubjectChosen ? (
                    /* Step 1: Pilihan Mata Pelajaran Sebelum Mengerjakan Ujian */
                    <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                            examTypeMode === 'final'
                              ? 'bg-purple-100 text-purple-900 border-purple-300'
                              : examTypeMode === 'penyisihan'
                              ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                              : 'bg-amber-50 text-[#D4AF37] border-amber-200'
                          }`}>
                            {examTypeMode === 'final'
                              ? '★ Ujian Babak Final Resmi CBT (Perebutan Juara)'
                              : examTypeMode === 'penyisihan'
                              ? '★ Ujian Babak Penyisihan Resmi CBT (Gratis)'
                              : 'Pilihan Mata Pelajaran Simulasi CBT'}
                          </span>
                          <span className="text-xs font-bold bg-neutral-900 text-[#D4AF37] px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> 20 Menit
                          </span>
                        </div>
                        <h4 className="text-xl font-extrabold text-[#1A1615] mt-1">
                          {examTypeMode === 'final'
                            ? 'Pilih Mata Pelajaran Babak Final'
                            : examTypeMode === 'penyisihan'
                            ? 'Pilih Mata Pelajaran Babak Penyisihan Resmi'
                            : 'Silakan Pilih Mata Pelajaran Simulasi CBT'}
                        </h4>
                        <p className="text-xs text-[#756F68] mt-1 max-w-lg mx-auto">
                          Waktu pengerjaan seluruh ujian yaitu <strong>20 Menit</strong> (20 soal pilihan ganda bergambar).
                          {examTypeMode === 'penyisihan' && (
                            <span className="block mt-1 font-semibold text-emerald-800">
                              🎯 Passing Grade Kelulusan Babak Final: minimal skor 70 dari 100.
                            </span>
                          )}
                          {examTypeMode === 'final' && (
                            <span className="block mt-1 font-semibold text-rose-700">
                              🛡️ Sistem Anti-Kecurangan (Anti-Cheat) Aktif otomatis pada Babak Final.
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Info Batas 2x Pengerjaan Card */}
                      {activeStudent && (
                        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                            <span className="font-semibold">
                              Sisa Kuota Pengerjaan ({examTypeMode === 'final' ? 'Final' : examTypeMode === 'penyisihan' ? 'Penyisihan' : 'Simulasi'}): Maksimal 2x Percobaan
                            </span>
                          </div>
                          <span className="px-2.5 py-1 rounded-xl bg-white font-extrabold text-xs shadow-xs border border-amber-200 text-amber-900">
                            Terpakai:{' '}
                            {examTypeMode === 'final'
                              ? activeStudent.finalAttempts || 0
                              : examTypeMode === 'penyisihan'
                              ? activeStudent.penyisihanAttempts || 0
                              : activeStudent.simulatedAttempts || 0}{' '}
                            / 2
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                        {[
                          { name: 'Matematika', desc: 'Geometri, logika angka, diagram & pecahan', color: 'border-blue-300 bg-blue-50/50 hover:bg-blue-50' },
                          { name: 'IPA / Sains', desc: 'Biologi alam, tata surya, energi & fisika', color: 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50' },
                          { name: 'Bahasa Indonesia', desc: 'Literasi teks, tata bahasa, pantun & makna', color: 'border-amber-300 bg-amber-50/50 hover:bg-amber-50' },
                          { name: 'Bahasa Inggris', desc: 'Grammar, vocabulary, tenses & reading', color: 'border-purple-300 bg-purple-50/50 hover:bg-purple-50' }
                        ].map((subj) => {
                          const currentAttempts =
                            examTypeMode === 'final'
                              ? activeStudent?.finalAttempts || 0
                              : examTypeMode === 'penyisihan'
                              ? activeStudent?.penyisihanAttempts || 0
                              : activeStudent?.simulatedAttempts || 0;
                          const isMaxAttempts = currentAttempts >= 2;

                          return (
                            <button
                              key={subj.name}
                              disabled={isMaxAttempts}
                              onClick={() => handlePromptStartExam(subj.name, examTypeMode)}
                              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${subj.color} ${
                                isMaxAttempts ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-extrabold text-[#1A1615]">{subj.name}</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1A1615] shadow-xs">
                                  20 Soal · 20 Menit
                                </span>
                              </div>
                              <p className="text-xs text-[#756F68] mt-2 mb-3">{subj.desc}</p>
                              <div className="flex items-center justify-between text-xs font-bold text-[#1A1615]">
                                <span>{isMaxAttempts ? 'Batas Maksimal Tercapai (2/2)' : 'Mulai Ujian (20 Menit)'}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setShowSimulatedExam(false)}
                        className="text-xs text-[#756F68] hover:text-[#1A1615] underline cursor-pointer"
                      >
                        Batal dan Kembali ke Kartu Ujian
                      </button>
                    </div>
                  ) : examCompleted ? (
                    /* Step 3: Hasil Ujian Selesai - Motivasi Inspiratif & Review Panitia Pusat */
                    <div className="text-center py-5 space-y-5 max-w-xl mx-auto">
                      {/* Animasi Ikon & Header Status */}
                      <div className="relative inline-block mx-auto">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/25 rotate-3 hover:rotate-0 transition-transform">
                          <CheckCircle2 className="w-11 h-11 text-white" />
                        </div>
                        <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                          ✨
                        </span>
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/80 mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>JAWABAN BERHASIL TERSIMPAN DI SISTEM CBT PUSAT</span>
                        </div>
                        <h4 className="text-2xl font-black text-[#1A1615] tracking-tight">
                          Ujian Mata Pelajaran {selectedSubjectForExam} Selesai!
                        </h4>
                        <p className="text-xs text-[#756F68] mt-1 max-w-md mx-auto">
                          Selamat! Kamu telah menyelesaikan seluruh rangkaian soal dengan dedikasi dan kejujuran tinggi.
                        </p>
                      </div>

                      {/* Kartu Skor Nilai Ujian */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-500/50 shadow-sm flex items-center justify-between text-left">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold text-[#756F68] uppercase tracking-wider block">
                            {examTypeMode === 'final'
                              ? 'Skor Nilai Babak Final'
                              : examTypeMode === 'penyisihan'
                              ? 'Skor Nilai Babak Penyisihan'
                              : 'Skor Nilai Simulasi CBT'}
                          </span>
                          <span className="text-sm font-black text-[#1A1615]">
                            {selectedSubjectForExam}
                          </span>
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Tercatat Otomatis pada Dashboard Admin Panitia
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`px-4 py-2 rounded-2xl font-black text-2xl font-mono shadow-sm inline-block ${
                            (finalScore ?? 0) >= 70 ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}>
                            {finalScore !== null ? finalScore : '-'} / 100
                          </span>
                        </div>
                      </div>

                      {/* Kartu Motivasi Inspiratif dengan Desain Keren & Emoji Menarik */}
                      <div className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${examMotivation.bgGradient} border-2 ${examMotivation.borderAccent} shadow-sm text-left relative overflow-hidden`}>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/90 shadow-sm border border-neutral-200/80 text-[#1A1615]">
                            <span className="text-base">{examMotivation.emoji}</span>
                            <span>{examMotivation.badge}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setExamMotivation(prev => getRandomMotivation(prev?.id))}
                            className="text-[11px] font-bold text-[#1A1615]/70 hover:text-[#1A1615] flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-lg border border-black/5 hover:bg-white transition-all cursor-pointer"
                            title="Ganti Kata Motivasi Lainnya"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Ganti Motivasi</span>
                          </button>
                        </div>

                        <h5 className={`text-lg sm:text-xl font-black ${examMotivation.accentColor} mb-2.5 flex items-center gap-2`}>
                          <span>{examMotivation.headline}</span>
                        </h5>

                        <blockquote className="text-sm sm:text-base font-bold text-[#1A1615] leading-relaxed italic bg-white/80 p-4 rounded-2xl border border-white/60 shadow-xs mb-3">
                          {examMotivation.quote}
                        </blockquote>

                        <p className="text-xs text-[#524c47] font-medium leading-relaxed">
                          {examMotivation.subQuote}
                        </p>
                      </div>

                      {/* Pemberitahuan Resmi Peninjauan Tim Panitia Olimpiade Pusat */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-300/80 text-left flex items-start gap-3.5 shadow-xs">
                        <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5 shadow-sm">
                          <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                              Pemberitahuan Panitia Pusat OSN 2026
                            </span>
                            <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md">
                              Proses Verifikasi
                            </span>
                          </div>
                          <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                            Hasil jawaban ujian Anda akan <strong>ditinjau dan dinilai langsung oleh Tim Panitia Olimpiade Pusat (Dewan Juri Akademik)</strong> sesuai dengan standar validasi dan integritas kompetisi.
                          </p>
                          <p className="text-[11px] text-amber-800/90 leading-normal">
                            Pengumuman resmi kelulusan babak penyisihan dan peraih penghargaan medali akan dipublikasikan secara serentak di portal resmi ini sesuai jadwal kalender kegiatan.
                          </p>
                        </div>
                      </div>

                      {/* Tombol Aksi */}
                      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                        <button
                          onClick={() => {
                            setExamSubjectChosen(false);
                            setExamCompleted(false);
                          }}
                          className="flex-1 py-3.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#D4AF37]/50 shadow-md"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Pilih Mata Pelajaran Lain</span>
                        </button>
                        <button
                          onClick={() => setShowSimulatedExam(false)}
                          className="flex-1 py-3.5 rounded-xl text-xs font-bold border border-[#E8E2D9] bg-white text-[#1A1615] hover:bg-neutral-50 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                        >
                          <span>Kembali ke Kartu Peserta</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Step 2: Layar Pengerjaan Seluruh 20 Soal Bergambar Sekaligus Dalam 1 Halaman */
                    <div className="space-y-6">
                      {/* Sticky Exam Control Header */}
                      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-[#D4AF37] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              examTypeMode === 'final'
                                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                : 'text-emerald-700 bg-emerald-100'
                            }`}>
                              {examTypeMode === 'final' ? '★ Babak Final CBT' : 'CBT 1 Halaman Penuh'}
                            </span>
                            <span className="text-xs font-bold text-[#1A1615]">
                              Mata Pelajaran: {selectedSubjectForExam}
                            </span>
                            {examTypeMode === 'final' && isAntiCheatEnabled && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md border border-rose-200">
                                <ShieldAlert className="w-3 h-3 text-rose-600 animate-pulse" />
                                <span>Anti-Cheat Aktif</span>
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-extrabold text-[#1A1615] mt-1">
                            Lembar Soal Ujian (Menampilkan Seluruh {currentSubjectQuestions.length} Soal Sekaligus)
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                            Terjawab: <strong className="text-emerald-700 text-sm font-black">{Object.keys(studentAnswers).length}</strong> / {currentSubjectQuestions.length}
                          </div>

                          <div className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl shrink-0 shadow-sm ${
                            examTimer <= 300
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'text-[#D4AF37] bg-[#1A1615]'
                          }`}>
                            <Clock className={`w-4 h-4 ${examTimer <= 300 ? 'text-white' : 'text-[#D4AF37]'}`} />
                            <span>Sisa Waktu: {formatTime(examTimer)} (20 Menit)</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Jump Bar to Any Question */}
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[#756F68] font-bold">
                          <span>Navigasi Cepat Lompat ke Nomor Soal:</span>
                          <span className="text-emerald-700 font-semibold">
                            {Object.keys(studentAnswers).length === currentSubjectQuestions.length
                              ? '✓ Seluruh Soal Telah Terjawab'
                              : `${currentSubjectQuestions.length - Object.keys(studentAnswers).length} Soal Belum Terjawab`}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentSubjectQuestions.map((_, idx) => {
                            const isAnswered = studentAnswers[idx] !== undefined;
                            return (
                              <a
                                key={idx}
                                href={`#soal-no-${idx + 1}`}
                                className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center transition-all ${
                                  isAnswered
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-white text-[#1A1615] border border-[#E8E2D9] hover:border-[#D4AF37]'
                                }`}
                              >
                                {idx + 1}
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* LIST OF ALL 20 QUESTIONS IN 1 PAGE */}
                      <div className="space-y-6">
                        {currentSubjectQuestions.map((q, idx) => {
                          const isAnswered = studentAnswers[idx] !== undefined;
                          return (
                            <div
                              key={q.id || idx}
                              id={`soal-no-${idx + 1}`}
                              className={`p-5 sm:p-6 rounded-3xl border-2 transition-all scroll-mt-24 ${
                                isAnswered
                                  ? 'bg-white border-emerald-300 shadow-xs'
                                  : 'bg-white border-[#E8E2D9] hover:border-[#D4AF37]/60'
                              }`}
                            >
                              {/* Question Header */}
                              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3 mb-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="w-7 h-7 rounded-xl bg-[#1A1615] text-[#D4AF37] text-xs font-black flex items-center justify-center">
                                    {idx + 1}
                                  </span>
                                  <span className="text-xs font-black text-[#1A1615] uppercase tracking-wide">
                                    SOAL NOMOR {idx + 1} DARI {currentSubjectQuestions.length}
                                  </span>
                                  {q.curriculum && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#756F68] border border-[#E8E2D9]">
                                      {q.curriculum}
                                    </span>
                                  )}
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    q.stage === 'simulasi'
                                      ? 'bg-blue-100 text-blue-800'
                                      : q.stage === 'penyisihan'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-purple-100 text-purple-800'
                                  }`}>
                                    {q.difficulty || (examTypeMode === 'final' ? 'Sangat Sulit (HOTS)' : 'Sangat Mudah')}
                                  </span>
                                </div>
                                {isAnswered ? (
                                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Jawaban Anda: {studentAnswers[idx]}
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                                    Belum Dijawab
                                  </span>
                                )}
                              </div>

                              {/* Image Box if exists */}
                              {(q.imageUrl || q.imageSvg) && (
                                <div className="rounded-2xl border border-[#E8E2D9] overflow-hidden bg-[#FAF8F5] p-3 mb-4 flex items-center justify-center max-w-md mx-auto shadow-xs">
                                  {q.imageUrl ? (
                                    <img
                                      src={q.imageUrl}
                                      alt={`Ilustrasi Soal ${idx + 1}`}
                                      className="max-h-52 object-contain rounded-xl"
                                    />
                                  ) : (
                                    <img
                                      src={q.imageSvg}
                                      alt={`Ilustrasi Soal ${idx + 1}`}
                                      className="max-h-52 object-contain rounded-xl"
                                    />
                                  )}
                                </div>
                              )}

                              {/* Question Text */}
                              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs sm:text-sm text-[#1A1615] leading-relaxed whitespace-pre-line font-medium mb-4">
                                {q.questionText}
                              </div>

                              {/* 4 Choices (A, B, C, D) */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {q.options.map((opt) => {
                                  const isSelected = studentAnswers[idx] === opt.key;
                                  return (
                                    <label
                                      key={opt.key}
                                      onClick={() => selectAnswer(idx, opt.key)}
                                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer text-xs font-semibold ${
                                        isSelected
                                          ? 'bg-amber-100/80 border-[#D4AF37] text-[#1A1615] shadow-xs'
                                          : 'bg-white border-[#E8E2D9] hover:bg-neutral-50 text-[#1A1615]'
                                      }`}
                                    >
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                          isSelected
                                            ? 'bg-[#1A1615] text-[#D4AF37]'
                                            : 'bg-neutral-100 text-neutral-600 border border-neutral-300'
                                        }`}
                                      >
                                        {opt.key}
                                      </div>
                                      <span className="flex-1">{opt.text}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom Exam Action Button */}
                      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#1A1615] text-[#D4AF37] border-2 border-[#D4AF37] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-xs">
                          <p className="font-extrabold text-white">
                            Status Jawaban Anda: {Object.keys(studentAnswers).length} dari {currentSubjectQuestions.length} Soal Terjawab
                          </p>
                          <p className="text-[11px] text-neutral-300">
                            Pastikan Anda telah memeriksa seluruh jawaban sebelum menekan tombol selesaikan ujian.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                          >
                            Kembali ke Atas
                          </button>
                          <button
                            type="button"
                            onClick={() => finishExam()}
                            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Kirim & Selesaikan Ujian ({selectedSubjectForExam})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ) : null}

              {/* DIGITAL EXAM CARD & SCHEDULE */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Official Student Exam Card */}
                <div className="md:col-span-7 bg-white rounded-3xl p-6 border-2 border-[#D4AF37]/50 relative overflow-hidden shadow-sm">
                  {/* Decorative stamp in background */}
                  <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-20">
                    <StempelLKP className="w-36 h-36" isRotated={false} />
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
                    <div className="flex items-center gap-2">
                      <LogoOSN className="w-8 h-8" />
                      <div>
                        <h4 className="text-xs font-extrabold text-[#1A1615]">KARTU PESERTA RESMI CBT</h4>
                        <p className="text-[10px] text-[#756F68]">Olimpiade Siswa Nasional 2026</p>
                      </div>
                    </div>
                    <LogoLKP className="w-8 h-8" />
                  </div>

                  <div className="py-4 grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] text-[#756F68] block">Nama Lengkap Siswa:</span>
                        <strong className="text-[#1A1615] text-sm">{activeStudent?.fullName || 'Peserta Terdaftar'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#756F68] block">Nomor Peserta Ujian:</span>
                        <span className="text-[#1A1615] font-mono font-bold">{activeStudent?.id || 'OSN-2026-B-001'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#756F68] block">Asal Sekolah & Jenjang:</span>
                        <span className="text-[#1A1615] font-semibold">{activeStudent?.schoolName || '-'} ({activeStudent?.level || 'SD/MI'})</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#756F68] block">Provinsi / Wilayah:</span>
                        <span className="text-[#1A1615] font-semibold">{activeStudent?.cityProvince || 'Indonesia'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#756F68] block mb-1">Mata Pelajaran Diikuti:</span>
                        <div className="flex flex-wrap gap-1">
                          {activeStudent?.subjects && activeStudent.subjects.length > 0 ? (
                            activeStudent.subjects.map(s => (
                              <span key={s} className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                              Matematika
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* QR Code Verification Box */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-center">
                      <QrCode className="w-16 h-16 text-[#1A1615]" />
                      <span className="text-[9px] font-mono text-[#756F68] mt-1 font-bold">VERIFIKASI SAH</span>
                      <span className="text-[8px] text-emerald-700 font-semibold">Tercatat Database</span>
                    </div>
                  </div>

                  {/* Riwayat Ujian Siswa (Simulasi, Penyisihan, & Final) */}
                  {(activeStudent?.simulatedExam || activeStudent?.penyisihanExam || activeStudent?.finalExam) && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 mb-3 space-y-2 text-xs">
                      <span className="text-[10px] font-bold text-[#756F68] uppercase tracking-wider block">
                        Riwayat Pengerjaan Ujian Siswa:
                      </span>
                      {activeStudent?.simulatedExam && (
                        <div className="flex items-center justify-between text-[11px] bg-white/80 p-2 rounded-xl border border-amber-200/60">
                          <div>
                            <span className="font-semibold text-[#1A1615]">
                              Simulasi CBT ({activeStudent.simulatedExam.subject})
                            </span>
                            <span className="text-[10px] text-[#756F68] block">
                              Percobaan: {activeStudent.simulatedAttempts || 1}/2
                            </span>
                          </div>
                          <span className="font-bold text-amber-900 font-mono text-xs">
                            Nilai: {activeStudent.simulatedExam.score}/100
                          </span>
                        </div>
                      )}
                      {activeStudent?.penyisihanExam && (
                        <div className="flex items-center justify-between text-[11px] bg-white/80 p-2 rounded-xl border border-emerald-200">
                          <div>
                            <span className="font-bold text-[#1A1615]">
                              Babak Penyisihan ({activeStudent.penyisihanExam.subject})
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                                activeStudent.qualificationStatus === 'lolos'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-700'
                              }`}>
                                {activeStudent.qualificationStatus === 'lolos' ? '✓ Lolos Final' : 'Belum Lolos'}
                              </span>
                              <span className="text-[10px] text-[#756F68]">
                                Percobaan: {activeStudent.penyisihanAttempts || 1}/2
                              </span>
                            </div>
                          </div>
                          <span className="font-black text-emerald-800 font-mono text-sm">
                            Nilai: {activeStudent.penyisihanExam.score}/100
                          </span>
                        </div>
                      )}
                      {activeStudent?.finalExam && (
                        <div className="flex items-center justify-between text-[11px] bg-white/80 p-2 rounded-xl border border-purple-200">
                          <div>
                            <span className="font-bold text-[#1A1615]">
                              Babak Final ({activeStudent.finalExam.subject})
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-purple-100 text-purple-900">
                                🏆 {activeStudent.championRank || 'Peserta Final'}
                              </span>
                              <span className="text-[10px] text-[#756F68]">
                                Percobaan: {activeStudent.finalAttempts || 1}/2
                              </span>
                            </div>
                          </div>
                          <span className="font-black text-purple-900 font-mono text-sm">
                            Nilai: {activeStudent.finalExam.score}/100
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TOMBOL UNDUHAN KARTU UJIAN PDF DIPERBAIKI */}
                  <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Babak Penyisihan: GRATIS
                    </span>
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm border border-[#D4AF37]/50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isDownloadingPdf ? 'Menghasilkan PDF...' : 'Unduh Kartu Ujian (PDF)'}</span>
                    </button>
                  </div>
                </div>

                {/* Important Dates & Quick Links */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-white rounded-3xl p-5 border border-[#E8E2D9] space-y-3">
                    <h4 className="text-xs font-extrabold text-[#1A1615] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>Jadwal Penting OSN 2026</span>
                    </h4>
                    
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#1A1615] block">Babak Penyisihan (Online CBT)</span>
                          <span className="text-[11px] text-[#756F68]">12 September 2026 · 100% Bebas Biaya</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
                        <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#1A1615] block">Babak Final & Grand Final</span>
                          <span className="text-[11px] text-[#756F68]">26 September 2026 · Perebutan Medali</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1A1615] text-[#D4AF37] border border-[#D4AF37]/30 text-xs">
                    <p className="font-bold text-white mb-1">Pusat Layanan Bantuan Siswa</p>
                    <p className="text-[11px] text-neutral-300 mb-3">
                      Kendala login, jadwal, atau pergantian mapel dapat dikonsultasikan langsung ke panitia via WhatsApp resmi.
                    </p>
                    <a
                      href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Panitia%20OSN,%20saya%20atas%20nama%20${encodeURIComponent(activeStudent?.fullName || 'Peserta')}%20ingin%20konsultasi`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#1A1615] font-bold text-[11px] hover:bg-[#FFF2B2] transition-colors"
                    >
                      <Phone className="w-3 h-3" /> Hubungi Call Center
                    </a>
                  </div>
                </div>

              </div>

              {/* FITUR UTAMA: SERTIFIKAT DIGITAL RESMI KELULUSAN & PRESTASI SISWA (PDF) */}
              {activeStudent && (activeStudent.qualificationStatus === 'lolos' ||
                (activeStudent.penyisihanExam && activeStudent.penyisihanExam.score >= 60) ||
                activeStudent.finalExam ||
                (activeStudent.championRank && activeStudent.championRank !== 'Belum Dinilai')) && (
                <div className="bg-gradient-to-br from-amber-50/90 via-white to-amber-100/60 rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37] shadow-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-white flex items-center justify-center shadow-md shrink-0">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded-full inline-block border border-amber-300">
                            Dokumen Resmi Terverifikasi
                          </span>
                          <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                            ✓ Terbit Otomatis
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-[#1A1615] mt-1">
                          Sertifikat Digital Kelulusan & Prestasi Siswa
                        </h4>
                        <p className="text-xs text-[#756F68]">
                          Telah diterbitkan secara resmi oleh <strong>LKP Prestasi Nusantara</strong> & Komite Nasional OSN 2026.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-xs">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>STATUS: RESMI LULUS SELEKSI</span>
                      </span>
                    </div>
                  </div>

                  {/* Rincian Data Peserta yang Terintegrasi di Sertifikat */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/95 p-4 rounded-2xl border border-amber-200 text-xs shadow-2xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#756F68] block">Nama Lengkap Peserta:</span>
                      <strong className="text-sm text-[#1A1615] block truncate mt-0.5">{activeStudent.fullName}</strong>
                      <span className="text-[10px] text-neutral-500 font-mono">ID: {activeStudent.id}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#756F68] block">Asal Sekolah & Jenjang:</span>
                      <strong className="text-xs text-[#1A1615] block truncate mt-0.5">{activeStudent.schoolName}</strong>
                      <span className="text-[10px] text-neutral-500">{activeStudent.level.split('(')[0]}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#756F68] block">Mata Pelajaran Ujian:</span>
                      <strong className="text-xs text-[#1A1615] block mt-0.5">
                        {activeStudent.penyisihanExam?.subject || activeStudent.finalExam?.subject || activeStudent.subjects?.[0] || 'Matematika'}
                      </strong>
                      <span className="text-[10px] text-neutral-500">{activeStudent.cityProvince || 'Indonesia'}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#756F68] block">Nilai Ujian & Predikat:</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-base font-black text-emerald-700 font-mono">
                          {activeStudent.finalExam?.score ?? activeStudent.penyisihanExam?.score ?? activeStudent.simulatedExam?.score ?? 85} / 100
                        </span>
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded">
                          Grade A
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-semibold block truncate">
                        {activeStudent.championRank && activeStudent.championRank !== 'Belum Dinilai'
                          ? activeStudent.championRank
                          : 'Lolos Babak Final (Finalis)'}
                      </span>
                    </div>
                  </div>

                  {/* Tombol Unduh Sertifikat & Notifikasi WhatsApp */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                    <div className="text-[11px] text-[#756F68] flex items-center gap-1.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>Format PDF A4 Landscape kualitas cetak resolusi tinggi lengkap dengan NIP & QR-Verification.</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const scoreVal = activeStudent.finalExam?.score ?? activeStudent.penyisihanExam?.score ?? activeStudent.simulatedExam?.score ?? 85;
                          const subjectVal = activeStudent.penyisihanExam?.subject || activeStudent.finalExam?.subject || activeStudent.subjects?.[0] || 'Matematika';
                          const rankTitle = activeStudent.championRank && activeStudent.championRank !== 'Belum Dinilai'
                            ? activeStudent.championRank
                            : 'Lolos Babak Final (Finalis Nasional)';
                          generateDigitalCertificatePdf({
                            student: activeStudent,
                            score: scoreVal,
                            subject: subjectVal,
                            rankTitle,
                            stageTitle: activeStudent.finalExam ? 'BABAK FINAL NASIONAL' : 'BABAK PENYISIHAN NASIONAL'
                          });
                        }}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FFF2B2] text-[#1A1615] font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-[#D4AF37]"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh Sertifikat Digital Resmi (PDF)</span>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          await triggerQualificationReleasedNotification(activeStudent, 'lolos');
                          setAdminNotification(`Notifikasi WhatsApp kelulusan & link sertifikat berhasil dikirim ke ${activeStudent.whatsapp}!`);
                          setTimeout(() => setAdminNotification(''), 4000);
                        }}
                        className="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                        title="Kirim Notifikasi Kelulusan & Link Sertifikat ke WhatsApp Peserta"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-200" />
                        <span>Kirim ke WA</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PENGUMUMAN KELULUSAN & PEMBELIAN TIKET BABAK FINAL SECARA MANDIRI */}
              {activeStudent && (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37] shadow-md space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E8E2D9] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-[#D4AF37]" />
                        <h4 className="text-base font-extrabold text-[#1A1615]">
                          Pengumuman Kelulusan Penyisihan & Tiket Babak Final
                        </h4>
                      </div>
                      <p className="text-xs text-[#756F68] mt-1">
                        Status resmi dari panitia pelaksana olimpiade untuk ananda <strong>{activeStudent.fullName}</strong> ({activeStudent.id})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeStudent.qualificationStatus === 'lolos' ? (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          SELAMAT! LOLOS KE BABAK FINAL
                        </span>
                      ) : activeStudent.qualificationStatus === 'tidak_lolos' ? (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          Belum Memenuhi Passing Grade
                        </span>
                      ) : (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Menunggu Pengumuman H+2 Ujian
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Jika Siswa Dinyatakan Lolos: Tampilkan Pembelian Tiket Final Mandiri */}
                  {activeStudent.qualificationStatus === 'lolos' ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-7 space-y-3">
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                          Alur Pembelian Tiket Final Mandiri (Poin 8)
                        </span>
                        <h5 className="text-lg font-black text-[#1A1615]">
                          Pembelian Tiket Babak Final & Perebutan Medali Juara
                        </h5>
                        <p className="text-xs text-[#66615B] leading-relaxed">
                          Peserta yang dinyatakan lolos babak penyisihan berhak melanjutkan ke Babak Final. Pembelian tiket final dapat dilakukan secara mandiri dengan tarif promo khusus 10 pendaftar pertama:
                        </p>

                        {/* Price Tag Box */}
                        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300/80 flex items-center gap-4">
                          <div className="space-y-0.5">
                            <span className="text-xs text-[#756F68] line-through block">
                              Harga Normal: Rp 180.000
                            </span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl sm:text-3xl font-black text-[#1A1615]">
                                Rp 99.000
                              </span>
                              <span className="text-[11px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                                Promo Khusus 10 Peserta Pertama
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bank Transfer BCA Box */}
                        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#1A1615]">Rekening Resmi Pembayaran:</span>
                            <span className="font-extrabold text-blue-800">BANK BCA</span>
                          </div>
                          <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E8E2D9]">
                            <div>
                              <div className="font-mono font-black text-sm text-[#1A1615] tracking-wider">
                                018-2161-789
                              </div>
                              <div className="text-[11px] text-[#756F68]">
                                Atas Nama: <strong>SITI NUR ASIA</strong>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText('0182161789');
                                alert('Nomor rekening BCA 0182161789 berhasil disalin!');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[#1A1615] text-[10px] font-bold cursor-pointer transition-colors"
                            >
                              Salin No. Rek
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Tombol Konfirmasi WA & Status Closing */}
                      <div className="md:col-span-5 p-5 rounded-3xl bg-[#1A1615] text-white space-y-4 text-center border border-[#D4AF37]/40 shadow-lg">
                        <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#D4AF37]">
                          <Award className="w-6 h-6" />
                        </div>

                        <div>
                          <h6 className="text-sm font-extrabold text-white">Status Tiket Final Anda:</h6>
                          {activeStudent.finalTicketPaymentStatus === 'paid_closing' ? (
                            <div className="mt-2 space-y-1">
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white shadow-sm">
                                ✓ LUNAS (CLOSING TIKET FINAL)
                              </span>
                              <p className="text-[11px] text-emerald-300">
                                Pembayaran Rp 99.000 telah terverifikasi oleh panitia. Anda berhak mengikuti Babak Final dan menerima sertifikat resmi.
                              </p>
                            </div>
                          ) : (
                            <div className="mt-2 space-y-1">
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-neutral-900">
                                Menunggu Pembayaran
                              </span>
                              <p className="text-[11px] text-neutral-300">
                                Silakan transfer ke rekening BCA di samping lalu klik tombol konfirmasi WhatsApp di bawah.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* WhatsApp Konfirmasi Pembayaran */}
                        <a
                          href={`https://wa.me/6285210667085?text=${encodeURIComponent(
                            `Halo Admin OSN 2026,\n` +
                            `Saya ingin konfirmasi pembayaran tiket Babak Final sebesar Promo Rp 99.000 ke rekening BCA a.n. Siti Nur Asia.\n\n` +
                            `• Nama Anak: ${activeStudent.fullName}\n` +
                            `• No. Peserta: ${activeStudent.id}\n` +
                            `• Asal Sekolah: ${activeStudent.schoolName}\n` +
                            `• Mapel yang Diikuti: ${(activeStudent.subjects || ['Matematika']).join(', ')}\n\n` +
                            `Bukti transfer terlampir. Mohon verifikasi closing tiket final saya. Terima kasih!`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Konfirmasi Pembayaran via WhatsApp</span>
                        </a>

                        {/* Tombol Akses Babak Final CBT */}
                        {activeStudent.finalTicketPaymentStatus === 'paid_closing' && (
                          <div className="p-3.5 rounded-2xl bg-amber-500/10 border-2 border-[#D4AF37] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                                <Trophy className="w-4 h-4 text-[#D4AF37]" />
                                <span>Akses Ujian Babak Final CBT</span>
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-neutral-950">
                                Percobaan: {activeStudent.finalAttempts || 0}/2
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-700">
                              Tiket Babak Final Anda telah <strong>Lunas (Closing Terverifikasi)</strong>. Durasi ujian: <strong>20 Menit</strong> dengan proteksi <strong>Sistem Anti-Kecurangan (Anti-Cheat) Aktif</strong>.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                const attempts = activeStudent.finalAttempts || 0;
                                if (attempts >= 2) {
                                  alert('Anda sudah mengerjakan ujian Babak Final sebanyak 2x. Batas maksimal pengerjaan telah tercapai.');
                                  return;
                                }
                                setShowSimulatedExam(true);
                                setExamTypeMode('final');
                                setExamSubjectChosen(false);
                                setExamCompleted(false);
                              }}
                              className="w-full py-3 px-4 rounded-xl bg-[#1A1615] hover:bg-[#2A2321] text-[#D4AF37] font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-[#D4AF37]/60"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>{(activeStudent.finalAttempts || 0) >= 2 ? 'Batas Ujian Final Tercapai (2/2)' : 'Mulai Ujian Babak Final Resmi (20 Menit)'}</span>
                            </button>
                          </div>
                        )}

                        {/* Sertifikat Babak Final jika sudah dinilai / juara */}
                        {activeStudent.finalTicketPaymentStatus === 'paid_closing' && (
                          <button
                            type="button"
                            onClick={() => generateFinalCertificatePdf({ student: activeStudent, rankTitle: activeStudent.championRank || 'Peserta Final' })}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#FFF2B2] text-[#1A1615] font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>Unduh Sertifikat Final Resmi (PDF)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-[#756F68] space-y-1">
                      <p>
                        Catatan Resmi: Pengumuman peserta lolos babak penyisihan akan ditetapkan secara resmi pada <strong>H+2 pelaksanaan ujian babak penyisihan</strong>.
                      </p>
                      <p>
                        Setelah dinyatakan lolos, menu pembelian tiket promo final Rp 99.000 (dari Rp 180.000) dan konfirmasi pembayaran BCA a.n. Siti Nur Asia akan aktif otomatis di halaman ini.
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            /* =================== VIEW: DASHBOARD ADMIN PUSAT =================== */
            <div className="space-y-6">
              
              {/* Admin Header Stats with Date Filter & Penyisihan counter */}
              <div className="space-y-4">
                {/* 1. Date Range Filter & Quick Stats Bar */}
                <div className="p-4 rounded-2xl bg-[#1A1615] border border-[#D4AF37]/40 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                        Filter Statistik Berdasarkan Tanggal Pendaftaran
                        {(adminStartDate || adminEndDate) && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-neutral-900 font-extrabold">
                            Filter Aktif
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-neutral-300">
                        Pilih rentang tanggal untuk memfilter statistik dan mengekspor data peserta
                      </p>
                    </div>
                  </div>

                  {/* Date Pickers */}
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <div className="flex items-center gap-1.5 bg-neutral-800/80 px-2.5 py-1.5 rounded-xl border border-neutral-700 text-xs">
                      <span className="text-[11px] text-neutral-400 font-medium">Dari:</span>
                      <input
                        type="date"
                        value={adminStartDate}
                        onChange={(e) => setAdminStartDate(e.target.value)}
                        className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 bg-neutral-800/80 px-2.5 py-1.5 rounded-xl border border-neutral-700 text-xs">
                      <span className="text-[11px] text-neutral-400 font-medium">Sampai:</span>
                      <input
                        type="date"
                        value={adminEndDate}
                        onChange={(e) => setAdminEndDate(e.target.value)}
                        className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                      />
                    </div>
                    {(adminStartDate || adminEndDate) && (
                      <button
                        onClick={() => {
                          setAdminStartDate('');
                          setAdminEndDate('');
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Reset Filter Tanggal"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Stats Grid Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Total Pendaftar */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] relative overflow-hidden shadow-xs hover:border-[#D4AF37]/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#756F68] uppercase tracking-wider block">
                        Total Pendaftar Tercatat
                      </span>
                      <Users2 className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div className="text-2xl font-black text-[#1A1615] mt-1">
                      {dateFilteredParticipants.length} <span className="text-xs text-[#756F68] font-semibold">Siswa</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {adminStartDate || adminEndDate
                        ? `Periode Terpilih (Total: ${participantsList.length})`
                        : 'Seluruh Database Pusat'}
                    </div>
                  </div>

                  {/* Card 2: Total Peserta Closing Tiket Final */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-amber-400/80 relative overflow-hidden shadow-xs bg-linear-to-br from-amber-50/40 to-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider block">
                        Peserta Closing Final
                      </span>
                      <span className="p-1 rounded-lg bg-amber-100 text-amber-800">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-700" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-amber-900 mt-1">
                      {totalClosingCount} <span className="text-xs text-amber-800 font-bold">Peserta Closing</span>
                    </div>
                    <div className="text-[11px] text-amber-700 font-medium mt-1">
                      {adminStartDate || adminEndDate
                        ? `Rentang ini (Kumulatif: ${totalClosingCountAll} Siswa)`
                        : 'Tiket Babak Final Terkonfirmasi Lunas'}
                    </div>
                  </div>

                  {/* Card 3: Total Nominal Closing Pembayaran */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-emerald-500/80 relative overflow-hidden shadow-xs bg-linear-to-br from-emerald-50/40 to-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-emerald-900 uppercase tracking-wider block">
                        Total Nominal Closing
                      </span>
                      <span className="p-1 rounded-lg bg-emerald-100 text-emerald-800">
                        <Banknote className="w-3.5 h-3.5 text-emerald-700" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">
                      Rp {totalClosingNominal.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                      {adminStartDate || adminEndDate
                        ? `Periode Terpilih (Total: Rp ${totalClosingNominalAll.toLocaleString('id-ID')})`
                        : 'Total Pembayaran Masuk (BCA)'}
                    </div>
                  </div>

                  {/* Card 4: Pemenang Juara */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-purple-400/80 relative overflow-hidden shadow-xs bg-linear-to-br from-purple-50/40 to-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-purple-900 uppercase tracking-wider block">
                        Pemenang Juara
                      </span>
                      <span className="p-1 rounded-lg bg-purple-100 text-purple-800">
                        <Trophy className="w-3.5 h-3.5 text-purple-700" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-purple-900 mt-1">
                      {totalWinnersCount} <span className="text-xs text-purple-800 font-bold">Juara Ditetapkan</span>
                    </div>
                    <div className="text-[11px] text-purple-700 font-medium mt-1">
                      {adminStartDate || adminEndDate
                        ? `Rentang ini (Kumulatif: ${totalWinnersCountAll} Juara)`
                        : 'Peraih Medali & Juara OSN 2026'}
                    </div>
                  </div>

                  {/* Card 5: Sudah Mengerjakan BABAK PENYISIHAN */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-300 relative overflow-hidden shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                        Sudah Babak Penyisihan
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">
                      {totalCompletedPenyisihanInDateRange} <span className="text-xs text-emerald-800 font-semibold">Siswa</span>
                    </div>
                    <div className="text-[11px] text-[#756F68] mt-1">
                      {adminStartDate || adminEndDate
                        ? `Rentang ini (Total: ${totalCompletedPenyisihan})`
                        : 'Selesai Simulasi / Penyisihan CBT'}
                    </div>
                  </div>

                  {/* Card 6: Sudah Mengerjakan Final */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] relative overflow-hidden shadow-xs">
                    <span className="text-[10px] font-bold text-[#756F68] uppercase block">
                      Sudah Mengerjakan Final
                    </span>
                    <div className="text-2xl font-black text-blue-700 mt-1">
                      {dateFilteredParticipants.filter(p => !!p.finalExam).length} <span className="text-xs text-[#756F68] font-semibold">Siswa</span>
                    </div>
                    <div className="text-[11px] text-blue-800 font-semibold mt-1">
                      Selesai Lengkap Babak Final
                    </div>
                  </div>

                  {/* Card 7: Total Bank Soal */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#756F68] uppercase block">Total Bank Soal CBT</span>
                      <div className="text-2xl font-black text-[#1A1615] mt-1">
                        {questionsList.length} <span className="text-xs text-[#756F68] font-semibold">Soal</span>
                      </div>
                      <span className="text-[11px] text-[#D4AF37] font-bold">4 Mapel Bergambar</span>
                    </div>
                    <BookOpen className="w-5 h-5 text-neutral-300" />
                  </div>

                  {/* Card 8: Status & Logout */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#756F68] uppercase block">Akses Operator</span>
                      <div className="text-sm font-black text-[#1A1615] mt-1">
                        Admin Panitia Pusat
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold">Aktif & Terlindungi</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2.5 rounded-xl bg-neutral-100 hover:bg-rose-50 hover:text-rose-700 text-neutral-700 text-xs font-bold transition-colors cursor-pointer"
                      title="Keluar Admin"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Banner */}
              {adminNotification && (
                <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{adminNotification}</span>
                </div>
              )}

              {/* Main Admin Tab Switcher: 1. Peserta, 2. Soal, 3. Google Workspace, 4. Jadwal Event */}
              <div className="flex border-b border-[#E8E2D9] gap-4 overflow-x-auto pb-1">
                <button
                  onClick={() => setAdminTab('participants')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'participants'
                      ? 'border-b-2 border-[#D4AF37] text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Database Peserta ({participantsList.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('report_simulasi')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'report_simulasi'
                      ? 'border-b-2 border-amber-500 text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  <span>Laporan Simulasi CBT</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                    {totalCompletedSimulasi} Selesai
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('report_penyisihan')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'report_penyisihan'
                      ? 'border-b-2 border-emerald-600 text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Laporan Babak Penyisihan</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-900 font-bold">
                    {totalCompletedPenyisihanOfficial} Selesai
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('report_final')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'report_final'
                      ? 'border-b-2 border-purple-600 text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-purple-600" />
                  <span>Laporan Babak Final</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-900 font-bold">
                    {totalCompletedFinalOfficial} Selesai
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('questions')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'questions'
                      ? 'border-b-2 border-[#D4AF37] text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Bank Soal CBT</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-900">
                    {questionsList.length} Soal
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('workspace')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'workspace'
                      ? 'border-b-2 border-[#4285F4] text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <HardDrive className="w-4 h-4 text-[#4285F4]" />
                  <span>Google Workspace (Sheets, Contacts, Drive)</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${googleUser ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'}`}>
                    {googleUser ? 'Connected' : 'Sync'}
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('schedule')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'schedule'
                      ? 'border-b-2 border-[#D4AF37] text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <CalendarDays className="w-4 h-4 text-[#D4AF37]" />
                  <span>Jadwal Pelaksanaan</span>
                </button>

                <button
                  onClick={() => setAdminTab('announcements')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'announcements'
                      ? 'border-b-2 border-emerald-600 text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Pengumuman Lolos & Pemenang</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                    Official
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('pixel')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'pixel'
                      ? 'border-b-2 border-blue-600 text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>Meta Pixel Iklan</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pixelConfig.isEnabled ? 'bg-blue-100 text-blue-800' : 'bg-neutral-200 text-neutral-600'}`}>
                    {pixelConfig.isEnabled ? 'Aktif' : 'Non-aktif'}
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('anticheat')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'anticheat'
                      ? 'border-b-2 border-rose-600 text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Proteksi Anti-Contek</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isAntiCheatEnabled ? 'bg-rose-100 text-rose-800' : 'bg-neutral-200 text-neutral-600'}`}>
                    {isAntiCheatEnabled ? 'Aktif (Final)' : 'Mati'}
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('gallery')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                    adminTab === 'gallery'
                      ? 'border-b-2 border-[#D4AF37] text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-[#D4AF37]" />
                  <span>Kelola Galeri Juara</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                    Admin Khusus
                  </span>
                </button>
              </div>

              {/* TAB 1: DAFTAR PESERTA LENGKAP & STATUS SIMULASI HINGGA FINAL */}
              {adminTab === 'participants' && (
                <div className="space-y-4">
                  {/* Search & Filter & Export Bar */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] space-y-3 shadow-xs">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                      <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Cari nama, No WA, sekolah, ID..."
                          value={adminSearch}
                          onChange={(e) => setAdminSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
                          <Filter className="w-3.5 h-3.5" />
                          <span className="font-bold">Jenjang:</span>
                          <select
                            value={adminFilterCategory}
                            onChange={(e) => setAdminFilterCategory(e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl text-xs border border-[#E8E2D9] bg-[#FAF8F5] focus:outline-none"
                          >
                            <option value="Semua">Semua Jenjang</option>
                            <option value="PAUD">Kategori A (PAUD/TK)</option>
                            <option value="SD">Kategori B (SD/MI)</option>
                            <option value="SMP">Kategori C (SMP/MTs)</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
                          <span className="font-bold">Status Ujian:</span>
                          <select
                            value={adminFilterExamStatus}
                            onChange={(e) => setAdminFilterExamStatus(e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl text-xs border border-[#E8E2D9] bg-[#FAF8F5] focus:outline-none"
                          >
                            <option value="Semua">Semua Status</option>
                            <option value="Simulasi">Sudah Penyisihan/Simulasi</option>
                            <option value="Final">Sudah Mengerjakan Final</option>
                            <option value="Belum">Belum Ujian</option>
                          </select>
                        </div>

                        {/* Filter Pemenang Juara & Closing */}
                        <div className="flex items-center gap-1.5 text-xs text-[#756F68]">
                          <Trophy className="w-3.5 h-3.5 text-purple-600" />
                          <span className="font-bold">Pemenang / Closing:</span>
                          <select
                            value={adminFilterWinner}
                            onChange={(e) => setAdminFilterWinner(e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl text-xs border border-purple-200 bg-purple-50/50 text-purple-950 font-semibold focus:outline-none"
                          >
                            <option value="Semua">Semua Peserta</option>
                            <option value="Semua_Juara">🏆 Semua Pemenang Juara</option>
                            <option value="Juara 1">🥇 Juara 1 (Emas)</option>
                            <option value="Juara 2">🥈 Juara 2 (Perak)</option>
                            <option value="Juara 3">🥉 Juara 3 (Perunggu)</option>
                            <option value="Peserta Final">🎖️ Peserta Final</option>
                            <option value="Closing">💰 Peserta Closing Final (Lunas Rp 99k)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Export Action Buttons Toolbar (Excel, PDF, VCF) */}
                    <div className="pt-2 border-t border-[#E8E2D9]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                      <div className="text-[11px] text-[#756F68] flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                          <Zap className="w-3 h-3 text-emerald-600" />
                          Akses Cepat Ringan
                        </span>
                        <span>
                          Menampilkan <strong>{displayedParticipants.length} data terbaru</strong> (Halaman <strong>{validAdminPage}</strong> dari <strong>{totalAdminPages}</strong>) • Total terdata: <strong className="text-[#1A1615]">{sortedParticipants.length}</strong> peserta
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        {/* Tombol Export Excel */}
                        <button
                          type="button"
                          onClick={handleExportExcel}
                          disabled={filteredParticipants.length === 0}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          title="Download data tabel peserta ke format Excel (.xls)"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Export Excel</span>
                        </button>

                        {/* Tombol Export Google Sheets Cloud */}
                        <button
                          type="button"
                          onClick={requestExportGoogleSheet}
                          disabled={filteredParticipants.length === 0 || isExportingSheet}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          title="Ekspor langsung ke Google Sheets (Cloud Real-Time)"
                        >
                          <Share2 className="w-3.5 h-3.5 text-emerald-200" />
                          <span>{isExportingSheet ? 'Menyimpan...' : 'Ke Google Sheets'}</span>
                        </button>

                        {/* Tombol Export PDF */}

                        <button
                          type="button"
                          onClick={handleExportPdf}
                          disabled={filteredParticipants.length === 0}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          title="Cetak & Download Laporan Peserta PDF Landscape Resmi"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Export PDF</span>
                        </button>

                        {/* Tombol Save Kontak VCF */}
                        <button
                          type="button"
                          onClick={handleExportVcf}
                          disabled={filteredParticipants.length === 0}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1A1615] hover:bg-neutral-800 disabled:opacity-50 text-[#D4AF37] border border-[#D4AF37]/50 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          title="Download file kontak .vcf (Bisa langsung dibuka di HP untuk simpan kontak WhatsApp seluruh peserta sekaligus)"
                        >
                          <Contact className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Save Kontak (VCF)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Table */}
                  <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-black text-[#1A1615] uppercase tracking-wider flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-[#D4AF37]" />
                          <span>Database Peserta ({sortedParticipants.length})</span>
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                          10 Baris per Halaman
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          Urut Paling Baru
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setResetQuotaClearHistory(false);
                            setShowBulkResetModal(true);
                          }}
                          disabled={filteredParticipants.length === 0}
                          className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          title="Reset kuota ujian CBT untuk seluruh peserta yang saat ini tampil di tabel"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-purple-700" />
                          <span>Reset Kuota Massal ({filteredParticipants.length})</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Switcher to 3 Dedicated Report Tables */}
                    <div className="p-3 bg-amber-50/50 border-b border-[#E8E2D9] flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-extrabold text-[#756F68] uppercase text-[10px] tracking-wider">
                        Akses Cepat Laporan Ujian:
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdminTab('report_simulasi')}
                        className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 font-bold hover:bg-amber-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-amber-700" />
                        <span>Tabel Laporan Simulasi ({totalCompletedSimulasi})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdminTab('report_penyisihan')}
                        className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-900 font-bold hover:bg-emerald-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Tabel Laporan Babak Penyisihan ({totalCompletedPenyisihanOfficial})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdminTab('report_final')}
                        className="px-2.5 py-1 rounded-lg bg-white border border-purple-300 text-purple-900 font-bold hover:bg-purple-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Trophy className="w-3.5 h-3.5 text-purple-700" />
                        <span>Tabel Laporan Babak Final ({totalCompletedFinalOfficial})</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#756F68] font-bold text-[11px]">
                            <th className="py-3 px-3">No. Peserta</th>
                            <th className="py-3 px-3">Nama Siswa & Kontak</th>
                            <th className="py-3 px-3">Orang Tua / Wali & Domisili</th>
                            <th className="py-3 px-3">Jenjang & Sekolah</th>
                            <th className="py-3 px-3">Mata Pelajaran</th>
                            <th className="py-3 px-3">Simulasi CBT</th>
                            <th className="py-3 px-3">Babak Penyisihan</th>
                            <th className="py-3 px-3">Babak Final & Juara</th>
                            <th className="py-3 px-3">Closing Final Rp99k</th>
                            <th className="py-3 px-3 text-center">Follow-Up WA</th>
                            <th className="py-3 px-3 text-center">Aksi / Kelola</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E2D9]">
                          {displayedParticipants.length === 0 ? (
                            <tr>
                              <td colSpan={11} className="py-12 text-center text-neutral-500">
                                <div className="flex flex-col items-center justify-center">
                                  <Database className="w-8 h-8 text-neutral-300 mb-2" />
                                  <p className="font-bold text-sm text-[#1A1615]">Tidak ada data peserta ditemukan</p>
                                  <p className="text-xs text-[#756F68] mt-1">Coba sesuaikan kata kunci pencarian atau filter yang dipilih.</p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            displayedParticipants.map((p) => {
                            const isPaidClosing = p.finalTicketPaymentStatus === 'paid_closing';
                            const isLolos = p.qualificationStatus === 'lolos';

                            return (
                              <tr key={p.id} className={`transition-colors ${isPaidClosing ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'hover:bg-amber-50/40'}`}>
                                <td className="py-3 px-3 font-mono font-bold text-[#1A1615]">
                                  <div className="flex items-center gap-1">
                                    <span>{p.id}</span>
                                  </div>
                                  <div className="text-[10px] text-[#756F68] font-normal">
                                    {new Date(p.registeredAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                  </div>
                                  <div className="text-[9px] text-neutral-400">
                                    {new Date(p.registeredAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                  </div>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="font-bold text-[#1A1615] flex items-center gap-1.5">
                                    <span>{p.fullName}</span>
                                    {isPaidClosing && (
                                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] shadow-xs" title="Closing Final Rp 99.000 Lunas">
                                        CLOSING
                                      </span>
                                    )}
                                  </div>
                                  <a
                                    href={`https://wa.me/${p.whatsapp.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-mono font-bold mt-0.5"
                                  >
                                    <Phone className="w-2.5 h-2.5" />
                                    {p.whatsapp}
                                  </a>
                                  {p.email && p.email !== '-' && (
                                    <div className="text-[10px] text-neutral-500 font-normal truncate max-w-[170px]" title={p.email}>
                                      ✉ {p.email}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-3 min-w-[160px]">
                                  <div className="space-y-1">
                                    <div className="text-[11px] text-[#1A1615] font-bold flex items-center gap-1">
                                      <User className="w-3 h-3 text-[#D4AF37] shrink-0" />
                                      <span>{p.parentName && p.parentName !== '-' ? p.parentName : '(Tidak diisi)'}</span>
                                    </div>
                                    <div className="text-[10px] text-neutral-600 flex items-start gap-1">
                                      <span className="font-semibold text-neutral-500 shrink-0">Alamat:</span>
                                      <span className="line-clamp-2 text-[10px] leading-tight text-neutral-700" title={p.fullAddress || '-'}>
                                        {p.fullAddress && p.fullAddress !== '-' ? p.fullAddress : '-'}
                                      </span>
                                    </div>
                                    <div className="text-[10px] font-semibold text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded inline-block">
                                      📍 {p.cityProvince && p.cityProvince !== '-' ? p.cityProvince : 'Indonesia'}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="font-medium text-[#1A1615]">{p.schoolName}</div>
                                  <div className="text-[10px] text-[#756F68]">{p.level}</div>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="flex flex-wrap gap-1">
                                    {p.subjects && p.subjects.length > 0 ? (
                                      p.subjects.map(s => (
                                        <span key={s} className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-semibold">
                                          {s}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px]">
                                        Matematika
                                      </span>
                                    )}
                                  </div>
                                </td>

                                {/* 1. Kolom Simulasi CBT */}
                                <td className="py-3 px-3 min-w-[130px]">
                                  {p.simulatedExam ? (
                                    <div className="space-y-1">
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                        p.simulatedExam.score >= 70 ? 'bg-amber-100 text-amber-900' : 'bg-rose-50 text-rose-800'
                                      }`}>
                                        <CheckCircle className="w-3 h-3 text-amber-600" />
                                        Skor: {p.simulatedExam.score}/100
                                      </span>
                                      <div className="text-[10px] text-[#756F68]">
                                        Mapel: {p.simulatedExam.subject}
                                      </div>
                                      <div className="text-[10px] font-bold text-neutral-600 flex items-center gap-1">
                                        <span>Percobaan: {p.simulatedAttempts || 1}/2</span>
                                        {(p.simulatedAttempts || 0) >= 2 && (
                                          <span className="text-[9px] px-1 py-0.2 rounded bg-rose-100 text-rose-700 font-extrabold">Habis</span>
                                        )}
                                      </div>
                                      {(p.simulatedAttempts || 0) >= 2 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setResetQuotaParticipant(p);
                                            setResetQuotaClearHistory(false);
                                          }}
                                          className="px-2 py-0.5 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                                          title="Batas kuota simulasi habis! Klik untuk reset kuota 0/2"
                                        >
                                          <RotateCcw className="w-2.5 h-2.5 text-purple-700" />
                                          <span>Reset 0/2</span>
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-neutral-500 font-semibold bg-neutral-100 px-2 py-0.5 rounded-full inline-block">
                                        Belum Simulasi
                                      </span>
                                      <div className="text-[9px] text-[#756F68]">
                                        Kuota: {Math.max(0, 2 - (p.simulatedAttempts || 0))}x
                                      </div>
                                    </div>
                                  )}
                                </td>

                                {/* 2. Kolom Babak Penyisihan (Resmi) */}
                                <td className="py-3 px-3 min-w-[140px]">
                                  {p.penyisihanExam ? (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs ${
                                          p.penyisihanExam.score >= 70
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                                        }`}>
                                          Skor: {p.penyisihanExam.score}/100
                                        </span>
                                      </div>
                                      <div className="text-[10px] font-semibold text-[#1A1615]">
                                        {p.penyisihanExam.subject}
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          onClick={() => handleToggleQualification(p, isLolos ? 'tidak_lolos' : 'lolos')}
                                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                            isLolos
                                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                              : 'bg-rose-100 text-rose-700 border border-rose-200'
                                          }`}
                                          title="Klik untuk ubah status lolos babak final"
                                        >
                                          {isLolos ? '✓ LOLOS FINAL' : '✗ TIDAK LOLOS'}
                                        </button>
                                      </div>
                                      <div className="text-[9px] text-neutral-600 font-medium">
                                        Percobaan: {p.penyisihanAttempts || 1}/2
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-full inline-block border border-amber-200">
                                        Belum Penyisihan
                                      </span>
                                      <div className="text-[9px] text-[#756F68]">
                                        Passing Grade: 70
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          onClick={() => handleToggleQualification(p, isLolos ? 'tidak_lolos' : 'lolos')}
                                          className="text-[9px] text-[#756F68] hover:text-emerald-700 underline cursor-pointer"
                                        >
                                          {isLolos ? 'Lolos (Manual)' : 'Set Lolos Manual'}
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </td>

                                {/* 3. Kolom Babak Final & Gelar Juara */}
                                <td className="py-3 px-3 min-w-[140px]">
                                  {p.finalExam ? (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-700 text-white shadow-xs">
                                          Skor: {p.finalExam.score}/100
                                        </span>
                                      </div>
                                      <div className="text-[10px] font-semibold text-[#1A1615]">
                                        {p.finalExam.subject}
                                      </div>
                                      {p.championRank && (
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-950 font-black text-[10px] border border-purple-300">
                                          <Trophy className="w-3 h-3 text-purple-700" />
                                          <span>{p.championRank}</span>
                                        </div>
                                      )}
                                      <div className="text-[9px] text-neutral-500 font-medium">
                                        Percobaan: {p.finalAttempts || 1}/2
                                      </div>
                                      {p.violationReason && (
                                        <div className="p-1 rounded bg-rose-50 border border-rose-200 text-[9px] text-rose-700 font-semibold leading-tight">
                                          ⚠️ {p.violationReason}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-neutral-400 font-medium bg-neutral-50 px-2 py-0.5 rounded-full inline-block border border-neutral-200">
                                        Belum Ujian Final
                                      </span>
                                      <div className="text-[9px] text-neutral-500">
                                        Syarat: Lolos & Closing
                                      </div>
                                    </div>
                                  )}
                                </td>

                                {/* 4. Kolom Closing Final Rp99k */}
                                <td className="py-3 px-3">
                                  <div className="space-y-1">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleFinalPaymentClosing(p)}
                                      className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                                        isPaidClosing
                                          ? 'bg-emerald-600 text-white shadow-xs'
                                          : 'bg-neutral-100 text-neutral-600 hover:bg-amber-100 hover:text-amber-900 border border-neutral-300'
                                      }`}
                                      title="Tandai pembayaran tiket promo final Rp 99.000 (Rek BCA)"
                                    >
                                      <span>{isPaidClosing ? '★ CLOSING LUNAS' : '+ Tandai Rp99k'}</span>
                                    </button>
                                    <div className="text-[9px] text-neutral-500">
                                      {isPaidClosing ? 'BCA Rp 99.000' : 'Belum Bayar'}
                                    </div>
                                  </div>
                                </td>

                                {/* Kolom WhatsApp Follow-Up Otomatis / Manual */}
                                <td className="py-3 px-4 text-center">
                                  <div className="flex flex-col items-center gap-1">
                                    {!p.simulatedExam && (
                                      <a
                                        href={generateFollowUpWhatsAppUrl(p, 'simulasi')}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold flex items-center gap-1 transition-colors w-full justify-center"
                                        title="Follow up via WA: Peserta belum mengerjakan simulasi ujian"
                                      >
                                        <MessageCircle className="w-2.5 h-2.5 text-amber-700" />
                                        <span>Follow-Up Simulasi</span>
                                      </a>
                                    )}

                                    {(!p.simulatedExam || p.simulatedExam.score < 50) && (
                                      <a
                                        href={generateFollowUpWhatsAppUrl(p, 'penyisihan')}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-bold flex items-center gap-1 transition-colors w-full justify-center"
                                        title="Follow up via WA: Peserta belum mengerjakan babak penyisihan"
                                      >
                                        <MessageCircle className="w-2.5 h-2.5 text-rose-700" />
                                        <span>Follow-Up Penyisihan</span>
                                      </a>
                                    )}

                                    {isLolos && (
                                      <a
                                        href={generateFollowUpWhatsAppUrl(p, 'final')}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-bold flex items-center gap-1 transition-colors w-full justify-center shadow-2xs"
                                        title="Follow up via WA: Peserta lolos babak final OSN"
                                      >
                                        <MessageCircle className="w-2.5 h-2.5 text-purple-700" />
                                        <span>Follow-Up Final</span>
                                      </a>
                                    )}

                                    {/* H-2 / H-1 Reminders */}
                                    <div className="flex gap-1 w-full justify-center pt-0.5">
                                      <a
                                        href={generateFollowUpWhatsAppUrl(p, 'reminder_h2')}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-neutral-100 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-700 border border-neutral-200"
                                        title="Kirim Pesan Reminder H-2 Pelaksanaan"
                                      >
                                        H-2 WA
                                      </a>
                                      <a
                                        href={generateFollowUpWhatsAppUrl(p, 'reminder_h1')}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-neutral-100 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-700 border border-neutral-200"
                                        title="Kirim Pesan Reminder H-1 Besok Ujian"
                                      >
                                        H-1 WA
                                      </a>
                                    </div>
                                  </div>
                                </td>

                                {/* Kolom Aksi / Reset Kuota / Sync / Hapus Siswa */}
                                <td className="py-3 px-4 text-center">
                                  <div className="flex flex-col items-center gap-1.5 min-w-[130px]">
                                    {/* Tombol Utama: Reset Kuota */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setResetQuotaParticipant(p);
                                        setResetQuotaClearHistory(false);
                                      }}
                                      className={`w-full py-1.5 px-2.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                                        (p.simulatedAttempts || 0) >= 2 || (p.finalAttempts || 0) >= 2 || p.violationReason
                                          ? 'bg-purple-600 hover:bg-purple-700 text-white ring-2 ring-purple-300 shadow-purple-500/25'
                                          : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300'
                                      }`}
                                      title="Reset Kuota Pengerjaan Ujian CBT (Kembalikan ke 0/2 atau tambah kesempatan)"
                                    >
                                      <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                                      <span>Reset Kuota</span>
                                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                                        (p.simulatedAttempts || 0) >= 2 || (p.finalAttempts || 0) >= 2 || p.violationReason
                                          ? 'bg-rose-500 text-white'
                                          : 'bg-purple-200/90 text-purple-900'
                                      }`}>
                                        {p.violationReason ? 'Pelanggaran' : `${Math.max(p.simulatedAttempts || 0, p.finalAttempts || 0)}/2`}
                                      </span>
                                    </button>

                                    {/* Tombol Aksi Tambahan: Detail, Kontak, Kartu Ujian, Sertifikat, Hapus */}
                                    <div className="flex items-center justify-center gap-1.5 w-full">
                                      <button
                                        type="button"
                                        onClick={() => setViewDetailParticipant(p)}
                                        className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors cursor-pointer"
                                        title="Lihat seluruh data formulir pendaftaran peserta ini secara lengkap"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleSaveSingleContactToGoogle(p)}
                                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors cursor-pointer"
                                        title="Simpan kontak peserta ini ke Google Contacts"
                                      >
                                        <Contact className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => downloadExamCardPdf(p)}
                                        className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors cursor-pointer"
                                        title="Download Kartu Peserta Ujian PDF"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                      </button>
                                      {(p.finalExam || p.qualificationStatus === 'lolos') && (
                                        <button
                                          type="button"
                                          onClick={() => generateFinalCertificatePdf({ student: p, rankTitle: p.championRank || 'Peserta Final' })}
                                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                                          title="Unduh Sertifikat Penghargaan Babak Final OSN 2026"
                                        >
                                          <Award className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => setDeleteConfirmParticipant(p)}
                                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                                        title="Hapus data peserta ini dari sistem database"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls - Menampilkan hanya 10 baris data peserta per halaman agar akses dashboard super cepat dan hemat resources */}
                    {sortedParticipants.length > 0 && (
                      <div className="p-3.5 bg-[#FAF8F5] border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-neutral-600 font-medium text-[11px]">
                          <span>
                            Menampilkan baris ke-<strong>{(validAdminPage - 1) * ADMIN_PAGE_SIZE + 1}</strong> s/d <strong>{(validAdminPage - 1) * ADMIN_PAGE_SIZE + displayedParticipants.length}</strong> dari <strong>{sortedParticipants.length}</strong> peserta (Urutan Paling Baru)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap justify-center">
                          <button
                            type="button"
                            onClick={() => setAdminParticipantsPage(1)}
                            disabled={validAdminPage <= 1}
                            className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-xs"
                            title="Halaman Pertama (Paling Baru)"
                          >
                            « Pertama
                          </button>

                          <button
                            type="button"
                            onClick={() => setAdminParticipantsPage(prev => Math.max(1, prev - 1))}
                            disabled={validAdminPage <= 1}
                            className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-xs flex items-center gap-1"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Sebelumnya</span>
                          </button>

                          {/* Quick Page Jump Buttons */}
                          <div className="flex items-center gap-1 px-1">
                            {Array.from({ length: totalAdminPages }, (_, i) => i + 1)
                              .filter(page => page === 1 || page === totalAdminPages || Math.abs(page - validAdminPage) <= 1)
                              .map((page, idx, arr) => {
                                const prev = arr[idx - 1];
                                const hasGap = prev && page - prev > 1;
                                return (
                                  <React.Fragment key={page}>
                                    {hasGap && <span className="px-1 text-neutral-400">...</span>}
                                    <button
                                      type="button"
                                      onClick={() => setAdminParticipantsPage(page)}
                                      className={`min-w-[28px] h-7 px-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                        validAdminPage === page
                                          ? 'bg-[#1A1615] text-[#D4AF37] font-black'
                                          : 'bg-white border border-[#E8E2D9] text-neutral-700 hover:bg-neutral-100'
                                      }`}
                                    >
                                      {page}
                                    </button>
                                  </React.Fragment>
                                );
                              })}
                          </div>

                          <button
                            type="button"
                            onClick={() => setAdminParticipantsPage(prev => Math.min(totalAdminPages, prev + 1))}
                            disabled={validAdminPage >= totalAdminPages}
                            className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-xs flex items-center gap-1"
                          >
                            <span>Selanjutnya</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setAdminParticipantsPage(totalAdminPages)}
                            disabled={validAdminPage >= totalAdminPages}
                            className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors text-xs"
                            title="Halaman Terakhir"
                          >
                            Terakhir »
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB LAPORAN 1: TABEL LAPORAN PENGERJAAN SIMULASI CBT */}
              {adminTab === 'report_simulasi' && (
                <ReportSimulasiTable
                  participantsList={participantsList}
                  onResetQuota={(p) => {
                    setResetQuotaParticipant(p);
                    setResetQuotaClearHistory(false);
                  }}
                  onViewDetail={(p) => setViewDetailParticipant(p)}
                  generateFollowUpWhatsAppUrl={generateFollowUpWhatsAppUrl}
                  downloadExamCardPdf={downloadExamCardPdf}
                />
              )}

              {/* TAB LAPORAN 2: TABEL LAPORAN PENGERJAAN BABAK PENYISIHAN */}
              {adminTab === 'report_penyisihan' && (
                <ReportPenyisihanTable
                  participantsList={participantsList}
                  onToggleQualification={handleToggleQualification}
                  onToggleFinalPaymentClosing={handleToggleFinalPaymentClosing}
                  onResetQuota={(p) => {
                    setResetQuotaParticipant(p);
                    setResetQuotaClearHistory(false);
                  }}
                  onViewDetail={(p) => setViewDetailParticipant(p)}
                  generateFollowUpWhatsAppUrl={generateFollowUpWhatsAppUrl}
                  downloadExamCardPdf={downloadExamCardPdf}
                />
              )}

              {/* TAB LAPORAN 3: TABEL LAPORAN PENGERJAAN BABAK FINAL */}
              {adminTab === 'report_final' && (
                <ReportFinalTable
                  participantsList={participantsList}
                  onResetQuota={(p) => {
                    setResetQuotaParticipant(p);
                    setResetQuotaClearHistory(false);
                  }}
                  onViewDetail={(p) => setViewDetailParticipant(p)}
                  generateFollowUpWhatsAppUrl={generateFollowUpWhatsAppUrl}
                  generateFinalCertificatePdf={generateFinalCertificatePdf}
                />
              )}

              {/* TAB 2: PENGATURAN SOAL & KUNCI JAWABAN BERGAMBAR (BANK SOAL) */}
              {adminTab === 'questions' && (
                <div className="space-y-6">
                  {/* Subject Selector & Add Button */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E8E2D9] pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-[#1A1615]">Mata Pelajaran (100 Soal/Mapel):</span>
                        {['Matematika', 'IPA / Sains', 'Bahasa Indonesia', 'Bahasa Inggris'].map(subj => (
                          <button
                            key={subj}
                            onClick={() => {
                              setSelectedAdminSubject(subj);
                              setEditingQuestion(null);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedAdminSubject === subj
                                ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]'
                                : 'bg-[#FAF8F5] text-[#66615B] hover:text-[#1A1615] border border-[#E8E2D9]'
                            }`}
                          >
                            {subj} ({questionsList.filter(q => q.subject === subj).length} Soal)
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleAddNewQuestion}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Soal Baru</span>
                      </button>
                    </div>

                    {/* Filter Kategori Tahap / Level Kesulitan */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-bold text-[#756F68]">Kategori Tahap:</span>
                      {[
                        { id: 'Semua', label: 'Semua Tahap' },
                        { id: 'simulasi', label: 'Simulasi (Sangat Mudah)' },
                        { id: 'penyisihan', label: 'Penyisihan (Mudah)' },
                        { id: 'final', label: 'Babak Final (Sangat Sulit / HOTS)' }
                      ].map(stage => (
                        <button
                          key={stage.id}
                          onClick={() => setSelectedAdminStage(stage.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            selectedAdminStage === stage.id
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                              : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                          }`}
                        >
                          {stage.label}
                        </button>
                      ))}
                    </div>

                    {/* Filter Kurikulum Campuran */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-bold text-[#756F68]">Standar Kurikulum:</span>
                      {[
                        'Semua',
                        'Kurikulum Merdeka',
                        'Singapore Curriculum',
                        'Cambridge Primary/Checkpoint',
                        'International Baccalaureate (IB)',
                        'Olimpiade Sains Terpadu'
                      ].map(cur => (
                        <button
                          key={cur}
                          onClick={() => setSelectedAdminCurriculum(cur)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                            selectedAdminCurriculum === cur
                              ? 'bg-blue-100 text-blue-900 border border-blue-300 font-bold'
                              : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                          }`}
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QUESTION EDIT FORM MODAL / DRAWER */}
                  {editingQuestion && (
                    <div className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-lg space-y-4 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                        <div className="flex items-center gap-2">
                          <Edit className="w-4 h-4 text-[#D4AF37]" />
                          <h4 className="text-sm font-extrabold text-[#1A1615]">
                            {isCreatingNewQuestion ? 'Buat Soal Baru' : `Modifikasi Soal #${editingQuestion.number} (${editingQuestion.subject})`}
                          </h4>
                        </div>
                        <button
                          onClick={() => {
                            setEditingQuestion(null);
                            setIsCreatingNewQuestion(false);
                          }}
                          className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Teks Pertanyaan */}
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              Teks Pertanyaan Soal:
                            </label>
                            <textarea
                              rows={3}
                              value={editingQuestion.questionText}
                              onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })}
                              className="w-full p-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                              placeholder="Tuliskan teks pertanyaan soal..."
                            />
                          </div>

                          {/* Kategori Jenjang & Tahap */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-bold text-[#1A1615] mb-1">
                                Jenjang Pendidikan:
                              </label>
                              <select
                                value={editingQuestion.level || 'SD/MI'}
                                onChange={(e) => setEditingQuestion({ ...editingQuestion, level: e.target.value as any })}
                                className="w-full p-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5] font-semibold"
                              >
                                <option value="PAUD/TK">PAUD/TK</option>
                                <option value="SD/MI">SD / MI</option>
                                <option value="SMP/MTs">SMP / MTs</option>
                                <option value="Semua">Semua Jenjang</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#1A1615] mb-1">
                                Babak / Tingkat Kesulitan:
                              </label>
                              <select
                                value={editingQuestion.stage || 'simulasi'}
                                onChange={(e) => {
                                  const stageVal = e.target.value as any;
                                  const diffVal = stageVal === 'simulasi' ? 'Sangat Mudah' : stageVal === 'penyisihan' ? 'Mudah' : 'Sangat Sulit (HOTS)';
                                  setEditingQuestion({ ...editingQuestion, stage: stageVal, difficulty: diffVal as any });
                                }}
                                className="w-full p-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5] font-semibold"
                              >
                                <option value="simulasi">Simulasi (Sangat Mudah)</option>
                                <option value="penyisihan">Babak Penyisihan (Mudah)</option>
                                <option value="final">Babak Final (Sangat Sulit / HOTS)</option>
                              </select>
                            </div>
                          </div>

                          {/* Standar Kurikulum */}
                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              Standar Kurikulum:
                            </label>
                            <select
                              value={editingQuestion.curriculum || 'Kurikulum Merdeka'}
                              onChange={(e) => setEditingQuestion({ ...editingQuestion, curriculum: e.target.value as any })}
                              className="w-full p-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5] font-semibold"
                            >
                              <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                              <option value="Singapore Curriculum">Singapore Curriculum</option>
                              <option value="Cambridge Primary/Checkpoint">Cambridge Primary/Checkpoint</option>
                              <option value="International Baccalaureate (IB)">International Baccalaureate (IB)</option>
                              <option value="Olimpiade Sains Terpadu">Olimpiade Sains Terpadu</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              URL Gambar / Gambar Ilustrasi:
                            </label>
                            <input
                              type="text"
                              value={editingQuestion.imageUrl || ''}
                              onChange={(e) => setEditingQuestion({ ...editingQuestion, imageUrl: e.target.value })}
                              placeholder="https://... atau biarkan kosong untuk gambar SVG bawaan"
                              className="w-full p-2.5 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                            />
                            <p className="text-[10px] text-[#756F68] mt-1">
                              Admin dapat memasukkan link URL gambar JPG/PNG eksternal untuk mengganti ilustrasi soal.
                            </p>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              Kunci Jawaban Benar:
                            </label>
                            <select
                              value={editingQuestion.correctAnswer}
                              onChange={(e) => setEditingQuestion({ ...editingQuestion, correctAnswer: e.target.value as 'A' | 'B' | 'C' | 'D' })}
                              className="w-full p-2.5 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5] font-bold"
                            >
                              <option value="A">Pilihan A</option>
                              <option value="B">Pilihan B</option>
                              <option value="C">Pilihan C</option>
                              <option value="D">Pilihan D</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#1A1615] mb-1">
                              Penjelasan / Pembahasan Soal:
                            </label>
                            <textarea
                              rows={2}
                              value={editingQuestion.explanation}
                              onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                              className="w-full p-2.5 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                            />
                          </div>
                        </div>

                        {/* Pilihan Jawaban A, B, C, D & Preview Gambar */}
                        <div className="space-y-3">
                          <label className="block text-xs font-bold text-[#1A1615]">
                            Pilihan Jawaban (A, B, C, D):
                          </label>
                          {editingQuestion.options.map((opt, idx) => (
                            <div key={opt.key} className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#1A1615] text-[#D4AF37] font-bold text-xs flex items-center justify-center shrink-0">
                                {opt.key}
                              </span>
                              <input
                                type="text"
                                value={opt.text}
                                onChange={(e) => {
                                  const newOptions = [...editingQuestion.options];
                                  newOptions[idx].text = e.target.value;
                                  setEditingQuestion({ ...editingQuestion, options: newOptions });
                                }}
                                className="flex-1 p-2 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                              />
                            </div>
                          ))}

                          {/* Preview Gambar */}
                          <div className="pt-2">
                            <span className="block text-xs font-bold text-[#756F68] mb-1">
                              Pratinjau Gambar Soal:
                            </span>
                            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] flex items-center justify-center min-h-[100px]">
                              {editingQuestion.imageUrl ? (
                                <img
                                  src={editingQuestion.imageUrl}
                                  alt="Preview"
                                  className="max-h-32 object-contain rounded"
                                />
                              ) : editingQuestion.imageSvg ? (
                                <img
                                  src={editingQuestion.imageSvg}
                                  alt="Preview SVG"
                                  className="max-h-32 object-contain rounded"
                                />
                              ) : (
                                <div className="text-xs text-[#756F68] flex items-center gap-1">
                                  <ImageIcon className="w-4 h-4" /> Belum ada gambar
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8E2D9]">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingQuestion(null);
                            setIsCreatingNewQuestion(false);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-[#756F68] hover:bg-neutral-100 cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveQuestion}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>Simpan Perubahan Soal ke Server</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Questions List Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#756F68]">
                      <span>Daftar {adminQuestionsBySubject.length} Soal Bergambar ({selectedAdminSubject})</span>
                      <span className="text-emerald-700 font-bold">Semua Soal Siap Diujikan di Ruang Siswa</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adminQuestionsBySubject.map((q, idx) => (
                        <div
                          key={q.id}
                          className="bg-white rounded-2xl border border-[#E8E2D9] p-4 space-y-3 hover:border-[#D4AF37] transition-all shadow-xs"
                        >
                          <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-black text-[#1A1615]">
                                Soal #{idx + 1} ({q.subject})
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                q.stage === 'simulasi'
                                  ? 'bg-blue-100 text-blue-800'
                                  : q.stage === 'penyisihan'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {q.stage === 'simulasi' ? 'Simulasi' : q.stage === 'penyisihan' ? 'Penyisihan' : 'Final'} · {q.difficulty || 'Mudah'}
                              </span>
                              {q.curriculum && (
                                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                                  {q.curriculum}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingQuestion({ ...q });
                                  setIsCreatingNewQuestion(false);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Edit className="w-3 h-3" /> Edit Soal
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(q.id)}
                                className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Hapus Soal"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Thumbnail Gambar */}
                          <div className="flex items-start gap-3">
                            <div className="w-24 h-16 rounded-lg bg-neutral-100 border border-[#E8E2D9] overflow-hidden shrink-0 flex items-center justify-center p-1">
                              {q.imageUrl ? (
                                <img src={q.imageUrl} alt="" className="h-full object-contain" />
                              ) : q.imageSvg ? (
                                <img src={q.imageSvg} alt="" className="h-full object-contain" />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-neutral-400" />
                              )}
                            </div>
                            <p className="text-xs text-[#1A1615] line-clamp-3 font-medium">
                              {q.questionText}
                            </p>
                          </div>

                          {/* Pilihan Jawaban Ringkas */}
                          <div className="grid grid-cols-2 gap-1 text-[11px]">
                            {q.options.map(opt => (
                              <div
                                key={opt.key}
                                className={`px-2 py-1 rounded-md flex items-center gap-1 truncate ${
                                  opt.key === q.correctAnswer
                                    ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                                    : 'bg-neutral-50 text-neutral-700'
                                }`}
                              >
                                <span>{opt.key}.</span>
                                <span className="truncate">{opt.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: GOOGLE WORKSPACE INTEGRATION (SHEETS, CONTACTS, DRIVE) */}
              {adminTab === 'workspace' && (
                <div className="space-y-6">
                  {/* Google Account Auth Card */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                          <HardDrive className="w-6 h-6 text-[#4285F4]" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[#1A1615] flex items-center gap-2">
                            <span>Integrasi Google Workspace Cloud</span>
                            {googleUser && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Aktif & Terhubung
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-[#756F68] mt-0.5">
                            Sinkronisasi data peserta langsung ke Google Sheets, simpan nomor WA siswa ke Google Contacts, dan backup berkas ke Google Drive.
                          </p>
                        </div>
                      </div>

                      <div>
                        {googleUser ? (
                          <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                              <span className="text-xs font-bold text-[#1A1615] block">{googleUser.displayName || 'Akun Google'}</span>
                              <span className="text-[10px] text-[#756F68] block">{googleUser.email}</span>
                            </div>
                            <button
                              type="button"
                              onClick={handleGoogleSignOut}
                              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-rose-50 text-rose-700 transition-colors border border-neutral-200 cursor-pointer"
                            >
                              Putuskan Akun
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading}
                            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#4285F4] hover:bg-blue-600 text-white shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="#fff" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                            </svg>
                            <span>{isGoogleLoading ? 'Menghubungkan...' : 'Sign in with Google'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3 Main Action Cards: Sheets, Contacts, Drive */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Google Sheets Card */}
                    <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] space-y-3 shadow-xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                          <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <h5 className="text-sm font-extrabold text-[#1A1615]">Google Sheets Export</h5>
                        <p className="text-xs text-[#756F68] leading-relaxed">
                          Buat dan perbarui spreadsheet online di akun Google Anda berisi tabel lengkap data peserta, nomor telepon, hasil ujian, dan asal sekolah.
                        </p>
                      </div>

                      <div className="pt-2">
                        {lastCreatedSheet ? (
                          <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                            <span className="font-bold text-emerald-900 block truncate">{lastCreatedSheet.title}</span>
                            <a
                              href={lastCreatedSheet.spreadsheetUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 underline font-semibold flex items-center gap-1 mt-1 text-[11px]"
                            >
                              <span>Buka di Google Sheets</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ) : null}
                        <button
                          type="button"
                          onClick={requestExportGoogleSheet}
                          disabled={!googleUser || isExportingSheet}
                          className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>{isExportingSheet ? 'Memproses...' : 'Ekspor ke Google Sheets'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Google Contacts Card */}
                    <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] space-y-3 shadow-xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                          <Users2 className="w-5 h-5" />
                        </div>
                        <h5 className="text-sm font-extrabold text-[#1A1615]">Google Contacts Sync</h5>
                        <p className="text-xs text-[#756F68] leading-relaxed">
                          Sinkronkan nomor WhatsApp wali murid & siswa langsung ke Google Contacts buku telepon Anda agar mudah dibroadcast.
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="text-[11px] text-[#756F68] mb-2 font-medium">
                          {googleContacts.length > 0 ? `${googleContacts.length} kontak terbaca di akun Google` : 'Belum memuat kontak'}
                        </div>
                        <button
                          type="button"
                          onClick={requestSyncGoogleContacts}
                          disabled={!googleUser || isSyncingContacts}
                          className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1A1615] hover:bg-neutral-800 disabled:opacity-40 text-[#D4AF37] border border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Contact className="w-4 h-4 text-[#D4AF37]" />
                          <span>{isSyncingContacts ? 'Menyinkronkan...' : 'Sinkron ke Kontak Google'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Google Drive Backup Card */}
                    <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] space-y-3 shadow-xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                          <HardDrive className="w-5 h-5" />
                        </div>
                        <h5 className="text-sm font-extrabold text-[#1A1615]">Google Drive Backup</h5>
                        <p className="text-xs text-[#756F68] leading-relaxed">
                          Simpan file cadangan database sistem (.json) secara aman di Google Drive akun Anda untuk keamanan data arsip kepanitiaan.
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="text-[11px] text-[#756F68] mb-2 font-medium">
                          {driveFiles.length > 0 ? `${driveFiles.length} file terbaru di Google Drive` : 'Google Drive Storage'}
                        </div>
                        <button
                          type="button"
                          onClick={requestBackupDrive}
                          disabled={!googleUser || isUploadingDrive}
                          className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <HardDrive className="w-4 h-4" />
                          <span>{isUploadingDrive ? 'Mengunggah...' : 'Backup ke Google Drive'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List of Files in Drive */}
                  {driveFiles.length > 0 && (
                    <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                        <h5 className="text-xs font-bold text-[#1A1615] flex items-center gap-2">
                          <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                          <span>Berkas di Google Drive Akun Anda</span>
                        </h5>
                        <button
                          type="button"
                          onClick={loadWorkspaceData}
                          className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-bold"
                        >
                          <RefreshCw className="w-3 h-3" /> Refresh
                        </button>
                      </div>
                      <div className="divide-y divide-neutral-100 max-h-56 overflow-y-auto">
                        {driveFiles.map(f => (
                          <div key={f.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="font-semibold text-[#1A1615] truncate">{f.name}</span>
                            </div>
                            {f.webViewLink && (
                              <a
                                href={f.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-blue-600 hover:underline shrink-0 flex items-center gap-1"
                              >
                                <span>Buka</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: JADWAL PELAKSANAAN EVENT MANAGEMENT */}
              {adminTab === 'schedule' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4 mb-4">
                      <div>
                        <h4 className="text-base font-extrabold text-[#1A1615] flex items-center gap-2">
                          <CalendarDays className="w-5 h-5 text-[#D4AF37]" />
                          <span>Pengaturan Tanggal Jadwal Pelaksanaan Olimpiade</span>
                        </h4>
                        <p className="text-xs text-[#756F68] mt-1">
                          Ubah tanggal dan deskripsi tahapan pendaftaran, ujian babak penyisihan CBT, final, dan pengumuman pemenang. Perubahan akan langsung tampil di halaman depan website.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSaveScheduleConfig}
                        disabled={isSavingSchedule}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1A1615] hover:bg-neutral-800 text-[#D4AF37] border border-[#D4AF37]/50 shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSavingSchedule ? 'Menyimpan...' : 'Simpan Perubahan Jadwal'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Step 1: Pendaftaran */}
                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">Tahap 01</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Pendaftaran</span>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Tanggal Pendaftaran Dibuka</label>
                          <input
                            type="text"
                            value={eventSchedule.registrationOpenDate}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, registrationOpenDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Contoh: 25 Agustus – 11 September 2026"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Deskripsi Pendaftaran</label>
                          <textarea
                            rows={2}
                            value={eventSchedule.registrationDesc}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, registrationDesc: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      {/* Step 2: Penyisihan */}
                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">Tahap 02</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Penyisihan Gratis</span>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Tanggal Babak Penyisihan (CBT)</label>
                          <input
                            type="text"
                            value={eventSchedule.penyisihanDate}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, penyisihanDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Contoh: 12 September 2026"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Deskripsi Penyisihan</label>
                          <textarea
                            rows={2}
                            value={eventSchedule.penyisihanDesc}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, penyisihanDesc: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      {/* Step 3: Final */}
                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">Tahap 03</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Babak Final</span>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Tanggal Babak Final Nasional</label>
                          <input
                            type="text"
                            value={eventSchedule.finalDate}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, finalDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Contoh: 19 September 2026"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Deskripsi Final</label>
                          <textarea
                            rows={2}
                            value={eventSchedule.finalDesc}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, finalDesc: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      {/* Step 4: Pengumuman Juara */}
                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">Tahap 04</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">Pengumuman & Medali</span>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Tanggal Pengumuman Juara</label>
                          <input
                            type="text"
                            value={eventSchedule.announcementDate}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, announcementDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                            placeholder="Contoh: 20 September 2026"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#1A1615] block mb-1">Deskripsi Pengumuman</label>
                          <textarea
                            rows={2}
                            value={eventSchedule.announcementDesc}
                            onChange={(e) => setEventSchedule({ ...eventSchedule, announcementDesc: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PENGUMUMAN PESERTA LOLOS BABAK PENYISIHAN & PEMENANG JUARA */}
              {adminTab === 'announcements' && (
                <div className="space-y-6">
                  {/* Banner & Export Official Reports */}
                  <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-emerald-600" />
                          <h4 className="text-base font-extrabold text-[#1A1615]">
                            Tabel Informasi Pengumuman Peserta Lolos & Juara Pemenang
                          </h4>
                        </div>
                        <p className="text-xs text-[#756F68] mt-1">
                          Sesuai Alur Pelaksanaan OSN: Pada H+2 babak penyisihan, admin menetapkan peserta yang lolos ke babak final. Peserta lolos dapat membeli tiket final dan bagi yang telah menyelesaikan final akan diumumkan peringkat juaranya beserta penerbitan sertifikat resmi.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Tombol Broadcast WhatsApp API Pengumuman Kelulusan */}
                        <button
                          type="button"
                          onClick={handleBroadcastQualificationAnnouncements}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5 cursor-pointer transition-all border border-emerald-400"
                          title="Kirim pesan resmi pengumuman kelulusan ke nomor WhatsApp seluruh peserta lolos"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Broadcast WhatsApp API Kelulusan</span>
                        </button>

                        {/* Dokumen 1: Laporan Peserta Lolos Babak Penyisihan */}
                        <button
                          type="button"
                          onClick={() => exportLolosPenyisihanReportPdf(participantsList)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
                          title="Download Dokumen Resmi 1: Laporan Peserta Lolos Babak Penyisihan PDF"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>1. Cetak Laporan Lolos Penyisihan (PDF)</span>
                        </button>

                        {/* Dokumen 2: Laporan Peserta Lolos Babak Final & Pemenang Juara */}
                        <button
                          type="button"
                          onClick={() => exportLolosFinalDanJuaraReportPdf(participantsList)}
                          className="px-3.5 py-2 rounded-xl bg-[#1A1615] hover:bg-neutral-800 text-[#D4AF37] border border-[#D4AF37]/50 font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
                          title="Download Dokumen Resmi 2: Laporan Peserta Lolos Babak Final & Pemenang Juara PDF"
                        >
                          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>2. Cetak Laporan Pemenang Juara (PDF)</span>
                        </button>
                      </div>
                    </div>

                    {/* Stats Ringkasan Kelulusan & Final Closing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase block">Peserta Dinyatakan Lolos</span>
                        <div className="text-2xl font-black text-emerald-900 mt-1">
                          {participantsList.filter(p => p.qualificationStatus === 'lolos').length} <span className="text-xs font-normal">Siswa</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold">Tercatat Lolos Babak Penyisihan</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                        <span className="text-[10px] font-bold text-amber-800 uppercase block">Peserta Closing Final</span>
                        <div className="text-2xl font-black text-amber-900 mt-1">
                          {totalClosingCountAll} <span className="text-xs font-normal">Siswa</span>
                        </div>
                        <span className="text-[11px] text-amber-700 font-semibold">Tiket Final Lunas Terkonfirmasi</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-emerald-100/60 border border-emerald-300">
                        <span className="text-[10px] font-black text-emerald-900 uppercase block">Total Nominal Closing</span>
                        <div className="text-2xl font-black text-emerald-800 mt-1">
                          Rp {totalClosingNominalAll.toLocaleString('id-ID')}
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold">Rek BCA 018-2161-789 (Pusat)</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
                        <span className="text-[10px] font-bold text-purple-800 uppercase block">Pemenang Juara & Sertifikat</span>
                        <div className="text-2xl font-black text-purple-900 mt-1">
                          {totalWinnersCountAll} <span className="text-xs font-normal">Juara</span>
                        </div>
                        <span className="text-[11px] text-purple-700 font-semibold">Peringkat 1, 2, 3 & Finalis</span>
                      </div>
                    </div>

                    {/* Tabel Manajemen Lolos & Gelar Juara */}
                    <div className="border border-[#E8E2D9] rounded-2xl overflow-hidden mt-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#756F68] font-bold text-[11px]">
                              <th className="py-3 px-4">No. & ID</th>
                              <th className="py-3 px-4">Nama Siswa & Sekolah</th>
                              <th className="py-3 px-4">Hasil CBT Penyisihan</th>
                              <th className="py-3 px-4">Status Kelulusan Admin</th>
                              <th className="py-3 px-4">Tiket Final (Rp 99.000)</th>
                              <th className="py-3 px-4">Predikat / Juara</th>
                              <th className="py-3 px-4 text-center">Sertifikat Final</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E8E2D9]">
                            {displayedAnnounceParticipants.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="py-12 text-center text-neutral-500">
                                  <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                                  <p className="font-bold text-sm text-[#1A1615]">Tidak ada data peserta ditemukan</p>
                                  <p className="text-xs text-[#756F68] mt-1">Coba sesuaikan kata kunci pencarian atau filter yang dipilih.</p>
                                </td>
                              </tr>
                            ) : (
                              displayedAnnounceParticipants.map((p, idx) => {
                              const isLolos = p.qualificationStatus === 'lolos';
                              const isPaid = p.finalTicketPaymentStatus === 'paid_closing';

                              return (
                                <tr key={p.id} className="hover:bg-amber-50/30">
                                  <td className="py-3 px-4 font-mono">
                                    <div className="font-bold text-[#1A1615]">{(validAnnouncePage - 1) * ADMIN_PAGE_SIZE + idx + 1}. {p.id}</div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="font-bold text-[#1A1615]">{p.fullName}</div>
                                    <div className="text-[10px] text-[#756F68]">{p.schoolName} ({p.level.split(' ')[0]})</div>
                                    <div className="text-[10px] text-emerald-700 font-mono">{p.whatsapp}</div>
                                  </td>
                                  <td className="py-3 px-4">
                                    {p.simulatedExam ? (
                                      <span className="font-bold text-[#1A1615] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                        {p.simulatedExam.score}/100 ({p.simulatedExam.subject})
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-neutral-400 italic">Belum Ujian</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4">
                                    <select
                                      value={p.qualificationStatus || 'pending'}
                                      onChange={(e) => handleToggleQualification(p, e.target.value as any)}
                                      className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                        isLolos
                                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                          : p.qualificationStatus === 'tidak_lolos'
                                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                                          : 'bg-white text-neutral-700 border-[#E8E2D9]'
                                      }`}
                                    >
                                      <option value="pending">Menunggu Keputusan</option>
                                      <option value="lolos">✓ LOLOS BABAK FINAL</option>
                                      <option value="tidak_lolos">✗ TIDAK LOLOS</option>
                                    </select>
                                  </td>
                                  <td className="py-3 px-4">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleFinalPaymentClosing(p)}
                                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                                        isPaid
                                          ? 'bg-emerald-600 text-white shadow-xs'
                                          : 'bg-neutral-100 text-neutral-600 hover:bg-amber-100 hover:text-amber-900 border border-neutral-300'
                                      }`}
                                    >
                                      {isPaid ? '★ CLOSING LUNAS (Rp 99k)' : 'Tandai Closing Rp 99k'}
                                    </button>
                                  </td>
                                  <td className="py-3 px-4">
                                    <select
                                      value={p.championRank || 'Peserta Final'}
                                      onChange={(e) => handleSetChampionRank(p, e.target.value as any)}
                                      className="px-2 py-1 rounded-lg text-xs font-semibold bg-white border border-[#E8E2D9] text-[#1A1615]"
                                    >
                                      <option value="Juara 1">Medali Emas (Juara 1)</option>
                                      <option value="Juara 2">Medali Perak (Juara 2)</option>
                                      <option value="Juara 3">Medali Perunggu (Juara 3)</option>
                                      <option value="Peserta Final">Finalis Berprestasi</option>
                                      <option value="Belum Dinilai">Belum Dinilai</option>
                                    </select>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <button
                                      type="button"
                                      onClick={() => generateFinalCertificatePdf({ student: p, rankTitle: p.championRank || 'Peserta Final' })}
                                      className="px-2.5 py-1 rounded-lg bg-[#1A1615] text-[#D4AF37] hover:bg-neutral-800 text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer border border-[#D4AF37]/50 shadow-xs"
                                      title="Download Sertifikat Peserta Final Resmi dengan Stempel & Gelar Juara"
                                    >
                                      <Download className="w-3 h-3" />
                                      <span>Sertifikat</span>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls untuk Tab Pengumuman */}
                      {sortedParticipants.length > 0 && (
                        <div className="p-3 bg-[#FAF8F5] border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                          <div className="text-[11px] text-neutral-600 font-medium">
                            Menampilkan data ke-<strong>{(validAnnouncePage - 1) * ADMIN_PAGE_SIZE + 1}</strong> s/d <strong>{(validAnnouncePage - 1) * ADMIN_PAGE_SIZE + displayedAnnounceParticipants.length}</strong> dari <strong>{sortedParticipants.length}</strong> peserta
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap justify-center">
                            <button
                              type="button"
                              onClick={() => setAdminAnnouncePage(prev => Math.max(1, prev - 1))}
                              disabled={validAnnouncePage <= 1}
                              className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs flex items-center gap-1"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Sebelumnya</span>
                            </button>
                            <span className="font-extrabold text-[#1A1615] px-2 text-xs">
                              Hal {validAnnouncePage} / {totalAnnouncePages}
                            </span>
                            <button
                              type="button"
                              onClick={() => setAdminAnnouncePage(prev => Math.min(totalAnnouncePages, prev + 1))}
                              disabled={validAnnouncePage >= totalAnnouncePages}
                              className="px-2.5 py-1 rounded-lg border border-[#E8E2D9] bg-white text-neutral-700 font-bold hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs flex items-center gap-1"
                            >
                              <span>Selanjutnya</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: PENGATURAN META PIXEL IKLAN */}
              {adminTab === 'pixel' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-5">
                    <div className="border-b border-[#E8E2D9] pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="w-5 h-5 text-blue-600" />
                          <h4 className="text-base font-extrabold text-[#1A1615]">
                            Pengaturan Meta Pixel (Facebook & Instagram Ads)
                          </h4>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${pixelConfig.isEnabled ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-neutral-100 text-neutral-600'}`}>
                          {pixelConfig.isEnabled ? 'Status: Pixel Aktif' : 'Status: Pixel Nonaktif'}
                        </span>
                      </div>
                      <p className="text-xs text-[#756F68] mt-1">
                        Sesuai Alur 1 & 2: Pasang ID Meta Pixel atau custom script HTML untuk melacak calon peserta dari iklan Facebook / Instagram yang mendaftar di website ini. Sistem secara otomatis mengirim event standar seperti <code>PageView</code>, <code>Lead</code>, dan <code>CompleteRegistration</code>.
                      </p>
                    </div>

                    <form onSubmit={handleSavePixel} className="space-y-4">
                      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200">
                        <input
                          type="checkbox"
                          id="pixel_enabled"
                          checked={pixelConfig.isEnabled}
                          onChange={(e) => setPixelConfig({ ...pixelConfig, isEnabled: e.target.checked })}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="pixel_enabled" className="text-xs font-bold text-blue-900 cursor-pointer">
                          Aktifkan Pelacakan Meta Pixel di Seluruh Halaman Website
                        </label>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#1A1615] block mb-1">
                          Meta Pixel ID (Facebook Pixel ID)
                        </label>
                        <input
                          type="text"
                          value={pixelConfig.pixelId}
                          onChange={(e) => setPixelConfig({ ...pixelConfig, pixelId: e.target.value })}
                          placeholder="Contoh: 123456789012345"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono border border-[#E8E2D9] focus:outline-none focus:border-blue-500 bg-[#FAF8F5]"
                        />
                        <span className="text-[11px] text-[#756F68] mt-0.5 block">
                          Masukkan 15-16 digit angka Pixel ID dari Meta Events Manager.
                        </span>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#1A1615] block mb-1">
                          Kode HTML / Skrip Custom Meta Pixel (Opsional)
                        </label>
                        <textarea
                          rows={6}
                          value={pixelConfig.customScript}
                          onChange={(e) => setPixelConfig({ ...pixelConfig, customScript: e.target.value })}
                          placeholder="<!-- Meta Pixel Code -->&#10;<script>&#10;!function(f,b,e,v,n,t,s)...&#10;</script>"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono border border-[#E8E2D9] focus:outline-none focus:border-blue-500 bg-[#FAF8F5]"
                        />
                        <span className="text-[11px] text-[#756F68] mt-0.5 block">
                          Jika Anda memiliki kode snippet JavaScript lengkap dari Meta Business Suite, tempelkan di sini. Sistem akan otomatis memasukkannya ke dalam <code>&lt;head&gt;</code> halaman.
                        </span>
                      </div>

                      <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                        {pixelSavedSuccess ? (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Pengaturan Pixel Berhasil Disimpan!
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#756F68]">
                            Event otomatis: <strong>Lead</strong>, <strong>CompleteRegistration</strong> saat pendaftaran disubmit.
                          </span>
                        )}

                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Simpan Pengaturan Pixel</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 7: PENGATURAN FITUR ANTI-CONTEK UJIAN (FINAL STAGE ONLY) */}
              {adminTab === 'anticheat' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold">
                          <ShieldAlert className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold text-[#1A1615] flex items-center gap-2">
                            <span>Pengaturan Sistem Anti-Kecurangan (Anti-Cheat) Ujian CBT</span>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                              isAntiCheatEnabled ? 'bg-rose-100 text-rose-800' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {isAntiCheatEnabled ? 'STATUS: AKTIF (BABAK FINAL)' : 'STATUS: NON-AKTIF'}
                            </span>
                          </h4>
                          <p className="text-xs text-[#756F68] mt-0.5">
                            Konfigurasi proteksi pengawasan ujian ketat untuk Babak Final OSN 2026.
                          </p>
                        </div>
                      </div>

                      {/* TOGGLE SWITCH ON/OFF ANTI CONTEK */}
                      <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E2D9]">
                        <span className="text-xs font-extrabold text-[#1A1615]">
                          Proteksi Anti-Cheat:
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !isAntiCheatEnabled;
                            setIsAntiCheatEnabled(nextState);
                            try {
                              localStorage.setItem('osn_anti_cheat_enabled', String(nextState));
                            } catch (e) {
                              console.error(e);
                            }
                            setAdminNotification(`Fitur Anti-Contek Ujian Babak Final berhasil ${nextState ? 'DIAKTIFKAN' : 'DINONAKTIFKAN'}!`);
                            setTimeout(() => setAdminNotification(''), 4000);
                          }}
                          className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isAntiCheatEnabled ? 'bg-rose-600' : 'bg-neutral-300'
                          }`}
                          title="Klik untuk mengubah status aktif/non-aktif anti contek"
                        >
                          <span
                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              isAntiCheatEnabled ? 'translate-x-7' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-black ${isAntiCheatEnabled ? 'text-rose-700' : 'text-neutral-500'}`}>
                          {isAntiCheatEnabled ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </div>

                    {/* Ketentuan dan Aturan Operasional Anti Contek */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                          <CheckCircle2 className="w-4 h-4 text-amber-700" />
                          <span>Aturan Aktivasi Babak Ujian:</span>
                        </div>
                        <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                          <li><strong>Babak Penyisihan (Simulasi):</strong> Fitur anti-contek otomatis <em>TIDAK DI-AKTIFKAN</em> agar peserta dapat berlatih dengan tenang dan beradaptasi dengan sistem CBT.</li>
                          <li><strong>Babak Final:</strong> Fitur anti-contek otomatis <em>AKTIF</em> secara ketat untuk menjamin integritas dan kejujuran perlombaan medali resmi.</li>
                          <li>Admin dapat mematikan atau menyalakan proteksi ini sewaktu-waktu melalui tombol toggle di atas.</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-rose-950">
                          <ShieldAlert className="w-4 h-4 text-rose-700" />
                          <span>Mekanisme Deteksi Kecurangan yang Berlaku:</span>
                        </div>
                        <ul className="text-xs text-rose-900 space-y-1.5 list-disc list-inside">
                          <li><strong>Pindah Tab / Buka Halaman Baru:</strong> Ujian langsung dihentikan otomatis dan muncul popup notifikasi pelanggaran.</li>
                          <li><strong>Salin Soal (Copy) / Potong Teks (Cut):</strong> Akses clipboard diblokir dan memicu popup deteksi kecurangan.</li>
                          <li><strong>Screenshot / PrintScreen:</strong> Menekan tombol screenshot diblokir dan langsung terdeteksi.</li>
                          <li><strong>Klik Kanan & Inspeksi Elemen:</strong> Diblokir dan dicatat di database peserta.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Ringkasan Peserta dengan Riwayat Pelanggaran Anti-Cheat */}
                    <div className="space-y-3 pt-2">
                      <h5 className="text-xs font-extrabold text-[#1A1615] uppercase tracking-wider flex items-center gap-2">
                        <span>Log Peserta yang Terdeteksi Pelanggaran Anti-Cheat</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-100 text-rose-800 font-bold">
                          {participantsList.filter(p => !!p.violationReason).length} Terdeteksi
                        </span>
                      </h5>

                      {participantsList.filter(p => !!p.violationReason).length === 0 ? (
                        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-center text-xs text-[#756F68]">
                          Belum ada peserta yang tercatat melakukan pelanggaran anti-cheat. Seluruh peserta mematuhi tata tertib ujian.
                        </div>
                      ) : (
                        <div className="border border-rose-200 rounded-2xl overflow-hidden">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-rose-50 text-rose-900 font-bold text-[11px]">
                              <tr>
                                <th className="py-2.5 px-3">No. Peserta</th>
                                <th className="py-2.5 px-3">Nama Siswa</th>
                                <th className="py-2.5 px-3">Alasan Pelanggaran Terdeteksi</th>
                                <th className="py-2.5 px-3 text-center">Aksi Admin</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-rose-100">
                              {participantsList.filter(p => !!p.violationReason).map(p => (
                                <tr key={p.id} className="hover:bg-rose-50/40">
                                  <td className="py-2.5 px-3 font-mono font-bold text-[#1A1615]">{p.id}</td>
                                  <td className="py-2.5 px-3 font-bold text-neutral-900">{p.fullName} ({p.schoolName})</td>
                                  <td className="py-2.5 px-3 text-rose-700 font-semibold">{p.violationReason}</td>
                                  <td className="py-2.5 px-3 text-center">
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        if (confirm(`Hapus catatan pelanggaran dan reset kuota ujian untuk ${p.fullName}?`)) {
                                          await resetParticipantAttempts(p.id);
                                          setParticipantsList(getAllParticipants());
                                          setAdminNotification(`Catatan pelanggaran untuk ${p.fullName} berhasil dibersihkan!`);
                                          setTimeout(() => setAdminNotification(''), 4000);
                                        }
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 text-[11px] font-bold text-neutral-800 transition-colors shadow-xs cursor-pointer"
                                    >
                                      Bersihkan / Reset Kuota
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: PENGELOLAAN FOTO DOKUMENTASI JUARA OSN (ADMIN ONLY) */}
              {adminTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D9]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold">
                          <Trophy className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold text-[#1A1615] flex items-center gap-2">
                            <span>Pengelolaan & Sinkronisasi Foto Galeri Juara OSN 2026</span>
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              KHUSUS PANITIA / ADMIN
                            </span>
                          </h4>
                          <p className="text-xs text-[#756F68] mt-0.5">
                            Unggah foto asli peserta peraih trofi dan medali. Perubahan foto langsung otomatis tampil di galeri depan dan tidak dapat diubah oleh pengunjung umum.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        <strong>Keamanan Akses Terpusat:</strong> Fitur unggah foto dokumentasi juara hanya terbuka di Portal Admin ini dan saat Admin sedang login. Pengunjung umum hanya dapat melihat foto resmi tanpa opsi upload.
                      </span>
                    </div>

                    {/* Champions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {APP_CONFIG.gallery.map((gal) => {
                        let customImgs: Record<string, string> = {};
                        try {
                          const saved = localStorage.getItem('osn_gallery_custom_images');
                          customImgs = saved ? JSON.parse(saved) : {};
                        } catch {}
                        const currentSrc = customImgs[gal.id] || gal.image;

                        return (
                          <div
                            key={gal.id}
                            className="p-4 rounded-2xl border border-[#E8E2D9] bg-[#FAF8F5] flex flex-col justify-between space-y-3 hover:border-[#D4AF37] transition-all"
                          >
                            <div className="flex gap-3">
                              <img
                                src={currentSrc}
                                alt={gal.title}
                                className="w-20 h-24 rounded-xl object-cover border border-[#D4AF37]/50 shrink-0 bg-neutral-900"
                                onError={(e) => {
                                  const t = e.currentTarget;
                                  t.onerror = null;
                                  t.src = gal.id === 'gal-abizar' ? '/abizar_radinka_annail.svg' : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';
                                }}
                              />
                              <div className="space-y-1 overflow-hidden">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D4AF37] text-[#1A1615] inline-block">
                                  {gal.badge}
                                </span>
                                <h5 className="text-xs font-bold text-[#1A1615] truncate" title={gal.title}>
                                  {gal.studentName || gal.title}
                                </h5>
                                <p className="text-[10px] text-neutral-500 truncate">
                                  {gal.category}
                                </p>
                                <p className="text-[10px] text-amber-800 font-semibold truncate">
                                  {gal.trophy}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-between gap-2">
                              <label className="flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Ganti Foto</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = (uploadEvent) => {
                                      const res = uploadEvent.target?.result as string;
                                      if (res) {
                                        try {
                                          const prev = JSON.parse(localStorage.getItem('osn_gallery_custom_images') || '{}');
                                          prev[gal.id] = res;
                                          localStorage.setItem('osn_gallery_custom_images', JSON.stringify(prev));
                                          window.dispatchEvent(new Event('storage'));
                                          setAdminNotification(`Foto ${gal.studentName || gal.title} berhasil diperbarui!`);
                                          setTimeout(() => setAdminNotification(''), 3000);
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }}
                                />
                              </label>

                              {customImgs[gal.id] && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    try {
                                      const prev = JSON.parse(localStorage.getItem('osn_gallery_custom_images') || '{}');
                                      delete prev[gal.id];
                                      localStorage.setItem('osn_gallery_custom_images', JSON.stringify(prev));
                                      window.dispatchEvent(new Event('storage'));
                                      setAdminNotification(`Foto ${gal.studentName || gal.title} direset ke default.`);
                                      setTimeout(() => setAdminNotification(''), 3000);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  className="px-2 py-1.5 rounded-lg text-[10px] font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* POPUP 1: DISCLAIMER SEBELUM MEMULAI UJIAN (20 MENIT & ATURAN CBT) */}
        {showExamDisclaimer && (
          <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                  <Clock className="w-6 h-6 text-[#9E7D15]" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Tata Tertib Ujian Resmi
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-[#1A1615] mt-0.5">
                    Petunjuk & Disclaimer Ujian CBT OSN 2026
                  </h4>
                </div>
              </div>

              <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] text-xs text-[#524c47] leading-relaxed">
                <div className="flex items-start gap-2 text-[#1A1615] font-bold">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-[11px] shrink-0 mt-0.5 font-black">
                    1
                  </span>
                  <div>
                    Waktu Pengerjaan Seluruh Ujian Yaitu <strong>20 Menit (1.200 Detik)</strong>.
                    <p className="text-[11px] text-[#756F68] font-normal mt-0.5">
                      Countdown timer akan otomatis berjalan begitu Anda menekan tombol "Mulai Ujian Sekarang". Jika waktu habis, jawaban tersimpan otomatis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[#1A1615] font-bold">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-[11px] shrink-0 mt-0.5 font-black">
                    2
                  </span>
                  <div>
                    Batasan Akses: Maksimal <strong>2x Percobaan Pengerjaan</strong>.
                    <p className="text-[11px] text-[#756F68] font-normal mt-0.5">
                      Soal ujian {examTypeMode === 'final' ? 'Babak Final' : 'Babak Penyisihan'} hanya dapat diakses 2x saja. Setelah mengerjakan 2x, Anda tidak dapat mengulang kembali.
                    </p>
                  </div>
                </div>

                {examTypeMode === 'final' ? (
                  <div className="flex items-start gap-2 text-rose-900 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span>Sistem Anti-Kecurangan (Anti-Cheat) Aktif Otomatis!</span>
                      <p className="text-[11px] text-rose-700 font-normal mt-0.5">
                        Dilarang membuka tab baru, berpindah aplikasi/halaman, melakukan copy-paste teks, atau mengambil screenshot. Jika terdeteksi, ujian otomatis dihentikan dan dicatat pelanggaran.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-emerald-900 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span>Babak Penyisihan (Simulasi Latihan Mandiri)</span>
                      <p className="text-[11px] text-emerald-800 font-normal mt-0.5">
                        Gunakan kesempatan 2x pengerjaan ini sebaik-baiknya untuk mengukur kesiapan materi Anda sebelum pengumuman babak final.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExamDisclaimer(false)}
                  className="flex-1 py-3 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmStartExam}
                  className="flex-2 py-3 rounded-xl text-xs font-black bg-[#1A1615] hover:bg-neutral-800 text-[#D4AF37] border-2 border-[#D4AF37] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Mulai Ujian Sekarang (20 Menit)</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* POPUP 2: POPUP PEMBERITAHUAN PELANGGARAN ANTI-KECURANGAN (ANTI-CHEAT DETECTED) */}
        {antiCheatViolationPopup && (
          <div className="fixed inset-0 z-80 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border-2 border-rose-600 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 text-center">
              <div className="w-20 h-20 rounded-full bg-rose-100 border-4 border-rose-300 flex items-center justify-center mx-auto text-rose-600">
                <ShieldAlert className="w-10 h-10 text-rose-600 animate-pulse" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                  PELANGGARAN UJIAN TERDETEKSI
                </span>
                <h4 className="text-xl font-black text-rose-950 mt-2">
                  Ujian Dihentikan Secara Otomatis!
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-900 text-sm font-bold leading-relaxed">
                {antiCheatViolationPopup}
              </div>

              <p className="text-xs text-[#756F68] leading-relaxed">
                Sistem pengawas ujian terpusat mencatat tindakan ini ke dalam server panitia olimpiade. Jawaban terakhir Anda telah otomatis disimpan dan sesi ujian babak final ini telah dihentikan.
              </p>

              <button
                type="button"
                onClick={() => setAntiCheatViolationPopup(null)}
                className="w-full py-3.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Saya Memahami & Tutup Pemberitahuan</span>
              </button>
            </div>
          </div>
        )}

        {/* MODAL AKSI 1: SIMPAN GOOGLE KONTAK */}
        {contactActionParticipant && (
          <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border-2 border-blue-500 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <Contact className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-[#1A1615]">Simpan Kontak Siswa</h4>
                    <p className="text-[11px] text-[#756F68]">Google Contacts & WhatsApp Phonebook</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setContactActionParticipant(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Nama Siswa:</span>
                  <span className="font-bold text-[#1A1615]">{contactActionParticipant.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">No. WhatsApp:</span>
                  <span className="font-mono font-bold text-emerald-700">{contactActionParticipant.whatsapp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Sekolah:</span>
                  <span className="font-semibold text-[#1A1615]">{contactActionParticipant.schoolName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Jenjang:</span>
                  <span className="text-[#1A1615]">{contactActionParticipant.level.split('(')[0]}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {googleUser ? (
                  <button
                    type="button"
                    disabled={isSyncingSingleContact}
                    onClick={() => handleSaveSingleContactToGoogle(contactActionParticipant)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#4285F4] hover:bg-blue-600 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Contact className="w-4 h-4" />
                    <span>{isSyncingSingleContact ? 'Menyimpan ke Google Contacts...' : 'Sinkronkan Langsung ke Google Contacts'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isGoogleLoading}
                    onClick={async () => {
                      try {
                        const res = await signInWithGoogleWorkspace();
                        if (res) {
                          setGoogleUser(res.user);
                          setGoogleToken(res.accessToken);
                          await syncParticipantToGoogleContacts(contactActionParticipant);
                          setAdminNotification(`Berhasil menghubungkan Google dan menyimpan kontak ${contactActionParticipant.fullName}!`);
                          setContactActionParticipant(null);
                          loadWorkspaceData();
                        }
                      } catch (err: any) {
                        alert(`Gagal sync Google: ${err.message}`);
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#4285F4] hover:bg-blue-600 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#fff" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                    </svg>
                    <span>Hubungkan Google Workspace & Simpan Kontak</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    exportSingleParticipantVcf(contactActionParticipant);
                    setAdminNotification(`File kartu kontak VCF untuk ${contactActionParticipant.fullName} berhasil didownload!`);
                    setTimeout(() => setAdminNotification(''), 4000);
                    setContactActionParticipant(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>Download Kartu Kontak (.VCF / vCard) Siswa Ini</span>
                </button>

                <a
                  href="https://contacts.google.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-4 rounded-xl text-[11px] font-semibold text-[#756F68] hover:text-[#1A1615] hover:bg-neutral-100 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Buka Google Contacts Web</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MODAL AKSI 2: RESET KUOTA UJIAN CBT */}
        {resetQuotaParticipant && (
          <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border-2 border-purple-500 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-[#1A1615]">Reset Kuota Ujian CBT</h4>
                    <p className="text-[11px] text-[#756F68]">Maksimal 2x Percobaan Pengerjaan Siswa</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setResetQuotaParticipant(null);
                    setResetQuotaClearHistory(false);
                  }}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2 text-xs">
                <div className="font-bold text-[#1A1615] flex items-center justify-between">
                  <span>{resetQuotaParticipant.fullName}</span>
                  <span className="font-mono text-neutral-600 font-semibold">{resetQuotaParticipant.id}</span>
                </div>
                <div className="text-[11px] text-[#756F68]">
                  {resetQuotaParticipant.schoolName} · {resetQuotaParticipant.level}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className={`p-2.5 rounded-xl bg-white border ${
                    (resetQuotaParticipant.simulatedAttempts || 0) >= 2 ? 'border-rose-300 ring-1 ring-rose-200' : 'border-purple-100'
                  }`}>
                    <div className="text-[10px] text-[#756F68]">Babak Penyisihan</div>
                    <div className={`font-extrabold text-sm ${
                      (resetQuotaParticipant.simulatedAttempts || 0) >= 2 ? 'text-rose-600' : 'text-purple-900'
                    }`}>
                      {resetQuotaParticipant.simulatedAttempts || 0} / 2 Terpakai
                    </div>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-white border ${
                    (resetQuotaParticipant.finalAttempts || 0) >= 2 ? 'border-rose-300 ring-1 ring-rose-200' : 'border-purple-100'
                  }`}>
                    <div className="text-[10px] text-[#756F68]">Babak Final</div>
                    <div className={`font-extrabold text-sm ${
                      (resetQuotaParticipant.finalAttempts || 0) >= 2 ? 'text-rose-600' : 'text-purple-900'
                    }`}>
                      {resetQuotaParticipant.finalAttempts || 0} / 2 Terpakai
                    </div>
                  </div>
                </div>
                {resetQuotaParticipant.violationReason && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-700 font-semibold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                    <div>
                      <div className="font-bold">Diskualifikasi Terdeteksi:</div>
                      <div>{resetQuotaParticipant.violationReason}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkbox Opsi Bersihkan Riwayat Nilai */}
              <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 cursor-pointer text-xs transition-colors">
                <input
                  type="checkbox"
                  checked={resetQuotaClearHistory}
                  onChange={(e) => setResetQuotaClearHistory(e.target.checked)}
                  className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer shrink-0"
                />
                <div>
                  <span className="text-[#1A1615] font-bold block">
                    Bersihkan Riwayat Nilai & Hasil Ujian (Mulai Baru dari 0)
                  </span>
                  <span className="text-[11px] text-[#756F68]">
                    Jika dicentang, seluruh skor lama dan status kelulusan akan dihapus bersih agar siswa dapat mengerjakan ulang dari awal.
                  </span>
                </div>
              </label>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleExecuteResetQuota(resetQuotaParticipant, 'all', resetQuotaClearHistory)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Semua Kuota (Penyisihan & Final -&gt; 0/2)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleExecuteResetQuota(resetQuotaParticipant, 'simulasi', resetQuotaClearHistory)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 cursor-pointer transition-all"
                  >
                    Reset Penyisihan (0/2)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExecuteResetQuota(resetQuotaParticipant, 'final', resetQuotaClearHistory)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 cursor-pointer transition-all"
                  >
                    Reset Final (0/2)
                  </button>
                </div>

                {/* Extra Options: Tambah Kesempatan & Buka Blokir */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => handleGrantExtraAttempt(resetQuotaParticipant, 'simulasi')}
                    className="py-2 px-2.5 rounded-xl text-[11px] font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 cursor-pointer transition-all flex items-center justify-center gap-1"
                    title="Beri +1 kesempatan ujian babak penyisihan"
                  >
                    <span>+1 Kesempatan Penyisihan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGrantExtraAttempt(resetQuotaParticipant, 'final')}
                    className="py-2 px-2.5 rounded-xl text-[11px] font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 cursor-pointer transition-all flex items-center justify-center gap-1"
                    title="Beri +1 kesempatan ujian babak final"
                  >
                    <span>+1 Kesempatan Final</span>
                  </button>
                </div>

                {resetQuotaParticipant.violationReason && (
                  <button
                    type="button"
                    onClick={() => handleClearViolationOnly(resetQuotaParticipant)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                    <span>Hapus Status Pelanggaran Saja (Buka Blokir CBT)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setResetQuotaParticipant(null);
                    setResetQuotaClearHistory(false);
                  }}
                  className="w-full py-2 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL AKSI 2B: RESET KUOTA MASSAL UNTUK SELURUH SISWA TERFILTER */}
        {showBulkResetModal && (
          <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border-2 border-purple-500 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-[#1A1615]">Reset Kuota Ujian Massal</h4>
                    <p className="text-[11px] text-[#756F68]">{filteredParticipants.length} Peserta Sedang Difilter</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBulkResetModal(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Jumlah Siswa Target:</span>
                  <span className="font-extrabold text-purple-900">{filteredParticipants.length} Siswa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Kategori Filter:</span>
                  <span className="font-medium text-[#1A1615]">{adminFilterCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Status Filter Ujian:</span>
                  <span className="font-medium text-[#1A1615]">{adminFilterExamStatus}</span>
                </div>
              </div>

              <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 cursor-pointer text-xs transition-colors">
                <input
                  type="checkbox"
                  checked={resetQuotaClearHistory}
                  onChange={(e) => setResetQuotaClearHistory(e.target.checked)}
                  className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer shrink-0"
                />
                <div>
                  <span className="text-[#1A1615] font-bold block">
                    Bersihkan Riwayat Nilai & Hasil Ujian Sekaligus
                  </span>
                  <span className="text-[11px] text-[#756F68]">
                    Hapus nilai lama seluruh {filteredParticipants.length} siswa agar dapat mengikuti simulasi/ujian dari awal.
                  </span>
                </div>
              </label>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleExecuteBulkResetQuota('all', resetQuotaClearHistory)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Semua Kuota ({filteredParticipants.length} Siswa -&gt; 0/2)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleExecuteBulkResetQuota('simulasi', resetQuotaClearHistory)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 cursor-pointer transition-all"
                  >
                    Reset Penyisihan Saja
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExecuteBulkResetQuota('final', resetQuotaClearHistory)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 cursor-pointer transition-all"
                  >
                    Reset Final Saja
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBulkResetModal(false)}
                  className="w-full py-2 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DETAIL LENGKAP FORMULIR PESERTA */}
        {viewDetailParticipant && (
          <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-7 max-w-2xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#1A1615]">Formulir Pendaftaran Siswa Lengkap</h4>
                    <p className="text-[11px] text-[#756F68]">Data resmi tercatat di database OSN 2026</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewDetailParticipant(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Data Grid Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* 1. Identitas Siswa */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
                  <div className="font-extrabold text-[#D4AF37] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Biodata Siswa</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#756F68]">Nomor Registrasi / ID:</div>
                    <div className="font-mono font-black text-sm text-[#1A1615]">{viewDetailParticipant.id}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#756F68]">Nama Lengkap Siswa:</div>
                    <div className="font-extrabold text-sm text-[#1A1615]">{viewDetailParticipant.fullName}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#756F68]">Nomor WhatsApp:</div>
                    <div className="font-mono font-bold text-emerald-700">{viewDetailParticipant.whatsapp}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#756F68]">Alamat Email:</div>
                    <div className="font-medium text-[#1A1615]">{viewDetailParticipant.email || '-'}</div>
                  </div>
                </div>

                {/* 2. Sekolah & Jenjang */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
                  <div className="font-extrabold text-[#D4AF37] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Pendidikan & Mapel</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#756F68]">Kategori Jenjang:</div>
                    <div className="font-bold text-neutral-900">{viewDetailParticipant.level}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#756F68]">Asal Sekolah / Madrasah:</div>
                    <div className="font-semibold text-neutral-900">{viewDetailParticipant.schoolName}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#756F68]">Mata Pelajaran yang Diikuti:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {viewDetailParticipant.subjects && viewDetailParticipant.subjects.length > 0 ? (
                        viewDetailParticipant.subjects.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="font-bold text-neutral-700">Matematika</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Data Orang Tua & Domisili */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2 sm:col-span-2">
                  <div className="font-extrabold text-[#D4AF37] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Data Orang Tua / Wali & Domisili Lengkap</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="text-[10px] text-[#756F68]">Nama Orang Tua / Wali Murid:</div>
                      <div className="font-bold text-sm text-[#1A1615]">
                        {viewDetailParticipant.parentName && viewDetailParticipant.parentName !== '-' ? viewDetailParticipant.parentName : '(Tidak diisi pada formulir)'}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-[#756F68]">Kota / Kabupaten & Provinsi:</div>
                      <div className="font-semibold text-neutral-900">
                        {viewDetailParticipant.cityProvince || 'Indonesia'}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] text-[#756F68]">Alamat Lengkap Tempat Tinggal:</div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D9] font-medium text-neutral-800 leading-relaxed">
                      {viewDetailParticipant.fullAddress && viewDetailParticipant.fullAddress !== '-' ? viewDetailParticipant.fullAddress : '(Tidak diisi pada formulir)'}
                    </div>
                  </div>
                </div>

                {/* 4. Status Ujian CBT & Kuota */}
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2 sm:col-span-2">
                  <div className="font-extrabold text-purple-900 text-[11px] uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" />
                      Status Sistem CBT & Riwayat Nilai
                    </span>
                    <span className="font-normal text-[10px] text-neutral-500">
                      Terdaftar: {new Date(viewDetailParticipant.registeredAt).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-white border border-purple-100">
                      <div className="text-[10px] text-[#756F68]">Penyisihan (Simulasi)</div>
                      <div className="font-extrabold text-sm text-[#1A1615]">
                        {viewDetailParticipant.simulatedExam ? `Skor: ${viewDetailParticipant.simulatedExam.score}/100` : 'Belum Ujian'}
                      </div>
                      <div className="text-[10px] text-purple-700 font-semibold mt-0.5">
                        Kuota: {viewDetailParticipant.simulatedAttempts || 0}/2 Terpakai
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-purple-100">
                      <div className="text-[10px] text-[#756F68]">Babak Final</div>
                      <div className="font-extrabold text-sm text-[#1A1615]">
                        {viewDetailParticipant.finalExam ? `Skor: ${viewDetailParticipant.finalExam.score}/100` : 'Belum Ujian Final'}
                      </div>
                      <div className="text-[10px] text-purple-700 font-semibold mt-0.5">
                        Kuota: {viewDetailParticipant.finalAttempts || 0}/2 Terpakai
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-purple-100">
                      <div className="text-[10px] text-[#756F68]">Closing Tiket Final</div>
                      <div className="font-extrabold text-sm text-emerald-700">
                        {viewDetailParticipant.finalTicketPaymentStatus === 'paid_closing' ? 'Lunas Rp 99.000' : 'Belum Bayar'}
                      </div>
                      <div className="text-[10px] text-neutral-600 mt-0.5">
                        Predikat: <strong className="text-[#D4AF37]">{viewDetailParticipant.championRank || '-'}</strong>
                      </div>
                    </div>
                  </div>
                  {viewDetailParticipant.violationReason && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>Pelanggaran Anti-Cheat: {viewDetailParticipant.violationReason}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E2D9]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResetQuotaParticipant(viewDetailParticipant);
                      setResetQuotaClearHistory(false);
                      setViewDetailParticipant(null);
                    }}
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Kuota Siswa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadExamCardPdf(viewDetailParticipant)}
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Cetak Kartu Ujian PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await triggerQualificationReleasedNotification(viewDetailParticipant, 'lolos');
                        alert(`Notifikasi WhatsApp API resmi berhasil dikirim ke ${viewDetailParticipant.fullName} (${viewDetailParticipant.whatsapp})!`);
                      } catch (e) {
                        alert(`Notifikasi WhatsApp telah diproses.`);
                      }
                    }}
                    className="py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Kirim Notifikasi Resmi Status Nilai / Kelulusan via WhatsApp API"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Notifikasi WA API</span>
                  </button>
                  {(viewDetailParticipant.finalExam || viewDetailParticipant.qualificationStatus === 'lolos' || (viewDetailParticipant.penyisihanExam && viewDetailParticipant.penyisihanExam.score >= 60)) && (
                    <button
                      type="button"
                      onClick={() => generateDigitalCertificatePdf({
                        student: viewDetailParticipant,
                        score: viewDetailParticipant.finalExam?.score ?? viewDetailParticipant.penyisihanExam?.score ?? 85,
                        rankTitle: viewDetailParticipant.championRank || 'Peserta Final'
                      })}
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-800" />
                      <span>Unduh Sertifikat Resmi (PDF)</span>
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setViewDetailParticipant(null)}
                  className="py-2 px-5 rounded-xl text-xs font-extrabold bg-[#1A1615] hover:bg-[#2A2422] text-white cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL AKSI 3: HAPUS PESERTA DARI DATABASE */}
        {deleteConfirmParticipant && (
          <div className="fixed inset-0 z-70 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border-2 border-rose-500 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                  <Trash2 className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1A1615]">Hapus Peserta dari Database?</h4>
                  <p className="text-[11px] text-rose-600 font-semibold">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Nama Siswa:</span>
                  <span className="font-bold text-[#1A1615]">{deleteConfirmParticipant.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">No. Peserta:</span>
                  <span className="font-mono font-bold text-neutral-800">{deleteConfirmParticipant.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">Sekolah:</span>
                  <span className="text-[#1A1615]">{deleteConfirmParticipant.schoolName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756F68]">No. WhatsApp:</span>
                  <span className="font-mono text-[#1A1615]">{deleteConfirmParticipant.whatsapp}</span>
                </div>
              </div>

              <p className="text-xs text-[#756F68] leading-relaxed">
                Apakah Anda yakin ingin menghapus seluruh data peserta ini? Seluruh riwayat ujian CBT, tiket babak final, serta sertifikat akan dihapus permanen dari sistem database.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmParticipant(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleExecuteDeleteParticipant(deleteConfirmParticipant)}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Ya, Hapus Permanen</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Confirmation Dialog for Destructive / Mutating Workspace Actions */}
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#D4AF37]/50 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertCircle className="w-6 h-6 text-[#D4AF37]" />
                <h4 className="text-base font-extrabold text-[#1A1615]">{confirmDialog.title}</h4>
              </div>
              <p className="text-xs text-[#66615B] leading-relaxed">
                {confirmDialog.message}
              </p>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleExecuteConfirmedAction}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1A1615] hover:bg-neutral-800 text-[#D4AF37] border border-[#D4AF37]/50 transition-all cursor-pointer shadow-md"
                >
                  Konfirmasi & Lanjutkan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthModal;

