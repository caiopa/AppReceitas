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
          <div key={ receita.name } id="favorites-card">
            <Link
              to={ verificarTipo(receita) === false
                ? `/drinks/${receita.id}`
                : `/foods/${receita.id}` }
            >
              <h2 data-testid={ `${i}-horizontal-name` }>
                {receita.name}
              </h2>
            </Link>
            <Link
              to={ verificarTipo(receita) === false
                ? `/drinks/${receita.id}`
                : `/foods/${receita.id}` }
            >
              <img
                className='recomend-img'
                src={ receita.image }
                alt="receita"
                data-testid={ `${i}-horizontal-image` }
              />
            </Link>
            <h4
              data-testid={ `${i}-horizontal-top-text` }
            >
              { receita.type === 'food' ? `${receita.nationality} - ${receita.category}` : receita.category}
            </h4>
            <p
              data-testid={ `${i}-horizontal-top-text` }
            >
              { (receita.alcoholicOrNot) ? receita.alcoholicOrNot : null }
            </p>
            <div id="favorites-buttons">
              <input
                className='btn details-buttons'
                type="image"
                src={ blackHeartIcon }
                alt="favIcon"
                onClick={ () => handleClick(receita.id) }
                data-testid={ `${i}-horizontal-favorite-btn` }
              />
              <input
                className='btn details-buttons'
                type="image"
                src={ shareIcon }
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ () => btnShareClick((receita.type === 'food')
                  ? 'foods' : 'drinks', receita.id) }
                alt="searchIcon"
              />
            </div>
          </div>))
      }
    </div>
  );
}

export default FavoriteRecipes;
