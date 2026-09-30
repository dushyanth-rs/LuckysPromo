import React from 'react';
import { Palette, ShieldCheck, PackageCheck, Truck, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenQuote }) => {
  const steps = [
    {
      num: "01",
      title: "Design and Customization",
      desc: "Bespoke branding, 3D digital mockups, and gold/foil logo embossing tailored to your brand identity.",
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
    <section id="hero" className="relative bg-[#0B1D3A] text-white pt-12 pb-20 overflow-hidden border-b border-[#0052CC]/20">
      {/* Background Decorative Gold & Blue Ambient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0052CC]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split-screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Headline & 2x2 Step Grid */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#152B52]/80 border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059]">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span className="uppercase tracking-wider">Premium Corporate Gifting Partner</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                You Focus on Your Brand. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#F3E5C8] to-[#C5A059]">
                  We Handle the Rest.
                </span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Elevate your corporate identity with Luckys Promo's end-to-end promotional gift catalog, precision logo printing, and effortless bulk distribution solutions.
              </p>
            </div>

            {/* 2x2 Grid of Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={step.num} 
                    className="bg-[#071326]/80 backdrop-blur-sm border border-[#152B52] hover:border-[#C5A059]/50 p-5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#C5A059]/10 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[#C5A059] font-mono text-xs font-bold px-2 py-0.5 bg-[#C5A059]/10 rounded border border-[#C5A059]/30">
                        {step.num}
                      </span>
                      <IconComponent className="w-5 h-5 text-[#0052CC] group-hover:text-[#C5A059] transition-colors duration-200" />
                    </div>
                    <h3 className="text-white font-semibold text-base mb-1 group-hover:text-[#C5A059] transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="bg-[#0052CC] hover:bg-[#0043A8] text-white font-semibold px-7 py-3.5 rounded-sm text-sm transition-all duration-200 shadow-lg shadow-[#0052CC]/25 flex items-center justify-center space-x-2 group cursor-pointer border border-[#0052CC]"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onOpenQuote}
                className="bg-transparent hover:bg-[#152B52]/60 text-white font-semibold px-6 py-3.5 rounded-sm text-sm border border-[#C5A059]/60 hover:border-[#C5A059] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Request Custom Bulk Quote</span>
              </button>
            </div>

          </div>

          {/* Right Side: Matte Black & Gold Product Image Placeholder / Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Gold Ambient Glow Background */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C5A059]/40 via-[#0052CC]/30 to-[#C5A059]/40 opacity-75 blur-xl group-hover:opacity-100 transition duration-1000 animate-pulse" />
              
              {/* Product Visual Container (Matte Black #1A1A1A) */}
              <div className="relative bg-[#1A1A1A] rounded-xl border border-[#C5A059]/40 p-6 shadow-2xl space-y-6 overflow-hidden">
                
                {/* Gold Top Accent Line */}
                <div className="h-1 w-full bg-gradient-to-r from-[#C5A059] via-[#F3E5C8] to-[#C5A059] rounded-full" />
                
                {/* Header inside Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0052CC] animate-ping" />
                    <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                      Luxury Executive Box Showcase
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 bg-black/60 px-2 py-0.5 rounded border border-gray-800">
                    SKU: SRTC-H50
                  </span>
                </div>

                {/* Main Product Image Container */}
                <div className="relative bg-gradient-to-b from-[#121212] to-[#222222] rounded-lg p-6 border border-gray-800 flex flex-col items-center justify-center group overflow-hidden min-h-[260px]">
                  
                  {/* Decorative Subtle Grid Lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                  {/* Matte Black & Gold Gift Box SVG Illustration / Visual */}
                  <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-500 flex flex-col items-center">
                    <svg className="w-44 h-44 text-[#C5A059]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Box Base */}
                      <rect x="30" y="80" width="140" height="90" rx="6" fill="#0B1D3A" stroke="#C5A059" strokeWidth="3" />
                      {/* Lid */}
                      <rect x="24" y="60" width="152" height="28" rx="4" fill="#1A1A1A" stroke="#C5A059" strokeWidth="3" />
                      {/* Gold Ribbon Vertical */}
                      <rect x="90" y="60" width="20" height="110" fill="url(#goldGradient)" />
                      {/* Gold Ribbon Horizontal */}
                      <rect x="24" y="115" width="152" height="20" fill="url(#goldGradient)" />
                      {/* Ribbon Bow */}
                      <path d="M100 60 C80 40, 60 55, 90 60 Z" fill="#C5A059" />
                      <path d="M100 60 C120 40, 140 55, 110 60 Z" fill="#C5A059" />
                      <circle cx="100" cy="60" r="5" fill="#F3E5C8" />
                      
                      {/* Branding Stamp */}
                      <rect x="50" y="145" width="100" height="16" rx="2" fill="#1A1A1A" stroke="#C5A059" strokeWidth="1" />
                      <text x="100" y="156" fill="#C5A059" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                        LUCKYS PROMO
                      </text>

                      <defs>
                        <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#D4AF37" />
                          <stop offset="50%" stopColor="#C5A059" />
                          <stop offset="100%" stopColor="#9E7933" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Gold Metallic Badge overlay */}
                  <div className="absolute bottom-3 right-3 bg-[#0B1D3A]/90 border border-[#C5A059]/60 px-2.5 py-1 rounded text-[11px] text-[#C5A059] font-medium backdrop-blur-sm">
                    ✦ Gold Foil Stamping
                  </div>
                </div>

                {/* Details Footer inside Card */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#121212] p-2.5 rounded border border-gray-800">
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wide">Included Items</span>
                    <span className="text-white font-medium">Thermos, Diary & Pen</span>
                  </div>
                  <div className="bg-[#121212] p-2.5 rounded border border-gray-800">
                    <span className="text-gray-400 block text-[10px] uppercase tracking-wide">Minimum Order</span>
                    <span className="text-[#C5A059] font-medium">50 Units</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
