import React, { useState } from 'react';
import axios from 'axios';

const NewRecipePage = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userId = localStorage.getItem('user_id');
    
    if (!userId) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await axios.post('http://localhost/recipe-app/api/create_recipe.php', {
        name,
        ingredients,
        steps,
        user_id: userId
      });

      if (response.data.success) {
        setSuccess('Recipe created successfully');
        setError('');
      } else {
        setError(response.data.error);
        setSuccess('');
      }
    } catch (err) {
      setError('There was an error creating the recipe.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <textarea
        placeholder="Steps (comma separated)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      />
      <button type="submit">Create Recipe</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default NewRecipePage;
