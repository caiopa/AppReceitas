import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonFilter from '../components/ButtonFilter';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [recipe, setRecipe] = useState([]);
  const [btnShareText, setBtnShareText] = useState(null);

  useEffect(() => {
    setRecipe(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const removeFromFavorites = (id) => {
    const newFavList = receitasFavoritas
      .filter((favo) => favo.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
    setRecipe(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const handleClick = (id) => {
    removeFromFavorites(id);
  };

  const btnShareClick = (page, id) => {
    copy(window.location.href.replace('/favorite-recipes', `/${page}/${id}`));
    setBtnShareText('Link copied!');
  };

  // console.log(receitasFavoritas);

  const verificarTipo = (receita) => {
    if (receita.type === 'drink') {
      const { pathname } = window.location;
      const drinks = pathname === '/drinks';
      return drinks;
    }
  };

  const changeCategory = (receita) => {
    const receitas = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (receita === 'food') {
      const foods = receitas.filter((x) => x.type === 'food');
      return setRecipe(foods);
    }
    if (receita === 'drink') {
      const drinks = receitas.filter((x) => x.type === 'drink');
      return setRecipe(drinks);
    }
    return setRecipe(receitas);
  };
  return (
    <div>
      <ButtonFilter onClick={ changeCategory } />
      {
        recipe && recipe.map((receita, i) => (
          <div key={ receita.name }>
            <Link
              to={ verificarTipo(receita) === false
                ? `/drinks/${receita.id}`
                : `/foods/${receita.id}` }
            >
              <p data-testid={ `${i}-horizontal-name` }>
                {receita.name}
              </p>
            </Link>
            <p
              data-testid={ `${i}-horizontal-top-text` }
            >
              {receita.nationality}
              {' '}
              -
              {' '}
              {receita.category}
            </p>
            <p
              data-testid={ `${i}-horizontal-top-text` }
            >
              { (receita.alcoholicOrNot) ? receita.alcoholicOrNot : null }

            </p>
            <Link
              to={ verificarTipo(receita) === false
                ? `/drinks/${receita.id}`
                : `/foods/${receita.id}` }
            >
              <img
                src={ receita.image }
                alt="receita"
                width={ 150 }
                height={ 150 }
                data-testid={ `${i}-horizontal-image` }
              />
            </Link>

            <input
              type="image"
              src={ blackHeartIcon }
              alt="favIcon"
              onClick={ () => handleClick(receita.id) }
              data-testid={ `${i}-horizontal-favorite-btn` }
            />

            <input
              type="image"
              src={ shareIcon }
              data-testid={ `${i}-horizontal-share-btn` }
              onClick={ () => btnShareClick((receita.type === 'food')
                ? 'foods' : 'drinks', receita.id) }
              alt="searchIcon"

            />
            {btnShareText}

          </div>))
      }
    </div>
  );
}

export default FavoriteRecipes;
