// src/services/authService.ts
import api from './api';
import { User, ApiResponse } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('purelocks_token', response.data.data.token);
      localStorage.setItem('purelocks_user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async register(userData: any): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('purelocks_token', response.data.data.token);
      localStorage.setItem('purelocks_user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('purelocks_token');
    localStorage.removeItem('purelocks_user');
  },

  async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem('purelocks_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.put('/auth/profile', userData);
    if (response.data.success) {
      localStorage.setItem('purelocks_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    const response = await api.put('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  },
};