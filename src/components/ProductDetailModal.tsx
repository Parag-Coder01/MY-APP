import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, ShoppingCart, Zap, CheckCircle2, Cpu, PackageCheck, BookOpen, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSelectCourseById?: (courseId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!product) return null;

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-slate-100"
      >
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-950/80 border border-slate-700/70 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Image Showcase */}
        <div className="relative p-5 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src={galleryImages[selectedImgIdx]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-mono-code font-bold bg-cyan-500 text-slate-950">
                {product.badge}
              </span>
            )}
          </div>

          {/* Micro thumbnails */}
          <div className="flex gap-2 mt-3 justify-center">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIdx(idx)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImgIdx === idx ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code uppercase text-cyan-400 font-semibold tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-mono-code">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-2xl font-mono-code font-extrabold text-cyan-400">
                ₹{product.price}
              </span>
              <span className="text-sm font-mono-code text-slate-500 line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-xs font-mono-code text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                Save ₹{product.originalPrice - product.price} (30% OFF)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* What's Included Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-display font-bold text-xs sm:text-sm text-white flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-cyan-400" />
              <span>What's Inside The Box</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {(product.whatsIncluded || product.includes || []).map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-display font-bold text-xs sm:text-sm text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Technical Specifications</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono-code">
              {Object.entries(product.specifications || product.specs || {}).map(([key, val]) => (
                <div key={key} className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">{key}</div>
                  <div className="text-slate-200 font-semibold truncate mt-0.5">{String(val)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Compatible projects & learning notes */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-display font-bold text-xs sm:text-sm text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Recommended Projects & Guides</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {(product.learningResources || product.compatibleProjects || []).map((proj: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium"
                >
                  🚀 {proj}
                </span>
              ))}
            </div>
          </div>

          {/* Assurances */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono-code text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Pan-India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Components</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>7-Day Replacement</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-3">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-slate-700"
          >
            <ShoppingCart className="w-4 h-4 text-cyan-400" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => {
              onBuyNow(product);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>Buy Now</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
