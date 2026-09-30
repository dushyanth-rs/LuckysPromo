import React from 'react';
import { Layers, Printer, FileText, Sparkles, Check } from 'lucide-react';

export const PrintingCapabilities: React.FC = () => {
  const capabilities = [
    {
      id: 'screen',
      title: 'Screen Printing',
      colorName: 'Trust Blue',
      badgeBg: 'bg-[#0052CC]',
      circleBorder: 'border-[#0052CC]',
      glowColor: 'shadow-[#0052CC]/30',
      iconColor: 'text-[#0052CC]',
      accentBg: 'bg-[#0052CC]/10',
      tagline: 'High Volume & Vivid Spot Colors',
      materials: 'Fabrics, Canvas Bags, T-Shirts, Polymer',
      desc: 'Durable ink transfer ideal for bold logos and large quantity corporate apparel & tote orders.',
      icon: Layers,
    },
    {
      id: 'digital',
      title: 'Digital Printing',
      colorName: 'Magenta',
      badgeBg: 'bg-[#E91E63]',
      circleBorder: 'border-[#E91E63]',
      glowColor: 'shadow-[#E91E63]/30',
      iconColor: 'text-[#E91E63]',
      accentBg: 'bg-[#E91E63]/10',
      tagline: 'High-Resolution Full Color Details',
      materials: 'Vinyl, Stickers, Paper, Custom Packaging',
      desc: 'Direct-to-surface digital technology delivering photorealistic gradients and crisp fine text.',
      icon: Printer,
    },
    {
      id: 'offset',
      title: 'Offset Printing',
      colorName: 'Yellow / Gold',
      badgeBg: 'bg-[#F59E0B]',
      circleBorder: 'border-[#F59E0B]',
      glowColor: 'shadow-[#F59E0B]/30',
      iconColor: 'text-[#F59E0B]',
      accentBg: 'bg-[#F59E0B]/10',
      tagline: 'Luxury Metallic & Foil Stamping',
      materials: 'Executive Diaries, Gift Boxes, Cards',
      desc: 'Precision color accuracy with optional metallic gold/silver foil stamping for ultra-luxurious feel.',
      icon: FileText,
    },
    {
      id: 'uv',
      title: 'UV Printing',
      colorName: 'Matte Black',
      badgeBg: 'bg-[#1A1A1A]',
      circleBorder: 'border-[#1A1A1A]',
      glowColor: 'shadow-black/40',
      iconColor: 'text-[#1A1A1A]',
      accentBg: 'bg-black/10',
      tagline: 'Scratch-Resistant 3D Embossed Finish',
      materials: 'Metal, Stainless Steel, Glass, Acrylic',
      desc: 'Ultraviolet instant curing print system for raised 3D texture, scratch resistance, and water durability.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="printing" className="py-20 bg-white text-[#1A1A1A] relative border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#0052CC] font-bold text-xs uppercase tracking-widest bg-[#0052CC]/10 px-3 py-1 rounded-full border border-[#0052CC]/20">
            Precision Customization Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight font-sans">
            We Print On All Type Of Materials
          </h2>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            From stainless steel thermos bottles and leather diaries to eco-bamboo cardholders, our advanced printing infrastructure guarantees vibrant, durable, and brand-compliant logo reproduction.
          </p>
        </div>

        {/* Four-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-[#C5A059]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col items-center justify-between"
              >
                {/* Top Section with Circular Placeholder */}
                <div className="flex flex-col items-center space-y-4 w-full">
                  
                  {/* Circular Placeholder with specified Color Badge */}
                  <div className="relative">
                    {/* Outer Circle Container */}
                    <div 
                      className={`w-28 h-28 rounded-full border-4 ${item.circleBorder} flex items-center justify-center p-2 bg-gradient-to-br from-gray-50 to-white shadow-lg ${item.glowColor} group-hover:scale-105 transition-transform duration-300 relative`}
                    >
                      {/* Inner Circular Accent with Icon */}
                      <div className={`w-20 h-20 rounded-full ${item.accentBg} flex items-center justify-center`}>
                        <Icon className={`w-10 h-10 ${item.iconColor}`} />
                      </div>
                    </div>

                    {/* Color Tag Badge */}
                    <span 
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${item.badgeBg} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow border border-white uppercase tracking-wider whitespace-nowrap`}
                    >
                      {item.title.split(' ')[0]}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#0B1D3A] group-hover:text-[#0052CC] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#C5A059] mt-1">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>

                {/* Material Tag Pills at Bottom */}
                <div className="mt-6 pt-4 border-t border-gray-100 w-full text-left space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Ideal Materials:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.materials.split(', ').map((mat, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center text-[10px] bg-[#F4F5F7] text-gray-700 font-medium px-2 py-0.5 rounded border border-gray-200"
                      >
                        <Check className="w-2.5 h-2.5 mr-1 text-[#0052CC]" />
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
