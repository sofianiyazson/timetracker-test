import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Components/navbar';
import MockThemeContextProvider from './testUtils';
describe('Calander', () => {
  test('Should render Icons', async () => {
    const { container } = render(
      <MockThemeContextProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockThemeContextProvider>
    );

    expect(container.querySelector('#timer > i')).toBeInTheDocument();
    expect(container.querySelector('#overview > i')).toBeInTheDocument();
    expect(container.querySelector('#calender > i')).toBeInTheDocument();
  });
});
