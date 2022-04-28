import React from 'react';
import PropTypes from 'prop-types';
import ShopButton from '../components/ShopButton';
import FormItem from '../components/FormItem';
import * as api from '../services/api';

class PageItem extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      stars: 0,
      avaliation: '',
      comments: [],
      product: [],
      render: false,
    };
  }

  componentDidMount() {
    this.getProductFromAPI();
    const storage = localStorage.getItem('comments');
    if (storage !== null) {
      this.setState({
        comments: JSON.parse(storage),
      });
    }
  }

  getProductFromAPI = async () => {
    // Baseada na resolução no exercício do Guilherme Fernandes (link: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/02-front-end/bloco-12-ciclo-de-vida-de-componentes-e-react-router/dia-01-ciclo-de-vida-de-componentes/exercise-01/src/App.js)
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductsFromId(id);
    this.setState({ product, render: true });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { match: { params: { id } } } = this.props;
    const { email, stars, avaliation } = this.state;
    const object = { id, email, stars, avaliation };
    this.setState((prev) => ({
      comments: [...prev.comments, object],
    }), () => {
      const { comments } = this.state;
      localStorage.setItem('comments', JSON.stringify(comments));
    });
  };

  render() {
    const { match: { params: { id } }, handleFavorites } = this.props;
    const { comments, product, render } = this.state;
    const commentsFilter = comments.filter((item) => item.id === id);
    const { title, thumbnail, price, attributes } = product;
    return (
      <div>
        <ShopButton />
        {render && (
          <div>
            <h2 data-testid="product-detail-name">{title}</h2>
            <img src={ thumbnail } alt={ title } />
            <p>{price}</p>
            <button
              type="button"
              onClick={ () => handleFavorites(product) }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao carrinho
            </button>
            <ul>
              {
                attributes.map(({ name, value_name: value }, index) => (
                  <li key={ index }>{`${name}: ${value}`}</li>
                ))
              }
            </ul>
            <FormItem
              handleChange={ this.handleChange }
              handleClick={ this.handleClick }
            />
            {commentsFilter.length > 0 && commentsFilter.map((item, index) => (
              <div key={ index }>
                <p>{ item.email }</p>
                <p>{ item.stars }</p>
                <p>{ item.avaliation }</p>
              </div>
            ))}
          </div>
        )}

      </div>
    );
  }
}

PageItem.propTypes = {
  handleFavorites: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default PageItem;
