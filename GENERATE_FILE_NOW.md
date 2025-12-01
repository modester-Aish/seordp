# Product Links File Generate Karne Ka Tarika

## Method 1: Browser Se (Sabse Aasan) ✅

1. **Server check karo** - agar nahi chal raha to:
   ```bash
   npm run dev
   ```

2. **Browser mein yeh URL open karo:**
   ```
   http://localhost:3000/api/generate-product-links
   ```

3. **File automatically generate ho jayegi:**
   - Location: `lib/all-product-links-data.ts`
   - Har product ka link ek-ek karke likha hoga
   - Total count bhi dikhega

## Method 2: Script Se (Terminal Se)

```bash
npx tsx scripts/generate-product-links-file.ts
```

## File Mein Kya Hoga:

```typescript
// 1. Product Name
{
  slug: 'product-slug',
  name: 'Product Name',
  id: 123,
  price: '$10.00',
  permalink: '/product-slug',
  categories: [...],
},

// 2. Another Product
{
  slug: 'another-product',
  ...
},
```

## Important:

- ✅ Har product ka link alag-alag hoga
- ✅ Har product numbered hoga (1, 2, 3...)
- ✅ File automatically generate hogi
- ✅ Total count bhi milega

**Ab browser mein URL open karo aur file generate ho jayegi! 🚀**

