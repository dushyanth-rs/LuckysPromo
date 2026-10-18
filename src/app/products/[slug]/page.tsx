import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, Shield, Truck, Printer } from 'lucide-react';
import { allProducts, findProductBySlug, skuToSlug } from '../../../lib/slug';
import { productSchema, breadcrumbSchema, SITE_URL } from '../../../lib/schema';
import { productWhatsAppLink } from '../../../lib/whatsapp';
import { getProductDisplayImage, getProductAbsoluteImageUrl, getProductColorList } from '../../../lib/product-display';
import type { Product } from '../../../types/product';

function relatedProducts(product: Product, limit = 4): Product[] {
  const others = allProducts().filter((p) => p.sku !== product.sku);
  const sameSubCategory = others.filter((p) => p.sub_category === product.sub_category);
  if (sameSubCategory.length >= limit) {
    return sameSubCategory.slice(0, limit);
  }
  const sameCategory = others.filter(
    (p) => p.category === product.category && p.sub_category !== product.sub_category
  );
  return [...sameSubCategory, ...sameCategory].slice(0, limit);
}

export function generateStaticParams() {
  return allProducts().map((product) => ({ slug: skuToSlug(product.sku) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found | Luckys Promo' };
  }

  // `title` is just the product name - the root layout's title template
  // ("%s | Luckys Promo") appends the suffix automatically for <title>.
  // openGraph/twitter don't use that template, so they get the full string.
  const title = product.name;
  const fullTitle = `${product.name} | Luckys Promo`;
  const description = `${product.name} - ${product.specs}. Material: ${product.material}. Available colors: ${product.colors}. Premium corporate gifting from Luckys Promo.`;
  const imageUrl = getProductAbsoluteImageUrl(product, SITE_URL);
  const url = `${SITE_URL}/products/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: 'website',
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const colorList = getProductColorList(product);
  const imageUrl = getProductDisplayImage(product);
  const related = relatedProducts(product);

  return (
    <section className="py-12 bg-white text-[#1A1A1A] min-h-[70vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(product)) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#0068C8]">Home</Link>
              <span className="mx-1.5 text-gray-300">/</span>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#0068C8]">Products</Link>
              <span className="mx-1.5 text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-400">{product.category}</span>
              <span className="mx-1.5 text-gray-300">/</span>
            </li>
            <li className="text-[#0B1D3A] font-medium" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-[#0068C8] hover:text-[#0054A3] font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Image Column */}
            <div className="bg-gray-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative">
              <div className="absolute top-4 left-4">
                <span className="bg-[#0B1D3A] text-white text-xs font-mono px-2.5 py-1 rounded font-bold shadow">
                  {product.sku}
                </span>
              </div>

              <img
                src={imageUrl}
                alt={product.name}
                className="max-h-80 object-contain rounded my-4 p-2"
              />

              <span className="text-xs text-[#0068C8] font-bold bg-[#0068C8]/10 px-3 py-1 rounded-full border border-[#0068C8]/20">
                Custom Logo Printable
              </span>
            </div>

            {/* Info Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-[#0068C8] font-semibold uppercase tracking-wider">
                    {product.category} • {product.sub_category}
                  </span>
                  <h1 className="text-2xl font-bold text-[#0B1D3A] mt-1 leading-snug">
                    {product.name}
                  </h1>
                </div>

                {/* Specifications Box */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-gray-200 pb-1.5">
                    <span className="text-gray-500">Specifications:</span>
                    <span className="text-[#0B1D3A] font-semibold text-right">{product.specs}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1.5">
                    <span className="text-gray-500">Material Composition:</span>
                    <span className="text-[#0B1D3A] font-semibold text-right">{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available Colors:</span>
                    <span className="text-[#0068C8] font-semibold text-right">{product.colors}</span>
                  </div>
                </div>

                {colorList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {colorList.map((color, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-[11px] px-2.5 py-1 rounded-full border border-gray-200"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                )}

                {/* Features List */}
                <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                  <div className="flex items-center space-x-2">
                    <Printer className="w-3.5 h-3.5 text-[#0068C8]" />
                    <span>Screen, Laser Engraving & UV Print Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5 text-[#0068C8]" />
                    <span>ISO Certified Corporate Quality Standard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-3.5 h-3.5 text-[#0068C8]" />
                    <span>Pan-India Doorstep Bulk Logistics</span>
                  </div>
                </div>
              </div>

              <a
                href={productWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded font-semibold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer bg-[#25D366] hover:bg-[#1EBE5A] text-white shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-[#0B1D3A] mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((relatedProduct) => (
                <Link
                  key={relatedProduct.sku}
                  href={`/products/${skuToSlug(relatedProduct.sku)}/`}
                  className="group block bg-white rounded-lg border border-gray-200 hover:border-[#0068C8] transition-colors overflow-hidden"
                >
                  <div className="aspect-square bg-gray-50 p-3 flex items-center justify-center">
                    <img
                      src={getProductDisplayImage(relatedProduct)}
                      alt={relatedProduct.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-medium text-[#0B1D3A] group-hover:text-[#0068C8] leading-snug line-clamp-2">
                      {relatedProduct.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
