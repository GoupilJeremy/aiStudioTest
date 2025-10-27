import React from 'react';
import { CartItem } from '../types';

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void; // Simulate checkout
}

const CartModal: React.FC<CartModalProps> = ({
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto transform scale-100 opacity-100 transition-all duration-300">
        <div className="sticky top-0 bg-white p-6 flex items-center justify-between border-b border-gray-200 z-10">
          <h3 className="text-2xl font-bold text-gray-800">Your Cart</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-4 mt-6 flex justify-between items-center text-xl font-bold text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-6">
                <button
                  onClick={onCheckout}
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClearCart}
                  className="flex-1 bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
