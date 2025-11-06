# ⚡ Quick Start - Get Your Website Running in 5 Minutes

## 🎯 What You Need

1. ✅ WordPress website URL
2. ✅ WooCommerce Consumer Key
3. ✅ WooCommerce Consumer Secret

---

## 🚀 3 Simple Steps

### STEP 1: Get API Keys

Go to your WordPress admin:
```
WordPress Admin → WooCommerce → Settings → Advanced → REST API
→ Click "Add Key"
→ Description: "Next.js Website"
→ Permissions: "Read"
→ Click "Generate API Key"
→ COPY the Consumer Key and Consumer Secret
```

### STEP 2: Create .env.local File

Create a file named `.env.local` in the `my-website` folder:

```env
WORDPRESS_BASE_URL=https://app.faditools.com
WC_CONSUMER_KEY=paste_your_consumer_key_here
WC_CONSUMER_SECRET=paste_your_consumer_secret_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Replace:**
- `https://app.faditools.com` with your WordPress URL
- `paste_your_consumer_key_here` with your actual Consumer Key
- `paste_your_consumer_secret_here` with your actual Consumer Secret

### STEP 3: Run the Website

Open terminal in the `my-website` folder and run:

```bash
npm run dev
```

Then open in browser:
```
http://localhost:3000
```

---

## ✨ That's It!

Your website should now be running with:
- ✅ Homepage with hero section
- ✅ Blog posts from WordPress
- ✅ Products from WooCommerce
- ✅ Responsive design
- ✅ SEO optimization

---

## 🎨 Next Steps

1. **Customize Colors:** Edit `tailwind.config.ts`
2. **Change Branding:** Edit `components/Header.tsx`
3. **Modify Homepage:** Edit `app/page.tsx`
4. **Deploy:** Push to GitHub and deploy on Vercel

---

## 🐛 Quick Troubleshooting

**Problem:** Posts not showing?
→ Check if WordPress REST API is working: `https://your-site.com/wp-json/wp/v2/posts`

**Problem:** Products not showing?
→ Verify your API keys in `.env.local`

**Problem:** Images not loading?
→ Add your WordPress domain to `next.config.js` in the `images.remotePatterns` section

---

## 📞 Need Help?

Read the detailed guides:
- `README.md` - Full documentation (English)
- `SETUP_INSTRUCTIONS_URDU.md` - Setup guide (Roman Urdu)

---

**Happy Building! 🎉**

