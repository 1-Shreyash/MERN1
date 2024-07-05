import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const Logout = () => {
    const {LogOutUser} = useAuth();
    console.log("LOGOUT PAGE");
    useEffect(()=>{
        LogOutUser();
    }, [LogOutUser]);
  return <Navigate to="/login"/>;
}

export default Logout