const fs = require('fs');
const path = require('path');
const csvPath = path.join(process.cwd(), 'public', 'data', 'seo-meta.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/).filter((l) => l.trim());
const rows = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = [];
  let j = 0;
  while (j < line.length) {
    if (line[j] === '"') {
      j++;
      let val = '';
      while (j < line.length && line[j] !== '"') {
        val += line[j];
        j++;
      }
      if (line[j] === '"') j++;
      parts.push(val.trim());
      if (line[j] === ',') j++;
    } else {
      let val = '';
      while (j < line.length && line[j] !== ',') {
        val += line[j];
        j++;
      }
      parts.push(val.trim());
      if (line[j] === ',') j++;
    }
  }
  if (parts.length >= 4) {
    const page_name = parts[0];
    const h1 = parts[3];
    const hasGroupBuy = /group\s*buy/i.test(h1);
    if (!hasGroupBuy) rows.push({ page_name, h1 });
  }
}
console.log('=== H1 mein "group buy" NAHI hai (page_name | h1) ===');
rows.forEach((r) => console.log(r.page_name + ' | ' + r.h1));
console.log('');
console.log('Total:', rows.length);
