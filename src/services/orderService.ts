// src/services/orderService.ts
import api from './api';
import { Order, ApiResponse, PaginatedResponse } from '../types';

export const orderService = {
  async createOrder(orderData: any): Promise<ApiResponse<Order>> {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getOrders(page: number = 1): Promise<PaginatedResponse<Order>> {
    const response = await api.get(`/orders?page=${page}`);
    return response.data;
  },

  async getOrderById(id: number): Promise<ApiResponse<Order>> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async cancelOrder(id: number): Promise<ApiResponse<Order>> {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },
};