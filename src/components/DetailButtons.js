import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DetailButtons() {
  const { vars: { recipe } } = useContext(LoginContext);
  const [btnStartText, setBtnStartText] = useState('Start Recipe');
  const [btnShareText, setBtnShareText] = useState('Share');
  const [favImage, setFavImage] = useState(whiteHeartIcon);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const isInProgress = () => {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (progress) {
        const listaIDs = [];
        Object.values(progress).forEach((v) => Object.keys(v)
          .forEach((k) => listaIDs.push(k)));
        if (listaIDs.some((id) => id === recipe.idDrink || id === recipe.idMeal)) {
          setBtnStartText('Continue Recipe');
        }
      }
    };
    isInProgress();
    const isRecipeFav = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes && favoriteRecipes.length > 0
        && (favoriteRecipes
          .some((f) => f.id === recipe.idDrink || f.id === recipe.idMeal))) {
        setIsFav(true);
        setFavImage(blackHeartIcon);
      }
    };
    isRecipeFav();
  }, [recipe]);

  const isStartButtonRendered = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) return true;
    const show = doneRecipes
      .some((r) => (r.id === recipe.idDrink || r.id === recipe.idMeal));
    return !show;
  };

  const btnShareClick = () => {
    copy(window.location.href);
    setBtnShareText('Link copied!');
  };

  const createNewFav = () => {
    let newFav = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    if (recipe.idMeal) {
      newFav = {
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    }

    return newFav;
  };

  const changeFavImage = () => {
    if (favImage === whiteHeartIcon) setFavImage(blackHeartIcon);
    else setFavImage(whiteHeartIcon);
  };

  const addToFavorites = (favoriteRecipes) => {
    const newFav = createNewFav();
    if (favoriteRecipes) {
      favoriteRecipes.push(newFav);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFav]));
    }
    setIsFav(true);
  };

  const removeFromFavorites = (favoriteRecipes) => {
    if (favoriteRecipes) {
      const newFavList = favoriteRecipes
        .filter((fav) => fav.id !== recipe.idDrink && fav.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
      setIsFav(false);
    }
  };

  const btnFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!isFav) addToFavorites(favoriteRecipes);
    else removeFromFavorites(favoriteRecipes);
    changeFavImage();
  };

  return (
    <div>
      {
        isStartButtonRendered()
      && (
        <Link
          to={ recipe.idMeal
            ? `/foods/${recipe.idMeal}/in-progress`
            : `/drinks/${recipe.idDrink}/in-progress` }
        >
          <button
            id="startRecipeBtn"
            type="button"
            data-testid="start-recipe-btn"
            className="fixed-bottom"
          >
            { btnStartText }
          </button>
        </Link>
      )
      }
      <button
        type="button"
        data-testid="favorite-btn"
        className="mb-5"
        onClick={ btnFavoriteClick }
        src={ favImage }
      >
        <img src={ favImage } alt="asd" />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        className="mb-5"
        onClick={ btnShareClick }
      >
        {btnShareText}
        {' '}
        <img src={ shareIcon } alt="asd" />
      </button>
    </div>
  );
}

export default DetailButtons;
