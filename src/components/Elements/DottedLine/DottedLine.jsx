import React from 'react';

export const DottedLine = () => {
  return (
    <div className="flex items-center w-full">
      {/* Left larger dot */}
      <div className="h-2 w-2 bg-gray-300 rounded-full mr-1"></div>
      
      {/* Dotted line */}
      <div className="flex-grow">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(4px,_1fr))] gap-1">
          {[...Array(100)].map((_, index) => (
            <div key={index} className="h-1 w-1 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
      
      {/* Right larger dot */}
      <div className="h-2 w-2 bg-gray-300 rounded-full ml-1"></div>
    </div>
  );
};
