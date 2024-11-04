import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { FaFilter } from 'react-icons/fa';

function TodoList() {
  const { todos } = useTodo();
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    const statusMatch = filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const priorityMatch = priorityFilter === 'all' || todo.priority === priorityFilter;
    
    return statusMatch && priorityMatch;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Tasks</h1>
        <AddTodoForm />
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <select
          className="bg-white border border-gray-300 rounded-md px-3 py-1"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-500 py-8">No tasks found</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;