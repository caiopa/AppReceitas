import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ingredients from '../components/Ingredients';
import DetailButtons from '../components/DetailButtons';
import LoginContext from '../Context/LoginContext';
import fetchMealApi from '../API/fetchMealApi';
import fetchDrinkApi from '../API/fetchDrinkApi';

function RecipeDetails() {
  const [type, setType] = useState('');
  // const [recipe, setRecipe] = useState({});
  const [youtubeID, setYoutubeID] = useState('');
  const [recomends, setRecomends] = useState([]);

  const { vars: { recipe }, funcs: { setRecipe } } = useContext(LoginContext);

  useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    setType(path);
    const id = window.location.pathname.split('/')[2];

    const getRecipe = async () => {
      let data = {};
      if (path === 'foods') {
        // const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`); // 'id'
        // data = await promise.json();
        console.log('foods');
        data = await fetchMealApi('id', id);
        setRecipe(data.meals[0]);
        setYoutubeID(data.meals[0].strYoutube.split('=')[1]);
      } else {
        // const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        // data = await promise.json();
        console.log('drinks');
        data = await fetchDrinkApi('id', id);
        setRecipe(data.drinks[0]);
      }
    };
    const getRecomends = async () => {
      const seis = 6;
      let data = {};
      if (path === 'foods') {
        // const promise = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='); // 'initial'
        // data = await promise.json();
        data = await fetchDrinkApi('initial');
        setRecomends(data.drinks.slice(0, seis));
      } else {
        // const promise = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        // data = await promise.json();
        data = await fetchMealApi('initial');
        setRecomends(data.meals.slice(0, seis));
      }
    };
    getRecipe();
    getRecomends();
  }, [setRecipe]);

  const buildCarousel = (food = true) => recomends.map((rec, i) => (food ? (
    <div
      key={ i }
      data-testid={ `${i}-recomendation-card` }
    >
      <p data-testid={ `${i}-recomendation-title` }>{rec.strDrink}</p>
      <img src={ rec.strDrinkThumb } alt="" className="recomend-img" />
    </div>
  )
    : (
      <div
        key={ i }
        data-testid={ `${i}-recomendation-card` }
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
              height={ 100 }
              className="w-10 0"
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt="meal thumbnail"
            />
          </div>
          <div>
            <p data-testid="recipe-category">{recipe.strCategory}</p>
            <Ingredients recipe={ recipe } />
            <p data-testid="instructions">{recipe.strInstructions}</p>
            {/* w3schools.com/html/html_youtube.asp */}
            <iframe
              data-testid="video"
              title={ `${recipe.strMeal} video` }
              src={ `https://www.youtube.com/embed/${youtubeID}` }
              className="w-100"
            />
          </div>
          <div className="d-flex scroll-menu">
            {
              buildCarousel()
            }
          </div>
          <DetailButtons />
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
            <Ingredients recipe={ recipe } />
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
          <div className="d-flex scroll-menu">
            {
              buildCarousel(false)
            }
          </div>
          <DetailButtons />
        </section>
      )
  );
}

export default RecipeDetails;
