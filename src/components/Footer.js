import React from 'react';
// import '../css/Footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import foodIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footerContainer">

      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="bebidas"
          data-testid="drinks-bottom-btn"
        />

      </Link>
      {' '}
      */

      <Link to="/foods">
        <img
          src={ foodIcon }
          alt="comidas"
          data-testid="food-bottom-btn"
        />

      </Link>
      {' '}
      */

    </footer>
  );
}

export default Footer;
