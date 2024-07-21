import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import NewRecipePage from './pages/NewRecipePage';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/recipe/:id" component={RecipePage} />
          <Route path="/new" component={NewRecipePage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
