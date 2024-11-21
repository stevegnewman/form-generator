import React, { useEffect, useState } from 'react';
import { FormConfig, FormData } from './types/form';
import { getFormConfig } from './services/formService';
import { FormField } from './components/FormField';
import { Button } from './components/Button';

export default function App() {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getFormConfig();
      setConfig(config);
    };
    loadConfig();
  }, []);

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:');
    console.log(formData);
  };

  if (!config) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-full md:w-1/4 mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-xl sm:p-10">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              {config.questions.map((question, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-bodyText">{question.title}</h2>
                  {question.fields.map((field) => (
                    <FormField
                      key={field.name}
                      field={field}
                      value={formData[field.name] || ''}
                      onChange={handleFieldChange}
                    />
                  ))}
                </div>
              ))}
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
