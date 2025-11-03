import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DarkModeContext } from '../context/DarkModeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">🍳</span>
            <span className="text-2xl font-bold text-primary">Recipe Haven</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
              Home
            </Link>
            {user && (
              <>
                <Link to="/my-recipes" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  My Recipes
                </Link>
                <Link to="/favorites" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  Favourites
                </Link>
                <Link to="/add-recipe" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  Add Recipe
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons & Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-2xl hover:scale-110 transition-transform duration-300 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDark ? '🌞' : '🌙'}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-light-text dark:text-dark-text font-medium">
                  Welcome, {user.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
              Home
            </Link>
            {user && (
              <>
                <Link to="/my-recipes" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  My Recipes
                </Link>
                <Link to="/favorites" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  Favourites
                </Link>
                <Link to="/add-recipe" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  Add Recipe
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="text-light-text dark:text-dark-text hover:text-primary transition-colors duration-300 font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

