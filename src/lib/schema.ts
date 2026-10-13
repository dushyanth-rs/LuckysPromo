import type { Product } from '../types/product';
import { skuToSlug } from './slug';
import { getProductAbsoluteImageUrl } from './product-display';

export const SITE_URL = 'https://luckyspromo.com';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Luckys Promo',
    alternateName: 'Manpointe Tech LLP',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      'Luckys Promo delivers premium corporate gifting, promotional merchandise, and custom logo printing solutions for enterprise clients across India.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Amrutahalli, Byatarayanapura',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560092',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-78920-81305',
      contactType: 'customer service',
      email: 'info@luckyspromo.com',
      areaServed: 'IN',
    },
  };
}

export function productSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    category: product.category,
    description: `${product.specs} - ${product.material}. Available colors: ${product.colors}.`,
    image: getProductAbsoluteImageUrl(product, SITE_URL),
    url: `${SITE_URL}/products/${skuToSlug(product.sku)}`,
    brand: {
      '@type': 'Brand',
      name: 'Luckys Promo',
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
