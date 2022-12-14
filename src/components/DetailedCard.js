import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IngredientCheck from './IngredientCheck';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './Card.css';

const copy = require('clipboard-copy');

class DetailedCard extends React.Component {
  state = {
    favBtnImg: whiteHeartIcon,
    shareBtnText: 'Share',
    finishDisabled: true,
    materials: false,
  }

  componentDidMount = () => {
    const { id, recipe } = this.props;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (!favoriteRecipes || favoriteRecipes.length === 0) {
      this.setHeart('white');
    } else {
      const repetido = !favoriteRecipes.every((r) => r.id !== id);
      if (repetido) this.setHeart('black');
    }

    this.setMaterials(recipe);
  }

  setHeart = (color) => {
    this.setState({ favBtnImg: color === 'black' ? blackHeartIcon : whiteHeartIcon });
  }

  setMaterials = (recipe) => {
    const ingredients = Object.keys(recipe).filter((i) => (
      i.includes('strIngredient') && (recipe[i] !== null && recipe[i] !== '')
    )).map((i) => recipe[i]);
    const measure = Object.keys(recipe).filter((m) => (
      m.includes('strMeasure') && (recipe[m] !== null && recipe[m] !== '')
    )).map((m) => recipe[m]);

    this.setState({ materials: { ingredients, measure } });
  }

  btnShareClick = () => {
    copy(window.location.href.replace('/in-progress', ''));
    this.setState({ shareBtnText: 'Link copied!' });
  };

  favoriteObject = () => {
    const {
      id, page, recipe: {
        strMeal, strMealThumb, strCategory, strArea,
        strDrink, strDrinkThumb, strAlcoholic,
      },
    } = this.props;

    const drink = page === 'cocktails';

    return {
      id,
      type: drink ? 'drink' : 'food',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: drink ? strDrink : strMeal,
      image: drink ? strDrinkThumb : strMealThumb,
    };
  };

  btnFavClick = () => {
    const { id } = this.props;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes || favoriteRecipes.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([this.favoriteObject()]));
      this.setState({ favBtnImg: blackHeartIcon });
    } else {
      const repetido = !favoriteRecipes.every((r) => r.id !== id);
      if (repetido) {
        localStorage.setItem(
          'favoriteRecipes', JSON.stringify(favoriteRecipes.filter((r) => r.id !== id)),
        );
        this.setState({ favBtnImg: whiteHeartIcon });
      } else {
        localStorage.setItem(
          'favoriteRecipes', JSON.stringify([...favoriteRecipes, this.favoriteObject()]),
        );
        this.setState({ favBtnImg: blackHeartIcon });
      }
    }
  }

  isFinishDisabled = (list) => {
    const { finishDisabled: disabled } = this.state;
    const finishDisabled = !list.every((c) => c);
    if (finishDisabled !== disabled) {
      this.setState({ finishDisabled });
    }
  }

  handleFinalizeButton = () => {
    const { recipe: { strTags } } = this.props;
    const doneObject = this.favoriteObject();
    const date = new Date();
    const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));

    doneObject.doneDate = formatedDate;
    doneObject.tags = !strTags ? [] : strTags.split(',').filter((p) => p !== '' && p !== ' ');

    if (!storage) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneObject]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...storage, doneObject]));
    }
  }

  render() {
    const { favBtnImg, materials, shareBtnText, finishDisabled } = this.state;
    const {
      id, page, recipe: {
        strMeal, strMealThumb, strCategory, strInstructions,
        strDrink, strDrinkThumb, strAlcoholic,
      },
    } = this.props;
    const drink = page === 'cocktails';

    return (
      <div>
        <h1 id="inProgress-header">In Progress</h1>
        <div id="inProgress-food">
          <h2 data-testid="recipe-title">{drink ? strDrink : strMeal}</h2>
          <img
            className="recomend-img"
            src={ drink ? strDrinkThumb : strMealThumb }
            data-testid="recipe-photo"
            alt={ drink ? 'drink' : 'meal' }
          />
          <p data-testid="recipe-category">{drink ? strAlcoholic : strCategory}</p>
        </div>
        <div id="inProgress-ingredients">
          <h2>Ingredients</h2>
          {
            materials
              ? (
                <IngredientCheck
                  materials={ materials }
                  id={ id }
                  page={ page }
                  isFinishDisabled={ this.isFinishDisabled }
                />
              )
              : (<div>carregando</div>)
          }
        </div>
        <div id="inProgress-instructions">
          <h2>Instructions</h2>
          <p data-testid="instructions" id="inProgress-instructions-text">{strInstructions}</p>
        </div>
        <div id="inProgress-buttons-box">
          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ this.btnFavClick }
            src={ favBtnImg }
            alt="favorite-button"
            className='btn details-buttons'
          />
          <input
            type="image"
            data-testid="share-btn"
            onClick={ this.btnShareClick }
            src={ shareIcon }
            alt="share-button"
            className='btn details-buttons'
          />
          <Link to="/done-recipes">
            <button
              type="button"
              disabled={ finishDisabled }
              data-testid="finish-recipe-btn"
              onClick={ this.handleFinalizeButton }
              className='btn details-buttons'
            >
              Finish
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

DetailedCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DetailedCard;
