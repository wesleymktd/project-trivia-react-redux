import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
// import Wallet from '../pages/Wallet';

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