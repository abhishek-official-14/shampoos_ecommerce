// src/components/common/ToastContainer.tsx
import React from 'react';
import Toast, { ToastType } from './Toast';
import './Toast.css';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemoveToast: (id: string) => void;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemoveToast,
  position = 'top-right',
}) => {
  const positionClasses = {
    'top-left': 'toast-container-top-left',
    'top-center': 'toast-container-top-center',
    'top-right': 'toast-container-top-right',
    'bottom-left': 'toast-container-bottom-left',
    'bottom-center': 'toast-container-bottom-center',
    'bottom-right': 'toast-container-bottom-right',
  };

  return (
    <div className={`toast-container ${positionClasses[position]}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onRemoveToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;