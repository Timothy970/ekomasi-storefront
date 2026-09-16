import { Product } from './product.types';
import { Pagination } from './common.types';

export interface ContentAuthor {
  name?: string;
  avatar?: string;
}

export interface Banner {
  image_url?: string;
  alt?: string;
  caption?: string;
}

export interface Paragraph {
  text?: string;
  title?: string;
}

export interface ContentImage {
  image_url?: string;
  alt?: string;
  caption?: string;
}

export interface StaticContentAppSection {
  position?: number;
  banner?: Banner | null;
  paragraphs?: Paragraph[];
  images?: ContentImage[];
  title?: string;
}

export interface StaticContent {
  id?: string;
  static_page_id?: string;
  author?: ContentAuthor;
  created_at?: Date;
  updated_at?: Date;
  title?: string;
  description?: string;
  sections?: StaticContentAppSection[];
  paths?: {
    edit: string;
    view: string;
    create: string;
  };
  path?: string;
  content?: string;
}

export interface GetStaticContentsResponse {
  data: StaticContent[];
  message: string;
  status_code: number;
}

export interface ScoreCounts {
  score: number;
  count: number;
}

export interface Review {
  reviews: {
    review_id: string;
    user: string;
    details: string;
    score: number;
    created_at: string;
  }[];
  average_score: number;
  score_counts: ScoreCounts[];
}

export interface ReviewResponse {
  data: Review;
  message: string;
  status_code: number;
}

export interface SingleReview {
  review_id: string;
  user: string;
  score: number;
  details: string;
  created_at: string;
}

export interface ReviewsPayload {
  reviews: SingleReview[];
}

export interface SingleReviewResponse {
  data: ReviewsPayload;
  message: string;
  status_code: number;
}

export interface ReviewsResponse {
  data: {
    pagination: Pagination;
    reviews: Review;
  };
  message: string;
  status_code: number;
}

export interface ContentAppSection {
  position?: number;
  banner?: Banner | null;
  paragraphs?: Paragraph[];
  images?: ContentImage[];
  title?: string;
}

export interface Content {
  banner_image_url?: string;
  blog_id?: string;
  id?: string;
  author?: ContentAuthor;
  created_at?: Date;
  updated_at?: Date;
  read_time_minutes?: number;
  title?: string;
  description?: string;
  sections?: ContentAppSection[];
  tags?: string[];
  status?: string;
  image_url?: string;
  is_published?: boolean;
}

export interface BlogsData {
  blogs: Content[];
  pagination: Pagination;
}

export interface GetBlogsResponse {
  data: BlogsData;
  message: string;
  status_code: number;
}

export interface GetBlogResponse {
  data: Content;
  message: string;
  status_code: number;
}

export interface CreateReturnPayload {
  reason: string;
  order_id: string;
  products: {
    product_id: string;
    quantity: number;
  }[];
}

export interface Returns {
  return_id: string;
  order_id: string;
  products: Product[];
  reason: string;
  status: string;
  total_refund: number;
  created_at: string;
}

export interface ReturnsResponse {
  data: Returns[] | null;
  message: string;
  status_code: number;
}

export interface ReturnResponse {
  data: Returns | null;
  message: string;
  status_code: number;
}

export interface Bundle extends Omit<Product, 'products'> {
  products: Product[];
}

export interface ProductBundleData {
  pagination: Pagination;
  bundles: Bundle[];
}

export interface ProductBundlesResponse {
  data: ProductBundleData;
  message: string;
  status_code: number;
}

export interface Deal {
  deal_id: string;
  end_date: string;
  image: string;
  is_active: boolean;
  link: string;
  name: string;
  products: Product[];
  start_date: string;
}

export interface FlashSaleDealsData {
  deals: Deal[];
  pagination: Pagination;
}

export interface FlashSalesDealsResponse {
  data: FlashSaleDealsData;
  message: string;
  status_code: number;
}

export interface FlashSaleDealData {
  deals: Deal;
  pagination: Pagination;
}

export interface DealResponse {
  data: FlashSaleDealData;
  message: string;
  status_code: number;
}

export interface Warehouse {
  warehouse_id: string;
  name: string;
  location: string;
  warehouse_details: string;
}

export interface WarehousesData {
  data: Warehouse[];
  meta: Pagination;
}

export interface WarehousesResponse {
  data: WarehousesData;
  message: string;
  status_code: number;
}
