import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ShoppingCart from './Pages/ShoppingCart';
import Checkout from './Pages/Checkout';
import Home from './Pages/Home';
import PageItem from './Pages/PageItem';
import * as api from './services/api';
import './App.css';

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
    };
  }

  async componentDidMount() {
    const categorias = await api.getCategories();
    this.setState({ categoriaList: categorias });
    const oldFavorites = localStorage.getItem('favorites');
    if (oldFavorites !== null) {
      this.setState({ favorites: JSON.parse(oldFavorites) });
    }
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

  handleSizeMais = (element) => {
    const { available_quantity: quant } = element;
    const { favorites: oldFavorites } = this.state;
    const size = oldFavorites.filter((item) => item.id === element.id).length;
    if (size < quant) {
      this.setState(({ favorites }) => ({
        favorites: [...favorites, element],
      }), () => {
        const { favorites } = this.state;
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });
    }
  }

  handleSizeMenos = (element) => {
    const { favorites } = this.state;
    const sizeElement = favorites.filter(({ id }) => id === element.id);
    if (sizeElement.length >= 1) {
      const position = favorites.lastIndexOf(element);
      const newFavorites = favorites.filter((_, index) => index !== position);
      this.setState({
        favorites: newFavorites,
      }, () => {
        const { favorites: favoritesDiferent } = this.state;
        localStorage.setItem('favorites', JSON.stringify(favoritesDiferent));
      });
    }
  }

  handleFavorites = (object) => {
    const { available_quantity: quant } = object;
    const { favorites: oldFavorites } = this.state;
    const size = oldFavorites.filter((item) => item.id === object.id).length;
    if (size < quant) {
      this.setState(({ favorites }) => ({
        favorites: [...favorites, object],
      }), () => {
        const { favorites } = this.state;
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });
    }
  }

  render() {
    const {
      categoriaList,
      productList,
      filtrar,
      favorites,
    } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <header className="app-header">
            <h2>Frontend Online Store</h2>
            <nav className="app-header-nav">
              <Link to="/">Início</Link>
              <hr />
              <Link to="/shopping-cart">Carrinho</Link>
            </nav>
          </header>
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
              render={ (props) => (<ShoppingCart
                favorites={ favorites }
                handleSizeMais={ this.handleSizeMais }
                handleSizeMenos={ this.handleSizeMenos }
                { ...props }
              />) }
            />
            <Route
              path="/page-item/:id"
              render={ (props) => (<PageItem
                { ...props }
                handleFavorites={ this.handleFavorites }
                favorites={ favorites }
              />) }
            />
            <Route
              path="/checkout"
              render={ () => (
                <Checkout favorites={ favorites } />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
