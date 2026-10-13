import type { Product } from '../types/product';

export const WHATSAPP_NUMBER = '917892081305';

export function productWhatsAppLink(product: Product): string {
  const message = `Hi, I'm interested in ${product.name} (SKU: ${product.sku}). Could you share more details?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
