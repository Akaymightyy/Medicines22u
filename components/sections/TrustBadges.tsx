'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, Clock, HeartPulse, Award, Lock } from 'lucide-react';

const badges = [
  {
    icon: <Shield size={28} />,
    title: 'GPhC Registered',
    desc: 'Fully licensed and regulated UK pharmacy',
    color: 'brand',
  },
  {
    icon: <Truck size={28} />,
    title: 'Next-Day Delivery',
    desc: 'Order by 4pm for guaranteed next-day delivery',
    color: 'blue',
  },
  {
    icon: <Clock size={28} />,
    title: '24/7 Pharmacist',
    desc: 'Expert advice available around the clock',
    color: 'purple',
  },
  {
    icon: <HeartPulse size={28} />,
    title: 'Health Guarantee',
    desc: 'Only genuine, approved pharmaceutical products',
    color: 'rose',
  },
  {
    icon: <Award size={28} />,
    title: 'Award Winning',
    desc: 'Best Online Pharmacy 2024',
    color: 'amber',
  },
  {
    icon: <Lock size={28} />,
    title: 'Secure Payments',
    desc: 'SSL encrypted with 3D Secure protection',
    color: 'green',
  },
];

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  brand:  { bg: 'bg-brand-50 dark:bg-brand-950/30',   text: 'text-brand-600',  ring: 'ring-brand-100' },
  blue:   { bg: 'bg-blue-50 dark:bg-blue-950/30',     text: 'text-blue-600',   ring: 'ring-blue-100' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-600', ring: 'ring-purple-100' },
  rose:   { bg: 'bg-rose-50 dark:bg-rose-950/30',     text: 'text-rose-500',   ring: 'ring-rose-100' },
  amber:  { bg: 'bg-amber-50 dark:bg-amber-950/30',   text: 'text-amber-600',  ring: 'ring-amber-100' },
  green:  { bg: 'bg-green-50 dark:bg-green-950/30',   text: 'text-green-600',  ring: 'ring-green-100' },
};

export function TrustBadges() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-brand-600 font-semibold text-sm mb-2">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-display text-slate-900 dark:text-white">
            Healthcare You Can Trust
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            We're committed to providing safe, effective healthcare products with the highest standards of service and care.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {badges.map((badge, i) => {
            const colors = colorMap[badge.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`p-5 md:p-6 rounded-3xl ${colors.bg} border border-white dark:border-slate-700 shadow-card hover:shadow-medium transition-all duration-300`}
              >
                <div className={`inline-flex p-3 rounded-2xl ${colors.text} bg-white dark:bg-slate-800 shadow-soft ring-4 ${colors.ring} dark:ring-transparent mb-4`}>
                  {badge.icon}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-1">{badge.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
