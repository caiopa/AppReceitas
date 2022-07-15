import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter';

const btnDrinks = screen.getByTestId('drinks-bottom-btn');
const btnMeal = screen.getByTestId('food-bottom-btn');

describe('Testando o componente Footer', () => {
  test('Verificar se o Footer contem os icones corretos', () => {
    renderWithRouter(<Footer />);

    expect(btnDrinks).toBeInTheDocument();
    expect(btnMeal).toBeInTheDocument();
  });

  test('Verifique se ao clicar no btn drink leva para pagina de bebidas', () => {
    const { history } = renderWithRouter(<Footer />);

    userEvent.click(btnDrinks);

    expect(history.location.pathname).toBe('/bebidas');
  });
  test('Verifique se ao clicar no btn Food leva para pagina de comidas', () => {
    const { history } = renderWithRouter(<Footer />);

    userEvent.click(btnMeal);

    expect(history.location.pathname).toBe('/comidas');
  });
});
