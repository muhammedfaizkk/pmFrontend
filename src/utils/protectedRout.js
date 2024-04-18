import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuth, children }) {

    console.log(isAuth);
    if (!isAuth) {
        return <Navigate to={'/login'} />
    }
    return children

}

export default ProtectedRoute
