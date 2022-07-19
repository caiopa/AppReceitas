import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { oneResult, moreResults, oneDrinkResult, moreDrinksResults, mealButtons, drinkButtons } from './mocks/fetchMock';

describe('testes do search bar', () => {
  it('um alerta é acionado caso first letter seja utilizado de maneira incorreta', () => {
    renderWithRouter(<Header title="Drinks" search />);

    global.alert = jest.fn(() => {
      console.log('esteja alertado meu parceiro');
    });

    const search = screen.getByRole('button', { name: /search_icon/i });

    userEvent.click(search);

    const firstLetter = screen.getByRole('radio', { name: /first letter/i });
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(textInput, 'teste');
    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  it('a API das meals é chamada corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
            return Promise.resolve(mealButtons);
          }
          return Promise.resolve(moreResults);
        }
      })
    );

    history.push('/foods');

    delete window.location
    window.location = new URL('http://localhost:3000/foods');

    await new Promise((r) => setTimeout(r, 500));

    const search = screen.getByRole('button', { name: /search_icon/i });

    userEvent.click(search);

    const firstLetter = screen.getByRole('radio', { name: /first letter/i });
    const ingredient = screen.getByRole('radio', { name: /ingredient/i });
    const name = screen.getByRole('radio', { name: /name/i });
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    const beef = screen.getByTestId('Beef-category-filter');

    userEvent.type(textInput, 'a');
    userEvent.click(ingredient);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=a');

    userEvent.click(name);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=a');

    userEvent.click(firstLetter);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');

    userEvent.click(beef);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  });
  it('um alerta é acionado se o retorno da API das meals é vazio', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
            return Promise.resolve(moreResults);
          }
          if (endpoint === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
            return Promise.resolve(mealButtons);
          }
          return Promise.resolve({ meals: null });
        }
      })
    );

    global.alert = jest.fn(() => {
      console.log('esteja alertado meu parça');
    });

    history.push('/foods');

    delete window.location
    window.location = new URL('http://localhost:3000/foods');

    const search = screen.getByRole('button', { name: /search_icon/i });

    userEvent.click(search);

    const name = screen.getByRole('radio', { name: /name/i });
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(textInput, 'a');
    userEvent.click(name);
    userEvent.click(searchButton);

    await new Promise((r) => setTimeout(r, 500));

    expect(global.alert).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters.");
  });
  it('é redirecionado para a pagina de detalhes se a API meals retornar somente uma receita', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneResult),
      })
    );

    history.push('/foods');

    delete window.location
    window.location = new URL('http://localhost:3000/foods');

    const search = screen.getByRole('button', { name: /search_icon/i });

    userEvent.click(search);

    const name = screen.getByRole('radio', { name: /name/i });
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(textInput, 'a');
    userEvent.click(name);
    userEvent.click(searchButton);

    await new Promise((r) => setTimeout(r, 500));

    expect(window.location.pathname).toBe('/foods/52767');

    history.push(window.location.pathname);

    const detalhe = screen.getByText(/pagina de detalhe do meal\.\.\.\./i);

    expect(detalhe).toBeInTheDocument();

  })
  it('a API dos drinks é chamada corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
            return Promise.resolve(drinkButtons);
          }
          return Promise.resolve(moreDrinksResults);
        }
      })
    );

    history.push('/drinks');

    delete window.location
    window.location = new URL('http://localhost:3000/drinks');

    await new Promise((r) => setTimeout(r, 500));

    const search = screen.getByRole('button', { name: /search_icon/i });

    userEvent.click(search);

    const firstLetter = screen.getByRole('radio', { name: /first letter/i });
    const ingredient = screen.getByRole('radio', { name: /ingredient/i });
    const name = screen.getByRole('radio', { name: /name/i });
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    const cocoa = screen.getByTestId('Cocoa-category-filter');

    userEvent.type(textInput, 'a');
    userEvent.click(ingredient);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=a');

    userEvent.click(name);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a');

    userEvent.click(firstLetter);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');

    userEvent.click(cocoa);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa');
  });
  it('um alerta é acionado se o retorno da API dos drinks é vazio', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn((endpoint) =>
      Promise.resolve({
        json: () => {
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
            return Promise.resolve(moreDrinksResults);
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
            return Promise.resolve(drinkButtons);
          }
          return Promise.resolve({ drinks: null });
        }
      })
    );

    global.alert = jest.fn(() => {
      console.log('esteja alertado meu parça');
    });

    history.push('/drinks');

    delete window.location
    window.location = new URL('http://localhost:3000/drinks');

    const search = screen.getByRole('button', { name: /search_icon/i });

    userEvent.click(search);

    const name = screen.getByRole('radio', { name: /name/i });
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(textInput, 'a');
    userEvent.click(name);
    userEvent.click(searchButton);

    await new Promise((r) => setTimeout(r, 500));

    expect(global.alert).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters.");
  });
  it('é redirecionado para a pagina de detalhes se a API drinks retornar somente uma receita', async () => {
    const { history } = renderWithRouter(<App />);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneDrinkResult),
      })
    );

    history.push('/drinks');

    delete window.location
    window.location = new URL('http://localhost:3000/drinks');

    const search = screen.getByRole('button', { name: /search_icon/i });

    userEvent.click(search);

    const name = screen.getByRole('radio', { name: /name/i });
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(textInput, 'a');
    userEvent.click(name);
    userEvent.click(searchButton);

    await new Promise((r) => setTimeout(r, 500));

    expect(window.location.pathname).toBe('/drinks/52767');

    history.push(window.location.pathname);

    const detalhe = screen.getByText(/pagina de detalhe do drink\.\.\.\./i);

    expect(detalhe).toBeInTheDocument();

  })

})