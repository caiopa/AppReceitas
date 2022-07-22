import React from 'react';
import PropTypes from 'prop-types';
import DetailedCard from '../components/DetailedCard';
import fetchMealApi from '../API/fetchMealApi';
import fetchDrinkApi from '../API/fetchDrinkApi';

class RecipeInProgress extends React.Component {
  state = {
    page: '',
    recipe: [],
  }

  componentDidMount = () => {
    const { match: { url, params: { id } } } = this.props;
    const page = url.split('/')[1] === 'foods' ? 'meals' : 'cocktails';

    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!progress) {
      const inProgressRecipes = { meals: {}, cocktails: {} };
      inProgressRecipes[page][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else if (!progress[page][id]) {
      progress[page][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    }
    this.setRecipe(page, id);
  }

  setRecipe = async (page, id) => {
    if (page === 'meals') {
      const { meals: recipe } = await fetchMealApi('id', id);
      return this.setState({ page, recipe });
    }
    const { drinks: recipe } = await fetchDrinkApi('id', id);
    return this.setState({ page, recipe });
  }

  render() {
    const { page, recipe } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        {
          (recipe.length === 0)
            ? (<div>CARREGANDO</div>)
            : (<DetailedCard id={ id } page={ page } recipe={ recipe[0] } />)
        }
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeInProgress;
