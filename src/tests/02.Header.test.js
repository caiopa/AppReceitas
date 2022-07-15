import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes do header', () => {
    it('o header renderiza corretamente com o search', () => {
        renderWithRouter(<Header title="Foods" search />);
        
        const profile = screen.getByRole('img', {  name: /profile_icon/i});
        const search = screen.getByRole('button', {  name: /search_icon/i});
        const title = screen.getByRole('heading', {  name: /foods/i});

        expect(profile).toBeInTheDocument();
        expect(search).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });
    it('o header renderiza corretamente sem o search', () => {
        renderWithRouter(<Header title="Profile" />);
        
        const profile = screen.getByRole('img', {  name: /profile_icon/i});
        const search = screen.queryByRole('button', {  name: /search_icon/i});
        const title = screen.getByRole('heading', {  name: /profile/i});

        expect(profile).toBeInTheDocument();
        expect(search).toBeNull();
        expect(title).toBeInTheDocument();
    });
    it('o input de texto renderiza corretamente ao clicar no botão', () => {
        renderWithRouter(<Header title="Drinks" search/>);

        const search = screen.getByRole('button', {  name: /search_icon/i});
        
        userEvent.click(search);

        const textInput = screen.getByTestId('search-input');

        expect(textInput).toBeInTheDocument();

        userEvent.type(textInput, 'teste');

        expect(textInput.value).toBe('teste');
    });
})