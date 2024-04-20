import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UpdateProject() {
  const [formErrors, setFormErrors] = useState({});
  const [input, setInput] = useState({
    clientName: '',
    projectType: '',
    started: '',
    projectStatus: '',
    lastUpdated: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const tasks = useSelector(state => state?.allProjects?.projects);
  const findedTask = tasks.find(data => data._id === id);

  useEffect(() => {

    setInput(findedTask);
  }, [findedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!input.clientName.trim()) {
      errors.clientName = 'Client Name is required';
    }
    if (!input.projectType.trim()) {
      errors.projectType = 'Project Type is required';
    }
    if (!input.started.trim()) {
      errors.started = 'Started is required';
    }
    if (!input.projectStatus.trim()) {
      errors.projectStatus = 'Project Status is required';
    }
    if (!input.lastUpdated.trim()) {
      errors.lastUpdated = 'Last Updated is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(`https://pmbackend-xdwu.onrender.com/updateProjects/${id}`, input);
        if (response.data.success) {
          toast.success('Successfully updated task', {
            position: 'top-center',
            autoClose: 999,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          setTimeout(() => {
            navigate('/projects');
          }, 1000);
        }

      } catch (error) {
        console.error('Error during update:', error);
        toast.error('Error during update', {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
  };

  return (
    <div className="Signup">
      <ToastContainer />
      <div className="Signup-sub">
        <form onSubmit={handleSubmit}>
          <div className="input-sty-prnt">
            <div className="sing-head">
              <h1>Update Project</h1>
            </div>
            <div className="input-sty">
              <label><b>Client Name</b></label>
              <div className="img-inp">
                <input
                  type="text"
                  name="clientName"
                  value={input.clientName}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{formErrors.clientName}</span>
            </div>
            <div className="input-sty">
              <label><b>Project Type</b></label>
              <div className="img-inp">
                <input
                  type="text"
                  name="projectType"
                  value={input.projectType}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{formErrors.projectType}</span>
            </div>
            <div className="input-sty">
              <label><b>Started</b></label>
              <div className="img-inp">
                <input
                  type="text"
                  name="started"
                  value={input.started}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{formErrors.started}</span>
            </div>
            <div className="input-sty">
              <label><b>Project Status</b></label>
              <div className="img-inp">
                <input
                  type="text"
                  name="projectStatus"
                  value={input.projectStatus}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{formErrors.projectStatus}</span>
            </div>
            <div className="input-sty">
              <label><b>Last Updated</b></label>
              <div className="img-inp">
                <input
                  type="text"
                  name="lastUpdated"
                  value={input.lastUpdated}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{formErrors.lastUpdated}</span>
            </div>
          </div>
          <div className="endSection">
            <Button variant="dark" type="submit">Submit</Button>
            <p>Back to projects <Link to="/projects"><b>click</b></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProject;
