export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'dropdown';
  options?: string[];
}

export interface FormQuestion {
  title: string;
  fields: FormField[];
}

export interface FormConfig {
  questions: FormQuestion[];
}

export interface FormData {
  [key: string]: string;
}
