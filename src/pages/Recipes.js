import React, { useState } from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import 'bootstrap/dist/css/bootstrap.min.css';

function Recipes() {
  const [results, setColumn] = useState([]);
  return (
    <section className="main-container">
      <Header title="Foods" search callback={ setColumn } />
      <CardList results={ results } />
      <p>pagina de comidas....</p>
    </section>
  );
}

export default Recipes;
