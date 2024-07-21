import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/recipe/:id" component={RecipePage} />
          <Route path="/new" component={NewRecipePage} />
          <Route path="/update/:id" component={UpdateRecipePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
