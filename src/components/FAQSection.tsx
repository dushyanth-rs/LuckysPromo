'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/whatsapp';

const FAQS = [
  {
    question: 'What is the minimum order quantity (MOQ) for corporate gifts?',
    answer:
      'Most of our executive gift sets and bulk promotional products start from 50 units, with tiered pricing as volume increases. Exact MOQ varies by product — reach out on WhatsApp with the item and quantity you need for an accurate quote.',
  },
  {
    question: 'What branding and printing methods do you offer?',
    answer:
      'We offer screen printing, digital printing, offset printing with metallic gold/silver foil stamping, and UV printing for a 3D embossed, scratch-resistant finish — covering materials from fabric and paper to stainless steel, glass, and acrylic.',
  },
  {
    question: 'Do you deliver outside Bengaluru?',
    answer:
      'Yes. We offer doorstep delivery pan-India, along with global shipping support for international corporate orders, with end-to-end dispatch tracking.',
  },
  {
    question: 'How do I place an order or get a quote?',
    answer:
      'Browse the product catalog, then tap "Enquire" on any product (or the WhatsApp button) to message us directly with the SKU and quantity you need. Our team responds with pricing, customization options, and timelines.',
  },
  {
    question: 'Can I get a sample or mockup before bulk ordering?',
    answer:
      'Yes — our design team provides digital mockups and 3D logo placement previews so you can approve the look before full production begins.',
  },
  {
    question: 'Is Luckys Promo a certified supplier?',
    answer:
      'Yes, we are an ISO 9001:2015 certified corporate supply partner, operated as a venture of Manpointe Tech LLP.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white text-[#1A1A1A] relative border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-[#0068C8] font-bold text-xs uppercase tracking-widest bg-[#0068C8]/10 px-3 py-1 rounded-full border border-[#0068C8]/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D3A] tracking-tight font-sans">
            Got Questions? We've Got Answers.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-[#0B1D3A]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0068C8] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Still have questions?{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] font-semibold hover:text-[#1EBE5A]"
          >
            Chat with us on WhatsApp
          </a>
        </p>

      </div>
    </section>
  );
};

export { FAQS };
