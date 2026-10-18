import type { Product } from '../types/product';
import { skuToSlug } from './slug';
import { getProductAbsoluteImageUrl } from './product-display';

export const SITE_URL = 'https://luckyspromo.com';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
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
    url: `${SITE_URL}/products/${skuToSlug(product.sku)}/`,
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

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Luckys Promo',
    url: SITE_URL,
  };
}

export function breadcrumbSchema(product: Product) {
  const items = [
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products/` },
    { name: product.category, url: `${SITE_URL}/products/` },
    { name: product.name, url: `${SITE_URL}/products/${skuToSlug(product.sku)}/` },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
