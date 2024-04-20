import React, { useCallback, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import editImg from '../assets/icons/edit.png';
import trushImg from '../assets/icons/icons8-trush-32.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllprojects } from '../redux/projectsSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Projects() {
    const dispatch = useDispatch();
    const proData = useSelector((state) => state.allProjects.projects ?? []);
    const [removeControle, setremoveControle] = useState(false)




    const handleRemoveItemClick = async (proId) => {
        try {
            const res = await axios.delete(`http://localhost:4000/proremove/${proId}`, {});
            if (res.data.success) {
                setremoveControle(preveSte => !preveSte)
                toast.success('Successfully removed task', {
                    position: "top-center",
                    autoClose: 999,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.success('Error removing task', error, {
                position: "top-center",
                autoClose: 999,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };


    const getProjectsData = useCallback(async () => {
        try {
            const res = await axios.get("https://pmbackend-xdwu.onrender.com/getAllprojects");
            const projects = res.data.projects ?? [];
            const data = res.data.success ?? false;
            if (data) {
                dispatch(getAllprojects(projects));
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        getProjectsData();
    }, [getProjectsData, removeControle]);



    const getStatusCellStyle = (project) => {
        return {
            color: project.projectStatus === 'Pending' ? 'orange' : 'green',
        };
    };

    return (
        <div className='projects'>
            <ToastContainer />
            <Table responsive striped hover className='table-boot'>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>CLIENT NAME</th>
                        <th>PROJECT TYPE</th>
                        <th>STARTED</th>
                        <th>PROJECT STATUS</th>
                        <th>LAST UPDATED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {proData.map((project, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{project.clientName}</td>
                            <td>{project.projectType}</td>
                            <td>{project.started}</td>
                            <td style={getStatusCellStyle(project)}>
                                <b>{project.projectStatus}</b>
                            </td>
                            <td>{project.lastUpdated}</td>
                            <td className='table-action'>
                                <Link to={`/updateproject/${project._id}`}>
                                    <img className='tableActonImgs' src={editImg} alt="Edit" />
                                </Link>


                                <img onClick={() => handleRemoveItemClick(project._id)} className='tableActonImg' src={trushImg} alt="Delete" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Projects;
