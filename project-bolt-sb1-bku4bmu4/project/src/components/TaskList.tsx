import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import TaskItem from './TaskItem';
import { Plus, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import TaskForm from './TaskForm';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const TaskList: React.FC = () => {
  const { filteredTasks, dispatch, state } = useTodo();
  const [showForm, setShowForm] = useState(false);
  const isDark = state.theme === 'dark';

  // Calculate metrics
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityTasks = filteredTasks.filter(task => task.priority === 'high' && !task.completed).length;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    const updatedTasks = reorderedTasks.map((task, index) => ({
      ...task,
      position: index,
    }));

    dispatch({ type: 'REORDER_TASKS', payload: updatedTasks });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Total Tasks</p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{totalTasks}</p>
            </div>
            <Clock className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
        </div>

        <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Completed</p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-green-400' : 'text-green-500'}`}>{completedTasks}</p>
            </div>
            <CheckCircle2 className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
          </div>
        </div>

        <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pending</p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-red-400' : 'text-red-500'}`}>{pendingTasks}</p>
            </div>
            <Clock className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
          </div>
        </div>

        <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>High Priority</p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-amber-400' : 'text-amber-500'}`}>{highPriorityTasks}</p>
            </div>
            <AlertTriangle className={`w-8 h-8 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`mb-8 p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center justify-between mb-2">
          <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Overall Progress</p>
          <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{completionRate}%</p>
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
          <div 
            className={`h-2 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-500'}`}
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Tasks {filteredTasks.length > 0 && `(${filteredTasks.length})`}
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Task
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className={`text-center py-16 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <p className="text-lg">No tasks found.</p>
          <p className="mt-2">Create a new task or adjust your filters.</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default TaskList;