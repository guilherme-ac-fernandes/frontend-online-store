import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShopButton from '../components/ShopButton';
import CardItem from '../components/CardItem';

class Home extends Component {
  render() {
    const {
      categoriaList,
      productList,
      handleChange,
      handleRadio,
      handleClick,
      filtrar } = this.props;
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
                  onChange={ handleRadio }
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
            onChange={ handleChange }
          />
          <input
            type="button"
            data-testid="query-button"
            value="Filtrar"
            onClick={ handleClick }
          />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          { filtrar && (
            <div>
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
          ) }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  categoriaList: PropTypes.instanceOf(Array).isRequired,
  productList: PropTypes.instanceOf(Array).isRequired,
  filtrar: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRadio: PropTypes.func.isRequired,
};

export default Home;
