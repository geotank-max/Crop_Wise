'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sprout,
  Building2,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Logo from '@/components/Logo';
import {
  setUser,
  getPendingCartItem,
  clearPendingCartItem,
  getSavedCart,
  saveCart,
  User
} from '@/lib/auth';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTarget = searchParams.get('redirect');
  const queryItemTitle = searchParams.get('itemTitle');
  const queryItemId = searchParams.get('itemId');
  const queryItemPrice = searchParams.get('itemPrice');

  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [role, setRole] = useState<'farmer' | 'seller'>('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Form inputs
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleCompleteAuth = (authenticatedUser: User) => {
    setUser(authenticatedUser);

    // If there was a pending cart item, automatically persist it into user's cart
    const pendingItem = getPendingCartItem();
    if (pendingItem || (queryItemId && queryItemTitle)) {
      const itemToAdd = pendingItem || {
        id: queryItemId!,
        title: queryItemTitle!,
        price: queryItemPrice || 28.5,
        unit: '50kg Bag'
      };

      const currentCart = getSavedCart();
      const alreadyInCart = currentCart.some((item) => item.id === itemToAdd.id);
      if (!alreadyInCart) {
        saveCart([...currentCart, itemToAdd]);
      }
      clearPendingCartItem();
    }

    // Redirect back to marketplace
    const returnUrl = redirectTarget === 'cart' ? '/?addedCart=1' : '/';
    router.push(returnUrl);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (activeTab === 'register') {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name');
        return;
      }
      if (!agreedToTerms) {
        setErrorMessage('Please accept the CropWise terms of service');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        return;
      }
    }

    if (!emailOrPhone.trim() || !password.trim()) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const authenticatedUser: User = {
        id: 'usr_' + Date.now(),
        name: activeTab === 'register' ? name : (emailOrPhone.split('@')[0] || 'CropWise Member'),
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@phone.cropwise.kh`,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : undefined,
        role: role,
        provider: 'email'
      };
      handleCompleteAuth(authenticatedUser);
    }, 700);
  };

  const handleSocialAuth = (provider: 'google' | 'facebook' | 'instagram') => {
    setSocialLoading(provider);
    setErrorMessage('');

    setTimeout(() => {
      setSocialLoading(null);
      let providerName = 'Google Farmer';
      let providerEmail = 'user@gmail.com';

      if (provider === 'google') {
        providerName = 'Google User';
        providerEmail = 'farmer.account@gmail.com';
      } else if (provider === 'facebook') {
        providerName = 'Facebook Agri Member';
        providerEmail = 'user@facebook.com';
      } else if (provider === 'instagram') {
        providerName = 'Instagram Creator Farm';
        providerEmail = 'agri.harvest@instagram.com';
      }

      const authenticatedUser: User = {
        id: `usr_${provider}_${Date.now()}`,
        name: providerName,
        email: providerEmail,
        role: role,
        provider: provider
      };

      handleCompleteAuth(authenticatedUser);
    }, 800);
  };

  return (
    <div className="min-h-screen lg:h-screen w-full lg:overflow-hidden bg-[#FBFBF9] text-stone-900 flex flex-col lg:flex-row font-sans selection:bg-[#0F5132] selection:text-white">

      {/* =========================================================
          LEFT SIDE: BIGGER IMAGE SIDE (58-60% WIDTH) - TEXT ONLY, NO REVIEWS
      ========================================================= */}
      <div className="hidden lg:flex lg:w-[56%] xl:w-[58%] h-full relative bg-stone-900 overflow-hidden flex-col justify-between p-10 xl:p-14 text-white">
        {/* High-res background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=85"
            alt="Agricultural harvest and fertilizer fields"
            className="w-full h-full object-cover opacity-85 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#0B3D26]/60 to-black/40" />
          <div className="absolute inset-0 bg-[#0F5132]/35 mix-blend-multiply" />
        </div>

        {/* Top Logo on Picture */}
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              <div className="w-8 h-8 rounded-xl bg-[#0F5132] border border-emerald-400/40 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-white font-serif">
                CropWise<span className="text-emerald-400">.</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Text Only Section (Headline & Description - No reviews) */}
        <div className="relative z-10 space-y-5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Agricultural Marketplace</span>
          </div>

          <h2 className="text-3xl xl:text-5xl font-serif font-bold text-white leading-[1.15] tracking-tight">
            Quality fertilizers for every harvest.
          </h2>

          <p className="text-sm xl:text-base text-stone-200/90 font-normal leading-relaxed max-w-lg">
            Connecting farmers and accredited fertilizer suppliers with transparent regional pricing, lab-certified nutrients, and guaranteed seasonal delivery across Cambodia.
          </p>

          {/* Minimal Text Highlights */}
          <div className="pt-3 border-t border-white/15 space-y-2.5 text-xs text-stone-300">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="font-semibold text-white">Direct farm-gate pricing with no middleman markup</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <span className="font-semibold text-white">MAFF-registered & laboratory-verified formulations</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
              <span className="font-semibold text-white">Cooperative bulk orders with regional depot delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          RIGHT SIDE: COMFORTABLY PROPORTIONED REGISTRATION CARD
      ========================================================= */}
      <div className="w-full lg:w-[44%] xl:w-[42%] h-full flex flex-col justify-center items-center p-4 sm:p-6 lg:p-6 xl:p-8 relative bg-[#FCFCFA] overflow-y-auto no-scrollbar">

        {/* Ambient Picture Glow in background */}
        <div className="absolute -left-16 top-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/12 via-[#0F5132]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Floating / Header Bar with Sleek Interactive "Back to Marketplace" Pill */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-6 lg:top-5 lg:right-6 xl:top-6 xl:right-8 z-20 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-200/90 bg-white/95 hover:bg-white text-stone-700 hover:text-[#0F5132] hover:border-emerald-600/50 text-xs font-bold shadow-2xs hover:shadow-md transition-all duration-200 group cursor-pointer backdrop-blur-sm active:scale-95"
            title="Return to CropWise Marketplace"
          >
            <div className="w-5 h-5 rounded-full bg-stone-100 group-hover:bg-[#0F5132] text-stone-600 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
              <ArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </div>
            <span className="tracking-tight">Back to Marketplace</span>
          </Link>
        </div>

        {/* Mobile Logo for small screens where left picture is hidden */}
        <div className="lg:hidden absolute top-4 left-4 sm:top-5 sm:left-6 z-20">
          <Link href="/" className="group">
            <Logo size="sm" />
          </Link>
        </div>

        {/* Increased Size Form Card: Spacious, Legible & Wrapped with Clean Lines */}
        <div className="w-full max-w-[420px] xl:max-w-[440px] rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] my-auto">

          {/* Card Title */}
          <div className="mb-3 text-center">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 leading-tight">
              {activeTab === 'register' ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-stone-500 text-xs mt-1">
              {activeTab === 'register'
                ? 'Access direct wholesale fertilizer deals.'
                : 'Sign in to access your saved cart & orders.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-stone-100 p-1 rounded-xl mb-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'register'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
                }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'login'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800'
                }`}
            >
              Sign In
            </button>
          </div>

          {/* Social Authentication Section (Google, Facebook, Instagram) */}
          <div className="space-y-2 mb-3">
            {/* 1. Continue with Google */}
            <button
              type="button"
              onClick={() => handleSocialAuth('google')}
              disabled={socialLoading !== null}
              className="w-full py-2 px-3.5 bg-white hover:bg-stone-50 active:scale-[0.99] border border-stone-200 hover:border-stone-300 text-stone-800 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {socialLoading === 'google' ? (
                <div className="w-4 h-4 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            {/* 2. Continue with Facebook */}
            <button
              type="button"
              onClick={() => handleSocialAuth('facebook')}
              disabled={socialLoading !== null}
              className="w-full py-2 px-3.5 bg-[#1877F2] hover:bg-[#166fe5] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {socialLoading === 'facebook' ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
              <span>Continue with Facebook</span>
            </button>

            {/* 3. Continue with Instagram */}
            <button
              type="button"
              onClick={() => handleSocialAuth('instagram')}
              disabled={socialLoading !== null}
              className="w-full py-2 px-3.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-95 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {socialLoading === 'instagram' ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              )}
              <span>Continue with Instagram</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-2.5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <span className="relative bg-white px-2.5 text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Or with email / phone
            </span>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-2.5 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleFormSubmit} className="space-y-2.5">

            {/* Role Selection (Register mode only) */}
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Account Category:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${role === 'farmer'
                        ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132] shadow-2xs'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                  >
                    <Sprout className="w-3.5 h-3.5" />
                    <span>Farmer / Buyer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${role === 'seller'
                        ? 'border-[#0F5132] bg-emerald-50 text-[#0F5132] shadow-2xs'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Dealer</span>
                  </button>
                </div>
              </div>
            )}

            {/* Full Name (Register mode only) */}
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {role === 'farmer' ? 'Full Name' : 'Business / Contact Name'}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sokha Chhay"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]"
                  />
                </div>
              </div>
            )}

            {/* Email / Phone */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Email Address or Mobile Phone
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="farmer@example.com or +855 12 345 678"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-stone-700">
                  Password
                </label>
                {activeTab === 'login' && (
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-[#0F5132] hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register mode only) */}
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms Checkbox (Register mode only) */}
            {activeTab === 'register' && (
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#0F5132] rounded border-stone-300 focus:ring-[#0F5132]"
                />
                <label htmlFor="terms" className="text-xs text-stone-600 leading-none">
                  I agree to the CropWise{' '}
                  <a href="#" className="font-semibold text-stone-800 underline">
                    Terms
                  </a>{' '}
                  &{' '}
                  <a href="#" className="font-semibold text-stone-800 underline">
                    Guidelines
                  </a>
                  .
                </label>
              </div>
            )}

            {/* Forgot password link in Register mode */}
            {activeTab === 'register' && (
              <div className="text-right pt-0.5">
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-stone-500 hover:text-[#0F5132]"
                >
                  Trouble logging in? Reset Password
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#0F5132] hover:bg-[#0B3D26] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-950/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1.5"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {activeTab === 'register'
                      ? `Create ${role === 'farmer' ? 'Farmer' : 'Dealer'} Account`
                      : 'Sign In to Marketplace'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Trust Seal */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-xs text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F5132]" />
            <span>Direct MAFF-accredited agricultural platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#0F5132]/30 border-t-[#0F5132] rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
