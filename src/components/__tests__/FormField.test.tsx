import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FormField } from '../FormField';

describe('FormField', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders text input correctly', () => {
    const textField = {
      name: 'first_name',
      label: 'First Name',
      type: 'text' as const
    };

    render(<FormField field={textField} value="" onChange={mockOnChange} />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders dropdown correctly', () => {
    const dropdownField = {
      name: 'country',
      label: 'Country',
      type: 'dropdown' as const,
      options: ['Canada', 'USA']
    };

    render(<FormField field={dropdownField} value="" onChange={mockOnChange} />);

    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3); // Including default option
  });

  it('calls onChange when text input value changes', () => {
    const textField = {
      name: 'first_name',
      label: 'First Name',
      type: 'text' as const
    };

    render(<FormField field={textField} value="" onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
    expect(mockOnChange).toHaveBeenCalledWith('first_name', 'John');
  });

  it('calls onChange when dropdown value changes', () => {
    const dropdownField = {
      name: 'country',
      label: 'Country',
      type: 'dropdown' as const,
      options: ['Canada', 'USA']
    };

    render(<FormField field={dropdownField} value="" onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Canada' } });
    expect(mockOnChange).toHaveBeenCalledWith('country', 'Canada');
  });
}); 