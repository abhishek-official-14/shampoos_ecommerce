// src/services/cartService.ts
import api from './api';
import { CartItem, ApiResponse } from '../types';

export const cartService = {
  async syncCart(items: CartItem[]): Promise<ApiResponse<CartItem[]>> {
    const response = await api.post('/cart/sync', { items });
    return response.data;
  },

  async getCart(): Promise<ApiResponse<CartItem[]>> {
    const response = await api.get('/cart');
    return response.data;
  },

  async addToCart(productId: number, quantity: number = 1): Promise<ApiResponse<CartItem>> {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  async updateCart(itemId: number, quantity: number): Promise<ApiResponse<CartItem>> {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  async removeFromCart(itemId: number): Promise<ApiResponse<void>> {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  async clearCart(): Promise<ApiResponse<void>> {
    const response = await api.delete('/cart');
    return response.data;
  },
};