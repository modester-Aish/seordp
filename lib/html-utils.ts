/**
 * Decode HTML entities from WordPress titles and content
 * Converts &#8211; to -, &#038; to &, etc.
 */
export function decodeHtmlEntities(text: string): string {
  if (typeof window !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
  
  // Server-side decoding
  return text
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...');
}

/**
 * Clean WordPress title - remove HTML tags and decode entities
 */
export function cleanPageTitle(title: string): string {
  // First remove HTML tags
  const withoutTags = title.replace(/<[^>]*>/g, '');
  // Then decode HTML entities
  return decodeHtmlEntities(withoutTags);
}

/**
 * Clean WordPress content - remove unwanted HTML and decode entities
 */
export function cleanPageContent(content: string): string {
  return decodeHtmlEntities(content);
}

