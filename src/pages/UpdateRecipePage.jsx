import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ name: '', ingredients: '', steps: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost/recipe-app/api/get_recipe.php?id=${id}`);
        if (response.data) {
          const { name, ingredients, steps } = response.data;
          setRecipe({ name, ingredients, steps });
        } else {
          setError('Recipe not found');
        }
      } catch (error) {
        console.error("There was an error fetching the recipe!", error);
        setError('Error fetching recipe data.');
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({ ...prevRecipe, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/recipe-app/api/update_recipe.php', {
        recipe_id: id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
      });

      if (response.data.success) {
        setSuccess('Recipe updated successfully');
        setError('');
        navigate(`/recipe/${id}`);
      } else {
        setError(response.data.error || 'Error updating recipe.');
        setSuccess('');
      }
    } catch (error) {
      console.error("There was an error updating the recipe!", error);
      setError('Error updating recipe.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Update Recipe</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="steps"
          placeholder="Steps (comma separated)"
          value={recipe.steps}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
