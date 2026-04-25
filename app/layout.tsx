import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/Toast';
import AnimatedBackground from '@/components/AnimatedBackground';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Medicine2uuu — Your Trusted Online Pharmacy',
  description: 'Order prescription and over-the-counter medicines online. Fast, secure, and delivered to your door from a GPhC licensed UK pharmacy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AnimatedBackground />
          <Navbar />
          <CartDrawer />
          <ToastContainer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
