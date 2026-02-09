// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  ingredients: string[];
  howToUse: string[];
  hairType: string[];
  concerns: string[];
  benefits: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  tags: string[];
  volume: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: number;
  orderNumber: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  address: Address;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface FilterOptions {
  hairType: string[];
  concerns: string[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}