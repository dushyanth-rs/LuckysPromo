import type { Metadata } from 'next';
import { Building2, Mail, Phone, MessageCircle } from 'lucide-react';
import { ContactForm } from '../../components/ContactForm';
import { SITE_URL } from '../../lib/schema';
import { WHATSAPP_NUMBER } from '../../lib/whatsapp';

const title = 'Contact Us';
const description =
  'Get in touch with Luckys Promo for corporate gifting and promotional product enquiries. Reach our Bengaluru office by phone, email, WhatsApp, or send us a message directly.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `${title} | Luckys Promo`,
    description,
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <section className="py-20 bg-[#0B1D3A] text-white relative border-b border-[#0052CC]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-widest bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/30">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Ask Away — We&apos;re Here to Help
          </h1>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto rounded-full" />
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Reach out with any questions about corporate gifting, bulk orders, or custom branding, and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Office / Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#071326] rounded-xl p-6 sm:p-8 border border-[#152B52] shadow-xl space-y-5">
              <h2 className="text-lg font-bold text-white">Our Office</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Whether you have questions, need expert advice, or want to learn more about our products, our team is here to assist you.
              </p>

              <div className="space-y-4 pt-2 text-sm text-gray-300">
                <div className="flex items-start space-x-3">
                  <Building2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Amrutahalli, Byatarayanapura, Bengaluru, Karnataka 560092</span>
                </div>
                <a
                  href="mailto:info@luckyspromo.com"
                  className="flex items-center space-x-3 hover:text-[#C5A059] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <span>info@luckyspromo.com</span>
                </a>
                <a
                  href="tel:+917892081305"
                  className="flex items-center space-x-3 hover:text-[#C5A059] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <span>+91 78920 81305</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[#25D366] hover:text-[#1EBE5A] transition-colors font-medium"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Have a question? Leave your message below and don&apos;t forget to include your phone number so we can get back to you promptly.
            </p>
            <ContactForm />
          </div>

        </div>

      </div>
    </section>
  );
}
