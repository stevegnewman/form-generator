import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';
import { getFormConfig } from './services/formService';

// Mock the formService
jest.mock('./services/formService');

const mockGetFormConfig = getFormConfig as jest.MockedFunction<typeof getFormConfig>;

describe('App', () => {
  const mockConfig = {
    questions: [
      {
        title: "Test Question",
        fields: [
          { name: "test_field", label: "Test Field", type: "text" as const },
          { name: "test_dropdown", label: "Test Dropdown", type: "dropdown" as const, options: ["Option 1", "Option 2"] }
        ]
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially and then the form', async () => {
    let resolvePromise: (value: typeof mockConfig) => void;
    const promise = new Promise<typeof mockConfig>((resolve) => {
      resolvePromise = resolve;
    });
    
    mockGetFormConfig.mockReturnValue(promise);

    render(<App />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    resolvePromise!(mockConfig);
    
    await waitFor(() => {
      expect(screen.getByText('Test Question')).toBeInTheDocument();
    });
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Dropdown')).toBeInTheDocument();
  });

  it('updates form state when fields change', async () => {
    mockGetFormConfig.mockResolvedValue(mockConfig);
    const consoleSpy = jest.spyOn(console, 'log');
    
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Question')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'test value' }
    });

    fireEvent.change(screen.getByLabelText('Test Dropdown'), {
      target: { value: 'Option 1' }
    });

    fireEvent.submit(screen.getByRole('button'));

    const expectedFormData = {
      test_field: 'test value',
      test_dropdown: 'Option 1'
    };

    // Updated expectations to match new console.log messages
    expect(consoleSpy).toHaveBeenCalledWith('\nForm Data (formData state variable output as key-value pairs):');
    expect(consoleSpy).toHaveBeenCalledWith('test_field: "test value"');
    expect(consoleSpy).toHaveBeenCalledWith('test_dropdown: "Option 1"');

    consoleSpy.mockRestore();
  });

  it('shows success message and clears form on submission', async () => {
    mockGetFormConfig.mockResolvedValue(mockConfig);
    
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Question')).toBeInTheDocument();
    });

    // Fill out all required fields
    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'test value' }
    });

    fireEvent.change(screen.getByLabelText('Test Dropdown'), {
      target: { value: 'Option 1' }
    });

    // Submit the form
    await act(async () => {
      fireEvent.submit(screen.getByRole('button'));
    });

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument();
    });

    // Check form is cleared
    expect(screen.getByLabelText('Test Field')).toHaveValue('');
    expect(screen.getByLabelText('Test Dropdown')).toHaveValue('');
  });

  it('shows error message when submitting empty form', async () => {
    mockGetFormConfig.mockResolvedValue(mockConfig);
    
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Question')).toBeInTheDocument();
    });

    // Submit empty form
    await act(async () => {
      fireEvent.submit(screen.getByRole('button'));
    });

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/please complete form/i)).toBeInTheDocument();
    });
  });
}); 