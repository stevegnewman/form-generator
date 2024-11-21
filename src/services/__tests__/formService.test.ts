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
}); 