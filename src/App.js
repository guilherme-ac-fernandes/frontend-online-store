import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './Pages/ShoppingCart';
import Home from './Pages/Home';
import PageItem from './Pages/PageItem';
import * as api from './services/api';
import ShopButton from './components/ShopButton';

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

  handleFavorites = (object) => {
    this.setState(({ favorites }) => ({
      favorites: [...favorites, object],
    }));
  }

  render() {
    const { categoriaList, productList, filtrar, favorites } = this.state;
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
              render={ () => <ShoppingCart favorites={ favorites } /> }
            />
            <Route
              path="/page-item/:id"
              render={ (props) => <PageItem { ...props } productList={ productList } /> }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
