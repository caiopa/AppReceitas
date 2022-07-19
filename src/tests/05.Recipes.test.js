import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { oneResult, moreResults, oneDrinkResult, moreDrinksResults, mealButtons, drinkButtons } from './mocks/fetchMock';

describe('testes do componente Recipes', () => {
  it('o botão All funciona corretamente', async () => {
    const { history } = renderWithRouter(<App />)

    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
            return Promise.resolve(mealButtons);
          }
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') {
            return Promise.resolve(oneResult);
          }
          return Promise.resolve(moreResults);
        }
      })
    );

    history.push('/foods');

    const goat = await screen.findByTestId('Goat-category-filter');
    const allButton = screen.getByTestId('All-category-filter');

    userEvent.click(goat);

    let firstRecipe = await screen.findByTestId('0-recipe-card');
    let lastRecipe = screen.queryByTestId('11-recipe-card');

    expect(firstRecipe).toBeInTheDocument();
    expect(lastRecipe).toBeNull();

    userEvent.click(allButton);

    firstRecipe = await screen.findByTestId('0-recipe-card');
    lastRecipe = screen.getByTestId('11-recipe-card');

    expect(firstRecipe).toBeInTheDocument();
    expect(lastRecipe).toBeInTheDocument();
  })
  it('se um botão de categoria for clicado duas vezes a pagina renderiza as receitas iniciais', async () => {
    const { history } = renderWithRouter(<App />)

    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
            return Promise.resolve(mealButtons);
          }
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') {
            return Promise.resolve(oneResult);
          }
          return Promise.resolve(moreResults);
        }
      })
    );

    history.push('/foods');

    const goat = await screen.findByTestId('Goat-category-filter');

    userEvent.click(goat);

    let firstRecipe = await screen.findByTestId('0-recipe-card');
    let lastRecipe = screen.queryByTestId('11-recipe-card');

    expect(firstRecipe).toBeInTheDocument();
    expect(lastRecipe).toBeNull();

    userEvent.click(goat);

    firstRecipe = await screen.findByTestId('0-recipe-card');
    lastRecipe = screen.getByTestId('11-recipe-card');

    expect(firstRecipe).toBeInTheDocument();
    expect(lastRecipe).toBeInTheDocument();
  })
})