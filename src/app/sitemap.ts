import type { MetadataRoute } from 'next';
import { allProducts, skuToSlug } from '../lib/slug';
import { SITE_URL } from '../lib/schema';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries: MetadataRoute.Sitemap = allProducts().map((product) => ({
    url: `${SITE_URL}/products/${skuToSlug(product.sku)}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/products/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...productEntries,
  ];
}
