'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ManpointeLogo } from './ManpointeLogo';
import { SectionNavLink } from './SectionNavLink';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white text-[#0B1D3A] shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">

          {/* Brand Logo & Wordmark Container */}
          <SectionNavLink
            id="hero"
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            {/* Official Manpointe Geometric M Logo Tile */}
            <div className="relative w-12 h-12 bg-white rounded-xl p-1.5 shadow-sm flex items-center justify-center shrink-0 border border-gray-200 group-hover:border-[#0068C8]/50 transition-all duration-300 group-hover:scale-105">
              <ManpointeLogo className="w-9 h-9" />
            </div>

            {/* Wordmark & Stacked Sub-branding */}
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-[#0B1D3A] uppercase font-sans leading-none group-hover:text-[#0068C8] transition-colors">
                LUCKYS PROMO
              </span>
              <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#0068C8] font-bold leading-tight">
                  BEYOND ORDINARY GIFTING
                </span>
                <span className="hidden sm:inline-block text-gray-300 text-xs">•</span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-wide leading-tight">
                  Venture of MANPOINTE TECH LLP
                </span>
              </div>
            </div>
          </SectionNavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <SectionNavLink
              id="hero"
              className="text-gray-600 hover:text-[#0068C8] transition-colors duration-200 cursor-pointer"
            >
              Home
            </SectionNavLink>
            <SectionNavLink
              id="printing"
              className="text-gray-600 hover:text-[#0068C8] transition-colors duration-200 cursor-pointer"
            >
              Printing
            </SectionNavLink>
            <SectionNavLink
              id="differentiators"
              className="text-gray-600 hover:text-[#0068C8] transition-colors duration-200 cursor-pointer"
            >
              Why Us
            </SectionNavLink>
            <Link
              href="/products"
              className="text-gray-600 hover:text-[#0068C8] transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            >
              <span>Catalog</span>
              <span className="bg-[#0068C8]/10 text-[#0068C8] text-[10px] px-1.5 py-0.5 rounded font-bold">
                NEW
              </span>
            </Link>
            <SectionNavLink
              id="about"
              className="text-gray-600 hover:text-[#0068C8] transition-colors duration-200 cursor-pointer"
            >
              About Us
            </SectionNavLink>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-[#0068C8] transition-colors duration-200 cursor-pointer"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#0B1D3A] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3">
          <SectionNavLink
            id="hero"
            onNavigate={closeMobileMenu}
            className="block w-full text-left py-2 text-gray-600 hover:text-[#0068C8] text-base font-medium border-b border-gray-100"
          >
            Home
          </SectionNavLink>
          <SectionNavLink
            id="printing"
            onNavigate={closeMobileMenu}
            className="block w-full text-left py-2 text-gray-600 hover:text-[#0068C8] text-base font-medium border-b border-gray-100"
          >
            Printing Capabilities
          </SectionNavLink>
          <SectionNavLink
            id="differentiators"
            onNavigate={closeMobileMenu}
            className="block w-full text-left py-2 text-gray-600 hover:text-[#0068C8] text-base font-medium border-b border-gray-100"
          >
            Why Choose Us
          </SectionNavLink>
          <Link
            href="/products"
            onClick={closeMobileMenu}
            className="block w-full text-left py-2 text-gray-600 hover:text-[#0068C8] text-base font-medium border-b border-gray-100"
          >
            Product Catalog
          </Link>
          <SectionNavLink
            id="about"
            onNavigate={closeMobileMenu}
            className="block w-full text-left py-2 text-gray-600 hover:text-[#0068C8] text-base font-medium border-b border-gray-100"
          >
            About Us
          </SectionNavLink>
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="block w-full text-left py-2 text-gray-600 hover:text-[#0068C8] text-base font-medium"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};
