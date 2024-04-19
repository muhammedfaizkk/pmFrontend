import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AddDept() {
    const navigate = useNavigate()
    const dropdownControle = useSelector((state) => state?.users?.dept ?? '');
    const [formErrors, setFormErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        amount: "",
    });

    const validateForm = () => {
        const errors = {};

        if (!input.name.trim()) {
            errors.title = "Title is required";
        }
        if (!input.amount.trim()) {
            errors.amount = "Amount is required";
        }
        else if (!/^[1-9][0-9]*$/.test(input.amount)) {
            errors.amount = "Amount must be a valid number";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (dropdownControle === 'Dept') {
                try {
                    const response = await axios.post('http://localhost:4000/Adddepts', input
                    );

                    if (response.data.success) {

                        toast.success('Successfully added depts', {
                            position: "top-center",
                            autoClose: 999,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });


                        setTimeout(function () {
                            navigate('/dept')
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
            }

            else {
                try {
                    const response = await axios.post('http://localhost:4000/Adddeptsopp', input
                    );
                    console.log('Response:', response.data);
                    if (response.data.success) {

                        toast.success('Successfully added tast', {
                            position: "top-center",
                            autoClose: 999,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });


                        setTimeout(function () {
                            navigate('/dept')
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
            }
        }

    }
    return (
        <div className='AddaccountForm-main'>
            <ToastContainer />
            <div className='AddaccountForm-head'>
                <h1> Add Dept</h1>
            </div>
            <div className='AddaccountForm'>


                <form action="" onSubmit={formSubmit} className='form-add' >
                    <div className="input-main">
                        <div className='input-sub'>
                            <label htmlFor="">
                                <b>Name</b>
                            </label>
                            <div className="inputcontrole">
                                <input type="text"
                                    name='name'
                                    value={input.title}
                                    onChange={handleChange}

                                />

                            </div>
                            <p className='error-message'>{formErrors.title}</p>
                        </div>


                        <div className="input-main">
                            <div className='input-sub'>
                                <label htmlFor="">
                                    <b> Amount</b>
                                </label>
                                <div className="inputcontrole">
                                    <input type="text"
                                        name='amount'
                                        value={input.amount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <p className='error-message'>{formErrors.amount}</p>
                            </div>

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

export default AddDept
