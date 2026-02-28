// Product/Tool ID mapping for Buy Now links
// Base URL: https://members.buyseo.org/cart/index/product/id/{ID}/c/?

// Check if we're in development mode for auto-debugging
const isDevelopment = process.env.NODE_ENV === 'development';

// Product IDs mapping by name (normalized)
export const productIds: Record<string, number> = {
  // Plans
  'lite plan': 56,
  'student plan': 51,
  'basic plan': 30,
  'small plan': 35,
  'small plan (alt)': 162,
  'standard plan': 12,
  'ecom plan': 3,
  'vip plan': 17,
  'mega pack': 2,
  'mega pack + ahrefs unlimited': 4,
  'writer\'s pack': 42,
  'writers pack': 42,
  'amazon tools plan': 45,
  'designer\'s pack': 46,
  'designers pack': 46,
  'custom plan': 70,
  'small plan for 3 months': 6,
  'agency plan': 50,
  'agency plan (1)': 50,
  'agency plan (2)': 15,
  'agency plan for team': 74,
  'agency unlimited plan': 149,
  'team plan': 163,

  // SEO Tools - Ahrefs
  'ahrefs': 53,
  'ahref$': 53,
  'ahref$ combo': 53,
  'ahref$ combo unlimited': 7,
  'ahref$ unlimited': 28,
  'ahrefs + screaming frog': 40,
  'ahref combo': 53,
  'ahref combo unlimited': 7,

  // SEO Tools - SEMrush
  'semrush': 8,
  'semru$h': 8,
  'semru$h combo pack': 60,
  'semrush private': 20,
  'semrush for 6 months': 55,

  // SEO Tools - Others
  'moz': 19,
  'moz pro': 19,
  'kwfinder': 9,
  'majestic': 10,
  'majestic seo': 10,
  'keywords everywhere': 87,
  'answer the public': 88,
  'spyfu': 89,
  'woorank': 94,
  'ubersuggest': 96,
  'serpstat': 98,
  'seo profiler': 99,
  'seoptimer': 110,
  'seo site checkup': 111,
  'se ranking': 136,
  'wordtracker': 137,
  'semscoop': 132,
  'ispionage': 83,

  // E-commerce Tools
  'helium10': 36,
  'helium 10': 36,
  'jungle scout': 33,
  'ecomhunt': 34,
  'salehoo': 90,
  'sell the trend': 93,
  'exploding topics': 92,
  'viral launch': 130,
  'niche scraper': 131,
  'amztrackers': 81,

  // AI Writing Tools
  'jasper ai': 48,
  'jasper': 48,
  'quetext': 57,
  'grammarly': 21,
  'quillbot': 103,
  'article builder': 104,
  'article forge': 105,
  'copymatic.ai': 107,
  'copymatic': 107,
  'smartcopy': 115,
  'closerscopy': 116,
  'copy ai': 117,
  'copyai': 117,
  'stealthwriter ai': 118,
  'stealthwriter': 118,
  'writerzen': 119,
  'writesonic': 120,
  'rytr me': 121,
  'rytr': 121,
  'jenni ai': 122,
  'jenni': 122,
  'wordai': 77,
  'wordtune': 78,
  'wordhero': 79,
  'spin rewriter': 85,
  'writehuman': 147,
  'hix ai': 114,
  'hix': 114,

  // ChatGPT & AI Tools
  'chat gpt premium': 29,
  'chatgpt premium': 29,
  'chat gpt pro': 59,
  'chatgpt pro': 59,
  'claude ai': 113,
  'claude': 113,
  'you ai': 112,
  'youai': 112,
  'grok ai': 155,
  'grok': 155,
  'leonardo ai': 141,
  'leonardo': 141,
  'midjourney': 161,
  'bypass gpt': 47,
  'sider ai': 145,
  'sider': 145,

  // Design Tools
  'canva pro': 65,
  'canva': 65,
  'adobe creative cloud': 64,
  'adobe': 64,
  'adobe creative cloud (alt)': 75,
  'envato elements': 18,
  'envato': 18,
  'freepik': 63,
  'vecteezy': 123,
  'designs ai': 124,
  'picsart': 125,
  'fotojet': 126,
  'picmonkey': 133,
  'icon scout': 143,
  'iconscout': 143,

  // Video & Media Tools
  'videoblocks': 95,
  'storyblocks': 24,
  'epidemicsound': 134,
  'motionarray': 138,
  'invideo io': 127,
  'invideo': 127,
  'renderforest': 142,
  'prezi': 135,
  'slidebean': 135,
  'capcut pro': 72,
  'capcut': 157,
  'gamma app pro': 160,
  'gamma': 160,
  'elevenlabs': 166,
  'heygen ai': 151,
  'heygen': 151,

  // Entertainment
  'netflix': 52,
  'netflix logins': 16,
  'prime video': 109,

  // Education & Learning
  'coursera': 91,
  'skillshare': 97,
  'udemy': 66,
  'linkedin learning': 82,
  'lynda': 82,
  'turnitin student account': 140,
  'turnitin with ai detector': 154,
  'turnitin': 140,

  // Other Tools
  'pillbanana': 100,
  'pexda': 101,
  'cbengine': 102,
  'buzzstream': 106,
  'surfer seo': 108,
  'surfer': 108,
  'unbounce': 61,
  'buzzsumo': 41,
  'adspy subscription': 58,
  'adspy': 58,
  'bigspy pro subscription': 158,
  'bigspy': 158,
  'spyhero subscription': 159,
  'spyhero': 159,
  'keyword revaeler': 76,
  'keyword revealer': 76,
  'vyond': 80,
  'frase.io': 84,
  'frase': 84,
  'indexification': 86,
  'similarweb': 146,
  'gpl themes plugin wordpress': 128,
  'gpl': 128,
  'chaupal tv': 129,
  'scribd premium': 144,
  'scribd': 144,
  'google one ultra plan': 156,
  'google one': 156,
  'premium vpn': 153,
  'vpn': 153,
  'spamzilla': 31,
  'keywordtool.io': 32,
  'keywordtool': 32,
  'screaming frog': 37,
  'screaming frog (alt)': 73,
  'screaming frog (alt2)': 164,
};

// Slug to Product ID mapping (for exact slug matching)
export const slugToProductId: Record<string, number> = {
  'ahrefs': 53,
  'ahref': 53,
  'semrush': 8,
  'semru': 8,
  'moz': 19,
  'netflix': 52,
  'canva': 65,
  'adobe': 64,
  'chatgpt': 29,
  'claude': 113,
  'grammarly': 21,
  'quillbot': 103,
  'surfer': 108,
  'helium10': 36,
  'helium-10': 36,
  'jungle-scout': 33,
  'jasper': 48,
  'kwfinder': 9,
  'majestic': 10,
  'moz-pro': 19,
  'ubersuggest': 96,
  'serpstat': 98,
  'woorank': 94,
  'spyfu': 89,
  'keywords-everywhere': 87,
  'answer-the-public': 88,
  'seo-profiler': 99,
  'seoptimer': 110,
  'seo-site-checkup': 111,
  'se-ranking': 136,
  'wordtracker': 137,
  'semscoop': 132,
  'ispionage': 83,
  'ecomhunt': 34,
  'viral-launch': 130,
  'niche-scraper': 131,
  'amztrackers': 81,
  'salehoo': 90,
  'sell-the-trend': 93,
  'exploding-topics': 92,
  'quetext': 57,
  'article-builder': 104,
  'article-forge': 105,
  'copymatic': 107,
  'smartcopy': 115,
  'closerscopy': 116,
  'copy-ai': 117,
  'stealthwriter': 118,
  'writerzen': 119,
  'writesonic': 120,
  'rytr': 121,
  'jenni': 122,
  'wordai': 77,
  'wordtune': 78,
  'wordhero': 79,
  'spin-rewriter': 85,
  'writehuman': 147,
  'hix': 114,
  'you-ai': 112,
  'grok': 155,
  'leonardo-ai': 141,
  'midjourney': 161,
  'bypass-gpt': 47,
  'sider': 145,
  'envato': 18,
  'envato-elements': 18,
  'freepik': 63,
  'vecteezy': 123,
  'designs-ai': 124,
  'picsart': 125,
  'fotojet': 126,
  'picmonkey': 133,
  'icon-scout': 143,
  'videoblocks': 95,
  'storyblocks': 24,
  'epidemicsound': 134,
  'motionarray': 138,
  'invideo': 127,
  'renderforest': 142,
  'prezi': 135,
  'slidebean': 135,
  'capcut': 157,
  'capcut-pro': 72,
  'gamma': 160,
  'elevenlabs': 166,
  'heygen': 151,
  'prime-video': 109,
  'coursera': 91,
  'skillshare': 97,
  'udemy': 66,
  'linkedin-learning': 82,
  'lynda': 82,
  'turnitin': 140,
  'unbounce': 61,
  'buzzsumo': 41,
  'adspy': 58,
  'bigspy': 158,
  'spyhero': 159,
  'keyword-revealer': 76,
  'vyond': 80,
  'frase': 84,
  'indexification': 86,
  'similarweb': 146,
  'gpl': 128,
  'scribd': 144,
  'google-one': 156,
  'vpn': 153,
  'spamzilla': 31,
  'keywordtool': 32,
  'screaming-frog': 37,
};

// Normalize product name for better matching
function normalizeProductName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\$/g, 's') // Replace $ with s (ahref$ -> ahrefs)
    .replace(/#/g, '') // Remove # symbols
    .replace(/\+/g, ' ') // Replace + with space
    .replace(/\band\b/gi, '') // Remove "and"
    .replace(/\bthe\b/gi, '') // Remove "the"
    .trim();
}

// Normalize slug for matching
function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^\w-]/g, '') // Keep only alphanumeric and hyphens
    .replace(/-+/g, '-') // Multiple hyphens to single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Get product ID by slug (Priority 1: Exact Slug Match)
 * @param slug - Product slug from WooCommerce
 * @param debug - Enable console logging for debugging
 * @returns Product ID or null
 */
export function getProductIdBySlug(slug: string, debug: boolean = false): number | null {
  if (!slug) return null;
  
  const normalizedSlug = normalizeSlug(slug);
  
  if (debug) {
    console.log('🔍 Slug Matching:', {
      original: slug,
      normalized: normalizedSlug
    });
  }
  
  // Direct slug match
  if (slugToProductId[normalizedSlug]) {
    if (debug) {
      console.log('✅ Direct slug match found:', normalizedSlug, '→', slugToProductId[normalizedSlug]);
    }
    return slugToProductId[normalizedSlug];
  }
  
  // Try without hyphens
  const slugWithoutHyphens = normalizedSlug.replace(/-/g, '');
  if (slugToProductId[slugWithoutHyphens]) {
    if (debug) {
      console.log('✅ Slug match (without hyphens):', slugWithoutHyphens, '→', slugToProductId[slugWithoutHyphens]);
    }
    return slugToProductId[slugWithoutHyphens];
  }
  
  // Try removing common suffixes (group-buy, groupbuy, premium, pro, etc.)
  const commonSuffixes = ['-group-buy', '-groupbuy', '-premium', '-pro', '-tool', '-tools', '-subscription', '-plan'];
  for (const suffix of commonSuffixes) {
    if (normalizedSlug.endsWith(suffix)) {
      const slugWithoutSuffix = normalizedSlug.slice(0, -suffix.length);
      if (slugToProductId[slugWithoutSuffix]) {
        if (debug) {
          console.log('✅ Slug match (suffix removed):', slugWithoutSuffix, '→', slugToProductId[slugWithoutSuffix]);
        }
        return slugToProductId[slugWithoutSuffix];
      }
    }
  }
  
  // Try partial match (slug contains key or key contains slug)
  for (const [key, id] of Object.entries(slugToProductId)) {
    if (normalizedSlug.includes(key) || key.includes(normalizedSlug)) {
      if (debug) {
        console.log('✅ Slug partial match:', key, '→', id);
      }
      return id;
    }
  }
  
  if (debug) {
    console.log('❌ No slug match found');
  }
  
  return null;
}

/**
 * Extract keywords from product name (removes common words)
 * @param name - Product name
 * @returns Array of keywords
 */
function extractKeywords(name: string): string[] {
  const commonWords = [
    'group', 'buy', 'premium', 'pro', 'tool', 'tools', 'subscription', 'plan',
    'access', 'account', 'license', 'key', 'code', 'discount', 'cheap', 'best',
    'review', 'guide', 'tutorial', 'how', 'to', 'get', 'the', 'a', 'an', 'and',
    'or', 'but', 'in', 'on', 'at', 'for', 'of', 'with', 'by', 'from', 'to',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might',
    'seo', 'marketing', 'digital', 'online', 'web', 'website', 'site'
  ];
  
  const words = name
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove special characters
    .split(/\s+/)
    .filter(word => word.length >= 2 && !commonWords.includes(word));
  
  return words;
}

/**
 * Get product ID by name (Priority 2: Name Matching with Fuzzy Logic)
 * @param productName - Product name from WooCommerce
 * @param debug - Enable console logging for debugging
 * @returns Product ID or null
 */
export function getProductIdByName(productName: string, debug: boolean = false): number | null {
  if (!productName) return null;
  
  const normalizedName = normalizeProductName(productName);
  
  if (debug) {
    console.log('🔍 Name Matching:', {
      original: productName,
      normalized: normalizedName
    });
  }
  
  // Direct match
  if (productIds[normalizedName]) {
    if (debug) {
      console.log('✅ Direct name match found:', normalizedName, '→', productIds[normalizedName]);
    }
    return productIds[normalizedName];
  }

  // Try matching with normalized key names
  for (const [key, id] of Object.entries(productIds)) {
    const normalizedKey = normalizeProductName(key);
    if (normalizedName === normalizedKey) {
      if (debug) {
        console.log('✅ Normalized name match:', key, '→', id);
      }
      return id;
    }
  }

  // Extract keywords and try matching
  const keywords = extractKeywords(productName);
  if (debug && keywords.length > 0) {
    console.log('🔑 Extracted keywords:', keywords);
  }
  
  // Try matching each keyword
  for (const keyword of keywords) {
    if (productIds[keyword]) {
      if (debug) {
        console.log('✅ Keyword match found:', keyword, '→', productIds[keyword]);
      }
      return productIds[keyword];
    }
    
    // Try matching with slug mapping too
    if (slugToProductId[keyword]) {
      if (debug) {
        console.log('✅ Keyword match (slug mapping):', keyword, '→', slugToProductId[keyword]);
      }
      return slugToProductId[keyword];
    }
  }

  // Partial match - try to find similar names (contains)
  for (const [key, id] of Object.entries(productIds)) {
    const normalizedKey = normalizeProductName(key);
    
    // If either string contains the other (with some minimum length)
    if (normalizedName.length >= 3 && normalizedKey.length >= 3) {
      if (normalizedName.includes(normalizedKey) || normalizedKey.includes(normalizedName)) {
        if (debug) {
          console.log('✅ Partial match (contains):', key, '→', id);
        }
        return id;
      }
    }
    
    // Word-by-word matching for multi-word products
    const nameWords = normalizedName.split(/\s+/).filter(w => w.length >= 3);
    const keyWords = normalizedKey.split(/\s+/).filter(w => w.length >= 3);
    
    if (nameWords.length > 0 && keyWords.length > 0) {
      const matchingWords = nameWords.filter(w => keyWords.includes(w));
      if (matchingWords.length >= Math.min(nameWords.length, keyWords.length) * 0.6) {
        if (debug) {
          console.log('✅ Word-by-word match:', key, '→', id, '(matching words:', matchingWords, ')');
        }
        return id;
      }
    }
  }

  if (debug) {
    console.log('❌ No name match found');
  }

  return null;
}

/**
 * Get product ID with priority order (Legacy function for backward compatibility)
 * @param name - Product name
 * @returns Product ID or null
 */
export function getProductId(name: string): number | null {
  return getProductIdByName(name);
}

const SIGNUP_URL = 'https://members.buyseo.org/signup';

/**
 * Generate Buy Now URL – ab hamesha signup link return hota hai.
 * Affiliate (aff/go/Seordpnet) aur ID/cart links hata diye; sab products pe sirf signup.
 *
 * @returns Buy Now URL (signup)
 */
export function getBuyNowUrl(
  _productName?: string,
  _fallbackId?: number,
  _slug?: string,
  _externalUrl?: string,
  _debug?: boolean
): string {
  return SIGNUP_URL;
}

