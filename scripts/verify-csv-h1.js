/**
 * Verify CSV H1 is used for detail page top title.
 * Run from my-website: node scripts/verify-csv-h1.js
 */
const path = require('path');
const fs = require('fs');

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
      out.push(val.trim());
      if (line[i] === ',') i++;
    } else {
      let val = '';
      while (i < line.length && line[i] !== ',') {
        val += line[i];
        i++;
      }
      i++;
      out.push(val.trim());
      if (line[i] === ',') i++;
    }
  }
  return out;
}

function normalizeKey(key) {
  return key
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const mapByExact = new Map();
const mapByNormalized = new Map();
for (let i = 1; i < lines.length; i++) {
  const row = parseCsvLine(lines[i]);
  if (row.length < 4) continue;
  const [page_name, meta_title, meta_description, h1] = row;
  if (!page_name || !h1) continue;
  const key = normalizeKey(page_name);
  mapByExact.set(page_name.trim(), h1);
  mapByNormalized.set(key, h1);
}

function getSeoH1(pageNameOrSlug) {
  const trimmed = (pageNameOrSlug || '').trim();
  let h1 = mapByExact.get(trimmed) ?? mapByNormalized.get(normalizeKey(trimmed)) ?? null;
  if (!h1 && trimmed.includes('-')) {
    const firstSegment = trimmed.split('-')[0];
    if (firstSegment) {
      h1 = mapByExact.get(firstSegment) ?? mapByNormalized.get(normalizeKey(firstSegment)) ?? null;
    }
  }
  if (!h1 && trimmed.includes(' ')) {
    const firstWord = trimmed.split(/\s+/)[0];
    if (firstWord) {
      h1 = mapByExact.get(firstWord) ?? mapByNormalized.get(normalizeKey(firstWord)) ?? null;
    }
  }
  return h1 || null;
}

// Sample slugs/names that detail pages use
const samples = [
  { label: 'Tool slug ahrefs', slug: 'ahrefs', name: 'AHREF$' },
  { label: 'Tool slug semrush', slug: 'semrush', name: 'SEMRU$H' },
  { label: 'Product slug adobe', slug: 'adobe-group-buy', name: 'Adobe Group Buy' },
  { label: 'Product slug ahrefs', slug: 'ahrefs-group-buy', name: 'Ahrefs Group Buy' },
  { label: 'CSV page Ahrefs', slug: 'Ahrefs' },
  { label: 'CSV page Adobe', slug: 'Adobe' },
  { label: 'CSV page Heygen', slug: 'Heygen' },
  { label: 'Product slug heygen', slug: 'heygen-group-buy', name: 'Heygen Group Buy' },
];

console.log('=== CSV H1 verification (detail page top name) ===\n');
console.log('Detail page H1 = getSeoH1(slug) ?? getSeoH1(product.name) ?? product.name');
console.log('So if CSV has a row, that h1 shows in the top title.\n');

let ok = 0;
let miss = 0;
samples.forEach(({ label, slug, name }) => {
  const bySlug = getSeoH1(slug);
  const byName = name ? getSeoH1(name) : null;
  const resolved = bySlug || byName;
  if (resolved) {
    ok++;
    console.log(`OK ${label}`);
    console.log(`   slug: "${slug}" -> H1: "${resolved}"`);
    if (byName && byName !== bySlug) console.log(`   name: "${name}" -> H1: "${byName}"`);
  } else {
    miss++;
    console.log(`-- ${label}: no CSV match (will show slug/name as title)`);
    console.log(`   slug: "${slug}", name: "${name || '-'}"`);
  }
  console.log('');
});

console.log(`Summary: ${ok} with CSV H1, ${miss} without (use product/tool name as fallback).`);
console.log('\nUpar wala name (left pic, right data) = CSV h1 when found, else product/tool name.');
