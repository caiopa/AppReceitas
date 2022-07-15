import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const {
    vars:
    { email, isDisable },
    funcs:
    { setLogin },
  } = useContext(LoginContext);

  const handleChange = ({ target: { name, value } }) => {
    setLogin(name, value);
  };

  const enterCLick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <form className="d-flex flex-column align-items-center">
      <input
        type="text"
        name="email"
        placeholder="Email"
        data-testid="email-input"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        data-testid="password-input"
        onChange={ handleChange }
      />
      <Link to="/foods">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisable }
          onClick={ enterCLick }
        >
          Enter
        </button>
      </Link>
    </form>
  );
}

export default Login;
