import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import homeImg from '../assets/icons/Home.png'
import addImg from '../assets/icons/add-5.png'
import notificatonImg from '../assets/icons/notification.png'
import sidebarImg from '../assets/icons/sidebar.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, sidebarStatus } from "../redux/userSlice";



function Navbarrel() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.users.userAuth);



    if (location.pathname === '/login') {
        return
    }
    const navigateLogin = () => {
        navigate('/login')
    }
    const navigateAddprojects = () => {
        navigate('/addproject')
    }
    const logOut = () => {
        dispatch(logoutUser(false));
    };


    const handleClick = () => {
        dispatch(sidebarStatus(true));
    };

    const navigateAddprayer = () => {
        navigate('/addprayer')
    }


    let pathnameHome;

    if (location.pathname === '/todo') {
        pathnameHome = 'Todo'
    }
    else if (location.pathname === '/accounts') {
        pathnameHome = 'Accounts'
    }
    else if (location.pathname === '/projects') {
        pathnameHome = 'Task'
    }
    else {
        pathnameHome = 'Dashboard'
    }



    return (
        <div className='nav-main d-flex justify-content-end '>
            <Navbar expand="lg" className=" nav-sub z-1" >
                <Container>
                    <Navbar.Brand href="#" className='d-flex align-items-center gap-1'>
                        <img className='navIcons' src={homeImg} alt="" />
                        <span>/</span>
                        <span className='fs-6'><b>
                            {pathnameHome}
                        </b></span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                        </Nav>
                        <Form className="d-flex align-items-center gap-3">
                            <img
                                onClick={handleClick}
                                className='navIcon-sidebar'
                                src={sidebarImg}
                                alt=""
                            />
                            {location.pathname === '/todoTable' ? <img onClick={navigateAddprayer} className='navIcons' src={addImg} alt="" />
                                : <img onClick={navigateAddprojects} className='navIcons' src={addImg} alt="" />
                            }
                            <img className='navIcons' src={notificatonImg} alt="" />
                            {isAuth ? (
                                <Button className="login-btn" variant="primary" onClick={logOut}>Logout</Button>
                            ) : (
                                <Button className="login-btn" variant="primary" onClick={navigateLogin}>Login</Button>
                            )}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navbarrel
