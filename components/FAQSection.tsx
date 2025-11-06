'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What makes SEORDP different?',
      answer: 'We provide shared access to premium software at affordable monthly rates. Our platform ensures reliable service with consistent uptime and dedicated customer support.',
      icon: '🎯',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      question: 'How quickly can I start using the tools?',
      answer: 'Account activation is instant. Once you complete your purchase, you receive immediate access to your selected tools and services through our secure platform.',
      icon: '🤝',
      color: 'from-purple-500 to-pink-500'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and other secure payment methods. All transactions are encrypted and processed through trusted payment gateways.',
      icon: '⚖️',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      question: 'What is your service reliability?',
      answer: 'Our infrastructure maintains exceptional reliability with multiple backup systems. We monitor all services continuously to ensure smooth operation and minimal downtime.',
      icon: '🛡️',
      color: 'from-green-500 to-emerald-500'
    },
    {
      question: 'How flexible are the subscriptions?',
      answer: 'All our plans are month-to-month with complete flexibility. You have full control to upgrade, downgrade, or cancel whenever needed without penalties.',
      icon: '✅',
      color: 'from-amber-500 to-orange-500'
    },
    {
      question: 'How can I get help if needed?',
      answer: 'Our dedicated support team is available around the clock through multiple channels including live chat, email, and ticketing system to assist you promptly.',
      icon: '💬',
      color: 'from-rose-500 to-red-500'
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
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Your Questions,
            <span className="block bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mt-1">
              Our Answers
            </span>
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
              {/* Gradient Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${faq.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-start gap-4 text-left transition-all duration-300"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${faq.color} flex items-center justify-center text-2xl shadow-lg transform transition-transform duration-300 ${
                  openIndex === index ? 'scale-110' : ''
                }`}>
                  {faq.icon}
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

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 card-gradient rounded-2xl">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-3xl shadow-xl animate-float">
              💡
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-white mb-1">Need More Help?</h3>
              <p className="text-slate-400">We're available around the clock to assist you</p>
            </div>
            <a 
              href="#" 
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

