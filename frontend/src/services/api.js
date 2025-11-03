import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Don't set Content-Type for FormData - let browser set it with boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

// Auth APIs
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');

// Recipe APIs
export const getAllRecipes = () => api.get('/recipe');
export const getMyRecipes = () => api.get('/recipe/my');
export const getFavoriteRecipes = () => api.get('/recipe/favorites');
export const getRecipeById = (id) => api.get(`/recipe/${id}`);
export const createRecipe = (formData) => api.post('/recipe', formData);
export const updateRecipe = (id, formData) => api.put(`/recipe/${id}`, formData);
export const deleteRecipe = (id) => api.delete(`/recipe/${id}`);
export const toggleFavorite = (id) => api.post(`/recipe/${id}/favorite`);

// User APIs
export const getUserById = (id) => api.get(`/user/${id}`);

export default api;

