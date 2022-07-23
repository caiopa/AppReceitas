import React from 'react';
import PropTypes from 'prop-types';

function ButtonFilter(props) {
  const { onClick } = props;
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => onClick('all') }
        type="button"
      >
        ALL
      </button>
      <button
        data-testid="filter-by-food-btn"
        onClick={ () => onClick('food') }
        type="button"
      >
        FOOD
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => onClick('drink') }
        type="button"
      >
        DRINKS
      </button>
    </div>
  );
}

ButtonFilter.propTypes = {
  changeCategory: PropTypes.func,
}.isRequired;

export default ButtonFilter;
