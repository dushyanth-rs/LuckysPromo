export interface Product {
  sku: string;
  category: string;
  sub_category: string;
  name: string;
  specs: string;
  material: string;
  colors: string;
  image: string;
}

export interface FilterState {
  category: string;
  subCategory: string;
  searchQuery: string;
}
