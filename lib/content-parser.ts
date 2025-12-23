/**
 * Content Parser - Clean WordPress Shortcodes
 * Removes Divi Builder, Elementor, and other WordPress shortcodes
 */

/**
 * Remove WordPress backend URLs and replace with frontend URLs
 * Converts backend URLs (app.faditools.com, backend.seordp.net) to frontend URLs (seordp.net)
 */
function removeBackendUrls(content: string): string {
  if (!content) return '';

  let cleanedContent = content;

  // Replace WordPress backend domain URLs with frontend domain
  // Pattern: https://app.faditools.com/... or https://backend.seordp.net/...
  cleanedContent = cleanedContent.replace(
    /https?:\/\/(?:app\.faditools\.com|backend\.seordp\.net)(\/[^\s"']*)/gi,
    (match, path) => {
      // Extract slug from path (remove /page/, /post/, /product/ prefixes if any)
      const cleanPath = path.replace(/^\/(?:pages?|posts?|products?)\//, '/');
      return `https://seordp.net${cleanPath}`;
    }
  );

  // Replace any WordPress permalink URLs in content
  cleanedContent = cleanedContent.replace(
    /href=["']https?:\/\/(?:app\.faditools\.com|backend\.seordp\.net)([^"']+)["']/gi,
    (match, path) => {
      const cleanPath = path.replace(/^\/(?:pages?|posts?|products?)\//, '/');
      return `href="https://seordp.net${cleanPath}"`;
    }
  );

  return cleanedContent;
}

/**
 * Fix broken internal links by removing incorrect /pages/ prefix
 * Maps broken WordPress links to correct Next.js routes
 */
function fixBrokenLinks(content: string): string {
  if (!content) return '';

  let fixedContent = content;

  // Map of broken links to correct URLs
  const linkMappings: Record<string, string> = {
    '/pages/single-tools-list': '/single-tools-list',
    '/pages/contact-us': '/contact-us',
    '/pages/list-seo-tools-combo-package': '/list-seo-tools-combo-package',
    '/pages/combo-seo-tools-standard-plan': '/combo-seo-tools-standard-plan',
  };

  // Fix each broken link in all possible formats
  Object.entries(linkMappings).forEach(([broken, correct]) => {
    // Escape special regex characters in the broken path
    const escapedBroken = broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Pattern 1: href="/pages/..." or href='/pages/...'
    fixedContent = fixedContent.replace(
      new RegExp(`(href=["'])${escapedBroken}([#"']?[^"']*)(["'])`, 'gi'),
      (match, prefix, extra, suffix) => {
        return `${prefix}${correct}${extra}${suffix}`;
      }
    );
    
    // Pattern 2: Full URL with domain https://seordp.net/pages/...
    fixedContent = fixedContent.replace(
      new RegExp(`(https?://seordp\\.net)${escapedBroken}([#"']?[^"']*)`, 'gi'),
      (match, domain, extra) => {
        return `${domain}${correct}${extra}`;
      }
    );
    
    // Pattern 3: href="https://seordp.net/pages/..."
    fixedContent = fixedContent.replace(
      new RegExp(`(href=["']https?://seordp\\.net)${escapedBroken}([#"']?[^"']*)(["'])`, 'gi'),
      (match, prefix, extra, suffix) => {
        return `${prefix}${correct}${extra}${suffix}`;
      }
    );
  });

  // Generic fix: Remove /pages/ prefix from other internal links that shouldn't have it
  // This catches any other /pages/ prefixed links that aren't in our specific mapping
  fixedContent = fixedContent.replace(
    /(href=["'])(?:https?:\/\/seordp\.net)?\/pages\/([^"'\s#]+)([#"']?[^"']*)(["'])/gi,
    (match, prefix, slug, extra, suffix) => {
      // Skip if it's the actual /pages listing page (empty slug)
      if (!slug || slug.trim() === '') {
        return match;
      }
      
      // Check if this is one of the specific broken links we already fixed
      const fullPath = `/pages/${slug}`;
      if (linkMappings[fullPath]) {
        // Should have been fixed already, but just in case
        return `${prefix}${linkMappings[fullPath]}${extra}${suffix}`;
      }
      
      // For other /pages/ prefixed links, remove the prefix
      // WordPress pages are accessed via /[slug] route, not /pages/[slug]
      return `${prefix}/${slug}${extra}${suffix}`;
    }
  );

  return fixedContent;
}

export function removeShortcodes(content: string): string {
  if (!content) return '';

  let cleanContent = content;

  // Remove Divi Builder shortcodes [et_pb_*]
  cleanContent = cleanContent.replace(/\[et_pb_[^\]]*\]/g, '');
  cleanContent = cleanContent.replace(/\[\/et_pb_[^\]]*\]/g, '');

  // Remove Elementor shortcodes [elementor-*]
  cleanContent = cleanContent.replace(/\[elementor-[^\]]*\]/g, '');
  cleanContent = cleanContent.replace(/\[\/elementor-[^\]]*\]/g, '');

  // Remove WPBakery/Visual Composer shortcodes [vc_*]
  cleanContent = cleanContent.replace(/\[vc_[^\]]*\]/g, '');
  cleanContent = cleanContent.replace(/\[\/vc_[^\]]*\]/g, '');

  // Remove general WordPress shortcodes pattern [shortcode params="value"]
  cleanContent = cleanContent.replace(/\[[a-z_\-]+[^\]]*\]/gi, '');
  cleanContent = cleanContent.replace(/\[\/[a-z_\-]+\]/gi, '');

  // Remove extra whitespace and empty paragraphs
  cleanContent = cleanContent.replace(/<p>\s*<\/p>/g, '');
  cleanContent = cleanContent.replace(/\n\s*\n/g, '\n');
  cleanContent = cleanContent.trim();

  return cleanContent;
}

export function cleanWordPressContent(content: string): string {
  if (!content) return '';

  let cleanContent = removeShortcodes(content);

  // Remove WordPress backend URLs first (convert to frontend URLs)
  cleanContent = removeBackendUrls(cleanContent);

  // Fix broken internal links (remove /pages/ prefix)
  cleanContent = fixBrokenLinks(cleanContent);

  // Remove WordPress specific attributes that might leak through
  cleanContent = cleanContent.replace(/data-[a-z\-]+=["'][^"']*["']/gi, '');
  cleanContent = cleanContent.replace(/class=["']et-[^"']*["']/gi, '');
  cleanContent = cleanContent.replace(/class=["']vc-[^"']*["']/gi, '');

  return cleanContent;
}

export function extractPlainText(html: string): string {
  if (!html) return '';
  
  // Remove all HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Remove shortcodes
  text = removeShortcodes(text);
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Heading Item Interface for Table of Contents
 */
export interface HeadingItem {
  level: number; // 1-6 for H1-H6
  text: string;
  id: string;
}

/**
 * Generate a slug from text for use as an ID
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Extract headings from HTML content
 * Returns array of heading items with level, text, and id
 */
export function extractHeadings(content: string): HeadingItem[] {
  if (!content) return [];

  const headings: HeadingItem[] = [];
  // More flexible regex that handles various HTML formats
  // Using [\s\S] instead of . with 's' flag for ES5 compatibility
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  const usedIds = new Set<string>();

  let match;
  // Reset regex lastIndex to avoid issues with multiple calls
  headingRegex.lastIndex = 0;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10);
    let text = match[2];
    
    // Remove all HTML tags and decode entities
    text = text.replace(/<[^>]*>/g, '');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.trim();
    
    if (text && text.length > 0) {
      let id = slugify(text);
      
      // Ensure unique IDs
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);

      headings.push({
        level,
        text,
        id: uniqueId,
      });
    }
  }

  return headings;
}

/**
 * Add anchor IDs to all headings in HTML content
 * This enables smooth scrolling to sections via Table of Contents
 */
export function addHeadingIds(content: string): string {
  if (!content) return '';

  let processedContent = content;
  const headingRegex = /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/gi;
  const usedIds = new Set<string>();

  processedContent = processedContent.replace(headingRegex, (match, level, attributes, text) => {
    // Check if ID already exists
    const existingIdMatch = attributes.match(/id=["']([^"']+)["']/i);
    if (existingIdMatch) {
      return match; // Keep existing ID
    }

    // Extract text and create slug
    const textContent = text.replace(/<[^>]*>/g, '').trim();
    if (!textContent) return match;

    let id = slugify(textContent);
    
    // Ensure unique IDs
    let uniqueId = id;
    let counter = 1;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);

    // Add ID attribute
    const newAttributes = attributes.trim() 
      ? `${attributes} id="${uniqueId}"`
      : `id="${uniqueId}"`;

    return `<h${level} ${newAttributes}>${text}</h${level}>`;
  });

  return processedContent;
}

/**
 * Remove first heading (H1-H3) from content to avoid duplicate titles
 */
export function removeFirstHeading(content: string): string {
  if (!content) return '';

  // Match first H1, H2, or H3 heading
  const firstHeadingRegex = /<h[1-3][^>]*>.*?<\/h[1-3]>/i;
  return content.replace(firstHeadingRegex, '');
}

