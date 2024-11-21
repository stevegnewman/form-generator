import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially and then the form', async () => {
    // Setup mock to delay response
    let resolvePromise: (value: typeof mockConfig) => void;
    const promise = new Promise<typeof mockConfig>((resolve) => {
      resolvePromise = resolve;
    });

    mockGetFormConfig.mockReturnValue(promise);

    render(<App />);

    // Check loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Resolve the promise to load the form
    resolvePromise!(mockConfig);

    // Wait for and verify form rendering
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

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Form Data:');
    expect(consoleSpy).toHaveBeenCalledWith({
      test_field: 'test value',
      test_dropdown: 'Option 1'
    });

    consoleSpy.mockRestore();
  });
}); 