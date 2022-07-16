import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import fetchMealApi from '../API/fetchMealApi';
import fetchDrinkApi from '../API/fetchDrinkApi';

class Header extends React.Component {
  state = {
    searchActive: false,
    searchText: '',
    radio: 'ingredients',
  }

  handleSearchClick = () => {
    this.setState((prev) => ({ searchActive: !prev.searchActive }));
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  btnSearchClick = async () => {
    const { radio, searchText } = this.state;
    const { callback } = this.props;
    if (radio === 'firstLetter' && searchText.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (window.location.pathname === '/foods') {
      const results = await fetchMealApi(radio, searchText);
      if (results.meals.length === 1) {
        window.location.pathname = `/foods/${results.meals[0].idMeal}`;
      } else {
        callback(results.meals);
      }
    } else {
      const results = await fetchDrinkApi(radio, searchText);
      if (results.drinks.length === 1) {
        window.location.pathname = `/drinks/${results.drinks[0].idDrink}`;
      } else {
        callback(results.meals);
      }
    }
  }

  render() {
    const { searchActive, searchText } = this.state;
    const { title, search } = this.props;
    const inputs = (
      <>
        <input
          name="searchText"
          value={ searchText }
          onChange={ this.handleInputChange }
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
            onChange={ this.handleInputChange }
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
            onChange={ this.handleInputChange }
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
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.btnSearchClick }
        >
          Search
        </button>
      </>
    );

    return (
      <div>
        <Link to="/profile">
          <img src={ profileIcon } alt="profile_icon" data-testid="profile-top-btn" />
        </Link>
        {search && (
          <input
            type="image"
            src={ searchIcon }
            alt="search_icon"
            onClick={ this.handleSearchClick }
            data-testid="search-top-btn"
          />
        )}
        {searchActive && inputs}
        <h1 data-testid="page-title">{title}</h1>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Header;
