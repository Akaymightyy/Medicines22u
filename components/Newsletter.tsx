'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-8 sm:p-12 lg:p-16"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/10 blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Stay Healthy, Stay Informed</h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-100">
              Get exclusive offers, health tips, and new product alerts delivered straight to your inbox. No spam, ever.
            </p>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm">
                <CheckCircle2 size={18} /> You&apos;re subscribed! Check your inbox.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0 sm:mx-auto sm:max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 rounded-xl border-0 bg-white/20 px-5 py-3.5 text-sm text-white placeholder:text-primary-200 backdrop-blur-sm outline-none focus:ring-2 focus:ring-white/40 sm:rounded-r-none"
                  aria-label="Email address"
                />
                <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 active:scale-[0.97] sm:rounded-l-none">
                  Subscribe <Send size={15} />
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-primary-200">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
