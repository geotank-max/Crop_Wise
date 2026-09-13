'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export default function Logo({ className = '', size = 'md', variant = 'dark' }: LogoProps) {
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  }[size];

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Redesigned Custom Geometric Brand Mark */}
      <div
        className={`relative ${iconDimensions} rounded-2xl bg-gradient-to-br from-[#0F5132] via-[#15803D] to-[#22C55E] flex items-center justify-center shadow-md shadow-emerald-950/20 group-hover:shadow-emerald-600/30 group-hover:scale-105 transition-all duration-300 shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 drop-shadow-sm"
        >
          {/* Stem & Curved Leaf Growth */}
          <path
            d="M16 26C16 20 18 14 26 10C24 18 18 22 16 26Z"
            fill="#FEF08A"
            className="opacity-90"
          />
          <path
            d="M16 26C16 18 13 11 6 8C7 16 12 21 16 26Z"
            fill="#FFFFFF"
          />
          {/* Sprout Core Accent */}
          <circle cx="16" cy="7" r="2.5" fill="#FACC15" />
          <path
            d="M16 26V16"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Redesigned Clean Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none">
          <span
            className={`font-black ${titleSizes} tracking-tight ${
              isLight ? 'text-white' : 'text-[#0F5132]'
            }`}
          >
            Crop
          </span>
          <span
            className={`font-black ${titleSizes} tracking-tight ${
              isLight ? 'text-emerald-300' : 'text-stone-900'
            }`}
          >
            Wise
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] ml-0.5" />
        </div>
        <span
          className={`font-bold ${subSizes} tracking-widest uppercase mt-0.5 ${
            isLight ? 'text-emerald-200/80' : 'text-stone-400'
          }`}
        >
          Agri-Commerce
        </span>
      </div>
    </div>
  );
}
