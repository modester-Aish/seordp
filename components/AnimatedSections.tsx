'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Typewriter from './Typewriter';
import ModernReveal from './ModernReveal';

// Why Choose SEORDP Section - Modern Grid Design
export const WhyChooseSection = () => {
  const features = [
    { 
      icon: '💎', 
      title: 'Premium Quality', 
      desc: 'Enterprise-grade services with professional support and reliability you can trust.',
      gradient: 'from-teal-500 to-cyan-500',
      delay: '0s' 
    },
    { 
      icon: '⚡', 
      title: 'Lightning Fast', 
      desc: 'Instant activation and blazing-fast performance optimized for your workflow.',
      gradient: 'from-purple-500 to-pink-500',
      delay: '0.1s' 
    },
    { 
      icon: '🎯', 
      title: 'Easy to Use', 
      desc: 'Intuitive interface designed for seamless navigation and effortless management.',
      gradient: 'from-amber-500 to-orange-500',
      delay: '0.2s' 
    },
    { 
      icon: '🛡️', 
      title: 'Secure & Safe', 
      desc: 'Bank-level encryption protecting your data with advanced security protocols.',
      gradient: 'from-green-500 to-emerald-500',
      delay: '0.3s' 
    },
    { 
      icon: '🌍', 
      title: 'Global Access', 
      desc: 'Available worldwide with multi-language support and local payment options.',
      gradient: 'from-blue-500 to-indigo-500',
      delay: '0.4s' 
    },
    { 
      icon: '💬', 
      title: 'Expert Support', 
      desc: 'Dedicated support team ready to assist you anytime, anywhere you need help.',
      gradient: 'from-rose-500 to-red-500',
      delay: '0.5s' 
    },
  ];

  return (
    <section className="py-20 relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <span className="text-teal-400 font-bold text-sm">WHY CHOOSE US</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Built for <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">Professionals</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Powerful features and reliable service designed to help you succeed
          </p>
        </div>

        {/* Features Grid - Modern Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative card-gradient p-8 border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: feature.delay }}
            >
              {/* Gradient Top Border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  index % 3 === 0 ? 'animate-float' : index % 3 === 1 ? 'animate-float-delay-1' : 'animate-float-delay-2'
                }`}>
                  {feature.icon}
                </div>
                {/* Glow Effect */}
                <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`}></div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>

              {/* Arrow on Hover */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Popular Tools Section - Using Local SVG Logos
export const PopularToolsSection = () => {
  const tools = [
    {
      name: 'AHREF$',
      id: 'ahrefs',
      price: '$30.00',
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
    }
  ];

  return (
    <section id="popular-tools" className="section-padding bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-responsive-4xl font-bold text-white mb-4">
            <ModernReveal 
              text="Featured Services" 
              delay={500}
              repeatDelay={8000}
              className="text-teal-400"
            />
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Discover our handpicked selection of professional-grade software and premium services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 group animate-fade-in-up hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10">
                <div 
                  className={`w-20 h-20 rounded-2xl overflow-hidden mb-6 mx-auto bg-white p-3 group-hover:scale-110 transition-transform duration-300 ${
                    index % 3 === 0 ? 'animate-float' : index % 3 === 1 ? 'animate-float-delay-1' : 'animate-float-delay-2'
                  }`}
                >
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-teal-400 transition-colors duration-300">{tool.name}</h3>
                <p className="text-slate-400 text-sm text-center mb-6">{tool.description}</p>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-teal-400">{tool.price}</span>
                  <div className="text-sm text-slate-500">vs {tool.originalPrice}</div>
                </div>
                <Link 
                  href="/products"
                  className="block w-full btn-primary py-3 text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section - With Scrolling Reviews
export const TestimonialsSection = () => {
  const facebookReviews = [
    { name: 'Sarah K.', rating: 5, review: 'Excellent platform with reliable service. Very satisfied with my experience!', platform: 'facebook' },
    { name: 'Ahmed R.', rating: 5, review: 'Great value and professional support. Highly recommend to others!', platform: 'facebook' },
    { name: 'Maria S.', rating: 4, review: 'Quick setup and responsive customer service team.', platform: 'facebook' },
    { name: 'James T.', rating: 5, review: 'Reliable platform with excellent features. Very happy customer!', platform: 'facebook' },
    { name: 'Nina P.', rating: 5, review: 'Professional service and great pricing. Exactly what I needed!', platform: 'facebook' },
    { name: 'Carlos M.', rating: 4, review: 'Smooth experience from start to finish. Good support team.', platform: 'facebook' },
  ];

  const trustpilotReviews = [
    { name: 'John M.', rating: 5, review: 'Outstanding quality and exceptional customer support. Worth every penny!', platform: 'trustpilot' },
    { name: 'Lisa W.', rating: 5, review: 'Best decision for my business growth. Professional service throughout!', platform: 'trustpilot' },
    { name: 'David C.', rating: 4, review: 'Impressive platform with powerful features and tools.', platform: 'trustpilot' },
    { name: 'Emma R.', rating: 5, review: 'Fantastic experience! Easy setup and reliable performance.', platform: 'trustpilot' },
    { name: 'Michael B.', rating: 5, review: 'Top-notch service with great customer care. Highly satisfied!', platform: 'trustpilot' },
    { name: 'Sophie L.', rating: 4, review: 'Great platform with useful features. Professional and reliable.', platform: 'trustpilot' },
  ];

  return (
    <section className="py-12 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            What People Are <span className="text-teal-600">Saying</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Authentic reviews from satisfied customers who chose our platform
          </p>
        </div>

        {/* Facebook Reviews */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            Facebook Reviews
          </h3>
          
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-slide-left-to-right">
              {[...facebookReviews, ...facebookReviews].map((review, index) => (
                <div 
                  key={index}
                  className="card-gradient p-4 flex-shrink-0 hover:shadow-xl transition-shadow duration-300"
                  style={{ width: '320px' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trustpilot Reviews */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            Trustpilot Reviews
          </h3>
          
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-slide-left-to-right-delayed">
              {[...trustpilotReviews, ...trustpilotReviews].map((review, index) => (
                <div 
                  key={index}
                  className="card-gradient p-5 flex-shrink-0 hover:shadow-xl transition-shadow duration-300"
                  style={{ width: '350px' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{review.name}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-green-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{review.review}</p>
                </div>
              ))}
            </div>
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
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white p-3 flex items-center justify-center shadow-lg">
                        <img 
                          src={item.logo}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
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
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-4 p-6 card-gradient rounded-2xl border border-teal-500/20">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-2xl shadow-xl animate-float">
              🎉
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg mb-1">Ready to get started?</p>
              <p className="text-slate-400 text-sm">Join thousands of satisfied users today</p>
            </div>
            <Link 
              href="/products" 
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ml-4"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
