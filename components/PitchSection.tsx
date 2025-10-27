import React from 'react';

const PitchSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-10">Why Campus Eats?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-indigo-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-3">Lightning Fast Delivery</h4>
            <p className="text-gray-600">
              No more waiting. Our dedicated on-campus delivery network ensures your food arrives hot and fresh, right when you need it.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-green-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-3">Student-Friendly Prices</h4>
            <p className="text-gray-600">
              We understand student budgets. Enjoy delicious meals without breaking the bank, with exclusive deals and affordable options.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-orange-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-3">Convenience at Your Door</h4>
            <p className="text-gray-600">
              From dorms to the library, get your favorite campus meals delivered directly to your location, saving you time and hassle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PitchSection;
