'use client';

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl animate-float" />
      <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-accent-200/20 dark:bg-accent-900/15 blur-3xl animate-float-delayed" />
      <div className="absolute -bottom-40 right-1/4 h-[450px] w-[450px] rounded-full bg-primary-100/25 dark:bg-primary-800/10 blur-3xl animate-pulse-soft" />
    </div>
  );
}
