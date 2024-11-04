import { Link, useLocation } from 'react-router-dom';
import { FaListUl, FaCalendarAlt, FaTags } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            TaskMaster
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaListUl className="mr-2" />
              Tasks
            </Link>
            <Link
              to="/calendar"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/calendar') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaCalendarAlt className="mr-2" />
              Calendar
            </Link>
            <Link
              to="/categories"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/categories') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaTags className="mr-2" />
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;