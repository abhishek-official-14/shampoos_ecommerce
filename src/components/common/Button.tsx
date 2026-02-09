// src/components/common/Button.tsx
import React, { forwardRef } from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'button';
    const variantClasses = {
      primary: 'button-primary',
      secondary: 'button-secondary',
      outline: 'button-outline',
      ghost: 'button-ghost',
      danger: 'button-danger',
      success: 'button-success',
    };
    const sizeClasses = {
      sm: 'button-sm',
      md: '',
      lg: 'button-lg',
    };
    const widthClass = fullWidth ? 'button-full' : '';
    const loadingClass = loading ? 'button-loading' : '';
    
    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClass,
      loadingClass,
      className,
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {icon && iconPosition === 'left' && !loading && (
          <span className="button-icon-left">{icon}</span>
        )}
        {loading && <span className="button-loading-spinner" />}
        <span className="button-text">{children}</span>
        {icon && iconPosition === 'right' && !loading && (
          <span className="button-icon-right">{icon}</span>
        )}
      </>
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;