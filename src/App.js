import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './Pages/ShoppingCart';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/shopping-cart" render={ () => <ShoppingCart /> } />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
