import React, { createContext } from 'react';
export const ThemeContext = createContext();

function MockThemeContextProvider(props) {
  return (
    <ThemeContext.Provider value={{ data: mockData.tasks }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default MockThemeContextProvider;

export const mockData = {
  projects: [
    {
      id: 2,
      taskName: 'typicode2',
      color: '#9a3232',
      date: '2022-10-21',
    },
    {
      id: 3,
      taskName: 'typicode2',
      color: '#9a3232',
      date: '2022-10-21',
    },
  ],
  tasks: [
    {
      id: 2,
      taskName: 'taskZZ',
      projectName: 'projectZZ22222222',
      color: '#da474a',
      time: '00:00:00',
      date: '2023-01-09',
    },
    {
      id: 4,
      projectName: 'projectZZ',
      taskName: 'taskZZ',
      color: '#2be0f7',
      date: '2022-10-20',
      time: '00:20:00',
    },
  ],
};
