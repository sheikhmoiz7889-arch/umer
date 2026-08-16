/*
# Create categories and products tables for Umer Garments admin panel

1. New Tables
- `categories`
  - `id` (uuid, primary key)
  - `name` (text, not null) — display name e.g. "Baby Collection"
  - `slug` (text, unique, not null) — URL-safe identifier e.g. "baby"
  - `emoji` (text) — emoji icon for display
  - `sort_order` (int, default 0) — ordering
  - `created_at` (timestamptz)
- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `category_id` (uuid, FK -> categories, not null)
  - `price` (numeric, not null)
  - `old_price` (numeric, nullable)
  - `image_url` (text, not null) — public URL of product image
  - `age_range` (text, not null) — e.g. "0-12 months"
  - `rating` (numeric, default 5.0)
  - `reviews` (int, default 0)
  - `badge` (text, nullable) — e.g. "Bestseller", "New"
  - `sizes` (text[], not null default '{}') — array of size strings, admin-defined
  - `sort_order` (int, default 0)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on both tables.
- This is a single-tenant no-auth app (no sign-in screen) — the storefront
  and admin panel both use the anon key. All CRUD policies use
  `TO anon, authenticated` with `USING (true)` because the data is
  intentionally public/shared (the storefront must read products, and the
  admin manages them without a login).
- Storage bucket `product-images` is public for reads, public for writes
  so the anon client can upload images.

3. Important Notes
- `sizes` is a Postgres text array so admins can define any custom size
  labels they want (e.g. "1-2Y", "3-4Y", "Newborn", "S", "M").
- `image_url` stores the public Supabase Storage URL after upload.
- Categories cascade-delete products to keep data consistent.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  emoji text DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  price numeric NOT NULL DEFAULT 0,
  old_price numeric,
  image_url text NOT NULL,
  age_range text NOT NULL DEFAULT '',
  rating numeric DEFAULT 5.0,
  reviews int DEFAULT 0,
  badge text,
  sizes text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Categories: full CRUD for anon + authenticated (single-tenant, no auth)
DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

-- Products: full CRUD for anon + authenticated (single-tenant, no auth)
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

-- Index for category filtering on storefront
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);
