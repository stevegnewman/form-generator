import { getFormConfig } from '../formService';

describe('formService', () => {
  it('returns the expected form configuration', async () => {
    const config = await getFormConfig();
    
    expect(config).toHaveProperty('questions');
    expect(Array.isArray(config.questions)).toBe(true);
    
    const firstQuestion = config.questions[0];
    expect(firstQuestion).toHaveProperty('title');
    expect(firstQuestion).toHaveProperty('fields');
    
    const firstField = firstQuestion.fields[0];
    expect(firstField).toHaveProperty('name');
    expect(firstField).toHaveProperty('label');
    expect(firstField).toHaveProperty('type');
  });

  it('returns a Promise that resolves', () => {
    expect(getFormConfig()).toBeInstanceOf(Promise);
    return expect(getFormConfig()).resolves.toBeDefined();
  });

  it('returns the correct structure for form fields', async () => {
    const config = await getFormConfig();
    const personalInfo = config.questions[0];
    const addressInfo = config.questions[1];

    // Test first section
    expect(personalInfo.title).toBe('Tell us about yourself');
    expect(personalInfo.fields).toHaveLength(4);
    expect(personalInfo.fields[0]).toEqual({
      name: 'first_name',
      label: 'First Name',
      type: 'text'
    });

    // Test second section
    expect(addressInfo.title).toBe('Where do you live?');
    expect(addressInfo.fields).toHaveLength(3);
    expect(addressInfo.fields[2]).toEqual({
      name: 'country',
      label: 'Country',
      type: 'dropdown',
      options: ['Canada', 'USA']
    });
  });
}); 