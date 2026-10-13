import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { organizationSchema, SITE_URL } from '../lib/schema';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Luckys Promo | Corporate Gifting & Promotional Products in Bengaluru',
    template: '%s | Luckys Promo',
  },
  description:
    'Luckys Promo delivers premium corporate gifting, promotional merchandise, and custom logo printing solutions for enterprise clients across India. A venture of Manpointe Tech LLP, based in Bengaluru.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Luckys Promo | Corporate Gifting & Promotional Products',
    description:
      'Premium corporate gifting, promotional merchandise, and custom logo printing solutions for enterprise clients across India.',
    url: SITE_URL,
    siteName: 'Luckys Promo',
    type: 'website',
    images: [{ url: '/hero/slide-2-main.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luckys Promo | Corporate Gifting & Promotional Products',
    description:
      'Premium corporate gifting, promotional merchandise, and custom logo printing solutions for enterprise clients across India.',
    images: ['/hero/slide-2-main.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans selection:bg-[#0068C8] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
