import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Form } from '../Form';
import { FormConfig } from '../../types/form';

describe('Form', () => {
  const mockConfig: FormConfig = {
    questions: [
      {
        title: "Test Question",
        fields: [
          { name: "test_field", label: "Test Field", type: "text" },
          { name: "test_dropdown", label: "Test Dropdown", type: "dropdown", options: ["Option 1", "Option 2"] }
        ]
      }
    ]
  };

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all fields from config', () => {
    render(<Form config={mockConfig} onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText('Test Question')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Dropdown')).toBeInTheDocument();
  });

  it('shows error when submitting empty form', async () => {
    render(<Form config={mockConfig} onSubmit={mockOnSubmit} />);
    
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    
    expect(screen.getByText(/please complete form/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Test error message disappears after timeout
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText(/please complete form/i)).not.toBeInTheDocument();
  });

  it('submits form data when all fields are filled', async () => {
    render(<Form config={mockConfig} onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'test value' }
    });

    fireEvent.change(screen.getByLabelText('Test Dropdown'), {
      target: { value: 'Option 1' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      test_field: 'test value',
      test_dropdown: 'Option 1'
    });
    
    expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument();

    // Test success message disappears after timeout
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByText(/form submitted successfully/i)).not.toBeInTheDocument();
  });

  it('clears form after successful submission', async () => {
    render(<Form config={mockConfig} onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'test value' }
    });

    fireEvent.change(screen.getByLabelText('Test Dropdown'), {
      target: { value: 'Option 1' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByLabelText('Test Field')).toHaveValue('');
    expect(screen.getByLabelText('Test Dropdown')).toHaveValue('');
  });

  it('clears error state when user starts typing', async () => {
    render(<Form config={mockConfig} onSubmit={mockOnSubmit} />);
    
    // Submit empty form to trigger error
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/please complete form/i)).toBeInTheDocument();

    // Start typing in a field
    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'a' }
    });

    // Error message should be gone
    expect(screen.queryByText(/please complete form/i)).not.toBeInTheDocument();
  });

  it('validates at least one field is filled before submission', () => {
    render(<Form config={mockConfig} onSubmit={mockOnSubmit} />);
    
    // Submit empty form
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/please complete form/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Fill one field and submit
    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'test value' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith({
      test_field: 'test value'
    });
  });

  it('considers whitespace-only values as empty', () => {
    render(<Form config={mockConfig} onSubmit={mockOnSubmit} />);
    
    // Fill field with whitespace
    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: '   ' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/please complete form/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  /* Snapshot tests */
  it('matches snapshot for initial render', () => {
    const { container } = render(
      <Form config={mockConfig} onSubmit={mockOnSubmit} />
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with filled form data', () => {
    const { container } = render(
      <Form config={mockConfig} onSubmit={mockOnSubmit} />
    );

    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'test value' }
    });

    fireEvent.change(screen.getByLabelText('Test Dropdown'), {
      target: { value: 'Option 1' }
    });

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with error state', () => {
    const { container } = render(
      <Form config={mockConfig} onSubmit={mockOnSubmit} />
    );

    fireEvent.submit(screen.getByRole('button'));
    expect(container).toMatchSnapshot();
  });

  it('warns about duplicate field names in config', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const duplicateConfig: FormConfig = {
      questions: [
        {
          title: "Test Question 1",
          fields: [
            { name: "duplicate_field", label: "First Duplicate", type: "text" }
          ]
        },
        {
          title: "Test Question 2",
          fields: [
            { name: "duplicate_field", label: "Second Duplicate", type: "text" }
          ]
        }
      ]
    };

    render(<Form config={duplicateConfig} onSubmit={mockOnSubmit} />);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Warning: Duplicate field names found')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('duplicate_field')
    );

    consoleSpy.mockRestore();
  });

  it('handles duplicate field names by using latest value', () => {
    const duplicateConfig: FormConfig = {
      questions: [
        {
          title: "Test Question 1",
          fields: [
            { name: "duplicate_field", label: "First Duplicate", type: "text" }
          ]
        },
        {
          title: "Test Question 2",
          fields: [
            { name: "duplicate_field", label: "Second Duplicate", type: "text" }
          ]
        }
      ]
    };

    render(<Form config={duplicateConfig} onSubmit={mockOnSubmit} />);

    // Change first field
    fireEvent.change(screen.getByLabelText('First Duplicate'), {
      target: { value: 'first value' }
    });

    // Change second field
    fireEvent.change(screen.getByLabelText('Second Duplicate'), {
      target: { value: 'second value' }
    });

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    // Check that the latest value is used
    expect(mockOnSubmit).toHaveBeenCalledWith({
      duplicate_field: 'second value'
    });
  });
}); 