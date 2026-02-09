// src/pages/OrderSuccess.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiHome, FiPackage } from '../utils/icons';

const OrderSuccess: React.FC = () => {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="card w-full max-w-2xl">
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-8">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FiPackage className="w-6 h-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Order Number</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{orderNumber}</div>
            <p className="text-gray-600">
              You will receive an email confirmation shortly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-4 border border-gray-200 rounded-xl">
              <FiPackage className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Order Processed</h3>
              <p className="text-sm text-gray-600">Within 24 hours</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl">
              <FiShoppingBag className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Order Shipped</h3>
              <p className="text-sm text-gray-600">Within 2-3 business days</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl">
              <FiCheckCircle className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Order Delivered</h3>
              <p className="text-sm text-gray-600">Within 5-7 business days</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center justify-center"
            >
              <FiShoppingBag className="mr-2" />
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <FiHome className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;