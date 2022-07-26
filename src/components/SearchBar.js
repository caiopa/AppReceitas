import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  render() {
    const { searchText, handleInputChange, btnSearchClick } = this.props;
    return (
      <div id="header-filters">
        <div className='header-filters-inputs mb-3'>
          <input
            className='form-control mr-3 header-inputs'
            name="searchText"
            value={ searchText }
            onChange={ handleInputChange }
            data-testid="search-input"
          />
          <button
            className='btn header-inputs'
            type="button"
            data-testid="exec-search-btn"
            onClick={ btnSearchClick }
          >
            Search
          </button>
        </div>
        <div className='header-filters-inputs'>
          <label htmlFor="rdbIngredient">
            <input
              className='mr-1'
              id="rdbIngredient"
              type="radio"
              data-testid="ingredient-search-radio"
              value="ingredients"
              name="radio"
              onChange={ handleInputChange }
            />
            Ingredient
          </label>
          <label htmlFor="rdbName">
            <input
              className='mr-1'
              id="rdbName"
              type="radio"
              data-testid="name-search-radio"
              value="name"
              name="radio"
              onChange={ handleInputChange }
            />
            Name
          </label>
          <label htmlFor="rdbFirstLetter">
            <input
              className='mr-1'
              id="rdbFirstLetter"
              type="radio"
              data-testid="first-letter-search-radio"
              value="firstLetter"
              name="radio"
              onChange={ handleInputChange }
            />
            First letter
          </label>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  btnSearchClick: PropTypes.func.isRequired,
};

export default SearchBar;
