import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PitchSection from './components/PitchSection';
import RestaurantCard from './components/RestaurantCard';
import MenuModal from './components/MenuModal';
import CartModal from './components/CartModal';
import { Restaurant, MenuItem, CartItem } from './types';

// Helper function to generate a unique ID (for menu items, etc.)
const generateId = (): string => Math.random().toString(36).substring(2, 9);

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const restaurantListRef = useRef<HTMLDivElement>(null);

  // Initialize static restaurant data
  useEffect(() => {
    const initialRestaurants: Restaurant[] = [
      {
        id: generateId(),
        name: 'Campus Bites',
        cuisine: 'American Fast Food',
        imageUrl: 'https://picsum.photos/id/1080/400/300',
        description: 'Classic American comfort food, perfect for a quick bite between classes.',
      },
      {
        id: generateId(),
        name: 'The Noodle Hub',
        cuisine: 'Asian Cuisine',
        imageUrl: 'https://picsum.photos/id/200/400/300',
        description: 'Authentic noodles and rice dishes with a spicy kick!',
      },
      {
        id: generateId(),
        name: 'Healthy Greens',
        cuisine: 'Salads & Wraps',
        imageUrl: 'https://picsum.photos/id/300/400/300',
        description: 'Fresh, nutritious salads and wraps for a healthy campus lifestyle.',
      },
      {
        id: generateId(),
        name: 'Pizza Palace',
        cuisine: 'Italian & Pizza',
        imageUrl: 'https://picsum.photos/id/400/400/300',
        description: 'Piping hot pizzas and classic Italian pasta dishes.',
      },
      {
        id: generateId(),
        name: 'Coffee & Co.',
        cuisine: 'Cafe & Snacks',
        imageUrl: 'https://picsum.photos/id/500/400/300',
        description: 'Your go-to spot for coffee, pastries, and light snacks.',
      },
    ];
    setRestaurants(initialRestaurants);
  }, []); // Empty dependency array means this runs once on mount

  const handleViewMenu = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setSelectedRestaurant(null);
  }, []);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    // Optionally close menu and open cart after adding an item
    // setSelectedRestaurant(null);
    // setIsCartOpen(true);
  }, []);

  const handleUpdateCartQuantity = useCallback((itemId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  }, []);

  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
    alert('Cart cleared!');
    setIsCartOpen(false);
  }, []);

  const handleCheckout = useCallback(() => {
    alert(`Order placed for $${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}!`);
    handleClearCart(); // Clear cart after simulated checkout
  }, [cartItems, handleClearCart]);

  const handleOpenCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleOrderNowClick = useCallback(() => {
    if (restaurantListRef.current) {
      restaurantListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20"> {/* pb-20 for sticky nav bottom */}
      <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={handleOpenCart} />

      <main className="pt-16"> {/* pt-16 to offset fixed navbar */}
        <HeroSection onOrderNow={handleOrderNowClick} />
        <PitchSection />

        <section id="restaurants" ref={restaurantListRef} className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Explore On-Campus Eats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onViewMenu={handleViewMenu}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {selectedRestaurant && (
        <MenuModal
          restaurant={selectedRestaurant}
          onClose={handleCloseMenu}
          onAddToCart={handleAddToCart}
        />
      )}

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={handleCloseCart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* Sticky footer for persistent actions on larger screens (optional for this app, but good practice) */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-center z-40">
        <button
          onClick={handleOpenCart}
          className="bg-indigo-600 text-white py-3 px-8 rounded-full text-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </div> */}
    </div>
  );
}

export default App;
