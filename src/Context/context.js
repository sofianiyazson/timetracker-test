import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const ThemeContext = createContext();

function ThemeContextProvider(props) {
  let [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/tasks')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeContext.Provider value={{ data }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
