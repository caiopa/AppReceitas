import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import './Card.css';

const copy = require('clipboard-copy');

class DoneCard extends React.Component {
  state = {
    btnShareMessage: false,
  }

  btnShareClick = (page, id) => {
    copy(window.location.href.replace('/done-recipes', `/${page}s/${id}`));
    this.setState({ btnShareMessage: true });
  };

  render() {
    const { btnShareMessage } = this.state;
    const {
      index,
      recipe: {
        image, category, nationality, alcoholicOrNot, name, doneDate, tags, type, id,
      },
    } = this.props;
    return (
      <div id="done-card">
        <Link to={ `/${type}s/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
        </Link>
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ type }
            className="recomend-img"
          />
        </Link>
        <h3 data-testid={ `${index}-horizontal-top-text` }>
          {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
        </h3>
        <h4 data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</h4>
        <div id="done-button-category">
          {tags.map((tag) => (
            <h4 data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag } className="done-category">{tag}</h4>))}
        </div>
        <input
          className='btn details-buttons'
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share-button"
          onClick={ () => this.btnShareClick(type, id) }
        />
      </div>
    );
  }
}

DoneCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneCard;
