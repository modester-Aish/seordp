/**
 * DIRECT UPDATE - File se read karke update karega
 * Run: npx tsx scripts/update-now-direct.ts
 */

import { updateToolRedirectsDirect } from '../lib/update-tool-redirects-direct';

async function main() {
  console.log('🚀 Starting DIRECT update from file...\n');
  
  const result = await updateToolRedirectsDirect();
  
  if (result.success) {
    console.log('\n✅✅✅ SUCCESS! File updated! ✅✅✅\n');
    console.log(`📊 Summary:`);
    console.log(`   - Total Products: ${result.totalProductSlugs}`);
    console.log(`   - Matched Tools: ${result.matchedTools}`);
    console.log('\n📋 Tool → Product Mappings:');
    Object.entries(result.mapping).forEach(([tool, product]) => {
      console.log(`   ${tool} → ${product}`);
    });
    console.log('\n✅ Done! File updated successfully!');
  } else {
    console.error('\n❌ ERROR:', result.error);
    process.exit(1);
  }
}

main().catch(console.error);

