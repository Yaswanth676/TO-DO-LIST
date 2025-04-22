import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const CalendarView: React.FC = () => {
  const { filteredTasks, state } = useTodo();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const isDark = state.theme === 'dark';

  // Get the days in the month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  // Get today's date for highlighting
  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Get tasks for a specific day
  const getTasksForDay = (day: number) => {
    return filteredTasks.filter((task) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return (
        dueDate.getDate() === day &&
        dueDate.getMonth() === month &&
        dueDate.getFullYear() === year
      );
    });
  };

  // Format current month and year
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const formattedDate = `${monthNames[month]} ${year}`;

  // Get selected day tasks
  const selectedDayTasks = selectedDate 
    ? getTasksForDay(selectedDate.getDate())
    : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={prevMonth}
            className={`p-1 rounded-full ${
              isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className={`text-xl font-semibold mx-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {formattedDate}
          </h2>
          <button
            onClick={nextMonth}
            className={`p-1 rounded-full ${
              isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Task
        </button>
      </div>

      {/* Calendar grid */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className={`p-2 text-center text-sm font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className={`p-2 h-24 rounded-lg ${
                isDark ? 'bg-slate-800/50' : 'bg-slate-100/80'
              }`}
            ></div>
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayTasks = getTasksForDay(day);
            const hasHighPriorityTask = dayTasks.some(task => task.priority === 'high');
            const isSelected = selectedDate?.getDate() === day;

            return (
              <div
                key={`day-${day}`}
                onClick={() => setSelectedDate(new Date(year, month, day))}
                className={`p-2 h-24 rounded-lg transition-colors duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? isDark
                      ? 'bg-blue-900/30 ring-1 ring-blue-400'
                      : 'bg-blue-50 ring-1 ring-blue-400'
                    : isToday(day)
                    ? isDark
                      ? 'bg-slate-700 border border-blue-400'
                      : 'bg-white border border-blue-400'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700'
                    : 'bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`inline-block w-6 h-6 rounded-full text-center leading-6 text-sm ${
                      isToday(day)
                        ? 'bg-blue-500 text-white'
                        : isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}
                  >
                    {day}
                  </span>
                  {hasHighPriorityTask && (
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </div>
                <div className="mt-1 space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className={`truncate text-xs px-1 py-0.5 rounded ${
                        task.priority === 'high'
                          ? isDark
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-red-50 text-red-600'
                          : task.priority === 'medium'
                          ? isDark
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-amber-50 text-amber-600'
                          : isDark
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-green-50 text-green-600'
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected day tasks */}
      {selectedDate && (
        <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Tasks for {selectedDate.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: selectedDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            })}
          </h3>
          {selectedDayTasks.length === 0 ? (
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              No tasks scheduled for this day.
            </p>
          ) : (
            <div className="space-y-3">
              {selectedDayTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      )}

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default CalendarView;