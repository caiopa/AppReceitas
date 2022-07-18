import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CardList from '../components/CardList';

const MAXCARDS = 12;

function Recipes(props) {
  const [results, setColumn] = useState([]);
  const { page } = props;
  return (
    <section className="main-container">
      <Header
        title={ page }
        search
        callback={ setColumn }
      />
      <CardList results={ results.filter((recipe, index) => index < MAXCARDS) } />
      <p>pagina de comidas....</p>
    </section>
  );
}

Recipes.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Recipes;
