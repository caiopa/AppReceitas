import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

function App() {
  return (
    <Switch>
      <Route exact path="/"><div>oi</div></Route>
      <Route exact path="/foods"><Header title="Foods" search /></Route>
      <Route exact path="/drinks"><Header title="Drinks" search /></Route>
      <Route path="/profile"><Header title="Profile" /></Route>
      <Route path="/done-recipes"><Header title="Done Recipes" /></Route>
      <Route path="/favorite-recipes"><Header title="Favorite Recipes" /></Route>
    </Switch>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
