// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShopButton from '../components/ShopButton';

class Home extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <ShopButton />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
