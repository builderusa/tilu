import React from 'react';

export const TailwindForcer: React.FC = () => {
  return (
    <div className="hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"></div>
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300"></div>
      <div className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"></div>
      <div className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"></div>
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"></div>
      <div className="shadow-lg hover:shadow-xl active:scale-95 transform transition-all duration-200"></div>
      <div className="border-2 rounded-full rounded-lg"></div>
      <div className="h-7 h-8 h-9 h-10 h-11 h-12"></div>
      <div className="px-2 px-3 px-4 px-6 px-8 py-2"></div>
      <div className="text-xs text-sm text-base text-lg text-xl"></div>
      <div className="w-full"></div>
    </div>
  );
};
