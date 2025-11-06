'use client';

import Link from 'next/link';
import Typewriter from './Typewriter';

export default function ModernHero() {
  return (
    <section className="relative pt-0 pb-3 md:pt-0 md:pb-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-slate-800/90 to-slate-900/93 z-10"></div>
        <img 
          src="/banner.webp"
          alt="SEO Tools Banner"
          className="w-full h-full object-cover opacity-25"
        />
        {/* Animated Blobs */}
        <div className="hero-blob hero-blob-1 opacity-15"></div>
        <div className="hero-blob hero-blob-2 opacity-10"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5 z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,400px] gap-4 lg:gap-8 items-center">
            
            {/* Left Content - Ultra Clean Dribbble Style */}
            <div className="space-y-4 animate-fade-in-up">
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-teal-400">Trusted Worldwide</span>
              </div>

              {/* Headline - Compact */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
                Premium SEO Tools at 
                <span className="text-teal-400"> 90% Off</span>
              </h1>

              {/* Description - Compact */}
              <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                Access Ahrefs, SEMrush, ChatGPT Plus and 50+ premium tools. No contracts, cancel anytime.
              </p>

              {/* CTAs - Compact */}
              <div className="flex items-center gap-3 pt-0">
                <Link 
                  href="/products" 
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-teal-500/30"
                >
                  Get Started →
                </Link>
                <Link 
                  href="#pricing" 
                  className="text-slate-300 hover:text-white font-semibold transition-colors text-sm"
                >
                  View pricing
                </Link>
              </div>

              {/* Social Proof - Compact */}
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">
                    <span className="font-bold text-white">4.9/5</span> (2,000+ reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Pricing Card Aligned to Right */}
            <div className="relative animate-fade-in-up mt-8 lg:mt-0 z-30" style={{ animationDelay: '0.2s' }}>
              {/* Main Pricing Card */}
              <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 relative z-10">
                {/* Popular Badge - Floating */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-2xl animate-bounce-gentle">
                  <span className="text-white text-xs font-black flex items-center gap-2">
                    ⭐ MOST POPULAR
                  </span>
                </div>

                <div className="space-y-4 mt-4">
                  {/* Plan Name */}
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      Premium All Access
                    </h3>
                    <p className="text-sm text-slate-200 font-medium">
                      Everything you need to succeed
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
                        $4.99
                      </span>
                      <div>
                        <span className="text-slate-400 line-through text-xl block font-bold">$119</span>
                        <span className="text-slate-300 text-sm font-medium">/month</span>
                      </div>
                    </div>
                    <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-black border border-green-400/30">
                      💰 Save $114/month
                    </div>
                  </div>

                  {/* Features - Compact */}
                  <ul className="space-y-2">
                    {[
                      '50+ Premium Tools',
                      'Ahrefs & SEMrush',
                      'ChatGPT Plus & Claude',
                      'Canva Pro & RunwayML',
                      '99.9% Uptime',
                      '24/7 Support',
                      'Instant Setup'
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-white">
                          <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold">{feature}</span>
                        </li>
                      ))}
                  </ul>

                  {/* CTA Button */}
                  <Link 
                    href="/products" 
                    className="block w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-purple-600 text-white text-center font-black text-base rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    Start Your Journey →
                  </Link>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-500 pt-2 font-semibold">
                    <span>🔒 Secure</span>
                    <span>•</span>
                    <span>⚡ Instant</span>
                    <span>•</span>
                    <span>✅ Verified</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

