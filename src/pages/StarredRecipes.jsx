import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StarredRecipes = () => {
  const [starredRecipes, setStarredRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const fetchStarredRecipes = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          setError('User not logged in');
          return;
        }

        const response = await axios.get(`http://localhost/recipe-app/api/get_starred_recipes.php?user_id=${userId}`);
        const recipes = response.data;

        if (Array.isArray(recipes)) {
          // Fetch details for each recipe
          const recipeIds = recipes.map(recipe => recipe.recipe_id);
          const detailsResponses = await Promise.all(recipeIds.map(id => 
            axios.get(`http://localhost/recipe-app/api/get_recipe.php?id=${id}`)
          ));
          const details = detailsResponses.reduce((acc, res) => {
            const recipe = res.data;
            acc[recipe.id] = recipe;
            return acc;
          }, {});

          setRecipeDetails(details);
          setStarredRecipes(recipes);
        } else {
          console.error('Expected an array of starred recipes, but got:', recipes);
          setError('Failed to fetch starred recipes.');
        }
      } catch (error) {
        console.error('There was an error fetching starred recipes!', error);
        setError('Failed to fetch starred recipes.');
      }
    };

    fetchStarredRecipes();
  }, []);

  const removeStarredRecipe = async (recipeId) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setError('User not logged in');
        return;
      }

      await axios.post('http://localhost/recipe-app/api/remove_starred_recipe.php', {
        user_id: userId,
        recipe_id: recipeId,
      }, { withCredentials: true });
      setStarredRecipes(starredRecipes.filter(recipe => recipe.recipe_id !== recipeId));
      const newRecipeDetails = { ...recipeDetails };
      delete newRecipeDetails[recipeId];
      setRecipeDetails(newRecipeDetails);
    } catch (error) {
      console.error('There was an error removing the starred recipe!', error);
      setError('Failed to remove starred recipe.');
    }
  };

  return (
    <div className="starred-recipes-page">
      {error && <p>{error}</p>}
      <h1>Starred Recipes</h1>
      <ul>
        {starredRecipes.length > 0 ? (
          starredRecipes.map(recipe => {
            const recipeDetail = recipeDetails[recipe.recipe_id];
            return (
              <li key={recipe.recipe_id}>
                {recipeDetail ? (
                  <Link to={`/recipe/${recipeDetail.id}`}>{recipeDetail.name}</Link>
                ) : (
                  'Loading...'
                )}
                <button onClick={() => removeStarredRecipe(recipe.recipe_id)}>Remove</button>
              </li>
            );
          })
        ) : (
          <p className="no-recipes">No starred recipes found.</p>
        )}
      </ul>
    </div>
  );
};

export default StarredRecipes;
