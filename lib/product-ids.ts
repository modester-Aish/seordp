// Product/Tool ID mapping for Buy Now links
// Base URL: https://members.seotoolsgroupbuy.us/cart/index/product/id/{ID}/c/?

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
  'amazon tools plan': 45,
  'designer\'s pack': 46,
  'custom plan': 70,
  'small plan for 3 months': 6,

  // SEO Tools - Ahrefs
  'ahrefs': 53,
  'ahref$': 53,
  'ahref$ combo': 53,
  'ahref$ combo unlimited': 7,
  'ahref$ unlimited': 28,
  'ahrefs + screaming frog': 40,

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
  'majestic': 11,
  'majestic seo': 11,
  'keywords everywhere': 87,
  'answer the public': 88,
  'spyfu': 89,
  'woorank': 94,
  'ubersuggest': 96,
  'serpstat': 98,
  'seo profiler': 99,
  'seoptimer': 110,
  'seo site checkup': 111,

  // Entertainment
  'netflix': 52,
  'netflix logins': 16,
  'prime video': 109,

  // E-commerce Tools
  'salehoo': 90,
  'sell the trend': 93,
  'exploding topics': 92,

  // Education
  'coursera': 91,
  'skillshare': 97,

  // Video/Media
  'videoblocks': 95,

  // Writing Tools
  'quillbot': 103,
  'article builder': 104,
  'article forge': 105,
  'copymatic.ai': 107,
  'smartcopy': 115,

  // Other Tools
  'pillbanana': 100,
  'pexda': 101,
  'cbengine': 102,
  'buzzstream': 106,
  'surfer seo': 108,
  'surfer': 108,
  'you ai': 112,
  'claude ai': 113,
  'claude': 113,
  'hix ai': 114,
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

// Get product ID by name (case-insensitive with fuzzy matching)
export function getProductId(name: string): number | null {
  const normalizedName = normalizeProductName(name);
  
  // Direct match
  if (productIds[normalizedName]) {
    return productIds[normalizedName];
  }

  // Try matching with normalized key names too
  for (const [key, id] of Object.entries(productIds)) {
    const normalizedKey = normalizeProductName(key);
    if (normalizedName === normalizedKey) {
      return id;
    }
  }

  // Partial match - try to find similar names (contains)
  for (const [key, id] of Object.entries(productIds)) {
    const normalizedKey = normalizeProductName(key);
    
    // If either string contains the other (with some minimum length)
    if (normalizedName.length >= 3 && normalizedKey.length >= 3) {
      if (normalizedName.includes(normalizedKey) || normalizedKey.includes(normalizedName)) {
        return id;
      }
    }
    
    // Word-by-word matching for multi-word products
    const nameWords = normalizedName.split(/\s+/).filter(w => w.length >= 3);
    const keyWords = normalizedKey.split(/\s+/).filter(w => w.length >= 3);
    
    if (nameWords.length > 0 && keyWords.length > 0) {
      const matchingWords = nameWords.filter(w => keyWords.includes(w));
      if (matchingWords.length >= Math.min(nameWords.length, keyWords.length) * 0.6) {
        return id;
      }
    }
  }

  return null;
}

// Generate Buy Now URL with product ID
export function getBuyNowUrl(productName: string, fallbackId?: number): string {
  const id = getProductId(productName) || fallbackId;
  
  if (id) {
    return `https://members.seotoolsgroupbuy.us/cart/index/product/id/${id}/c/?`;
  }
  
  // Default signup URL if no ID found
  return 'https://members.seotoolsgroupbuy.us/signup';
}

