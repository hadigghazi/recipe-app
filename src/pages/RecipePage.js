import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost/recipe-app/api/get_recipe.php?id=${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError("There was an error fetching the recipe.");
        console.error("There was an error fetching the recipe!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recipe) {
    return <div className="not-found">Recipe not found.</div>;
  }

  return (
    <div className="recipe-page">
      <h1 className="recipe-title">{recipe.name}</h1>
      <h2 className="ingredients-heading">Ingredients</h2>
      <ul className="ingredient-list">
        {recipe.ingredients.split(',').map((ingredient, index) => (
          <li key={index} className="ingredient-item">{ingredient.trim()}</li>
        ))}
      </ul>
      <h2 className="steps-heading">Steps</h2>
      <ol className="steps-list">
        {recipe.steps.split(',').map((step, index) => (
          <li key={index} className="step-item">{step.trim()}</li>
        ))}
      </ol>
      <Link to={`/update/${id}`} className="edit-link btn--small">Edit Recipe</Link>
    </div>
  );
};

export default RecipePage;
