// Export a static snapshot of WordPress (posts/pages/categories/tags)
// and WooCommerce (products/categories) data into JSON files
// so the Next.js app can run without a live WordPress backend.
//
// Run (from my-website folder):
//   WORDPRESS_BASE_URL="https://your-wp-site.com" \
//   WC_CONSUMER_KEY="ck_xxx" \
//   WC_CONSUMER_SECRET="cs_xxx" \
//   node scripts/export-wordpress-snapshot.js

require('dotenv').config({ path: '.env.local' });

const axios = require('axios');
const { mkdir, writeFile } = require('fs').promises;
const path = require('path');

// IMPORTANT:
// We intentionally do NOT hardcode any default WordPress URL here.
// Always configure WORDPRESS_BASE_URL in .env.local (e.g. https://backend.seordp.net)
const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL;

// WordPress REST API base
const WP_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`;

// WooCommerce REST API base + credentials
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';
const WC_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wc/v3`;

const wpAxios = axios.create({
  baseURL: WP_API_URL,
  timeout: 30000,
});

const wcAxios = axios.create({
  baseURL: WC_API_URL,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'public', 'data');
  await mkdir(dataDir, { recursive: true });
  return dataDir;
}

async function writeJson(filePath, data) {
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Wrote ${filePath} (${Array.isArray(data) ? data.length : 1} items)`);
}

async function fetchAllFromWp(endpoint, extraParams = {}) {
  const perPage = 100;
  let page = 1;
  let totalPages = 1;
  const allItems = [];

  console.log(`🌐 Fetching ${endpoint} from WordPress...`);

  const firstResponse = await wpAxios.get(endpoint, {
    params: {
      per_page: perPage,
      page,
      _embed: true,
      ...extraParams,
    },
  });

  allItems.push(...firstResponse.data);
  totalPages = parseInt(firstResponse.headers['x-wp-totalpages'] || '1', 10);
  const total = parseInt(firstResponse.headers['x-wp-total'] || '0', 10);

  console.log(
    `   Page ${page}/${totalPages} loaded (${firstResponse.data.length} items, total reported: ${total})`
  );

  while (page < totalPages) {
    page += 1;
    const res = await wpAxios.get(endpoint, {
      params: {
        per_page: perPage,
        page,
        _embed: true,
        ...extraParams,
      },
    });
    allItems.push(...res.data);
    console.log(`   Page ${page}/${totalPages} loaded (${res.data.length} items)`);
  }

  console.log(`✅ Total loaded from ${endpoint}: ${allItems.length}`);
  return allItems;
}

async function fetchAllFromWoo(endpoint, extraParams = {}) {
  const perPage = 100;
  let page = 1;
  let totalPages = 1;
  const allItems = [];

  console.log(`🛒 Fetching ${endpoint} from WooCommerce...`);

  const firstResponse = await wcAxios.get(endpoint, {
    params: {
      per_page: perPage,
      page,
      ...extraParams,
    },
  });

  allItems.push(...firstResponse.data);
  totalPages = parseInt(firstResponse.headers['x-wp-totalpages'] || '1', 10);
  const total = parseInt(firstResponse.headers['x-wp-total'] || '0', 10);

  console.log(
    `   Page ${page}/${totalPages} loaded (${firstResponse.data.length} items, total reported: ${total})`
  );

  while (page < totalPages) {
    page += 1;
    const res = await wcAxios.get(endpoint, {
      params: {
        per_page: perPage,
        page,
        ...extraParams,
      },
    });
    allItems.push(...res.data);
    console.log(`   Page ${page}/${totalPages} loaded (${res.data.length} items)`);
  }

  console.log(`✅ Total loaded from ${endpoint}: ${allItems.length}`);
  return allItems;
}

async function main() {
  if (!WORDPRESS_BASE_URL) {
    throw new Error(
      'WORDPRESS_BASE_URL is not set. Please set it to your WordPress site URL.'
    );
  }

  const dataDir = await ensureDataDir();

  console.log('==============================');
  console.log('📦 Exporting WordPress snapshot');
  console.log('Base URL:', WORDPRESS_BASE_URL);
  console.log('Output dir:', dataDir);
  console.log('==============================');

  // Fetch WordPress data (public, no auth needed)
  const [posts, pages, categories, tags] = await Promise.all([
    fetchAllFromWp('/posts'),
    fetchAllFromWp('/pages'),
    fetchAllFromWp('/categories', { per_page: 100, _embed: false }),
    fetchAllFromWp('/tags', { per_page: 100, _embed: false }),
  ]);

  // Write WordPress JSON files into public/data so they can be served statically
  await writeJson(path.join(dataDir, 'wp-posts.json'), posts);
  await writeJson(path.join(dataDir, 'wp-pages.json'), pages);
  await writeJson(path.join(dataDir, 'wp-categories.json'), categories);
  await writeJson(path.join(dataDir, 'wp-tags.json'), tags);

  // WooCommerce data may require auth; best-effort export, but don't fail whole snapshot
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn(
      '⚠️ WC_CONSUMER_KEY / WC_CONSUMER_SECRET not set. Skipping WooCommerce products/categories export.'
    );
  } else {
    try {
      const [products, productCategories] = await Promise.all([
        fetchAllFromWoo('/products'),
        fetchAllFromWoo('/products/categories', { per_page: 100 }),
      ]);

      await writeJson(path.join(dataDir, 'wc-products.json'), products);
      await writeJson(
        path.join(dataDir, 'wc-product-categories.json'),
        productCategories
      );
    } catch (wooErr) {
      console.error(
        '❌ Error exporting WooCommerce data. WordPress data export is still complete:',
        wooErr
      );
    }
  }

  console.log('🎉 Snapshot export completed successfully.');
}

main().catch((err) => {
  console.error('❌ Error exporting WordPress snapshot:', err);
  process.exit(1);
});

