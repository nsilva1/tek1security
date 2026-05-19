'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import {
  ShoppingCart,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  Flashlight,
  Shield,
  Shirt,
  Package,
  X,
  CheckCircle2,
  Search,
  ZapIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Gear & Equipment' | 'Safety' | 'Clothing' | 'Accessories';

interface Product {
  id: number;
  name: string;
  category: Category;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  stock: number;
}

interface CartItem extends Product {
  qty: number;
}

// ─── Mock Products ────────────────────────────────────────────────────────────

const products: Product[] = [
  {
    id: 1, name: 'Tactical Flashlight', category: 'Gear & Equipment',
    originalPrice: 8500, discountedPrice: 5950, discount: 30,
    description: '1000-lumen duty flashlight with magnetic base and strobe mode.',
    icon: ZapIcon, iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-500', stock: 12,
  },
  {
    id: 2, name: 'Security Vest (Hi-Vis)', category: 'Clothing',
    originalPrice: 12000, discountedPrice: 7800, discount: 35,
    description: 'High-visibility patrol vest with reflective strips and badge holder.',
    icon: Shirt, iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500', stock: 20,
  },
  {
    id: 3, name: 'First Aid Kit (Pro)', category: 'Safety',
    originalPrice: 15000, discountedPrice: 9750, discount: 35,
    description: 'Comprehensive 120-piece first aid kit in a hard-shell carry case.',
    icon: Shield, iconBg: 'bg-red-500/10', iconColor: 'text-red-500', stock: 8,
  },
  {
    id: 4, name: 'Guard Log Notebook', category: 'Accessories',
    originalPrice: 2500, discountedPrice: 1500, discount: 40,
    description: 'Weather-resistant hardcover patrol log notebook, 200 pages.',
    icon: Package, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500', stock: 50,
  },
  {
    id: 5, name: 'Two-Way Radio Holster', category: 'Accessories',
    originalPrice: 3500, discountedPrice: 2450, discount: 30,
    description: 'Universal duty belt holster compatible with most Motorola & Kenwood radios.',
    icon: Package, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-500', stock: 30,
  },
  {
    id: 6, name: 'Pepper Spray (OC)', category: 'Safety',
    originalPrice: 6000, discountedPrice: 3900, discount: 35,
    description: 'Police-grade 2% OC pepper spray, stream pattern, 50g canister.',
    icon: Shield, iconBg: 'bg-red-500/10', iconColor: 'text-red-500', stock: 25,
  },
  {
    id: 7, name: 'Duty Belt (Leather)', category: 'Gear & Equipment',
    originalPrice: 18000, discountedPrice: 11700, discount: 35,
    description: 'Genuine leather duty belt with stainless steel buckle. Adjustable 28"–48".',
    icon: ZapIcon, iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-500', stock: 15,
  },
  {
    id: 8, name: 'Safety Boots (Steel Toe)', category: 'Clothing',
    originalPrice: 35000, discountedPrice: 22750, discount: 35,
    description: 'Slip-resistant, steel-toe safety boots rated for all-day patrol comfort.',
    icon: Shirt, iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500', stock: 10,
  },
  {
    id: 9, name: 'Rain Poncho (Waterproof)', category: 'Clothing',
    originalPrice: 7500, discountedPrice: 4500, discount: 40,
    description: 'Lightweight emergency rain poncho with reflective stripe and hood.',
    icon: Shirt, iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500', stock: 40,
  },
];

const CATEGORIES: Category[] = ['All', 'Gear & Equipment', 'Safety', 'Clothing', 'Accessories'];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const [added, setAdded] = useState(false);
  const Icon = product.icon;

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow group overflow-hidden">
      {/* Product image area */}
      <div className={`${product.iconBg} flex items-center justify-center h-36 relative`}>
        <Icon size={52} className={product.iconColor} />
        <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
          -{product.discount}%
        </span>
      </div>

      <CardContent className="flex flex-col flex-1 pt-4 pb-4 space-y-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">₦{product.discountedPrice.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
        </div>

        <Button
          onClick={handleAdd}
          className={`w-full transition-all ${added ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
          size="sm"
        >
          {added ? (
            <><CheckCircle2 size={16} className="mr-2" /> Added!</>
          ) : (
            <><ShoppingCart size={16} className="mr-2" /> Add to Cart</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

function CartDrawer({
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  items: CartItem[];
  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const total = items.reduce((sum, i) => sum + i.discountedPrice * i.qty, 0);
  const savings = items.reduce((sum, i) => sum + (i.originalPrice - i.discountedPrice) * i.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-sm bg-card border-l border-border flex flex-col shadow-2xl h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            Your Cart ({items.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                  <div className={`${item.iconBg} p-2.5 rounded-lg shrink-0`}>
                    <Icon size={20} className={item.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-sm text-primary font-semibold">
                      ₦{item.discountedPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      onClick={() => onIncrease(item.id)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-border space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>You save</span>
              <span className="text-emerald-500 font-semibold">₦{savings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <Button className="w-full py-5 text-base font-semibold">
              Checkout · ₦{total.toLocaleString()}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increase = (id: number) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const decrease = (id: number) => setCart((prev) => {
    const item = prev.find((i) => i.id === id);
    if (item && item.qty === 1) return prev.filter((i) => i.id !== id);
    return prev.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i);
  });
  const remove = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={remove}
        />
      )}

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border sticky top-0 z-40">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <ShoppingBag size={22} />
            Guard Shop
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              G
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {/* Hero banner */}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag size={18} />
                <span className="text-sm font-semibold uppercase tracking-wide opacity-80">Staff Exclusive</span>
              </div>
              <h2 className="text-3xl font-bold mb-1">Security Supplies</h2>
              <p className="opacity-80 text-sm">Up to 40% off on all guard essentials — discounts applied automatically.</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-5xl font-black">40%</p>
              <p className="text-sm opacity-80">Max discount</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary shadow'
                      : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-5">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingBag size={40} className="mx-auto mb-3 opacity-30" />
              <p>No products match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
