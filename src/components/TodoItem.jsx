import { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, updateTodo, categories } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const handleUpdate = (e) => {
    e?.preventDefault();
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle && trimmedTitle !== todo.title) {
      updateTodo(todo.id, { ...todo, title: trimmedTitle });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate(e);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(todo.title);
    }
  };

  const category = categories.find(c => c.id === todo.categoryId);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 transition-all duration-200 ${
      todo.completed ? 'opacity-75 bg-gray-50' : ''
    }`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          />
          
          {isEditing ? (
            <form onSubmit={handleUpdate} className="flex-1">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleUpdate}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 border-b-2 border-primary outline-none bg-gray-50 rounded"
                autoFocus
                maxLength={100}
                aria-label="Edit task title"
              />
            </form>
          ) : (
            <div className="flex-1 min-w-0">
              <p className={`truncate ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.title}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {category && (
                  <span className={`text-xs px-2 py-1 rounded ${category.color} bg-opacity-50`}>
                    {category.name}
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded ${priorityColors[todo.priority]}`}>
                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                </span>
                {todo.dueDate && (
                  <span className="text-xs text-gray-500 flex items-center">
                    <FaClock className="mr-1 flex-shrink-0" />
                    {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
            title={isEditing ? "Cancel editing" : "Edit task"}
            aria-label={isEditing ? "Cancel editing" : "Edit task"}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                deleteTodo(todo.id);
              }
            }}
            className="p-1.5 text-gray-500 hover:text-danger hover:bg-red-50 rounded-full transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;