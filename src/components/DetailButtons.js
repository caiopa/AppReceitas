import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';

function DetailButtons() {
  const [buttonText, setButtonText] = useState('Start Recipe');
  const { vars: { recipe } } = useContext(LoginContext);

  useEffect(() => {
    const isInProgress = () => {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (progress) {
        const listaIDs = [];
        Object.values(progress).forEach((v) => Object.keys(v)
          .forEach((k) => listaIDs.push(k)));
        if (listaIDs.some((id) => id === recipe.idDrink || recipe.idMeal)) {
          setButtonText('Continue Recipe');
        }
      }
    };
    isInProgress();
  }, [recipe]);

  const isStartButtonRendered = () => {
    const lista = JSON.parse(localStorage.getItem('doneRecipes'));
    if (lista === null) return true;
    const show = lista
      .some((r) => (r.id === recipe.idDrink || recipe.idMeal));
    return show;
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
            { buttonText }
          </button>
        </Link>
      )
      }
      <button
        type="button"
        data-testid="share-btn"
        className="mb-5"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        className="mb-5"
      >
        favoritar
      </button>
    </div>
  );
}

export default DetailButtons;
