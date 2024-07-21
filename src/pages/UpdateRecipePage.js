import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateRecipePage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    axios.get(`/get_recipe.php?id=${id}`)
      .then(response => {
        const recipe = response.data;
        setName(recipe.name);
        setIngredients(recipe.ingredients);
        setSteps(recipe.steps);
      })
      .catch(error => {
        console.error("There was an error fetching the recipe!", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      id,
      name,
      ingredients: ingredients.split(','),
      steps: steps.split(',')
    };

    axios.put('http://localhost/recipe-app/api/update_recipe.php', updatedRecipe)
      .then(response => {
        console.log("Recipe updated successfully!");
      })
      .catch(error => {
        console.error("There was an error updating the recipe!", error);
      });
  };

  return (
    <div>
      <h1>Update Recipe</h1>
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
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipePage;
