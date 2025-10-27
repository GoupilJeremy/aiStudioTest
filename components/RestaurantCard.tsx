import React from 'react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onViewMenu: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onViewMenu }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="w-full h-48 object-cover object-center"
        onError={(e) => { e.currentTarget.src = "https://picsum.photos/400/300"; }}
      />
      <div className="p-4">
        <h4 className="text-xl font-semibold text-gray-800 mb-1">{restaurant.name}</h4>
        <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
        <button
          onClick={() => onViewMenu(restaurant)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
