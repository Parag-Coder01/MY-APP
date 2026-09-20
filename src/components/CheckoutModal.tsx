import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Smartphone, Banknote, Building2, Package, ArrowRight, Copy, Check } from 'lucide-react';
import { CartItem, UserProfile } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  user: UserProfile;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  user,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '9564866985');
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState('Tech Innovation Hub, B-42 Electronics Complex');
  const [city, setCity] = useState('Kolkata');
  const [state, setState] = useState('West Bengal');
  const [pincode, setPincode] = useState('700091');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cards' | 'netbanking' | 'cod'>('upi');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const shipping = subtotal > 999 || cartItems.length === 0 ? 0 : 99;
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal - discount + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `KR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setStep('success');
    onOrderSuccess(generatedId);
  };

  const copyOrderId = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(orderId).catch(() => {});
      }
    } catch {
      // Ignore clipboard failure in restricted browsers
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-slate-100"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              {step === 'details' ? 'Secure Hardware Checkout' : 'Order Placed Successfully!'}
            </h3>
            <p className="text-xs text-slate-400 font-mono-code">
              {step === 'details' ? 'Official KITE Robotics Delivery' : 'Thank you for building with KITE'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 'details' ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Delivery Address Details */}
              <div className="space-y-3">
                <div className="text-xs font-mono-code uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span>1. Shipping & Contact Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Mobile Phone (for delivery)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Email (for invoice & tracking)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Street Address / School / Lab</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2.5 pt-3 border-t border-slate-800">
                <div className="text-xs font-mono-code uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Select Payment Mode</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-cyan-950/40 border-cyan-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Instant UPI</div>
                      <div className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cards')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'cards'
                        ? 'bg-cyan-950/40 border-cyan-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Credit/Debit</div>
                      <div className="text-[10px] text-slate-400">Visa, RuPay, Master</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-cyan-950/40 border-cyan-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Net Banking</div>
                      <div className="text-[10px] text-slate-400">All Indian Banks</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-cyan-950/40 border-cyan-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Cash on Delivery</div>
                      <div className="text-[10px] text-slate-400">Pay upon arrival</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Order total strip */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
                <div>
                  <div className="text-slate-400">Total Payable Amount</div>
                  <div className="text-base font-bold text-cyan-400">₹{total}</div>
                </div>
                <div className="text-right text-[11px] text-emerald-400">
                  Includes taxes & free courier
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <span>Confirm Order & Pay ₹{total}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Order Placed Success View */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-xl text-white">
                  Order Successfully Confirmed!
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                  Our lab engineers have received your hardware request. An invoice and tracking link have been dispatched.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto flex items-center justify-between">
                <div className="text-left font-mono-code">
                  <div className="text-[10px] text-slate-400">Order Reference Number</div>
                  <div className="text-sm font-bold text-cyan-400">{orderId}</div>
                </div>
                <button
                  onClick={copyOrderId}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Tracking Stepper */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 max-w-md mx-auto">
                <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider font-semibold">
                  Live Dispatch Status
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Order Confirmed & Hardware Allocated</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-cyan-300">
                    <span className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                    <span>Engineering Quality Check & Sensor Verification</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-700 ml-1 shrink-0" />
                    <span className="ml-1">Pan-India Express Dispatch (Blue Dart / DTDC)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-700 ml-1 shrink-0" />
                    <span className="ml-1">Estimated Delivery: 3 Business Days</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full max-w-sm py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm mx-auto block transition-colors"
              >
                Back to Hardware Store
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
