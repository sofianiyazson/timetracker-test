import { render, screen } from '@testing-library/react';
import React from 'react';
import Calender from '../Components/calender';
import MockThemeContextProvider, { mockData } from './testUtils';

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({ data: mockData.tasks }), // what you want to return when useContext get fired goes here
  };
});
describe('Calander', () => {
  test('Should render combobox and text', async () => {
    render(
      <MockThemeContextProvider>
        <Calender />
      </MockThemeContextProvider>
    );

    const inputField = screen.getByRole('combobox');
    expect(screen.getByText('Calender')).toBeInTheDocument();
    expect(inputField).toHaveDisplayValue('Select Date');
  });
});
