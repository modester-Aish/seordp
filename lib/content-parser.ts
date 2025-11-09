/**
 * Content Parser - Clean WordPress Shortcodes
 * Removes Divi Builder, Elementor, and other WordPress shortcodes
 */

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

