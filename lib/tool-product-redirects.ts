/**
 * Static Tool-to-Product Redirect Mapping
 * Auto-generated from all-product-links-data.ts (jo frontend par show hote hain)
 * 
 * Generated at: 2025-12-23T15:31:04.191Z
 * Total Tools Matched: 22
 * Total Products: 116
 * 
 * This provides instant redirects without API calls for known tool->product matches
 */

export interface ToolProductRedirect {
  toolSlug: string;
  productSlug: string;
}

/**
 * Known tool-to-product redirect mappings
 * Auto-generated - matches tools with actual product slugs from frontend
 */
export const TOOL_PRODUCT_REDIRECTS: Record<string, string> = {
  // SEO Tools
  'ahrefs': 'ahrefs-group-buy',
  'semrush': 'semrush-group-buy',
  'moz': 'moz-group-buy',
  'spyfu': 'spyfu-group-buy',
  'majestic': 'majestic-group-buy',

  // Design Tools
  'canva': 'canva-group-buy',
  'freepik': 'freepik-group-buy',
  'envato-elements': 'envato-elements-group-buy',
  'adobe-creative': 'adobe-group-buy',

  // AI Tools
  'chatgpt-plus': 'chatgpt-group-buy',
  'claude': 'claude-ai-group-buy',
  'jasper-ai': 'jasper-group-buy',

  // Entertainment
  'netflix': 'netflix-group-buy',
  'prime-video': 'prime-video-group-buy',

  // Writing Tools
  'grammarly': 'grammarly-group-buy',
  'quillbot': 'quillbot-group-buy',
  'copy-ai': 'copyscape-group-buy',

  // Content Marketing
  'buzzsumo': 'buzzsumo-group-buy',

  // E-commerce
  'helium10': 'helium10-group-buy',

  // Media
  'storyblocks': 'storyblocks-group-buy',

  // Video Editing
  'capcut-pro': 'capcut-pro-group-buy',
  'invideo': 'invideo-ai-group-buy',
};

/**
 * Check if a tool slug should redirect to a product slug
 */
export function getToolProductRedirect(toolSlug: string): string | null {
  return TOOL_PRODUCT_REDIRECTS[toolSlug] || null;
}

/**
 * Get all known tool slugs that redirect to products
 */
export function getAllRedirectToolSlugs(): string[] {
  return Object.keys(TOOL_PRODUCT_REDIRECTS);
}
