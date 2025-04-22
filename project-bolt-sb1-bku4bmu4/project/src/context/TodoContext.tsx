import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Task, SubTask, Priority, Category, FilterType, RecurringType, ViewType } from '../types';
import { generateId } from '../utils/helpers';

type TodoAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt' | 'position'> }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'ADD_SUBTASK'; payload: { taskId: string; title: string } }
  | { type: 'TOGGLE_SUBTASK'; payload: { taskId: string; subtaskId: string } }
  | { type: 'DELETE_SUBTASK'; payload: { taskId: string; subtaskId: string } }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_PRIORITY_FILTER'; payload: Priority | 'all' }
  | { type: 'SET_CATEGORY_FILTER'; payload: Category | 'all' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'REORDER_TASKS'; payload: Task[] };

const initialState: AppState = {
  tasks: [],
  filter: 'all',
  search: '',
  priorityFilter: 'all',
  categoryFilter: 'all',
  theme: 'light',
  view: 'list',
};

const localStorageKey = 'todomaster-state';

const todoReducer = (state: AppState, action: TodoAction): AppState => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date(),
        position: state.tasks.length,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case 'ADD_SUBTASK': {
      const newSubtask: SubTask = {
        id: generateId(),
        title: action.payload.title,
        completed: false,
      };
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, subtasks: [...task.subtasks, newSubtask] }
            : task
        ),
      };
    }

    case 'TOGGLE_SUBTASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === action.payload.subtaskId
                    ? { ...subtask, completed: !subtask.completed }
                    : subtask
                ),
              }
            : task
        ),
      };

    case 'DELETE_SUBTASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask) => subtask.id !== action.payload.subtaskId
                ),
              }
            : task
        ),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
      };

    case 'SET_PRIORITY_FILTER':
      return {
        ...state,
        priorityFilter: action.payload,
      };

    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        categoryFilter: action.payload,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    case 'SET_VIEW':
      return {
        ...state,
        view: action.payload,
      };

    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
};

interface TodoContextType {
  state: AppState;
  dispatch: React.Dispatch<TodoAction>;
  filteredTasks: Task[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage
  const savedState = localStorage.getItem(localStorageKey);
  const parsedState = savedState ? JSON.parse(savedState) : initialState;
  
  // Convert date strings back to Date objects
  if (parsedState.tasks) {
    parsedState.tasks = parsedState.tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  }

  const [state, dispatch] = useReducer(todoReducer, parsedState);

  // Filter tasks based on current filters
  const filteredTasks = state.tasks
    .filter((task) => {
      // Status filter
      if (state.filter === 'active' && task.completed) return false;
      if (state.filter === 'completed' && !task.completed) return false;

      // Priority filter
      if (state.priorityFilter !== 'all' && task.priority !== state.priorityFilter)
        return false;

      // Category filter
      if (state.categoryFilter !== 'all' && task.category !== state.categoryFilter)
        return false;

      // Search
      if (state.search && !task.title.toLowerCase().includes(state.search.toLowerCase()))
        return false;

      return true;
    })
    .sort((a, b) => a.position - b.position);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch, filteredTasks }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};