import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const {
      index,
      recipe: { strMeal, strMealThumb, idMeal, strDrink, strDrinkThumb, idDrink },
    } = this.props;
    const { pathname } = window.location;
    const drink = pathname === '/drinks';
    return (
      <Link to={ `${pathname}/${drink ? idDrink : idMeal}` }>
        <div data-testid={ `${index}-recipe-card` } className="container">
          <img
            src={ drink ? strDrinkThumb : strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ drink ? 'drink' : 'meal' }
            className="card_img"
          />
          <h1 data-testid={ `${index}-card-name` }>{drink ? strDrink : strMeal}</h1>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
