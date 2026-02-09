// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import ReviewCard from '../components/common/ReviewCard';
// Replace the import line at the top:
import { 
  FiShield, 
  FiLeaf, 
  FiDroplet, 
  FiCheckCircle,
  FiArrowRight 
} from '../utils/icons'; // Changed from 'react-icons/fi'

const Home: React.FC = () => {
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Hydrating Shampoo",
      description: "Deeply hydrates and nourishes dry, damaged hair with natural oils and vitamins.",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
      images: [],
      ingredients: ["Aloe Vera", "Coconut Oil", "Argan Oil", "Vitamin E"],
      howToUse: ["Wet hair thoroughly", "Apply shampoo", "Massage scalp", "Rinse well"],
      hairType: ["Dry", "Damaged"],
      concerns: ["Frizz", "Dryness", "Damage"],
      benefits: ["Hydrates", "Repairs", "Strengthens"],
      rating: 4.8,
      reviewCount: 128,
      inStock: true
    },
    {
      id: 2,
      name: "Volumizing Shampoo",
      description: "Adds body and bounce to fine, flat hair without weighing it down.",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w-400&h=400&fit=crop",
      images: [],
      ingredients: ["Bamboo Extract", "Ginseng", "Biotin", "Pea Protein"],
      howToUse: ["Wet hair", "Apply", "Massage", "Rinse"],
      hairType: ["Fine", "Flat"],
      concerns: ["Limp hair", "Lack of volume"],
      benefits: ["Volumizes", "Strengthens", "Thickens"],
      rating: 4.6,
      reviewCount: 94,
      inStock: true
    }
  ];

  const benefits = [
    { icon: FiShield, title: "Sulphate Free", description: "Gentle cleansing without harsh chemicals" },
    { icon: FiLeaf, title: "Paraben Free", description: "No harmful preservatives" },
    { icon: FiDroplet, title: "100% Vegan", description: "Cruelty-free and plant-based" },
    { icon: FiCheckCircle, title: "Safe & Tested", description: "Dermatologically tested" },
  ];

  const reviews = [
    { name: "Sarah M.", rating: 5, comment: "My hair has never felt better! The hydrating shampoo saved my dry, damaged hair.", date: "2 weeks ago" },
    { name: "Jessica T.", rating: 5, comment: "Love the natural ingredients. My scalp feels cleaner and healthier.", date: "1 month ago" },
    { name: "Michael R.", rating: 4, comment: "Great volume boost for my fine hair. Will definitely repurchase!", date: "3 weeks ago" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Pure Care for Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  Beautiful Locks
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Discover our sulfate-free, paraben-free shampoos made with natural ingredients for healthier, shinier hair.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-primary inline-flex items-center justify-center">
                  Shop Now
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop"
                  alt="PureLocks Shampoo"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PureLocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 card">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
              View All
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready for Healthier Hair?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their hair with PureLocks.
          </p>
          <Link to="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-block">
            Start Your Hair Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;