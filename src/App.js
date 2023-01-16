import './App.css';
import Navbar from './Components/navbar';
import Calender from './Components/calender';
import Timer from './Components/timer';
import Projects from './Components/projects';
import Tasks from './Components/tasks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeContextProvider from './Context/context';

function App() {
  return (
    <div className="App container-fluid p-0">
      <ThemeContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Timer />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/overview/projects" element={<Projects />} />
            <Route path="/overview/tasks" element={<Tasks />} />
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
