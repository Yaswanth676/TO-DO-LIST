import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Clock, Edit, Trash2, Plus } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Task, SubTask } from '../types';
import { formatDate, getPriorityColor, getCategoryColor, calculateProgress } from '../utils/helpers';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { dispatch, state } = useTodo();
  const [expanded, setExpanded] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const isDark = state.theme === 'dark';
  
  const progress = calculateProgress(task.subtasks);
  const hasSubtasks = task.subtasks.length > 0;

  const handleToggleTask = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      dispatch({
        type: 'ADD_SUBTASK',
        payload: { taskId: task.id, title: newSubtask.trim() },
      });
      setNewSubtask('');
    }
  };

  const handleToggleSubtask = (subtaskId: string) => {
    dispatch({
      type: 'TOGGLE_SUBTASK',
      payload: { taskId: task.id, subtaskId },
    });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    dispatch({
      type: 'DELETE_SUBTASK',
      payload: { taskId: task.id, subtaskId },
    });
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  const getStatusColor = (completed: boolean, isDark: boolean): string => {
    if (completed) {
      return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-50 text-green-600';
    }
    return isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600';
  };

  return (
    <div 
      className={`mb-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
        isDark 
          ? task.completed ? 'bg-slate-800/60 border border-green-500/20' : 'bg-slate-800 border border-red-500/20' 
          : task.completed ? 'bg-white/90 border border-green-100' : 'bg-white border border-red-100'
      } ${
        task.completed ? 'opacity-75' : 'opacity-100'
      }`}
      draggable="true"
    >
      <div className="p-4">
        <div className="flex items-start">
          <button
            onClick={handleToggleTask}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
              task.completed
                ? isDark 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'bg-green-500 border-green-500 text-white'
                : isDark 
                  ? 'border-red-400 hover:border-green-400' 
                  : 'border-red-300 hover:border-green-500'
            }`}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between">
              <h3 
                className={`text-base font-medium break-words ${
                  task.completed 
                    ? isDark ? 'line-through text-green-400' : 'line-through text-green-600' 
                    : isDark ? 'text-white' : 'text-slate-800'
                }`}
              >
                {task.title}
              </h3>
              
              <div className="flex items-center ml-2 space-x-1">
                <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(task.completed, isDark)}`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className={`p-1 rounded-full ${
                    isDark 
                      ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                      : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                  }`}
                  aria-label={expanded ? 'Collapse task' : 'Expand task'}
                >
                  {expanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={handleDeleteTask}
                  className={`p-1 rounded-full ${
                    isDark 
                      ? 'hover:bg-red-900/30 text-slate-400 hover:text-red-400' 
                      : 'hover:bg-red-50 text-slate-500 hover:text-red-500'
                  }`}
                  aria-label="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {task.dueDate && (
                <span 
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                    isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(task.dueDate)}
                </span>
              )}
              
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getPriorityColor(task.priority, isDark)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getCategoryColor(task.category, isDark)}`}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </span>
              
              {task.recurring !== 'none' && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                  isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-50 text-purple-600'
                }`}>
                  {task.recurring.charAt(0).toUpperCase() + task.recurring.slice(1)}
                </span>
              )}
            </div>
            
            {hasSubtasks && (
              <div className="mt-2">
                <div className="flex items-center">
                  <div className="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                    <div 
                      className={`h-full rounded-full ${task.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className={`ml-2 text-xs font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {progress}%
                  </span>
                </div>
              </div>
            )}
            
            {task.description && expanded && (
              <p className={`mt-2 text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pl-9">
            {hasSubtasks && (
              <div className="mb-3">
                <h4 className={`text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Subtasks
                </h4>
                <ul className="space-y-2">
                  {task.subtasks.map((subtask: SubTask) => (
                    <li key={subtask.id} className="flex items-start group">
                      <button
                        onClick={() => handleToggleSubtask(subtask.id)}
                        className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 mt-0.5 ${
                          subtask.completed
                            ? isDark 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'bg-green-500 border-green-500 text-white'
                            : isDark 
                              ? 'border-red-400 hover:border-green-400' 
                              : 'border-red-300 hover:border-green-500'
                        }`}
                        aria-label={subtask.completed ? 'Mark subtask as incomplete' : 'Mark subtask as complete'}
                      >
                        {subtask.completed && <Check className="w-2 h-2" />}
                      </button>
                      <span className={`text-sm flex-grow ${
                        subtask.completed
                          ? isDark ? 'line-through text-green-400' : 'line-through text-green-600'
                          : isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {subtask.title}
                      </span>
                      <button
                        onClick={() => handleDeleteSubtask(subtask.id)}
                        className={`ml-2 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                          isDark
                            ? 'hover:bg-red-900/30 text-slate-500 hover:text-red-400'
                            : 'hover:bg-red-50 text-slate-400 hover:text-red-500'
                        }`}
                        aria-label="Delete subtask"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <form onSubmit={handleAddSubtask} className="flex items-center">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add a subtask..."
                className={`flex-grow text-sm rounded py-1 px-2 ${
                  isDark
                    ? 'bg-slate-700 text-white border-slate-600 placeholder-slate-400'
                    : 'bg-slate-50 text-slate-900 border-slate-200 placeholder-slate-400'
                } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <button
                type="submit"
                disabled={!newSubtask.trim()}
                className={`ml-2 p-1 rounded-full ${
                  newSubtask.trim()
                    ? isDark
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                    : isDark
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                aria-label="Add subtask"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;