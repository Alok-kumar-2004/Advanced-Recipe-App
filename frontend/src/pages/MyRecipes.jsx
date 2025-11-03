import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { getMyRecipes } from '../services/api';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getMyRecipes();
      setRecipes(response.data);
    } catch (err) {
      setError('Failed to load recipes');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    fetchRecipes();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-2xl text-primary">Loading recipes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-primary">My Recipes</h1>
        <Link to="/add-recipe" className="btn-primary">
          + Add New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            You haven't created any recipes yet
          </p>
          <Link to="/add-recipe" className="btn-primary inline-block">
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onFavoriteToggle={handleFavoriteToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;

