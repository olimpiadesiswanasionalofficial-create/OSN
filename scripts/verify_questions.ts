import { ALL_SIMULASI_OFFICIAL_QUESTIONS } from '../src/services/simulasiQuestionsAll';
import { ALL_PENYISIHAN_OFFICIAL_QUESTIONS } from '../src/services/penyisihanQuestionsAll';

console.log('=== VERIFYING QUESTIONS BANK ===');
console.log('Simulasi questions count:', ALL_SIMULASI_OFFICIAL_QUESTIONS.length);
console.log('Penyisihan questions count:', ALL_PENYISIHAN_OFFICIAL_QUESTIONS.length);

const all = [...ALL_SIMULASI_OFFICIAL_QUESTIONS, ...ALL_PENYISIHAN_OFFICIAL_QUESTIONS];
console.log('Total official questions:', all.length);

const ids = all.map(q => q.id);
const uniqueIds = new Set(ids);
console.log('Unique IDs:', uniqueIds.size);

const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
if (duplicates.length > 0) {
  console.error('Found duplicate IDs:', duplicates);
} else {
  console.log('No duplicate IDs found!');
}

const withoutImage = all.filter(q => !q.imageUrl && !q.imageSvg);
if (withoutImage.length > 0) {
  console.error('Questions without image:', withoutImage.map(q => q.id));
} else {
  console.log('100% of questions have illustrations/images!');
}

// Check breakdown by category and subject in Penyisihan
const breakdown: Record<string, Record<string, number>> = {};
for (const q of ALL_PENYISIHAN_OFFICIAL_QUESTIONS) {
  const cat = q.category || 'Unknown';
  breakdown[cat] = breakdown[cat] || {};
  breakdown[cat][q.subject] = (breakdown[cat][q.subject] || 0) + 1;
}
console.log('Penyisihan breakdown:');
console.table(breakdown);
