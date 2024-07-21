import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import NewRecipePage from './pages/NewRecipePage';
import UpdateRecipePage from './pages/UpdateRecipePage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/new" element={<NewRecipePage />} />
          <Route path="/update/:id" element={<UpdateRecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
