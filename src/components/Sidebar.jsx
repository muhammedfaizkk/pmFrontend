import React from 'react'
import '../styles/style.css'
import dashboardImg from '../assets/icons/icons8-dashboard-30.png'
import projectsImg from '../assets/icons/projects.png'
import todoImg from '../assets/icons/todo-list.png'
import manager from '../assets/icons/manager.png'
import accountImg from '../assets/icons/Accounts.png'
import closeButtonimg from '../assets/icons/close.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { navControl } from '../redux/userSlice'


function Sidebar() {
    const clicked = useSelector((state) => state.users.sidebarStatus)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const closeButton = () => {
        dispatch(navControl(false))
    }

    if (location.pathname === '/login') {
        return
    }

    const navigateProjects = () => {
        navigate('/projects')
    }

    const navigateAccounts = () => {
        navigate('/accounts')
    }
    const navigateTodo = () => {
        navigate('/todo')
    }
    return (
        <div className={`sidebar z-1 ${clicked ? 'sidebarTrue' : 'sidebarnot'}`}>
            <div>
                <div className='closeIconParent'>
                    <img onClick={closeButton} className='closeIcon' src={closeButtonimg} alt="" />
                </div>
                <div className='logo'>
                    <img className='manager' src={manager} alt="" />
                    <p><b>faiz kk</b></p>
                </div>
                <div className='side-menu'>
                    <ul className='dItems' onClick={navigateTodo}>
                        <li><img className='dashboard-icons' src={dashboardImg} alt="" /></li>
                        <li ><b>Dashboard</b></li>
                    </ul>
                    <ul className='dItems' onClick={navigateTodo}>
                        <li><img className='dashboard-icons' src={todoImg} alt="" /></li>
                        <li className='menu-cnt'><b>Todo</b></li>
                    </ul>
                    <ul className='dItems' onClick={navigateProjects} >
                        <li><img className='dashboard-icons' src={projectsImg} alt="" /></li>
                        <li className='menu-cnt'><b>Task</b></li>
                    </ul>
                    <ul className='dItems' onClick={navigateAccounts}>
                        <li><img className='dashboard-icons' src={accountImg} alt="" /></li>
                        <li className='menu-cnt'><b>Accounts</b></li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Sidebar
