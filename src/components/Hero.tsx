'use client';
import React from 'react';
import Link from 'next/link';
import { Palette, ShieldCheck, PackageCheck, Truck, ArrowRight, Award } from 'lucide-react';
import { HeroCarousel } from './HeroCarousel';
import { PopularProducts } from './PopularProducts';

export const Hero: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Design and Customization",
      desc: "Bespoke branding, 3D digital mockups, and logo placement tailored to your brand identity.",
      icon: Palette,
    },
    {
      num: "02",
      title: "Production & Quality",
      desc: "Precision manufacturing using state-of-the-art materials and strict ISO multi-tier quality checks.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "Inventory & Fulfilment",
      desc: "Dedicated corporate warehousing, kitting, and custom gift box assembly ready for dispatch.",
      icon: PackageCheck,
    },
    {
      num: "04",
      title: "Shipping & Support",
      desc: "Doorstep pan-India & global delivery with end-to-end tracking and key account manager support.",
      icon: Truck,
    },
  ];

  return (
    <section id="hero" className="relative bg-white text-[#0B1D3A] pt-8 pb-20 overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Full-width Image Carousel */}
        <HeroCarousel />

        {/* Popular Product Categories */}
        <PopularProducts />

        {/* Headline, Steps & CTA */}
        <div className="pt-6 space-y-8">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#0068C8]/10 border border-[#0068C8]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0068C8]">
            <Award className="w-4 h-4 text-[#0068C8]" />
            <span className="uppercase tracking-wider">End to End Promotional Solution</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B1D3A] leading-tight font-sans">
              You Focus on Your Brand. <br className="hidden sm:inline" />
              <span className="text-[#0068C8]">
                We Handle the Rest.
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              From product selection and custom design to inventory, shipping and ongoing support, Luckys Promo manages every step making corporate gifting and promotional merchandise simple and stress free.
            </p>
          </div>

          {/* 2x2 Grid of Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white border border-gray-200 hover:border-[#0068C8]/50 p-5 rounded-lg transition-all duration-300 hover:shadow-md group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[#0068C8] font-mono text-xs font-bold px-2 py-0.5 bg-[#0068C8]/10 rounded border border-[#0068C8]/20">
                      {step.num}
                    </span>
                    <IconComponent className="w-5 h-5 text-[#0068C8] transition-colors duration-200" />
                  </div>
                  <h3 className="text-[#0B1D3A] font-semibold text-base mb-1 group-hover:text-[#0068C8] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center pt-2">
            <Link
              href="/products"
              className="bg-[#0068C8] hover:bg-[#0054A3] text-white font-semibold px-7 py-3.5 rounded-sm text-sm transition-all duration-200 shadow-md flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Browse Product Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
