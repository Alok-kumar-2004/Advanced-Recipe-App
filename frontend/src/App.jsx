import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyRecipes from './pages/MyRecipes';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Loading...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-recipe"
            element={
              <ProtectedRoute>
                <AddRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-recipe/:id"
            element={
              <ProtectedRoute>
                <EditRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;

