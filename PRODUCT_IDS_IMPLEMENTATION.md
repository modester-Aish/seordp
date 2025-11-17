

### 1. **Slug Matching** (Highest Priority - Exact Match)
- Product ka slug check hota hai `slugToProductId` mapping file mein
- Example: `product.slug = "ahrefs"` → Direct match → Product ID: `53`
- URL: `https://members.seotoolsgroupbuy.us/cart/index/product/id/53/c/?`

### 2. **Name Matching** (Fuzzy Match)
- Agar slug se match nahi mila, to product name se keywords extract kiye jate hain
- Har keyword ko `productIds` mapping file se match kiya jata hai
- Example: `product.name = "Ahrefs Group Buy"` → "ahrefs" keyword match → Product ID: `53`

### 3. **Affiliate Link** (External URL - Fallback)
- Agar mapping mein nahi mila, to existing `product.external_url` use hota hai
- Agar WooCommerce mein external URL set hai, to wo use hota hai

### 4. **WooCommerce ID** (Fallback)
- Agar affiliate_link bhi nahi hai, to WooCommerce product ID se URL generate hota hai
- Example: `product.id = 123` → URL: `https://members.seotoolsgroupbuy.us/cart/index/product/id/123/c/?`

### 5. **Signup Page** (Final Fallback)
- Sab kuch fail ho jaye to general signup page par redirect
- URL: `https://members.seotoolsgroupbuy.us/signup`

---

## Implementation Details

### File Structure

```
my-website/
├── lib/
│   └── product-ids.ts          # Main mapping file with all functions
├── components/
│   ├── ProductDetailClient.tsx # Product detail page component
│   └── ProductCard.tsx         # Product card component
└── app/
    └── products/
        └── [slug]/
            └── page.tsx         # Product page route
```

### Key Functions

#### 1. `getProductIdBySlug(slug: string)`
- **Purpose:** Slug se direct product ID find karta hai
- **Returns:** `number | null`
- **Example:**
  ```typescript
  getProductIdBySlug('ahrefs') // Returns: 53
  getProductIdBySlug('semrush') // Returns: 8
  ```

#### 2. `getProductIdByName(productName: string)`
- **Purpose:** Product name se fuzzy matching karke ID find karta hai
- **Returns:** `number | null`
- **Example:**
  ```typescript
  getProductIdByName('Ahrefs Group Buy') // Returns: 53
  getProductIdByName('SEMrush Premium') // Returns: 8
  ```

#### 3. `getBuyNowUrl(productName, fallbackId, slug, externalUrl)`
- **Purpose:** Complete priority order follow karke final URL generate karta hai
- **Parameters:**
  - `productName: string` - Product name
  - `fallbackId?: number` - WooCommerce product ID (optional)
  - `slug?: string` - Product slug (optional, for priority 1)
  - `externalUrl?: string` - External URL (optional, for priority 3)
- **Returns:** `string` - Final Buy Now URL
- **Example:**
  ```typescript
  getBuyNowUrl(
    'Ahrefs Group Buy',
    123,              // WooCommerce ID
    'ahrefs',         // Slug
    'https://...'    // External URL
  )
  // Returns: https://members.seotoolsgroupbuy.us/cart/index/product/id/53/c/?
  ```

---

## Product IDs Mapping

### Complete List (150+ Products)

#### Plans
- Lite plan: 56
- Student plan: 51
- Basic plan: 30
- Small plan: 35, 162
- Standard plan: 12
- Ecom plan: 3
- VIP plan: 17
- Mega Pack: 2, 4
- Agency plans: 50, 15, 74, 149
- Team plan: 163

#### SEO Tools
- **Ahrefs:** 53, 7, 28, 40
- **SEMrush:** 8, 60, 20, 55
- **Moz:** 19
- **Others:** 9, 10, 87, 88, 89, 94, 96, 98, 99, 110, 111, 136, 137, 132, 83

#### E-commerce Tools
- Helium10: 36
- Jungle Scout: 33
- Ecomhunt: 34
- Viral Launch: 130
- Niche Scraper: 131
- AmzTrackers: 81
- SaleHoo: 90
- Sell the Trend: 93
- Exploding Topics: 92

#### AI Writing Tools
- Jasper AI: 48
- Quetext: 57
- Grammarly: 21
- Quillbot: 103
- Article Builder: 104
- Article Forge: 105
- Copymatic: 107
- SmartCopy: 115
- ClosersCopy: 116
- Copy AI: 117
- StealthWriter: 118
- Writerzen: 119
- Writesonic: 120
- Rytr: 121
- Jenni AI: 122
- WordAI: 77
- WordTune: 78
- WordHero: 79
- Spin Rewriter: 85
- WriteHuman: 147
- Hix AI: 114

#### ChatGPT & AI Tools
- ChatGPT Premium: 29
- ChatGPT Pro: 59
- Claude AI: 113
- You AI: 112
- Grok AI: 155
- Leonardo AI: 141
- Midjourney: 161
- Bypass GPT: 47
- Sider AI: 145

#### Design Tools
- Canva Pro: 65
- Adobe Creative Cloud: 64, 75
- Envato Elements: 18
- Freepik: 63
- Vecteezy: 123
- Designs AI: 124
- Picsart: 125
- Fotojet: 126
- Picmonkey: 133
- Icon Scout: 143

#### Video & Media Tools
- Videoblocks: 95
- Storyblocks: 24
- Epidemic Sound: 134
- Motionarray: 138
- InVideo: 127
- Renderforest: 142
- Prezi: 135
- Slidebean: 135
- CapCut: 157, 72
- Gamma: 160
- Elevenlabs: 166
- HeyGen AI: 151

#### Entertainment
- Netflix: 52, 16
- Prime Video: 109

#### Education & Learning
- Coursera: 91
- Skillshare: 97
- Udemy: 66
- LinkedIn Learning: 82
- Turnitin: 140, 154

#### Other Tools
- Surfer SEO: 108
- Unbounce: 61
- Buzzsumo: 41
- AdSpy: 58
- BigSpy: 158
- SpyHero: 159
- Keyword Revealer: 76
- Vyond: 80
- Frase.io: 84
- Indexification: 86
- Similarweb: 146
- GPL: 128
- Scribd: 144
- Google One: 156
- Premium VPN: 153
- Spamzilla: 31
- KeywordTool: 32
- Screaming Frog: 37, 73, 164

---

## Usage Examples

### Example 1: Product Detail Page

```typescript
// components/ProductDetailClient.tsx
<a
  href={getBuyNowUrl(
    product.name,           // "Ahrefs Group Buy"
    product.id,            // 123 (WooCommerce ID)
    product.slug,          // "ahrefs"
    product.external_url   // null or custom URL
  )}
  target="_blank"
  rel="noopener noreferrer"
>
  Buy Now
</a>
```

**Result:** 
- Priority 1: Slug "ahrefs" matches → Uses ID 53
- URL: `https://members.seotoolsgroupbuy.us/cart/index/product/id/53/c/?`

### Example 2: Product Card

```typescript
// components/ProductCard.tsx
<a
  href={getBuyNowUrl(
    product.name,
    product.id,
    product.slug,
    product.external_url
  )}
>
  Buy Now
</a>
```

**Result:**
- Same priority order applies
- Automatically finds correct ID

### Example 3: No Match Found

```typescript
// Product: "Random Tool XYZ"
// Slug: "random-tool-xyz"
// No mapping found

getBuyNowUrl('Random Tool XYZ', 999, 'random-tool-xyz', null)
// Priority 1: No slug match
// Priority 2: No name match
// Priority 3: No external URL
// Priority 4: Uses fallback ID 999
// Returns: https://members.seotoolsgroupbuy.us/cart/index/product/id/999/c/?
```

---

## How to Add New Products

### Step 1: Add to `productIds` Mapping

```typescript
// lib/product-ids.ts
export const productIds: Record<string, number> = {
  // ... existing products
  'new product name': 200,  // Add new product
  'new product': 200,       // Add variations
};
```

### Step 2: Add to `slugToProductId` Mapping

```typescript
// lib/product-ids.ts
export const slugToProductId: Record<string, number> = {
  // ... existing slugs
  'new-product': 200,      // Add slug
  'newproduct': 200,       // Add without hyphens
};
```

### Step 3: Test

```typescript
// Test slug matching
getProductIdBySlug('new-product') // Should return 200

// Test name matching
getProductIdByName('New Product Tool') // Should return 200

// Test full URL
getBuyNowUrl('New Product Tool', 999, 'new-product', null)
// Should return: https://members.seotoolsgroupbuy.us/cart/index/product/id/200/c/?
```

---

## Testing Checklist

- [x] Slug matching works for all products
- [x] Name matching works with fuzzy logic
- [x] External URL fallback works
- [x] WooCommerce ID fallback works
- [x] Signup page fallback works
- [x] All components updated (ProductDetailClient, ProductCard, products/[slug]/page.tsx)
- [x] No linter errors
- [x] Backward compatibility maintained

---

## Benefits

1. **Automatic Matching** - Product names se automatically correct IDs match ho jati hain
2. **Flexible** - Different product names bhi match ho sakte hain
3. **Priority System** - Best match always use hota hai
4. **Fallback System** - Agar match nahi mila, to bhi URL available rahega
5. **Reusable** - Same functions kisi bhi component mein use kar sakte hain
6. **Maintainable** - Centralized mapping file se easy updates

---

## Notes

- **150+ products** already mapped
- **Slug matching** highest priority (most accurate)
- **Name matching** uses fuzzy logic for flexibility
- **All components** automatically use new priority system
- **Backward compatible** - old code still works

---

## Debugging Guide

### Automatic Debugging (Development Mode)

Development mode mein (`npm run dev`), console logging automatically enable hoti hai. Production mein logs nahi aayenge.

### Step 1: Browser Console Open Karein

1. Product detail page par jayein
2. F12 press karein (Developer Tools)
3. Console tab select karein

### Step 2: "Buy Now" Button Click Karein

4. "Buy Now" button click karein
5. Console mein yeh logs dikhne chahiye:

```
🔍 Buy Now URL Generation: {
  productName: "Ahrefs Group Buy",
  slug: "ahrefs-group-buy",
  fallbackId: 7611,
  externalUrl: undefined
}

🔍 Slug Matching: {
  original: "ahrefs-group-buy",
  normalized: "ahrefs-group-buy"
}

✅ Slug match (suffix removed): ahrefs → 53

✅ Using slug match URL: https://members.seotoolsgroupbuy.us/cart/index/product/id/53/c/?
```

### Step 3: Check Results

**Success Cases:**
- `✅ Direct slug match found` → Perfect match
- `✅ Slug match (suffix removed)` → Suffix removal se match mila
- `✅ Keyword match found` → Name matching se match mila
- `✅ Using slug match URL` → Final URL generated

**Failure Cases:**
- `❌ No slug match found` → Slug matching fail
- `❌ No name match found` → Name matching fail
- `⚠️ Using fallback WooCommerce ID URL` → Fallback use ho raha hai
- `⚠️ Using default signup URL` → Koi match nahi mila

### Manual Debugging

Agar manually debug karna ho, to function call mein `debug: true` pass karein:

```typescript
// In component
const url = getBuyNowUrl(
  product.name,
  product.id,
  product.slug,
  product.external_url,
  true // Enable debug logging
);
```

### Matching Improvements

**New Features Added:**

1. **Suffix Removal** - Common suffixes automatically remove ho jate hain:
   - `-group-buy`, `-groupbuy`, `-premium`, `-pro`, `-tool`, `-tools`, `-subscription`, `-plan`
   - Example: `"ahrefs-group-buy"` → `"ahrefs"` → Match found!

2. **Keyword Extraction** - Product names se important keywords extract hote hain:
   - Common words remove: `group`, `buy`, `premium`, `tool`, etc.
   - Example: `"Jasper AI Group Buy"` → Keywords: `["jasper", "ai"]` → Match found!

3. **Console Logging** - Development mode mein automatic debugging:
   - Slug matching process
   - Name matching process
   - Keyword extraction
   - Final URL generation

4. **Better Fuzzy Matching**:
   - Word-by-word matching (60% threshold)
   - Partial string matching
   - Multiple keyword matching

**Expected Matching Rate:**

- **Before:** ~25% (158/624 products)
- **After Improvements:** ~60-70% (375-437/624 products)
- **Remaining:** ~30-40% products jo manual mapping chahiye

---

## Support

Agar koi product match nahi ho raha:
1. Browser console check karein (F12 → Console)
2. Debug logs dekhein - kya matching fail ho rahi hai?
3. Check `lib/product-ids.ts` mein product name/slug add karo
4. Test karo `getProductIdBySlug()` ya `getProductIdByName()` se
5. Agar issue ho to fallback system automatically signup page par redirect karega

