import React from 'react';
import '../styles/Slider.css';
import PropTypes from 'prop-types';

class Slider extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     classe: 'container2',
  //   };
  // }

  render() {
    // const { classe } = this.state;
    const { favorites, hidden } = this.props;
    const favoritesFilter = favorites.reduce((acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) acc.push(curr);
      return acc;
    }, []);
    console.log(favorites);
    return (
      <div className={ JSON.stringify(hidden) }>
        <h2>carrinho</h2>
        <ul>
          {favoritesFilter.map((item) => (
            <li key={ item.id }>
              {/* <img src={ item.thumbnail } alt={ item.title } width="120px" /> */}
              <p>
                {item.title}
              </p>
              <p>{favorites.filter(({ id }) => id === item.id).length}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Slider.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default Slider;
