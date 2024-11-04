import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import Calendar from './components/Calendar';
import Categories from './components/Categories';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;