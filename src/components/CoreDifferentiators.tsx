import React from 'react';
import { LayoutGrid, Sliders, ShieldCheck, Tag, Clock, Headset } from 'lucide-react';

export const CoreDifferentiators: React.FC = () => {
  const items = [
    {
      num: "01",
      title: "Wide Product Range",
      desc: "Over 500+ curated corporate products ranging from thermos bottles and executive diaries to eco-friendly sets & tech novelties.",
      icon: LayoutGrid,
    },
    {
      num: "02",
      title: "Complete Customization",
      desc: "Comprehensive branding choices including laser engraving, UV printing, gold foil stamping, and bespoke color matching.",
      icon: Sliders,
    },
    {
      num: "03",
      title: "Premium Quality",
      desc: "Crafted from high-grade materials like 304 stainless steel, genuine PU leather, and eco-bamboo with multi-tier QA audits.",
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "Competitive Pricing",
      desc: "Direct factory manufacturing partnerships allow transparent, tiered volume discounts with zero hidden charges.",
      icon: Tag,
    },
    {
      num: "05",
      title: "On-Time Delivery",
      desc: "Guaranteed event and campaign deadline fulfillment with real-time consignment dispatch tracking.",
      icon: Clock,
    },
    {
      num: "06",
      title: "Dedicated Support",
      desc: "Personalized corporate account manager assigned to your account for quick 3D sample renders and instant inquiries.",
      icon: Headset,
    },
  ];

  return (
    <section id="differentiators" className="py-20 bg-gray-50 text-[#1A1A1A] relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-widest bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/30">
            Why Manpointe & Luckys Promo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight font-sans">
            Everything Your Brand Needs, All in One Place.
          </h2>
          <div className="w-20 h-1 bg-[#0052CC] mx-auto rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            We simplify corporate gifting with turn-key solutions built on reliability, aesthetic precision, and unmatched corporate standards.
          </p>
        </div>

        {/* 3x2 Grid of Soft Stone (#F4F5F7) Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-[#F4F5F7] rounded-lg p-6 border border-gray-200/80 hover:border-[#C5A059]/60 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#0B1D3A] font-mono text-sm font-bold bg-white px-3 py-1 rounded border border-gray-300 shadow-2xs group-hover:bg-[#0052CC] group-hover:text-white transition-colors">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
                      <Icon className="w-5 h-5 text-[#0052CC] group-hover:text-[#C5A059] transition-colors" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0B1D3A] mb-2 group-hover:text-[#0052CC] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Decorative Gold Line on Hover */}
                <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#0052CC] via-[#C5A059] to-[#0052CC] transition-all duration-500 rounded-full" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
