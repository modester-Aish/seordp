/**
 * Admin Page - Auto Update Tool Redirects
 * 
 * This page automatically:
 * 1. Fetches product slugs (jo frontend par show hote hain)
 * 2. Matches tools with products
 * 3. Updates tool-product-redirects.ts file
 * 
 * Just visit this page and it will do everything automatically!
 */

import { updateToolRedirectsDirect } from '@/lib/update-tool-redirects-direct';
import { redirect } from 'next/navigation';

export default async function UpdateRedirectsPage() {
  // Automatically run the update
  const result = await updateToolRedirectsDirect();
  
  if (result.success) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-teal-500/30">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Tool Redirects Updated Successfully!
            </h1>
            <p className="text-slate-300">
              File automatically updated: <code className="bg-slate-700 px-2 py-1 rounded">lib/tool-product-redirects.ts</code>
            </p>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Summary:</h2>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>Total Product Slugs:</span>
                <span className="text-teal-400 font-bold">{result.totalProductSlugs}</span>
              </div>
              <div className="flex justify-between">
                <span>Matched Tools:</span>
                <span className="text-teal-400 font-bold">{result.matchedTools}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-6 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Tool → Product Mappings:</h2>
            <div className="space-y-1 text-sm">
              {Object.entries(result.mapping).slice(0, 50).map(([tool, product]) => (
                <div key={tool} className="flex justify-between py-1 border-b border-slate-700">
                  <span className="text-slate-300">{tool}</span>
                  <span className="text-teal-400">→</span>
                  <span className="text-white">{product}</span>
                </div>
              ))}
              {Object.entries(result.mapping).length > 50 && (
                <div className="text-slate-400 text-center pt-2">
                  ... and {Object.entries(result.mapping).length - 50} more
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-colors"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-red-900/20 rounded-2xl p-8 max-w-2xl w-full border border-red-500/30">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Error Updating Redirects
          </h1>
          <p className="text-red-400 mb-6">
            {result.error || 'Unknown error occurred'}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

