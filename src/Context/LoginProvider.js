import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [type, setType] = useState('');
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
  // https://stackoverflow.com/posts/9204568/revisions
    const checkEmail = () => {
      let isTrue = false;
      if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) isTrue = true;

      return isTrue;
    };

    const checkPassword = () => {
      const six = 6;
      return password.length > six;
    };

    const checkForm = () => {
      if (checkEmail() && checkPassword()) {
        setIsDisable(false);
      } else setIsDisable(true);
    };
    checkForm();
  }, [email, password]);

  const setLogin = (name, value) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    default:
      setPassword(value);
      break;
    }
  };

  const vars = {
    email,
    password,
    isDisable,
    type,
    recipe,
  };

  const funcs = {
    setLogin,
    setIsDisable,
    setType,
    setRecipe,
  };

  return (
    <LoginContext.Provider value={ { vars, funcs } }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
