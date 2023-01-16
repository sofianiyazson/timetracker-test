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
import { BrowserRouter } from 'react-router-dom';
import Projects from '../Components/projects';
import { mockData } from './testUtils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
  useLocation: () => ({ pathname: '/overview/projects' }),
}));

const server = setupServer(
  rest.get('http://localhost:3000/projects', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.projects));
  }),
  rest.post('http://localhost:3000/projects', (_, res, ctx) => {
    return res(ctx.status(201));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(() => cleanup());
describe('Calander', () => {
  test('Project tab should be active on first render', async () => {
    render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );

    expect(screen.getByTestId('projLinkDiv').className).toContain('activeA');
  });

  test('Should create new project', async () => {
    delete window.location;
    window.location = { reload: jest.fn() };
    render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );

    await waitFor(async () =>
      fireEvent.click(screen.getByText('Add New Project'))
    );
    expect(screen.getByTestId('project-dialog')).toHaveStyle('display:block');

    fireEvent.change(screen.getByPlaceholderText('Enter Task Name'), {
      target: { value: 'Create Azure Cloud' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Project Name'), {
      target: { value: 'Move to Azure' },
    });

    await waitFor(async () =>
      fireEvent.click(screen.getByText('Save changes'))
    );

    expect(screen.findByText('Move to Azure')).toBeTruthy();
  });
});
