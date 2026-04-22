import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { FloatingCart } from '@/components/layout/FloatingCart';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'PharmaPlus — Premium Online Pharmacy',
  description: 'Your trusted online pharmacy. Licensed, fast delivery, 5000+ products.',
  keywords: 'online pharmacy, vitamins, supplements, medicines, skincare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-slate-950 min-h-screen">
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
        <FloatingCart />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#1e293b',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: { primary: '#2aacaf', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
