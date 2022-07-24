import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { oneResult, oneDrinkResult } from './mocks/fetchMock';

describe('testes do componente InProgress', () => {
  it('a pagina foods in progress renderiza corretamente', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve(oneResult);
        }
      })
    );

    const { history } = renderWithRouter(<App />);

    history.push('foods/52767/in-progress')

    const nome = await screen.findByRole('heading', {  name: /roasted goat/i});
    const img = screen.getByTestId('recipe-photo');
    const category = screen.getByText('Goat');
    const ingredientOne = screen.getByText(/goat meat \(1 kg\)/i); 
    const ingredientTwo = screen.getByText(/salt \(pinch\)/i);
    const instructions = screen.getByText(/just do it/i);

    expect(nome).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredientOne).toBeInTheDocument();
    expect(ingredientTwo).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  })
  it('a pagina drinks in progress renderiza corretamente', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve(oneDrinkResult);
        }
      })
    );

    const { history } = renderWithRouter(<App />);

    history.push('drinks/52767/in-progress');

    const nome = await screen.findByRole('heading', {  name: /orange juice/i});
    const img = screen.getByTestId('recipe-photo');
    const category = screen.getByText(/alcoholic/i);
    const ingredientOne = screen.getByText(/orange \(as needed\)/i); 
    const ingredientTwo = screen.getByText(/ice \(cubes\)/i);
    const instructions = screen.getByText(/squeeze them hard/i);

    expect(nome).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredientOne).toBeInTheDocument();
    expect(ingredientTwo).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  })
  it('caso ja exista o storage a pagina somente adiciona a receita', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve(oneResult);
        }
      })
    );

    const { history } = renderWithRouter(<App />);

    history.push('foods/52767/in-progress')

    const nome = await screen.findByRole('heading', {  name: /roasted goat/i});

    expect(nome).toBeInTheDocument();
  })
  it('checa a funcionalidade do botão de compartilhar', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve(oneResult);
        }
      })
    );

    window.document.execCommand = jest.fn(() => true)

    const { history } = renderWithRouter(<App />);

    history.push('foods/52767/in-progress');

    const copyButton = await screen.findByTestId('share-btn');

    expect(copyButton.textContent).toBe('Share')

    userEvent.click(copyButton);

    expect(copyButton.textContent).toBe('Link copied!')
  })
  it('checa a funcionalidade do botão de favoritar uma comida', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneResult),
      })
    );

    const { history } = renderWithRouter(<App />);

    history.push('foods/52767/in-progress');

    const favButton = await screen.findByTestId('favorite-btn');

    expect(favButton.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favButton);

    expect(favButton.src).toBe('http://localhost/blackHeartIcon.svg');

    userEvent.click(favButton);

    expect(favButton.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favButton);

    expect(favButton.src).toBe('http://localhost/blackHeartIcon.svg');
  })
  it('checa a funcionalidade do botão de favoritar uma bebida', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneDrinkResult),
      })
    );

    const { history } = renderWithRouter(<App />);

    history.push('drinks/52768/in-progress');

    const favButton = await screen.findByTestId('favorite-btn');

    expect(favButton.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favButton);

    expect(favButton.src).toBe('http://localhost/blackHeartIcon.svg');
  })
  it('ao marcar todos os ingredientes o botão de finalizar é habilidato', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneResult),
      })
    );

    const { history } = renderWithRouter(<App />);

    history.push('foods/52767/in-progress');
    
    const ingredientOne = await screen.findByTestId('0-ingredient-step');
    const ingredientTwo = screen.getByTestId('1-ingredient-step');
    const finalizeButton = screen.getByTestId('finish-recipe-btn');
    const checkOne = ingredientOne.children[0] 
    const checkTwo = ingredientTwo.children[0] 

    expect(finalizeButton).toBeDisabled();

    userEvent.click(checkOne)
    userEvent.click(checkTwo)

    expect(finalizeButton).toBeEnabled();
    
  })
  it('ao voltar na mesma pagina os ingredientes estão marcados', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(oneResult),
      })
    );

    const { history } = renderWithRouter(<App />);

    history.push('foods/52767/in-progress');
    
    await new Promise((r) => setTimeout(r, 500));
    
    const ingredientOne = screen.getByTestId('0-ingredient-step').children[0];
    const ingredientTwo = screen.getByTestId('1-ingredient-step').children[0];
    
    let checkOne = ingredientOne.defaultChecked;
    let checkTwo = ingredientTwo.defaultChecked;

    expect(checkOne).toBe(true)
    expect(checkTwo).toBe(true)

    userEvent.click(ingredientOne)
    userEvent.click(ingredientTwo)

    checkOne = ingredientOne.defaultChecked;
    checkTwo = ingredientTwo.defaultChecked;

    expect(checkOne).toBe(false)
    expect(checkTwo).toBe(false)
  })
})