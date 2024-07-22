import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ name: '', ingredients: [], steps: [] });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await axios.get(`http://localhost/recipe-app/api/get_recipe.php?id=${id}`);
        setRecipe(recipeResponse.data);
        await checkIfStarred(recipeResponse.data.id);
        checkIfCreator(recipeResponse.data.user_id);
        await fetchComments();
      } catch (error) {
        console.error("There was an error fetching the recipe!", error);
      }
    };

    fetchData();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost/recipe-app/api/get_comments.php?recipe_id=${id}`);
      setComments(response.data);
    } catch (error) {
      console.error("There was an error fetching the comments!", error);
    }
  };

  const checkIfStarred = async (recipeId) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in local storage');
        setIsStarred(false);
        return;
      }

      const response = await axios.get(`http://localhost/recipe-app/api/get_starred_recipes.php?user_id=${userId}`);

      const starredRecipes = response.data;
      if (Array.isArray(starredRecipes)) {
        setIsStarred(starredRecipes.some(recipe => recipe.recipe_id === recipeId));
      } else {
        console.error("Expected an array of starred recipes, but got:", starredRecipes);
        setIsStarred(false);
      }
    } catch (error) {
      console.error("There was an error fetching starred recipes!", error);
    }
  };

  const checkIfCreator = (creatorId) => {
    const userId = localStorage.getItem('user_id');
    setIsCreator(userId === creatorId.toString());
  };

  const toggleStar = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        alert('Please log in to star recipes.');
        return;
      }

      const url = isStarred ? 'http://localhost/recipe-app/api/remove_starred_recipe.php' : 'http://localhost/recipe-app/api/add_starred_recipe.php';
      const response = await axios.post(url, { user_id: userId, recipe_id: recipe.id });
      
      if (response.data.success) {
        setIsStarred(!isStarred);
      } else {
        console.error('Failed to update starred status:', response.data.error);
      }
    } catch (error) {
      console.error("There was an error toggling the starred status!", error);
    }
  };

  const deleteRecipe = async () => {
    try {
      await axios.post('http://localhost/recipe-app/api/delete_recipe.php', { recipe_id: id });
      navigate('/');
    } catch (error) {
      console.error("There was an error deleting the recipe!", error);
    }
  };

  const updateRecipe = () => {
    navigate(`/update/${id}`);
  };

  const shareRecipe = () => {
    const recipeUrl = `${window.location.origin}/recipe/${id}`;
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        url: recipeUrl,
      }).then(() => {
        console.log('Recipe shared successfully');
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(recipeUrl).then(() => {
        alert('Recipe URL copied to clipboard');
      }).catch(console.error);
    }
  };

  const downloadRecipe = () => {
    const recipeDetails = `
      Recipe Name: ${recipe.name}
      
      Ingredients:
      ${recipe.ingredients.join('\n')}
      
      Steps:
      ${recipe.steps.join('\n')}
    `;

    const blob = new Blob([recipeDetails], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${recipe.name}.txt`;
    link.click();
  };

  const addComment = async () => {
    try {
      await axios.post('http://localhost/recipe-app/api/comments.php', {
        recipe_id: id,
        comment: newComment
      });
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error("There was an error adding the comment!", error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-page">
      <h1>{recipe.name}</h1>
      <button onClick={toggleStar}>
        {isStarred ? 'Unstar' : 'Star'}
      </button>
      <button onClick={shareRecipe}>
        Share
      </button>
      <button onClick={downloadRecipe}>
        Download
      </button>
      {isCreator && (
        <>
         <Link to={`/update/${id}`}> <button>Edit Recipe</button></Link>
          <button onClick={deleteRecipe}>Delete Recipe</button>
        </>
      )}
      <h2>Ingredients</h2>
      <ul>
        {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol>
        {Array.isArray(recipe.steps) && recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.comment}</li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default RecipePage;
