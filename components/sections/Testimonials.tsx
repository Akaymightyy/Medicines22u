'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

export function Testimonials() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-brand-600 font-semibold text-sm mb-2">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-display text-slate-900 dark:text-white">
            Loved by 50,000+ Customers
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
            ))}
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium ml-1">4.9 out of 5</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card hover:shadow-medium transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col"
            >
              <Quote size={24} className="text-brand-200 dark:text-brand-800 mb-3 flex-shrink-0" />
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
