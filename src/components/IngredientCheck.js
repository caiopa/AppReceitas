import React from 'react';
import PropTypes from 'prop-types';

class IngredientCheck extends React.Component {
  state = {
    checks: [],
  }

  componentDidMount = () => {
    const { id, page, materials: { ingredients } } = this.props;
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    this.setChecks(progress[page][id], ingredients.length);
  }

  setChecks = (doneIngredients, ingredientsLength) => {
    if (doneIngredients.length === 0) {
      this.setState({ checks: new Array(ingredientsLength).fill(false) });
    } else {
      this.setState({ checks: this.ingredientsToBool(doneIngredients) });
    }
  }

  componentDidUpdate = () => {
    const { id, page, isFinishDisabled } = this.props;
    const { checks } = this.state;
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    progress[page][id] = this.boolToIngredients(checks);

    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));

    isFinishDisabled(checks);
  }

  ingredientsToBool = (list) => {
    const { materials: { ingredients } } = this.props;

    const boolArray = new Array(ingredients.length).fill(false);

    const ingredientsIndex = list.map((i) => ingredients.indexOf(i));
    ingredientsIndex.forEach((i) => {
      boolArray[i] = true;
    });
    return boolArray;
  }

  boolToIngredients = (checks) => {
    const { materials: { ingredients } } = this.props;

    const checkedIngredients = [];

    checks.forEach((c, i) => {
      if (c) {
        checkedIngredients.push(ingredients[i]);
      }
    });

    return checkedIngredients;
  }

  handleChecks = (i) => {
    const { checks: oldChecks } = this.state;
    const checks = [...oldChecks];
    checks[i] = !checks[i];
    this.setState({ checks });
  }

  render() {
    const { materials: { ingredients, measure } } = this.props;
    const { checks } = this.state;
    return (
      <ol>
        {ingredients.map((ing, i) => (
          <li
            key={ i }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              defaultChecked={ checks[i] || false }
              onChange={ () => this.handleChecks(i) }
              type="checkbox"
            />
            <span className={ checks[i] ? 'ingredient-done' : '' }>
              {measure[i] ? `${ing} (${measure[i]})` : ing}
            </span>
          </li>
        ))}
      </ol>
    );
  }
}

IngredientCheck.propTypes = {
  materials: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  isFinishDisabled: PropTypes.func.isRequired,
};

export default IngredientCheck;
