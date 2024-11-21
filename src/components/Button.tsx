import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable Button component for basic button styling.
 * Supports primary/secondary styles and full width option.
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false,
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "py-[7px] px-[30px] rounded-3xl transition-all duration-200 font-bold";
  
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-white hover:text-bodyText border-2 border-primary",
    secondary: "bg-white text-bodyText hover:bg-primary hover:text-white border-2 border-primary"
  };
    
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 