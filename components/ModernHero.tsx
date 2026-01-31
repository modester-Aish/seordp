'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ModernHero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Accent Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content - HubSpot Style */}
            <div className="space-y-8">
              {/* Small Label */}
              <div className="text-teal-400 text-sm font-semibold tracking-wide uppercase">
                🚀 BEST GROUP BUY SEO TOOLS 2025
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                Premium SEO Tools at <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">90% OFF</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Access 50+ premium SEO tools including Ahref$, SEMru$h, Moz Pro, and more. Join 45,000+ marketers, agencies, and businesses growing their online presence with affordable group buy tools.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="https://members.seotoolsgroupbuy.us/signup" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all duration-200 shadow-lg"
                >
                  Get started
                </a>
                <Link 
                  href="#pricing" 
                  className="px-8 py-4 bg-transparent hover:bg-white/5 text-white font-semibold rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-200"
                >
                  View pricing
                </Link>
              </div>

              {/* Footer Text */}
              <p className="text-sm text-slate-400">
                ⚡ Instant activation • 🔒 Secure access • 💯 99% uptime guarantee • 💳 Money-back guarantee
              </p>
            </div>

            {/* Right Content - Wide 3 Column Layout */}
            <div className="relative h-[600px] w-full">
              
              {/* LEFT SIDE TOOLS - Close to Pricing Card */}
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 space-y-5 z-10">
                {[
                  { name: 'Ahref$', logo: '/tools/ahrefs-logo.svg' },
                  { name: 'SEMru$h', logo: '/tools/semrush-logo.svg' },
                  { name: 'ChatGPT Plus', logo: '/tools/chatgpt-logo.svg' },
                  { name: 'Claude AI', logo: '/tools/claude-logo.svg' },
                ].map((tool, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-xl w-60 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-lg p-2.5 relative">
                        <Image src={tool.logo} alt={`${tool.name} - Premium SEO Tool Group Buy Access`} fill className="object-contain" sizes="48px" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{tool.name}</div>
                        <div className="text-xs text-green-600 font-semibold">● Active</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CENTER - Pricing Card */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 shadow-2xl w-80 z-30">
                <div className="text-white/90 text-sm font-semibold mb-2">🔥 MOST POPULAR</div>
                <div className="text-white text-4xl font-black mb-2">$4.99<span className="text-xl font-normal">/mo</span></div>
                <div className="text-white/80 text-sm mb-6">Save $495/month compared to individual subscriptions</div>
                <div className="space-y-2 mb-6">
                  {['✓ Ahref$, SEMru$h, Moz Pro', '✓ ChatGPT Plus & Claude AI', '✓ Canva Pro & Design Tools', '✓ 24/7 Customer Support'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white text-sm">
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href="https://members.seotoolsgroupbuy.us/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-white text-teal-600 font-bold rounded-xl hover:bg-slate-100 transition-colors text-center"
                >
                  Get Started Now
                </a>
              </div>

              {/* RIGHT SIDE TOOLS - Close to Pricing Card */}
              <div className="absolute -right-32 top-1/2 -translate-y-1/2 space-y-5 z-10">
                {[
                  { name: 'Canva Pro', logo: '/tools/canva-logo.svg' },
                  { name: 'Moz Pro', logo: '/tools/moz-logo.svg' },
                  { name: 'RunwayML', logo: '/tools/runwayml-logo.svg' },
                  { name: 'Netflix', logo: '/tools/netflix-logo.svg' },
                ].map((tool, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-xl w-60 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-lg p-2.5 relative">
                        <Image src={tool.logo} alt={`${tool.name} - Premium SEO Tool Group Buy Access`} fill className="object-contain" sizes="48px" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{tool.name}</div>
                        <div className="text-xs text-green-600 font-semibold">● Active</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sparkle Decorations */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-teal-400 text-3xl animate-pulse">✦</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-orange-400 text-2xl animate-pulse" style={{animationDelay: '1s'}}>✦</div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

