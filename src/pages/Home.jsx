import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/recipe-app/api/get_recipes.php')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the recipes!", error);
      });

    // GSAP bounce effect
    gsap.fromTo(".home-title", 
      { y: -100 }, // Starting position
      { y: 0, duration: 2, ease: "bounce.out" } // Ending position
    );
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Recipe List</h1>
      <ul className="recipe-list">
        {recipes.map(recipe => (
          <li key={recipe.id} className="recipe-item">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              {recipe.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
