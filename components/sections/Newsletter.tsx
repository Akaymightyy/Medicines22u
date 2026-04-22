'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success('You\'re subscribed! Welcome to PharmaPlus.');
  };

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 md:p-14 text-center shadow-brand"
        >
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-2xl bg-white/20 mb-5">
              <Mail size={28} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
              Stay Healthy, Stay Informed
            </h2>
            <p className="text-brand-100 mb-8 max-w-md mx-auto">
              Get exclusive offers, health tips, and new product alerts delivered straight to your inbox.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 text-white text-lg font-semibold"
              >
                <CheckCircle2 size={28} className="text-green-300" />
                You're all signed up!
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-brand-700 font-bold hover:bg-brand-50 transition-colors shadow-lg"
                >
                  Subscribe <ArrowRight size={16} />
                </motion.button>
              </form>
            )}
            <p className="text-brand-200 text-xs mt-4">No spam ever. Unsubscribe at any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
