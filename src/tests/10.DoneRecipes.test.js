import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './helpers/renderWithRouter';
import { oneResult, oneDrinkResult } from './mocks/fetchMock';
import { doneRecipesList } from './mocks/localStorageMock';

describe('testesd da pagina done', () => {
  it('a pagina done renderiza uma mensagem No Results quando vazia', () => {
    renderWithRouter(<DoneRecipes />);
    
    const message = screen.getByText(/no results/i);

    expect(message).toBeInTheDocument();
  })
  it('os filtros funcionam corretamente', () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesList));

    renderWithRouter(<DoneRecipes />);

    const all = screen.getByTestId('filter-by-all-btn')
    const foods = screen.getByTestId('filter-by-food-btn')
    const drinks = screen.getByTestId('filter-by-drink-btn')

    userEvent.click(foods);

    let burek = screen.getByText(/burek/i)
    let kumpir = screen.getByText(/kumpir/i)
    let atet = screen.queryByText(/at&t/i)

    expect(burek).toBeInTheDocument()
    expect(kumpir).toBeInTheDocument()
    expect(atet).toBeNull()

    userEvent.click(drinks);

    burek = screen.queryByText(/burek/i)
    kumpir = screen.queryByText(/kumpir/i)
    atet = screen.getByText(/at&t/i)

    expect(burek).toBeNull()
    expect(kumpir).toBeNull()
    expect(atet).toBeInTheDocument()

    userEvent.click(all);

    burek = screen.getByText(/burek/i)
    kumpir = screen.getByText(/kumpir/i)
    atet = screen.getByText(/at&t/i)

    expect(burek).toBeInTheDocument()
    expect(kumpir).toBeInTheDocument()
    expect(atet).toBeInTheDocument()
  })
  it('o botão de compartilhar funciona corretamente', () => {
    window.document.execCommand = jest.fn(() => true)

    renderWithRouter(<DoneRecipes />);

    const shareButton = screen.getByTestId('0-horizontal-share-btn')

    userEvent.click(shareButton)

    const mensagem = screen.getByText(/link copied!/i)    

    expect(mensagem).toBeInTheDocument();
  })
})