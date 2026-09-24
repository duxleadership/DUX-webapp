import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, isCartOpen, setIsCartOpen, showToast } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 70 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(false);
    setOrderComplete(true);
    clearCart();

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) { /* ignore */ }

    showToast({
      type: 'reward',
      title: 'Order Confirmed! (+50 PTS)',
      message: 'Your DUX gear is being packed. Receipt sent to your email.'
    });
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E5E0D5] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#E5E0D5] flex items-center justify-between bg-[#FBF9F5]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#111111]" />
              <h2 className="text-base font-bold uppercase tracking-wider text-[#111111]">
                DUX Cart ({cart.reduce((n, i) => n + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-[#111111] text-[#FFD400] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#111111]">
                  ORDER DISPATCHED
                </h3>
                <p className="text-sm text-[#777777] mt-2 max-w-xs mx-auto">
                  Thank you for representing the movement. You earned 50 DUX Points for supporting the platform.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-black cursor-pointer"
                >
                  Continue Exploring
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="w-12 h-12 text-[#E5E0D5] mx-auto mb-3" />
                <p className="font-mono text-xs uppercase text-[#777777] tracking-wider">
                  YOUR CART IS EMPTY
                </p>
                <p className="text-sm text-[#777777] mt-1 mb-6">
                  Equip yourself with tools and apparel for your journey.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-black cursor-pointer"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || index}`}
                  className="flex gap-4 p-4 border border-[#E5E0D5] rounded-xl bg-white hover:border-[#111111] transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[#F5F1E8] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-[#111111] truncate pr-2">
                          {item.product.name}
                        </h4>
                        <span className="font-mono text-sm font-bold text-[#111111]">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#777777] mt-0.5">
                        <span>{item.product.category}</span>
                        {item.selectedSize && (
                          <>
                            <span>·</span>
                            <span className="font-mono font-medium">Size: {item.selectedSize}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5F1E8]">
                      <div className="flex items-center border border-[#E5E0D5] rounded-lg overflow-hidden bg-[#FBF9F5]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="px-2.5 py-1 text-xs hover:bg-[#E5E0D5] text-[#111111] font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="px-2.5 py-1 text-xs hover:bg-[#E5E0D5] text-[#111111] font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="text-[#777777] hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-[#E5E0D5] bg-[#FBF9F5] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#777777]">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Shipping</span>
                  <span className="font-mono font-medium">
                    {shipping === 0 ? 'FREE (Orders over $70)' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#E5E0D5]">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Quick Checkout Demo</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Shipping Address"
                    defaultValue="742 Evergreen Terrace, Suite 101"
                    className="w-full text-xs p-2.5 bg-white border border-[#E5E0D5] rounded-lg focus:outline-none focus:border-[#111111]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Card (Demo)"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full text-xs p-2.5 bg-white border border-[#E5E0D5] rounded-lg font-mono focus:outline-none focus:border-[#111111]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      defaultValue="12/28"
                      className="w-full text-xs p-2.5 bg-white border border-[#E5E0D5] rounded-lg font-mono focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 py-2.5 border border-[#E5E0D5] text-[#777777] hover:text-[#111111] text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-2 py-2.5 bg-[#FFD400] text-[#111111] hover:bg-[#eec600] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      Pay ${total.toFixed(2)}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
