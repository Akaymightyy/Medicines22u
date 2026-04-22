import { products } from '@/lib/data';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}
