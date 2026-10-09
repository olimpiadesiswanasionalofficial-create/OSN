import { QuestionItem } from './cbtQuestionTypes';
import { PENYISIHAN_A_ENGLISH } from './penyisihanKategoriA_Eng';
import { PENYISIHAN_B_ENGLISH } from './penyisihanKategoriB_Eng';
import { PENYISIHAN_C_ENGLISH } from './penyisihanKategoriC_Eng';
import { PENYISIHAN_A_MATEMATIKA } from './penyisihanKategoriA_Mat';
import { PENYISIHAN_B_MATEMATIKA } from './penyisihanKategoriB_Mat';

// Kumpulan Seluruh Soal Resmi Babak Penyisihan OSN 2026
export const ALL_PENYISIHAN_OFFICIAL_QUESTIONS: QuestionItem[] = [
  // 1. Soal Resmi Babak Penyisihan Bahasa Inggris PAUD/TK (Kategori A) - 20 Soal
  ...PENYISIHAN_A_ENGLISH,

  // 2. Soal Resmi Babak Penyisihan Bahasa Inggris SD/MI (Kategori B) - 20 Soal
  ...PENYISIHAN_B_ENGLISH,

  // 3. Soal Resmi Babak Penyisihan Bahasa Inggris SMP/MTs (Kategori C) - 20 Soal
  ...PENYISIHAN_C_ENGLISH,

  // 4. Soal Resmi Babak Penyisihan Matematika PAUD/TK (Kategori A) - 20 Soal
  ...PENYISIHAN_A_MATEMATIKA,

  // 5. Soal Resmi Babak Penyisihan Matematika SD/MI (Kategori B) - 20 Soal
  ...PENYISIHAN_B_MATEMATIKA
];
