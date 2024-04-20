import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Updateaccount() {

    const navigate = useNavigate()
    const dropdownControle = useSelector((state) => state?.users?.drStatus ?? '');
    const Currentexpens = useSelector((state) => state?.transactions?.expenses ?? '');
    const CurrentIncome = useSelector((state) => state?.transactions?.income ?? '');
    const [formErrors, setFormErrors] = useState({});
    const [input, setInput] = useState({
        title: "",
        category: "",
        amount: "",
    });
    const { id } = useParams();

    const upEx = Currentexpens.find(data => data?._id === id);
    const upIn = CurrentIncome.find(data => data?._id === id);

    const validateForm = () => {
        const errors = {};

        if (!input.title.trim()) {
            errors.title = "Title is required";
        }
        if (!input.category.trim()) {
            errors.category = "Category is required";
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
            if (dropdownControle === 'Expense') {
                try {
                    const response = await axios.put(`https://pmbackend-xdwu.onrender.com/updateExpence/${id}`, input
                    );

                    if (response.data.success) {

                        toast.success('Successfully Updated Expenses', {
                            position: "top-center",
                            autoClose: 999,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });


                        setTimeout(function () {
                            navigate('/accounts')
                        }, 1000);
                    }

                } catch (error) {
                    toast.error('Error during Expenses', {
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
                    const response = await axios.put(`https://pmbackend-xdwu.onrender.com/updateIncome/${id}`, input
                    );
                    if (response.data.success) {
                        toast.success('Successfully Updated Income', {
                            position: "top-center",
                            autoClose: 999,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });


                        setTimeout(function () {
                            navigate('/accounts')
                        }, 1000);
                    }

                } catch (error) {
                    toast.error('Error during Income', {
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
                <h1> UPDATE TRANSACTION</h1>
            </div>
            <div className='AddaccountForm'>
                <form onSubmit={formSubmit} className='form-add'>
                    <div className="input-main">
                        <div className='input-sub'>
                            <label htmlFor=""><b>Title</b></label>
                            <div className="inputcontrole">
                                <input type="text"
                                    name='title'
                                    defaultValue={upEx ? upEx.title : upIn.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <p className='error-message'>{formErrors.title}</p>
                        </div>

                        <div className='input-sub'>
                            <label htmlFor=""><b>Category</b></label>
                            <div className="inputcontrole">
                                <input type="text"
                                    name='category'
                                    defaultValue={upEx ? upEx.category : upIn.category}
                                    onChange={handleChange}
                                />
                            </div>
                            <p className='error-message'>{formErrors.category}</p>
                        </div>


                        <div className='input-sub'>
                            <label htmlFor=""><b>Amount</b></label>
                            <div className="inputcontrole">
                                <input type="text"
                                    name='amount'
                                    defaultValue={upEx ? upEx.amount : upIn.amount}
                                    onChange={handleChange}
                                />
                            </div>
                            <p className='error-message'>{formErrors.amount}</p>
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

export default Updateaccount
