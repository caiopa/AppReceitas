import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends React.Component {
  render() {
    const {
      index,
      recipe: { strMeal, strMealThumb, strDrink, strDrinkThumb },
    } = this.props;
    const drink = window.location.pathname === '/drinks';
    return (
      <div data-testid={ `${index}-recipe-card` } className="container">
        <img
          src={ drink ? strDrinkThumb : strMealThumb }
          data-testid={ `${index}-card-img` }
          alt={ drink ? 'drink' : 'meal' }
          className="card_img"
        />
        <h1 data-testid={ `${index}-card-name` }>{drink ? strDrink : strMeal}</h1>
      </div>
    );
  }
}

Card.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
