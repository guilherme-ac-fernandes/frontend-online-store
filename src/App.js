import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './Pages/ShoppingCart';
import Home from './Pages/Home';
import PageItem from './Pages/PageItem';
import * as api from './services/api';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      categoriaList: [],
      categoriaId: '',
      productList: [],
      filtrar: false,
      query: '',
      favorites: [],
      shoppingBag: [],
    };
  }

  async componentDidMount() {
    const categorias = await api.getCategories();
    this.setState({ categoriaList: categorias });
  }

  handleClick = async () => {
    const { categoriaId, query } = this.state;
    const listaProdutos = await api.getProductsFromCategoryAndQuery(categoriaId, query);
    this.setState({ productList: listaProdutos.results, filtrar: true });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleRadio = ({ target }) => {
    const { value } = target;
    this.setState({ categoriaId: value }, async () => {
      const { categoriaId } = this.state;
      const listaProdutos = await api.getProductsFromCategoryAndQuery(categoriaId);
      this.setState({ productList: listaProdutos.results, filtrar: true });
    });
  }

  // handleSizeMais = () => {
  //   this.setState((previous) => {
  //     shoppingBag: [...previous, ]
  //   });
  // }

  handleFavorites = (object) => {
    this.setState(({ favorites }) => ({
      favorites: [...favorites, object],
    }), () => {
      const { favorites } = this.state;
      const favoritesFilter = favorites
        .filter((element, index) => favorites.indexOf(element) === index);
      const novoObjeto = favoritesFilter.reduce((acc, curr) => {
        acc[curr.id] = 1;
        return acc;
      }, {});
      this.setState({
        shoppingBag: novoObjeto,
      });
    });
  }

  render() {
    const { categoriaList, productList, filtrar, favorites, shoppingBag } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<Home
                categoriaList={ categoriaList }
                productList={ productList }
                handleRadio={ this.handleRadio }
                handleChange={ this.handleChange }
                handleClick={ this.handleClick }
                handleFavorites={ this.handleFavorites }
                filtrar={ filtrar }
                favorites={ favorites }
              />) }
            />
            <Route
              path="/shopping-cart"
              render={ () => (<ShoppingCart
                favorites={ favorites }
                shoppingBag={ shoppingBag }
              />) }
            />
            <Route
              path="/page-item/:id"
              render={ (props) => (<PageItem
                { ...props }
                productList={ productList }
                handleFavorites={ this.handleFavorites }
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
