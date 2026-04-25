'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/store';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div initial={false} animate={{ rotate: dark ? 180 : 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }}>
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </motion.button>
  );
}
