// Question Bank Database Generator for OSN 2026
// Covers 4 Subjects: Matematika, IPA / Sains, Bahasa Indonesia, Bahasa Inggris
// Level Categories: PAUD/TK (A), SD/MI (B), SMP/MTs (C)
// Difficulty Tiers:
//   - simulasi: SANGAT MUDAH (Skor dasar pemanasan, visual ceria, konsep mendasar)
//   - penyisihan: MUDAH (Pemahaman konsep, kurikulum nasional Merdeka & Cambridge stage dasar)
//   - final: SANGAT SULIT (HOTS, Olympiad, Singapore Math, Cambridge IGCSE / IB MYP style)
// Curriculums: Kurikulum Merdeka, Cambridge International, Singapore Math, International Baccalaureate (IB)

export type ExamTier = 'simulasi' | 'penyisihan' | 'final' | string;
export type EducationLevel = 'PAUD/TK' | 'SD/MI' | 'SMP/MTs' | 'Semua' | string;
export type SubjectName = 'Matematika' | 'IPA / Sains' | 'Bahasa Indonesia' | 'Bahasa Inggris' | string;
export type CurriculumStandard = 'Kurikulum Merdeka' | 'Singapore Curriculum' | 'Cambridge Primary/Checkpoint' | 'International Baccalaureate (IB)' | 'Olimpiade Sains Terpadu' | string;
export type QuestionDifficulty = 'Sangat Mudah' | 'Mudah' | 'Sangat Sulit (HOTS)' | string;

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | string;
  text: string;
}

export interface QuestionItem {
  id: string;
  number: number;
  category?: 'Kategori A' | 'Kategori B' | 'Kategori C' | string;
  subject: SubjectName;
  level: EducationLevel;
  stage: ExamTier;
  curriculum: CurriculumStandard;
  difficulty: QuestionDifficulty;
  questionText: string;
  imageSvg?: string;
  imageUrl?: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | string;
  explanation: string;
}

// Crisp High-Quality SVG Visuals Generator
export function makeSvgVisual(title: string, badge: string, colors: [string, string, string], innerGraphics: string): string {
  const [bgGradientStart, bgGradientEnd, accent] = colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 210" width="400" height="210">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradientStart}"/>
        <stop offset="100%" stop-color="${bgGradientEnd}"/>
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
      </filter>
    </defs>
    <rect width="400" height="210" rx="16" fill="url(#bg)"/>
    <rect x="12" y="12" width="376" height="186" rx="12" fill="#ffffff" fill-opacity="0.92" filter="url(#shadow)" stroke="#e2e8f0" stroke-width="1.5"/>
    
    <!-- Top Bar with Badge & Title -->
    <rect x="24" y="22" width="10" height="10" rx="3" fill="${accent}"/>
    <text x="42" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#1e293b" letter-spacing="0.5">${title}</text>
    
    <g transform="translate(290, 20)">
      <rect width="86" height="18" rx="9" fill="${accent}" fill-opacity="0.15"/>
      <text x="43" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="${accent}" text-anchor="middle">${badge}</text>
    </g>

    <!-- Visual Canvas Area -->
    <g transform="translate(24, 46)">
      ${innerGraphics}
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
