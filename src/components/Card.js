import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends React.Component {
  render() {
    const { index, meal: { strMeal, strMealThumb } } = this.props;
    return (
      <div data-testid={ `${index}-recipe-card` } className="container">
        <img
          src={ strMealThumb }
          data-testid={ `${index}-card-img` }
          alt="meal"
          className="card_img"
        />
        <h1 data-testid={ `${index}-card-img` }>{strMeal}</h1>
      </div>
    );
  }
}

Card.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
