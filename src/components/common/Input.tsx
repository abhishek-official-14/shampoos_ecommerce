// src/components/common/Input.tsx
import React, { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff, FiSearch, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helpText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'flushed';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helpText,
      prefix,
      suffix,
      clearable,
      showPasswordToggle,
      loading,
      fullWidth = false,
      size = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      className = '',
      wrapperClassName = '',
      type = 'text',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setInternalValue('');
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const sizeClasses = {
      sm: 'input-sm',
      md: '',
      lg: 'input-lg',
    };

    const variantClasses = {
      default: '',
      filled: 'input-filled',
      flushed: 'input-flushed',
    };

    const errorClass = error ? 'input-error' : '';
    const successClass = success ? 'input-success' : '';
    const fullWidthClass = fullWidth ? 'input-full' : '';
    const prefixClass = prefix ? 'input-with-prefix' : '';
    const suffixClass = suffix || clearable || showPasswordToggle ? 'input-with-suffix' : '';

    const inputClasses = [
      'input',
      sizeClasses[size],
      variantClasses[variant],
      errorClass,
      successClass,
      prefixClass,
      suffixClass,
      className,
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      'input-wrapper',
      wrapperClassName,
    ].filter(Boolean).join(' ');

    return (
      <div className={`input-container ${fullWidthClass}`}>
        {label && (
          <label className="input-label">
            {label}
            {props.required && <span className="input-label-required">*</span>}
          </label>
        )}

        <div className={wrapperClasses}>
          {leftIcon && (
            <span className="input-left-icon">
              {leftIcon}
            </span>
          )}

          {prefix && (
            <span className="input-prefix">
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            value={internalValue}
            onChange={handleChange}
            {...props}
          />

          {rightIcon && !clearable && !showPasswordToggle && !loading && (
            <span className="input-right-icon">
              {rightIcon}
            </span>
          )}

          {clearable && internalValue && !loading && (
            <button
              type="button"
              className="input-clear-button"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <FiX />
            </button>
          )}

          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              className="input-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          )}

          {loading && (
            <span className="input-loading">
              <div className="input-spinner" />
            </span>
          )}

          {suffix && !clearable && !showPasswordToggle && !loading && (
            <span className="input-suffix">
              {suffix}
            </span>
          )}
        </div>

        {error && (
          <div className="input-error-text">
            <FiAlertCircle />
            {error}
          </div>
        )}

        {success && (
          <div className="input-success-text">
            <FiCheck />
            {success}
          </div>
        )}

        {helpText && !error && !success && (
          <div className="input-help-text">
            {helpText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;