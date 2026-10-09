import { QuestionItem } from './cbtQuestionTypes';
import { KATEGORI_A_MATEMATIKA } from './simulasiKategoriA';
import { KATEGORI_A_IPA } from './simulasiKategoriA_IPA';
import { KATEGORI_A_INDO } from './simulasiKategoriA_Indo';
import { KATEGORI_A_ENGLISH } from './simulasiKategoriA_Eng';

import { KATEGORI_B_MAT } from './simulasiKategoriB_Mat';
import { KATEGORI_B_IPA } from './simulasiKategoriB_IPA';
import { KATEGORI_B_INDO } from './simulasiKategoriB_Indo';
import { KATEGORI_B_ENGLISH } from './simulasiKategoriB_Eng';

import { KATEGORI_C_MAT } from './simulasiKategoriC_Mat';
import { KATEGORI_C_IPA } from './simulasiKategoriC_IPA';
import { KATEGORI_C_INDO } from './simulasiKategoriC_Indo';
import { KATEGORI_C_ENGLISH } from './simulasiKategoriC_Eng';

// Seluruh 240 Soal Simulasi Resmi Bergambar (20 Soal per Mapel x 4 Mapel x 3 Kategori)
export const ALL_SIMULASI_OFFICIAL_QUESTIONS: QuestionItem[] = [
  // Kategori A (PAUD/TK) - 80 Soal
  ...KATEGORI_A_MATEMATIKA,
  ...KATEGORI_A_IPA,
  ...KATEGORI_A_INDO,
  ...KATEGORI_A_ENGLISH,

  // Kategori B (SD/MI) - 80 Soal
  ...KATEGORI_B_MAT,
  ...KATEGORI_B_IPA,
  ...KATEGORI_B_INDO,
  ...KATEGORI_B_ENGLISH,

  // Kategori C (SMP/MTs) - 80 Soal
  ...KATEGORI_C_MAT,
  ...KATEGORI_C_IPA,
  ...KATEGORI_C_INDO,
  ...KATEGORI_C_ENGLISH
];
