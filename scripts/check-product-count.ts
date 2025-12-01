/**
 * Quick script to check total product count
 * Run: npx tsx scripts/check-product-count.ts
 */

import { fetchAllProductsComplete } from '../lib/woocommerce-api';

async function checkProductCount() {
  try {
    console.log('📦 Fetching all products...\n');
    
    const { data: products, error, total } = await fetchAllProductsComplete();
    
    if (error || !products) {
      console.error('❌ Error:', error);
      return;
    }
    
    const publishedProducts = products.filter(p => p.status === 'publish');
    
    console.log('📊 Product Count Summary:');
    console.log(`   Total Products: ${total || products.length}`);
    console.log(`   Published Products: ${publishedProducts.length}`);
    console.log(`   Draft/Private: ${products.length - publishedProducts.length}`);
    
    console.log(`\n✅ Total Published Product Links: ${publishedProducts.length}\n`);
    
    // List first 10 product slugs
    console.log('📝 First 10 Product Slugs:');
    publishedProducts.slice(0, 10).forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.slug} (${p.name})`);
    });
    
    if (publishedProducts.length > 10) {
      console.log(`   ... and ${publishedProducts.length - 10} more`);
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

checkProductCount();

