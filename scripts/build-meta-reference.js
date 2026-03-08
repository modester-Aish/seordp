const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'public', 'data', 'seo-meta.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/).filter((l) => l.trim());
const header = lines[0];
if (!header.includes('page_name')) {
  console.log('No header');
  process.exit(1);
}

function normalize(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const COL_SEP = '\t'; // tab = column mein fasla, read karne mein aasani

function escapeCsv(val) {
  if (!val) return '""';
  const s = String(val).replace(/"/g, '""');
  return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s + '"' : s;
}

function escapeTsv(val) {
  if (val == null) return '';
  return String(val).replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
}

function parseCsvLine(line) {
  const parts = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i++;
      let val = '';
      while (i < line.length && line[i] !== '"') {
        if (line[i] === '\\') {
          i++;
          if (i < line.length) val += line[i];
        } else {
          val += line[i];
        }
        i++;
      }
      if (line[i] === '"') i++;
      parts.push(val.trim());
      if (line[i] === ',') i++;
    } else {
      let val = '';
      while (i < line.length && line[i] !== ',') {
        val += line[i];
        i++;
      }
      parts.push(val.trim());
      if (line[i] === ',') i++;
    }
  }
  return parts;
}

// Parse CSV line: quoted fields can contain commas; unquoted end at next comma.
function parseCsvLineQuoted(line) {
  const parts = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i++;
      let val = '';
      while (i < line.length) {
        if (line[i] === '"' && line[i + 1] === '"') {
          val += '"';
          i += 2;
          continue;
        }
        if (line[i] === '"') {
          i++;
          break;
        }
        val += line[i];
        i++;
      }
      parts.push(val.trim());
      if (line[i] === ',') i++;
    } else {
      let val = '';
      while (i < line.length && line[i] !== ',') {
        val += line[i];
        i++;
      }
      parts.push(val.trim());
      if (line[i] === ',') i++;
    }
  }
  return parts;
}

// Source CSV has 4 columns: page_name, meta_title, meta_description, h1. Some fields have unquoted commas.
// Naive split by comma; then col2 (meta_description) = everything between col1 and last column.
function parseCsvLineFourColumns(line) {
  const parts = line.split(',');
  if (parts.length <= 4) return parts.map((p) => p.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
  return [
    parts[0].replace(/^"|"$/g, '').trim(),
    parts[1].replace(/^"|"$/g, '').trim(),
    parts.slice(2, -1).join(',').replace(/^"|"$/g, '').replace(/""/g, '"').trim(),
    parts[parts.length - 1].replace(/^"|"$/g, '').trim(),
  ];
}

const rows = [];
rows.push([
  'https://seordp.net',
  'Best Group Buy SEO Tools 2025 - Ahrefs, SEMrush, Moz Pro at 90% OFF',
  'Access 50+ premium SEO tools at 90% discount. Get Ahrefs, SEMrush, Moz Pro, ChatGPT Plus, Canva Pro & more. Join 45,000+ users.',
]);

const staticSlugs = {
  Blog: '/blog',
  Products: '/products',
  Pages: '/pages',
  'Contact Us': '/contact-us',
  'Single Tools List': '/single-tools-list',
};

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = parseCsvLineFourColumns(line);
  const pageName = parts[0];
  const metaTitle = parts[1] || '';
  const metaDesc = parts[2] || '';
  if (!pageName) continue;
  const slug = normalize(pageName);
  const url = staticSlugs[pageName]
    ? 'https://seordp.net' + staticSlugs[pageName]
    : slug === 'seordpnet'
      ? null
      : 'https://seordp.net/' + slug;
  if (!url) continue;
  rows.push([url, metaTitle, metaDesc]);
}

// 1) Readable .txt: har page alag block, saaf padhne ke liye
const dataDir = path.join(__dirname, '..', 'public', 'data');
const txtLines = [];
txtLines.push('SEORDP – Meta titles & descriptions reference');
txtLines.push('============================================');
txtLines.push('');
rows.forEach(([url, title, desc], idx) => {
  txtLines.push('--- Page ' + (idx + 1) + ' ---');
  txtLines.push('URL: ' + url);
  txtLines.push('META TITLE: ' + title);
  txtLines.push('META DESCRIPTION: ' + desc);
  txtLines.push('');
});
const txtPath = path.join(dataDir, 'meta-titles-descriptions-reference.txt');
fs.writeFileSync(txtPath, txtLines.join('\n'), 'utf-8');
console.log('Wrote readable file: ' + txtPath);

// 2) TSV bhi rakho (Excel ke liye)
const tsvLines = ['url' + COL_SEP + 'meta_title' + COL_SEP + 'meta_description'];
rows.forEach(([url, title, desc]) => {
  tsvLines.push(url + COL_SEP + escapeTsv(title) + COL_SEP + escapeTsv(desc));
});
const tsvPath = path.join(dataDir, 'meta-titles-descriptions-reference.tsv');
fs.writeFileSync(tsvPath, tsvLines.join('\n'), 'utf-8');
console.log('Wrote ' + rows.length + ' rows to ' + tsvPath);
