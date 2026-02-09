// src/components/common/ReviewCard.tsx
import React from 'react';
import { FiStar } from 'react-icons/fi';

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, comment, date }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

export default ReviewCard;