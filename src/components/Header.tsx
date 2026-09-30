import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { ManpointeLogo } from './ManpointeLogo';

interface HeaderProps {
  quoteCount: number;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ quoteCount, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1D3A] text-white shadow-xl border-b border-[#152B52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Brand Logo & Wordmark Container */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer group" 
            onClick={() => scrollToSection('hero')}
          >
            {/* Official Manpointe Geometric M Logo Tile */}
            <div className="relative w-12 h-12 bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center shrink-0 border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-all duration-300 group-hover:scale-105">
              <ManpointeLogo className="w-9 h-9" />
            </div>

            {/* Wordmark & Stacked Sub-branding */}
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white uppercase font-sans leading-none drop-shadow-sm group-hover:text-gray-100 transition-colors">
                LUCKYS PROMO
              </span>
              <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#C5A059] font-bold leading-tight">
                  BEYOND ORDINARY GIFTING
                </span>
                <span className="hidden sm:inline-block text-[#C5A059]/40 text-xs">•</span>
                <span className="text-[9px] sm:text-[10px] text-gray-300 font-medium tracking-wide leading-tight">
                  Venture of MANPOINTE TECH LLP
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-gray-200 hover:text-[#C5A059] transition-colors duration-200 cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('printing')} 
              className="text-gray-200 hover:text-[#C5A059] transition-colors duration-200 cursor-pointer"
            >
              Printing
            </button>
            <button 
              onClick={() => scrollToSection('differentiators')} 
              className="text-gray-200 hover:text-[#C5A059] transition-colors duration-200 cursor-pointer"
            >
              Why Us
            </button>
            <button 
              onClick={() => scrollToSection('catalog')} 
              className="text-gray-200 hover:text-[#C5A059] transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            >
              <span>Catalog</span>
              <span className="bg-[#C5A059]/20 text-[#C5A059] text-[10px] px-1.5 py-0.5 rounded font-bold">
                NEW
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-200 hover:text-[#C5A059] transition-colors duration-200 cursor-pointer"
            >
              About Us
            </button>
          </nav>

          {/* CTA & Quote Counter */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onOpenQuoteModal}
              className="relative bg-gradient-to-r from-[#0052CC] to-[#0043A8] hover:from-[#0043A8] hover:to-[#003380] text-white px-4 py-2.5 rounded-sm text-sm font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg border border-[#0052CC]/50 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Quote Request</span>
              {quoteCount > 0 && (
                <span className="bg-[#C5A059] text-[#1A1A1A] font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                  {quoteCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onOpenQuoteModal}
              className="relative p-2 text-white bg-[#0052CC] rounded-sm cursor-pointer"
              aria-label="Quote Drawer"
            >
              <ShoppingBag className="w-5 h-5" />
              {quoteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#1A1A1A] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {quoteCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071326] border-b border-[#0052CC]/30 px-4 pt-3 pb-6 space-y-3">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="block w-full text-left py-2 text-gray-200 hover:text-[#C5A059] text-base font-medium border-b border-gray-800"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('printing')} 
            className="block w-full text-left py-2 text-gray-200 hover:text-[#C5A059] text-base font-medium border-b border-gray-800"
          >
            Printing Capabilities
          </button>
          <button 
            onClick={() => scrollToSection('differentiators')} 
            className="block w-full text-left py-2 text-gray-200 hover:text-[#C5A059] text-base font-medium border-b border-gray-800"
          >
            Why Choose Us
          </button>
          <button 
            onClick={() => scrollToSection('catalog')} 
            className="block w-full text-left py-2 text-gray-200 hover:text-[#C5A059] text-base font-medium border-b border-gray-800"
          >
            Product Catalog
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="block w-full text-left py-2 text-gray-200 hover:text-[#C5A059] text-base font-medium"
          >
            About Us
          </button>

          <div className="pt-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full bg-[#0052CC] text-white py-3 rounded-sm font-semibold flex items-center justify-center space-x-2 text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Quote Cart ({quoteCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
