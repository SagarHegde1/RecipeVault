package com.recipevault.service;

import java.util.List;
import com.recipevault.model.Recipe;
import com.recipevault.model.User;

public interface RecipeService {
    
    Recipe createRecipe(Recipe recipe, User user);
    Recipe findRecipeById(Long id) throws Exception;
    void deleteRecipe(Long id) throws Exception;
    Recipe updateRecipe(Recipe recipe, Long id) throws Exception;
    List<Recipe> findAllRecipe();
    Recipe likeRecipe(Long recipeId, User user) throws Exception;
    List<Recipe> findRecipesByUser(User user); // ADD THIS METHOD
}