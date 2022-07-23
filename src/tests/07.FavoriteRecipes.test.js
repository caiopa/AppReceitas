import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import localStorage from './mocks/mocksLocal';

const receitas = [
    {
        id: '53060',
        type: 'food',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    },
    {
        id: '13501',
        type: 'drink',
        nationality: '',
        category: 'Shot',
        alcoholicOrNot: 'Alcoholic',
        name: 'ABC',
        image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    }
]

describe('Testa a página de Login', () => {

    test('test se os button de filtros estão na tela', async () => {
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(receitas))
        renderWithRouter(<FavoriteRecipes />)
        const filterAll = screen.getByTestId('filter-by-all-btn')
        const filterFoods = screen.getByTestId('filter-by-food-btn')
        const filterDrinks = screen.getByTestId('filter-by-drink-btn')
        const BtnShare = screen.getByTestId('0-horizontal-share-btn')
        const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn')

        expect(filterAll).toBeInTheDocument()
        expect(filterFoods).toBeInTheDocument()
        expect(filterDrinks).toBeInTheDocument()
        expect(BtnShare).toBeInTheDocument()
        expect(btnFavorite).toBeInTheDocument()
    })

    test('test se os item do localStorage esta na tela', async () => {
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(receitas))
        renderWithRouter(<FavoriteRecipes />)
        expect(await screen.findAllByTestId('0-horizontal-top-text')).toHaveLength(2)
    })

    test('test se o filtro Food funciona corretamente', async () => {
        
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(receitas))
        renderWithRouter(<FavoriteRecipes />)
        const filterFoods = screen.getByTestId('filter-by-food-btn')
        userEvent.click(filterFoods)
        expect(await screen.findAllByTestId('0-horizontal-image')).toHaveLength(1)
    })
    test('test se o filtro Drinks funciona corretamente', async () => {
        
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(receitas))
        renderWithRouter(<FavoriteRecipes />)
        const filterDrinks = screen.getByTestId('filter-by-drink-btn')
        userEvent.click(filterDrinks)
        expect(await screen.findAllByTestId('0-horizontal-top-text')).toHaveLength(2)
    })
    test('Test se desfavoritar funciona corretamente', async () => {
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(receitas))
        renderWithRouter(<FavoriteRecipes />)

        const btnDesfavoritar = await screen.findByTestId('0-horizontal-favorite-btn')
        userEvent.click(btnDesfavoritar)
        expect(await screen.findAllByTestId('0-horizontal-image')).toHaveLength(1)

        
    })
    test('Verificar se o button de copiar funciona corretamente', async () => {
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(receitas))
        renderWithRouter(<FavoriteRecipes />)

        window.document.execCommand = jest.fn(() => true)

        const btnCopyUrl = await screen.findByTestId('0-horizontal-share-btn')
        const btnCopyUrl1 = await screen.findByTestId('1-horizontal-share-btn')
        userEvent.click(btnCopyUrl)
        userEvent.click(btnCopyUrl1)
        expect(screen.getAllByText(/Link copied/i)[0]).toBeInTheDocument()


    })

    test('Verifique se o btn All esta funcionando corretamente', () => {
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(receitas))
        renderWithRouter(<FavoriteRecipes />)

        const filterFoods = screen.getByTestId('filter-by-food-btn')
        userEvent.click(filterFoods)

        const filterAll = screen.getByTestId('filter-by-all-btn')
        userEvent.click(filterAll)

        const img0 = screen.getByTestId('0-horizontal-image')
        const img1 = screen.getByTestId('1-horizontal-image')
        expect(img0).toBeInTheDocument()
        expect(img1).toBeInTheDocument()
    })

    test('Verifique se btn desfavoritar remove corretamente os items', () => {})

})