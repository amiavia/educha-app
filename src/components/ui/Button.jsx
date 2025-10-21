import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center";

  const variants = {
    primary: "bg-primary-blue text-white hover:bg-blue-900 shadow-md hover:shadow-lg",
    secondary: "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white",
    ghost: "text-primary-blue hover:bg-blue-50"
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
