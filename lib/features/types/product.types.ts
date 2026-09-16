export interface Image {
  image_id: string;
  url: string;
  is_primary: boolean;
  type: string;
}

export interface Warranty {
  warranty_type: string;
  warranty_period: string;
  manufacturing_date: string;
  expiry_date: string;
}

export interface VariantSelection {
  variant_ids: string[];
  name: string;
  sku: string;
  additional_price: number;
  stock_quantity: number;
}

export interface MallVariant {
  variant_id: string;
  variant_type: string;
  name: string;
}

export interface VariantGroup {
  variant_type: string;
  variants: MallVariant[];
}

export interface ProductFeature {
  feature_id: string;
  description: string;
  id: string
  title: string
  header: string
  image?: File | string;
  image_position: "Left" | "Center" | "Right"
  previewUrl?: string | null
  file?: File | null;
  product_specifications?: string[];
  top_section?: {
    title: string;
    description: string;
  }[];
  images?: string[];
  design_type?: string;
}

export interface Product {
  product_id?: string;
  id?: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  parent_category_id: string;
  subcategory_id: string;
  stock_quantity: number;
  search_vector: string;
  created_at: string;
  last_updated: string;
  images?: Image[];
  urls?: Image[];
  liked_by_user?: boolean;
  tag: string;
  product_variants?: MallVariant[]
  features: ProductFeature[];
  warranty: Warranty;
  details: string[];
  products?: Product[];
  discount?: number;
  discount_type?: string;
  bundle_quantity?: number;
  variant_selection?: VariantSelection[];
}

export interface SubCategory {
  id: string;
  name: string;
  parent_id: string | null;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  image_url: string;
  subcategories: SubCategory[] | null;
  products: Product[] | null;
  description: string
}

export interface CategoriesResponse {
  data: {
    categories: Category[];
    meta: {
      page: number;
      size: number;
      total_items: number;
      total_pages: number;
      has_prev: boolean;
      has_next: boolean;
    };
  };
  message: string;
  status_code: number;
}

export interface SubCategoryProduct extends Product {}

export interface SubcategoryProducts {
  id: string;
  name: string;
  image_url: string;
  parent_id: string;
  parent_category_name: string;
  parent_category_image_url: string;
  products: SubCategoryProduct[];
  description: string
}

export interface ProductImage {
  image_id: string;
  url: string;
  is_primary: boolean;
}

export interface FeaturedProduct {
  product_id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  category_id: string;
  stock_quantity: number;
  search_vector: string;
  created_at: string;
  last_updated: string;
  urls: ProductImage[];
  category_name: string;
  discount?: number;
  discount_type?: string;
}

export interface FeaturedProductsResponse {
  data: FeaturedProduct[];
  message: string;
  status_code: number;
}

export interface ProductResponse {
  data: Product;
  message: string;
  status_code: number;
}

export interface ProductFeaturedResponse {
  data: ProductFeature[];
  message: string;
  status_code: number;
}
