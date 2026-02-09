// src/components/common/Toast.tsx
import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX, FiXCircle } from 'react-icons/fi';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const icons = {
    success: <FiCheckCircle />,
    error: <FiXCircle />,
    warning: <FiAlertCircle />,
    info: <FiInfo />,
  };

  const typeClasses = {
    success: 'toast-success',
    error: 'toast-error',
    warning: 'toast-warning',
    info: 'toast-info',
  };

  return (
    <div className={`toast ${typeClasses[type]} ${isExiting ? 'toast-exiting' : ''}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-content">
        <h3 className="toast-title">{title}</h3>
        <p className="toast-message">{message}</p>
        {action && (
          <div className="toast-action">
            <button
              onClick={action.onClick}
              className="toast-action-button"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
      <button onClick={handleClose} className="toast-close">
        <FiX />
      </button>
      {duration > 0 && (
        <div
          className="toast-progress"
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
};

export default Toast;