const fetchMealApi = async (type, value) => {
  switch (type) {
  case 'ingredients':
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  case 'name':
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  case 'id':
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  case 'initial':
    return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => data);
  case 'category':
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  case 'buttons':
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => data);
  default:
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
      .then((response) => response.json())
      .then((data) => data);
  }
};

export default fetchMealApi;
