import React from 'react';
import Header from '../components/Header';
import ButtonFilter from '../components/ButtonFilter';
import DoneCard from '../components/DoneCard';

class DoneRecipe extends React.Component {
  state = {
    recipes: [],
  }

  componentDidMount = () => {
    this.resetRecipes();
  }

  resetRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes !== null) this.setState({ recipes });
  }

  handleFilterClick = (type) => {
    let recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (type === 'all') return this.resetRecipes();
    recipes = recipes.filter((r) => r.type === type);
    this.setState({ recipes });
  }

  render() {
    const { recipes } = this.state;
    return (
      <div>
        <Header title="Done Recipes" />
        <ButtonFilter onClick={ this.handleFilterClick } />
        {recipes.length > 0
          ? recipes.map((recipe, i) => (
            <DoneCard key={ i } index={ i } recipe={ recipe } />
          ))
          : (<div>No Results</div>)}
      </div>
    );
  }
}

export default DoneRecipe;
