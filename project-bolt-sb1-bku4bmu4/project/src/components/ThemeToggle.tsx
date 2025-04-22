import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const ThemeToggle: React.FC = () => {
  const { state, dispatch } = useTodo();
  const isDark = state.theme === 'dark';

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      className="p-2 rounded-full transition-colors duration-200 ease-in-out"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
};

export default ThemeToggle;