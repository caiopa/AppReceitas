import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardList extends React.Component {
  render() {
    const { results } = this.props;
    const cards = results.map((recipe, index) => (
      <Card key={ index } recipe={ recipe } index={ index } />));
    return results.length > 0 ? cards : null;
  }
}

CardList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default CardList;
