import React from 'react';
import type { Product } from '../types/product';
import { X, Check, ShoppingBag, Shield, Truck, Printer } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  isInQuote: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isInQuote,
}) => {
  if (!product) return null;

  const imageUrl = product.image
    ? product.image.replace('/1A1A1A/C5A059', '/FFFFFF/0B1D3A')
    : `https://placehold.co/400x400/FFFFFF/0B1D3A?text=${encodeURIComponent(product.sku)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-[#1A1A1A] rounded-xl border border-[#C5A059]/60 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column Studio White Image Canvas (#FFFFFF) */}
          <div className="bg-white p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative">
            <div className="absolute top-4 left-4">
              <span className="bg-[#0B1D3A] text-white text-xs font-mono px-2.5 py-1 rounded font-bold shadow">
                {product.sku}
              </span>
            </div>
            
            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-64 object-contain rounded my-4 p-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/FFFFFF/0B1D3A?text=' + encodeURIComponent(product.sku);
              }}
            />

            <span className="text-xs text-[#0B1D3A] font-bold bg-[#C5A059]/20 px-3 py-1 rounded-full border border-[#C5A059]/50">
              Custom Logo Printable
            </span>
          </div>

          {/* Right Column Product Info */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div>
                <span className="text-xs text-[#C5A059] font-semibold uppercase tracking-wider">
                  {product.category} • {product.sub_category}
                </span>
                <h2 className="text-xl font-bold text-white mt-1 leading-snug">
                  {product.name}
                </h2>
              </div>

              {/* Specifications Box */}
              <div className="bg-[#121212] p-4 rounded-lg border border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-800 pb-1.5">
                  <span className="text-gray-400">Specifications:</span>
                  <span className="text-gray-200 font-semibold">{product.specs}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1.5">
                  <span className="text-gray-400">Material Composition:</span>
                  <span className="text-gray-200 font-semibold">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available Colors:</span>
                  <span className="text-[#C5A059] font-semibold">{product.colors}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-1.5 text-xs text-gray-300 pt-1">
                <div className="flex items-center space-x-2">
                  <Printer className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>Screen, Laser Engraving & UV Print Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>ISO Certified Corporate Quality Standard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>Pan-India Doorstep Bulk Logistics</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => {
                  onAddToQuote(product);
                }}
                className={`w-full py-3 px-4 rounded font-semibold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isInQuote
                    ? 'bg-[#C5A059] text-[#1A1A1A] font-bold'
                    : 'bg-[#0052CC] hover:bg-[#0043A8] text-white shadow-lg'
                }`}
              >
                {isInQuote ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Quote Basket</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Corporate Quote</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
