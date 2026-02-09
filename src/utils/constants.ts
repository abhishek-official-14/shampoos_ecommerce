// src/utils/constants.ts
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'PureLocks';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const HAIR_TYPES = [
  'All',
  'Dry',
  'Oily',
  'Normal',
  'Fine',
  'Curly',
  'Damaged',
  'Color-treated',
  'Thin',
  'Thick',
];

export const CONCERNS = [
  'All',
  'Frizz',
  'Dandruff',
  'Hair Loss',
  'Dryness',
  'Damage',
  'Color Protection',
  'Split Ends',
  'Scalp Health',
  'Volume',
];

export const BENEFITS = [
  'Sulfate Free',
  'Paraben Free',
  'Cruelty Free',
  'Vegan',
  'Natural Ingredients',
  'Color Safe',
  'pH Balanced',
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

export const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India',
];

export const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const PAYMENT_METHODS = [
  { id: 'credit-card', name: 'Credit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🔗' },
  { id: 'apple-pay', name: 'Apple Pay', icon: '🍎' },
  { id: 'google-pay', name: 'Google Pay', icon: '📱' },
];