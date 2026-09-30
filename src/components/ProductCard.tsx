import React, { useState } from 'react';
import type { Product } from '../types/product';
import { Eye, Plus, Check, Sparkles, Info } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  isInQuote: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToQuote,
  isInQuote,
}) => {
  const [imageError, setImageError] = useState(false);

  // Parse colors into badges
  const colorList = product.colors
    ? product.colors.split(',').map((c) => c.trim())
    : [];

  // Enforce pure white background placeholder URL if needed
  const imageUrl = product.image
    ? product.image.replace('/1A1A1A/C5A059', '/FFFFFF/0B1D3A')
    : `https://placehold.co/400x400/FFFFFF/0B1D3A?text=${encodeURIComponent(product.sku)}`;

  return (
    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 hover:border-[#C5A059] transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between group">
      
      {/* Top Image Container: Studio-Grade Pure White Canvas (#FFFFFF) */}
      <div className="relative aspect-square bg-white border-b border-gray-100 p-6 flex items-center justify-center overflow-hidden">
        
        {/* Category & SKU Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
          <span className="bg-[#0B1D3A] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded shadow tracking-wider border border-[#0B1D3A]">
            {product.sku}
          </span>
          <span className="bg-white/95 text-[#0B1D3A] text-[9px] font-bold px-2 py-0.5 rounded border border-[#C5A059]/60 shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Studio White Product Visual or Clean Typographic Fallback */}
        {!imageError ? (
          <img
            src={imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Pristine Typographic Product Tile Fallback (Pure White Canvas) */
          <div className="w-full h-full bg-white flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-[#0B1D3A]/5 border border-[#C5A059]/60 flex items-center justify-center mb-2 shadow-xs">
              <Sparkles className="w-7 h-7 text-[#0B1D3A]" />
            </div>
            <span className="text-[#0B1D3A] font-mono text-xs font-bold tracking-wider">
              {product.sku}
            </span>
            <span className="text-[#C5A059] font-bold text-xs mt-1 line-clamp-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Hover Quick View Overlay Button */}
        <div className="absolute inset-0 bg-[#0B1D3A]/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 p-4">
          <button
            onClick={() => onSelect(product)}
            className="bg-[#0052CC] hover:bg-[#0043A8] text-white p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center cursor-pointer border border-white/20"
            title="Quick View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Sub category */}
          <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-bold block mb-1">
            {product.sub_category}
          </span>

          {/* Product Name */}
          <h3 
            onClick={() => onSelect(product)}
            className="text-base font-bold text-white group-hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>

          {/* Specs & Material Table/List */}
          <div className="mt-3 space-y-1.5 text-xs text-gray-300">
            <div className="flex items-start justify-between border-b border-gray-800/80 pb-1">
              <span className="text-gray-500 text-[11px]">Specs:</span>
              <span className="font-medium text-gray-200 text-right">{product.specs}</span>
            </div>
            <div className="flex items-start justify-between border-b border-gray-800/80 pb-1">
              <span className="text-gray-500 text-[11px]">Material:</span>
              <span className="font-medium text-gray-200 text-right">{product.material}</span>
            </div>
          </div>

          {/* Colors Pill Badges */}
          {colorList.length > 0 && (
            <div className="mt-3 flex items-center space-x-1 overflow-x-auto pb-1">
              <span className="text-gray-500 text-[10px] mr-1">Colors:</span>
              {colorList.map((color, idx) => (
                <span
                  key={idx}
                  className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded-full border border-gray-700 whitespace-nowrap"
                >
                  {color}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center space-x-2">
          <button
            onClick={() => onSelect(product)}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200 py-2 px-3 rounded text-xs font-semibold flex items-center justify-center space-x-1 transition-colors cursor-pointer border border-gray-700"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onAddToQuote(product)}
            className={`flex-1 py-2 px-3 rounded text-xs font-semibold flex items-center justify-center space-x-1 transition-all cursor-pointer ${
              isInQuote
                ? 'bg-[#C5A059] text-[#1A1A1A] font-bold'
                : 'bg-[#0052CC] hover:bg-[#0043A8] text-white shadow'
            }`}
          >
            {isInQuote ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Quote</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
