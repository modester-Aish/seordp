'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What makes SEORDP different?',
      answer: 'We provide shared access to premium software at affordable monthly rates. Our platform ensures reliable service with consistent uptime and dedicated customer support.',
      logo: 'https://img.icons8.com/color/96/star--v1.png'
    },
    {
      question: 'How quickly can I start using the tools?',
      answer: 'Account activation is instant. Once you complete your purchase, you receive immediate access to your selected tools and services through our secure platform.',
      logo: 'https://img.icons8.com/color/96/rocket.png'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and other secure payment methods. All transactions are encrypted and processed through trusted payment gateways.',
      logo: 'https://img.icons8.com/color/96/bank-card-back-side.png'
    },
    {
      question: 'What is your service reliability?',
      answer: 'Our infrastructure maintains exceptional reliability with multiple backup systems. We monitor all services continuously to ensure smooth operation and minimal downtime.',
      logo: 'https://img.icons8.com/color/96/shield.png'
    },
    {
      question: 'How flexible are the subscriptions?',
      answer: 'All our plans are month-to-month with complete flexibility. You have full control to upgrade, downgrade, or cancel whenever needed without penalties.',
      logo: 'https://img.icons8.com/color/96/calendar.png'
    },
    {
      question: 'How can I get help if needed?',
      answer: 'Our dedicated support team is available around the clock through multiple channels including live chat, email, and ticketing system to assist you promptly.',
      logo: 'https://img.icons8.com/color/96/chat.png'
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
            <span className="text-2xl">❓</span>
            <span className="text-sm font-bold text-teal-400 uppercase tracking-wide">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Questions, Our Answers
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services and platform
          </p>
        </div>

        {/* FAQ Grid - 2 Columns on Large Screens */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`group relative card-gradient overflow-hidden transition-all duration-300 animate-fade-in-up ${
                openIndex === index ? 'ring-2 ring-teal-500/50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-start gap-4 text-left transition-all duration-300"
              >
                {/* Logo */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                  openIndex === index ? 'scale-110' : ''
                }`}>
                  <img 
                    src={faq.logo}
                    alt={faq.question}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Question */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
                    {faq.question}
                  </h3>
                  {openIndex !== index && (
                    <p className="text-sm text-slate-500">Click to expand</p>
                  )}
                </div>

                {/* Chevron */}
                <ChevronDown 
                  className={`flex-shrink-0 h-6 w-6 text-teal-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 pl-[88px]">
                  <div className="border-l-2 border-teal-500/30 pl-4">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

