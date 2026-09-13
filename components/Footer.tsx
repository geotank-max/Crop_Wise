'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-stone-50 border-t border-stone-200/80 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Wordmark */}
          <div className="space-y-3">
            <Logo size="sm" />
            <p className="text-stone-500 leading-relaxed text-xs">
              Direct marketplace connecting farmers with accredited fertilizer sellers for higher harvest yields.
            </p>
            <div className="text-[11px] text-stone-400">
              Agronomic Intelligence &bull; Tech Stack: Next.js, FastAPI, Docker, PostgreSQL
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-bold text-stone-900 mb-3 text-xs">
              Fertilizer Categories
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#most-sold-out" className="hover:text-[#0F5132] transition-colors">
                  The Most Sold Out Fertilizer
                </a>
              </li>
              <li>
                <a href="#seasonal" className="hover:text-[#0F5132] transition-colors">
                  Effective Fertilizer for This Season
                </a>
              </li>
              <li>
                <a href="#best-of-year" className="hover:text-[#0F5132] transition-colors">
                  The Best Fertilizer of the Year
                </a>
              </li>
              <li>
                <a href="#organic" className="hover:text-[#0F5132] transition-colors">
                  Organic &amp; Bio-Pellets
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Agri-Help */}
          <div>
            <h5 className="font-bold text-stone-900 mb-3 text-xs">
              Support &amp; Community
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#farmer-support" className="hover:text-[#0F5132] transition-colors">
                  Farmer Buying Assistance
                </a>
              </li>
              <li>
                <a href="#seller-portal" className="hover:text-[#0F5132] transition-colors">
                  Fertilizer Seller Registration
                </a>
              </li>
              <li>
                <a href="#soil-maps" className="hover:text-[#0F5132] transition-colors">
                  Rainfall &amp; Soil Guides
                </a>
              </li>
              <li>
                <span className="text-stone-700 font-semibold">Hotline: +855 23 888 777</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Channels (Facebook, IG, Google as requested) */}
          <div>
            <h5 className="font-bold text-stone-900 mb-3 text-xs">
              Connect With Us
            </h5>
            <p className="text-stone-500 mb-4 leading-relaxed text-xs">
              Join our channels for regional market updates, pricing alerts, and fertilizer advice.
            </p>

            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="CropWise on Facebook"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#1877F2] hover:border-[#1877F2] flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram (IG) */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="CropWise on Instagram"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#DD2A7B] hover:border-[#DD2A7B] flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Google */}
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
                title="Search CropWise on Google"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400 flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} CropWise Agri-Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#0F5132]">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-[#0F5132]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
