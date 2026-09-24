import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const StorePage: React.FC = () => {
  const { products, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'APPAREL', 'ACCESSORIES', 'STATIONERY', 'LIFESTYLE', 'LIMITED DROPS'];

  const filtered = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1 font-semibold">
          <ShoppingBag className="w-3.5 h-3.5 text-[#FFD400]" />
          <span>PROVISIONS & ARTIFACTS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
          DUX STORE
        </h1>
        <p className="text-sm text-[#777777] font-medium mt-1">
          Tactile tools, heavy textiles, and stationery designed to anchor your daily focus.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E0D5]">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-white text-[#777777] hover:text-[#111111] hover:bg-[#F5F1E8] border border-[#E5E0D5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white border border-[#E5E0D5] rounded-3xl flex flex-col justify-between hover:border-[#111111] transition-all shadow-xs group"
          >
            <div>
              <Link to={`/store/product/${product.id}`} className="block overflow-hidden rounded-2xl mb-4 bg-[#F5F1E8]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="flex items-center justify-between text-xs text-[#777777] mb-1">
                <span className="font-mono text-[10px] uppercase font-bold">{product.category}</span>
                <span className="font-mono text-sm font-bold text-[#111111]">${product.price}</span>
              </div>

              <Link to={`/store/product/${product.id}`} className="block">
                <h3 className="text-base font-black uppercase tracking-tight text-[#111111] group-hover:underline">
                  {product.name}
                </h3>
              </Link>

              <p className="text-xs text-[#777777] mt-1.5 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F5F1E8] flex gap-2">
              <Link
                to={`/store/product/${product.id}`}
                className="flex-1 py-2.5 bg-[#FBF9F5] border border-[#E5E0D5] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center"
              >
                Details
              </Link>
              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                className="px-4 py-2.5 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
              >
                + Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
