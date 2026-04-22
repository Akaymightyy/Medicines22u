import { HeroSection } from '@/components/sections/HeroSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { Testimonials } from '@/components/sections/Testimonials';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <TrustBadges />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
