'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

const SUPPORT_EMAIL = 'support@seordp.net';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject || 'Contact from SEORDP')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <div className="card-gradient p-6 md:p-8 rounded-2xl border-2 border-slate-700 hover:border-teal-500/30 transition-all duration-300">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Send className="h-5 w-5 text-teal-400" />
        Send us a message
      </h3>
      {submitted ? (
        <div className="space-y-4 text-slate-300">
          <p className="text-teal-400 font-medium">Your email client will open.</p>
          <p className="text-sm">
            If it didn&apos;t open, email us directly at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal-400 hover:text-teal-300 underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setName(''); setEmail(''); setSubject(''); setMessage(''); }}
            className="btn-primary mt-4"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Name <span className="text-teal-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email <span className="text-teal-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Support, Partnership, Feedback"
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              Message <span className="text-teal-400">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-y min-h-[120px]"
            />
          </div>
          <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
            <Send className="h-5 w-5" />
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
