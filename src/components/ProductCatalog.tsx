import React, { useState, useMemo, useEffect } from 'react';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { Search, Filter, RotateCcw, Package, ListFilter, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  quoteItems: Product[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToQuote,
  quoteItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Display count state - initially show top 8 products (2 complete desktop 4-column rows)
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Reset visible count back to top 8 whenever search or category filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  // Extract unique categories dynamically from products
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set).sort();
  }, [products]);

  // Extract subcategories based on selected category
  const subCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      const pCat = p.category ? p.category.trim() : '';
      if (selectedCategory === 'ALL' || pCat === selectedCategory) {
        if (p.sub_category) set.add(p.sub_category.trim());
      }
    });
    return Array.from(set).sort();
  }, [products, selectedCategory]);

  // Handle category selection change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory('ALL'); // Reset subcategory when category changes
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedSubCategory('ALL');
    setSearchQuery('');
    setVisibleCount(8);
  };

  // Filter products cleanly with normalized string matching
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const selCatNorm = selectedCategory.trim().toLowerCase();
    const selSubCatNorm = selectedSubCategory.trim().toLowerCase();

    return products.filter((product) => {
      const prodCatNorm = (product.category || '').trim().toLowerCase();
      const prodSubCatNorm = (product.sub_category || '').trim().toLowerCase();

      // Category Filter
      if (selCatNorm !== 'all' && prodCatNorm !== selCatNorm) {
        return false;
      }
      // Sub Category Filter
      if (selSubCatNorm !== 'all' && prodSubCatNorm !== selSubCatNorm) {
        return false;
      }
      // Search Query Filter
      if (query !== '') {
        const matchesSku = (product.sku || '').toLowerCase().includes(query);
        const matchesName = (product.name || '').toLowerCase().includes(query);
        const matchesSpecs = (product.specs || '').toLowerCase().includes(query);
        const matchesMaterial = (product.material || '').toLowerCase().includes(query);
        const matchesCategory = prodCatNorm.includes(query);
        const matchesSubCategory = prodSubCatNorm.includes(query);

        return (
          matchesSku ||
          matchesName ||
          matchesSpecs ||
          matchesMaterial ||
          matchesCategory ||
          matchesSubCategory
        );
      }
      return true;
    });
  }, [products, selectedCategory, selectedSubCategory, searchQuery]);

  // Limit displayed products to current visibleCount (Top 8 initially)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const quoteSkuSet = useMemo(() => {
    return new Set(quoteItems.map((item) => item.sku));
  }, [quoteItems]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleShowAll = () => {
    setVisibleCount(filteredProducts.length);
  };

  const handleShowLess = () => {
    setVisibleCount(8);
  };

  return (
    <section id="catalog" className="py-20 bg-[#0B1D3A] text-white relative border-b border-[#0052CC]/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-widest bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/30">
            Interactive Product Explorer
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Promotional Product Catalog
          </h2>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto rounded-full" />
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Showing top curated items. Filter by category, sub-category, or search by SKU.
          </p>
        </div>

        {/* Filter Controls Bar / Top Bar & Sidebar Layout */}
        <div className="bg-[#071326] rounded-xl p-6 border border-[#152B52] shadow-xl mb-10 space-y-6">
          
          {/* Search Bar & Reset Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by SKU, Product Name, Material (e.g. SRG-033, Stainless Steel)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#152B52]/60 border border-[#152B52] focus:border-[#C5A059] rounded-md text-sm text-white placeholder-gray-400 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Count & Reset Button */}
            <div className="flex items-center space-x-3 justify-between md:justify-end">
              <span className="text-xs text-gray-300 font-medium bg-[#152B52] px-3 py-2 rounded border border-gray-700 whitespace-nowrap">
                Showing <strong className="text-[#C5A059]">{displayedProducts.length}</strong> of {filteredProducts.length} Products
              </span>

              {(selectedCategory !== 'ALL' || selectedSubCategory !== 'ALL' || searchQuery !== '') && (
                <button
                  onClick={resetFilters}
                  className="bg-transparent hover:bg-[#152B52] text-[#C5A059] hover:text-white text-xs font-semibold px-3 py-2 rounded border border-[#C5A059]/50 transition-colors flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

          </div>

          {/* Category Filter Tabs */}
          <div className="space-y-3 pt-2 border-t border-[#152B52]">
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Filter by Category:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('ALL')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === 'ALL'
                    ? 'bg-[#0052CC] text-white shadow-md font-semibold border border-[#0052CC]'
                    : 'bg-[#152B52]/50 text-gray-300 hover:bg-[#152B52] hover:text-white border border-gray-800'
                }`}
              >
                All Categories ({products.length})
              </button>

              {categories.map((cat) => {
                const count = products.filter((p) => p.category.trim() === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0052CC] text-white shadow-md font-semibold border border-[#0052CC]'
                        : 'bg-[#152B52]/50 text-gray-300 hover:bg-[#152B52] hover:text-white border border-gray-800'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub Category Filter Selector */}
          {subCategories.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#152B52]">
              <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <ListFilter className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>Filter by Sub Category:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubCategory('ALL')}
                  className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedSubCategory === 'ALL'
                      ? 'bg-[#C5A059] text-[#1A1A1A] font-bold'
                      : 'bg-[#152B52]/40 text-gray-300 hover:bg-[#152B52] border border-gray-800'
                  }`}
                >
                  All Sub-categories
                </button>
                {subCategories.map((subCat) => {
                  const subCount = products.filter((p) => {
                    const matchesCat = selectedCategory === 'ALL' || p.category.trim() === selectedCategory;
                    return matchesCat && p.sub_category.trim() === subCat;
                  }).length;
                  return (
                    <button
                      key={subCat}
                      onClick={() => setSelectedSubCategory(subCat)}
                      className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                        selectedSubCategory === subCat
                          ? 'bg-[#C5A059] text-[#1A1A1A] font-bold'
                          : 'bg-[#152B52]/40 text-gray-300 hover:bg-[#152B52] border border-gray-800'
                      }`}
                    >
                      {subCat} ({subCount})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Active Filters Pill Bar */}
        {(selectedCategory !== 'ALL' || selectedSubCategory !== 'ALL' || searchQuery !== '') && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400">Active Filters:</span>
            {selectedCategory !== 'ALL' && (
              <span className="bg-[#0052CC]/20 border border-[#0052CC] text-[#0052CC] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <span>Category: {selectedCategory}</span>
              </span>
            )}
            {selectedSubCategory !== 'ALL' && (
              <span className="bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <span>Sub-category: {selectedSubCategory}</span>
              </span>
            )}
            {searchQuery !== '' && (
              <span className="bg-gray-800 border border-gray-700 text-gray-200 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <span>Keyword: "{searchQuery}"</span>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((product, idx) => (
                <ProductCard
                  key={`${product.sku}-${idx}`}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToQuote={onAddToQuote}
                  isInQuote={quoteSkuSet.has(product.sku)}
                />
              ))}
            </div>

            {/* View More / View All / Show Less Pagination Actions */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[#152B52] pt-8">
              {visibleCount < filteredProducts.length ? (
                <>
                  <button
                    onClick={handleLoadMore}
                    className="bg-gradient-to-r from-[#0052CC] to-[#0043A8] hover:from-[#0043A8] hover:to-[#00388A] text-white font-semibold text-sm px-7 py-3 rounded-md shadow-lg transition-all flex items-center space-x-2 cursor-pointer border border-[#0052CC]/50 group"
                  >
                    <span>View More Products (+8)</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={handleShowAll}
                    className="bg-[#152B52]/60 hover:bg-[#152B52] text-[#C5A059] hover:text-white font-semibold text-sm px-6 py-3 rounded-md border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    Show All ({filteredProducts.length} Items)
                  </button>
                </>
              ) : (
                filteredProducts.length > 8 && (
                  <button
                    onClick={handleShowLess}
                    className="bg-[#152B52]/60 hover:bg-[#152B52] text-gray-300 hover:text-white font-semibold text-sm px-6 py-3 rounded-md border border-gray-700 transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Show Top 8 Only</span>
                    <ChevronUp className="w-4 h-4" />
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          /* Empty Search State */
          <div className="bg-[#071326] rounded-xl p-12 text-center border border-[#152B52] my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#152B52] text-[#C5A059] flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Products Found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              We couldn't find any promotional items matching your current search criteria. Try adjusting your category filters or search terms.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#0052CC] hover:bg-[#0043A8] text-white font-semibold text-xs px-5 py-2.5 rounded transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
