import Link from 'next/link';
import { Shield, Truck, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      {/* Trust bar */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Truck size={22} className="text-brand-400" />, title: 'Free Delivery', desc: 'On orders over £30' },
            { icon: <Shield size={22} className="text-brand-400" />, title: 'Licensed Pharmacy', desc: 'GPhC Registered' },
            { icon: <Phone size={22} className="text-brand-400" />, title: '24/7 Support', desc: 'Expert pharmacists' },
            { icon: <Shield size={22} className="text-green-400" />, title: 'Secure Checkout', desc: 'SSL encrypted payments' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Rx</span>
            </div>
            <span className="font-display text-xl">
              <span className="text-brand-400">Pharma</span>
              <span className="text-white">Plus</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">
            Your trusted online pharmacy. Licensed, accredited, and dedicated to your health. 5000+ products available with next-day delivery.
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p className="flex items-center gap-2"><Mail size={14} /> hello@pharmaplus.co.uk</p>
            <p className="flex items-center gap-2"><Phone size={14} /> 0800 123 4567</p>
            <p className="flex items-center gap-2"><MapPin size={14} /> London, United Kingdom</p>
          </div>
        </div>

        {/* Links */}
        {[
          {
            title: 'Products',
            links: ['Vitamins', 'Pain Relief', 'Skincare', 'Cold & Flu', 'Dental Care', 'First Aid'],
          },
          {
            title: 'Company',
            links: ['About Us', 'Health Blog', 'Careers', 'Press', 'Partners'],
          },
          {
            title: 'Help',
            links: ['Delivery Info', 'Returns', 'Prescriptions', 'Privacy Policy', 'Terms'],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-white mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-slate-400 hover:text-brand-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2025 PharmaPlus Ltd. GPhC Registered Pharmacy No. 1234567. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-brand-400 hover:bg-slate-700 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
