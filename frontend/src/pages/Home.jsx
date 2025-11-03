import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getAllRecipes();
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

  const filteredRecipes = recipes.filter((recipe) => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = recipe.title.toLowerCase().includes(searchLower);
    const ingredientsMatch = recipe.ingredients?.some((ingredient) =>
      ingredient.toLowerCase().includes(searchLower)
    );
    return titleMatch || ingredientsMatch;
  });

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
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Welcome to Recipe Haven 🍳
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover and share amazing recipes from around the world
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search recipe by title or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-[#9DC183] transition-all duration-300 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No recipes found. Be the first to add one!
          </p>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No recipes found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onFavoriteToggle={handleFavoriteToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

