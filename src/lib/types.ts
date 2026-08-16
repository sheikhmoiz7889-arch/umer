export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category_id: string;
  price: number;
  old_price: number | null;
  image_url: string;
  age_range: string;
  rating: number;
  reviews: number;
  badge: string | null;
  sizes: string[];
  sort_order: number;
  created_at: string;
}

export interface ProductWithCategory extends Product {
  category?: Category;
}
