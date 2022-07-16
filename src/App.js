import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import LoginProvider from './Context/LoginProvider';
import Footer from './components/Footer';
import FoodDetail from './pages/FoodDetail';
import DrinkDetail from './pages/DrinkDetail';

function App() {
  return (
    <Switch>
      <LoginProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods">
          <Recipes />
          <Footer />
        </Route>
        <Route exact path="/foods/:id" component={ FoodDetail } />
        <Route exact path="/drinks">
          <Recipes />
          <Footer />
        </Route>
        <Route exact path="/drinks/:id" component={ DrinkDetail } />
        <Route path="/profile">
          <Header title="Profile" />
          <Footer />
        </Route>
        <Route path="/done-recipes"><Header title="Done Recipes" /></Route>
        <Route path="/favorite-recipes"><Header title="Favorite Recipes" /></Route>
      </LoginProvider>
    </Switch>
  );
}

export default App;
