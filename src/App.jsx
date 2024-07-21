import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import NewRecipePage from './pages/NewRecipePage';
import UpdateRecipePage from './pages/UpdateRecipePage';
import Navbar from './components/Navbar';
import StarredRecipes from './pages/StarredRecipes';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import UpdateRecipe from './pages/UpdateRecipePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/new" element={<NewRecipePage />} />
          <Route path="/update/:id" element={<UpdateRecipe />} />
          <Route path="/starred" element={<StarredRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
