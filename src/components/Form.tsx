import React from 'react';
import { FormConfig, FormData } from '../types/form';
import { FormField } from './FormField';
import { FormSubmit } from './FormSubmit';

interface FormProps {
  config: FormConfig;
  onSubmit: (data: FormData) => void;
}

/**
 * Dynamic form component that renders based on provided configuration.
 * Handles form state, validation, and submission logic.
 */
export const Form: React.FC<FormProps> = ({ config, onSubmit }) => {
  // Form state management
  const [formData, setFormData] = React.useState<FormData>({});
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  // Handle individual field changes
  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error state when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  // Reset form to initial state
  const clearForm = () => {
    setFormData({});
  };

  // Validate if at least one field is filled
  const isFormValid = () => {
    const fields = config.questions.flatMap(q => q.fields.map(f => f.name));
    return fields.some(fieldName => formData[fieldName] && formData[fieldName].trim() !== '');
  };

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    onSubmit(formData);
    setShowSuccess(true);
    clearForm();

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form sections based on config */}
      {config.questions.map((question, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-bodyText">{question.title}</h2>
          {/* Render form fields for each section */}
          {question.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name] || ''}
              onChange={handleFieldChange}
            />
          ))}
        </div>
      ))}
      {/* Submit button with success/error states */}
      <FormSubmit 
        type="submit" 
        fullWidth 
        showSuccess={showSuccess}
        showError={showError}
      >
        Submit
      </FormSubmit>
    </form>
  );
}; 