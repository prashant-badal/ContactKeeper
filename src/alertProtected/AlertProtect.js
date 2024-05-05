import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'

const AlertProtect = () => {
  return (
   <>
   <h1>ProtectedRoute mode Active ....</h1>
   <h2> Login  First</h2>
   
  <h2> <NavLink to={"/"}>Login</NavLink></h2>
   </>
  )
}

export default AlertProtect
