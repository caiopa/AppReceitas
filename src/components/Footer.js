import React from 'react';
import '../css/Footer.css';
// import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer" className="footerContainer">
      {/* <Link to="/bebidas">
        <img
          src="./images/drinkIcon.svg"
          alt="bebidas"
          data-testid="drinks-bottom-btn"
        />

      </Link> */}
      <img
        src="./images/drinkIcon.svg"
        alt="bebidas"
        data-testid="drinks-bottom-btn"
      />
      {/* <Link to="/comidas">
        <img
          rc="./images/drinkIcon.svg"
          alt="comidas"
          data-testid="food-bottom-btn"
        />

      </Link> */}
      <img
        src="./images/mealIcon.svg"
        alt="comidas"
        data-testid="food-bottom-btn"
      />
    </footer>
  );
}

export default Footer;
