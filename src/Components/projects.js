import { useEffect, useState } from 'react';
import '../CSS/overview.css';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';

export default function Projects() {
  let [taskName, setTaskName] = useState('');
  let [projectName, setProjectName] = useState('');
  let [color, setColor] = useState('#000000');
  let [tasks, setTasks] = useState([]);
  let [toEditId, setToEditId] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:3000/projects')
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  const saveProject = () => {
    if (
      taskName === '' ||
      taskName === undefined ||
      projectName === '' ||
      projectName === undefined
    ) {
      alert('Please fill all the data and selecta color');
      return;
    }
    let id = Date.now();
    let time = '00:00:00';
    let y = new Date().getFullYear();
    let m = new Date().getMonth() + 1;
    let d = new Date().getDate();
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    let date = `${y}-${m}-${d}`;

    let obj = { id, taskName, projectName, color, time, date };

    if (toEditId === '') {
      axios
        .post('http://localhost:3000/projects', obj)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`http://localhost:3000/projects/${toEditId}`, obj)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    }
  };

  const editRec = (id) => {
    let elem = tasks.find((elem) => elem.id === id);
    setTaskName(elem.taskName);
    setProjectName(elem.projectName);
    setColor(elem.color);
    setToEditId(elem.id);
  };

  const delRec = (id) => {
    axios
      .delete(`http://localhost:3000/projects/${id}`)
      .then((res) => getData())
      .catch((err) => console.log(err));
    showOptions(0);
  };

  const showOptions = (id) => {
    tasks.forEach((elem) => {
      if (elem.id === id) $(`#options${id}`).toggle(100);
      else $(`#options${elem.id}`).hide(100);
    });
  };

  return (
    <>
      <div className="row" style={{ backgroundColor: '#ddd' }}>
        <h1>Overview</h1>
        <nav className="navbar fixed navbar-dark overviewNavbar">
          <div className="col-6 activeA" data-testid="projLinkDiv">
            <Link
              to="/overview/projects"
              id="projectLink"
              className="navbar-brand mx-auto"
            >
              <h2>Projects</h2>
            </Link>
          </div>
          <div className="col-6">
            <Link
              to="/overview/tasks"
              id="taskLink"
              className="navbar-brand mx-auto"
            >
              <h2>Tasks</h2>
            </Link>
          </div>
        </nav>
      </div>
      <div className="row">
        <div className="col">
          <div className="tasksList">
            {tasks.map((elem, idx) => {
              return (
                <div className="task" key={idx}>
                  <span
                    className="bgColor"
                    style={{ backgroundColor: `${elem.color}` }}
                  ></span>
                  <h2 data-testid={`project-name-${elem.projectName}`}>
                    {elem.projectName}
                  </h2>
                  <span className="dots" onClick={() => showOptions(elem.id)}>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </span>
                  <span className="options" id={`options${elem.id}`}>
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => editRec(elem.id)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;
                      Edit
                    </button>
                    <br />
                    <button
                      className="btn btn-light btn-sm del"
                      onClick={() => delRec(elem.id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>&nbsp;
                      Delete
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-success btn-lg btn-block"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add New Project
      </button>

      <div
        className="modal fade mt-5"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-testid="project-dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter Task Name"
              />
              <input
                type="text"
                className="form-control"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter Project Name"
              />
              <input
                type="color"
                className="form-control w-50"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ float: 'left', width: '20%' }}
              />
              <h4 style={{ float: 'left' }}>{color}</h4>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={saveProject}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
