import { QuestionItem } from './cbtQuestionTypes';

// Kategori A (PAUD/TK) - 80 Soal
import { PENYISIHAN_A_MATEMATIKA } from './penyisihanKategoriA_Mat';
import { PENYISIHAN_A_ENGLISH } from './penyisihanKategoriA_Eng';
import { PENYISIHAN_A_IPA } from './penyisihanKategoriA_IPA';
import { PENYISIHAN_A_INDO } from './penyisihanKategoriA_Indo';

// Kategori B (SD/MI) - 80 Soal
import { PENYISIHAN_B_MATEMATIKA } from './penyisihanKategoriB_Mat';
import { PENYISIHAN_B_ENGLISH } from './penyisihanKategoriB_Eng';
import { PENYISIHAN_B_IPA } from './penyisihanKategoriB_IPA';
import { PENYISIHAN_B_INDO } from './penyisihanKategoriB_Indo';

// Kategori C (SMP/MTs) - 80 Soal
import { PENYISIHAN_C_MATEMATIKA } from './penyisihanKategoriC_Mat';
import { PENYISIHAN_C_ENGLISH } from './penyisihanKategoriC_Eng';
import { PENYISIHAN_C_IPA } from './penyisihanKategoriC_IPA';
import { PENYISIHAN_C_INDO } from './penyisihanKategoriC_Indo';

// Kumpulan Seluruh 240 Soal Resmi Babak Penyisihan OSN 2026
// (4 Mata Pelajaran x 3 Kategori Jenjang x 20 Soal Pilihan Ganda Bergambar)
export const ALL_PENYISIHAN_OFFICIAL_QUESTIONS: QuestionItem[] = [
  // Kategori A (PAUD/TK)
  ...PENYISIHAN_A_MATEMATIKA,
  ...PENYISIHAN_A_ENGLISH,
  ...PENYISIHAN_A_IPA,
  ...PENYISIHAN_A_INDO,

  // Kategori B (SD/MI)
  ...PENYISIHAN_B_MATEMATIKA,
  ...PENYISIHAN_B_ENGLISH,
  ...PENYISIHAN_B_IPA,
  ...PENYISIHAN_B_INDO,

  // Kategori C (SMP/MTs)
  ...PENYISIHAN_C_MATEMATIKA,
  ...PENYISIHAN_C_ENGLISH,
  ...PENYISIHAN_C_IPA,
  ...PENYISIHAN_C_INDO
];
