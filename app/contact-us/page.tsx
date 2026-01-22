import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Mail, Clock, MapPin, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { generateCanonicalUrl } from '@/lib/canonical';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | SEORDP',
  description: 'Get in touch with SEORDP. Email support, business hours, social media. We aim to respond within 24 hours. Contact us for SEO tools, group buy, or partnerships.',
  keywords: 'contact SEORDP, support, customer service, SEO tools support, group buy help',
  alternates: { canonical: generateCanonicalUrl('/contact-us') },
  openGraph: {
    title: 'Contact Us | SEORDP',
    description: 'Get in touch with SEORDP. Email support, business hours, social media. We respond within 24 hours.',
    url: 'https://seordp.net/contact-us',
    type: 'website',
  },
};

const SUPPORT_EMAIL = 'support@seordp.net';

const socialLinks = [
  { href: 'https://www.facebook.com/seordp', label: 'Facebook', Icon: Facebook },
  { href: 'https://twitter.com/seordp', label: 'Twitter/X', Icon: Twitter },
  { href: 'https://www.instagram.com/seordp', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.linkedin.com/company/seordp', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.youtube.com/@seordp', label: 'YouTube', Icon: Youtube },
];

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="section-padding relative overflow-hidden">
        {/* Matrix Background */}
        <div className="absolute inset-0 matrix-container opacity-5">
          <div className="matrix-grid" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Hero / Header */}
          <header className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <MessageCircle className="h-4 w-4 text-teal-400" />
              <span className="text-sm font-bold text-teal-400 uppercase tracking-wide">Get in touch</span>
            </div>
            <h1 className="text-responsive-4xl font-bold tracking-tight text-white mb-4">
              Contact Us
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We&apos;re here to help. Reach out for support, partnerships, or feedback. We aim to respond within 24 hours on business days.
            </p>
          </header>

          {/* Main: Form + Contact Info */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 mb-16">
            {/* Contact Form - 3 cols */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <ContactForm />
            </div>

            {/* Contact Info Cards - 2 cols */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Email */}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="block card-gradient p-6 rounded-2xl border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                    <Mail className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <p className="text-slate-400 text-sm mb-2">General inquiries & support</p>
                    <span className="text-teal-400 group-hover:text-teal-300 font-medium break-all">{SUPPORT_EMAIL}</span>
                  </div>
                </div>
              </a>

              {/* Business Hours */}
              <div className="card-gradient p-6 rounded-2xl border-2 border-slate-700 hover:border-teal-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Business Hours</h3>
                    <ul className="text-slate-400 text-sm space-y-1">
                      <li><strong className="text-slate-300">Mon – Fri:</strong> 9:00 AM – 6:00 PM (GMT)</li>
                      <li><strong className="text-slate-300">Sat:</strong> 10:00 AM – 4:00 PM (GMT)</li>
                      <li><strong className="text-slate-300">Sun:</strong> Closed</li>
                    </ul>
                    <p className="text-teal-400/90 text-sm mt-2">We respond within 24 hours on business days.</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card-gradient p-6 rounded-2xl border-2 border-slate-700 hover:border-teal-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">Address</h3>
                    <p className="text-slate-400 text-sm">
                      <strong className="text-slate-300">SEORDP</strong><br />
                      For written correspondence, please email us at{' '}
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal-400 hover:text-teal-300 underline">
                        {SUPPORT_EMAIL}
                      </a>
                      . We&apos;ll provide a physical address when needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card-gradient p-6 rounded-2xl border-2 border-slate-700">
                <h3 className="font-bold text-white mb-3">Connect with us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-teal-500/20 hover:text-teal-400 transition-all"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Before Contacting / FAQ Note */}
          <div className="max-w-4xl mx-auto card-gradient p-8 rounded-2xl border border-slate-700 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-bold text-white mb-3">Before contacting us</h2>
            <p className="text-slate-400 mb-4">
              You might find answers in our <Link href="/blog" className="text-teal-400 hover:text-teal-300 underline">blog</Link> or{' '}
              <Link href="/#faq" className="text-teal-400 hover:text-teal-300 underline">FAQ section</Link> on the homepage.
            </p>
            <h3 className="text-lg font-semibold text-white mb-2">Report an issue</h3>
            <p className="text-slate-400">
              If you&apos;re facing technical issues or have concerns about our service, please contact us immediately. We take all reports seriously and work to resolve them promptly.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 hero-btn-primary px-8 py-4 rounded-xl"
            >
              Explore our products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
