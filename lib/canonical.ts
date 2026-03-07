/** Absolute URL for default og:image (required for complete Open Graph) */
export const DEFAULT_OG_IMAGE_URL = 'https://seordp.net/icon';

export const defaultOgImage = {
  url: DEFAULT_OG_IMAGE_URL,
  width: 512,
  height: 512,
  alt: 'SEORDP',
} as const;

export function generateCanonicalUrl(path: string): string {
  // Always use non-www domain for canonical URLs
  let baseUrl = 'https://seordp.net';
  
  // Remove www if present
  baseUrl = baseUrl.replace(/^https?:\/\/(www\.)?/, 'https://');
  
  // Remove trailing slash from base URL if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBaseUrl}${cleanPath}`;
}

export function generateAbsoluteUrl(path: string): string {
  return generateCanonicalUrl(path);
}

/** Max length for meta title (Google shows ~50–60 chars) */
export const MAX_META_TITLE_LENGTH = 60;

/** Max length for meta description (Google truncates ~155) */
export const MAX_META_DESC_LENGTH = 155;

/** Truncate meta title to max length at word boundary */
export function truncateMetaTitle(title: string | undefined, maxLen = MAX_META_TITLE_LENGTH): string {
  const t = (title || '').trim();
  if (t.length <= maxLen) return t;
  const cut = t.substring(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return lastSpace > maxLen * 0.6 ? cut.substring(0, lastSpace) : cut;
}

/** Generic short meta description to replace with a proper one */
export const GENERIC_SHORT_META_DESC = 'Access premium SEO tools at seordp.net.';
export const DEFAULT_META_DESC = 'Group buy SEO tools: Ahrefs, SEMrush, Moz Pro and 60+ premium tools at low cost. Get started at seordp.net.';

/** Truncate meta description to max length, optionally at last word boundary */
export function truncateMetaDescription(desc: string | undefined, maxLen = MAX_META_DESC_LENGTH): string {
  const d = (desc || '').trim();
  if (d.length <= maxLen) return d;
  const cut = d.substring(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return lastSpace > maxLen * 0.7 ? cut.substring(0, lastSpace) : cut;
}

/** SEO: ensure meta description is 70–155 chars; replace generic 39-char line */
export function ensureMinDescriptionLength(desc: string | undefined, fallbackSuffix = ' Get started at seordp.net.'): string {
  let d = (desc || '').trim();
  if (!d || d === GENERIC_SHORT_META_DESC || (d.length < 50 && d.toLowerCase().includes('seordp.net'))) d = DEFAULT_META_DESC;
  if (d.length >= 70) return truncateMetaDescription(d);
  const extended = (d + fallbackSuffix).trim();
  if (extended.length >= 70) return truncateMetaDescription(extended);
  return DEFAULT_META_DESC;
}

