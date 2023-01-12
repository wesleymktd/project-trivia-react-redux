import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import requestTokenApi from '../redux/services/requestToken';
// import Wallet from '../pages/Wallet';
import { tokenMock } from './helpers/mocks/tokenMock';


describe('Login page assessment', () => {
  test('if the name input exists', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByRole('textbox', { name: /nome de usuário/i });
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveProperty('type', 'text');
  });

  test('if the email input exists', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveProperty('type', 'email');
  });

  test('if the enter button "play" exists and if it is disabled', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    expect(playBtn).toBeInTheDocument();
    expect(playBtn).toHaveProperty('type', 'button');
    expect(playBtn).toBeDisabled();
  });

  test('whether the button "play" becomes enabled when the correct values of the inputs ​are entered', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const nameInput = screen.getByRole('textbox', { name: /nome de usuário/i });
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(emailInput, 'test@yahoo.com');
    userEvent.type(nameInput, 'teste');
    expect(playBtn).not.toBeDisabled();
  });

  test('if entries with value email and user e click button "play" redirect page game', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(tokenMock),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const nameInput = screen.getByRole('textbox', { name: /nome de usuário/i });
    const playBtn = screen.getByRole('button', { name: /play/i });

    userEvent.type(emailInput, 'test@yahoo.com');
    userEvent.type(nameInput, 'teste');
    userEvent.click(playBtn);

    history.push('/gamepage')
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(history.location.pathname).toBe('/gamepage'));
    
  });

  test('if the enter button config exists if it is enabled', () => {
    renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByRole('button', { name: /configurações/i });
    expect(configBtn).toBeInTheDocument();
    expect(configBtn).toHaveProperty('type', 'button');
    expect(configBtn).toBeEnabled();
  });

  test('if the enter button config redirect in click', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByRole('button', { name: /configurações/i });

    userEvent.click(configBtn);
    const {pathname} = history.location;

    expect(pathname).toBe('/settings');
  });
});