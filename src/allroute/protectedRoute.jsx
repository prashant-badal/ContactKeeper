import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../store/authContext';
import AlertProtect from '../alertProtected/AlertProtect';

const ProtectedRoute = () => {
  const { islogIn } = useContext(AuthContext);

  return (
    <>
      
      {islogIn ? <Outlet /> : <AlertProtect/>}
    </>
  );
};

export default ProtectedRoute;
