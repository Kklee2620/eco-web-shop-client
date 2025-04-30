
// Types used for the account page components

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

export interface Address {
  id: string;
  isDefault: boolean;
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}
