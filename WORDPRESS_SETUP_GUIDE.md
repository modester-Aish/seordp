# 🔧 WordPress Integration Guide for SEORDP

## ✅ **Kya Chahiye:**

### **1. WordPress Requirements:**
- ✅ WordPress website (latest version)
- ✅ WooCommerce plugin installed & activated
- ✅ Admin access to WordPress dashboard

---

## 🔑 **Step-by-Step Setup:**

### **Step 1: WooCommerce API Keys Generate Karo**

#### **Method 1 - Through WordPress Admin:**

1. **Login to WordPress:**
   ```
   https://yoursite.com/wp-admin
   ```

2. **Navigate to WooCommerce Settings:**
   ```
   Dashboard → WooCommerce → Settings → Advanced → REST API
   ```

3. **Click "Add Key":**
   - Description: `SEORDP Website`
   - User: Select admin user
   - Permissions: **Read** (important!)
   - Click: "Generate API Key"

4. **Copy Both Keys:**
   ```
   Consumer Key: ck_xxxxxxxxxxxxxxxxxxxx
   Consumer Secret: cs_xxxxxxxxxxxxxxxxxxxx
   ```
   ⚠️ **Important:** Copy immediately! Secret key sirf ek bar dikhti hai.

---

### **Step 2: .env.local File Setup**

1. **Copy example file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit .env.local:**
   ```env
   WORDPRESS_BASE_URL=https://your-actual-site.com
   WC_CONSUMER_KEY=ck_your_actual_key_here
   WC_CONSUMER_SECRET=cs_your_actual_secret_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Replace with real values:**
   - `your-actual-site.com` → Your WordPress URL
   - `ck_your_actual_key_here` → Real Consumer Key
   - `cs_your_actual_secret_here` → Real Consumer Secret

---

### **Step 3: WordPress Content Setup**

#### **A. Create Products in WooCommerce:**

**Required Fields:**
- ✅ Product Name (e.g., "Ahrefs Premium")
- ✅ Price (e.g., $30.00)
- ✅ Regular Price (e.g., $99.00)
- ✅ Sale Price (optional)
- ✅ Product Image
- ✅ Description
- ✅ Categories

**Example Products:**
```
1. Ahrefs Premium - $30.00
2. SEMrush Pro - $4.99
3. Canva Pro - $4.99
4. ChatGPT Plus - $4.99
```

#### **B. Create Categories:**

**Recommended Categories:**
```
1. SEO Tools
2. AI Tools
3. Design Tools
4. Marketing Tools
5. Content Tools
6. Analytics Tools
```

#### **C. Create Pages (Optional):**

```
1. About Us
2. Contact
3. Privacy Policy
4. Terms of Service
```

#### **D. Create Blog Posts (Optional):**

```
1. "Getting Started Guide"
2. "Best SEO Tools 2025"
3. "How to Use Our Platform"
```

---

### **Step 4: Test Connection**

1. **Save .env.local file**

2. **Restart Dev Server:**
   ```bash
   # Stop current server (Ctrl + C)
   npm run dev
   ```

3. **Check Homepage:**
   ```
   http://localhost:3000
   ```

4. **Verify:**
   - ✅ Products visible?
   - ✅ Categories showing?
   - ✅ Images loading?
   - ✅ No 401 errors?

---

## 🎯 **Quick Checklist:**

### **Before Integration:**
- [ ] WordPress installed
- [ ] WooCommerce plugin active
- [ ] Admin access available
- [ ] At least 5-10 products created
- [ ] Categories assigned
- [ ] Product images uploaded

### **After Integration:**
- [ ] .env.local file created
- [ ] API keys added
- [ ] Server restarted
- [ ] Homepage products loading
- [ ] Category filter working
- [ ] Product pages accessible
- [ ] Images displaying

---

## ⚠️ **Common Issues & Solutions:**

### **Issue 1: 401 Unauthorized**
```
Error: Request failed with status code 401
```
**Solution:**
- Check API keys are correct
- Verify permissions are "Read"
- Restart server after changing .env

### **Issue 2: No Products Showing**
**Solution:**
- Create products in WooCommerce
- Publish them (not draft)
- Assign categories
- Add at least one image

### **Issue 3: Images Not Loading**
**Solution:**
- Check WordPress URL is correct
- Verify images are uploaded
- Check next.config.js has correct domain

---

## 🚀 **Production Deployment:**

### **For Live Site:**

Update `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://your-live-domain.com
```

Build:
```bash
npm run build
npm start
```

---

## 📞 **Need Help?**

Agar koi problem ho toh batao:
- API keys not generating?
- Products not showing?
- Errors in console?
- Images not loading?

Main help kar dunga! ✅

---

## 🎊 **Mujhe Provide Karo:**

### **Minimum Requirements:**
```
1. WordPress Site URL
2. WooCommerce Consumer Key
3. WooCommerce Consumer Secret
```

**Example:**
```
URL: https://demo.yoursite.com
Consumer Key: ck_123abc456def789...
Consumer Secret: cs_xyz789abc123...
```

**Bas yeh 3 cheezein dedo, main .env.local setup kar dunga! ✅**

