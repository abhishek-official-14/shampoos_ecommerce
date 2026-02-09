// src/services/productService.ts
import api from './api';
import { Product, PaginatedResponse, ApiResponse } from '../types';

export const productService = {
  async getAll(page: number = 1, limit: number = 12): Promise<PaginatedResponse<Product>> {
    const response = await api.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<Product>> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async search(query: string, page: number = 1): Promise<PaginatedResponse<Product>> {
    const response = await api.get(`/products/search?q=${query}&page=${page}`);
    return response.data;
  },

  async filter(filters: any, page: number = 1): Promise<PaginatedResponse<Product>> {
    const response = await api.post(`/products/filter?page=${page}`, filters);
    return response.data;
  },

  async getFeatured(): Promise<ApiResponse<Product[]>> {
    const response = await api.get('/products/featured');
    return response.data;
  },

  async getRelated(productId: number): Promise<ApiResponse<Product[]>> {
    const response = await api.get(`/products/${productId}/related`);
    return response.data;
  },
};