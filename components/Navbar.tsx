'use client';

import React, { useState } from 'react';
import {
  Sprout,
  Globe,
  User,
  ShoppingCart,
  ChevronDown,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { REGIONS } from '@/data/products';
import Logo from '@/components/Logo';
import { getUser, logout, User as AuthUser } from '@/lib/auth';

interface NavbarProps {
  currentLang: 'EN' | 'KM';
  onLanguageChange: (lang: 'EN' | 'KM') => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  cartCount?: number;
}

export default function Navbar({
  currentLang,
  onLanguageChange,
  selectedRegion,
  onRegionChange,
  cartCount = 0
}: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  React.useEffect(() => {
    setCurrentUser(getUser());
    const handler = () => setCurrentUser(getUser());
    window.addEventListener('cropwise_auth_change', handler);
    return () => window.removeEventListener('cropwise_auth_change', handler);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="w-full bg-white border-b border-stone-200/80 sticky top-0 z-40">
      {/* Spacious Navbar with edge-to-edge padding */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-5 sm:py-6">
        <div className="flex items-center justify-between">
          
          {/* =========================================================
              1. LEFT EDGE: LOGO
          ========================================================= */}
          <div className="flex-1 flex justify-start items-center">
            <a
              href="/"
              className="group cursor-pointer"
            >
              <Logo size="md" />
            </a>
          </div>

          {/* =========================================================
              2. CENTER: DROPDOWN NAVBAR (Mathematically Centered)
          ========================================================= */}
          <div className="hidden lg:flex flex-initial justify-center items-center gap-7">
            {/* Dropdown 1: Fertilizer Categories */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('categories')}
                className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-stone-800 hover:text-[#0F5132] py-2 transition-colors cursor-pointer"
              >
                <span>Fertilizer categories</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    openDropdown === 'categories' ? 'rotate-180 text-[#0F5132]' : ''
                  }`}
                />
              </button>

              {openDropdown === 'categories' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <a
                    href="#most-sold-out"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#0F5132]"
                  >
                    The Most Sold Out Fertilizer
                  </a>
                  <a
                    href="#seasonal"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#0F5132]"
                  >
                    Effective Fertilizer for This Season
                  </a>
                  <a
                    href="#best-of-year"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#0F5132]"
                  >
                    The Best Fertilizer of the Year
                  </a>
                </div>
              )}
            </div>

            {/* Dropdown 2: Farming Territory / Region */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('regions')}
                className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-stone-800 hover:text-[#0F5132] py-2 transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#0F5132] shrink-0" />
                <span className="max-w-[180px] truncate">{selectedRegion}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    openDropdown === 'regions' ? 'rotate-180 text-[#0F5132]' : ''
                  }`}
                />
              </button>

              {openDropdown === 'regions' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-5 py-1.5 text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Select Target Farming Zone
                  </div>
                  {REGIONS.map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => {
                        onRegionChange(region);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        selectedRegion === region
                          ? 'text-[#0F5132] font-bold bg-emerald-50/50'
                          : 'text-stone-700'
                      }`}
                    >
                      <span className="truncate">{region}</span>
                      {selectedRegion === region && (
                        <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* =========================================================
              3. RIGHT EDGE: TRANSLATE & REGISTER ICONS
          ========================================================= */}
          <div className="flex-1 flex justify-end items-center gap-6 sm:gap-8">
            {/* Translate / Language Pill */}
            <button
              type="button"
              onClick={() => onLanguageChange(currentLang === 'EN' ? 'KM' : 'EN')}
              className="flex flex-col items-center justify-center text-stone-700 hover:text-stone-950 transition-colors group cursor-pointer"
              title="Switch Language (English / Khmer)"
            >
              <Globe className="w-6 h-6 text-stone-700 group-hover:text-stone-950 transition-transform group-hover:scale-110" />
              <span className="text-xs sm:text-sm font-bold text-stone-700 mt-1 tracking-tight">
                {currentLang === 'EN' ? 'EN/USD $' : 'KM/KHR ៛'}
              </span>
            </button>

            {/* Shopping Cart Icon with Live Item Count */}
            <button
              type="button"
              className="flex flex-col items-center justify-center text-stone-700 hover:text-stone-950 transition-colors group relative cursor-pointer"
              title="View Cart"
            >
              <div className="relative">
                <div className="w-6 h-6 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-stone-700 group-hover:text-stone-950 transition-transform group-hover:scale-110" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#0F5132] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold text-stone-800 mt-1 tracking-tight group-hover:text-[#0F5132]">
                Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </span>
            </button>

            {/* User Account / Register */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('userMenu')}
                  className="flex flex-col items-center justify-center text-stone-700 hover:text-stone-950 transition-colors group cursor-pointer"
                  title="Your Account"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#0F5132] border border-emerald-300 flex items-center justify-center font-black text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-stone-800 mt-0.5 tracking-tight group-hover:text-[#0F5132] max-w-[70px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>

                {openDropdown === 'userMenu' && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 pb-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#0F5132]">
                        {currentUser.role === 'farmer' ? '🌾 Farmer Member' : '🏪 Fertilizer Dealer'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/register"
                className="flex flex-col items-center justify-center text-stone-700 hover:text-stone-950 transition-colors group relative cursor-pointer"
                title="Register Your Account"
              >
                <div className="relative">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <User className="w-6 h-6 text-stone-700 group-hover:text-stone-950 transition-transform group-hover:scale-110" />
                  </div>
                  {/* Red (1) Notification Badge */}
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    1
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-stone-800 mt-1 tracking-tight group-hover:text-[#0F5132]">
                  Register
                </span>
              </a>
            )}

            {/* Mobile Menu Icon */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-xl"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Submenu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-5 pt-4 border-t border-stone-200 space-y-4 pb-2">
            <div className="space-y-2 text-sm font-semibold">
              <a
                href="#most-sold-out"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-700 hover:text-[#0F5132] py-1"
              >
                The Most Sold Out Fertilizer
              </a>
              <a
                href="#seasonal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-700 hover:text-[#0F5132] py-1"
              >
                Effective Fertilizer for This Season
              </a>
              <a
                href="#best-of-year"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-700 hover:text-[#0F5132] py-1"
              >
                The Best Fertilizer of the Year
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
