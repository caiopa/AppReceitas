import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import LoginProvider from './Context/LoginProvider';
import Footer from './components/Footer';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <LoginProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods">
          <Recipes page="Foods" />
          <Footer />
        </Route>
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks">
          <Recipes page="Drinks" />
          <Footer />
        </Route>
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/profile">
          <Header title="Profile" />
          <Profile />
          <Footer />
        </Route>
        <Route path="/done-recipes"><DoneRecipes /></Route>
        <Route path="/favorite-recipes">
          <Header title="Favorite Recipes" />
          <FavoriteRecipes />
        </Route>
      </LoginProvider>
    </Switch>
  );
}

export default App;
