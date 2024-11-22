import React from 'react';
import { Button } from './Button';

interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showSuccess?: boolean;
  showError?: boolean;
  fullWidth?: boolean;
}

/**
 * FormSubmit component that handles form submission states and messaging.
 * Uses the base Button component for styling while adding form-specific functionality.
 */
export const FormSubmit: React.FC<FormSubmitProps> = ({
  showSuccess = false,
  showError = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const getStateStyles = () => {
    if (showSuccess) return 'hover:bg-primary hover:text-bodyText cursor-default';
    if (showError)
      return 'bg-red-500 border-red-500 text-white hover:bg-white hover:text-red-500 cursor-not-allowed';
    return '';
  };

  const getMessage = () => {
    if (showSuccess) return 'Form Submitted Successfully!';
    if (showError) return 'Please complete form';
    return children;
  };

  return (
    <Button
      fullWidth={fullWidth}
      className={`${getStateStyles()} ${className}`}
      disabled={showSuccess || showError}
      {...props}
    >
      {getMessage()}
    </Button>
  );
};
