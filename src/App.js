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
      shoppingBag: {},
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

  handleSizeMais = (id) => {
    const { shoppingBag } = this.state;
    const previousValue = shoppingBag[id];
    shoppingBag[id] = previousValue + 1;
    this.setState({
      shoppingBag,
    });
  }

  handleSizeMenos = (id) => {
    const { shoppingBag } = this.state;
    const previousValue = shoppingBag[id];
    if (previousValue >= 1) shoppingBag[id] = previousValue - 1;
    this.setState({
      shoppingBag,
    });
  }

  handleFavorites = (object) => {
    this.setState(({ favorites }) => ({
      favorites: [...favorites, object],
    }), () => {
      const { favorites } = this.state;
      // Baseada na resolução no exercício do Guilherme Fernandes (link: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/02-front-end/bloco-11-componentes-com-estado-eventos-e-formularios-com-react/dia-01-componentes-com-estado-e-eventos/exercise-01/src/dataType.js)
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
                shoppingBag={ shoppingBag }
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
              />) }
            />
            <Route
              path="/checkout"
              render={ () => (
                <Checkout shoppingBag={ shoppingBag } />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
