import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
// import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página de Login', () => {
    beforeEach(() => {
        render(<App />)
    });

    test('verifica se os inputs estão presentes na tela', () => {
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /enter/i})).toBeInTheDocument();
    }),

    test('verifica se o botão Enter permanece "disabled" com os campos inválidos', () => {
        userEvent.type(screen.getByPlaceholderText(/email/i), 'emailInvalido');
        userEvent.type(screen.getByPlaceholderText(/password/i), '123456');
        expect(screen.getByRole('button', {name: /enter/i})).toBeDisabled();
    }),

    test('verifica se o botão Enter é liberado com os campos válidos', () => {
        userEvent.type(screen.getByPlaceholderText(/email/i), 'algum@email.com');
        userEvent.type(screen.getByPlaceholderText(/password/i), '1234567');
        expect(screen.getByRole('button', {name: /enter/i})).not.toBeDisabled();
    }),

    test('verifica se as chaves são adicionadas corretamente no localStorage', () => {
        userEvent.type(screen.getByPlaceholderText(/email/i), 'algum@email.com');
        userEvent.type(screen.getByPlaceholderText(/password/i), '1234567');

        userEvent.click(screen.getByRole('button', {name: /enter/i}));
        expect(localStorage.getItem('user')).toBe('{\"email\":\"algum@email.com\"}');
        expect(localStorage.getItem('mealsToken')).toBe('1');
        expect(localStorage.getItem('cocktailsToken')).toBe('1');
    })
});