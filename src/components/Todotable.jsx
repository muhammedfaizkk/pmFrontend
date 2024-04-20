import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import trushImg from '../assets/icons/icons8-trush-32.png';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';

function Todotable() {
    const [prayers, setPrayers] = useState([])
    const [removeControle, setremoveControle] = useState(false)


    useEffect(() => {
        getPrayers()
    }, [removeControle])

    const getPrayers = async () => {
        try {
            const res = await axios.get("https://pmbackend-xdwu.onrender.com/getprayers");
            const data = res.data.success ?? false;
            if (data) {
                const data = res.data.prayers
                setPrayers(data)
            }
        } catch (error) {
            console.error("Error fetching projects:", error); // Logging an error message if the request fails
        }
    }

    const missedPrayersCount = {
        Fajr: 0,
        Dhuhr: 0,
        Asr: 0,
        Maghrib: 0,
        Isha: 0
    };

    prayers.forEach(prayer => {

        for (const key in prayer) {
            if (prayer.hasOwnProperty(key) && prayer[key] === 'Missed') {
                missedPrayersCount[key]++;
            }
        }
    });

    const handleRemoveItemClick = async (prId) => {
        try {
            const res = await axios.delete(`http://localhost:4000/prayerDelete/${prId}`, {});
            if (res.data.success) {
                setremoveControle(preveSte => !preveSte)
                toast.success('Successfully removed prayer', {
                    position: "top-center",
                    autoClose: 999,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Error removing prayer', error, {
                position: "top-center",
                autoClose: 999,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

   




    return (
        <div className='todoTable d-flex flex-column gap-4'>

            <div>
                <ToastContainer />
                <h3 className='text-center mb-5'>Missed Prayers</h3>

                <div className='missed-prayers d-flex gap-5 z-0'>
                    <Card style={{ width: '10rem', padding: '10px', cursor: 'pointer', border: '0' }} className='card shadow custom-card'>
                        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
                            <Card.Title>Fajr</Card.Title>
                            <p><b style={{ fontSize: '30px', color: 'red' }}>{missedPrayersCount.Fajr}</b></p>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '10rem', padding: '10px', cursor: 'pointer', border: '0' }} className='card shadow custom-card'>
                        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
                            <Card.Title>Dhhr</Card.Title>
                            <p><b style={{ fontSize: '30px', color: 'red' }}>{missedPrayersCount.Dhuhr}</b></p>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '10rem', padding: '10px', cursor: 'pointer', border: '0' }} className='card shadow custom-card'>
                        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
                            <Card.Title>Asr</Card.Title>
                            <p><b style={{ fontSize: '30px', color: 'red' }}>{missedPrayersCount.Asr}</b></p>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '10rem', padding: '10px', cursor: 'pointer', border: '0' }} className='card shadow custom-card'>
                        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
                            <Card.Title>Mib</Card.Title>
                            <p><b style={{ fontSize: '30px', color: 'red' }}>{missedPrayersCount.Maghrib}</b></p>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '10rem', padding: '10px', cursor: 'pointer', border: '0' }} className='card shadow custom-card'>
                        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
                            <Card.Title>Isha</Card.Title>
                            <p><b style={{ fontSize: '30px', color: 'red' }}>{missedPrayersCount.Isha}</b></p>
                        </Card.Body>
                    </Card>
                </div>

            </div>

            <div>
                <Table responsive striped hover className='table-boot'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Fajr</th>
                            <th>Dhuhr</th>
                            <th>Asr</th>
                            <th>Magrib</th>
                            <th>isha</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {prayers.map((element, index) => (
                            <tr key={index}>
                                <td>{element.currentDate}</td>
                                <td>{element.Fajr}</td>
                                <td>{element.Dhuhr}</td>
                                <td>{element.Asr}</td>
                                <td>{element.Maghrib}</td>
                                <td>{element.Isha}</td>
                                <td> <img onClick={() => handleRemoveItemClick(element._id)} className='tableActonImg' src={trushImg} alt="Delete" /></td>
                            </tr>
                        ))}
                    </tbody>


                </Table>
            </div>

        </div>
    )
}

export default Todotable
