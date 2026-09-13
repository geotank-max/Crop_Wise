'use client';

import React, { useState } from 'react';
import {
  Building2,
  Package,
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';

interface SellerHubProps {
  onOpenRegister?: (role: 'farmer' | 'seller') => void;
}

export default function SellerHub({ onOpenRegister }: SellerHubProps = {}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sellerProducts, setSellerProducts] = useState(PRODUCTS.slice(0, 4));
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-1',
      farmer: 'Sokha Chhay (Rice Cooperative)',
      location: 'Battambang (Bavel)',
      product: 'Phosphate-Rich Super 16-16-8+TE',
      volume: '50 Bags',
      offeredTotal: '$1,725.00',
      status: 'Awaiting Dealer Confirmation',
      time: '12 mins ago'
    },
    {
      id: 'inq-2',
      farmer: 'Rithy Kem (Cassava Producer)',
      location: 'Pailin Border District',
      product: 'Potassium Nitrate Soluble Booster',
      volume: '20 Sacks',
      offeredTotal: '$840.00',
      status: 'Ready for Dispatch',
      time: '45 mins ago'
    },
    {
      id: 'inq-3',
      farmer: 'Dara Heng (Durian Orchard)',
      location: 'Kampot Foothills',
      product: 'Quick-Acting Liquid Calcium-Boron',
      volume: '15 Canisters',
      offeredTotal: '$465.00',
      status: 'Paid via KHQR Bakong',
      time: '2 hours ago'
    }
  ]);

  const [newFertilizer, setNewFertilizer] = useState({
    title: '',
    npk: '',
    price: '',
    stock: '',
    category: 'most-sold-out'
  });

  const [addSuccess, setAddSuccess] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `p-${Date.now()}`,
      title: newFertilizer.title,
      brand: 'Dealer Verified Formula',
      seller: 'Angkor Agri Supply Co.',
      sellerLocation: 'Battambang Main Depot',
      sellerVerified: true,
      maffLicense: 'MAFF-FERT-2024-9102',
      price: parseFloat(newFertilizer.price) || 30.0,
      unit: '50kg Bag',
      rating: 5.0,
      reviewCount: 1,
      category: newFertilizer.category as any,
      categoryBadge: 'Newly Listed',
      riskLevel: 'green',
      riskLabel: 'Newly Verified Batch',
      riskDescription: 'Freshly registered fertilizer listing active in regional marketplace.',
      npkRatio: newFertilizer.npk || '16-16-8',
      suitability: 'All Seasonal Crops',
      targetCrops: ['Rice', 'Corn'],
      imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
      stockStatus: `${newFertilizer.stock} Bags in Depot`,
      inStock: true,
      highlightTag: 'New Listing',
      applicationGuide: 'Broadcast evenly during basal soil preparation or early tillering stage.',
      dosageRate: '150 - 200 kg / hectare',
      soilPhRange: 'pH 5.5 - 7.0',
      leachingResistance: 'Standard formulation',
      reviews: []
    };

    setSellerProducts([created, ...sellerProducts]);
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setIsAddModalOpen(false);
      setNewFertilizer({ title: '', npk: '', price: '', stock: '', category: 'most-sold-out' });
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Seller Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-cropwise-emerald p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Fertilizer Seller & Distributor Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Monetize Agri-Commerce with Guaranteed Demand
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Sell directly to thousands of verified farmers without middlemen. Track warehouse stock depletion,
            receive automated bulk purchase requests, and gain MAFF certification accreditation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-cropwise-emerald hover:bg-cropwise-emerald-hover text-white text-xs font-bold py-3 px-5 rounded-xl shadow-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>List New Fertilizer Batch</span>
            </button>

            {onOpenRegister ? (
              <button
                onClick={() => onOpenRegister('seller')}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-3 px-5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Apply for Official MAFF Dealer Badge</span>
              </button>
            ) : (
              <a
                href="/register"
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-3 px-5 rounded-xl border border-white/20 transition-all flex items-center gap-2 inline-flex"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Apply for Official MAFF Dealer Badge</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Seller Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start text-stone-500 text-xs font-semibold">
            <span>Direct Orders This Month</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-cropwise-emerald">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-2 font-serif">$28,450.00</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last seasonal cycle</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start text-stone-500 text-xs font-semibold">
            <span>Bags Sold Out (Velocity)</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-2 font-serif">1,480 Bags</div>
          <div className="text-xs text-stone-500 mt-1">
            Urea 46% & NPK 16-16-8 leading
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start text-stone-500 text-xs font-semibold">
            <span>Active Farmer Buyers</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-2 font-serif">312 Farmers</div>
          <div className="text-xs text-stone-500 mt-1">
            42 agricultural cooperatives connected
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start text-stone-500 text-xs font-semibold">
            <span>Warehouse Stock Status</span>
            <span className="p-2 rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-2 font-serif">2 Low Alerts</div>
          <div className="text-xs text-red-500 mt-1 font-medium">
            Restock required for Basal NPK
          </div>
        </div>
      </div>

      {/* Live Incoming Farmer Inquiries Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Incoming Farmer Bulk Quote Requests
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Farmers requesting direct warehouse dispatch or farm delivery.
            </p>
          </div>
          <span className="text-xs font-bold text-cropwise-emerald bg-emerald-50 px-3 py-1 rounded-full self-start">
            Live Prototype RFQ Stream
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-6">Farmer & Location</th>
                <th className="py-3.5 px-6">Product Requested</th>
                <th className="py-3.5 px-6">Order Volume</th>
                <th className="py-3.5 px-6">Total Value</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-stone-900">
                    <div>{inq.farmer}</div>
                    <div className="text-[11px] text-stone-400 font-normal">{inq.location} &bull; {inq.time}</div>
                  </td>
                  <td className="py-4 px-6 text-stone-700 font-medium">
                    {inq.product}
                  </td>
                  <td className="py-4 px-6 font-bold text-stone-900">
                    {inq.volume}
                  </td>
                  <td className="py-4 px-6 font-bold text-cropwise-emerald">
                    {inq.offeredTotal}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => alert(`Confirmed order #${inq.id} for ${inq.farmer}. SMS confirmation sent!`)}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-cropwise-emerald text-white font-semibold rounded-lg transition-colors"
                    >
                      Accept & Dispatch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: List New Fertilizer */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-900 p-6 text-white relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-serif font-bold">List New Fertilizer Batch</h3>
              <p className="text-xs text-stone-400 mt-1">Add your product to the live farmer marketplace catalog.</p>
            </div>

            <div className="p-6">
              {addSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-cropwise-emerald mx-auto" />
                  <div className="font-bold text-lg text-stone-900">Product Added to Catalog!</div>
                  <p className="text-xs text-stone-500">Farmers in your agricultural zone can now view and order this fertilizer.</p>
                </div>
              ) : (
                <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Fertilizer Name / Formulation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Phosphate Super Booster 16-20-0"
                      value={newFertilizer.title}
                      onChange={(e) => setNewFertilizer({ ...newFertilizer, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">NPK Formula Ratio</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 16-20-0"
                        value={newFertilizer.npk}
                        onChange={(e) => setNewFertilizer({ ...newFertilizer, npk: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Wholesale Price ($ / 50kg)</label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        placeholder="35.00"
                        value={newFertilizer.price}
                        onChange={(e) => setNewFertilizer({ ...newFertilizer, price: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Stock Quantity (Bags)</label>
                      <input
                        type="number"
                        required
                        placeholder="100"
                        value={newFertilizer.stock}
                        onChange={(e) => setNewFertilizer({ ...newFertilizer, stock: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Marketplace Category</label>
                      <select
                        value={newFertilizer.category}
                        onChange={(e) => setNewFertilizer({ ...newFertilizer, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl bg-white"
                      >
                        <option value="most-sold-out">Most Sold Out</option>
                        <option value="seasonal">This Season Match</option>
                        <option value="best-of-year">Best of the Year</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cropwise-emerald hover:bg-cropwise-emerald-hover text-white font-bold rounded-xl mt-2 shadow-md"
                  >
                    Publish Listing to Farmers
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
