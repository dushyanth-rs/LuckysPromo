'use client';
import React from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { label: 'Lanyards', img: '/hero/categories/lanyards.jpg' },
  { label: 'ID Cards', img: '/hero/categories/id-cards.jpg' },
  { label: 'Pouches', img: '/hero/categories/pouches.jpg' },
  { label: 'Water Bottles', img: '/hero/categories/water-bottles.jpg' },
  { label: 'Dairies', img: '/hero/categories/dairies.jpg' },
  { label: 'Pens', img: '/hero/categories/pens.jpg' },
  { label: 'Mugs', img: '/hero/categories/mugs.jpg' },
  { label: 'Certificates', img: '/hero/categories/certificates.jpg' },
];

export const PopularProducts: React.FC = () => {
  return (
    <div className="py-10 border-b border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#0B1D3A]">Popular Products</h3>
        <Link
          href="/products"
          className="text-sm font-semibold text-[#0068C8] hover:text-[#0054A3] underline underline-offset-4 cursor-pointer"
        >
          See All Products
        </Link>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            href="/products"
            className="flex flex-col items-center space-y-2 group cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-gray-200 group-hover:border-[#0068C8]/60 shadow-sm transition-colors">
              <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] sm:text-xs text-gray-600 group-hover:text-[#0068C8] font-medium text-center transition-colors">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
