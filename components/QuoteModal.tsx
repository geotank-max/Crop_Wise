'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  MapPin,
  Truck,
  Star,
  Package,
  Layers,
  Sprout,
  Droplets,
  Award,
  Check,
  Building2,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { Product, RiskLevel } from '@/data/products';

interface QuoteModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ product, isOpen, onClose }: QuoteModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'agronomy' | 'order'>('overview');
  const [quantity, setQuantity] = useState(20);
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmLocation, setFarmLocation] = useState('Battambang District, Sangke');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const unitPrice = product.price;
  const subtotal = unitPrice * quantity;
  const deliveryFee = deliveryOption === 'delivery' ? 25 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const riskConfig: Record<
    RiskLevel,
    {
      bg: string;
      border: string;
      text: string;
      badgeText: string;
      dot: string;
      icon: React.ElementType;
      recommendation: string;
    }
  > = {
    green: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      badgeText: 'Green Alert: Low Market Risk (High Demand / Safe Window)',
      dot: 'bg-emerald-500',
      icon: ShieldCheck,
      recommendation: 'Optimal regional soil moisture & stable market pricing. High buyer demand makes forward reservation recommended.',
    },
    yellow: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      badgeText: 'Yellow Alert: Moderate Caution (Soil Test & Price Watch)',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
      recommendation: 'Check soil pH before bulk application. New import shipments arriving soon may stabilize local wholesale rates.',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      badgeText: 'Red Alert: High Risk (Weather & Climate Advisory)',
      dot: 'bg-red-500',
      icon: AlertOctagon,
      recommendation: 'Regional unseasonal dry spells or flood warnings in effect. Ensure access to controlled field irrigation before applying.',
    },
  };

  const risk = riskConfig[product.riskLevel] || riskConfig.green;
  const RiskIcon = risk.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="bg-[#0F5132] p-6 sm:p-8 text-white relative shrink-0">
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-white/20 text-emerald-100 text-xs font-bold uppercase tracking-wider">
              {product.categoryBadge}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-white/15 text-white text-xs font-mono font-bold">
              NPK: {product.npkRatio}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {product.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs sm:text-sm text-emerald-100/90 font-medium">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-300" />
              <span className="text-white font-bold">{product.seller}</span>
              {product.sellerVerified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              )}
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>{product.sellerLocation}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1 text-amber-300 font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>{product.rating} ({product.reviewCount} verified reviews)</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            NAVIGATION TABS
        ========================================================= */}
        <div className="flex items-center border-b border-stone-200 px-6 bg-stone-50 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#0F5132] text-[#0F5132]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Product Overview &amp; Risk
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('agronomy')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'agronomy'
                ? 'border-[#0F5132] text-[#0F5132]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Soil &amp; Dosage Guide
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('order')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'order'
                ? 'border-[#0F5132] text-[#0F5132]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Wholesale Quote Calculator
          </button>
        </div>

        {/* =========================================================
            BODY CONTENT
        ========================================================= */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW & RISK INTELLIGENCE */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Product Photo & Highlights */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full sm:w-52 h-44 rounded-2xl object-cover shadow-sm border border-stone-200 shrink-0"
                />
                <div className="space-y-3 flex-1">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    {product.brand} &bull; Formulation ID: {product.id}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-stone-900 font-serif">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-stone-500">/{product.unit}</span>
                    <span className="ml-2 text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                      {product.stockStatus}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {product.suitability}. Tested and certified for smallholder &amp; commercial plantations.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.targetCrops.map((crop) => (
                      <span key={crop} className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-bold rounded-full">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CropWise Market Risk Indicator Breakdown */}
              <div className={`p-5 rounded-2xl border ${risk.bg} ${risk.border} space-y-3`}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${risk.dot} animate-pulse shrink-0`} />
                  <RiskIcon className="w-5 h-5 text-stone-900 shrink-0" />
                  <h4 className="font-extrabold text-stone-900 text-base">
                    {risk.badgeText}
                  </h4>
                </div>
                <p className="text-sm text-stone-800 leading-relaxed">
                  <strong>Risk Assessment:</strong> {product.riskDescription}
                </p>
                <div className="p-3 bg-white/80 rounded-xl border border-stone-200/70 text-xs text-stone-700">
                  <strong>CropWise Agronomist Advisory:</strong> {risk.recommendation}
                </div>
              </div>

              {/* Seller Accreditation Box */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs sm:text-sm text-stone-700">
                <h5 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  <span>Verified Supply Chain Credentials</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div><strong>Seller Name:</strong> {product.seller}</div>
                  <div><strong>MAFF Retail License:</strong> {product.maffLicense}</div>
                  <div><strong>Dispatch Hub:</strong> {product.sellerLocation}</div>
                  <div><strong>Purity Guarantee:</strong> 100% Lab Verified NPK</div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('order')}
                  className="px-6 py-3 bg-[#0F5132] hover:bg-[#0B3D26] text-white font-bold text-sm rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Wholesale Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: AGRONOMY & SOIL DOSAGE GUIDE */}
          {activeTab === 'agronomy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                    <Sprout className="w-4 h-4 text-[#0F5132]" />
                    <span>Recommended Dosage Rate</span>
                  </div>
                  <div className="text-base font-extrabold text-[#0F5132] font-serif">
                    {product.dosageRate}
                  </div>
                  <p className="text-xs text-stone-500">
                    Calculated for standard field yields. Adjust for soil nutrient test baseline.
                  </p>
                </div>

                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span>Soil pH Compatibility</span>
                  </div>
                  <div className="text-base font-extrabold text-stone-900 font-serif">
                    {product.soilPhRange}
                  </div>
                  <p className="text-xs text-stone-500">
                    Leaching Resistance: {product.leachingResistance}
                  </p>
                </div>
              </div>

              {/* Application Instructions */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <h5 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Field Application Instructions</span>
                </h5>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {product.applicationGuide}
                </p>
              </div>

              {/* Farmer Reviews Section */}
              <div className="space-y-3 pt-2">
                <h5 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Verified Farmer Testimonials &amp; Harvest Results</span>
                </h5>
                <div className="space-y-3">
                  {product.reviews.map((rev, i) => (
                    <div key={i} className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900">{rev.author} &bull; <span className="text-stone-500 font-normal">{rev.location} ({rev.role})</span></span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('order')}
                  className="px-6 py-3 bg-[#0F5132] hover:bg-[#0B3D26] text-white font-bold text-sm rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Bulk Quote Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: WHOLESALE ORDER CALCULATOR */}
          {activeTab === 'order' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-[#0F5132] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-[#0F5132]" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900">
                    Order Request Sent to {product.seller}!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Your wholesale order for <strong>{quantity} units</strong> of {product.title} has been routed to the dealer. You will receive dispatch confirmation shortly.
                  </p>
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-sm text-stone-700 space-y-1.5 text-left max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span>Order Volume:</span>
                      <span className="font-bold text-stone-900">{quantity} {product.unit}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-black text-[#0F5132]">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-stone-200">
                      <span>Dispatch Depot:</span>
                      <span className="text-stone-700">{product.sellerLocation}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="py-3 px-6 bg-[#0F5132] text-white font-bold text-sm rounded-full shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Quantity */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-stone-900">
                        Order Quantity ({product.unit}s):
                      </label>
                      <span className="text-xs font-bold text-[#0F5132]">
                        Wholesale discount applies &ge; 50 units
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-28 px-3.5 py-2.5 rounded-xl border border-stone-300 text-base font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                      />
                      <div className="flex gap-2">
                        {[10, 20, 50, 100].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setQuantity(preset)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                              quantity === preset
                                ? 'bg-stone-900 text-white shadow-sm'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                          >
                            {preset} {product.unit.split(' ')[0]}s
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Option */}
                  <div>
                    <label className="block text-sm font-bold text-stone-900 mb-2">
                      Fulfillment Mode:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryOption('delivery')}
                        className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-xs font-medium transition-all ${
                          deliveryOption === 'delivery'
                            ? 'border-[#0F5132] bg-emerald-50/60 text-[#0F5132] font-bold shadow-sm'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <Truck className="w-4 h-4 shrink-0" />
                        <span>Farm Gate Direct Truck (+$25)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryOption('pickup')}
                        className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-xs font-medium transition-all ${
                          deliveryOption === 'pickup'
                            ? 'border-[#0F5132] bg-emerald-50/60 text-[#0F5132] font-bold shadow-sm'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>Depot Self-Pickup (Free)</span>
                      </button>
                    </div>
                  </div>

                  {/* Destination & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Farm Delivery Destination Village
                      </label>
                      <input
                        type="text"
                        required
                        value={farmLocation}
                        onChange={(e) => setFarmLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Farmer Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+855 12 345 678"
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                      />
                    </div>
                  </div>

                  {/* Price Calculation Summary */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-sm">
                    <div className="flex justify-between text-stone-600">
                      <span>Product Subtotal ({quantity} &times; ${unitPrice.toFixed(2)}):</span>
                      <span className="font-bold text-stone-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Transport Freight:</span>
                      <span className="font-bold text-stone-900">{deliveryOption === 'delivery' ? '$25.00' : '$0.00 (Self Pickup)'}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200 text-base font-black text-stone-900">
                      <span>Total Payable:</span>
                      <span className="text-[#0F5132] text-xl font-serif">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0F5132] hover:bg-[#0B3D26] active:scale-[0.99] text-white font-extrabold text-base rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Submit Purchase Order Request
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
