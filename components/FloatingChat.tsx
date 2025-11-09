'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your actual contact details
  const whatsappNumber = '+923001234567'; // Your WhatsApp number
  const facebookPageUrl = 'https://facebook.com/seordp'; // Your Facebook page
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in your SEO tools.`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Options Box */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-72 mb-2 animate-fade-in-up">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-700 p-4">
              <h3 className="text-white font-bold text-base">💬 Chat with us</h3>
              <p className="text-slate-400 text-sm">We&apos;re here to help</p>
            </div>

            {/* Chat Buttons */}
            <div className="p-4 space-y-3">
              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">WhatsApp</h4>
                  <p className="text-white/80 text-xs">Chat instantly</p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">Facebook</h4>
                  <p className="text-white/80 text-xs">Message us</p>
                </div>
              </a>
            </div>

            {/* Footer */}
            <div className="bg-slate-900 px-4 py-2 text-center border-t border-slate-700">
              <p className="text-xs text-slate-500">Quick response guaranteed</p>
            </div>
          </div>
        </div>
      )}

      {/* Simple Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-slate-700 hover:bg-slate-600' 
            : 'bg-teal-500 hover:bg-teal-600 hover:scale-110'
        }`}
        aria-label="Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        
        {/* Small notification dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </button>
    </div>
  );
}

