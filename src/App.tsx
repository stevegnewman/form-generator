import React, { useEffect, useState } from 'react';
import { FormConfig, FormData } from './types/form';
import { getFormConfig } from './services/formService';
import { Form } from './components/Form';
import { Footer } from './components/Footer';

export default function App() {
  // Store the form configuration once loaded
  const [config, setConfig] = useState<FormConfig | null>(null);

  // Load form configuration on component mount
  useEffect(() => {
    const loadConfig = async () => {
      const config = await getFormConfig();
      setConfig(config);
    };
    loadConfig();
  }, []);

  // Handle form submission from child component
  const handleSubmit = (formData: FormData) => {
    // Log individual key-value pairs
    console.log(
      '%c\nForm Data (formData state variable output as key-value pairs):',
      'color: green;'
    );
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`${key}: "${value}"`);
    });
  };

  if (!config) return <div>Loading...</div>;

  return (
    // Main layout container with responsive design
    <div className="min-h-screen bg-secondary flex flex-col">
      <main className="flex-grow py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 w-full max-w-[600px] mx-auto">
          {/* Render Form component */}
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-xl sm:p-10">
            <div className="max-w-md mx-auto">
              <Form config={config} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
