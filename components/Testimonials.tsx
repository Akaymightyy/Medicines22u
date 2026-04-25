'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import Image from 'next/image';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } } };

export default function Testimonials() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/30">
      <div className="container-max">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">What Our Customers Say</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Trusted by thousands of families across the UK</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map(t => (
            <motion.div key={t.id} variants={item} className="card flex flex-col p-6">
              <Quote size={24} className="text-primary-200 dark:text-primary-800 mb-3" />
              <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t.text}</p>
              <div className="mt-4 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'} />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
