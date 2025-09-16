// Project Export Helper
// Run this in the browser console to download project files

const projectFiles = {
  'package.json': `{
  "name": "no-code-auth-builder",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.57.4",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}`,
  
  'README.md': `# No-Code Authentication Flow Builder

A visual drag-and-drop authentication flow builder that allows users to design custom authentication journeys without writing code.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Visual flow builder with drag-and-drop components
- Predefined authentication objects (login, social auth, MFA, etc.)
- Reusable fragment system
- Connection-based flow logic
- Component configuration panel
- Export capabilities

Visit the live demo: https://no-code-authenticati-ob7y.bolt.host
`,

  '.gitignore': `# Dependencies
node_modules/
.pnp
.pnp.js

# Production
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Vite
dist-ssr
*.local`
};

function downloadFile(filename, content) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function downloadAllFiles() {
  Object.entries(projectFiles).forEach(([filename, content]) => {
    setTimeout(() => downloadFile(filename, content), 100);
  });
  
  console.log('Started downloading project files...');
  console.log('You will need to manually copy the React component files from the file explorer.');
}

// Run this function to download the basic project structure
downloadAllFiles();