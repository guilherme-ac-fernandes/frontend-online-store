import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShopButton from '../components/ShopButton';
import CardItem from '../components/CardItem';
import '../styles/Home.css';

class Home extends Component {
  render() {
    const {
      categoriaList,
      productList,
      handleChange,
      handleRadio,
      handleClick,
      filtrar,
      handleFavorites,
      favorites } = this.props;
    return (
      <div className="home-container">
        { categoriaList.length > 0 && (
          <nav className="home-nav-content">
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
        <div className="home-content">
          <div className="home-header-content">
            <div className="home-input-content">
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
              <input
                className="home-input-text"
                type="text"
                data-testid="query-input"
                name="query"
                onChange={ handleChange }
              />
              <input
                className="home-input-button"
                type="button"
                data-testid="query-button"
                value="Filtrar"
                onClick={ handleClick }
              />
            </div>
            <ShopButton favorites={ favorites } className="home-shoppButton" />
          </div>
          { filtrar && (
            <div>
              {
                productList.length > 0 ? (
                  <div className="home-product-list">
                    { productList.map((produto) => (
                      <CardItem
                        key={ produto.id }
                        handleFavorites={ handleFavorites }
                        object={ produto }
                      />
                    ))}
                  </div>
                ) : (
                  <h3>Nenhum produto foi encontrado</h3>
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
  handleFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.instanceOf(Array).isRequired,
};

export default Home;
