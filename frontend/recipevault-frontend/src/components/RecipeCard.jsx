import React from 'react';

const RecipeCard = ({ recipe, onEdit, onDelete, onLike, currentUserId }) => {
  const isLiked = recipe.likes && recipe.likes.includes(currentUserId);
  const likeCount = recipe.likes ? recipe.likes.length : 0;

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{recipe.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-indigo-600 hover:text-indigo-900"
              title="Edit recipe"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-900"
              title="Delete recipe"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-2">
          <span className={`inline-block text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide ${
            recipe.vegetarian 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {recipe.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">{recipe.description}</p>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Ingredients</h4>
          <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Instructions</h4>
          <p className="mt-1 text-sm text-gray-500 whitespace-pre-line">{recipe.instructions}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Created {recipe.createdAt && new Date(recipe.createdAt).toLocaleDateString()}
          </div>
          <button
            onClick={onLike}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;