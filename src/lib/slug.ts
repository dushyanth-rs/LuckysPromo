import type { Product } from '../types/product';
import productsData from '../data/products.json';

const products = productsData as Product[];

export function skuToSlug(sku: string): string {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => skuToSlug(p.sku) === slug);
}

export function allProducts(): Product[] {
  return products;
}
