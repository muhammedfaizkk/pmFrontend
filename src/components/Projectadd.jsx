import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Projectadd() {
    const [formErrors, setFormErrors] = useState({});
    const [input, setInput] = useState({
        clientName: "",
        projectType: "",
        started: "",
        projectStatus: "",
        lastUpdated: "",
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };




    const validateForm = () => {
        const errors = {};
        if (!input.clientName.trim()) {
            errors.clientName = "clientName is required";
        }
        if (!input.projectType.trim()) {
            errors.projectType = "projectType is required";
        }
        if (!input.started.trim()) {
            errors.started = "started is required";
        }
        if (!input.projectStatus.trim()) {
            errors.projectStatus = "projectStatus is required";
        }
        if (!input.lastUpdated.trim()) {
            errors.lastUpdated = "lastUpdated is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:4000/addprojects', input
                );

                if (response.data.success) {

                    toast.success('Successfully added tast', {
                        position: "top-center",
                        autoClose: 999,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });


                    setTimeout(function () {
                        navigate('/projects')
                    }, 1000);
                }

            } catch (error) {
                toast.error('Error during login', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    };
    return (
        

        <div className='AddaccountForm-main'>
            <ToastContainer />
            <div className='AddaccountForm-head'>
                <h1>ADD TASK</h1>
            </div>
            <div className='AddaccountForm'>


                <form action="" className='form-add' onSubmit={handleSubmit}>
                    <div className="input-main">
                        <div className='input-sub'>
                            <label htmlFor="">
                                <b>Client Name</b>
                            </label>
                            <div className="inputcontrole">
                                <input
                                    type="text"
                                    name='clientName'
                                    value={input.clientName}
                                    onChange={handleChange}

                                />

                            </div>
                            <p className='error-message'>{formErrors.clientName}</p>
                        </div>

                        <div className='input-sub'>
                            <label htmlFor="">
                                <b>Project Type</b>
                            </label>
                            <div className="inputcontrole">
                            <input
                                     type="text"
                                     name='projectType'
                                     value={input.projectType}
                                     onChange={handleChange}

                                 />
                            </div>
                            <p className='error-message'>{formErrors.projectType}</p>
                        </div>

                        <div className="input-main">
                            <div className='input-sub'>
                                <label htmlFor="">
                                    <b> Started</b>
                                </label>
                                <div className="inputcontrole">
                                <input
                                    type="text"
                                    name='started'
                                    value={input.started}
                                    onChange={handleChange}

                                />
                                </div>
                                <p className='error-message'>{formErrors.started}</p>
                            </div>

                        </div>
                        <div className='input-sub'>
                            <label htmlFor="">
                                <b>Project Status</b>
                            </label>
                            <div className="inputcontrole">
                            <input
                                    type="text"
                                    name='projectStatus'
                                    value={input.projectStatus}
                                    onChange={handleChange}

                                />
                            </div>
                            <p className='error-message'>{formErrors.projectStatus}</p>
                        </div>

                        <div className='input-sub'>
                            <label htmlFor="">
                                <b>Last Update</b>
                            </label>
                            <div className="inputcontrole">
                            <input
                                    type="text"
                                    name='lastUpdated'
                                    value={input.lastUpdated}
                                    onChange={handleChange}

                                />
                            </div>
                            <p className='error-message'>{formErrors.lastUpdated}</p>
                        </div>

                        <div className='submit-btn'>
                            <button>Submit</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Projectadd
