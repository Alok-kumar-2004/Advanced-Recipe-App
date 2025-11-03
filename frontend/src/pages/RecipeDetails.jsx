import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe, toggleFavorite as toggleFavoriteAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe && user) {
      setIsFavorite(recipe.favorites?.includes(user._id));
    }
  }, [recipe, user]);

  const fetchRecipe = async () => {
    try {
      const response = await getRecipeById(id);
      setRecipe(response.data);
    } catch (err) {
      setError('Failed to load recipe');
      console.error('Error fetching recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await toggleFavoriteAPI(id);
      await fetchRecipe(); // Refresh to get updated favorite status
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await deleteRecipe(id);
      navigate('/my-recipes');
    } catch (error) {
      setError('Failed to delete recipe');
      console.error('Error deleting recipe:', error);
    }
  };

  const isOwner = recipe && user && recipe.createdBy._id === user._id;
  const imageUrl = recipe?.coverImage ? `http://localhost:5000${recipe.coverImage}` : 'https://via.placeholder.com/800x400?text=No+Image';

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-2xl text-primary">Loading recipe...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-xl mb-4">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Recipe not found</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Image */}
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
          }}
        />
        {user && (
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            aria-label="Toggle favorite"
          >
            <span className="text-3xl">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="card p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
            {recipe.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <span className="mr-2">👤</span>
              {recipe.createdBy?.name || 'Unknown'}
            </span>
            <span className="flex items-center">
              <span className="mr-2">📅</span>
              {new Date(recipe.createdAt).toLocaleDateString()}
            </span>
            {isOwner && (
              <div className="ml-auto flex gap-2">
                <Link to={`/edit-recipe/${recipe._id}`} className="btn-secondary">
                  Edit Recipe
                </Link>
                <button onClick={handleDelete} className="btn-secondary bg-red-500 hover:bg-red-600">
                  Delete Recipe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <span className="mr-2">🥘</span> Ingredients
          </h2>
          <div className="bg-light-bg dark:bg-gray-700/50 rounded-xl p-6">
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 text-primary">▸</span>
                  <span className="text-light-text dark:text-dark-text">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <span className="mr-2">📝</span> Instructions
          </h2>
          <div className="bg-light-bg dark:bg-gray-700/50 rounded-xl p-6">
            <div className="whitespace-pre-wrap text-light-text dark:text-dark-text leading-relaxed">
              {recipe.instructions}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link to="/" className="btn-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetails;

