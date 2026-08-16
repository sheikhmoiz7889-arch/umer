/*
# Lock down admin writes — require authentication

1. Security Changes
- SELECT policies on categories + products stay public (TO anon, authenticated)
  so the storefront can display products without login.
- INSERT/UPDATE/DELETE policies on categories + products are changed to
  TO authenticated only, so only the logged-in admin can manage data.
- Storage policies on product-images: SELECT stays public (storefront needs
  to display images), INSERT/UPDATE/DELETE restricted to authenticated.

2. Why
- The admin panel now has a login screen. Without authentication, the anon
  key can still READ products and categories (storefront) but can no longer
  create, edit, or delete them. Only the authenticated admin user can.
*/

-- ===== categories: keep public read, lock writes to authenticated =====

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "auth_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "auth_update_categories" ON categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "auth_delete_categories" ON categories FOR DELETE
  TO authenticated USING (true);

-- ===== products: keep public read, lock writes to authenticated =====

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "auth_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "auth_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "auth_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- ===== storage: keep public read, lock writes to authenticated =====

DROP POLICY IF EXISTS "Public write access for product-images" ON storage.objects;
CREATE POLICY "auth_write_product_images" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Public update for product-images" ON storage.objects;
CREATE POLICY "auth_update_product_images" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Public delete for product-images" ON storage.objects;
CREATE POLICY "auth_delete_product_images" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'product-images');
