import React, { useContext, useEffect } from 'react'
import AuthContext from '../store/authContext';
import axios from 'axios';

const useSignUp = (formData) => {
    const {setErrorTextLogin} = useContext(AuthContext);
    const registerUser=async(formData)=>{
        try {
            const response = await axios.post('http://localhost:5001/api/user/register', formData);
            console.log(response.data);

        }
        catch(error){
            setErrorTextLogin(error.response?.data?.message);
        }
    }


    useEffect(()=>{
        registerUser(formData)
    })


  return registerUser
}

export default useSignUp
