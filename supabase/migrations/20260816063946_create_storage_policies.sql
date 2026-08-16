/*
# Create storage policies for product-images bucket

1. Storage Policies
- Public read access for the `product-images` bucket (anyone can view product photos).
- Public write access (upload) for anon + authenticated so the admin panel
  can upload images without requiring sign-in (single-tenant, no-auth app).

2. Security
- The bucket is public (public = true) so image URLs are directly accessible.
- Write policy allows the anon-key frontend to upload files.
*/

DROP POLICY IF EXISTS "Public read access for product-images" ON storage.objects;
CREATE POLICY "Public read access for product-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Public write access for product-images" ON storage.objects;
CREATE POLICY "Public write access for product-images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Public update for product-images" ON storage.objects;
CREATE POLICY "Public update for product-images"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Public delete for product-images" ON storage.objects;
CREATE POLICY "Public delete for product-images"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'product-images');
