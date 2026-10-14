import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Award,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  School,
  MapPin,
  BookOpen
} from 'lucide-react';
import { ParticipantRecord } from '../services/participantDb';

interface PublicAnnouncementTableProps {
  participants: ParticipantRecord[];
  isLoading?: boolean;
  onOpenLogin?: () => void;
}

export const PublicAnnouncementTable: React.FC<PublicAnnouncementTableProps> = ({
  participants,
  isLoading = false,
  onOpenLogin
}) => {
  const [activeTab, setActiveTab] = useState<'penyisihan' | 'final'>('penyisihan');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('Semua');
  const [filterSubject, setFilterSubject] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Filter participants based on tab, search (nama / ID), and dropdown filters
  const filteredList = useMemo(() => {
    return participants.filter(p => {
      // Tab 1: Babak Penyisihan (Only qualified or completed penyisihan)
      if (activeTab === 'penyisihan') {
        const isQualified = p.qualificationStatus === 'lolos';
        if (!isQualified && !p.penyisihanExam) return false;
      } else {
        // Tab 2: Babak Final (Only those with finalExam or championRank)
        const hasFinal = p.finalExam || (p.championRank && p.championRank !== 'Belum Dinilai');
        if (!hasFinal) return false;
      }

      // Filter by Level
      if (filterLevel !== 'Semua') {
        if (!p.level.toLowerCase().includes(filterLevel.toLowerCase())) {
          return false;
        }
      }

      // Filter by Subject
      if (filterSubject !== 'Semua') {
        const subList = p.subjects || [];
        const matchSub = subList.some(s => s.toLowerCase().includes(filterSubject.toLowerCase()));
        const examSub = activeTab === 'penyisihan' ? p.penyisihanExam?.subject : p.finalExam?.subject;
        const matchExam = examSub && examSub.toLowerCase().includes(filterSubject.toLowerCase());
        if (!matchSub && !matchExam) return false;
      }

      // Search by Name or ID
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchName = p.fullName.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        const matchSchool = p.schoolName.toLowerCase().includes(q);
        const matchCity = p.cityProvince.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchSchool && !matchCity) return false;
      }

      return true;
    });
  }, [participants, activeTab, searchQuery, filterLevel, filterSubject]);

  // Reset to page 1 on filter or tab change
  const handleTabChange = (tab: 'penyisihan' | 'final') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage]);

  const totalQualifiedPenyisihan = useMemo(() => {
    return participants.filter(p => p.qualificationStatus === 'lolos').length;
  }, [participants]);

  const totalFinalists = useMemo(() => {
    return participants.filter(p => p.finalExam || (p.championRank && p.championRank !== 'Belum Dinilai')).length;
  }, [participants]);

  return (
    <section id="pengumuman-hasil" className="py-20 bg-white border-b border-[#E8E2D9] relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/50 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>PENGUMUMAN HASIL RESMI NASIONAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1A1615] tracking-tight">
            Tabel Hasil & Kelulusan Peserta OSN 2026
          </h2>
          <p className="text-xs sm:text-sm text-[#756F68] leading-relaxed">
            Daftar resmi penetapan kelulusan Babak Penyisihan dan peraih medali Babak Final tingkat nasional. Gunakan kolom pencarian untuk mengecek status kelulusan ananda menggunakan <strong>Nama Siswa</strong> atau <strong>ID Peserta</strong>.
          </p>
        </div>

        {/* Tab Switcher: 1. Penyisihan Lolos vs 2. Babak Final */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleTabChange('penyisihan')}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'penyisihan'
                  ? 'bg-[#1A1615] text-[#D4AF37] border-2 border-[#D4AF37] shadow-md'
                  : 'bg-[#FAF8F5] text-[#756F68] hover:text-[#1A1615] hover:bg-amber-50/60 border border-[#E8E2D9]'
              }`}
            >
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Lolos Babak Penyisihan</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-mono ml-1">
                {totalQualifiedPenyisihan} Siswa
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('final')}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'final'
                  ? 'bg-[#1A1615] text-[#D4AF37] border-2 border-[#D4AF37] shadow-md'
                  : 'bg-[#FAF8F5] text-[#756F68] hover:text-[#1A1615] hover:bg-amber-50/60 border border-[#E8E2D9]'
              }`}
            >
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>Hasil Babak Final & Juara</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono ml-1">
                {totalFinalists} Siswa
              </span>
            </button>
          </div>

          <div className="text-[11px] text-[#756F68] flex items-center gap-1.5 self-center sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Menampilkan data lengkap hasil ujian (Privasi: Alamat & Orang Tua disembunyikan)</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-3xl border border-[#E8E2D9] space-y-3 mb-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input: Name or ID */}
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari berdasarkan Nama Siswa atau ID Peserta (Contoh: Abizar atau OSN-2026-B)..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 bg-white font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Jenjang */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={filterLevel}
                  onChange={(e) => {
                    setFilterLevel(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-3.5 pr-8 py-3 rounded-2xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-white font-semibold cursor-pointer"
                >
                  <option value="Semua">Semua Jenjang (PAUD / SD / SMP)</option>
                  <option value="PAUD">Kategori A (PAUD / TK)</option>
                  <option value="SD">Kategori B (SD / MI)</option>
                  <option value="SMP">Kategori C (SMP / MTs)</option>
                </select>
              </div>
            </div>

            {/* Filter Mapel */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={filterSubject}
                  onChange={(e) => {
                    setFilterSubject(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-3.5 pr-8 py-3 rounded-2xl text-xs border border-[#E8E2D9] focus:outline-none focus:border-[#D4AF37] bg-white font-semibold cursor-pointer"
                >
                  <option value="Semua">Semua Mata Pelajaran</option>
                  <option value="Matematika">Matematika</option>
                  <option value="IPA">IPA / Sains</option>
                  <option value="Inggris">Bahasa Inggris</option>
                  <option value="Indonesia">Bahasa Indonesia</option>
                </select>
              </div>
            </div>

          </div>

          {/* Quick info count */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#756F68] pt-1 border-t border-[#E8E2D9]/60">
            <span>
              Ditemukan <strong>{filteredList.length.toLocaleString('id-ID')}</strong> peserta terverifikasi di basis data resmi OSN.
            </span>
            {searchQuery && (
              <span className="text-[#9E7D15] font-bold">
                Kata kunci: "{searchQuery}"
              </span>
            )}
          </div>
        </div>

        {/* Animated Progress Bar when loading data from server (Requirement 20) */}
        {isLoading && (
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-amber-800 font-bold px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span>Menyinkronkan data pengumuman resmi dengan database hosting...</span>
              </span>
              <span className="text-[11px] text-[#756F68] font-normal">Memuat data terbaru...</span>
            </div>
            <div className="w-full bg-amber-100/70 h-2.5 overflow-hidden rounded-full shadow-inner relative">
              <div className="h-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] transition-all duration-700 w-full" />
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1A1615] text-[#D4AF37] font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-3 text-center w-12">No</th>
                  <th className="py-4 px-3">No. Peserta</th>
                  <th className="py-4 px-3">Nama Lengkap Siswa</th>
                  <th className="py-4 px-3">Jenjang & Sekolah</th>
                  <th className="py-4 px-3">Kota / Provinsi</th>
                  <th className="py-4 px-3">Mata Pelajaran</th>
                  <th className="py-4 px-3 text-center">Status Kelulusan / Predikat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D9]">
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-500">
                      <p className="text-sm font-bold text-[#1A1615]">Tidak ditemukan peserta yang sesuai pencarian.</p>
                      <p className="text-xs mt-1">Coba periksa ejaan nama atau gunakan Nomor ID Peserta lengkap.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((p, idx) => {
                    const rowNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                    const exam = activeTab === 'penyisihan' ? p.penyisihanExam : p.finalExam;
                    const score = exam ? exam.score : (p.simulatedExam ? p.simulatedExam.score : 0);
                    const isQualified = p.qualificationStatus === 'lolos';

                    return (
                      <tr
                        key={p.id}
                        className={`transition-colors hover:bg-amber-50/40 ${
                          idx % 2 === 1 ? 'bg-[#FAF8F5]/50' : 'bg-white'
                        }`}
                      >
                        {/* No */}
                        <td className="py-3 px-3 text-center font-mono text-neutral-400 font-bold">
                          {rowNumber}
                        </td>

                        {/* ID Peserta */}
                        <td className="py-3 px-3 font-mono font-bold text-[#1A1615] whitespace-nowrap">
                          <span className="bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                            {p.id}
                          </span>
                        </td>

                        {/* Nama Siswa */}
                        <td className="py-3 px-3">
                          <div className="font-extrabold text-[#1A1615] text-xs sm:text-sm">
                            {p.fullName}
                          </div>
                        </td>

                        {/* Jenjang & Sekolah */}
                        <td className="py-3 px-3 min-w-[160px]">
                          <div className="font-semibold text-[#1A1615] flex items-center gap-1">
                            <School className="w-3 h-3 text-[#D4AF37] shrink-0" />
                            <span className="truncate max-w-[190px]" title={p.schoolName}>
                              {p.schoolName}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#756F68]">{p.level}</div>
                        </td>

                        {/* Kota & Provinsi */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="text-[11px] text-[#1A1615] font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{p.cityProvince}</span>
                          </div>
                        </td>

                        {/* Mapel */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-[#1A1615]">
                            <BookOpen className="w-3 h-3 text-[#D4AF37] shrink-0" />
                            <span>{exam?.subject || p.subjects?.[0] || 'Matematika'}</span>
                          </div>
                        </td>

                        {/* Status Kelulusan / Predikat */}
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          {activeTab === 'penyisihan' ? (
                            isQualified ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                <span>LOLOS KE FINAL</span>
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
                                Peserta Penyisihan
                              </span>
                            )
                          ) : (
                            p.championRank && p.championRank.startsWith('Juara') ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-400 via-[#D4AF37] to-amber-500 text-[#1A1615] shadow-xs">
                                <Trophy className="w-3.5 h-3.5 text-[#1A1615]" />
                                <span>{p.championRank}</span>
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-300">
                                {p.championRank || 'Peserta Final'}
                              </span>
                            )
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#756F68]">
              <div>
                Menampilkan <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> – <strong>{Math.min(currentPage * itemsPerPage, filteredList.length)}</strong> dari <strong>{filteredList.length.toLocaleString('id-ID')}</strong> peserta
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-[#E8E2D9] bg-white hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Halaman Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 font-mono font-bold text-xs text-[#1A1615]">
                  <span className="px-3 py-1 rounded-xl bg-[#1A1615] text-[#D4AF37]">
                    {currentPage}
                  </span>
                  <span>/</span>
                  <span className="px-2 py-1">
                    {totalPages}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-[#E8E2D9] bg-white hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Halaman Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
