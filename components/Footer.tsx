import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      {/* Link row - Noxtools style (Privacy Policy | Contact Us | Terms | Refund | DMCA) */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/privacy-policy-3"
            className="text-slate-400 hover:text-teal-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact-us"
            className="text-slate-400 hover:text-teal-400 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/terms-of-service"
            className="text-slate-400 hover:text-teal-400 transition-colors"
          >
            Terms &amp; Conditions
          </Link>
          <Link
            href="/refund-returns"
            className="text-slate-400 hover:text-teal-400 transition-colors"
          >
            Refund Policy
          </Link>
          <Link
            href="/dmca-policy"
            className="text-slate-400 hover:text-teal-400 transition-colors"
          >
            DMCA
          </Link>
        </div>
      </div>

      {/* Dark copyright bar - Noxtools style */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-slate-400" suppressHydrationWarning>
            Copyright 2023 - {new Date().getFullYear()} All Rights Reserved By SEORDP
          </p>
        </div>
      </div>
    </footer>
  );
}
