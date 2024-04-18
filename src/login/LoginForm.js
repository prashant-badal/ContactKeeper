// LoginForm.js
import React, { useContext, useState } from 'react';
import './LoginForm.css'; // Import CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/authContext';

const LoginForm = () => {
  const { storeAccessKey } = useContext(AuthContext);
  const [formData, setFormData] = useState({
  
    email: '',
    password: ''
  });
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/user/login', formData);
      console.log(response)
      const { accessToken } = response.data;
      console.log(accessToken)
      storeAccessKey(accessToken);
      navigate('/contactList');
    } catch (error) {
      setErrorText(error.response?.data?.message);
    }
  };
// const {storeAccessKey} =useContext(AuthContext)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errorText,setErrorText]=useState(null);
//   const navigate=useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     // const [email,password]=formData;
//     // Handle form submission here (e.g., send data to backend API)
//      await axios.post('http://localhost:5001/api/user/login', formData)
//       .then(function (response) {
//         const { accessToken } =  response.data; // Assuming the access token is returned in the response
//        storeAccessKey(accessToken)
//         navigate('/contactList')
//       })
//       .catch(function (error) {
//         setErrorText(error.response.data.message);
//       });

//     console.log(formData);
//   };

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
        {errorText && <div style={{ color: 'red' }}>{errorText}</div>} 
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
