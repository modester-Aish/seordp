/**
 * Tool-Product Matcher
 * Matches static tools with WooCommerce products by name/slug
 */

import { getAllTools, Tool } from './tools-data';
import { WooCommerceProduct } from '@/types/wordpress';

/**
 * Normalize a string for matching (lowercase, remove special chars)
 */
function normalizeForMatching(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\$/g, 's') // Replace $ with s (e.g., AHREF$ -> ahrefs)
    .trim();
}

/**
 * Extract keywords from a string (remove common words, keep meaningful terms)
 */
function extractKeywords(str: string): string[] {
  const commonWords = ['pro', 'premium', 'plus', 'group', 'buy', 'access', 'tool', 'tools', 'service', 'services', 'plan', 'subscription', 'subscriptions', 'combo', 'package', 'pack', 'private'];
  const normalized = normalizeForMatching(str);
  
  // Split by common separators and filter - more aggressive matching
  const words = normalized
    .split(/[\s\-_]+/)
    .filter(word => word.length >= 2 && !commonWords.includes(word));
  
  return words;
}

/**
 * More aggressive matching - check if ANY meaningful keyword matches
 * Very lenient - ANY keyword match will trigger (as requested)
 */
function hasMatchingKeyword(toolKeywords: string[], productKeywords: string[]): boolean {
  if (toolKeywords.length === 0 || productKeywords.length === 0) return false;
  
  // Check for any keyword match (even partial) - VERY AGGRESSIVE
  for (const toolKw of toolKeywords) {
    if (toolKw.length < 2) continue; // Only skip single character keywords
    
    for (const productKw of productKeywords) {
      if (productKw.length < 2) continue;
      
      // Direct match (any length)
      if (toolKw === productKw) return true;
      
      // Partial match - if one contains the other (VERY aggressive)
      if (toolKw.includes(productKw) || productKw.includes(toolKw)) {
        // Very lenient - minimum 2 chars
        const minLength = Math.min(toolKw.length, productKw.length);
        if (minLength >= 2) {
          return true;
        }
      }
      
      // Check for similar keywords (e.g., semrush vs semrushgroupbuy)
      if (toolKw.substring(0, 3) === productKw.substring(0, 3) && toolKw.length >= 3 && productKw.length >= 3) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Match tool with product by name/slug - Find BEST match, not first match
 * Returns the best matching product based on priority:
 * 1. Exact matches (highest priority)
 * 2. Best partial matches (shortest slug = better)
 */
export function matchToolToProduct(
  tool: Tool,
  products: WooCommerceProduct[]
): WooCommerceProduct | null {
  if (!products || products.length === 0) return null;

  const toolNameNormalized = normalizeForMatching(tool.name);
  const toolSlugNormalized = normalizeForMatching(tool.slug);

  let bestMatch: WooCommerceProduct | null = null;
  let bestMatchScore = 0;

  // Check all products and find the BEST match
  for (const product of products) {
    if (product.status !== 'publish') continue;
    
    const productNameNormalized = normalizeForMatching(product.name);
    const productSlugNormalized = normalizeForMatching(product.slug);
    let matchScore = 0;

    // 1. Exact slug match (HIGHEST PRIORITY - Score: 100)
    if (toolSlugNormalized === productSlugNormalized) {
      return product; // Return immediately for exact match
    }

    // 2. Exact name match (HIGHEST PRIORITY - Score: 95)
    if (toolNameNormalized === productNameNormalized) {
      return product; // Return immediately for exact match
    }

    // 3. Tool slug matches product slug (Score: 80-90)
    // Check if product slug starts with tool slug + "group-buy" (PREFERRED PATTERN)
    if (productSlugNormalized.startsWith(toolSlugNormalized) && 
        productSlugNormalized.includes('group') && 
        productSlugNormalized.includes('buy')) {
      // Prefer shorter slugs (e.g., moz-group-buy over moz-pro-group-buy)
      const extraLength = productSlugNormalized.length - toolSlugNormalized.length;
      // Score decreases if extra length is too much (prefer shorter)
      matchScore = extraLength <= 12 ? 90 : (extraLength <= 18 ? 85 : 80);
    }
    // Check if product slug starts with tool slug (Score: 70)
    else if (productSlugNormalized.startsWith(toolSlugNormalized) && 
             productSlugNormalized.length <= toolSlugNormalized.length + 15) {
      matchScore = 70;
    }
    // Tool slug contains product slug or vice versa (Score: 60)
    else if (productSlugNormalized.includes(toolSlugNormalized) || 
             toolSlugNormalized.includes(productSlugNormalized)) {
      const minLength = Math.min(toolSlugNormalized.length, productSlugNormalized.length);
      if (minLength >= 3) {
        matchScore = 60;
      }
    }

    // 4. Name matching (Score: 50)
    if (productNameNormalized.includes(toolNameNormalized) || 
        toolNameNormalized.includes(productNameNormalized)) {
      const minLength = Math.min(toolNameNormalized.length, productNameNormalized.length);
      if (minLength >= 3 && matchScore < 50) {
        matchScore = 50;
      }
    }

    // 5. Keyword matching (Score: 40)
    const toolKeywords = extractKeywords(tool.name + ' ' + tool.slug);
    const productKeywords = extractKeywords(product.name + ' ' + product.slug);
    if (hasMatchingKeyword(toolKeywords, productKeywords) && matchScore < 40) {
      matchScore = 40;
    }

    // Update best match if this is better
    if (matchScore > bestMatchScore) {
      bestMatchScore = matchScore;
      bestMatch = product;
    }
    // If same score, prefer shorter slug (e.g., moz-group-buy over moz-pro-group-buy)
    else if (matchScore === bestMatchScore && matchScore > 0 && bestMatch) {
      if (product.slug.length < bestMatch.slug.length) {
        bestMatch = product;
      }
    }
  }

  // Only return if we found a good match (score >= 40)
  return bestMatchScore >= 40 ? bestMatch : null;
}

/**
 * Get product slug for a tool if it has a matching product
 */
export function getToolProductSlug(
  tool: Tool,
  products: WooCommerceProduct[]
): string | null {
  const matchedProduct = matchToolToProduct(tool, products);
  return matchedProduct ? matchedProduct.slug : null;
}

/**
 * Get list of tools that have matching products
 * These tools should link to product pages instead of tool detail pages
 */
export function getToolsWithProducts(
  tools: Tool[],
  products: WooCommerceProduct[]
): Map<string, string> {
  const map = new Map<string, string>();
  
  for (const tool of tools) {
    const productSlug = getToolProductSlug(tool, products);
    if (productSlug) {
      map.set(tool.id, productSlug);
    }
  }
  
  return map;
}

