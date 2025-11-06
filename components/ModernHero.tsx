'use client';

import Link from 'next/link';

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
                SEORDP PREMIUM PLATFORM
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                Grow better with SEORDP
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Software that&apos;s powerful, not overpowering. Seamlessly connect your tools, team, and workflow on one AI-powered platform that grows with your business.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/products" 
                  className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all duration-200 shadow-lg"
                >
                  Get started
                </Link>
                <Link 
                  href="#pricing" 
                  className="px-8 py-4 bg-transparent hover:bg-white/5 text-white font-semibold rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-200"
                >
                  View pricing
                </Link>
              </div>

              {/* Footer Text */}
              <p className="text-sm text-slate-400">
                Start with free tools, or get premium access to 50+ tools instantly.
              </p>
            </div>

            {/* Right Content - Cards Around Center */}
            <div className="relative h-[600px] flex items-center justify-center">
              
              {/* Main Pricing Card (Center) */}
              <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 shadow-2xl w-80 z-20">
                <div className="text-white/90 text-sm font-semibold mb-2">PREMIUM PLAN</div>
                <div className="text-white text-4xl font-black mb-2">$4.99<span className="text-xl font-normal">/mo</span></div>
                <div className="text-white/80 text-sm mb-6">Save 90% on all premium tools</div>
                <div className="space-y-2 mb-6">
                  {['50+ Premium Tools', 'Instant Access', '24/7 Support', 'Cancel Anytime'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white text-sm">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/products"
                  className="block w-full py-3 bg-white text-teal-600 font-bold rounded-xl hover:bg-slate-100 transition-colors text-center"
                >
                  Get Started Now
                </Link>
              </div>

              {/* LEFT SIDE TOOLS */}
              
              {/* Tool Card: Ahrefs (Top Left) */}
              <div className="absolute top-0 -left-16 bg-white rounded-xl p-4 shadow-xl w-56 transform -rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg p-2">
                    <img src="/tools/ahrefs-logo.svg" alt="Ahrefs" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Ahrefs</div>
                    <div className="text-xs text-green-600 font-semibold">● Active</div>
                  </div>
                </div>
              </div>

              {/* Tool Card: SEMrush (Middle Left) */}
              <div className="absolute top-1/3 -left-24 bg-white rounded-xl p-4 shadow-xl w-56 transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg p-2">
                    <img src="/tools/semrush-logo.svg" alt="SEMrush" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">SEMrush</div>
                    <div className="text-xs text-green-600 font-semibold">● Active</div>
                  </div>
                </div>
              </div>

              {/* Tool Card: ChatGPT (Bottom Left) */}
              <div className="absolute bottom-8 -left-16 bg-white rounded-xl p-4 shadow-xl w-56 transform -rotate-4 hover:rotate-0 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg p-2">
                    <img src="/tools/chatgpt-logo.svg" alt="ChatGPT" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">ChatGPT Plus</div>
                    <div className="text-xs text-green-600 font-semibold">● Active</div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE TOOLS */}
              
              {/* Tool Card: Canva (Top Right) */}
              <div className="absolute top-0 -right-16 bg-white rounded-xl p-4 shadow-xl w-56 transform rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg p-2">
                    <img src="/tools/canva-logo.svg" alt="Canva" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Canva Pro</div>
                    <div className="text-xs text-green-600 font-semibold">● Active</div>
                  </div>
                </div>
              </div>

              {/* Tool Card: Moz (Middle Right) */}
              <div className="absolute top-1/3 -right-24 bg-white rounded-xl p-4 shadow-xl w-56 transform -rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg p-2">
                    <img src="/tools/moz-logo.svg" alt="Moz" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Moz Pro</div>
                    <div className="text-xs text-green-600 font-semibold">● Active</div>
                  </div>
                </div>
              </div>

              {/* Tool Card: Netflix (Bottom Right) */}
              <div className="absolute bottom-8 -right-16 bg-white rounded-xl p-4 shadow-xl w-56 transform rotate-5 hover:rotate-0 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg p-2">
                    <img src="/tools/netflix-logo.svg" alt="Netflix" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Netflix</div>
                    <div className="text-xs text-green-600 font-semibold">● Active</div>
                  </div>
                </div>
              </div>

              {/* Sparkle Decorations */}
              <div className="absolute -top-8 right-1/4 text-teal-400 text-3xl animate-pulse">✦</div>
              <div className="absolute -bottom-8 left-1/4 text-orange-400 text-2xl animate-pulse" style={{animationDelay: '1s'}}>✦</div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

