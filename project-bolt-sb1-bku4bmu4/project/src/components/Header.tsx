import React from 'react';
import { ListFilter, Calendar, Search as SearchIcon, X } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { state, dispatch } = useTodo();
  const isDark = state.theme === 'dark';

  return (
    <header className={`sticky top-0 z-10 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-sm transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            TodoMaster
          </h1>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'list' })}
              className={`p-2 rounded-full ${
                state.view === 'list'
                  ? isDark
                    ? 'bg-slate-700 text-blue-400'
                    : 'bg-slate-200 text-blue-600'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              } transition-all duration-200`}
              aria-label="List View"
            >
              <ListFilter className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'calendar' })}
              className={`p-2 rounded-full ${
                state.view === 'calendar'
                  ? isDark
                    ? 'bg-slate-700 text-blue-400'
                    : 'bg-slate-200 text-blue-600'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              } transition-all duration-200`}
              aria-label="Calendar View"
            >
              <Calendar className="w-5 h-5" />
            </button>
            
            <ThemeToggle />
          </div>
        </div>
        
        <div className="mt-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={state.search}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className={`w-full p-2 pl-10 pr-10 rounded-lg border ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            />
            <SearchIcon className={`absolute left-3 top-2.5 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
            {state.search && (
              <button
                onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
                className={`absolute right-3 top-2.5 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;