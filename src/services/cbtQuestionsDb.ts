import { QuestionItem, ExamTier, EducationLevel, SubjectName } from './cbtQuestionTypes';
import { ALL_SIMULASI_OFFICIAL_QUESTIONS } from './simulasiQuestionsAll';
import { ALL_PENYISIHAN_OFFICIAL_QUESTIONS } from './penyisihanQuestionsAll';

export * from './cbtQuestionTypes';

const STORAGE_OVERRIDES_KEY = 'osn_cbt_question_overrides_v2';
const STORAGE_DELETED_KEY = 'osn_cbt_deleted_question_ids_v2';

// Bank Soal Resmi: 240 Soal Simulasi Bergambar + Soal Resmi Babak Penyisihan
export const ALL_INITIAL_QUESTIONS: QuestionItem[] = [
  ...ALL_SIMULASI_OFFICIAL_QUESTIONS,
  ...ALL_PENYISIHAN_OFFICIAL_QUESTIONS
];

// Clean up legacy questions and overrides to ensure completely fresh simulation questions
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('osn_cbt_question_overrides_v1');
    localStorage.removeItem('osn_cbt_deleted_question_ids_v1');
    localStorage.removeItem('osn_cbt_questions_database_v3_1200');
    localStorage.removeItem('osn_cbt_questions_database_v2');
    localStorage.removeItem('osn_cbt_questions_database');
  }
} catch {
  // Ignore
}

// In-memory cache for fast reads
let inMemoryQuestions: QuestionItem[] | null = null;

function loadStoredOverrides(): Record<string, QuestionItem> {
  try {
    const raw = localStorage.getItem(STORAGE_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadStoredDeletedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_DELETED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function getAllQuestions(): QuestionItem[] {
  if (inMemoryQuestions) {
    return inMemoryQuestions;
  }

  const overrides = loadStoredOverrides();
  const deletedIds = loadStoredDeletedIds();

  // Merge base static bank (in-memory) with admin modifications/overrides
  const result: QuestionItem[] = [];
  const baseIdSet = new Set<string>();

  for (const q of ALL_INITIAL_QUESTIONS) {
    baseIdSet.add(q.id);
    if (deletedIds.has(q.id)) {
      continue;
    }
    if (overrides[q.id]) {
      result.push(overrides[q.id]);
    } else {
      result.push(q);
    }
  }

  // Any newly created questions by admin not in base
  for (const [id, customQ] of Object.entries(overrides)) {
    if (!baseIdSet.has(id) && !deletedIds.has(id)) {
      result.push(customQ);
    }
  }

  // Filter out any duplicate questions and any question lacking an image
  const seenIds = new Set<string>();
  const seenTexts = new Set<string>();
  const sanitizedResult: QuestionItem[] = [];

  for (const q of result) {
    // Filter out questions without images (must have imageSvg or imageUrl)
    if (!q.imageUrl && !q.imageSvg) {
      continue;
    }
    // Filter out duplicate IDs
    if (seenIds.has(q.id)) {
      continue;
    }
    // Filter out duplicate question texts within category and subject
    const textKey = `${q.category}_${q.subject}_${(q.questionText || '').trim().toLowerCase()}`;
    if (seenTexts.has(textKey)) {
      continue;
    }
    seenIds.add(q.id);
    seenTexts.add(textKey);
    sanitizedResult.push(q);
  }

  inMemoryQuestions = sanitizedResult;
  return sanitizedResult;
}

export function saveAllQuestions(questions: QuestionItem[]): void {
  inMemoryQuestions = [...questions];

  // Determine deleted questions and overrides safely to save only lightweight delta
  try {
    const currentIds = new Set(questions.map(q => q.id));
    const deletedIds: string[] = [];
    for (const q of ALL_INITIAL_QUESTIONS) {
      if (!currentIds.has(q.id)) {
        deletedIds.push(q.id);
      }
    }
    localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(deletedIds));

    // Overrides dictionary
    const overrides: Record<string, QuestionItem> = {};
    const baseMap = new Map(ALL_INITIAL_QUESTIONS.map(q => [q.id, q]));
    for (const q of questions) {
      const base = baseMap.get(q.id);
      if (!base || base.questionText !== q.questionText || base.correctAnswer !== q.correctAnswer) {
        overrides[q.id] = q;
      }
    }
    localStorage.setItem(STORAGE_OVERRIDES_KEY, JSON.stringify(overrides));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('osn_questions_updated'));
    }
  } catch (err) {
    console.warn('Could not persist question overrides to localStorage:', err);
  }

  // Sync to server in background
  try {
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions })
    }).catch(() => {});
  } catch {}
}

/**
 * Sync question bank from server database
 */
export async function syncQuestionsWithServer(): Promise<QuestionItem[]> {
  try {
    const res = await fetch('/api/questions');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const overrides = loadStoredOverrides();
        json.data.forEach((q: QuestionItem) => {
          if (q && q.id) {
            overrides[q.id] = q;
          }
        });
        localStorage.setItem(STORAGE_OVERRIDES_KEY, JSON.stringify(overrides));
        inMemoryQuestions = null;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('osn_questions_updated'));
        }
        return getAllQuestions();
      }
    }
  } catch (err) {
    console.warn('Could not sync questions with server:', err);
  }
  return getAllQuestions();
}

export function updateQuestion(updated: QuestionItem): QuestionItem[] {
  const current = getAllQuestions();
  const idx = current.findIndex(q => q.id === updated.id);
  if (idx >= 0) {
    current[idx] = updated;
  } else {
    current.push(updated);
  }

  inMemoryQuestions = [...current];

  try {
    const overrides = loadStoredOverrides();
    overrides[updated.id] = updated;
    localStorage.setItem(STORAGE_OVERRIDES_KEY, JSON.stringify(overrides));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('osn_questions_updated'));
    }
  } catch (err) {
    console.warn('Could not persist question update:', err);
  }

  // Sync to server
  try {
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: updated })
    }).catch(() => {});
  } catch {}

  return inMemoryQuestions;
}

/**
 * Helper to determine category key ('Kategori A' | 'Kategori B' | 'Kategori C')
 */
export function resolveCategoryKey(levelStr?: string): 'Kategori A' | 'Kategori B' | 'Kategori C' {
  if (!levelStr) return 'Kategori B';
  const str = levelStr.toUpperCase();
  if (str.includes('KATEGORI A') || str.includes('PAUD') || str.includes('TK')) {
    return 'Kategori A';
  }
  if (str.includes('KATEGORI C') || str.includes('SMP') || str.includes('MTS')) {
    return 'Kategori C';
  }
  return 'Kategori B';
}

/**
 * Filter and randomize questions using Fisher-Yates algorithm
 * Ensures 20 unique randomized questions drawn from 100 questions per category & subject
 */
export function getFilteredQuestions(params: {
  subject: string;
  stage?: ExamTier;
  level?: string;
  category?: 'Kategori A' | 'Kategori B' | 'Kategori C' | string;
  limit?: number;
  randomize?: boolean;
}): QuestionItem[] {
  const all = getAllQuestions();
  const { subject, stage = 'simulasi', level, limit = 20, randomize = false } = params;

  const targetCategory = params.category || resolveCategoryKey(level);

  // 1. Filter by Category
  let filtered = all.filter(q => {
    if (q.category) {
      return q.category === targetCategory;
    }
    if (targetCategory === 'Kategori A') return q.level === 'PAUD/TK';
    if (targetCategory === 'Kategori C') return q.level === 'SMP/MTs';
    return q.level === 'SD/MI';
  });

  // 2. Filter by Subject
  filtered = filtered.filter(q => q.subject.toLowerCase() === subject.toLowerCase());

  // 3. Filter by stage difficulty tier if available
  if (stage) {
    const stageQuestions = filtered.filter(q => q.stage === stage);
    if (stageQuestions.length >= limit) {
      filtered = stageQuestions;
    }
  }

  // Fallback if filtered pool is smaller than limit, take from full category & subject
  if (filtered.length < limit) {
    filtered = all.filter(q => 
      (q.category === targetCategory || resolveCategoryKey(q.level) === targetCategory) &&
      q.subject.toLowerCase() === subject.toLowerCase()
    );
  }

  // 4. Randomization using Math.random() with Fisher-Yates shuffle
  if (randomize) {
    const pool = [...filtered];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, limit);
  }

  return filtered.slice(0, limit);
}
