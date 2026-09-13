'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Package,
  Calendar,
  Award,
  ShoppingCart,
  Check,
  Eye
} from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div className="group bg-white rounded-3xl border border-stone-200 hover:border-emerald-600/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* 1. Card Top Image with Glassmorphic Overlays */}
      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Category Pill Tag (Top-Left) */}
        <div className="absolute top-3.5 left-3.5">
          {product.category === 'most-sold-out' && (
            <span className="backdrop-blur-md bg-white/95 text-stone-900 text-xs font-black px-3 py-1 rounded-full shadow-sm border border-white/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span>{product.stockStatus}</span>
            </span>
          )}
          {product.category === 'seasonal' && (
            <span className="backdrop-blur-md bg-white/95 text-stone-900 text-xs font-black px-3 py-1 rounded-full shadow-sm border border-white/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132]" />
              <Calendar className="w-3.5 h-3.5 text-[#0F5132]" />
              <span>{product.categoryBadge}</span>
            </span>
          )}
          {product.category === 'best-of-year' && (
            <span className="backdrop-blur-md bg-white/95 text-stone-900 text-xs font-black px-3 py-1 rounded-full shadow-sm border border-white/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>{product.stockStatus}</span>
            </span>
          )}
        </div>

        {/* NPK Ratio Tag (Bottom-Right) */}
        <div className="absolute bottom-3.5 right-3.5">
          <span className="backdrop-blur-md bg-stone-900/85 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-xl shadow-sm border border-white/10">
            NPK {product.npkRatio}
          </span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Seller Row */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-stone-700 font-bold truncate max-w-[200px]" title={product.seller}>
              <span className="truncate">{product.seller}</span>
              {product.sellerVerified && (
                <span title="MAFF Certified Dealer">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </span>
              )}
            </div>
            <span className="text-stone-400 font-semibold text-xs shrink-0">
              {product.sellerLocation.split(' ')[0]}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 leading-snug group-hover:text-[#0F5132] transition-colors line-clamp-2 min-h-[3.25rem] hyphens-none">
            {product.title}
          </h3>
        </div>

        {/* 3. Pricing & Rating */}
        <div className="pt-3 border-t border-stone-100 space-y-4">
          <div className="flex items-end justify-between">
            {/* Price */}
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Wholesale Direct
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-serif">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-stone-500">
                  / {product.unit}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 bg-amber-50/90 px-2.5 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-stone-900">{product.rating}</span>
              <span className="text-[11px] text-stone-500 font-medium">({product.reviewCount})</span>
            </div>
          </div>

          {/* 4. Action Buttons: "View Details" & "Add to Cart" */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {/* Kept View Button (no page/modal popup as requested) */}
            <button
              type="button"
              className="w-full py-3.5 px-3 bg-white border-2 border-stone-200 hover:border-stone-800 text-stone-800 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Eye className="w-4 h-4 text-stone-500 shrink-0" />
              <span>View Details</span>
            </button>

            {/* Added Add to Cart Button */}
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-3.5 px-3 font-extrabold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
                isAdded
                  ? 'bg-emerald-700 text-white shadow-emerald-950/20 scale-95'
                  : 'bg-[#0F5132] hover:bg-[#0B3D26] active:scale-95 text-white shadow-emerald-950/15'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200 shrink-0" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
