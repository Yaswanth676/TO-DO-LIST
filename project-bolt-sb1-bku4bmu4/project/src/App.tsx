import React, { useEffect, useState } from 'react';
import { TodoProvider, useTodo } from './context/TodoContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import Auth from './components/Auth';

const Main: React.FC = () => {
  const { state } = useTodo();
  const isDark = state.theme === 'dark';

  // Apply theme to body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a'; // slate-900
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#f1f5f9'; // slate-100
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <Header />
      <FilterBar />
      {state.view === 'list' ? <TaskList /> : <CalendarView />}
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <TodoProvider>
      <Main />
    </TodoProvider>
  );
}

export default App;