import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CardList from '../components/CardList';
import fetchMealApi from '../API/fetchMealApi';
import fetchDrinkApi from '../API/fetchDrinkApi';

const MAXCARDS = 12;
const MAXBUTTONS = 5;

function Recipes(props) {
  const [currentFilter, setFilter] = useState('');
  const [results, setResults] = useState([]);
  const [defaultResults, setDefault] = useState([]);
  const [defaultButtons, setButtons] = useState([]);

  const { page } = props;

  useEffect(() => {
    const setPage = async () => {
      if (page === 'Foods') {
        const { meals } = await fetchMealApi('initial');
        setDefault(meals.filter((r, i) => i < MAXCARDS));
        const { meals: buttons } = await fetchMealApi('buttons');
        setButtons(buttons.map((b) => b.strCategory).filter((b, i) => i < MAXBUTTONS));
      } else {
        const { drinks } = await fetchDrinkApi('initial');
        setDefault(drinks.filter((r, i) => i < MAXCARDS));
        const { drinks: buttons } = await fetchDrinkApi('buttons');
        setButtons(buttons.map((b) => b.strCategory).filter((b, i) => i < MAXBUTTONS));
      }
    };
    setPage();
  }, [page]);

  const handleAllClick = () => {
    setResults(defaultResults);
    setFilter('');
  };

  const setCategory = async (name) => {
    if (page === 'Foods') {
      const { meals } = await fetchMealApi('category', name);
      setResults(meals.filter((r, i) => i < MAXCARDS));
    } else {
      const { drinks } = await fetchDrinkApi('category', name);
      setResults(drinks.filter((r, i) => i < MAXCARDS));
    }
  };

  const handleCategoryClick = (name) => {
    if (currentFilter === name) {
      setResults(defaultResults);
      setFilter('');
    } else {
      setCategory(name);
      setFilter(name);
    }
  };

  const categoryButtons = (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleAllClick }
      >
        All
      </button>
      {
        defaultButtons.map((b) => (
          <button
            type="button"
            data-testid={ `${b}-category-filter` }
            key={ b }
            name={ b }
            onClick={ () => handleCategoryClick(b) }
          >
            {b}
          </button>))
      }
    </div>
  );

  return (
    <section className="main-container">
      <Header
        title={ page }
        search
        callback={ setResults }
      />
      {categoryButtons}
      <CardList
        results={
          results.length > 0 ? results.filter((r, i) => i < MAXCARDS)
            : defaultResults
        }
      />
      <p>pagina de comidas....</p>
    </section>
  );
}

Recipes.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Recipes;
