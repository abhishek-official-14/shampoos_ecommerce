// src/pages/Cart.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from '../utils/icons';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from '../utils/icons';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from '../utils/icons';
const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn-primary inline-flex items-center">
            Start Shopping
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{cartItems.length} Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            For {item.product.hairType.join(', ')} hair
                          </p>
                          <div className="text-2xl font-bold">
                            ${item.product.price.toFixed(2)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 self-start"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center border border-gray-300 rounded-xl">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-4 py-2 text-gray-600 hover:text-primary-600"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-4 py-2 text-gray-600 hover:text-primary-600"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-xl font-bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card sticky top-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="btn-primary w-full inline-flex items-center justify-center mb-4"
              >
                Proceed to Checkout
                <FiArrowRight className="ml-2" />
              </Link>
              
              <Link
                to="/products"
                className="text-center text-primary-600 hover:text-primary-700 font-medium block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;