// src/pages/Checkout.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock } from '../utils/icons';
import { useCart } from '../context/CartContext';
import AddressForm from '../components/checkout/AddressForm';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    saveAddress: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    clearCart();
    navigate('/order-success');
  };

  const handleAddressChange = (field: string, value: string | boolean) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Address & Payment */}
        <div>
          <div className="card mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
              <AddressForm address={address} onChange={handleAddressChange} />
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-xl p-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="h-5 w-5 text-primary-600"
                    />
                    <span className="ml-3 font-medium">Credit Card</span>
                  </label>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="card sticky top-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.product.name}</div>
                      <div className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FiLock className="mr-2" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                Pay Now
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                By completing your purchase, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;