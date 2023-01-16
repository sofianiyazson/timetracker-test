import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/navbar.css';

function Navbar() {
  let id = window.location.href.split('/')[3];
  useEffect(() => {
    if (id === undefined || id == '') changeClass('timer');
    else changeClass(`${id}`);
  }, []);

  const changeClass = (id) => {
    // let elems = document.getElementsByClassName('navbar-brand');
    // for (let i = 0; i < elems.length; i++) {
    //   document
    //     .getElementsByClassName('navbar-brand')
    //     [i].classList.remove('active');
    // }
    // document.getElementById(id).classList.add('active');
  };

  return (
    <div className="row">
      <div className="col">
        <nav className="navbar fixed-bottom navbar-dark">
          <Link
            to="/"
            id="timer"
            className="navbar-brand mx-auto active"
            onClick={() => changeClass('timerLink')}
          >
            <i className="bi bi-stopwatch-fill"></i>
          </Link>
          <Link
            to="/calender"
            id="calender"
            className="navbar-brand mx-auto"
            onClick={() => changeClass('calenderLink')}
          >
            <i className="bi bi-calendar-fill"></i>
          </Link>
          <Link
            to="/overview/projects"
            id="overview"
            className="navbar-brand mx-auto"
            onClick={() => changeClass('overviewLink')}
          >
            <i className="fa fa-archive" aria-hidden="true"></i>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
