import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Dropdown, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPrayer() {
  const [selectedValues, setSelectedValues] = useState({
    Fajr: '',
    Dhuhr: '',
    Asr: '',
    Maghrib: '',
    Isha: ''
  });

  const navigate = useNavigate()
  const handleSelectFajr = (eventKey) => {
    setSelectedValues({ ...selectedValues, Fajr: eventKey });
  };

  const handleSelectDhuhr = (eventKey) => {
    setSelectedValues({ ...selectedValues, Dhuhr: eventKey });
  };

  const handleSelectAsr = (eventKey) => {
    setSelectedValues({ ...selectedValues, Asr: eventKey });
  };

  const handleSelectMaghrib = (eventKey) => {
    setSelectedValues({ ...selectedValues, Maghrib: eventKey });
  };

  const handleSelectIsha = (eventKey) => {
    setSelectedValues({ ...selectedValues, Isha: eventKey });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedValues);
    try {
      const response = await axios.post('https://pmbackend-xdwu.onrender.com/addPrayers', selectedValues
      );

      if (response.data.success) {

        toast.success('Successfully added prayer', {
          position: "top-center",
          autoClose: 999,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });


        setTimeout(function () {
          navigate('/todoTable')
        }, 1000);
      }

    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Error during login', {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <div className='AddaccountForm-main'>
        <ToastContainer />
        <div className='AddaccountForm-head'>
          <h1> Add Prayers</h1>
        </div>
        <div className='AddaccountForm'>
          <form action="" className='form-add-prayer' onSubmit={handleSubmit}>
            <Dropdown onSelect={handleSelectFajr}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Fajr
              </Dropdown.Toggle>
              <Dropdown.Menu className='z-0'>
                <Dropdown.Item eventKey="Missed">Missed</Dropdown.Item>
                <Dropdown.Item eventKey="Not Missed">Not Missed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectDhuhr}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Dhuhr
              </Dropdown.Toggle>
              <Dropdown.Menu className='z-0'>
                <Dropdown.Item eventKey="Missed">Missed</Dropdown.Item>
                <Dropdown.Item eventKey="Not Missed">Not Missed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectAsr}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Asr
              </Dropdown.Toggle>
              <Dropdown.Menu className='z-0'>
                <Dropdown.Item eventKey="Missed">Missed</Dropdown.Item>
                <Dropdown.Item eventKey="Not Missed">Not Missed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectMaghrib}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Maghrib
              </Dropdown.Toggle>
              <Dropdown.Menu className='z-0'>
                <Dropdown.Item eventKey="Missed">Missed</Dropdown.Item>
                <Dropdown.Item eventKey="Not Missed">Not Missed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectIsha}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Isha
              </Dropdown.Toggle>
              <Dropdown.Menu className='z-0'>
                <Dropdown.Item eventKey="Missed">Missed</Dropdown.Item>
                <Dropdown.Item eventKey="Not Missed">Not Missed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button className="login-btn" variant="primary" type="submit">Add</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPrayer;
