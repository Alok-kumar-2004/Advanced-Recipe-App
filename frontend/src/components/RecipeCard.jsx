import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toggleFavorite as toggleFavoriteAPI } from '../services/api';

const RecipeCard = ({ recipe, onFavoriteToggle }) => {
  const { user } = useContext(AuthContext);
  const isFavorite = user && recipe.favorites?.includes(user._id);
  const imageUrl = recipe.coverImage ? `http://localhost:5000${recipe.coverImage}` : 'https://via.placeholder.com/400x300?text=No+Image';

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      return;
    }

    try {
      await toggleFavoriteAPI(recipe._id);
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Link to={`/recipe/${recipe._id}`} className="block">
      <div className="card group h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48 bg-gray-200 dark:bg-gray-700">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          {user && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 text-2xl hover:scale-125 transition-transform duration-300 focus:outline-none z-10"
              aria-label="Toggle favorite"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2 line-clamp-2">
            {recipe.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
            by {recipe.createdBy?.name || 'Unknown'}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              {recipe.ingredients?.length || 0} ingredients
            </span>
            <button className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors duration-300">
              View Recipe →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;

