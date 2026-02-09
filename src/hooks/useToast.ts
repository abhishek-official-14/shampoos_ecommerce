// src/hooks/useToast.ts
import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((
    type: ToastType,
    title: string,
    message: string,
    duration: number = 5000
  ) => {
    const id = Date.now().toString();
    const newToast: ToastItem = {
      id,
      type,
      title,
      message,
      duration,
    };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title: string, message: string, duration?: number) => {
    return showToast('success', title, message, duration);
  }, [showToast]);

  const error = useCallback((title: string, message: string, duration?: number) => {
    return showToast('error', title, message, duration);
  }, [showToast]);

  const warning = useCallback((title: string, message: string, duration?: number) => {
    return showToast('warning', title, message, duration);
  }, [showToast]);

  const info = useCallback((title: string, message: string, duration?: number) => {
    return showToast('info', title, message, duration);
  }, [showToast]);

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};