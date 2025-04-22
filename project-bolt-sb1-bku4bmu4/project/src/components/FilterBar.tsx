import React from 'react';
import { useTodo } from '../context/TodoContext';
import { Category, Priority } from '../types';

const FilterBar: React.FC = () => {
  const { state, dispatch } = useTodo();
  const isDark = state.theme === 'dark';

  const statusFilters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityFilters = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const categoryFilters = [
    { value: 'all', label: 'All Categories' },
    { value: 'personal', label: 'Personal' },
    { value: 'work', label: 'Work' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'business', label: 'Business' },
    { value: 'school', label: 'School' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className={`py-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'} transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div>
            <div className="flex space-x-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => dispatch({ type: 'SET_FILTER', payload: filter.value as any })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    state.filter === filter.value
                      ? isDark
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500 text-white'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={state.priorityFilter}
              onChange={(e) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: e.target.value as Priority | 'all' })}
              className={`px-3 py-1 rounded-lg text-sm ${
                isDark
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-white text-slate-800 border-slate-200'
              } border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200`}
            >
              {priorityFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>

            <select
              value={state.categoryFilter}
              onChange={(e) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: e.target.value as Category | 'all' })}
              className={`px-3 py-1 rounded-lg text-sm ${
                isDark
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-white text-slate-800 border-slate-200'
              } border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200`}
            >
              {categoryFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;