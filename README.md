# Dynamic Form Generator

A **React TypeScript** application that renders a dynamic form based on a JSON configuration. This project showcases:
- Dynamic form generation from a JSON schema
- React with TypeScript integration
- Snapshot testing with **Jest**
- Styling with **Tailwind CSS**
- Adherence to **SOLID principles**

---

## 🌟 Features

- **Dynamic Form Rendering**: Generate forms from a JSON configuration
- **Form Validation**: Basic input validation with error/success states
- **Custom Components**: Support for text inputs and dropdown fields
- **Responsive Design**: Styled with **Tailwind CSS**
- **Snapshot Testing**: Ensures UI consistency using Jest snapshots
- **Code Coverage**: Comprehensive test coverage thresholds (80% minimum)
- **Scalable Architecture**: Designed with **SOLID principles**

---

## 📋 Requirements

- **Node.js**: `20.x`
- **npm**: `10.x`

> **Tip**: Use [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage your Node.js versions. A `.nvmrc` file is included in the project for convenience.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/stevegnewman/form-generator.git
cd form-generator
```

### 2. Switch Node.js Version
Ensure you have **nvm** installed and run:
```bash
nvm use
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
Start the development server on **port 3000**:
```bash
npm start
```

### 5. Build the Application
For production-ready builds:
```bash
npm run build
```

### 6. Run Tests
Execute all test suites:
```bash
npm test
```

Update all snapshots after UI changes:
```bash
npm test -- -u
```

Update a specific snapshot:
```bash
npm test -- -u -t "ComponentName"
```

---

## Using the app
When the app is running goto [http://localhost:3000](http://localhost:3000) to view the form. Open the developer console in dev tools to view the output from form submissions where the form values are logged as key value pairs.

---

## 📝 Form Configuration Guide

### Form Structure
The form is generated from a JSON configuration that follows this structure:
```typescript
{
  "questions": [
    {
      "title": "Section Title",
      "fields": [
        { 
          "name": "field_name",
          "label": "Field Label",
          "type": "text" | "dropdown",
          "options": ["Option 1", "Option 2"] // Only for dropdown type
        }
      ]
    }
  ]
}
```

### Adding New Fields
When adding new fields the user will need to follow best practices and use unique field names. This will avoid unexpected behaviour, validation has been added to warn the user if duplicates are used.

1. **Text Input Field**:
```json
{
  "name": "email",
  "label": "Email Address",
  "type": "text"
}
```

2. **Dropdown Field**:
```json
{
  "name": "country",
  "label": "Country",
  "type": "dropdown",
  "options": ["Canada", "USA", "UK"]
}
```

### Adding New Sections
Add a new object to the `questions` array:
```json
{
  "questions": [
    {
      "title": "New Section",
      "fields": [
        // ... your fields here
      ]
    }
  ]
}
```

### Example Configuration
```json
{
  "questions": [
    {
      "title": "Personal Information",
      "fields": [
        { "name": "first_name", "label": "First Name", "type": "text" },
        { "name": "last_name", "label": "Last Name", "type": "text" },
        { "name": "email", "label": "Email", "type": "text" }
      ]
    },
    {
      "title": "Location",
      "fields": [
        { "name": "address", "label": "Address", "type": "text" },
        { 
          "name": "country", 
          "label": "Country", 
          "type": "dropdown",
          "options": ["Canada", "USA"] 
        }
      ]
    }
  ]
}
```

### Field Naming Conventions
- Use snake_case for field names
- Names should be descriptive and unique
- Avoid special characters except underscore
- Examples: `first_name`, `phone_number`, `street_address`

### Form Validation (not set out as a requirement but added for basic demo purposes)
- At least one field must be completed
- Empty or whitespace-only values are considered invalid
- Validation messages appear for 3 seconds
- Success messages appear for 5 seconds

### Form Submission
The form data is logged to the console in the following format:

Key-value pairs:
```
first_name: "John"
last_name: "Doe"
email: "john@example.com"
```

### Extending the Form
To add new field types:
1. Update the `FormFieldType` in `src/types/form.ts`
2. Add the new type to the field type union:
```typescript
type FieldType = 'text' | 'dropdown' | 'your_new_type';
```
3. Add rendering logic in `FormField.tsx`
4. Add appropriate styling in Tailwind
5. Update tests to cover new functionality

### Styling Guide
The form uses Tailwind CSS with custom theme colors:
- Primary: `#6fa62e` (Buttons, focus states)
- Secondary: `#0e1429` (Background)
- Body Text: `#1A1C28` (Text content)

Custom styles can be added in:
1. `tailwind.config.js` for theme customization
2. Component-level using Tailwind classes
3. `styles.css` for global styles

---

## 🧩 Design Principles

This application demonstrates several key **SOLID** principles:

1. **Single Responsibility Principle (SRP)**  
   Each component has a clear and single responsibility:
   - **`FormField`**: Renders individual form fields.
   - **`FormService`**: fetches and manages form field structural data.
   - **`Form`**: Manages form state and submission.
   - **`Button`**: Provides base button styling.
   - **`FormSubmit`**: Extends `Button` for form-specific behaviour.

2. **Open/Closed Principle (OCP)**  
   The application is open for extension but closed for modification:
   - New fields can be added via JSON configuration without altering existing code.
   - Additional field types can be implemented by extending the field type union.
   - Styling can be customised through Tailwind CSS utility classes.

3. **Liskov Substitution Principle (LSP)**  
   Components can be substituted with their subtypes without breaking the application:
   - The `Button` component serves as a base for `FormSubmit`, adhering to consistent behaviour.
   - Text inputs and dropdowns implement the shared `FormField` interface, ensuring they work interchangeably.
   - Consistent behaviour is enforced across all fields through the `FormFieldProps` interface:
     ```typescript
     interface FormFieldProps {
       field: FormFieldType;
       value: string;
       onChange: (name: string, value: string) => void;
     }
     ```

4. **Interface Segregation Principle (ISP)**  
   Components depend on specific and minimal interfaces:
   - Each component only receives the props necessary for its functionality.
   - Props and type definitions are modular and purpose-specific:
     ```typescript
     interface FormFieldProps {
       field: FormFieldType;
       value: string;
       onChange: (name: string, value: string) => void;
     }
     ```

5. **Dependency Inversion Principle (DIP)**  
   Components depend on abstractions rather than concrete implementations:
   - Form configuration is dynamically injected via JSON, decoupling components from specific implementations.
   - Components communicate through shared interfaces, ensuring loose coupling.

---

## 📊 Test Coverage

The project maintains the following minimum coverage thresholds:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

Run tests to generate a detailed coverage report in the `coverage/` directory:
```bash
npm run test
```

---

## 📚 Documentation

- **Configuration**: Define your form schema in `src/config/formConfig.json`.
- **Components**: Explore reusable components in the `src/components` directory.
- **Styles**: Modify Tailwind CSS configurations in `tailwind.config.js`.

---

## 🛠️ Tools & Technologies

- **React**: Frontend framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Jest**: Testing framework
- **ESLint & Prettier**: Enforces consistent coding standards
- **SOLID**: Design principles for scalability

---

## 💡 Author

Developed by Steve Newman.  
Feel free to connect on [LinkedIn](https://www.linkedin.com/in/steve-newman-61561a37).

---
