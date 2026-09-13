'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  ChevronRight,
  Filter,
  Sparkles,
  Package,
  Calendar,
  Award,
  CheckCircle2,
  ShoppingCart
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CategoryCarousel from '@/components/CategoryCarousel';
import Footer from '@/components/Footer';
import { PRODUCTS, Product, REGIONS } from '@/data/products';
import {
  isAuthenticated,
  setPendingCartItem,
  getSavedCart,
  saveCart,
  getUser
} from '@/lib/auth';

function MarketplaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentLang, setCurrentLang] = useState<'EN' | 'KM'>('EN');
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');

  // Cart state & Toast notification
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load persisted cart
    const saved = getSavedCart();
    if (saved && saved.length > 0) {
      setCartItems(saved);
    }

    // Check if user was just redirected from registration
    if (searchParams.get('addedCart') === '1') {
      const user = getUser();
      const userName = user ? user.name.split(' ')[0] : 'Member';
      setToastMessage(`Welcome ${userName}! Item added to your cart.`);
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      // Clean up URL without reload
      router.replace('/', { scroll: false });
    }
  }, [searchParams, router]);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated()) {
      // Store pending item for seamless post-registration cart addition
      setPendingCartItem({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl
      });

      // Redirect to registration page with cart context
      router.push(
        `/register?redirect=cart&itemId=${product.id}&itemTitle=${encodeURIComponent(
          product.title
        )}&itemPrice=${encodeURIComponent(product.price)}`
      );
      return;
    }

    // Authenticated flow
    const updated = [...cartItems, product];
    setCartItems(updated);
    saveCart(updated);
    setToastMessage(`Added "${product.title}" to your cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Filter products by search and crop
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.npkRatio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetCrops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCrop =
        selectedCropFilter === 'All' ||
        item.targetCrops.some((c) => c.toLowerCase().includes(selectedCropFilter.toLowerCase()));

      return matchesSearch && matchesCrop;
    });
  }, [searchQuery, selectedCropFilter]);

  // The 3 required categories
  const mostSoldOutProducts = useMemo(
    () => filteredProducts.filter((p) => p.category === 'most-sold-out'),
    [filteredProducts]
  );
  const seasonalProducts = useMemo(
    () => filteredProducts.filter((p) => p.category === 'seasonal'),
    [filteredProducts]
  );
  const bestOfYearProducts = useMemo(
    () => filteredProducts.filter((p) => p.category === 'best-of-year'),
    [filteredProducts]
  );

  const cropCategories = ['All', 'Rice', 'Corn', 'Cassava', 'Pepper', 'Fruit'];

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-[#0F5132] selection:text-white relative">
      {/* Toast Notification when adding item to cart */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold truncate max-w-xs sm:max-w-md">{toastMessage}</span>
        </div>
      )}

      {/* 1. Ultra-Clean Navigation Bar with Live Cart Count */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        cartCount={cartItems.length}
      />

      {/* 2. Main Marketplace View */}
      <main className="flex-grow">
          {/* Hero Section: Centered Title + Large Friendly Pill Search Bar */}
          <section className="pt-16 pb-16 px-4 sm:px-8 max-w-5xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-stone-900 max-w-4xl mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5132] via-[#16A34A] to-[#22C55E]">
                Quality fertilizers
              </span>{' '}
              for every{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#F59E0B]">
                harvest
              </span>
              .
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 font-medium max-w-2xl mx-auto">
              Direct marketplace connecting farmers and accredited fertilizer suppliers with real-time risk indicators.
            </p>

            {/* Pill-Shaped Floating Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative flex items-center bg-white rounded-full shadow-[0_6px_30px_rgba(0,0,0,0.07)] border border-stone-200/90 p-2 pl-6 sm:pl-7 transition-all focus-within:shadow-[0_8px_35px_rgba(0,0,0,0.12)] focus-within:border-stone-400">
                <Search className="w-5 h-5 text-stone-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Find fertilizers, NPK formulas, or target crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base sm:text-lg text-stone-800 placeholder:text-stone-400 outline-none bg-transparent pr-4 font-normal"
                />
                <button
                  type="button"
                  className="bg-[#0071EB] hover:bg-[#005bbd] active:scale-95 text-white text-base font-bold px-8 sm:px-9 py-3 sm:py-3.5 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Crop Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-7">
              {cropCategories.map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => setSelectedCropFilter(crop)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    selectedCropFilter === crop
                      ? 'bg-stone-900 text-white shadow-sm scale-105'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {crop === 'All' ? 'All Crops' : crop}
                </button>
              ))}
            </div>
          </section>

          {/* Product Catalog: The 3 Required Categories with Carousel Navigation */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-24 space-y-20">
            {/* 1. The Most Sold Out Fertilizer */}
            <CategoryCarousel
              id="most-sold-out"
              title="The most sold out fertilizer"
              description="High demand warehouse stock nearing depletion across regional depots."
              products={mostSoldOutProducts}
              onAddToCart={handleAddToCart}
            />

            {/* 2. Effective Fertilizer for This Season */}
            <CategoryCarousel
              id="seasonal"
              title="Effective fertilizer for this season"
              description="Slow-release and weather-resistant blends tailored for current soil moisture."
              products={seasonalProducts}
              onAddToCart={handleAddToCart}
            />

            {/* 3. The Best Fertilizer of the Year */}
            <CategoryCarousel
              id="best-of-year"
              title="The best fertilizer of the year"
              description="Highest rated agronomist-accredited formulas for maximum harvest ROI."
              products={bestOfYearProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#0F5132]/30 border-t-[#0F5132] rounded-full animate-spin" />
        </div>
      }
    >
      <MarketplaceContent />
    </Suspense>
  );
}
