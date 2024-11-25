import React from 'react';
import { FormField as FormFieldType } from '../types/form';

interface FormFieldProps {
  field: FormFieldType;
  value: string;
  onChange: (name: string, value: string) => void;
}

/**
 * FormField component that renders different types of form inputs based on configuration.
 * Currently supports text inputs and dropdowns.
 * Handles styling, accessibility, and state management for individual form fields.
 */
export const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  // Render dropdown select input
  if (field.type === 'dropdown') {
    return (
      <div className="mb-4">
        <label htmlFor={field.name} className="block text-bodyText text-sm font-bold mb-2">
          {field.label}
        </label>
        <select
          id={field.name}
          className="border rounded w-full py-2 px-3 text-bodyText
                     focus:ring-2 focus:ring-primary focus:border-primary
                     outline-none transition-all duration-200 cursor-pointer"
          value={value}
          onChange={e => onChange(field.name, e.target.value)}
        >
          <option value="">Select {field.label}</option>
          {/* Map through provided options */}
          {field.options?.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Render text input (default)
  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="block text-bodyText text-sm font-bold mb-2">
        {field.label}
      </label>
      <input
        type="text"
        id={field.name}
        className="appearance-none border rounded w-full py-2 px-3 text-bodyText
                   focus:ring-2 focus:ring-primary focus:border-primary
                   outline-none transition-all duration-200"
        value={value}
        onChange={e => onChange(field.name, e.target.value)}
      />
    </div>
  );
};
