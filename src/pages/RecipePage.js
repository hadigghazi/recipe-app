import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/recipe-app/api/get_recipe.php?id=${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the recipe!", error);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.split(',').map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol>
        {recipe.steps.split(',').map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <Link to={`/update/${id}`}>Edit Recipe</Link>
    </div>
  );
};

export default RecipePage;
