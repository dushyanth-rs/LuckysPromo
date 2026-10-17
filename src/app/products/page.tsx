import type { Metadata } from 'next';
import { ProductCatalog } from '../../components/ProductCatalog';
import { SITE_URL } from '../../lib/schema';
import productsData from '../../data/products.json';
import type { Product } from '../../types/product';

const title = 'Product Catalog';
const description =
  'Browse our full catalog of corporate gifts and promotional products - executive diaries, drinkware, pens, keychains, bags, tech accessories, and more. Search by SKU, name, or material.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/products/` },
  openGraph: {
    title: `${title} | Luckys Promo`,
    description,
    url: `${SITE_URL}/products/`,
    type: 'website',
  },
};

export default function ProductsPage() {
  return <ProductCatalog products={productsData as Product[]} />;
}
