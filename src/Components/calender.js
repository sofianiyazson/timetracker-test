import '../CSS/calender.css';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../Context/context';
import React, { useContext } from 'react';

function Calender() {
  let [month, setMonth] = useState([]);
  let [bol, setBol] = useState(false);
  let [tasks, setTasks] = useState([]);
  let [tasksToRender, setTasksToRender] = useState([]);
  let [date, setDate] = useState('');

  let things = useContext(ThemeContext);

  useEffect(() => {
    setTasksToRender(things.data);
    setTasks(things.data);

    let arr = [];
    let d = new Date().getDate();
    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear();
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;

    for (let i = d; i >= 1; i--) {
      if (i < 10) i = '0' + i;
      let date = `${y}-${m}-${i}`;
      arr.push(date);
    }
    setMonth(arr);
    setBol(true);
  }, [things.data.length, things.data]);

  useEffect(() => {
    if (date === '0') {
      setTasksToRender(tasks);
      return;
    }
    let currTasks = tasks.filter((elem) => elem.date === date);
    setTasksToRender(currTasks);
  }, [date]);

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Calender</h1>
          <select
            className="form form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="0">Select Date</option>
            {bol &&
              month.map((elem, idx) => {
                return (
                  <option value={elem} key={idx}>
                    {elem}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="tasksList">
            {tasksToRender.map((elem, idx) => {
              return (
                <div className="task" key={idx}>
                  <span
                    className="bgColor"
                    style={{ backgroundColor: `${elem.color}` }}
                  ></span>
                  <h2 data-testid={`task-name${elem.id}`}>{elem.taskName}</h2>
                  <p>{elem.time}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calender;
