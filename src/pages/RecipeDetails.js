import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeDetails() {
  const [type, setType] = useState('');
  const [recipe, setRecipe] = useState({});
  const [youtubeID, setYoutubeID] = useState('');
  const [recomends, setsetRecomends] = useState([]);

  useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    setType(path);
    const id = window.location.pathname.split('/')[2];

    const getRecipe = async () => {
      let data = {};
      if (path === 'foods') {
        const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        data = await promise.json();
        setRecipe(data.meals[0]);
        setYoutubeID(data.meals[0].strYoutube.split('=')[1]);
      } else {
        const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        data = await promise.json();
        setRecipe(data.drinks[0]);
      }
    };
    const getRecomends = async () => {
      const seis = 6;
      let data = {};
      if (path === 'foods') {
        const promise = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        data = await promise.json();
        setsetRecomends(data.drinks.slice(0, seis));
      } else {
        const promise = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        data = await promise.json();
        setsetRecomends(data.meals.slice(0, seis));
      }
    };
    getRecipe();
    getRecomends();
  }, []);

  const ings = Object.entries(recipe).filter((f) => f[0].includes('strIngredient'))
    .filter((m) => m[1] !== '' && m[1] !== null);
  const measures = Object.entries(recipe).filter((f) => f[0].includes('strMeasure'))
    .filter((m) => m[1] !== '' && m[1] !== null);

  const ingredientsBuilder = (ing, index) => (
    <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
      {`${ing[1]} (${measures[index][1]}) `}
    </li>
  );

  const buildCarousel = (food = true) => recomends.map((rec, i) => (food ? (
    <div
      key={ i }
      data-testid={ `${i}-recomendation-card` }
      className="mr-3 mb-3"
    >
      <p data-testid={ `${i}-recomendation-title` }>{rec.strDrink}</p>
      <img src={ rec.strDrinkThumb } alt="" className="recomend-img" />
    </div>
  )
    : (
      <div
        key={ i }
        data-testid={ `${i}-recomendation-card` }
        className="mr-3 mb-3"
      >
        <p data-testid={ `${i}-recomendation-title` }>{rec.strMeal}</p>
        <img src={ rec.strMealThumb } alt="" className="recomend-img" />
      </div>
    )));

  return (
    type === 'foods'
      ? (
        <section>
          <h2>FOODS</h2>
          <div>
            <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
            <img
              className="w-100"
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt="meal thumbnail"
            />
          </div>
          <div>
            <p data-testid="recipe-category">{recipe.strCategory}</p>
            <label htmlFor="ingsList">
              Ingredients:
              <ul id="ingsList">
                {ings.map((m, i) => ingredientsBuilder(m, i))}
              </ul>
            </label>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            {/* w3schools.com/html/html_youtube.asp */}
            <iframe
              data-testid="video"
              title={ `${recipe.strMeal} video` }
              src={ `https://www.youtube.com/embed/${youtubeID}` }
            />
          </div>
          <div className="d-flex">
            {
              buildCarousel()
            }
          </div>
        </section>
      )
      : (
        <section>
          <h2>DRINKS</h2>
          <div>
            <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
            <img
              className="w-75"
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb }
              alt="drink thumbnail"
            />
          </div>
          <div>
            <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
            <label htmlFor="ingsList">
              Ingredients:
              <ul id="ingsList">
                {ings.map((m, i) => ingredientsBuilder(m, i))}
              </ul>
            </label>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
          <div className="d-flex scroll-menu">
            {
              buildCarousel(false)
            }
          </div>
        </section>
      )
  );
}

export default RecipeDetails;
