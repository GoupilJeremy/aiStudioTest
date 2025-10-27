import React, { useEffect, useState, useCallback } from 'react';
import { Restaurant, MenuItem } from '../types';
import { generateMenuItems } from '../services/geminiService';

interface MenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ restaurant, onClose, onAddToCart }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = useCallback(async (restaurantName: string) => {
    setLoading(true);
    setError(null);
    try {
      const items = await generateMenuItems(restaurantName);
      setMenuItems(items);
    } catch (err) {
      setError("Failed to load menu. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (restaurant && !restaurant.menu) { // Only fetch if restaurant exists and menu hasn't been fetched yet
      fetchMenu(restaurant.name);
    } else if (restaurant && restaurant.menu) {
      setMenuItems(restaurant.menu); // If menu is already part of the restaurant object (e.g., from App state)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant]); // Re-run effect if a new restaurant is selected

  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto transform scale-100 opacity-100 transition-all duration-300">
        <div className="sticky top-0 bg-white p-6 flex items-center justify-between border-b border-gray-200 z-10">
          <h3 className="text-2xl font-bold text-gray-800">{restaurant.name} Menu</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6">
          {loading && (
            <div className="text-center text-indigo-600 py-8">
              <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Loading menu items...</p>
            </div>
          )}
          {error && (
            <div className="text-center text-red-600 py-8">
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && menuItems.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>No menu items available for this restaurant.</p>
            </div>
          )}
          {!loading && !error && menuItems.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {menuItems.map((item) => (
                <li key={item.id} className="py-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="ml-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
