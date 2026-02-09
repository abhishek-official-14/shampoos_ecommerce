// src/pages/ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiChevronLeft, FiChevronRight } from '../utils/icons';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../services/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // Mock product data
      const mockProduct: Product = {
        id: 1,
        name: "Hydrating Shampoo",
        description: "Deeply hydrates and nourishes dry, damaged hair with natural oils and vitamins. Our sulfate-free formula cleanses gently while restoring moisture balance.",
        price: 24.99,
        originalPrice: 29.99,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop",
        ],
        ingredients: [
          "Aloe Vera Leaf Juice",
          "Coconut Oil",
          "Argan Oil",
          "Vitamin E",
          "Biotin",
          "Keratin",
          "Jojoba Oil",
          "Chamomile Extract"
        ],
        howToUse: [
          "Wet hair thoroughly with warm water",
          "Apply a quarter-sized amount to palm",
          "Massage into scalp with fingertips for 2-3 minutes",
          "Work through to ends",
          "Rinse thoroughly with warm water",
          "Follow with conditioner for best results"
        ],
        hairType: ["Dry", "Damaged", "Curly", "Color-treated"],
        concerns: ["Frizz", "Dryness", "Damage", "Breakage"],
        benefits: ["Deep Hydration", "Damage Repair", "Frizz Control", "Strength Restoration"],
        rating: 4.8,
        reviewCount: 128,
        inStock: true
      };
      setProduct(mockProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate('/cart');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative mb-4">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-secondary-600 text-white px-4 py-2 rounded-full font-bold">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </div>
            )}
          </div>
          
          <div className="flex space-x-4 overflow-x-auto">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary-600' : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiHeart className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiShare2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${product.price.toFixed(2)}
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Hair Type & Concerns */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.hairType.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.concerns.map((concern) => (
                <span
                  key={concern}
                  className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                >
                  {concern}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:text-primary-600"
                >
                  -
                </button>
                <span className="px-4 py-3 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:text-primary-600"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-primary flex-1 inline-flex items-center justify-center"
              >
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Key Ingredients</h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* How to Use */}
          <div>
            <h3 className="text-xl font-bold mb-4">How to Use</h3>
            <ol className="space-y-2">
              {product.howToUse.map((step, index) => (
                <li key={index} className="flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;