
// Types dùng cho phần Admin
import { UserProfileSummary } from "./index";
import { Order, WishlistItem } from "./account";

export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  inventory: number;
  images: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser extends UserProfileSummary {
  createdAt: string;
  lastLogin?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'banned';
  totalOrders?: number;
  totalSpent?: number;
}

export interface AdminOrder extends Order {
  user: {
    id: string;
    name: string;
    email: string;
  };
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    phone: string;
  };
  payment: {
    method: 'cod' | 'banking' | 'credit_card';
    paid: boolean;
    transactionId?: string;
  };
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  status: 'draft' | 'published';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  views?: number;
}

export interface AdminSettings {
  siteName: string;
  logo: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  shippingMethods: {
    id: string;
    name: string;
    price: number;
    description: string;
    estimatedDays: string;
  }[];
  paymentMethods: {
    id: string;
    name: string;
    active: boolean;
    description: string;
  }[];
}
