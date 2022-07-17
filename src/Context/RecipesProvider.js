// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import RecipesContext from './RecipesContext';

// function RecipesProvider({ children }) {
//   const [foodList, setFoodList] = useState([]);
//   const [drinkList, setDrinkList] = useState([]);

//   const vars = {
//     foodList,
//     drinkList,
//   };

//   const funcs = {
//     setFoodList,
//     setDrinkList,
//   };

//   return (
//     <RecipesContext.Provider value={ { vars, funcs } }>
//       {children}
//     </RecipesContext.Provider>
//   );
// }

// RecipesProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default RecipesProvider;
