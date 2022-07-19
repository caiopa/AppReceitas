import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  render() {
    const { searchText, handleInputChange, btnSearchClick } = this.props;
    return (
      <div>
        <input
          name="searchText"
          value={ searchText }
          onChange={ handleInputChange }
          data-testid="search-input"
        />
        <label htmlFor="rdbIngredient">
          Ingredient
          <input
            id="rdbIngredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredients"
            name="radio"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="rdbName">
          Name
          <input
            id="rdbName"
            type="radio"
            data-testid="name-search-radio"
            value="name"
            name="radio"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="rdbFirstLetter">
          First letter
          <input
            id="rdbFirstLetter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            name="radio"
            onChange={ handleInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ btnSearchClick }
        >
          Search
        </button>
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
