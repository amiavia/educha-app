import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  const hoverStyles = hover ? "hover:shadow-xl hover:-translate-y-1" : "";

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
