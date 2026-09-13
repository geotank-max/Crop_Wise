'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface CategoryCarouselProps {
  id: string;
  title: string;
  description: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function CategoryCarousel({
  id,
  title,
  description,
  products,
  onAddToCart
}: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = Math.max(340, Math.floor(container.clientWidth * 0.75));
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <section id={id} className="space-y-6 scroll-mt-24 relative">
      <div className="flex items-end justify-between border-b border-stone-100 pb-4 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-stone-500 mt-1 max-w-2xl">
            {description}
          </p>
        </div>

        {hasOverflow && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center transition-all shadow-sm ${
                canScrollLeft
                  ? 'text-stone-800 hover:border-stone-400 hover:bg-stone-50 hover:scale-105 active:scale-95 cursor-pointer'
                  : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-50'
              }`}
              aria-label="Previous items"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center transition-all shadow-sm ${
                canScrollRight
                  ? 'text-stone-800 hover:border-stone-400 hover:bg-stone-50 hover:scale-105 active:scale-95 cursor-pointer'
                  : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-50'
              }`}
              aria-label="Next items"
            >
              <ChevronRight className="w-5 h-5 text-[#0071EB]" />
            </button>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-stone-400 text-base bg-stone-50 rounded-3xl">
          No fertilizers matched your search filter.
        </div>
      ) : (
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scroll-smooth no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-[290px] sm:w-[340px] lg:w-[360px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
