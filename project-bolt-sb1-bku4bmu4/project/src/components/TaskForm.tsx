import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Priority, Category, RecurringType } from '../types';

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { dispatch, state } = useTodo();
  const isDark = state.theme === 'dark';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [recurring, setRecurring] = useState<RecurringType>('none');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: title.trim(),
        description,
        completed: false,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        category,
        subtasks: [],
        recurring,
        tags: [],
      },
    });
    
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isDark ? 'bg-black/50' : 'bg-slate-700/30'}`}>
      <div 
        className={`w-full max-w-md rounded-lg shadow-lg relative ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-full ${
            isDark ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Add New Task
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="title" 
                  className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  required
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-slate-700 text-white border-slate-600 placeholder-slate-400'
                      : 'bg-white text-slate-900 border-slate-300 placeholder-slate-400'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="description" 
                  className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description"
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-slate-700 text-white border-slate-600 placeholder-slate-400'
                      : 'bg-white text-slate-900 border-slate-300 placeholder-slate-400'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="dueDate" 
                  className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-slate-700 text-white border-slate-600'
                      : 'bg-white text-slate-900 border-slate-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="priority" 
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-slate-700 text-white border-slate-600'
                        : 'bg-white text-slate-900 border-slate-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label 
                    htmlFor="category" 
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-slate-700 text-white border-slate-600'
                        : 'bg-white text-slate-900 border-slate-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="shopping">Shopping</option>
                    <option value="business">Business</option>
                    <option value="school">School</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label 
                  htmlFor="recurring" 
                  className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Recurring
                </label>
                <select
                  id="recurring"
                  value={recurring}
                  onChange={(e) => setRecurring(e.target.value as RecurringType)}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-slate-700 text-white border-slate-600'
                      : 'bg-white text-slate-900 border-slate-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-lg mr-2 ${
                    isDark 
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  disabled={!title.trim()}
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;