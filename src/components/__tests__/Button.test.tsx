import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
    expect(button).not.toHaveClass('w-full');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('text-bodyText');
  });

  it('renders full width when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button', { name: /full width/i });
    
    expect(button).toHaveClass('w-full');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts additional className', () => {
    render(<Button className="test-class">With Class</Button>);
    const button = screen.getByRole('button', { name: /with class/i });
    
    expect(button).toHaveClass('test-class');
  });


  /* Snapshot tests */
  it('matches snapshot for primary button', () => {
    const { container } = render(<Button>Primary Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for secondary button', () => {
    const { container } = render(
      <Button variant="secondary">Secondary Button</Button>
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for full width button', () => {
    const { container } = render(
      <Button fullWidth>Full Width Button</Button>
    );
    expect(container).toMatchSnapshot();
  });
}); 