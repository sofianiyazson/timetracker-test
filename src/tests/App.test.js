import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

test('Should go to Calender page', async () => {
  const { container } = render(<App />);
  const user = userEvent.setup();
  expect(screen.getByText(/Timer/i)).toBeInTheDocument();

  await user.click(container.querySelector('#calender'));
  expect(screen.getByText(/Calender/i)).toBeInTheDocument();
});

test('Should go to Timer page', async () => {
  const { container } = render(<App />);
  const user = userEvent.setup();

  await user.click(container.querySelector('#calender'));
  await user.click(container.querySelector('#timer'));
  expect(screen.getByText(/Timer/i)).toBeInTheDocument();
});

test('Should go to Overview page', async () => {
  const { container } = render(<App />);
  const user = userEvent.setup();

  await user.click(container.querySelector('#overview '));
  expect(screen.getByText(/Overview/i)).toBeInTheDocument();
});
