import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders footer text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/Submitted for review by steve newman/i)).toBeInTheDocument();
    expect(screen.getByText(/22nd november 2024/i)).toBeInTheDocument();
  });

  it('includes a horizontal rule', () => {
    render(<Footer />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toHaveClass('border-primary');
  });

  /* Snapshot tests */
  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
}); 