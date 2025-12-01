'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cleanPageTitle } from '@/lib/html-utils';
import { getAllTools, Tool } from '@/lib/tools-data';
import { getToolProductRedirect } from '@/lib/tool-product-redirects';

interface HeaderProps {
  pages?: Array<{ id: number; slug: string; title: { rendered: string } }>;
}

export default function Header({ pages = [] }: HeaderProps) {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Timeout refs for smooth closing
  const [toolsTimeout, setToolsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [pagesTimeout, setPagesTimeout] = useState<NodeJS.Timeout | null>(null);
  const [infoTimeout, setInfoTimeout] = useState<NodeJS.Timeout | null>(null);

  // Smooth open/close handlers
  const handleToolsEnter = () => {
    if (toolsTimeout) clearTimeout(toolsTimeout);
    setIsToolsOpen(true);
  };

  const handleToolsLeave = () => {
    const timeout = setTimeout(() => setIsToolsOpen(false), 300);
    setToolsTimeout(timeout);
  };

  const handlePagesEnter = () => {
    if (pagesTimeout) clearTimeout(pagesTimeout);
    setIsPagesOpen(true);
  };

  const handlePagesLeave = () => {
    const timeout = setTimeout(() => setIsPagesOpen(false), 300);
    setPagesTimeout(timeout);
  };

  const handleInfoEnter = () => {
    if (infoTimeout) clearTimeout(infoTimeout);
    setIsInfoOpen(true);
  };

  const handleInfoLeave = () => {
    const timeout = setTimeout(() => setIsInfoOpen(false), 300);
    setInfoTimeout(timeout);
  };

  // Categorize pages intelligently
  const infoPages = pages.filter(p => {
    const title = p.title.rendered.toLowerCase();
    return title.includes('about') || title.includes('contact') || 
           title.includes('faq') || title.includes('policy') || 
           title.includes('terms') || title.includes('privacy') ||
           title.includes('refund') || title.includes('dmca');
  });

  // Get all static tools for Tools Shop dropdown
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [toolsByCategory, setToolsByCategory] = useState<Record<string, Tool[]>>({});

  // Load tools and group by category
  useEffect(() => {
    const tools = getAllTools();
    setAllTools(tools);
    
    // Group tools by category for better organization
    const grouped = tools.reduce((acc, tool) => {
      const category = tool.category || 'Other Tools';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tool);
      return acc;
    }, {} as Record<string, Tool[]>);
    setToolsByCategory(grouped);
  }, []);

  // Get tool link - use static redirect mapping from tool-product-redirects.ts
  const getToolLink = (toolId: string, toolSlug?: string): string => {
    if (toolSlug) {
      // Check static redirect mapping first (instant, no API call)
      const productSlug = getToolProductRedirect(toolSlug);
      if (productSlug) {
        // Static redirect exists - use product slug directly (actual product link)
        return `/${productSlug}`;
      }
      // No redirect - use tool slug
      return `/${toolSlug}`;
    }
    
    // Final fallback: use tool id
    return `/${toolId}`;
  };

  // Pricing Plans data (static plans)
  const pricingPlans = [
    { name: 'SMALL PLAN', slug: 'small-plan', price: '$15' },
    { name: 'AHREF$ COMBO', slug: 'ahrefs-combo', price: '$25' },
    { name: 'MEGA PLAN', slug: 'mega-plan', price: '$50' },
    { name: 'LITE PLAN', slug: 'lite-plan', price: '$10' },
    { name: 'WRITER PLAN', slug: 'writer-plan', price: '$15' },
    { name: 'DESIGNER PLAN', slug: 'designer-plan', price: '$10' },
  ];

  const toolsPages = pages.filter(p => {
    const title = p.title.rendered.toLowerCase();
    return title.includes('tool') || title.includes('seo') || 
           title.includes('combo') || title.includes('pack') ||
           title.includes('single') || title.includes('list');
  });

  const pricingPages = pages.filter(p => {
    const title = p.title.rendered.toLowerCase();
    return title.includes('plan') || title.includes('pricing') || 
           title.includes('price') || title.includes('package');
  });

  const otherPages = pages.filter(p => 
    !infoPages.includes(p) && !toolsPages.includes(p) && !pricingPages.includes(p)
  );

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-4 z-[100] w-full px-4">
      <nav className="container mx-auto max-w-7xl">
        {/* Floating Pill Container */}
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 backdrop-blur-xl rounded-full shadow-2xl border border-teal-400/30 px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">
                SEO<span className="text-teal-400">RDP</span>
              </span>
            </Link>

            {/* Center Navigation - Desktop Only */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              <Link
                href="/"
                className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
              >
                Home
              </Link>
              
              {/* Single Tools Dropdown */}
              {allTools.length > 0 && (
                <div className="relative group">
                  <div 
                    className="flex items-center gap-1 cursor-pointer"
                    onMouseEnter={handleToolsEnter}
                    onMouseLeave={handleToolsLeave}
                  >
                    <Link
                      href="/single-tools-list"
                      className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
                    >
                      Tools Shop
                    </Link>
                    <ChevronDown className="h-4 w-4 text-white group-hover:text-teal-400 transition-colors" />
                  </div>
                  
                  {isToolsOpen && (
                    <div 
                      className="absolute left-0 top-full mt-3 w-96 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up"
                      onMouseEnter={handleToolsEnter}
                      onMouseLeave={handleToolsLeave}
                      style={{ zIndex: 9999 }}
                    >
                      {/* Gradient Border Effect */}
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-[2px] rounded-xl">
                        <div className="bg-slate-900 rounded-xl">
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                                <span className="text-xl">🛠️</span>
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-white">Single Tools</h3>
                                <p className="text-xs text-teal-400">{allTools.length}+ Premium Tools</p>
                              </div>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                              {Object.entries(toolsByCategory).map(([category, tools]) => (
                                <div key={category} className="mb-4 last:mb-0">
                                  <h4 className="text-xs font-semibold text-teal-400 uppercase mb-2 px-2">
                                    {category}
                                  </h4>
                                  <div className="space-y-1">
                                    {tools.map((tool) => {
                                      const linkHref = getToolLink(tool.id, tool.slug);
                                      return (
                                        <Link
                                          key={tool.id}
                                          href={linkHref}
                                          className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:bg-teal-500/10 hover:text-teal-400 transition-all rounded-lg group/item"
                                        >
                                          <span className="group-hover/item:pl-1 transition-all">{tool.name}</span>
                                          <span className="text-xs text-teal-500 font-semibold">{tool.price}</span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pricing Plans Dropdown */}
              {pricingPlans.length > 0 && (
                <div className="relative group">
                  <div 
                    className="flex items-center gap-1 cursor-pointer"
                    onMouseEnter={handlePagesEnter}
                    onMouseLeave={handlePagesLeave}
                  >
                    <Link
                      href="/pages"
                      className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
                    >
                      Pricing Plans
                    </Link>
                    <ChevronDown className="h-4 w-4 text-white group-hover:text-purple-400 transition-colors" />
                  </div>
                  
                  {isPagesOpen && (
                    <div 
                      className="absolute left-0 top-full mt-3 w-80 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up"
                      onMouseEnter={handlePagesEnter}
                      onMouseLeave={handlePagesLeave}
                      style={{ zIndex: 9999 }}
                    >
                      {/* Gradient Border Effect */}
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-[2px] rounded-xl">
                        <div className="bg-slate-900 rounded-xl">
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <span className="text-xl">💰</span>
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-white">Pricing Plans</h3>
                                <p className="text-xs text-purple-400">Choose Your Package</p>
                              </div>
                            </div>
                            <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                              {pricingPlans.map((plan) => (
                                <Link
                                  key={plan.slug}
                                  href={`/${plan.slug}`}
                                  className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:bg-purple-500/10 hover:text-purple-400 transition-all rounded-lg group/item"
                                >
                                  <span className="group-hover/item:pl-1 transition-all">{plan.name}</span>
                                  <span className="text-xs text-purple-500 font-semibold">{plan.price}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <Link
                href="/products"
                className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
              >
                Products
              </Link>
              
              {/* Info/Company Dropdown */}
              {infoPages.length > 0 && (
              <div className="relative group">
                <div 
                  className="flex items-center gap-1 cursor-pointer"
                  onMouseEnter={handleInfoEnter}
                  onMouseLeave={handleInfoLeave}
                >
                  <Link
                    href="/pages"
                    className="text-sm font-medium text-white hover:text-teal-400 transition-colors"
                  >
                    Pages
                  </Link>
                  <ChevronDown className="h-4 w-4 text-white group-hover:text-orange-400 transition-colors" />
                </div>
                
                {/* Info Dropdown Menu */}
                {isInfoOpen && (
                  <div 
                    className="absolute left-0 top-full mt-3 w-80 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up"
                    onMouseEnter={handleInfoEnter}
                    onMouseLeave={handleInfoLeave}
                    style={{ zIndex: 9999 }}
                  >
                    {/* Gradient Border Effect */}
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-[2px] rounded-xl">
                      <div className="bg-slate-900 rounded-xl">
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                              <span className="text-xl">📄</span>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white">Company Info</h3>
                              <p className="text-xs text-orange-400">About & Support</p>
                            </div>
                          </div>
                          <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                            {infoPages.map((page) => (
                              <Link
                                key={page.id}
                                href={`/${page.slug}`}
                                className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 transition-all rounded-lg hover:pl-5"
                              >
                                {cleanPageTitle(page.title.rendered)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )}
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex lg:hidden items-center justify-center text-white hover:text-teal-400 transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="fixed top-20 right-4 left-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-[95] lg:hidden animate-fade-in-up overflow-hidden">
              <div className="max-h-[calc(100vh-120px)] overflow-y-auto p-6 space-y-4">
                
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-white hover:bg-teal-500/10 hover:text-teal-400 rounded-lg transition-all"
                >
                  🏠 Home
                </Link>

                {/* Single Tools Section */}
                {allTools.length > 0 && (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm font-bold text-teal-400 uppercase tracking-wide">
                      🛠️ Single Tools
                    </div>
                    <div className="space-y-1 pl-2 max-h-96 overflow-y-auto">
                      {Object.entries(toolsByCategory).map(([category, tools]) => (
                        <div key={category} className="mb-3">
                          <div className="px-4 py-1 text-xs font-semibold text-slate-500 uppercase">
                            {category}
                          </div>
                          {tools.map((tool) => {
                            const linkHref = getToolLink(tool.id, tool.slug);
                            return (
                              <Link
                                key={tool.id}
                                href={linkHref}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-2 text-sm text-slate-300 hover:bg-teal-500/10 hover:text-teal-400 rounded-lg transition-all"
                              >
                                <span>{tool.name}</span>
                                <span className="text-xs text-teal-500 font-semibold">{tool.price}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing Plans Section */}
                {pricingPlans.length > 0 && (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm font-bold text-purple-400 uppercase tracking-wide">
                      💰 Pricing Plans
                    </div>
                    <div className="space-y-1 pl-2">
                      {pricingPlans.map((plan) => (
                        <Link
                          key={plan.slug}
                          href={`/${plan.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-sm text-slate-300 hover:bg-purple-500/10 hover:text-purple-400 rounded-lg transition-all"
                        >
                          <span>{plan.name}</span>
                          <span className="text-xs text-purple-500 font-semibold">{plan.price}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-white hover:bg-teal-500/10 hover:text-teal-400 rounded-lg transition-all"
                >
                  🛒 Products
                </Link>

                {/* Info/Company Pages Section */}
                {infoPages.length > 0 && (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm font-bold text-orange-400 uppercase tracking-wide">
                      📄 Company Info
                    </div>
                    <div className="space-y-1 pl-2">
                      {infoPages.map((page) => (
                        <Link
                          key={page.id}
                          href={`/${page.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 rounded-lg transition-all"
                        >
                          {cleanPageTitle(page.title.rendered)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href="https://members.seotoolsgroupbuy.us/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
                  >
                    🚀 Get Started Now
                  </a>
                </div>

              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

