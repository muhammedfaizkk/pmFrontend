import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbarrel from './components/Navbarrel';
import Projects from './components/Projects';
import Login from './components/Login';
import Projectadd from './components/Projectadd';
import AccountsManage from './components/AccountsManage';
import Addaccounts from './components/Addaccounts';
import Updateproject from './components/Updateproject';
import Todo from './components/Todo';
import Updateaccount from './components/Updateaccount';
import Todotable from './components/Todotable';
import Addprayer from './components/Addprayer';
import Dept from './components/Dept';
import AddDept from './components/AddDept';
import { useSelector } from 'react-redux';
import ProtectedRoute from './utils/protectedRout';
import { PropagateLoader } from 'react-spinners';

function App() {
  const isAuth = useSelector((state) => state.users.userAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after 2000 milliseconds (2 seconds)
    }, 2000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <BrowserRouter>
      <div className='home-controle'>
        <div className='sidebar-manager'>
          <Sidebar />
        </div>
        <div className='routes'>
          <ProtectedRoute isAuth={isAuth}><Navbarrel /></ProtectedRoute>
          <div>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <PropagateLoader color="black
                " size={15} margin={2} />
              </div>
            ) : (
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<ProtectedRoute isAuth={isAuth}><Home /></ProtectedRoute>} />
                <Route path='/projects' element={<ProtectedRoute isAuth={isAuth}><Projects /> </ProtectedRoute>} />
                <Route path='/addproject' element={<ProtectedRoute isAuth={isAuth}><Projectadd /></ProtectedRoute>} />
                <Route path='/accounts' element={<ProtectedRoute isAuth={isAuth}><AccountsManage /></ProtectedRoute>} />
                <Route path='/addaccounts' element={<ProtectedRoute isAuth={isAuth}><Addaccounts /> </ProtectedRoute>} />
                <Route path='/updateproject/:id' element={<ProtectedRoute isAuth={isAuth}><Updateproject /></ProtectedRoute>} />
                <Route path='/updateaccount/:id' element={<ProtectedRoute isAuth={isAuth}><Updateaccount /></ProtectedRoute>} />
                <Route path='/todoTable' element={<ProtectedRoute isAuth={isAuth}><Todotable /></ProtectedRoute>} />
                <Route path='/todo' element={<ProtectedRoute isAuth={isAuth}><Todo /></ProtectedRoute>} />
                <Route path='/addprayer' element={<ProtectedRoute isAuth={isAuth}><Addprayer /></ProtectedRoute>} />
                <Route path='/dept' element={<ProtectedRoute isAuth={isAuth}><Dept /> </ProtectedRoute>} />
                <Route path='/addDept' element={<ProtectedRoute isAuth={isAuth}><AddDept /></ProtectedRoute>} />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
