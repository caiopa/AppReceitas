import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginProvider from './Context/LoginProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Recipes } />
        </Switch>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
