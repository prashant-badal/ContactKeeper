import React, { useContext } from 'react'
import useContacts from '../hooks/useContacts'
import AuthContext from '../store/authContext'
import { NavLink, Outlet, Route } from 'react-router-dom';

const protectedRoute = () => {
const {islogIn}=useContext(AuthContext);


  return (
   islogIn? <Outlet/> :<NavLink to={"/"}/>
  )
}

export default protectedRoute
