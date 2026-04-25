'use client';

import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import PopularProducts from '@/components/PopularProducts';
import TrustBadges from '@/components/TrustBadges';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Categories />
      <PopularProducts />
      <Testimonials />
      <Newsletter />
    </>
  );
}
