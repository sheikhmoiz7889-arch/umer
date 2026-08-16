export const PHONE = '03214826654';
export const PHONE_DISPLAY = '0321 4826654';
export const ADDRESS = 'Malo Bazar, Kot Abdul Malik, Lahore';
export const WHATSAPP = '923214826654';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Baby Collection', href: '#baby' },
  { label: 'Boys (Up to 13Y)', href: '#boys' },
  { label: 'Girls (Up to 13Y)', href: '#girls' },
  { label: 'Reviews (5.0 ★)', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_IMAGES = {
  main: 'https://images.pexels.com/photos/13905951/pexels-photo-13905951.jpeg?auto=compress&cs=tinysrgb&w=900',
  grid1: 'https://images.pexels.com/photos/4715315/pexels-photo-4715315.jpeg?auto=compress&cs=tinysrgb&w=600',
  grid2: 'https://images.pexels.com/photos/8083844/pexels-photo-8083844.jpeg?auto=compress&cs=tinysrgb&w=600',
  grid3: 'https://images.pexels.com/photos/37529058/pexels-photo-37529058.jpeg?auto=compress&cs=tinysrgb&w=600',
  grid4: 'https://images.pexels.com/photos/7330405/pexels-photo-7330405.jpeg?auto=compress&cs=tinysrgb&w=600',
  grid5: 'https://images.pexels.com/photos/18001508/pexels-photo-18001508.jpeg?auto=compress&cs=tinysrgb&w=600',
  grid6: 'https://images.pexels.com/photos/8084066/pexels-photo-8084066.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export const ANNOUNCEMENT_TEXT =
  '✨ Special Discount on Kids Collection   •   Premium Quality Guaranteed   •   📍 Malo Bazar, Kot Abdul Malik, Lahore   •   📞 Call: 0321 4826654';

export type Category = 'baby' | 'boys' | 'girls';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  ageRange: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: 'baby', label: 'Baby Collection', emoji: '👶' },
  { id: 'boys', label: 'Boys (Up to 13Y)', emoji: '👦' },
  { id: 'girls', label: 'Girls (Up to 13Y)', emoji: '👧' },
];

export const PRODUCTS: Product[] = [
  // Baby
  {
    id: 'b1',
    name: 'Cuddly Bear Onesie',
    category: 'baby',
    price: 1290,
    oldPrice: 1790,
    image: 'https://images.pexels.com/photos/28259755/pexels-photo-28259755.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '0-12 months',
    rating: 5.0,
    reviews: 18,
    badge: 'Bestseller',
  },
  {
    id: 'b2',
    name: 'Forest Adventure Romper',
    category: 'baby',
    price: 990,
    oldPrice: 1450,
    image: 'https://images.pexels.com/photos/29015875/pexels-photo-29015875.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '3-18 months',
    rating: 4.9,
    reviews: 12,
    badge: 'New',
  },
  {
    id: 'b3',
    name: 'Cozy Knit Beanie Set',
    category: 'baby',
    price: 750,
    image: 'https://images.pexels.com/photos/3952035/pexels-photo-3952035.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '0-24 months',
    rating: 5.0,
    reviews: 9,
  },
  {
    id: 'b4',
    name: 'Soft Neutral Layette',
    category: 'baby',
    price: 1690,
    oldPrice: 2200,
    image: 'https://images.pexels.com/photos/16681603/pexels-photo-16681603.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '0-6 months',
    rating: 4.8,
    reviews: 7,
  },
  // Boys
  {
    id: 'bo1',
    name: 'Smart Casual Plaid Shirt',
    category: 'boys',
    price: 1490,
    oldPrice: 1990,
    image: 'https://images.pexels.com/photos/7333985/pexels-photo-7333985.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '4-10 years',
    rating: 5.0,
    reviews: 22,
    badge: 'Bestseller',
  },
  {
    id: 'bo2',
    name: 'Dapper Suit Set',
    category: 'boys',
    price: 3490,
    oldPrice: 4900,
    image: 'https://images.pexels.com/photos/30690920/pexels-photo-30690920.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '5-13 years',
    rating: 5.0,
    reviews: 15,
    badge: 'Premium',
  },
  {
    id: 'bo3',
    name: 'Graphic Tee — Cool Kid',
    category: 'boys',
    price: 890,
    image: 'https://images.pexels.com/photos/29247734/pexels-photo-29247734.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '3-12 years',
    rating: 4.9,
    reviews: 31,
  },
  {
    id: 'bo4',
    name: 'Burgundy Smart Shirt',
    category: 'boys',
    price: 1190,
    oldPrice: 1590,
    image: 'https://images.pexels.com/photos/38000175/pexels-photo-38000175.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '5-13 years',
    rating: 5.0,
    reviews: 11,
    badge: 'New',
  },
  {
    id: 'bo5',
    name: 'Formal Bow Tie Suit',
    category: 'boys',
    price: 3990,
    oldPrice: 5500,
    image: 'https://images.pexels.com/photos/36909815/pexels-photo-36909815.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '6-13 years',
    rating: 5.0,
    reviews: 8,
    badge: 'Premium',
  },
  {
    id: 'bo6',
    name: 'Summer Blue Outfit',
    category: 'boys',
    price: 1290,
    image: 'https://images.pexels.com/photos/38409630/pexels-photo-38409630.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '2-8 years',
    rating: 4.8,
    reviews: 14,
  },
  // Girls
  {
    id: 'g1',
    name: 'Floral Summer Dress',
    category: 'girls',
    price: 1690,
    oldPrice: 2300,
    image: 'https://images.pexels.com/photos/15359602/pexels-photo-15359602.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '3-10 years',
    rating: 5.0,
    reviews: 27,
    badge: 'Bestseller',
  },
  {
    id: 'g2',
    name: 'Sunny Yellow Party Dress',
    category: 'girls',
    price: 1990,
    oldPrice: 2790,
    image: 'https://images.pexels.com/photos/15359689/pexels-photo-15359689.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '4-12 years',
    rating: 5.0,
    reviews: 19,
    badge: 'New',
  },
  {
    id: 'g3',
    name: 'Stylish Boots & Dress Set',
    category: 'girls',
    price: 2490,
    oldPrice: 3200,
    image: 'https://images.pexels.com/photos/15359697/pexels-photo-15359697.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '5-13 years',
    rating: 4.9,
    reviews: 13,
    badge: 'Premium',
  },
  {
    id: 'g4',
    name: 'Playful Top Hat Outfit',
    category: 'girls',
    price: 1790,
    image: 'https://images.pexels.com/photos/9393048/pexels-photo-9393048.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '4-10 years',
    rating: 5.0,
    reviews: 10,
  },
  {
    id: 'g5',
    name: 'Colorful Striped Dress',
    category: 'girls',
    price: 1390,
    oldPrice: 1890,
    image: 'https://images.pexels.com/photos/18476125/pexels-photo-18476125.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '3-9 years',
    rating: 4.8,
    reviews: 16,
  },
  {
    id: 'g6',
    name: 'Cozy Brown Sweater Set',
    category: 'girls',
    price: 1590,
    image: 'https://images.pexels.com/photos/19449073/pexels-photo-19449073.jpeg?auto=compress&cs=tinysrgb&w=600',
    ageRange: '4-12 years',
    rating: 5.0,
    reviews: 8,
  },
];
