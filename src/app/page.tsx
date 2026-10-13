import { Hero } from '../components/Hero';
import { PrintingCapabilities } from '../components/PrintingCapabilities';
import { CoreDifferentiators } from '../components/CoreDifferentiators';
import { FAQSection } from '../components/FAQSection';
import { ProductCatalog } from '../components/ProductCatalog';
import { AboutUs } from '../components/AboutUs';

import productsData from '../data/products.json';
import type { Product } from '../types/product';

export default function Home() {
  return (
    <>
      <Hero />
      <PrintingCapabilities />
      <CoreDifferentiators />
      <FAQSection />
      <ProductCatalog products={productsData as Product[]} />
      <AboutUs />
    </>
  );
}
