'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, Sparkles, Apple, HeartPulse, Thermometer, CircleDot, Eye, Baby } from 'lucide-react';
import { categories } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Pill, Sparkles, Apple, HeartPulse, Thermometer, CircleDot, Eye, Baby,
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } } };

export default function Categories() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Shop by Category</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Find what you need, quickly and easily</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(cat => {
            const Icon = iconMap[cat.icon] || Pill;
            return (
              <motion.div key={cat.id} variants={item}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="card-hover group flex flex-col items-center gap-3 p-5 text-center sm:p-6"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${cat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{cat.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{cat.productCount} products</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
