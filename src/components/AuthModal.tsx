import React, { useState, useEffect } from 'react';
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
  Settings
} from 'lucide-react';
import { LogoOSN, LogoLKP, StempelLKP } from './BrandLogos';
import { APP_CONFIG } from '../../appConfig.js';
import {
  getAllParticipants,
  findParticipant,
  saveParticipant,
  updateParticipantExamResult,
  ParticipantRecord
} from '../services/participantDb';
import {
  getAllQuestions,
  saveAllQuestions,
  updateQuestion,
  QuestionItem
} from '../services/cbtQuestionsDb';
import {
  getEventSchedule,
  saveEventSchedule,
  DEFAULT_EVENT_SCHEDULE,
  EventScheduleConfig
} from '../services/eventScheduleDb';
import { downloadExamCardPdf } from '../services/pdfCardGenerator';

import {
  exportParticipantsToExcel,
  exportParticipantsToPdf,
  exportParticipantsToVcf
} from '../services/adminExportService';

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

  // Student Login Fields (Nama Lengkap & Nomor WhatsApp)
  const [studentName, setStudentName] = useState('');
  const [studentWa, setStudentWa] = useState('');
  const [activeStudent, setActiveStudent] = useState<ParticipantRecord | null>(null);

  // Admin Login Fields
  const [adminUser, setAdminUser] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // UI States
  const [loginError, setLoginError] = useState('');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Student CBT Simulation States
  const [showSimulatedExam, setShowSimulatedExam] = useState(false);
  const [selectedSubjectForExam, setSelectedSubjectForExam] = useState<string>('Matematika');
  const [examSubjectChosen, setExamSubjectChosen] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({});
  const [examTimer, setExamTimer] = useState(60 * 60); // 60 minutes
  const [examCompleted, setExamCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // Admin Tabs & Management States
  const [adminTab, setAdminTab] = useState<'participants' | 'questions' | 'schedule'>('participants');
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilterCategory, setAdminFilterCategory] = useState('Semua');
  const [adminFilterExamStatus, setAdminFilterExamStatus] = useState('Semua');
  const [adminStartDate, setAdminStartDate] = useState('');
  const [adminEndDate, setAdminEndDate] = useState('');
  const [participantsList, setParticipantsList] = useState<ParticipantRecord[]>([]);

  // Schedule Management in Admin
  const [eventSchedule, setEventSchedule] = useState<EventScheduleConfig>(DEFAULT_EVENT_SCHEDULE);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);

  // Questions Database in Admin
  const [questionsList, setQuestionsList] = useState<QuestionItem[]>([]);
  const [selectedAdminSubject, setSelectedAdminSubject] = useState<string>('Matematika');
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [isCreatingNewQuestion, setIsCreatingNewQuestion] = useState(false);
  const [adminNotification, setAdminNotification] = useState<string>('');

  // Sync state on load
  useEffect(() => {
    if (isOpen) {
      setRole(defaultRole);
      setParticipantsList(getAllParticipants());
      setQuestionsList(getAllQuestions());
      setEventSchedule(getEventSchedule());

      if (initialStudentData) {

        if (initialStudentData.fullName) setStudentName(initialStudentData.fullName);
        if (initialStudentData.whatsapp) setStudentWa(initialStudentData.whatsapp);

        if (initialStudentData.autoLogin) {
          const found = findParticipant(initialStudentData.fullName || '', initialStudentData.whatsapp || '');
          if (found) {
            setActiveStudent(found);
            setLoggedInRole('user');
            setIsLoggedIn(true);
          } else if (initialStudentData.fullName && initialStudentData.whatsapp) {
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
              setLoggedInRole('user');
              setIsLoggedIn(true);
              setParticipantsList(getAllParticipants());
            });
          }
        }
      }
    }
  }, [isOpen, defaultRole, initialStudentData]);

  // CBT Exam Timer Countdown
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

  if (!isOpen) return null;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  // Quick Demo Logins
  const handleQuickLoginUser = () => {
    const list = getAllParticipants();
    const demo = list[0] || {
      id: "OSN-2026-B-89102",
      fullName: "Dzaliqa Assyafa N",
      level: "SD / MI (Kategori B: Usia 7-12 Tahun)",
      schoolName: "SDN Teladan Bangsa (Kelas 5)",
      cityProvince: "DKI Jakarta",
      whatsapp: "08123456781",
      email: "dzaliqa.assyafa@gmail.com",
      subjects: ["Matematika", "IPA / Sains"],
      registeredAt: "2026-09-20T08:30:00.000Z",
      cbtStatus: "Aktif & Siap Ujian (Tercatat di Database)"
    };
    setStudentName(demo.fullName);
    setStudentWa(demo.whatsapp);
    setActiveStudent(demo);
    setLoggedInRole('user');
    setIsLoggedIn(true);
    setLoginError('');
  };

  const handleQuickLoginAdmin = () => {
    setAdminUser('ADMIN');
    setAdminPassword('RAHASIA123');
    setLoggedInRole('admin');
    setIsLoggedIn(true);
    setParticipantsList(getAllParticipants());
    setQuestionsList(getAllQuestions());
    setLoginError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (role === 'user') {
      if (!studentName.trim() || !studentWa.trim()) {
        setLoginError('Nama Lengkap dan Nomor WhatsApp yang didaftarkan wajib diisi.');
        return;
      }

      const found = findParticipant(studentName, studentWa);
      if (found) {
        setActiveStudent(found);
        setLoggedInRole('user');
        setIsLoggedIn(true);
      } else {
        const newRecord = await saveParticipant({
          fullName: studentName.trim(),
          whatsapp: studentWa.trim(),
          level: 'SD / MI (Kategori B: Usia 7-12 Tahun)',
          schoolName: 'Siswa Terdaftar CBT Online',
          cityProvince: 'Indonesia',
          email: '-',
          subjects: ['Matematika', 'IPA / Sains']
        });
        setActiveStudent(newRecord);
        setParticipantsList(getAllParticipants());
        setLoggedInRole('user');
        setIsLoggedIn(true);
      }
    } else {
      // Admin verification (Required: USER: ADMIN, PASSWORD: RAHASIA123)
      const cleanUser = adminUser.trim().toUpperCase();
      const cleanPass = adminPassword.trim();

      if (cleanUser === 'ADMIN' && cleanPass === 'RAHASIA123') {
        setLoggedInRole('admin');
        setIsLoggedIn(true);
        setParticipantsList(getAllParticipants());
        setQuestionsList(getAllQuestions());
      } else {
        setLoginError('Kredensial Admin tidak valid! Periksa kembali Username dan Password Anda.');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowSimulatedExam(false);
    setExamSubjectChosen(false);
    setExamCompleted(false);
    setStudentAnswers({});
    setCurrentQuestionIdx(0);
    setStudentName('');
    setStudentWa('');
    setActiveStudent(null);
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

  // Filter current questions by selected subject for CBT
  const currentSubjectQuestions = questionsList.filter(
    q => q.subject === selectedSubjectForExam
  );

  const startSimulation = (subject: string) => {
    setSelectedSubjectForExam(subject);
    setExamSubjectChosen(true);
    setCurrentQuestionIdx(0);
    setStudentAnswers({});
    setExamTimer(60 * 60);
    setExamCompleted(false);
    setFinalScore(null);
  };

  const selectAnswer = (qIndex: number, optionKey: string) => {
    setStudentAnswers(prev => ({
      ...prev,
      [qIndex]: optionKey
    }));
  };

  const finishExam = async () => {
    // Calculate score
    let correctCount = 0;
    currentSubjectQuestions.forEach((q, idx) => {
      if (studentAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / (currentSubjectQuestions.length || 20)) * 100);
    setFinalScore(calculatedScore);
    setExamCompleted(true);

    if (activeStudent) {
      const updated = await updateParticipantExamResult(activeStudent.id, {
        examType: 'simulasi',
        subject: selectedSubjectForExam,
        score: calculatedScore,
        totalQuestions: currentSubjectQuestions.length
      });
      if (updated) {
        setActiveStudent(updated);
        setParticipantsList(getAllParticipants());
      }
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
      subject: selectedAdminSubject,
      questionText: 'Tuliskan teks pertanyaan soal baru di sini...',
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
    } else if (adminFilterExamStatus === 'Final') {
      matchesStatus = !!p.finalExam;
    } else if (adminFilterExamStatus === 'Belum') {
      matchesStatus = !p.simulatedExam && !p.finalExam;
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

    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

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

  // Total completed Babak Penyisihan (Simulasi CBT)
  const totalCompletedPenyisihan = participantsList.filter(p => !!p.simulatedExam).length;
  const totalCompletedPenyisihanInDateRange = dateFilteredParticipants.filter(p => !!p.simulatedExam).length;

  const handleExportExcel = () => {
    const suffix = adminStartDate || adminEndDate ? `Filter_${adminStartDate || 'Awal'}_sd_${adminEndDate || 'Akhir'}` : 'Lengkap';
    exportParticipantsToExcel(filteredParticipants, suffix);
    setAdminNotification(`Berhasil mendownload Excel data ${filteredParticipants.length} peserta.`);
    setTimeout(() => setAdminNotification(''), 4000);
  };

  const handleExportPdf = () => {
    let filterDesc = `Status: ${adminFilterExamStatus}, Jenjang: ${adminFilterCategory}`;
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

  const adminQuestionsBySubject = questionsList.filter(q => q.subject === selectedAdminSubject);

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
                <div className="text-center space-y-1">
                  <h3 className="text-base font-extrabold text-[#1A1615]">
                    {role === 'user' ? 'Masuk ke Ruang Ujian CBT Siswa' : 'Masuk Dashboard Admin Pusat'}
                  </h3>
                  <p className="text-xs text-[#756F68]">
                    {role === 'user'
                      ? 'Gunakan Nama Lengkap dan Nomor WhatsApp yang didaftarkan.'
                      : 'Masukkan Username dan Password Panitia yang sah.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  {role === 'user' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-[#1A1615] mb-1">
                          Nama Lengkap Siswa (Sesuai Pendaftaran)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Contoh: Dzaliqa Assyafa N"
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF8F5]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A1615] mb-1">
                          Nomor WhatsApp Terdaftar
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={studentWa}
                            onChange={(e) => setStudentWa(e.target.value)}
                            placeholder="Contoh: 08123456789"
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF8F5]"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-[#1A1615] mb-1">
                          Username Admin
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={adminUser}
                            onChange={(e) => setAdminUser(e.target.value)}
                            placeholder="Masukkan Username Admin"
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF8F5]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A1615] mb-1">
                          Password Admin
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            type="password"
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF8F5]"
                          />
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

                {/* DEMO ACCESS FOR TESTING */}
                <div className="pt-3 border-t border-[#E8E2D9] space-y-2">
                  <p className="text-[11px] text-center text-[#756F68] font-medium">
                    ⚡ Akses Pengujian:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleQuickLoginUser}
                      className="py-2.5 px-3 rounded-xl text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-amber-700" />
                      <span>Masuk Siswa</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickLoginAdmin}
                      className="py-2.5 px-3 rounded-xl text-[11px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-300 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                      <span>Masuk Panitia</span>
                    </button>
                  </div>
                </div>

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
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setShowSimulatedExam(!showSimulatedExam);
                      setExamSubjectChosen(false);
                      setExamCompleted(false);
                    }}
                    className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-[#D4AF37] text-[#1A1615] hover:bg-[#FFF2B2] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{showSimulatedExam ? 'Kembali ke Kartu Ujian' : 'Mulai Simulasi CBT (20 Soal)'}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 rounded-xl text-xs font-bold border border-[#E8E2D9] text-[#756F68] hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center cursor-pointer"
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
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                          Pilih Mata Pelajaran Simulasi
                        </span>
                        <h4 className="text-xl font-extrabold text-[#1A1615] mt-2">
                          Silakan Pilih Mata Pelajaran CBT yang Ingin Dikerjakan
                        </h4>
                        <p className="text-xs text-[#756F68] mt-1">
                          Masing-masing mata pelajaran memiliki <strong>20 soal bergambar</strong> lengkap dengan waktu pengerjaan 60 menit.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                        {[
                          { name: 'Matematika', desc: 'Geometri, logika angka, diagram & pecahan', color: 'border-blue-300 bg-blue-50/50 hover:bg-blue-50' },
                          { name: 'IPA / Sains', desc: 'Biologi alam, tata surya, energi & fisika', color: 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50' },
                          { name: 'Bahasa Indonesia', desc: 'Literasi teks, tata bahasa, pantun & makna', color: 'border-amber-300 bg-amber-50/50 hover:bg-amber-50' },
                          { name: 'Bahasa Inggris', desc: 'Grammar, vocabulary, tenses & reading', color: 'border-purple-300 bg-purple-50/50 hover:bg-purple-50' }
                        ].map((subj) => (
                          <button
                            key={subj.name}
                            onClick={() => startSimulation(subj.name)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${subj.color}`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm font-extrabold text-[#1A1615]">{subj.name}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1A1615] shadow-xs">
                                20 Soal Bergambar
                              </span>
                            </div>
                            <p className="text-xs text-[#756F68] mt-2 mb-3">{subj.desc}</p>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1615]">
                              <span>Mulai Mengerjakan</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setShowSimulatedExam(false)}
                        className="text-xs text-[#756F68] hover:text-[#1A1615] underline cursor-pointer"
                      >
                        Batal dan Kembali ke Kartu Ujian
                      </button>
                    </div>
                  ) : examCompleted ? (
                    /* Step 3: Hasil Simulasi Ujian */
                    <div className="text-center py-6 space-y-4 max-w-md mx-auto">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <Award className="w-9 h-9" />
                      </div>
                      <h4 className="text-xl font-extrabold text-[#1A1615]">
                        Simulasi {selectedSubjectForExam} Selesai!
                      </h4>
                      <p className="text-xs text-[#756F68]">
                        Hasil simulasi Anda telah otomatis tersimpan ke server database CBT pusat.
                      </p>

                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2">
                        <span className="text-xs text-[#756F68] font-bold block">NILAI HASIL SIMULASI:</span>
                        <div className="text-4xl font-black text-[#1A1615]">
                          {finalScore} <span className="text-base text-[#756F68] font-normal">/ 100</span>
                        </div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {finalScore && finalScore >= 70 ? 'PREDIKAT: LULUS PENYISIHAN' : 'PERLU PENINGKATAN'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setExamSubjectChosen(false);
                            setExamCompleted(false);
                          }}
                          className="flex-1 py-3 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Pilih Mapel Lain</span>
                        </button>
                        <button
                          onClick={() => setShowSimulatedExam(false)}
                          className="flex-1 py-3 rounded-xl text-xs font-bold border border-[#E8E2D9] text-[#1A1615] hover:bg-neutral-100 transition-all cursor-pointer"
                        >
                          Lihat Kartu Ujian
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Step 2: Layar Pengerjaan Seluruh 20 Soal Bergambar Sekaligus Dalam 1 Halaman */
                    <div className="space-y-6">
                      {/* Sticky Exam Control Header */}
                      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-[#D4AF37] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                              CBT 1 Halaman Penuh
                            </span>
                            <span className="text-xs font-bold text-[#1A1615]">
                              Mata Pelajaran: {selectedSubjectForExam}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-extrabold text-[#1A1615] mt-1">
                            Lembar Soal Ujian (Menampilkan Seluruh {currentSubjectQuestions.length} Soal Sekaligus)
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                            Terjawab: <strong className="text-emerald-700 text-sm font-black">{Object.keys(studentAnswers).length}</strong> / {currentSubjectQuestions.length}
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] bg-[#1A1615] px-3.5 py-1.5 rounded-xl shrink-0 shadow-sm">
                            <Clock className="w-4 h-4 text-[#D4AF37]" />
                            <span>Sisa Waktu: {formatTime(examTimer)}</span>
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
                                <div className="flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-xl bg-[#1A1615] text-[#D4AF37] text-xs font-black flex items-center justify-center">
                                    {idx + 1}
                                  </span>
                                  <span className="text-xs font-black text-[#1A1615] uppercase tracking-wide">
                                    SOAL NOMOR {idx + 1} DARI {currentSubjectQuestions.length}
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
                            onClick={finishExam}
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

                  {/* Riwayat Ujian Siswa (Simulasi & Final) */}
                  {(activeStudent?.simulatedExam || activeStudent?.finalExam) && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 mb-3 space-y-1.5 text-xs">
                      <span className="text-[10px] font-bold text-[#756F68] uppercase block">
                        Riwayat Pengerjaan Ujian Siswa:
                      </span>
                      {activeStudent?.simulatedExam && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#1A1615]">
                            Simulasi CBT ({activeStudent.simulatedExam.subject}):
                          </span>
                          <span className="font-bold text-emerald-700 font-mono">
                            Nilai: {activeStudent.simulatedExam.score}/100
                          </span>
                        </div>
                      )}
                      {activeStudent?.finalExam && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#1A1615]">
                            Babak Final ({activeStudent.finalExam.subject}):
                          </span>
                          <span className="font-bold text-emerald-700 font-mono">
                            Nilai: {activeStudent.finalExam.score}/100 (Selesai Final)
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
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] relative overflow-hidden shadow-xs">
                    <span className="text-[10px] font-bold text-[#756F68] uppercase block">
                      Total Pendaftar Tercatat
                    </span>
                    <div className="text-2xl font-black text-[#1A1615] mt-1">
                      {dateFilteredParticipants.length} <span className="text-xs text-[#756F68] font-semibold">Siswa</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {adminStartDate || adminEndDate
                        ? `Periode Terpilih (Total: ${participantsList.length})`
                        : 'Seluruh Database Pusat'}
                    </div>
                  </div>

                  {/* Card 2: Sudah Mengerjakan BABAK PENYISIHAN (Required User Focus) */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-emerald-400/80 relative overflow-hidden shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                        Sudah Mengerjakan BABAK PENYISIHAN
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">
                      {totalCompletedPenyisihanInDateRange} <span className="text-xs text-emerald-800 font-semibold">Siswa</span>
                    </div>
                    <div className="text-[11px] text-[#756F68] mt-1">
                      {adminStartDate || adminEndDate
                        ? `Rentang ini (Total Kumulatif: ${totalCompletedPenyisihan})`
                        : 'Telah Menyelesaikan Simulasi/Penyisihan'}
                    </div>
                  </div>

                  {/* Card 3: Sudah Mengerjakan Final */}
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

                  {/* Card 4: Total Bank Soal & Logout */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#756F68] uppercase block">Total Bank Soal CBT</span>
                      <div className="text-2xl font-black text-[#1A1615] mt-1">
                        {questionsList.length} <span className="text-xs text-[#756F68] font-semibold">Soal</span>
                      </div>
                      <span className="text-[11px] text-[#D4AF37] font-bold">4 Mapel Bergambar</span>
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

              {/* Main Admin Tab Switcher: 1. Peserta & Progress Ujian, 2. Pengaturan Soal & Gambar */}
              <div className="flex border-b border-[#E8E2D9] gap-4">
                <button
                  onClick={() => setAdminTab('participants')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors ${
                    adminTab === 'participants'
                      ? 'border-b-2 border-[#D4AF37] text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Daftar Peserta & Progres Ujian (Lengkap)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900">
                    {participantsList.length}
                  </span>
                </button>

                <button
                  onClick={() => setAdminTab('questions')}
                  className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-colors ${
                    adminTab === 'questions'
                      ? 'border-b-2 border-[#D4AF37] text-[#1A1615]'
                      : 'text-[#756F68] hover:text-[#1A1615]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Pengaturan Soal & Kunci Jawaban Bergambar</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-900">
                    {questionsList.length} Soal
                  </span>
                </button>
              </div>

              {/* TAB 1: DAFTAR PESERTA LENGKAP & STATUS SIMULASI HINGGA FINAL */}
              {adminTab === 'participants' ? (
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
                      </div>
                    </div>

                    {/* Export Action Buttons Toolbar (Excel, PDF, VCF) */}
                    <div className="pt-2 border-t border-[#E8E2D9]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                      <div className="text-[11px] text-[#756F68]">
                        Menampilkan <strong className="text-[#1A1615]">{filteredParticipants.length}</strong> dari{' '}
                        <strong className="text-[#1A1615]">{participantsList.length}</strong> peserta terdaftar
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
                    <div className="p-4 border-b border-[#E8E2D9] flex items-center justify-between">
                      <h4 className="text-xs font-black text-[#1A1615] uppercase tracking-wider flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-[#D4AF37]" />
                        <span>Database Peserta & Riwayat Ujian Lengkap ({filteredParticipants.length})</span>
                      </h4>
                      <span className="text-[11px] text-[#756F68]">
                        Sinkronisasi Database CBT Real-Time
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#756F68] font-bold text-[11px]">
                            <th className="py-3 px-4">No. Peserta</th>
                            <th className="py-3 px-4">Nama Siswa & WhatsApp</th>
                            <th className="py-3 px-4">Jenjang & Sekolah</th>
                            <th className="py-3 px-4">Mata Pelajaran</th>
                            <th className="py-3 px-4">Status Simulasi CBT</th>
                            <th className="py-3 px-4">Status Babak Final</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E2D9]">
                          {filteredParticipants.map((p) => (
                            <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-[#1A1615]">
                                {p.id}
                                <div className="text-[9px] text-[#756F68] font-normal">
                                  {new Date(p.registeredAt).toLocaleDateString('id-ID')}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-bold text-[#1A1615]">{p.fullName}</div>
                                <a
                                  href={`https://wa.me/${p.whatsapp.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-mono"
                                >
                                  <Phone className="w-2.5 h-2.5" />
                                  {p.whatsapp}
                                </a>
                                {p.parentName && p.parentName !== '-' && (
                                  <div className="text-[10px] text-neutral-600 font-medium mt-0.5">
                                    Wali: <span className="font-semibold text-neutral-900">{p.parentName}</span>
                                  </div>
                                )}
                                {p.fullAddress && p.fullAddress !== '-' && (
                                  <div className="text-[9px] text-[#756F68] line-clamp-1 max-w-[200px]" title={p.fullAddress}>
                                    Domisili: {p.fullAddress}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-medium text-[#1A1615]">{p.schoolName}</div>
                                <div className="text-[10px] text-[#756F68]">{p.level}</div>
                              </td>
                              <td className="py-3 px-4">
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
                              {/* Kolom Simulasi */}
                              <td className="py-3 px-4">
                                {p.simulatedExam ? (
                                  <div className="space-y-0.5">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                      <CheckCircle className="w-3 h-3 text-amber-600" />
                                      Skor: {p.simulatedExam.score}/100
                                    </span>
                                    <div className="text-[10px] text-[#756F68]">
                                      Mapel: {p.simulatedExam.subject}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-[#756F68] italic">
                                    Belum Mengerjakan
                                  </span>
                                )}
                              </td>
                              {/* Kolom Final */}
                              <td className="py-3 px-4">
                                {p.finalExam ? (
                                  <div className="space-y-0.5">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                                      SELESAI FINAL: {p.finalExam.score}/100
                                    </span>
                                    <div className="text-[10px] text-emerald-700 font-semibold">
                                      Lulus Babak Final
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-neutral-400">
                                    Menunggu Jadwal 26 Sept
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* TAB 2: PENGATURAN SOAL & KUNCI JAWABAN BERGAMBAR */
                <div className="space-y-6">
                  {/* Subject Selector & Add Button */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#756F68]">Pilih Mata Pelajaran:</span>
                      {['Matematika', 'IPA / Sains', 'Bahasa Indonesia', 'Bahasa Inggris'].map(subj => (
                        <button
                          key={subj}
                          onClick={() => {
                            setSelectedAdminSubject(subj);
                            setEditingQuestion(null);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedAdminSubject === subj
                              ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                              : 'bg-[#FAF8F5] text-[#66615B] hover:text-[#1A1615] border border-[#E8E2D9]'
                          }`}
                        >
                          {subj} ({questionsList.filter(q => q.subject === subj).length} Soal)
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleAddNewQuestion}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Soal Baru</span>
                    </button>
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
                              rows={4}
                              value={editingQuestion.questionText}
                              onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })}
                              className="w-full p-3 rounded-xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-[#FAF8F5]"
                              placeholder="Tuliskan teks pertanyaan soal..."
                            />
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
                              onChange={(e) => setEditingQuestion({ ...editingQuestion, correctAnswer: e.target.value })}
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
                            <span className="text-xs font-black text-[#1A1615]">
                              Soal #{idx + 1} ({q.subject})
                            </span>
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

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
