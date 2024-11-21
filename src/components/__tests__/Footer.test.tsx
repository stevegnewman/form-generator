import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders footer text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/Submitted by steve newman/i)).toBeInTheDocument();
    expect(screen.getByText(/21st november 2024/i)).toBeInTheDocument();
  });

  it('includes a horizontal rule', () => {
    render(<Footer />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toHaveClass('border-primary');
  });
}); 