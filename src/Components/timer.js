import '../CSS/timer.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Timer() {
  let [intrvl, setIntrvl] = useState('');
  let [sec, setSec] = useState(0);
  let [time, setTime] = useState('00:00:00');
  let [int, setInt] = useState(0);

  let [totalTime, setTotalTime] = useState('00:00:00');
  let [todaysTotalTime, setTodaysTotalTime] = useState('00:00:00');
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:3000/tasks')
      .then((res) => {
        setTasks(res.data);
        calTodaysTotalTime(res.data);
        setTotalTime(calTotalTime(res.data));
      })
      .catch((err) => console.log(err));
  };

  const calTodaysTotalTime = (arr) => {
    let today = getTodayDate();
    let filtered = arr.filter((elem) => elem.date === today);
    setTodaysTotalTime(calTotalTime(filtered));
  };

  const calTotalTime = (arr) => {
    let total = calMilliseconds(arr);

    let seconds = Math.floor(total / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  const getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  };

  const calMilliseconds = (arr) => {
    let total = 0;
    arr.forEach((elem) => {
      let timeArr = elem.time.split(':');
      let timeInMilliseconds =
        timeArr[0] * 3600000 + timeArr[1] * 60000 + timeArr[2] * 1000;
      total += timeInMilliseconds;
    });
    return total;
  };

  const startTimer = (id) => {
    tasks.forEach((elem) => {
      document.getElementById(`pauseBtn${elem.id}`).style.display = 'none';
      document.getElementById(`startBtn${elem.id}`).style.display = 'block';
      clearInterval(intrvl);
    });

    document.getElementById(`startBtn${id}`).style.display = 'none';
    document.getElementById(`pauseBtn${id}`).style.display = 'block';

    let obj = tasks.find((elem) => elem.id === id);
    // let ms = calMilliseconds(obj);

    setTime(obj.time);
    let hrs = obj.time.split(':')[0];
    let mnts = obj.time.split(':')[1];
    let scnds = parseInt(obj.time.split(':')[2]);
    hrs = parseInt(hrs * 60 * 60);
    mnts = parseInt(mnts * 60);
    let p = parseInt(hrs + mnts + scnds);
    setSec(p);
    int = setInterval(() => {
      setSec(p++);
      myTime(obj, p);
    }, 1000);
    setIntrvl(int);
  };

  const myTime = (obj, p) => {
    let hours = parseInt(p / (60 * 60));
    let rem = p - hours * 60 * 60;
    let minutes = parseInt(rem / 60);
    let seconds = rem - minutes * 60;

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    time = `${hours}:${minutes}:${seconds}`;
    setTime(time);
    document.getElementById(`time${obj.id}`).innerHTML = time;

    axios.put(`http://localhost:3000/tasks/${obj.id}`, {
      id: obj.id,
      projectName: obj.projectName,
      taskName: obj.taskName,
      color: obj.color,
      date: obj.date,
      time: time,
    });
    getData();
  };

  function pause(id) {
    document.getElementById(`pauseBtn${id}`).style.display = 'none';
    document.getElementById(`startBtn${id}`).style.display = 'block';
    clearInterval(intrvl);
    getData();
  }

  return (
    <>
      <div className="row header">
        <div className="col">
          <h1 className="m-0 p-4">Timer</h1>
          <h1 className="m-0 p-4" data-testid="time-clock">
            {time}
          </h1>
          <nav className="navbar fixed navbar-dark overviewNavbar">
            <a href="/" className="navbar-brand mx-auto">
              <h2>
                total: <br /> {totalTime}
              </h2>
            </a>
            <a href="/" className="navbar-brand mx-auto">
              <h2>
                today: <br /> {todaysTotalTime}
              </h2>
            </a>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="tasksList">
          {tasks.map((elem, idx) => {
            return (
              <div className="task" key={idx}>
                <span
                  className="bgColor"
                  style={{ backgroundColor: `${elem.color}` }}
                ></span>
                <h2>{elem.taskName}</h2>
                <p id={`time${elem.id}`}>{elem.time}</p>
                <span className="handleTimer" id={`startBtn${elem.id}`}>
                  <i
                    data-testid={`startBtn${elem.id}`}
                    className="fa fa-play"
                    aria-hidden="true"
                    onClick={() => startTimer(elem.id)}
                  ></i>
                </span>
                <span
                  className="handleTimer"
                  id={`pauseBtn${elem.id}`}
                  style={{ display: 'none', color: 'red' }}
                  data-testid={`pauseBtnSpan${elem.id}`}
                >
                  <i
                    data-testid={`pauseBtn${elem.id}`}
                    className="fa fa-stop-circle"
                    aria-hidden="true"
                    onClick={() => pause(elem.id)}
                  ></i>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Timer;
