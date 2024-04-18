import React, { useEffect, useState } from 'react';
import { Dropdown, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import editImg from '../assets/icons/edit.png';
import trushImg from '../assets/icons/icons8-trush-32.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Deptstatus, dropDownacounts } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Dept() {

    const [updateStatus, setUpdatestatus] = useState(false);
    const [updateStatusincome, setUpdatestatusincome] = useState(false);
    const [depts, setDepts] = useState([])
    const [deptsOpp, setdeptsOpp] = useState([])
    const dispatch = useDispatch();
    const dropdownControle = useSelector((state) => state?.users?.dept ?? '');
    useEffect(() => {
        fetchData();
        fetchIncome()
    }, [updateStatus, updateStatusincome]);

    const handleSelect = (eventKey) => {
        dispatch(Deptstatus(eventKey));
    };

    const incomedata = useSelector((state) => state?.transactions?.income);
    const navigate = useNavigate();

    const totalExAmount = depts.reduce((total, element) => {
        if (typeof element.amount === 'number') {
            return total + element.amount;

        } else {
            return total;
        }
    }, 0);

    const totalInAmount = deptsOpp.reduce((total, element) => {
        if (typeof element.amount === 'number') {
            return total + element.amount;

        } else {
            return total;
        }
    }, 0);




    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/getDepts');

            const depts = res.data.dept ?? [];
            setDepts(depts)
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const fetchIncome = async () => {
        try {
            const res = await axios.get('http://localhost:4000/getDeptsopp');
            const depts = res.data.dept ?? [];
            setdeptsOpp(depts)
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    }

    const addNew = () => {
        navigate('/addDept');
    };

    const handleDelete = async (deptsId) => {
            try {
                const response = await axios.delete(`http://localhost:4000/deptsDelete/${deptsId}`);
                if (response.data.success) {
                    setUpdatestatus((prevStatus) => !prevStatus);
                    toast.success('Successfully Removed', {
                        position: "top-center",
                        autoClose: 998,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }


            } catch (error) {
                toast.error('Error during Expenses', {
                    position: "top-center",
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        
    };



    const deptsOppdelete = async (deptId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/deptsoppDelete/${deptId}`);
            if (response.data.success) {
                setUpdatestatus(prevStatus => !prevStatus);
                toast.success('Successfully Removed', {
                    position: "top-center",
                    autoClose: 998,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Error during Income', {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (

        <div>
            <ToastContainer />
            <div className='tables-main'>
                <div className='action-main'>
                    <div className='actions-section-sub'>
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {dropdownControle ? dropdownControle : 'Select Category'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='z-0'>
                                <Dropdown.Item eventKey="dept">Dept</Dropdown.Item>
                                <Dropdown.Item eventKey="deptopp">Dept opp</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className="login-btn" variant="primary" onClick={addNew}>New</Button>
                    </div>
                </div>
                <div className='tables-top'>
                    <div className='table-actions-expense'>
                        <b>Depts: <span style={{ color: 'red' }}>₹{totalExAmount}</span></b>
                    </div>
                    <div className='table-actions-balance'>
                        <b>Deptsopp: <span style={{ color: 'green' }}>₹{totalInAmount}</span></b>
                    </div>
                </div>
                <div className='table-res'>
                    <Table responsive striped hover className='table-boot'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {dropdownControle === 'dept' ?
                            <tbody>
                                {depts.map((depts, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{depts.currentDate}</td>
                                        <td>{depts.name}</td>
                                        <td style={{ color: 'red' }}> <b>{depts.amount}</b> </td>
                                        <td className='table-action'>
                                            <Link to={`/Updateaccount/${depts._id}`}><img className='tableActonImgs' src={editImg} alt="Edit" /></Link>
                                            <img
                                                onClick={() => handleDelete(depts._id)}
                                                className='tableActonImg'
                                                src={trushImg}
                                                alt="Delete"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody> :
                            <tbody>
                                {deptsOpp.map((depts, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{depts.currentDate}</td>
                                        <td>{depts.name}</td>
                                        <td style={{ color: 'red' }}> <b>{depts.amount}</b> </td>
                                        <td className='table-action'>
                                            <Link to={`/Updateaccount/${depts._id}`}><img className='tableActonImgs' src={editImg} alt="Edit" /></Link>
                                            <img
                                                onClick={() => deptsOppdelete(depts._id)}
                                                className='tableActonImg'
                                                src={trushImg}
                                                alt="Delete"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </Table>
                </div>
            </div>
        </div>

    )
}

export default Dept
