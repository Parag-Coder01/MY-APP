import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Zap, Star, ShieldCheck, Truck, Check } from 'lucide-react';
import { Product } from '../types';

interface StoreViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    'All',
    'Arduino Kits',
    'Robotics Kits',
    'IoT Modules',
    'Sensors',
    'AI Learning Kits',
    'Components',
    'Accessories',
  ];

  const handleAddClick = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1400);
  };

  const filtered = products
    .filter((p) => {
      const matchCat = selectedCat === 'All' || p.category.toLowerCase().includes(selectedCat.toLowerCase());
      const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
            KITE Hardware Store
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Robotics, IoT & STEM Hardware
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Direct engineered kits, microcontrollers, sensor packs and robotics modules. Tested for Indian classrooms and innovation labs.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-code text-slate-400 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800 w-fit">
          <Truck className="w-4 h-4 text-cyan-400" />
          <span>Pan-India Courier • Free above ₹999</span>
        </div>
      </div>

      {/* Controls Strip: Search, Categories & Sort */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search */}
          <div className="flex-1 flex items-center rounded-2xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 focus-within:border-cyan-400">
            <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Arduino, Rover Kit, ESP32, Sensors..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 px-3 py-2.5 shrink-0 text-xs font-mono-code">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products by"
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900">Featured</option>
              <option value="price-asc" className="bg-slate-900">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
              <option value="rating" className="bg-slate-900">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono-code">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-800/60 transition-all p-4 flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Product Visual */}
              <div
                onClick={() => onSelectProduct(prod)}
                className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {prod.badge && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-cyan-500 text-slate-950">
                    {prod.badge}
                  </span>
                )}

                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono-code text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700">
                    {prod.category}
                  </span>
                  <span className="text-emerald-400">In Stock</span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-3">
                <h3
                  onClick={() => onSelectProduct(prod)}
                  className="font-display font-bold text-sm sm:text-base text-white hover:text-cyan-300 cursor-pointer transition-colors line-clamp-2"
                >
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400 font-mono-code">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{prod.rating}</span>
                  <span className="text-slate-500">({prod.reviewsCount})</span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="pt-3 mt-3 border-t border-slate-800">
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-mono-code font-bold text-white">₹{prod.price}</span>
                  <span className="text-xs font-mono-code text-slate-500 line-through">₹{prod.originalPrice}</span>
                </div>
                <span className="text-[11px] font-mono-code text-emerald-400">
                  Save ₹{prod.originalPrice - prod.price}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddClick(prod)}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-700"
                >
                  {addedAnimationId === prod.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono-code">Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Add</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => onBuyNow(prod)}
                  className="py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
