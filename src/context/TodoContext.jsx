import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [categories] = useState([
    { id: 1, name: 'Work', color: 'bg-blue-500' },
    { id: 2, name: 'Personal', color: 'bg-green-500' },
    { id: 3, name: 'Shopping', color: 'bg-yellow-500' },
    { id: 4, name: 'Health', color: 'bg-red-500' },
  ]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ));
  };

  return (
    <TodoContext.Provider value={{
      todos,
      categories,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}