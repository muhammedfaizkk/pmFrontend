import React, { useState } from 'react';
import axios from 'axios';
import usernameImg from '../assets/icons/icons8-username-30.png';
import passwordImg from '../assets/icons/icons8-password-24.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { userAuth } from '../redux/userSlice';
import 'react-toastify/dist/ReactToastify.css';



function Login() {
    const [formErrors, setFormErrors] = useState({});
    const [input, setInput] = useState({
        userName: "",
        password: "",
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const validateForm = () => {
        const errors = {};
        if (!input.userName.trim()) {
            errors.userName = "Username is required";
        }
        if (!input.password.trim()) {
            errors.password = "Password is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`http://localhost:4000/login`, input
                );
                if (response.data.success) {
                    dispatch(userAuth(true))
                    toast.success('Login successful', {
                        position: "top-center",
                        autoClose: 999,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });


                    setTimeout(function () {
                        navigate('/')
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
    };
    return (
        <div className='Signup'>

            <div className='Signup-sub'>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div className='input-sty-prnt'>
                        <div className='sing-head'>
                            <h1>Welcome Back</h1>
                            <p><b>Enter your credentials to login</b></p>
                        </div>
                        <div className='input-sty'>
                            <label><b>User name</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={usernameImg} alt="" />
                                <input
                                    type="text"
                                    name='userName'
                                    value={input.userName}
                                    onChange={handleChange}
                                />
                            </div>
                            <span className='error-message'>{formErrors.userName}</span>
                        </div>
                        <div className='input-sty'>
                            <label><b>Password</b></label>
                            <div className='img-inp'>
                                <img className='iconsLo' src={passwordImg} alt="" />
                                <input
                                    type="password"
                                    name='password'
                                    value={input.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <span className='error-message'>{formErrors.password}</span>
                        </div>
                    </div>
                    <div className='fgt-pass'>
                        <p><b>Forgot password?</b></p>
                    </div>
                    <div className='endSection'>
                        <Button variant="dark" type='submit'>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
