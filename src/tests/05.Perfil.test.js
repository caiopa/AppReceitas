import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event'
import renderWithRouter from './helpers/renderWithRouter';


describe('Testa a página de Perfil', () => {

    test('Teste se o email esta aparecendo na tela, e o button done redireciona para a página correta', () => {
        const { history } = renderWithRouter(<App />)
        const btnEmail = screen.getByTestId('email-input')
        const btnPassword = screen.getByTestId('password-input')
        userEvent.type(btnEmail, 'caioefg@gmail.com')
        userEvent.type(btnPassword, 'caio1234567')
        const btnLogin = screen.getByTestId('login-submit-btn')
        expect(btnLogin).toBeInTheDocument()
        expect(btnLogin).toBeEnabled()
        userEvent.click(btnLogin)

        expect(screen.getByTestId('page-title')).toBeInTheDocument()
        history.push('/profile')
        const email = screen.getByTestId('profile-email')

        expect(email).toBeInTheDocument()
        const buttonDone = screen.getByTestId('profile-done-btn')
        const buttonFavoritas = screen.getByTestId('profile-favorite-btn')
        const buttonLogout = screen.getByTestId('profile-logout-btn')
        expect(buttonDone).toBeInTheDocument()
        expect(buttonFavoritas).toBeInTheDocument()
        expect(buttonLogout).toBeInTheDocument() 

        userEvent.click(buttonDone)
        expect(history.location.pathname).toBe('/done-recipes')
    })
    test('test se o button Favorite redireciona para pagina de favoritos', () => {
        const { history } = renderWithRouter(<App />)
        const btnEmail = screen.getByTestId('email-input')
        const btnPassword = screen.getByTestId('password-input')
        userEvent.type(btnEmail, 'caioefg@gmail.com')
        userEvent.type(btnPassword, 'caio1234567')
        const btnLogin = screen.getByTestId('login-submit-btn')
        expect(btnLogin).toBeEnabled()

        userEvent.click(btnLogin)
        history.push('/profile')

        const btnFav = screen.getByTestId('profile-favorite-btn')
        expect(btnFav).toBeInTheDocument()
        userEvent.click(btnFav)
        expect(history.location.pathname).toBe('/favorite-recipes')

    })
    
    test('test se o button logout redireciona para a página home', () => {
        const { history } = renderWithRouter(<App />)
        const btnEmail = screen.getByTestId('email-input')
        const btnPassword = screen.getByTestId('password-input')
        userEvent.type(btnEmail, 'caioefg@gmail.com')
        userEvent.type(btnPassword, 'caio1234567')
        const btnLogin = screen.getByTestId('login-submit-btn')
        expect(btnLogin).toBeEnabled()

        userEvent.click(btnLogin)
        history.push('/profile')

        const btnLogout = screen.getByTestId('profile-logout-btn')
        expect(btnLogout).toBeInTheDocument()
        userEvent.click(btnLogout)
        expect(history.location.pathname).toBe('/')

    })
   
});

