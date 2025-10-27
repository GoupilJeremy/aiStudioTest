import React from 'react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onOpenCart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-indigo-700">Campus Eats</h1>
      <button
        onClick={onOpenCart}
        className="relative p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="View shopping cart"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
          ></path>
        </svg>
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {cartItemCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
