# Frontend Product Links Generate Karein

## Important:
Yeh API route **sirf wo products** fetch karega jo **actually frontend par show hote hain** (jaise `/products` page par dikhte hain).

Backend ke saare products nahi - sirf wo jo website par visible hain!

## Steps:

1. **Browser mein yeh URL open karo:**
   ```
   http://localhost:3000/api/generate-product-links
   ```

2. **File generate ho jayegi:**
   - Location: `lib/all-product-links-data.ts`
   - Sirf wo products ke links jo frontend par show hote hain
   - Har product ka link ek-ek karke likha hoga

## Kya Filter Hota Hai:

- ✅ Published products only (`status === 'publish'`)
- ✅ Duplicates excluded (jo `isExcludedDuplicate()` se filter hote hain)
- ✅ Same products jo `/products` page par show hote hain

## Result:

File mein sirf wo product links honge jo:
- Website par actually show hote hain
- `/products` page par visible hain
- Frontend par render hote hain

**Backend ke hidden/draft products include nahi honge! ✅**

