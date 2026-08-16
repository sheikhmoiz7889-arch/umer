import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Package, ArrowLeft, Plus, Trash2, Pencil, X, Check,
  Upload, Star, Loader2, Search, Save,
} from 'lucide-react';
import { supabase, PRODUCT_BUCKET } from '@/lib/supabase';
import type { Category, Product } from '@/lib/types';

type Tab = 'products' | 'categories';

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('products');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-gradient-to-b from-navy-900 to-navy-800"
    >
      {/* top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-navy-900/80 px-4 py-3 backdrop-blur-lg sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" /> Storefront
          </button>
          <h1 className="font-display text-lg font-extrabold text-white sm:text-xl">Admin Panel</h1>
        </div>

        {/* tabs */}
        <div className="flex gap-1 rounded-full bg-white/10 p-1">
          <button
            onClick={() => setTab('products')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all sm:px-4 sm:text-sm ${
              tab === 'products' ? 'bg-white text-navy-900' : 'text-white/70 hover:text-white'
            }`}
          >
            <Package className="h-4 w-4" /> Products
          </button>
          <button
            onClick={() => setTab('categories')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all sm:px-4 sm:text-sm ${
              tab === 'categories' ? 'bg-white text-navy-900' : 'text-white/70 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Categories
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <AnimatePresence mode="wait">
          {tab === 'products' ? (
            <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ProductsTab />
            </motion.div>
          ) : (
            <motion.div key="categories" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <CategoriesTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ============ CATEGORIES TAB ============ */

function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) {
      console.error(error);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? All products in it will also be deleted.')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      alert('Error deleting category: ' + error.message);
    } else {
      load();
    }
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-extrabold text-white">Categories</h2>
          <p className="text-sm text-white/50">Create and manage your product categories</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-bubble-500 to-bubble-600 px-5 py-2.5 text-sm font-bold text-white shadow-glow-bubble transition-transform hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-white/40" />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.id} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{cat.name}</h3>
                    <p className="text-xs text-white/40">/{cat.slug}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => { setEditing(cat); setShowForm(true); }}
                    className="grid place-items-center h-8 w-8 rounded-lg bg-white/10 text-white/70 hover:bg-white/20"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="grid place-items-center h-8 w-8 rounded-lg bg-bubble-500/20 text-bubble-300 hover:bg-bubble-500/40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <CategoryForm
            category={editing}
            onClose={() => setShowForm(false)}
            onSaved={() => { setShowForm(false); load(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryForm({ category, onClose, onSaved }: { category: Category | null; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(category?.name ?? '');
  const [slug, setSlug] = useState(category?.slug ?? '');
  const [emoji, setEmoji] = useState(category?.emoji ?? '');
  const [sortOrder, setSortOrder] = useState(category?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { name, slug: slug || name.toLowerCase().replace(/\s+/g, '-'), emoji, sort_order: sortOrder };
    if (category) {
      const { error } = await supabase.from('categories').update(payload).eq('id', category.id);
      if (error) alert('Error: ' + error.message);
    } else {
      const { error } = await supabase.from('categories').insert(payload);
      if (error) alert('Error: ' + error.message);
    }
    setSaving(false);
    onSaved();
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed left-1/2 top-1/2 z-[110] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-float"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold text-navy-900">
            {category ? 'Edit Category' : 'New Category'}
          </h3>
          <button onClick={onClose} className="grid place-items-center h-8 w-8 rounded-lg bg-mint-50 text-navy-700 hover:bg-mint-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <AdminField label="Category Name">
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Baby Collection" required />
          </AdminField>
          <AdminField label="Slug (URL identifier)">
            <input className="input" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated from name" />
          </AdminField>
          <AdminField label="Emoji Icon">
            <input className="input" value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="e.g. 👶" maxLength={4} />
          </AdminField>
          <AdminField label="Sort Order">
            <input type="number" className="input" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
          </AdminField>
          <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-bold text-white disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {category ? 'Save Changes' : 'Create Category'}
          </button>
        </form>
      </motion.div>
    </>
  );
}

/* ============ PRODUCTS TAB ============ */

function ProductsTab() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState<string>('all');
  const [search, setSearch] = useState('');

  type ProductWithCategory = Product & { category?: Category };

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: prods, error: pErr }, { data: cats, error: cErr }] = await Promise.all([
      supabase.from('products').select('*').order('sort_order', { ascending: true }),
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    ]);
    if (pErr || cErr) {
      console.error(pErr || cErr);
    } else {
      const catMap = new Map((cats || []).map((c: Category) => [c.id, c]));
      setCategories(cats || []);
      setProducts((prods || []).map((p: Product) => ({ ...p, category: catMap.get(p.category_id) })));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      load();
    }
  };

  const filtered = products.filter((p) => {
    const matchCat = filterCat === 'all' || p.category_id === filterCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-extrabold text-white">Products</h2>
          <p className="text-sm text-white/50">{products.length} products in your store</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-bubble-500 to-bubble-600 px-5 py-2.5 text-sm font-bold text-white shadow-glow-bubble transition-transform hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full bg-white/10 py-2.5 pl-10 pr-4 text-sm font-semibold text-white placeholder:text-white/30 ring-1 ring-white/10 focus:outline-none focus:ring-bubble-400"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-full bg-white/10 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/10 focus:outline-none"
        >
          <option value="all" className="text-navy-900">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id} className="text-navy-900">{c.emoji} {c.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-white/40" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white/5 p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-white/20" />
          <p className="mt-3 text-sm font-semibold text-white/50">No products found. Add your first product!</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 backdrop-blur">
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                {p.badge && (
                  <span className="absolute top-2 left-2 rounded-full bg-navy-900 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    {p.badge}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex gap-1.5 bg-gradient-to-t from-navy-900/80 to-transparent p-2">
                  <button
                    onClick={() => { setEditing(p); setShowForm(true); }}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-white/90 py-1.5 text-xs font-bold text-navy-900 hover:bg-white"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="grid place-items-center h-7 w-7 rounded-lg bg-bubble-500/90 text-white hover:bg-bubble-500"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-white leading-tight">{p.name}</h3>
                <p className="text-xs text-white/40">{p.category?.name ?? 'Uncategorized'}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="font-display text-base font-extrabold text-white">Rs {Number(p.price).toLocaleString()}</span>
                  {p.old_price && (
                    <span className="text-xs text-white/40 line-through">Rs {Number(p.old_price).toLocaleString()}</span>
                  )}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.sizes.slice(0, 4).map((s) => (
                    <span key={s} className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/70">{s}</span>
                  ))}
                  {p.sizes.length > 4 && (
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/70">+{p.sizes.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editing}
            categories={categories}
            onClose={() => setShowForm(false)}
            onSaved={() => { setShowForm(false); load(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductForm({
  product,
  categories,
  onClose,
  onSaved,
}: {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(product?.name ?? '');
  const [categoryId, setCategoryId] = useState(product?.category_id ?? categories[0]?.id ?? '');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [oldPrice, setOldPrice] = useState(product?.old_price ?? 0);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '');
  const [ageRange, setAgeRange] = useState(product?.age_range ?? '');
  const [badge, setBadge] = useState(product?.badge ?? '');
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [newSize, setNewSize] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `product-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(PRODUCT_BUCKET).upload(fileName, file, { cacheControl: '3600' });
    if (error) {
      alert('Upload failed: ' + error.message);
    } else {
      const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    }
    setUploading(false);
  };

  const addSize = () => {
    const s = newSize.trim();
    if (s && !sizes.includes(s)) {
      setSizes([...sizes, s]);
      setNewSize('');
    }
  };

  const removeSize = (s: string) => setSizes(sizes.filter((x) => x !== s));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) { alert('Please select a category'); return; }
    if (sizes.length === 0) { alert('Please add at least one size'); return; }
    setSaving(true);
    const payload = {
      name,
      category_id: categoryId,
      price: Number(price),
      old_price: oldPrice ? Number(oldPrice) : null,
      image_url: imageUrl,
      age_range: ageRange,
      badge: badge || null,
      sizes,
    };
    if (product) {
      const { error } = await supabase.from('products').update(payload).eq('id', product.id);
      if (error) { alert('Error: ' + error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('products').insert(payload);
      if (error) { alert('Error: ' + error.message); setSaving(false); return; }
    }
    setSaving(false);
    onSaved();
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed left-1/2 top-1/2 z-[110] max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white p-6 shadow-float"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold text-navy-900">
            {product ? 'Edit Product' : 'New Product'}
          </h3>
          <button onClick={onClose} className="grid place-items-center h-8 w-8 rounded-lg bg-mint-50 text-navy-700 hover:bg-mint-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* image upload */}
          <AdminField label="Product Image">
            <div className="flex items-center gap-3">
              {imageUrl && (
                <img src={imageUrl} alt="preview" className="h-20 w-20 shrink-0 rounded-xl object-cover ring-2 ring-navy-900/10" />
              )}
              <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-900/15 bg-mint-50/50 px-4 py-3 text-sm font-bold text-navy-700 transition-colors hover:bg-mint-50">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
            <input className="input mt-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="or paste image URL" />
          </AdminField>

          <AdminField label="Product Name">
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Cuddly Bear Onesie" required />
          </AdminField>

          <div className="grid gap-3 sm:grid-cols-2">
            <AdminField label="Category">
              <select className="input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Age Range">
              <input className="input" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} placeholder="e.g. 0-12 months" required />
            </AdminField>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <AdminField label="Price (Rs)">
              <input type="number" className="input" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
            </AdminField>
            <AdminField label="Old Price (Rs, optional)">
              <input type="number" className="input" value={oldPrice} onChange={(e) => setOldPrice(Number(e.target.value))} placeholder="for discount display" />
            </AdminField>
          </div>

          <AdminField label="Badge (optional)">
            <input className="input" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="e.g. Bestseller, New, Premium" />
          </AdminField>

          {/* custom sizes */}
          <AdminField label="Sizes (add your own)">
            <div className="flex gap-2">
              <input
                className="input"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSize(); } }}
                placeholder="e.g. 1-2Y, Newborn, S, M"
              />
              <button type="button" onClick={addSize} className="grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-navy-900 text-white">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {sizes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-mint-100 px-2.5 py-1 text-xs font-bold text-mint-700">
                    {s}
                    <button type="button" onClick={() => removeSize(s)} className="text-mint-600 hover:text-bubble-500">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </AdminField>

          <button type="submit" disabled={saving || uploading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bubble-500 to-bubble-600 px-6 py-3.5 text-sm font-bold text-white shadow-glow-bubble disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {product ? 'Save Changes' : 'Create Product'}
          </button>
        </form>
      </motion.div>
    </>
  );
}

/* ============ SHARED ============ */

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy-700/60">{label}</span>
      {children}
    </label>
  );
}
