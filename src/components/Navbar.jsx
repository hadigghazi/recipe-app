import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <nav className='header'>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new">Create New Recipe</Link>
        </li>
        <li>
          <Link to="/starred">Starred Recipes</Link>
        </li>
        {userId ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
