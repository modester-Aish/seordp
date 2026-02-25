/**
 * Download all WordPress upload images from backend and save to public/wp-content/uploads/
 * Uses image URLs found in public/data/*.json. Run while backend API is still available.
 *
 * Usage: node scripts/download-wp-images.js
 * (Loads .env.local for WORDPRESS_BASE_URL)
 */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://backend.seordp.net';
const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'wp-content', 'uploads');

const JSON_FILES = [
  'wp-posts.json',
  'wp-pages.json',
  'wp-categories.json',
  'wp-tags.json',
  'wc-products.json',
  'wc-product-categories.json',
];

// Match path after wp-content/uploads/ (handles JSON-escaped \/ and plain /)
const UPLOADS_PATH_REGEX = /(?:backend\.seordp\.net|wp-content)[\\\/]+(?:wp-content[\\\/]+)?uploads[\\\/]+([^"'\s?#\\]+)/gi;

function extractUploadUrls() {
  const paths = new Set();
  for (const file of JSON_FILES) {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, 'utf8');
    let m;
    UPLOADS_PATH_REGEX.lastIndex = 0;
    while ((m = UPLOADS_PATH_REGEX.exec(raw)) !== null) {
      const rel = m[1].replace(/\\\//g, '/').replace(/\\u0026/g, '&').trim();
      if (rel && !rel.startsWith('.')) paths.add(rel);
    }
  }
  const base = BASE_URL.replace(/\/$/, '');
  return [...paths].map((rel) => `${base}/wp-content/uploads/${rel}`);
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  if (!BASE_URL) {
    console.error('Set WORDPRESS_BASE_URL in .env.local');
    process.exit(1);
  }

  console.log('Scanning JSON files for image URLs...');
  const urls = extractUploadUrls();
  console.log(`Found ${urls.length} unique image URL(s).`);

  if (urls.length === 0) {
    console.log('Nothing to download.');
    return;
  }

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  let ok = 0;
  let fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const match = url.match(/\/wp-content\/uploads\/(.+)$/);
    const relativePath = match ? match[1] : null;
    if (!relativePath) continue;

    const localPath = path.join(UPLOADS_DIR, relativePath);
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (fs.existsSync(localPath)) {
      ok++;
      if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/${urls.length} (cached/skip)`);
      continue;
    }

    try {
      const buf = await downloadFile(url);
      fs.writeFileSync(localPath, buf);
      ok++;
      console.log(`  [${i + 1}/${urls.length}] OK ${relativePath}`);
    } catch (err) {
      fail++;
      console.warn(`  [${i + 1}/${urls.length}] FAIL ${relativePath} - ${err.message}`);
    }
  }

  console.log(`\nDone. Saved: ${ok}, Failed: ${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
