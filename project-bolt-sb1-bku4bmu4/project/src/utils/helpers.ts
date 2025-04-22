// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Format date to display
export const formatDate = (date: Date | null): string => {
  if (!date) return 'No date';
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Check if date is today
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  
  // Check if date is tomorrow
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  
  // Otherwise return formatted date
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
};

// Get priority color
export const getPriorityColor = (priority: string, isDark: boolean): string => {
  switch (priority) {
    case 'high':
      return isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600';
    case 'medium':
      return isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-50 text-amber-600';
    case 'low':
      return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-50 text-green-600';
    default:
      return isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-50 text-gray-600';
  }
};

// Get category color
export const getCategoryColor = (category: string, isDark: boolean): string => {
  switch (category) {
    case 'personal':
      return isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600';
    case 'work':
      return isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-50 text-purple-600';
    case 'shopping':
      return isDark ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-50 text-pink-600';
    case 'business':
      return isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600';
    case 'school':
      return isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-50 text-cyan-600';
    default:
      return isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-50 text-gray-600';
  }
};

// Calculate progress percentage for task with subtasks
export const calculateProgress = (subtasks: { completed: boolean }[]): number => {
  if (subtasks.length === 0) return 0;
  const completedCount = subtasks.filter(subtask => subtask.completed).length;
  return Math.round((completedCount / subtasks.length) * 100);
};