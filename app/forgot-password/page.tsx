'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Sprout,
  HelpCircle
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [accountIdentifier, setAccountIdentifier] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!accountIdentifier.trim()) {
      setErrorMessage('Please provide your registered email or phone number');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 700);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const enteredCode = otpCode.join('');
    if (enteredCode.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 750);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 flex flex-col font-sans selection:bg-[#0F5132] selection:text-white">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-stone-200/80 px-6 sm:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <Logo size="sm" />
        </Link>
        <Link
          href="/register"
          className="text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#0F5132] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In / Register</span>
        </Link>
      </header>

      {/* Main Form Container */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-stone-200/90 overflow-hidden">

          <div className="p-6 sm:p-8">

            {/* STEP 1: Enter Email / Phone to send OTP */}
            {step === 1 && (
              <div>

                <div className="text-center mb-6">
                  <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                    Reset Your Password
                  </h1>
                </div>

                {/* Method selector */}
                <div className="flex bg-stone-100 p-1 rounded-xl mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMethod('email');
                      setErrorMessage('');
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${method === 'email'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                      }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Address</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMethod('phone');
                      setErrorMessage('');
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${method === 'phone'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                      }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>SMS / Telegram</span>
                  </button>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSendCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {method === 'email' ? 'Registered Email Address' : 'Phone / Telegram Number'}
                    </label>
                    <div className="relative">
                      {method === 'email' ? (
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      ) : (
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      )}
                      <input
                        type={method === 'email' ? 'email' : 'tel'}
                        required
                        placeholder={
                          method === 'email'
                            ? 'e.g. sokha@agrifarm.kh'
                            : 'e.g. +855 12 345 678'
                        }
                        value={accountIdentifier}
                        onChange={(e) => setAccountIdentifier(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-[#0F5132] hover:bg-[#0B3D26] active:scale-[0.99] text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-emerald-950/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Recovery Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/register"
                    className="text-xs font-bold text-stone-600 hover:text-[#0F5132]"
                  >
                    Remember your password? Back to Sign In
                  </Link>
                </div>
              </div>
            )}

            {/* STEP 2: Enter 6-digit OTP & New Password */}
            {step === 2 && (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-2xs">
                  <Lock className="w-6 h-6" />
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                    Verify & Set Password
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
                    We sent a 6-digit code to{' '}
                    <span className="font-bold text-stone-800">{accountIdentifier}</span>.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                  {/* OTP 6-box input */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2 text-center">
                      Enter 6-Digit Code
                    </label>
                    <div className="flex justify-between gap-2">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-11 h-12 text-center text-lg font-black rounded-xl border border-stone-300 focus:border-[#0F5132] focus:ring-2 focus:ring-[#0F5132]/20 outline-none transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter new password (min 6 chars)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]"
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

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-[#0F5132] hover:bg-[#0B3D26] active:scale-[0.99] text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-emerald-950/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Update Password</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs font-semibold text-stone-500 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="hover:text-stone-800"
                    >
                      Change contact info
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpCode(['1', '2', '3', '4', '5', '6']);
                      }}
                      className="text-[#0F5132] hover:underline"
                    >
                      Resend code
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: Success Confirmation */}
            {step === 3 && (
              <div className="text-center py-4 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F5132] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-[#0F5132]" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                    Password Reset Complete!
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-xs mx-auto">
                    Your password has been successfully updated. You can now sign in with your new credentials.
                  </p>
                </div>

                <div className="pt-2 space-y-3">
                  <Link
                    href="/register"
                    className="w-full py-3.5 px-4 bg-[#0F5132] hover:bg-[#0B3D26] text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Sign In Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/"
                    className="w-full py-3 px-4 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm rounded-2xl transition-all block text-center"
                  >
                    Return to Fertilizer Marketplace
                  </Link>
                </div>
              </div>
            )}

            {/* Platform guarantee footer */}
            <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
              <span>Protected by CropWise Agricultural Security</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
