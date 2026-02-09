// src/utils/validation.ts
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return '';
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone) return 'Phone number is required';
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
  if (!re.test(cleanedPhone)) return 'Please enter a valid phone number';
  return '';
};

export const validateAddress = (address: any): ValidationResult => {
  const errors: Record<string, string> = {};

  errors.street = validateRequired(address.street, 'Street address');
  errors.city = validateRequired(address.city, 'City');
  errors.state = validateRequired(address.state, 'State');
  errors.zipCode = validateRequired(address.zipCode, 'ZIP Code');
  
  if (address.zipCode && !/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
    errors.zipCode = 'Please enter a valid ZIP code';
  }

  return {
    isValid: Object.values(errors).every(error => error === ''),
    errors,
  };
};

export const validateCard = (card: any): ValidationResult => {
  const errors: Record<string, string> = {};

  errors.number = validateRequired(card.number, 'Card number');
  if (card.number && !/^\d{16}$/.test(card.number.replace(/\s/g, ''))) {
    errors.number = 'Please enter a valid 16-digit card number';
  }

  errors.expiry = validateRequired(card.expiry, 'Expiry date');
  if (card.expiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
    errors.expiry = 'Please enter a valid expiry date (MM/YY)';
  }

  errors.cvc = validateRequired(card.cvc, 'CVC');
  if (card.cvc && !/^\d{3,4}$/.test(card.cvc)) {
    errors.cvc = 'Please enter a valid CVC (3 or 4 digits)';
  }

  return {
    isValid: Object.values(errors).every(error => error === ''),
    errors,
  };
};