# 🚀 Website Setup Kaise Karen - Step by Step

## ✅ Checklist - Shuru Karne Se Pehle

- [ ] Node.js 18+ installed hai
- [ ] WordPress website ready hai
- [ ] WooCommerce plugin install hai
- [ ] Internet connection hai

---

## 📝 STEP 1: Environment Variables Setup

### Pehle ye karen:

1. **WordPress Admin** mein jao
2. **WooCommerce → Settings → Advanced → REST API** pe click karo
3. **"Add Key"** button dabao
4. **Description** mein likho: "Next.js Website"
5. **Permissions** mein select karo: **"Read"**
6. **"Generate API Key"** dabao
7. **Consumer Key** aur **Consumer Secret** copy kar lo

### Ab ye file banao:

Project ke root folder mein **`.env.local`** naam ki file banao aur ye paste karo:

```env
WORDPRESS_BASE_URL=https://app.faditools.com
WC_CONSUMER_KEY=ck_your_key_here
WC_CONSUMER_SECRET=cs_your_secret_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ Important:** 
- `WORDPRESS_BASE_URL` mein apni WordPress site ka URL dalo
- `WC_CONSUMER_KEY` mein wo key paste karo jo copy ki thi
- `WC_CONSUMER_SECRET` mein wo secret paste karo jo copy kiya tha

---

## 🏃 STEP 2: Website Chalao

Terminal mein ye command run karo:

```bash
npm run dev
```

Phir browser mein ye link kholo:
```
http://localhost:3000
```

---

## ✨ STEP 3: Test Karo

### Ye check karo:

1. **Homepage** load ho raha hai?
2. **Blog** page pe click karo - WordPress posts dikh rahe hain?
3. **Products** page pe click karo - WooCommerce products dikh rahe hain?

---

## 🐛 Agar Problem Aaye

### ❌ "Cannot connect to WordPress API"

**Solution:**
1. `.env.local` file check karo - sahi hai?
2. WordPress Admin → Settings → Permalinks
3. "Post name" select karo aur Save karo
4. Browser mein test karo: `https://your-site.com/wp-json/wp/v2/posts`

### ❌ "WooCommerce products nahi aa rahe"

**Solution:**
1. WooCommerce plugin active hai?
2. API keys dobara check karo
3. Permissions "Read" pe set hain?

### ❌ "Images load nahi ho rahi"

**Solution:**
1. `next.config.js` file kholo
2. `images` section mein apni WordPress site ka domain add karo:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-wordpress-site.com', // Ye badlo
      pathname: '/**',
    },
  ],
},
```

---

## 🎨 Customization

### Colors Change Karne Ke Liye:

**Option 1: Tailwind Config**
`tailwind.config.ts` file kholo aur colors change karo

**Option 2: Direct Classes**
Components mein directly classes change karo:
- `bg-blue-600` → `bg-purple-600`
- `text-blue-600` → `text-green-600`

### Branding Change Karne Ke Liye:

1. **Header & Footer:** `components/Header.tsx` aur `Footer.tsx`
2. **Homepage:** `app/page.tsx`
3. **Site Title:** `app/layout.tsx`

---

## 🚀 Production Build

### Build banane ke liye:

```bash
npm run build
```

### Production server start karne ke liye:

```bash
npm start
```

---

## 🌐 Deploy Kaise Karen (Vercel pe)

### STEP 1: GitHub pe Push

```bash
git add .
git commit -m "Website ready"
git push origin main
```

### STEP 2: Vercel pe Deploy

1. [vercel.com](https://vercel.com) pe jao
2. "New Project" click karo
3. GitHub repository select karo
4. Environment Variables add karo:
   - `WORDPRESS_BASE_URL`
   - `WC_CONSUMER_KEY`
   - `WC_CONSUMER_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
5. "Deploy" dabao!

---

## 📱 Features

✅ Homepage with hero section  
✅ Blog listing page  
✅ Individual blog posts  
✅ Products listing page  
✅ Individual product pages  
✅ WordPress pages support  
✅ Responsive design  
✅ SEO optimized  
✅ Fast loading  

---

## 🎓 Aur Madad Chahiye?

1. `README.md` file padho (English mein)
2. Browser console check karo (F12 dabao)
3. `.env.local` file dobara verify karo
4. WordPress API direct test karo browser mein

---

## 🎉 All Done!

Congratulations! Aapki website ready hai! 🎊

Ab aap:
- Colors customize kar sakte ho
- Content add kar sakte ho
- Apni branding laga sakte ho
- Deploy kar sakte ho

**Happy Coding! 🚀**

---

**Made with ❤️ by SEORDP Team**

