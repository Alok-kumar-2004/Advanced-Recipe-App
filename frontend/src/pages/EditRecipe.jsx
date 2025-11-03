import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/api';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await getRecipeById(id);
      const recipe = response.data;
      
      setFormData({
        title: recipe.title,
        ingredients: recipe.ingredients.join(', '),
        instructions: recipe.instructions,
        coverImage: null,
      });
      
      if (recipe.coverImage) {
        setCurrentImage(recipe.coverImage);
        setImagePreview(`http://localhost:5000${recipe.coverImage}`);
      }
    } catch (err) {
      setError('Failed to load recipe');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'coverImage') {
      const file = e.target.files[0];
      setFormData({ ...formData, coverImage: file });
      

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('ingredients', formData.ingredients);
      submitData.append('instructions', formData.instructions);
      if (formData.coverImage) {
        submitData.append('coverImage', formData.coverImage);
      }

      await updateRecipe(id, submitData);
      navigate('/my-recipes');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update recipe');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-2xl text-primary">Loading recipe...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Edit Recipe</h1>

      <div className="card p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-light-text dark:text-dark-text font-medium mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter recipe title"
            />
          </div>

          <div>
            <label className="block text-light-text dark:text-dark-text font-medium mb-2">
              Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="input-field"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-64 object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-light-text dark:text-dark-text font-medium mb-2">
              Ingredients *
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
              rows="6"
              className="textarea-field"
              placeholder="Enter ingredients separated by commas"
            />
          </div>

          <div>
            <label className="block text-light-text dark:text-dark-text font-medium mb-2">
              Instructions *
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
              rows="10"
              className="textarea-field"
              placeholder="Enter step-by-step instructions"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Recipe'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-light-text dark:text-dark-text font-semibold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;

