package com.recipevault.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Recipe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String title;
    
    @ManyToOne
    private User user;
    
    private String image;
    
    private String description;
    
    private boolean vegetarian;
    
    private LocalDateTime createdAt;
    
    // Ingredients as a list of strings
    @ElementCollection
    @CollectionTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "ingredient")
    private List<String> ingredients = new ArrayList<>();
    
    // Instructions as a large text field
    @Lob
    @Column(length = 1000) // Adjust length as needed
    private String instructions;
    
    @ElementCollection
    @CollectionTable(name = "recipe_likes", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "user_id")
    private List<Long> likes = new ArrayList<>();
}