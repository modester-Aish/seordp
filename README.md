# SEORDP - WordPress + Next.js Website

A modern, fast, and SEO-optimized website built with Next.js 14 and WordPress as a headless CMS.

## 🚀 Features

- ✅ **Next.js 14** with App Router and Server Components
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for modern styling
- ✅ **WordPress REST API** integration for blog posts and pages
- ✅ **WooCommerce API** integration for products
- ✅ **SEO Optimized** with proper meta tags and Open Graph support
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Image Optimization** with Next.js Image component
- ✅ **Static Site Generation (SSG)** for optimal performance
- ✅ **Incremental Static Regeneration (ISR)** for fresh content

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- WordPress website with REST API enabled
- WooCommerce plugin installed (for products)
- WooCommerce API keys (Consumer Key & Consumer Secret)

## 🛠️ Installation

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# WordPress Configuration
WORDPRESS_BASE_URL=https://app.faditools.com
WC_CONSUMER_KEY=your_consumer_key_here
WC_CONSUMER_SECRET=your_consumer_secret_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**How to get WooCommerce API Keys:**

1. Go to WordPress Admin → WooCommerce → Settings
2. Navigate to Advanced → REST API
3. Click "Add Key"
4. Set Description: "Next.js Website"
5. Set Permissions: "Read"
6. Click "Generate API Key"
7. Copy the Consumer Key and Consumer Secret

### Step 3: Update next.config.js

Make sure to add your WordPress domain to the `remotePatterns` in `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-wordpress-domain.com', // Change this
      pathname: '/**',
    },
  ],
},
```

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
my-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── blog/                # Blog pages
│   │   ├── page.tsx         # Blog listing
│   │   └── [slug]/page.tsx  # Individual blog post
│   ├── products/            # Products pages
│   │   ├── page.tsx         # Products listing
│   │   └── [slug]/page.tsx  # Individual product
│   └── pages/               # WordPress pages
│       └── [slug]/page.tsx  # Dynamic WordPress pages
├── components/              # React components
│   ├── Header.tsx           # Header/Navigation
│   ├── Footer.tsx           # Footer
│   ├── PostCard.tsx         # Blog post card
│   └── ProductCard.tsx      # Product card
├── lib/                     # API functions
│   ├── wordpress-api.ts     # WordPress API calls
│   └── woocommerce-api.ts   # WooCommerce API calls
├── types/                   # TypeScript types
│   └── wordpress.ts         # WordPress & WooCommerce types
└── public/                  # Static files
```

## 🔧 Configuration

### WordPress Setup

1. **Enable REST API** (usually enabled by default)
2. **Set Permalinks** to "Post name" format:
   - WordPress Admin → Settings → Permalinks
   - Select "Post name"
   - Save Changes

### Testing API Connection

Test if your WordPress REST API is working:

```
https://your-wordpress-site.com/wp-json/wp/v2/posts
```

You should see JSON data of your posts.

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#3b82f6', // Change to your brand color
    // ... other shades
  },
}
```

Or use Tailwind's default colors directly in your components:

- `bg-blue-600` → `bg-purple-600`
- `text-blue-600` → `text-green-600`

### Updating Branding

1. **Site Name:** Update in `components/Header.tsx` and `components/Footer.tsx`
2. **Metadata:** Update in `app/layout.tsx`
3. **Homepage Content:** Update in `app/page.tsx`

## 📊 Performance

- **Static Generation**: Pages are pre-rendered at build time
- **ISR (Incremental Static Regeneration)**: Content revalidates every hour
- **Image Optimization**: Automatic image optimization with Next.js
- **Code Splitting**: Automatic code splitting for faster loads

## 🐛 Troubleshooting

### Problem: "Cannot connect to WordPress API"

**Solutions:**
- Check if `.env.local` file exists and has correct values
- Verify WordPress URL includes `https://`
- Test API endpoint in browser: `https://your-site.com/wp-json/wp/v2/posts`
- Ensure WordPress permalinks are set to "Post name"

### Problem: "WooCommerce products not loading"

**Solutions:**
- Verify API keys are correct in `.env.local`
- Check if WooCommerce plugin is active
- Ensure API key permissions are set to "Read"
- Try regenerating API keys

### Problem: "Images not loading"

**Solutions:**
- Add your WordPress domain to `next.config.js` remotePatterns
- Check if image URLs are accessible
- Verify WordPress media library has images

### Problem: "CORS errors"

**Solutions:**
- Add CORS headers to WordPress (contact hosting provider)
- Or use a WordPress plugin like "WP REST API CORS"

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables:
   - `WORDPRESS_BASE_URL`
   - `WC_CONSUMER_KEY`
   - `WC_CONSUMER_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

### Deploy to Other Platforms

This project works with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Support

If you encounter any issues:

1. Check the Troubleshooting section above
2. Review your `.env.local` configuration
3. Test API endpoints directly in browser
4. Check browser console for errors (F12)

## 📝 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ using Next.js and WordPress**
