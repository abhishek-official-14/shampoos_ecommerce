// src/components/common/Avatar.tsx
import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  bordered?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
  initials?: string;
  className?: string;
  onClick?: () => void;
  fallback?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  bordered = false,
  status,
  initials,
  className = '',
  onClick,
  fallback,
}) => {
  const sizeClasses = {
    xs: 'avatar-xs',
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl',
    '2xl': 'avatar-2xl',
  };

  const shapeClasses = {
    circle: '',
    square: 'avatar-square',
    rounded: 'avatar-rounded',
  };

  const statusClasses = {
    online: 'avatar-online',
    offline: 'avatar-offline',
    busy: 'avatar-busy',
    away: 'avatar-away',
  };

  const classes = [
    'avatar',
    sizeClasses[size],
    shapeClasses[shape],
    bordered ? 'avatar-bordered' : '',
    status ? statusClasses[status] : '',
    onClick ? 'avatar-clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt}
          className="avatar-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      );
    }

    if (initials) {
      return (
        <div className="avatar-initials">
          {initials.slice(0, 2).toUpperCase()}
        </div>
      );
    }

    if (fallback) {
      return <div className="avatar-fallback">{fallback}</div>;
    }

    return (
      <div className="avatar-placeholder">
        <svg
          className="avatar-placeholder-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className={classes} onClick={onClick}>
      {renderContent()}
    </div>
  );
};

interface AvatarGroupProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  max?: number;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  size = 'md',
  max,
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? childrenArray.length - max : 0;

  const sizeClass = `avatar-group-${size}`;

  return (
    <div className={`avatar-group ${sizeClass} ${className}`}>
      {visibleAvatars}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          initials={`+${remainingCount}`}
          className="avatar-more"
        />
      )}
    </div>
  );
};

export default Avatar;
export { AvatarGroup };