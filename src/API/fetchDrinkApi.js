const fetchDrinkApi = async (type, value) => {
  switch (type) {
  case 'ingredients':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  case 'name':
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  // case 'id':
  //   return fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`)
  //     .then((response) => response.json())
  //     .then((data) => data);
  default:
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  }
};

export default fetchDrinkApi;
