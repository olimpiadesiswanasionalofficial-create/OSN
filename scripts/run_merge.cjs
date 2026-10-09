const fs = require('fs');
const path = require('path');
const { parseCSV } = require('./import_helper.cjs');

const csvPath = path.join(__dirname, '../data/raw_spreadsheet.csv');
const participantsPath = path.join(__dirname, '../data/participants.json');

if (!fs.existsSync(csvPath)) {
  console.log('No raw_spreadsheet.csv found');
  process.exit(0);
}

const csvData = fs.readFileSync(csvPath, 'utf8');
const newRecords = parseCSV(csvData);

let existing = [];
if (fs.existsSync(participantsPath)) {
  existing = JSON.parse(fs.readFileSync(participantsPath, 'utf8'));
}

const map = new Map();
existing.forEach(p => {
  if (p.id) map.set(p.id, p);
  const key = `${p.whatsapp || ''}_${(p.fullName || '').toLowerCase().trim()}`;
  map.set(key, p);
});

let added = 0;
let updated = 0;

newRecords.forEach(p => {
  const key = `${p.whatsapp || ''}_${(p.fullName || '').toLowerCase().trim()}`;
  if (map.has(key)) {
    const prev = map.get(key);
    Object.assign(prev, p, { id: prev.id });
    updated++;
  } else {
    existing.push(p);
    map.set(key, p);
    added++;
  }
});

fs.writeFileSync(participantsPath, JSON.stringify(existing, null, 2), 'utf8');
console.log(`Import completed: ${added} added, ${updated} updated. Total: ${existing.length}`);
