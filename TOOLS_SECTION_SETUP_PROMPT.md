# Tools Section Setup - Complete Prompt

## Overview
Homepage pe "50+ Premium SEO Tools & Services" section mein static tools add kiye gaye hain jo clickable cards hain aur unke detail pages bhi banaye gaye hain. Yeh tools WooCommerce products se alag hain - yeh static data se aate hain.

## Key Components Created/Modified

### 1. Static Tools Data (`lib/tools-data.ts`)
- **Purpose:** Homepage aur detail pages ke liye tools ki static data store karta hai
- **Interface:** `Tool` interface with fields:
  - `id`: Unique identifier
  - `name`: Tool name (e.g., "AHREF$", "SEMRU$H")
  - `price`: Current price (e.g., "$30.00")
  - `originalPrice`: Original price (e.g., "$99.00")
  - `image`: Image path/URL
  - `description`: Tool description
  - `slug`: URL slug (e.g., "ahrefs", "semrush")
  - `features`: Array of key features
  - `category`: Tool category (e.g., "SEO Tools")
  - `productId`: Cart product ID for Buy Now link

- **Functions:**
  - `getAllTools()`: Sabhi tools return karta hai
  - `getToolBySlug(slug)`: Slug se tool find karta hai
  - `getToolById(id)`: ID se tool find karta hai

### 2. Tool Detail Client Component (`components/ToolDetailClient.tsx`)
- **Purpose:** Individual tool ka detail page render karta hai
- **Design:** ProductDetailClient jaisa hi layout
- **Features:**
  - Tool image with sale badge
  - Price comparison (original vs current)
  - Savings calculation
  - Key features list
  - Quantity selector
  - Buy Now button (dynamic link with productId)
  - Stock status
  - Additional info (instant activation, secure payment, etc.)
  - Stats (users, uptime, support)
  - **Related tools section REMOVED** (as per requirement)

- **Buy Now Link Logic:**
  ```typescript
  href={tool.productId 
    ? `https://members.seotoolsgroupbuy.us/cart/index/product/id/${tool.productId}/c/?` 
    : 'https://members.seotoolsgroupbuy.us/signup'}
  ```

### 3. Homepage Tools Section (`components/AnimatedSections.tsx`)
- **Section:** "50+ Premium SEO Tools & Services"
- **Implementation:**
  - Static tools data `getAllTools()` se fetch hoti hai
  - Each tool card fully clickable hai
  - Links directly to `/{tool.slug}` (NO `/tools/` prefix)
  - Example: `/ahrefs` instead of `/tools/ahrefs`
  - Button text changed to "View Details" (whole card clickable)

- **Card Structure:**
  ```tsx
  <Link href={`/${toolSlug}`} className="...full card clickable...">
    {/* Tool image */}
    {/* Tool name */}
    {/* Price */}
    {/* Description */}
    {/* View Details button (pointer-events-none) */}
  </Link>
  ```

### 4. Dynamic Routing (`app/[slug]/page.tsx`)
- **Routing Priority:**
  1. **Static Tool** - `getToolBySlug(slug)` se check karta hai (HIGHEST PRIORITY)
  2. WooCommerce Product - `fetchProductBySlug(slug)` se check karta hai
  3. WordPress Post - `fetchPostBySlug(slug)` se check karta hai
  4. WordPress Page - `fetchPageBySlug(slug)` se check karta hai
  5. Not Found - agar kuch match nahi ho to 404

- **Implementation:**
  ```typescript
  export default async function UnifiedPage({ params }: PageProps) {
    const { slug } = params;

    // Try static tool FIRST
    const tool = getToolBySlug(slug);
    if (tool) {
      return <ToolDetailClient tool={tool} />;
    }

    // Then try product, post, page...
  }
  ```

### 5. Product IDs Mapping (`lib/product-ids.ts`)
- **Purpose:** Product/Tool names ko cart product IDs se map karta hai
- **Mapping:** `productIds` object mein name → ID mapping
  - Example: `'ahrefs': 53`, `'semrush': 8`
- **Functions:**
  - `getProductId(name)`: Name se ID find karta hai (fuzzy matching)
  - `getBuyNowUrl(name, fallbackId)`: Buy Now URL generate karta hai
  - `normalizeProductName(name)`: Name ko normalize karta hai matching ke liye

### 6. Image Configuration (`next.config.js`)
- **Remote Patterns:** `img.icons8.com` ko allow kiya gaya hai tools ke images ke liye
  ```javascript
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'img.icons8.com',
      pathname: '/**',
    },
  ]
  ```

## URL Structure

### Tool Detail Pages
- **Format:** `/{tool-slug}`
- **Examples:**
  - `/ahrefs` → Ahrefs tool detail page
  - `/semrush` → SEMrush tool detail page
  - `/moz` → Moz Pro tool detail page

### No Prefix Required
- Tools detail pages directly root par hain
- `/tools/` prefix nahi hai (removed as per requirement)
- Direct slug se access hota hai

## Buy Now Button Logic

### For Static Tools
1. **Priority 1:** Agar `tool.productId` hai → Use cart link with ID
   - `https://members.seotoolsgroupbuy.us/cart/index/product/id/{productId}/c/?`
2. **Priority 2:** Agar `tool.productId` nahi hai → Use default signup URL
   - `https://members.seotoolsgroupbuy.us/signup`

### For WooCommerce Products
1. **Priority 1:** Agar `product.external_url` set hai → Use that
2. **Priority 2:** Name-based matching se ID find karo → Use cart link
3. **Priority 3:** Default signup URL

## Key Changes Made

### Removed Features
- ❌ Related tools section removed from tool detail pages (as requested)
- ❌ `/tools/` prefix removed from URLs

### Added Features
- ✅ Static tools data file (`lib/tools-data.ts`)
- ✅ Tool detail client component (`ToolDetailClient.tsx`)
- ✅ Homepage tools section with clickable cards
- ✅ Dynamic routing with tool priority
- ✅ Product ID mapping for Buy Now links
- ✅ Image host configuration for icons8.com

## Integration Points

### Homepage
- `components/AnimatedSections.tsx` → `PopularToolsSection` component
- Tools data `lib/tools-data.ts` se fetch hoti hai
- Cards link to `/{tool.slug}`

### Detail Pages
- `app/[slug]/page.tsx` → Unified routing
- Tool matching highest priority hai
- `ToolDetailClient` component render hota hai

### Buy Now Links
- Static tools: Direct `productId` use karte hain
- Products: Name-based matching se ID find karte hain
- Fallback: Default signup URL

## Testing Checklist

- [ ] Homepage tools section displays correctly
- [ ] Tool cards are fully clickable
- [ ] Tool detail pages load at `/{slug}`
- [ ] Buy Now buttons use correct cart links (with productId)
- [ ] Tools without productId use default signup URL
- [ ] No related tools section on detail pages
- [ ] Images load from icons8.com
- [ ] Routing priority works (tool > product > post > page)
- [ ] Hydration errors resolved

## Notes

- Tools static data se aate hain, WooCommerce se nahi
- Tool detail pages WooCommerce product pages se similar design hain
- Buy Now links dynamic hain based on productId
- All tools have proper productId mapping (from Google Sheet)
- Tools section se related tools section remove kar diya gaya hai


