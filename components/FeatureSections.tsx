'use client';

import React from 'react';
import { CheckCircle, Users, Database, Zap } from 'lucide-react';

export default function FeatureSections() {
  return (
    <>
      {/* Feature Section 1 - Image Left, Text Right */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Illustration Placeholder */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-slate-200">
                {/* Abstract Dashboard Illustration */}
                <div className="space-y-4">
                  {/* Header Bar */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 h-4 bg-slate-200 rounded-full"></div>
                    <div className="w-16 h-4 bg-teal-400 rounded-full"></div>
                  </div>
                  
                  {/* Content Rows */}
                  {[1, 2, 3].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gradient-to-r from-orange-300 to-orange-100 rounded-full"></div>
                        <div className="h-3 bg-gradient-to-r from-slate-300 to-slate-100 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Floating Element */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl rotate-12 opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-20 animate-bounce-gentle"></div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="space-y-8">
              {/* Feature 1 */}
              <div>
                <h3 className="text-3xl font-bold text-teal-600 mb-4">
                  Your Custom Feature Title Here
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Add your feature description here. Explain the benefits, use cases, and why this feature is important for your users. Keep it clear, concise, and compelling.
                </p>
              </div>

              {/* Feature 2 */}
              <div>
                <h3 className="text-3xl font-bold text-teal-600 mb-4">
                  Second Feature Title Goes Here
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Describe another related feature or benefit. Use this space to highlight additional value propositions that make your service stand out from competitors.
                </p>
              </div>

              {/* Feature Points */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-slate-600 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Section 2 - Text Left, Image Right */}
      <section className="relative py-20 bg-gradient-to-br from-slate-100 to-white overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Text Content */}
            <div className="space-y-8 lg:order-1">
              {/* Feature 1 */}
              <div>
                <h3 className="text-3xl font-bold text-teal-600 mb-4">
                  Another Amazing Feature Title
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Highlight another key feature of your service. Focus on what makes you different and how you solve specific problems for your target audience.
                </p>
              </div>

              {/* Feature 2 */}
              <div>
                <h3 className="text-3xl font-bold text-teal-600 mb-4">
                  Additional Feature Heading
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Continue building trust and interest by showcasing more capabilities. Use real-world scenarios and tangible benefits that resonate with potential customers.
                </p>
              </div>

              {/* Stats or Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { value: '99%', label: 'Uptime' },
                  { value: '24/7', label: 'Support' },
                  { value: '50+', label: 'Tools' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-black text-teal-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Illustration Placeholder */}
            <div className="relative lg:order-2">
              <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-slate-200">
                {/* Abstract Performance Illustration */}
                <div className="space-y-6">
                  {/* Growth Arrow */}
                  <div className="relative h-48 flex items-end justify-center">
                    <div className="w-32 h-32 bg-gradient-to-t from-teal-400 to-teal-100 rounded-t-3xl relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-teal-400"></div>
                      <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-teal-500" />
                          <div className="h-2 bg-slate-300 rounded-full flex-1"></div>
                        </div>
                        <div className="h-2 bg-orange-300 rounded-full w-2/3"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl rotate-45 opacity-20 animate-bounce-gentle"></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

