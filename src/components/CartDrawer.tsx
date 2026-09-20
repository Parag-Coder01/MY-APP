import React from 'react';
import { motion } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const shipping = subtotal > 999 || items.length === 0 ? 0 : 99;
  const discount = Math.round(subtotal * 0.1); // 10% Innovation discount
  const total = subtotal - discount + shipping;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl text-slate-100"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-base text-white">
              Robotics Hardware Cart
            </h3>
            <span className="text-xs font-mono-code px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400">
              {items.reduce((acc, it) => acc + it.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-850 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <div className="font-display font-bold text-base text-white">Your cart is empty</div>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Explore Arduino starter kits, robotic rovers, and sensor modules to get building!
              </p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex gap-3 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-xs text-white truncate">
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono-code font-bold text-cyan-400 mt-0.5">
                    ₹{product.price}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-code">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-white font-bold">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors ml-auto"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pricing Summary & Checkout Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
            <div className="space-y-1.5 text-xs font-mono-code">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>STEM Student Discount (10%)</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shipping}`}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Grand Total</span>
                <span className="text-cyan-400">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onProceedToCheckout();
                onClose();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono-code pt-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Official KITE Robotics Hardware Fulfillment</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
