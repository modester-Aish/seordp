'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PricingCard {
  name: string;
  price: string;
  toolCount: string;
  description: string;
  icon: string;
  iconBgColor: string;
  benefits: string[];
  tools: string[];
  slug: string; // Plan detail page slug
  isPopular?: boolean;
}

const pricingData: PricingCard[] = [
  {
    name: 'SMALL PLAN',
    price: '$15',
    toolCount: '60+ Tools',
    description: 'Perfect for starters',
    icon: '⭐',
    iconBgColor: 'from-blue-500 to-blue-600',
    slug: 'small-plan',
    benefits: [
      'Complete SEO Suite',
      'AI Writing Tools',
      'Design & Graphics'
    ],
    tools: [
      'SEMrush Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 'SerpState', 
      'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer', 'ChatGPT 4', 'Grammarly', 'WordAi', 
      'Quillbot', 'Spin Rewriter', 'WordHero', 'WordTune', 'SmartCopy', 'CloserCopy', 'Copy ai', 
      'Copymatic ai', 'Jasper Ai', 'WriteSonic', 'Rytr me', 'Jenni ai', 'CANVA pro', 'Crello', 
      'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 'StoryBlocks', 'Designs ai', 'PicsArt', 
      'Fotojet', 'IconScout', 'Renderforest', 'GPL Themes/Plugins', 'Netflix', 'Prime Video', 
      'Chaupal tv', 'Indexification', 'Ecomhunt', 'Salehoo', 'Sell the trend', 'Niche Scraper', 
      'Helium 10', 'Semscoop', 'Buzzsumo', 'Buzzstream', 'Picmonkey', 'Word Tracker', 'Epidemicsound', 
      'Slidebean', 'Motionarray', 'Prezi', 'Udemy', 'Skill Share', 'Turnitin', 'Linkedin Learning', 
      'Coursera', 'Scribd Premium'
    ]
  },
  {
    name: 'Ahrefs Combo',
    price: '$25',
    toolCount: '60+ Tools',
    description: 'Best value package',
    icon: '⚡',
    iconBgColor: 'from-orange-500 to-orange-600',
    slug: 'ahrefs-combo',
    benefits: [
      'Premium SEO Tools',
      'Advanced Analytics',
      'Content Creation'
    ],
    tools: [
      'Ahrefs', 'SEMrush Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 
      'SerpState', 'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer', 'ChatGPT 4', 'Bypass GPT', 
      'Grammarly', 'Quetext premium', 'WordAi', 'Hix ai', 'Quillbot', 'Spin Rewriter', 'WordHero', 
      'WordTune', 'SmartCopy', 'CloserCopy', 'Copymatic ai', 'Jasper Ai', 'WriteSonic', 'Rytr me', 
      'Jenni ai', 'CANVA pro', 'Crello', 'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 
      'Designs ai', 'CAPCUT Pro', 'PicsArt', 'Fotojet', 'IconScout', 'Renderforest', 'Invideo io', 
      'GPL Themes/Plugins', 'Netflix', 'Prime Video', 'Chaupal tv', 'Indexification', 'Ecomhunt', 
      'Sell the trend', 'Niche Scraper', 'Helium 10', 'Semscoop', 'Buzzsumo', 'Picmonkey', 
      'Word Tracker', 'Epidemicsound', 'Slidebean', 'Motionarray', 'Prezi', 'Udemy', 'Skill Share', 
      'Turnitin', 'Coursera', 'Scribd Premium'
    ],
    isPopular: true
  },
  {
    name: 'MEGA PLAN',
    price: '$50',
    toolCount: '80+ Tools',
    description: 'Everything you need',
    icon: '👑',
    iconBgColor: 'from-purple-500 to-purple-600',
    slug: 'mega-plan',
    benefits: [
      'All Premium Tools',
      'E-commerce Suite',
      'Learning Platform'
    ],
    tools: [
      'Ahrefs', 'SEMrush Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 
      'SerpState', 'Answer the public', 'Woorank', 'Spyfu', 'SEOptimer', 'SEOSITECHECKUP', 'ChatGPT 4', 
      'Bypass GPT', 'Grammarly', 'Quetext premium', 'WordAi', 'You Ai', 'Claude Ai', 'Hix Ai', 'Copy Ai', 
      'Jasper Ai', 'Copymatic Ai', 'Stealthwriter Ai', 'Jenni ai', 'Quillbot', 'Spin Rewriter', 'WordHero', 
      'WordTune', 'SmartCopy', 'CloserCopy', 'Writerzen', 'WriteSonic', 'Rytr me', 'CANVA pro', 'Crello', 
      'Envato Elements', 'Leonardo.AI', 'Freepik', 'Vecteezy', 'StoryBlocks', 'Designs ai', 'CAPCUT Pro', 
      'PicsArt', 'Fotojet', 'Invideo io', 'IconScout', 'Renderforest', 'GPL Themes/Plugins', 'Netflix', 
      'Prime Video', 'Chaupal tv', 'Indexification', 'Ecomhunt', 'Sell the trend', 'SaleHoo', 
      'Niche Scraper', 'Helium 10', 'Jungle Scout', 'Viral Launch', 'Semscoop', 'Buzzsumo', 'Buzzstream', 
      'Se Ranking', 'Picmonkey', 'Word Tracker', 'Epidemicsound', 'Slidebean', 'Motionarray', 'Prezi', 
      'Udemy', 'Skill Share', 'Turnitin', 'Linkedin Learning', 'Coursera', 'Scribd Premium'
    ]
  },
  {
    name: 'LITE PLAN',
    price: '$10',
    toolCount: 'SEMrush Combo, 20+ Tools',
    description: 'Essential tools',
    icon: '⭐',
    iconBgColor: 'from-blue-500 to-blue-600',
    slug: 'lite-plan',
    benefits: [
      'Essential SEO',
      'Basic Design',
      'Entertainment'
    ],
    tools: [
      'SEMrush Guru', 'MOZ Pro', 'Ubersuggest', 'Woorank', 'Grammarly', 'WordAi', 'Quillbot', 'Canva', 
      'Crello', 'Envato Elements', 'FotoJet', 'Invideo io', 'Netflix', 'Prime Video', 'Buzzsumo', 
      'Picmonkey', 'Motionarray', 'SkillShare', 'Turnitin', 'Linkedin Learning'
    ]
  },
  {
    name: 'WRITER PLAN',
    price: '$15',
    toolCount: '30+ Tools',
    description: 'For content creators',
    icon: '✍️',
    iconBgColor: 'from-orange-500 to-orange-600',
    slug: 'writer-plan',
    benefits: [
      'AI Writing Suite',
      'Content Tools',
      'Grammar Check'
    ],
    tools: [
      'ChatGPT 4', 'Bypass GPT', 'Grammarly', 'Quetext', 'WordAi', 'You Ai', 'Claude Ai', 'Hix Ai', 
      'Copymatic AI', 'Jasper Ai', 'Copy AI', 'Stealthwriter Ai', 'Jeeni Ai', 'SpinRewriter', 'Quillbot', 
      'WordHero', 'SmartCopy', 'WordTune', 'CloserCopy', 'Writerzen', 'Writesonic', 'Rytr me', 'Canva', 
      'Crello', 'WordTracker', 'Motionarray', 'Prezi', 'Turnitin', 'Coursera', 'Leonardo.AI'
    ]
  },
  {
    name: 'DESIGNER PLAN',
    price: '$10',
    toolCount: '15+ Tools',
    description: 'For designers',
    icon: '🎨',
    iconBgColor: 'from-purple-500 to-purple-600',
    slug: 'designer-plan',
    benefits: [
      'Design Software',
      'Stock Assets',
      'Video Tools'
    ],
    tools: [
      'Canva Pro', 'Crello', 'Envato Elements', 'Freepik', 'Vecteezy', 'Storyblocks', 'Videoblocks', 
      'Audioblocks', 'Designs AI', 'CAPCUT Pro', 'FotoJet', 'Invideo io', 'GPL Themes/Plugins', 
      'Leonardo.AI', 'Renderforest', 'IconScout'
    ]
  }
];

export default function InteractivePricingCards() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleViewTools = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: false }));
  };

  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 matrix-container opacity-5">
        <div className="matrix-grid"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-responsive-4xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get instant access to premium tools at unbeatable prices
          </p>
        </div>

        {/* New style: Linear/Figma inspired – corner ribbon, checkmarks, glass, ring highlight. Flip same. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingData.map((card, index) => (
            <div
              key={index}
              className={`relative animate-fade-in-up ${card.isPopular ? 'h-[520px] lg:-mt-1' : 'h-[500px]'}`}
              style={{ perspective: '1200px', animationDelay: `${index * 0.06}s` }}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className="relative w-full h-full transition-transform duration-500 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front: glass card, top-right corner ribbon, price hero, checkmark list */}
                <div
                  className={`absolute w-full h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                    card.isPopular
                      ? 'ring-2 ring-teal-400/50 bg-slate-800/90 shadow-2xl shadow-teal-500/10 scale-[1.02]'
                      : 'border border-slate-600/60 bg-slate-800/80 backdrop-blur-sm hover:border-slate-500'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Corner ribbon (top-right) – Linear/Figma style accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl`}>
                    <div className={`absolute top-0 right-0 w-28 h-28 rotate-45 translate-x-10 -translate-y-10 bg-gradient-to-br ${card.iconBgColor} opacity-90`} />
                  </div>
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{card.name}</span>
                    <div className="mb-1">
                      <span className="text-4xl font-bold text-white tabular-nums tracking-tight">{card.price}</span>
                    </div>
                    <span className="text-slate-500 text-sm mb-4 block">per month</span>
                    <p className="text-slate-400 text-xs mb-4">{card.toolCount}</p>

                    {/* Checkmark list – Linear/Notion style */}
                    <ul className="flex-1 space-y-2 mb-4">
                      {card.tools.slice(0, 6).map((tool, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center">
                            <span className="text-teal-400 text-[10px] font-bold">✓</span>
                          </span>
                          <span className="truncate">{tool}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleViewTools(index)}
                      className="text-teal-400 text-xs font-medium mb-4 hover:text-teal-300 transition-colors"
                    >
                      View all {card.tools.length} tools →
                    </button>

                    <Link
                      href="https://members.seotoolsgroupbuy.us/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 rounded-xl font-semibold text-sm text-center block transition-all ${
                        card.isPopular
                          ? 'bg-teal-500 text-white hover:bg-teal-400'
                          : 'bg-transparent border-2 border-slate-500 text-white hover:bg-slate-700/50 hover:border-slate-400'
                      }`}
                    >
                      Get started
                    </Link>
                  </div>
                </div>

                {/* Back: gradient header + checkmark list */}
                <div
                  className="absolute w-full h-full rounded-2xl overflow-hidden flex flex-col border border-slate-600/60 bg-slate-800/90"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="h-16 bg-gradient-to-b from-teal-500/20 to-transparent shrink-0" />
                  <div className="p-5 flex flex-col flex-1 min-h-0">
                    <p className="text-slate-500 text-xs mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400/80" /> Hover out to return
                    </p>
                    <h3 className="text-sm font-bold text-white mb-3">{card.name} – All tools</h3>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '340px' }}>
                      <ul className="space-y-1.5">
                        {card.tools.map((tool, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-400 text-xs">
                            <span className="text-teal-400/80">✓</span>
                            <span className="truncate">{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #334155;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0d9488;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #097969;
        }
      `}</style>
    </section>
  );
}

