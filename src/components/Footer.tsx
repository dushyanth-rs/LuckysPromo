import React from 'react';
import { Mail, Phone, ArrowUp, Building2 } from 'lucide-react';
import { ManpointeLogo } from './ManpointeLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B1D3A] text-white border-t border-[#152B52] relative pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#152B52]">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Logo Component */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={scrollToTop}>
              <div className="relative w-10 h-10 bg-white rounded-lg p-1 shadow-md flex items-center justify-center shrink-0 border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                <ManpointeLogo className="w-8 h-8" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl font-bold tracking-wider text-white uppercase font-sans leading-none">
                  LUCKYS PROMO
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium leading-tight mt-1">
                  BEYOND ORDINARY GIFTING • Venture of MANPOINTE TECH LLP
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-md pt-2">
              Luckys Promo delivers premium corporate gifting, promotional merchandise, and custom logo printing solutions for enterprise clients across India.
            </p>

            <div className="pt-2 text-xs text-[#C5A059] font-mono">
              ✦ ISO 9001:2015 Certified Corporate Supply Partner
            </div>

          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('printing')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Printing Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('differentiators')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Core Differentiators
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
              Corporate Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <Building2 className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                <span>MANPOINTE TECH LLP, Executive Corporate Plaza, Electronic City, Bengaluru</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>support@luckyspromo.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#0052CC] shrink-0" />
                <span>+91 80 4920 1888 / +91 99000 12345</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Developed for Manpointevents & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} LUCKYS PROMO (Venture of MANPOINTE TECH LLP). All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-[#C5A059] font-medium">
              Developed for <strong className="text-white">Manpointevents</strong>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 bg-[#152B52] hover:bg-[#0052CC] text-white rounded-full transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
