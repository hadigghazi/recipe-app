import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    // Fetch recipe details
    axios.get(`http://localhost/recipe-app/api/get_recipe.php?id=${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the recipe!", error);
      });

    // Fetch comments for the recipe
    axios.get(`http://localhost/recipe-app/api/get_comments.php?recipe_id=${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });

    // Check if the recipe is starred
    const starredRecipes = JSON.parse(localStorage.getItem('starredRecipes')) || [];
    setIsStarred(starredRecipes.includes(id));
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    axios.post('http://localhost/recipe-app/api/comments.php', {
      recipe_id: id,
      comment: newComment
    })
      .then(response => {
        setComments([...comments, { id: response.data.id, comment: newComment }]);
        setNewComment('');
      })
      .catch(error => {
        console.error("There was an error adding the comment!", error);
      });
  };

  const handleStarRecipe = () => {
    const starredRecipes = JSON.parse(localStorage.getItem('starredRecipes')) || [];
    if (starredRecipes.includes(id)) {
      const updatedStarredRecipes = starredRecipes.filter(recipeId => recipeId !== id);
      localStorage.setItem('starredRecipes', JSON.stringify(updatedStarredRecipes));
      setIsStarred(false);
    } else {
      starredRecipes.push(id);
      localStorage.setItem('starredRecipes', JSON.stringify(starredRecipes));
      setIsStarred(true);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-page">
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
      <button className="star-button" onClick={handleStarRecipe}>
        {isStarred ? 'Unstar' : 'Star'} Recipe
      </button>
      <Link to={`/update/${id}`}>Edit Recipe</Link>
      <div className="comments-section">
        <h2>Comments</h2>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
        <h3>Add a Comment</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        ></textarea>
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default RecipePage;
