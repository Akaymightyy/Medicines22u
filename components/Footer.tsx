import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=Pain Relief', label: 'Pain Relief' },
  { href: '/shop?category=Skincare', label: 'Skincare' },
  { href: '/shop?category=Vitamins', label: 'Vitamins' },
];

const categories = [
  { href: '/shop?category=Pain Relief', label: 'Pain Relief' },
  { href: '/shop?category=Skincare', label: 'Skincare' },
  { href: '/shop?category=Vitamins', label: 'Vitamins & Supplements' },
  { href: '/shop?category=First Aid', label: 'First Aid' },
  { href: '/shop?category=Cold & Flu', label: 'Cold & Flu' },
  { href: '/shop?category=Digestive Health', label: 'Digestive Health' },
];

const helpLinks = [
  { href: '#', label: 'FAQs' },
  { href: '#', label: 'Delivery Info' },
  { href: '#', label: 'Returns Policy' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms & Conditions' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-max section-padding !py-12 lg:!py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
                <span className="text-lg font-black leading-none">M</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Medicine<span className="text-primary-600">2uuu</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Your trusted online pharmacy. Licensed, regulated, and committed to making healthcare accessible and affordable for everyone in the UK.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <ShieldCheck size={16} className="text-primary-600" />
              <span>GPhC Registered Pharmacy</span>
            </div>
            <div className="mt-4 space-y-2">
              <a href="mailto:hello@medicine2uuu.com" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                <Mail size={14} /> hello@medicine2uuu.com
              </a>
              <a href="tel:+442012345678" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                <Phone size={14} /> 020 1234 5678
              </a>
              <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={14} /> London, United Kingdom
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Categories</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Customer Service</h3>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Medicine2uuu. All rights reserved. GPhC Registration Number: 9012345
          </p>
          <div className="flex items-center gap-4">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map(m => (
              <span key={m} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
