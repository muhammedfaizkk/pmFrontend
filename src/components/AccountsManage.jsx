import React, { useEffect, useState } from 'react';
import { Dropdown, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import editImg from '../assets/icons/edit.png';
import trushImg from '../assets/icons/icons8-trush-32.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dropDownacounts } from '../redux/userSlice';
import { getAllexpenses, getAllincome } from '../redux/transactions';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AccountsManage() {
  const [updateStatus, setUpdatestatus] = useState(false);


  const dispatch = useDispatch();
  const dropdownControle = useSelector((state) => state?.users?.drStatus ?? '');
  useEffect(() => {
    fetchIncome();
    fetchData();
  }, [updateStatus]);

  const handleSelect = (eventKey) => {
    dispatch(dropDownacounts(eventKey));
  };
  console.log(updateStatus);
  const exdata = useSelector((state) => state?.transactions?.expenses);
  const incomedata = useSelector((state) => state?.transactions?.income);
  const navigate = useNavigate();

  const totalExAmount = exdata.reduce((total, element) => {
    if (typeof element.amount === 'number') {
      return total + element.amount;

    } else {
      return total;
    }
  }, 0);

  const totalInAmount = incomedata.reduce((total, element) => {
    if (typeof element.amount === 'number') {
      return total + element.amount;

    } else {
      return total;
    }
  }, 0);

  const balance = totalInAmount - totalExAmount




  const expense = exdata?.amount?.reduce((total, current) => total + current, 0);
  const income = incomedata?.amount?.reduce((total, current) => total + current, 0);


  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/getAllexpenses');
      const expenses = res.data.expenses ?? [];
      dispatch(getAllexpenses(expenses));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchIncome = async () => {
    try {
      const res = await axios.get('http://localhost:4000/getIncomes');
      const Incomes = res.data.incomes ?? [];
      dispatch(getAllincome(Incomes));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }

  const addNew = () => {
    navigate('/addaccounts');
  };

  const handleDelete = async (expenseId) => {
    if (dropdownControle === 'Expense') {
      try {
        const response = await axios.delete(`http://localhost:4000/Exremove/${expenseId}`);
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
    }
  };

  const incomeDelete = async (incomeId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/Incomeremove/${incomeId}`);
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
                <Dropdown.Item eventKey="Income">Income</Dropdown.Item>
                <Dropdown.Item eventKey="Expense">Expense</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button className="login-btn" variant="primary" onClick={addNew}>New</Button>
          </div>
        </div>
        <div className='tables-top'>
          <div className='table-actions-income'>
            <b>Income: <span style={{ color: 'green' }}>₹{totalInAmount}</span></b>
          </div>
          <div className='table-actions-expense'>
            <b>Expense: <span style={{ color: 'red' }}>₹{totalExAmount}</span></b>
          </div>
          <div className='table-actions-balance'>
            <b>Balance: <span style={{ color: 'orange' }}>₹{balance}</span></b>
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
            {dropdownControle === 'Expense' ?
              <tbody>
                {exdata.map((expense, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{expense.title}</td>
                    <td>{expense.currentDate}</td>
                    <td>{expense.category}</td>
                    <td style={{ color: 'red' }}> <b>{expense.amount}</b> </td>
                    <td className='table-action'>
                      <Link to={`/Updateaccount/${expense._id}`}><img className='tableActonImgs' src={editImg} alt="Edit" /></Link>
                      <img
                        onClick={() => handleDelete(expense._id)}
                        className='tableActonImg'
                        src={trushImg}
                        alt="Delete"
                      />
                    </td>
                  </tr>
                ))}
              </tbody> :
              <tbody>
                {incomedata.map((income, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{income.title}</td>
                    <td>{income.currentDate}</td>
                    <td>{income.category}</td>
                    <td style={{ color: 'green' }}> <b>{income.amount}</b> </td>
                    <td className='table-action'>
                      <Link to={`/Updateaccount/${income._id}`}><img className='tableActonImgs' src={editImg} alt="Edit" /></Link>
                      <img onClick={() => incomeDelete(income._id)} className='tableActonImg' src={trushImg} alt="Delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AccountsManage;
