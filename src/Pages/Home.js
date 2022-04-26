// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShopButton from '../components/ShopButton';
import * as api from '../services/api';
import CardItem from '../components/CardItem';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      categoriaList: [],
      categoriaId: '',
      productList: [],
      // filtrar: false,
      query: '',
    };
  }

  async componentDidMount() {
    const categorias = await api.getCategories();
    this.setState({ categoriaList: categorias });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, async () => {
      const { categoriaId, query } = this.state;
      const listaProdutos = await api.getProductsFromCategoryAndQuery(categoriaId, query);
      this.setState({ productList: listaProdutos.results });
    });
  }

  // handleClick = () => {
  //   this.setState({
  //     filtrar: true,
  //   });
  // }

  render() {
    const { categoriaList, productList } = this.state;
    return (
      <div>
        { categoriaList.length > 0 && (
          <nav>
            {categoriaList.map(({ id, name }) => (
              <label key={ id } htmlFor={ id }>
                {name}
                <input
                  id={ id }
                  type="radio"
                  name="categoriaId"
                  data-testid="category"
                  onChange={ this.handleChange }
                  value={ id }
                />
              </label>
            ))}
          </nav>
        ) }
        <div>
          <ShopButton />
          <input
            type="text"
            data-testid="query-input"
            name="query"
            onChange={ this.handleChange }
          />
          <input
            type="button"
            data-testid="query-button"
            value="Filtrar"
            // onClick={ this.handleClick }
          />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          {
            productList.length > 0 ? (
              <div>
                { productList.map((produto) => (
                  <CardItem
                    key={ produto.id }
                    { ...produto }
                  />
                ))}
              </div>
            ) : (
              <p>Nenhum produto foi encontrado</p>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
