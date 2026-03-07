import fs from 'fs';
import path from 'path';

export interface SeoRow {
  meta_title: string;
  meta_description: string;
  h1: string;
}

let cache: Map<string, SeoRow> | null = null;

/** CSV = single source of truth: title/description jaisa CSV mein hai waisa hi use hota hai; sirf encoding fix, no truncation. */
/**
 * UTF-8 mojibake fix: "â€“" ko proper dash "-" mein convert karo.
 */
function fixEncodingArtifacts(s: string): string {
  if (!s) return s;
  return s.replace(/â€“/g, '-');
}

/** Normalize page name or slug for lookup: lowercase, spaces to hyphens, alphanumeric + hyphen only */
function normalizeKey(key: string): string {
  return key
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/** Simple CSV parse: handle quoted fields with commas inside */
function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i += 1;
      let val = '';
      while (i < line.length && line[i] !== '"') {
        if (line[i] === '\\') {
          i += 1;
          if (i < line.length) val += line[i];
        } else {
          val += line[i];
        }
        i += 1;
      }
      if (line[i] === '"') i += 1;
      out.push(val.trim());
      if (line[i] === ',') i += 1;
    } else {
      let val = '';
      while (i < line.length && line[i] !== ',') {
        val += line[i];
        i += 1;
      }
      out.push(val.trim());
      if (line[i] === ',') i += 1;
    }
  }
  return out;
}

function loadCsvMap(): Map<string, SeoRow> {
  // Dev: CSV cache mat use karo — file change ke baad bina restart meta update ho
  if (process.env.NODE_ENV === 'development') cache = null;
  if (cache) return cache;
  const csvPath = path.join(process.cwd(), 'public', 'data', 'seo-meta.csv');
  if (!fs.existsSync(csvPath)) {
    cache = new Map();
    return cache;
  }
  const raw = fs.readFileSync(csvPath, 'utf-8');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim());
  const map = new Map<string, SeoRow>();
  const header = lines[0];
  if (!header || !header.toLowerCase().includes('page_name')) {
    cache = map;
    return cache;
  }
  for (let i = 1; i < lines.length; i++) {
    const row = parseCsvLine(lines[i]);
    if (row.length < 4) continue;
    const [page_name, meta_title, meta_description, h1] = row;
    if (!page_name) continue;
    const key = normalizeKey(page_name);
    map.set(key, { meta_title: meta_title || '', meta_description: meta_description || '', h1: h1 || '' });
    // Also store by exact page_name (trimmed) for static pages like "Products", "Blog"
    map.set(page_name.trim(), { meta_title: meta_title || '', meta_description: meta_description || '', h1: h1 || '' });
  }
  cache = map;
  return cache;
}

/**
 * Get SEO meta (and H1) by page name or slug.
 * Product slug "ahrefs-group-buy" pehle segment "ahrefs" se bhi match karega (CSV "Ahrefs").
 */
export function getSeoMeta(pageNameOrSlug: string): SeoRow | null {
  const map = loadCsvMap();
  const trimmed = pageNameOrSlug.trim();
  let row =
    map.get(trimmed) ??
    map.get(normalizeKey(pageNameOrSlug)) ??
    null;
  // Product slug jaise "ahrefs-group-buy" -> pehla segment "ahrefs" try karo (CSV "Ahrefs" match)
  if (!row && trimmed.includes('-')) {
    const firstSegment = trimmed.split('-')[0];
    if (firstSegment) {
      row = map.get(firstSegment) ?? map.get(normalizeKey(firstSegment)) ?? null;
    }
  }
  // Product name jaise "Ahrefs Group Buy" -> pehla word "Ahrefs" try karo
  if (!row && trimmed.includes(' ')) {
    const firstWord = trimmed.split(/\s+/)[0];
    if (firstWord) {
      row = map.get(firstWord) ?? map.get(normalizeKey(firstWord)) ?? null;
    }
  }
  if (!row) return null;
  return {
    meta_title: fixEncodingArtifacts(row.meta_title?.trim() ?? ''),
    meta_description: fixEncodingArtifacts(row.meta_description ?? ''),
    h1: fixEncodingArtifacts(row.h1 ?? ''),
  };
}

/**
 * Get only H1 for products/tools pages. Use only on products listing, product [slug], single-tools-list.
 */
export function getSeoH1(pageNameOrSlug: string): string | null {
  const row = getSeoMeta(pageNameOrSlug);
  return row?.h1 ? row.h1 : null;
}
