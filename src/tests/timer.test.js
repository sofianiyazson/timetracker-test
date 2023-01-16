import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import Timer from '../Components/timer';
import MockThemeContextProvider, { mockData } from './testUtils';

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({ data: mockData.tasks }), // what you want to return when useContext get fired goes here
  };
});

const server = setupServer(
  rest.get('http://localhost:3000/tasks', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.tasks));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(() => cleanup());
describe('Calander', () => {
  test('Should render required text', async () => {
    render(
      <MockThemeContextProvider>
        <Timer />
      </MockThemeContextProvider>
    );

    expect(screen.getByText('Timer')).toBeInTheDocument();
    expect(screen.getByText(/total:/)).toBeInTheDocument();
    expect(screen.getByText(/today:/)).toBeInTheDocument();
    expect((await screen.findAllByText(/taskZZ/)).length).toBe(2);
  });

  test('Should start timer when when clicked on play button', async () => {
    jest.useFakeTimers();
    render(
      <MockThemeContextProvider>
        <Timer />
      </MockThemeContextProvider>
    );

    const timeClock = screen.getByTestId('time-clock');

    expect(timeClock.innerHTML).toBe('00:00:00');

    await waitFor(async () => fireEvent.click(screen.getByTestId('startBtn2')));
    jest.advanceTimersByTime(4000);

    await waitFor(async () =>
      expect(screen.getByTestId('time-clock').innerHTML).toBe('00:00:04')
    );
    jest.useRealTimers();
  });

  test('Should pause timer when when clicked on pause button', async () => {
    render(
      <MockThemeContextProvider>
        <Timer />
      </MockThemeContextProvider>
    );

    await waitFor(async () =>
      expect(screen.getByTestId('pauseBtnSpan2')).toHaveStyle('display:none')
    );

    // On start timer
    await waitFor(async () => fireEvent.click(screen.getByTestId('startBtn2')));

    await waitFor(async () =>
      expect(screen.getByTestId('pauseBtnSpan2')).toHaveStyle('display:block')
    );
    // On pause timer
    await waitFor(async () => fireEvent.click(screen.getByTestId('pauseBtn2')));

    await waitFor(async () =>
      expect(screen.getByTestId('pauseBtnSpan2')).toHaveStyle('display:none')
    );
  });
});
