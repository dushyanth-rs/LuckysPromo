import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PrintingCapabilities } from './components/PrintingCapabilities';
import { CoreDifferentiators } from './components/CoreDifferentiators';
import { ProductCatalog } from './components/ProductCatalog';
import { AboutUs } from './components/AboutUs';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { QuoteModal } from './components/QuoteModal';

import productsData from './data/products.json';
import type { Product } from './types/product';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quoteItems, setQuoteItems] = useState<Product[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleToggleQuote = (product: Product) => {
    setQuoteItems((prev) => {
      const exists = prev.some((item) => item.sku === product.sku);
      if (exists) {
        return prev.filter((item) => item.sku !== product.sku);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromQuote = (sku: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.sku !== sku));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSelectedInQuote = selectedProduct
    ? quoteItems.some((item) => item.sku === selectedProduct.sku)
    : false;

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#1A1A1A]">
      
      {/* 1. Header */}
      <Header
        quoteCount={quoteItems.length}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreCatalog={scrollToCatalog}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />

        {/* 3. Printing Capabilities */}
        <PrintingCapabilities />

        {/* 4. Core Differentiators */}
        <CoreDifferentiators />

        {/* 5. Product Catalog */}
        <ProductCatalog
          products={productsData as Product[]}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToQuote={handleToggleQuote}
          quoteItems={quoteItems}
        />

        {/* 6. About Us */}
        <AboutUs />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleToggleQuote}
        isInQuote={isSelectedInQuote}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        quoteItems={quoteItems}
        onRemoveItem={handleRemoveFromQuote}
        onClearQuote={handleClearQuote}
      />

    </div>
  );
}

export default App;
