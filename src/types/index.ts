
// User Types
export interface UserProfileSummary {
  isLoggedIn: boolean;
  userId?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  options: { name: string; value: string }[];
  lineTotal: number;
  stock: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  currency: string;
}

// Product Types
export interface ProductImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  altText?: string;
}

export interface ProductVideo {
  id: string;
  url: string;
  thumbnailUrl: string;
}

export interface Attribute {
  id: string;
  name: string;
  value: string;
}

export interface Variant {
  id: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  attributes: Attribute[];
  imageId?: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  averageRating?: number;
  reviewCount?: number;
  stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock';
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;
  images: ProductImage[];
  videos?: ProductVideo[];
  basePrice: number;
  baseOriginalPrice?: number;
  brand?: {
    id: string;
    name: string;
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  attributes: Attribute[];
  variants: Variant[];
  averageRating: number;
  reviewCount: number;
  specifications?: { name: string; value: string }[];
  stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock';
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  authorName: string;
  createdAt: string;
}

// Category Types
export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  children: CategoryNode[];
  imageUrl?: string;
}

// Search Types
export interface SearchSuggestion {
  type: 'product' | 'category' | 'query';
  id?: string;
  name: string;
  imageUrl?: string;
  url: string;
}

// Newsletter Types
export interface NewsletterSubscriptionResponse {
  success: boolean;
  message: string;
}

// Shipping and Payment Types
export interface ShippingMethod {
  id: string;
  name: string;
  estimatedDelivery: string;
  fee: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
}

// Address Types
export interface AdminArea {
  code: string;
  name: string;
}

export interface Address {
  id?: string;
  fullName: string;
  phoneNumber: string;
  street: string;
  ward: AdminArea;
  district: AdminArea;
  city: AdminArea;
  isDefault?: boolean;
}

// Order Types
export interface OrderSummary {
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  currency: string;
}
