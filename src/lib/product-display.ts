import type { Product } from '../types/product';

export function getProductDisplayImage(product: Product): string {
  return product.image
    ? product.image.replace('/1A1A1A/C5A059', '/FFFFFF/0B1D3A')
    : `https://placehold.co/400x400/FFFFFF/0B1D3A?text=${encodeURIComponent(product.sku)}`;
}

export function getProductAbsoluteImageUrl(product: Product, siteUrl: string): string {
  const image = getProductDisplayImage(product);
  return image.startsWith('http') ? image : `${siteUrl}${image}`;
}

export function getProductColorList(product: Product): string[] {
  return product.colors
    ? product.colors.split(',').map((c) => c.trim()).filter(Boolean)
    : [];
}
