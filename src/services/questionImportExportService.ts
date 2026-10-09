import * as XLSX from 'xlsx';
import { QuestionItem, SubjectName, EducationLevel, ExamTier, CurriculumStandard, QuestionDifficulty } from './cbtQuestionTypes';

export const QUESTION_EXPORT_HEADERS = [
  'No',
  'ID Soal',
  'Mata Pelajaran',
  'Kategori',
  'Jenjang',
  'Tahap',
  'Kurikulum',
  'Tingkat Kesulitan',
  'Pertanyaan',
  'Gambar (URL / SVG)',
  'Opsi A',
  'Opsi B',
  'Opsi C',
  'Opsi D',
  'Kunci Jawaban',
  'Penjelasan'
];

/**
 * Export questions list to standard CSV with UTF-8 BOM
 */
export function exportQuestionsToCsv(questions: QuestionItem[], filename: string = 'Bank_Soal_OSN_2026.csv'): void {
  const escapeCsv = (val: any) => {
    const s = String(val ?? '').replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = questions.map((q, idx) => {
    const optA = q.options.find(o => o.key === 'A')?.text || '';
    const optB = q.options.find(o => o.key === 'B')?.text || '';
    const optC = q.options.find(o => o.key === 'C')?.text || '';
    const optD = q.options.find(o => o.key === 'D')?.text || '';
    const img = q.imageUrl || q.imageSvg || '';

    return [
      idx + 1,
      q.id,
      q.subject,
      q.category || 'Kategori B',
      q.level,
      q.stage,
      q.curriculum,
      q.difficulty,
      q.questionText,
      img,
      optA,
      optB,
      optC,
      optD,
      q.correctAnswer,
      q.explanation || ''
    ];
  });

  const csvContent = '\uFEFF' + [
    QUESTION_EXPORT_HEADERS.map(escapeCsv).join(','),
    ...rows.map(r => r.map(escapeCsv).join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export questions list to Excel (.xlsx) file using xlsx
 */
export function exportQuestionsToExcel(questions: QuestionItem[], filename: string = 'Bank_Soal_OSN_2026.xlsx'): void {
  const dataRows = questions.map((q, idx) => {
    const optA = q.options.find(o => o.key === 'A')?.text || '';
    const optB = q.options.find(o => o.key === 'B')?.text || '';
    const optC = q.options.find(o => o.key === 'C')?.text || '';
    const optD = q.options.find(o => o.key === 'D')?.text || '';
    const img = q.imageUrl || q.imageSvg || '';

    return {
      'No': idx + 1,
      'ID Soal': q.id,
      'Mata Pelajaran': q.subject,
      'Kategori': q.category || 'Kategori B',
      'Jenjang': q.level,
      'Tahap': q.stage,
      'Kurikulum': q.curriculum,
      'Tingkat Kesulitan': q.difficulty,
      'Pertanyaan': q.questionText,
      'Gambar (URL / SVG)': img,
      'Opsi A': optA,
      'Opsi B': optB,
      'Opsi C': optC,
      'Opsi D': optD,
      'Kunci Jawaban': q.correctAnswer,
      'Penjelasan': q.explanation || ''
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(dataRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bank Soal');

  // Auto-fit column widths
  worksheet['!cols'] = [
    { wch: 6 },  // No
    { wch: 16 }, // ID Soal
    { wch: 18 }, // Mapel
    { wch: 14 }, // Kategori
    { wch: 12 }, // Jenjang
    { wch: 12 }, // Tahap
    { wch: 22 }, // Kurikulum
    { wch: 16 }, // Kesulitan
    { wch: 45 }, // Pertanyaan
    { wch: 30 }, // Gambar
    { wch: 20 }, // Opsi A
    { wch: 20 }, // Opsi B
    { wch: 20 }, // Opsi C
    { wch: 20 }, // Opsi D
    { wch: 14 }, // Kunci
    { wch: 35 }  // Penjelasan
  ];

  XLSX.writeFile(workbook, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
}

/**
 * Download sample template for bulk question import
 */
export function downloadQuestionTemplate(format: 'csv' | 'xlsx' = 'xlsx'): void {
  const sampleQuestions: QuestionItem[] = [
    {
      id: 'SIM-A-MAT-TEMPLATE-1',
      number: 1,
      category: 'Kategori A',
      subject: 'Matematika',
      level: 'PAUD/TK',
      stage: 'simulasi',
      curriculum: 'Kurikulum Merdeka',
      difficulty: 'Sangat Mudah',
      questionText: 'Berapa banyak buah apel merah pada keranjang di bawah ini?',
      imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
      options: [
        { key: 'A', text: '1 buah' },
        { key: 'B', text: '3 buah' },
        { key: 'C', text: '5 buah' },
        { key: 'D', text: '7 buah' }
      ],
      correctAnswer: 'B',
      explanation: 'Terdapat 3 buah apel merah segar di dalam keranjang.'
    },
    {
      id: 'SIM-B-IPA-TEMPLATE-2',
      number: 2,
      category: 'Kategori B',
      subject: 'IPA / Sains',
      level: 'SD/MI',
      stage: 'simulasi',
      curriculum: 'Kurikulum Merdeka',
      difficulty: 'Sangat Mudah',
      questionText: 'Bagian tumbuhan yang bertugas menyerap air dan mineral dari dalam tanah adalah...',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
      options: [
        { key: 'A', text: 'Akar' },
        { key: 'B', text: 'Bunga' },
        { key: 'C', text: 'Buah' },
        { key: 'D', text: 'Daun' }
      ],
      correctAnswer: 'A',
      explanation: 'Akar berfungsi menghisap air dan unsur hara dari dalam tanah untuk diedarkan ke seluruh tubuh tumbuhan.'
    }
  ];

  if (format === 'csv') {
    exportQuestionsToCsv(sampleQuestions, 'Template_Import_Soal_OSN_2026.csv');
  } else {
    exportQuestionsToExcel(sampleQuestions, 'Template_Import_Soal_OSN_2026.xlsx');
  }
}

/**
 * Parse uploaded CSV or Excel file containing questions for bulk import
 */
export async function parseQuestionsFile(
  file: File,
  currentCount: number = 0
): Promise<{ success: boolean; questions: QuestionItem[]; errors: string[] }> {
  const errors: string[] = [];
  const parsedQuestions: QuestionItem[] = [];

  try {
    let rawRows: any[][] = [];

    const isCsv = file.name.toLowerCase().endsWith('.csv');
    if (isCsv) {
      const text = await file.text();
      rawRows = parseCsvText(text);
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        return { success: false, questions: [], errors: ['File Excel tidak memiliki lembar kerja (worksheet).'] };
      }
      const sheet = workbook.Sheets[firstSheetName];
      rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
    }

    if (rawRows.length < 2) {
      return { success: false, questions: [], errors: ['File kosong atau hanya berisi baris header tanpa data soal.'] };
    }

    // Header normalization
    const headerRow = rawRows[0].map(h => String(h || '').trim().toLowerCase());

    const findColIdx = (keywords: string[]): number => {
      return headerRow.findIndex(h => keywords.some(k => h.includes(k)));
    };

    const colSubject = findColIdx(['mata pelajaran', 'mapel', 'subject']);
    const colCategory = findColIdx(['kategori', 'category']);
    const colLevel = findColIdx(['jenjang', 'level', 'tingkat']);
    const colStage = findColIdx(['tahap', 'stage']);
    const colCurriculum = findColIdx(['kurikulum', 'curriculum']);
    const colDifficulty = findColIdx(['kesulitan', 'difficulty']);
    const colQuestion = findColIdx(['pertanyaan', 'soal', 'question', 'text']);
    const colImage = findColIdx(['gambar', 'image', 'svg', 'foto', 'ilustrasi']);
    const colOptA = findColIdx(['opsi a', 'pilihan a', 'opt a', 'a']);
    const colOptB = findColIdx(['opsi b', 'pilihan b', 'opt b', 'b']);
    const colOptC = findColIdx(['opsi c', 'pilihan c', 'opt c', 'c']);
    const colOptD = findColIdx(['opsi d', 'pilihan d', 'opt d', 'd']);
    const colKey = findColIdx(['kunci jawaban', 'kunci', 'jawaban', 'correct', 'answer']);
    const colExplanation = findColIdx(['penjelasan', 'pembahasan', 'explanation']);

    if (colQuestion === -1) {
      return {
        success: false,
        questions: [],
        errors: ['Kolom "Pertanyaan" / "Soal" tidak ditemukan pada file. Silakan periksa kembali header kolom file Anda.']
      };
    }

    for (let r = 1; r < rawRows.length; r++) {
      const row = rawRows[r];
      if (!row || row.length === 0) continue;

      const questionText = String(row[colQuestion] ?? '').trim();
      if (!questionText) continue; // Skip empty rows

      const subjectRaw = colSubject !== -1 ? String(row[colSubject] ?? '').trim() : 'Matematika';
      const categoryRaw = colCategory !== -1 ? String(row[colCategory] ?? '').trim() : 'Kategori B';
      const levelRaw = colLevel !== -1 ? String(row[colLevel] ?? '').trim() : 'SD/MI';
      const stageRaw = colStage !== -1 ? String(row[colStage] ?? '').trim().toLowerCase() : 'simulasi';
      const curriculumRaw = colCurriculum !== -1 ? String(row[colCurriculum] ?? '').trim() : 'Kurikulum Merdeka';
      const difficultyRaw = colDifficulty !== -1 ? String(row[colDifficulty] ?? '').trim() : 'Sangat Mudah';
      const imageRaw = colImage !== -1 ? String(row[colImage] ?? '').trim() : '';

      const optAText = colOptA !== -1 ? String(row[colOptA] ?? '').trim() : '';
      const optBText = colOptB !== -1 ? String(row[colOptB] ?? '').trim() : '';
      const optCText = colOptC !== -1 ? String(row[colOptC] ?? '').trim() : '';
      const optDText = colOptD !== -1 ? String(row[colOptD] ?? '').trim() : '';

      let answerKey = colKey !== -1 ? String(row[colKey] ?? '').trim().toUpperCase() : 'A';
      if (!['A', 'B', 'C', 'D'].includes(answerKey)) {
        answerKey = 'A';
      }

      const explanation = colExplanation !== -1 ? String(row[colExplanation] ?? '').trim() : '';

      // Fallback options if missing
      const options = [
        { key: 'A', text: optAText || 'Pilihan A' },
        { key: 'B', text: optBText || 'Pilihan B' },
        { key: 'C', text: optCText || 'Pilihan C' },
        { key: 'D', text: optDText || 'Pilihan D' }
      ];

      const number = currentCount + parsedQuestions.length + 1;
      const cleanSubject = normalizeSubject(subjectRaw);
      const cleanCategory = normalizeCategory(categoryRaw, levelRaw);
      const cleanLevel = normalizeLevel(levelRaw, cleanCategory);
      const cleanStage = stageRaw.includes('final') ? 'final' : stageRaw.includes('penyisihan') ? 'penyisihan' : 'simulasi';

      const qItem: QuestionItem = {
        id: `IMPORT-${Date.now()}-${number}-${Math.floor(Math.random() * 1000)}`,
        number,
        category: cleanCategory,
        subject: cleanSubject,
        level: cleanLevel,
        stage: cleanStage,
        curriculum: curriculumRaw || 'Kurikulum Merdeka',
        difficulty: difficultyRaw || 'Sangat Mudah',
        questionText,
        imageUrl: imageRaw || undefined,
        imageSvg: imageRaw.startsWith('<svg') ? imageRaw : undefined,
        options,
        correctAnswer: answerKey as 'A' | 'B' | 'C' | 'D',
        explanation: explanation || `Kunci jawaban yang benar adalah opsi ${answerKey}.`
      };

      parsedQuestions.push(qItem);
    }

    if (parsedQuestions.length === 0) {
      return {
        success: false,
        questions: [],
        errors: ['Tidak ada data soal valid yang berhasil diekstrak dari file yang diunggah.']
      };
    }

    return {
      success: true,
      questions: parsedQuestions,
      errors
    };
  } catch (err: any) {
    return {
      success: false,
      questions: [],
      errors: [err?.message || 'Terjadi kesalahan saat membaca file.']
    };
  }
}

function parseCsvText(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          cell += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(cell);
        cell = '';
      } else if (char === '\n') {
        row.push(cell);
        lines.push(row);
        row = [];
        cell = '';
      } else if (char === '\r') {
        if (nextChar === '\n') {
          i++;
        }
        row.push(cell);
        lines.push(row);
        row = [];
        cell = '';
      } else {
        cell += char;
      }
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    lines.push(row);
  }

  return lines;
}

function normalizeSubject(val: string): SubjectName {
  const s = val.toLowerCase();
  if (s.includes('mat')) return 'Matematika';
  if (s.includes('ipa') || s.includes('sain') || s.includes('science')) return 'IPA / Sains';
  if (s.includes('ing') || s.includes('eng')) return 'Bahasa Inggris';
  return 'Bahasa Indonesia';
}

function normalizeCategory(cat: string, level: string): 'Kategori A' | 'Kategori B' | 'Kategori C' {
  const s = (cat + ' ' + level).toUpperCase();
  if (s.includes('A') || s.includes('PAUD') || s.includes('TK')) return 'Kategori A';
  if (s.includes('C') || s.includes('SMP') || s.includes('MTS')) return 'Kategori C';
  return 'Kategori B';
}

function normalizeLevel(val: string, category: string): EducationLevel {
  if (category === 'Kategori A' || val.includes('PAUD') || val.includes('TK')) return 'PAUD/TK';
  if (category === 'Kategori C' || val.includes('SMP') || val.includes('MTS')) return 'SMP/MTs';
  return 'SD/MI';
}
