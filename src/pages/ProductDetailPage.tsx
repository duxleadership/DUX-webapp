import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();

  const product = products.find((p) => p.id === id) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('L');

  if (!product) {
    return (
      <div className="text-center py-20">
        <p>Product not found.</p>
        <Link to="/store" className="text-xs uppercase font-bold text-[#111111] underline mt-4 block">
          Back to Store
        </Link>
      </div>
    );
  }

  const isApparel = product.category === 'APPAREL';
  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart(product, quantity, isApparel ? selectedSize : undefined);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO STORE</span>
        </Link>
      </div>

      <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden bg-[#F5F1E8] border border-[#E5E0D5]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 sm:h-[450px] object-cover"
          />
        </div>

        {/* Product Info & Action */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-mono">
              <span className="font-bold uppercase text-[#111111]">{product.category}</span>
              <span className="text-emerald-700 font-bold uppercase">
                {product.inStock ? '✓ IN STOCK' : 'OUT OF STOCK'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111111] mb-2">
              {product.name}
            </h1>

            <div className="text-2xl font-mono font-bold text-[#111111] mb-4">
              ${product.price} <span className="text-xs text-[#777777] font-normal">USD</span>
            </div>

            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size Selector for Apparel */}
            {isApparel && (
              <div className="mb-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                  Select Size
                </span>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`w-11 h-11 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'bg-[#FBF9F5] border border-[#E5E0D5] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                Quantity
              </span>
              <div className="flex items-center border border-[#E5E0D5] rounded-xl w-32 bg-[#FBF9F5]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs font-bold hover:bg-[#E5E0D5] cursor-pointer"
                >
                  -
                </button>
                <span className="flex-1 text-center font-mono font-bold text-xs text-[#111111]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs font-bold hover:bg-[#E5E0D5] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="p-4 bg-[#FBF9F5] border border-[#E5E0D5] rounded-2xl mb-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#777777] block mb-2">
                SPECIFICATIONS
              </span>
              <ul className="space-y-1.5 text-xs text-[#111111]">
                {product.details.map((d, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-4 border-t border-[#E5E0D5] space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#111111] text-white hover:bg-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFD400]" />
              <span>ADD TO CART · ${(product.price * quantity).toFixed(2)}</span>
            </button>

            <div className="flex items-center justify-around text-[11px] text-[#777777] pt-2">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Worldwide Shipping
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Lifetime Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
