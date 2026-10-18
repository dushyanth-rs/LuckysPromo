'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Mail, Phone, ArrowUp, Building2, MessageCircle } from 'lucide-react';
import { ManpointeLogo } from './ManpointeLogo';
import { WHATSAPP_NUMBER } from '../lib/whatsapp';
import { SectionNavLink } from './SectionNavLink';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => {
    if (pathname !== '/') {
      router.push('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F5F5] text-[#0B1D3A] border-t border-gray-200 relative pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-200">

          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">

            {/* Logo Component */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={scrollToTop}>
              <div className="relative w-10 h-10 bg-white rounded-lg p-1 shadow-sm flex items-center justify-center shrink-0 border border-gray-200 group-hover:border-[#0068C8]/50 transition-colors">
                <ManpointeLogo className="w-8 h-8" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl font-bold tracking-wider text-[#0B1D3A] uppercase font-sans leading-none">
                  LUCKYS PROMO
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#0068C8] font-medium leading-tight mt-1">
                  BEYOND ORDINARY GIFTING • Venture of MANPOINTE TECH LLP
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-md pt-2">
              Luckys Promo delivers premium corporate gifting, promotional merchandise, and custom logo printing solutions for enterprise clients across India.
            </p>

            <div className="pt-2 text-xs text-[#0068C8] font-mono">
              ✦ ISO 9001:2015 Certified Corporate Supply Partner
            </div>

          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#0068C8] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <SectionNavLink id="hero" className="hover:text-[#0068C8] transition-colors cursor-pointer">
                  Home & Overview
                </SectionNavLink>
              </li>
              <li>
                <SectionNavLink id="printing" className="hover:text-[#0068C8] transition-colors cursor-pointer">
                  Printing Capabilities
                </SectionNavLink>
              </li>
              <li>
                <SectionNavLink id="differentiators" className="hover:text-[#0068C8] transition-colors cursor-pointer">
                  Core Differentiators
                </SectionNavLink>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#0068C8] transition-colors cursor-pointer">
                  Product Catalog
                </Link>
              </li>
              <li>
                <SectionNavLink id="about" className="hover:text-[#0068C8] transition-colors cursor-pointer">
                  About Us
                </SectionNavLink>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0068C8] transition-colors cursor-pointer">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#0068C8] uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex items-start space-x-2.5">
                <Building2 className="w-4 h-4 text-[#0068C8] shrink-0 mt-0.5" />
                <span>Amrutahalli, Byatarayanapura, Bengaluru, Karnataka 560092</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#0068C8] shrink-0" />
                <span>info@luckyspromo.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#0068C8] shrink-0" />
                <span>+91 78920 81305</span>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 text-[#25D366] hover:text-[#1EBE5A] transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Developed for Manpointe Tech LLP & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © {new Date().getFullYear()} LUCKYS PROMO (Venture of MANPOINTE TECH LLP). All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-[#0068C8] font-medium">
              Developed for <strong className="text-[#0B1D3A]">Manpointe Tech LLP</strong>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 bg-white hover:bg-[#0068C8] hover:text-white text-[#0B1D3A] border border-gray-200 rounded-full transition-colors cursor-pointer"
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
