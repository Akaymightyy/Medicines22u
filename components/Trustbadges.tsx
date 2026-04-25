'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Lock, Headphones } from 'lucide-react';

const badges = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Next-day delivery on orders before 4pm', color: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/50' },
  { icon: ShieldCheck, title: 'Licensed Pharmacy', desc: 'Fully GPhC regulated and inspected', color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50' },
  { icon: Lock, title: 'Secure Checkout', desc: 'SSL encrypted payment processing', color: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-950/50' },
  { icon: Headphones, title: 'Expert Support', desc: 'Pharmacist-led customer service', color: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } } };

export default function TrustBadges() {
  return (
    <section className="section-padding !py-12 lg:!py-16">
      <div className="container-max">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {badges.map(b => (
            <motion.div key={b.title} variants={item} className="card group flex flex-col items-center gap-3 p-6 text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${b.color}`}>
                <b.icon size={22} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{b.title}</h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
