import { useTodo } from '../context/TodoContext';

function Categories() {
  const { todos, categories } = useTodo();

  const getTodosByCategory = (categoryId) => {
    return todos.filter(todo => todo.categoryId === categoryId);
  };

  const getCompletionRate = (todos) => {
    if (todos.length === 0) return 0;
    const completed = todos.filter(todo => todo.completed).length;
    return Math.round((completed / todos.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(category => {
          const categoryTodos = getTodosByCategory(category.id);
          const completionRate = getCompletionRate(categoryTodos);

          return (
            <div key={category.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h2>
                <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Completion Rate</span>
                  <span>{completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Total Tasks: {categoryTodos.length}
                </p>
                <p className="text-sm text-gray-600">
                  Completed: {categoryTodos.filter(todo => todo.completed).length}
                </p>
                <p className="text-sm text-gray-600">
                  Pending: {categoryTodos.filter(todo => !todo.completed).length}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;