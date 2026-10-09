import React, { useState, useRef } from 'react';
import {
  FileSpreadsheet,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  X,
  Database,
  Table,
  HelpCircle,
  FileCheck,
  Check,
  Info
} from 'lucide-react';
import { ParticipantRecord } from '../services/participantDb';
import {
  parseSpreadsheetFile,
  fetchAndParseSpreadsheetUrl,
  saveImportedParticipants,
  downloadParticipantTemplate,
  ParseResult
} from '../services/participantSpreadsheetService';
import { showToast } from './NotificationToast';

interface ImportParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingParticipants: ParticipantRecord[];
  onImportSuccess: (totalImported: number, totalUpdated: number) => void;
}

export const ImportParticipantsModal: React.FC<ImportParticipantsModalProps> = ({
  isOpen,
  onClose,
  existingParticipants,
  onImportSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'file'>('url');
  const [spreadsheetUrl, setSpreadsheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [mergeOption, setMergeOption] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle URL fetch & parsing
  const handleFetchUrl = async () => {
    if (!spreadsheetUrl.trim()) {
      showToast('error', 'URL Kosong', 'Harap masukkan link Google Sheets atau Spreadsheet URL.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await fetchAndParseSpreadsheetUrl(spreadsheetUrl);
      if (!result.success) {
        showToast('error', 'Gagal Membaca Data', result.errors[0] || 'Tidak dapat membaca spreadsheet.');
        setParseResult(null);
      } else {
        setParseResult(result);
        showToast('success', 'Data Ditemukan', `Berhasil mendeteksi ${result.validCount} data peserta dari link spreadsheet.`);
      }
    } catch (err: any) {
      showToast('error', 'Kesalahan Link', err?.message || 'Gagal memproses spreadsheet dari URL.');
      setParseResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle File selection & parsing
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsLoading(true);
    try {
      const result = await parseSpreadsheetFile(file);
      if (!result.success) {
        showToast('error', 'Gagal Membaca File', result.errors[0] || 'Format file tidak sesuai.');
        setParseResult(null);
      } else {
        setParseResult(result);
        showToast('success', 'File Terbaca', `Berhasil membaca ${result.validCount} peserta dari file ${file.name}.`);
      }
    } catch (err: any) {
      showToast('error', 'Kesalahan File', err?.message || 'Gagal memproses file spreadsheet.');
      setParseResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate new vs existing records
  const existingIdSet = new Set(existingParticipants.map(p => p.id));
  const existingPhoneSet = new Set(
    existingParticipants.map(p => {
      const ph = (p.whatsapp || '').replace(/\D/g, '').replace(/^62/, '0');
      return `${ph}|${p.fullName.trim().toLowerCase()}`;
    })
  );

  let newCount = 0;
  let updateCount = 0;

  if (parseResult?.participants) {
    parseResult.participants.forEach(p => {
      const ph = (p.whatsapp || '').replace(/\D/g, '').replace(/^62/, '0');
      const key = `${ph}|${p.fullName.trim().toLowerCase()}`;
      if (existingIdSet.has(p.id) || existingPhoneSet.has(key)) {
        updateCount++;
      } else {
        newCount++;
      }
    });
  }

  // Handle final submission to system & database
  const handleConfirmImport = async () => {
    if (!parseResult || parseResult.participants.length === 0) return;

    setIsSubmitting(true);
    try {
      const saveRes = await saveImportedParticipants(parseResult.participants, {
        mergeWithExisting: mergeOption
      });

      showToast(
        'success',
        'Data Peserta Berhasil Disinkronkan!',
        `Total ${parseResult.participants.length} peserta telah masuk ke database (${saveRes.inserted} baru, ${saveRes.updated} diperbarui).`
      );

      onImportSuccess(saveRes.inserted, saveRes.updated);
      onClose();
    } catch (err: any) {
      showToast('error', 'Gagal Menyimpan Data', err?.message || 'Terjadi kesalahan saat menyimpan data peserta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#E8E2D9] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1A1615] via-[#2A2321] to-[#1A1615] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Import & Sinkronisasi Peserta dari Spreadsheet</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1A1615] font-extrabold uppercase">
                  Massal
                </span>
              </h3>
              <p className="text-xs text-[#E8E2D9]/80">
                Masukkan data peserta langsung dari link Google Sheets atau upload file Excel / CSV
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Tabs Selector & Template Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]">
            <div className="flex items-center gap-2 bg-[#FAF8F5] p-1 rounded-2xl border border-[#E8E2D9]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('url');
                  setParseResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-[#756F68] hover:text-[#1A1615]'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Link Google Sheets / URL</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('file');
                  setParseResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'file'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-[#756F68] hover:text-[#1A1615]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File (Excel / CSV)</span>
              </button>
            </div>

            {/* Template Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#756F68]">Format Template:</span>
              <button
                type="button"
                onClick={() => downloadParticipantTemplate('xlsx')}
                className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                title="Download template Excel (.xlsx) dengan kolom standar"
              >
                <Download className="w-3 h-3" />
                <span>Template .XLSX</span>
              </button>
              <button
                type="button"
                onClick={() => downloadParticipantTemplate('csv')}
                className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                title="Download template CSV (.csv) dengan kolom standar"
              >
                <Download className="w-3 h-3" />
                <span>Template .CSV</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Link Google Sheets */}
          {activeTab === 'url' && (
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] space-y-4">
              <div>
                <label className="block text-xs font-black text-[#1A1615] uppercase tracking-wider mb-1.5">
                  Masukkan Link Google Spreadsheet / Online CSV
                </label>
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 absolute left-3.5 top-3 text-[#756F68]" />
                    <input
                      type="url"
                      placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0X.../edit#gid=0"
                      value={spreadsheetUrl}
                      onChange={(e) => setSpreadsheetUrl(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#E8E2D9] focus:outline-none focus:border-teal-600 shadow-2xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleFetchUrl}
                    disabled={isLoading || !spreadsheetUrl.trim()}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs min-w-[170px]"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Mengambil Data...</span>
                      </>
                    ) : (
                      <>
                        <FileCheck className="w-4 h-4" />
                        <span>Ambil & Analisis Data</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instructions Callout */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Tips Penggunaan Link Google Sheets:</p>
                  <p className="text-[11px] text-amber-800/90 leading-relaxed">
                    1. Buka spreadsheet Anda di Google Docs &gt; klik <strong>Share / Bagikan</strong> &gt; ubah Akses Umum menjadi <strong>&quot;Siapa saja yang memiliki link dapat melihat&quot; (Anyone with link can view)</strong>.
                    <br />
                    2. Copy link di browser lalu paste ke kolom di atas. Sistem kami akan otomatis mengekstrak tabel data peserta secara cerdas tanpa perlu login ulang.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Upload File Spreadsheet */}
          {activeTab === 'file' && (
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D4AF37]/60 hover:border-[#D4AF37] bg-white rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all hover:bg-amber-50/20 group"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-3 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-black text-[#1A1615] mb-1">
                  {selectedFile ? selectedFile.name : 'Pilih atau Tarik File Spreadsheet ke Sini'}
                </h4>
                <p className="text-xs text-[#756F68] mb-3">
                  Mendukung format <strong>.XLSX</strong>, <strong>.XLS</strong>, atau <strong>.CSV</strong>
                </p>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-xs">
                  {isLoading ? 'Membaca File...' : selectedFile ? 'Ganti File Lain' : 'Telusuri File dari Komputer'}
                </span>
              </div>
            </div>
          )}

          {/* PREVIEW & VERIFICATION SECTION */}
          {parseResult && parseResult.participants.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-[#1A1615] uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-teal-700" />
                  <span>Hasil Analisis Data Spreadsheet</span>
                </h4>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{parseResult.validCount} Peserta Siap Diimpor</span>
                </span>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] shadow-2xs">
                  <span className="text-[10px] font-bold text-[#756F68] block">Total Baris File</span>
                  <span className="text-lg font-black text-[#1A1615]">{parseResult.totalRawRows}</span>
                </div>
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-emerald-800 block">Peserta Valid</span>
                  <span className="text-lg font-black text-emerald-900">{parseResult.validCount}</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-blue-800 block">Peserta Baru</span>
                  <span className="text-lg font-black text-blue-900">+{newCount}</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-amber-800 block">Sudah Terdaftar (Update)</span>
                  <span className="text-lg font-black text-amber-900">{updateCount}</span>
                </div>
              </div>

              {/* Preview Table of First 5-6 rows */}
              <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-2xs">
                <div className="p-2.5 bg-[#FAF8F5] border-b border-[#E8E2D9] flex items-center justify-between text-xs text-[#756F68]">
                  <span className="font-bold flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5" />
                    <span>Pratinjau 5 Peserta Pertama:</span>
                  </span>
                  <span>(Kolom otomatis dinormalisasi sesuai standar OSN)</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-neutral-100 text-[#1A1615] font-black border-b border-[#E8E2D9]">
                        <th className="py-2 px-3">No</th>
                        <th className="py-2 px-3">ID Peserta</th>
                        <th className="py-2 px-3">Nama Lengkap</th>
                        <th className="py-2 px-3">WhatsApp</th>
                        <th className="py-2 px-3">Jenjang</th>
                        <th className="py-2 px-3">Asal Sekolah</th>
                        <th className="py-2 px-3">Mapel</th>
                        <th className="py-2 px-3">Nilai / Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E2D9]/70">
                      {parseResult.participants.slice(0, 5).map((p, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/30">
                          <td className="py-2 px-3 font-semibold text-[#756F68]">{idx + 1}</td>
                          <td className="py-2 px-3 font-mono font-bold text-neutral-800">{p.id}</td>
                          <td className="py-2 px-3 font-black text-[#1A1615]">{p.fullName}</td>
                          <td className="py-2 px-3 font-mono text-[#756F68]">{p.whatsapp}</td>
                          <td className="py-2 px-3">
                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                              {p.level.split(' ')[0]}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-[#756F68]">{p.schoolName}</td>
                          <td className="py-2 px-3 text-[#756F68]">{(p.subjects || []).join(', ')}</td>
                          <td className="py-2 px-3">
                            {p.penyisihanExam ? (
                              <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                                Skor: {p.penyisihanExam.score}
                              </span>
                            ) : (
                              <span className="text-[10px] text-neutral-500">Siap Ujian</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Options */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1A1615]">
                  <input
                    type="checkbox"
                    checked={mergeOption}
                    onChange={(e) => setMergeOption(e.target.checked)}
                    className="w-4 h-4 text-teal-700 rounded border-neutral-300 focus:ring-teal-600"
                  />
                  <span>
                    <strong>Gabungkan dengan peserta yang sudah ada (Rekomendasi):</strong> Jika ID atau Nomor WhatsApp cocok, data lama akan diperbarui tanpa menghapus riwayat ujian.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#756F68] text-center sm:text-left">
            {parseResult ? (
              <span>
                Siap memproses <strong>{parseResult.validCount} data peserta</strong> ke server dan penyimpanan lokal.
              </span>
            ) : (
              <span>Pilih spreadsheet atau masukkan link untuk memulai analisis.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#756F68] hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleConfirmImport}
              disabled={isSubmitting || !parseResult || parseResult.participants.length === 0}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sinkronkan ke Database...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Masukkan ke Database ({parseResult?.validCount || 0} Peserta)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
