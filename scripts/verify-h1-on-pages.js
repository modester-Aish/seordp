/**
 * Verify: product/tool detail pages par CSV se H1 "Group Buy" ke sath aana chahiye.
 * Static pages (Products, Contact Us, etc.) par H1 mein "Group Buy" nahi hona chahiye.
 * Same lookup logic as lib/seo-from-csv.ts
 */
const fs = require('fs');
const path = require('path');

const csvPath = path.join(process.cwd(), 'public', 'data', 'seo-meta.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/).filter((l) => l.trim());

function normalizeKey(key) {
  return key
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function parseCsvLine(line) {
  const out = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i++;
      let val = '';
      while (i < line.length && line[i] !== '"') {
        if (line[i] === '\\') i++, val += line[i++];
        else val += line[i++];
      }
      if (line[i] === '"') i++;
      out.push(val.trim());
      if (line[i] === ',') i++;
    } else {
      let val = '';
      while (i < line.length && line[i] !== ',') val += line[i++];
      out.push(val.trim());
      if (line[i] === ',') i++;
    }
  }
  return out;
}

const map = new Map();
for (let i = 1; i < lines.length; i++) {
  const row = parseCsvLine(lines[i]);
  if (row.length < 4) continue;
  const [page_name, meta_title, meta_description, h1] = row;
  if (!page_name) continue;
  const key = normalizeKey(page_name);
  map.set(key, { meta_title, meta_description, h1: h1 || '' });
  map.set(page_name.trim(), { meta_title, meta_description, h1: h1 || '' });
}

function getSeoH1(pageNameOrSlug) {
  const trimmed = pageNameOrSlug.trim();
  let row = map.get(trimmed) ?? map.get(normalizeKey(pageNameOrSlug)) ?? null;
  if (!row && trimmed.includes('-')) {
    const firstSegment = trimmed.split('-')[0];
    if (firstSegment) row = map.get(firstSegment) ?? map.get(normalizeKey(firstSegment)) ?? null;
  }
  if (!row && trimmed.includes(' ')) {
    const firstWord = trimmed.split(/\s+/)[0];
    if (firstWord) row = map.get(firstWord) ?? map.get(normalizeKey(firstWord)) ?? null;
  }
  return row?.h1 ? row.h1 : null;
}

// Slugs that are product/tool DETAIL pages - H1 mein "Group Buy" hona chahiye
const productToolSlugs = [
  'ahrefs',
  'ahrefs-group-buy',
  'semrush',
  'moz',
  'heygen',
  'adobe',
  'adobe-group-buy',
  'canva',
  'figma',
  'midjourney',
  'writer-plan',
  'mega-plan',
];

// Static/listing pages - H1 mein "Group Buy" NAHI hona chahiye
const staticSlugs = ['products', 'contact-us', 'cart', 'pages', 'single-tools-list', 'blog'];

console.log('========== VERIFY: H1 detail pages par "Group Buy" aana chahiye ==========\n');

let productToolOk = 0;
let productToolFail = 0;
productToolSlugs.forEach((slug) => {
  const h1 = getSeoH1(slug);
  const hasGroupBuy = h1 && /group\s*buy/i.test(h1);
  const status = hasGroupBuy ? 'OK' : 'MISSING Group Buy';
  if (hasGroupBuy) productToolOk++;
  else productToolFail++;
  console.log(`  ${slug.padEnd(22)} -> ${h1 || '(null)'}  [${status}]`);
});

console.log('\n========== VERIFY: Static pages par H1 mein "Group Buy" nahi hona chahiye ==========\n');

staticSlugs.forEach((slug) => {
  const h1 = getSeoH1(slug);
  const hasGroupBuy = h1 && /group\s*buy/i.test(h1);
  const status = !hasGroupBuy ? 'OK' : 'Unexpected Group Buy';
  console.log(`  ${slug.padEnd(22)} -> ${h1 || '(null)'}  [${status}]`);
});

console.log('\n========== Summary ==========');
console.log(`  Product/Tool detail: ${productToolOk} OK, ${productToolFail} missing "Group Buy" in H1`);
console.log(`  Static pages: checked ${staticSlugs.length} (should not have Group Buy in H1).`);
if (productToolFail > 0) {
  console.log('\n  FAIL: Kuch product/tool slugs par CSV H1 mein "Group Buy" nahi mila.');
  process.exit(1);
}
console.log('\n  PASS: Jahan verify kiya, wahan H1 sahi hai.');
