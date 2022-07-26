import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';

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
    <div id="login-root">
      <form id="login-form">
        <input
          className='form-control login-form-items'
          type="text"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ handleChange }
        />
        <input
          className='login-form-items form-control login-input-color '
          type="password"
          name="password"
          placeholder="Password"
          data-testid="password-input"
          onChange={ handleChange }
        />
        <Link to="/foods">
          <button
            className='btn login-form-button'
            id="login-form-button"
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisable }
            onClick={ enterCLick }
          >
            Enter
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
