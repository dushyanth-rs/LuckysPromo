import React from 'react';
import { Building2, Award, Sparkles } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white text-[#1A1A1A] relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Text on left, Luxury Gift Box Image/Visual on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Corporate Gifting Solutions Text */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="text-[#0052CC] font-bold text-xs uppercase tracking-widest bg-[#0052CC]/10 px-3 py-1 rounded-full border border-[#0052CC]/20">
                Corporate Legacy & Craftsmanship
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight font-sans leading-tight">
                About Luckys Promo <br />
                <span className="text-[#C5A059]">BEYOND ORDINARY GIFTING</span>
              </h2>
              <div className="w-16 h-1 bg-[#C5A059] rounded-full" />
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>LUCKYS PROMO</strong> is a specialized corporate merchandise and promotional gifting vertical operated as a venture of <strong>MANPOINTE TECH LLP</strong>. We specialize in curating premium, customized gift sets, executive diaries, drinkware, and tech accessories designed to foster lasting business relationships.
            </p>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              With complete in-house customization capabilities—ranging from precision screen and digital printing to laser engraving and gold foil stamping—we turn everyday utility items into impactful brand ambassadors. Whether welcoming new hires, celebrating milestone achievements, or engaging VIP clients, Luckys Promo guarantees immaculate quality and punctual delivery.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-[#F4F5F7] p-3.5 rounded-lg border border-gray-200">
                <Building2 className="w-5 h-5 text-[#0052CC] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1D3A]">MANPOINTE TECH LLP Enterprise</h4>
                  <p className="text-[11px] text-gray-500">Backed by robust corporate infrastructure & governance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#F4F5F7] p-3.5 rounded-lg border border-gray-200">
                <Award className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1D3A]">End-to-End Fulfillment</h4>
                  <p className="text-[11px] text-gray-500">Design, printing, packaging & pan-India distribution.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Placeholder Luxury Gift Box Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#0052CC]/20 via-[#C5A059]/30 to-[#0052CC]/20 blur-md" />

              {/* Luxury Gift Box Display Card */}
              <div className="relative bg-[#1A1A1A] text-white rounded-xl p-6 border border-[#C5A059]/40 shadow-2xl space-y-6">
                
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    Corporate Gift Presentation
                  </span>
                  <span className="text-[10px] bg-[#0052CC] text-white px-2 py-0.5 rounded font-mono">
                    LUXURY EDITION
                  </span>
                </div>

                {/* Gift Box Image Visual */}
                <div className="relative bg-gradient-to-b from-[#121212] to-[#252525] rounded-lg p-6 border border-gray-800 flex flex-col items-center justify-center text-center">
                  
                  {/* Luxury Gift Box SVG Graphic */}
                  <svg className="w-40 h-40 text-[#C5A059] drop-shadow-md" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Box body */}
                    <rect x="35" y="75" width="130" height="95" rx="8" fill="#0B1D3A" stroke="#C5A059" strokeWidth="2.5" />
                    {/* Lid */}
                    <rect x="28" y="55" width="144" height="28" rx="5" fill="#1A1A1A" stroke="#C5A059" strokeWidth="2.5" />
                    {/* Ribbons */}
                    <rect x="92" y="55" width="16" height="115" fill="#C5A059" />
                    <rect x="28" y="105" width="144" height="16" fill="#C5A059" />
                    {/* Bow Loop Left */}
                    <path d="M100 55 C70 30, 50 45, 92 55 Z" fill="#D4AF37" stroke="#F3E5C8" strokeWidth="1" />
                    {/* Bow Loop Right */}
                    <path d="M100 55 C130 30, 150 45, 108 55 Z" fill="#D4AF37" stroke="#F3E5C8" strokeWidth="1" />
                    <circle cx="100" cy="55" r="6" fill="#F3E5C8" />
                  </svg>

                  <div className="mt-4 space-y-1">
                    <h4 className="text-sm font-bold text-white">Executive Gift Box Set</h4>
                    <p className="text-[11px] text-gray-400">Custom embossed logo on matte black box with gold satin interior</p>
                  </div>
                </div>

                {/* Features Pill */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-[#121212] p-2 rounded border border-gray-800 text-center">
                    <span className="text-[#C5A059] font-bold block">100% Guaranteed</span>
                    <span className="text-gray-400">Print Quality</span>
                  </div>
                  <div className="bg-[#121212] p-2 rounded border border-gray-800 text-center">
                    <span className="text-[#0052CC] font-bold block">Rapid Turnaround</span>
                    <span className="text-gray-400">Bulk Orders</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Required Sign-off text banner at the bottom */}
        <div className="mt-16 bg-gradient-to-r from-[#0B1D3A] via-[#152B52] to-[#0B1D3A] rounded-lg p-4 sm:p-6 text-center border border-[#C5A059]/40 shadow-lg">
          <p className="text-sm sm:text-base font-medium text-white tracking-wide">
            Developed for <span className="font-bold text-[#C5A059] underline decoration-[#C5A059] underline-offset-4">Manpointevents</span>
          </p>
        </div>

      </div>
    </section>
  );
};
