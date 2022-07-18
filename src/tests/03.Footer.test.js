import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando o componente Footer', () => {
  it('Verificar se o Footer contem os icones corretos', () => {
    renderWithRouter(<Footer />);

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    const btnMeal = screen.getByTestId('food-bottom-btn');

    expect(btnDrinks).toBeInTheDocument();
    expect(btnMeal).toBeInTheDocument();
  });
  it('Verifique se ao clicar no btn drink leva para pagina de bebidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(btnDrinks);

    expect(history.location.pathname).toBe('/drinks');
  });
  it('Verifique se ao clicar no btn Food leva para pagina de comidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const btnMeal = screen.getByTestId('food-bottom-btn');

    userEvent.click(btnMeal);

    expect(history.location.pathname).toBe('/foods');
  });
});
