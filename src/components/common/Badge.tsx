// src/components/common/Badge.tsx
import React from 'react';
import { FiX } from 'react-icons/fi';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'pill' | 'rounded' | 'square';
  outline?: boolean;
  soft?: boolean;
  withIcon?: boolean;
  icon?: React.ReactNode;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
  dot?: boolean;
  pulse?: boolean;
  disabled?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  outline = false,
  soft = false,
  withIcon = false,
  icon,
  onClose,
  onClick,
  className = '',
  dot = false,
  pulse = false,
  disabled = false,
}) => {
  const variantClass = outline
    ? `badge-outline-${variant}`
    : soft
    ? `badge-soft-${variant}`
    : `badge-${variant}`;

  const sizeClass = `badge-${size}`;
  const shapeClass = `badge-${shape}`;
  const clickableClass = onClick ? 'badge-clickable' : '';
  const disabledClass = disabled ? 'badge-disabled' : '';
  const pulseClass = pulse ? 'badge-pulse' : '';
  const dotClass = dot ? 'badge-dot' : '';

  const classes = [
    'badge',
    variantClass,
    sizeClass,
    shapeClass,
    clickableClass,
    disabledClass,
    pulseClass,
    dotClass,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    onClick?.();
  };

  const handleClose = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    onClose?.();
  };

  return (
    <span className={classes} onClick={handleClick}>
      {withIcon && icon && <span className="badge-icon">{icon}</span>}
      {!dot && children}
      {onClose && (
        <button
          className="badge-close"
          onClick={handleClose}
          disabled={disabled}
          aria-label="Remove badge"
        >
          <FiX />
        </button>
      )}
    </span>
  );
};

interface BadgeGroupProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BadgeGroup: React.FC<BadgeGroupProps> = ({
  children,
  spacing = 'md',
  className = '',
}) => {
  const spacingClass = `badge-group-spacing-${spacing}`;

  return (
    <div className={`badge-group ${spacingClass} ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
export { BadgeGroup };