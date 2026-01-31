/**
 * Script to create required WordPress pages for SEO/EEAT compliance
 * Run: npx tsx scripts/create-wordpress-pages.ts
 */

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://backend.seordp.net';
const WP_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`;
const USERNAME = 'admin';
const APPLICATION_PASSWORD = 'jMHa eye4 4dxK J2Di Akx7 bBZj';

// Create Basic Auth header
const auth = Buffer.from(`${USERNAME}:${APPLICATION_PASSWORD}`).toString('base64');

const pagesToCreate = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `
<h2>Privacy Policy</h2>
<p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>

<h3>Introduction</h3>
<p>At SEORDP, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

<h3>Information We Collect</h3>
<p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
<ul>
  <li>Personal data such as name, email address, and contact information</li>
  <li>Payment information for transactions</li>
  <li>Usage data including IP address, browser type, and pages visited</li>
  <li>Cookies and tracking technologies</li>
</ul>

<h3>How We Use Your Information</h3>
<p>We use the information we collect to:</p>
<ul>
  <li>Process your orders and transactions</li>
  <li>Send you updates about your account and services</li>
  <li>Improve our website and services</li>
  <li>Comply with legal obligations</li>
</ul>

<h3>Data Security</h3>
<p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

<h3>Your Rights</h3>
<p>You have the right to:</p>
<ul>
  <li>Access your personal data</li>
  <li>Correct inaccurate data</li>
  <li>Request deletion of your data</li>
  <li>Object to processing of your data</li>
</ul>

<h3>Contact Us</h3>
<p>If you have questions about this Privacy Policy, please contact us through our contact page.</p>
    `.trim(),
  },
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: `
<h2>Terms of Service</h2>
<p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>

<h3>Agreement to Terms</h3>
<p>By accessing or using SEORDP's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>

<h3>Use License</h3>
<p>Permission is granted to temporarily access the materials on SEORDP's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>

<h3>Service Description</h3>
<p>SEORDP provides access to premium SEO tools and services through group buy arrangements. We offer shared access to various software tools and platforms.</p>

<h3>User Accounts</h3>
<p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

<h3>Payment Terms</h3>
<p>All payments are processed securely. Refunds are subject to our refund policy. Prices are subject to change without notice.</p>

<h3>Prohibited Uses</h3>
<p>You may not use our services:</p>
<ul>
  <li>For any unlawful purpose</li>
  <li>To violate any laws or regulations</li>
  <li>To infringe upon the rights of others</li>
  <li>To transmit harmful or malicious code</li>
</ul>

<h3>Limitation of Liability</h3>
<p>SEORDP shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>

<h3>Contact Information</h3>
<p>For questions about these Terms of Service, please contact us through our contact page.</p>
    `.trim(),
  },
  {
    title: 'About Us',
    slug: 'about-us',
    content: `
<h2>About SEORDP</h2>

<h3>Who We Are</h3>
<p>SEORDP is a leading provider of premium SEO tools and services through affordable group buy arrangements. We make professional-grade tools accessible to individuals and small businesses at a fraction of the cost.</p>

<h3>Our Mission</h3>
<p>Our mission is to democratize access to premium SEO and digital marketing tools, enabling everyone to compete effectively in the digital marketplace regardless of budget constraints.</p>

<h3>What We Offer</h3>
<p>We provide shared access to a wide range of premium tools including:</p>
<ul>
  <li>SEO analysis tools (Ahrefs, SEMrush, Moz)</li>
  <li>Content creation platforms (Canva, ChatGPT, Claude)</li>
  <li>Design and creative tools</li>
  <li>Social media management tools</li>
  <li>And many more premium services</li>
</ul>

<h3>Why Choose Us</h3>
<ul>
  <li><strong>Affordable Pricing:</strong> Access premium tools at a fraction of the cost</li>
  <li><strong>Instant Access:</strong> Get started immediately after purchase</li>
  <li><strong>Reliable Service:</strong> High uptime and consistent availability</li>
  <li><strong>Premium Support:</strong> Dedicated customer service team</li>
  <li><strong>Secure Platform:</strong> Your data and payments are protected</li>
</ul>

<h3>Our Commitment</h3>
<p>We are committed to providing the best possible service to our customers. We continuously work to improve our platform, add new tools, and enhance the user experience.</p>

<h3>Contact Us</h3>
<p>Have questions? We'd love to hear from you. Visit our contact page to get in touch.</p>
    `.trim(),
  },
  {
    title: 'Contact Us',
    slug: 'contact-us',
    content: `
<h2>Contact Us</h2>
<p>We're here to help! Get in touch with us through any of the following methods:</p>

<h3>Email Support</h3>
<p>For general inquiries, support questions, or feedback, please email us at:</p>
<p><strong>Email:</strong> <a href="mailto:support@seordp.net">support@seordp.net</a></p>

<h3>Business Hours</h3>
<p>Our customer support team is available:</p>
<ul>
  <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (GMT)</li>
  <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM (GMT)</li>
  <li><strong>Sunday:</strong> Closed</li>
</ul>
<p>We aim to respond to all inquiries within 24 hours during business days.</p>

<h3>Social Media</h3>
<p>Connect with us on social media:</p>
<ul>
  <li>Follow us on <a href="https://twitter.com/seordp" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
  <li>Like us on <a href="https://facebook.com/seordp" target="_blank" rel="noopener noreferrer">Facebook</a></li>
  <li>Connect on <a href="https://linkedin.com/company/seordp" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
</ul>

<h3>Address</h3>
<p>For written correspondence, please use the following address:</p>
<p>
  <strong>SEORDP</strong><br>
  [Your Physical Address]<br>
  [City, State, ZIP Code]<br>
  [Country]
</p>

<h3>Frequently Asked Questions</h3>
<p>Before contacting us, you might find the answer to your question in our <a href="/blog">blog</a> or FAQ section.</p>

<h3>Report an Issue</h3>
<p>If you're experiencing technical issues or have concerns about our service, please contact us immediately. We take all reports seriously and work to resolve them promptly.</p>
    `.trim(),
  },
  {
    title: 'Editorial Guidelines',
    slug: 'editorial-guidelines',
    content: `
<h2>Editorial Guidelines</h2>
<p><strong>Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>

<h3>Our Editorial Mission</h3>
<p>At SEORDP, we are committed to providing accurate, helpful, and trustworthy content that helps our readers make informed decisions about SEO tools and digital marketing strategies.</p>

<h3>Content Standards</h3>
<p>All content published on SEORDP adheres to the following standards:</p>

<h4>Accuracy and Fact-Checking</h4>
<ul>
  <li>All information is thoroughly researched and fact-checked</li>
  <li>We cite reliable sources and provide references where applicable</li>
  <li>We regularly update content to ensure accuracy</li>
</ul>

<h4>Transparency</h4>
<ul>
  <li>We clearly disclose any partnerships or affiliate relationships</li>
  <li>Our reviews and recommendations are based on genuine testing and experience</li>
  <li>We maintain editorial independence</li>
</ul>

<h4>Expertise</h4>
<ul>
  <li>Content is written or reviewed by subject matter experts</li>
  <li>We ensure authors have relevant experience and qualifications</li>
  <li>Technical content is verified by professionals</li>
</ul>

<h3>Content Categories</h3>
<p>We publish content in the following categories:</p>
<ul>
  <li>SEO tool reviews and comparisons</li>
  <li>Digital marketing guides and tutorials</li>
  <li>Industry news and updates</li>
  <li>Best practices and tips</li>
</ul>

<h3>Author Guidelines</h3>
<p>Our authors are expected to:</p>
<ul>
  <li>Provide original, valuable content</li>
  <li>Follow SEO best practices</li>
  <li>Use proper citations and attributions</li>
  <li>Maintain a professional and respectful tone</li>
</ul>

<h3>Corrections Policy</h3>
<p>If we discover errors in our content, we will:</p>
<ul>
  <li>Correct the information promptly</li>
  <li>Note the correction and date in the article</li>
  <li>Notify readers of significant corrections when appropriate</li>
</ul>

<h3>Contact Our Editorial Team</h3>
<p>If you have questions about our editorial guidelines or wish to report an issue with our content, please contact us through our <a href="/contact-us">contact page</a>.</p>
    `.trim(),
  },
];

async function createPage(pageData: { title: string; slug: string; content: string }) {
  try {
    // Check if page already exists
    const checkResponse = await fetch(`${WP_API_URL}/pages?slug=${pageData.slug}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    if (!checkResponse.ok) {
      throw new Error(`Failed to check existing page: ${checkResponse.status}`);
    }

    const existingPages = await checkResponse.json();
    
    if (existingPages.length > 0) {
      console.log(`⚠️  Page "${pageData.title}" already exists (ID: ${existingPages[0].id}). Skipping...`);
      return { success: true, skipped: true, id: existingPages[0].id };
    }

    // Create new page
    const createResponse = await fetch(`${WP_API_URL}/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: pageData.title,
        slug: pageData.slug,
        content: pageData.content,
        status: 'publish',
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Failed to create page: ${createResponse.status} - ${errorText}`);
    }

    const createdPage = await createResponse.json();
    console.log(`✅ Created page: "${pageData.title}" (ID: ${createdPage.id}, Slug: ${createdPage.slug})`);
    return { success: true, skipped: false, id: createdPage.id };
  } catch (error: any) {
    console.error(`❌ Error creating page "${pageData.title}":`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 Starting WordPress pages creation...\n');
  console.log(`WordPress URL: ${WORDPRESS_BASE_URL}\n`);

  const results = [];

  for (const pageData of pagesToCreate) {
    const result = await createPage(pageData);
    results.push({ ...pageData, ...result });
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n📊 Summary:');
  console.log('='.repeat(50));
  
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  results.forEach((result) => {
    if (result.success) {
      if (result.skipped) {
        skippedCount++;
        console.log(`⚠️  ${result.title} - Already exists`);
      } else {
        successCount++;
        console.log(`✅ ${result.title} - Created successfully`);
      }
    } else {
      errorCount++;
      console.log(`❌ ${result.title} - Error: ${result.error}`);
    }
  });

  console.log('='.repeat(50));
  console.log(`\n✅ Created: ${successCount}`);
  console.log(`⚠️  Skipped: ${skippedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`\n🎉 Process completed!`);
}

main().catch(console.error);

