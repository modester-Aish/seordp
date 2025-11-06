'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  pages?: Array<{ id: number; slug: string; title: { rendered: string } }>;
}

export default function Header({ pages = [] }: HeaderProps) {
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <nav className="container mx-auto max-w-7xl">
        {/* Floating Pill Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-full shadow-xl border border-white/20 px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">
                SEO<span className="text-teal-400">RDP</span>
              </span>
            </Link>

            {/* Center Navigation - Desktop Only */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <Link
                href="/"
                className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
              >
                Products
              </Link>
              
              {/* Pages Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-white hover:text-teal-400 transition-colors"
                  onMouseEnter={() => setIsPagesOpen(true)}
                  onMouseLeave={() => setIsPagesOpen(false)}
                >
                  <Link href="/pages">
                    Pages
                  </Link>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Dropdown Menu */}
                {isPagesOpen && (
                  <div 
                    className="absolute left-0 top-full mt-2 w-48 rounded-2xl bg-slate-800/95 backdrop-blur-xl shadow-2xl border border-white/20 animate-fade-in-up"
                    onMouseEnter={() => setIsPagesOpen(true)}
                    onMouseLeave={() => setIsPagesOpen(false)}
                  >
                    <div className="py-2">
                      {pages && pages.length > 0 ? (
                        pages.map((page) => (
                          <Link
                            key={page.id}
                            href={`/${page.slug}`}
                            className="block px-4 py-2 text-sm text-white hover:bg-teal-500/20 hover:text-teal-400 transition-colors rounded-lg mx-2"
                          >
                            {page.title.rendered}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-slate-400">
                          No pages available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Cart & Menu */}
            <div className="flex items-center gap-3">
              {/* Cart Icon */}
              <button
                className="inline-flex items-center justify-center text-white hover:text-teal-400 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>

              {/* Mobile Menu */}
              <button
                className="inline-flex lg:hidden items-center justify-center text-white hover:text-teal-400 transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

