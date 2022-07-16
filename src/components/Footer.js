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
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="bebidas"

        />

      </Link>
      {' '}

      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          src={ foodIcon }
          alt="comidas"

        />

      </Link>

    </footer>
  );
}

export default Footer;
