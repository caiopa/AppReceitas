import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  state = {
    searchActive: false,
    searchText: '',
  }

  handleSearchClick = () => {
    this.setState((prev) => ({ searchActive: !prev.searchActive }));
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { searchActive, searchText } = this.state;
    const { title, search } = this.props;
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
        {searchActive && (
          <input
            name="searchText"
            value={ searchText }
            onChange={ this.handleInputChange }
            data-testid="search-input"
          />
        )}
        <h1 data-testid="page-title">{title}</h1>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
