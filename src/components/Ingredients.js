import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

function Ingredients({ recipe }) {
  const ingredientsBuilder = () => {
    const ings = Object.entries(recipe).filter((f) => f[0].includes('strIngredient'))
      .filter((m) => m[1] !== '' && m[1] !== null);
    const measures = Object.entries(recipe).filter((f) => f[0].includes('strMeasure'))
      .filter((m) => m[1] !== '' && m[1] !== null);

    return ings.map((ing, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` } className="ingredients-li">
        {
          measures[index] ? `${ing[1]} (${measures[index][1]}) `
            : `${ing[1]}`
        }
      </li>
    ));
  };

  return (
    <ul id="details-ingredients">
      {ingredientsBuilder()}
    </ul>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Ingredients;
