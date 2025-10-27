import React from 'react';

interface HeroSectionProps {
  onOrderNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOrderNow }) => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 md:py-32 overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          Hungry? Get it Delivered!
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 animate-fade-in-up">
          Fast & Affordable On-Campus Food Delivery for University Students.
        </p>
        <button
          onClick={onOrderNow}
          className="bg-yellow-400 text-indigo-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg animate-pop-in"
        >
          Order Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
