import React, { useState, useEffect } from 'react';
import { recipesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setError } = useAuth();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipesAPI.getAll();
      setRecipes(response.data);
    } catch (err) {
      setError('Failed to fetch recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = async (recipeData) => {
    try {
      setLoading(true);
      const response = await recipesAPI.create(recipeData);
      setRecipes([...recipes, response.data]);
      setShowRecipeForm(false);
    } catch (err) {
      setError('Failed to create recipe');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecipe = async (id, recipeData) => {
    try {
      setLoading(true);
      const response = await recipesAPI.update(id, recipeData);
      const updatedRecipes = recipes.map(recipe => 
        recipe.id === id ? response.data : recipe
      );
      setRecipes(updatedRecipes);
      setEditingRecipe(null);
    } catch (err) {
      setError('Failed to update recipe');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      setLoading(true);
      await recipesAPI.delete(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (err) {
      setError('Failed to delete recipe');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeRecipe = async (id) => {
    try {
      const response = await recipesAPI.like(id);
      const updatedRecipes = recipes.map(recipe => 
        recipe.id === id ? response.data : recipe
      );
      setRecipes(updatedRecipes);
    } catch (err) {
      setError('Failed to like recipe');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Recipes</h2>
        <button
          onClick={() => setShowRecipeForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        >
          Add Recipe
        </button>
      </div>

      {showRecipeForm && (
        <RecipeForm
          onSubmit={handleCreateRecipe}
          onCancel={() => setShowRecipeForm(false)}
          loading={loading}
        />
      )}

      {editingRecipe && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={(data) => handleUpdateRecipe(editingRecipe.id, data)}
          onCancel={() => setEditingRecipe(null)}
          loading={loading}
        />
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => setEditingRecipe(recipe)}
              onDelete={() => handleDeleteRecipe(recipe.id)}
              onLike={() => handleLikeRecipe(recipe.id)}
              currentUserId={user?.id}
            />
          ))}
        </div>
      )}

      {!loading && recipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No recipes yet. Create your first recipe!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;