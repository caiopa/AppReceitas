import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import foodIcon from '../images/mealIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">

      <Link to="/drinks">
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
