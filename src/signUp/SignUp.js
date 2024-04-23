// SignupForm.js
import React, { useContext, useState } from 'react';
import './SignUp.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import AuthContext from '../store/authContext';
import useSignUp from '../hooks/useSignUp';


const SignupForm = () => {
  const registerUser=useSignUp()
  const { errorTextLogin,} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData)
    console.log(formData);
  };

  return (
    <div className="bg">

    
    <div className="signup-container" >
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit" className="signup-btn">Sign Up</button>
        <span>Already have Account <Link to='/'>Login in</Link></span>
      </form>
    </div>
    </div>
  );
};

export default SignupForm;
