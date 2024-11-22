import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormSubmit } from '../FormSubmit';

describe('FormSubmit', () => {
  it('renders default state correctly', () => {
    render(<FormSubmit>Submit</FormSubmit>);
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('shows success message and disables button when showSuccess is true', () => {
    render(<FormSubmit showSuccess>Submit</FormSubmit>);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Form Submitted Successfully!');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-default');
  });

  it('shows error message and disables button when showError is true', () => {
    render(<FormSubmit showError>Submit</FormSubmit>);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Please complete form');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('applies full width style when fullWidth is true', () => {
    render(<FormSubmit fullWidth>Submit</FormSubmit>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('accepts and applies additional className', () => {
    render(<FormSubmit className="test-class">Submit</FormSubmit>);
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });
});
