import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const objMeal = {
  meals: [
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strCategory: 'Vegetarian',
      strArea: 'Italian',
      strInstructions:
        'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      strTags: 'Pasta,Curry',
      strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
      strIngredient1: 'penne rigate',
      strIngredient2: 'olive oil',
      strIngredient3: 'garlic',
      strIngredient4: 'chopped tomatoes',
      strIngredient5: 'red chile flakes',
      strIngredient6: 'italian seasoning',
      strIngredient7: 'basil',
      strIngredient8: 'Parmigiano-Reggiano',
      strIngredient9: '',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: null,
      strIngredient17: null,
      strIngredient18: null,
      strIngredient19: null,
      strIngredient20: null,
      strMeasure1: '1 pound',
      strMeasure2: '1/4 cup',
      strMeasure3: '3 cloves',
      strMeasure4: '1 tin ',
      strMeasure5: '1/2 teaspoon',
      strMeasure6: '1/2 teaspoon',
      strMeasure7: '6 leaves',
      strMeasure8: 'spinkling',
      strMeasure9: '',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
    },
  ],
};

const objDrink = {
  drinks: [
    {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strTags: null,
      strCategory: 'Cocktail',
      strAlcoholic: 'Alcoholic',
      strGlass: 'Martini Glass',
      strInstructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Hpnotiq',
      strIngredient2: 'Pineapple Juice',
      strIngredient3: 'Banana Liqueur',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 oz',
      strMeasure2: '1 oz',
      strMeasure3: '1 oz',
      strMeasure4: '',
      strMeasure5: '',
      strMeasure6: '',
      strMeasure7: '',
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
    },
  ],
};

const recomendedDrinks = {
  drinks: [
    {
      idDrink: "15997",
      strDrink: "GG",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
    },
    {
      idDrink: "17222",
      strDrink: "A1",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
    },
    {
      idDrink: "13501",
      strDrink: "ABC",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg",
    },
    {
      idDrink: "17203",
      strDrink: "Kir",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg",
    },
    {
      idDrink: "14229",
      strDrink: "747",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg",
    },
    {
      idDrink: "15288",
      strDrink: "252",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg",
    }
  ],
}

const recomendedMeals = {
  meals: [
    {
      idMeal: "52977",
      strMeal: "Corba",
      strMealThumb: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
    },
    {
      idMeal: "53060",
      strMeal: "Burek",
      strMealThumb: "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
    },
    {
      idMeal: "52978",
      strMeal: "Kumpir",
      strMealThumb: "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
    },
    {
      idMeal: "53026",
      strMeal: "Tamiya",
      strMealThumb: "https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg",
    },
    {
      idMeal: "52785",
      strMeal: "Dal fry",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
    },
    {
      idMeal: "52804",
      strMeal: "Poutine",
      strMealThumb: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
    }
  ],
}

describe('Testa a página de RecipeDetails', () => {
  describe('Testa a página de RecipeDetails caso comida (meal)', () => {
    beforeEach(() => {
      const { history } = renderWithRouter(<App />);

      history.push('foods/52771');

      delete window.location;
      window.location = new URL('http://localhost:3000/foods/52771');

      global.fetch = jest.fn((endpoint) =>
        Promise.resolve({
          json: () => {
            if (endpoint === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
              return Promise.resolve(objMeal);
            }
            if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
              return Promise.resolve(objDrink);
            }
            if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
              return Promise.resolve(recomendedDrinks);
            }
            if (endpoint === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
              return Promise.resolve(recomendedMeals);
            }
          },
        })
      );
    });

    it('verifica se os campos estão presentes e populados', async () => {
      await new Promise((r) => setTimeout(r, 500));
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
      expect(await screen.findByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /meal thumbnail/i })).toBeInTheDocument();
      expect(screen.getByText(/vegetarian/i)).toBeInTheDocument();
      expect(screen.getByText(/ingredients:/i)).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getAllByRole('img')).toHaveLength(9);
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
    }),

    it('testa funcionalidade add do botão "Favorite"', async () => {
      await new Promise((r) => setTimeout(r, 500));

      const btnFavorite = screen.getByTestId('favorite-btn');
      expect(btnFavorite.getAttribute('src')).toContain('whiteHeartIcon');
      userEvent.click(btnFavorite);
      const favorites = localStorage.getItem('favoriteRecipes');
      expect(favorites).toContain(
        '{"id":"52771","type":"food","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"}'
      );
      expect(btnFavorite.getAttribute('src')).toContain('blackHeartIcon');
    }),

    it('testa funcionalidade remove do botão "Favorite"', async () => {
      await new Promise((r) => setTimeout(r, 500));

      const btnFavorite = screen.getByTestId('favorite-btn');
      expect(btnFavorite.getAttribute('src')).toContain('blackHeartIcon');
      userEvent.click(btnFavorite);
      const favorites = localStorage.getItem('favoriteRecipes');
      expect(favorites).toContain('[]');
      expect(btnFavorite.getAttribute('src')).toContain('whiteHeartIcon');
    });
  });

  describe('Testa a página de RecipeDetails caso bebida (drink)', () => {
    beforeEach(() => {
      const { history } = renderWithRouter(<App />);

      history.push('drinks/178319');

      delete window.location;
      window.location = new URL('http://localhost:3000/drinks/178319');

      global.fetch = jest.fn((endpoint) =>
        Promise.resolve({
          json: () => {
            if (endpoint === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
              return Promise.resolve(objMeal);
            }
            if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
              return Promise.resolve(objDrink);
            }
            if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
              return Promise.resolve(recomendedDrinks);
            }
            if (endpoint === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
              return Promise.resolve(recomendedMeals);
            }
          },
        })
      );
    });

    it('verifica se os campos estão presentes e populados', async () => {
      await new Promise((r) => setTimeout(r, 500));

      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
      expect(await screen.findByRole('heading', { name: /aquamarine/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /drink thumbnail/i })).toBeInTheDocument();
      expect(screen.getByText(/alcoholic/i)).toBeInTheDocument();
      expect(screen.getByText(/ingredients:/i)).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getAllByRole('img')).toHaveLength(9);
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
    }),
      it('testa funcionalidade add do botão "Favorite"', async () => {
        await new Promise((r) => setTimeout(r, 500));

        const btnFavorite = screen.getByTestId('favorite-btn');
        expect(btnFavorite.getAttribute('src')).toContain('whiteHeartIcon');
        userEvent.click(btnFavorite);
        const favorites = localStorage.getItem('favoriteRecipes');
        expect(favorites).toContain(
            "[{\"id\":\"178319\",\"type\":\"drink\",\"nationality\":\"\",\"category\":\"Cocktail\",\"alcoholicOrNot\":\"Alcoholic\",\"name\":\"Aquamarine\",\"image\":\"https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg\"}]"
        );
        expect(btnFavorite.getAttribute('src')).toContain('blackHeartIcon');
      }),
      it('testa funcionalidade remove do botão "Favorite"', async () => {
        await new Promise((r) => setTimeout(r, 500));

        const btnFavorite = screen.getByTestId('favorite-btn');
        expect(btnFavorite.getAttribute('src')).toContain('blackHeartIcon');
        userEvent.click(btnFavorite);
        const favorites = localStorage.getItem('favoriteRecipes');
        expect(favorites).toContain('[]');
        expect(btnFavorite.getAttribute('src')).toContain('whiteHeartIcon');
      });
  });
});
