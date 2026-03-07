const fs = require('fs');
const path = require('path');
const csvPath = path.join(__dirname, '..', 'public', 'data', 'seo-meta.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/).filter((l) => l.trim());

function parseCsvLine(line) {
  const out = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i++;
      let val = '';
      while (i < line.length && line[i] !== '"') {
        val += line[i];
        i++;
      }
      i++;
      out.push(val);
      if (line[i] === ',') i++;
    } else {
      let val = '';
      while (i < line.length && line[i] !== ',') {
        val += line[i];
        i++;
      }
      i++;
      out.push(val);
    }
  }
  return out;
}

const long = [];
const short = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCsvLine(lines[i]);
  const page = row[0];
  const meta = (row[1] || '').trim();
  const len = meta.length;
  if (len > 60) long.push({ page, len, title: meta });
  if (len > 0 && len < 40) short.push({ page, len, title: meta });
}

console.log('=== Meta title 60+ chars (LONG) ===');
console.log('Total:', long.length);
long.forEach((x) => console.log(x.len + ' chars: ' + x.page + ' | ' + x.title.substring(0, 55) + (x.title.length > 55 ? '...' : '')));

console.log('\n=== Meta title < 40 chars (SHORT) ===');
console.log('Total:', short.length);
short.forEach((x) => console.log(x.len + ' chars: ' + x.page + ' | ' + x.title));
