import type { Product } from '../types/product';
import productsData from '../data/products.json';

const products = productsData as Product[];

export function skuToSlug(sku: string): string {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const slugToProduct = new Map<string, Product>();
for (const product of products) {
  const slug = skuToSlug(product.sku);
  const existing = slugToProduct.get(slug);
  if (existing) {
    console.error(
      `[slug] SKUs "${existing.sku}" and "${product.sku}" both normalize to slug "${slug}" - "${product.sku}" will be unreachable at its own URL.`
    );
    continue;
  }
  slugToProduct.set(slug, product);
}

export function findProductBySlug(slug: string): Product | undefined {
  return slugToProduct.get(slug);
}

export function allProducts(): Product[] {
  return products;
}
