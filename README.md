# Project Bolt - Modern Task Management Application

A beautiful and functional task management application built with React, TypeScript, and Tailwind CSS.

![Login Page](https://via.placeholder.com/800x400?text=Project+Bolt+Login+Page)

## Internship Assignment

### General Instructions:
- You may use web search or ChatGPT, but don't copy the code from ChatGPT
- Please add comments to the code, document it well
- Date of Submission: April 22, 2025

### Frontend Development
**Project Task**: Create a Todo List interface using React.

**What You'll Do**:
- Set up a React project using Create React App
- Design components for displaying and managing tasks
- Implement the user interface for adding, viewing, and marking tasks as complete

**Deliverables**:
- A functioning React frontend for a Todo List application
- GitHub repository with your code and setup instructions

## Features

- **Modern Authentication System**: Secure login and registration with email/password
- **Task Management**: Create, edit, and delete tasks with ease
- **Priority Levels**: Set priority levels for tasks (low, medium, high)
- **Categories**: Organize tasks by categories (personal, work, shopping, etc.)
- **Due Dates**: Set and track due dates for tasks
- **Recurring Tasks**: Configure tasks to repeat daily, weekly, or monthly
- **Subtasks**: Break down tasks into smaller, manageable subtasks
- **Tags**: Add custom tags to tasks for better organization
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom gradients and animations
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-bolt.git
   cd project-bolt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
project-bolt/
├── src/
│   ├── components/
│   │   ├── Auth.tsx         # Authentication component
│   │   ├── Main.tsx         # Main application layout
│   │   ├── TaskForm.tsx     # Task creation/editing form
│   │   └── ...
│   ├── context/
│   │   └── TodoContext.tsx  # Task state management
│   ├── App.tsx              # Application entry point
│   └── main.tsx             # React rendering
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.ts           # Vite configuration
```

## Usage

### Authentication

1. Register a new account or log in with existing credentials
2. The application will redirect you to the main dashboard after successful authentication

### Managing Tasks

1. Click the "Add Task" button to create a new task
2. Fill in the task details (title, description, due date, priority, category)
3. Save the task to add it to your list
4. Use the task list to view, edit, or delete tasks
5. Mark tasks as complete by clicking the checkbox

## Customization

### Changing Theme

The application supports both light and dark themes. You can toggle between them using the theme switcher in the application.

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration in `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) 
