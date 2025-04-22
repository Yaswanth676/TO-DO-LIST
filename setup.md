# Project Bolt Setup Instructions

This document provides detailed instructions for setting up and running the Project Bolt Todo List application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - [Download yarn from yarnpkg.com](https://yarnpkg.com/)
- **Git** - [Download from git-scm.com](https://git-scm.com/)

## Step-by-Step Setup Instructions

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Yaswanth676/TO-DO-LIST.git

# Navigate to the project directory
cd TO-DO-LIST
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### 3. Configure Environment Variables (if needed)

If the project requires environment variables, create a `.env` file in the root directory:

```bash
# Create a .env file
touch .env

# Add your environment variables
REACT_APP_API_URL=your_api_url
# Add other environment variables as needed
```

### 4. Start the Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application should now be running at [http://localhost:5173](http://localhost:5173).

## Troubleshooting

### Common Issues and Solutions

#### 1. "Missing script: dev" Error

If you encounter the error "Missing script: dev", check your package.json file and ensure it has a "dev" script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

If the script is missing, add it to your package.json file.

#### 2. Port Already in Use

If port 5173 is already in use, you can specify a different port:

```bash
# Using npm
npm run dev -- --port 3000

# OR using yarn
yarn dev --port 3000
```

#### 3. Dependencies Installation Issues

If you encounter issues installing dependencies, try:

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

## Building for Production

To build the application for production:

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

The build files will be generated in the `dist` directory.

## Deployment

### Deploying to GitHub Pages

1. Add the following to your package.json:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Install the gh-pages package:

```bash
npm install --save-dev gh-pages
```

3. Deploy:

```bash
npm run deploy
```

### Deploying to Netlify

1. Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

2. Push your code to GitHub and connect your repository to Netlify.

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/) # Project Bolt Setup Instructions

This document provides detailed instructions for setting up and running the Project Bolt Todo List application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - [Download yarn from yarnpkg.com](https://yarnpkg.com/)
- **Git** - [Download from git-scm.com](https://git-scm.com/)

## Step-by-Step Setup Instructions

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Yaswanth676/TO-DO-LIST.git

# Navigate to the project directory
cd TO-DO-LIST
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### 3. Configure Environment Variables (if needed)

If the project requires environment variables, create a `.env` file in the root directory:

```bash
# Create a .env file
touch .env

# Add your environment variables
REACT_APP_API_URL=your_api_url
# Add other environment variables as needed
```

### 4. Start the Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application should now be running at [http://localhost:5173](http://localhost:5173).

## Troubleshooting

### Common Issues and Solutions

#### 1. "Missing script: dev" Error

If you encounter the error "Missing script: dev", check your package.json file and ensure it has a "dev" script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

If the script is missing, add it to your package.json file.

#### 2. Port Already in Use

If port 5173 is already in use, you can specify a different port:

```bash
# Using npm
npm run dev -- --port 3000

# OR using yarn
yarn dev --port 3000
```

#### 3. Dependencies Installation Issues

If you encounter issues installing dependencies, try:

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

## Building for Production

To build the application for production:

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

The build files will be generated in the `dist` directory.

## Deployment

### Deploying to GitHub Pages

1. Add the following to your package.json:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Install the gh-pages package:

```bash
npm install --save-dev gh-pages
```

3. Deploy:

```bash
npm run deploy
```

### Deploying to Netlify

1. Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

2. Push your code to GitHub and connect your repository to Netlify.

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/) 
