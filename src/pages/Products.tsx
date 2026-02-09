// src/pages/Products.tsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiFilter, FiSearch, FiX } from '../utils/icons';
import api from '../services/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHairType, setSelectedHairType] = useState<string>('all');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hairTypes = ['All', 'Dry', 'Oily', 'Normal', 'Fine', 'Curly', 'Damaged'];
  const concerns = ['All', 'Frizz', 'Dandruff', 'Hair Loss', 'Dryness', 'Damage', 'Color Protection'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedHairType, selectedConcern, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      const mockProducts: Product[] = [
        {
          id: 1,
          name: "Hydrating Shampoo",
          description: "Deeply hydrates and nourishes dry, damaged hair",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
          images: [],
          ingredients: [],
          howToUse: [],
          hairType: ["Dry", "Damaged"],
          concerns: ["Frizz", "Dryness"],
          benefits: [],
          rating: 4.8,
          reviewCount: 128,
          inStock: true
        },
        // Add more mock products...
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedHairType !== 'all') {
      filtered = filtered.filter(product =>
        product.hairType.includes(selectedHairType)
      );
    }

    if (selectedConcern !== 'all') {
      filtered = filtered.filter(product =>
        product.concerns.includes(selectedConcern)
      );
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedHairType('all');
    setSelectedConcern('all');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-gray-600">Find the perfect shampoo for your hair type and concerns</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="btn-primary inline-flex items-center"
          >
            <FiFilter className="mr-2" />
            Filters
          </button>
        </div>

        {/* Filters Sidebar - Desktop */}
        <div className={`lg:block w-full lg:w-64 ${isFilterOpen ? 'fixed inset-0 z-50 bg-white p-6' : 'hidden'}`}>
          {isFilterOpen && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <FiX className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Hair Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Hair Type</label>
              <div className="space-y-2">
                {hairTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedHairType(type.toLowerCase())}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedHairType === type.toLowerCase()
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Concern Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Hair Concern</label>
              <div className="space-y-2">
                {concerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => setSelectedConcern(concern.toLowerCase())}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedConcern === concern.toLowerCase()
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All Filters
            </button>
          </div>

          {isFilterOpen && (
            <button
              onClick={() => setIsFilterOpen(false)}
              className="btn-primary w-full mt-6"
            >
              Apply Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;