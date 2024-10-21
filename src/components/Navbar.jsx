import { useState } from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';


function Navbar({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-white text-2xl font-bold">
            TeamTalk
            </Link>
            <div className="hidden md:flex items-center space-x-4 ml-10">
              <Link
                to="/dashboard"
                className="text-white hover:bg-indigo-500 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-indigo-500 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                About
              </Link>
              <Link
                to="/create-team"
                className="text-white hover:bg-indigo-500 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Create Team
              </Link>
              
            </div>
          </div>

          {/* Logout Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-purple-500 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-purple-600 transition duration-300"
            >
              Logout
            </button>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate__animated animate__slideInDown">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className="block text-white hover:bg-indigo-500 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-white hover:bg-indigo-500 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              About
            </Link>
            <Link
              to="/create-team"
              className="block text-white hover:bg-indigo-500 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
            >
              Create Team
            </Link>
            {/* Logout Button for Mobile */}
            <button
              onClick={handleLogout}
              className="block bg-red-500 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
