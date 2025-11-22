'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Typewriter from './Typewriter';
import ModernReveal from './ModernReveal';
import { getAllTools, getToolById, Tool } from '@/lib/tools-data';
import { WooCommerceProduct } from '@/types/wordpress';
import { getToolProductSlug } from '@/lib/tool-product-matcher';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';

// Why Choose SEORDP Section - Professional Corporate Design
export const WhyChooseSection = () => {
  const features = [
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Enterprise Quality', 
      desc: 'Professional-grade services backed by industry-leading infrastructure and 99.9% uptime guarantee.'
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Instant Activation', 
      desc: 'Zero wait time with immediate access to all services upon purchase. Start working within minutes.'
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Bank-Level Security', 
      desc: 'Advanced encryption and security protocols to protect your data and ensure complete privacy.'
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Global Infrastructure', 
      desc: 'Worldwide presence with local data centers ensuring optimal performance from anywhere.'
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: '24/7 Expert Support', 
      desc: 'Dedicated technical support team available round the clock to assist with any queries.'
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Trusted by Thousands', 
      desc: 'Join over 10,000 satisfied customers who trust our platform for their business needs.'
    },
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <span className="text-teal-400 font-semibold text-sm tracking-wide">WHY CHOOSE SEORDP</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose SEORDP Group Buy SEO Tools?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get instant access to 50+ premium SEO tools including Ahrefs, SEMrush, Moz Pro with 99.9% uptime, 24/7 support, and enterprise-grade security
          </p>
        </div>

        {/* Features Grid - Clean Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Popular Tools Section - Using Local SVG Logos
export const PopularToolsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [toolProductMap, setToolProductMap] = useState<Map<string, string>>(new Map());
  
  // Get tools from lib
  const allToolsData = getAllTools();
  
  // Map to component format - define tools array first
  const tools = [
    {
      name: 'AHREF$',
      id: 'ahrefs',
      price: '$25.00',
      originalPrice: '$99.00',
      image: '/tools/ahrefs-logo.svg',
      description: 'Advanced analysis and optimization toolkit for websites'
    },
    {
      name: 'SEMRU$H',
      id: 'semrush',
      price: '$4.99',
      originalPrice: '$119.95',
      image: '/tools/semrush-logo.svg',
      description: 'Complete digital marketing solution for businesses'
    },
    {
      name: 'Moz Pro',
      id: 'moz',
      price: '$4.99',
      originalPrice: '$99.00',
      image: '/tools/moz-logo.svg',
      description: 'Professional website optimization and tracking software'
    },
    {
      name: 'Canva Pro',
      id: 'canva',
      price: '$4.99',
      originalPrice: '$12.99',
      image: '/tools/canva-logo.svg',
      description: 'Creative design platform with professional resources'
    },
    {
      name: 'ChatGPT Plus',
      id: 'chatgpt-plus',
      price: '$4.99',
      originalPrice: '$20.00',
      image: '/tools/chatgpt-logo.svg',
      description: 'Advanced AI assistant for productivity'
    },
    {
      name: 'RunwayML',
      id: 'runwayml',
      price: '$4.99',
      originalPrice: '$35.00',
      image: '/tools/runwayml-logo.svg',
      description: 'Innovative video creation platform'
    },
    {
      name: 'Netflix',
      id: 'netflix',
      price: '$4.99',
      originalPrice: '$15.99',
      image: '/tools/netflix-logo.svg',
      description: 'Premium streaming entertainment service'
    },
    {
      name: 'Claude',
      id: 'claude',
      price: '$4.99',
      originalPrice: '$20.00',
      image: '/tools/claude-logo.svg',
      description: 'Next-generation AI development assistant'
    },
    {
      name: 'Grammarly',
      id: 'grammarly',
      price: '$4.99',
      originalPrice: '$12.00',
      image: 'https://img.icons8.com/color/96/grammarly.png',
      description: 'AI-powered writing assistant tool'
    },
    {
      name: 'Notion',
      id: 'notion',
      price: '$4.99',
      originalPrice: '$10.00',
      image: 'https://img.icons8.com/fluency/96/notion.png',
      description: 'All-in-one workspace for notes and tasks'
    },
    {
      name: 'Adobe Creative',
      id: 'adobe',
      price: '$9.99',
      originalPrice: '$54.99',
      image: 'https://img.icons8.com/color/96/adobe-creative-cloud.png',
      description: 'Complete creative cloud suite access'
    },
    {
      name: 'Spotify Premium',
      id: 'spotify',
      price: '$3.99',
      originalPrice: '$9.99',
      image: 'https://img.icons8.com/color/96/spotify.png',
      description: 'Ad-free music streaming service'
    },
    {
      name: 'Jasper AI',
      id: 'jasper',
      price: '$4.99',
      originalPrice: '$49.00',
      image: 'https://img.icons8.com/color/96/chatgpt.png',
      description: 'AI content creation and copywriting'
    },
    {
      name: 'Surfer SEO',
      id: 'surfer',
      price: '$4.99',
      originalPrice: '$59.00',
      image: 'https://img.icons8.com/color/96/google-logo.png',
      description: 'Content optimization and SEO platform'
    },
    {
      name: 'Mailchimp',
      id: 'mailchimp',
      price: '$4.99',
      originalPrice: '$20.00',
      image: 'https://img.icons8.com/color/96/email.png',
      description: 'Email marketing automation tool'
    },
    {
      name: 'Hootsuite',
      id: 'hootsuite',
      price: '$4.99',
      originalPrice: '$49.00',
      image: 'https://img.icons8.com/color/96/twitter--v1.png',
      description: 'Social media management platform'
    },
    {
      name: 'Figma Pro',
      id: 'figma',
      price: '$4.99',
      originalPrice: '$15.00',
      image: 'https://img.icons8.com/color/96/figma.png',
      description: 'Professional design and prototyping'
    },
    {
      name: 'HubSpot',
      id: 'hubspot',
      price: '$9.99',
      originalPrice: '$50.00',
      image: 'https://img.icons8.com/color/96/business.png',
      description: 'CRM and marketing automation suite'
    },
    {
      name: 'QuillBot',
      id: 'quillbot',
      price: '$3.99',
      originalPrice: '$9.95',
      image: 'https://img.icons8.com/color/96/documents.png',
      description: 'AI paraphrasing and writing tool'
    },
    {
      name: 'Midjourney',
      id: 'midjourney',
      price: '$4.99',
      originalPrice: '$30.00',
      image: 'https://img.icons8.com/color/96/image-gallery.png',
      description: 'AI image generation and art creation'
    },
    {
      name: 'Envato Elements',
      id: 'envato',
      price: '$4.99',
      originalPrice: '$16.50',
      image: 'https://img.icons8.com/color/96/design.png',
      description: 'Unlimited creative assets and templates'
    },
    {
      name: 'Buzzsumo',
      id: 'buzzsumo',
      price: '$4.99',
      originalPrice: '$99.00',
      image: 'https://img.icons8.com/color/96/graph.png',
      description: 'Content research and social analytics'
    },
    {
      name: 'Helium 10',
      id: 'helium10',
      price: '$9.99',
      originalPrice: '$97.00',
      image: 'https://img.icons8.com/color/96/amazon.png',
      description: 'Complete Amazon seller toolkit'
    },
    {
      name: 'Leonardo.AI',
      id: 'leonardo',
      price: '$4.99',
      originalPrice: '$10.00',
      image: 'https://img.icons8.com/color/96/artificial-intelligence.png',
      description: 'AI-powered image generation tool'
    },
    {
      name: 'Freepik Premium',
      id: 'freepik',
      price: '$4.99',
      originalPrice: '$12.99',
      image: 'https://img.icons8.com/color/96/image.png',
      description: 'Million+ graphic resources library'
    },
    {
      name: 'CapCut Pro',
      id: 'capcut',
      price: '$4.99',
      originalPrice: '$9.99',
      image: 'https://img.icons8.com/color/96/video-editing.png',
      description: 'Professional video editing software'
    },
    {
      name: 'InVideo',
      id: 'invideo',
      price: '$4.99',
      originalPrice: '$30.00',
      image: 'https://img.icons8.com/color/96/video.png',
      description: 'Video creation and editing platform'
    },
    {
      name: 'Coursera Plus',
      id: 'coursera',
      price: '$4.99',
      originalPrice: '$59.00',
      image: 'https://img.icons8.com/color/96/graduation-cap.png',
      description: 'Unlimited online courses access'
    },
    {
      name: 'Udemy Pro',
      id: 'udemy',
      price: '$4.99',
      originalPrice: '$19.99',
      image: 'https://img.icons8.com/color/96/udemy.png',
      description: 'Professional course learning platform'
    },
    {
      name: 'Turnitin',
      id: 'turnitin',
      price: '$4.99',
      originalPrice: '$3.00',
      image: 'https://img.icons8.com/color/96/checked-2.png',
      description: 'Plagiarism detection and checking'
    },
    {
      name: 'WordHero',
      id: 'wordhero',
      price: '$4.99',
      originalPrice: '$49.00',
      image: 'https://img.icons8.com/color/96/edit.png',
      description: 'AI writing and content generation'
    },
    {
      name: 'Copy.ai',
      id: 'copyai',
      price: '$4.99',
      originalPrice: '$49.00',
      image: 'https://img.icons8.com/color/96/document.png',
      description: 'AI-powered copywriting assistant'
    },
    {
      name: 'Majestic SEO',
      id: 'majestic',
      price: '$4.99',
      originalPrice: '$99.99',
      image: 'https://img.icons8.com/color/96/link.png',
      description: 'Backlink checker and SEO analysis'
    },
    {
      name: 'SpyFu',
      id: 'spyfu',
      price: '$4.99',
      originalPrice: '$39.00',
      image: 'https://img.icons8.com/color/96/search.png',
      description: 'Competitor research and analysis'
    },
    {
      name: 'Ubersuggest',
      id: 'ubersuggest',
      price: '$4.99',
      originalPrice: '$29.00',
      image: 'https://img.icons8.com/color/96/analytics.png',
      description: 'SEO and keyword research tool'
    },
    {
      name: 'Scribd Premium',
      id: 'scribd',
      price: '$3.99',
      originalPrice: '$11.99',
      image: 'https://img.icons8.com/color/96/book.png',
      description: 'Unlimited books and audiobooks'
    },
    {
      name: 'Prime Video',
      id: 'primevideo',
      price: '$3.99',
      originalPrice: '$8.99',
      image: 'https://img.icons8.com/color/96/amazon-prime-video.png',
      description: 'Amazon streaming entertainment'
    },
    {
      name: 'Prezi',
      id: 'prezi',
      price: '$4.99',
      originalPrice: '$15.00',
      image: 'https://img.icons8.com/color/96/presentation.png',
      description: 'Dynamic presentation software'
    },
    {
      name: 'Epidemic Sound',
      id: 'epidemicsound',
      price: '$4.99',
      originalPrice: '$15.00',
      image: 'https://img.icons8.com/color/96/music.png',
      description: 'Royalty-free music for creators'
    },
    {
      name: 'StoryBlocks',
      id: 'storyblocks',
      price: '$4.99',
      originalPrice: '$40.00',
      image: 'https://img.icons8.com/color/96/movie.png',
      description: 'Stock video and audio library'
    }
  ];

  // Fetch products and match with tools
  useEffect(() => {
    const loadProductsAndMatch = async () => {
      try {
        const { data: fetchedProducts } = await fetchAllProductsComplete();
        if (fetchedProducts) {
          setProducts(fetchedProducts);
          
          // Create map of tool id -> product slug
          const map = new Map<string, string>();
          
          // Match tools from lib
          for (const tool of allToolsData) {
            const productSlug = getToolProductSlug(tool, fetchedProducts);
            if (productSlug) {
              map.set(tool.id, productSlug);
            }
          }
          
          // Also match hardcoded tools array items with products using keyword matching
          const commonWords = ['pro', 'premium', 'plus', 'group', 'buy', 'access', 'tool', 'tools', 'service', 'services', 'plan'];
          
          for (const toolItem of tools) {
            // Skip if already matched from lib tools
            if (map.has(toolItem.id)) continue;
            
            // Try to find matching product by name, slug, or keywords
            const toolNameNormalized = toolItem.name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\$/g, 's');
            const toolIdNormalized = toolItem.id.toLowerCase().replace(/[^a-z0-9]/g, '');
            
            // Extract keywords from tool name/id
            const toolKeywords = [
              ...toolNameNormalized.split(/[\s\-_]+/).filter(w => w.length >= 2 && !commonWords.includes(w)),
              ...toolIdNormalized.split(/[\s\-_]+/).filter(w => w.length >= 2 && !commonWords.includes(w))
            ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
            
            for (const product of fetchedProducts) {
              const productNameNormalized = product.name.toLowerCase().replace(/[^a-z0-9]/g, '');
              const productSlugNormalized = product.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
              
              // Extract keywords from product name/slug
              const productKeywords = [
                ...productNameNormalized.split(/[\s\-_]+/).filter(w => w.length >= 2 && !commonWords.includes(w)),
                ...productSlugNormalized.split(/[\s\-_]+/).filter(w => w.length >= 2 && !commonWords.includes(w))
              ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
              
              // Check exact matches first
              if (
                toolNameNormalized === productNameNormalized ||
                toolIdNormalized === productSlugNormalized ||
                toolNameNormalized === productSlugNormalized ||
                toolIdNormalized === productNameNormalized
              ) {
                map.set(toolItem.id, product.slug);
                break;
              }
              
              // Check partial matches
              if (
                toolNameNormalized.includes(productNameNormalized) ||
                productNameNormalized.includes(toolNameNormalized) ||
                toolIdNormalized.includes(productSlugNormalized) ||
                productSlugNormalized.includes(toolIdNormalized)
              ) {
                const minLength = Math.min(toolNameNormalized.length, productNameNormalized.length);
                if (minLength >= 3) {
                  map.set(toolItem.id, product.slug);
                  break;
                }
              }
              
              // Check keyword matches
              const matchingKeywords = toolKeywords.filter(kw => 
                productKeywords.some(pkw => 
                  kw === pkw || 
                  (kw.length >= 3 && pkw.length >= 3 && (kw.includes(pkw) || pkw.includes(kw)))
                )
              );
              
              // If we have at least one meaningful keyword match (at least 3 chars)
              if (matchingKeywords.length > 0 && matchingKeywords.some(kw => kw.length >= 3)) {
                map.set(toolItem.id, product.slug);
                break;
              }
            }
          }
          
          setToolProductMap(map);
        }
        } catch (error) {
          if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            console.error('Error loading products for tool matching:', error);
          }
        }
    };
    
    loadProductsAndMatch();
  }, [allToolsData, tools]);

  const displayedTools = showAll ? tools : tools.slice(0, 20);

  return (
    <section id="popular-tools" className="section-padding bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-responsive-4xl font-bold text-white mb-4">
            <ModernReveal 
              text="50+ Premium SEO Tools & Services" 
              delay={500}
              repeatDelay={8000}
              className="text-teal-400"
            />
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Access Ahrefs, SEMrush, Moz Pro, ChatGPT Plus, Canva Pro & more at 90% discount. Best group buy SEO tools 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {displayedTools.map((tool, index) => {
            // Get tool from lib to get proper slug
            const toolData = getToolById(tool.id);
            
            // Check if this tool has a matching product - use product slug if found
            const productSlug = toolProductMap.get(tool.id);
            const linkSlug = productSlug || (toolData ? toolData.slug : tool.id);
            
            return (
              <Link
                key={index}
                href={`/${linkSlug}`}
                className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 group animate-fade-in-up hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 block cursor-pointer h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div 
                    className={`w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto bg-white p-3 group-hover:scale-110 transition-transform duration-300 ${
                      index % 3 === 0 ? 'animate-float' : index % 3 === 1 ? 'animate-float-delay-1' : 'animate-float-delay-2'
                    }`}
                  >
                    <img
                      src={tool.image}
                      alt={`${tool.name} - ${tool.description} - Group Buy SEO Tool`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-teal-400 transition-colors duration-300">{tool.name}</h3>
                  <p className="text-slate-400 text-sm text-center mb-6">{tool.description}</p>
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-teal-400">{tool.price}</span>
                    <div className="text-sm text-slate-500">vs {tool.originalPrice}</div>
                  </div>
                  <div className="mt-auto">
                    <div className="block w-full btn-primary py-3 text-center pointer-events-none">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        {tools.length > 20 && (
          <div className="text-center mt-12 animate-fade-in-up">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              {showAll ? (
                <>
                  Show Less
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  View More Tools ({tools.length - 20} more)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Testimonials Section - Tandym Style (Dark Theme)
export const TestimonialsSection = () => {
  const [showMore, setShowMore] = useState(false);
  
  const facebookReviews = [
    { name: 'Sarah K.', rating: 5, review: 'Setting up my SEORDP account was incredibly easy. The platform is user-friendly and intuitive for browsing tools, checkout, and managing my subscription. Looking forward to them expanding their tool library even more!' },
    { name: 'Ahmed R.', rating: 5, review: 'I had a great experience with SEORDP when subscribing to Ahrefs. The transaction was seamless, I got instant access to the tool, paid my monthly bill without hassle, and even earned reward points!' },
    { name: 'Maria S.', rating: 5, review: 'Quick and seamless! I set up my SEORDP account with SEMrush in less than 5 minutes and started using it right away. Plus, I am earning rewards with every payment which is an added bonus!' },
  ];

  const trustpilotReviews = [
    { name: 'John M.', rating: 5, review: 'Outstanding quality and exceptional customer support. The enterprise features have helped scale our operations efficiently. Worth every penny for our business!' },
    { name: 'Lisa W.', rating: 5, review: 'Best decision for my business growth. Professional service throughout with consistent results. The platform is reliable and feature-rich for all our marketing needs.' },
    { name: 'David C.', rating: 5, review: 'Impressive platform with powerful features and tools. The integration capabilities have streamlined our workflow significantly and saved us countless hours!' },
  ];

  const displayedTrustpilot = showMore ? [...trustpilotReviews, 
    { name: 'Emma R.', rating: 5, review: 'Fantastic experience! Easy setup and reliable performance. The customer support team is incredibly responsive and helpful.' },
    { name: 'Michael B.', rating: 5, review: 'Top-notch service with great customer care. Highly satisfied!' },
    { name: 'Sophie L.', rating: 4, review: 'Great platform with useful features. Professional and reliable.' }
  ] : trustpilotReviews;

  return (
    <section className="py-24 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Facebook Section - Tandym Style */}
        <div className="mb-20">
          {/* Header with Stats Card */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left: Text */}
            <div>
              <div className="text-blue-400 font-semibold text-sm tracking-wide mb-4">LOVED BY USERS</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Loved by your best customers
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                We&apos;re obsessed with delivering outstanding customer experiences that are a reflection of your brand.
              </p>
            </div>

            {/* Right: Rating Card */}
            <div className="flex justify-end">
              <div className="bg-white rounded-2xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 w-64">
                <div className="text-6xl font-black text-slate-900 mb-2">4.9</div>
                <div className="text-lg font-bold text-slate-700">Industry-leading Rating</div>
                <div className="text-sm text-slate-500 mt-1">As of November 2024</div>
              </div>
            </div>
          </div>

          {/* Divider with Platform */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-slate-800 px-6 py-2 flex items-center gap-3">
                <span className="text-slate-400 text-sm">All 5-star reviews on</span>
                <div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-white text-sm font-bold">Facebook</span>
                </div>
              </div>
            </div>
          </div>

          {/* Facebook Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facebookReviews.map((review, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trustpilot Section - Tandym Style */}
        <div>
          {/* Divider with Platform */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-slate-800 px-6 py-2 flex items-center gap-3">
                <span className="text-slate-400 text-sm">All 5-star reviews on</span>
                <div className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-white text-sm font-bold">Trustpilot</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trustpilot Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {displayedTrustpilot.map((review, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-green-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="inline-block text-white font-semibold border-b-2 border-white hover:text-teal-400 hover:border-teal-400 transition-colors pb-1"
            >
              {showMore ? 'Show less reviews' : 'See more reviews'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// How to Order Section - Modern Timeline Design
export const HowToOrderSection = () => {
  const steps = [
    { 
      step: 1, 
      title: 'Choose Your Plan', 
      desc: 'Browse our service packages and select the one that perfectly fits your needs and goals.',
      logo: '/tools/seo-tools.svg',
      gradient: 'from-teal-500 to-teal-600'
    },
    { 
      step: 2, 
      title: 'Create Account', 
      desc: 'Quick registration process with secure data handling. Your information stays private and protected.',
      logo: '/tools/user-friendly.svg',
      gradient: 'from-teal-500 to-teal-600'
    },
    { 
      step: 3, 
      title: 'Start Instantly', 
      desc: 'Complete payment and get immediate access. Begin using premium features right away with zero delay.',
      logo: '/tools/instant-access.svg',
      gradient: 'from-teal-500 to-teal-600'
    },
  ];

  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <span className="text-teal-400 font-bold text-sm">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get Started in
            <span className="block bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mt-1">
              3 Easy Steps
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Simple process to unlock premium access within minutes
          </p>
        </div>

        {/* Timeline Steps - Vertical with Connection Lines */}
        <div className="max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div 
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-24 w-0.5 h-20 bg-gradient-to-b from-teal-500 to-teal-600 opacity-30 hidden md:block"></div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Number Circle */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center shadow-2xl`}>
                      <span className="text-white text-3xl font-black">{item.step}</span>
                    </div>
                    {/* Glow */}
                    <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} blur-xl opacity-40`}></div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1">
                  <div className="card-gradient p-6 rounded-2xl border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 group">
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-teal-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
