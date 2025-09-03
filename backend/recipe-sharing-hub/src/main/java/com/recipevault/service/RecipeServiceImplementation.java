package com.recipevault.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipevault.model.Recipe;
import com.recipevault.model.User;
import com.recipevault.repository.RecipeRepository;

@Service
public class RecipeServiceImplementation implements RecipeService {
    
    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Recipe createRecipe(Recipe recipe, User user) {
        
        Recipe createdRecipe = new Recipe();
        createdRecipe.setTitle(recipe.getTitle());
        createdRecipe.setImage(recipe.getImage());
        createdRecipe.setDescription(recipe.getDescription());
        createdRecipe.setVegetarian(recipe.isVegetarian());
        createdRecipe.setIngredients(recipe.getIngredients()); // ADD THIS LINE
        createdRecipe.setInstructions(recipe.getInstructions()); // ADD THIS LINE
        createdRecipe.setUser(user);
        createdRecipe.setCreatedAt(LocalDateTime.now());
        
        return recipeRepository.save(createdRecipe);
    }

    @Override
    public Recipe findRecipeById(Long id) throws Exception {
        Optional<Recipe> opt = recipeRepository.findById(id);
        
        if(opt.isPresent()) {
            return opt.get();
        }
        
        throw new Exception("Recipe not found with id "+id);
    }

    @Override
    public void deleteRecipe(Long id) throws Exception {
        
        findRecipeById(id);
        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe updateRecipe(Recipe recipe, Long id) throws Exception {
        
        Recipe oldRecipe = findRecipeById(id);
        
        if(recipe.getTitle() != null) {
            oldRecipe.setTitle(recipe.getTitle());
        }
        if(recipe.getImage() != null) {
            oldRecipe.setImage(recipe.getImage());
        }
        if(recipe.getDescription() != null) {
            oldRecipe.setDescription(recipe.getDescription());
        }
        if(recipe.getIngredients() != null) { // ADD THIS BLOCK
            oldRecipe.setIngredients(recipe.getIngredients());
        }
        if(recipe.getInstructions() != null) { // ADD THIS BLOCK
            oldRecipe.setInstructions(recipe.getInstructions());
        }
        
        oldRecipe.setVegetarian(recipe.isVegetarian());
        
        return recipeRepository.save(oldRecipe);
    }

    @Override
    public List<Recipe> findAllRecipe() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe likeRecipe(Long recipeId, User user) throws Exception {
        
        Recipe recipe = findRecipeById(recipeId);
        
        if (recipe.getLikes().contains(user.getId())) {
            recipe.getLikes().remove(user.getId()); // unlike
        } else {
            recipe.getLikes().add(user.getId());    // like
        }

        return recipeRepository.save(recipe); // persist changes
    }

    // ADD THIS METHOD IF YOU WANT TO GET USER'S RECIPES
    @Override
    public List<Recipe> findRecipesByUser(User user) {
        return recipeRepository.findByUserId(user.getId());
    }
}
