// LoginForm.js
import React, { useContext, useState } from 'react';
import './LoginForm.css'; // Import CSS file for styling


import AuthContext from '../store/authContext';
import useLoginToken from '../hooks/useLoginToken';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {
 const { accessKey,errorTextLogin,} = useContext(AuthContext);
 const LoginApiCall=useLoginToken()

  const [formData, setFormData] = useState({
  
    email: '',
    password: ''
  });
 


  // console.log(accessKey)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =  (e) => {

    e.preventDefault();
    LoginApiCall(formData);

  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorTextLogin && <div style={{ color: 'red' }}>{errorTextLogin}</div>} 
        <button type="submit" className="login-btn">Login</button>
        <span>Create New Account <Link to='/signUp'>SignUp</Link></span>
      </form>
    </div>
  );
};

export default LoginForm;
