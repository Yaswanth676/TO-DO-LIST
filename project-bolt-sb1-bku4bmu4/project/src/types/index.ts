export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'business' | 'school' | 'other';
export type TaskStatus = 'active' | 'completed';
export type RecurringType = 'none' | 'daily' | 'weekly' | 'monthly';
export type ViewType = 'list' | 'calendar';
export type FilterType = 'all' | 'active' | 'completed';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date | null;
  priority: Priority;
  category: Category;
  subtasks: SubTask[];
  recurring: RecurringType;
  tags: string[];
  position: number;
}

export interface AppState {
  tasks: Task[];
  filter: FilterType;
  search: string;
  priorityFilter: Priority | 'all';
  categoryFilter: Category | 'all';
  theme: 'light' | 'dark';
  view: ViewType;
}