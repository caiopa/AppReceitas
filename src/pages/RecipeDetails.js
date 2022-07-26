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
      if (path === 'foods') {
        const data = await fetchMealApi('id', id);
        setRecipe(data.meals[0]);
        setYoutubeID(data.meals[0].strYoutube.split('=')[1]);
      } else {
        const data = await fetchDrinkApi('id', id);
        setRecipe(data.drinks[0]);
      }
    };
    const getRecomends = async () => {
      const seis = 6;
      if (path === 'foods') {
        const data = await fetchDrinkApi('initial');
        setRecomends(data.drinks.slice(0, seis));
      } else {
        const data = await fetchMealApi('initial');
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
      className="details-recomend-card ml-3"
    >
      <h3 data-testid={ `${i}-recomendation-title` }>{rec.strDrink}</h3>
      <img src={ rec.strDrinkThumb } alt="" className="details-recomend-img" />
    </div>
  )
    : (
      <div
        key={ i }
        data-testid={ `${i}-recomendation-card` }
        className="details-recomend-card ml-3"
      >
        <p data-testid={ `${i}-recomendation-title` }>{rec.strMeal}</p>
        <img src={ rec.strMealThumb } alt="" className="details-recomend-img" />
      </div>
    )));

  return (
    type === 'foods'
      ? (
        <section>
          <h1 id="details-header">Details</h1>
          <div id="details-details">
            <h2 data-testid="recipe-title" id="details-title">{recipe.strMeal}</h2>
            <img
              className='recomend-img'
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt="meal thumbnail"
            />
            <p data-testid="recipe-category" >{recipe.strCategory}</p>
            {/* w3schools.com/html/html_youtube.asp */}
          </div>
          <div id="details-ingredients-box">
            <h2>Ingredients</h2>
            <Ingredients recipe={ recipe } />
          </div>
          <div id="details-instructions">
            <h2>Instructions</h2>
            <p data-testid="instructions" id="details-info">{recipe.strInstructions}</p>
          </div>
          <div id="details-video">
            <iframe
              data-testid="video"
              title={ `${recipe.strMeal} video` }
              src={ `https://www.youtube.com/embed/${youtubeID}` }
            />
          </div>
          <div id="details-carousel" >
            {
              buildCarousel()
            }
          </div>
          <DetailButtons />
        </section>
      )
      : (
        <section>
          <h1 id="details-header">Details</h1>
          <div id="details-details">
            <h2 data-testid="recipe-title" id="details-title">{recipe.strDrink}</h2>
            <img
              className='recomend-img'
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb }
              alt="meal thumbnail"
            />
            <p data-testid="recipe-category" >{recipe.strAlcoholic}</p>
            {/* w3schools.com/html/html_youtube.asp */}
          </div>
          <div id="details-ingredients-box">
            <h2>Ingredients</h2>
            <Ingredients recipe={ recipe } />
          </div>
          <div id="details-instructions">
            <h2>Instructions</h2>
            <p data-testid="instructions" id="details-info">{recipe.strInstructions}</p>
          </div>
          <div id="details-video">
            <iframe
              data-testid="video"
              title={ `${recipe.strDrink} video` }
              src={ `https://www.youtube.com/embed/${youtubeID}` }
            />
          </div>
          <div id="details-carousel" >
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
