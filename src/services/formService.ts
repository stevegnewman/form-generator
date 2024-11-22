import { FormConfig } from '../types/form';

/**
 * Mock service that simulates fetching form configuration from an API.
 * In a real application, this would make an HTTP request to a backend service.
 * @returns Promise<FormConfig> A promise that resolves to the form configuration
 */
export const getFormConfig = async (): Promise<FormConfig> => {
  // Simulating API call with a small delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        questions: [
          {
            title: 'Tell us about yourself',
            // Field names must be unique
            fields: [
              { name: 'first_name', label: 'First Name', type: 'text' },
              { name: 'last_name', label: 'Last Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'text' },
              { name: 'phone_number', label: 'Phone Number', type: 'text' },
            ],
          },
          {
            title: 'Where do you live?',
            // Field names must be unique
            fields: [
              { name: 'street_address', label: 'Street Address', type: 'text' },
              { name: 'post_code', label: 'Post Code', type: 'text' },
              { name: 'country', label: 'Country', type: 'dropdown', options: ['Canada', 'USA'] },
            ],
          },
        ],
      });
    }, 100);
  });
};
