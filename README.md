# No-Code Authentication Flow Builder

A visual drag-and-drop authentication flow builder that allows users to design custom authentication journeys without writing code.

## Features

- **Visual Flow Builder**: Drag-and-drop interface for designing authentication flows
- **Predefined Components**: Login forms, social auth, MFA, email verification, and more
- **Reusable Fragments**: Save and reuse common authentication patterns
- **Conditional Logic**: Branch flows based on user conditions
- **Export Capabilities**: Generate configuration files for your flows
- **Production Ready**: Professional-grade components and validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd no-code-auth-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── FlowBuilder.tsx     # Main flow builder interface
│   ├── ComponentLibrary.tsx # Draggable component library
│   ├── FlowCanvas.tsx      # Canvas for flow visualization
│   ├── FlowNode.tsx        # Individual flow nodes
│   ├── ConnectionLine.tsx  # Connection lines between nodes
│   ├── PropertiesPanel.tsx # Component configuration panel
│   └── FlowHeader.tsx      # Flow header with actions
├── types/               # TypeScript type definitions
│   └── auth.ts             # Authentication flow types
├── data/                # Static data and templates
│   └── componentTemplates.ts # Predefined component templates
├── utils/               # Utility functions
│   └── helpers.ts          # Helper functions
└── App.tsx              # Main application component
```

## Component Types

### Authentication Components
- **Login Form**: Standard email/password login
- **Registration Form**: User registration with validation
- **Social Authentication**: OAuth login with social providers

### Verification Components
- **Multi-Factor Auth**: Two-factor authentication
- **Email Verification**: Send and verify email confirmation
- **Password Reset**: Forgot password flow

### Logic & Navigation
- **Conditional Branch**: Route based on conditions
- **Custom Script**: Execute custom authentication logic
- **Redirect**: Navigate to URL or route

## Usage

1. **Start Building**: Click "Get Started" to open the flow builder
2. **Add Components**: Drag components from the library to the canvas
3. **Configure**: Select components to configure their properties
4. **Connect**: Create connections between components to define flow logic
5. **Test**: Use the "Test Flow" button to simulate the authentication journey
6. **Export**: Save your flow as a JSON configuration file

## Reusable Fragments

Create reusable authentication patterns:

1. Design a common authentication pattern
2. Click "Save as Fragment" in the header
3. Reuse the fragment in other flows

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.