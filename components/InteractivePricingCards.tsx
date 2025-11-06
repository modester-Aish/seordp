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
    benefits: [
      'Complete SEO Suite',
      'AI Writing Tools',
      'Design & Graphics'
    ],
    tools: [
      'SEMRUSH Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 'SerpState', 
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
    name: 'AHREF$ COMBO',
    price: '$25',
    toolCount: '60+ Tools',
    description: 'Best value package',
    icon: '⚡',
    iconBgColor: 'from-orange-500 to-orange-600',
    benefits: [
      'Premium SEO Tools',
      'Advanced Analytics',
      'Content Creation'
    ],
    tools: [
      'AHREFS', 'SEMRUSH Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 
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
    benefits: [
      'All Premium Tools',
      'E-commerce Suite',
      'Learning Platform'
    ],
    tools: [
      'AHREFS', 'SEMRUSH Guru', 'MOZ Pro', 'Majestic', 'Kwfinder', 'Keywordtool io', 'Ubersuggest', 
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
    toolCount: 'SEMRUSH Combo, 20+ Tools',
    description: 'Essential tools',
    icon: '⭐',
    iconBgColor: 'from-blue-500 to-blue-600',
    benefits: [
      'Essential SEO',
      'Basic Design',
      'Entertainment'
    ],
    tools: [
      'SEMRUSH Guru', 'MOZ Pro', 'Ubersuggest', 'Woorank', 'Grammarly', 'WordAi', 'Quillbot', 'Canva', 
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingData.map((card, index) => (
            <div
              key={index}
              className="relative h-[500px] animate-fade-in-up"
              style={{ 
                perspective: '1000px',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className="relative w-full h-full transition-all duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front Side - Dark Theme */}
                <div
                  className="absolute w-full h-full card-gradient p-6 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {card.isPopular && (
                    <div className="absolute -top-3 right-4 px-4 py-2 rounded-full text-sm font-bold text-white z-50 animate-bounce-gentle shadow-lg"
                         style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${card.iconBgColor} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 animate-float`}>
                      {card.icon}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    {card.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-center text-sm mb-4">
                    {card.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-teal-400">{card.price}</span>
                    <span className="text-slate-400 text-lg">/month</span>
                  </div>

                  {/* Tool Count */}
                  <div className="text-center mb-6">
                    <span className="text-sm font-semibold text-slate-300">{card.toolCount}</span>
                  </div>

                  {/* Benefits */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {card.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 text-teal-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Tools Button */}
                  <button
                    onClick={() => handleViewTools(index)}
                    className="text-teal-400 underline text-sm font-medium mb-4 hover:text-teal-300 transition-colors"
                  >
                    View included tools →
                  </button>

                  {/* Get Access Button */}
                  <Link
                    href="/products"
                    className={`w-full py-3 rounded-lg font-semibold text-center block transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      card.isPopular
                        ? 'hero-btn-primary'
                        : 'btn-primary'
                    }`}
                  >
                    Get Instant Access
                  </Link>
                </div>

                {/* Back Side - Dark Theme */}
                <div
                  className="absolute w-full h-full card-gradient p-6"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Return instruction */}
                    <div className="text-slate-400 text-sm mb-4">
                      ← Hover out to return
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4">
                      {card.name} Tools
                    </h3>

                    {/* Tools List */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '400px' }}>
                      <div className="grid grid-cols-2 gap-2">
                        {card.tools.map((tool, i) => (
                          <div key={i} className="flex items-start text-sm">
                            <svg className="w-4 h-4 text-teal-400 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-slate-300">{tool}</span>
                          </div>
                        ))}
                      </div>
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

