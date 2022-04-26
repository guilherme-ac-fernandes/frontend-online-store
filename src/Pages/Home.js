// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShopButton from '../components/ShopButton';
import * as api from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      list: '',
    };
  }

  async componentDidMount() {
    const categorias = await api.getCategories();
    this.setState({ list: categorias });
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        { list.length > 0 && (
          <nav>
            {list.map(({ id, name }) => (
              <label key={ id } htmlFor={ id }>
                {name}
                <input
                  id={ id }
                  type="radio"
                  name="categoria"
                  data-testid="category"
                />
              </label>
            ))}
          </nav>
        ) }
        <div>
          <input type="text" />
          <ShopButton />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
