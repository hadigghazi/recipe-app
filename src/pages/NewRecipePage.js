import React, { useState } from 'react';
import axios from 'axios';

const NewRecipePage = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      ingredients: ingredients.split(','),
      steps: steps.split(',')
    };

    axios.post('/create_recipe.php', newRecipe)
      .then(response => {
        console.log("Recipe created successfully!");
      })
      .catch(error => {
        console.error("There was an error creating the recipe!", error);
      });
  };

  return (
    <div>
      <h1>Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </div>
        <div>
          <label>Steps (comma separated):</label>
          <input type="text" value={steps} onChange={(e) => setSteps(e.target.value)} />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default NewRecipePage;
