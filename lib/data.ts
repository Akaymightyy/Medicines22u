export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export const categories: Category[] = [
  { id: 'pain-relief', name: 'Pain Relief', icon: 'Pill', productCount: 24, color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400' },
  { id: 'skincare', name: 'Skincare', icon: 'Sparkles', productCount: 18, color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400' },
  { id: 'vitamins', name: 'Vitamins', icon: 'Apple', productCount: 32, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400' },
  { id: 'first-aid', name: 'First Aid', icon: 'HeartPulse', productCount: 15, color: 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400' },
  { id: 'cold-flu', name: 'Cold & Flu', icon: 'Thermometer', productCount: 20, color: 'bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400' },
  { id: 'digestive', name: 'Digestive Health', icon: 'CircleDot', productCount: 14, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' },
  { id: 'eye-care', name: 'Eye Care', icon: 'Eye', productCount: 11, color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' },
  { id: 'baby-child', name: 'Baby & Child', icon: 'Baby', productCount: 22, color: 'bg-pink-50 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400' },
];

export const products: Product[] = [
  {
    id: 'ibuprofen-400mg',
    name: 'Ibuprofen 400mg Tablets',
    brand: 'Generic Pharma',
    price: 3.99,
    originalPrice: 5.49,
    category: 'Pain Relief',
    image: 'https://picsum.photos/seed/med1/400/400',
    images: ['https://picsum.photos/seed/med1/400/400', 'https://picsum.photos/seed/med1b/400/400', 'https://picsum.photos/seed/med1c/400/400'],
    rating: 4.7,
    reviewCount: 342,
    description: 'Effective relief from headaches, dental pain, period pain, and rheumatic pain. Each tablet contains 400mg ibuprofen. Suitable for adults and children over 12 years.',
    inStock: true,
    tags: ['bestseller', 'sale'],
  },
  {
    id: 'paracetamol-500mg',
    name: 'Paracetamol 500mg Capsules',
    brand: 'HealthPlus',
    price: 2.49,
    category: 'Pain Relief',
    image: 'https://picsum.photos/seed/med2/400/400',
    images: ['https://picsum.photos/seed/med2/400/400', 'https://picsum.photos/seed/med2b/400/400'],
    rating: 4.9,
    reviewCount: 891,
    description: 'The UK\'s most trusted painkiller. Effective for headaches, migraine, toothache, and cold & flu symptoms. Pack of 32 capsules.',
    inStock: true,
    tags: ['bestseller'],
  },
  {
    id: 'cerave-moisturiser',
    name: 'CeraVe Moisturising Cream',
    brand: 'CeraVe',
    price: 14.99,
    originalPrice: 17.99,
    category: 'Skincare',
    image: 'https://picsum.photos/seed/med3/400/400',
    images: ['https://picsum.photos/seed/med3/400/400', 'https://picsum.photos/seed/med3b/400/400', 'https://picsum.photos/seed/med3c/400/400'],
    rating: 4.8,
    reviewCount: 567,
    description: 'Developed with dermatologists for dry to very dry skin. Contains 3 essential ceramides and hyaluronic acid. 340ml tub with MVE technology for 24-hour hydration.',
    inStock: true,
    tags: ['sale', 'dermatologist-recommended'],
  },
  {
    id: 'vitamin-d3-1000iu',
    name: 'Vitamin D3 1000IU Tablets',
    brand: 'VitaBoost',
    price: 8.99,
    category: 'Vitamins',
    image: 'https://picsum.photos/seed/med4/400/400',
    images: ['https://picsum.photos/seed/med4/400/400', 'https://picsum.photos/seed/med4b/400/400'],
    rating: 4.6,
    reviewCount: 234,
    description: 'Supports healthy bones, teeth, and immune system. High strength Vitamin D3 in an easy-to-swallow tablet. 180 tablets — 6 month supply.',
    inStock: true,
    tags: ['popular'],
  },
  {
    id: 'la-roche-posay',
    name: 'La Roche-Posay Effaclar Duo+',
    brand: 'La Roche-Posay',
    price: 16.99,
    category: 'Skincare',
    image: 'https://picsum.photos/seed/med5/400/400',
    images: ['https://picsum.photos/seed/med5/400/400', 'https://picsum.photos/seed/med5b/400/400'],
    rating: 4.5,
    reviewCount: 423,
    description: 'Anti-blemish moisturiser that targets spots, blackheads, and marks. Enriched with Niacinamide and Salicylic Acid. Suitable for acne-prone skin. 40ml.',
    inStock: true,
    tags: ['dermatologist-recommended'],
  },
  {
    id: 'omega-3-fish-oil',
    name: 'Omega-3 Fish Oil 1000mg',
    brand: 'NatureCare',
    price: 12.99,
    originalPrice: 15.99,
    category: 'Vitamins',
    image: 'https://picsum.photos/seed/med6/400/400',
    images: ['https://picsum.photos/seed/med6/400/400', 'https://picsum.photos/seed/med6b/400/400'],
    rating: 4.4,
    reviewCount: 178,
    description: 'High-strength EPA & DHA fatty acids for heart, brain, and joint health. Triple-strength purified fish oil capsules. 90 capsules.',
    inStock: true,
    tags: ['sale'],
  },
  {
    id: 'first-aid-kit',
    name: 'Steroplast Premium First Aid Kit',
    brand: 'Steroplast',
    price: 14.99,
    category: 'First Aid',
    image: 'https://picsum.photos/seed/med7/400/400',
    images: ['https://picsum.photos/seed/med7/400/400', 'https://picsum.photos/seed/med7b/400/400'],
    rating: 4.8,
    reviewCount: 156,
    description: 'Comprehensive first aid kit in a durable case. Includes bandages, dressings, plasters, scissors, gloves, and antiseptic wipes. HSE compliant.',
    inStock: true,
    tags: ['popular'],
  },
  {
    id: 'sudafed-decongestant',
    name: 'Sudafed Decongestant Tablets',
    brand: 'Sudafed',
    price: 4.99,
    category: 'Cold & Flu',
    image: 'https://picsum.photos/seed/med8/400/400',
    images: ['https://picsum.photos/seed/med8/400/400', 'https://picsum.photos/seed/med8b/400/400'],
    rating: 4.3,
    reviewCount: 289,
    description: 'Fast-acting relief from nasal congestion and sinus pressure. Contains pseudoephedrine hydrochloride. Pack of 12 tablets.',
    inStock: true,
    tags: [],
  },
  {
    id: 'imodium-instants',
    name: 'Imodium Instants Melting Tablets',
    brand: 'Imodium',
    price: 5.49,
    category: 'Digestive Health',
    image: 'https://picsum.photos/seed/med9/400/400',
    images: ['https://picsum.photos/seed/med9/400/400', 'https://picsum.photos/seed/med9b/400/400'],
    rating: 4.6,
    reviewCount: 312,
    description: 'Dissolves instantly on the tongue for rapid relief from diarrhoea. Works in under 1 hour. Pack of 6 melt-in-the-mouth tablets.',
    inStock: true,
    tags: ['popular'],
  },
  {
    id: 'optrex-eye-drops',
    name: 'Optrex Bloodshot Eye Drops',
    brand: 'Optrex',
    price: 4.99,
    category: 'Eye Care',
    image: 'https://picsum.photos/seed/med10/400/400',
    images: ['https://picsum.photos/seed/med10/400/400', 'https://picsum.photos/seed/med10b/400/400'],
    rating: 4.2,
    reviewCount: 145,
    description: 'Relieves red, bloodshot eyes caused by minor eye irritation. Contains hamamelis water (witch hazel). 10ml bottle.',
    inStock: true,
    tags: [],
  },
  {
    id: 'calpol-six-plus',
    name: 'Calpol Six Plus Suspension',
    brand: 'Calpol',
    price: 5.99,
    category: 'Baby & Child',
    image: 'https://picsum.photos/seed/med11/400/400',
    images: ['https://picsum.photos/seed/med11/400/400', 'https://picsum.photos/seed/med11b/400/400'],
    rating: 4.9,
    reviewCount: 678,
    description: 'Strawberry-flavoured paracetamol suspension for children aged 6 and over. Effective pain and fever relief. 100ml bottle with oral syringe.',
    inStock: true,
    tags: ['bestseller'],
  },
  {
    id: 'nurofen-express',
    name: 'Nurofen Express Liquid Capsules',
    brand: 'Nurofen',
    price: 5.99,
    originalPrice: 7.49,
    category: 'Pain Relief',
    image: 'https://picsum.photos/seed/med12/400/400',
    images: ['https://picsum.photos/seed/med12/400/400', 'https://picsum.photos/seed/med12b/400/400'],
    rating: 4.5,
    reviewCount: 456,
    description: 'Absorbed up to twice as fast as standard ibuprofen tablets. Rapid relief from headache, dental pain, and period pain. Pack of 16 capsules.',
    inStock: true,
    tags: ['sale'],
  },
  {
    id: 'e45-itch-cream',
    name: 'E45 Itch Relief Cream',
    brand: 'E45',
    price: 6.49,
    category: 'Skincare',
    image: 'https://picsum.photos/seed/med13/400/400',
    images: ['https://picsum.photos/seed/med13/400/400', 'https://picsum.photos/seed/med13b/400/400'],
    rating: 4.4,
    reviewCount: 198,
    description: 'Clinically proven to soothe itchy, dry, and irritated skin. Contains lauromacrogols for local anaesthetic effect. 50g tube.',
    inStock: true,
    tags: [],
  },
  {
    id: 'multivitamin-daily',
    name: 'Complete Multivitamin Daily',
    brand: 'VitaBoost',
    price: 9.99,
    category: 'Vitamins',
    image: 'https://picsum.photos/seed/med14/400/400',
    images: ['https://picsum.photos/seed/med14/400/400', 'https://picsum.photos/seed/med14b/400/400'],
    rating: 4.7,
    reviewCount: 445,
    description: 'All-in-one daily multivitamin with 23 essential nutrients including A, B, C, D, E, zinc, and iron. 120 tablets — 4 month supply.',
    inStock: true,
    tags: ['bestseller'],
  },
  {
    id: 'day-night-nurse',
    name: 'Day & Night Nurse Capsules',
    brand: 'Day & Night Nurse',
    price: 6.99,
    category: 'Cold & Flu',
    image: 'https://picsum.photos/seed/med15/400/400',
    images: ['https://picsum.photos/seed/med15/400/400', 'https://picsum.photos/seed/med15b/400/400'],
    rating: 4.3,
    reviewCount: 267,
    description: 'Day capsules relieve cold & flu symptoms without drowsiness. Night capsules relieve symptoms and aid restful sleep. 16 capsules.',
    inStock: true,
    tags: [],
  },
  {
    id: 'anusol-hc-cream',
    name: 'Anusol HC Cream',
    brand: 'Anusol',
    price: 7.49,
    category: 'Skincare',
    image: 'https://picsum.photos/seed/med16/400/400',
    images: ['https://picsum.photos/seed/med16/400/400', 'https://picsum.photos/seed/med16b/400/400'],
    rating: 4.1,
    reviewCount: 89,
    description: 'Contains hydrocortisone for the relief of haemorrhoid symptoms including itching, swelling, and discomfort. 23g tube.',
    inStock: true,
    tags: [],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    text: 'Incredibly fast delivery and the prices are genuinely lower than my local pharmacy. The website is so easy to use — I order all my family\'s essentials here now.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/avatar1/80/80',
  },
  {
    id: 't2',
    name: 'James Cooper',
    text: 'As someone who takes regular medication, Medicine2uuu has been a game-changer. The repeat order feature saves me so much time. Highly recommended.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/avatar2/80/80',
  },
  {
    id: 't3',
    name: 'Priya Sharma',
    text: 'Great range of skincare products at competitive prices. My CeraVe cream arrived next day, perfectly packaged. Will definitely order again.',
    rating: 4,
    avatar: 'https://picsum.photos/seed/avatar3/80/80',
  },
  {
    id: 't4',
    name: 'David Williams',
    text: 'Trusted pharmacy with genuine products. The checkout process is smooth and secure. Better experience than any other online pharmacy I\'ve tried.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/avatar4/80/80',
  },
];

export const brands = ['Generic Pharma', 'HealthPlus', 'CeraVe', 'VitaBoost', 'La Roche-Posay', 'NatureCare', 'Steroplast', 'Sudafed', 'Imodium', 'Optrex', 'Calpol', 'Nurofen', 'E45', 'Day & Night Nurse', 'Anusol'];
