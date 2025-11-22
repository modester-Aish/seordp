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
  const commonWords = ['pro', 'premium', 'plus', 'group', 'buy', 'access', 'tool', 'tools', 'service', 'services', 'plan', 'subscription', 'subscriptions'];
  const normalized = normalizeForMatching(str);
  
  // Split by common separators and filter
  const words = normalized
    .split(/[\s\-_]+/)
    .filter(word => word.length >= 2 && !commonWords.includes(word));
  
  return words;
}

/**
 * Match tool with product by name/slug
 */
export function matchToolToProduct(
  tool: Tool,
  products: WooCommerceProduct[]
): WooCommerceProduct | null {
  if (!products || products.length === 0) return null;

  const toolNameNormalized = normalizeForMatching(tool.name);
  const toolSlugNormalized = normalizeForMatching(tool.slug);

  // Try to find a match
  for (const product of products) {
    const productNameNormalized = normalizeForMatching(product.name);
    const productSlugNormalized = normalizeForMatching(product.slug);

    // Exact slug match
    if (toolSlugNormalized === productSlugNormalized) {
      return product;
    }

    // Exact name match
    if (toolNameNormalized === productNameNormalized) {
      return product;
    }

    // Partial slug match (tool slug contains product slug or vice versa)
    if (
      toolSlugNormalized.includes(productSlugNormalized) ||
      productSlugNormalized.includes(toolSlugNormalized)
    ) {
      // Additional check: ensure they're actually related (not just random substring)
      const minLength = Math.min(toolSlugNormalized.length, productSlugNormalized.length);
      if (minLength >= 3) {
        return product;
      }
    }

    // Partial name match (for cases like "AHREF$" matching "Ahrefs")
    if (
      toolNameNormalized.includes(productNameNormalized) ||
      productNameNormalized.includes(toolNameNormalized)
    ) {
      const minLength = Math.min(toolNameNormalized.length, productNameNormalized.length);
      if (minLength >= 4) {
        // Additional check: check if key parts match
        const toolKeywords = toolNameNormalized.split(/\s+/).filter(w => w.length >= 3);
        const productKeywords = productNameNormalized.split(/\s+/).filter(w => w.length >= 3);
        
        if (toolKeywords.some(kw => productKeywords.includes(kw))) {
          return product;
        }
      }
    }
    
    // Keyword-based matching - extract meaningful keywords and match
    const toolKeywords = extractKeywords(tool.name + ' ' + tool.slug);
    const productKeywords = extractKeywords(product.name + ' ' + product.slug);
    
    // Check if any tool keyword matches any product keyword
    if (toolKeywords.length > 0 && productKeywords.length > 0) {
      const matchingKeywords = toolKeywords.filter(kw => 
        productKeywords.some(pkw => 
          kw === pkw || 
          kw.includes(pkw) || 
          pkw.includes(kw)
        )
      );
      
      // If we have at least one matching keyword (and it's meaningful - at least 3 chars)
      if (matchingKeywords.length > 0 && matchingKeywords.some(kw => kw.length >= 3)) {
        return product;
      }
    }
    
    // Also check if normalized tool name/slug contains product keywords or vice versa
    for (const toolKw of toolKeywords) {
      if (toolKw.length >= 3) {
        for (const productKw of productKeywords) {
          if (productKw.length >= 3) {
            // Direct keyword match
            if (toolKw === productKw) {
              return product;
            }
            // Keyword contained in other
            if (toolKw.includes(productKw) || productKw.includes(toolKw)) {
              // Ensure minimum length to avoid false positives
              const minKwLength = Math.min(toolKw.length, productKw.length);
              if (minKwLength >= 3) {
                return product;
              }
            }
          }
        }
      }
    }
  }

  return null;
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

