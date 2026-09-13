'use client';

import React, { useState } from 'react';
import { X, Sprout, Building2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'farmer' | 'seller';
}

export default function RegisterModal({ isOpen, onClose, defaultRole = 'farmer' }: RegisterModalProps) {
  const [role, setRole] = useState<'farmer' | 'seller'>(defaultRole);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Battambang Agricultural Basin',
    farmSize: '5',
    primaryCrop: 'Rice',
    businessName: '',
    licenseNumber: '',
    warehouseLocation: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 2.5 seconds or let user close
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cropwise-emerald to-[#0b3d26] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold mb-2">
            <Sprout className="w-3.5 h-3.5" />
            <span>Join CropWise Agri-Platform</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Create Your Account
          </h2>
          <p className="text-emerald-100/80 text-xs mt-1">
            Connect directly with verified fertilizer sellers & local farmer cooperatives.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-cropwise-emerald rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-cropwise-emerald" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Registration Successful!
              </h3>
              <p className="text-stone-600 text-sm max-w-sm mx-auto">
                Welcome to CropWise! Your {role === 'farmer' ? 'Farmer' : 'Fertilizer Seller'} profile has been registered in our prototype sandbox.
              </p>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 text-left space-y-1">
                <div className="font-semibold text-stone-800">Account Type: {role === 'farmer' ? '🌾 Smallholder / Commercial Farmer' : '🏪 Accredited Fertilizer Dealer'}</div>
                <div>Status: <span className="text-emerald-700 font-semibold">Active Prototype Profile</span></div>
                <div>Next Step: Once the FastAPI backend is launched, SMS verification will be enabled.</div>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 px-4 bg-cropwise-emerald hover:bg-cropwise-emerald-hover text-white font-semibold text-sm rounded-xl transition-all shadow-md"
              >
                Back to Marketplace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection Tabs */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  I Want To Register As:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-sm font-semibold transition-all ${
                      role === 'farmer'
                        ? 'border-cropwise-emerald bg-cropwise-emerald/10 text-cropwise-emerald shadow-sm'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Sprout className="w-4 h-4" />
                    <span>Farmer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-sm font-semibold transition-all ${
                      role === 'seller'
                        ? 'border-cropwise-emerald bg-cropwise-emerald/10 text-cropwise-emerald shadow-sm'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Fertilizer Seller</span>
                  </button>
                </div>
              </div>

              {/* Common Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {role === 'farmer' ? 'Full Name' : 'Authorized Representative Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sokha Chhay"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-cropwise-emerald/20 focus:border-cropwise-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Telegram / Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+855 12 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-cropwise-emerald/20 focus:border-cropwise-emerald"
                  />
                </div>

                {role === 'farmer' ? (
                  /* Farmer Specific */
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Primary Crop
                        </label>
                        <select
                          value={formData.primaryCrop}
                          onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-cropwise-emerald/20 focus:border-cropwise-emerald bg-white"
                        >
                          <option>Wet Season Rice</option>
                          <option>Dry Season Rice</option>
                          <option>Cassava</option>
                          <option>Maize / Corn</option>
                          <option>Fruit Orchards</option>
                          <option>Pepper / Spices</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Farm Area (Hectares)
                        </label>
                        <input
                          type="number"
                          min="0.5"
                          step="0.5"
                          value={formData.farmSize}
                          onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-cropwise-emerald/20 focus:border-cropwise-emerald"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-cropwise-emerald shrink-0 mt-0.5" />
                      <span>
                        Registered farmers unlock bulk cooperative discounts and seasonal fertilizer alerts directly to Telegram.
                      </span>
                    </div>
                  </>
                ) : (
                  /* Seller Specific */
                  <>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Agri-Chemical Business / Dealership Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mekong Agro-Trade Co., Ltd."
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-cropwise-emerald/20 focus:border-cropwise-emerald"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        MAFF Fertilizer Retail License / Registration No.
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MAFF-FERT-2024-8891"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-cropwise-emerald/20 focus:border-cropwise-emerald"
                      />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        Verified fertilizer sellers get direct farm buyer inquiries and can list inventory on the high-velocity catalog.
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-cropwise-emerald hover:bg-cropwise-emerald-hover active:scale-[0.99] text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2"
              >
                <span>Complete {role === 'farmer' ? 'Farmer' : 'Seller'} Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
