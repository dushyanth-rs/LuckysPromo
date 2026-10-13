import React from 'react';
import { Building2, Award } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white text-[#1A1A1A] relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid: Image on left, Text on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Real Product Photo */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              <div className="relative bg-gray-50 rounded-xl border border-gray-200 shadow-md overflow-hidden">
                <img
                  src="/products/SRTC-H37.png"
                  alt="Luckys Promo corporate gift set"
                  className="w-full h-auto object-contain p-6"
                />
              </div>
            </div>
          </div>

          {/* Right Column: About Text */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">

            <div className="space-y-3">
              <span className="text-[#0068C8] font-bold text-xs uppercase tracking-widest bg-[#0068C8]/10 px-3 py-1 rounded-full border border-[#0068C8]/20">
                Beyond Ordinary Gifting
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight font-sans leading-tight">
                About Us
              </h2>
              <div className="w-16 h-1 bg-[#0068C8] rounded-full" />
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
                <Building2 className="w-5 h-5 text-[#0068C8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1D3A]">MANPOINTE TECH LLP Enterprise</h4>
                  <p className="text-[11px] text-gray-500">Backed by robust corporate infrastructure & governance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#F4F5F7] p-3.5 rounded-lg border border-gray-200">
                <Award className="w-5 h-5 text-[#0068C8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1D3A]">End-to-End Fulfillment</h4>
                  <p className="text-[11px] text-gray-500">Design, printing, packaging & pan-India distribution.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Developed-for line */}
        <p className="mt-16 text-center text-sm text-gray-500 italic">
          Developed for <span className="font-semibold text-[#0068C8] not-italic">Manpointevents</span>
        </p>

      </div>
    </section>
  );
};
