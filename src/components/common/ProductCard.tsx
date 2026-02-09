// src/components/common/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card group overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-secondary-600 text-white px-3 py-1 rounded-full text-sm">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{product.hairType[0]}</span>
            <div className="flex items-center">
              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
              <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button className="btn-primary text-sm py-2 px-4">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;