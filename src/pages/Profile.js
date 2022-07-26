import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

function Profile() {
  const defEmail = 'email@mail.com';
  const email = (localStorage.getItem('user') !== null)
    ? JSON.parse(localStorage.getItem('user')).email : defEmail;

  const history = useHistory();
  const handleInputCick = (e) => {
    const targetName = e.target.name;
    console.log(targetName);
    if (targetName === 'done') { history.push('/done-recipes'); }
    if (targetName === 'favorites') { history.push('/favorite-recipes'); }
    if (targetName === 'logout') {
      localStorage.clear();
      history.push('/');
    }
  };

  return (
    <div id="profile-box">
      <p data-testid="profile-email" id="profile-email">
        { `Email: ${email}` }
      </p>
      <button
        className='btn details-buttons'
        type="button"
        data-testid="profile-done-btn"
        name="done"
        onClick={ (e) => handleInputCick(e) }
      >
        Done Recipes
      </button>
      <button
        className='btn mt-3 details-buttons'
        name="favorites"
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ (e) => handleInputCick(e) }
      >
        Favorite Recipes
      </button>
      <button
        className='btn mt-3 details-buttons'
        name="logout"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ (e) => handleInputCick(e) }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
