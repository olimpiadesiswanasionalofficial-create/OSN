import { QuestionItem, ExamTier, EducationLevel, SubjectName } from './cbtQuestionTypes';
import { GENERATED_MATH_QUESTIONS } from './questionsMathData';
import { GENERATED_SCIENCE_QUESTIONS } from './questionsScienceData';
import { GENERATED_INDO_QUESTIONS } from './questionsIndoData';
import { GENERATED_ENGLISH_QUESTIONS } from './questionsEnglishData';

export * from './cbtQuestionTypes';

const STORAGE_QUESTIONS_KEY = 'osn_cbt_questions_database_v2_2026';

export const ALL_INITIAL_QUESTIONS: QuestionItem[] = [
  ...GENERATED_MATH_QUESTIONS,
  ...GENERATED_SCIENCE_QUESTIONS,
  ...GENERATED_INDO_QUESTIONS,
  ...GENERATED_ENGLISH_QUESTIONS
];

export function getAllQuestions(): QuestionItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_QUESTIONS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(ALL_INITIAL_QUESTIONS));
      return ALL_INITIAL_QUESTIONS;
    }
    const parsed: QuestionItem[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= 400) {
      return parsed;
    }
    // If an older cache exists with fewer questions, update to the full 400 set
    localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(ALL_INITIAL_QUESTIONS));
    return ALL_INITIAL_QUESTIONS;
  } catch (err) {
    console.error('Failed to load questions from storage:', err);
    return ALL_INITIAL_QUESTIONS;
  }
}

export function saveAllQuestions(questions: QuestionItem[]): void {
  try {
    localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(questions));
  } catch (err) {
    console.error('Failed to persist questions:', err);
  }

  // Also sync to server in background
  try {
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions })
    }).catch(() => {});
  } catch {}
}

export function updateQuestion(updated: QuestionItem): QuestionItem[] {
  const current = getAllQuestions();
  const idx = current.findIndex(q => q.id === updated.id);
  if (idx >= 0) {
    current[idx] = updated;
  } else {
    current.push(updated);
  }
  saveAllQuestions(current);
  return current;
}

/**
 * Filter questions based on stage, education level, and subject.
 * - Simulasi: SANGAT MUDAH (stage === 'simulasi')
 * - Penyisihan: MUDAH (stage === 'penyisihan')
 * - Final: SANGAT SULIT (stage === 'final')
 */
export function getFilteredQuestions(params: {
  subject: string;
  stage?: ExamTier;
  level?: string;
  limit?: number;
}): QuestionItem[] {
  const all = getAllQuestions();
  const { subject, stage = 'simulasi', level, limit = 20 } = params;

  let filtered = all.filter(q => q.subject.toLowerCase() === subject.toLowerCase());

  // Filter by stage difficulty tier
  if (stage) {
    const stageQuestions = filtered.filter(q => q.stage === stage);
    if (stageQuestions.length > 0) {
      filtered = stageQuestions;
    }
  }

  // Filter by education level if provided (e.g. 'SD', 'SMP', 'PAUD')
  if (level && level !== 'Semua') {
    const matchedLevel = filtered.filter(q => {
      if (level.includes('SD') || level.includes('MI')) return q.level === 'SD/MI' || q.level === 'Semua';
      if (level.includes('SMP') || level.includes('MTs')) return q.level === 'SMP/MTs' || q.level === 'Semua';
      if (level.includes('PAUD') || level.includes('TK')) return q.level === 'PAUD/TK' || q.level === 'SD/MI' || q.level === 'Semua';
      return true;
    });
    if (matchedLevel.length >= limit) {
      filtered = matchedLevel;
    }
  }

  // Limit questions for active CBT exam (e.g. 20 questions)
  return filtered.slice(0, limit);
}
